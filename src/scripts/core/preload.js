/**
 * @fileoverview
 * Preloads a default Blockly workspace configuration that includes:
 * - A `setup` block with canvas setup and background/stroke configuration
 * - A `draw` block appended to the bottom of the `setup` block
 */


export function preloadDefaultBlocks(workspace) {
    // Create the setup block
    const setupBlock = workspace.newBlock('setup');
    setupBlock.initSvg();
    setupBlock.render();
    setupBlock.moveBy(20, 20);

    // Create the create_canvas block
    const canvasBlock = workspace.newBlock('create_canvas');
    canvasBlock.setFieldValue(800, 'WIDTH');
    canvasBlock.setFieldValue(800, 'HEIGHT');
    canvasBlock.initSvg();
    canvasBlock.render();

    // Create the no_loop block
    const noLoopBlock = workspace.newBlock('no_loop');
    noLoopBlock.initSvg();
    noLoopBlock.render();

    // Create the set_background block
    const backgroundBlock = workspace.newBlock('set_background');
    backgroundBlock.setFieldValue('51', 'COLOR'); // Note: this must be a string
    backgroundBlock.initSvg();
    backgroundBlock.render();

    // Create the set_stroke block
    const strokeBlock = workspace.newBlock('set_stroke');
    strokeBlock.setFieldValue('255', 'COLOR'); // Also a string
    strokeBlock.initSvg();
    strokeBlock.render();

    // Chain them: canvas → noLoop → background → stroke
    canvasBlock.nextConnection.connect(noLoopBlock.previousConnection);
    noLoopBlock.nextConnection.connect(backgroundBlock.previousConnection);
    backgroundBlock.nextConnection.connect(strokeBlock.previousConnection);

    // Insert the chain into setup's "do" input
    const setupDoInput = setupBlock.getInput('do');
    if (setupDoInput && setupDoInput.connection) {
        setupDoInput.connection.connect(canvasBlock.previousConnection);
    }

    // Create an empty draw block
    const drawBlock = workspace.newBlock('draw');
    drawBlock.initSvg();
    drawBlock.render();

    // Connect the draw block to the bottom of the setup block
    if (setupBlock.nextConnection && drawBlock.previousConnection) {
        setupBlock.nextConnection.connect(drawBlock.previousConnection);
    }
}