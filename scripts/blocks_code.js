javascript.javascriptGenerator.forBlock['setup'] = function(block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'do');
    return `p.setup = function() {\n${statements}}\n`;
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
    const r = block.getFieldValue('R');
    const g = block.getFieldValue('G');
    const b = block.getFieldValue('B');
    return `p.background(${r}, ${g}, ${b});\n`;
};

javascript.javascriptGenerator.forBlock['set_stroke'] = function(block) {
    const r = block.getFieldValue('R');
    const g = block.getFieldValue('G');
    const b = block.getFieldValue('B');
    return `p.stroke(${r}, ${g}, ${b});\n`;
};
