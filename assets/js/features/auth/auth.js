function showProviderMessage(alert, message, type = 'error') {
  alert.textContent = message;
  alert.className = `auth-alert ${type}`;
}

function getRegisteredUsers() {
  const storedUsers = localStorage.getItem('codespark_registered_users');
  if (storedUsers === null) return [];

  let users;
  try {
    users = JSON.parse(storedUsers);
  } catch (error) {
    console.error('Unable to read registered CodeSpark accounts.', error);
    throw new Error('Account data could not be read. Please refresh and try again.');
  }

  if (!Array.isArray(users) || users.some((user) =>
    !user ||
    typeof user.username !== 'string' ||
    typeof user.email !== 'string' ||
    typeof user.password !== 'string'
  )) {
    throw new Error('Account data is incomplete. Please contact support before creating another account.');
  }

  return users;
}

function getPostAuthenticationUrl() {
  try {
    const returnTo = sessionStorage.getItem('codespark-auth-return-to');
    sessionStorage.removeItem('codespark-auth-return-to');
    if (!returnTo) return 'index.html';

    const destination = new URL(returnTo, window.location.href);
    const page = destination.pathname.split('/').pop();
    const allowedPages = ['editor.html', 'quiz.html', 'certificate.html'];
    const validQuizRoute = page === 'quiz.html' &&
      [...destination.searchParams.keys()].every((key) => key === 'course') &&
      (!destination.searchParams.has('course') || destination.searchParams.get('course') === 'html-foundations');
    if (destination.origin === window.location.origin &&
      (allowedPages.includes(page) && page !== 'quiz.html' || validQuizRoute) &&
      !destination.hash
    ) {
      return `${page}${destination.search}`;
    }
  } catch (error) {
    console.error('Unable to restore the requested page after authentication.', error);
  }
  return 'index.html';
}

if (document.getElementById('pageLoginForm')) {
    document.addEventListener('DOMContentLoaded', () => {
      const loginForm = document.getElementById('pageLoginForm');
      const loginAlert = document.getElementById('loginAlert');
      const contextNotice = document.getElementById('loginContextNotice');
      if (contextNotice) {
        let notice = '';
        try {
          const registrationNotice = sessionStorage.getItem('codespark-registration-notice');
          if (registrationNotice) {
            notice = registrationNotice;
            sessionStorage.removeItem('codespark-registration-notice');
            const registeredIdentifier = sessionStorage.getItem('codespark-registration-identifier');
            if (registeredIdentifier) {
              document.getElementById('pageLoginUsername').value = registeredIdentifier;
              sessionStorage.removeItem('codespark-registration-identifier');
            }
          } else if (sessionStorage.getItem('codespark-editor-pending-action')) {
            notice = 'Log in to save or load projects. We will return you to the editor afterward.';
          } else if (sessionStorage.getItem('codespark-pending-quiz-result')) {
            notice = 'Log in to save your quiz score and continue to your result.';
          } else if (sessionStorage.getItem('codespark-auth-return-to') === 'certificate.html') {
            notice = 'Log in to view your personalized certificate.';
          }
        } catch (error) {
          console.error('Unable to read the requested sign-in action.', error);
        }
        if (notice) {
          contextNotice.textContent = notice;
          contextNotice.hidden = false;
        }
      }
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const username = document.getElementById('pageLoginUsername').value.trim();
          const password = document.getElementById('pageLoginPassword').value;

          if (!username) {
            loginAlert.textContent = 'Please enter your username!';
            loginAlert.className = 'auth-alert error';
            return;
          }

          try {
            const registeredUsers = getRegisteredUsers();
            if (registeredUsers.length === 0) {
              showProviderMessage(loginAlert, 'No account exists yet. Please register before logging in.');
              return;
            }

            const normalizedIdentifier = username.toLowerCase();
            const foundUser = registeredUsers.find((user) =>
              user.username.trim().toLowerCase() === normalizedIdentifier ||
              user.email.trim().toLowerCase() === normalizedIdentifier
            );

            if (!foundUser || foundUser.password !== password) {
              showProviderMessage(loginAlert, 'Username/email or password is incorrect.');
              return;
            }

            const userData = {
              username: foundUser.username,
              fullName: foundUser.fullName || foundUser.username,
              email: foundUser.email,
              role: foundUser.role || 'Student',
              loggedInAt: new Date().toISOString()
            };

            localStorage.setItem('codespark-logged-user', JSON.stringify(userData));
            localStorage.setItem('codespark_user', JSON.stringify(userData));

            showProviderMessage(loginAlert, 'Login successful! Redirecting...', 'success');

            setTimeout(() => {
              window.location.href = getPostAuthenticationUrl();
            }, 600);
          } catch (error) {
            console.error('Unable to verify the CodeSpark login.', error);
            showProviderMessage(loginAlert, error.message || 'Login could not be completed. Please try again.');
          }
        });
      }
    });
}

if (document.getElementById('pageRegisterForm')) {
    document.addEventListener('DOMContentLoaded', () => {
      const registerForm = document.getElementById('pageRegisterForm');
      const registerAlert = document.getElementById('registerAlert');

      if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const fullName = document.getElementById('regFullName').value.trim();
          const username = document.getElementById('regUsername').value.trim();
          const email = document.getElementById('regEmail').value.trim();
          const role = document.getElementById('regRole').value;
          const password = document.getElementById('regPassword').value;
          const confirmPassword = document.getElementById('regConfirmPassword').value;

          if (!username || !email || !password) {
            registerAlert.textContent = 'Please fill out all required fields!';
            registerAlert.className = 'auth-alert error';
            return;
          }

          if (password.length < 4) {
            registerAlert.textContent = 'Password must be at least 4 characters long!';
            registerAlert.className = 'auth-alert error';
            return;
          }

          if (password !== confirmPassword) {
            registerAlert.textContent = 'Passwords do not match! Please check again.';
            registerAlert.className = 'auth-alert error';
            return;
          }

          let registeredUsers;
          try {
            registeredUsers = getRegisteredUsers();
          } catch (error) {
            console.error('Unable to check for an existing CodeSpark account.', error);
            showProviderMessage(registerAlert, error.message || 'Account registration could not be completed.');
            return;
          }

          const existingUser = registeredUsers.find(u =>
            u.username.trim().toLowerCase() === username.toLowerCase() ||
            u.email.trim().toLowerCase() === email.toLowerCase()
          );

          if (existingUser) {
            registerAlert.textContent = 'Username or Email is already registered! Try logging in.';
            registerAlert.className = 'auth-alert error';
            return;
          }

          const newUser = {
            fullName,
            username,
            email,
            role,
            password,
            registeredAt: new Date().toISOString()
          };

          try {
            registeredUsers.push(newUser);
            localStorage.setItem('codespark_registered_users', JSON.stringify(registeredUsers));
            sessionStorage.setItem('codespark-registration-notice', 'Account created. Log in with your username/email and password to continue.');
            sessionStorage.setItem('codespark-registration-identifier', username);
          } catch (error) {
            console.error('Unable to save the new CodeSpark account.', error);
            showProviderMessage(registerAlert, 'Your account could not be saved. Check browser storage and try again.');
            return;
          }

          showProviderMessage(registerAlert, 'Account created. Redirecting to login...', 'success');

          setTimeout(() => {
            window.location.href = 'login.html';
          }, 800);
        });
      }
    });
}
