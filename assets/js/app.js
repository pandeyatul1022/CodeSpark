/**
 * CodeSpark — Main App Logic
 * Handles: authentication & login modal, mobile navigation, particles, scroll animations, stats counter
 */

(function () {
  'use strict';



  // Global SpeechSynthesis Helper (Voice Assistant)
  window.speakText = function (text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Stop ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Slightly slower for clear kid-friendly pronunciation
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  // ── Authentication Management ──────────────────────────────────────
  const AUTH_KEY = 'codespark-logged-user';
  const THEME_KEY = 'codespark-theme';

  function getSavedTheme() {
    try {
      const theme = localStorage.getItem(THEME_KEY);
      return theme === 'dark' ? 'dark' : 'light';
    } catch (error) {
      console.warn('Unable to read the saved theme preference.', error);
      return 'light';
    }
  }

  function updateThemeToggle(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const label = `Switch to ${nextTheme} theme`;
    const icon = themeToggle.querySelector('i');
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
  }

  function setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') {
      throw new TypeError('Theme must be "light" or "dark".');
    }

    document.documentElement.setAttribute('data-theme', theme);
    updateThemeToggle(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.warn('Unable to save the theme preference.', error);
    }
  }

  function initializeTheme() {
    setTheme(getSavedTheme());

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
      });
    }
  }

  function getLoggedUser() {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  function setLoggedUser(user) {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
    renderAuthUI();
  }

  function renderAuthUI() {
    const authContainer = document.getElementById('authContainer');
    if (!authContainer) return;

    const user = getLoggedUser();
    if (user && user.username) {
      const initial = user.username.charAt(0).toUpperCase();
      const safeName = escapeHtml(user.username);
      const customAvatar = localStorage.getItem('codespark_avatar');
      const avatarContent = customAvatar
        ? `<img src="${customAvatar}" alt="${safeName}">`
        : initial;

      authContainer.innerHTML = `
        <div class="avatar-wrapper" id="avatarWrapper">
          <div class="avatar-circle" id="avatarCircle" title="${safeName}">${avatarContent}</div>
          <div class="user-dropdown" id="userDropdown">
            <div class="dropdown-header">
              <div class="dropdown-avatar">${avatarContent}</div>
              <div class="dropdown-user-info">
                <span class="dropdown-username">${safeName}</span>
                <span class="dropdown-role">Student</span>
              </div>
            </div>
            <div class="dropdown-menu-items">
              <button class="dropdown-item" id="dropdownProfile">
                <i class="bi bi-person"></i> Profile
              </button>
              <button class="dropdown-item" id="dropdownAchievements">
                <i class="bi bi-trophy-fill"></i> Achievements
              </button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item logout-item" id="dropdownLogout">
                <i class="bi bi-box-arrow-right"></i> Logout
              </button>
            </div>
          </div>
        </div>
      `;

      // Toggle dropdown on avatar click
      const avatar = document.getElementById('avatarCircle');
      const dropdown = document.getElementById('userDropdown');
      if (avatar && dropdown) {
        avatar.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('open');
        });
      }

      // Close dropdown on outside click
      document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown && dropdown.classList.contains('open')) {
          if (!e.target.closest('.auth-container')) {
            dropdown.classList.remove('open');
          }
        }
      });

      // Profile button — navigate to profile.html
      const profileBtn = document.getElementById('dropdownProfile');
      if (profileBtn) {
        profileBtn.addEventListener('click', () => {
          document.getElementById('userDropdown')?.classList.remove('open');
          window.location.href = 'profile.html';
        });
      }

      // Achievements button — navigate to achievements.html
      const achieveBtn = document.getElementById('dropdownAchievements');
      if (achieveBtn) {
        achieveBtn.addEventListener('click', () => {
          document.getElementById('userDropdown')?.classList.remove('open');
          window.location.href = 'achievements.html';
        });
      }

      // Logout button
      const logoutBtn = document.getElementById('dropdownLogout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          document.getElementById('userDropdown')?.classList.remove('open');
          handleLogout();
        });
      }
    } else {
      authContainer.innerHTML = `
        <a href="login.html" class="btn btn-primary btn-sm login-btn" id="loginBtn">
          <i class="bi bi-person-fill" aria-hidden="true"></i> Login
        </a>
      `;
    }
  }

  function openLoginModal() {
    window.location.href = 'login.html';
  }

  function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
      loginModal.classList.remove('active');
    }
    const statusMsg = document.getElementById('loginStatusMsg');
    if (statusMsg) {
      statusMsg.className = 'auth-status';
      statusMsg.textContent = '';
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    const statusMsg = document.getElementById('loginStatusMsg');

    const username = usernameInput ? usernameInput.value.trim() : '';

    if (!username) {
      if (statusMsg) {
        statusMsg.textContent = 'Please enter a valid username';
        statusMsg.className = 'auth-status error';
      }
      return;
    }

    setLoggedUser({ username, loggedInAt: new Date().toISOString() });
    closeLoginModal();

    if (window.Achievements && typeof window.Achievements.unlock === 'function') {
      window.Achievements.unlock('user_login');
    }

    showToast(`Welcome back, ${username}!`, 'success');

    if (usernameInput) usernameInput.value = '';
    if (passwordInput) passwordInput.value = '';
  }

  function handleLogout() {
    setLoggedUser(null);
    showToast('Logged out successfully', 'info');

    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('profile.html') || currentPath.includes('achievements.html')) {
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 800);
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function showToast(msg, type = 'info') {
    const panel = document.getElementById('achievementsPanel');
    if (!panel) return;
    const toast = document.createElement('div');
    toast.className = `achievement-toast ${type}`;
    toast.style.animation = 'slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    toast.innerHTML = `
      <div class="achievement-toast-icon"><i class="bi bi-person-check-fill"></i></div>
      <div class="achievement-toast-content">
        <h4>Account</h4>
        <p>${escapeHtml(msg)}</p>
      </div>
    `;
    panel.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.4s ease forwards';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  function initializeHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
    const slidesContainer = carousel.querySelector('.hero-slides');
    const indicators = Array.from(carousel.querySelectorAll('.hero-carousel-indicators button'));
    const previousButton = document.getElementById('heroPrevious');
    const nextButton = document.getElementById('heroNext');
    const announcement = document.getElementById('heroSlideAnnouncement');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (slides.length < 2 || !slidesContainer || indicators.length !== slides.length || !previousButton || !nextButton) {
      console.error('The hero carousel is missing required slides or controls.');
      return;
    }

    function updateSlideFrameHeight() {
      const originalHiddenStates = slides.map((slide) => slide.hidden);
      slidesContainer.style.height = '';
      slides.forEach((slide) => {
        slide.hidden = true;
      });

      let tallestSlide = 0;
      slides.forEach((slide) => {
        slide.hidden = false;
        tallestSlide = Math.max(tallestSlide, slide.getBoundingClientRect().height);
        slide.hidden = true;
      });

      slides.forEach((slide, index) => {
        slide.hidden = originalHiddenStates[index];
      });
      slidesContainer.style.height = `${Math.ceil(tallestSlide)}px`;
    }

    updateSlideFrameHeight();
    let resizeFrame = null;
    window.addEventListener('resize', () => {
      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame);
      }
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null;
        updateSlideFrameHeight();
      });
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateSlideFrameHeight);
    }

    const interval = 5000;
    let activeIndex = slides.findIndex((slide) => !slide.hidden);
    let timer = null;
    let pointerInside = false;
    let focusInside = false;
    if (activeIndex < 0) activeIndex = 0;

    function clearTimer() {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    }

    function canRotate() {
      return !motionPreference.matches && !pointerInside && !focusInside &&
        document.visibilityState === 'visible';
    }

    function scheduleRotation() {
      clearTimer();
      if (!canRotate()) return;
      timer = window.setTimeout(() => {
        timer = null;
        showSlide(activeIndex + 1, false);
        scheduleRotation();
      }, interval);
    }

    function showSlide(index, announceChange) {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;
        slide.hidden = !isActive;
        slide.setAttribute('aria-hidden', String(!isActive));
        indicators[slideIndex].setAttribute('aria-current', String(isActive));
      });

      if (announceChange && announcement) {
        const heading = slides[activeIndex].querySelector('h1');
        const title = heading ? heading.textContent.trim().replace(/\s+/g, ' ') : '';
        announcement.textContent = `Slide ${activeIndex + 1} of ${slides.length}${title ? `: ${title}` : ''}`;
      }
      scheduleRotation();
    }

    previousButton.addEventListener('click', () => showSlide(activeIndex - 1, true));
    nextButton.addEventListener('click', () => showSlide(activeIndex + 1, true));
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => showSlide(index, true));
    });

    carousel.addEventListener('pointerenter', () => {
      pointerInside = true;
      scheduleRotation();
    });
    carousel.addEventListener('pointerleave', () => {
      pointerInside = false;
      scheduleRotation();
    });
    carousel.addEventListener('focusin', () => {
      focusInside = true;
      scheduleRotation();
    });
    carousel.addEventListener('focusout', (event) => {
      if (!carousel.contains(event.relatedTarget)) {
        focusInside = false;
        scheduleRotation();
      }
    });
    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showSlide(activeIndex - 1, true);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showSlide(activeIndex + 1, true);
      }
    });
    document.addEventListener('visibilitychange', scheduleRotation);

    const handleMotionPreferenceChange = () => {
      scheduleRotation();
    };
    if (typeof motionPreference.addEventListener === 'function') {
      motionPreference.addEventListener('change', handleMotionPreferenceChange);
    } else {
      motionPreference.addListener(handleMotionPreferenceChange);
    }

    slides.forEach((slide, index) => {
      slide.setAttribute('aria-hidden', String(index !== activeIndex));
    });
    scheduleRotation();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeHeroCarousel();

    // Protected Page Guard
    const currentPath = window.location.pathname.toLowerCase();
    const isProtectedPage = currentPath.includes('profile.html') || currentPath.includes('achievements.html');
    const user = getLoggedUser();

    if (isProtectedPage && (!user || !user.username)) {
      window.location.href = 'index.html';
      return;
    }

    // Init Auth UI
    renderAuthUI();



    // Form Listener
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Global delegate listener for Login Button, Cancel Button, Theme Toggle, Voice Assistant
    document.addEventListener('click', (e) => {
      const loginBtn = e.target.closest('#loginBtn');
      if (loginBtn) {
        e.preventDefault();
        openLoginModal();
      }
      const cancelBtn = e.target.closest('#cancelLoginBtn');
      if (cancelBtn) {
        e.preventDefault();
        closeLoginModal();
      }



      // Voice Assistant Listen Button
      const listenBtn = e.target.closest('.listen-voice-btn');
      if (listenBtn) {
        const textToRead = listenBtn.getAttribute('data-read') ||
          listenBtn.closest('.card, .quiz-card, .hero-content')?.innerText ||
          'Welcome to CodeSpark!';
        window.speakText(textToRead);
        showToast('🔊 Reading text out loud...', 'info');
      }
    });

    // Overlay click close
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
      loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
          closeLoginModal();
        }
      });
    }

    // ── Mobile Navigation ─────────────────────────────────────────
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenuToggle && navLinks) {
      const setMobileNavOpen = (isOpen) => {
        navLinks.classList.toggle('active', isOpen);
        mobileMenuToggle.classList.toggle('open', isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
        mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      };

      mobileMenuToggle.addEventListener('click', () => {
        setMobileNavOpen(mobileMenuToggle.getAttribute('aria-expanded') !== 'true');
      });

      navLinks.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          setMobileNavOpen(false);
        }
      });

      document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
          setMobileNavOpen(false);
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
          setMobileNavOpen(false);
          mobileMenuToggle.focus();
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navLinks.classList.contains('active')) {
          setMobileNavOpen(false);
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
    const fadeElements = document.querySelectorAll('.feature-card, .stat-card, .badge-card');
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
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // ── Expose auth functions globally ──────────────────────────────
  window.CodeSpark = window.CodeSpark || {};
  window.CodeSpark.setTheme = setTheme;
  window.CodeSpark.getTheme = function () {
    return document.documentElement.getAttribute('data-theme') || getSavedTheme();
  };
  window.CodeSpark.getUser = getLoggedUser;
  window.CodeSpark.openLoginModal = openLoginModal;
  window.CodeSpark.closeLoginModal = closeLoginModal;
})();
