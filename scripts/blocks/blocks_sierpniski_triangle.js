/**
 * @fileoverview
 * Defines the custom Blockly blocks and JavaScript code generators
 * for drawing the Sierpinski triangle fractal using p5.js.
 * 
 * This set of blocks supports two levels of abstraction for creating
 * the Sierpinski triangle:
 * 
 * - High-level block: `all_in_sierpniski_triangle` draws the full fractal using built-in logic.
 * - Mid-level blocks: Allow users to define the recursive drawing function manually,
 *   including function definition, base case handling, helper geometry variables,
 *   and recursive function calls for each triangle segment.
 */


// ================================
// Sierpniski Triangle blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "all_in_sierpniski_triangle",
        "message0": "Create Sierpinski Triangle at x: %1 y: %2 size: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "field_number", "name": "SIZE", "value": 400, "min": 0 },
            { "type": "field_number", "name": "DEPTH", "value": 4, "min": 0, "max": 10, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": `triangle_rec(p, x, y, size, depth);`,
        "helpUrl": ""
    },
    {
        "type": "triangle_rec_definition",
        "message0": "Describe how to draw Sierpinski Triangle",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `function triangle_rec(x, y, size, depth) {
  // Base case: if recursion depth is 0, draw a single triangle
  if (depth === 0) {
    drawSingleTriangle(p, x, y, size);
    return;
  }

  // Calculate geometry helper values
  const half = size / 2;
  const height = (Math.sqrt(3) / 2) * size;
  const halfHeight = height / 2;

  triangle_rec(x, y, half, depth - 1);                        // Top triangle
  triangle_rec(x - half / 2, y + halfHeight, half, depth - 1); // Bottom left triangle
  triangle_rec(x + half / 2, y + halfHeight, half, depth - 1); // Bottom right triangle
}`,
        "helpUrl": ""
    },
    {
        "type": "triangle_rec",
        "message0": "draw Sierpinski Triangle at x: %1 y: %2 size: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "field_number", "name": "SIZE", "value": 400, "min": 0 },
            { "type": "field_number", "name": "DEPTH", "value": 4, "min": 0, "max": 10, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `triangle_rec(x, y, size, depth);`,
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
        "colour": 345,
        "tooltip": `function triangle_rec(x, y, size, depth) {\n};`,
        "helpUrl": ""
    },
    {
        "type": "sierpinski_recursion_base_case",
        "message0": "if depth = 0 then draw triangle and return",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": `if (depth === 0) {
    drawSingleTriangle(p, x, y, size);
    return;
}`,
        "helpUrl": ""
    },
    {
        "type": "triangle_geometry_vars",
        "message0": "define triangle geometry helpers",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": `const half = size / 2;
const height = (Math.sqrt(3) / 2) * size;
const halfHeight = height / 2;`,
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
        "colour": 345,
        "tooltip": `triangle_rec(x, y, size, depth);`,
        "helpUrl": ""
    },
    {
        "type": "call_triangle_rec",
        "message0": "call triangle_rec at x: %1 y: %2 size: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "field_number", "name": "SIZE", "value": 400, "min": 0 },
            { "type": "field_number", "name": "DEPTH", "value": 4, "min": 0, "max": 10, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": `triangle_rec(x, y, size, depth);`,
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
javascript.javascriptGenerator.forBlock['all_in_sierpniski_triangle'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
    const size = block.getFieldValue('SIZE');
    const depth = block.getFieldValue('DEPTH');

    return `triangle_rec(p, ${x}, ${y}, ${size}, ${depth});\n`;
};

/**
 * Generates JavaScript code for the triangle_rec() function definition.
 * @param {Blockly.Block} block 
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['triangle_rec_definition'] = function (block) {
    return `function triangle_rec(x, y, size, depth) {
    // Base case: if recursion depth is 0, draw a single triangle
    if (depth === 0) {
      drawSingleTriangle(p, x, y, size);
      return;
    }
    
    // Calculate geometry helper values
    const half = size / 2;
    const height = (Math.sqrt(3) / 2) * size;
    const halfHeight = height / 2;
  
    triangle_rec(x, y, half, depth - 1);                        // Top triangle
    triangle_rec(x - half / 2, y + halfHeight, half, depth - 1); // Bottom left triangle
    triangle_rec(x + half / 2, y + halfHeight, half, depth - 1); // Bottom right triangle
  }\n\n`;
};


/**
 * Calls triangle_rec() function with given parameters
 * @param {Blockly.Block} block 
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['triangle_rec'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
    const size = block.getFieldValue('SIZE');
    const depth = block.getFieldValue('DEPTH');

    return `triangle_rec(${x}, ${y}, ${size}, ${depth});\n`;
};


/**
 * Generates a triangle_rec function definition with custom statements.
 * @param {Blockly.Block} block
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['define_triangle_rec_function'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `function triangle_rec(x, y, size, depth) {\n${statements}};\n\n`;
};

/**
 * Generates the base-case check for the sierpniski recursion.
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['sierpinski_recursion_base_case'] = function () {
    return `if (depth === 0) {
    drawSingleTriangle(p, x, y, size);
    return;
  }\n\n`;
};

/**
 * Generates JavaScript code for common geometry helpers (half, height, halfHeight).
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['triangle_geometry_vars'] = function () {
    return `const half = size / 2;
const height = (Math.sqrt(3) / 2) * size;
const halfHeight = height / 2;\n\n`;
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

