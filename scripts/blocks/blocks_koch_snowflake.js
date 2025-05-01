/**
 * @fileoverview
 * Defines the custom Blockly blocks and JavaScript code generators
 * for drawing the Koch Snowflake fractal using p5.js.
 * 
 * This set of blocks supports three levels of abstraction for creating
 * the Koch Snowflake:
 * 
 * - High-level block: `all_in_koch_snowflake` draws the full fractal using built-in logic.
 * - Mid-level blocks: These blocks break the fractal generation into
 *   conceptual steps without introducing programming constructs. Blocks such as
 *   `generate_snowflake` and `add_fractal_edge` let users reason about geometric
 *   construction and recursive depth without needing to define functions or manage flow.
 * - Low-level blocks: These blocks expose programming fundamentals such as
 *   defining functions, implementing recursion, and calling functions. 
 */

// ================================
// Koch Snowflake blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "all_in_koch_snowflake",
    "message0": "draw Koch snowflake at x: %1 y: %2 with length: %3 depth: %4",
    "args0": [
      { "type": "input_value", "name": "X" },
      { "type": "input_value", "name": "Y" },
      { "type": "field_number", "name": "LENGTH", "value": 400, "min": 0 },
      { "type": "field_number", "name": "DEPTH", "value": 3, "min": 0, "max": 6, "precision": 1 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "generateSnowflake(p, 0, 0, 400, 3);\ndrawSnowflakeEdges(p);",
    "helpUrl": ""
  },
  {
    "type": "empty_edges_array",
    "message0": "Start with an empty list of edges",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": "let edges = [];",
    "helpUrl": ""
  },
  {
    "type": "generate_snowflake",
    "message0": "Build the snowflake at the point (x, y)",
    "args0": [],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": `function generateSnowflake(x, y, length, depth) {
    // Calculate the 3 corners of the base equilateral triangle
    const { a, b, c } = calculateEquilateralTriangle(p, x, y, length);
  
    // Generate Koch edges for each side of the triangle
    generateKochEdge(a, b, depth);
    generateKochEdge(b, c, depth);
    generateKochEdge(c, a, depth);
  }`,
    "helpUrl": ""
  },
  {
    "type": "generate_koch_edge",
    "message0": "Add fractal edge between two points with given depth",
    "args0": [],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": `function generateKochEdge(a, b, depth) {
    // Base case: if recursion depth is 0, draw the line segment
    if (depth === 0) {
      edges.push({ a, b });
      return;
    }
  
    // Calculate 3 subdivision points along the segment a → b
    const { p1, peak, p2 } = getKochPoints(p, a, b);
  
    // Recursively draw 4 segments: left, left bump, right bump, right
    generateKochEdge(a, p1, depth - 1);       // left third
    generateKochEdge(p1, peak, depth - 1);    // peak side (left)
    generateKochEdge(peak, p2, depth - 1);    // peak side (right)
    generateKochEdge(p2, b, depth - 1);       // right third
}`,
    "helpUrl": ""
  },
  {
    "type": "draw_snowflake_edges",
    "message0": "Draw all edges stored in the list",
    "args0": [],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": `function drawSnowflakeEdges() {
    for (let edge of edges) {
      p.line(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
    }
}`,
    "helpUrl": ""
  },
  {
    "type": "draw_koch_snowflake",
    "message0": "Create and display the Koch snowflake at x: %1 y: %2 with length: %3 and depth: %4",
    "args0": [
      { "type": "input_value", "name": "X" },
      { "type": "input_value", "name": "Y" },
      { "type": "field_number", "name": "LENGTH", "value": 400, "min": 0 },
      { "type": "field_number", "name": "DEPTH", "value": 3, "min": 0, "max": 6, "precision": 1 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": `generateSnowflake(x, y, length, depth);
drawSnowflakeEdges();`,
    "helpUrl": ""
  },
  {
    "type": "define_edges_array",
    "message0": "define empty edges array",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": "let edges = [];",
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
    "colour": 345,
    "tooltip": `function generateSnowflake(x, y, length, depth) {\n}`,
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
    "colour": 345,
    "tooltip": `function generateKochEdge(a, b, depth) {\n}`,
    "helpUrl": ""
  },
  {
    "type": "define_draw_snowflake_edges",
    "message0": "define function drawSnowflakeEdges() %1 %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `function drawSnowflakeEdges() {\n}`,
    "helpUrl": ""
  },
  {
    "type": "calculate_equilateral_triangle",
    "message0": "calculate equilateral triangle corners from x, y, length",
    "args0": [],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `const { a, b, c } = calculateEquilateralTriangle(p, x, y, length);`,
    "helpUrl": ""
  },
  {
    "type": "koch_recursion_base_case",
    "message0": "if depth is 0 then push edge and return",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `if (depth === 0) {
    edges.push({ a, b });
    return;
  }`,
    "helpUrl": ""
  },
  {
    "type": "koch_calculate_subdivision_points",
    "message0": "calculate subdivision points p1, peak, p2 from a → b",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `const { p1, peak, p2 } = getKochPoints(p, a, b);\n`,
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
    "colour": 345,
    "tooltip": `generateKochEdge(pointA, pointB, depth);\n`,
    "helpUrl": ""
  },
  {
    "type": "draw_snowflake_edges_iteration",
    "message0": "draw all edges stored in the 'edges' array",
    "args0": [],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `for (let edge of edges) {
        p.line(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
      }`,
    "helpUrl": ""
  },
  {
    "type": "call_generate_snowflake",
    "message0": "Call generateSnowflake() and drawSnowflakeEdges() at x: %1 y: %2 with length: %3 and depth: %4",
    "args0": [
      { "type": "input_value", "name": "X" },
      { "type": "input_value", "name": "Y" },
      { "type": "field_number", "name": "LENGTH", "value": 400, "min": 0 },
      { "type": "field_number", "name": "DEPTH", "value": 3, "min": 0, "max": 6, "precision": 1 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `generateSnowflake(x, y, length, depth);
drawSnowflakeEdges();`,
    "helpUrl": ""
  },

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
javascript.javascriptGenerator.forBlock['all_in_koch_snowflake'] = function (block) {
  const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
  const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
  const length = block.getFieldValue('LENGTH');
  const depth = block.getFieldValue('DEPTH');

  return `generateSnowflake(p, ${x}, ${y}, ${length}, ${depth});
drawSnowflakeEdges(p);\n`;
};

/**
 * Generates code to define a global edges array used for storing line segments.
 *
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['empty_edges_array'] = function () {
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
    generateKochEdge(a, b, depth);
    generateKochEdge(b, c, depth);
    generateKochEdge(c, a, depth);
}\n\n`;
};

/**
 * Generates the code for defining the generateKochEdge(p, a, b, depth) function.
 *
 * @param {Blockly.Block} block
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['generate_koch_edge'] = function () {
  return `function generateKochEdge(a, b, depth) {
    // Base case: if recursion depth is 0, draw the line segment
    if (depth === 0) {
      edges.push({ a, b });
      return;
    }
  
    // Calculate 3 subdivision points along the segment a → b
    const { p1, peak, p2 } = getKochPoints(p, a, b);
  
    // Recursively draw 4 segments: left, left bump, right bump, right
    generateKochEdge(a, p1, depth - 1);       // left third
    generateKochEdge(p1, peak, depth - 1);    // peak side (left)
    generateKochEdge(peak, p2, depth - 1);    // peak side (right)
    generateKochEdge(p2, b, depth - 1);       // right third
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
javascript.javascriptGenerator.forBlock['draw_koch_snowflake'] = function (block) {
  const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
  const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
  const length = block.getFieldValue('LENGTH');
  const depth = block.getFieldValue('DEPTH');

  return `generateSnowflake(${x}, ${y}, ${length}, ${depth});
drawSnowflakeEdges();\n`;
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
  return `function generateKochEdge(a, b, depth) {\n${statements}}\n\n`;
};

/**
 * Generates a function definition for drawSnowflakeEdges() with nested logic.
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['define_draw_snowflake_edges'] = function (block) {
  const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
  return `function drawSnowflakeEdges() {\n${statements}}\n\n`;
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
      code = `generateKochEdge(a, b, depth);\n`;
      break;
    case 'BC':
      code = `generateKochEdge(b, c, depth);\n`;
      break;
    case 'CA':
      code = `generateKochEdge(c, a, depth);\n`;
      break;
    case 'LEFT':
      code = `generateKochEdge(a, p1, depth - 1);\n`;
      break;
    case 'LEFT_BUMP':
      code = `generateKochEdge(p1, peak, depth - 1);\n`;
      break;
    case 'RIGHT_BUMP':
      code = `generateKochEdge(peak, p2, depth - 1);\n`;
      break;
    case 'RIGHT':
      code = `generateKochEdge(p2, b, depth - 1);\n`;
      break;
  }

  return code;
};

/**
 * Generates JavaScript code that draws all edges stored in the 'edges' array
 *
 * @returns {string} 
 */
javascript.javascriptGenerator.forBlock['draw_snowflake_edges_iteration'] = function () {
  return `for (let edge of edges) {
        p.line(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
      }\n`;
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
  const length = block.getFieldValue('LENGTH');
  const depth = block.getFieldValue('DEPTH');

  return `generateSnowflake(${x}, ${y}, ${length}, ${depth});
drawSnowflakeEdges();\n`;
};