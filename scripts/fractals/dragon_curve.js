/**
 * Builds the sequence of left/right turns needed to generate the Dragon Curve.
 * Each turn is encoded as 0 (left turn) or 1 (right turn).
 *
 * @param {number} depth - The number of iterations/depth of recursion for the Dragon Curve
 * @returns {number[]} - An array of turns (0 = left, 1 = right)
 */
function buildTurnSequence(depth) {
    // Initialize the array that will store turn instructions
    const turns = [];

    // Repeat for each level of depth 
    for (let i = 0; i < depth; i++) {

        let next = [...turns]; // Copy the current sequence of turns
        next.reverse();  // Reverse the copy to mirror it
        next = next.map(t => (t === 0 ? 1 : 0));   // Flip each turn: 0 becomes 1, 1 becomes 0
        turns.push(0); // Add a new left turn (0) in the middle
        turns.push(...next); // Append the flipped mirrored sequence
    }

    return turns;
}

/**
 * Draws the Dragon Curve based on a given turn sequence.
 * Uses turtle-style movement (angle + translation).
 *
 * @param {number[]} turns - Sequence of 0 (left) and 1 (right) turns
 * @param {number} length - Length of each segment in the curve
 * @param {number} startX - Initial X position to begin drawing
 * @param {number} startY - Initial Y position to begin drawing
 */
function drawDragonCurve(p, turns, length, startX, startY) {
    // Move the drawing origin to the specified starting coordinates
    p.translate(startX, startY);

    // Keep track of the current direction of the curve
    let dir = 0; // Initial angle in degrees

    // Iterate through each turn instruction in the sequence
    for (let i = 0; i < turns.length; i++) {
        // Determine the angle change: 0 = left turn (90°), 1 = right turn (-90°)
        const angle = turns[i] === 0 ? 90 : -90;
        dir += angle; // Update the current direction

        // Calculate the endpoint of the next line segment
        const x2 = p.cos(dir) * length;
        const y2 = p.sin(dir) * length;

        // Draw a line from the current point to the new point
        p.line(0, 0, x2, y2);

        // Move the origin to the end of the drawn line for the next segment
        p.translate(x2, y2);
    }
}

