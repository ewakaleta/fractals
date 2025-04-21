Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "canvas_center_x",
    "message0": "canvas center X",
    "output": null,
    "colour": 210,
    "tooltip": "Returns the horizontal center of the canvas (p.width / 2).",
    "helpUrl": ""
  },
  {
    "type": "canvas_center_y",
    "message0": "canvas center Y",
    "output": null,
    "colour": 210,
    "tooltip": "Returns the vertical center of the canvas (p.height / 2).",
    "helpUrl": ""
  },  
  {
    "type": "center_y_for_triangle",
    "message0": "center Y for triangle with size %1",
    "args0": [
      {
        "type": "input_value",
        "name": "SIZE"
      }
    ],
    "output": null,
    "colour": 210,
    "tooltip": "Returns vertical center Y for a triangle of given size (with top at canvas center)",
    "helpUrl": ""
  }
]);

javascript.javascriptGenerator.forBlock['canvas_center_x'] = function () {
  return ['p.width / 2', javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['canvas_center_y'] = function () {
  return ['p.height / 2', javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['center_y_for_triangle'] = function (block) {
  const size = javascript.javascriptGenerator.valueToCode(block, 'SIZE', javascript.Order.NONE) || '0';
  return [`(p.height - (Math.sqrt(3) / 2) * ${size}) / 2`, javascript.Order.NONE];
};
