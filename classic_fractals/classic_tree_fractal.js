class Branch {
  constructor(p, beginPoint, len, angle = 0, height = 0, maxHeight = 5, splitAmount = 2, rotation = 1) {
    this.p = p;
    this.begin = beginPoint;
    this.len = len;
    this.angle = angle;
    this.height = height;
    this.maxHeight = maxHeight;
    this.splitAmount = splitAmount;
    this.rotation = rotation;
    this.branches = [];

    const newPoint = p.createVector(0, -len).rotate(angle);
    this.end = p5.Vector.add(this.begin, newPoint);
  }

  isMaxDepth() {
    return this.height >= this.maxHeight;
  }

  split() {
    if (this.isMaxDepth()) return [];

    const children = [];
    for (let index = 1; index <= this.splitAmount; index++) {
      const branchAngle = index <= this.splitAmount / 2 ? index : this.splitAmount - index + 1;
      const angleOffset = Math.pow(-1, index) * this.rotation / branchAngle;
      const newBranch = new Branch(
        this.p,
        this.end,
        this.len * 0.67,
        this.angle - angleOffset,
        this.height + 1,
        this.maxHeight,
        this.splitAmount,
        this.rotation
      );
      children.push(newBranch);
    }

    this.branches = children;
    return children;
  }

  draw() {
    this.p.push();
    this.p.translate(this.begin.x, this.begin.y);
    this.p.line(0, 0, this.end.x - this.begin.x, this.end.y - this.begin.y);
    this.p.pop();
  }

  drawTree() {
    this.draw();
    for (const child of this.branches) {
      child.drawTree();
    }
  }
}

function setup() {
  const myCanvas = createCanvas(800, 800);
  myCanvas.parent("canvas-area");
  noLoop();
  background(51);
  stroke(255);
}

function draw() {
  const root = new Branch(this, createVector(width / 2, height), 200, 0, 0, 5, 2, 0.8);

  function build(branch) {
    if (!branch.isMaxDepth()) {
      const children = branch.split();
      children.forEach(build);
    }
  }

  build(root);
  root.drawTree();
}
