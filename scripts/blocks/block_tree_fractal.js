/**
 * @fileoverview
 * Defines the custom Blockly block and JavaScript code generator
 * for drawing a recursive tree fractal using p5.js.
 *
 * This block allows users to configure the following parameters:
 * - Height (initial branch length)
 * - Max depth (maximum recursion depth)
 * - Weight (stroke thickness)
 * - Split (number of child branches)
 * - Rotation (spread of branching)
 */

// ================================
// Tree fractal block definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
  {
    type: "draw_tree_fractal",
    tooltip: "Draws a tree fractal using configurable parameters.",
    helpUrl: "",
    message0: "Draw Tree Fractal %1 Height %2 %3 maxDepth %4 %5 Weight %6 %7 Split %8 %9 Rotation %10 %11",
    args0: [
      { type: "input_dummy", name: "" },
      { type: "field_number", name: "HEIGHT", value: 200, min: 0, max: 500 },
      { type: "input_dummy", name: "" },
      { type: "field_number", name: "MAXDEPTH", value: 5, min: 0, max: 10, precision: 1 },
      { type: "input_dummy", name: "" },
      { type: "field_number", name: "WEIGHT", value: 5, min: 0 },
      { type: "input_dummy", name: "" },
      { type: "field_number", name: "SPLIT", value: 2, min: 2, max: 128, precision: 2 },
      { type: "input_dummy", name: "" },
      { type: "field_number", name: "ROTATION", value: 0.75, min: 0.1, max: 2, precision: 0.1 },
      { type: "input_dummy", name: "" }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 285
  }
]);

// ================================
// Blockly → JavaScript Generator
// ================================

/**
 * Generates JavaScript code to draw a recursive tree fractal.
 *
 * @param {Blockly.Block} block - The 'draw_tree_fractal' block instance.
 * @returns {string} JavaScript code that creates and renders a tree fractal in p5.js.
 */

javascript.javascriptGenerator.forBlock['draw_tree_fractal'] = function (block) {
  const height = block.getFieldValue('HEIGHT');
  const maxDepth = block.getFieldValue('MAXDEPTH');
  const weight = block.getFieldValue('WEIGHT');
  const split = block.getFieldValue('SPLIT');
  const rotation = block.getFieldValue('ROTATION');

  return `p.push();
const start = p.createVector(p.width / 2, p.height);
const tree = new Branch(p, start, ${height}, 0, 0, ${maxDepth}, ${weight}, ${split}, ${rotation});
tree.draw();
p.pop();\n`;
};
