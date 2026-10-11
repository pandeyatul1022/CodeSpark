(function () {
  'use strict';

  const tracks = {
    html: {
      title: 'HTML learning path',
      levels: [
        ['HTML foundations', 'Learn what HTML is and how tags, elements, and attributes describe page content.', 'Identify the opening tag, closing tag, and content in a paragraph element.'],
        ['Build a page document', 'Put together the doctype and the html, head, and body elements.', 'Create a valid blank HTML document in the editor.'],
        ['Page title and metadata', 'Use title, charset, viewport, description, and favicon metadata.', 'Set a useful title and viewport metadata for a page.'],
        ['Headings and paragraphs', 'Structure a page with headings and readable paragraphs.', 'Create a page with one main heading, a section heading, and two paragraphs.'],
        ['Text and inline meaning', 'Use emphasis, strong importance, quotes, code, and other text elements appropriately.', 'Mark up a short paragraph with emphasis and inline code.'],
        ['Comments and character references', 'Add HTML comments and represent reserved or special characters safely.', 'Add a comment and display a less-than character as text.'],
        ['Links and navigation', 'Link to other pages, page sections, email addresses, and downloadable files.', 'Add a link to another page and one link to a section on the same page.'],
        ['Images and alternative text', 'Add images with useful alt text and appropriate dimensions.', 'Add an image and describe its purpose in the alt attribute.'],
        ['Responsive images and figures', 'Use picture and srcset to serve suitable images; add lazy loading below the fold and captions with figure.', 'Create a figure with a caption, descriptive alt text, and responsive image sources.'],
        ['Lists', 'Choose ordered, unordered, and description lists for grouped information.', 'Build a numbered set of steps and a bullet list of materials.'],
        ['Tables', 'Represent tabular data with captions, headings, and table sections.', 'Make an accessible table with a caption and column headers.'],
        ['Grouping content', 'Use div and span only when a more meaningful element does not fit.', 'Group a set of related links in a container.'],
        ['Semantic page sections', 'Structure pages with header, nav, main, section, article, aside, and footer.', 'Turn a plain page into a semantic article page.'],
        ['Audio and video', 'Add audio and video with sources, controls, and text alternatives.', 'Embed a video with controls and fallback text.'],
        ['Forms and labels', 'Build a form with labels, fieldsets, legends, and submit controls.', 'Create a clearly labeled contact form.'],
        ['Form controls', 'Choose suitable input types and use select, textarea, datalist, and output.', 'Create a form with email, select, and multiline message controls.'],
        ['Validation and submission', 'Use built-in validation, autocomplete, and form submission attributes.', 'Require a valid email and a non-empty message.'],
        ['Scripts and stylesheets', 'Connect CSS and JavaScript, and understand defer, async, and module scripts.', 'Load a stylesheet and a deferred script from separate files.'],
        ['Accessibility essentials', 'Support keyboard use, meaningful labels, text alternatives, and appropriate ARIA.', 'Check that every form control has an associated label.'],
        ['Search and social metadata', 'Write useful page titles and descriptions and add social sharing metadata.', 'Add a unique description and social preview title.'],
        ['Mobile-friendly content', 'Use viewport settings and responsive media to support small screens.', 'Ensure a page image can adapt to different screen sizes.'],
        ['Global and custom attributes', 'Use id, class, data attributes, language, and text direction correctly.', 'Add a language declaration and a data attribute to an element.'],
        ['Validate and review markup', 'Catch invalid nesting and duplicate IDs with browser DevTools and an HTML validator or linter.', 'Validate a page, inspect a broken element, and fix one markup issue.'],
        ['Safer HTML', 'Avoid unsafe markup patterns and handle untrusted content carefully.', 'Explain why untrusted input should not be inserted as raw HTML.'],
        ['Modern HTML and final page', 'Recognize obsolete elements and bring your HTML knowledge together in a complete page.', 'Build a small semantic page using links, images, lists, and a form.'],
        ['Embedded content: when needed', 'Use iframe for third-party or embedded content only when needed; add a title and restrict permissions.', 'Embed a page using an iframe title and restrictive permissions.'],
        ['Interactive HTML elements: when needed', 'Use details, summary, dialog, and popover when a project benefits from native browser interactions.', 'Add a details disclosure with a summary and content.'],
        ['Structured data: when needed', 'Add machine-readable metadata only when the site content and search requirements call for it.', 'Identify the information a simple article structured-data record would describe.'],
        ['SVG and MathML: when needed', 'Use inline SVG for custom vector graphics and MathML for mathematical notation when required.', 'Add an accessible inline SVG with a title.'],
        ['Browser APIs: learn when needed', 'Canvas, geolocation, drag-and-drop, localStorage/sessionStorage, workers, history, and service workers are browser APIs used through JavaScript, not HTML topics to memorize.', 'Choose an appropriate browser API for a feature and identify the permission or security concerns.'],
        ['Web Components and Shadow DOM', 'Learn custom elements and Shadow DOM when building reusable components or integrating a component library.', 'Identify the custom element name and its encapsulated shadow content.'],
        ['Specialized web markup and architecture', 'HTML email, detailed Content Security Policy, and micro-frontends are specialized project concerns, not beginner HTML requirements.', 'Decide whether a project needs email-safe markup, a security policy change, or a separately deployed frontend.']
      ],
      examples: [
        '<p>Hello, web!</p>',
        '<!doctype html>\n<html lang="en">\n<head><title>My page</title></head>\n<body><h1>Hello</h1></body>\n</html>',
        '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My page</title>\n</head>',
        '<h1>My garden</h1>\n<h2>Flowers</h2>\n<p>Some flowers bloom in spring.</p>',
        '<p><strong>Warning:</strong> <em>hot surface</em>. Use <code>&lt;strong&gt;</code> for importance.</p>',
        '<!-- Main page heading -->\n<p>Use &lt; to display a less-than sign.</p>',
        '<a href="about.html">About us</a>\n<a href="#contact">Contact section</a>',
        '<img src="cat.jpg" alt="A ginger cat sleeping on a chair" width="640" height="480">',
        '<figure>\n  <picture><source media="(max-width: 600px)" srcset="small.jpg"><img src="large.jpg" alt="Snowy mountain" loading="lazy"></picture>\n  <figcaption>A mountain after snowfall</figcaption>\n</figure>',
        '<ol><li>Mix</li><li>Bake</li></ol>\n<ul><li>Flour</li><li>Water</li></ul>',
        '<table>\n  <caption>Weekly hours</caption>\n  <thead><tr><th scope="col">Day</th><th scope="col">Hours</th></tr></thead>\n  <tbody><tr><th scope="row">Monday</th><td>6</td></tr></tbody>\n</table>',
        '<div class="link-group"><a href="one.html">One</a> <a href="two.html">Two</a></div>',
        '<header>Site title</header><nav aria-label="Main"><a href="/">Home</a></nav><main><article><h1>News</h1></article></main><footer>Copyright</footer>',
        '<video controls>\n  <source src="clip.mp4" type="video/mp4">\n  Your browser does not support video.\n</video>',
        '<form action="/contact" method="post"><label for="email">Email</label><input id="email" name="email"><button>Send</button></form>',
        '<label for="topic">Topic</label><select id="topic" name="topic"><option>HTML</option><option>CSS</option></select>\n<textarea name="message"></textarea>',
        '<form><label for="email-check">Email</label><input id="email-check" type="email" required autocomplete="email"><button>Submit</button></form>',
        '<link rel="stylesheet" href="styles.css">\n<script src="app.js" defer></script>',
        '<label for="name">Your name</label><input id="name" name="name">\n<img src="chart.png" alt="Sales rose from January to March">',
        '<title>Garden guide</title><meta name="description" content="A short guide to growing herbs.">\n<meta property="og:title" content="Garden guide">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n<img src="photo.jpg" srcset="photo-small.jpg 480w, photo.jpg 960w" sizes="100vw" alt="Coastline">',
        '<html lang="en" dir="ltr"><body><p id="intro" class="lead" data-section="welcome">Hello</p></body></html>',
        '<ul><li>First</li><li>Second</li></ul>',
        '<p>User text should be inserted as text, not trusted HTML.</p>',
        '<main><article><h1>Local park</h1><p>Opening hours</p><ul><li>Daily</li></ul></article></main>',
        '<iframe src="map.html" title="Map of the park" sandbox></iframe>',
        '<details><summary>Show hint</summary><p>Start with a heading.</p></details>',
        '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Garden notes"}</script>',
        '<svg role="img" aria-labelledby="shape-title" viewBox="0 0 20 20"><title id="shape-title">Blue circle</title><circle cx="10" cy="10" r="8"/></svg>',
        '<canvas id="chart" aria-label="Monthly visitors chart">Monthly visitors: 120, 180, 150</canvas>\n<!-- JavaScript draws the chart; provide a text equivalent. -->',
        'class UserCard extends HTMLElement {\n  connectedCallback() {\n    const root = this.attachShadow({ mode: "open" });\n    root.textContent = "User card";\n  }\n}\ncustomElements.define("user-card", UserCard);',
        '<!-- Email markup often needs table-based layout for broad mail-client support. -->\n<meta http-equiv="Content-Security-Policy" content="default-src \'self\';">'
      ],
      priorities: [
        'must', 'must', 'must', 'must', 'must', 'should', 'must', 'must', 'should', 'must',
        'must', 'must', 'must', 'should', 'must', 'must', 'must', 'must', 'should', 'should',
        'must', 'must', 'must', 'must', 'must', 'project', 'project', 'project', 'project',
        'project', 'project', 'project'
      ],
      lessonSteps: [
        {
          title: 'What is HTML?',
          explanation: 'HTML is a markup language that describes the structure and meaning of content on a web page. It is not a programming language.',
          example: 'A heading is content marked up as a heading: <h1>Welcome</h1>'
        },
        {
          title: 'What is the full form of HTML?',
          explanation: 'HTML stands for HyperText Markup Language. HyperText connects related documents through links; markup uses tags to describe content.',
          example: '<a href="about.html">About us</a>'
        },
        {
          title: 'Where is HTML used?',
          explanation: 'HTML is used to structure web pages and web applications. Browsers read HTML to present headings, paragraphs, links, images, forms, and other content.',
          example: '<h1>Our library</h1>\n<p>Explore books and learning resources.</p>'
        },
        {
          title: 'How are HTML, CSS, and JavaScript different?',
          explanation: 'HTML provides structure and meaning, CSS controls visual presentation and layout, and JavaScript adds behavior and interactivity.',
          example: 'HTML: a button exists\nCSS: the button has a color\nJavaScript: clicking the button performs an action'
        },
        {
          title: 'What are tags, elements, and attributes?',
          explanation: 'A tag is markup such as <p> or </p>. An element includes its opening tag, content, and closing tag. An attribute adds information to an opening tag, such as href on a link.',
          example: '<a href="https://example.com">Visit the site</a>\n\n<a> and </a> are tags; the whole link is an element; href is an attribute.'
        }
      ]
    },
    css: {
      title: 'CSS learning path',
      levels: [
        ['CSS foundations', 'Learn what CSS does and how rules, selectors, properties, and values fit together.', 'Write a rule that changes the color of a heading.'],
        ['Connect a stylesheet', 'Add an external stylesheet and understand inline and embedded CSS.', 'Link a stylesheet to an HTML page.'],
        ['Selectors', 'Target elements with type, class, ID, attribute, and combination selectors.', 'Style one class without changing other paragraphs.'],
        ['Cascade and specificity', 'Understand source order, inheritance, specificity, and how conflicts are resolved.', 'Predict which of two competing rules will apply.'],
        ['Colors and backgrounds', 'Set readable text colors, background colors, and simple background images.', 'Choose foreground and background colors with clear contrast.'],
        ['Typography', 'Control font families, sizes, weight, line height, and text alignment.', 'Style a heading and body text for comfortable reading.'],
        ['CSS units and values', 'Use px, %, rem, em, vh, vw, and min(), max(), clamp(), and calc() for fluid sizing.', 'Set a responsive heading size with clamp and a content width with min.'],
        ['Box model', 'Understand content, padding, border, margin, and box sizing.', 'Give a card padding and a consistent outer margin.'],
        ['Borders, shadows, and corners', 'Add restrained borders, corner radii, and shadows to interface elements.', 'Create a card with a subtle border and rounded corners.'],
        ['Display and overflow', 'Use block, inline, inline-block, and overflow behavior intentionally.', 'Place a small label beside text without breaking the line.'],
        ['Flexbox', 'Align and distribute items in one-dimensional layouts with Flexbox.', 'Arrange navigation links in a centered row with a gap.'],
        ['CSS Grid', 'Create rows and columns for two-dimensional page layouts.', 'Build a responsive two-column card grid.'],
        ['Positioning and stacking', 'Use static, relative, absolute, fixed, and sticky positioning carefully.', 'Position a badge inside a card without affecting document flow.'],
        ['Responsive design', 'Use flexible sizing and media queries to adapt layouts to screen sizes.', 'Change a two-column layout to one column on narrow screens.'],
        ['Pseudo-classes and pseudo-elements', 'Style interaction states and selected parts of elements.', 'Add a visible hover and keyboard-focus state to a link.'],
        ['Transitions and transforms', 'Use restrained transitions, transforms, gradients, and animation for useful feedback.', 'Add a subtle hover transition to a button.'],
        ['Custom properties', 'Store reusable design values in CSS variables.', 'Define and reuse a primary color custom property.'],
        ['CSS organization', 'Group rules consistently and reduce duplication with reusable classes.', 'Refactor repeated spacing values into a custom property.'],
        ['Accessibility and motion', 'Preserve focus visibility, contrast, readable sizing, and reduced-motion preferences.', 'Disable a nonessential animation for reduced-motion users.'],
        ['Styling forms and controls', 'Style inputs, selects, buttons, and validation states while keeping labels and focus visible.', 'Style an email input and its focus state without removing the browser outline.'],
        ['Debugging with browser DevTools', 'Inspect computed styles, trace overridden declarations, and test layout at different viewport sizes.', 'Use the Styles panel to find and fix a rule that is crossed out.'],
        ['Images and aspect ratios', 'Use object-fit and aspect-ratio to keep image layouts consistent.', 'Crop a thumbnail without stretching it.'],
        ['Modern responsive CSS', 'Use logical properties, container queries, and @supports when the component or browser support requires them.', 'Use a container query to change a card layout based on its parent width.'],
        ['Final responsive design', 'Combine selectors, layout, typography, accessibility, and responsive rules in a complete design.', 'Style a semantic page that remains usable on mobile and desktop.'],
        ['CSS preprocessors and tooling: when needed', 'Sass/SCSS, PostCSS, and CSS-in-JS are project-specific tools; first learn the platform CSS they build on.', 'Recognize when a project uses a preprocessor and find its source stylesheet.'],
        ['Advanced visual effects: when needed', 'Blend modes, clip-path, and complex animations are optional techniques for designs that call for them.', 'Use clip-path for a decorative shape while preserving readable content.'],
        ['Team CSS systems: when needed', 'BEM, ITCSS, or SMACSS conventions, multi-brand themes, visual regression tests, and print styles depend on the team and product.', 'Follow an existing naming convention and identify a visual regression check.']
      ],
      examples: [
        'h1 {\n  color: navy;\n}',
        '<link rel="stylesheet" href="styles.css">',
        '.notice { color: darkred; }\n#main { max-width: 60rem; }\ninput[type="email"] { width: 100%; }',
        'p { color: slateblue; }\n.article p { color: darkslategray; }',
        'body { color: #243047; background-color: #f7f8fb; }',
        'body { font-family: system-ui, sans-serif; line-height: 1.6; }\nh1 { font-size: 2rem; }',
        '.page { width: min(100%, 60rem); margin-inline: auto; gap: max(0.5rem, calc(1vw + 0.25rem)); }\n.page-title { font-size: clamp(1.5rem, 4vw, 3rem); }',
        '.card { box-sizing: border-box; padding: 1rem; border: 1px solid #ddd; margin: 1rem; }',
        '.card { border: 1px solid #ddd; border-radius: 0.75rem; box-shadow: 0 2px 8px #0001; }',
        '.badge { display: inline-block; padding: 0.25rem 0.5rem; }\n.panel { overflow: auto; }',
        '.navigation { display: flex; align-items: center; gap: 1rem; }',
        '.cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }',
        '.card { position: relative; }\n.card__badge { position: absolute; top: 0.5rem; right: 0.5rem; }',
        '.cards { display: grid; grid-template-columns: repeat(2, 1fr); }\n@media (max-width: 40rem) { .cards { grid-template-columns: 1fr; } }',
        'a:hover { color: rebeccapurple; }\na:focus-visible { outline: 2px solid currentColor; }\n.note::before { content: "Note: "; }',
        '.button { transition: transform 160ms ease; }\n.button:hover { transform: translateY(-2px); }',
        ':root { --color-accent: #6941c6; }\n.link { color: var(--color-accent); }',
        ':root { --space: 1rem; }\n.card { padding: var(--space); }\n.button { margin-top: var(--space); }',
        '@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; }\n}',
        'input:focus-visible { outline: 2px solid #6941c6; outline-offset: 2px; }\ninput:invalid { border-color: firebrick; }',
        '/* Inspect the computed value and the rule that wins in DevTools. */\n.card { width: min(100%, 40rem); }',
        '.thumbnail { aspect-ratio: 16 / 9; object-fit: cover; }',
        '.card-list { display: grid; grid-template-columns: 1fr; }\n@container (min-width: 32rem) { .card-list { grid-template-columns: 1fr 1fr; } }',
        '.layout { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }\n@media (max-width: 40rem) { .layout { grid-template-columns: 1fr; } }',
        '/* SCSS source */\n$accent: rebeccapurple;\n.button { color: $accent; }',
        '.shape { clip-path: polygon(50% 0, 100% 100%, 0 100%); }',
        '/* Follow the conventions already used in the project. */\n.card {}\n@media print { nav { display: none; } }'
      ],
      priorities: [
        'must', 'must', 'must', 'must', 'must', 'must', 'must', 'must', 'should', 'must',
        'must', 'must', 'must', 'must', 'must', 'should', 'must', 'should', 'must', 'must',
        'must', 'must', 'should', 'should', 'project', 'project', 'project'
      ]
    }
  };

  const progressPrefix = 'codespark-roadmap-progress-v4-';
  const roadmap = document.getElementById('tutorialRoadmap');
  const tabs = Array.from(document.querySelectorAll('.tutorial-category-btn'));
  const dialog = document.getElementById('roadmapLessonDialog');
  const closeButton = document.getElementById('roadmapLessonClose');
  const lessonLabel = document.getElementById('roadmapLessonLabel');
  const lessonTitle = document.getElementById('roadmapLessonTitle');
  const lessonDescription = document.getElementById('roadmapLessonDescription');
  const learningSteps = document.getElementById('roadmapLearningSteps');
  const learningStepList = document.getElementById('roadmapLearningStepList');
  const lessonTask = document.getElementById('roadmapLessonTask');
  const lessonExample = document.getElementById('roadmapLessonExample');
  const lessonActions = document.getElementById('roadmapLessonActions');
  const startQuizButton = document.getElementById('roadmapStartQuiz');
  const quizSection = document.getElementById('roadmapQuiz');
  const quizForm = document.getElementById('roadmapQuizForm');
  const quizQuestions = document.getElementById('roadmapQuizQuestions');
  const quizFeedback = document.getElementById('roadmapQuizFeedback');
  const retryQuizButton = document.getElementById('roadmapRetryQuiz');
  const backToLessonButton = document.getElementById('roadmapBackToLesson');
  let activeCategory = 'html';
  let activeLevel = null;

  function getCompleted(category) {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem(progressPrefix + category) || '[]');
    } catch (error) {
      console.error(`Unable to read ${category} roadmap progress.`, error);
      return [];
    }
    if (!Array.isArray(saved)) return [];
    return [...new Set(saved.filter((level) =>
      Number.isInteger(level) && level >= 0 && level < tracks[category].levels.length
    ))].sort((left, right) => left - right);
  }

  function renderTrack() {
    const track = tracks[activeCategory];
    const completed = getCompleted(activeCategory);
    const priorities = track.priorities;
    const requiredIndexes = priorities
      .map((priority, index) => priority === 'project' ? null : index)
      .filter((index) => index !== null);
    const requiredCompleted = requiredIndexes.filter((index) => completed.includes(index)).length;
    const nextRequiredIndex = requiredIndexes.find((index) => !completed.includes(index));
    const heading = document.createElement('div');
    heading.className = 'roadmap-track-heading';

    const title = document.createElement('h3');
    title.textContent = track.title;
    const progress = document.createElement('p');
    progress.textContent = `${requiredCompleted} of ${requiredIndexes.length} core levels complete`;
    heading.append(title, progress);

    const progressBar = document.createElement('progress');
    progressBar.className = 'roadmap-progress';
    progressBar.max = requiredIndexes.length;
    progressBar.value = requiredCompleted;
    progressBar.setAttribute('aria-label', `${requiredCompleted} of ${requiredIndexes.length} core levels complete`);

    const list = document.createElement('ol');
    list.className = 'roadmap-levels';
    track.levels.forEach(([name], index) => {
      const isComplete = completed.includes(index);
      const priority = priorities[index];
      const isUnlocked = isComplete ||
        (priority === 'project' && nextRequiredIndex === undefined) ||
        index === nextRequiredIndex;
      const item = document.createElement('li');
      item.className = `roadmap-stop ${index % 2 === 0 ? 'roadmap-stop-left' : 'roadmap-stop-right'}`;
      item.classList.toggle('is-complete', isComplete);
      item.classList.toggle('is-locked', !isUnlocked);
      item.classList.add(`priority-${priority}`);

      const marker = document.createElement('span');
      marker.className = 'roadmap-marker';
      marker.setAttribute('aria-hidden', 'true');
      marker.textContent = isComplete ? '✓' : String(index + 1);

      const button = document.createElement('button');
      button.className = 'roadmap-level-button';
      button.type = 'button';
      const isFirstStaticItem = index === 0;
      button.disabled = !isUnlocked;
      button.setAttribute('aria-label', isFirstStaticItem ? 'HTML Fundamentals' : `Level ${index + 1}: ${name}${isComplete ? ', completed' : isUnlocked ? ', unlocked' : ', locked'}`);

      const number = document.createElement('span');
      number.className = 'roadmap-level-number';
      number.textContent = `LEVEL ${String(index + 1).padStart(2, '0')}`;
      const label = document.createElement('strong');
      label.className = 'roadmap-level-name';
      label.textContent = isFirstStaticItem ? 'HTML Fundamentals' : name;
      const summary = document.createElement('small');
      summary.className = 'roadmap-level-summary';
      summary.textContent = isFirstStaticItem ? 'Learn the building blocks of a web page' : '';
      const state = document.createElement('span');
      state.className = 'roadmap-level-state';
      state.textContent = isComplete ? 'Completed' : isUnlocked ? 'Start level' : 'Locked';
      const priorityLabel = document.createElement('span');
      priorityLabel.className = 'roadmap-priority-label';
      priorityLabel.textContent = priority === 'must' ? 'Must know' : priority === 'should' ? 'Should know' : 'Learn when needed';
      button.append(number, label, summary, priorityLabel, state);
      if (isFirstStaticItem) {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          return false;
        });
      } else {
        button.addEventListener('click', () => openLevel(index));
      }

      item.append(marker, button);
      list.appendChild(item);
    });

    roadmap.replaceChildren(heading, progressBar, list);
  }

  function selectCategory(category) {
    activeCategory = category;
    tabs.forEach((tab) => {
      const selected = tab.dataset.category === category;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.setAttribute('aria-pressed', String(selected));
    });
    renderTrack();
  }

  function openLevel(index) {
    activeLevel = index;
    const [name, description, task] = tracks[activeCategory].levels[index];
    const priority = tracks[activeCategory].priorities[index];
    const priorityLabel = priority === 'must' ? 'Must know' : priority === 'should' ? 'Should know' : 'Learn when needed';
    lessonLabel.textContent = `${activeCategory.toUpperCase()} · LEVEL ${String(index + 1).padStart(2, '0')} · ${priorityLabel.toUpperCase()}`;
    lessonTitle.textContent = name;
    lessonDescription.textContent = description;
    lessonTask.textContent = task;
    lessonExample.textContent = tracks[activeCategory].examples[index];
    const steps = activeCategory === 'html' && index === 0 ? tracks.html.lessonSteps : [];
    learningStepList.replaceChildren();
    steps.forEach((step) => {
      const item = document.createElement('li');
      const title = document.createElement('h4');
      title.textContent = step.title;
      const explanation = document.createElement('p');
      explanation.textContent = step.explanation;
      const example = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = step.example;
      example.appendChild(code);
      item.append(title, explanation, example);
      learningStepList.appendChild(item);
    });
    learningSteps.hidden = steps.length === 0;
    lessonActions.hidden = false;
    quizSection.hidden = true;
    quizQuestions.replaceChildren();
    quizFeedback.textContent = '';
    retryQuizButton.hidden = true;
    startQuizButton.textContent = getCompleted(activeCategory).includes(index) ? 'Review quiz' : 'Take level quiz';
    dialog.showModal();
  }

  function makeChoices(levelIndex, fieldIndex) {
    const levels = tracks[activeCategory].levels;
    const examples = tracks[activeCategory].examples;
    const current = fieldIndex === 3 ? levels[levelIndex][0] : fieldIndex === 4 ? examples[levelIndex] : levels[levelIndex][fieldIndex];
    const offsets = [1, 2, 3];
    const choices = [{ text: current, correct: true }];
    offsets.forEach((offset) => {
      const otherIndex = (levelIndex + offset) % levels.length;
      const value = fieldIndex === 3 ? levels[otherIndex][0] : fieldIndex === 4 ? examples[otherIndex] : levels[otherIndex][fieldIndex];
      if (!choices.some((choice) => choice.text === value)) choices.push({ text: value, correct: false });
    });
    for (let i = choices.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    return choices;
  }

  function addQuizQuestion(questionNumber, prompt, fieldIndex) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'roadmap-quiz-question';
    const legend = document.createElement('legend');
    legend.textContent = `${questionNumber}. ${prompt}`;
    fieldset.appendChild(legend);
    makeChoices(activeLevel, fieldIndex).forEach((choice, choiceIndex) => {
      const label = document.createElement('label');
      label.className = 'roadmap-quiz-option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `roadmap-question-${questionNumber}`;
      input.value = String(choiceIndex);
      input.dataset.correct = String(choice.correct);
      input.required = true;
      const answer = document.createElement('span');
      answer.textContent = choice.text;
      label.append(input, answer);
      fieldset.appendChild(label);
    });
    quizQuestions.appendChild(fieldset);
  }

  function startQuiz() {
    if (activeLevel === null) return;
    if (activeCategory === 'html' && activeLevel === 0) {
      window.location.href = 'quiz.html?course=html-foundations';
      return;
    }
    const [name] = tracks[activeCategory].levels[activeLevel];
    quizQuestions.replaceChildren();
    addQuizQuestion(1, 'Which topic does this level teach?', 3);
    addQuizQuestion(2, 'Which explanation matches this level?', 1);
    addQuizQuestion(3, 'Which code example belongs to this topic?', 4);
    addQuizQuestion(4, 'Which practice task should you complete?', 2);
    quizSection.querySelector('#roadmapQuizTitle').textContent = `${name} quiz`;
    quizFeedback.textContent = '';
    retryQuizButton.hidden = true;
    lessonActions.hidden = true;
    quizSection.hidden = false;
    quizSection.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function submitQuiz(event) {
    event.preventDefault();
    if (!quizForm.reportValidity() || activeLevel === null) return;
    const answers = Array.from(quizQuestions.querySelectorAll('input[type="radio"]:checked'));
    const correctCount = answers.filter((answer) => answer.dataset.correct === 'true').length;
    const score = Math.round((correctCount / 4) * 100);
    if (score >= 70) {
      const completed = getCompleted(activeCategory);
      if (!completed.includes(activeLevel)) {
        completed.push(activeLevel);
        try {
          localStorage.setItem(progressPrefix + activeCategory, JSON.stringify(completed));
        } catch (error) {
          console.error('Unable to save roadmap progress.', error);
          quizFeedback.textContent = `You scored ${score}%. The pass mark is 70%, but progress could not be saved. Check browser storage and try again.`;
          return;
        }
      }
      quizFeedback.textContent = `Passed — ${score}%. Level complete; the next level is now unlocked.`;
      retryQuizButton.hidden = true;
      renderTrack();
    } else {
      quizFeedback.textContent = `Not quite — ${score}%. You need at least 70%. Review the lesson and try again.`;
      retryQuizButton.hidden = false;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => selectCategory(tab.dataset.category));
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  startQuizButton.addEventListener('click', startQuiz);
  quizForm.addEventListener('submit', submitQuiz);
  retryQuizButton.addEventListener('click', startQuiz);
  backToLessonButton.addEventListener('click', () => {
    quizSection.hidden = true;
    lessonActions.hidden = false;
  });

  renderTrack();
})();
