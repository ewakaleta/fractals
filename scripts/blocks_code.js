// Setup blocks
javascript.javascriptGenerator.forBlock['setup'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'do');
    return `p.setup = function() {\n${statements}};\n`;
};

javascript.javascriptGenerator.forBlock['create_canvas'] = function(block) {
    const width = block.getFieldValue('WIDTH');
    const height = block.getFieldValue('HEIGHT');
    return `
      let myCanvas = p.createCanvas(${width}, ${height});
      myCanvas.parent("canvas-area");
    `;
};

javascript.javascriptGenerator.forBlock['set_background'] = function(block) {
    const colorValue = block.getFieldValue('COLOR');
    return `p.background(${colorValue});\n`;
};

javascript.javascriptGenerator.forBlock['set_background_rgb'] = function(block) {
    const r = block.getFieldValue('R');
    const g = block.getFieldValue('G');
    const b = block.getFieldValue('B');
    return `p.background(${r}, ${g}, ${b});\n`;
};

javascript.javascriptGenerator.forBlock['set_stroke'] = function(block) {
    const colorValue = block.getFieldValue('COLOR');
    return `p.stroke(${colorValue});\n`;
};

javascript.javascriptGenerator.forBlock['set_stroke_rgb'] = function(block) {
    const r = block.getFieldValue('R');
    const g = block.getFieldValue('G');
    const b = block.getFieldValue('B');
    return `p.stroke(${r}, ${g}, ${b});\n`;
};

// Draw blocks
javascript.javascriptGenerator.forBlock['draw'] = function(block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'do');
    return `p.draw = function() {\n${statements}};\n`;
  };

// Tree fractal
javascript.javascriptGenerator.forBlock['draw_tree_fractal'] = function(block) {
    const length = block.getFieldValue('LENGTH');
    const maxHeight = block.getFieldValue('HEIGHT');
    const weight = block.getFieldValue('WEIGHT');
    const split = block.getFieldValue('SPLIT');
    const rotation = block.getFieldValue('ROTATION');
  
    const code = `
      p.push();
      const start = p.createVector(p.width / 2, p.height);
      const tree = new Branch(p, start, ${length}, 0, 0, ${maxHeight}, ${weight}, ${split}, ${rotation});
      tree.draw();
      p.pop();
    `;
    return code;
  };
  