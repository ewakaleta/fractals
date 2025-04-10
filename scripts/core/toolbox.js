/**
 * @fileoverview
 * Defines the Blockly toolbox configuration used to categorize and display blocks.
 * 
 * This configuration defines:
 * - A "Structure" category with general setup/drawing blocks
 * - A "Tree fractal" category with a custom block for generating the tree fractal
 */

export const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      kind: "category",
      name: "Structure",
      colour: "#BCAAA4",
      contents: [
        { kind: "block", type: "setup" },
        { kind: "block", type: "draw" },
        { kind: "block", type: "create_canvas" }
      ]
    },
    {
      kind: "category",
      name: "Styling",
      colour: "#AED581",
      contents: [
        { kind: "block", type: "set_background" },
        { kind: "block", type: "set_background_rgb" },
        { kind: "block", type: "set_stroke" },
        { kind: "block", type: "set_stroke_rgb" },
        { kind: "block", type: "set_stroke_weight" },
        { kind: "block", type: "set_fill" },
        { kind: "block", type: "set_fill_rgb" },
        { kind: "block", type: "no_fill" },
        { kind: "block", type: "no_loop" }
      ]
    },
    {
      "kind": "category",
      "name": "Tree fractal",
      "colour": "#90CAF9",
      "contents": [
        { "kind": "block", "type": "draw_tree_fractal" },
        { "kind": "block", "type": "create_root_branch" },
        { "kind": "block", "type": "build_tree" },
        { "kind": "block", "type": "draw_tree" }
      ]
    },
    {
      "kind": "category",
      "name": "Sierpinski Triangle",
      "colour": "#FFD54F",
      "contents": [
        { "kind": "block", "type": "draw_sierpinski_triangle" },
        { "kind": "block", "type": "create_sierpinski" },
        { "kind": "block", "type": "draw_sierpinski_instance" },
        { "kind": "block", "type": "draw_single_triangle" },
        { "kind": "block", "type": "draw_sierpinski_recursive" },
      ]
    },
    {
      "kind": "category",
      "name": "Values & Helpers",
      "colour": "#9FA8DA",
      "contents": [
        { "kind": "block", "type": "math_number" },
        { "kind": "block", "type": "center_x_for_triangle" },
        { "kind": "block", "type": "center_y_for_triangle" }
      ]
    },    
    {
      "kind": "category",
      "name": "Variables",
      "custom": "VARIABLE",
      "colour": "#F9A825"
    }
  ]
};