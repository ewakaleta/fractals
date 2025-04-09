/**
 * @fileoverview
 * Defines all structural Blockly blocks related to p5.js
 * and canvas setup and their JavaScript generator functions.
 *
 * - `setup`: p.setup() function logic
 * - `draw`: p.draw() function logic
 * - `create_canvas`: Canvas size configuration
 * - `set_background`: Background color (grayscale, hex, named)
 * - `set_background_rgb`: Background color (RGB values)
 * - `set_stroke`: Stroke color (grayscale, hex, named)
 * - `set_stroke_rgb`: Stroke color (RGB values)
 */

Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "setup",
        "tooltip": "",
        "helpUrl": "Setup actions for p5.js",
        "message0": "setup %1 do %2",
        "args0": [
            {
                "type": "input_dummy",
                "name": "setup"
            },
            {
                "type": "input_statement",
                "name": "do"
            }
        ],
        "nextStatement": null,
        "colour": 225
    },
    {
        "type": "create_canvas",
        "message0": "create canvas with width %1 and height %2",
        "args0": [
            {
                "type": "field_number",
                "name": "WIDTH",
                "value": 800
            },
            {
                "type": "field_number",
                "name": "HEIGHT",
                "value": 800
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 120,
        "tooltip": "Creates a canvas with specified dimensions.",
        "helpUrl": ""
    },
    {
        "type": "set_background",
        "message0": "set background color to %1",
        "args0": [
            {
                "type": "field_input",
                "name": "COLOR",
                "text": "51"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 120,
        "tooltip": "Set background color using grayscale, hex, named color, or variable.",
        "helpUrl": ""
    },
    {
        "type": "set_background_rgb",
        "message0": "set background color to R %1 G %2 B %3",
        "args0": [
            {
                "type": "field_number",
                "name": "R",
                "value": 51,
                "min": 0,
                "max": 255
            },
            {
                "type": "field_number",
                "name": "G",
                "value": 51,
                "min": 0,
                "max": 255
            },
            {
                "type": "field_number",
                "name": "B",
                "value": 51,
                "min": 0,
                "max": 255
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 120,
        "tooltip": "Sets the background color using RGB values.",
        "helpUrl": ""
    },
    {
        "type": "set_stroke",
        "message0": "set stroke color to %1",
        "args0": [
            {
                "type": "field_input",
                "name": "COLOR",
                "text": "255"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 120,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "set_stroke_rgb",
        "message0": "set stroke color to R %1 G %2 B %3",
        "args0": [
            {
                "type": "field_number",
                "name": "R",
                "value": 255,
                "min": 0,
                "max": 255
            },
            {
                "type": "field_number",
                "name": "G",
                "value": 255,
                "min": 0,
                "max": 255
            },
            {
                "type": "field_number",
                "name": "B",
                "value": 255,
                "min": 0,
                "max": 255
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 120,
        "tooltip": "Sets the stroke color using RGB values.",
        "helpUrl": ""
    },
    {
        "type": "draw",
        "message0": "draw %1 do %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "do"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 225,
        "tooltip": "Draw actions that run inside p5.js draw() loop.",
        "helpUrl": ""
    }
]);

// ================================
// Blockly → JavaScript Generators
// ================================

/**
 * Generates p5.js setup function wrapper.
 * @param {Blockly.Block} block - The setup block instance.
 * @returns {string} The p.setup() function with included statements.
 */
javascript.javascriptGenerator.forBlock['setup'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'do');
    return `p.setup = function() {\n${statements}};\n\n`;
};

/**
 * Generates p5.js draw function wrapper.
 * @param {Blockly.Block} block - The draw block instance.
 * @returns {string} The p.draw() function with included statements.
 */
javascript.javascriptGenerator.forBlock['draw'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'do');
    return `p.draw = function() {\n${statements}};\n\n`;
};

/**
 * Generates canvas creation code.
 * @param {Blockly.Block} block - The create_canvas block instance.
 * @returns {string} Code to create and attach a canvas.
 */
javascript.javascriptGenerator.forBlock['create_canvas'] = function (block) {
    const width = block.getFieldValue('WIDTH');
    const height = block.getFieldValue('HEIGHT');
    return `let myCanvas = p.createCanvas(${width}, ${height});
  myCanvas.parent("canvas-area");\n`;
};

/**
 * Generates background color setting using a single value.
 * @param {Blockly.Block} block - The set_background block instance.
 * @returns {string} Code to set background color.
 */
javascript.javascriptGenerator.forBlock['set_background'] = function (block) {
    const colorValue = block.getFieldValue('COLOR');
    return `p.background(${colorValue});\n`;
};

/**
 * Generates background color setting using RGB.
 * @param {Blockly.Block} block - The set_background_rgb block instance.
 * @returns {string} Code to set background using RGB.
 */
javascript.javascriptGenerator.forBlock['set_background_rgb'] = function (block) {
    const r = block.getFieldValue('R');
    const g = block.getFieldValue('G');
    const b = block.getFieldValue('B');
    return `p.background(${r}, ${g}, ${b});\n`;
};

/**
 * Generates stroke color setting using a single value.
 * @param {Blockly.Block} block - The set_stroke block instance.
 * @returns {string} Code to set stroke color.
 */
javascript.javascriptGenerator.forBlock['set_stroke'] = function (block) {
    const colorValue = block.getFieldValue('COLOR');
    return `p.stroke(${colorValue});\n`;
};

/**
 * Generates stroke color setting using RGB.
 * @param {Blockly.Block} block - The set_stroke_rgb block instance.
 * @returns {string} Code to set stroke using RGB.
 */
javascript.javascriptGenerator.forBlock['set_stroke_rgb'] = function (block) {
    const r = block.getFieldValue('R');
    const g = block.getFieldValue('G');
    const b = block.getFieldValue('B');
    return `p.stroke(${r}, ${g}, ${b});\n`;
};

