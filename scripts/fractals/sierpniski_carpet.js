/**
 * Recursively draws a Sierpinski Carpet
 * 
 * @param {number} x - Top-left x position
 * @param {number} y - Top-left y position
 * @param {number} size - Size of the current square
 * @param {number} depth - Recursion depth
 */

function drawCarpet(p, x, y, size, depth) {
    // Base case: if recursion depth is 0, draw the smallest square
    if (depth === 0) {
        p.rect(x, y, size, size);
        return;
    }

    // Divide the current square into 9 equal parts
    const newSize = size / 3;

    // Loop through the 3x3 grid
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Skip the center square
            if (i === 1 && j === 1) continue; 

            // Recursive call: draw a smaller square at this position with one less depth
            drawCarpet(p, x + i * newSize, y + j * newSize, newSize, depth - 1);
        }
    }
}