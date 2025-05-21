const useColor = true;      // Toggle color mode
const insideHue = 0;        // Hue for points inside the set (0 = red, 120 = green, etc.)
const baseHue = 25;         // Starting hue for outside gradient
const hueRange = 110;       // How wide the hue range is (0–255)

const maxIterations = 150;
const zoom = 300;
const offsetX = -1.75;
const offsetY = -1.5;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent("canvas-area");
  noLoop();

  pixelDensity(1);
  loadPixels();
}

function draw() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const aStart = x / zoom + offsetX;
      const bStart = y / zoom + offsetY;

      let a = 0;
      let b = 0;
      let n = 0;

      while (n < maxIterations) {
        const aa = a * a - b * b;
        const bb = 2 * a * b;

        a = aa + aStart;
        b = bb + bStart;

        if (a * a + b * b > 4) break;

        n++;
      }

      let color;
      if (useColor) {
        colorMode(HSB, 255);
        if (n === maxIterations) {
          color = color(insideHue, 255, 0); // dark inside color (0 brightness)
        } else {
          const hue = map(n, 0, maxIterations, baseHue, baseHue + hueRange);
          color = color(hue % 255, 255, 255); // wrapped hue for nice loop
        }
      } else {
        const bright = n === maxIterations ? 0 : map(n, 0, maxIterations, 0, 255);
        color = color(bright);
      }

      const pix = (x + y * width) * 4;
      pixels[pix + 0] = red(col);
      pixels[pix + 1] = green(col);
      pixels[pix + 2] = blue(col);
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
}