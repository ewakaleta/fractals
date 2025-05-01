// ================================
// Dragon Curve blocks definition
// ================================

Blockly.defineBlocksWithJsonArray([
    {
        "type": "draw_dragon_curve",
        "message0": "Create Dragon Curve at X %1 Y %2 with depth %3 segment length %4",
        "args0": [
            { "type": "field_number", "name": "startX", "value": 600 },
            { "type": "field_number", "name": "startY", "value": 300 },
            { "type": "field_number", "name": "DEPTH", "value": 12, "min": 1, "max": 15 },
            { "type": "field_number", "name": "LENGTH", "value": 7, "min": 1, "max": 100 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": `p.angleMode(p.DEGREES);\nconst turns = buildTurnSequence(12);\ndrawDragonCurve(p, turns, 7, 600, 300);`,
        "helpUrl": ""
    },
    {
        "type": "function_build_turn_sequence",
        "message0": "Build the Dragon Curve turning pattern with depth %1",
        "args0": [
            { "type": "field_number", "name": "DEPTH", "value": 12, "min": 1, "max": 15 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `// Define array for storing the turns
let turns = [];

// Repeat for each level of depth
for (let i = 0; i < 12; i++) {
    let next = [...turns]; // Copy the current sequence of turns
    next.reverse(); // Reverse the copy to mirror it
    next = next.map(t => (t === 0 ? 1 : 0)); // Flip each turn: 0 becomes 1, 1 becomes 0
    turns.push(0); // Add a new left turn (0) in the middle
    turns = turns.concat(next); // Append the flipped mirrored sequence
}`,
        "helpUrl": ""
    },
    {
        "type": "function_draw_dragon_curve",
        "message0": "Draw the dragon curve at X %1 Y %2 with depth %3 and segment length %4",
        "args0": [
            { "type": "field_number", "name": "startX", "value": 600 },
            { "type": "field_number", "name": "startY", "value": 300 },
            { "type": "field_number", "name": "DEPTH", "value": 12, "min": 1, "max": 15 },
            { "type": "field_number", "name": "LENGTH", "value": 7, "min": 1, "max": 100 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `// Move the drawing origin to the starting coordinates
p.translate(startX, startY);

let dir = 0; // Current direction in degrees

// Iterate through each turn instruction in the sequence
for (let i = 0; i < turns.length; i++) {
  // Turn left (0 → +90°) or right (1 → -90°)
  const angle = turns[i] === 0 ? 90 : -90;
  dir += angle;

  // Calculate next line segment
  const x2 = p.cos(dir) * 7;
  const y2 = p.sin(dir) * 7;

  // Draw segment and move forward
  p.line(0, 0, x2, y2);
  p.translate(x2, y2);
}`,
        "helpUrl": ""
    },
    {
        "type": "define_turns_array",
        "message0": "define empty 'turns' array",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": "let turns = [];",
        "helpUrl": ""
    },
    {
        "type": "dragon_depth_loop",
        "message0": "Repeat for each level of depth: %1",
        "args0": [
            {
                "type": "field_number", "name": "DEPTH", "value": 12, "min": 1, "max": 20
            }
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": `for (let i = 0; i < depth; i++) {\n}`,
        "helpUrl": ""
    },
    {
        "type": "next_turn_sequence",
        "message0": "Mirror, flip the current turn sequence, then add a left turn",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": `let next = [...turns];
next.reverse();
next = next.map(t => (t === 0 ? 1 : 0));
turns.push(0);
turns = turns.concat(next);`,
        "helpUrl": ""
    },
    {
        type: "move_starting_point",
        message0: "Move the starting point to startX: %1 startY: %2",
        args0: [
            { type: "field_number", name: "START_X", value: 600 },
            { type: "field_number", name: "START_Y", value: 300 },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 345,
        tooltip: `p.translate(600, 300);`,
        helpUrl: "",
    },
    {
        type: "set_start_degree",
        message0: "Set the starting degree to 0",
        previousStatement: null,
        nextStatement: null,
        colour: 345,
        tooltip: `let dir = 0;`,
        helpUrl: "",
    },
    {
        "type": "dragon_turn_loop",
        "message0": "For each turn in the sequence %1 %2",
        "args0": [
            { "type": "input_dummy" },
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": "for (let i = 0; i < turns.length; i++) {\n}",
        "helpUrl": ""
    },
    {
        "type": "dragon_update_direction",
        "message0": "Update direction based on current turn",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": "const angle = turns[i] === 0 ? 90 : -90;\ndir += angle;",
        "helpUrl": ""
    },
    {
        "type": "dragon_draw_segment",
        "message0": "Draw next segment of length: %1 and move forward",
        "args0": [
            { "type": "field_number", "name": "LENGTH", "value": 7, "min": 1, "max": 100 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": "const x2 = p.cos(dir) * length;\nconst y2 = p.sin(dir) * length;\np.line(0, 0, x2, y2);\np.translate(x2, y2);",
        "helpUrl": ""
    }



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

    return `// Move the drawing origin to the starting coordinates
p.translate(${startX}, ${startY});

let dir = 0; // Current direction in degrees

// Iterate through each turn instruction in the sequence
for (let i = 0; i < turns.length; i++) {
  // Turn left (0 → +90°) or right (1 → -90°)
  const angle = turns[i] === 0 ? 90 : -90;
  dir += angle;

  // Calculate next line segment
  const x2 = p.cos(dir) * 7;
  const y2 = p.sin(dir) * 7;

  // Draw segment and move forward
  p.line(0, 0, x2, y2);
  p.translate(x2, y2);
}\n\n`;
};

/**
 * Generates code to define a global edges array used for storing the Dragon Curve turns.
 *
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['define_turns_array'] = function () {
    return `let turns = [];\n\n`;
};

/**
 * Generates JavaScript code for repeating a set of instructions for each level of depth.
 * Creates a for-loop that runs from i = 0 to i < depth.
 *
 * @param {Blockly.Block} block - The block instance.
 * @returns {string} - JavaScript code that wraps user statements inside the double loop.
 */
javascript.javascriptGenerator.forBlock['dragon_depth_loop'] = function (block) {
    const depth = block.getFieldValue('DEPTH');
    const innerCode = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `for (let i = 0; i < ${depth}; i++) {
  ${innerCode}
}\n\n`;
};


/**
 * Generates JavaScript code for updating the Dragon Curve turn sequence.
 *
 * This code mirrors and inverts the current turn sequence to generate the next level
 * of the Dragon Curve. It performs the following steps:
 * 1. Copies the current `turns` array.
 * 2. Reverses the copy to mirror the sequence.
 * 3. Inverts each turn (left ↔ right).
 * 4. Adds a left turn (0) in the middle.
 * 5. Appends the modified mirrored sequence to the original `turns`.
 *
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['next_turn_sequence'] = function () {
    return `let next = [...turns];
next.reverse();
next = next.map(t => (t === 0 ? 1 : 0));
turns.push(0);
turns = turns.concat(next);\n\n`;
};

/**
 * Generates JavaScript code to move the origin to a specific starting point using p.translate.
 * This is typically used to set the initial drawing position for the dragon curve.
 *
 * @param {Blockly.Block} block - The block instance.
 * @returns {string} - JavaScript code that wraps user statements inside the double loop.
 */
javascript.javascriptGenerator.forBlock['move_starting_point'] = function (block) {
    const startX = block.getFieldValue('START_X');
    const startY = block.getFieldValue('START_Y');

    return `p.translate(${startX}, ${startY});\n\n`;
};


/**
 * Generates JavaScript code to intialize the direction 'dir' variable and set it to 0.
 *
 * @returns {string} - JavaScript code that wraps user statements inside the double loop.
 */
javascript.javascriptGenerator.forBlock['set_start_degree'] = function (block) {
    return `let dir = 0;\n\n`;
};

/**
 * Generates JavaScript code for looping through each turn in the Dragon Curve sequence.
 * Wraps user-provided statements inside a for-loop that iterates over the `turns` array.
 *
 * @param {Blockly.Block} block 
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['dragon_turn_loop'] = function (block) {
    const innerCode = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `for (let i = 0; i < turns.length; i++) {\n${innerCode}}\n`;
};

/**
 * Generates JavaScript code to update the drawing direction based on the current turn.
 * A value of 0 represents a left turn (+90°), and 1 represents a right turn (-90°).
 * Updates the `dir` variable to reflect the new orientation.
 *
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['dragon_update_direction'] = function () {
    return `const angle = turns[i] === 0 ? 90 : -90;\ndir += angle;\n`;
};

/**
 * Generates JavaScript code to draw a line segment in the current direction
 * and move the drawing origin to the end of that segment.
 *
 * Uses `p.cos(dir)` and `p.sin(dir)` to calculate the direction vector,
 * draws a line of fixed length (7 pixels), and translates the origin forward.
 *
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['dragon_draw_segment'] = function () {
    const length = block.getFieldValue('LENGTH');
    return `const x2 = p.cos(dir) * ${length};
const y2 = p.sin(dir) * ${length};
p.line(0, 0, x2, y2);
p.translate(x2, y2);\n`;
};
