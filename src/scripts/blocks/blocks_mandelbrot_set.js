import * as Blockly from 'blockly/core';
import * as javascript from 'blockly/javascript';
import { registerFieldAngle } from '@blockly/field-angle';

registerFieldAngle();

Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "draw_mandelbrot",
        "message0": "Create Mandelbrot Set at X: %1 Y: %2 with zoom: %3 and depth: %4 %5 Use color: %6 inside hue: %7 base hue: %8 hue range: %9",
        "args0": [
            { "type": "field_number", "name": "X", "value": 0 },
            { "type": "field_number", "name": "Y", "value": 0 },
            { "type": "field_number", "name": "ZOOM", "value": 300, "min": 1 },
            { "type": "field_number", "name": "DEPTH", "value": 150, "min": 10, "max": 1000 },
            { "type": "input_dummy" },
            { "type": "field_checkbox", "name": "USE_COLOR", "checked": true },
            { "type": "field_angle", "name": "INSIDE HUE", "angle": 90 },
            { "type": "field_angle", "name": "BASE_HUE", "angle": 90 },
            { "type": "field_angle", "name": "HUE_RANGE", "angle": 90 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 295,
        "tooltip": "Draws a Mandelbrot set with customizable color and zoom options.",
        "helpUrl": ""
    }
]);

/**
 * Generates the main Mandelbrot rendering loop with HSB hue conversion.
 * Assumes required variables are declared globally.
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

    // Convert angles (0–360°) to HSB hue values (0–255)
    const insideHueAngle = block.getFieldValue('INSIDE_HUE') || 90;
    const baseHueAngle = block.getFieldValue('BASE_HUE') || 90;
    const hueRangeAngle = block.getFieldValue('HUE_RANGE') || 90;
  
    const insideHue = Math.round((insideHueAngle / 360) * 255);
    const baseHue = Math.round((baseHueAngle / 360) * 255);
    const hueRange = Math.round((hueRangeAngle / 360) * 255);

    return `
  setupPixels(p);
  
  for (let x = 0; x < p.width; x++) {
    for (let y = 0; y < p.height; y++) {
      const { aStart, bStart } = pixelToComplexNum(x, y, ${zoom}, ${offsetX}, ${offsetY});
      const iterations = mandelbrotIteration(aStart, bStart, ${depth});
      determineColors(p, x, y, iterations, ${depth}, ${useColor}, ${baseHue}, ${hueRange}, ${insideHue});
    }
  }
  p.updatePixels();\n`;
};

javascript.javascriptGenerator.forBlock['draw_koch_snowflake'] = function (block) {
    const x = javascript.javascriptGenerator.valueToCode(block, 'X', javascript.Order.NONE) || '0';
    const y = javascript.javascriptGenerator.valueToCode(block, 'Y', javascript.Order.NONE) || '0';
    const length = block.getFieldValue('LENGTH');
    const depth = block.getFieldValue('DEPTH');

    return `generateSnowflake(p, ${x}, ${y}, ${length}, ${depth});
drawSnowflakeEdges(p);\n`;
};