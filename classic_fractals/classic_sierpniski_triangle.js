function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent("canvas-area");
  noLoop();
  background(51);
  stroke(255);
  noFill();
}

function draw() {
  function drawSingleTriangle(x, y, size) {
    const height = (Math.sqrt(3) / 2) * size;
    triangle(
      x, y,
      x - size / 2, y + height,
      x + size / 2, y + height
    );
  }

  function triangle_rec(x, y, size, depth) {
    if (depth === 0) {
      drawSingleTriangle(x, y, size);
      return;
    }

    const half = size / 2;
    const height = (Math.sqrt(3) / 2) * size;
    const halfHeight = height / 2;

    triangle_rec(x, y, half, depth - 1);                          // Top
    triangle_rec(x - half / 2, y + halfHeight, half, depth - 1); // Bottom left
    triangle_rec(x + half / 2, y + halfHeight, half, depth - 1); // Bottom right
  }

  const initialSize = 400;
  const startY = (height - (Math.sqrt(3) / 2) * initialSize) / 2;
  triangle_rec(width / 2, startY, initialSize, 4);
}
