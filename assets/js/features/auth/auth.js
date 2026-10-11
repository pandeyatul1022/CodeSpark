function parseProviderJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(base64).split('').map((character) =>
      `%${(`00${character.charCodeAt(0).toString(16)}`).slice(-2)}`
    ).join(''));
    return JSON.parse(json);
  } catch (error) {
    console.error('Unable to read identity provider credentials:', error);
    return null;
  }
}

function showProviderMessage(alert, message, type = 'error') {
  alert.textContent = message;
  alert.className = `auth-alert ${type}`;
}

function completeProviderSignIn(alert, { name, email, picture, provider }) {
  if (!email) {
    throw new Error(`${provider} did not return an email address.`);
  }

  const username = name || email.split('@')[0];
  const userData = {
    username,
    email,
    provider,
    loggedInAt: new Date().toISOString()
  };

  if (picture) localStorage.setItem('codespark_avatar', picture);
  localStorage.setItem('codespark-logged-user', JSON.stringify(userData));
  localStorage.setItem('codespark_user', JSON.stringify(userData));
  showProviderMessage(alert, `Signed in with ${provider}. Redirecting...`, 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 600);
}

if (document.getElementById('pageLoginForm')) {
    function handleGoogleCredentialResponse(response) {
      const payload = response && response.credential
        ? parseProviderJwt(response.credential)
        : null;

      if (!payload || !payload.email) {
        showProviderMessage(document.getElementById('loginAlert'), 'Google sign-in could not verify your account. Please try again.');
        return;
      }

      try {
        completeProviderSignIn(document.getElementById('loginAlert'), {
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          provider: 'Google'
        });
      } catch (error) {
        console.error('Google sign-in could not be completed:', error);
        showProviderMessage(document.getElementById('loginAlert'), 'Google sign-in could not be completed. Please try again.');
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      const loginForm = document.getElementById('pageLoginForm');
      const loginAlert = document.getElementById('loginAlert');
      const googleBtn = document.getElementById('googleLoginBtn');
      const appleBtn = document.getElementById('appleLoginBtn');
      let googleInitialized = false;
      let appleInitialized = false;

      if (googleBtn) {
        googleBtn.addEventListener('click', () => {
          if (!window.google || !window.google.accounts) {
            showProviderMessage(loginAlert, 'Google sign-in is unavailable. Please use your username and password.');
            return;
          }

          try {
            if (!googleInitialized) {
              window.google.accounts.id.initialize({
                client_id: '1084282498263-codesparkexample.apps.googleusercontent.com',
                callback: handleGoogleCredentialResponse,
                auto_select: false
              });
              googleInitialized = true;
            }
            window.google.accounts.id.prompt((notification) => {
              if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                showProviderMessage(loginAlert, 'Google sign-in could not be opened. Please use your username and password.');
              }
            });
          } catch (error) {
            console.error('Google sign-in could not be initialized:', error);
            showProviderMessage(loginAlert, 'Google sign-in could not be opened. Please use your username and password.');
          }
        });
      }

      if (appleBtn) {
        appleBtn.addEventListener('click', async () => {
          if (!window.AppleID) {
            showProviderMessage(loginAlert, 'Apple sign-in is unavailable. Please use your username and password.');
            return;
          }

          try {
            if (!appleInitialized) {
              window.AppleID.auth.init({
                clientId: 'com.codespark.web.service',
                scope: 'name email',
                redirectURI: window.location.href,
                state: 'origin:web',
                usePopup: true
              });
              appleInitialized = true;
            }
            const response = await window.AppleID.auth.signIn();
            const user = response.user || {};
            const payload = response.authorization && response.authorization.id_token
              ? parseProviderJwt(response.authorization.id_token)
              : null;
            const name = user.name
              ? [user.name.firstName, user.name.lastName].filter(Boolean).join(' ')
              : (payload && payload.name);

            completeProviderSignIn(loginAlert, {
              name,
              email: user.email || (payload && payload.email),
              provider: 'Apple'
            });
          } catch (error) {
            console.error('Apple sign-in could not be completed:', error);
            showProviderMessage(loginAlert, 'Apple sign-in was cancelled or could not be completed. Please try again.');
          }
        });
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

          let registeredUsers = [];
          try {
            registeredUsers = JSON.parse(localStorage.getItem('codespark_registered_users') || '[]');
          } catch(err) {}

          const foundUser = registeredUsers.find(u =>
            u.username.toLowerCase() === username.toLowerCase() ||
            (u.email && u.email.toLowerCase() === username.toLowerCase())
          );

          if (registeredUsers.length > 0 && !foundUser) {
            loginAlert.textContent = 'User not found! Please check your username or register a new account.';
            loginAlert.className = 'auth-alert error';
            return;
          }

          if (foundUser && foundUser.password && foundUser.password !== password) {
            loginAlert.textContent = 'Incorrect password! Please try again.';
            loginAlert.className = 'auth-alert error';
            return;
          }

          const userData = {
            username: foundUser ? foundUser.username : username,
            email: foundUser ? foundUser.email : `${username}@codespark.dev`,
            loggedInAt: new Date().toISOString()
          };

          localStorage.setItem('codespark-logged-user', JSON.stringify(userData));
          localStorage.setItem('codespark_user', JSON.stringify(userData));

          loginAlert.textContent = 'Login successful! Redirecting...';
          loginAlert.className = 'auth-alert success';

          setTimeout(() => {
            window.location.href = 'index.html';
          }, 600);
        });
      }
    });
}

