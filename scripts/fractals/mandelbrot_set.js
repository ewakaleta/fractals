/**
 * Sets pixel density and loads pixel data into the pixel array.
 * @param {p5} p - p5 instance
 */
function setupPixels(p) {
  p.pixelDensity(1);
  p.loadPixels();
}

/**
 * Converts a screen pixel (x, y) into a corresponding complex number (a + bi).
 * @param {number} x - x coordinate of the pixel
 * @param {number} y - y coordinate of the pixel
 * @param {number} zoom - zoom factor into the complex plane
 * @param {number} offsetX - horizontal offset
 * @param {number} offsetY - vertical offset
 * @returns {{aStart: number, bStart: number}} - real and imaginary parts of the complex number
 */
function pixelToComplexNum(x, y, zoom, offsetX, offsetY) {
  const aStart = x / zoom + offsetX;
  const bStart = y / zoom + offsetY;
  return { aStart, bStart };
}

/**
 * Performs the Mandelbrot iteration for a single complex point.
 * @param {number} aStart - real part of the complex number
 * @param {number} bStart - imaginary part of the complex number
 * @param {number} maxIterations - maximum number of iterations allowed
 * @returns {number} - number of iterations before divergence (or maxIterations if bounded)
 */
function mandelbrotIteration(aStart, bStart, maxIterations) {
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

  return n;
}

/**
 * Determines the color of a pixel based on Mandelbrot iteration count.
 * Optionally renders in color (HSB) or grayscale.
 * Writes the resulting color directly to the pixel array.
 * 
 * @param {p5} p - p5 instance
 * @param {number} x - x position of pixel
 * @param {number} y - y position of pixel
 * @param {number} n - number of iterations performed
 * @param {number} maxIterations - max iterations allowed
 * @param {boolean} useColor - toggle color (HSB) or grayscale
 * @param {number} baseHue - base hue (0-255)
 * @param {number} hueRange - hue variation range (0-255)
 */
function determineColors(p, x, y, n, maxIterations, useColor, baseHue, hueRange) {
  let color

  if (useColor) {
    p.colorMode(p.HSB, 255);
    if (n === maxIterations) {
      color = p.color(255, 255, 0); // Inside: black
    } else {
      const hue = p.map(n, 0, maxIterations, baseHue, baseHue + hueRange);
      color = p.color(hue % 255, 255, 255); // Outside: gradient hue
    }
  } else {
    const bright = n === maxIterations ? 0 : p.map(n, 0, maxIterations, 0, 255);
    color = p.color(bright);
  }

  const pix = (x + y * p.width) * 4;
  p.pixels[pix + 0] = p.red(color);
  p.pixels[pix + 1] = p.green(color);
  p.pixels[pix + 2] = p.blue(color);
  p.pixels[pix + 3] = 255;
}

/**
 * Renders the Mandelbrot set onto the canvas by iterating over every pixel
 * and mapping it to a corresponding complex number. Determines how many
 * iterations each point takes to escape the Mandelbrot set and colors it
 * accordingly using either HSB color or grayscale.
 *
 * This function directly manipulates the canvas pixel array for performance,
 * and must be called between `p.loadPixels()` and `p.updatePixels()`.
 *
 * @param {number} offsetX - Horizontal offset of the complex plane
 * @param {number} offsetY - Vertical offset of the complex plane
 * @param {number} zoom - Zoom level to scale the visible portion of the fractal
 * @param {number} depth - Maximum number of iterations per pixel
 * @param {boolean} useColor - If true, pixels are colored using hue mapping; otherwise grayscale
 * @param {number} baseHue - Base hue value (0–255) when coloring is enabled
 * @param {number} hueRange - Range of hue variation based on iteration count (0–255)
 */
function mandelbrotSet(p, offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange) {
  setupPixels(p); // Prepare the canvas to manipulate pixels directly

  // Loop through every pixel on the canvas
  for (let x = 0; x < p.width; x++) {
    for (let y = 0; y < p.height; y++) {
      const { aStart, bStart } = pixelToComplexNum(x, y, zoom, offsetX, offsetY);
      const iterations = mandelbrotIteration(aStart, bStart, depth);
      determineColors(p, x, y, iterations, depth, useColor, baseHue, hueRange);
    }
  }

  p.updatePixels();
}