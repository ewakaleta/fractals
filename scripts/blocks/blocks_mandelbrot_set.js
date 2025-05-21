// ================================
// Mandelbrot Set blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "all_in_mandelbrot_set",
    "message0": "Create Mandelbrot Set at X: %1 Y: %2 with zoom: %3 and depth: %4 %5 Use color: %6 base hue: %7 hue range: %8",
    "args0": [
      { "type": "field_number", "name": "X", "value": -1.75 },
      { "type": "field_number", "name": "Y", "value": -1.25 },
      { "type": "field_number", "name": "ZOOM", "value": 300, "min": 1 },
      { "type": "field_number", "name": "DEPTH", "value": 150, "min": 10, "max": 1000 },
      { "type": "input_dummy" },
      { "type": "field_checkbox", "name": "USE_COLOR", "checked": true },
      { "type": "field_number", "name": "BASE_HUE", "value": 55, "min": 0, "max": 255 },
      { "type": "field_number", "name": "HUE_RANGE", "value": 110, "min": 0, "max": 255 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": `mandelbrotSet(p, offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange)`,
    "helpUrl": ""
  },
  {
    "type": "draw_mandelbrot_definition",
    "message0": "Describe how to draw a Mandelbrot Set",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": `function mandelbrotSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange) {
  setupPixels(p); // Prepare the canvas to manipulate pixels directly

  // Loop through every pixel on the canvas
  for (let x = 0; x < p.width; x++) {
    for (let y = 0; y < p.height; y++) {
      // Map pixel coordinates to a complex number
      const { aStart, bStart } = pixelToComplexNumMandelbrot(x, y, zoom, offsetX, offsetY);

      // Run Mandelbrot iteration to determine escape time
      const iterations = mandelbrotIteration(aStart, bStart, depth);

      // Set pixel color based on iteration count and chosen coloring mode
      determineColorsMandelbrot(p, x, y, iterations, depth, useColor, baseHue, hueRange);
    }
  }

  p.updatePixels();
}`,
    "helpUrl": ""
  },
  {
    "type": "draw_mandelbrot",
    "message0": "Draw Mandelbrot Set at X: %1 Y: %2 with zoom: %3 and depth: %4 %5 Use color: %6 base hue: %7 hue range: %8",
    "args0": [
      { "type": "field_number", "name": "X", "value": -1.75 },
      { "type": "field_number", "name": "Y", "value": -1.25 },
      { "type": "field_number", "name": "ZOOM", "value": 300, "min": 1 },
      { "type": "field_number", "name": "DEPTH", "value": 150, "min": 10, "max": 1000 },
      { "type": "input_dummy" },
      { "type": "field_checkbox", "name": "USE_COLOR", "checked": true },
      { "type": "field_number", "name": "BASE_HUE", "value": 55, "min": 0, "max": 255 },
      { "type": "field_number", "name": "HUE_RANGE", "value": 110, "min": 0, "max": 255 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": `mandelbrotSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange)`,
    "helpUrl": ""
  },
  {
    "type": "setup_pixels",
    "message0": "setupPixels(p)",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `setupPixels(p);`,
    "helpUrl": ""
  },
  {
    "type": "define_mandelbrot_set",
    "message0": "define function mandelbrotSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange) %1 %2",
    "args0": [
      { "type": "input_dummy" },
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "colour": 345,
    "tooltip": `function mandelbrotSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange) {\n}`,
    "helpUrl": "",
    "previousStatement": null,
    "nextStatement": null
  },
  {
    "type": "pixel_loop",
    "message0": "for every pixel (x, y) on the canvas %1 %2",
    "args0": [
      { "type": "input_dummy" },
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `for (let x = 0; x < p.width; x++) {
  for (let y = 0; y < p.height; y++) {
    }\n}`,
    "helpUrl": ""
  },
  {
    "type": "pixel_to_complex_mandelbrot",
    "message0": "convert a pixel to a complex number for Mandelbrot",
    "args0": [],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `const aStart = x / zoom + offsetX;\nconst bStart = y / zoom + offsetY;`,
    "helpUrl": ""
  },
  {
    "type": "mandelbrot_iteration_loop",
    "message0": "perform Mandelbrot iterations",
    "args0": [],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `// Initialize the complex number z = 0 + 0i
let a = 0;
let b = 0;
let n = 0;

// Perform Mandelbrot iteration
while (n < depth) {
  // z^2 = (a + bi)^2 = a^2 - b^2 + 2ab*i
  const aa = a * a - b * b;  // Real part of z^2
  const bb = 2 * a * b;      // Imaginary part of z^2

  // z = z^2 + c (where c = aStart + bStart*i)
  a = aa + aStart;
  b = bb + bStart;

  // If magnitude of z exceeds 2 (|z|^2 > 4), assume it escapes
  if (a * a + b * b > 4) break;

  // Increase iteration count
  n++;
}`,
    "helpUrl": ""
  },
  {
    "type": "mandelbrot_determine_color",
    "message0": "determine color of pixel",
    "args0": [],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `// Determine the color of the pixel
