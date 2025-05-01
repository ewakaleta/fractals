/**
 * Recursively draws the Cantor Set by dividing a horizontal line into thirds
 * and omitting the middle segment. Each recursion level draws smaller segments
 * below the previous one, visually building the fractal pattern.
 * 
 * The base case stops recursion when the depth reaches 0.
 * 
 * @param {p5} p - The p5.js instance used for drawing
 * @param {number} x - Starting x-coordinate of the line segment
 * @param {number} y - Y-coordinate of the line segment
 * @param {number} len - Length of the current segment
 * @param {number} depth - Remaining recursion depth
 */

function drawCantor(p, x, y, len, depth) {
    // Base case: if recursion depth is 0, return
    if (depth === 0) return;

    // Draw current line
    p.line(x, y, x + len, y);

    // Compute vertical spacing between levels
    const ySpacing = 20;
    const newLen = len / 3;

    // Recurse left and right (skip middle third)
    drawCantor(p, x, y + ySpacing, newLen, depth - 1);               // Left
    drawCantor(p, x + 2 * newLen, y + ySpacing, newLen, depth - 1); // Right
}