document.addEventListener('DOMContentLoaded', () => {
      const userStr = localStorage.getItem('codespark-logged-user') || localStorage.getItem('codespark_user');
      let name = 'atul';
      if (userStr) {
        try {
          const parsed = JSON.parse(userStr);
          if (parsed && parsed.username) name = parsed.username;
        } catch (e) {}
      }
      document.getElementById('certStudentName').textContent = name;
      document.getElementById('certDate').textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      document.getElementById('certID').textContent = 'ID: CS-' + Math.floor(100000 + Math.random() * 900000);
    });
