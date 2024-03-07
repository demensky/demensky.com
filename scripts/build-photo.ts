import sharp from 'sharp';
import type {Sharp} from 'sharp';

const original: Sharp = sharp('src/photo.png');

const scales = [1, 1.5, 2, 2.5, 3, 3.5, 4];
const width = 192;
const quality = 90;

const promises = [];

for (const scale of scales) {
  const resize = original.clone().resize(width * scale);

  promises.push(
    resize
      .clone()
      .avif({quality, effort: 9})
      .toFile(`dist/photo-${scale.toFixed(1)}.avif`),
  );
  promises.push(
    resize
      .clone()
      .webp({quality, effort: 6})
      .toFile(`dist/photo-${scale.toFixed(1)}.webp`),
  );
  promises.push(
    resize
      .clone()
      .jpeg({quality, mozjpeg: true})
      .toFile(`dist/photo-${scale.toFixed(1)}.jpg`),
  );
}

await Promise.all(promises);
