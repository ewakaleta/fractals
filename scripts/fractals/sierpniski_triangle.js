/**
 * Draws a single equilateral triangle using p5.
 * This is used both by the SierpinskiTriangle class and blockly-generated code.
 * 
 * @param {p5} p - p5 instance
 * @param {number} x - top vertex x
 * @param {number} y - top vertex y
 * @param {number} size - side length
 */
function drawSingleTriangle(p, x, y, size) {
    const height = (Math.sqrt(3) / 2) * size;
    p.triangle(
      x, y,
      x - size / 2, y + height,
      x + size / 2, y + height
    );
  }
  
  // Expose drawSingleTriangle globally for Blockly-generated code
  window.drawSingleTriangle = drawSingleTriangle;