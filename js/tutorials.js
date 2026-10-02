/**
 * CodeSpark — Tutorial System
 * Interactive step-by-step coding lessons for beginners
 */

(function () {
  'use strict';

  // ── Tutorial Data ───────────────────────────────────────────────
  const tutorials = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of CodeSpark editor and make your first program.',
      icon: '<i class="fa-solid fa-rocket"></i>',
      difficulty: 'easy',
      duration: '5 min',
      steps: [
        {
          title: 'Welcome to CodeSpark!',
          content: 'CodeSpark is a block-based coding platform where you can learn programming by dragging and dropping colorful blocks. No typing needed!',
        },
        {
          title: 'Open the Editor',
          content: 'Click the <strong>"Editor"</strong> link in the navigation bar to open the block coding editor. You\'ll see a workspace on the left and a canvas on the right.',
        },
        {
          title: 'Find the Blocks',
          content: 'On the left side, you\'ll see categories like <strong>Motion</strong>, <strong>Looks</strong>, <strong>Sound</strong>, etc. Click on any category to see the blocks inside.',
        },
        {
          title: 'Drag a Block',
          content: 'Try dragging the <code>move forward 10 steps</code> block from the Motion category onto the workspace.',
        },
        {
          title: 'Run Your Program',
          content: 'Click the green <strong><i class="fa-solid fa-play"></i> Run</strong> button in the toolbar. Watch the cat sprite move forward on the canvas! Congratulations, you\'ve written your first program!',
        },
      ],
    },
    {
      id: 'moving-sprite',
      title: 'Moving the Sprite',
      description: 'Learn how to make the sprite walk, turn, and go to different positions.',
      icon: '<i class="fa-solid fa-person-running"></i>',
      difficulty: 'easy',
      duration: '8 min',
      steps: [
        {
          title: 'Forward Movement',
          content: 'The <code>move forward</code> block moves the sprite in the direction it\'s facing. Change the number to move more or fewer steps.',
        },
        {
          title: 'Turning',
          content: 'Use <code>turn right <i class="fa-solid fa-rotate-right"></i></code> or <code>turn left <i class="fa-solid fa-rotate-left"></i></code> blocks to change the sprite\'s direction. The number is in degrees (90 = quarter turn).',
        },
        {
          title: 'Go to Position',
          content: 'The <code>go to x: y:</code> block teleports the sprite to any position. The center of the canvas is x:0, y:0.',
        },
        {
          title: 'Smooth Gliding',
          content: 'Use the <code>glide</code> block to smoothly move to a position over time. Set the number of seconds for the animation.',
        },
        {
          title: 'Try It!',
          content: 'Challenge: Make the sprite walk in a square! Use <code>move forward 50</code> and <code>turn right 90</code> four times in a row.',
        },
      ],
    },
    {
      id: 'drawing-with-pen',
      title: 'Drawing with the Pen',
      description: 'Use the pen tool to create colorful drawings and patterns.',
      icon: '<i class="fa-solid fa-palette"></i>',
      difficulty: 'easy',
      duration: '10 min',
      steps: [
        {
          title: 'Pen Down',
          content: 'The <code>pen down</code> block starts drawing. Every time the sprite moves after this, it will leave a trail behind.',
        },
        {
          title: 'Pen Up',
          content: 'The <code>pen up</code> block stops drawing. The sprite will still move but won\'t leave a trail.',
        },
        {
          title: 'Change Pen Color',
          content: 'Use the <code>set pen color</code> block to change the drawing color. Click the color square to pick any color you like!',
        },
        {
          title: 'Change Pen Width',
          content: 'Make thicker or thinner lines using <code>set pen width</code>. Try values from 1 (thin) to 10 (thick).',
        },
        {
          title: 'Draw a Star!',
          content: 'Challenge: Put pen down, then repeat 5 times: move forward 80 and turn right 144 degrees. You\'ll draw a star! <i class="fa-solid fa-star" style="color:#f59e0b;"></i>',
        },
      ],
    },
    {
      id: 'loops-repetition',
      title: 'Loops & Repetition',
      description: 'Learn how to repeat actions using loops — a fundamental programming concept.',
      icon: '<i class="fa-solid fa-rotate"></i>',
      difficulty: 'medium',
      duration: '10 min',
      steps: [
        {
          title: 'What is a Loop?',
          content: 'A loop repeats a set of instructions multiple times. Instead of copying the same blocks 10 times, you can use one loop block!',
        },
        {
          title: 'The Repeat Block',
          content: 'Find the <code>repeat 10 times</code> block in the Control category. Put blocks inside it to repeat them.',
        },
        {
          title: 'Draw a Circle',
          content: 'Try this: repeat 36 times → move forward 5, turn right 10. This draws a circle! Each small turn adds up to a full 360°.',
        },
        {
          title: 'Nested Loops',
          content: 'You can put a loop inside another loop! This is called "nesting." Try making a spiral by changing the step size each time.',
        },
        {
          title: 'Pattern Challenge',
          content: 'Challenge: Use a repeat block with pen down to draw a hexagon (6 sides, 60° turns). Then try a triangle (3 sides, 120° turns)!',
        },
      ],
    },
    {
      id: 'sprite-looks',
      title: 'Changing Looks',
      description: 'Make the sprite change colors, sizes, and speak!',
      icon: '<i class="fa-solid fa-masks-theater"></i>',
      difficulty: 'easy',
      duration: '7 min',
      steps: [
        {
          title: 'Say Something',
          content: 'Use the <code>say "Hello!"</code> block to make the sprite show a speech bubble. You can type any message!',
        },
        {
          title: 'Timed Messages',
          content: 'The <code>say for 2 seconds</code> block shows a message that disappears after the time is up.',
        },
        {
          title: 'Change Color',
          content: 'Use <code>set sprite color</code> to change how the sprite looks. Click the color picker to choose.',
        },
        {
          title: 'Change Size',
          content: 'Make the sprite bigger or smaller with <code>set size</code> (absolute) or <code>change size by</code> (relative).',
        },
        {
          title: 'Show & Hide',
          content: 'Use <code>show</code> and <code>hide</code> blocks to make the sprite appear and disappear. Great for animations!',
        },
      ],
    },
    {
      id: 'making-music',
      title: 'Making Music',
      description: 'Create melodies and beats using sound blocks.',
      icon: '<i class="fa-solid fa-music"></i>',
      difficulty: 'medium',
      duration: '10 min',
      steps: [
        {
          title: 'Play a Note',
          content: 'The <code>play note</code> block plays musical notes (C, D, E, F, G, A, B). Each note has a different pitch!',
        },
        {
          title: 'Note Duration',
          content: 'Set how long each note plays by changing the "seconds" value. 0.5 is quick, 1.0 is longer.',
        },
        {
          title: 'Drum Beats',
          content: 'Use the <code>play drum beat</code> block to add percussion. Combine with notes for a full song!',
        },
        {
          title: 'Sound Types',
          content: 'The <code>play sound</code> block lets you choose different sound types: beep (smooth), buzz (rough), whistle (sharp), or hum (mellow).',
        },
        {
          title: 'Compose a Melody',
          content: 'Challenge: Play the notes C, D, E, C, E, C, E — that\'s the beginning of a nursery rhyme! Add wait blocks between notes for rhythm.',
        },
      ],
    },
    {
      id: 'conditionals',
      title: 'If-Then Decisions',
      description: 'Learn how programs make decisions using conditional logic.',
      icon: '<i class="fa-solid fa-code-branch"></i>',
      difficulty: 'medium',
      duration: '12 min',
      steps: [
        {
          title: 'What is a Condition?',
          content: 'A condition is something that can be <strong>true</strong> or <strong>false</strong>. For example: "Is 5 greater than 3?" — Yes (true)!',
        },
        {
          title: 'The If Block',
          content: 'Find the <code>if</code> block in Control. It runs the blocks inside only when the condition is true.',
        },
        {
          title: 'Comparison Blocks',
          content: 'In the Logic category, you\'ll find comparison blocks: equals (=), greater than (>), less than (<). Use them as conditions.',
        },
        {
          title: 'If-Else',
          content: 'The <code>if-else</code> block does one thing when true and another when false. Like choosing which path to take!',
        },
        {
          title: 'Think Like a Computer',
          content: 'Challenge: Computers make thousands of if-then decisions every second. Think of 3 everyday if-then examples (like: IF it rains, THEN take umbrella).',
        },
      ],
    },
    {
      id: 'variables',
      title: 'Variables — Storing Data',
      description: 'Learn how to store and use information with variables.',
      icon: '<i class="fa-solid fa-box-archive"></i>',
      difficulty: 'medium',
      duration: '10 min',
      steps: [
        {
          title: 'What is a Variable?',
          content: 'A variable is like a labeled box that stores a value. You can put a number, text, or other data inside and use it later.',
        },
        {
          title: 'Create a Variable',
          content: 'In the Variables category, click "Create variable." Give it a name like "score" or "speed." Now you can use it in your program!',
        },
        {
          title: 'Set a Value',
          content: 'Use the <code>set variable to</code> block to store a value. For example: set score to 0.',
        },
        {
          title: 'Change a Value',
          content: 'Use <code>change variable by</code> to increase or decrease a value. Perfect for keeping score or counting!',
        },
        {
          title: 'Use Variables Everywhere',
          content: 'Challenge: Create a variable called "sides" and use it in a repeat block to draw shapes with that many sides. Change the variable to draw different shapes!',
        },
      ],
    },
    {
      id: 'creative-patterns',
      title: 'Creative Patterns',
      description: 'Combine everything you\'ve learned to create beautiful geometric art.',
      icon: '<i class="fa-solid fa-dharmachakra"></i>',
      difficulty: 'hard',
      duration: '15 min',
      steps: [
        {
          title: 'Spirograph',
          content: 'A spirograph is a spiral pattern. Try: pen down, then repeat 100 times: move forward (i * 2), turn right 91. Use a variable for the step counter!',
        },
        {
          title: 'Colorful Patterns',
          content: 'Change the pen color inside a loop! You can create rainbow patterns by cycling through different colors.',
        },
        {
          title: 'Fractal Trees',
          content: 'A fractal is a pattern that repeats at different scales. While complex fractals need advanced techniques, you can create tree-like patterns with nested loops.',
        },
        {
          title: 'Mandala Design',
          content: 'Draw a mandala by repeating a pattern around a center point. Try: repeat 12 times → draw a shape, turn 30 degrees.',
        },
        {
          title: 'Be Creative!',
          content: 'Challenge: Combine pen drawing, loops, and color changes to create your own unique digital art masterpiece! Save your best work.',
        },
      ],
    },
    {
      id: 'coding-concepts',
      title: 'Real-World Coding',
      description: 'Understand how block coding connects to real programming languages.',
      icon: '<i class="fa-solid fa-laptop-code"></i>',
      difficulty: 'hard',
      duration: '12 min',
      steps: [
        {
          title: 'Blocks = Code',
          content: 'Every block you use generates real JavaScript or Python code. Click the code preview panel in the editor to see it!',
        },
        {
          title: 'Sequence',
          content: 'Programs run instructions one after another, top to bottom. This order is called "sequence" — the most basic programming concept.',
        },
        {
          title: 'Selection',
          content: 'Using if-then blocks is called "selection" — the program selects which path to follow based on conditions.',
        },
        {
          title: 'Iteration',
          content: 'Loops (repeat blocks) are called "iteration" — the program iterates (repeats) a set of instructions.',
        },
        {
          title: 'You\'re a Programmer!',
          content: 'Sequence, Selection, and Iteration are the 3 fundamental programming concepts. You already know them all! From here, you can learn any programming language.',
        },
      ],
    },
  ];

  // ── Render Tutorial Cards ───────────────────────────────────────
  const grid = document.getElementById('tutorialsGrid');
  if (!grid) return;

  tutorials.forEach((tutorial, index) => {
    const card = document.createElement('div');
    card.className = 'tutorial-card';
    card.setAttribute('data-tutorial', tutorial.id);
    card.innerHTML = `
      <div class="tutorial-card-image" style="background: ${getGradient(index)}">
        ${tutorial.icon}
      </div>
      <div class="tutorial-card-body">
        <h3>${tutorial.title}</h3>
        <p>${tutorial.description}</p>
        <div class="tutorial-meta">
          <span class="difficulty-badge difficulty-${tutorial.difficulty}">${tutorial.difficulty}</span>
          <span><i class="fa-regular fa-clock"></i> ${tutorial.duration}</span>
          <span><i class="fa-regular fa-file-code"></i> ${tutorial.steps.length} steps</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openTutorial(tutorial));
    grid.appendChild(card);
  });

  function getGradient(index) {
    const gradients = [
      'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3))',
      'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(16,185,129,0.3))',
      'linear-gradient(135deg, rgba(244,114,182,0.3), rgba(124,58,237,0.3))',
      'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(239,68,68,0.3))',
      'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(6,182,212,0.3))',
      'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(244,114,182,0.3))',
      'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))',
      'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(245,158,11,0.3))',
      'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(59,130,246,0.3))',
      'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(245,158,11,0.3))',
    ];
    return gradients[index % gradients.length];
  }

  // ── Tutorial Viewer ─────────────────────────────────────────────
  const viewer = document.getElementById('tutorialViewer');
  const body = document.getElementById('tutorialBody');
  const closeBtn = document.getElementById('tutorialClose');
  let currentStep = 0;
  let currentTutorial = null;

  function openTutorial(tutorial) {
    currentTutorial = tutorial;
    currentStep = 0;
    renderTutorialStep();
    viewer.classList.add('active');
    // Track in achievements
    if (window.Achievements) {
      window.Achievements.unlock('first_tutorial');
      const completed = getCompletedTutorials();
      if (completed.length >= 5) {
        window.Achievements.unlock('five_tutorials');
      }
    }
  }

  function closeTutorial() {
    viewer.classList.remove('active');
    currentTutorial = null;
    currentStep = 0;
  }

  function renderTutorialStep() {
    if (!currentTutorial) return;
    const tutorial = currentTutorial;
    const step = tutorial.steps[currentStep];
    const totalSteps = tutorial.steps.length;

    body.innerHTML = `
      <h2 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: var(--space-lg);">
        ${tutorial.icon} ${tutorial.title}
      </h2>
      <div class="step-indicator">
        ${tutorial.steps
          .map(
            (_, i) =>
              `<div class="step-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}"></div>`
          )
          .join('')}
      </div>
      <div class="tutorial-step">
        <h3>Step ${currentStep + 1}: ${step.title}</h3>
        <p>${step.content}</p>
      </div>
      <div class="tutorial-nav">
        <button class="btn btn-secondary btn-sm" id="prevStepBtn" ${currentStep === 0 ? 'disabled style="opacity:0.4;pointer-events:none;"' : ''}>
          <i class="fa-solid fa-arrow-left"></i> Previous
        </button>
        <span style="color: var(--text-muted); font-size: 0.85rem;">
          ${currentStep + 1} / ${totalSteps}
        </span>
        ${
          currentStep < totalSteps - 1
            ? `<button class="btn btn-primary btn-sm" id="nextStepBtn">Next <i class="fa-solid fa-arrow-right"></i></button>`
            : `<button class="btn btn-accent btn-sm" id="finishBtn"><i class="fa-solid fa-check"></i> Finish!</button>`
        }
      </div>
    `;

    // Attach event listeners
    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    const finishBtn = document.getElementById('finishBtn');

    if (prevBtn) prevBtn.addEventListener('click', () => { currentStep--; renderTutorialStep(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { currentStep++; renderTutorialStep(); });
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        markTutorialComplete(currentTutorial.id);
        closeTutorial();
      });
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeTutorial);

  // Close on overlay click
  if (viewer) {
    viewer.addEventListener('click', (e) => {
      if (e.target === viewer) closeTutorial();
    });
  }

  // ── Tutorial Progress (localStorage) ────────────────────────────
  const PROGRESS_KEY = 'codespark-tutorial-progress';

  function getCompletedTutorials() {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]');
  }

  function markTutorialComplete(tutorialId) {
    const completed = getCompletedTutorials();
    if (!completed.includes(tutorialId)) {
      completed.push(tutorialId);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));
    }
    // Trigger achievement
    if (window.Achievements) {
      window.Achievements.unlock('tutorial_complete');
      if (completed.length >= tutorials.length) {
        window.Achievements.unlock('all_tutorials');
      }
    }
  }

  // ── Expose ──────────────────────────────────────────────────────
  window.Tutorials = {
    getCompleted: getCompletedTutorials,
    getTutorials: () => tutorials,
  };
})();
