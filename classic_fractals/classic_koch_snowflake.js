let edges = [];
let depth = 4;
let length = 400;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent("canvas-area"); 
  noLoop();
  stroke(255);
  background(51);

  generateSnowflake();
}

function draw() {
  background(51);
  for (let edge of edges) {
    line(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
  }
}

function generateSnowflake() {
  const height = (Math.sqrt(3) / 2) * length;
  
  const ax = width / 2 - length / 2;
  const ay = height + 200;

  const bx = width / 2 + length / 2;
  const by = height + 200;

  const cx = width / 2;
  const cy = 200;

  const a = createVector(ax, ay);
  const b = createVector(bx, by);
  const c = createVector(cx, cy);

  edges = [];

  generateKochEdge(a, b, depth);
  generateKochEdge(b, c, depth);
  generateKochEdge(c, a, depth);
}

function generateKochEdge(a, b, depth) {
  if (depth === 0) {
    edges.push({ a, b });
    return;
  }

  const v = p5.Vector.sub(b, a).div(3);
  const p1 = p5.Vector.add(a, v);
  const p2 = p5.Vector.add(a, v.copy().mult(2));

  const peak = p5.Vector.add(p1, v.copy().rotate(PI / 3));

  generateKochEdge(a, p1, depth - 1);
  generateKochEdge(p1, peak, depth - 1);
  generateKochEdge(peak, p2, depth - 1);
  generateKochEdge(p2, b, depth - 1);
}
