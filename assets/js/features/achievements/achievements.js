/**
 * CodeSpark — Achievement / Badge System
 * Gamification with unlockable achievements and toast notifications
 */

(function () {
  'use strict';

  // ── Achievement Definitions ─────────────────────────────────────
  const achievements = [
    {
      id: 'first_run',
      title: 'First Steps',
      description: 'Run your first program in the editor',
      icon: '<i class="bi bi-rocket-takeoff"></i>',
    },
    {
      id: 'first_tutorial',
      title: 'Eager Learner',
      description: 'Open your first tutorial',
      icon: '<i class="bi bi-book-half"></i>',
    },
    {
      id: 'tutorial_complete',
      title: 'Tutorial Graduate',
      description: 'Complete a tutorial',
      icon: '<i class="bi bi-mortarboard-fill"></i>',
    },
    {
      id: 'five_tutorials',
      title: 'Knowledge Seeker',
      description: 'Open 5 different tutorials',
      icon: '<i class="bi bi-cpu-fill"></i>',
    },
    {
      id: 'all_tutorials',
      title: 'Tutorial Master',
      description: 'Complete all tutorials',
      icon: '<i class="bi bi-award-fill"></i>',
    },
    {
      id: 'first_quiz',
      title: 'Quiz Taker',
      description: 'Complete the coding quiz',
      icon: '<i class="bi bi-question-square"></i>',
    },
    {
      id: 'quiz_master',
      title: 'Quiz Master',
      description: 'Score 70% or higher on the quiz',
      icon: '<i class="bi bi-award-fill"></i>',
    },
    {
      id: 'perfect_quiz',
      title: 'Perfect Score',
      description: 'Get 100% on the quiz',
      icon: '<i class="bi bi-gem"></i>',
    },
    {
      id: 'first_save',
      title: 'Project Saver',
      description: 'Save your first project',
      icon: '<i class="bi bi-floppy"></i>',
    },
    {
      id: 'user_login',
      title: 'CodeSpark Pioneer',
      description: 'Log into your CodeSpark account',
      icon: '<i class="bi bi-person-check-fill"></i>',
    },
    {
      id: 'code_copier',
      title: 'Code Collector',
      description: 'Copy generated code to clipboard',
      icon: '<i class="bi bi-copy"></i>',
    },
    {
      id: 'draw_something',
      title: 'Digital Artist',
      description: 'Use the pen to draw on the canvas',
      icon: '<i class="bi bi-palette"></i>',
    },
    {
      id: 'make_music',
      title: 'Music Maker',
      description: 'Play a sound using sound blocks',
      icon: '<i class="bi bi-music-note"></i>',
    },
    {
      id: 'ten_blocks',
      title: 'Block Builder',
      description: 'Use 10 or more blocks in a program',
      icon: '<i class="bi bi-boxes"></i>',
    },
    {
      id: 'explorer',
      title: 'Explorer',
      description: 'Visit all pages of CodeSpark',
      icon: '<i class="bi bi-geo-alt"></i>',
    },
  ];

  // ── Storage ─────────────────────────────────────────────────────
  const STORAGE_KEY = 'codespark-achievements';

  function getUnlocked() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }

  function saveUnlocked(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  // ── Unlock Achievement ──────────────────────────────────────────
  function unlock(achievementId) {
    const unlocked = getUnlocked();
    if (unlocked.includes(achievementId)) return; // Already unlocked

    unlocked.push(achievementId);
    saveUnlocked(unlocked);

    const achievement = achievements.find((a) => a.id === achievementId);
    if (achievement) {
      showToast(achievement);
    }
  }

  // ── Toast Notification ──────────────────────────────────────────
  function showToast(achievement) {
    const panel = document.getElementById('achievementsPanel');
    if (!panel) return;

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-info">
        <h4><i class="bi bi-trophy-fill" style="color:#ffd700"></i> Achievement Unlocked!</h4>
        <p>${achievement.title} — ${achievement.description}</p>
      </div>
    `;
    panel.appendChild(toast);

    // Remove after animation
    setTimeout(() => {
      toast.remove();
    }, 4500);
  }

  // ── Render Achievements Grid (tutorials page) ───────────────────
  function renderGrid() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;

    const unlocked = getUnlocked();

    grid.innerHTML = achievements
      .map((a) => {
        const isLocked = !unlocked.includes(a.id);
        return `
        <div class="badge-card ${isLocked ? 'locked' : ''}">
          ${isLocked ? '<div class="badge-lock-icon"><i class="bi bi-lock-fill"></i></div>' : ''}
          <div class="badge-icon">${a.icon}</div>
          <h4>${a.title}</h4>
          <p>${isLocked ? '???' : a.description}</p>
        </div>
      `;
      })
      .join('');
  }

  // ── Track page visits for "Explorer" achievement ────────────────
  function trackPageVisit() {
    const PAGES_KEY = 'codespark-visited-pages';
    const visited = JSON.parse(localStorage.getItem(PAGES_KEY) || '[]');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (!visited.includes(currentPage)) {
      visited.push(currentPage);
      localStorage.setItem(PAGES_KEY, JSON.stringify(visited));
    }

    // Check if all pages visited
    const allPages = ['index.html', 'editor.html', 'tutorials.html', 'quiz.html'];
    const visitedAll = allPages.every(
      (p) => visited.includes(p) || visited.includes(p.replace('.html', ''))
    );
    if (visitedAll) {
      unlock('explorer');
    }
  }

  // ── Track login ──────────────────────────────────────────
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', () => {
      unlock('user_login');
    });
  }

  // ── Init ────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    trackPageVisit();
  });

  // ── Expose ──────────────────────────────────────────────────────
  window.Achievements = {
    unlock,
    getUnlocked,
    getAll: () => achievements,
    renderGrid,
  };
})();
