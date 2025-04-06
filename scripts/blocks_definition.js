// Blockly.common.defineBlocksWithJsonArray([
//     {
//       "type": "createCanvas",
//       "tooltip": "",
//       "helpUrl": "",
//       "message0": "createCanvas %1",
//       "args0": [
//         {
//           "type": "input_dummy",
//           "name": "createCanvas"
//         }
//       ],
//       "nextStatement": null,
//       "colour": 225
//     }
                                          
// ]);

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

