// ================================
// Levy C Curve blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "all_in_levy_curve",
        "message0": "Create Levy C Curve on %1 with depth: %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "POSITION",
                "options": [
                    ["top of the canvas", "TOP"],
                    ["right side of the canvas", "RIGHT"],
                    ["bottom of the canvas", "BOTTOM"],
                    ["left side of the canvas", "LEFT"],
                ]
            },
            { "type": "field_number", "name": "DEPTH", "value": 12, "min": 1, "max": 16, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": `drawLevyCurve(p, x1, y1, x2, y2, depth);`,
        "helpUrl": ""
    },
    {
        "type": "draw_levy_curve_definition",
        "message0": "Describe how to draw the Levy C Curve",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `function drawLevyCurve(x1, y1, x2, y2, depth) {
    // Base case: if recursion depth is 0, then draw a line
    if (depth === 0) {
        p.line(x1, y1, x2, y2); 
    } else { // Otherwise:
        // Find midpoint and rotate by 45 degrees
        const midX = (x1 + x2) / 2 + (y2 - y1) / 2;
        const midY = (y1 + y2) / 2 - (x2 - x1) / 2;

        // Recurse on the two new segments
        drawLevyCurve(x1, y1, midX, midY, depth - 1);
        drawLevyCurve(midX, midY, x2, y2, depth - 1);
    }
};`,
        "helpUrl": ""
    },
    {
        "type": "draw_levy_curve",
        "message0": "Draw Levy C Curve on %1 with depth: %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "POSITION",
                "options": [
                    ["top of the canvas", "TOP"],
                    ["right side of the canvas", "RIGHT"],
                    ["bottom of the canvas", "BOTTOM"],
                    ["left side of the canvas", "LEFT"],
                ]
            },
            { "type": "field_number", "name": "DEPTH", "value": 12, "min": 1, "max": 16, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `drawLevyCurve(x1, y1, x2, y2, depth);`,
        "helpUrl": ""
    },
    {
        "type": "define_draw_levy_curve",
        "message0": "define function drawLevyCurve(p, x1, y1, x2, y2, depth) %1 %2",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "DO" }
        ],
        "colour": 345,
        "tooltip": "function drawLevyCurve(p, x1, y1, x2, y2, depth) {\n}",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
    },
    {
        "type": "levy_curve_recursion_base_case",
        "message0": "if depth = 0: draw line, else %1 %2",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "DO" }
        ],
        "colour": 345,
        "tooltip": "if (depth === 0) {\n  p.line(x1, y1, x2, y2);\n} else { \n }",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
    },
    {
        "type": "levy_curve_midpoint",
        "message0": "calculate midpoint rotated by 45°",
        "colour": 345,
        "tooltip": "const midX = (x1 + x2) / 2 + (y2 - y1) / 2;\nconst midY = (y1 + y2) / 2 - (x2 - x1) / 2;",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
    },
    {
        "type": "levy_curve_recursion_call",
        "message0": "recursively draw left and right segments",
        "colour": 345,
        "tooltip": "drawLevyCurve(p, x1, y1, midX, midY, depth - 1);\ndrawLevyCurve(p, midX, midY, x2, y2, depth - 1);",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
    },
    {
        "type": "call_draw_levy_curve",
        "message0": "Draw Levy C Curve on %1 with depth: %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "POSITION",
                "options": [
                    ["top of the canvas", "TOP"],
                    ["right side of the canvas", "RIGHT"],
                    ["bottom of the canvas", "BOTTOM"],
                    ["left side of the canvas", "LEFT"],
                ]
            },
            { "type": "field_number", "name": "DEPTH", "value": 12, "min": 1, "max": 16, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": `drawLevyCurve(x1, y1, x2, y2, depth);`,
        "helpUrl": ""
    }
])

// ================================
// Blockly → JavaScript Generator
// ================================

/**
 * Generates a high-level call to draw the Levy C Curve from a specified edge of the canvas.
 * The curve starts and ends at predefined positions (top, right, bottom, left) and runs at a given depth.
 * 
 * @param {Blockly.Block} block - Block containing dropdown input for POSITION and depth value.
 * @returns {string} - drawLevyCurve(...) function call using canvas-relative coordinates.
 */

javascript.javascriptGenerator.forBlock['all_in_levy_curve'] = function (block) {
    const pos = block.getFieldValue('POSITION');
    const depth = block.getFieldValue('DEPTH');
    let code = '';

    switch (pos) {
        case 'TOP':
            code = `drawLevyCurve(p, p.width / 4, p.height / 2, p.width * 3 / 4, p.height / 2, ${depth});\n`;
            break;
        case 'RIGHT':
            code = `drawLevyCurve(p, p.width / 2, p.height / 4, p.width / 2, p.height * 3 / 4, ${depth});\n`;
            break;
        case 'BOTTOM':
            code = `drawLevyCurve(p, p.width * 3 / 4, p.height / 2, p.width / 4, p.height / 2, ${depth});\n`;
            break;
        case 'LEFT':
            code = `drawLevyCurve(p, p.width / 2, p.height * 3 / 4, p.width / 2, p.height / 4, ${depth});\n`;
            break;
    }

    return code;
};

/**
 * Generates the complete implementation of the drawLevyCurve() function as a single block.
 * 
 * @param {Blockly.Block} block
 * @returns {string}
 */

