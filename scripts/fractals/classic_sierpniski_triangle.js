new p5((p) => {
  p.setup = function () {
    const canvas = p.createCanvas(800, 800);
    canvas.parent("canvas-area");
    p.noLoop();
    p.background(51);
    p.stroke(255);
    p.noFill();
  };

  p.draw = function () {
    const depth = 2;
    const size = 400;
    const x = p.width / 2;
    const y = p.height / 3;

    drawSierpinski(x, y, size, depth);
  };

  /**
   * Draws a full Sierpinski Triangle recursively
   * @param {number} x - X position of top vertex
   * @param {number} y - Y position of top vertex
   * @param {number} size - Length of each side
   * @param {number} depth - Recursion depth
   */
  function drawSierpinski(x, y, size, depth) {
    if (depth === 0) {
      drawTriangle(x, y, size);
      return;
    }

    const half = size / 2;
    const height = (Math.sqrt(3) / 2) * size;
    const halfHeight = height / 2;

    drawSierpinski(x, y, half, depth - 1); // top
    drawSierpinski(x - half / 2, y + halfHeight, half, depth - 1); // bottom left
    drawSierpinski(x + half / 2, y + halfHeight, half, depth - 1); // bottom right
  }

  /**
   * Draws an equilateral triangle
   */
  function drawTriangle(x, y, size) {
    const height = (Math.sqrt(3) / 2) * size;
    p.triangle(
      x, y,
      x - size / 2, y + height,
      x + size / 2, y + height
    );
  }
});
