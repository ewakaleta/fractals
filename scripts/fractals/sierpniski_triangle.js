/**
 * @class SierpinskiTriangle
 * Renders a recursive Sierpinski triangle using p5.js.
 */
class SierpinskiTriangle {
    /**
     * @param {p5} p - The p5.js instance
     * @param {number} startX - X coordinate of the top vertex
     * @param {number} startY - Y coordinate of the top vertex
     * @param {number} size - Side length of the base triangle
     * @param {number} depth - Number of recursive steps
     */
    constructor(p, startX, startY, size, depth = 4) {
        this.p = p;
        this.startX = startX;
        this.startY = startY;
        this.size = size;
        this.depth = depth;
    }

    /**
     * Draws the entire recursive Sierpinski triangle.
     */
    drawAll() {
        this.p.push();
        this.drawTriangleRec(this.startX, this.startY, this.size, this.depth);
        this.p.pop();
    }

    /**
     * Recursively draws smaller triangles to form the full Sierpinski triangle.
     * @private
     * @param {number} x - X coordinate of the top vertex
     * @param {number} y - Y coordinate of the top vertex
     * @param {number} size - Side length of triangle
     * @param {number} depth - Current recursion level
     */
    drawTriangleRec(x, y, size, depth) {
        if (depth === 0) {
            drawSingleTriangle(this.p, x, y, size);
            return;
        }

        const half = size / 2;
        const height = (Math.sqrt(3) / 2) * size;
        const halfHeight = height / 2;

        this.drawTriangleRec(x, y, half, depth - 1);                        // Top
        this.drawTriangleRec(x - half / 2, y + halfHeight, half, depth - 1); // Bottom left
        this.drawTriangleRec(x + half / 2, y + halfHeight, half, depth - 1); // Bottom right
    }
}

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
  