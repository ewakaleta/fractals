let depth = 6;
let startY = 50;
let length = 600;

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent("canvas-area");
  background(51);
  stroke(255);
  noLoop();

  drawCantor(100, startY, length, depth);
}

function drawCantor(x, y, len, depth) {
  if (depth === 0) return;

  line(x, y, x + len, y);

  const ySpacing = 20;

  const newLen = len / 3;
  drawCantor(x, y + ySpacing, newLen, depth - 1);              
  drawCantor(x + 2 * newLen, y + ySpacing, newLen, depth - 1); 
}
