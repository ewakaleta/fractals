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

/**
 * Recursively draws a Sierpiński Triangle using geometric subdivision.
 * 
 * At each level of recursion, this function draws three smaller triangles:
 * one at the top, and two at the bottom (left and right), forming the
 * classic self-similar Sierpiński structure.
 * 
 * The recursion stops when the depth reaches 0, at which point a single
 * filled triangle is drawn using `drawSingleTriangle(...)`.
 * 
 * @param {p5} p - p5 instance
 * @param {number} x - X-coordinate of the top vertex of the triangle
 * @param {number} y - Y-coordinate of the top vertex of the triangle
 * @param {number} size - Length of the base of the current triangle
 * @param {number} depth - Current recursion depth (decreases with each level)
 */
function triangle_rec(p, x, y, size, depth) {
  // Base case: if recursion depth is 0, draw a single triangle
  if (depth === 0) {
    drawSingleTriangle(p, x, y, size);
    return;
  }

  // Calculate geometry helper values
  const half = size / 2;
  const height = (Math.sqrt(3) / 2) * size;
  const halfHeight = height / 2;

  triangle_rec(p, x, y, half, depth - 1);                        // Top triangle
  triangle_rec(p, x - half / 2, y + halfHeight, half, depth - 1); // Bottom left triangle
  triangle_rec(p, x + half / 2, y + halfHeight, half, depth - 1); // Bottom right triangle
}