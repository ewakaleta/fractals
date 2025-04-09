/**
 * @class Branch
 */

class Branch {
    /**
     * @param {p5} p reference to p5 instance
     * @param {p5.Vector} beginPoint begging point of the tree 
     * @param {number} len length of root
     * @param {number} [angle=0] 
     * @param {number} [height=0] current height of the tree
     * @param {number} [maxHeight=5] max height of the tree
     * @param {number} [weight=2] line weight
     * @param {number} [splitAmount=2] amount of new branches a branch splits into
     * @param {rotation} [rotation=1] rotation of branch
     */
  
    constructor(p, beginPoint, len, angle = 0, height = 0, 
                maxHeight = 5, weight = 2, splitAmount = 2, rotation = 1) {
      this.p = p
      let newPoint = p.createVector(0, -len);
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
        this.createBranch(Math.pow(-1, index) * this.rotation / branchAngle);
      }
    }
  
    /**
     * Create new branch
     * @param {number} angle
     * @memberof Branch
     */
    createBranch(angle) {
      this.p.push();
      let newBranch = new Branch(this.p, this.end, this.len * 0.67, this.angle - angle, this.height + 1, 
                                 this.maxHeight, this.weight, this.splitAmount, this.rotation); 
      this.branches.push(newBranch);
      newBranch.draw();
      this.p.pop();
    }
  
    /**
     * Draw branch
     * @memberof Branch
     */
    draw() {
      this.p.translate(this.begin.x, this.begin.y);
      this.p.strokeWeight(this.weight);
      this.p.line(0, 0, this.end.x - this.begin.x, this.end.y - this.begin.y);
    }
  }