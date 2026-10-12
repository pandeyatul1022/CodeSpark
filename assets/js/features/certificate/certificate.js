(function () {
  'use strict';

  function getLoggedInUser() {
    try {
      const storedUser = localStorage.getItem('codespark-logged-user') || localStorage.getItem('codespark_user');
      const user = storedUser ? JSON.parse(storedUser) : null;
      return user && typeof user.username === 'string' && user.username.trim() ? user : null;
    } catch (error) {
      console.error('Unable to check the current CodeSpark account for the certificate.', error);
      return null;
    }
  }

  const user = getLoggedInUser();
  if (!user) {
    try {
      sessionStorage.setItem('codespark-auth-return-to', 'certificate.html');
    } catch (error) {
      console.error('Unable to preserve the certificate page while opening login.', error);
    }
    window.location.replace('login.html');
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('certStudentName');
    const dateElement = document.getElementById('certDate');
    const idElement = document.getElementById('certID');
    const studentName = typeof user.fullName === 'string' && user.fullName.trim()
      ? user.fullName.trim()
      : user.username.trim();

    if (nameElement) nameElement.textContent = studentName;
    if (dateElement) {
      dateElement.textContent = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (idElement) idElement.textContent = 'ID: CS-' + Math.floor(100000 + Math.random() * 900000);
  });
})();
