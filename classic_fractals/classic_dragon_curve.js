let turns = [];
let depth = 12;
let length = 20;

function setup() {
  const canvas = createCanvas(1300, 1300);
  canvas.parent("canvas-area");
  background(51);
  stroke(255);
  noFill();
  noLoop();

  angleMode(DEGREES);
}

function draw() {
  for (let i = 0; i < depth; i++) {
    let next = [...turns];
    next.reverse();
    next = next.map(t => (t === 0 ? 1 : 0));
    turns.push(0);
    turns = turns.concat(next);
  }

  translate(1000, 300);
  let dir = 0;

  for (let i = 0; i < turns.length; i++) {
    const angle = turns[i] === 0 ? 90 : -90;
    dir += angle;

    const x2 = cos(dir) * length;
    const y2 = sin(dir) * length;

    line(0, 0, x2, y2);
    translate(x2, y2);
  }
}