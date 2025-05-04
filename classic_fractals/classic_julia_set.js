const maxIterations = 300;
const zoom = 1.5;
const offsetX = 0;
const offsetY = 0;

const cRe = -0.7;
const cIm = 0.27015;

const useColor = true;
const baseHue = 120;
const hueRange = 100;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent("canvas-area");
  noLoop();
  background(51);
  stroke(255);
 
  pixelDensity(1);
  loadPixels();
}

function draw(){
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, -zoom + offsetX, zoom + offsetX);
      let b = map(y, 0, height, -zoom + offsetY, zoom + offsetY);
      let n = 0;

      while (n < maxIterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + cRe;
        b = bb + cIm;

        if (a * a + b * b > 16) break;
        n++;
      }

      const pix = (x + y * width) * 4;
      let col;

      if (useColor) {
        colorMode(HSB, 255);
        if (n === maxIterations) {
          col = color(255, 255, 0);
        } else {
          const hue = map(n, 0, maxIterations, baseHue, baseHue + hueRange);
          col = color(hue % 255, 255, 255);
        }
      } else {
        const brightness = n === maxIterations ? 0 : map(n, 0, maxIterations, 0, 255);
        col = color(brightness);
      }

      pixels[pix + 0] = red(col);
      pixels[pix + 1] = green(col);
      pixels[pix + 2] = blue(col);
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
}