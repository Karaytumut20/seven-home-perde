import { test } from "node:test";
import assert from "node:assert/strict";
import {
  expandedFilmRect,
  filmPlaneTransform,
} from "../src/lib/image-expansion.ts";

test("the film starts framed, reaches the entire viewport and reverses exactly", () => {
  const start = { x: 286, y: 206, width: 868, height: 488 };
  assert.deepEqual(expandedFilmRect(start, 1440, 900, 0), start);
  assert.deepEqual(expandedFilmRect(start, 1440, 900, 1), {
    x: 0,
    y: 0,
    width: 1440,
    height: 900,
  });
  assert.deepEqual(expandedFilmRect(start, 1440, 900, -1), start);
  assert.deepEqual(expandedFilmRect(start, 1440, 900, 2), {
    x: 0,
    y: 0,
    width: 1440,
    height: 900,
  });
  const sizes = [0, 0.5, 1, 0.5, 0].map(
    (p) => expandedFilmRect(start, 1440, 900, p).width,
  );
  assert.deepEqual(sizes, [868, 1154, 1440, 1154, 868]);
  for (const progress of [0, 0.2, 0.5, 0.8, 1, 0.5, 0]) {
    const rect = expandedFilmRect(start, 1440, 900, progress);
    assert.equal(rect.x + rect.width / 2, 720);
    assert.equal(rect.y + rect.height / 2, 450);
  }
});

test("portrait and landscape expansion cover the film window without stretching", () => {
  for (const [width, height] of [
    [1440, 900],
    [390, 844],
    [740, 420],
  ]) {
    const planeWidth = Math.max(width, (height * 16) / 9);
    const planeHeight = (planeWidth * 9) / 16;
    const start = { x: 24, y: 180, width: width - 48, height: height / 2 };
    for (const progress of [0, 0.25, 0.5, 0.75, 1]) {
      const rect = expandedFilmRect(start, width, height, progress);
      const transform = filmPlaneTransform(rect, planeWidth, planeHeight);
      assert.ok(planeWidth * transform.scale >= rect.width - 0.0001);
      assert.ok(planeHeight * transform.scale >= rect.height - 0.0001);
      assert.ok(
        Math.abs(
          (planeWidth * transform.scale) / (planeHeight * transform.scale) -
            16 / 9,
        ) < 0.0001,
      );
      assert.ok(
        Math.abs(
          transform.x +
            (planeWidth * transform.scale) / 2 -
            (rect.x + rect.width / 2),
        ) < 0.0001,
      );
    }
  }
});
