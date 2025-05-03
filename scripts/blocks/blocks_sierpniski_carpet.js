// ================================
// Sierpniski Carpet blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "all_in_sierpniski_carpet",
        "message0": "Create Sierpinski Carpet at x: %1 y: %2 size: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "field_number", "name": "SIZE", "value": 800, "min": 0 },
            { "type": "field_number", "name": "DEPTH", "value": 4, "min": 0, "max": 5, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": `drawCarpet(p, x, y, size, depth);`,
        "helpUrl": ""
    },
    {
        "type": "draw_carpet_definition",
        "message0": "Describe how to draw Sierpinski Carpet",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `function drawCarpet(x, y, size, depth) {
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

            // Recursive call: draw a smaller square at this position
            drawCarpet(x + i * newSize, y + j * newSize, newSize, depth - 1);
        }
    }
}`,
        "helpUrl": ""
    },
    {
        "type": "draw_carpet",
        "message0": "draw Sierpinski Carpet at x: %1 y: %2 size: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "field_number", "name": "SIZE", "value": 800, "min": 0 },
            { "type": "field_number", "name": "DEPTH", "value": 4, "min": 0, "max": 5, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `drawCarpet(x, y, size, depth);`,
        "helpUrl": ""
    },
    {
        "type": "define_draw_carpet",
        "message0": "define function drawCarpet(x, y, size, depth) %1 %2",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "DO" }
        ],
        "colour": 345,
        "tooltip": "function drawCarpet(x, y, size, depth) {\n}",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
    },
    {
        "type": "carpet_recursion_base_case",
        "message0": "if depth = 0, draw square and return",
        "colour": 345,
        "tooltip": "if (depth === 0) {\n  p.rect(x, y, size, size);\n  return;\n}",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
    },
    {
        "type": "carpet_divide_square",
        "message0": "set newSize to the current square size divided by 3",
        "colour": 345,
        "tooltip": "const newSize = size / 3;",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
    },
    {
        "type": "carpet_grid_loop",
        "message0": "Loop through the 3x3 grid %1 %2",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "DO" }
        ],
        "colour": 345,
        "tooltip": "for (let i = 0; i < 3; i++) {\n  for (let j = 0; j < 3; j++) {\n}\n}",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
    },
    {
        "type": "carpet_skip_center_square",
        "message0": "skip the center square",
        "colour": 345,
        "tooltip": "if (i === 1 && j === 1) continue;",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
    },
    {
        "type": "call_draw_carpet_recursive",
        "message0": "Draw a smaller square at the new position with one less depth",
        "colour": 345,
        "tooltip": "drawCarpet(x + i * newSize, y + j * newSize, newSize, depth - 1);",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
    },
    {
        "type": "call_draw_carpet",
        "message0": "call drawCarpet() at x: %1 y: %2 size: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "field_number", "name": "SIZE", "value": 800, "min": 0 },
            { "type": "field_number", "name": "DEPTH", "value": 4, "min": 0, "max": 5, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": `drawCarpet(x, y, size, depth);`,
        "helpUrl": ""
    },
])

// ================================
// Blockly → JavaScript Generator
// ================================

/**
 * Generates JavaScript code that calls the pre-defined drawCarpet() function
 * using the specified position (x, y), size, and recursion depth.
 * 
 * This block represents a high-level, "all-in-one" abstraction that hides the
 * implementation details and simply draws the full carpet fractal.
 *
 * @param {Blockly.Block} block - Block instance containing input values for X, Y, SIZE, and DEPTH.
 * @returns {string} - Code that calls drawCarpet(p, x, y, size, depth);
 */
javascript.javascriptGenerator.forBlock['all_in_sierpniski_carpet'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
    const size = block.getFieldValue('SIZE');
    const depth = block.getFieldValue('DEPTH');

    return `drawCarpet(p, ${x}, ${y}, ${size}, ${depth});\n\n`;
};

/**
 * Generates the complete implementation of the drawCarpet() function as a single block.
 * 
 * @returns {string} - Full JavaScript function definition for drawCarpet().
 */