let col;
if (useColor) { //If useColor selected enable HSB color mode
  p.colorMode(p.HSB, 255);

  if (n === depth) {
    // Inside the Mandelbrot set → black
    col = p.color(255, 255, 0);
  } else {
    // Outside the set → map iteration count to hue
    const hue = p.map(n, 0, depth, baseHue, baseHue + hueRange);
    col = p.color(hue % 255, 255, 255);
  }
} else {
  // Grayscale when useColor not selected
  const bright = n === depth ? 0 : p.map(n, 0, depth, 0, 255);
  col = p.color(bright); // Brightness only
}

// Write computed color to pixel buffer
const pix = (x + y * p.width) * 4;
p.pixels[pix + 0] = p.red(col);   // Red component
p.pixels[pix + 1] = p.green(col); // Green component
p.pixels[pix + 2] = p.blue(col);  // Blue component
p.pixels[pix + 3] = 255;        // Full opacity`,
    "helpUrl": ""
  },
  {
    "type": "update_pixels",
    "message0": "update pixel buffer",
    "args0": [],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `p.updatePixels();`,
    "helpUrl": ""
  },
  {
    "type": "call_mandelbrot",
    "message0": "Call mandelbrotSet() function at X: %1 Y: %2 with zoom: %3 and depth: %4 %5 Use color: %6 base hue: %7 hue range: %8",
    "args0": [
      { "type": "field_number", "name": "X", "value": -1.75 },
      { "type": "field_number", "name": "Y", "value": -1.25 },
      { "type": "field_number", "name": "ZOOM", "value": 300, "min": 1 },
      { "type": "field_number", "name": "DEPTH", "value": 150, "min": 10, "max": 1000 },
      { "type": "input_dummy" },
      { "type": "field_checkbox", "name": "USE_COLOR", "checked": true },
      { "type": "field_number", "name": "BASE_HUE", "value": 55, "min": 0, "max": 255 },
      { "type": "field_number", "name": "HUE_RANGE", "value": 110, "min": 0, "max": 255 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": `mandelbrotSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange)`,
    "helpUrl": ""
  },

]);

// ================================
// Blockly → JavaScript Generator
// ================================

/**
 * Generates the main Mandelbrot rendering loop with HSB hue conversion.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['all_in_mandelbrot_set'] = function (block) {
  const offsetX = block.getFieldValue('X');
  const offsetY = block.getFieldValue('Y');
  const zoom = block.getFieldValue('ZOOM');
  const depth = block.getFieldValue('DEPTH');

  const useColor = block.getFieldValue('USE_COLOR') === 'TRUE';
  const baseHue = block.getFieldValue('BASE_HUE');
  const hueRange = block.getFieldValue('HUE_RANGE');


  return `mandelbrotSet(p, ${ offsetX }, ${ offsetY }, ${ zoom }, ${ depth }, ${ useColor }, ${ baseHue }, ${ hueRange })`;
};

/**
 * Generates the main Mandelbrot rendering loop with HSB hue conversion.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['draw_mandelbrot_definition'] = function (block) {
  return `function mandelbrotSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange) {
  setupPixels(p); // Prepare the canvas to manipulate pixels directly

  // Loop through every pixel on the canvas
  for (let x = 0; x < p.width; x++) {
    for (let y = 0; y < p.height; y++) {
      // Map pixel coordinates to a complex number
      const { aStart, bStart } = pixelToComplexNumMandelbrot(x, y, zoom, offsetX, offsetY);

      // Run Mandelbrot iteration to determine escape time
      const iterations = mandelbrotIteration(aStart, bStart, depth);

      // Set pixel color based on iteration count and chosen coloring mode
      determineColorsMandelbrot(p, x, y, iterations, depth, useColor, baseHue, hueRange);
    }
  }

  p.updatePixels();
}\n\n`
};

/**
 * Calls mandelbrotSet() defined by the user
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['draw_mandelbrot'] = function (block) {
  const offsetX = block.getFieldValue('X');
  const offsetY = block.getFieldValue('Y');
  const zoom = block.getFieldValue('ZOOM');
  const depth = block.getFieldValue('DEPTH');

  const useColor = block.getFieldValue('USE_COLOR') === 'TRUE';
  const baseHue = block.getFieldValue('BASE_HUE');
  const hueRange = block.getFieldValue('HUE_RANGE');


  return `mandelbrotSet(${ offsetX }, ${ offsetY }, ${ zoom }, ${ depth }, ${ useColor }, ${ baseHue }, ${ hueRange })\n\n`;
};

/**
 * Generates JavaScript code for the 'setupPixels(p)' block.
 * This block initializes the pixel system in p5.js by setting pixel density to 1
 * and loading the pixel array, preparing it for direct pixel manipulation.
 *
 * @param {Blockly.Block} block - The block instance.
 * @returns {string} - The JavaScript code string.
 */
