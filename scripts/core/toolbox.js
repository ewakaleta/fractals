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

    // ───────── Structure ─────────
    {
      "kind": "category",
      "name": "Structure",
      "colour": "#BCAAA4",
      "contents": [
        { "kind": "block", "type": "setup" },
        { "kind": "block", "type": "draw" },
        { "kind": "block", "type": "create_canvas" },
        { "kind": "block", "type": "no_loop" },
        { "kind": "block", "type": "no_fill" }
      ]
    },

    // ───────── Colors ─────────
    {
      "kind": "category",
      "name": "Color",
      "colour": "#F48FB1",
      "contents": [
        { "kind": "block", "type": "set_background" },
        { "kind": "block", "type": "set_background_rgb" },
        { "kind": "block", "type": "set_stroke" },
        { "kind": "block", "type": "set_stroke_rgb" },
        { "kind": "block", "type": "set_fill" },
        { "kind": "block", "type": "set_fill_rgb" }
      ]
    },

    // ───────── Fractals ─────────
    {
      "kind": "category",
      "name": "Tree Fractal",
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
      "colour": "#A5D6A7",
      "contents": [
        { "kind": "block", "type": "draw_sierpinski_triangle" },
        { "kind": "block", "type": "define_triangle_rec_function" },
        { "kind": "block", "type": "sierpinski_recursion_base_case" },
        { "kind": "block", "type": "triangle_geometry_vars" },
        { "kind": "block", "type": "call_triangle_rec_position" },
        { "kind": "block", "type": "call_triangle_rec" },
      ]
    },

    // ───────── Logic & Math ─────────
    {
      "kind": "category",
      "name": "Values & Helpers",
      "colour": "#9FA8DA",
      "contents": [
        { "kind": "block", "type": "math_number" },
        { "kind": "block", "type": "canvas_center_x" },
        { "kind": "block", "type": "canvas_center_y" },
        { "kind": "block", "type": "center_y_for_triangle" }
      ]
    },
    {
      "kind": "category",
      "name": "Math",
      "colour": "#FFB74D",
      "contents": [
        { "kind": "block", "type": "math_number" },
        { "kind": "block", "type": "math_arithmetic" },
        { "kind": "block", "type": "math_single" }
      ]
    },
    // ───────── Variables & Functions ─────────
    {
      "kind": "category",
      "name": "Variables",
      "colour": "#A65C81",
      "custom": "VARIABLE"
    }
  ]
};