javascript.javascriptGenerator.forBlock['draw_levy_curve_definition'] = function (block) {
    return `function drawLevyCurve(x1, y1, x2, y2, depth) {
    // Base case: if recursion depth is 0, then draw a line
    if (depth === 0) {
        p.line(x1, y1, x2, y2); 
    } else { // Otherwise:
        // Find midpoint and rotate by 45 degrees
        const midX = (x1 + x2) / 2 + (y2 - y1) / 2;
        const midY = (y1 + y2) / 2 - (x2 - x1) / 2;

        // Recurse on the two new segments
        drawLevyCurve(x1, y1, midX, midY, depth - 1);
        drawLevyCurve(midX, midY, x2, y2, depth - 1);
    }
}\n\n`;
};

/**
 * Generates a call to drawLevyCurve using the selected direction and depth.
 * Similar to `all_in_levy_curve`, but assumes a definition exists elsewhere.
 *
 * @param {Blockly.Block} block - Block with POSITION and DEPTH fields.
 * @returns {string} - Code that calls drawLevyCurve(x1, y1, x2, y2, depth)
 */
javascript.javascriptGenerator.forBlock['draw_levy_curve'] = function (block) {
    const pos = block.getFieldValue('POSITION');
    const depth = block.getFieldValue('DEPTH');
    let code = '';

    switch (pos) {
        case 'TOP':
            code = `drawLevyCurve(p.width / 4, p.height / 2, p.width * 3 / 4, p.height / 2, ${depth});\n`;
            break;
        case 'RIGHT':
            code = `drawLevyCurve(p.width / 2, p.height / 4, p.width / 2, p.height * 3 / 4, ${depth});\n`;
            break;
        case 'BOTTOM':
            code = `drawLevyCurve(p.width * 3 / 4, p.height / 2, p.width / 4, p.height / 2, ${depth});\n`;
            break;
        case 'LEFT':
            code = `drawLevyCurve(p.width / 2, p.height * 3 / 4, p.width / 2, p.height / 4, ${depth});\n`;
            break;
    }

    return code;
};

/**
 * Generates a custom user-defined function for drawing the Levy C Curve recursively.
 * Wraps user-created block statements inside the function body.
 * 
 * @param {Blockly.Block} block - Block with nested logic blocks in the DO input.
 * @returns {string} - JavaScript function declaration for drawLevyCurve().
 */
javascript.javascriptGenerator.forBlock['define_draw_levy_curve'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `function drawLevyCurve(x1, y1, x2, y2, depth) {\n${statements}}\n`;
};

/**
 * Generates the base case conditional for recursion.
 * Draws a line if depth === 0; otherwise, runs nested recursion steps.
 *
 * @param {Blockly.Block} block - Contains blocks for the recursive case in DO input.
 * @returns {string} - if/else block for handling recursion depth.
 */
javascript.javascriptGenerator.forBlock['levy_curve_recursion_base_case'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `if (depth === 0) {\n  p.line(x1, y1, x2, y2);\n} else {\n${statements}}\n`;
};

/**
 * Calculates the rotated midpoint between two endpoints of a line segment.
 * This midpoint is used to split the Levy C curve recursively.
 *
 * @returns {string} - Variable declarations for midX and midY using 45° rotation.
 */
javascript.javascriptGenerator.forBlock['levy_curve_midpoint'] = function () {
    return `// Compute midpoint rotated 45 degrees\n` +
        `const midX = (x1 + x2) / 2 + (y2 - y1) / 2;\n` +
        `const midY = (y1 + y2) / 2 - (x2 - x1) / 2;\n`;
};

/**
 * Generates recursive calls to drawLevyCurve for the left and right halves of the segment.
 * Each call uses a new midpoint and decreased depth.
 *
 * @returns {string} - Two recursive calls to drawLevyCurve.
 */
javascript.javascriptGenerator.forBlock['levy_curve_recursion_call'] = function () {
    return `// Recurse on both segments\n` +
        `drawLevyCurve(x1, y1, midX, midY, depth - 1);\n` +
        `drawLevyCurve(midX, midY, x2, y2, depth - 1);\n`;
};

/**
 * Alternative block (similar to draw_levy_curve) for calling the drawLevyCurve() function.
 * Intended for use when the function has already been defined via blocks.
 *
 * @param {Blockly.Block} block - Block containing POSITION and DEPTH inputs.
 * @returns {string} - Code that calls drawLevyCurve(x1, y1, x2, y2, depth)
 */
javascript.javascriptGenerator.forBlock['call_draw_levy_curve'] = function (block) {
    const pos = block.getFieldValue('POSITION');
    const depth = block.getFieldValue('DEPTH');
    let code = '';

    switch (pos) {
        case 'TOP':
            code = `drawLevyCurve(p.width / 4, p.height / 2, p.width * 3 / 4, p.height / 2, ${depth});\n`;
            break;
        case 'RIGHT':
            code = `drawLevyCurve(p.width / 2, p.height / 4, p.width / 2, p.height * 3 / 4, ${depth});\n`;
            break;
        case 'BOTTOM':
            code = `drawLevyCurve(p.width * 3 / 4, p.height / 2, p.width / 4, p.height / 2, ${depth});\n`;
            break;
        case 'LEFT':
            code = `drawLevyCurve(p.width / 2, p.height * 3 / 4, p.width / 2, p.height / 4, ${depth});\n`;
            break;
    }

    return code;
};