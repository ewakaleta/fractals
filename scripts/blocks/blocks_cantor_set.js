// ================================
// Cantor Set blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "draw_cantor_set",
        "message0": "draw Cantor Set at X: %1 Y: %2 with length: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "START_X" },
            { "type": "input_value", "name": "START_Y" },
            { "type": "field_number", "name": "LENGTH", "value": 400, "min": 1, "precision": 1 },
            { "type": "field_number", "name": "DEPTH", "value": 5, "min": 1, "max": 10, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": "Draws the Cantor Set fractal at a given starting Y position, line length, and recursion depth.",
        "helpUrl": ""
    },
    {
        "type": "define_draw_cantor_function",
        "message0": "define function drawCantor(p, x, y, len, depth) %1 %2",
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
        "tooltip": "Defines the recursive drawCantor function for drawing the Cantor Set.",
        "helpUrl": ""
    },
    {
        "type": "cantor_recursion_base_case",
        "message0": "if depth = 0 then return",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Base case for recursion: stops drawing when depth is 0.",
        "helpUrl": ""
    },
    {
        "type": "cantor_draw_line",
        "message0": "draw line from (x, y) to (x + len, y)",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Draws a horizontal line at the current level of the Cantor Set.",
        "helpUrl": ""
    },
    {
        "type": "cantor_geometry_vars",
        "message0": "define Cantor geometry variables",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Defines spacing between lines and calculates the new shortened line length.",
        "helpUrl": ""
    },
    {
        "type": "call_draw_cantor_position",
        "message0": "call drawCantor() for %1 line",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "BRANCH",
                "options": [
                    ["left", "LEFT"],
                    ["right", "RIGHT"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Calls drawCantor recursively for the selected side of the fractal.",
        "helpUrl": ""
    },
    {
        "type": "call_draw_cantor",
        "message0": "call cantor_branch() at X: %1 Y: %2 with length: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "START_X" },
            { "type": "input_value", "name": "START_Y" },
            { "type": "field_number", "name": "LENGTH", "value": 400, "min": 1, "precision": 1 },
            { "type": "field_number", "name": "DEPTH", "value": 5, "min": 1, "max": 10, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Calls the draw_cantor() at a given starting Y position, line length, and recursion depth.",
        "helpUrl": ""
    },
]);

// ================================
// Blockly → JavaScript Generator
// ================================

/**
* Generates recursive code to draw the Cantor Set.
* 
* @param {Blockly.Block} block
* @returns {string} 
*/
javascript.javascriptGenerator.forBlock['draw_cantor_set'] = function (block) {
    const startX = javascript.javascriptGenerator.valueToCode(block, 'START_X', javascript.Order.NONE) || '100';
    const startY = javascript.javascriptGenerator.valueToCode(block, 'START_Y', javascript.Order.NONE) || '600';
    const length = block.getFieldValue('LENGTH');
    const depth = block.getFieldValue('DEPTH');

    return `function drawCantor(p, x, y, len, depth) {
    // Recursion base case
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
  
  drawCantor(p, ${startX}, ${startY}, ${length}, ${depth});\n`;
};

/**
 * Generates JavaScript for defining the drawCantor function.
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['define_draw_cantor_function'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `function drawCantor(p, x, y, len, depth) {\n${statements}}\n\n`;
};

/**
 * Generates JavaScript for the base case of the Cantor Set recursion.
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['cantor_recursion_base_case'] = function () {
    return `if (depth === 0) return;\n`;
};

/**
* Generates code to draw a horizontal line from (x, y) to (x + len, y) for Cantor Set.
* @param {Blockly.Block} block
* @returns {string}
*/
javascript.javascriptGenerator.forBlock['cantor_draw_line'] = function () {
    return `p.line(x, y, x + len, y);\n`;
};

/**
 * Generates code to define geometry variables used in Cantor Set recursion.
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['cantor_geometry_vars'] = function () {
    return `const ySpacing = 20;
  const newLen = len / 3;\n`;
};

/**
 * Generates code for drawing the left or right recursive Cantor Set branch.
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['call_draw_cantor_position'] = function (block) {
    const branch = block.getFieldValue('BRANCH');
    let code = '';

    if (branch === 'LEFT') {
        code = `drawCantor(p, x, y + ySpacing, newLen, depth - 1); // Left\n`;
    } else if (branch === 'RIGHT') {
        code = `drawCantor(p, x + 2 * newLen, y + ySpacing, newLen, depth - 1); // Right\n`;
    }

    return code;
};

/**
* Generates inline recursive code to draw the Cantor Set.
* 
* @param {Blockly.Block} block
* @returns {string} 
*/
javascript.javascriptGenerator.forBlock['call_draw_cantor'] = function (block) {
    const startX = javascript.javascriptGenerator.valueToCode(block, 'START_X', javascript.Order.NONE) || '100';
    const startY = javascript.javascriptGenerator.valueToCode(block, 'START_Y', javascript.Order.NONE) || '600';
    const length = block.getFieldValue('LENGTH');
    const depth = block.getFieldValue('DEPTH');

    return `drawCantor(p, ${startX}, ${startY}, ${length}, ${depth});\n`;
};