const sharp = require('sharp');
const path = require('path');

async function processLogo() {
  const input = path.join(__dirname, '../public/brand/vannic-logo-official.png');
  const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  
  const darkLogoBuf = Buffer.alloc(width * height * 4);
  const markBuf = Buffer.alloc(width * height * 4);

  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const diff = 255 - Math.min(r, g, b);
      
      let alpha = 0;
      if (diff > 12) {
        alpha = Math.min(255, Math.round(diff * 3.5));
      }

      if (alpha > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }

      const outIdx = (y * width + x) * 4;

      if (alpha === 0) {
        darkLogoBuf[outIdx] = 0;
        darkLogoBuf[outIdx + 1] = 0;
        darkLogoBuf[outIdx + 2] = 0;
        darkLogoBuf[outIdx + 3] = 0;

        markBuf[outIdx] = 0;
        markBuf[outIdx + 1] = 0;
        markBuf[outIdx + 2] = 0;
        markBuf[outIdx + 3] = 0;
      } else {
        const isDarkText = (r < 110 && g < 110 && b < 110 && Math.abs(r - g) < 25 && Math.abs(g - b) < 25);
        
        if (isDarkText && y > 350) {
          darkLogoBuf[outIdx] = 245;
          darkLogoBuf[outIdx + 1] = 248;
          darkLogoBuf[outIdx + 2] = 252;
          darkLogoBuf[outIdx + 3] = alpha;
        } else {
          darkLogoBuf[outIdx] = r;
          darkLogoBuf[outIdx + 1] = g;
          darkLogoBuf[outIdx + 2] = b;
          darkLogoBuf[outIdx + 3] = alpha;
        }

        if (y < 380) {
          markBuf[outIdx] = r;
          markBuf[outIdx + 1] = g;
          markBuf[outIdx + 2] = b;
          markBuf[outIdx + 3] = alpha;
        } else {
          markBuf[outIdx] = 0;
          markBuf[outIdx + 1] = 0;
          markBuf[outIdx + 2] = 0;
          markBuf[outIdx + 3] = 0;
        }
      }
    }
  }

  const outDir = path.join(__dirname, '../public/brand');

  // Save cropped dark mode logo
  const cropWidth = Math.min(width - minX + 10, maxX - minX + 20);
  const cropHeight = Math.min(height - minY + 10, maxY - minY + 20);

  await sharp(darkLogoBuf, { raw: { width, height, channels: 4 } })
    .extract({
      left: Math.max(0, minX - 10),
      top: Math.max(0, minY - 10),
      width: cropWidth,
      height: cropHeight
    })
    .png()
    .toFile(path.join(outDir, 'vannic-logo-dark.png'));

  // Save mark icon
  let mMinX = width, mMaxX = 0, mMinY = height, mMaxY = 0;
  for (let y = 0; y < 380; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (markBuf[idx + 3] > 30) {
        if (x < mMinX) mMinX = x;
        if (x > mMaxX) mMaxX = x;
        if (y < mMinY) mMinY = y;
        if (y > mMaxY) mMaxY = y;
      }
    }
  }

  await sharp(markBuf, { raw: { width, height, channels: 4 } })
    .extract({
      left: Math.max(0, mMinX - 10),
      top: Math.max(0, mMinY - 10),
      width: Math.min(width - mMinX + 10, mMaxX - mMinX + 20),
      height: Math.min(height - mMinY + 10, mMaxY - mMinY + 20)
    })
    .png()
    .toFile(path.join(outDir, 'vannic-mark.png'));

  console.log('Processed official logo successfully into vannic-logo-dark.png and vannic-mark.png');
}

processLogo().catch(console.error);
