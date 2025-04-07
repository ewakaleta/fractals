// Setup blocks

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "setup",
    "tooltip": "",
    "helpUrl": "Setup actions for p5.js",
    "message0": "setup %1 do %2",
    "args0": [
      {
        "type": "input_dummy",
        "name": "setup"
      },
      {
        "type": "input_statement",
        "name": "do"
      }
    ],
    "nextStatement": null,
    "colour": 225
  },  
  {
    "type": "create_canvas",
    "message0": "create canvas with width %1 and height %2",
    "args0": [
      {
        "type": "field_number",
        "name": "WIDTH",
        "value": 800
      },
      {
        "type": "field_number",
        "name": "HEIGHT",
        "value": 800
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Creates a canvas with specified dimensions.",
    "helpUrl": ""
  },
  {
    "type": "set_background",
    "message0": "set background color to %1",
    "args0": [
      {
        "type": "field_input",
        "name": "COLOR",
        "text": "51"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Set background color using grayscale, hex, named color, or variable.",
    "helpUrl": ""
  },
  {
    "type": "set_background_rgb",
    "message0": "set background color to R %1 G %2 B %3",
    "args0": [
      {
        "type": "field_number",
        "name": "R",
        "value": 51,
        "min": 0,
        "max": 255
      },
      {
        "type": "field_number",
        "name": "G",
        "value": 51,
        "min": 0,
        "max": 255
      },
      {
        "type": "field_number",
        "name": "B",
        "value": 51,
        "min": 0,
        "max": 255
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Sets the background color using RGB values.",
    "helpUrl": ""
  },
  {
    "type": "set_stroke",
    "message0": "set stroke color to %1",
    "args0": [
      {
        "type": "field_input",
        "name": "COLOR",
        "text": "255"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  },  
  {
    "type": "set_stroke_rgb",
    "message0": "set stroke color to R %1 G %2 B %3",
    "args0": [
      {
        "type": "field_number",
        "name": "R",
        "value": 255,
        "min": 0,
        "max": 255
      },
      {
        "type": "field_number",
        "name": "G",
        "value": 255,
        "min": 0,
        "max": 255
      },
      {
        "type": "field_number",
        "name": "B",
        "value": 255,
        "min": 0,
        "max": 255
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Sets the stroke color using RGB values.",
    "helpUrl": ""
  }
]);

// Draw blocks
Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "draw",
    "message0": "draw %1 do %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "do"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "tooltip": "Draw actions that run inside p5.js draw() loop.",
    "helpUrl": ""
  }
]);

//Tree fractal
Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "draw_tree_fractal",
    "message0": "draw tree fractal with length %1 max height %2 weight %3 split %4 rotation %5",
    "args0": [
      { "type": "field_number", "name": "LENGTH", "value": 200, "min": 0 },
      { "type": "field_number", "name": "HEIGHT", "value": 5, "min": 0 },
      { "type": "field_number", "name": "WEIGHT", "value": 2, "min": 1 },
      { "type": "field_number", "name": "SPLIT", "value": 2, "min": 1 },
      { "type": "field_number", "name": "ROTATION", "value": 0.75, "min": 0 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Draw a recursive tree fractal with the given parameters.",
    "helpUrl": ""
  }
]);
