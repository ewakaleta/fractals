// ================================
// Barnsley Fern blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "all_in_barnsley_fern",
        "message0": "Create Barnslet Fern starting at X: %1 and Y: %2 with depth: %3",
        "args0": [
            { "type": "field_number", "name": "START_X", "value": 0 },
            { "type": "field_number", "name": "START_Y", "value": 0 },
            { "type": "field_number", "name": "DEPTH", "value": 50000, "min": 1, "max": 1000000 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": `barnsleyFern(p, startX, startY, depth)`,
        "helpUrl": ""
    },
    {
        "type": "barnsley_fern_definition",
        "message0": "Describe how to draw Barnsley Fern",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `function barnsleyFern(startX, startY, iterations) {
    // Start at the initial point
    let x = startX;
    let y = startY;

    // Repeat the process 'iterations' times to build the fern shape
    for (let i = 0; i < iterations; i++) {
        // Draw the point (scaled to canvas)
        const px = p.map(x, -2.1820, 2.6558, 0, p.width);
        const py = p.map(y, 0, 9.9983, p.height, 0); 
        p.point(px, py);

        // Randomly choose one of four drawing rules
        const r = p.random(1);

        // Define the next point coordinates
        let nextX, nextY;

        // Based on the random number, apply a different rule:
        if (r < 0.01) {
            // Stem
            nextX = 0;
            nextY = 0.16 * y;
        } else if (r < 0.86) {
            // Successive leaflets
            nextX = 0.85 * x + 0.04 * y;
            nextY = -0.04 * x + 0.85 * y + 1.6;
        } else if (r < 0.93) {
            // Left leaflet
            nextX = 0.20 * x - 0.26 * y;
            nextY = 0.23 * x + 0.22 * y + 1.6;
        } else {
            // Right leaflet
            nextX = -0.15 * x + 0.28 * y;
            nextY = 0.26 * x + 0.24 * y + 0.44;
        }

        // Move to the next point to be drawn
        x = nextX;
        y = nextY;
    }
}`,
        "helpUrl": ""
    },
    {
        "type": "draw_barnsley_fern",
        "message0": "Draw Barnslet Fern starting at X: %1 and Y: %2 with depth: %3",
        "args0": [
            { "type": "field_number", "name": "START_X", "value": 0 },
            { "type": "field_number", "name": "START_Y", "value": 0 },
            { "type": "field_number", "name": "DEPTH", "value": 50000, "min": 1, "max": 1000000 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `barnsleyFern(startX, startY, depth)`,
        "helpUrl": ""
    },
    {
        "type": "define_barnsley_fern",
        "message0": "define function barnsleyFern(startX, startY, iterations) %1 %2",
        "args0": [
            { "type": "input_dummy" },
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "colour": 345,
        "tooltip": "function barnsleyFern(startX, startY, iterations) {\n}",
        "helpUrl": "",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "barnsley_set_starting_point",
        "message0": "Set the initial point (x,y)",
        "colour": 345,
        "tooltip": "let x = startX;\nlet y = startY;",
        "helpUrl": "",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "barnsley_fern_iteration",
        "message0": "repeat for each level up to 'iterations' %1 %2",
        "args0": [
            { "type": "input_dummy" },
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "colour": 345,
        "tooltip": "for (let i = 0; i < iterations; i++) {\n}",
        "helpUrl": "",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "barnsley_math_coordinates",
        "message0": "map and draw current point to canvas",
        "colour": 345,
        "tooltip": "const px = p.map(x, -2.1820, 2.6558, 0, p.width);\nconst py = p.map(y, 0, 9.9983, p.height, 0);\np.point(px, py);",
        "helpUrl": "",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "barnsley_random_probability",
        "message0": "generate random number r from 0 to 1",
        "colour": 345,
        "tooltip": "const r = p.random(1);",
        "helpUrl": "",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "barnsley_set_next_point",
        "message0": "set the next point (nextX, nextY)",
        "colour": 345,
        "tooltip": "let nextX, nextY;",
        "helpUrl": "",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "barnsley_drawing_rules",
        "message0": "apply drawing rules based on r",
        "colour": 345,
        "tooltip": `// Based on the random number, apply a different rule:
        if (r < 0.01) {
            // Stem
            nextX = 0;
            nextY = 0.16 * y;
        } else if (r < 0.86) {
            // Successive leaflets
            nextX = 0.85 * x + 0.04 * y;
            nextY = -0.04 * x + 0.85 * y + 1.6;
        } else if (r < 0.93) {
            // Left leaflet
            nextX = 0.20 * x - 0.26 * y;
            nextY = 0.23 * x + 0.22 * y + 1.6;
        } else {
            // Right leaflet
            nextX = -0.15 * x + 0.28 * y;
            nextY = 0.26 * x + 0.24 * y + 0.44;
        }`,
        "helpUrl": "",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "barnsley_move_point",
        "message0": "update current point (x, y) to (nextX, nextY)",
        "colour": 345,
        "tooltip": "x = nextX;\ny = nextY;",
        "helpUrl": "",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "call_barnsley_fern",
        "message0": "Call barnsleyFern() starting at X: %1 and Y: %2 with depth: %3",
        "args0": [
            { "type": "field_number", "name": "START_X", "value": 0 },
            { "type": "field_number", "name": "START_Y", "value": 0 },
            { "type": "field_number", "name": "DEPTH", "value": 50000, "min": 1, "max": 1000000 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `barnsleyFern(startX, startY, depth)`,
        "helpUrl": ""
    },
])

// ================================
// Blockly → JavaScript Generator
// ================================

/**
* Draws the Barnsley Fern by calling a built-in barnsleyFern() function.
* 
* @param {Blockly.Block} block
* @returns {string} 
*/
javascript.javascriptGenerator.forBlock['all_in_barnsley_fern'] = function (block) {
    const startX = block.getFieldValue('START_X');
    const startY = block.getFieldValue('START_Y');
    const depth = block.getFieldValue('DEPTH');

    return `barnsleyFern(p, ${startX}, ${startY}, ${depth})\n`;
};

/**
* Returns the definition of the barnsleyFern() function.
* 
* @returns {string} 
*/
javascript.javascriptGenerator.forBlock['barnsley_fern_definition'] = function (block) {
    return `function barnsleyFern(startX, startY, iterations) {
    // Start at the initial point
    let x = startX;
    let y = startY;

    for (let i = 0; i < iterations; i++) {
        // Draw the point (scaled to canvas)
        const px = p.map(x, -2.1820, 2.6558, 0, p.width);
        const py = p.map(y, 0, 9.9983, p.height, 0); 
        p.point(px, py);

        // Randomly choose one of four drawing rules
        const r = p.random(1);

        // Define the next point coordinates
        let nextX, nextY;

        // Based on the random number, apply a different rule:
        if (r < 0.01) {
            // Stem
            nextX = 0;
            nextY = 0.16 * y;
        } else if (r < 0.86) {
            // Successive leaflets
            nextX = 0.85 * x + 0.04 * y;
            nextY = -0.04 * x + 0.85 * y + 1.6;
        } else if (r < 0.93) {
            // Left leaflet
            nextX = 0.20 * x - 0.26 * y;
            nextY = 0.23 * x + 0.22 * y + 1.6;
        } else {
            // Right leaflet
            nextX = -0.15 * x + 0.28 * y;
            nextY = 0.26 * x + 0.24 * y + 0.44;
        }

        // Move to the next point to be drawn
        x = nextX;
        y = nextY;
    }
}\n\n`;
};

/**
* Draws the Barnsley Fern by calling barnsleyFern() function that is defined by the user.
* 
* @param {Blockly.Block} block
* @returns {string} 
*/
javascript.javascriptGenerator.forBlock['draw_barnsley_fern'] = function (block) {
    const startX = block.getFieldValue('START_X');
    const startY = block.getFieldValue('START_Y');
    const depth = block.getFieldValue('DEPTH');

    return `barnsleyFern(${startX}, ${startY}, ${depth})\n`;
};

/**
 * Generates JavaScript code that defines the barnsleyFern function.
 * Wraps user-provided logic inside the function body.
 *
 * @param {Blockly.Block} block - The block containing nested statements for the function body.
 * @returns {string} - Function definition for barnsleyFern(startX, startY, iterations).
 */
javascript.javascriptGenerator.forBlock['define_barnsley_fern'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `function barnsleyFern(startX, startY, iterations) {\n${statements}}\n`;
};

/**
 * Generates code to initialize the starting x and y coordinates for the fern.
 * Uses the input function arguments startX and startY.
 *
 * @returns {string} - let x = startX; let y = startY;
 */
javascript.javascriptGenerator.forBlock['barnsley_set_starting_point'] = function () {
    return `let x = startX;\nlet y = startY;\n`;
};

/**
 * Generates a for-loop that iterates for a given number of iterations.
 * Each iteration simulates one step in the fern's growth.
 *
 * @param {Blockly.Block} block - Contains nested blocks representing loop body logic.
 * @returns {string} - for (let i = 0; i < iterations; i++) { ... }
 */
javascript.javascriptGenerator.forBlock['barnsley_fern_iteration'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `for (let i = 0; i < iterations; i++) {\n${statements}}\n`;
};

/**
 * Maps the current (x, y) mathematical coordinates to canvas pixel positions.
 * Draws a single point at the mapped position.
 *
 * @returns {string} - Code that maps and plots (x, y) to (px, py) on canvas using p.point().
 */
javascript.javascriptGenerator.forBlock['barnsley_math_coordinates'] = function () {
    return `const px = p.map(x, -2.1820, 2.6558, 0, p.width);\n` +
        `const py = p.map(y, 0, 9.9983, p.height, 0);\n` +
        `p.point(px, py);\n`;
};

/**
 * Generates a random number r in the range [0, 1).
 * This value determines which transformation rule will be applied in this iteration.
 *
 * @returns {string} - const r = p.random(1);
 */
javascript.javascriptGenerator.forBlock['barnsley_random_probability'] = function () {
    return `const r = p.random(1);\n`;
};

/**
 * Declares local variables nextX and nextY, which will store the result of the transformation.
 *
 * @returns {string} - let nextX, nextY;
 */
javascript.javascriptGenerator.forBlock['barnsley_set_next_point'] = function () {
    return `let nextX, nextY;\n`;
};

/**
 * Applies one of four transformation rules to (x, y), based on the random number r.
 * These rules define the structure of the Barnsley Fern.
 *
 * @returns {string} - if/else block assigning nextX and nextY based on r.
 */
javascript.javascriptGenerator.forBlock['barnsley_drawing_rules'] = function () {
    return `// Based on the random number, apply a different rule:
        if (r < 0.01) {
            // Stem
            nextX = 0;
            nextY = 0.16 * y;
        } else if (r < 0.86) {
            // Successive leaflets
            nextX = 0.85 * x + 0.04 * y;
            nextY = -0.04 * x + 0.85 * y + 1.6;
        } else if (r < 0.93) {
            // Left leaflet
            nextX = 0.20 * x - 0.26 * y;
            nextY = 0.23 * x + 0.22 * y + 1.6;
        } else {
            // Right leaflet
            nextX = -0.15 * x + 0.28 * y;
            nextY = 0.26 * x + 0.24 * y + 0.44;
        }\n\n`;
};

/**
 * Updates x and y to the newly calculated nextX and nextY.
 * Prepares the point for the next iteration.
 *
 * @returns {string} - x = nextX; y = nextY;
 */
javascript.javascriptGenerator.forBlock['barnsley_move_point'] = function () {
    return `x = nextX;\ny = nextY;\n`;
};

/**
 * Alternative block (similar to draw_barnsley_fern) for calling the barnsleyFern function.
 * Accepts user-provided inputs for startX, startY, and depth.
 *
 * @param {Blockly.Block} block - The block with input fields for position and iterations.
 * @returns {string} - A call to barnsleyFern(startX, startY, depth);
 */
javascript.javascriptGenerator.forBlock['call_barnsley_fern'] = function (block) {
    const startX = block.getFieldValue('START_X');
    const startY = block.getFieldValue('START_Y');
    const depth = block.getFieldValue('DEPTH');

    return `barnsleyFern(${startX}, ${startY}, ${depth})\n`;
};