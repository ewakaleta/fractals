function setup() {
  createCanvas(800, 800);
  background(51);
  stroke(255);
  noFill();
  strokeWeight(1);

  const depth = 16;

  drawLevyCurve(width / 4, height / 2, width * 3 / 4, height / 2, depth); //canvas top
}

function drawLevyCurve(x1, y1, x2, y2, depth) {
  if (depth === 0) {
    line(x1, y1, x2, y2); // Base case: just draw a line
  } else {
    const midX = (x1 + x2) / 2 + (y2 - y1) / 2;
    const midY = (y1 + y2) / 2 - (x2 - x1) / 2;

    drawLevyCurve(x1, y1, midX, midY, depth - 1);
    drawLevyCurve(midX, midY, x2, y2, depth - 1);
  }
}