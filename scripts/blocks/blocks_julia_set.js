// ================================
// Julia Set blocks definition
// ================================

Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "all_in_julia_set",
        "message0": "Create Julia Set at X: %1 Y: %2 with zoom: %3 and depth: %4 %5 Use color: %6 base hue: %7 hue range: %8",
        "args0": [
            { "type": "field_number", "name": "X", "value": 0 },
            { "type": "field_number", "name": "Y", "value": 0 },
            { "type": "field_number", "name": "ZOOM", "value": 1.5, "min": 1 },
            { "type": "field_number", "name": "DEPTH", "value": 300, "min": 10, "max": 1000 },
            { "type": "input_dummy" },
            { "type": "field_checkbox", "name": "USE_COLOR", "checked": true },
            { "type": "field_number", "name": "BASE_HUE", "value": 120, "min": 0, "max": 255 },
            { "type": "field_number", "name": "HUE_RANGE", "value": 100, "min": 0, "max": 255 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": `drawJuliaSet(p, offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange)`,
        "helpUrl": ""
    },
    {
        "type": "draw_julia_set_definition",
        "message0": "Describe how to draw the Julia Set",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `function drawJuliaSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange) {
    setupPixels(p); // Prepare the canvas to manipulate pixels directly

    // Loop through every pixel on the canvas
    for (let x = 0; x < p.width; x++) {
        for (let y = 0; y < p.height; y++) {
            // Convert pixel to complex number
            const { a, b } = pixelToComplexNumJulia(p, x, y, zoom, offsetX, offsetY);

            // Get iteration count for this point
            const iterations = juliaSetIterations(a, b, depth);

            // Color this pixel based on result
            determineColorsJulia(p, x, y, iterations, depth, useColor, baseHue, hueRange);
        }
    }

    p.updatePixels();
}`,
        "helpUrl": ""
    },
    {
        "type": "draw_julia_set",
        "message0": "Draw Julia Set at X: %1 Y: %2 with zoom: %3 and depth: %4 %5 Use color: %6 base hue: %7 hue range: %8",
        "args0": [
            { "type": "field_number", "name": "X", "value": 0 },
            { "type": "field_number", "name": "Y", "value": 0 },
            { "type": "field_number", "name": "ZOOM", "value": 1.5, "min": 1 },
            { "type": "field_number", "name": "DEPTH", "value": 300, "min": 10, "max": 1000 },
            { "type": "input_dummy" },
            { "type": "field_checkbox", "name": "USE_COLOR", "checked": true },
            { "type": "field_number", "name": "BASE_HUE", "value": 120, "min": 0, "max": 255 },
            { "type": "field_number", "name": "HUE_RANGE", "value": 100, "min": 0, "max": 255 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": `drawJuliaSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange)`,
        "helpUrl": ""
    },
    {
        "type": "define_draw_julia_set",
        "message0": "define function drawJuliaSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange) %1 %2",
        "args0": [
            { "type": "input_dummy" },
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "colour": 345,
        "tooltip": `function drawJuliaSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange) {\n}`,
        "helpUrl": "",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "pixel_to_complex_julia",
        "message0": "convert a pixel to a complex number for Julia Set",
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": `// Map pixel to complex plane
let a = p.map(x, 0, p.width, -zoom + offsetX, zoom + offsetX);
let b = p.map(y, 0, p.height, -zoom + offsetY, zoom + offsetY);`,
        "helpUrl": ""
    },
    {
        "type": "julia_set_iteration_loop",
        "message0": "perform Julia Set iterations",
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": `let n = 0;
const cRe = -0.7;    // Real part of constant c
const cIm = 0.27015; // Imaginary part of constant c

// Perfrom Julia iteration
while (n < maxIterations) {
    // z^2 = (a + bi)^2 = a^2 - b^2 + 2ab*i
    let aa = a * a - b * b; // Real part of z^2
    let bb = 2 * a * b; // Imaginary part of z^2

    // z = z^2 + c (where c is a fixed constant unique to the Julia Set)
    a = aa + cRe;
    b = bb + cIm;

    // If magnitude of z exceeds 4 (|z|^2 > 16), assume it escapes
    if (a * a + b * b > 16) {
        break;
    }

    n++; // Increase iteration count
}`,
        "helpUrl": ""
    },
    {
        "type": "julia_set_determine_color",
        "message0": "determine color of pixel",
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": `
let color;

if (useColor) { //If useColor selected enable HSB color mode
    p.colorMode(p.HSB, 255);
    if (n === maxIterations) {
        color = p.color(255, 255, 0); // Inside points: black
    } else {
        const hue = p.map(n, 0, maxIterations, baseHue, baseHue + hueRange);
        color = p.color(hue % 255, 255, 255); // Outside: gradient hue
    }
} else {
    // Grayscale when useColor not selected
    const brightness = n === maxIterations ? 0 : p.map(n, 0, maxIterations, 0, 255);
    color = p.color(brightness);
}

// Set pixel color
const pix = (x + y * p.width) * 4;
p.pixels[pix + 0] = p.red(color); // Red component
p.pixels[pix + 1] = p.green(color); // Green component
p.pixels[pix + 2] = p.blue(color); // Blue component
p.pixels[pix + 3] = 255; // Full opacity`,
        "helpUrl": ""
    },
    {
        "type": "call_draw_julia_set",
        "message0": "Call drawJuliaSet() at X: %1 Y: %2 with zoom: %3 and depth: %4 %5 Use color: %6 base hue: %7 hue range: %8",
        "args0": [
            { "type": "field_number", "name": "X", "value": 0 },
            { "type": "field_number", "name": "Y", "value": 0 },
            { "type": "field_number", "name": "ZOOM", "value": 1.5, "min": 1 },
            { "type": "field_number", "name": "DEPTH", "value": 300, "min": 10, "max": 1000 },
            { "type": "input_dummy" },
            { "type": "field_checkbox", "name": "USE_COLOR", "checked": true },
            { "type": "field_number", "name": "BASE_HUE", "value": 120, "min": 0, "max": 255 },
            { "type": "field_number", "name": "HUE_RANGE", "value": 100, "min": 0, "max": 255 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": `drawJuliaSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange)`,
        "helpUrl": ""
    },
])

// ================================
// Blockly → JavaScript Generator
// ================================

/**
 * Generates the main Julia Set rendering loop with HSB hue conversion.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['all_in_julia_set'] = function (block) {
    const offsetX = block.getFieldValue('X');
    const offsetY = block.getFieldValue('Y');
    const zoom = block.getFieldValue('ZOOM');
    const depth = block.getFieldValue('DEPTH');

    const useColor = block.getFieldValue('USE_COLOR') === 'TRUE';
    const baseHue = block.getFieldValue('BASE_HUE');
    const hueRange = block.getFieldValue('HUE_RANGE');


    return `drawJuliaSet(p, ${offsetX}, ${offsetY}, ${zoom}, ${depth}, ${useColor}, ${baseHue}, ${hueRange})`;
};

/**
 * Generates the JavaScript code that defines the drawJuliaSet() function.
 * 
 * This function loops through every pixel on the canvas, converts each pixel
 * to a complex number using the Julia coordinate mapping, runs Julia iteration
 * to determine how fast the point escapes, and then sets the pixel color
 * accordingly using HSB or grayscale based on the settings.
 *
 * Relies on helper functions:
 * - setupPixels(p)
 * - pixelToComplexNumJulia(p, x, y, zoom, offsetX, offsetY)
 * - juliaSetIterations(a, b, depth)
 * - determineColorsJulia(p, x, y, iterations, depth, useColor, baseHue, hueRange)
 *
 * @param {Blockly.Block} block - The block that contains this function definition.
 * @returns {string} - JavaScript code for defining the full drawJuliaSet function.
 */
javascript.javascriptGenerator.forBlock['draw_julia_set_definition'] = function (block) {
    return `function drawJuliaSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange) {
    setupPixels(p); // Prepare the canvas to manipulate pixels directly

    // Loop through every pixel on the canvas
    for (let x = 0; x < p.width; x++) {
        for (let y = 0; y < p.height; y++) {
            // Convert pixel to complex number
            const { a, b } = pixelToComplexNumJulia(p, x, y, zoom, offsetX, offsetY);

            // Get iteration count for this point
            const iterations = juliaSetIterations(a, b, depth);

            // Color this pixel based on result
            determineColorsJulia(p, x, y, iterations, depth, useColor, baseHue, hueRange);
        }
    }

    p.updatePixels();
}`;
};

/**
 * Generates JavaScript code to call drawJuliaSet() with specific user-provided values.
 *
 * The block retrieves offset values (X, Y), zoom, iteration depth, and coloring
 * options (useColor, baseHue, hueRange), and passes them into the function call.
 *
 * @param {Blockly.Block} block - Block with input fields for controlling Julia Set parameters.
 * @returns {string} - Function call to drawJuliaSet(...) with the selected parameters.
 */
javascript.javascriptGenerator.forBlock['draw_julia_set'] = function (block) {
    const offsetX = block.getFieldValue('X');
    const offsetY = block.getFieldValue('Y');
    const zoom = block.getFieldValue('ZOOM');
    const depth = block.getFieldValue('DEPTH');

    const useColor = block.getFieldValue('USE_COLOR') === 'TRUE';
    const baseHue = block.getFieldValue('BASE_HUE');
    const hueRange = block.getFieldValue('HUE_RANGE');


    return `drawJuliaSet(${offsetX}, ${offsetY}, ${zoom}, ${depth}, ${useColor}, ${baseHue}, ${hueRange})`;
};

/**
 * Generates JavaScript code to define a function called drawJuliaSet() with seven parameters:
 * offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange.
 * The block allows users to insert statements into the body of the function via a statement input.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['define_draw_julia_set'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    const code = `function drawJuliaSet(offsetX, offsetY, zoom, depth, useColor, baseHue, hueRange) {${statements}}\n\n`;
    return code;
};

/**
 * Generates code to convert screen pixels to complex numbers for Julia Set calculation.
 *
 * @param {Blockly.Block} block
 * @returns {string} JavaScript code
 */
javascript.javascriptGenerator.forBlock['pixel_to_complex_julia'] = function (block) {
    return `// Map pixel to complex plane
let a = p.map(x, 0, p.width, -zoom + offsetX, zoom + offsetX);
let b = p.map(y, 0, p.height, -zoom + offsetY, zoom + offsetY);\n\n`;
};

/**
 * Generates JavaScript code for Julia Set iteration logic.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['julia_set_iteration_loop'] = function (block) {
    return `let n = 0;
const cRe = -0.7;    // Real part of constant c
const cIm = 0.27015; // Imaginary part of constant c

// Julia iteration
while (n < depth) {
    // z^2 = (a + bi)^2 = a^2 - b^2 + 2ab*i
    let aa = a * a - b * b;
    let bb = 2 * a * b;

    // z = z^2 + c (where c is a fixed constant unique to the Julia Set)
    a = aa + cRe;
    b = bb + cIm;

    // If magnitude of z exceeds 4 (|z|^2 > 16), assume it escapes
    if (a * a + b * b > 16) {
        break;
    }
    
    n++; // Increase iteration count
}\n\n`;
};

/**
 * Generates JavaScript code for determining the pixel color based on Julia Set iteration.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['julia_set_determine_color'] = function (block) {
    return `let color;

if (useColor) { //If useColor selected enable HSB color mode
    p.colorMode(p.HSB, 255);
    if (n === depth) {
        color = p.color(255, 255, 0); // Inside points: black
    } else {
        const hue = p.map(n, 0, depth, baseHue, baseHue + hueRange);
        color = p.color(hue % 255, 255, 255); // Outside: gradient hue
    }
} else {
    // Grayscale when useColor not selected
    const brightness = n === depth ? 0 : p.map(n, 0, depth, 0, 255);
    color = p.color(brightness);
}

// Set pixel color
const pix = (x + y * p.width) * 4;
p.pixels[pix + 0] = p.red(color); // Red component
p.pixels[pix + 1] = p.green(color); // Green component
p.pixels[pix + 2] = p.blue(color); // Blue component
p.pixels[pix + 3] = 255 // Full opacity;`;
};

/**
 * Calls the drawJuliaSet() function.
 *
 * @param {Blockly.Block} block
 * @returns {string}
 */
javascript.javascriptGenerator.forBlock['call_draw_julia_set'] = function (block) {
    const offsetX = block.getFieldValue('X');
    const offsetY = block.getFieldValue('Y');
    const zoom = block.getFieldValue('ZOOM');
    const depth = block.getFieldValue('DEPTH');

    const useColor = block.getFieldValue('USE_COLOR') === 'TRUE';
    const baseHue = block.getFieldValue('BASE_HUE');
    const hueRange = block.getFieldValue('HUE_RANGE');

    return `drawJuliaSet(${offsetX}, ${offsetY}, ${zoom}, ${depth}, ${useColor}, ${baseHue}, ${hueRange})\n`;
};

