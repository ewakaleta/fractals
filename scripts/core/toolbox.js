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
        { "kind": "block", "type": "set_fill_rgb" },
        { "kind": "block", "type": "set_stroke_weight" }
      ]
    },

    // ───────── Recursive Fractals ─────────
    {
      "kind": "category",
      "name": "Tree Fractal",
      "colour": "#A5D6A7",
      "contents": [
        { "kind": "block", "type": "all_in_tree_fractal" },
        { "kind": "block", "type": "draw_branch" },
        { "kind": "block", "type": "use_degrees" },
        { "kind": "block", "type": "set_tree_base" },
        { "kind": "block", "type": "draw_tree_fractal" },
        { "kind": "block", "type": "define_draw_branch" },
        { "kind": "block", "type": "tree_recursion_base_case" },
        { "kind": "block", "type": "draw_current_branch" },
        { "kind": "block", "type": "determine_angle" },
        { "kind": "block", "type": "recursive_draw_branch" },
        { "kind": "block", "type": "set_degrees" },
        { "kind": "block", "type": "set_origin_bottom_center" },
        { "kind": "block", "type": "call_draw_branch" },
      ]
    },
    {
      "kind": "category",
      "name": "Sierpinski Triangle",
      "colour": "#A5D6A7",
      "contents": [
        { "kind": "block", "type": "all_in_sierpniski_triangle" },
        { "kind": "block", "type": "triangle_rec_definition" },
        { "kind": "block", "type": "triangle_rec" },
        { "kind": "block", "type": "define_triangle_rec_function" },
        { "kind": "block", "type": "sierpinski_recursion_base_case" },
        { "kind": "block", "type": "triangle_geometry_vars" },
        { "kind": "block", "type": "call_triangle_rec_position" },
        { "kind": "block", "type": "call_triangle_rec" },
      ]
    },
    {
      "kind": "category",
      "name": "Koch Snowflake",
      "colour": "#A5D6A7",
      "contents": [
        { "kind": "block", "type": "all_in_koch_snowflake" },
        { "kind": "block", "type": "empty_edges_array" },
        { "kind": "block", "type": "generate_snowflake" },
        { "kind": "block", "type": "generate_koch_edge" },
        { "kind": "block", "type": "draw_snowflake_edges" },
        { "kind": "block", "type": "draw_koch_snowflake" },
        { "kind": "block", "type": "define_edges_array" },
        { "kind": "block", "type": "define_generate_snowflake" },
        { "kind": "block", "type": "define_generate_koch_edge" },
        { "kind": "block", "type": "define_draw_snowflake_edges" },
        { "kind": "block", "type": "calculate_equilateral_triangle" },
        { "kind": "block", "type": "koch_recursion_base_case" },
        { "kind": "block", "type": "koch_calculate_subdivision_points" },
        { "kind": "block", "type": "call_generate_koch_edge_position" },
        { "kind": "block", "type": "draw_snowflake_edges_iteration" },
        { "kind": "block", "type": "call_generate_snowflake" }
      ]
    },
    {
      "kind": "category",
      "name": "Cantor Set",
      "colour": "#A5D6A7",
      "contents": [
        { "kind": "block", "type": "all_in_cantor_set" },
        { "kind": "block", "type": "draw_cantor_definition" },
        { "kind": "block", "type": "draw_cantor" },
        { "kind": "block", "type": "define_draw_cantor_function" },
        { "kind": "block", "type": "cantor_recursion_base_case" },
        { "kind": "block", "type": "cantor_geometry_vars" },
        { "kind": "block", "type": "cantor_draw_line" },
        { "kind": "block", "type": "call_draw_cantor_position" },
        { "kind": "block", "type": "call_draw_cantor" },
      ]
    },
    // ───────── Non-Recursive Fractals ─────────
    {
      "kind": "category",
      "name": "Mandelbrot Set",
      "colour": "#90CAF9",
      "contents": [
        { "kind": "block", "type": "all_in_mandelbrot_set" },
        { "kind": "block", "type": "draw_mandelbrot_definition" },
        { "kind": "block", "type": "draw_mandelbrot" },
        { "kind": "block", "type": "setup_pixels" },
        { "kind": "block", "type": "define_mandelbrot_set" },
        { "kind": "block", "type": "pixel_loop" },
        { "kind": "block", "type": "pixel_to_complex" },
        { "kind": "block", "type": "mandelbrot_iteration_loop" },
        { "kind": "block", "type": "mandelbrot_determine_color" },
        { "kind": "block", "type": "mandelbrot_update_pixels" },
        { "kind": "block", "type": "call_mandelbrot" },
      ]
    },
    {
      "kind": "category",
      "name": "Dragon Curve",
      "colour": "#90CAF9",
      "contents": [
        { "kind": "block", "type": "draw_dragon_curve" },
        { "kind": "block", "type": "use_degrees" },
        { "kind": "block", "type": "function_build_turn_sequence" },
        { "kind": "block", "type": "function_draw_dragon_curve" },
        { "kind": "block", "type": "set_degrees" },
        { "kind": "block", "type": "define_turns_array" },
        { "kind": "block", "type": "dragon_depth_loop" },
        { "kind": "block", "type": "next_turn_sequence" },
        { "kind": "block", "type": "move_starting_point" },
        { "kind": "block", "type": "set_start_degree" },
        { "kind": "block", "type": "dragon_turn_loop" },
        { "kind": "block", "type": "dragon_update_direction" },
        { "kind": "block", "type": "dragon_draw_segment" },
    
      ]
    },
    {
      "kind": "category",
      "name": "Barnsley Fern",
      "colour": "#90CAF9",
      "contents": [
        { "kind": "block", "type": "draw_barnsley_fern" }, 
      ]
    },
    // ───────── Logic & Math ─────────
    {
      "kind": "category",
      "name": "Values & Helpers",
      "colour": "#FFB74D",
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
  ]
};
