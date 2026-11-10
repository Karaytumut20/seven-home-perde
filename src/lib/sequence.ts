export type FrameSource = { width: number; height: number };
type LoaderOptions = {
  count: number;
  path: string;
  extension: string;
  concurrency: number;
  maxCache: number;
  onFrame: () => void;
};

export function frameIndex(progress: number, count: number): number {
  return Math.round(
    Math.max(0, Math.min(1, progress)) * Math.max(0, count - 1),
  );
}

export function framePath(
  path: string,
  index: number,
  extension = "webp",
): string {
  return `${path}/frame-${String(index + 1).padStart(4, "0")}.${extension}`;
}

export function coverRect(image: FrameSource, width: number, height: number) {
  const scale = Math.max(width / image.width, height / image.height);
  const w = image.width * scale;
  const h = image.height * scale;
  return { x: (width - w) / 2, y: (height - h) / 2, width: w, height: h };
}

export function nearestFrame<T>(
  frames: Map<number, T>,
  target: number,
): T | undefined {
  let nearest: T | undefined;
  let distance = Infinity;
  for (const [index, value] of frames) {
    if (Math.abs(index - target) < distance) {
      distance = Math.abs(index - target);
      nearest = value;
    }
  }
  return nearest;
}

/** Bounded decoded-image cache, three requests at a time, current-frame priority.
 * Only the current neighbourhood is fetched. Scrolling backwards can refetch an
 * evicted image from the browser HTTP cache instead of retaining a full movie. */
export class SequenceLoader {
  readonly frames = new Map<number, HTMLImageElement>();
  private failed = new Set<number>();
  private pending = new Set<number>();
  private queue: number[] = [];
  private target = 0;
  private active = true;
  private destroyed = false;

  private options: LoaderOptions;
  constructor(options: LoaderOptions) {
    this.options = options;
  }

  seek(index: number) {
    this.target = index;
    const candidates = [index];
    for (let offset = 1; offset <= 8; offset++)
      candidates.push(index + offset, index - offset);
    this.queue = candidates.filter(
      (i) =>
        i >= 0 &&
        i < this.options.count &&
        !this.frames.has(i) &&
        !this.failed.has(i) &&
        !this.pending.has(i),
    );
    this.pump();
  }

  setActive(active: boolean) {
    this.active = active;
    if (active) this.seek(this.target);
  }

  private pump() {
    if (!this.active || this.destroyed) return;
    while (this.pending.size < this.options.concurrency && this.queue.length) {
      const index = this.queue.shift()!;
      this.pending.add(index);
      const image = new Image();
      image.decoding = "async";
      image.onload = async () => {
        try {
          await image.decode();
        } catch {
          /* onload already guarantees a drawable image */
        }
        this.pending.delete(index);
        if (this.destroyed) return;
        this.frames.set(index, image);
        while (this.frames.size > this.options.maxCache) {
          const furthest = [...this.frames.keys()].sort(
            (a, b) => Math.abs(b - this.target) - Math.abs(a - this.target),
          )[0];
          this.frames.delete(furthest);
        }
        this.options.onFrame();
        this.pump();
      };
      image.onerror = () => {
        this.pending.delete(index);
        this.failed.add(index);
        if (!this.destroyed) this.pump();
      };
      image.src = framePath(this.options.path, index, this.options.extension);
    }
  }

  destroy() {
    this.destroyed = true;
    this.active = false;
    this.queue = [];
    this.frames.clear();
    this.failed.clear();
  }
}
