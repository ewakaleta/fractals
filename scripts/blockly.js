const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Setup",
      "colour": "#BCAAA4", // category color
      "contents": [
        { "kind": "block", "type": "setup" },
        { "kind": "block", "type": "create_canvas" },
        { "kind": "block", "type": "set_background" },
        { "kind": "block", "type": "set_background_rgb" },
        { "kind": "block", "type": "set_stroke" }
      ]
    },
    {
      "kind": "category",
      "name": "Draw",
      "colour": "#90CAF9",
      "contents": [
        { "kind": "block", "type": "draw" },
        { "kind": "block", "type": "draw_tree_fractal" }
      ]
    }    
  ]
};

function viewCode() {
  const code = javascript.javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace());

  const formattedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');
  const codeDiv = document.getElementById('codeDiv');

  codeDiv.innerHTML = `
    <pre class="language-javascript"><code class="language-javascript">${formattedCode}</code></pre>
  `;
}

// document.getElementById('reset').addEventListener('click', viewCode);
document.getElementById('run').addEventListener('click', runCode);

// Reset
document.getElementById('reset').addEventListener('click', () => {
  workspace.clear(); // Remove all blocks
  preloadDefaultBlocks(workspace); // Reload the default ones
  runCode();
});

// Toggle between Blockly and Code View
document.getElementById('toggle-code-view').addEventListener('click', () => {
  const blocklyDiv = document.getElementById('blocklyDiv');
  const codeDiv = document.getElementById('codeDiv');
  const button = document.getElementById('toggle-code-view');

  if (codeDiv.classList.contains('d-none')) {
    viewCode();
    codeDiv.classList.remove('d-none');
    blocklyDiv.classList.add('d-none');
    button.textContent = 'Back to Blocks';
  } else {
    codeDiv.classList.add('d-none');
    blocklyDiv.classList.remove('d-none');
    button.textContent = 'Show Code';
  }
});


let currentP5Instance = null; // <- global variable

function runCode() {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  const code = javascript.javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace());

  const wrappedCode = `
    new p5((p) => {
      ${code}
    });
  `;

  try {
    if (currentP5Instance) {
      currentP5Instance.remove();
    }

    currentP5Instance = eval(wrappedCode);
  } catch (e) {
    console.error("Error running code:", e);
    alert("Error running code:\n" + e);
  }
}

document.getElementById('reset').addEventListener('click', viewCode);
document.getElementById('run').addEventListener('click', runCode);

function preloadDefaultBlocks(workspace) {
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

  // Chain them: canvas -> background -> stroke
  canvasBlock.nextConnection.connect(backgroundBlock.previousConnection);
  backgroundBlock.nextConnection.connect(strokeBlock.previousConnection);

  // Insert the chain into setup's "do" input
  const setupDoInput = setupBlock.getInput('do');
  if (setupDoInput && setupDoInput.connection) {
    setupDoInput.connection.connect(canvasBlock.previousConnection);
  }
}

const workspace = Blockly.inject('blocklyDiv', {
  toolbox: toolbox,
  css: true,
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.2,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  },
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true
  }
});

preloadDefaultBlocks(workspace); 
runCode(); 
