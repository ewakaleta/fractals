Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "my_block3",
        "tooltip": "",
        "helpUrl": "",
        "message0": "Create Mandelbrot Set at X: %1 Y: %2 zoom: %3 depth: %4 %5 Use color: %6 base hue: %7 hue range: %8 %9",
        "args0": [
            {
                "type": "field_number",
                "name": "X",
                "value": 0
            },
            {
                "type": "field_number",
                "name": "Y",
                "value": 0
            },
            {
                "type": "field_number",
                "name": "ZOOM",
                "value": 300,
                "min": 1
            },
            {
                "type": "field_number",
                "name": "DEPTH",
                "value": 150,
                "min": 10,
                "max": 1000
            },
            {
                "type": "input_dummy",
                "name": ""
            },
            {
                "type": "field_checkbox",
                "name": "USE_COLOR",
                "checked": "TRUE"
            },
            {
                "type": "field_angle",
                "name": "BASE_HUE",
                "angle": 90
            },
            {
                "type": "field_angle",
                "name": "HUE_RANGE",
                "angle": 90
            },
            {
                "type": "input_dummy",
                "name": ""
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 75
    },
    {
        "type": "draw_mandelbrot",
        "message0": "Create Mandelbrot Set at X: %1 Y: %2 with zoom: %3 and depth: %4 %5 Use color: %6 %7 base hue: %8 hue range: %9",
        "args0": [
            { "type": "field_number", "name": "X", "value": 0 },
            { "type": "field_number", "name": "Y", "value": 0 },
            { "type": "field_number", "name": "ZOOM", "value": 300, "min": 1 },
            { "type": "field_number", "name": "DEPTH", "value": 150, "min": 10, "max": 1000 },
            { "type": "input_dummy" },
            { "type": "field_checkbox", "name": "USE_COLOR", "checked": true },
            { "type": "input_dummy" },
            { "type": "field_angle", "name": "BASE_HUE", "angle": 100 },
            { "type": "field_angle", "name": "HUE_RANGE", "angle": 100 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 295,
        "tooltip": "Draws a Mandelbrot set with customizable color and zoom options.",
        "helpUrl": ""
    }
]);

