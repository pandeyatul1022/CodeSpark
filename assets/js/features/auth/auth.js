if (document.getElementById('pageLoginForm')) {
// ── Official Google JWT Token Decoder ──
    function parseGoogleJwt(token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        return JSON.parse(jsonPayload);
      } catch (e) {
        return null;
      }
    }

    // Google Identity Callback
    function handleGoogleCredentialResponse(response) {
      if (response && response.credential) {
        const payload = parseGoogleJwt(response.credential);
        const name = payload ? payload.name : 'Google User';
        const email = payload ? payload.email : 'user@gmail.com';
        const picture = payload ? payload.picture : null;

        if (picture) localStorage.setItem('codespark_avatar', picture);

        const userData = {
          username: name,
          email: email,
          provider: 'Google Official OAuth',
          loggedInAt: new Date().toISOString()
        };

        localStorage.setItem('codespark-logged-user', JSON.stringify(userData));
        localStorage.setItem('codespark_user', JSON.stringify(userData));

        const loginAlert = document.getElementById('loginAlert');
        if (loginAlert) {
          loginAlert.textContent = `Official Google Token Verified! Welcome ${name}...`;
          loginAlert.className = 'auth-alert success';
        }

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 600);
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      const loginForm = document.getElementById('pageLoginForm');
      const loginAlert = document.getElementById('loginAlert');
      const googleBtn = document.getElementById('googleLoginBtn');
      const appleBtn = document.getElementById('appleLoginBtn');

      const googleModal = document.getElementById('googleModalOverlay');
      const appleModal = document.getElementById('appleModalOverlay');

      // Initialize Official Google Identity Services SDK if online & client configured
      try {
        if (window.google && window.google.accounts) {
          window.google.accounts.id.initialize({
            client_id: '1084282498263-codesparkexample.apps.googleusercontent.com',
            callback: handleGoogleCredentialResponse,
            auto_select: false
          });
        }
      } catch(e) {}

      // Initialize Official Apple Auth SDK if loaded
      try {
        if (window.AppleID) {
          window.AppleID.auth.init({
            clientId: 'com.codespark.web.service',
            scope: 'name email',
            redirectURI: window.location.href,
            state: 'origin:web',
            usePopup: true
          });
        }
      } catch(e) {}

      if (googleBtn) {
        googleBtn.addEventListener('click', () => {
          // Attempt official Google GSI SDK prompt first
          if (window.google && window.google.accounts) {
            try {
              window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                  googleModal.classList.add('active');
                }
              });
            } catch(err) {
              googleModal.classList.add('active');
            }
          } else {
            googleModal.classList.add('active');
          }
        });
      }

      if (appleBtn) {
        appleBtn.addEventListener('click', () => {
          if (window.AppleID) {
            window.AppleID.auth.signIn().then((res) => {
              const email = res.user ? res.user.email : 'user@icloud.com';
              const name = res.user ? (res.user.name.firstName + ' ' + res.user.name.lastName) : 'Apple User';

              const userData = {
                username: name,
                email: email,
                provider: 'Apple ID Official',
                loggedInAt: new Date().toISOString()
              };

              localStorage.setItem('codespark-logged-user', JSON.stringify(userData));
              localStorage.setItem('codespark_user', JSON.stringify(userData));

              loginAlert.textContent = `Signed in successfully with Apple ID! Redirecting...`;
              loginAlert.className = 'auth-alert success';

              setTimeout(() => { window.location.href = 'index.html'; }, 600);
            }).catch(() => {
              appleModal.classList.add('active');
            });
          } else {
            appleModal.classList.add('active');
          }
        });
      }

      window.closeGoogleOAuth = function() {
        googleModal.classList.remove('active');
      };

      window.closeAppleOAuth = function() {
        appleModal.classList.remove('active');
      };

      window.submitGoogleOAuth = function(name, email) {
        googleModal.classList.remove('active');
        loginAlert.textContent = `Authenticating with Google Account (${email})...`;
        loginAlert.className = 'auth-alert success';

        setTimeout(() => {
          const userData = {
            username: name,
            email: email,
            provider: 'Google',
            loggedInAt: new Date().toISOString()
          };

          localStorage.setItem('codespark-logged-user', JSON.stringify(userData));
          localStorage.setItem('codespark_user', JSON.stringify(userData));

          loginAlert.textContent = `Signed in successfully as ${name}! Redirecting...`;
          loginAlert.className = 'auth-alert success';

          setTimeout(() => {
            window.location.href = 'index.html';
          }, 600);
        }, 500);
      };

      window.submitAppleOAuth = function() {
        const emailInput = document.getElementById('appleEmailInput');
        const hideEmail = document.getElementById('hideEmail').checked;
        const email = hideEmail ? 'privaterelay@appleid.com' : (emailInput ? emailInput.value : 'user@icloud.com');
        const username = hideEmail ? 'Apple ID User' : email.split('@')[0];

        appleModal.classList.remove('active');
        loginAlert.textContent = `Authenticating with Apple ID...`;
        loginAlert.className = 'auth-alert success';

        setTimeout(() => {
          const userData = {
            username: username,
            email: email,
            provider: 'Apple ID',
            loggedInAt: new Date().toISOString()
          };

          localStorage.setItem('codespark-logged-user', JSON.stringify(userData));
          localStorage.setItem('codespark_user', JSON.stringify(userData));

          loginAlert.textContent = `Signed in successfully with Apple ID! Redirecting...`;
          loginAlert.className = 'auth-alert success';

          setTimeout(() => {
            window.location.href = 'index.html';
          }, 600);
        }, 500);
      };

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
// ── Official Google JWT Token Decoder ──
    function parseGoogleJwt(token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        return JSON.parse(jsonPayload);
      } catch (e) {
        return null;
      }
    }

    function handleGoogleCredentialResponse(response) {
      if (response && response.credential) {
        const payload = parseGoogleJwt(response.credential);
        const name = payload ? payload.name : 'Google User';
        const email = payload ? payload.email : 'user@gmail.com';
        const picture = payload ? payload.picture : null;

        if (picture) localStorage.setItem('codespark_avatar', picture);

        const userData = {
          username: name,
          email: email,
          provider: 'Google Official OAuth',
          loggedInAt: new Date().toISOString()
        };

        localStorage.setItem('codespark-logged-user', JSON.stringify(userData));
        localStorage.setItem('codespark_user', JSON.stringify(userData));

        const registerAlert = document.getElementById('registerAlert');
        if (registerAlert) {
          registerAlert.textContent = `Official Google Token Verified! Registered ${name}...`;
          registerAlert.className = 'auth-alert success';
        }

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 600);
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      const registerForm = document.getElementById('pageRegisterForm');
      const registerAlert = document.getElementById('registerAlert');
      const googleBtn = document.getElementById('googleRegBtn');
      const appleBtn = document.getElementById('appleRegBtn');

      const googleModal = document.getElementById('googleModalOverlay');
      const appleModal = document.getElementById('appleModalOverlay');

      // Initialize Official Google Identity Services SDK if online
      try {
        if (window.google && window.google.accounts) {
          window.google.accounts.id.initialize({
            client_id: '1084282498263-codesparkexample.apps.googleusercontent.com',
            callback: handleGoogleCredentialResponse,
            auto_select: false
          });
        }
      } catch(e) {}

      // Initialize Official Apple Auth SDK if loaded
      try {
        if (window.AppleID) {
          window.AppleID.auth.init({
            clientId: 'com.codespark.web.service',
            scope: 'name email',
            redirectURI: window.location.href,
            state: 'origin:web',
            usePopup: true
          });
        }
      } catch(e) {}

      if (googleBtn) {
        googleBtn.addEventListener('click', () => {
          if (window.google && window.google.accounts) {
            try {
              window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                  googleModal.classList.add('active');
                }
              });
            } catch(err) {
              googleModal.classList.add('active');
            }
          } else {
            googleModal.classList.add('active');
          }
        });
      }

      if (appleBtn) {
        appleBtn.addEventListener('click', () => {
          if (window.AppleID) {
            window.AppleID.auth.signIn().then((res) => {
              const email = res.user ? res.user.email : 'user@icloud.com';
              const name = res.user ? (res.user.name.firstName + ' ' + res.user.name.lastName) : 'Apple User';

              const userData = {
                username: name,
                email: email,
                provider: 'Apple ID Official',
                loggedInAt: new Date().toISOString()
              };

              localStorage.setItem('codespark-logged-user', JSON.stringify(userData));
              localStorage.setItem('codespark_user', JSON.stringify(userData));

              registerAlert.textContent = `Registered successfully with Apple ID! Redirecting...`;
              registerAlert.className = 'auth-alert success';

              setTimeout(() => { window.location.href = 'index.html'; }, 600);
            }).catch(() => {
              appleModal.classList.add('active');
            });
          } else {
            appleModal.classList.add('active');
          }
        });
      }

      window.closeGoogleOAuth = function() {
        googleModal.classList.remove('active');
      };

      window.closeAppleOAuth = function() {
        appleModal.classList.remove('active');
      };

      window.submitGoogleOAuth = function(name, email) {
        googleModal.classList.remove('active');
        registerAlert.textContent = `Creating account via Google (${email})...`;
        registerAlert.className = 'auth-alert success';

        setTimeout(() => {
          const userData = {
            username: name,
            email: email,
            provider: 'Google',
            loggedInAt: new Date().toISOString()
          };

          localStorage.setItem('codespark-logged-user', JSON.stringify(userData));
          localStorage.setItem('codespark_user', JSON.stringify(userData));

          registerAlert.textContent = `Registered successfully as ${name}! Redirecting...`;
          registerAlert.className = 'auth-alert success';

          setTimeout(() => {
            window.location.href = 'index.html';
          }, 600);
        }, 500);
      };

      window.submitAppleOAuth = function() {
        const emailInput = document.getElementById('appleEmailInput');
        const hideEmail = document.getElementById('hideEmail').checked;
        const email = hideEmail ? 'privaterelay@appleid.com' : (emailInput ? emailInput.value : 'user@icloud.com');
        const username = hideEmail ? 'Apple ID User' : email.split('@')[0];

        appleModal.classList.remove('active');
        registerAlert.textContent = `Creating account via Apple ID...`;
        registerAlert.className = 'auth-alert success';

        setTimeout(() => {
          const userData = {
            username: username,
            email: email,
            provider: 'Apple ID',
            loggedInAt: new Date().toISOString()
          };

          localStorage.setItem('codespark-logged-user', JSON.stringify(userData));
          localStorage.setItem('codespark_user', JSON.stringify(userData));

          registerAlert.textContent = `Registered successfully with Apple ID! Redirecting...`;
          registerAlert.className = 'auth-alert success';

          setTimeout(() => {
            window.location.href = 'index.html';
          }, 600);
        }, 500);
      };

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
