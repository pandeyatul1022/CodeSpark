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

  // ── Get Saved Projects ──────────────────────────────────────────
  function getSavedProjects() {
    return JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]');
  }

  function saveProjects(projects) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }

  // ── Save Project ────────────────────────────────────────────────
  function saveProject(name) {
    if (!window.CodeSpark || !window.CodeSpark.workspace) return;

    const workspace = window.CodeSpark.workspace;
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);

    const projects = getSavedProjects();
    const existingIndex = projects.findIndex((p) => p.name === name);

    const projectData = {
      name: name,
      data: xmlText,
      date: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      projects[existingIndex] = projectData;
    } else {
      projects.push(projectData);
    }

    saveProjects(projects);

    // Achievement
    if (window.Achievements) {
      window.Achievements.unlock('first_save');
    }
  }

  // ── Load Project ────────────────────────────────────────────────
  function loadProject(name) {
    if (!window.CodeSpark || !window.CodeSpark.workspace) return;

    const projects = getSavedProjects();
    const project = projects.find((p) => p.name === name);
    if (!project) return;

    const workspace = window.CodeSpark.workspace;
    workspace.clear();

    const xml = Blockly.Xml.textToDom(project.data);
    Blockly.Xml.domToWorkspace(xml, workspace);

    if (window.CodeSpark.updateCodePreview) {
      window.CodeSpark.updateCodePreview();
    }
  }

  // ── Delete Project ──────────────────────────────────────────────
  function deleteProject(name) {
    let projects = getSavedProjects();
    projects = projects.filter((p) => p.name !== name);
    saveProjects(projects);
  }

  // ── Modal Controls ──────────────────────────────────────────────
  saveBtn.addEventListener('click', () => {
    saveModal.classList.add('active');
    projectNameInput.focus();
    projectNameInput.select();
  });

  loadBtn.addEventListener('click', () => {
    renderProjectsList();
    loadModal.classList.add('active');
  });

  confirmSaveBtn.addEventListener('click', () => {
    const name = projectNameInput.value.trim();
    if (!name) {
      projectNameInput.style.borderColor = 'var(--color-danger)';
      return;
    }
    saveProject(name);
    saveModal.classList.remove('active');
    projectNameInput.style.borderColor = '';

    // Show a brief confirmation
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

    if (projects.length === 0) {
      savedProjectsList.innerHTML = `
        <p style="color: var(--text-muted); text-align: center; padding: var(--space-xl);">
          No saved projects yet. Create something in the editor and save it!
        </p>
      `;
      return;
    }

    savedProjectsList.innerHTML = projects
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(
        (p) => `
        <div class="saved-project-item" data-name="${p.name}">
          <div>
            <div class="project-name"><i class="bi bi-folder" style="color: var(--color-primary);"></i> ${p.name}</div>
            <div class="project-date">${formatDate(p.date)}</div>
          </div>
          <div style="display: flex; gap: var(--space-xs);">
            <button class="btn btn-primary btn-sm load-project-btn" data-name="${p.name}" style="padding: 0.3rem 0.7rem; font-size: 0.75rem;">
              <i class="bi bi-folder2-open"></i> Load
            </button>
            <button class="btn btn-sm delete-project-btn" data-name="${p.name}" style="padding: 0.3rem 0.7rem; font-size: 0.75rem; background: var(--color-danger); color: white;" title="Delete project">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      `
      )
      .join('');

    // Add event listeners
    savedProjectsList.querySelectorAll('.load-project-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        loadProject(btn.dataset.name);
        loadModal.classList.remove('active');

        // Brief confirmation
        loadBtn.innerHTML = '<i class="bi bi-check"></i> Loaded!';
        setTimeout(() => {
          loadBtn.innerHTML = '<i class="bi bi-folder2-open"></i> Load';
        }, 2000);
      });
    });

    savedProjectsList.querySelectorAll('.delete-project-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Delete project "${btn.dataset.name}"?`)) {
          deleteProject(btn.dataset.name);
          renderProjectsList();
        }
      });
    });
  }

  // ── Helper ──────────────────────────────────────────────────────
  function formatDate(isoString) {
    const date = new Date(isoString);
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
})();
