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
    visible: true,
    penDown: false,
    penColor: '#7c3aed',
    penWidth: 2,
    saying: '',
    sayTimer: null,
  };

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

    // Draw grid (subtle)
    drawGrid();

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

  function drawGrid() {
    ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'rgba(255,255,255,0.04)'
      : 'rgba(0,0,0,0.05)';
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

    // Body (cat-like shape)
    ctx.fillStyle = sprite.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, half, half * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ears (triangles)
    ctx.beginPath();
    ctx.moveTo(-half * 0.6, -half * 0.5);
    ctx.lineTo(-half * 0.3, -half * 1.1);
    ctx.lineTo(0, -half * 0.4);
    ctx.fillStyle = sprite.color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(half * 0.6, -half * 0.5);
    ctx.lineTo(half * 0.3, -half * 1.1);
    ctx.lineTo(0, -half * 0.4);
    ctx.fill();

    // Inner ears
    ctx.beginPath();
    ctx.moveTo(-half * 0.5, -half * 0.55);
    ctx.lineTo(-half * 0.32, -half * 0.92);
    ctx.lineTo(-half * 0.05, -half * 0.48);
    ctx.fillStyle = '#f9a8d4';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(half * 0.5, -half * 0.55);
    ctx.lineTo(half * 0.32, -half * 0.92);
    ctx.lineTo(half * 0.05, -half * 0.48);
    ctx.fill();

    // Eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(-half * 0.25, -half * 0.1, half * 0.18, half * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(half * 0.25, -half * 0.1, half * 0.18, half * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    ctx.arc(-half * 0.22, -half * 0.08, half * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(half * 0.28, -half * 0.08, half * 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Pupil highlights
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-half * 0.26, -half * 0.14, half * 0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(half * 0.24, -half * 0.14, half * 0.04, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#f472b6';
    ctx.beginPath();
    ctx.arc(0, half * 0.15, half * 0.08, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(-half * 0.1, half * 0.25, half * 0.12, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(half * 0.1, half * 0.25, half * 0.12, 0, Math.PI);
    ctx.stroke();

    // Whiskers
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-half * 0.4, half * 0.1);
    ctx.lineTo(-half * 0.95, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-half * 0.4, half * 0.2);
    ctx.lineTo(-half * 0.9, half * 0.3);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(half * 0.4, half * 0.1);
    ctx.lineTo(half * 0.95, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(half * 0.4, half * 0.2);
    ctx.lineTo(half * 0.9, half * 0.3);
    ctx.stroke();

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
    render,
    getSprite: () => ({ ...sprite }),
    getCanvas: () => canvas,
  };

  // Initial render
  init();
})();
