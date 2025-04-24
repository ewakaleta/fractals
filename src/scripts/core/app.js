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

import p5 from 'p5';

import * as Blockly from 'blockly/core';
import * as javascript from 'blockly/javascript';
import * as En from 'blockly/msg/en';

import '../fractals/tree_fractal.js';
import '../fractals/sierpniski_triangle.js';
import '../fractals/koch_snowflake.js';
import '../fractals/mandelbrot_set.js';

import '../blocks/blocks_structure.js';
import '../blocks/blocks_math.js';
import '../blocks/blocks_tree_fractal.js';
import '../blocks/blocks_sierpniski_triangle.js';
import '../blocks/blocks_koch_snowflake.js';
import '../blocks/blocks_cantor_set.js';
import '../blocks/blocks_mandelbrot_set.js';

import { toolbox } from './toolbox.js';
import { preloadDefaultBlocks } from './preload.js';

let currentP5Instance = null;
Blockly.setLocale(En);

/**
 * Executes the user's Blockly-generated code in a new p5.js instance.
 * Replaces any previously running p5 sketch.
 *
 * @function
 * @returns {void}
 */
function runCode() {
  javaScript.INFINITE_LOOP_TRAP = null;
  const userCode = javascript.javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace());

  const wrappedCode = `
    new p5((p) => {
      ${userCode}
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
  const userCode = javascript.javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace());
  const formattedCode = Prism.highlight(userCode, Prism.languages.javascript, 'javascript');
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
