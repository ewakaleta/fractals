// Cleanup function for indentation
function indentLines(code, indent = '  ') {
  return code.split('\n').map(line => indent + line).join('\n');
}

// Setup block
javascript.javascriptGenerator.forBlock['setup'] = function(block) {
  const statements = javascript.javascriptGenerator.statementToCode(block, 'do');
  return `p.setup = function() {\n${statements}};\n`;
};

// create_canvas block
javascript.javascriptGenerator.forBlock['create_canvas'] = function(block) {
  const width = block.getFieldValue('WIDTH');
  const height = block.getFieldValue('HEIGHT');
  return `let myCanvas = p.createCanvas(${width}, ${height});
myCanvas.parent("canvas-area");\n`;
};

// set_background block
javascript.javascriptGenerator.forBlock['set_background'] = function (block) {
  const colorValue = block.getFieldValue('COLOR');
  return `p.background(${colorValue});\n`;
};

// set_background_rgb block
javascript.javascriptGenerator.forBlock['set_background_rgb'] = function (block) {
  const r = block.getFieldValue('R');
  const g = block.getFieldValue('G');
  const b = block.getFieldValue('B');
  return `p.background(${r}, ${g}, ${b});\n`;
};

// set_stroke block
javascript.javascriptGenerator.forBlock['set_stroke'] = function (block) {
  const colorValue = block.getFieldValue('COLOR');
  return `p.stroke(${colorValue});\n`;
};

// set_stroke_rgb block
javascript.javascriptGenerator.forBlock['set_stroke_rgb'] = function (block) {
  const r = block.getFieldValue('R');
  const g = block.getFieldValue('G');
  const b = block.getFieldValue('B');
  return `p.stroke(${r}, ${g}, ${b});\n`;
};

// draw block
javascript.javascriptGenerator.forBlock['draw'] = function (block) {
  const statements = javascript.javascriptGenerator.statementToCode(block, 'do');
  return `p.draw = function() {\n${statements}};\n`;
};


// draw_tree_fractal block
javascript.javascriptGenerator.forBlock['draw_tree_fractal'] = function(block) {
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


