// ================================
// Sierpniski Triangle blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "draw_koch_snowflake",
        "message0": "draw Koch snowflake at x: %1 y: %2 with length: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "input_value", "name": "LENGTH" },
            {
                "type": "field_number",
                "name": "DEPTH",
                "value": 3,
                "min": 0,
                "max": 6,
                "precision": 1
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 285,
        "tooltip": "Draws a Koch snowflake at a given position, with side length and recursion depth.",
        "helpUrl": ""
    },
    {
        "type": "define_edges_array",
        "message0": "define empty edges array",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Declares an empty array called 'edges' to store snowflake segments.",
        "helpUrl": ""
    },
    {
        "type": "generate_snowflake",
        "message0": "function generateSnowflake(x, y, length, depth)",
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Defines the generateSnowflake function using variables x, y, length, and depth.",
        "helpUrl": ""
    },
    {
        "type": "generate_koch_edge",
        "message0": "function generateKochEdge(a, b, depth)",
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Defines recursive Koch edge generation",
        "helpUrl": ""
    },
    {
        "type": "draw_snowflake_edges",
        "message0": "function drawSnowflakeEdges()",
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Defines function to draw all snowflake edges from global edge list",
        "helpUrl": ""
    },
    {
        "type": "call_generate_snowflake",
        "message0": "generate Koch snowflake at x: %1 y: %2 with length: %3 and depth: %4",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "input_value", "name": "LENGTH" },
            {
                "type": "field_number",
                "name": "DEPTH",
                "value": 3,
                "min": 0,
                "max": 6,
                "precision": 1
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Calls generateSnowflake with user-defined values and draws the result.",
        "helpUrl": ""
    },
    {
        "type": "define_generate_snowflake",
        "message0": "define function generateSnowflake(x, y, length, depth) %1 %2",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "DO" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 0,
        "tooltip": "Defines the generateSnowflake function to create the full Koch snowflake.",
        "helpUrl": ""
    },
    {
        "type": "define_generate_koch_edge",
        "message0": "define function generateKochEdge(p, a, b, depth) %1 %2",
        "args0": [
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "DO" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 0,
        "tooltip": "Defines the generateKochEdge recursive function.",
        "helpUrl": ""
    },
    {
        "type": "calculate_equilateral_triangle",
        "message0": "calculate equilateral triangle corners from x, y, length",
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 0,
        "tooltip": "Calculates a, b, c using predefined x, y, and length variables",
        "helpUrl": ""
    },
    {
        "type": "koch_recursion_base_case",
        "message0": "if depth is 0 then push edge and return",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 0,
        "tooltip": "Handles the base case for Koch recursion by pushing an edge and returning.",
        "helpUrl": ""
    },
    {
        "type": "koch_calculate_subdivision_points",
        "message0": "calculate subdivision points p1, peak, p2 from a → b",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 0,
        "tooltip": "Calculates three subdivision points used for the Koch fractal segment using getKochPoints().",
        "helpUrl": ""
    },
    {
        "type": "call_generate_koch_edge_position",
        "message0": "call generateKochEdge() for %1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "POSITION",
            "options": [
              ["triangle side: a → b", "AB"],
              ["triangle side: b → c", "BC"],
              ["triangle side: c → a", "CA"],
              ["sub-segment: a → p1 (left third)", "LEFT"],
              ["sub-segment: p1 → peak (left bump)", "LEFT_BUMP"],
              ["sub-segment: peak → p2 (right bump)", "RIGHT_BUMP"],
              ["sub-segment: p2 → b (right third)", "RIGHT"]
            ]
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 0,
        "tooltip": "Calls generateKochEdge() for one triangle side or one sub-segment during recursion.",
        "helpUrl": ""
      }

]);

// ================================
// Blockly → JavaScript Generator
// ================================

/**
 * Generates the code for all-in-one koch snowflake block.
 *
 * @param {Blockly.Block} block
 * @returns {string} JavaScript code 
 */
javascript.javascriptGenerator.forBlock['draw_koch_snowflake'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
    const length = javascript.javascriptGenerator.valueToCode(block, 'LENGTH', javascript.Order.NONE) || '0';
    const depth = block.getFieldValue('DEPTH');

    return `generateSnowflake(p, ${x}, ${y}, ${length}, ${depth});
drawSnowflakeEdges(p);\n`;
};

/**
 * Generates code to define a global edges array used for storing line segments.
 *
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['define_edges_array'] = function () {
    return `let edges = [];\n\n`;
};

/**
 * Generates the code for defining the generateSnowflake function.
 * This function calculates the triangle vertices and uses Koch recursion
 * to generate the full snowflake.
 *
 * @returns {string} JavaScript code 
 */

