/**
 * CodeSpark — Blockly Editor Setup
 * Custom blocks, toolbox, code generation, and program execution
 */

(function () {
  'use strict';

  const blocklyDiv = document.getElementById('blocklyDiv');
  if (!blocklyDiv) return;

  // ── Sound Engine ────────────────────────────────────────────────
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playTone(freq, duration, type) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function playDrumBeat() {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  }

  // ── Define Custom Blocks ────────────────────────────────────────

  // -- MOTION Blocks --
  Blockly.Blocks['move_forward'] = {
    init: function () {
      this.appendValueInput('STEPS')
        .setCheck('Number')
        .appendField('move forward');
      this.appendDummyInput().appendField('steps');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('Move sprite forward');
    },
  };

  Blockly.Blocks['turn_right'] = {
    init: function () {
      this.appendValueInput('DEGREES')
        .setCheck('Number')
        .appendField('turn right ↻');
      this.appendDummyInput().appendField('degrees');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('Turn sprite clockwise');
    },
  };

  Blockly.Blocks['turn_left'] = {
    init: function () {
      this.appendValueInput('DEGREES')
        .setCheck('Number')
        .appendField('turn left ↺');
      this.appendDummyInput().appendField('degrees');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('Turn sprite counter-clockwise');
    },
  };

  Blockly.Blocks['go_to'] = {
    init: function () {
      this.appendValueInput('X').setCheck('Number').appendField('go to x:');
      this.appendValueInput('Y').setCheck('Number').appendField('y:');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('Move sprite to position');
    },
  };

  Blockly.Blocks['glide_to'] = {
    init: function () {
      this.appendValueInput('SECS').setCheck('Number').appendField('glide');
      this.appendValueInput('X').setCheck('Number').appendField('secs to x:');
      this.appendValueInput('Y').setCheck('Number').appendField('y:');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('Glide to position');
    },
  };

  Blockly.Blocks['point_direction'] = {
    init: function () {
      this.appendValueInput('DEGREES')
        .setCheck('Number')
        .appendField('point in direction');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('Point sprite in a direction (0=up, 90=right)');
    },
  };

  // -- LOOKS Blocks --
  Blockly.Blocks['say_message'] = {
    init: function () {
      this.appendValueInput('MSG').setCheck('String').appendField('say');
      this.appendValueInput('SECS').setCheck('Number').appendField('for');
      this.appendDummyInput().appendField('seconds');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip('Say a message');
    },
  };

  Blockly.Blocks['say_forever'] = {
    init: function () {
      this.appendValueInput('MSG').setCheck('String').appendField('say');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip('Say a message (stays visible)');
    },
  };

  Blockly.Blocks['set_color'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('set sprite color to')
        .appendField(new Blockly.FieldColour('#7c3aed'), 'COLOR');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip('Change sprite color');
    },
  };

  Blockly.Blocks['show_sprite'] = {
    init: function () {
      this.appendDummyInput().appendField('show');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip('Show sprite');
    },
  };

  Blockly.Blocks['hide_sprite'] = {
    init: function () {
      this.appendDummyInput().appendField('hide');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip('Hide sprite');
    },
  };

  Blockly.Blocks['set_size'] = {
    init: function () {
      this.appendValueInput('SIZE').setCheck('Number').appendField('set size to');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip('Set sprite size');
    },
  };

  Blockly.Blocks['change_size'] = {
    init: function () {
      this.appendValueInput('DELTA').setCheck('Number').appendField('change size by');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip('Change sprite size');
    },
  };

  // -- PEN Blocks --
  Blockly.Blocks['pen_down'] = {
    init: function () {
      this.appendDummyInput().appendField('🖊️ pen down');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Start drawing');
    },
  };

  Blockly.Blocks['pen_up'] = {
    init: function () {
      this.appendDummyInput().appendField('🖊️ pen up');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Stop drawing');
    },
  };

  Blockly.Blocks['set_pen_color'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('set pen color to')
        .appendField(new Blockly.FieldColour('#7c3aed'), 'COLOR');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Set pen color');
    },
  };

  Blockly.Blocks['set_pen_width'] = {
    init: function () {
      this.appendValueInput('WIDTH').setCheck('Number').appendField('set pen width to');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Set pen width');
    },
  };

  Blockly.Blocks['clear_drawings'] = {
    init: function () {
      this.appendDummyInput().appendField('🧹 clear all drawings');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Clear all pen drawings');
    },
  };

  // -- SOUND Blocks --
  Blockly.Blocks['play_note'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('🔊 play note')
        .appendField(
          new Blockly.FieldDropdown([
            ['C', '262'],
            ['D', '294'],
            ['E', '330'],
            ['F', '349'],
            ['G', '392'],
            ['A', '440'],
            ['B', '494'],
            ['High C', '523'],
          ]),
          'NOTE'
        );
      this.appendValueInput('DURATION').setCheck('Number').appendField('for');
      this.appendDummyInput().appendField('seconds');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
      this.setTooltip('Play a musical note');
    },
  };

  Blockly.Blocks['play_drum'] = {
    init: function () {
      this.appendDummyInput().appendField('🥁 play drum beat');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
      this.setTooltip('Play a drum beat sound');
    },
  };

  Blockly.Blocks['play_sound_type'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('🎵 play')
        .appendField(
          new Blockly.FieldDropdown([
            ['beep', 'sine'],
            ['buzz', 'sawtooth'],
            ['whistle', 'square'],
            ['hum', 'triangle'],
          ]),
          'TYPE'
        )
        .appendField('sound');
      this.appendValueInput('FREQ').setCheck('Number').appendField('frequency');
      this.appendValueInput('DURATION').setCheck('Number').appendField('for');
      this.appendDummyInput().appendField('sec');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
      this.setTooltip('Play a sound with specific type and frequency');
    },
  };

  // -- CONTROL Blocks --
  Blockly.Blocks['wait_seconds'] = {
    init: function () {
      this.appendValueInput('SECS').setCheck('Number').appendField('wait');
      this.appendDummyInput().appendField('seconds');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
      this.setTooltip('Wait for specified seconds');
    },
  };

  Blockly.Blocks['repeat_times'] = {
    init: function () {
      this.appendValueInput('TIMES').setCheck('Number').appendField('repeat');
      this.appendDummyInput().appendField('times');
      this.appendStatementInput('DO').appendField('do');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
      this.setTooltip('Repeat blocks a number of times');
    },
  };

  // -- EVENT Blocks --
  Blockly.Blocks['when_start'] = {
    init: function () {
      this.appendDummyInput().appendField('🚩 when program starts');
      this.setNextStatement(true, null);
      this.setColour(45);
      this.setTooltip('Run blocks when the program starts');
    },
  };

  Blockly.Blocks['when_key_pressed'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('⌨️ when')
        .appendField(
          new Blockly.FieldDropdown([
            ['space', 'space'],
            ['up arrow', 'ArrowUp'],
            ['down arrow', 'ArrowDown'],
            ['left arrow', 'ArrowLeft'],
            ['right arrow', 'ArrowRight'],
            ['a', 'a'],
            ['b', 'b'],
            ['c', 'c'],
          ]),
          'KEY'
        )
        .appendField('key pressed');
      this.setNextStatement(true, null);
      this.setColour(45);
      this.setTooltip('Run blocks when a key is pressed');
    },
  };

  // ── JavaScript Code Generators ──────────────────────────────────
  // Use the Order enum
  const Order = Blockly.JavaScript.ORDER_NONE || 0;

  Blockly.JavaScript.forBlock['move_forward'] = function (block) {
    const steps = Blockly.JavaScript.valueToCode(block, 'STEPS', Blockly.JavaScript.ORDER_ATOMIC) || '10';
    return `await moveForward(${steps});\n`;
  };

  Blockly.JavaScript.forBlock['turn_right'] = function (block) {
    const deg = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC) || '15';
    return `await turnRight(${deg});\n`;
  };

  Blockly.JavaScript.forBlock['turn_left'] = function (block) {
    const deg = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC) || '15';
    return `await turnLeft(${deg});\n`;
  };

  Blockly.JavaScript.forBlock['go_to'] = function (block) {
    const x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    const y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `await goTo(${x}, ${y});\n`;
  };

  Blockly.JavaScript.forBlock['glide_to'] = function (block) {
    const secs = Blockly.JavaScript.valueToCode(block, 'SECS', Blockly.JavaScript.ORDER_ATOMIC) || '1';
    const x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    const y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `await glide(${x}, ${y}, ${secs});\n`;
  };

  Blockly.JavaScript.forBlock['point_direction'] = function (block) {
    const deg = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC) || '90';
    return `await pointInDirection(${deg});\n`;
  };

  Blockly.JavaScript.forBlock['say_message'] = function (block) {
    const msg = Blockly.JavaScript.valueToCode(block, 'MSG', Blockly.JavaScript.ORDER_ATOMIC) || "''";
    const secs = Blockly.JavaScript.valueToCode(block, 'SECS', Blockly.JavaScript.ORDER_ATOMIC) || '2';
    return `await say(${msg}, ${secs});\nawait waitSeconds(${secs});\n`;
  };

  Blockly.JavaScript.forBlock['say_forever'] = function (block) {
    const msg = Blockly.JavaScript.valueToCode(block, 'MSG', Blockly.JavaScript.ORDER_ATOMIC) || "''";
    return `await say(${msg});\n`;
  };

  Blockly.JavaScript.forBlock['set_color'] = function (block) {
    const color = block.getFieldValue('COLOR');
    return `await setColor('${color}');\n`;
  };

  Blockly.JavaScript.forBlock['show_sprite'] = function () {
    return `await show();\n`;
  };

  Blockly.JavaScript.forBlock['hide_sprite'] = function () {
    return `await hide();\n`;
  };

  Blockly.JavaScript.forBlock['set_size'] = function (block) {
    const size = Blockly.JavaScript.valueToCode(block, 'SIZE', Blockly.JavaScript.ORDER_ATOMIC) || '40';
    return `await setSize(${size});\n`;
  };

  Blockly.JavaScript.forBlock['change_size'] = function (block) {
    const delta = Blockly.JavaScript.valueToCode(block, 'DELTA', Blockly.JavaScript.ORDER_ATOMIC) || '10';
    return `await changeSize(${delta});\n`;
  };

  Blockly.JavaScript.forBlock['pen_down'] = function () {
    return `await penDown();\n`;
  };

  Blockly.JavaScript.forBlock['pen_up'] = function () {
    return `await penUp();\n`;
  };

  Blockly.JavaScript.forBlock['set_pen_color'] = function (block) {
    const color = block.getFieldValue('COLOR');
    return `await setPenColor('${color}');\n`;
  };

  Blockly.JavaScript.forBlock['set_pen_width'] = function (block) {
    const w = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC) || '2';
    return `await setPenWidth(${w});\n`;
  };

  Blockly.JavaScript.forBlock['clear_drawings'] = function () {
    return `await clearDrawings();\n`;
  };

  Blockly.JavaScript.forBlock['play_note'] = function (block) {
    const note = block.getFieldValue('NOTE');
    const dur = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC) || '0.5';
    return `await playNote(${note}, ${dur});\n`;
  };

  Blockly.JavaScript.forBlock['play_drum'] = function () {
    return `await playDrum();\n`;
  };

  Blockly.JavaScript.forBlock['play_sound_type'] = function (block) {
    const type = block.getFieldValue('TYPE');
    const freq = Blockly.JavaScript.valueToCode(block, 'FREQ', Blockly.JavaScript.ORDER_ATOMIC) || '440';
    const dur = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC) || '0.5';
    return `await playSound('${type}', ${freq}, ${dur});\n`;
  };

  Blockly.JavaScript.forBlock['wait_seconds'] = function (block) {
    const secs = Blockly.JavaScript.valueToCode(block, 'SECS', Blockly.JavaScript.ORDER_ATOMIC) || '1';
    return `await waitSeconds(${secs});\n`;
  };

  Blockly.JavaScript.forBlock['repeat_times'] = function (block) {
    const times = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC) || '10';
    const body = Blockly.JavaScript.statementToCode(block, 'DO');
    return `for (let i = 0; i < ${times}; i++) {\n${body}}\n`;
  };

  Blockly.JavaScript.forBlock['when_start'] = function (block) {
    const next = Blockly.JavaScript.statementToCode(block, '');
    // The event hat - code continues from next statement
    return '';
  };

  Blockly.JavaScript.forBlock['when_key_pressed'] = function (block) {
    const key = block.getFieldValue('KEY');
    return `// Key event: ${key}\n`;
  };

  // ── Toolbox Definition ──────────────────────────────────────────
  const toolbox = {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: '🚩 Events',
        colour: 45,
        contents: [
          { kind: 'block', type: 'when_start' },
          { kind: 'block', type: 'when_key_pressed' },
        ],
      },
      {
        kind: 'category',
        name: '🏃 Motion',
        colour: 230,
        contents: [
          {
            kind: 'block',
            type: 'move_forward',
            inputs: { STEPS: { shadow: { type: 'math_number', fields: { NUM: 10 } } } },
          },
          {
            kind: 'block',
            type: 'turn_right',
            inputs: { DEGREES: { shadow: { type: 'math_number', fields: { NUM: 15 } } } },
          },
          {
            kind: 'block',
            type: 'turn_left',
            inputs: { DEGREES: { shadow: { type: 'math_number', fields: { NUM: 15 } } } },
          },
          {
            kind: 'block',
            type: 'go_to',
            inputs: {
              X: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
              Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            },
          },
          {
            kind: 'block',
            type: 'glide_to',
            inputs: {
              SECS: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
              X: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
              Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            },
          },
          {
            kind: 'block',
            type: 'point_direction',
            inputs: { DEGREES: { shadow: { type: 'math_number', fields: { NUM: 90 } } } },
          },
        ],
      },
      {
        kind: 'category',
        name: '👀 Looks',
        colour: 290,
        contents: [
          {
            kind: 'block',
            type: 'say_message',
            inputs: {
              MSG: { shadow: { type: 'text', fields: { TEXT: 'Hello!' } } },
              SECS: { shadow: { type: 'math_number', fields: { NUM: 2 } } },
            },
          },
          {
            kind: 'block',
            type: 'say_forever',
            inputs: {
              MSG: { shadow: { type: 'text', fields: { TEXT: 'Hello!' } } },
            },
          },
          { kind: 'block', type: 'set_color' },
          { kind: 'block', type: 'show_sprite' },
          { kind: 'block', type: 'hide_sprite' },
          {
            kind: 'block',
            type: 'set_size',
            inputs: { SIZE: { shadow: { type: 'math_number', fields: { NUM: 40 } } } },
          },
          {
            kind: 'block',
            type: 'change_size',
            inputs: { DELTA: { shadow: { type: 'math_number', fields: { NUM: 10 } } } },
          },
        ],
      },
      {
        kind: 'category',
        name: '🖊️ Pen',
        colour: 160,
        contents: [
          { kind: 'block', type: 'pen_down' },
          { kind: 'block', type: 'pen_up' },
          { kind: 'block', type: 'set_pen_color' },
          {
            kind: 'block',
            type: 'set_pen_width',
            inputs: { WIDTH: { shadow: { type: 'math_number', fields: { NUM: 2 } } } },
          },
          { kind: 'block', type: 'clear_drawings' },
        ],
      },
      {
        kind: 'category',
        name: '🔊 Sound',
        colour: 330,
        contents: [
          {
            kind: 'block',
            type: 'play_note',
            inputs: { DURATION: { shadow: { type: 'math_number', fields: { NUM: 0.5 } } } },
          },
          { kind: 'block', type: 'play_drum' },
          {
            kind: 'block',
            type: 'play_sound_type',
            inputs: {
              FREQ: { shadow: { type: 'math_number', fields: { NUM: 440 } } },
              DURATION: { shadow: { type: 'math_number', fields: { NUM: 0.5 } } },
            },
          },
        ],
      },
      {
        kind: 'category',
        name: '⏱️ Control',
        colour: 60,
        contents: [
          {
            kind: 'block',
            type: 'wait_seconds',
            inputs: { SECS: { shadow: { type: 'math_number', fields: { NUM: 1 } } } },
          },
          {
            kind: 'block',
            type: 'repeat_times',
            inputs: { TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } } },
          },
          { kind: 'block', type: 'controls_if' },
          { kind: 'block', type: 'controls_ifelse' },
        ],
      },
      {
        kind: 'category',
        name: '🔢 Math',
        colour: 200,
        contents: [
          { kind: 'block', type: 'math_number', fields: { NUM: 0 } },
          { kind: 'block', type: 'math_arithmetic' },
          { kind: 'block', type: 'math_random_int' },
          { kind: 'block', type: 'math_modulo' },
        ],
      },
      {
        kind: 'category',
        name: '📝 Text',
        colour: 120,
        contents: [
          { kind: 'block', type: 'text' },
          { kind: 'block', type: 'text_join' },
          { kind: 'block', type: 'text_length' },
        ],
      },
      {
        kind: 'category',
        name: '🔀 Logic',
        colour: 20,
        contents: [
          { kind: 'block', type: 'logic_compare' },
          { kind: 'block', type: 'logic_operation' },
          { kind: 'block', type: 'logic_negate' },
          { kind: 'block', type: 'logic_boolean' },
        ],
      },
      {
        kind: 'category',
        name: '📦 Variables',
        colour: 350,
        custom: 'VARIABLE',
      },
    ],
  };

  // ── Inject Blockly ──────────────────────────────────────────────
  const workspace = Blockly.inject(blocklyDiv, {
    toolbox: toolbox,
    grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
    zoom: { controls: true, wheel: true, startScale: 0.9, maxScale: 2, minScale: 0.3 },
    trashcan: true,
    move: { scrollbars: true, drag: true, wheel: true },
    sounds: true,
    renderer: 'zelos',
  });

  // ── Code Generation & Preview ───────────────────────────────────
  let currentLang = 'javascript';
  const codeOutput = document.getElementById('codeOutput');
  const consolePanel = document.getElementById('consolePanel');

  function updateCodePreview() {
    let code = '';
    if (currentLang === 'javascript') {
      code = Blockly.JavaScript.workspaceToCode(workspace);
    } else {
      code = Blockly.Python.workspaceToCode(workspace);
    }
    if (codeOutput) {
      codeOutput.textContent = code || `// Drag blocks to the workspace to see code here...`;
    }
  }

  workspace.addChangeListener(() => {
    updateCodePreview();
  });

  // Language tab switching
  const codeTabs = document.querySelectorAll('.code-tab');
  codeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      codeTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentLang = tab.getAttribute('data-lang');
      updateCodePreview();
    });
  });

  // Lang selector in toolbar
  const langBtns = document.querySelectorAll('#langSelector button');
  langBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      langBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentLang = btn.getAttribute('data-lang');
      // Sync code tabs
      codeTabs.forEach((t) => {
        t.classList.toggle('active', t.getAttribute('data-lang') === currentLang);
      });
      updateCodePreview();
    });
  });

  // ── Console Logging ─────────────────────────────────────────────
  function logToConsole(message, type) {
    if (!consolePanel) return;
    const line = document.createElement('div');
    line.className = `console-line ${type || ''}`;
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'info' ? 'ℹ️' : '▸';
    line.textContent = `${prefix} ${message}`;
    consolePanel.appendChild(line);
    consolePanel.scrollTop = consolePanel.scrollHeight;
  }

  function clearConsole() {
    if (!consolePanel) return;
    consolePanel.innerHTML = '';
  }

  // ── Program Execution ───────────────────────────────────────────
  let isRunning = false;
  let stopRequested = false;

  const runBtn = document.getElementById('runBtn');
  const stopBtn = document.getElementById('stopBtn');

  async function runProgram() {
    if (isRunning) return;
    isRunning = true;
    stopRequested = false;

    clearConsole();
    logToConsole('Program started!', 'success');

    // Resume audio context if suspended
    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    const code = Blockly.JavaScript.workspaceToCode(workspace);
    if (!code.trim()) {
      logToConsole('No code to run. Add some blocks first!', 'info');
      isRunning = false;
      return;
    }

    // Create execution context with sprite commands
    const execCode = `
      (async function() {
        ${code}
      })();
    `;

    // Define global functions for the generated code
    window.moveForward = async (steps) => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.moveForward(steps);
      await sleep(30);
    };
    window.turnRight = async (deg) => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.turnRight(deg);
      await sleep(30);
    };
    window.turnLeft = async (deg) => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.turnLeft(deg);
      await sleep(30);
    };
    window.goTo = async (x, y) => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.goTo(x, y);
      await sleep(30);
    };
    window.glide = async (x, y, secs) => {
      if (stopRequested) throw new Error('STOP');
      await window.SpriteEngine.glide(x, y, secs);
    };
    window.pointInDirection = async (deg) => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.pointInDirection(deg);
      await sleep(30);
    };
    window.say = async (msg, secs) => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.say(msg, secs);
      logToConsole(`Sprite says: "${msg}"`, 'info');
    };
    window.setColor = async (color) => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.setColor(color);
    };
    window.show = async () => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.show();
    };
    window.hide = async () => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.hide();
    };
    window.setSize = async (s) => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.setSize(s);
    };
    window.changeSize = async (d) => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.changeSize(d);
    };
    window.penDown = async () => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.penDown();
    };
    window.penUp = async () => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.penUp();
    };
    window.setPenColor = async (c) => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.setPenColor(c);
    };
    window.setPenWidth = async (w) => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.setPenWidth(w);
    };
    window.clearDrawings = async () => {
      if (stopRequested) throw new Error('STOP');
      window.SpriteEngine.clearCanvas();
    };
    window.playNote = async (freq, dur) => {
      if (stopRequested) throw new Error('STOP');
      playTone(freq, dur, 'sine');
      await sleep(dur * 1000);
    };
    window.playDrum = async () => {
      if (stopRequested) throw new Error('STOP');
      playDrumBeat();
      await sleep(200);
    };
    window.playSound = async (type, freq, dur) => {
      if (stopRequested) throw new Error('STOP');
      playTone(freq, dur, type);
      await sleep(dur * 1000);
    };
    window.waitSeconds = async (secs) => {
      if (stopRequested) throw new Error('STOP');
      await sleep(secs * 1000);
    };

    try {
      await eval(execCode);
      if (!stopRequested) {
        logToConsole('Program finished!', 'success');
      }
    } catch (e) {
      if (e.message !== 'STOP') {
        logToConsole(`Error: ${e.message}`, 'error');
      }
    }

    isRunning = false;

    // Trigger achievement
    if (window.Achievements) {
      window.Achievements.unlock('first_run');
    }
  }

  function stopProgram() {
    stopRequested = true;
    logToConsole('Program stopped.', 'info');
    isRunning = false;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  if (runBtn) runBtn.addEventListener('click', runProgram);
  if (stopBtn) stopBtn.addEventListener('click', stopProgram);

  // ── Copy Code ───────────────────────────────────────────────────
  const copyBtn = document.getElementById('copyCodeBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = codeOutput.textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
          copyBtn.textContent = '📋 Copy';
        }, 2000);
      });
    });
  }

  // ── Undo / Redo ─────────────────────────────────────────────────
  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');
  if (undoBtn) undoBtn.addEventListener('click', () => workspace.undo(false));
  if (redoBtn) redoBtn.addEventListener('click', () => workspace.undo(true));

  // ── Keyboard shortcuts for running ──────────────────────────────
  document.addEventListener('keydown', (e) => {
    // Ctrl+Enter to run
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      runProgram();
    }
    // Escape to stop
    if (e.key === 'Escape' && isRunning) {
      stopProgram();
    }
  });

  // ── Window resize ───────────────────────────────────────────────
  window.addEventListener('resize', () => {
    Blockly.svgResize(workspace);
  });

  // ── Expose workspace for save/load ──────────────────────────────
  window.CodeSpark = window.CodeSpark || {};
  window.CodeSpark.workspace = workspace;
  window.CodeSpark.updateCodePreview = updateCodePreview;

  // Initial code preview
  updateCodePreview();
})();
