/**
 * @fileoverview
 * Defines the custom Blockly blocks and JavaScript code generators
 * for drawing the Sierpinski triangle fractal using p5.js.
 * 
 * This set of blocks supports two levels of abstraction for creating
 * the Sierpinski triangle:
 * 
 * - High-level block: `draw_sierpinski_triangle` draws the full fractal using built-in logic.
 * - Mid-level blocks: Allow users to define the recursive drawing function manually,
 *   including function definition, base case handling, helper geometry variables,
 *   and recursive function calls for each triangle segment.
 */


// ================================
// Sierpniski Triangle blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "draw_sierpinski_triangle",
        "message0": "draw Sierpinski at x: %1 y: %2 size: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "field_number", "name": "SIZE", "value": 400, "min": 0},
            { "type": "field_number", "name": "DEPTH", "value": 4, "min": 0, "max": 10, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 285,
        "tooltip": "Draws a recursive Sierpinski triangle starting from a given point and size.",
        "helpUrl": ""
    },
    {
        "type": "define_triangle_rec_function",
        "message0": "define function triangle_rec(x, y, size, depth) %1 %2",
        "args0": [
            { "type": "input_dummy" },
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Defines the recursive triangle_rec function with x, y, size, depth as arguments.",
        "helpUrl": ""
    },
    {
        "type": "sierpinski_recursion_base_case",
        "message0": "if depth = 0 then draw triangle and return",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Checks if depth is 0 and draws the base triangle if true.",
        "helpUrl": ""
    },
    {
        "type": "triangle_geometry_vars",
        "message0": "define triangle geometry helpers",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Defines helper variables: half, height, and halfHeight for triangle recursion.",
        "helpUrl": ""
    },
    {
        "type": "call_triangle_rec_position",
        "message0": "call triangle_rec() for %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "POSITION",
                "options": [
                    ["top", "TOP"],
                    ["bottom left", "BOTTOM_LEFT"],
                    ["bottom right", "BOTTOM_RIGHT"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Calls triangle_rec with the correct arguments for the selected triangle part.",
        "helpUrl": ""
    },
    {
        "type": "call_triangle_rec",
        "message0": "call triangle_rec at x: %1 y: %2 size: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "field_number", "name": "SIZE", "value": 400, "min": 0},
            { "type": "field_number", "name": "DEPTH", "value": 4, "min": 0, "max": 10, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Calls triangle_rec to start the Sierpinski recursion with given parameters.",
        "helpUrl": ""
    } 
]);

// ================================
// Blockly → JavaScript Generator
// ================================

/**
 * Generates the full recursive Sierpinski triangle definition and calls it.
 * @param {Blockly.Block} block 
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['draw_sierpinski_triangle'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
    const size = block.getFieldValue('SIZE');
    const depth = block.getFieldValue('DEPTH');

    return `function triangle_rec(x, y, size, depth) {
    if (depth === 0) {
      drawSingleTriangle(p, x, y, size);
      return;
    }
  
    const half = size / 2;
    const height = (Math.sqrt(3) / 2) * size;
    const halfHeight = height / 2;
  
    triangle_rec(x, y, half, depth - 1);                        // Top triangle
    triangle_rec(x - half / 2, y + halfHeight, half, depth - 1); // Bottom left triangle
    triangle_rec(x + half / 2, y + halfHeight, half, depth - 1); // Bottom right triangle
  }
  
  triangle_rec(${x}, ${y}, ${size}, ${depth});
`;
};

/**
 * Generates a triangle_rec function definition with custom statements.
 * @param {Blockly.Block} block
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['define_triangle_rec_function'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `function triangle_rec(x, y, size, depth) {\n${statements}};\n`;
};

/**
 * Generates the base-case check for the sierpniski recursion.
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['sierpinski_recursion_base_case'] = function () {
    return `if (depth === 0) {
    drawSingleTriangle(p, x, y, size);
    return;
  }\n`;
};

/**
 * Generates JavaScript code for common geometry helpers (half, height, halfHeight).
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['triangle_geometry_vars'] = function () {
    return `const half = size / 2;
const height = (Math.sqrt(3) / 2) * size;
const halfHeight = height / 2;\n`;
};

/**
 * Generates a recursive triangle_rec() call based on selected position (top, bottom right or bottom left).
 * @param {Blockly.Block} block 
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['call_triangle_rec_position'] = function (block) {
    const pos = block.getFieldValue('POSITION');

    let code = '';
    switch (pos) {
        case 'TOP':
            code = `triangle_rec(x, y, half, depth - 1); // Top triangle\n`;
            break;
        case 'BOTTOM_LEFT':
            code = `triangle_rec(x - half / 2, y + halfHeight, half, depth - 1); // Bottom left triangle\n`;
            break;
        case 'BOTTOM_RIGHT':
            code = `triangle_rec(x + half / 2, y + halfHeight, half, depth - 1); // Bottom right triangle\n`;
            break;
    }

    return code;
};

/**
 * Generates a triangle_rec() call using user-specified parameters.
 * @param {Blockly.Block} block 
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['call_triangle_rec'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
    const size = block.getFieldValue('SIZE');    
    const depth = block.getFieldValue('DEPTH');

    return `triangle_rec(${x}, ${y}, ${size}, ${depth});\n`;
};

  