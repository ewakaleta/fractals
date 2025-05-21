/**
 * @fileoverview
 * Defines the custom Blockly blocks and JavaScript code generators
 * for drawing a recursive tree fractal using p5.js.
 * 
 * This set of blocks includes:
 * - Fully all-in-one draw_tree_fractal block 
 * - Blocks for granular tree construction via named variables
 * - Blocks for handling recursion and drawing
 */


// ================================
// Tree fractal blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
  {
    type: "all_in_tree_fractal",
    message0: "Create a Fractal Canopy with branch length: %1 depth: %2 branch split: %3 and rotation: %4",
    args0: [
      { type: "field_number", name: "LENGTH", value: 200, min: 0, max: 500 },
      { type: "field_number", name: "MAXDEPTH", value: 8, min: 0, max: 16, precision: 1 },
      { type: "field_number", name: "SPLIT", value: 2, min: 2, max: 5, precision: 2 },
      { type: "field_number", name: "ROTATION", value: 60, min: 0, max: 360, precision: 10 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
    tooltip: `p.angleMode(p.DEGREES); // Use degrees
p.translate(p.width / 2, p.height); // Move the tree base to the bottom-center of the canvas
drawBranch(p, height, currentDepth, maxDepth, split, rotation) // Start drawing the tree from the bottom up;`,
    helpUrl: "",
  },
  {
    "type": "draw_branch",
    "message0": "Describe how to draw the Fractal Canopy",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": `function drawBranch(length, depth, maxDepth, split, rotation) {
    if (depth >= maxDepth) return;

    // Draw the current branch
    p.line(0, 0, 0, -length);
    p.translate(0, -length);

    // Determine angle between branches
    let angleStep = split > 1 ? rotation / (split - 1) : 0;
    let startAngle = -rotation / 2;

    // Recursively draw each sub-branch
    for (let i = 0; i < split; i++) {
      p.push();
      p.rotate(startAngle + i * angleStep);
      drawBranch(length * 0.7, depth + 1, maxDepth, split, rotation);
      p.pop();
    }
  }`,
    "helpUrl": ""
  },
  {
    "type": "use_degrees",
    "message0": "Use degree for angles",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": "p.angleMode(p.DEGREES);",
    "helpUrl": ""
  },
  {
    "type": "set_tree_base",
    "message0": "  Start the drawing from the bottom center of the screen",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": "p.translate(p.width / 2, p.height);",
    "helpUrl": ""
  },
  {
    type: "draw_tree_fractal",
    message0: "Draw a Fractal Canopy with length: %1 depth: %2 branch split: %3 and rotation: %4",
    args0: [
      { type: "field_number", name: "LENGTH", value: 200, min: 0, max: 500 },
      { type: "field_number", name: "MAXDEPTH", value: 8, min: 0, max: 16, precision: 1 },
      { type: "field_number", name: "SPLIT", value: 2, min: 2, max: 5, precision: 2 },
      { type: "field_number", name: "ROTATION", value: 60, min: 0, max: 360, precision: 10 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 180,
    tooltip: `drawBranch(length, depth, maxDepth, split, rotation)`,
    helpUrl: "",
  },
  {
    "type": "define_draw_branch",
    "message0": "define function drawBranch(length, depth, maxDepth, split, rotation) %1 %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `function drawBranch(length, depth, maxDepth, split, rotation) {\n}`,
    "helpUrl": ""
  },
  {
    "type": "tree_recursion_base_case",
    "message0": "If depth reaches maxDepth then return",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `if (depth >= maxDepth) return;`,
    "helpUrl": ""
  },
  {
    "type": "draw_current_branch",
    "message0": "Draw the current branch",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `p.line(0, 0, 0, -length);\np.translate(0, -length);`,
    "helpUrl": ""
  },
  {
    "type": "determine_angle",
    "message0": "Determine the angle between branches",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `let angleStep = split > 1 ? rotation / (split - 1) : 0;\nlet startAngle = -rotation / 2;`,
    "helpUrl": ""
  },
  {
    "type": "recursive_draw_branch",
    "message0": "Recursively draw each sub-branch",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `for (let i = 0; i < split; i++) {
      p.push();
      p.rotate(startAngle + i * angleStep);
      drawBranch(length * 0.7, depth + 1, maxDepth, split, rotation);
      p.pop();
    }`,
    "helpUrl": ""
  },
  {
    "type": "set_degrees",
    "message0": "Set the angleMode to DEGREES",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": "p.angleMode(p.DEGREES);",
    "helpUrl": ""
  },
  {
    "type": "set_origin_bottom_center",
    "message0": "Move the origin to bottom-center of canvas",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": "p.translate(p.width / 2, p.height);",
    "helpUrl": ""
  },
  {
    type: "call_draw_branch",
    message0: "Call drawBranch(0) with length: %1 depth: %2 branch split: %3 and rotation: %4",
    args0: [
      { type: "field_number", name: "LENGTH", value: 200, min: 0, max: 500 },
      { type: "field_number", name: "MAXDEPTH", value: 8, min: 0, max: 16, precision: 1 },
      { type: "field_number", name: "SPLIT", value: 2, min: 2, max: 5, precision: 2 },
      { type: "field_number", name: "ROTATION", value: 60, min: 0, max: 360, precision: 10 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 345,
    tooltip: `drawBranch(length, depth, maxDepth, split, rotation)`,
    helpUrl: "",
  },

]);

// ================================
// Blockly → JavaScript Generator
// ================================

/**
 *Generates JavaScript for a full, all-in-one tree fractal block.
 *
 * @param {Blockly.Block} block 
 * @returns {string}
 */

 javascript.javascriptGenerator.forBlock['all_in_tree_fractal'] = function (block) {
  const length = block.getFieldValue('LENGTH');
  const maxDepth = block.getFieldValue('MAXDEPTH');
  const split = block.getFieldValue('SPLIT');
  const rotation = block.getFieldValue('ROTATION');

  return `p.angleMode(p.DEGREES);
p.translate(p.width / 2, p.height); // Move the tree base to the bottom-center of the canvas
drawBranch(p, ${length}, 0, ${maxDepth}, ${split}, ${rotation});\n\n`; 
};

/**
 * Generates JavaScript code with the drawBranch() function implementation.
 *
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['draw_branch'] = function () {
  return `function drawBranch(length, depth, maxDepth, split, rotation) {
  if (depth >= maxDepth) return;

  // Draw the current branch
  p.line(0, 0, 0, -length);
  p.translate(0, -length);

  // Determine angle between branches
  let angleStep = split > 1 ? rotation / (split - 1) : 0;
  let startAngle = -rotation / 2;

  // Recursively draw each sub-branch
  for (let i = 0; i < split; i++) {
    p.push();
    p.rotate(startAngle + i * angleStep);
    drawBranch(length * 0.7, depth + 1, maxDepth, split, rotation);
    p.pop();
  }
}\n\n`;
};

/**
 * Generates JavaScript code to set angleMode to DEGREES.
 *
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['use_degrees'] = function () {
  return `p.angleMode(p.DEGREES);\n`;
};

/**
 * Generates JavaScript code to move the drawing origin (0, 0) to the bottom center of the screen.
 *
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['set_tree_base'] = function () {
  return `p.translate(p.width / 2, p.height);\n`;
};

/**
 *Generates JavaScript for calling the drawBranch() function.
 *
 * @param {Blockly.Block} block 
 * @returns {string}
 */

 javascript.javascriptGenerator.forBlock['draw_tree_fractal'] = function (block) {
  const length = block.getFieldValue('LENGTH');
  const maxDepth = block.getFieldValue('MAXDEPTH');
  const split = block.getFieldValue('SPLIT');
  const rotation = block.getFieldValue('ROTATION');

  return `drawBranch(${length}, 0,  ${maxDepth}, ${split}, ${rotation});\n`; 
};

/**
 * Generates a function definition for generateKochEdge with nested logic.
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['define_draw_branch'] = function (block) {
  const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
  return `function drawBranch(length, depth, maxDepth, split, rotation) {\n${statements}}\n\n`;
};

/**
* Generates JavaScript for the base case logic for the Tree Fractal recursion.
* If depth reaches maxDepth return.
*
* @returns {string} 
*/
javascript.javascriptGenerator.forBlock['tree_recursion_base_case'] = function () {
  return `if (depth >= maxDepth) return\n\n`;
};

/**
* Generates JavaScript for drawing the current branch. 
*
* @returns {string} 
*/
javascript.javascriptGenerator.forBlock['draw_current_branch'] = function () {
  return `p.line(0, 0, 0, -length);\np.translate(0, -length);\n\n`;
};

/**
* Generates JavaScript for determining the current angle for a branch. 
*
* @returns {string} 
*/
javascript.javascriptGenerator.forBlock['determine_angle'] = function () {
  return `let angleStep = split > 1 ? rotation / (split - 1) : 0;
let startAngle = -rotation / 2\n\n`;
};

/**
* Generates JavaScript for recursively drawing the tree branches (iteration over the split amount) 
*
* @returns {string} 
*/
javascript.javascriptGenerator.forBlock['recursive_draw_branch'] = function () {
  return `for (let i = 0; i < split; i++) {
    p.push();
    p.rotate(startAngle + i * angleStep);
    drawBranch(length * 0.7, depth + 1, maxDepth, split, rotation);
    p.pop();
  }\n`;
};

/**
 * Generates JavaScript code to set angleMode to DEGREES.
 *
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['set_degrees'] = function () {
  return `p.angleMode(p.DEGREES);\n`;
};

/**
 * Generates JavaScript code to move the drawing origin (0, 0) to the bottom center of the screen.
 *
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['set_origin_bottom_center'] = function () {
  return `p.translate(p.width / 2, p.height);\n`;
};

/**
 *Generates JavaScript for calling the drawBranch() function.
 *
 * @param {Blockly.Block} block 
 * @returns {string}
 */

 javascript.javascriptGenerator.forBlock['call_draw_branch'] = function (block) {
  const length = block.getFieldValue('LENGTH');
  const maxDepth = block.getFieldValue('MAXDEPTH');
  const split = block.getFieldValue('SPLIT');
  const rotation = block.getFieldValue('ROTATION');

  return `drawBranch(${length}, 0,  ${maxDepth}, ${split}, ${rotation});\n`; 
};