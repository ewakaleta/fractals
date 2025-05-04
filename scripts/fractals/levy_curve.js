/**
   * Recursively draws the Levy C Curve between two points.
   * 
   * @param {p5} p - p5 instance
   * @param {number} x1 - starting x position
   * @param {number} y1 - starting y position
   * @param {number} x2 - ending x position
   * @param {number} y2 - ending y position
   * @param {number} depth - current recursion depth
   */
function drawLevyCurve(p, x1, y1, x2, y2, depth) {
    // Base case: if recursion depth is 0, then draw a line
    if (depth === 0) {
        p.line(x1, y1, x2, y2); 
    } else { 
        // Find midpoint and rotate by 45 degrees
        const midX = (x1 + x2) / 2 + (y2 - y1) / 2;
        const midY = (y1 + y2) / 2 - (x2 - x1) / 2;

        // Recurse on the two new segments
        drawLevyCurve(p, x1, y1, midX, midY, depth - 1);
        drawLevyCurve(p, midX, midY, x2, y2, depth - 1);
    }
}