/**
 * Recursively draws a branching tree structure.
 * @param {p5} p - The p5.js instance used for drawing.
 * @param {number} length - The length of the current branch.
 * @param {number} depth - The current recursion level.
 */
function drawBranch(p, length, depth, maxDepth, split, rotation) {
  if (depth >= maxDepth) return;

  // Draw the current branch
  p.line(0, 0, 0, -length);
  p.translate(0, -length);

  // Determine angle between branches
  let angleStep = split > 1 ? rotation / (split - 1) : 0;
  let startAngle = -rotation / 2;

  // Recursively draw each sub-branch
  for (let i = 0; i < split; i++) {
    p.push();
    p.rotate(startAngle + i * angleStep);
    drawBranch(p, length * 0.7, depth + 1, maxDepth, split, rotation);

    p.pop();
  }
}