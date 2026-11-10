import { test } from "node:test";
import assert from "node:assert/strict";
import {
  frameIndex,
  framePath,
  coverRect,
  nearestFrame,
  SequenceLoader,
} from "../src/lib/sequence.ts";

test("scrubbing clamps at both ends and reverses deterministically", () => {
  assert.deepEqual(
    [0, 0.5, 1, 0.5, 0].map((p) => frameIndex(p, 121)),
    [0, 60, 120, 60, 0],
  );
  assert.equal(frameIndex(-2, 121), 0);
  assert.equal(frameIndex(3, 121), 120);
  assert.equal(frameIndex(0.8, 0), 0);
  assert.equal(
    framePath("/media/hero/desktop", 9),
    "/media/hero/desktop/frame-0010.webp",
  );
});

test("cover geometry fills portrait and landscape canvases without distortion", () => {
  assert.deepEqual(coverRect({ width: 1920, height: 1080 }, 360, 800), {
    x: (360 - 1920 * (800 / 1080)) / 2,
    y: 0,
    width: 1920 * (800 / 1080),
    height: 800,
  });
  const rect = coverRect({ width: 720, height: 1280 }, 1440, 900);
  assert.deepEqual(rect, { x: 0, y: -830, width: 1440, height: 2560 });
});

test("a missing frame falls back to the nearest decoded frame", () => {
  const frames = new Map([
    [0, "first"],
    [8, "eighth"],
    [16, "sixteenth"],
  ]);
  assert.equal(nearestFrame(frames, 10), "eighth");
  assert.equal(nearestFrame(frames, 15), "sixteenth");
  assert.equal(nearestFrame(new Map(), 10), undefined);
});

test("loader bounds concurrency and cache, tolerates failures and stops after disposal", async () => {
  const previous = globalThis.Image;
  let active = 0;
  let peak = 0;
  let loaded = 0;
  class FakeImage {
    onload?: () => void;
    onerror?: () => void;
    decoding = "async";
    decode() {
      return Promise.resolve();
    }
    set src(path: string) {
      active++;
      peak = Math.max(peak, active);
      setTimeout(() => {
        active--;
        if (path.endsWith("0003.webp")) this.onerror?.();
        else this.onload?.();
      }, 1);
    }
  }
  Object.defineProperty(globalThis, "Image", {
    configurable: true,
    value: FakeImage,
  });
  try {
    const loader = new SequenceLoader({
      count: 40,
      path: "/test",
      extension: "webp",
      concurrency: 3,
      maxCache: 5,
      onFrame: () => {
        loaded++;
      },
    });
    loader.seek(0);
    await new Promise((resolve) => setTimeout(resolve, 70));
    assert.ok(peak <= 3);
    assert.ok(loaded > 0);
    assert.ok(loader.frames.size <= 5);
    assert.equal(loader.frames.has(2), false);
    loader.setActive(false);
    const prior = loaded;
    loader.seek(30);
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.equal(loaded, prior);
    loader.destroy();
    assert.equal(loader.frames.size, 0);
    loader.setActive(true);
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.equal(loaded, prior);
  } finally {
    Object.defineProperty(globalThis, "Image", {
      configurable: true,
      value: previous,
    });
  }
});
