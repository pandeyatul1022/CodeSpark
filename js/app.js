/**
 * CodeSpark — Main App Logic
 * Handles: theme switching, mobile navigation, particles, scroll animations, stats counter
 */

(function () {
  'use strict';

  // ── Theme Management ──────────────────────────────────────────────
  const THEME_KEY = 'codespark-theme';

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  // Apply stored theme on load
  setTheme(getStoredTheme());

  document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    // ── Mobile Navigation ─────────────────────────────────────────
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenuToggle && navLinks) {
      mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        mobileMenuToggle.classList.toggle('open');
        if (mobileMenuToggle.classList.contains('open')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        }
      });
    }

    // ── Particle System (Hero Section) ────────────────────────────
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
      createParticles(particlesContainer, 30);
    }

    // ── Stats Counter Animation ───────────────────────────────────
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      statNumbers.forEach((el) => observer.observe(el));
    }

    // ── Scroll-triggered fade-in for feature cards ────────────────
    const fadeElements = document.querySelectorAll('.feature-card, .stat-card, .tutorial-card, .badge-card');
    if (fadeElements.length > 0) {
      const fadeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              fadeObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
        fadeObserver.observe(el);
      });
    }
  });

  // ── Helper: Create floating particles ───────────────────────────
  function createParticles(container, count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 4 + 2;
      const colors = [
        'rgba(124, 58, 237, 0.6)',
        'rgba(6, 182, 212, 0.6)',
        'rgba(244, 114, 182, 0.5)',
        'rgba(167, 139, 250, 0.5)',
      ];
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${Math.random() * 10 + 8}s;
        animation-delay: ${Math.random() * 10}s;
      `;
      container.appendChild(particle);
    }
  }

  // ── Helper: Animate counter numbers ─────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const start = performance.now();
    const suffix = '+';

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // ── Expose theme function globally ──────────────────────────────
  window.CodeSpark = window.CodeSpark || {};
  window.CodeSpark.setTheme = setTheme;
  window.CodeSpark.getTheme = getStoredTheme;
})();
