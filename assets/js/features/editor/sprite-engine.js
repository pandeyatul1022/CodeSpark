/**
 * CodeSpark — Sprite Canvas Engine
 * Handles sprite drawing, movement, pen, and animation on the canvas.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('spriteCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const coordsDisplay = document.getElementById('spriteCoords');

  // ── Sprite State ────────────────────────────────────────────────
  const sprite = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0, // degrees, 0 = right/east
    size: 40,
    color: '#7c3aed',
    type: 'cat', // 'cat' | 'robot' | 'rocket' | 'dinosaur' | 'star'
    visible: true,
    penDown: false,
    penColor: '#7c3aed',
    penWidth: 2,
    saying: '',
    sayTimer: null,
  };

  let currentBackdrop = 'grid'; // 'grid' | 'space' | 'forest' | 'underwater' | 'sunset'

  // ── Web Audio API Synthesizer ──────────────────────────────────
  let audioCtx = null;

  function playSound(type = 'piano') {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
      }
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      if (type === 'piano' || type === 'note') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(261.63, now); // C4 note
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.8);
      } else if (type === 'meow') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.2);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.4);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'laser') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'drum') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'bell') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
      }
    } catch(e) {}
  }

  // Store drawing paths so we can redraw them
  const drawings = [];
  let currentPath = null;

  // ── Initialize ──────────────────────────────────────────────────
  function init() {
    render();
    updateCoords();
  }

  // ── Drawing ─────────────────────────────────────────────────────
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw backdrop scenery
    drawBackdrop();

    // Redraw all saved pen paths
    drawings.forEach((path) => {
      ctx.beginPath();
      ctx.strokeStyle = path.color;
      ctx.lineWidth = path.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (path.points.length > 0) {
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
      }
      ctx.stroke();
    });

    // Draw sprite
    if (sprite.visible) {
      drawSprite();
    }

    // Draw speech bubble
    if (sprite.saying) {
      drawSpeechBubble(sprite.saying);
    }
  }

  function drawBackdrop() {
    if (currentBackdrop === 'space') {
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      // Draw simple stars
      for (let i = 0; i < 25; i++) {
        const sx = (i * 37) % canvas.width;
        const sy = (i * 23) % canvas.height;
        ctx.fillRect(sx, sy, 2, 2);
      }
    } else if (currentBackdrop === 'forest') {
      ctx.fillStyle = '#ecfdf5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#059669';
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    } else if (currentBackdrop === 'underwater') {
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, canvas.height - 25, canvas.width, 25);
    } else if (currentBackdrop === 'sunset') {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#fdba74');
      grad.addColorStop(1, '#f472b6');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else { // Grid
      drawGrid();
    }
  }

  function drawGrid() {
    ctx.strokeStyle = 'rgba(0,0,0,0.05)';
    ctx.lineWidth = 0.5;
    const step = 20;
    for (let x = 0; x <= canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  function drawSprite() {
    ctx.save();
    ctx.translate(sprite.x, sprite.y);
    ctx.rotate((sprite.angle * Math.PI) / 180);

    const s = sprite.size;
    const half = s / 2;

    if (sprite.type === 'robot') {
      // Robot Shape
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(-half * 0.8, -half * 0.8, half * 1.6, half * 1.6);
      ctx.fillStyle = '#0891b2';
      ctx.fillRect(-half * 0.5, -half * 0.4, half * 1.0, half * 0.5);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, -half * 0.15, half * 0.15, 0, Math.PI * 2);
      ctx.fill();
    } else if (sprite.type === 'rocket') {
      // Rocket Shape
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(0, -half * 1.2);
      ctx.lineTo(half * 0.6, half * 0.8);
      ctx.lineTo(-half * 0.6, half * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(0, 0, half * 0.25, 0, Math.PI * 2);
      ctx.fill();
    } else if (sprite.type === 'star') {
      // Star Shape
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * half, -Math.sin((18 + i * 72) * Math.PI / 180) * half);
        ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (half * 0.4), -Math.sin((54 + i * 72) * Math.PI / 180) * (half * 0.4));
      }
      ctx.closePath();
      ctx.fill();
    } else {
      // Cat Shape (Default)
      ctx.fillStyle = sprite.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, half, half * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.beginPath();
      ctx.moveTo(-half * 0.6, -half * 0.5);
      ctx.lineTo(-half * 0.3, -half * 1.1);
      ctx.lineTo(0, -half * 0.4);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(half * 0.6, -half * 0.5);
      ctx.lineTo(half * 0.3, -half * 1.1);
      ctx.lineTo(0, -half * 0.4);
      ctx.fill();

      // Eyes
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.ellipse(-half * 0.25, -half * 0.1, half * 0.18, half * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(half * 0.25, -half * 0.1, half * 0.18, half * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1a1a2e';
      ctx.beginPath();
      ctx.arc(-half * 0.22, -half * 0.08, half * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(half * 0.28, -half * 0.08, half * 0.1, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawSpeechBubble(text) {
    const padding = 10;
    ctx.font = '13px Inter, sans-serif';
    const metrics = ctx.measureText(text);
    const textW = metrics.width;
    const bubbleW = textW + padding * 2;
    const bubbleH = 30;
    const bx = sprite.x - bubbleW / 2;
    const by = sprite.y - sprite.size - bubbleH - 10;

    // Bubble
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const r = 8;
    ctx.moveTo(bx + r, by);
    ctx.lineTo(bx + bubbleW - r, by);
    ctx.quadraticCurveTo(bx + bubbleW, by, bx + bubbleW, by + r);
    ctx.lineTo(bx + bubbleW, by + bubbleH - r);
    ctx.quadraticCurveTo(bx + bubbleW, by + bubbleH, bx + bubbleW - r, by + bubbleH);
    ctx.lineTo(bx + bubbleW / 2 + 6, by + bubbleH);
    ctx.lineTo(bx + bubbleW / 2, by + bubbleH + 8);
    ctx.lineTo(bx + bubbleW / 2 - 6, by + bubbleH);
    ctx.lineTo(bx + r, by + bubbleH);
    ctx.quadraticCurveTo(bx, by + bubbleH, bx, by + bubbleH - r);
    ctx.lineTo(bx, by + r);
    ctx.quadraticCurveTo(bx, by, bx + r, by);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Text
    ctx.fillStyle = '#1a1a2e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, sprite.x, by + bubbleH / 2);
    ctx.textAlign = 'start';
    ctx.textBaseline = 'alphabetic';
  }

  function updateCoords() {
    if (coordsDisplay) {
      const cx = Math.round(sprite.x - canvas.width / 2);
      const cy = Math.round(-(sprite.y - canvas.height / 2));
      coordsDisplay.textContent = `x: ${cx}, y: ${cy}`;
    }
  }

  // ── Sprite Actions (called by editor.js) ────────────────────────
  function moveForward(steps) {
    const rad = (sprite.angle * Math.PI) / 180;
    const oldX = sprite.x;
    const oldY = sprite.y;

    sprite.x += Math.cos(rad) * steps;
    sprite.y += Math.sin(rad) * steps;

    // Wrap around canvas edges
    sprite.x = ((sprite.x % canvas.width) + canvas.width) % canvas.width;
    sprite.y = ((sprite.y % canvas.height) + canvas.height) % canvas.height;

    if (sprite.penDown) {
      if (!currentPath) {
        currentPath = { color: sprite.penColor, width: sprite.penWidth, points: [{ x: oldX, y: oldY }] };
        drawings.push(currentPath);
      }
      currentPath.points.push({ x: sprite.x, y: sprite.y });
    }

    updateCoords();
    render();
  }

  function turnRight(degrees) {
    sprite.angle = (sprite.angle + degrees) % 360;
    render();
  }

  function turnLeft(degrees) {
    sprite.angle = ((sprite.angle - degrees) % 360 + 360) % 360;
    render();
  }

  function goTo(x, y) {
    // Convert from Scratch-like coordinates (center = 0,0)
    const oldX = sprite.x;
    const oldY = sprite.y;
    sprite.x = canvas.width / 2 + x;
    sprite.y = canvas.height / 2 - y;

    if (sprite.penDown) {
      if (!currentPath) {
        currentPath = { color: sprite.penColor, width: sprite.penWidth, points: [{ x: oldX, y: oldY }] };
        drawings.push(currentPath);
      }
      currentPath.points.push({ x: sprite.x, y: sprite.y });
    }

    updateCoords();
    render();
  }

  function setColor(color) {
    sprite.color = color;
    render();
  }

  function setPenColor(color) {
    sprite.penColor = color;
    currentPath = null;
  }

  function setPenWidth(width) {
    sprite.penWidth = width;
    currentPath = null;
  }

  function penDown() {
    sprite.penDown = true;
    currentPath = null;
  }

  function penUp() {
    sprite.penDown = false;
    currentPath = null;
  }

  function show() {
    sprite.visible = true;
    render();
  }

  function hide() {
    sprite.visible = false;
    render();
  }

  function say(text, duration) {
    sprite.saying = text;
    render();
    if (sprite.sayTimer) clearTimeout(sprite.sayTimer);
    if (duration) {
      sprite.sayTimer = setTimeout(() => {
        sprite.saying = '';
        render();
      }, duration * 1000);
    }
  }

  function setSize(size) {
    sprite.size = Math.max(10, Math.min(100, size));
    render();
  }

  function changeSize(delta) {
    sprite.size = Math.max(10, Math.min(100, sprite.size + delta));
    render();
  }

  function pointInDirection(degrees) {
    sprite.angle = degrees - 90; // Scratch convention: 0 = up
    render();
  }

  function glide(x, y, duration) {
    return new Promise((resolve) => {
      const startX = sprite.x;
      const startY = sprite.y;
      const targetX = canvas.width / 2 + x;
      const targetY = canvas.height / 2 - y;
      const startTime = performance.now();
      const durationMs = duration * 1000;

      function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        sprite.x = startX + (targetX - startX) * eased;
        sprite.y = startY + (targetY - startY) * eased;

        updateCoords();
        render();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(animate);
    });
  }

  function resetSprite() {
    sprite.x = canvas.width / 2;
    sprite.y = canvas.height / 2;
    sprite.angle = 0;
    sprite.size = 40;
    sprite.color = '#7c3aed';
    sprite.visible = true;
    sprite.penDown = false;
    sprite.penColor = '#7c3aed';
    sprite.penWidth = 2;
    sprite.saying = '';
    if (sprite.sayTimer) clearTimeout(sprite.sayTimer);
    currentPath = null;
    updateCoords();
    render();
  }

  function clearCanvas() {
    drawings.length = 0;
    currentPath = null;
    render();
  }

  // ── Button Handlers ─────────────────────────────────────────────
  const resetBtn = document.getElementById('resetSpriteBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetSprite);
  }

  const clearBtn = document.getElementById('clearCanvasBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearCanvas);
  }

  const spriteSel = document.getElementById('spriteSelector');
  if (spriteSel) {
    spriteSel.addEventListener('change', (e) => setSpriteType(e.target.value));
  }

  const backdropSel = document.getElementById('backdropSelector');
  if (backdropSel) {
    backdropSel.addEventListener('change', (e) => setBackdrop(e.target.value));
  }

  function setSpriteType(type) {
    sprite.type = type;
    render();
  }

  function setBackdrop(bg) {
    currentBackdrop = bg;
    render();
  }

  // ── Expose API ──────────────────────────────────────────────────
  window.SpriteEngine = {
    moveForward,
    turnRight,
    turnLeft,
    goTo,
    setColor,
    setPenColor,
    setPenWidth,
    penDown,
    penUp,
    show,
    hide,
    say,
    setSize,
    changeSize,
    pointInDirection,
    glide,
    resetSprite,
    clearCanvas,
    setSpriteType,
    setBackdrop,
    playSound,
    render,
    getSprite: () => ({ ...sprite }),
    getCanvas: () => canvas,
  };

  // Initial render
  init();
})();
