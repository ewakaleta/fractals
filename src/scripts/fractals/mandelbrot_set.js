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
  
      if (a * a + b * b > 16) break;
  
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
   * @param {number} insideHue - hue for pixels inside the set
   */
  function determineColors(p, x, y, n, maxIterations, useColor, baseHue, hueRange, insideHue) {
    let col;
  
    if (useColor) {
      p.colorMode(p.HSB, 255);
      if (n === maxIterations) {
        col = p.color(insideHue, 255, 0); // Inside: dark hue
      } else {
        const hue = p.map(n, 0, maxIterations, baseHue, baseHue + hueRange);
        col = p.color(hue % 255, 255, 255); // Outside: gradient hue
      }
    } else {
      const bright = n === maxIterations ? 0 : p.map(n, 0, maxIterations, 0, 255);
      col = p.color(bright);
    }
  
    const pix = (x + y * p.width) * 4;
    p.pixels[pix + 0] = p.red(col);
    p.pixels[pix + 1] = p.green(col);
    p.pixels[pix + 2] = p.blue(col);
    p.pixels[pix + 3] = 255;
  }
  