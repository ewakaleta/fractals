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
        { "kind": "block", "type": "set_stroke" }
      ]
    }
    // Add more categories
  ]
};

function viewCode() {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  let code = javascript.javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace());

  let codeDiv = document.getElementById('codeDiv');
  let formattedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');
  codeDiv.innerHTML = formattedCode;
}

let currentP5Instance = null; // <- global variable

function runCode() {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  let code = javascript.javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace());

  const wrappedCode = `
    new p5((p) => {
      ${code}
    });
  `;

  try {
    if (currentP5Instance) {
      currentP5Instance.remove(); // kill old sketch
    }

    // Store new instance
    currentP5Instance = eval(wrappedCode);

  } catch (e) {
    console.error("Error running code:", e);
    alert("Error running code:\n" + e);
  }
}

document.getElementById('reset').addEventListener('click', viewCode);
document.getElementById('run').addEventListener('click', runCode);

const workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});


