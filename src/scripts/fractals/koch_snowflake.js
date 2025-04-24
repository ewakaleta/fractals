/**
 * Calculates the 3 vertices of an equilateral triangle centered at a given point.
 * @param {p5} p - p5 instance
 * @param {number} centerX - X coordinate of center
 * @param {number} centerY - Y coordinate of center
 * @param {number} length - Side length of the triangle
 * @returns {{a: p5.Vector, b: p5.Vector, c: p5.Vector}} - Three triangle points
 */
function calculateEquilateralTriangle(p, centerX, centerY, length) {
  const height = (Math.sqrt(3) / 2) * length;

  const ax = centerX - length / 2;
  const ay = centerY + height / 3;

  const bx = centerX + length / 2;
  const by = centerY + height / 3;

  const cx = centerX;
  const cy = centerY - (2 * height) / 3;

  const a = p.createVector(ax, ay);
  const b = p.createVector(bx, by);
  const c = p.createVector(cx, cy);

  return { a, b, c };
}

/**
 * Draws the Koch snowflake given a center, side length, and recursion depth.
 * @param {p5} p - p5 instance
 * @param {number} centerX - X coordinate of snowflake center
 * @param {number} centerY - Y coordinate of snowflake center
 * @param {number} length - length of one triangle side
 * @param {number} depth - recursion depth
 */
function generateSnowflake(p, centerX, centerY, length, depth) {
  edges = [];

  const height = (Math.sqrt(3) / 2) * length;

  const ax = centerX - length / 2;
  const ay = centerY + height / 3;

  const bx = centerX + length / 2;
  const by = centerY + height / 3;

  const cx = centerX;
  const cy = centerY - (2 * height) / 3;

  const a = p.createVector(ax, ay);
  const b = p.createVector(bx, by);
  const c = p.createVector(cx, cy);

  generateKochEdge(p, a, b, depth);
  generateKochEdge(p, b, c, depth);
  generateKochEdge(p, c, a, depth);
}

/**
 * Recursively subdivides a line segment and adds edges to global array.
 * @param {p5} p - p5 instance
 * @param {p5.Vector} a - start point
 * @param {p5.Vector} b - end point
 * @param {number} depth - recursion level
 */
function generateKochEdge(p, a, b, depth) {
  if (depth === 0) {
    edges.push({ a, b });
    return;
  }

  const { p1, peak, p2 } = getKochPoints(p, a, b);

  generateKochEdge(p, a, p1, depth - 1);
  generateKochEdge(p, p1, peak, depth - 1);
  generateKochEdge(p, peak, p2, depth - 1);
  generateKochEdge(p, p2, b, depth - 1);
}

/**
 * Renders all edges in the global edge array
 * @param {p5} p - p5 instance
 */
function drawSnowflakeEdges(p) {
  for (const edge of edges) {
    p.line(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
  }
}

/**
 * Calculates 3 subdivision points (p1, peak, p2) for a Koch segment.
 * These are the points used to form the "bump" on the edge.
 *
 * @param {p5} p - p5 instance
 * @param {p5.Vector} a - Start point of the segment
 * @param {p5.Vector} b - End point of the segment
 * @returns {{p1: p5.Vector, peak: p5.Vector, p2: p5.Vector}} - Calculated intermediate points
 */
function getKochPoints(p, a, b) {
  const v = p5.Vector.sub(b, a).div(3);
  const p1 = p5.Vector.add(a, v);
  const p2 = p5.Vector.add(a, v.copy().mult(2));
  const peak = p5.Vector.add(p1, v.copy().rotate(p.PI / 3));
  return { p1, peak, p2 };
}