javascript.javascriptGenerator.forBlock['setup_pixels'] = function () {
  return 'setupPixels(p);\n\n';
};

/**
 * Generates JavaScript code to define a function called mandelbrotSet with seven parameters:
 * offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange.
 * The block allows users to insert statements into the body of the function via a statement input.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['define_mandelbrot_set'] = function(block) {
  const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
  const code = `function mandelbrotSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange) {${statements}}\n\n`;
  return code;
};

/**
 * Generates JavaScript code for looping through every pixel (x, y) on the canvas.
 * Nested for-loops iterate through p.width and p.height.
 *
 * @param {Blockly.Block} block - The block instance.
 * @returns {string} - JavaScript code that wraps user statements inside the double loop.
 */
javascript.javascriptGenerator.forBlock['pixel_loop'] = function (block) {
  const innerCode = javascript.javascriptGenerator.statementToCode(block, 'DO');
  return `
for (let x = 0; x < p.width; x++) {
  for (let y = 0; y < p.height; y++) {
${innerCode}
  }
}\n\n`;
};

/**
 * Generates code to convert screen pixels to complex numbers for Mandelbrot calculation.
 *
 * @param {Blockly.Block} block
 * @returns {string} JavaScript code
 */
javascript.javascriptGenerator.forBlock['pixel_to_complex_mandelbrot'] = function (block) {
  return `const aStart = x / zoom + offsetX;\nconst bStart = y / zoom + offsetY;\n\n`;
};

/**
 * Generates JavaScript code for Mandelbrot iteration logic.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['mandelbrot_iteration_loop'] = function (block) {
  return `// Initialize the complex number z = 0 + 0i
let a = 0;
let b = 0;
let n = 0;

// Perform Mandelbrot iteration
while (n < depth) {
  // z^2 = (a + bi)^2 = a^2 - b^2 + 2ab*i
  const aa = a * a - b * b;  // Real part of z^2
  const bb = 2 * a * b;      // Imaginary part of z^2

  // z = z^2 + c (where c = aStart + bStart*i)
  a = aa + aStart;
  b = bb + bStart;

  // If magnitude of z exceeds 2 (|z|^2 > 4), assume it escapes
  if (a * a + b * b > 4) break;

  // Increase iteration count
  n++;
}
`;
};

/**
 * Generates JavaScript code for determining the pixel color based on Mandelbrot iteration.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['mandelbrot_determine_color'] = function (block) {
  return `
// Determine the color of the pixel
let col;
if (useColor) { //If useColor selected enable HSB color mode
  p.colorMode(p.HSB, 255);

  if (n === depth) {
    // Inside the Mandelbrot set → black
    col = p.color(255, 255, 0);
  } else {
    // Outside the set → map iteration count to hue
    const hue = p.map(n, 0, depth, baseHue, baseHue + hueRange);
    col = p.color(hue % 255, 255, 255);
  }
} else {
  // Grayscale when useColor not selected
  const bright = n === depth ? 0 : p.map(n, 0, depth, 0, 255);
  col = p.color(bright); // Brightness only
}

// Write computed color to pixel buffer
const pix = (x + y * p.width) * 4;
p.pixels[pix + 0] = p.red(col);   // Red component
p.pixels[pix + 1] = p.green(col); // Green component
p.pixels[pix + 2] = p.blue(col);  // Blue component
p.pixels[pix + 3] = 255;        // Full opacity
`;
};

/**
 * Generates code to update the pixel buffer using p.updatePixels().
 * 
 * @param {Blockly.Block} block
 * @returns {string} JavaScript code
 */
javascript.javascriptGenerator.forBlock['update_pixels'] = function (block) {
  return `p.updatePixels();\n`;
};

/**
 * Calls the mandelbrotSet() function.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['call_mandelbrot'] = function (block) {
  const offsetX = block.getFieldValue('X');
  const offsetY = block.getFieldValue('Y');
  const zoom = block.getFieldValue('ZOOM');
  const depth = block.getFieldValue('DEPTH');

  const useColor = block.getFieldValue('USE_COLOR') === 'TRUE';
  const baseHue = block.getFieldValue('BASE_HUE');
  const hueRange = block.getFieldValue('HUE_RANGE');

  return `mandelbrotSet(${ offsetX }, ${ offsetY }, ${ zoom }, ${ depth }, ${ useColor }, ${ baseHue }, ${ hueRange })\n`;
};