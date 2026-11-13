type Options = {
  count: number;
  path: string;
  bundleSize: number;
  concurrency: number;
  maxCache: number;
  onFrame: () => void;
};

/** Original JPEG bytes travel in a few cacheable requests. Encoded blobs are
 * cheap to keep; only a bounded neighbourhood is decoded into full-size images. */
export class PackedSequenceLoader {
  readonly frames = new Map<number, HTMLImageElement>();
  private encoded = new Map<number, Blob>();
  private fetched = new Set<number>();
  private failed = new Set<number>();
  private requests = new Map<number, AbortController>();
  private decoding = new Map<number, { image: HTMLImageElement; url: string }>();
  private decodeFailed = new Set<number>();
  private target = -1;
  private direction = 1;
  private active = true;
  private destroyed = false;

  private options: Options;
  constructor(options: Options) { this.options = options; }

  seek(index: number) {
    if (this.destroyed) return;
    const target = Math.max(0, Math.min(this.options.count - 1, Math.round(index)));
    if (target === this.target) return;
    if (this.target >= 0 && target !== this.target) this.direction = target > this.target ? 1 : -1;
    this.target = target;
    this.pump();
  }

  setActive(active: boolean) {
    this.active = active;
    if (active) this.pump();
  }

  private neighbourhood() {
    const result = [this.target];
    const radius = Math.max(1, Math.floor((this.options.maxCache - 1) / 2));
    for (let offset = 1; offset <= radius; offset++) {
      result.push(this.target + offset * this.direction, this.target - offset * this.direction);
    }
    return result.filter(index => index >= 0 && index < this.options.count);
  }

  private pump() {
    if (!this.active || this.destroyed || this.target < 0) return;
    const total = Math.ceil(this.options.count / this.options.bundleSize);
    const current = Math.floor(this.target / this.options.bundleSize);
    const priority = [current];
    for (let offset = 1; offset < total; offset++) priority.push(current + offset * this.direction, current - offset * this.direction);
    for (const bundle of priority) {
      if (this.requests.size >= this.options.concurrency) break;
      if (bundle < 0 || bundle >= total || this.fetched.has(bundle) || this.failed.has(bundle) || this.requests.has(bundle)) continue;
      this.fetchBundle(bundle);
    }
    this.decodeNearby();
  }

  private fetchBundle(bundle: number) {
    const controller = new AbortController();
    this.requests.set(bundle, controller);
    void fetch(`${this.options.path}/chunk-${String(bundle + 1).padStart(3, '0')}.bin`, {
      signal: controller.signal, cache: 'force-cache',
    }).then(async response => {
      if (!response.ok) throw new Error(`Frame bundle ${response.status}`);
      const bytes = await response.arrayBuffer();
      if (this.destroyed) return;
      const view = new DataView(bytes);
      const decoded: [number, Blob][] = [];
      let offset = 0;
      const first = bundle * this.options.bundleSize;
      const end = Math.min(this.options.count, first + this.options.bundleSize);
      for (let index = first; index < end; index++) {
        if (offset + 4 > bytes.byteLength) throw new Error('Truncated frame bundle');
        const length = view.getUint32(offset);
        offset += 4;
        if (!length || offset + length > bytes.byteLength) throw new Error('Invalid frame length');
        decoded.push([index, new Blob([bytes.slice(offset, offset + length)], { type: 'image/jpeg' })]);
        offset += length;
      }
      if (offset !== bytes.byteLength) throw new Error('Unexpected bundle data');
      decoded.forEach(([index, blob]) => this.encoded.set(index, blob));
      this.fetched.add(bundle);
    }).catch(() => {
      if (!this.destroyed) this.failed.add(bundle);
    }).finally(() => {
      this.requests.delete(bundle);
      this.pump();
    });
  }

  private decodeNearby() {
    for (const index of this.neighbourhood()) {
      if (this.decoding.size >= 2) break;
      const blob = this.encoded.get(index);
      if (!blob || this.frames.has(index) || this.decoding.has(index) || this.decodeFailed.has(index)) continue;
      const image = new Image();
      const url = URL.createObjectURL(blob);
      this.decoding.set(index, { image, url });
      image.decoding = 'async';
      image.onload = async () => {
        try { await image.decode(); } catch { /* onload still provides drawable pixels */ }
        if (this.destroyed) return;
        URL.revokeObjectURL(url);
        this.decoding.delete(index);
        // A rapid seek may complete an old decode. Never evict the current frame for it.
        if (this.neighbourhood().includes(index)) {
          this.frames.set(index, image);
          this.trim();
          this.options.onFrame();
        }
        this.decodeNearbyIfActive();
      };
      image.onerror = () => {
        if (this.destroyed) return;
        URL.revokeObjectURL(url);
        this.decoding.delete(index);
        this.decodeFailed.add(index);
        this.decodeNearbyIfActive();
      };
      image.src = url;
    }
  }

  private decodeNearbyIfActive() {
    if (this.active && !this.destroyed) this.decodeNearby();
  }

  private trim() {
    while (this.frames.size > this.options.maxCache) {
      let furthest = -1;
      let distance = -1;
      for (const index of this.frames.keys()) {
        if (Math.abs(index - this.target) > distance) { furthest = index; distance = Math.abs(index - this.target); }
      }
      this.frames.delete(furthest);
    }
  }

  destroy() {
    this.destroyed = true;
    this.requests.forEach(controller => controller.abort());
    this.requests.clear();
    this.decoding.forEach(({ image, url }) => { image.onload = null; image.onerror = null; URL.revokeObjectURL(url); });
    this.decoding.clear();
    this.frames.clear();
    this.encoded.clear();
  }
}
