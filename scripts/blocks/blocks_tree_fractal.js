/**
 * @fileoverview
 * Defines the custom Blockly block and JavaScript code generator
 * for drawing a recursive tree fractal using p5.js.
 * 
 * This set of blocks includes:
 * - Fully ready-to-use draw_tree_fractal block 
 * - Blocks for granular tree construction via named variables
 * - Blocks for handling recursion and drawing
 */


// ================================
// Tree fractal blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
  {
    type: "draw_tree_fractal",
    tooltip: "Draws a tree fractal using configurable parameters.",
    helpUrl: "",
    message0: "Draw Tree Fractal %1 Height %2 %3 maxDepth %4 %5 Split %6 %7 Rotation %8 %9",
    args0: [
      { type: "input_dummy", name: "" },
      { type: "field_number", name: "HEIGHT", value: 200, min: 0, max: 500 },
      { type: "input_dummy", name: "" },
      { type: "field_number", name: "MAXDEPTH", value: 5, min: 0, max: 10, precision: 1 },
      { type: "input_dummy", name: "" },
      { type: "field_number", name: "SPLIT", value: 2, min: 2, max: 128, precision: 2 },
      { type: "input_dummy", name: "" },
      { type: "field_number", name: "ROTATION", value: 0.75, min: 0.1, max: 2, precision: 0.1 },
      { type: "input_dummy", name: "" }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 285
  },
  {
    "type": "create_root_branch",
    "message0": "create root branch as %1 with height %2 max depth %3 split %4 rotation %5",
    "args0": [
      { "type": "field_variable", "name": "ROOT", "variable": "root" },
      { "type": "field_number", "name": "HEIGHT", "value": 200 },
      { "type": "field_number", "name": "MAXDEPTH", "value": 5 },
      { "type": "field_number", "name": "SPLIT", "value": 2 },
      { "type": "field_number", "name": "ROTATION", "value": 0.75 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 285,
    "tooltip": "Creates and stores the root branch at canvas center",
    "helpUrl": ""
  },
  {
    "type": "build_tree",
    "message0": "recursively build tree from %1",
    "args0": [
      { "type": "field_variable", "name": "ROOT", "variable": "root" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 285,
    "tooltip": "Recursively builds the tree starting at this branch",
    "helpUrl": ""
  },
  {
    "type": "draw_tree",
    "message0": "draw tree %1",
    "args0": [
      { "type": "field_variable", "name": "ROOT", "variable": "root" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 285,
    "tooltip": "Draws the tree fractal from the given branch",
    "helpUrl": ""
  }
]);

// ================================
// Blockly → JavaScript Generator
// ================================

/**
 *Generates JavaScript for a full, all-in-one tree fractal block.
 *
 * @param {Blockly.Block} block - The 'draw_tree_fractal' block instance.
 * @returns {string} JavaScript code that creates and renders a tree fractal in p5.js.
 */

 javascript.javascriptGenerator.forBlock['draw_tree_fractal'] = function (block) {
  const height = block.getFieldValue('HEIGHT');
  const maxDepth = block.getFieldValue('MAXDEPTH');
  const split = block.getFieldValue('SPLIT');
  const rotation = block.getFieldValue('ROTATION');

  return `const root = new Branch(p, p.createVector(p.width / 2, p.height), ${height}, 0, 0, ${maxDepth}, ${split}, ${rotation});
(function build(branch) {
  if (!branch.isMaxDepth()) {
    const children = branch.split();
    children.forEach(build);
  }
})(root);
root.drawTree();\n`;
};

/**
 * Generates JavaScript to create and store a root branch in a variable.
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['create_root_branch'] = function (block) {
  const varName = javascript.javascriptGenerator.nameDB_.getName(
    block.getFieldValue('ROOT'),
    Blockly.VARIABLE_CATEGORY_NAME
  );

  const height = block.getFieldValue('HEIGHT');
  const maxDepth = block.getFieldValue('MAXDEPTH');
  const split = block.getFieldValue('SPLIT');
  const rotation = block.getFieldValue('ROTATION');

  return `const ${varName} = new Branch(p, p.createVector(p.width / 2, p.height), ${height}, 0, 0, ${maxDepth}, ${split}, ${rotation});\n`;
};


/**
 * Generates a recursive tree-building function call on a named root variable.
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['build_tree'] = function (block) {
  const varName = javascript.javascriptGenerator.nameDB_.getName(
    block.getFieldValue('ROOT'),
    Blockly.VARIABLE_CATEGORY_NAME
  );

  return `function build(branch) {
  if (!branch.isMaxDepth()) {
    const children = branch.split();
    children.forEach(build);
  }
}\n
build(${varName});
`;
};

/**
 * Generates JavaScript to draw a tree fractal from a named branch variable.
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['draw_tree'] = function (block) {
  const varName = javascript.javascriptGenerator.nameDB_.getName(
    block.getFieldValue('ROOT'),
    Blockly.VARIABLE_CATEGORY_NAME
  );

  return `if (${varName}) {
  ${varName}.drawTree();
}
`;
};

