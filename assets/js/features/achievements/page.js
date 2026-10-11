// Tab Filtering Logic for Badges
    document.addEventListener('DOMContentLoaded', () => {
      const tabs = document.querySelectorAll('.badge-tab');
      const cards = document.querySelectorAll('.badge-card');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          const filter = tab.getAttribute('data-filter');
          cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const status = card.getAttribute('data-status');

            if (filter === 'all') {
              card.style.display = 'block';
            } else if (filter === 'unlocked' || filter === 'locked') {
              card.style.display = (status === filter) ? 'block' : 'none';
            } else {
              card.style.display = (category === filter) ? 'block' : 'none';
            }
          });
        });
      });

      // Click card toast preview
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const title = card.querySelector('h3').innerText;
          const status = card.getAttribute('data-status');
          if (status === 'unlocked') {
            showToast(`🏅 Badge Unlocked: ${title}! Great job!`, 'success');
          } else {
            showToast(`🔒 Badge Locked: ${title}. Keep coding to unlock!`, 'warning');
          }
        });
      });
    });
