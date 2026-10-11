(function () {
  'use strict';

  const categories = {
    first_run: 'coding',
    first_tutorial: 'learning',
    tutorial_complete: 'learning',
    five_tutorials: 'learning',
    all_tutorials: 'learning',
    first_quiz: 'quiz',
    quiz_master: 'quiz',
    perfect_quiz: 'quiz',
    first_save: 'coding',
    user_login: 'account',
    code_copier: 'coding',
    draw_something: 'coding',
    make_music: 'coding',
    ten_blocks: 'coding',
    explorer: 'account',
  };

  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('achievementCardsGrid');
    const tabs = Array.from(document.querySelectorAll('.badge-tab'));
    const emptyState = document.getElementById('achievementsEmpty');
    const errorState = document.getElementById('achievementsError');
    const progressCount = document.getElementById('achievementProgressCount');
    const progressTrack = document.getElementById('achievementProgressTrack');
    const progressFill = document.getElementById('achievementProgressFill');
    let achievements = [];
    let unlocked = [];
    let activeFilter = 'all';

    if (!grid || !emptyState || !errorState || !progressCount || !progressTrack || !progressFill) return;

    function render() {
      const total = achievements.length;
      const unlockedCount = achievements.filter((item) => unlocked.includes(item.id)).length;
      const lockedCount = total - unlockedCount;
      const visibleAchievements = achievements.filter((item) => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'unlocked') return unlocked.includes(item.id);
        if (activeFilter === 'locked') return !unlocked.includes(item.id);
        return categories[item.id] === activeFilter;
      });

      progressCount.textContent = `${unlockedCount} of ${total} unlocked`;
      progressTrack.setAttribute('aria-valuemax', String(total));
      progressTrack.setAttribute('aria-valuenow', String(unlockedCount));
      progressFill.style.width = total ? `${(unlockedCount / total) * 100}%` : '0%';
      document.querySelectorAll('[data-count]').forEach((count) => {
        const filter = count.getAttribute('data-count');
        count.textContent = String(
          filter === 'all' ? total : filter === 'unlocked' ? unlockedCount : filter === 'locked' ? lockedCount : 0
        );
      });

      grid.replaceChildren(...visibleAchievements.map((achievement) => {
        const isUnlocked = unlocked.includes(achievement.id);
        const card = document.createElement('article');
        card.className = `badge-card achievement-card${isUnlocked ? '' : ' locked'}`;
        card.dataset.category = categories[achievement.id] || 'account';
        card.dataset.status = isUnlocked ? 'unlocked' : 'locked';

        const icon = document.createElement('span');
        icon.className = 'badge-icon-box achievement-card-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = achievement.icon;

        const title = document.createElement('h3');
        title.textContent = achievement.title;

        const description = document.createElement('p');
        description.textContent = achievement.description;

        const status = document.createElement('span');
        status.className = `badge-status-pill badge-status-${isUnlocked ? 'unlocked' : 'locked'}`;
        status.innerHTML = isUnlocked
          ? '<i class="bi bi-check-circle-fill" aria-hidden="true"></i> Unlocked'
          : '<i class="bi bi-lock-fill" aria-hidden="true"></i> Locked';

        card.append(icon, title, description, status);
        return card;
      }));

      emptyState.hidden = visibleAchievements.length > 0;
    }

    function loadAchievements() {
      try {
        if (!window.Achievements || typeof window.Achievements.getAll !== 'function' ||
            typeof window.Achievements.getUnlocked !== 'function') {
          throw new Error('Achievement data is unavailable.');
        }

        const all = window.Achievements.getAll();
        const earned = window.Achievements.getUnlocked();
        if (!Array.isArray(all) || !Array.isArray(earned) ||
            all.some((item) => !item || typeof item.id !== 'string' ||
              typeof item.title !== 'string' || typeof item.description !== 'string' ||
              typeof item.icon !== 'string')) {
          throw new Error('Achievement data is invalid.');
        }

        achievements = all;
        unlocked = earned.filter((id) => all.some((item) => item.id === id));
        errorState.hidden = true;
        grid.hidden = false;
        render();
      } catch (error) {
        console.error('Unable to load achievements:', error);
        grid.replaceChildren();
        grid.hidden = true;
        emptyState.hidden = true;
        errorState.textContent = 'Achievements could not be loaded. Please refresh the page and try again.';
        errorState.hidden = false;
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        if (!errorState.hidden) return;
        activeFilter = tab.dataset.filter || 'all';
        tabs.forEach((item) => {
          const selected = item === tab;
          item.classList.toggle('active', selected);
          item.setAttribute('aria-pressed', String(selected));
        });
        render();
      });
    });

    window.addEventListener('storage', (event) => {
      if (event.key === 'codespark-achievements') loadAchievements();
    });

    loadAchievements();
  });
})();
