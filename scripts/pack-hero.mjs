import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Length-prefixed original JPEGs: no resizing or second compression pass.
const bundleSize = 32;
for (const [name, source, count] of [
  ['desktop', 'desktop-hq', 240], ['mobile', 'mobile-hq', 121],
]) {
  const destination = `public/media/hero/packed-v1/${name}`;
  await mkdir(destination, { recursive: true });
  let total = 0;
  for (let start = 0; start < count; start += bundleSize) {
    const parts = [];
    for (let index = start; index < Math.min(count, start + bundleSize); index++) {
      const bytes = await readFile(`public/media/hero/${source}/frame-${String(index + 1).padStart(4, '0')}.jpg`);
      const length = Buffer.alloc(4);
      length.writeUInt32BE(bytes.length);
      parts.push(length, bytes);
    }
    const bundle = Buffer.concat(parts);
    await writeFile(`${destination}/chunk-${String(Math.floor(start / bundleSize) + 1).padStart(3, '0')}.bin`, bundle);
    total += bundle.length;
  }
  console.log(`${name}: ${count} unchanged JPEGs, ${Math.ceil(count / bundleSize)} requests, ${total} bytes`);
}
