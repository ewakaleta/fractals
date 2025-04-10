Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "draw_sierpinski_triangle",
        "message0": "draw centered Sierpinski triangle with size: %1 depth: %2",
        "args0": [
            { "type": "field_number", "name": "SIZE", "value": 400 },
            { "type": "field_number", "name": "DEPTH", "value": 4, "min": 0, "max": 10, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 300,
        "tooltip": "Draws a centered Sierpinski triangle with the given size and recursion depth.",
        "helpUrl": ""
    },
    {
        "type": "create_sierpinski",
        "message0": "create Sierpinski as %1 at x: %2 y: %3 size: %4 depth: %5",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "triangle"
            },
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "input_value", "name": "SIZE" },
            { "type": "field_number", "name": "DEPTH", "value": 4, "min": 0, "max": 10, "precision": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Creates a Sierpinski triangle object and stores it in a variable.",
        "helpUrl": ""
    },
    {
        "type": "draw_sierpinski_instance",
        "message0": "draw Sierpinski %1",
        "args0": [
            { "type": "field_variable", "name": "VAR", "variable": "triangle" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Draws a previously created Sierpinski triangle object.",
        "helpUrl": ""
    },
    {
        "type": "draw_single_triangle",
        "message0": "draw single triangle at x: %1 y: %2 size: %3",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "input_value", "name": "SIZE" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 90,
        "tooltip": "Draws a single triangle at the given position and size.",
        "helpUrl": ""
    },
    {
        "type": "draw_sierpinski_recursive",
        "message0": "draw Sierpinski recursively at x: %1 y: %2 size: %3 depth: %4",
        "args0": [
            { "type": "input_value", "name": "X" },
            { "type": "input_value", "name": "Y" },
            { "type": "input_value", "name": "SIZE" },
            { "type": "input_value", "name": "DEPTH" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 90,
        "tooltip": "Recursively draws a full Sierpinski triangle.",
        "helpUrl": ""
    }
]);


/**
 * Generator for 'draw_sierpinski_triangle' block (centered version).
 *
 * @param {Blockly.Block} block
 * @returns {string} JavaScript code
 */
javascript.javascriptGenerator.forBlock['draw_sierpinski_triangle'] = function (block) {
    const size = block.getFieldValue('SIZE');
    const depth = block.getFieldValue('DEPTH');

    return `const height = (Math.sqrt(3) / 2) * ${size};
const startX = p.width / 2;
const startY = (p.height - height) / 2;
const triangle = new SierpinskiTriangle(p, startX, startY, ${size}, ${depth});
triangle.drawAll();\n`;
};


// create_sierpinski
javascript.javascriptGenerator.forBlock['create_sierpinski'] = function (block) {
    const varName = javascript.javascriptGenerator.nameDB_.getName(
      block.getFieldValue('VAR'),
      Blockly.VARIABLE_CATEGORY_NAME
    );
  
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
    const size = javascript.javascriptGenerator.valueToCode(block, 'SIZE', javascript.Order.NONE) || '0';
    const depth = block.getFieldValue('DEPTH');
  
    return `const ${varName} = new SierpinskiTriangle(p, ${x}, ${y}, ${size}, ${depth});\n`;
  };
  


// draw_sierpinski_instance
javascript.javascriptGenerator.forBlock['draw_sierpinski_instance'] = function (block) {
    const varName = javascript.javascriptGenerator.nameDB_.getName(
        block.getFieldValue('VAR'),
        Blockly.VARIABLE_CATEGORY_NAME
    );
    return `${varName}.drawAll();\n`;
};

//'draw_single_triangle'
javascript.javascriptGenerator.forBlock['draw_single_triangle'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || 0;
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || 0;
    const size = javascript.javascriptGenerator.valueToCode(block, 'SIZE', javascript.Order.NONE) || 0;
    return `drawSingleTriangle(${x}, ${y}, ${size});\n`;
};

//'draw_sierpinski_recursive'

javascript.javascriptGenerator.forBlock['draw_sierpinski_recursive'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || 0;
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || 0;
    const size = javascript.javascriptGenerator.valueToCode(block, 'SIZE', javascript.Order.NONE) || 0;
    const depth = javascript.javascriptGenerator.valueToCode(block, 'DEPTH', javascript.Order.NONE) || 0;
    return `drawRecursive(${x}, ${y}, ${size}, ${depth});\n`;
};