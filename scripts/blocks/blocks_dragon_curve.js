// ================================
// Dragon Curve blocks definition
// ================================

Blockly.defineBlocksWithJsonArray([
    {
        "type": "draw_dragon_curve",
        "message0": "draw Dragon Curve at X %1 Y %2 with depth %3 segment length %4",
        "args0": [
            { "type": "field_number", "name": "startX", "value": 600 },
            { "type": "field_number", "name": "startY", "value": 300 },
            { "type": "field_number", "name": "DEPTH", "value": 12, "min": 1, "max": 15 },
            { "type": "field_number", "name": "LENGTH", "value": 7, "min": 1, "max": 100 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": "Draws a Dragon Curve using the specified depth and segment length.",
        "helpUrl": ""
    },
    {
        "type": "enable_angle_mode",
        "message0": "enable angle mode (DEGREES)",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Sets the angle mode to DEGREES for p5.js.",
        "helpUrl": "https://p5js.org/reference/#/p5/angleMode"
    },
    {
        "type": "function_build_turn_sequence",
        "message0": "function buildTurnSequence() with depth %1",
        "args0": [
            { "type": "field_number", "name": "DEPTH", "value": 12, "min": 1, "max": 15 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Calls the buildTurnSequence() function with a given depth.",
        "helpUrl": ""
    },
    {
        "type": "function_draw_dragon_curve",
        "message0": "function drawDragonCurve() at X %1 Y %2 with depth %3 segment length %4",
        "args0": [
            { "type": "field_number", "name": "startX", "value": 600 },
            { "type": "field_number", "name": "startY", "value": 300 },
            { "type": "field_number", "name": "DEPTH", "value": 12, "min": 1, "max": 15 },
            { "type": "field_number", "name": "LENGTH", "value": 7, "min": 1, "max": 100 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Calls the drawDragonCurve() function using the specified depth and segment length.",
        "helpUrl": ""
    },

]);

// ================================
// Blockly → JavaScript Generator
// ================================

/**
 * Generates JavaScript to draw the Dragon Curve fractal.
 * It initializes angle mode, builds the turn sequence using the specified depth,
 * and then draws the curve using the provided length and starting coordinates.
 *
 * @param {Blockly.Block} block 
 * @returns {string}  
 */
javascript.javascriptGenerator.forBlock['draw_dragon_curve'] = function (block) {
    const startX = block.getFieldValue('startX');
    const startY = block.getFieldValue('startY');
    const depth = block.getFieldValue('DEPTH');
    const length = block.getFieldValue('LENGTH');

    return `p.angleMode(p.DEGREES);
const turns = buildTurnSequence(${depth});
drawDragonCurve(p, turns, ${length}, ${startX}, ${startY});\n\n`;
};

/**
 * Generates JavaScript to enable angle mode in degrees for p5.js.
 * This is essential for interpreting rotation directions correctly in Dragon Curve.
 *
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['enable_angle_mode'] = function () {
    return `p.angleMode(p.DEGREES);\n\n`;
};

/**
 * Generates JavaScript code to build the sequence of turns (left/right)
 * needed for the Dragon Curve fractal based on recursion depth.
 *
 * @param {Blockly.Block} block 
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['function_build_turn_sequence'] = function (block) {
    const depth = block.getFieldValue('DEPTH');

    return `// Define array for storing the turns
let turns = [];
// Repeat for each level of depth 
for (let i = 0; i < ${depth}; i++) {
    let next = [...turns]; // Copy the current sequence of turns
    next.reverse(); // Reverse the copy to mirror it
    next = next.map(t => (t === 0 ? 1 : 0)); // Flip each turn: 0 becomes 1, 1 becomes 0
    turns.push(0); // Add a new left turn (0) in the middle
    turns = turns.concat(next); // Append the flipped mirrored sequence
}\n\n`;
};

/**
 * Generates JavaScript code to draw the Dragon Curve fractal using a turn sequence.
 *
 * @param {Blockly.Block} block 
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['function_draw_dragon_curve'] = function (block) {
    const startX = block.getFieldValue('startX');
    const startY = block.getFieldValue('startY');
    const depth = block.getFieldValue('DEPTH');
    const length = block.getFieldValue('LENGTH');

    return `// Move the drawing origin to the specified starting coordinates
p.translate(${startX}, ${startY});

// Keep track of the current direction of the curve
let dir = 0; // Initial angle in degrees

// Iterate through each turn instruction in the sequence
for (let i = 0; i < turns.length; i++) {
    // Determine the angle change: 0 = left turn (90°), 1 = right turn (-90°)
    const angle = turns[i] === 0 ? 90 : -90;
    dir += angle; // Update the current direction

    // Calculate the endpoint of the next line segment
    const x2 = p.cos(dir) * ${length};
    const y2 = p.sin(dir) * ${length};

    // Draw a line from the current point to the new point
    p.line(0, 0, x2, y2);

    // Move the origin to the end of the drawn line for the next segment
    p.translate(x2, y2);
}\n\n`;
};

