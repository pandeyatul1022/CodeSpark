document.addEventListener('DOMContentLoaded', () => {
      const avatarLarge = document.getElementById('profileAvatarLarge');
      const avatarFileInput = document.getElementById('avatarFileInput');
      const uploadAvatarBtn = document.getElementById('uploadAvatarBtn');
      const formUploadAvatarBtn = document.getElementById('formUploadAvatarBtn');
      const removeAvatarBtn = document.getElementById('removeAvatarBtn');

      // Helper function to render avatar image
      function loadAvatar() {
        const savedAvatar = localStorage.getItem('codespark_avatar');
        const userStr = localStorage.getItem('codespark-logged-user') || localStorage.getItem('codespark_user');
        let user = {};
        if (userStr) {
          try {
            const parsed = JSON.parse(userStr);
            if (parsed && typeof parsed === 'object') user = parsed;
          } catch(e) {}
        }
        const username = user.username || 'Coder';
        const displayName = user.fullName || username;
        const profileHeading = document.getElementById('profileUsername');
        const profileBio = document.getElementById('profileBio');
        const settingsName = document.getElementById('settingsName');
        const settingsBio = document.getElementById('settingsBio');
        profileHeading.childNodes[0].nodeValue = displayName + ' ';
        profileBio.textContent = user.bio || 'Manage your profile and keep learning at your own pace.';
        settingsName.value = displayName;
        settingsBio.value = user.bio || '';

        if (savedAvatar) {
          const image = document.createElement('img');
          image.src = savedAvatar;
          image.alt = `${displayName} profile picture`;
          avatarLarge.replaceChildren(image);
          if (removeAvatarBtn) removeAvatarBtn.hidden = false;
        } else {
          avatarLarge.textContent = displayName.charAt(0).toUpperCase();
          if (removeAvatarBtn) removeAvatarBtn.hidden = true;
        }
      }

      loadAvatar();

      function renderSavedProjects() {
        const projectsContainer = document.getElementById('profileSavedProjects');
        if (!projectsContainer) return;

        let projects;
        try {
          const storedProjects = JSON.parse(localStorage.getItem('codespark-projects') || '[]');
          projects = Array.isArray(storedProjects)
            ? storedProjects.filter(project => project && typeof project.name === 'string' && project.name.trim())
            : [];
        } catch (error) {
          console.error('Unable to read saved projects.', error);
          projectsContainer.replaceChildren();
          const errorMessage = document.createElement('p');
          errorMessage.className = 'profile-projects-empty';
          errorMessage.textContent = 'Saved projects could not be loaded. Please try refreshing this page.';
          projectsContainer.append(errorMessage);
          return;
        }

        projectsContainer.replaceChildren();

        if (projects.length === 0) {
          const emptyState = document.createElement('div');
          emptyState.className = 'profile-projects-empty';
          const message = document.createElement('p');
          message.textContent = 'No saved projects yet. Create something in the editor and save it here.';
          const editorLink = document.createElement('a');
          editorLink.href = 'editor.html';
          editorLink.className = 'profile-project-link';
          editorLink.textContent = 'Open editor';
          emptyState.append(message, editorLink);
          projectsContainer.append(emptyState);
          return;
        }

        projects
          .slice()
          .sort((first, second) => new Date(second.date || 0).getTime() - new Date(first.date || 0).getTime())
          .forEach(project => {
            const item = document.createElement('article');
            item.className = 'profile-project-item';

            const details = document.createElement('div');
            details.className = 'profile-project-details';
            const name = document.createElement('h3');
            name.textContent = project.name.trim();
            const savedDate = document.createElement('p');
            if (project.date && !Number.isNaN(new Date(project.date).getTime())) {
              savedDate.textContent = `Saved ${new Date(project.date).toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}`;
            } else {
              savedDate.textContent = 'Saved project';
            }

            const editorLink = document.createElement('a');
            editorLink.href = 'editor.html';
            editorLink.className = 'profile-project-open';
            editorLink.setAttribute('aria-label', `Open editor to load ${project.name.trim()}`);
            const openIcon = document.createElement('i');
            openIcon.className = 'bi bi-box-arrow-up-right';
            openIcon.setAttribute('aria-hidden', 'true');
            editorLink.append(openIcon);

            details.append(name, savedDate);
            item.append(details, editorLink);
            projectsContainer.append(item);
          });
      }

      renderSavedProjects();
      window.addEventListener('storage', (event) => {
        if (event.key === 'codespark-projects') renderSavedProjects();
      });

      // Trigger file picker
      if (uploadAvatarBtn) {
        uploadAvatarBtn.addEventListener('click', () => avatarFileInput.click());
      }
      if (formUploadAvatarBtn) {
        formUploadAvatarBtn.addEventListener('click', () => avatarFileInput.click());
      }

      // Handle File Selection & Base64 conversion
      if (avatarFileInput) {
        avatarFileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (!file) return;

          if (!file.type.startsWith('image/')) {
            if (typeof showToast === 'function') showToast('Please select a valid image file!', 'error');
            return;
          }

          if (file.size > 5 * 1024 * 1024) { // 5MB limit
            if (typeof showToast === 'function') showToast('Image file size should be less than 5MB', 'error');
            return;
          }

          const reader = new FileReader();
          reader.onload = function(event) {
            const dataUrl = event.target.result;
            localStorage.setItem('codespark_avatar', dataUrl);
            loadAvatar();
            if (typeof renderAuthUI === 'function') renderAuthUI();
            if (typeof showToast === 'function') {
              showToast('Profile picture updated successfully! 📸', 'success');
            }
          };
          reader.readAsDataURL(file);
        });
      }

      // Remove Photo Handler
      if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', () => {
          localStorage.removeItem('codespark_avatar');
          avatarFileInput.value = '';
          loadAvatar();
          if (typeof renderAuthUI === 'function') renderAuthUI();
          if (typeof showToast === 'function') {
            showToast('Profile picture removed!', 'info');
          }
        });
      }

      // Handle Settings Save
      const settingsForm = document.getElementById('profileSettingsForm');
      if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const newName = document.getElementById('settingsName').value.trim();
          const newBio = document.getElementById('settingsBio').value.trim();

          if (newName) {
            try {
              const storedUser = localStorage.getItem('codespark-logged-user') || localStorage.getItem('codespark_user');
              const currentUser = storedUser ? JSON.parse(storedUser) : {};
              const userData = {
                ...(currentUser && typeof currentUser === 'object' ? currentUser : {}),
                fullName: newName,
                bio: newBio,
                loggedInAt: new Date().toISOString()
              };
              const serializedUser = JSON.stringify(userData);
              localStorage.setItem('codespark-logged-user', serializedUser);
              localStorage.setItem('codespark_user', serializedUser);

              if (userData.email || userData.username) {
                const registeredUsers = JSON.parse(localStorage.getItem('codespark_registered_users') || '[]');
                if (Array.isArray(registeredUsers)) {
                  const matchingUser = registeredUsers.find(user =>
                    (userData.email && user.email && user.email.toLowerCase() === userData.email.toLowerCase()) ||
                    (userData.username && user.username && user.username.toLowerCase() === userData.username.toLowerCase())
                  );
                  if (matchingUser) {
                    matchingUser.fullName = newName;
                    matchingUser.bio = newBio;
                    localStorage.setItem('codespark_registered_users', JSON.stringify(registeredUsers));
                  }
                }
              }

              document.getElementById('profileUsername').childNodes[0].nodeValue = newName + ' ';
              document.getElementById('profileBio').textContent = newBio || 'Manage your profile and keep learning at your own pace.';
              if (typeof showToast === 'function') showToast('Profile updated successfully!', 'success');
            } catch (error) {
              console.error('Unable to save profile settings.', error);
              if (typeof showToast === 'function') showToast('Unable to save profile changes. Please try again.', 'error');
              return;
            }
          }
        });
      }
    });
