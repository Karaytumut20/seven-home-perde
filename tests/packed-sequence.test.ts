import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PackedSequenceLoader } from '../src/lib/packed-sequence.ts';

test('packed transport preserves every original JPEG byte', async () => {
  for (const [variant, source, count] of [['desktop', 'desktop-hq', 240], ['mobile', 'mobile-hq', 121]] as const) {
    for (let first = 0; first < count; first += 32) {
      const bytes = await readFile(`public/media/hero/packed-v1/${variant}/chunk-${String(first / 32 + 1).padStart(3, '0')}.bin`);
      let offset = 0;
      for (let index = first; index < Math.min(first + 32, count); index++) {
        const length = bytes.readUInt32BE(offset); offset += 4;
        const original = await readFile(`public/media/hero/${source}/frame-${String(index + 1).padStart(4, '0')}.jpg`);
        assert.deepEqual(bytes.subarray(offset, offset + length), original);
        offset += length;
      }
      assert.equal(offset, bytes.length);
    }
  }
});

test('bundles preload once, reverse from encoded cache and bound decoded memory', async () => {
  const originalImage = globalThis.Image;
  const originalFetch = globalThis.fetch;
  let requests = 0;
  let active = 0;
  let peak = 0;
  class FakeImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    decoding = 'async';
    decode() { return Promise.resolve(); }
    set src(_value: string) { setTimeout(() => this.onload?.(), 1); }
  }
  Object.defineProperty(globalThis, 'Image', { configurable: true, value: FakeImage });
  globalThis.fetch = async () => {
    requests++; active++; peak = Math.max(peak, active);
    await new Promise(resolve => setTimeout(resolve, 1)); active--;
    return new Response(new Uint8Array([0,0,0,1,255,0,0,0,1,255]));
  };
  const loader = new PackedSequenceLoader({ count: 8, path: '/packs', bundleSize: 2, concurrency: 2, maxCache: 3, onFrame() {} });
  try {
    loader.seek(0);
    await new Promise(resolve => setTimeout(resolve, 60));
    assert.equal(requests, 4);
    assert.ok(peak <= 2);
    loader.seek(7);
    await new Promise(resolve => setTimeout(resolve, 30));
    assert.ok(loader.frames.has(7));
    loader.seek(0);
    await new Promise(resolve => setTimeout(resolve, 30));
    assert.ok(loader.frames.has(0));
    assert.ok(loader.frames.size <= 3);
    assert.equal(requests, 4);
    loader.destroy();
    assert.equal(loader.frames.size, 0);
  } finally {
    loader.destroy();
    globalThis.fetch = originalFetch;
    Object.defineProperty(globalThis, 'Image', { configurable: true, value: originalImage });
  }
});
