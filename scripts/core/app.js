/**
 * @fileoverview
 * Initializes the Blockly workspace, binds UI buttons, handles code generation,
 * and runs the resulting p5.js sketch.
 *
 * Imports:
 * - `toolbox` for defining available Blockly blocks
 * - `preloadDefaultBlocks` for setting up initial workspace state
 *
 * This file acts as the main controller for the Blockly + p5 integration.
 */

import { toolbox } from './toolbox.js';
import { preloadDefaultBlocks } from './preload.js';


let currentP5Instance = null;

/**
 * Executes the user's Blockly-generated code in a new p5.js instance.
 * Replaces any previously running p5 sketch.
 *
 * @function
 * @returns {void}
 */
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

/**
 * Displays the user's generated code (JavaScript) with syntax highlighting.
 * The code is shown in the #codeDiv element.
 *
 * @function
 * @returns {void}
 */
function viewCode() {
  const code = javascript.javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace());
  const formattedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');
  const codeDiv = document.getElementById('codeDiv');

  codeDiv.innerHTML = `
    <pre class="language-javascript"><code class="language-javascript">${formattedCode}</code></pre>
  `;
}

// =============================
// Initialize Blockly Workspace
// =============================

/**
 * Injects the Blockly workspace with zoom/grid options and the toolbox.
 * Then preloads default blocks and runs the sketch.
 */
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

/**
 * Custom tooltip look (hover on block)
 * Displays the code that the block is generating, formatted and highlighted using Prism
 */

Blockly.Tooltip.setCustomTooltip(function (div, element) {
  const codeSnippet = Blockly.Tooltip.getTooltipOfObject(element);
  div.innerHTML = '';

  const highlightedCode = Prism.highlight(codeSnippet, Prism.languages.javascript, 'javascript');

  // Outer container
  const tooltipContainer = document.createElement('div');
  tooltipContainer.style.display = 'inline-block';
  tooltipContainer.style.backgroundColor = '#f8f9fa';
  tooltipContainer.style.borderRadius = '3px';
  tooltipContainer.style.padding = '5px';
  tooltipContainer.style.overflowX = 'auto';

  // Code block
  const codeBlock = document.createElement('pre');
  codeBlock.className = 'language-javascript';
  codeBlock.style.margin = '0';
  codeBlock.style.fontSize = '16px';
  codeBlock.style.lineHeight = '1.5';
  codeBlock.style.whiteSpace = 'pre-wrap';
  codeBlock.style.wordBreak = 'break-word';

  const codeInner = document.createElement('code');
  codeInner.className = 'language-javascript';
  codeInner.innerHTML = highlightedCode;

  codeBlock.appendChild(codeInner);
  tooltipContainer.appendChild(codeBlock);
  div.appendChild(tooltipContainer);
});

// Register Blockly's nameDB for variable handling
javascript.javascriptGenerator.nameDB_ = new Blockly.Names(javascript.javascriptGenerator.RESERVED_WORDS_);
javascript.javascriptGenerator.nameDB_.setVariableMap(workspace.getVariableMap());

preloadDefaultBlocks(workspace);
runCode();

// =============================
// UI Button Event Bindings
// =============================

/**
 * Run button: executes the generated code.
 */
document.getElementById('run').addEventListener('click', runCode);

/**
 * Reset button: clears the workspace, reloads the default blocks, and runs code.
 */
document.getElementById('reset').addEventListener('click', () => {
  workspace.clear();
  preloadDefaultBlocks(workspace);
  runCode();
});

/**
 * Toggle button: switches between block view and code view.
 */
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

/**
 * Toast container for save/load pop-ups.
 */
function showToast(message) {
  const toastElement = document.getElementById('workspaceToast');
  const toastMessage = document.getElementById('toast-message');
  toastMessage.textContent = message;

  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

/**
 * Save button: saves current workspace.
 */
document.getElementById('save').addEventListener('click', () => {
  const state = Blockly.serialization.workspaces.save(workspace);
  localStorage.setItem('workspace-state', JSON.stringify(state));
  showToast('Workspace saved!');
});

/**
 * Load button: loads the saved workspace.
 */
document.getElementById('load').addEventListener('click', () => {
  const stateText = localStorage.getItem('workspace-state');
  if (stateText) {
    const state = JSON.parse(stateText);
    Blockly.serialization.workspaces.load(state, workspace);
    showToast('Workspace loaded!');
  } else {
    showToast('No saved workspace found.');
  }
});

