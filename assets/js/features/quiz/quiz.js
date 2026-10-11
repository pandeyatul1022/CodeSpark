/**
 * CodeSpark — Quiz Engine
 * Tutorial-progress quiz with randomized questions and a per-question timer
 */

(function () {
  'use strict';

  const startScreen = document.getElementById('quizStart');
  const activeScreen = document.getElementById('quizActive');
  const resultsScreen = document.getElementById('quizResults');
  if (!startScreen) return;

  // ── Quiz Questions ──────────────────────────────────────────────
  const generalQuestions = [
    {
      question: 'What does a computer program do?',
      options: [
        'Follows a set of instructions to perform a task',
        'Makes the computer heavier',
        'Changes the color of the monitor',
        'Turns the computer into a robot',
      ],
      correct: 0,
      explanation: 'A program is a set of instructions that tells the computer what to do step by step.',
    },
    {
      question: 'What is "coding" also known as?',
      options: ['Painting', 'Programming', 'Singing', 'Drawing'],
      correct: 1,
      explanation: 'Coding and programming mean the same thing — writing instructions for computers!',
    },
    {
      question: 'Which of these is a programming language?',
      options: ['English', 'Python', 'Maths', 'History'],
      correct: 1,
      explanation: 'Python is a popular programming language. Others include JavaScript, Java, and C++.',
    },
    {
      question: 'What is a "bug" in programming?',
      options: [
        'An insect in the computer',
        'A mistake or error in the code',
        'A feature of the program',
        'A type of computer virus',
      ],
      correct: 1,
      explanation: 'A bug is an error in the code that causes the program to behave unexpectedly.',
    },
    {
      question: 'What is a "loop" in programming?',
      options: [
        'A circular shape',
        'A way to repeat instructions',
        'A type of computer cable',
        'A programming language',
      ],
      correct: 1,
      explanation: 'A loop repeats a set of instructions multiple times, saving you from writing the same code over and over.',
    },
    {
      question: 'What does HTML stand for?',
      options: [
        'How To Make Laptops',
        'HyperText Markup Language',
        'High Tech Modern Language',
        'Home Tool Markup Language',
      ],
      correct: 1,
      explanation: 'HTML (HyperText Markup Language) is used to create the structure of web pages.',
    },
    {
      question: 'What is an "algorithm"?',
      options: [
        'A type of music',
        'A step-by-step procedure to solve a problem',
        'A computer game',
        'A special keyboard',
      ],
      correct: 1,
      explanation: 'An algorithm is a step-by-step set of instructions to solve a problem or complete a task.',
    },
    {
      question: 'Which symbol is commonly used for comments in JavaScript?',
      options: ['@', '//', '#', '**'],
      correct: 1,
      explanation: 'In JavaScript, // is used for single-line comments. Comments help explain code to humans.',
    },
    {
      question: 'What is a "variable" in programming?',
      options: [
        'A type of computer',
        'A container that stores data',
        'A programming language',
        'A computer screen',
      ],
      correct: 1,
      explanation: 'A variable is like a labeled box that stores a value (number, text, etc.) that can be used and changed.',
    },
    {
      question: 'What does "debugging" mean?',
      options: [
        'Adding bugs to a program',
        'Removing insects from a computer',
        'Finding and fixing errors in code',
        'Making the program faster',
      ],
      correct: 2,
      explanation: 'Debugging is the process of finding and fixing bugs (errors) in your program.',
    },
    {
      question: 'What is the output of: 5 + 3?',
      options: ['53', '8', '35', '15'],
      correct: 1,
      explanation: 'In programming (and math), 5 + 3 equals 8. Computers are great at math!',
    },
    {
      question: 'What does "if-then" mean in coding?',
      options: [
        'Always do something',
        'Never do something',
        'Do something only when a condition is true',
        'Skip all instructions',
      ],
      correct: 2,
      explanation: 'If-then (conditional) statements let the program make decisions based on whether a condition is true or false.',
    },
    {
      question: 'Who is known as the "father of computers"?',
      options: [
        'Albert Einstein',
        'Charles Babbage',
        'Isaac Newton',
        'Thomas Edison',
      ],
      correct: 1,
      explanation: 'Charles Babbage designed the first mechanical computer (the Analytical Engine) in the 1830s.',
    },
    {
      question: 'What is "binary code"?',
      options: [
        'Code written in English',
        'Code using only 0s and 1s',
        'Code using alphabets only',
        'Code using colors',
      ],
      correct: 1,
      explanation: 'Binary code uses only two digits: 0 and 1. Computers process everything in binary at the lowest level.',
    },
    {
      question: 'What are the three basic concepts of programming?',
      options: [
        'Reading, Writing, Math',
        'Sequence, Selection, Iteration',
        'Mouse, Keyboard, Screen',
        'HTML, CSS, JavaScript',
      ],
      correct: 1,
      explanation: 'Sequence (order), Selection (if-then decisions), and Iteration (loops) are the three fundamental programming concepts.',
    },
  ];

  const foundationQuestions = [
    {
      question: 'What is HTML?',
      options: [
        'A markup language used to structure web content',
        'A styling language used only for colors',
        'A programming language used only for calculations',
        'A database for storing web pages',
      ],
      correct: 0,
      explanation: 'HTML is a markup language that describes the structure and meaning of web content.',
    },
    {
      question: 'What does HTML stand for?',
      options: [
        'HyperText Markup Language',
        'HighText Machine Language',
        'HyperTool Multi Language',
        'Home Text Markup Link',
      ],
      correct: 0,
      explanation: 'HTML stands for HyperText Markup Language.',
    },
    {
      question: 'Where is HTML commonly used?',
      options: [
        'To structure content in web pages and web applications',
        'Only to edit photographs',
        'Only to calculate spreadsheet formulas',
        'To replace the computer operating system',
      ],
      correct: 0,
      explanation: 'Browsers read HTML to present web content such as headings, paragraphs, links, and forms.',
    },
    {
      question: 'Which statement correctly describes HTML, CSS, and JavaScript?',
      options: [
        'HTML structures content, CSS styles it, and JavaScript adds behavior',
        'HTML adds behavior, CSS structures content, and JavaScript styles it',
        'All three are used only to write page text',
        'CSS and JavaScript are types of HTML tags',
      ],
      correct: 0,
      explanation: 'HTML provides structure, CSS handles presentation, and JavaScript adds interactivity.',
    },
    {
      question: 'In <a href="about.html">About</a>, which statement is correct?',
      options: [
        'The whole markup is an element, <a> is a tag, and href is an attribute',
        'href is the element, and About is an attribute',
        '<a> is an attribute, and href is the closing tag',
        'The whole markup is one attribute',
      ],
      correct: 0,
      explanation: 'Tags mark the start and end, the complete link is an element, and href is an attribute on its opening tag.',
    },
  ];

  const isFoundationQuiz = new URLSearchParams(window.location.search).get('course') === 'html-foundations';
  let questions = isFoundationQuiz ? foundationQuestions.slice() : [];
  const foundationPassMark = 35;
  const questionTimeLimit = 30;
  const previousQuestionTypes = new Map();
  let previousFoundationSequence = '';

  // ── Quiz State ──────────────────────────────────────────────────
  let currentQuestion = 0;
  let score = 0;
  let answered = false;
  let questionTimer = null;
  let secondsRemaining = questionTimeLimit;

  // ── DOM References ──────────────────────────────────────────────
  const progressFill = document.getElementById('quizProgressFill');
  const progressText = document.getElementById('quizProgressText');
  const questionNumber = document.getElementById('quizQuestionNumber');
  const questionText = document.getElementById('quizQuestionText');
  const optionsContainer = document.getElementById('quizOptions');
  const feedback = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextQuestionBtn');
  const startBtn = document.getElementById('startQuizBtn');
  const retryBtn = document.getElementById('retryQuizBtn');
  const foundationNextLevel = document.getElementById('foundationNextLevel');
  const timerDisplay = document.getElementById('quizTimer');
  const progressNotice = document.getElementById('quizProgressNotice');

  if (isFoundationQuiz) {
    const startTitle = document.getElementById('quizStartTitle');
    const startDescription = document.getElementById('quizStartDescription');
    const questionCount = document.getElementById('quizStartQuestionCount');
    if (startTitle) startTitle.textContent = 'HTML Foundations Quiz';
    if (startDescription) {
      startDescription.textContent = 'Check your understanding of HTML, its full form and uses, how HTML differs from CSS and JavaScript, and the meaning of tags, elements, and attributes. Score at least 35% to unlock the next HTML level.';
    }
    if (questionCount) questionCount.textContent = String(questions.length);
    if (startDescription) {
      startDescription.textContent = 'Answer five HTML foundation questions. Each question has a 30-second timer. Score at least 35% to unlock the next HTML level.';
    }
    if (progressNotice) progressNotice.textContent = '';
  } else {
    updateTutorialQuizAvailability();
  }

  // ── Start Quiz ──────────────────────────────────────────────────
  function startQuiz() {
    if (isFoundationQuiz) {
      questions = shuffleFoundationQuestions();
    } else {
      try {
        questions = buildTutorialQuestions();
      } catch (error) {
        if (progressNotice) progressNotice.textContent = error.message;
        if (startBtn) startBtn.disabled = true;
        console.error('Unable to prepare tutorial quiz.', error);
        return;
      }
      if (!questions.length) {
        updateTutorialQuizAvailability();
        return;
      }
    }

    const questionCount = document.getElementById('quizStartQuestionCount');
    if (questionCount) questionCount.textContent = String(questions.length);
    currentQuestion = 0;
    score = 0;
    answered = false;
    startScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    activeScreen.style.display = 'block';
    renderQuestion();
  }

  if (startBtn) startBtn.addEventListener('click', startQuiz);
  if (retryBtn) retryBtn.addEventListener('click', startQuiz);

  // ── Render Question ─────────────────────────────────────────────
  function renderQuestion() {
    clearQuestionTimer();
    answered = false;
    const q = questions[currentQuestion];
    const total = questions.length;

    // Update progress
    const progress = ((currentQuestion) / total) * 100;
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (progressText) progressText.textContent = `Question ${currentQuestion + 1} of ${total}`;
    if (questionNumber) questionNumber.textContent = `Question ${currentQuestion + 1}`;
    if (questionText) questionText.textContent = q.question;

    // Render options
    if (optionsContainer) {
      const letters = ['A', 'B', 'C', 'D'];
      optionsContainer.replaceChildren();
      q.options.forEach((opt, i) => {
        const option = document.createElement('div');
        option.className = 'quiz-option';
        option.dataset.index = String(i);
        option.setAttribute('role', 'button');
        option.tabIndex = 0;

        const letter = document.createElement('div');
        letter.className = 'quiz-option-letter';
        letter.textContent = letters[i];
        const label = document.createElement('span');
        label.textContent = opt;
        option.append(letter, label);

        option.addEventListener('click', () => selectAnswer(i));
        option.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectAnswer(i);
          }
        });
        optionsContainer.appendChild(option);
      });
    }

    // Hide feedback and next button
    if (feedback) {
      feedback.classList.remove('show', 'correct', 'wrong');
    }
    if (nextBtn) nextBtn.style.display = 'none';

    // Animate card
    const card = document.getElementById('quizQuestionCard');
    if (card) {
      card.style.animation = 'none';
      // Force reflow
      void card.offsetHeight;
      card.style.animation = 'fadeInUp 0.4s ease';
    }

    startQuestionTimer();
  }

  // ── Select Answer ───────────────────────────────────────────────
  function selectAnswer(index, timedOut = false) {
    if (answered) return;
    answered = true;
    clearQuestionTimer();

    const q = questions[currentQuestion];
    const options = optionsContainer.querySelectorAll('.quiz-option');

    // Mark selected
    if (!timedOut && options[index]) options[index].classList.add('selected');

    // Check correctness
    if (!timedOut && index === q.correct) {
      score++;
      options[index].classList.add('correct');
      if (feedback) {
        feedback.textContent = `Correct! ${q.explanation}`;
        feedback.className = 'quiz-feedback show correct';
      }
    } else {
      if (!timedOut && options[index]) options[index].classList.add('wrong');
      options[q.correct].classList.add('correct');
      if (feedback) {
        feedback.textContent = `${timedOut ? "Time's up!" : 'Wrong!'} ${q.explanation}`;
        feedback.className = 'quiz-feedback show wrong';
      }
    }

    // Show next button
    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.innerHTML =
        currentQuestion < questions.length - 1 ? 'Next Question <i class="bi bi-arrow-right"></i>' : '<i class="bi bi-pie-chart-fill"></i> View Results';
    }

    // Disable all options
    options.forEach((opt) => {
      opt.style.pointerEvents = 'none';
    });
  }

  function startQuestionTimer() {
    secondsRemaining = questionTimeLimit;
    updateTimerDisplay();
    questionTimer = window.setInterval(() => {
      secondsRemaining--;
      updateTimerDisplay();
      if (secondsRemaining <= 0) selectAnswer(-1, true);
    }, 1000);
  }

  function updateTimerDisplay() {
    if (!timerDisplay) return;
    timerDisplay.textContent = `${secondsRemaining} sec`;
    timerDisplay.setAttribute('aria-label', `${secondsRemaining} seconds remaining`);
    timerDisplay.classList.toggle('is-urgent', secondsRemaining <= 10);
  }

  function clearQuestionTimer() {
    if (questionTimer !== null) {
      window.clearInterval(questionTimer);
      questionTimer = null;
    }
  }

  function shuffle(items) {
    const shuffled = items.slice();
    for (let index = shuffled.length - 1; index > 0; index--) {
      const otherIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[otherIndex]] = [shuffled[otherIndex], shuffled[index]];
    }
    return shuffled;
  }

  function shuffleFoundationQuestions() {
    const shuffled = shuffle(foundationQuestions).map((question) => {
      const options = shuffle(
        question.options.map((text, index) => ({ text, correct: index === question.correct }))
      );
      return {
        ...question,
        options: options.map((option) => option.text),
        correct: options.findIndex((option) => option.correct),
      };
    });
    const sequence = shuffled.map((question) => question.question).join('|');
    if (sequence === previousFoundationSequence && shuffled.length > 1) {
      shuffled.push(shuffled.shift());
    }
    previousFoundationSequence = shuffled.map((question) => question.question).join('|');
    return shuffled;
  }

  function getCompletedTutorialLevels() {
    if (!window.CodeSparkRoadmap || typeof window.CodeSparkRoadmap.getTrackLevels !== 'function') {
      throw new Error('Tutorial data could not be loaded. Refresh the page and try again.');
    }

    const tracks = window.CodeSparkRoadmap.getTrackLevels();
    const completedLevels = [];
    Object.entries(tracks).forEach(([category, levels]) => {
      let saved;
      try {
        saved = localStorage.getItem(`codespark-roadmap-progress-v4-${category}`);
      } catch (error) {
        console.error(`Unable to read ${category.toUpperCase()} tutorial progress.`, error);
        throw new Error('Browser storage is unavailable. Enable local storage to load your completed tutorials.');
      }

      let completed = [];
      if (saved !== null) {
        try {
          completed = JSON.parse(saved);
        } catch (error) {
          console.error(`Invalid saved ${category.toUpperCase()} tutorial progress.`, error);
          throw new Error(`Saved ${category.toUpperCase()} tutorial progress could not be read. Please review your tutorial progress.`);
        }
      }
      if (!Array.isArray(completed) || completed.some((index) => !Number.isInteger(index) || index < 0 || index >= levels.length)) {
        throw new Error(`Saved ${category.toUpperCase()} tutorial progress is invalid. Please review your tutorial progress.`);
      }

      [...new Set(completed)].forEach((index) => {
        completedLevels.push({
          category,
          index,
          level: levels[index],
        });
      });
    });
    return { allLevels: Object.entries(tracks).flatMap(([category, levels]) =>
      levels.map((level, index) => ({ category, index, level }))
    ), completedLevels };
  }

  function updateTutorialQuizAvailability() {
    if (isFoundationQuiz) return;
    try {
      const { completedLevels } = getCompletedTutorialLevels();
      const count = completedLevels.length;
      const questionCount = document.getElementById('quizStartQuestionCount');
      if (questionCount) questionCount.textContent = String(count);
      if (startBtn) startBtn.disabled = count === 0;
      if (progressNotice) {
        progressNotice.textContent = count
          ? `${count} completed tutorial level${count === 1 ? '' : 's'} found. You will get one question from each.`
          : 'Complete at least one HTML or CSS tutorial level to unlock your personalized quiz.';
      }
    } catch (error) {
      if (startBtn) startBtn.disabled = true;
      if (progressNotice) progressNotice.textContent = error.message;
      console.error('Unable to check tutorial progress for the quiz.', error);
    }
  }

  function buildTutorialQuestions() {
    const { allLevels, completedLevels } = getCompletedTutorialLevels();
    const questionTypes = [
      {
        prompt: ({ category }) => `Which tutorial level did you complete in ${category.toUpperCase()}?`,
        getAnswer: ({ category, level }) => `${category.toUpperCase()} — ${level.title}`,
        getChoices: ({ category, level }) => allLevels.map((item) => `${item.category.toUpperCase()} — ${item.level.title}`),
        getExplanation: ({ level }) => level.description,
      },
      {
        prompt: ({ category, level }) => `Which practice activity matches your completed ${category.toUpperCase()} level, "${level.title}"?`,
        getAnswer: ({ category, level }) => `${category.toUpperCase()} — ${level.task}`,
        getChoices: () => allLevels.map((item) => `${item.category.toUpperCase()} — ${item.level.task}`),
        getExplanation: ({ level }) => level.task,
      },
      {
        prompt: ({ category, level }) => `What is the main focus of the completed ${category.toUpperCase()} level, "${level.title}"?`,
        getAnswer: ({ category, level }) => `${category.toUpperCase()} — ${level.description}`,
        getChoices: () => allLevels.map((item) => `${item.category.toUpperCase()} — ${item.level.description}`),
        getExplanation: ({ level }) => level.description,
      },
    ];

    return shuffle(completedLevels.map((item) => {
      const key = `${item.category}-${item.index}`;
      const previousType = previousQuestionTypes.get(key);
      const availableTypes = questionTypes
        .map((type, index) => ({ type, index }))
        .filter(({ index }) => index !== previousType);
      const selected = availableTypes[Math.floor(Math.random() * availableTypes.length)];
      previousQuestionTypes.set(key, selected.index);

      const correctAnswer = selected.type.getAnswer(item);
      const choices = selected.type.getChoices(item);
      const incorrectAnswers = shuffle([...new Set(choices.filter((choice) => choice !== correctAnswer))]).slice(0, 3);
      const options = shuffle([correctAnswer, ...incorrectAnswers]);
      return {
        question: selected.type.prompt(item),
        options,
        correct: options.indexOf(correctAnswer),
        explanation: selected.type.getExplanation(item),
      };
    }));
  }

  // ── Next Question / Show Results ────────────────────────────────
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        renderQuestion();
      } else {
        showResults();
      }
    });
  }

  // ── Show Results ────────────────────────────────────────────────
  function showResults() {
    activeScreen.style.display = 'none';
    resultsScreen.style.display = 'block';

    const percent = Math.round((score / questions.length) * 100);
    const scoreValue = document.getElementById('scoreValue');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const correctCount = document.getElementById('correctCount');
    const wrongCount = document.getElementById('wrongCount');

    if (scoreValue) scoreValue.textContent = `${percent}%`;
    if (correctCount) correctCount.textContent = score;
    if (wrongCount) wrongCount.textContent = questions.length - score;

    let foundationPassed = false;
    let progressSaved = true;
    if (isFoundationQuiz) {
      foundationPassed = percent >= foundationPassMark;
      if (foundationPassed) {
        progressSaved = unlockHtmlFoundationLevel();
      }
      if (resultTitle) {
        resultTitle.innerHTML = foundationPassed && progressSaved
          ? '<i class="bi bi-trophy-fill" style="color:#ffd700"></i> HTML Foundation Passed!'
          : foundationPassed
            ? '<i class="bi bi-exclamation-circle-fill" style="color:#f59e0b"></i> Progress Not Saved'
            : '<i class="bi bi-book-fill" style="color:#7c3aed"></i> Keep Practising';
      }
      if (resultMessage) {
        resultMessage.textContent = foundationPassed && progressSaved
          ? `You scored ${percent}%. The 35% pass mark is met, and the next HTML level is unlocked.`
          : foundationPassed
            ? `You scored ${percent}%, but your progress could not be saved. Check browser storage and try again.`
            : `You scored ${percent}%. You need at least ${foundationPassMark}% to unlock the next HTML level. Review the lesson and try again.`;
      }
      if (foundationNextLevel) {
        foundationNextLevel.hidden = false;
        foundationNextLevel.textContent = foundationPassed && progressSaved ? 'Continue to tutorials' : 'Review HTML Foundation';
      }
    } else if (percent >= 90) {
      if (resultTitle) resultTitle.innerHTML = '<i class="bi bi-star-fill" style="color:#f59e0b"></i> Outstanding!';
      if (resultMessage)
        resultMessage.textContent = "You're a coding awareness champion! You know your stuff!";
    } else if (percent >= 70) {
      if (resultTitle) resultTitle.innerHTML = '<i class="bi bi-trophy-fill" style="color:#ffd700"></i> Great Job!';
      if (resultMessage)
        resultMessage.textContent = 'You have a strong understanding of coding concepts!';
    } else if (percent >= 50) {
      if (resultTitle) resultTitle.innerHTML = '<i class="bi bi-hand-thumbs-up" style="color:#3b82f6"></i> Good Effort!';
      if (resultMessage)
        resultMessage.textContent =
          "You're learning well. Review the tutorials to strengthen your knowledge.";
    } else {
      if (resultTitle) resultTitle.innerHTML = '<i class="bi bi-fire" style="color:#ef4444"></i> Keep Learning!';
      if (resultMessage)
        resultMessage.textContent =
          "Don't worry! Check out the tutorials and try again. Practice makes perfect!";
    }

    // Save quiz result
    saveQuizResult(percent);

    // Achievements
    if (window.Achievements) {
      window.Achievements.unlock('first_quiz');
      if (percent === 100) {
        window.Achievements.unlock('perfect_quiz');
      }
      if (percent >= 70) {
        window.Achievements.unlock('quiz_master');
      }
    }
  }

  // ── Save Quiz Results ───────────────────────────────────────────
  const QUIZ_KEY = 'codespark-quiz-results';

  function unlockHtmlFoundationLevel() {
    const progressKey = 'codespark-roadmap-progress-v4-html';
    try {
      const saved = localStorage.getItem(progressKey);
      const completed = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(completed)) {
        throw new Error('Stored HTML roadmap progress is not a list.');
      }
      if (!completed.includes(0)) completed.push(0);
      localStorage.setItem(progressKey, JSON.stringify(completed));
      return true;
    } catch (error) {
      console.error('Unable to save HTML foundation progress.', error);
      return false;
    }
  }

  function saveQuizResult(percent) {
    const results = JSON.parse(localStorage.getItem(QUIZ_KEY) || '[]');
    results.push({
      score: percent,
      date: new Date().toISOString(),
      correct: score,
      total: questions.length,
    });
    localStorage.setItem(QUIZ_KEY, JSON.stringify(results));
  }

  // ── Expose ──────────────────────────────────────────────────────
  window.Quiz = {
    getResults: () => JSON.parse(localStorage.getItem(QUIZ_KEY) || '[]'),
  };
})();
