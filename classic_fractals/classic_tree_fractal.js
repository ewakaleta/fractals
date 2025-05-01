let treeHeight = 120;
let maxDepth = 8;
let split = 4;       
let rotation = 60; 

function setup() {
  createCanvas(800, 600);
  background(255);
  stroke(0);
  angleMode(DEGREES);
  noLoop();

  translate(width / 2, height);
  drawBranch(treeHeight, 0);
}

function drawBranch(len, depth) {
  if (depth >= maxDepth) return;

  // Draw the current branch
  line(0, 0, 0, -len);
  translate(0, -len);

  // Determine angle between branches
  let angleStep = split > 1 ? rotation / (split - 1) : 0;
  let startAngle = -rotation / 2;

  for (let i = 0; i < split; i++) {
    push();
    rotate(startAngle + i * angleStep);
    drawBranch(len * 0.7, depth + 1);
    pop();
  }
}