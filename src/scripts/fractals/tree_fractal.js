import p5 from 'p5';

/**
 * @class Branch
 * Recursive branch structure used to draw tree-like fractals.
 */
class Branch {
  /**
   * @param {p5} p - p5 instance
   * @param {p5.Vector} beginPoint - starting point
   * @param {number} len - length of branch
   * @param {number} angle - current angle
   * @param {number} height - current recursion depth
   * @param {number} maxHeight - max recursion depth
   * @param {number} splitAmount - number of children
   * @param {number} rotation - spread between branches
   */
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

  /**
   * Checks if max recursion depth has been reached
   * @returns {boolean}
   */
  isMaxDepth() {
    return this.height >= this.maxHeight;
  }

  /**
   * Splits the branch into child branches
   * @returns {Branch[]} Array of child branches
   */
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

  /**
   * Draws one branch (uses global stroke weight)
   */
  draw() {
    this.p.push();
    this.p.translate(this.begin.x, this.begin.y);
    this.p.line(0, 0, this.end.x - this.begin.x, this.end.y - this.begin.y);
    this.p.pop();
  }

  /**
   * Recursively draws the entire tree
   */
  drawTree() {
    this.draw();
    for (const child of this.branches) {
      child.drawTree();
    }
  }
}

export default Branch;
