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
        let username = 'atul';
        if (userStr) {
          try {
            const parsed = JSON.parse(userStr);
            if (parsed && parsed.username) username = parsed.username;
          } catch(e) {}
        }
        const initial = username.charAt(0).toUpperCase();
        document.getElementById('profileUsername').childNodes[0].nodeValue = username + ' ';
        document.getElementById('settingsName').value = username;

        if (savedAvatar) {
          avatarLarge.innerHTML = `<img src="${savedAvatar}" alt="${username}">`;
          if (removeAvatarBtn) removeAvatarBtn.style.display = 'inline-flex';
        } else {
          avatarLarge.textContent = initial;
          if (removeAvatarBtn) removeAvatarBtn.style.display = 'none';
        }
      }

      loadAvatar();

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

          if (newName) {
            const userData = JSON.stringify({ username: newName, loggedInAt: new Date().toISOString() });
            localStorage.setItem('codespark-logged-user', userData);
            localStorage.setItem('codespark_user', userData);
            if (typeof showToast === 'function') {
              showToast('Profile updated successfully! 🎉', 'success');
            }
            setTimeout(() => location.reload(), 800);
          }
        });
      }
    });
