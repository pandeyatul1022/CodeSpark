/**
 * CodeSpark — Save & Load System
 * Project persistence using localStorage
 */

(function () {
  'use strict';

  const PROJECTS_KEY = 'codespark-projects';

  // Check if we're on the editor page
  const saveBtn = document.getElementById('saveBtn');
  const loadBtn = document.getElementById('loadBtn');
  if (!saveBtn || !loadBtn) return;

  const saveModal = document.getElementById('saveModal');
  const loadModal = document.getElementById('loadModal');
  const projectNameInput = document.getElementById('projectNameInput');
  const confirmSaveBtn = document.getElementById('confirmSaveBtn');
  const cancelSaveBtn = document.getElementById('cancelSaveBtn');
  const cancelLoadBtn = document.getElementById('cancelLoadBtn');
  const savedProjectsList = document.getElementById('savedProjectsList');
  const saveStatus = document.getElementById('saveProjectStatus');
  const loadStatus = document.getElementById('loadProjectStatus');

  function setStatus(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = `auth-status project-storage-status ${type || ''}`;
  }

  function getWorkspace() {
    if (!window.CodeSpark || !window.CodeSpark.workspace) {
      throw new Error('The editor workspace is not ready. Please refresh the page and try again.');
    }
    return window.CodeSpark.workspace;
  }

  function getLoggedInUser() {
    try {
      const storedUser = localStorage.getItem('codespark-logged-user') || localStorage.getItem('codespark_user');
      const user = storedUser ? JSON.parse(storedUser) : null;
      return user && typeof user.username === 'string' && user.username.trim() ? user : null;
    } catch (error) {
      console.error('Unable to check the current CodeSpark account.', error);
      return null;
    }
  }

  function requireLogin(action) {
    if (getLoggedInUser()) return false;

    try {
      sessionStorage.removeItem('codespark-pending-quiz-result');
      sessionStorage.removeItem('codespark-auth-return-to');
      sessionStorage.setItem('codespark-editor-pending-action', action);
      sessionStorage.setItem('codespark-auth-return-to', 'editor.html');
    } catch (error) {
      console.error('Unable to preserve the editor action while opening login.', error);
      throw new Error('Please enable browser session storage to continue to login.');
    }
    window.location.href = 'login.html';
    return true;
  }

  // ── Get Saved Projects ──────────────────────────────────────────
  function getSavedProjects() {
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (stored === null) return [];

    let projects;
    try {
      projects = JSON.parse(stored);
    } catch (error) {
      console.error('Unable to parse the saved project data.', error);
      throw new Error('Saved projects could not be read because the project data is damaged.');
    }

    if (!Array.isArray(projects) || projects.some((project) =>
      !project || typeof project.name !== 'string' ||
      typeof project.data !== 'string' || typeof project.date !== 'string'
    )) {
      throw new Error('Saved projects have an unsupported format. Your saved data has not been changed.');
    }

    return projects;
  }

  function saveProjects(projects) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }

  // ── Save Project ────────────────────────────────────────────────
  function saveProject(name) {
    if (requireLogin('save')) return;
    if (typeof name !== 'string' || !name.trim()) {
      throw new Error('Enter a project name before saving.');
    }

    const workspace = getWorkspace();
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    const projects = getSavedProjects();
    const existingIndex = projects.findIndex((project) => project.name === name);

    const projectData = {
      name,
      data: xmlText,
      date: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      projects[existingIndex] = projectData;
    } else {
      projects.push(projectData);
    }

    saveProjects(projects);

    // Saving is complete even if the optional achievement storage is unavailable.
    if (window.Achievements) {
      try {
        window.Achievements.unlock('first_save');
      } catch (error) {
        console.warn('Project was saved, but its achievement could not be recorded.', error);
      }
    }
  }

  // ── Load Project ────────────────────────────────────────────────
  function loadProject(name) {
    if (requireLogin('load')) return;
    const projects = getSavedProjects();
    const project = projects.find((savedProject) => savedProject.name === name);
    if (!project) {
      throw new Error('This project could not be found in saved projects.');
    }

    const workspace = getWorkspace();
    const parsedDocument = new DOMParser().parseFromString(project.data, 'text/xml');
    if (
      parsedDocument.getElementsByTagName('parsererror').length > 0 ||
      !parsedDocument.documentElement ||
      parsedDocument.documentElement.localName !== 'xml'
    ) {
      throw new Error('This project contains invalid Blockly data and could not be loaded.');
    }

    const xml = Blockly.utils.xml.textToDom(project.data);
    if (!xml || xml.nodeName.toLowerCase() !== 'xml') {
      throw new Error('This project contains invalid Blockly data and could not be loaded.');
    }

    const previousXml = Blockly.Xml.workspaceToDom(workspace);
    try {
      workspace.clear();
      Blockly.Xml.domToWorkspace(xml, workspace);
    } catch (error) {
      try {
        workspace.clear();
        Blockly.Xml.domToWorkspace(previousXml, workspace);
      } catch (restoreError) {
        console.error('Project load failed and the previous workspace could not be restored.', {
          loadError: error,
          restoreError,
        });
        throw new Error('The project could not be loaded, and the previous workspace could not be restored.');
      }
      console.error('Project load failed; the previous workspace was restored.', error);
      throw new Error('This project could not be loaded. Your current workspace has been restored.');
    }

    if (window.CodeSpark.updateCodePreview) {
      window.CodeSpark.updateCodePreview();
    }
  }

  // ── Delete Project ──────────────────────────────────────────────
  function deleteProject(name) {
    const projects = getSavedProjects();
    saveProjects(projects.filter((project) => project.name !== name));
  }

  // ── Modal Controls ──────────────────────────────────────────────
  saveBtn.addEventListener('click', () => {
    try {
      if (requireLogin('save')) return;
    } catch (error) {
      setStatus(saveStatus, error.message, 'error');
      return;
    }
    setStatus(saveStatus, '', '');
    saveModal.classList.add('active');
    projectNameInput.focus();
    projectNameInput.select();
  });

  loadBtn.addEventListener('click', () => {
    try {
      if (requireLogin('load')) return;
    } catch (error) {
      loadModal.classList.add('active');
      setStatus(loadStatus, error.message, 'error');
      return;
    }
    setStatus(loadStatus, '', '');
    try {
      renderProjectsList();
      loadModal.classList.add('active');
    } catch (error) {
      loadModal.classList.add('active');
      setStatus(loadStatus, error.message, 'error');
    }
  });

  confirmSaveBtn.addEventListener('click', () => {
    const name = projectNameInput.value.trim();
    if (!name) {
      projectNameInput.style.borderColor = 'var(--color-danger)';
      setStatus(saveStatus, 'Enter a project name before saving.', 'error');
      return;
    }

    try {
      saveProject(name);
    } catch (error) {
      setStatus(saveStatus, `Could not save the project: ${error.message}`, 'error');
      return;
    }

    saveModal.classList.remove('active');
    projectNameInput.style.borderColor = '';
    setStatus(saveStatus, '', '');

    saveBtn.innerHTML = '<i class="bi bi-check"></i> Saved!';
    setTimeout(() => {
      saveBtn.innerHTML = '<i class="bi bi-floppy"></i> Save';
    }, 2000);
  });

  cancelSaveBtn.addEventListener('click', () => {
    saveModal.classList.remove('active');
  });

  cancelLoadBtn.addEventListener('click', () => {
    loadModal.classList.remove('active');
  });

  // Close modals on overlay click
  [saveModal, loadModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // Enter key to save
  projectNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      confirmSaveBtn.click();
    }
  });

  // ── Render Projects List ────────────────────────────────────────
  function renderProjectsList() {
    const projects = getSavedProjects();
    savedProjectsList.replaceChildren();

    if (projects.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'project-empty-state';
      const icon = document.createElement('i');
      icon.className = 'bi bi-folder2';
      icon.setAttribute('aria-hidden', 'true');
      const title = document.createElement('strong');
      title.textContent = 'No projects saved yet';
      const description = document.createElement('span');
      description.textContent = 'Save your current work and it will be ready to open here.';
      emptyState.append(icon, title, description);
      savedProjectsList.appendChild(emptyState);
      return;
    }

    projects.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach((project) => {
      const item = document.createElement('div');
      item.className = 'saved-project-item';

      const details = document.createElement('div');
      details.className = 'saved-project-details';
      const projectIcon = document.createElement('span');
      projectIcon.className = 'saved-project-icon';
      const icon = document.createElement('i');
      icon.className = 'bi bi-file-earmark-code';
      icon.setAttribute('aria-hidden', 'true');
      projectIcon.appendChild(icon);

      const copy = document.createElement('div');
      copy.className = 'saved-project-copy';
      const name = document.createElement('div');
      name.className = 'project-name';
      name.textContent = project.name;

      const date = document.createElement('div');
      date.className = 'project-date';
      date.textContent = formatDate(project.date);
      copy.append(name, date);
      details.append(projectIcon, copy);

      const actions = document.createElement('div');
      actions.className = 'saved-project-actions';

      const loadProjectBtn = document.createElement('button');
      loadProjectBtn.type = 'button';
      loadProjectBtn.className = 'btn btn-primary btn-sm load-project-btn';
      loadProjectBtn.innerHTML = '<i class="bi bi-folder2-open"></i> Load';
      loadProjectBtn.addEventListener('click', () => {
        try {
          loadProject(project.name);
          loadModal.classList.remove('active');
          setStatus(loadStatus, '', '');
          loadBtn.innerHTML = '<i class="bi bi-check"></i> Loaded!';
          setTimeout(() => {
            loadBtn.innerHTML = '<i class="bi bi-folder2-open"></i> Load';
          }, 2000);
        } catch (error) {
          setStatus(loadStatus, `Could not load the project: ${error.message}`, 'error');
        }
      });

      const deleteProjectBtn = document.createElement('button');
      deleteProjectBtn.type = 'button';
      deleteProjectBtn.className = 'btn btn-sm delete-project-btn';
      deleteProjectBtn.title = 'Delete project';
      deleteProjectBtn.setAttribute('aria-label', `Delete project ${project.name}`);
      deleteProjectBtn.innerHTML = '<i class="bi bi-trash3"></i>';
      deleteProjectBtn.addEventListener('click', () => {
        if (!confirm(`Delete project "${project.name}"?`)) return;
        try {
          deleteProject(project.name);
          renderProjectsList();
          setStatus(loadStatus, '', '');
        } catch (error) {
          setStatus(loadStatus, `Could not delete the project: ${error.message}`, 'error');
        }
      });

      actions.append(loadProjectBtn, deleteProjectBtn);
      item.append(details, actions);
      savedProjectsList.appendChild(item);
    });
  }

  // ── Helper ──────────────────────────────────────────────────────
  function formatDate(isoString) {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return 'Date unavailable';
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // ── Keyboard shortcut: Ctrl+S to save ───────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveBtn.click();
    }
  });

  // ── Expose ──────────────────────────────────────────────────────
  window.Storage = {
    getSavedProjects,
    saveProject,
    loadProject,
    deleteProject,
  };

  try {
    const pendingAction = sessionStorage.getItem('codespark-editor-pending-action');
    if (pendingAction === 'save' || pendingAction === 'load') {
      sessionStorage.removeItem('codespark-editor-pending-action');
      if (getLoggedInUser()) {
        (pendingAction === 'save' ? saveBtn : loadBtn).click();
      }
    }
  } catch (error) {
    console.error('Unable to resume the requested editor action after login.', error);
  }
})();