javascript.javascriptGenerator.forBlock['draw_carpet_definition'] = function (block) {
    return `function drawCarpet(x, y, size, depth) {
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

            // Recursive call: draw a smaller square at this position
            drawCarpet(x + i * newSize, y + j * newSize, newSize, depth - 1);
        }
    }
}\n\n`;
};

/**
 * Generates code to call the drawCarpet() function with user-specified inputs.
 *
 * @param {Blockly.Block} block - Block instance containing inputs X, Y, SIZE, and DEPTH.
 * @returns {string} - Code that calls drawCarpet(x, y, size, depth);
 */
javascript.javascriptGenerator.forBlock['draw_carpet'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
    const size = block.getFieldValue('SIZE');
    const depth = block.getFieldValue('DEPTH');

    return `drawCarpet(${x}, ${y}, ${size}, ${depth});\n\n`;
};

/**
 * Generates the definition of the recursive drawCarpet() function.
 * Wraps the user-provided logic inside the function body.
 *
 * @param {Blockly.Block} block - Block with nested statements defining the algorithm.
 * @returns {string} - JavaScript function declaration for drawCarpet.
 */
javascript.javascriptGenerator.forBlock['define_draw_carpet'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `function drawCarpet(x, y, size, depth) {\n${statements}}\n`;
};

/**
 * Generates the base case for the recursive drawCarpet function.
 * If depth is 0, a square is drawn and recursion stops.
 *
 * @returns {string} - Base case: draw square and return.
 */
javascript.javascriptGenerator.forBlock['carpet_recursion_base_case'] = function () {
    return `if (depth === 0) {\n  p.rect(x, y, size, size);\n  return;\n}\n`;
};

/**
 * Generates code to divide the current square into 9 smaller squares.
 * Stores the size of each smaller square in a variable.
 *
 * @returns {string} - const newSize = size / 3;
 */
javascript.javascriptGenerator.forBlock['carpet_divide_square'] = function () {
    return `const newSize = size / 3;\n`;
};

/**
 * Generates a nested for-loop that iterates through a 3x3 grid.
 * This loop covers each of the 9 positions in the square subdivision.
 *
 * @param {Blockly.Block} block - Block with statements to run inside the loop.
 * @returns {string} - Nested for-loop over i and j (0 to 2).
 */
javascript.javascriptGenerator.forBlock['carpet_grid_loop'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `for (let i = 0; i < 3; i++) {\n  for (let j = 0; j < 3; j++) {\n${statements}  }\n}\n`;
};

/**
 * Generates a conditional that skips the center square of the 3x3 grid.
 * Used to create the "hole" in the Sierpiński Carpet.
 *
 * @returns {string} - if (i === 1 && j === 1) continue;
 */
javascript.javascriptGenerator.forBlock['carpet_skip_center_square'] = function () {
    return `if (i === 1 && j === 1) continue;\n`;
};

/**
 * Generates a recursive call to drawCarpet from within the grid loop.
 * Calls the function with updated coordinates, smaller size, and reduced depth.
 *
 * @returns {string} - Recursive call to drawCarpet.
 */
javascript.javascriptGenerator.forBlock['call_draw_carpet_recursive'] = function () {
    return `drawCarpet(x + i * newSize, y + j * newSize, newSize, depth - 1);\n`;
};

/**
 * Alternative block (similar to draw_carpet) for calling the barnsleyFern function.
 * Accepts user-provided inputs for position, size, and depth.
 *
 * @param {Blockly.Block} block - Block containing fields X, Y, SIZE, and DEPTH.
 * @returns {string} - Function call: drawCarpet(x, y, size, depth);
 */
javascript.javascriptGenerator.forBlock['call_draw_carpet'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
    const size = block.getFieldValue('SIZE');
    const depth = block.getFieldValue('DEPTH');

    return `drawCarpet(${x}, ${y}, ${size}, ${depth});\n\n`;
};