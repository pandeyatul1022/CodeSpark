/**
 * CodeSpark — Blockly Editor Setup
 * Custom blocks, toolbox, code generation, and program execution
 */

(function () {
  'use strict';

  const blocklyDiv = document.getElementById('blocklyDiv');
  if (!blocklyDiv) return;

  // ── Safe Field Helper ───────────────────────────────────────────
  // Always use FieldTextInput for colour values — FieldColour crashes
  // in certain Blockly flyout rendering contexts and silently prevents
  // the entire category from displaying.
  function createColourField(defaultVal) {
    return new Blockly.FieldTextInput(defaultVal || '#000000');
  }

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
        .appendField(createColourField('#7c3aed'), 'COLOR');
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
        .appendField(createColourField('#7c3aed'), 'COLOR');
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

  // ── HTML Custom Blocks ──────────────────────────────────────────
  Blockly.Blocks['html_doc'] = {
    init: function () {
      this.appendDummyInput().appendField('<!DOCTYPE html>');
      this.appendStatementInput('HEAD').setCheck(null).appendField('<head>');
      this.appendStatementInput('BODY').setCheck(null).appendField('<body>');
      this.setColour(160);
      this.setTooltip('HTML Page Document');
    }
  };

  Blockly.Blocks['html_heading'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('<')
        .appendField(new Blockly.FieldDropdown([
          ['h1', 'h1'], ['h2', 'h2'], ['h3', 'h3'], ['h4', 'h4']
        ]), 'TAG')
        .appendField('>');
      this.appendValueInput('TEXT').setCheck('String').appendField('text:');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Heading Tag (h1-h4)');
    }
  };

  Blockly.Blocks['html_paragraph'] = {
    init: function () {
      this.appendDummyInput().appendField('<p>');
      this.appendValueInput('TEXT').setCheck('String').appendField('text:');
      this.appendStatementInput('CHILDREN').setCheck(null).appendField('children:');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Paragraph Tag (<p>)');
    }
  };

  Blockly.Blocks['html_div'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('<div class="')
        .appendField(new Blockly.FieldTextInput('container'), 'CLASS')
        .appendField('">');
      this.appendStatementInput('CHILDREN').setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Division Container Tag (<div>)');
    }
  };

  Blockly.Blocks['html_span'] = {
    init: function () {
      this.appendDummyInput().appendField('<span>');
      this.appendValueInput('TEXT').setCheck('String').appendField('text:');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Inline Span Tag (<span>)');
    }
  };

  Blockly.Blocks['html_button'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('<button class="')
        .appendField(new Blockly.FieldTextInput('btn btn-primary'), 'CLASS')
        .appendField('">');
      this.appendValueInput('TEXT').setCheck('String').appendField('text:');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Button Element (<button>)');
    }
  };

  Blockly.Blocks['html_link'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('<a href="')
        .appendField(new Blockly.FieldTextInput('#'), 'HREF')
        .appendField('">');
      this.appendValueInput('TEXT').setCheck('String').appendField('text:');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Hyperlink Tag (<a>)');
    }
  };

  Blockly.Blocks['html_image'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('<img src="')
        .appendField(new Blockly.FieldTextInput('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%237c3aed"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="16">Sample Image</text></svg>'), 'SRC')
        .appendField('" alt="')
        .appendField(new Blockly.FieldTextInput('Image'), 'ALT')
        .appendField('">');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Image Tag (<img>)');
    }
  };

  Blockly.Blocks['html_input'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('<input type="')
        .appendField(new Blockly.FieldDropdown([
          ['text', 'text'], ['number', 'number'], ['color', 'color'], ['checkbox', 'checkbox'], ['range', 'range']
        ]), 'TYPE')
        .appendField('" placeholder="')
        .appendField(new Blockly.FieldTextInput('Enter text...'), 'PLACEHOLDER')
        .appendField('">');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Form Input Field (<input>)');
    }
  };

  Blockly.Blocks['html_card'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('📇 <div class="card">')
        .appendField('Title:')
        .appendField(new Blockly.FieldTextInput('Card Title'), 'TITLE');
      this.appendStatementInput('BODY').setCheck(null).appendField('content:');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Styled UI Card Container Block');
    }
  };

  Blockly.Blocks['html_list'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('<')
        .appendField(new Blockly.FieldDropdown([['ul (bullet list)', 'ul'], ['ol (numbered list)', 'ol']]), 'TYPE')
        .appendField('>');
      this.appendStatementInput('ITEMS').setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('List Container (<ul>/<ol>)');
    }
  };

  Blockly.Blocks['html_list_item'] = {
    init: function () {
      this.appendDummyInput().appendField('<li>');
      this.appendValueInput('TEXT').setCheck('String').appendField('text:');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('List Item (<li>)');
    }
  };

  Blockly.Blocks['html_bold'] = {
    init: function () {
      this.appendValueInput('TEXT').setCheck('String').appendField('<b>');
      this.setInputsInline(true);
      this.setOutput(true, 'String');
      this.setColour(160);
      this.setTooltip('Bold text (<b>)');
    }
  };

  Blockly.Blocks['html_italic'] = {
    init: function () {
      this.appendValueInput('TEXT').setCheck('String').appendField('<i>');
      this.setInputsInline(true);
      this.setOutput(true, 'String');
      this.setColour(160);
      this.setTooltip('Italic text (<i>)');
    }
  };

  Blockly.Blocks['html_break'] = {
    init: function () {
      this.appendDummyInput().appendField('<br> (line break)');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Line Break (<br>)');
    }
  };

  Blockly.Blocks['html_hr'] = {
    init: function () {
      this.appendDummyInput().appendField('<hr> (horizontal line)');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Horizontal Line (<hr>)');
    }
  };

  // ── CSS Custom Blocks ───────────────────────────────────────────
  Blockly.Blocks['css_rule'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Selector:')
        .appendField(new Blockly.FieldTextInput('.card, body, h1'), 'SELECTOR')
        .appendField('{');
      this.appendStatementInput('DECLARATIONS').setCheck(null);
      this.appendDummyInput().appendField('}');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS Rule Set (selector { styles })');
    }
  };

  Blockly.Blocks['css_display'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('display:')
        .appendField(new Blockly.FieldDropdown([
          ['flex', 'flex'], ['block', 'block'], ['inline-block', 'inline-block'], ['grid', 'grid'], ['none', 'none']
        ]), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS display property');
    }
  };

  Blockly.Blocks['css_flex_direction'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('flex-direction:')
        .appendField(new Blockly.FieldDropdown([
          ['row', 'row'], ['column', 'column'], ['row-reverse', 'row-reverse'], ['column-reverse', 'column-reverse']
        ]), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS flex-direction property');
    }
  };

  Blockly.Blocks['css_justify_content'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('justify-content:')
        .appendField(new Blockly.FieldDropdown([
          ['center', 'center'], ['space-between', 'space-between'], ['space-around', 'space-around'], ['flex-start', 'flex-start'], ['flex-end', 'flex-end']
        ]), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS justify-content property');
    }
  };

  Blockly.Blocks['css_align_items'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('align-items:')
        .appendField(new Blockly.FieldDropdown([
          ['center', 'center'], ['flex-start', 'flex-start'], ['flex-end', 'flex-end'], ['stretch', 'stretch']
        ]), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS align-items property');
    }
  };

  Blockly.Blocks['css_color'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('color:')
        .appendField(new Blockly.FieldTextInput('#ffffff'), 'COLOR')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS text color property');
    }
  };

  Blockly.Blocks['css_bg_color'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('background-color:')
        .appendField(new Blockly.FieldTextInput('#7c3aed'), 'COLOR')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS background-color property');
    }
  };

  Blockly.Blocks['css_bg_gradient'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('background: linear-gradient(135deg,')
        .appendField(new Blockly.FieldTextInput('#7c3aed'), 'COLOR1')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('#f472b6'), 'COLOR2')
        .appendField(');');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS linear-gradient background property');
    }
  };

  Blockly.Blocks['css_padding'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('padding:')
        .appendField(new Blockly.FieldTextInput('16px'), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS padding property');
    }
  };

  Blockly.Blocks['css_margin'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('margin:')
        .appendField(new Blockly.FieldTextInput('10px auto'), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS margin property');
    }
  };

  Blockly.Blocks['css_width_height'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('width:')
        .appendField(new Blockly.FieldTextInput('100%'), 'WIDTH')
        .appendField('; height:')
        .appendField(new Blockly.FieldTextInput('auto'), 'HEIGHT')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS width and height properties');
    }
  };

  Blockly.Blocks['css_border'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('border:')
        .appendField(new Blockly.FieldTextInput('2px solid #7c3aed'), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS border property');
    }
  };

  Blockly.Blocks['css_border_radius'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('border-radius:')
        .appendField(new Blockly.FieldTextInput('12px'), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS border-radius property');
    }
  };

  Blockly.Blocks['css_font_size'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('font-size:')
        .appendField(new Blockly.FieldTextInput('18px'), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS font-size property');
    }
  };

  Blockly.Blocks['css_font_family'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('font-family:')
        .appendField(new Blockly.FieldDropdown([
          ["'Outfit', sans-serif", 'Outfit'],
          ["'Roboto', sans-serif", 'Roboto'],
          ['monospace', 'monospace'],
          ['cursive', 'cursive']
        ]), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS font-family property');
    }
  };

  Blockly.Blocks['css_text_align'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('text-align:')
        .appendField(new Blockly.FieldDropdown([
          ['center', 'center'], ['left', 'left'], ['right', 'right'], ['justify', 'justify']
        ]), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS text-align property');
    }
  };

  Blockly.Blocks['css_box_shadow'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('box-shadow:')
        .appendField(new Blockly.FieldTextInput('0 4px 15px rgba(0, 0, 0, 0.2)'), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS box-shadow property');
    }
  };

  Blockly.Blocks['css_transition'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('transition:')
        .appendField(new Blockly.FieldTextInput('all 0.3s ease'), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS transition property');
    }
  };

  Blockly.Blocks['css_transform'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('transform:')
        .appendField(new Blockly.FieldDropdown([
          ['scale(1.05)', 'scale(1.05)'], ['rotate(5deg)', 'rotate(5deg)'], ['translateY(-4px)', 'translateY(-4px)']
        ]), 'VAL')
        .appendField(';');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('CSS transform property');
    }
  };

  // ── JavaScript Code Generators ──────────────────────────────────
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

  Blockly.JavaScript.forBlock['when_start'] = function () {
    return '';
  };

  Blockly.JavaScript.forBlock['when_key_pressed'] = function (block) {
    const key = block.getFieldValue('KEY');
    return `// Key event: ${key}\n`;
  };

  const tutorialExamples = {
    html: new Map(),
    css: new Map(),
  };

  const simpleCategoryNames = {
    'HTML foundations': 'Basics',
    'HTML Document Structure': 'Structure',
    'Headings and Text': 'Text',
    'Links and Images': 'Links',
    'Lists and Grouping': 'Lists',
    'HTML Tables': 'Tables',
    'HTML Forms and Inputs': 'Forms',
    'Semantic HTML5': 'Semantic',
    'Media and Embedded Content': 'Media',
    'Head, Metadata and SEO': 'SEO',
    'Accessibility and Best Practices': 'Access',
    'Advanced HTML5 Features': 'Advanced',
    'HTML Practice Projects': 'Projects',
    'CSS Fundamentals': 'Basics',
    'CSS Selectors': 'Selectors',
    'Colors and Backgrounds': 'Colors',
    'Text and Typography': 'Text',
    'CSS Box Model': 'Box Model',
    'Display and Visibility': 'Display',
    'CSS Positioning': 'Position',
    'Flexbox Layout': 'Flexbox',
    'CSS Grid': 'Grid',
    'Responsive Web Design': 'Responsive',
    'Borders, Shadows and UI Styling': 'UI Styles',
    'Transitions and Animations': 'Motion',
    'Advanced CSS Concepts': 'Advanced',
    'CSS Best Practices': 'Best Practices',
    'CSS Practical Projects': 'Projects',
  };

  function createTutorialLessonCategories(language) {
    const roadmap = window.CodeSparkRoadmap;
    if (!roadmap || typeof roadmap.getBlockLessonLevels !== 'function') {
      throw new Error('Tutorial lesson data is unavailable. Load the tutorial roadmap before the editor.');
    }

    const levels = roadmap.getBlockLessonLevels(language);
    if (levels.length === 0 || levels.some((level) => level.lessons.length === 0)) {
      throw new Error(`Tutorial lesson data is incomplete for ${language.toUpperCase()}.`);
    }

    const palette = language === 'html'
      ? ['#e44d26', '#f16529', '#d97706', '#f59e0b', '#0ea5e9', '#0284c7', '#14b8a6', '#10b981', '#65a30d', '#84cc16', '#64748b', '#8b5cf6', '#db2777']
      : ['#264de4', '#2563eb', '#0891b2', '#0e7490', '#4f46e5', '#6366f1', '#7c3aed', '#9333ea', '#c026d3', '#db2777', '#e11d48', '#c2410c', '#b45309', '#475569', '#334155'];

    const categories = levels.map((level, levelIndex) => {
      const colour = palette[levelIndex % palette.length];
      const contents = level.lessons.map((lesson, lessonIndex) => {
        const type = `codespark_tutorial_${language}_${levelIndex + 1}_${lessonIndex + 1}`;
        const tooltip = `${level.title} — ${lesson.title}: ${lesson.explanation}`;

        Blockly.Blocks[type] = {
          init: function () {
            this.appendDummyInput().appendField(lesson.title);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(colour);
            this.setTooltip(tooltip);
          },
        };

        tutorialExamples[language].set(type, lesson.example);
        return { kind: 'block', type };
      });

      return {
        kind: 'category',
        name: simpleCategoryNames[level.title] || level.title,
        colour,
        contents,
      };
    });

    return categories;
  }

  // ── HTML Toolbox Definition ─────────────────────────────────────
  const htmlToolbox = {
    kind: 'categoryToolbox',
    contents: createTutorialLessonCategories('html'),
  };

  // ── CSS Toolbox Definition ──────────────────────────────────────
  const cssToolbox = {
    kind: 'categoryToolbox',
    contents: createTutorialLessonCategories('css'),
  };

  function decorateToolboxCategories() {
    const labels = document.querySelectorAll('.blocklyTreeLabel, .blocklyToolboxCategoryLabel');
    labels.forEach((label) => {
      const name = Array.from(label.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent)
        .join('')
        .trim();
      const category = label.closest('.blocklyToolboxCategory');
      if (!name || !category || !category.style.borderLeftColor) return;

      label.style.setProperty('--category-colour', category.style.borderLeftColor);
      if (!label.querySelector('.cat-dot')) {
        const dot = document.createElement('span');
        dot.className = 'cat-dot';
        dot.setAttribute('aria-hidden', 'true');
        label.prepend(dot);
      }
    });
    Blockly.svgResize(workspace);
  }

  // ── Inject Blockly ──────────────────────────────────────────────
  const workspace = Blockly.inject(blocklyDiv, {
    toolbox: htmlToolbox,
    grid: { spacing: 22, length: 2, colour: '#d5deeb', snap: true },
    zoom: { controls: true, wheel: true, startScale: 0.9, maxScale: 2, minScale: 0.3 },
    trashcan: true,
    move: { scrollbars: true, drag: true, wheel: true },
    sounds: true,
    renderer: 'zelos',
  });

  const editorThemes = {
    light: Blockly.Theme.defineTheme('codesparkLight', {
      base: Blockly.Themes.Classic,
      componentStyles: {
        workspaceBackgroundColour: '#f8fafc',
        toolboxBackgroundColour: '#f0f4f9',
        toolboxForegroundColour: '#334155',
        flyoutBackgroundColour: '#e8edf5',
        flyoutForegroundColour: '#1e293b',
        flyoutOpacity: 1,
        scrollbarColour: '#94a3b8',
        scrollbarOpacity: 0.6,
        insertionMarkerColour: '#7c3aed',
        insertionMarkerOpacity: 0.3,
        cursorColour: '#5b21b6',
      },
    }),
    dark: Blockly.Theme.defineTheme('codesparkDark', {
      base: Blockly.Themes.Classic,
      componentStyles: {
        workspaceBackgroundColour: '#171923',
        toolboxBackgroundColour: '#20232c',
        toolboxForegroundColour: '#e2e8f0',
        flyoutBackgroundColour: '#292d38',
        flyoutForegroundColour: '#f1f5f9',
        flyoutOpacity: 1,
        scrollbarColour: '#788198',
        scrollbarOpacity: 0.65,
        insertionMarkerColour: '#c4b5fd',
        insertionMarkerOpacity: 0.35,
        cursorColour: '#ddd3ff',
      },
    }),
  };

  function applyEditorTheme() {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark'
      ? editorThemes.dark
      : editorThemes.light;
    if (workspace.getTheme().name !== theme.name) workspace.setTheme(theme);
  }

  applyEditorTheme();
  new MutationObserver(applyEditorTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // Inject icons after Blockly renders
  setTimeout(decorateToolboxCategories, 500);


  // ── HTML & CSS Generator Engine ─────────────────────────────────
  function escapeHTML(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderHTMLTutorialExample(example) {
    const source = (example || '').trim();
    const containsHTML = /<(?:!doctype|!--|\/?[a-z][a-z0-9-]*(?:\s|\/?>))/i.test(source);
    if (containsHTML) return `${source}\n`;
    return `<pre class="tutorial-example"><code>${escapeHTML(source)}</code></pre>\n`;
  }

  function renderCSSTutorialExample(example) {
    const source = (example || '').trim();
    const inlineStyles = source.match(/<style\b[^>]*>([\s\S]*?)<\/style>/i);
    if (inlineStyles) return `${inlineStyles[1].trim()}\n`;
    if (/[{}]/.test(source) && !/<(?:!doctype|\/?[a-z][a-z0-9-]*\b)/i.test(source)) {
      return `${source}\n`;
    }
    if (/^[\w-]+\s*:/m.test(source) && !/<(?:!doctype|\/?[a-z][a-z0-9-]*\b)/i.test(source)) {
      return `.tutorial-example {\n${source.split('\n').map((line) => `  ${line}`).join('\n')}\n}\n`;
    }

    const safeComment = source.replace(/\*\//g, '* /').replace(/\r?\n/g, '\n   ');
    return `/* Tutorial example:\n   ${safeComment}\n*/\n`;
  }

  function renderHTMLBlock(block) {
    if (!block) return '';
    const type = block.type;
    let code = '';
    if (type.startsWith('css_') || tutorialExamples.css.has(type)) {
      return renderHTMLBlock(block.getNextBlock());
    }
    const tutorialExample = tutorialExamples.html.get(type);

    if (tutorialExample !== undefined) {
      code = renderHTMLTutorialExample(tutorialExample);
    } else if (type === 'html_doc') {
      const head = renderStatement(block, 'HEAD');
      const body = renderStatement(block, 'BODY');
      return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>CodeSpark Web Page</title>\n${head}</head>\n<body>\n${body}</body>\n</html>\n`;
    }
    else if (type === 'html_heading') {
      const tag = block.getFieldValue('TAG') || 'h1';
      const text = getInputValue(block, 'TEXT') || 'Heading Text';
      code = `<${tag}>${escapeHTML(text)}</${tag}>\n`;
    } else if (type === 'html_paragraph') {
      const text = getInputValue(block, 'TEXT') || 'This is a paragraph.';
      const children = renderStatement(block, 'CHILDREN');
      code = `<p>${escapeHTML(text)}${children ? '\n' + children : ''}</p>\n`;
    } else if (type === 'html_div') {
      const cls = block.getFieldValue('CLASS') || 'container';
      const children = renderStatement(block, 'CHILDREN');
      code = `<div class="${cls}">\n${children}</div>\n`;
    } else if (type === 'html_span') {
      const text = getInputValue(block, 'TEXT') || 'Span text';
      code = `<span>${escapeHTML(text)}</span>\n`;
    } else if (type === 'html_button') {
      const cls = block.getFieldValue('CLASS') || 'btn btn-primary';
      const text = getInputValue(block, 'TEXT') || 'Click Me';
      code = `<button class="${cls}">${escapeHTML(text)}</button>\n`;
    } else if (type === 'html_link') {
      const href = block.getFieldValue('HREF') || '#';
      const text = getInputValue(block, 'TEXT') || 'Click Here';
      code = `<a href="${href}">${escapeHTML(text)}</a>\n`;
    } else if (type === 'html_image') {
      const src = block.getFieldValue('SRC') || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%237c3aed"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="16">Sample Image</text></svg>';
      const alt = block.getFieldValue('ALT') || 'Image';
      code = `<img src="${src}" alt="${alt}" />\n`;
    } else if (type === 'html_input') {
      const typeAttr = block.getFieldValue('TYPE') || 'text';
      const ph = block.getFieldValue('PLACEHOLDER') || '';
      code = `<input type="${typeAttr}" placeholder="${ph}" />\n`;
    } else if (type === 'html_card') {
      const title = block.getFieldValue('TITLE') || 'Card Title';
      const body = renderStatement(block, 'BODY');
      code = `<div class="card">\n  <h3>${escapeHTML(title)}</h3>\n${body}</div>\n`;
    } else if (type === 'html_list') {
      const tag = block.getFieldValue('TYPE') || 'ul';
      const items = renderStatement(block, 'ITEMS');
      code = `<${tag}>\n${items}</${tag}>\n`;
    } else if (type === 'html_list_item') {
      const text = getInputValue(block, 'TEXT') || 'List Item';
      code = `  <li>${escapeHTML(text)}</li>\n`;
    } else if (type === 'html_break') {
      code = `<br />\n`;
    } else if (type === 'html_hr') {
      code = `<hr />\n`;
    } else {
      code = `<!-- Block: ${type} -->\n`;
    }

    if (block.getNextBlock()) {
      code += renderHTMLBlock(block.getNextBlock());
    }
    return code;
  }

  function renderStatement(parentBlock, inputName) {
    const target = parentBlock.getInputTargetBlock(inputName);
    if (!target) return '';
    const code = renderHTMLBlock(target);
    return code.split('\n').filter(Boolean).map(l => '  ' + l).join('\n') + '\n';
  }

  function getInputValue(block, name) {
    const target = block.getInputTargetBlock(name);
    if (target) {
      if (target.type === 'text') return target.getFieldValue('TEXT');
      if (target.type === 'html_bold') return `<b>${getInputValue(target, 'TEXT')}</b>`;
      if (target.type === 'html_italic') return `<i>${getInputValue(target, 'TEXT')}</i>`;
    }
    return block.getFieldValue(name) || '';
  }

  function generateHTMLCode(ws) {
    const topBlocks = ws.getTopBlocks(true).filter((block) =>
      block.type.startsWith('html_') || tutorialExamples.html.has(block.type)
    );
    if (topBlocks.length === 0) return '';

    let code = '';
    topBlocks.forEach((block) => {
      code += renderHTMLBlock(block);
    });
    return code.trim();
  }

  function renderCSSBlock(block) {
    if (!block) return '';
    if (block.type.startsWith('html_') || tutorialExamples.html.has(block.type)) {
      return renderCSSBlock(block.getNextBlock());
    }
    let code = '';
    const tutorialExample = tutorialExamples.css.get(block.type);

    if (tutorialExample !== undefined) {
      code = renderCSSTutorialExample(tutorialExample);
    } else if (block.type === 'css_rule') {
      const selector = block.getFieldValue('SELECTOR') || '.container';
      const declarations = renderCSSDeclarations(block.getInputTargetBlock('DECLARATIONS'));
      code = `${selector} {\n${declarations}}\n\n`;
    } else {
      code = renderSingleCSSProp(block) + '\n';
    }

    if (block.getNextBlock()) {
      code += renderCSSBlock(block.getNextBlock());
    }
    return code;
  }

  function renderCSSDeclarations(block) {
    if (!block) return '';
    let code = renderSingleCSSProp(block);
    if (code) code = '  ' + code + '\n';
    if (block.getNextBlock()) {
      code += renderCSSDeclarations(block.getNextBlock());
    }
    return code;
  }

  function renderSingleCSSProp(block) {
    if (!block) return '';
    const type = block.type;
    if (type === 'css_display') return `display: ${block.getFieldValue('VAL')};`;
    if (type === 'css_flex_direction') return `flex-direction: ${block.getFieldValue('VAL')};`;
    if (type === 'css_justify_content') return `justify-content: ${block.getFieldValue('VAL')};`;
    if (type === 'css_align_items') return `align-items: ${block.getFieldValue('VAL')};`;
    if (type === 'css_color') return `color: ${block.getFieldValue('COLOR')};`;
    if (type === 'css_bg_color') return `background-color: ${block.getFieldValue('COLOR')};`;
    if (type === 'css_bg_gradient') return `background: linear-gradient(135deg, ${block.getFieldValue('COLOR1')}, ${block.getFieldValue('COLOR2')});`;
    if (type === 'css_padding') return `padding: ${block.getFieldValue('VAL')};`;
    if (type === 'css_margin') return `margin: ${block.getFieldValue('VAL')};`;
    if (type === 'css_width_height') return `width: ${block.getFieldValue('WIDTH')};\n  height: ${block.getFieldValue('HEIGHT')};`;
    if (type === 'css_border') return `border: ${block.getFieldValue('VAL')};`;
    if (type === 'css_border_radius') return `border-radius: ${block.getFieldValue('VAL')};`;
    if (type === 'css_font_size') return `font-size: ${block.getFieldValue('VAL')};`;
    if (type === 'css_font_family') return `font-family: ${block.getFieldValue('VAL')};`;
    if (type === 'css_text_align') return `text-align: ${block.getFieldValue('VAL')};`;
    if (type === 'css_box_shadow') return `box-shadow: ${block.getFieldValue('VAL')};`;
    if (type === 'css_transition') return `transition: ${block.getFieldValue('VAL')};`;
    if (type === 'css_transform') return `transform: ${block.getFieldValue('VAL')};`;
    return '';
  }

  function generateCSSCode(ws) {
    const topBlocks = ws.getTopBlocks(true).filter((block) =>
      block.type.startsWith('css_') || tutorialExamples.css.has(block.type)
    );
    if (topBlocks.length === 0) return '';

    let code = '';
    topBlocks.forEach((block) => {
      code += renderCSSBlock(block);
    });
    return code.trim();
  }

  // ── Language Mode Switcher ───────────────────────────────────────
  let currentLang = 'html';
  const codeOutput = document.getElementById('codeOutput');
  const consolePanel = document.getElementById('consoleOutput');

  function setLanguageMode(lang) {
    currentLang = lang;

    // Update active tab buttons in toolbar and preview header
    const langBtns = document.querySelectorAll('#langSelector button');
    langBtns.forEach((b) => {
      const isActive = b.getAttribute('data-lang') === currentLang;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });

    const codeTabs = document.querySelectorAll('.code-tab');
    codeTabs.forEach((tab) => {
      const isActive = tab.getAttribute('data-lang') === currentLang;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-pressed', String(isActive));
    });

    // Dynamic Toolbox Switching between HTML and CSS categories!
    try {
      if (currentLang === 'html') {
        workspace.updateToolbox(htmlToolbox);
      } else if (currentLang === 'css') {
        workspace.updateToolbox(cssToolbox);
      }
      // Reapply category dots after Blockly rebuilds the toolbox.
      setTimeout(decorateToolboxCategories, 100);
    } catch (e) {
      console.error('[CodeSpark] Toolbox update error:', e);
    }

    updateCodePreview();
  }

  function updateCodePreview() {
    let code = '';
    try {
      if (currentLang === 'html') {
        code = generateHTMLCode(workspace);
      } else if (currentLang === 'css') {
        code = generateCSSCode(workspace);
      }
    } catch (e) {
      code = '<!-- Error generating code preview -->';
    }
    if (codeOutput) {
      codeOutput.textContent = code;
    }
  }

  // ── Code Tab & Language Selector Event Listeners ────────────────
  const codeTabs = document.querySelectorAll('.code-tab');
  codeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setLanguageMode(tab.getAttribute('data-lang'));
    });
  });

  const langBtns2 = document.querySelectorAll('#langSelector button');
  langBtns2.forEach((btn) => {
    btn.addEventListener('click', () => {
      setLanguageMode(btn.getAttribute('data-lang'));
    });
  });

  // ── Console Logging ─────────────────────────────────────────────
  const clearConsoleBtn = document.getElementById('clearConsoleBtn');

  function logToConsole(message, type) {
    if (!consolePanel) return;
    const line = document.createElement('div');
    line.className = `console-line ${type || ''}`;
    const icon = document.createElement('i');
    const iconClass = type === 'error'
      ? 'bi-exclamation-circle-fill'
      : type === 'success'
        ? 'bi-check-circle-fill'
        : type === 'info'
          ? 'bi-info-circle-fill'
          : 'bi-dot';
    icon.className = `bi ${iconClass}`;
    icon.setAttribute('aria-hidden', 'true');
    const text = document.createElement('span');
    text.textContent = message;
    line.append(icon, text);
    consolePanel.appendChild(line);
    consolePanel.scrollTop = consolePanel.scrollHeight;
  }

  function clearConsole() {
    if (!consolePanel) return;
    consolePanel.innerHTML = '';
  }

  if (clearConsoleBtn) {
    clearConsoleBtn.addEventListener('click', clearConsole);
  }

  // ── Live Preview Rendering ──────────────────────────────────────
  const liveIframe = document.getElementById('livePreviewIframe');
  const canvasPanel = document.getElementById('canvasPanel');
  const fullscreenPreviewBtn = document.getElementById('fullscreenPreviewBtn');

  function updateFullscreenPreviewButton() {
    if (!fullscreenPreviewBtn || !canvasPanel) return;

    const isFullscreen = document.fullscreenElement === canvasPanel;
    const label = isFullscreen ? 'Exit preview fullscreen' : 'Open preview fullscreen';
    const icon = fullscreenPreviewBtn.querySelector('i');
    fullscreenPreviewBtn.setAttribute('aria-label', label);
    fullscreenPreviewBtn.setAttribute('title', label);
    fullscreenPreviewBtn.setAttribute('aria-pressed', String(isFullscreen));
    if (icon) {
      icon.classList.toggle('bi-arrows-fullscreen', !isFullscreen);
      icon.classList.toggle('bi-fullscreen-exit', isFullscreen);
    }
    const text = fullscreenPreviewBtn.querySelector('span');
    if (text) text.textContent = isFullscreen ? 'Exit' : 'Fullscreen';
  }

  if (fullscreenPreviewBtn && canvasPanel) {
    fullscreenPreviewBtn.addEventListener('click', async () => {
      try {
        if (document.fullscreenElement === canvasPanel) {
          await document.exitFullscreen();
        } else if (canvasPanel.requestFullscreen) {
          await canvasPanel.requestFullscreen();
        } else {
          logToConsole('Fullscreen is not supported by this browser.', 'error');
        }
      } catch (error) {
        console.error('[CodeSpark] Could not change preview fullscreen:', error);
        logToConsole('Could not open preview fullscreen. Check browser permissions and try again.', 'error');
      }
    });

    document.addEventListener('fullscreenchange', updateFullscreenPreviewButton);
  }

  function renderLivePreview() {
    if (!liveIframe) return;
    try {
      let htmlCode = generateHTMLCode(workspace);
      let cssCode = generateCSSCode(workspace);

      const pageContent = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="assets/vendor/bootstrap/bootstrap.min.css" rel="stylesheet">
  <link href="assets/css/fonts.css" rel="stylesheet">
  <style>
    body { font-family: 'Outfit', sans-serif; padding: 1rem; margin: 0; background: #ffffff; color: #1e293b; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 1rem; }
    .btn { padding: 0.5rem 1.25rem; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; }
    .btn-primary { background: #7c3aed; color: #ffffff; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
    ${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
</body>
</html>`;

      liveIframe.srcdoc = pageContent;
    } catch (e) {
      console.warn('[CodeSpark] Preview render error:', e.message);
    }
  }

  // Auto-update live preview when blocks change
  workspace.addChangeListener((e) => {
    if (e.isUiEvent) return;
    try {
      updateCodePreview();
      renderLivePreview();
    } catch (err) {
      console.warn('Preview update skipped:', err.message);
    }
  });

  // ── Run / Stop / Refresh Buttons ────────────────────────────────
  const runBtn = document.getElementById('runBtn');
  const stopBtn = document.getElementById('stopBtn');
  const refreshPreviewBtn = document.getElementById('refreshPreviewBtn');

  if (runBtn) runBtn.addEventListener('click', () => {
    clearConsole();
    logToConsole('Program started!', 'success');
    renderLivePreview();
    logToConsole('🌐 Live HTML/CSS rendered successfully!', 'success');
    if (window.Achievements) window.Achievements.unlock('first_run');
  });

  if (stopBtn) stopBtn.addEventListener('click', () => {
    if (liveIframe) liveIframe.srcdoc = '';
    logToConsole('Preview cleared.', 'info');
  });

  if (refreshPreviewBtn) refreshPreviewBtn.addEventListener('click', () => {
    renderLivePreview();
    logToConsole('🔄 Preview refreshed!', 'info');
  });

  const resetBtn = document.getElementById('resetSpriteBtn');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    if (liveIframe) liveIframe.srcdoc = '';
    logToConsole('Preview reset.', 'info');
  });

  const clearWorkspaceBtn = document.getElementById('clearCanvasBtn');
  if (clearWorkspaceBtn) clearWorkspaceBtn.addEventListener('click', () => {
    workspace.clear();
    clearConsole();
    logToConsole('Workspace cleared.', 'info');
  });

  // ── Copy Code ───────────────────────────────────────────────────
  const copyBtn = document.getElementById('copyCodeBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const label = copyBtn.querySelector('span');
      try {
        if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
          throw new Error('Clipboard access is not available in this browser context.');
        }

        await navigator.clipboard.writeText(codeOutput ? codeOutput.textContent : '');
        if (label) label.textContent = 'Copied';
        copyBtn.setAttribute('aria-label', 'Code copied');
        window.setTimeout(() => {
          if (label) label.textContent = 'Copy';
          copyBtn.removeAttribute('aria-label');
        }, 1800);
      } catch (error) {
        console.error('[CodeSpark] Could not copy code:', error);
        logToConsole('Could not copy code. Check browser clipboard permissions and try again.', 'error');
      }
    });
  }

  // ── Undo / Redo ─────────────────────────────────────────────────
  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');
  if (undoBtn) undoBtn.addEventListener('click', () => workspace.undo(false));
  if (redoBtn) redoBtn.addEventListener('click', () => workspace.undo(true));

  // ── Keyboard shortcuts ──────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      renderLivePreview();
    }
  });

  // ── Window resize ───────────────────────────────────────────────
  window.addEventListener('resize', () => {
    Blockly.svgResize(workspace);
  });

  // ── Expose workspace ────────────────────────────────────────────
  window.CodeSpark = window.CodeSpark || {};
  window.CodeSpark.workspace = workspace;
  window.CodeSpark.updateCodePreview = updateCodePreview;
  window.CodeSpark.renderLivePreview = renderLivePreview;

  // Initial setup
  setLanguageMode('html');
  renderLivePreview();
})();
