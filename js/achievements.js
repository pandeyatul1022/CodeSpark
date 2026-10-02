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
      icon: '<i class="fa-solid fa-rocket"></i>',
    },
    {
      id: 'first_tutorial',
      title: 'Eager Learner',
      description: 'Open your first tutorial',
      icon: '<i class="fa-solid fa-book-open"></i>',
    },
    {
      id: 'tutorial_complete',
      title: 'Tutorial Graduate',
      description: 'Complete a tutorial',
      icon: '<i class="fa-solid fa-graduation-cap"></i>',
    },
    {
      id: 'five_tutorials',
      title: 'Knowledge Seeker',
      description: 'Open 5 different tutorials',
      icon: '<i class="fa-solid fa-brain"></i>',
    },
    {
      id: 'all_tutorials',
      title: 'Tutorial Master',
      description: 'Complete all tutorials',
      icon: '<i class="fa-solid fa-crown"></i>',
    },
    {
      id: 'first_quiz',
      title: 'Quiz Taker',
      description: 'Complete the coding quiz',
      icon: '<i class="fa-solid fa-clipboard-question"></i>',
    },
    {
      id: 'quiz_master',
      title: 'Quiz Master',
      description: 'Score 70% or higher on the quiz',
      icon: '<i class="fa-solid fa-award"></i>',
    },
    {
      id: 'perfect_quiz',
      title: 'Perfect Score',
      description: 'Get 100% on the quiz',
      icon: '<i class="fa-solid fa-gem"></i>',
    },
    {
      id: 'first_save',
      title: 'Project Saver',
      description: 'Save your first project',
      icon: '<i class="fa-solid fa-floppy-disk"></i>',
    },
    {
      id: 'theme_switch',
      title: 'Theme Explorer',
      description: 'Switch between dark and light themes',
      icon: '<i class="fa-solid fa-circle-half-stroke"></i>',
    },
    {
      id: 'code_copier',
      title: 'Code Collector',
      description: 'Copy generated code to clipboard',
      icon: '<i class="fa-solid fa-copy"></i>',
    },
    {
      id: 'draw_something',
      title: 'Digital Artist',
      description: 'Use the pen to draw on the canvas',
      icon: '<i class="fa-solid fa-palette"></i>',
    },
    {
      id: 'make_music',
      title: 'Music Maker',
      description: 'Play a sound using sound blocks',
      icon: '<i class="fa-solid fa-music"></i>',
    },
    {
      id: 'ten_blocks',
      title: 'Block Builder',
      description: 'Use 10 or more blocks in a program',
      icon: '<i class="fa-solid fa-cubes"></i>',
    },
    {
      id: 'explorer',
      title: 'Explorer',
      description: 'Visit all pages of CodeSpark',
      icon: '<i class="fa-solid fa-map-location-dot"></i>',
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
        <h4><i class="fa-solid fa-trophy" style="color:#ffd700"></i> Achievement Unlocked!</h4>
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
          ${isLocked ? '<div class="badge-lock-icon"><i class="fa-solid fa-lock"></i></div>' : ''}
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

  // ── Track theme switch ──────────────────────────────────────────
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      unlock('theme_switch');
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
