/**
 * @class Branch
 */

class Branch {
  /**
   * @param {p5.Vector} beginPoint begging point of the tree 
   * @param {number} len length of root
   * @param {number} [angle=0] 
   * @param {number} [height=0] current height of the tree
   * @param {number} [maxHeight=5] max height of the tree
   * @param {number} [weight=2] line weight
   * @param {number} [splitAmount=2] amount of new branches a branch splits into
   * @param {rotation} [rotation=1] rotation of branch
   */

  constructor(beginPoint, len, angle = 0, height = 0, 
              maxHeight = 5, weight = 2, splitAmount = 2, rotation = 1) {
    let newPoint = createVector(0, -len);
    newPoint.rotate(angle);
    let endPoint = p5.Vector.add(beginPoint, newPoint);
    this.len = len;
    this.begin = beginPoint;
    this.end = endPoint;
    this.angle = angle;
    this.height = height;
    this.maxHeight = maxHeight;
    this.branches = [];
    this.weight = weight;
    this.rotation = rotation;
    this.split(splitAmount); 
  }

  /**
   * Split branch into splitAmount new branches
   * @param {number} amount
   * @memberof Branch
   */
  split(amount) {
    for (let index = 1; index <= amount; index++) {
      if (this.height > this.maxHeight) {
        return;
      }
      const branchAngle = index <= amount / 2 ? index : amount - index + 1;
      this.createBranch(pow(-1, index) * this.rotation / branchAngle);
    }
  }

  /**
   * Create new branch
   * @param {number} angle
   * @memberof Branch
   */
  createBranch(angle) {
    push();
    let newBranch = new Branch(this.end, this.len * 0.67, this.angle - angle, this.height + 1, 
                              this.maxHeight, this.weight, this.splitAmount, this.rotation); 
    this.branches.push(newBranch);
    newBranch.draw();
    pop();
  }

  /**
   * Draw branch
   * @memberof Branch
   */
  draw() {
    translate(this.begin.x, this.begin.y);
    strokeWeight(this.weight);
    line(0, 0, this.end.x - this.begin.x, this.end.y - this.begin.y);
  }
}