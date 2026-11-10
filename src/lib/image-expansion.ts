export type FilmRect = { x: number; y: number; width: number; height: number };

/** The visible image window moves from its editorial frame to the viewport. */
export function expandedFilmRect(
  start: FilmRect,
  viewportWidth: number,
  viewportHeight: number,
  progress: number,
): FilmRect {
  const p = Math.max(0, Math.min(1, progress));
  return {
    x: start.x * (1 - p),
    y: start.y * (1 - p),
    width: start.width + (viewportWidth - start.width) * p,
    height: start.height + (viewportHeight - start.height) * p,
  };
}

/** One uniform scale preserves the image's proportions throughout expansion. */
export function filmPlaneTransform(
  rect: FilmRect,
  width: number,
  height: number,
) {
  const scale = Math.max(rect.width / width, rect.height / height);
  return {
    scale,
    x: rect.x + (rect.width - width * scale) / 2,
    y: rect.y + (rect.height - height * scale) / 2,
  };
}
