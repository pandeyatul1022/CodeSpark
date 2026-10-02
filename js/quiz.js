/**
 * CodeSpark — Quiz Engine
 * Interactive coding awareness quiz with 15 questions
 */

(function () {
  'use strict';

  const startScreen = document.getElementById('quizStart');
  const activeScreen = document.getElementById('quizActive');
  const resultsScreen = document.getElementById('quizResults');
  if (!startScreen) return;

  // ── Quiz Questions ──────────────────────────────────────────────
  const questions = [
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

  // ── Quiz State ──────────────────────────────────────────────────
  let currentQuestion = 0;
  let score = 0;
  let answered = false;

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

  // ── Start Quiz ──────────────────────────────────────────────────
  function startQuiz() {
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
      optionsContainer.innerHTML = q.options
        .map(
          (opt, i) => `
        <div class="quiz-option" data-index="${i}" role="button" tabindex="0">
          <div class="quiz-option-letter">${letters[i]}</div>
          <span>${opt}</span>
        </div>
      `
        )
        .join('');

      // Add click listeners
      optionsContainer.querySelectorAll('.quiz-option').forEach((el) => {
        el.addEventListener('click', () => selectAnswer(parseInt(el.dataset.index)));
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectAnswer(parseInt(el.dataset.index));
          }
        });
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
  }

  // ── Select Answer ───────────────────────────────────────────────
  function selectAnswer(index) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const options = optionsContainer.querySelectorAll('.quiz-option');

    // Mark selected
    options[index].classList.add('selected');

    // Check correctness
    if (index === q.correct) {
      score++;
      options[index].classList.add('correct');
      if (feedback) {
        feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Correct! ${q.explanation}`;
        feedback.className = 'quiz-feedback show correct';
      }
    } else {
      options[index].classList.add('wrong');
      options[q.correct].classList.add('correct');
      if (feedback) {
        feedback.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Wrong! ${q.explanation}`;
        feedback.className = 'quiz-feedback show wrong';
      }
    }

    // Show next button
    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.innerHTML =
        currentQuestion < questions.length - 1 ? 'Next Question <i class="fa-solid fa-arrow-right"></i>' : '<i class="fa-solid fa-chart-pie"></i> View Results';
    }

    // Disable all options
    options.forEach((opt) => {
      opt.style.pointerEvents = 'none';
    });
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

    if (percent >= 90) {
      if (resultTitle) resultTitle.innerHTML = '<i class="fa-solid fa-star" style="color:#f59e0b"></i> Outstanding!';
      if (resultMessage)
        resultMessage.textContent = "You're a coding awareness champion! You know your stuff!";
    } else if (percent >= 70) {
      if (resultTitle) resultTitle.innerHTML = '<i class="fa-solid fa-trophy" style="color:#ffd700"></i> Great Job!';
      if (resultMessage)
        resultMessage.textContent = 'You have a strong understanding of coding concepts!';
    } else if (percent >= 50) {
      if (resultTitle) resultTitle.innerHTML = '<i class="fa-solid fa-thumbs-up" style="color:#3b82f6"></i> Good Effort!';
      if (resultMessage)
        resultMessage.textContent =
          "You're learning well. Review the tutorials to strengthen your knowledge.";
    } else {
      if (resultTitle) resultTitle.innerHTML = '<i class="fa-solid fa-fire" style="color:#ef4444"></i> Keep Learning!';
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