if (document.getElementById('pageRegisterForm')) {
    function handleGoogleCredentialResponse(response) {
      const payload = response && response.credential
        ? parseProviderJwt(response.credential)
        : null;

      if (!payload || !payload.email) {
        showProviderMessage(document.getElementById('registerAlert'), 'Google sign-in could not verify your account. Please try again.');
        return;
      }

      try {
        completeProviderSignIn(document.getElementById('registerAlert'), {
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          provider: 'Google'
        });
      } catch (error) {
        console.error('Google registration could not be completed:', error);
        showProviderMessage(document.getElementById('registerAlert'), 'Google sign-in could not be completed. Please try again.');
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      const registerForm = document.getElementById('pageRegisterForm');
      const registerAlert = document.getElementById('registerAlert');
      const googleBtn = document.getElementById('googleRegBtn');
      const appleBtn = document.getElementById('appleRegBtn');
      let googleInitialized = false;
      let appleInitialized = false;

      if (googleBtn) {
        googleBtn.addEventListener('click', () => {
          if (!window.google || !window.google.accounts) {
            showProviderMessage(registerAlert, 'Google sign-in is unavailable. Please create an account with the form below.');
            return;
          }

          try {
            if (!googleInitialized) {
              window.google.accounts.id.initialize({
                client_id: '1084282498263-codesparkexample.apps.googleusercontent.com',
                callback: handleGoogleCredentialResponse,
                auto_select: false
              });
              googleInitialized = true;
            }
            window.google.accounts.id.prompt((notification) => {
              if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                showProviderMessage(registerAlert, 'Google sign-in could not be opened. Please use the form below.');
              }
            });
          } catch (error) {
            console.error('Google sign-in could not be initialized:', error);
            showProviderMessage(registerAlert, 'Google sign-in could not be opened. Please use the form below.');
          }
        });
      }

      if (appleBtn) {
        appleBtn.addEventListener('click', async () => {
          if (!window.AppleID) {
            showProviderMessage(registerAlert, 'Apple sign-in is unavailable. Please create an account with the form below.');
            return;
          }

          try {
            if (!appleInitialized) {
              window.AppleID.auth.init({
                clientId: 'com.codespark.web.service',
                scope: 'name email',
                redirectURI: window.location.href,
                state: 'origin:web',
                usePopup: true
              });
              appleInitialized = true;
            }
            const response = await window.AppleID.auth.signIn();
            const user = response.user || {};
            const payload = response.authorization && response.authorization.id_token
              ? parseProviderJwt(response.authorization.id_token)
              : null;
            const name = user.name
              ? [user.name.firstName, user.name.lastName].filter(Boolean).join(' ')
              : (payload && payload.name);

            completeProviderSignIn(registerAlert, {
              name,
              email: user.email || (payload && payload.email),
              provider: 'Apple'
            });
          } catch (error) {
            console.error('Apple sign-in could not be completed:', error);
            showProviderMessage(registerAlert, 'Apple sign-in was cancelled or could not be completed. Please try again.');
          }
        });
      }

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

          let registeredUsers = [];
          try {
            registeredUsers = JSON.parse(localStorage.getItem('codespark_registered_users') || '[]');
          } catch(err) {}

          const existingUser = registeredUsers.find(u =>
            u.username.toLowerCase() === username.toLowerCase() ||
            u.email.toLowerCase() === email.toLowerCase()
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

          registeredUsers.push(newUser);
          localStorage.setItem('codespark_registered_users', JSON.stringify(registeredUsers));

          const loggedData = {
            username,
            fullName,
            email,
            role,
            loggedInAt: new Date().toISOString()
          };

          localStorage.setItem('codespark-logged-user', JSON.stringify(loggedData));
          localStorage.setItem('codespark_user', JSON.stringify(loggedData));

          registerAlert.textContent = 'Account created successfully! Logging you in...';
          registerAlert.className = 'auth-alert success';

          setTimeout(() => {
            window.location.href = 'index.html';
          }, 800);
        });
      }
    });
}