javascript.javascriptGenerator.forBlock['generate_snowflake'] = function () {
    return `function generateSnowflake(x, y, length, depth) {
    // Calculate the 3 corners of the base equilateral triangle
    const { a, b, c } = calculateEquilateralTriangle(p, x, y, length);

    // Generate Koch edges for each side of the triangle
    generateKochEdge(p, a, b, depth);
    generateKochEdge(p, b, c, depth);
    generateKochEdge(p, c, a, depth);
}\n\n`;
};

/**
 * Generates the code for defining the generateKochEdge(p, a, b, depth) function.
 *
 * @param {Blockly.Block} block
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['generate_koch_edge'] = function () {
    return `function generateKochEdge(p, a, b, depth) {
    // Base case: if recursion depth is 0, draw the line segment
    if (depth === 0) {
      edges.push({ a, b });
      return;
    }
  
    // Calculate 3 subdivision points along the segment a → b
    const { p1, peak, p2 } = getKochPoints(p, a, b);
  
    // Recursively draw 4 segments: left, left bump, right bump, right
    generateKochEdge(p, a, p1, depth - 1);       // left third
    generateKochEdge(p, p1, peak, depth - 1);    // peak side (left)
    generateKochEdge(p, peak, p2, depth - 1);    // peak side (right)
    generateKochEdge(p, p2, b, depth - 1);       // right third
}\n\n`;
};

/**
 * Generates code for drawing all line segments stored in the edges array.
 *
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['draw_snowflake_edges'] = function () {
    return `function drawSnowflakeEdges() {
    for (let edge of edges) {
      p.line(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
    }
}\n\n`;
};

/**
 * Generates JavaScript that calls the generateSnowflake and drawSnowflakeEdges
 * functions with the user-provided parameters.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['call_generate_snowflake'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
    const length = javascript.javascriptGenerator.valueToCode(block, 'LENGTH', javascript.Order.NONE) || '0';
    const depth = block.getFieldValue('DEPTH');

    return `generateSnowflake(${x}, ${y}, ${length}, ${depth});
drawSnowflakeEdges(p);\n`;
};

/**
 * Generates a function definition for generateSnowflake with nested logic.
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['define_generate_snowflake'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `function generateSnowflake(x, y, length, depth) {\n${statements}}\n\n`;
};

/**
 * Generates a function definition for generateKochEdge with nested logic.
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['define_generate_koch_edge'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `function generateKochEdge(p, a, b, depth) {\n${statements}}\n\n`;
};

/**
 * Generates JavaScript code to calculate the corners of an equilateral triangle.
 * 
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['calculate_equilateral_triangle'] = function () {
    return `const { a, b, c } = calculateEquilateralTriangle(p, x, y, length);\n`;
};

/**
* Generates the base case logic for the Koch recursion.
* If depth is 0, it pushes the current segment {a, b} to the global edges array and returns.
*
* @returns {string} 
*/
javascript.javascriptGenerator.forBlock['koch_recursion_base_case'] = function () {
    return `if (depth === 0) {
    edges.push({ a, b });
    return;
  }\n`;
};

/**
 * Generates JavaScript code that calculates subdivision points
 * for a Koch snowflake segment using the getKochPoints() helper function.
 *
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['koch_calculate_subdivision_points'] = function () {
    return `const { p1, peak, p2 } = getKochPoints(p, a, b);\n`;
};

/**
 * Generates JavaScript to call generateKochEdge() for different segments or triangle sides.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['call_generate_koch_edge_position'] = function (block) {
    const pos = block.getFieldValue('POSITION');
    let code = '';
  
    switch (pos) {
      case 'AB':
        code = `generateKochEdge(p, a, b, depth);\n`;
        break;
      case 'BC':
        code = `generateKochEdge(p, b, c, depth);\n`;
        break;
      case 'CA':
        code = `generateKochEdge(p, c, a, depth);\n`;
        break;
      case 'LEFT':
        code = `generateKochEdge(p, a, p1, depth - 1);\n`;
        break;
      case 'LEFT_BUMP':
        code = `generateKochEdge(p, p1, peak, depth - 1);\n`;
        break;
      case 'RIGHT_BUMP':
        code = `generateKochEdge(p, peak, p2, depth - 1);\n`;
        break;
      case 'RIGHT':
        code = `generateKochEdge(p, p2, b, depth - 1);\n`;
        break;
    }
  
    return code;
  };
  