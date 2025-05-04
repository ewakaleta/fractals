function setup() {
    createCanvas(800, 800);
    background(51);
    stroke(255);
    noFill();
    strokeWeight(1);
  
    const depth = 16; // Control the recursion depth
  
    // Draw the initial curve from point (x1, y1) to (x2, y2)
    drawLevyCurve(width / 4, height / 2, width * 3 / 4, height / 2, depth); //canvas top
    // drawLevyCurve(width / 2, height / 4, width / 2, height * 3 / 4, depth); //right side
    // drawLevyCurve(width * 3 / 4, height / 2, width / 4, height / 2, depth); //bottom
    // drawLevyCurve(width / 2, height * 3 / 4, width / 2, height / 4, depth); //left side
}
  
  /**
   * Recursively draws the Levy C Curve between two points.
   * 
   * @param {number} x1 - starting x position
   * @param {number} y1 - starting y position
   * @param {number} x2 - ending x position
   * @param {number} y2 - ending y position
   * @param {number} depth - current recursion depth
   */
  function drawLevyCurve(x1, y1, x2, y2, depth) {
    if (depth === 0) {
      line(x1, y1, x2, y2); // Base case: just draw a line
    } else {
      // Find midpoint and rotate by 45 degrees
      const midX = (x1 + x2) / 2 + (y2 - y1) / 2;
      const midY = (y1 + y2) / 2 - (x2 - x1) / 2;
  
      // Recurse on the two new segments
      drawLevyCurve(x1, y1, midX, midY, depth - 1);
      drawLevyCurve(midX, midY, x2, y2, depth - 1);
    }
  }
  