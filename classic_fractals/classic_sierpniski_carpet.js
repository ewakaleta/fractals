function setup() {
  createCanvas(600, 600);
  noLoop();
  background(51);
  stroke(255);
  noFill();

  drawCarpet(0, 0, width, 5);
}

function drawCarpet(x, y, size, depth) {
  if (depth === 0) {
    rect(x, y, size, size);
    return;
  }

  const newSize = size / 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) continue;
      drawCarpet(x + i * newSize, y + j * newSize, newSize, depth - 1);
    }
  }
}