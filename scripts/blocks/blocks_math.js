Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "center_x_for_triangle",
    "message0": "center X for triangle with size %1",
    "args0": [
      {
        "type": "input_value",
        "name": "SIZE"
      }
    ],
    "output": null,
    "colour": 210,
    "tooltip": "Returns horizontal center X for a triangle of given size",
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

javascript.javascriptGenerator.forBlock['center_x_for_triangle'] = function (block) {
  const size = javascript.javascriptGenerator.valueToCode(block, 'SIZE', javascript.Order.NONE) || '0';
  return [`p.width / 2`, javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['center_y_for_triangle'] = function (block) {
  const size = javascript.javascriptGenerator.valueToCode(block, 'SIZE', javascript.Order.NONE) || '0';
  return [`(p.height - (Math.sqrt(3) / 2) * ${size}) / 2`, javascript.Order.NONE];
};
