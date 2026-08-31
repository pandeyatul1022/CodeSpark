/* =========================================================
   CodeSpark - Main JavaScript
   ES6+
   ========================================================= */

"use strict";


const getPageName = path => {

    const pageName =
        path
            .split("/")
            .filter(Boolean)
            .pop();

    return pageName || "index.html";

};


const setActiveNavLink = navLinks => {

    const currentPage =
        getPageName(window.location.pathname);

    navLinks.forEach(link => {

        const linkPage =
            getPageName(new URL(link.href).pathname);

        const isActive =
            linkPage === currentPage;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
            return;
        }

        link.removeAttribute("aria-current");

    });

};


const closeMobileNavbar = navbarCollapse => {

    if (
        !navbarCollapse?.classList.contains("show") ||
        typeof bootstrap === "undefined"
    ) {
        return;
    }

    const collapse =
        bootstrap.Collapse.getInstance(navbarCollapse) ||
        new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });

    collapse.hide();

};


const getSavedTheme = () => {

    try {
        return localStorage.getItem("codeSparkTheme");
    } catch (error) {
        return null;
    }

};


const saveTheme = theme => {

    try {
        localStorage.setItem("codeSparkTheme", theme);
    } catch (error) {
        /* Theme still works for the current page if storage is unavailable. */
    }

};


const updateThemeToggleButtons = theme => {

    const isDark =
        theme === "dark";

    document
        .querySelectorAll(".theme-toggle")
        .forEach(button => {

            const icon =
                button.querySelector("i");

            button.setAttribute("aria-pressed", String(isDark));
            button.setAttribute(
                "aria-label",
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            icon?.classList.toggle("bi-sun", isDark);
            icon?.classList.toggle("bi-moon-stars", !isDark);

        });

};


const applyTheme = theme => {

    document.documentElement.dataset.theme =
        theme;

    updateThemeToggleButtons(theme);

};


const initThemeToggle = () => {

    const savedTheme =
        getSavedTheme();

    const initialTheme =
        savedTheme === "dark"
            ? "dark"
            : "light";

    applyTheme(initialTheme);

    document
        .querySelectorAll(".theme-toggle")
        .forEach(button => {

            button.addEventListener("click", () => {

                const nextTheme =
                    document.documentElement.dataset.theme === "dark"
                        ? "light"
                        : "dark";

                applyTheme(nextTheme);
                saveTheme(nextTheme);

            });

        });

};


const initNavbar = () => {

    const navbar =
        document.querySelector(".site-navbar");

    const navLinks =
        document.querySelectorAll(".navbar-nav .nav-link");

    const navbarCollapse =
        document.querySelector("#navbarSupportedContent");

    if (!navbar) {
        return;
    }

    setActiveNavLink(navLinks);

    navLinks.forEach(link => {
        link.addEventListener("click", () => closeMobileNavbar(navbarCollapse));
    });

    document.addEventListener("click", event => {
        if (
            navbarCollapse?.classList.contains("show") &&
            !navbar.contains(event.target)
        ) {
            closeMobileNavbar(navbarCollapse);
        }
    });

    const updateNavbarState = () => {
        navbar.classList.toggle("is-scrolled", window.scrollY > 10);
    };

    updateNavbarState();

    window.addEventListener("scroll", updateNavbarState, {
        passive: true
    });

};


const initLoginButtonNotice = () => {

    const loginButton =
        document.querySelector(".site-login-link");

    if (!loginButton) {
        return;
    }

    loginButton.addEventListener("click", event => {

        const loginUrl =
            loginButton.getAttribute("href");

        if (loginUrl && loginUrl !== "#") {
            return;
        }

        event.preventDefault();

        if (typeof Swal === "undefined") {
            return;
        }

        Swal.fire({
            title: "Login",
            text: "Login functionality will be available soon.",
            icon: "info",
            confirmButtonText: "Okay",
            confirmButtonColor: "#4f46e5"
        });

    });

};


const initScratchBlockLab = () => {

    const paletteBlocks = document.querySelectorAll(".palette-block");
    const dropZone = document.querySelector("#scratch-drop-zone");
    const runBlocksBtn = document.querySelector("#run-blocks-btn");
    const runWebCodeBtn = document.querySelector("#run-web-code-btn");
    const resetBlocksBtn = document.querySelector("#reset-blocks-btn");
    const canvasOutput = document.querySelector("#scratch-canvas-output");

    const htmlEditor = document.querySelector("#code-editor-html");
    const cssEditor = document.querySelector("#code-editor-css");
    const jsEditor = document.querySelector("#code-editor-js");

    const tabBtns = document.querySelectorAll(".file-tab-btn");
    const editorPanels = document.querySelectorAll(".editor-tab-panel");

    if (!dropZone || !canvasOutput) {
        return;
    }

    let draggedBlockType = null;

    const blockDefinitions = {
        heading: {
            title: "Create Heading",
            colorClass: "block-purple",
            icon: "bi-type-h1",
            html: '<h2 class="demo-output-title">Hello, CodeSpark! 🚀</h2>',
            css: '/* Heading Style */\n.demo-output-title {\n  color: #7c3aed;\n  font-weight: 800;\n  font-size: 24px;\n  margin-bottom: 8px;\n}',
            js: 'console.log("Heading Block Loaded!");'
        },
        button: {
            title: "Add Action Button",
            colorClass: "block-blue",
            icon: "bi-lightning-fill",
            html: '<button class="demo-output-btn" onclick="alert(\'Spark Magic Clicked! ✨\')">Spark Magic ✨</button>',
            css: '/* Button Style */\n.demo-output-btn {\n  background: linear-gradient(135deg, #7c3aed, #ec4899);\n  color: #ffffff;\n  border: none;\n  padding: 10px 22px;\n  border-radius: 25px;\n  font-weight: bold;\n  cursor: pointer;\n  box-shadow: 0 4px 12px rgba(124,58,237,0.3);\n}',
            js: 'console.log("Button Block Ready!");'
        },
        text: {
            title: "Add Description Text",
            colorClass: "block-teal",
            icon: "bi-card-text",
            html: '<p class="demo-output-text">Building cool projects with visual Scratch blocks!</p>',
            css: '/* Description Text */\n.demo-output-text {\n  color: #4f46e5;\n  font-size: 15px;\n  margin-top: 8px;\n  margin-bottom: 12px;\n}',
            js: ''
        },
        badge: {
            title: "Add Certification Badge",
            colorClass: "block-pink",
            icon: "bi-award-fill",
            html: '<div class="demo-preset-badge-pill"><span>⭐ Grade 5-10 Certified</span></div>',
            css: '/* Certification Badge */\n.demo-preset-badge-pill {\n  display: inline-flex;\n  background: rgba(16,185,129,0.12);\n  color: #10b981;\n  border: 1px solid #10b981;\n  padding: 6px 16px;\n  border-radius: 20px;\n  font-weight: bold;\n  font-size: 13px;\n}',
            js: ''
        }
    };

    const updateGeneratedCode = () => {
        const droppedItems = dropZone.querySelectorAll(".dropped-block-item");

        if (!droppedItems.length) {
            if (htmlEditor) htmlEditor.value = "<!-- Drag blocks above or type HTML here -->\n<div class=\"demo-output-wrap\">\n  <p>No blocks added yet.</p>\n</div>";
            if (cssEditor) cssEditor.value = "/* Generated CSS will appear here */";
            if (jsEditor) jsEditor.value = "// Generated JS will appear here";
            return;
        }

        let htmlParts = [];
        let cssParts = [];
        let jsParts = [];

        droppedItems.forEach(item => {
            const type = item.dataset.blockType;
            const def = blockDefinitions[type];
            if (def) {
                if (def.html) htmlParts.push(def.html);
                if (def.css) cssParts.push(def.css);
                if (def.js) jsParts.push(def.js);
            }
        });

        const fullHtml = `<div class="demo-output-wrap">\n  ${htmlParts.join("\n  ")}\n</div>`;
        const fullCss = cssParts.join("\n\n");
        const fullJs = jsParts.filter(Boolean).join("\n\n");

        if (htmlEditor) htmlEditor.value = fullHtml;
        if (cssEditor) cssEditor.value = fullCss;
        if (jsEditor) jsEditor.value = fullJs;
    };

    const renderOutputCanvas = () => {
        const html = htmlEditor?.value || "";
        const css = cssEditor?.value || "";
        const js = jsEditor?.value || "";

        canvasOutput.innerHTML = `
            <style>
              .demo-output-wrap { text-align: center; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
              ${css}
            </style>
            ${html}
        `;

        if (js) {
            try {
                const scriptEl = document.createElement("script");
                scriptEl.textContent = js;
                canvasOutput.appendChild(scriptEl);
            } catch (err) {
                console.error("Script execution error:", err);
            }
        }
    };

    const addBlockToZone = (type) => {
        const def = blockDefinitions[type];
        if (!def) return;

        const emptyNotice = dropZone.querySelector(".drop-empty-notice");
        if (emptyNotice) {
            emptyNotice.remove();
        }

        const blockEl = document.createElement("div");
        blockEl.className = `scratch-block ${def.colorClass} dropped-block-item`;
        blockEl.dataset.blockType = type;
        blockEl.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <i class="bi ${def.icon}" aria-hidden="true"></i>
                <span>${def.title}</span>
            </div>
            <button type="button" class="remove-block-btn" aria-label="Remove block">&times;</button>
        `;

        blockEl.querySelector(".remove-block-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            blockEl.remove();
            if (!dropZone.querySelectorAll(".dropped-block-item").length) {
                dropZone.innerHTML = `
                    <div class="drop-empty-notice text-center text-muted py-4">
                        <i class="bi bi-cloud-arrow-down fs-2 d-block mb-2 text-primary opacity-50" aria-hidden="true"></i>
                        <p class="small mb-0">Drag puzzle blocks here to build your code!</p>
                    </div>`;
            }
            updateGeneratedCode();
            renderOutputCanvas();
        });

        dropZone.appendChild(blockEl);
        updateGeneratedCode();
        renderOutputCanvas();
    };

    // Palette Drag & Drop Setup (Fail-Proof Target Detection)
    paletteBlocks.forEach(block => {
        block.setAttribute("draggable", "true");

        block.addEventListener("dragstart", (e) => {
            const parentBlock = e.target.closest("[data-block-type]") || block;
            draggedBlockType = parentBlock.getAttribute("data-block-type");

            if (e.dataTransfer) {
                try {
                    e.dataTransfer.setData("text/plain", draggedBlockType);
                    e.dataTransfer.setData("text", draggedBlockType);
                    e.dataTransfer.effectAllowed = "copy";
                } catch (err) {
                    console.log("dataTransfer fallback active");
                }
            }
            block.classList.add("opacity-50");
        });

        block.addEventListener("dragend", () => {
            block.classList.remove("opacity-50");
            dropZone.classList.remove("drag-over");
        });

        block.addEventListener("click", (e) => {
            e.preventDefault();
            const parentBlock = e.target.closest("[data-block-type]") || block;
            const type = parentBlock.getAttribute("data-block-type");
            addBlockToZone(type);
        });
    });

    ["dragover", "dragenter"].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = "copy";
            }
            dropZone.classList.add("drag-over");
        });
    });

    dropZone.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dropZone.classList.remove("drag-over");
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove("drag-over");

        let type = null;
        if (e.dataTransfer) {
            try {
                type = e.dataTransfer.getData("text/plain") || e.dataTransfer.getData("text");
            } catch (err) {
                type = null;
            }
        }
        if (!type) {
            type = draggedBlockType;
        }

        if (type) {
            addBlockToZone(type);
            draggedBlockType = null;
        }
    });

    // Run Buttons
    if (runBlocksBtn) {
        runBlocksBtn.addEventListener("click", () => {
            updateGeneratedCode();
            renderOutputCanvas();
        });
    }

    if (runWebCodeBtn) {
        runWebCodeBtn.addEventListener("click", () => {
            renderOutputCanvas();
        });
    }

    if (resetBlocksBtn) {
        resetBlocksBtn.addEventListener("click", () => {
            dropZone.innerHTML = `
                <div class="drop-empty-notice text-center text-muted py-4">
                    <i class="bi bi-cloud-arrow-down fs-2 d-block mb-2 text-primary opacity-50" aria-hidden="true"></i>
                    <p class="small mb-0">Drag puzzle blocks here to build your code!</p>
                </div>`;
            updateGeneratedCode();
            renderOutputCanvas();
        });
    }

    // Explicit Robust Tab Switcher Logic
    const switchTab = (activeBtn, targetPanelId) => {
        tabBtns.forEach(btn => btn.classList.remove("active"));
        activeBtn.classList.add("active");

        editorPanels.forEach(panel => {
            if (panel.id === targetPanelId) {
                panel.classList.remove("d-none");
                panel.style.display = "block";
            } else {
                panel.classList.add("d-none");
                panel.style.display = "none";
            }
        });
    };

    tabBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.dataset.tabTarget || this.getAttribute("data-tab-target");
            if (targetId) {
                switchTab(this, targetId);
            }
        });
    });

    // Ensure Initial Active Tab
    const defaultTabBtn = document.querySelector("#tab-btn-html");
    if (defaultTabBtn) {
        switchTab(defaultTabBtn, "panel-html");
    }

    // Default starter blocks
    addBlockToZone("heading");
    addBlockToZone("button");

};


const initHomeQuickQuizTeaser = () => {

    const quizOptions = document.querySelectorAll(".quiz-teaser-option");

    if (!quizOptions.length) {
        return;
    }

    quizOptions.forEach(btn => {

        btn.addEventListener("click", () => {

            const isCorrect = btn.dataset.correct === "true";

            quizOptions.forEach(opt => {
                opt.classList.remove("correct-choice", "wrong-choice");
            });

            if (isCorrect) {
                btn.classList.add("correct-choice");
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "Bingo! 🎯",
                        text: "Great job! <h1> is indeed the HTML tag for main page headings.",
                        icon: "success",
                        confirmButtonText: "Awesome!",
                        confirmButtonColor: "#10b981"
                    });
                }
            } else {
                btn.classList.add("wrong-choice");
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "Oops! 💡",
                        text: "Not quite right. Try again! (Hint: Think of Heading 1)",
                        icon: "info",
                        confirmButtonText: "Try Again",
                        confirmButtonColor: "#4f46e5"
                    });
                }
            }

        });

    });

};

const initAuthLoginPage = () => {

    const loginForm = document.querySelector("#loginForm");
    const togglePasswordBtn = document.querySelector("#togglePasswordBtn");
    const passwordInput = document.querySelector("#loginPassword");
    const togglePasswordIcon = document.querySelector("#togglePasswordIcon");
    const googleBtn = document.querySelector("#btn-google-login");
    const appleBtn = document.querySelector("#btn-apple-login");
    const forgotPasswordLink = document.querySelector("#forgotPasswordLink");

    if (!loginForm) {
        return;
    }

    // Password Toggle
    if (togglePasswordBtn && passwordInput && togglePasswordIcon) {
        togglePasswordBtn.addEventListener("click", () => {
            const isPassword = passwordInput.getAttribute("type") === "password";
            passwordInput.setAttribute("type", isPassword ? "text" : "password");
            togglePasswordIcon.classList.toggle("bi-eye-slash-fill", !isPassword);
            togglePasswordIcon.classList.toggle("bi-eye-fill", isPassword);
        });
    }

    // Google Login Handler (Modal-based OAuth system)
    if (googleBtn) {
        googleBtn.addEventListener("click", () => {
            const googleModalEl = document.querySelector("#googleAuthModal");
            if (googleModalEl && typeof bootstrap !== "undefined") {
                const googleModal = bootstrap.Modal.getInstance(googleModalEl) || new bootstrap.Modal(googleModalEl);
                googleModal.show();
            } else if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Google Sign-In",
                    text: "Authenticating with your Google account...",
                    icon: "info",
                    showConfirmButton: false,
                    timer: 1800
                });
            }
        });
    }

    // Google Account Selection Click
    document.querySelectorAll(".google-account-item").forEach(item => {
        item.addEventListener("click", function () {
            const isCustom = this.id === "btn-google-custom-account";
            const accountName = this.dataset.accountName || "Google User";
            const accountEmail = this.dataset.accountEmail || "";
            const googleModalEl = document.querySelector("#googleAuthModal");

            if (googleModalEl && typeof bootstrap !== "undefined") {
                const googleModal = bootstrap.Modal.getInstance(googleModalEl);
                googleModal?.hide();
            }

            if (isCustom) {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "Sign in with Google",
                        text: "Enter your Google email address:",
                        input: "email",
                        inputPlaceholder: "yourname@gmail.com",
                        showCancelButton: true,
                        confirmButtonText: "Sign In",
                        confirmButtonColor: "#4285F4",
                        inputValidator: (value) => {
                            if (!value) return "Please enter a valid Google email address!";
                        }
                    }).then((result) => {
                        if (result.isConfirmed && result.value) {
                            Swal.fire({
                                title: "Welcome! 👋",
                                text: `Successfully signed in via Google (${result.value}).`,
                                icon: "success",
                                confirmButtonText: "Go to Dashboard",
                                confirmButtonColor: "#4f46e5"
                            });
                        }
                    });
                }
            } else {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: `Welcome, ${accountName}! 👋`,
                        text: accountEmail ? `Successfully signed in via Google (${accountEmail}).` : "Successfully signed in via Google.",
                        icon: "success",
                        confirmButtonText: "Go to Dashboard",
                        confirmButtonColor: "#4f46e5"
                    });
                }
            }
        });
    });

    // Apple Login Handler (Modal-based OAuth system)
    if (appleBtn) {
        appleBtn.addEventListener("click", () => {
            const appleModalEl = document.querySelector("#appleAuthModal");
            if (appleModalEl && typeof bootstrap !== "undefined") {
                const appleModal = bootstrap.Modal.getInstance(appleModalEl) || new bootstrap.Modal(appleModalEl);
                appleModal.show();
            } else if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Apple Sign-In",
                    text: "Authenticating with Apple ID...",
                    icon: "info",
                    showConfirmButton: false,
                    timer: 1800
                });
            }
        });
    }

    // Apple Form Submit
    const appleForm = document.querySelector("#appleAuthForm");
    if (appleForm) {
        appleForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const appleEmail = document.querySelector("#appleEmailInput")?.value || "Apple ID";
            const appleModalEl = document.querySelector("#appleAuthModal");

            if (appleModalEl && typeof bootstrap !== "undefined") {
                const appleModal = bootstrap.Modal.getInstance(appleModalEl);
                appleModal?.hide();
            }

            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Welcome! ",
                    text: `Signed in successfully via Apple ID (${appleEmail}).`,
                    icon: "success",
                    confirmButtonText: "Go to Dashboard",
                    confirmButtonColor: "#4f46e5"
                });
            }
        });
    }

    // Forgot Password Handler
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", (e) => {
            e.preventDefault();
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Reset Password",
                    text: "Enter your registered email address to receive password reset instructions:",
                    input: "email",
                    inputPlaceholder: "name@example.com",
                    showCancelButton: true,
                    confirmButtonText: "Send Reset Link",
                    confirmButtonColor: "#4f46e5",
                    cancelButtonText: "Cancel",
                    inputValidator: (value) => {
                        if (!value) {
                            return "Please enter your email address!";
                        }
                    }
                }).then((result) => {
                    if (result.isConfirmed && result.value) {
                        Swal.fire({
                            title: "Reset Link Sent! 📩",
                            text: `We have sent password recovery instructions to ${result.value}.`,
                            icon: "success",
                            confirmButtonColor: "#4f46e5"
                        });
                    }
                });
            }
        });
    }

    // Form Submit Handler
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const usernameInput = document.querySelector("#loginUsername");
        let isValid = true;

        if (!usernameInput.value.trim()) {
            usernameInput.classList.add("is-invalid");
            isValid = false;
        } else {
            usernameInput.classList.remove("is-invalid");
        }

        if (!passwordInput.value.trim()) {
            passwordInput.classList.add("is-invalid");
            isValid = false;
        } else {
            passwordInput.classList.remove("is-invalid");
        }

        if (!isValid) {
            return;
        }

        const submitBtn = document.querySelector("#loginSubmitBtn");
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing in...`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;

            sessionStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", usernameInput.value.trim());

            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Welcome Back! 🚀",
                    text: `Signed in successfully as ${usernameInput.value.trim()}`,
                    icon: "success",
                    confirmButtonText: "Start Quiz / Continue Learning",
                    confirmButtonColor: "#4f46e5"
                }).then(() => {
                    window.location.href = "quiz.html";
                });
            } else {
                window.location.href = "quiz.html";
            }
        }, 1200);
    });

};

const initAuthRegisterPage = () => {

    const registerForm = document.querySelector("#registerForm");
    const toggleRegPasswordBtn = document.querySelector("#toggleRegPasswordBtn");
    const regPasswordInput = document.querySelector("#regPassword");
    const toggleRegPasswordIcon = document.querySelector("#toggleRegPasswordIcon");

    const toggleRegConfirmBtn = document.querySelector("#toggleRegConfirmBtn");
    const regConfirmPasswordInput = document.querySelector("#regConfirmPassword");
    const toggleRegConfirmIcon = document.querySelector("#toggleRegConfirmIcon");

    const googleBtn = document.querySelector("#btn-google-register");
    const appleBtn = document.querySelector("#btn-apple-register");
    const termsLink = document.querySelector("#termsLink");
    const privacyLink = document.querySelector("#privacyLink");

    if (!registerForm) {
        return;
    }

    // Password Toggle (Main Password)
    if (toggleRegPasswordBtn && regPasswordInput && toggleRegPasswordIcon) {
        toggleRegPasswordBtn.addEventListener("click", () => {
            const isPassword = regPasswordInput.getAttribute("type") === "password";
            regPasswordInput.setAttribute("type", isPassword ? "text" : "password");
            toggleRegPasswordIcon.classList.toggle("bi-eye-slash-fill", !isPassword);
            toggleRegPasswordIcon.classList.toggle("bi-eye-fill", isPassword);
        });
    }

    // Password Toggle (Confirm Password)
    if (toggleRegConfirmBtn && regConfirmPasswordInput && toggleRegConfirmIcon) {
        toggleRegConfirmBtn.addEventListener("click", () => {
            const isPassword = regConfirmPasswordInput.getAttribute("type") === "password";
            regConfirmPasswordInput.setAttribute("type", isPassword ? "text" : "password");
            toggleRegConfirmIcon.classList.toggle("bi-eye-slash-fill", !isPassword);
            toggleRegConfirmIcon.classList.toggle("bi-eye-fill", isPassword);
        });
    }

    // Google Sign-Up Handler
    if (googleBtn) {
        googleBtn.addEventListener("click", () => {
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Google Sign-Up",
                    text: "Creating your CodeSpark account with Google...",
                    icon: "info",
                    showConfirmButton: false,
                    timer: 1800,
                    timerProgressBar: true
                }).then(() => {
                    Swal.fire({
                        title: "Account Created! 🎉",
                        text: "Welcome to CodeSpark! Your account has been set up via Google.",
                        icon: "success",
                        confirmButtonText: "Explore Courses",
                        confirmButtonColor: "#4f46e5"
                    });
                });
            }
        });
    }

    // Apple Sign-Up Handler
    if (appleBtn) {
        appleBtn.addEventListener("click", () => {
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Apple Sign-Up",
                    text: "Creating your CodeSpark account with Apple ID...",
                    icon: "info",
                    showConfirmButton: false,
                    timer: 1800,
                    timerProgressBar: true
                }).then(() => {
                    Swal.fire({
                        title: "Account Created! 🎉",
                        text: "Welcome to CodeSpark! Your account has been set up via Apple ID.",
                        icon: "success",
                        confirmButtonText: "Explore Courses",
                        confirmButtonColor: "#4f46e5"
                    });
                });
            }
        });
    }

    // Terms & Privacy Modals
    if (termsLink) {
        termsLink.addEventListener("click", (e) => {
            e.preventDefault();
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Terms of Service",
                    text: "By registering for CodeSpark, you agree to follow learning guidelines, respect community standards, and practice coding safely.",
                    icon: "info",
                    confirmButtonText: "I Understand",
                    confirmButtonColor: "#4f46e5"
                });
            }
        });
    }

    if (privacyLink) {
        privacyLink.addEventListener("click", (e) => {
            e.preventDefault();
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Privacy Policy",
                    text: "We value your privacy. Your personal information is encrypted and will never be shared with third parties.",
                    icon: "info",
                    confirmButtonText: "Got it",
                    confirmButtonColor: "#4f46e5"
                });
            }
        });
    }

    // Registration Form Validation & Submit
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.querySelector("#regFullName");
        const emailInput = document.querySelector("#regEmail");
        const termsCheckbox = document.querySelector("#agreeTerms");
        const confirmFeedback = document.querySelector("#confirmPasswordFeedback");

        let isValid = true;

        if (!nameInput.value.trim()) {
            nameInput.classList.add("is-invalid");
            isValid = false;
        } else {
            nameInput.classList.remove("is-invalid");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add("is-invalid");
            isValid = false;
        } else {
            emailInput.classList.remove("is-invalid");
        }

        if (regPasswordInput.value.length < 6) {
            regPasswordInput.classList.add("is-invalid");
            isValid = false;
        } else {
            regPasswordInput.classList.remove("is-invalid");
        }

        if (regPasswordInput.value !== regConfirmPasswordInput.value || !regConfirmPasswordInput.value) {
            regConfirmPasswordInput.classList.add("is-invalid");
            if (confirmFeedback) confirmFeedback.textContent = "Passwords do not match.";
            isValid = false;
        } else {
            regConfirmPasswordInput.classList.remove("is-invalid");
        }

        if (!termsCheckbox.checked) {
            termsCheckbox.classList.add("is-invalid");
            isValid = false;
        } else {
            termsCheckbox.classList.remove("is-invalid");
        }

        if (!isValid) {
            return;
        }

        const submitBtn = document.querySelector("#registerSubmitBtn");
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating Account...`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;

            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Welcome to CodeSpark! 🎉",
                    text: `Account created successfully for ${nameInput.value.trim()}!`,
                    icon: "success",
                    confirmButtonText: "Sign In Now",
                    confirmButtonColor: "#4f46e5"
                }).then(() => {
                    window.location.href = "login.html";
                });
            }
        }, 1300);
    });

};

// =============================================
// Contact Page
// =============================================
const initContactPage = () => {
    const contactForm = document.querySelector("#contactForm");
    if (!contactForm) return;

    const nameInput = document.querySelector("#contactName");
    const emailInput = document.querySelector("#contactEmail");
    const subjectSelect = document.querySelector("#contactSubject");
    const messageInput = document.querySelector("#contactMessage");
    const submitBtn = document.querySelector("#contactSubmitBtn");
    const charCounter = document.querySelector("#charCounter");

    // Live character counter
    if (messageInput && charCounter) {
        messageInput.addEventListener("input", () => {
            const len = messageInput.value.length;
            charCounter.textContent = `${len} / 1000`;
            charCounter.style.color = len > 900 ? "#ef4444" : len > 700 ? "#f59e0b" : "";
        });
    }

    // Form submit handler
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Basic validation
        let isValid = true;
        [nameInput, emailInput, subjectSelect, messageInput].forEach(field => {
            if (!field.value.trim() || (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value))) {
                field.classList.add("is-invalid");
                isValid = false;
            } else {
                field.classList.remove("is-invalid");
                field.classList.add("is-valid");
            }
        });

        if (!isValid) return;

        // Loading spinner
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;

            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Message Sent! 🎉",
                    text: `Thank you, ${nameInput.value.trim()}! We'll get back to you within 24 hours.`,
                    icon: "success",
                    confirmButtonText: "Great!",
                    confirmButtonColor: "#4f46e5"
                });
            }

            contactForm.reset();
            [nameInput, emailInput, subjectSelect, messageInput].forEach(f => f.classList.remove("is-valid"));
        }, 1500);
    });

    // Live Chat button
    const liveChatBtn = document.querySelector("#btn-live-chat");
    if (liveChatBtn) {
        liveChatBtn.addEventListener("click", () => {
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: '<i class="bi bi-chat-dots-fill text-primary"></i> CodeSpark Assistant',
                    html: `<div class="text-start">
                        <div class="p-3 rounded-3 mb-2" style="background: var(--surface-bg, #f5f5ff);">
                            <p class="small mb-1 fw-semibold text-primary">CodeSpark Bot</p>
                            <p class="small mb-0">Hi there! 👋 I'm the CodeSpark AI Assistant. How can I help you today?</p>
                        </div>
                        <div class="text-muted small text-center mt-3">
                            <i class="bi bi-info-circle me-1"></i>
                            Live chat coming soon! For now, use the contact form.
                        </div>
                    </div>`,
                    showConfirmButton: true,
                    confirmButtonText: "Close",
                    confirmButtonColor: "#4f46e5",
                    customClass: { popup: 'text-start' }
                });
            }
        });
    }
};


// Courses Page Interactive Filtering & Search
const initCoursesPage = () => {
    const filterBtns = document.querySelectorAll(".course-filter-btn");
    const searchInput = document.querySelector("#courseSearchInput");
    const courseItems = document.querySelectorAll(".course-item");

    if (!courseItems.length) return;

    let activeFilter = "all";
    let searchQuery = "";

    const filterCourses = () => {
        courseItems.forEach(item => {
            const categories = item.getAttribute("data-category") || "";
            const title = item.querySelector("h4")?.textContent.toLowerCase() || "";
            const desc = item.querySelector("p")?.textContent.toLowerCase() || "";

            const matchesCategory = activeFilter === "all" || categories.includes(activeFilter);
            const matchesSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    };

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.getAttribute("data-filter") || "all";
            filterCourses();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterCourses();
        });
    }
};


// ==========================================================================
// Quiz & Certification System Engine
// ==========================================================================
const initQuizPage = () => {
    const quizStartScreen = document.querySelector("#quizStartScreen");
    const quizEngineScreen = document.querySelector("#quizEngineScreen");
    const quizResultScreen = document.querySelector("#quizResultScreen");
    const quizAuthBanner = document.querySelector("#quizAuthBanner");

    if (!quizStartScreen || !quizEngineScreen) return;

    // Check login status
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true" || localStorage.getItem("currentUser") !== null;
    const currentUserEmail = localStorage.getItem("currentUser") || "Student";
    const studentDisplayName = currentUserEmail.split("@")[0].replace(/[^a-zA-Z]/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "Atul Pandey";

    if (quizAuthBanner) {
        if (isLoggedIn) {
            quizAuthBanner.className = "alert alert-success border-0 rounded-4 shadow-sm d-inline-flex align-items-center gap-2 mb-0 px-4 py-2 text-start";
            quizAuthBanner.innerHTML = `<i class="bi bi-person-check-fill text-success fs-5"></i>
                <div>
                    <strong class="d-block">Logged in as ${studentDisplayName}</strong>
                    <span class="small">You are eligible to take the 100-Mark Certification Quiz.</span>
                </div>`;
        }
    }

    // Question Datasets per Course Track (10 Qs x 10 Marks = 100 Marks)
    const quizDatabase = {
        html_css: {
            title: "HTML5 & CSS3 Web Development",
            questions: [
                {
                    type: "mcq",
                    question: "Which HTML5 element is used to specify the main header for a document or section?",
                    options: ["<header>", "<head>", "<top>", "<nav>"],
                    correct: 0
                },
                {
                    type: "true_false",
                    question: "True or False: In HTML5, the <p> element is a block-level element.",
                    correct: "true"
                },
                {
                    type: "fill_blank",
                    question: "Fill in the missing HTML attribute to make an image accessible:",
                    code: '<img src="logo.png" ____="Company Logo">',
                    correct: "alt"
                },
                {
                    type: "code_writing",
                    question: "Write the CSS property declaration to set the text color of an element to blue:",
                    hint: "e.g. color: blue;",
                    correct: "color: blue;"
                },
                {
                    type: "mcq",
                    question: "Which CSS Flexbox property aligns flex items along the main axis?",
                    options: ["align-items", "justify-content", "flex-direction", "align-content"],
                    correct: 1
                },
                {
                    type: "true_false",
                    question: "True or False: CSS Grid layout system is designed for two-dimensional (rows & columns) layouts.",
                    correct: "true"
                },
                {
                    type: "fill_blank",
                    question: "Fill in the missing tag name for an unordered bulleted list:",
                    code: "<____>\n  <li>Item 1</li>\n</____>",
                    correct: "ul"
                },
                {
                    type: "code_writing",
                    question: "Write the CSS declaration to completely hide an element from the document layout:",
                    hint: "e.g. display: none;",
                    correct: "display: none;"
                },
                {
                    type: "mcq",
                    question: "Which attribute is used to open a hyperlink in a new browser tab?",
                    options: ['target="_blank"', 'target="_new"', 'rel="newtab"', 'href="_blank"'],
                    correct: 0
                },
                {
                    type: "true_false",
                    question: "True or False: In CSS, 'margin: 0 auto;' centers a fixed-width block element horizontally.",
                    correct: "true"
                }
            ]
        },
        javascript: {
            title: "JavaScript ES6+ Essentials",
            questions: [
                {
                    type: "mcq",
                    question: "Which keyword declares a block-scoped variable that cannot be re-assigned?",
                    options: ["const", "let", "var", "static"],
                    correct: 0
                },
                {
                    type: "true_false",
                    question: "True or False: In JavaScript, the === operator compares both value and data type.",
                    correct: "true"
                },
                {
                    type: "fill_blank",
                    question: "Fill in the missing DOM method to select an element by its ID:",
                    code: "const element = document.________________('main-title');",
                    correct: "getElementById"
                },
                {
                    type: "code_writing",
                    question: "Write JavaScript code to output 'Hello World' to the browser developer console:",
                    hint: 'e.g. console.log("Hello World");',
                    correct: 'console.log("Hello World");'
                },
                {
                    type: "mcq",
                    question: "Which array method creates a new array containing only elements that pass a specified test function?",
                    options: ["map()", "filter()", "forEach()", "reduce()"],
                    correct: 1
                },
                {
                    type: "true_false",
                    question: "True or False: In JavaScript, NaN === NaN evaluates to true.",
                    correct: "false"
                },
                {
                    type: "fill_blank",
                    question: "Fill in the arrow function operator symbol:",
                    code: "const add = (a, b) ____ a + b;",
                    correct: "=>"
                },
                {
                    type: "code_writing",
                    question: "Write a JavaScript function named greet that returns the string 'Hi':",
                    hint: 'e.g. function greet() { return "Hi"; }',
                    correct: 'function greet() { return "Hi"; }'
                },
                {
                    type: "mcq",
                    question: "What is returned by typeof [] in JavaScript?",
                    options: ['"array"', '"object"', '"list"', '"undefined"'],
                    correct: 1
                },
                {
                    type: "true_false",
                    question: "True or False: async / await syntax in JS is built on top of Promises.",
                    correct: "true"
                }
            ]
        },
        python: {
            title: "Python Programming & Logic",
            questions: [
                {
                    type: "mcq",
                    question: "Which keyword is used to define a function in Python?",
                    options: ["def", "function", "fn", "define"],
                    correct: 0
                },
                {
                    type: "true_false",
                    question: "True or False: Python lists are mutable, meaning their elements can be changed.",
                    correct: "true"
                },
                {
                    type: "fill_blank",
                    question: "Fill in the built-in function to check the number of items in a list:",
                    code: "total_items = ____([10, 20, 30])",
                    correct: "len"
                },
                {
                    type: "code_writing",
                    question: "Write Python code to print 'Hello Spark' to the terminal output:",
                    hint: 'e.g. print("Hello Spark")',
                    correct: 'print("Hello Spark")'
                },
                {
                    type: "mcq",
                    question: "What data type is returned by the expression 7 / 2 in Python 3?",
                    options: ["int", "float", "double", "decimal"],
                    correct: 1
                },
                {
                    type: "true_false",
                    question: "True or False: Indentation is syntactically required to define code blocks in Python.",
                    correct: "true"
                },
                {
                    type: "fill_blank",
                    question: "Fill in the loop keyword to iterate 5 times:",
                    code: "____ i in range(5):\n    print(i)",
                    correct: "for"
                },
                {
                    type: "code_writing",
                    question: "Write Python code to append the value 10 to a list variable named nums:",
                    hint: "e.g. nums.append(10)",
                    correct: "nums.append(10)"
                },
                {
                    type: "mcq",
                    question: "Which Python data structure stores an unordered collection of unique elements with no duplicates?",
                    options: ["list", "tuple", "set", "dictionary"],
                    correct: 2
                },
                {
                    type: "true_false",
                    question: "True or False: bool('') evaluates to True in Python.",
                    correct: "false"
                }
            ]
        },
        fullstack: {
            title: "Full-Stack Web Development Master Test",
            questions: [
                {
                    type: "mcq",
                    question: "Which HTTP request method is standard for submitting data to create a new resource on a server?",
                    options: ["GET", "POST", "PUT", "DELETE"],
                    correct: 1
                },
                {
                    type: "true_false",
                    question: "True or False: Data stored in browser localStorage persists even after the browser window is closed.",
                    correct: "true"
                },
                {
                    type: "fill_blank",
                    question: "Fill in the JSON method to convert a JS object into a JSON string:",
                    code: "const jsonString = JSON.________(myObject);",
                    correct: "stringify"
                },
                {
                    type: "code_writing",
                    question: "Write the HTML tag used to link an external CSS file named style.css:",
                    hint: '<link rel="stylesheet" href="style.css">',
                    correct: '<link rel="stylesheet" href="style.css">'
                },
                {
                    type: "mcq",
                    question: "What does API stand for in software engineering?",
                    options: [
                        "Application Programming Interface",
                        "Automated Protocol Integration",
                        "Array Processing Instruction",
                        "Applied Programming Interaction"
                    ],
                    correct: 0
                },
                {
                    type: "true_false",
                    question: "True or False: Executing 'git commit' uploads your changes to GitHub servers directly.",
                    correct: "false"
                },
                {
                    type: "fill_blank",
                    question: "Fill in the CSS property name used for glassmorphism blur background:",
                    code: "-webkit-backdrop-______: blur(10px);",
                    correct: "filter"
                },
                {
                    type: "code_writing",
                    question: "Write JavaScript code to parse string '100' into integer number 100:",
                    hint: 'e.g. parseInt("100")',
                    correct: 'parseInt("100")'
                },
                {
                    type: "mcq",
                    question: "Which HTTP status code indicates a successful request OK response?",
                    options: ["200", "404", "500", "301"],
                    correct: 0
                },
                {
                    type: "true_false",
                    question: "True or False: Bootstrap 5 requires jQuery library to function.",
                    correct: "false"
                }
            ]
        }
    };

    // State Variables
    let selectedTrackKey = "html_css";
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let timerInterval = null;
    let secondsRemaining = 900; // 15 Minutes

    // Course Selection Click Handler
    const courseCards = document.querySelectorAll(".quiz-course-card");
    courseCards.forEach(card => {
        card.addEventListener("click", () => {
            courseCards.forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedTrackKey = card.getAttribute("data-course") || "html_css";
        });
    });

    // Start Quiz Button
    const btnStartQuiz = document.querySelector("#btnStartQuiz");
    if (btnStartQuiz) {
        btnStartQuiz.addEventListener("click", () => {
            // Dynamic real-time authentication check at button click moment
            const checkLoggedIn = sessionStorage.getItem("isLoggedIn") === "true" || localStorage.getItem("currentUser") !== null;

            if (!checkLoggedIn) {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "🔒 Login Required",
                        html: `<div class="text-start">
                            <p class="mb-2"><strong>Quiz Start Karne Ke Liye Login Karein!</strong></p>
                            <p class="small text-muted mb-0">Certification Quiz dene aur apna official 100-Mark Certificate earn karne ke liye pehle login karna zaroori hai.</p>
                        </div>`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Go to Login Page",
                        confirmButtonColor: "#4f46e5",
                        cancelButtonText: "Cancel",
                        customClass: { popup: 'rounded-4' }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "login.html";
                        }
                    });
                } else {
                    alert("Quiz start karne ke liye pehle login karein!");
                    window.location.href = "login.html";
                }
                return;
            }

            // Load selected track
            const track = quizDatabase[selectedTrackKey] || quizDatabase.html_css;
            currentQuestions = track.questions;
            currentQuestionIndex = 0;
            userAnswers = new Array(currentQuestions.length).fill(null);
            secondsRemaining = 900; // Reset 15 mins

            // Update UI elements
            const activeCourseBadge = document.querySelector("#quizActiveCourseBadge");
            if (activeCourseBadge) activeCourseBadge.textContent = track.title;

            quizStartScreen.classList.add("d-none");
            quizEngineScreen.classList.remove("d-none");

            startTimer();
            renderQuestion();
        });
    }

    // Timer Implementation
    const startTimer = () => {
        clearInterval(timerInterval);
        const timerDisplay = document.querySelector("#quizTimer");

        timerInterval = setInterval(() => {
            secondsRemaining--;
            if (secondsRemaining <= 0) {
                clearInterval(timerInterval);
                finishQuiz();
                return;
            }
            const mins = Math.floor(secondsRemaining / 60);
            const secs = secondsRemaining % 60;
            if (timerDisplay) {
                timerDisplay.innerHTML = `<i class="bi bi-stopwatch"></i> ${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }
        }, 1000);
    };

    // Render Question Engine
    const renderQuestion = () => {
        const q = currentQuestions[currentQuestionIndex];
        if (!q) return;

        // Progress & Counters
        const counterEl = document.querySelector("#quizQuestionCounter");
        const progressBarEl = document.querySelector("#quizProgressBar");
        const typeBadgeEl = document.querySelector("#quizTypeBadge");
        const questionTextEl = document.querySelector("#quizQuestionText");
        const codeContainerEl = document.querySelector("#quizCodeContainer");
        const optionsContainerEl = document.querySelector("#quizOptionsContainer");
        const btnPrev = document.querySelector("#btnPrevQuestion");
        const btnNext = document.querySelector("#btnNextQuestion");

        if (counterEl) counterEl.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
        if (progressBarEl) progressBarEl.style.width = `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`;

        // Type Badge
        const typeLabels = {
            mcq: "Multiple Choice (Tick)",
            fill_blank: "Fill in the Blank",
            true_false: "True or False",
            code_writing: "Code Exercise"
        };
        if (typeBadgeEl) typeBadgeEl.textContent = typeLabels[q.type] || "Question";

        if (questionTextEl) questionTextEl.textContent = q.question;

        // Code snippet
        if (codeContainerEl) {
            if (q.code) {
                codeContainerEl.textContent = q.code;
                codeContainerEl.classList.remove("d-none");
            } else {
                codeContainerEl.classList.add("d-none");
            }
        }

        // Render Options / Inputs based on Question Type
        if (optionsContainerEl) {
            optionsContainerEl.innerHTML = "";

            if (q.type === "mcq") {
                q.options.forEach((opt, idx) => {
                    const col = document.createElement("div");
                    col.className = "col-12 col-md-6";
                    const isSelected = userAnswers[currentQuestionIndex] === idx;
                    col.innerHTML = `
                        <div class="quiz-option-card ${isSelected ? 'selected' : ''}" data-index="${idx}">
                            <span class="quiz-option-badge">${String.fromCharCode(65 + idx)}</span>
                            <span class="fw-semibold text-dark-heading">${opt}</span>
                        </div>
                    `;
                    col.querySelector(".quiz-option-card").addEventListener("click", () => {
                        userAnswers[currentQuestionIndex] = idx;
                        renderQuestion();
                    });
                    optionsContainerEl.appendChild(col);
                });
            }
            else if (q.type === "true_false") {
                const options = [
                    { label: "True", value: "true", icon: "bi-check-circle-fill text-success" },
                    { label: "False", value: "false", icon: "bi-x-circle-fill text-danger" }
                ];
                options.forEach(opt => {
                    const col = document.createElement("div");
                    col.className = "col-6";
                    const isSelected = userAnswers[currentQuestionIndex] === opt.value;
                    col.innerHTML = `
                        <div class="quiz-option-card justify-content-center py-3 ${isSelected ? 'selected' : ''}" data-value="${opt.value}">
                            <i class="bi ${opt.icon} fs-4"></i>
                            <span class="fw-bold fs-5 text-dark-heading">${opt.label}</span>
                        </div>
                    `;
                    col.querySelector(".quiz-option-card").addEventListener("click", () => {
                        userAnswers[currentQuestionIndex] = opt.value;
                        renderQuestion();
                    });
                    optionsContainerEl.appendChild(col);
                });
            }
            else if (q.type === "fill_blank") {
                const col = document.createElement("div");
                col.className = "col-12";
                const currentVal = userAnswers[currentQuestionIndex] || "";
                col.innerHTML = `
                    <div class="p-3 rounded-3 bg-surface-alt border">
                        <label class="form-label small fw-bold text-muted mb-2"><i class="bi bi-pencil-fill me-1"></i> Type missing keyword / word:</label>
                        <input type="text" class="form-control form-control-lg font-monospace rounded-3" id="fillBlankInput" placeholder="Enter missing word here..." value="${currentVal}">
                    </div>
                `;
                optionsContainerEl.appendChild(col);
                const inputEl = col.querySelector("#fillBlankInput");
                inputEl.addEventListener("input", (e) => {
                    userAnswers[currentQuestionIndex] = e.target.value.trim();
                });
            }
            else if (q.type === "code_writing") {
                const col = document.createElement("div");
                col.className = "col-12";
                const currentVal = userAnswers[currentQuestionIndex] || "";
                col.innerHTML = `
                    <div class="p-3 rounded-3 bg-surface-alt border">
                        <label class="form-label small fw-bold text-muted mb-2"><i class="bi bi-code-square me-1"></i> Write code answer (${q.hint || 'Exact code syntax'}):</label>
                        <textarea class="form-control font-monospace rounded-3" id="codeWritingInput" rows="3" placeholder="Write your code snippet here...">${currentVal}</textarea>
                    </div>
                `;
                optionsContainerEl.appendChild(col);
                const inputEl = col.querySelector("#codeWritingInput");
                inputEl.addEventListener("input", (e) => {
                    userAnswers[currentQuestionIndex] = e.target.value;
                });
            }
        }

        // Navigation Buttons State
        if (btnPrev) {
            btnPrev.disabled = currentQuestionIndex === 0;
        }
        if (btnNext) {
            if (currentQuestionIndex === currentQuestions.length - 1) {
                btnNext.innerHTML = `Submit Quiz <i class="bi bi-check2-circle ms-1"></i>`;
                btnNext.className = "btn btn-success rounded-pill px-4 fw-semibold";
            } else {
                btnNext.innerHTML = `Next Question <i class="bi bi-arrow-right ms-1"></i>`;
                btnNext.className = "btn btn-primary rounded-pill px-4 fw-semibold";
            }
        }
    };

    // Navigation Button Click Handlers
    const btnPrev = document.querySelector("#btnPrevQuestion");
    const btnNext = document.querySelector("#btnNextQuestion");

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                renderQuestion();
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            if (currentQuestionIndex < currentQuestions.length - 1) {
                currentQuestionIndex++;
                renderQuestion();
            } else {
                finishQuiz();
            }
        });
    }

    // Finish Quiz & Automated Scoring
    const finishQuiz = () => {
        clearInterval(timerInterval);

        let earnedScore = 0; // Out of 100 Marks (10 Marks / Question)
        currentQuestions.forEach((q, idx) => {
            const userAns = userAnswers[idx];
            if (userAns === null || userAns === undefined) return;

            if (q.type === "mcq") {
                if (parseInt(userAns) === q.correct) earnedScore += 10;
            }
            else if (q.type === "true_false") {
                if (String(userAns).toLowerCase() === String(q.correct).toLowerCase()) earnedScore += 10;
            }
            else if (q.type === "fill_blank") {
                if (String(userAns).trim().toLowerCase() === String(q.correct).trim().toLowerCase()) earnedScore += 10;
            }
            else if (q.type === "code_writing") {
                const normUser = String(userAns).trim().toLowerCase().replace(/\s+/g, ' ');
                const normCorr = String(q.correct).trim().toLowerCase().replace(/\s+/g, ' ');
                if (normUser === normCorr) earnedScore += 10;
            }
        });

        const percentage = Math.round((earnedScore / 100) * 100);
        const isPassed = percentage >= 70; // Pass threshold 70%

        // Hide Quiz Engine, Show Results
        quizEngineScreen.classList.add("d-none");
        quizResultScreen.classList.remove("d-none");

        const resultScoreEl = document.querySelector("#resultScore");
        const resultPercentageEl = document.querySelector("#resultPercentage");
        const resultStatusTextEl = document.querySelector("#resultStatusText");
        const resultTitleEl = document.querySelector("#resultTitle");
        const resultSubtitleEl = document.querySelector("#resultSubtitle");
        const resultStatusIconEl = document.querySelector("#resultStatusIcon");
        const btnViewCertificate = document.querySelector("#btnViewCertificate");

        if (resultScoreEl) resultScoreEl.textContent = `${earnedScore} / 100 Marks`;
        if (resultPercentageEl) resultPercentageEl.textContent = `${percentage}%`;

        if (isPassed) {
            if (resultStatusTextEl) {
                resultStatusTextEl.textContent = "PASSED";
                resultStatusTextEl.className = "fs-4 text-success fw-bold";
            }
            if (resultTitleEl) resultTitleEl.textContent = "🎉 Congratulations! You Passed!";
            if (resultSubtitleEl) resultSubtitleEl.textContent = `Excellent job! You scored ${earnedScore} Marks (${percentage}%) and earned your official CodeSpark Certificate!`;
            if (resultStatusIconEl) {
                resultStatusIconEl.className = "about-team-avatar mx-auto mb-3 text-white";
                resultStatusIconEl.style.background = "linear-gradient(135deg, #10b981, #059669)";
                resultStatusIconEl.innerHTML = `<i class="bi bi-award-fill"></i>`;
            }
            if (btnViewCertificate) btnViewCertificate.classList.remove("d-none");

            // Prepare Certificate Modal Data
            const certStudentName = document.querySelector("#certStudentName");
            const certCourseName = document.querySelector("#certCourseName");
            const certIssueDate = document.querySelector("#certIssueDate");
            const certId = document.querySelector("#certId");
            const certScoreDisplay = document.querySelector("#certScoreDisplay");

            const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
            const randomCertNum = Math.floor(10000 + Math.random() * 90000);

            if (certStudentName) certStudentName.textContent = studentDisplayName;
            if (certCourseName) certCourseName.textContent = quizDatabase[selectedTrackKey]?.title || "Web Development";
            if (certIssueDate) certIssueDate.textContent = today;
            if (certId) certId.textContent = `CS-2026-${randomCertNum}`;
            if (certScoreDisplay) certScoreDisplay.textContent = `${percentage}% Score (Passed)`;

        } else {
            if (resultStatusTextEl) {
                resultStatusTextEl.textContent = "FAILED";
                resultStatusTextEl.className = "fs-4 text-danger fw-bold";
            }
            if (resultTitleEl) resultTitleEl.textContent = "Quiz Completed (70% Required)";
            if (resultSubtitleEl) resultSubtitleEl.textContent = `You scored ${earnedScore} Marks (${percentage}%). Minimum 70 Marks are required to unlock your certificate. Review the lessons and try again!`;
            if (resultStatusIconEl) {
                resultStatusIconEl.className = "about-team-avatar mx-auto mb-3 text-white";
                resultStatusIconEl.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
                resultStatusIconEl.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i>`;
            }
            if (btnViewCertificate) btnViewCertificate.classList.add("d-none");
        }
    };

    // View Certificate Modal Button
    const btnViewCertificate = document.querySelector("#btnViewCertificate");
    if (btnViewCertificate) {
        btnViewCertificate.addEventListener("click", () => {
            if (typeof bootstrap !== "undefined") {
                const certModal = new bootstrap.Modal(document.querySelector("#certificateModal"));
                certModal.show();
            }
        });
    }

    // Retry Quiz Button
    const btnRetryQuiz = document.querySelector("#btnRetryQuiz");
    if (btnRetryQuiz) {
        btnRetryQuiz.addEventListener("click", () => {
            quizResultScreen.classList.add("d-none");
            quizStartScreen.classList.remove("d-none");
        });
    }

    // Print Certificate Button
    const btnPrintCertificate = document.querySelector("#btnPrintCertificate");
    if (btnPrintCertificate) {
        btnPrintCertificate.addEventListener("click", () => {
            window.print();
        });
    }
};


// ==========================================================================
// Interactive Coding Lab IDE Engine
// ==========================================================================
const initCodingLabPage = () => {
    const htmlEditor = document.querySelector("#htmlEditor");
    const cssEditor = document.querySelector("#cssEditor");
    const jsEditor = document.querySelector("#jsEditor");
    const previewIframe = document.querySelector("#labPreviewIframe");
    const templateSelect = document.querySelector("#labTemplateSelect");
    const consoleLogsContainer = document.querySelector("#labConsoleLogs");
    const btnClearConsole = document.querySelector("#btnClearConsole");
    const btnRun = document.querySelector("#btnLabRun");
    const btnReset = document.querySelector("#btnLabReset");
    const btnCopy = document.querySelector("#btnLabCopy");
    const btnDownload = document.querySelector("#btnLabDownload");

    if (!htmlEditor || !previewIframe) return;

    // Built-in Starter Templates
    const templates = {
        hero: {
            html: `<div class="card-box">\n  <h2>🚀 Welcome to CodeSpark Lab</h2>\n  <p>Write HTML, CSS, and JavaScript with live preview and interactive console.</p>\n  <button id="sparkBtn">Click Me!</button>\n</div>`,
            css: `body {\n  font-family: 'Segoe UI', system-ui, sans-serif;\n  background: #f4f4fe;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  margin: 0;\n}\n\n.card-box {\n  background: #ffffff;\n  padding: 2rem;\n  border-radius: 16px;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n  text-align: center;\n  max-width: 400px;\n}\n\nh2 {\n  color: #4f46e5;\n  margin-top: 0;\n}\n\nbutton {\n  background: #4f46e5;\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 999px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n\nbutton:hover {\n  transform: scale(1.05);\n}`,
            js: `const btn = document.getElementById('sparkBtn');\nbtn.addEventListener('click', () => {\n  console.log("⚡ Spark Button Clicked! Great job!");\n  alert("Hello from CodeSpark Lab! 🎉");\n});\n\nconsole.log("Lab initialized successfully!");`
        },
        glassmorphic: {
            html: `<div class="glass-card">\n  <div class="avatar">👨‍💻</div>\n  <h3>Alex Morgan</h3>\n  <p>Full-Stack Developer</p>\n  <span class="badge">Verified Student</span>\n</div>`,
            css: `body {\n  font-family: sans-serif;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0;\n}\n\n.glass-card {\n  background: rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 20px;\n  padding: 2.5rem;\n  text-align: center;\n  color: white;\n  box-shadow: 0 8px 32px rgba(0,0,0,0.2);\n}\n\n.avatar {\n  font-size: 3rem;\n  margin-bottom: 0.5rem;\n}\n\n.badge {\n  background: rgba(255,255,255,0.3);\n  padding: 0.35rem 0.85rem;\n  border-radius: 99px;\n  font-size: 0.8rem;\n}`,
            js: `console.log("🎨 Glassmorphic profile card loaded.");`
        },
        counter: {
            html: `<div class="counter-box">\n  <h2>Counter App</h2>\n  <div class="count-display" id="count">0</div>\n  <div class="btn-group">\n    <button id="decBtn">-</button>\n    <button id="resetBtn">Reset</button>\n    <button id="incBtn">+</button>\n  </div>\n</div>`,
            css: `body {\n  font-family: sans-serif;\n  background: #0f172a;\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  margin: 0;\n}\n\n.counter-box {\n  background: #1e293b;\n  padding: 2.5rem;\n  border-radius: 20px;\n  text-align: center;\n  border: 1px solid #334155;\n}\n\n.count-display {\n  font-size: 4rem;\n  font-weight: bold;\n  color: #38bdf8;\n  margin: 1rem 0;\n}\n\n.btn-group button {\n  background: #38bdf8;\n  color: #0f172a;\n  border: none;\n  padding: 0.6rem 1.2rem;\n  margin: 0 0.25rem;\n  border-radius: 8px;\n  font-weight: bold;\n  cursor: pointer;\n}`,
            js: `let count = 0;\nconst display = document.getElementById('count');\n\ndocument.getElementById('incBtn').onclick = () => {\n  count++;\n  display.textContent = count;\n  console.log("Count increased:", count);\n};\n\ndocument.getElementById('decBtn').onclick = () => {\n  count--;\n  display.textContent = count;\n  console.log("Count decreased:", count);\n};\n\ndocument.getElementById('resetBtn').onclick = () => {\n  count = 0;\n  display.textContent = count;\n  console.log("Counter reset.");\n};`
        },
        todo: {
            html: `<div class="todo-app">\n  <h3>📝 Task Manager</h3>\n  <div class="input-row">\n    <input type="text" id="taskInput" placeholder="Add a new task...">\n    <button id="addTaskBtn">Add</button>\n  </div>\n  <ul id="taskList"></ul>\n</div>`,
            css: `body {\n  font-family: sans-serif;\n  background: #f8fafc;\n  display: flex;\n  justify-content: center;\n  padding-top: 2rem;\n  margin: 0;\n}\n\n.todo-app {\n  background: white;\n  padding: 2rem;\n  border-radius: 16px;\n  box-shadow: 0 10px 25px rgba(0,0,0,0.08);\n  width: 320px;\n}\n\n.input-row {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n\ninput {\n  flex: 1;\n  padding: 0.5rem;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n}\n\nbutton {\n  background: #4f46e5;\n  color: white;\n  border: none;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  cursor: pointer;\n}\n\nul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\nli {\n  padding: 0.5rem;\n  border-bottom: 1px solid #f1f5f9;\n  display: flex;\n  justify-content: space-between;\n}`,
            js: `const input = document.getElementById('taskInput');\nconst btn = document.getElementById('addTaskBtn');\nconst list = document.getElementById('taskList');\n\nbtn.onclick = () => {\n  if (!input.value.trim()) return;\n  const li = document.createElement('li');\n  li.textContent = input.value;\n  list.appendChild(li);\n  console.log("Task added:", input.value);\n  input.value = '';\n};`
        },
        theme_toggle: {
            html: `<div class="box" id="box">\n  <h3 id="heading">Light Mode Active</h3>\n  <button id="toggleBtn">Switch to Dark Mode 🌙</button>\n</div>`,
            css: `body {\n  font-family: sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  margin: 0;\n  transition: all 0.3s;\n}\n\n.box {\n  padding: 2rem;\n  border-radius: 16px;\n  text-align: center;\n  border: 1px solid #e2e8f0;\n}\n\nbutton {\n  padding: 0.75rem 1.25rem;\n  border-radius: 99px;\n  border: none;\n  background: #4f46e5;\n  color: white;\n  cursor: pointer;\n}`,
            js: `let isDark = false;\nconst btn = document.getElementById('toggleBtn');\nconst heading = document.getElementById('heading');\n\nbtn.onclick = () => {\n  isDark = !isDark;\n  document.body.style.background = isDark ? '#0f172a' : '#ffffff';\n  document.body.style.color = isDark ? '#ffffff' : '#000000';\n  heading.textContent = isDark ? 'Dark Mode Active 🌙' : 'Light Mode Active ☀️';\n  btn.textContent = isDark ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙';\n  console.log("Theme switched:", isDark ? "Dark" : "Light");\n};`
        }
    };

    // Load initial code into editors
    const loadTemplate = (key) => {
        const tpl = templates[key] || templates.hero;
        htmlEditor.value = tpl.html;
        cssEditor.value = tpl.css;
        jsEditor.value = tpl.js;
        updatePreview();
    };

    // Tab Switching Logic
    const tabBtns = document.querySelectorAll(".lab-tab-btn");
    const statusIndicator = document.querySelector("#labStatusIndicator");

    const switchTab = (tabName) => {
        tabBtns.forEach(b => {
            const isTarget = b.getAttribute("data-tab") === tabName;
            b.classList.toggle("active", isTarget);
        });

        const htmlPane = document.querySelector("#htmlTabPane");
        const cssPane = document.querySelector("#cssTabPane");
        const jsPane = document.querySelector("#jsTabPane");

        if (htmlPane) htmlPane.classList.toggle("d-none", tabName !== "html");
        if (cssPane) cssPane.classList.toggle("d-none", tabName !== "css");
        if (jsPane) jsPane.classList.toggle("d-none", tabName !== "js");

        if (tabName === "html" && htmlEditor) htmlEditor.focus();
        if (tabName === "css" && cssEditor) cssEditor.focus();
        if (tabName === "js" && jsEditor) jsEditor.focus();

        if (statusIndicator) {
            statusIndicator.innerHTML = `<i class="bi bi-pencil-square me-1"></i> Editing ${tabName === 'html' ? 'index.html' : tabName === 'css' ? 'style.css' : 'script.js'}`;
        }
    };

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const tab = btn.getAttribute("data-tab");
            switchTab(tab);
        });
    });

    // Update Live Preview Engine
    const updatePreview = () => {
        const html = htmlEditor.value;
        const css = cssEditor.value;
        const js = jsEditor.value;

        // Custom Console Interceptor Script for iframe
        const consoleInterceptor = `
            <script>
                (function() {
                    const originalLog = console.log;
                    console.log = function(...args) {
                        originalLog.apply(console, args);
                        window.parent.postMessage({
                            type: 'LAB_CONSOLE_LOG',
                            message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
                        }, '*');
                    };
                    window.onerror = function(msg, url, line) {
                        window.parent.postMessage({
                            type: 'LAB_CONSOLE_ERROR',
                            message: 'Error: ' + msg + ' (Line ' + line + ')'
                        }, '*');
                    };
                })();
            <\/script>
        `;

        const srcDoc = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${css}</style>
                ${consoleInterceptor}
            </head>
            <body>
                ${html}
                <script>${js}<\/script>
            </body>
            </html>
        `;

        previewIframe.srcdoc = srcDoc;
    };

    // Console Log Interceptor Listener
    window.addEventListener("message", (event) => {
        if (!event.data || !consoleLogsContainer) return;

        if (event.data.type === "LAB_CONSOLE_LOG") {
            const line = document.createElement("div");
            line.className = "lab-console-log-line";
            line.innerHTML = `<i class="bi bi-chevron-right text-success"></i> <span>${escapeHtml(event.data.message)}</span>`;
            consoleLogsContainer.appendChild(line);
            consoleLogsContainer.scrollTop = consoleLogsContainer.scrollHeight;
        } 
        else if (event.data.type === "LAB_CONSOLE_ERROR") {
            const line = document.createElement("div");
            line.className = "lab-console-log-line text-danger";
            line.innerHTML = `<i class="bi bi-exclamation-triangle-fill text-danger"></i> <span>${escapeHtml(event.data.message)}</span>`;
            consoleLogsContainer.appendChild(line);
            consoleLogsContainer.scrollTop = consoleLogsContainer.scrollHeight;
        }
    });

    const escapeHtml = (str) => {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    // Auto-update on input
    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
        editor.addEventListener("input", updatePreview);
    });

    // Control Buttons
    if (templateSelect) {
        templateSelect.addEventListener("change", (e) => {
            loadTemplate(e.target.value);
        });
    }

    if (btnRun) {
        btnRun.addEventListener("click", () => {
            updatePreview();
            if (typeof Swal !== "undefined") {
                const toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                });
                toast.fire({ icon: 'success', title: 'Code Executed Successfully!' });
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener("click", () => {
            const currentTplKey = templateSelect ? templateSelect.value : "hero";
            loadTemplate(currentTplKey);
        });
    }

    if (btnClearConsole && consoleLogsContainer) {
        btnClearConsole.addEventListener("click", () => {
            consoleLogsContainer.innerHTML = `<div class="lab-console-log-line"><i class="bi bi-info-circle-fill text-info"></i> <span class="text-white-50">Console output cleared.</span></div>`;
        });
    }

    if (btnCopy) {
        btnCopy.addEventListener("click", () => {
            const activeTabBtn = document.querySelector(".lab-tab-btn.active");
            const activeTab = activeTabBtn ? activeTabBtn.getAttribute("data-tab") : "html";
            let contentToCopy = htmlEditor.value;
            if (activeTab === "css") contentToCopy = cssEditor.value;
            if (activeTab === "js") contentToCopy = jsEditor.value;

            navigator.clipboard.writeText(contentToCopy).then(() => {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "Copied! 📋",
                        text: `${activeTab.toUpperCase()} code copied to clipboard!`,
                        icon: "success",
                        timer: 1200,
                        showConfirmButton: false
                    });
                }
            });
        });
    }

    const triggerDownload = () => {
        const bundledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeSpark Project</title>
  <style>
${cssEditor.value}
  </style>
</head>
<body>
${htmlEditor.value}
  <script>
${jsEditor.value}
  </script>
</body>
</html>`;

        const blob = new Blob([bundledHtml], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "codespark_project.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (btnDownload) {
        btnDownload.addEventListener("click", triggerDownload);
    }

    // ==========================================================================
    // Feature Cards Action Event Handlers (Making Cards Fully Interactive)
    // ==========================================================================
    const cardInstantExec = document.querySelector("#cardInstantExec");
    const cardConsole = document.querySelector("#cardConsole");
    const cardExport = document.querySelector("#cardExport");
    const cardTemplates = document.querySelector("#cardTemplates");

    // 1. Instant Execution Feature Card Click
    if (cardInstantExec) {
        cardInstantExec.addEventListener("click", () => {
            updatePreview();
            if (statusIndicator) {
                statusIndicator.innerHTML = `<i class="bi bi-lightning-charge-fill text-warning me-1"></i> Real-Time Sync Active!`;
            }
            if (typeof Swal !== "undefined") {
                const toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
                toast.fire({ icon: 'info', title: '⚡ Instant Execution Active! Type anywhere to update output live.' });
            }
        });
    }

    // 2. Interactive Console Feature Card Click
    if (cardConsole) {
        cardConsole.addEventListener("click", () => {
            switchTab("js");
            const consolePanel = document.querySelector(".lab-console-panel");
            if (consolePanel) {
                consolePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
                consolePanel.style.outline = "2px solid #38bdf8";
                setTimeout(() => { consolePanel.style.outline = "none"; }, 2000);
            }
            if (typeof Swal !== "undefined") {
                const toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
                toast.fire({ icon: 'success', title: '🔍 Console Terminal Focused!' });
            }
        });
    }

    // 3. One-Click Export Feature Card Click
    if (cardExport) {
        cardExport.addEventListener("click", () => {
            triggerDownload();
            if (typeof Swal !== "undefined") {
                const toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
                toast.fire({ icon: 'success', title: '📥 Project HTML Exported!' });
            }
        });
    }

    // 4. Pre-built Templates Feature Card Click (Cycle Templates)
    if (cardTemplates) {
        cardTemplates.addEventListener("click", () => {
            const templateKeys = Object.keys(templates);
            const currentVal = templateSelect ? templateSelect.value : "hero";
            const currentIndex = templateKeys.indexOf(currentVal);
            const nextIndex = (currentIndex + 1) % templateKeys.length;
            const nextKey = templateKeys[nextIndex];

            if (templateSelect) templateSelect.value = nextKey;
            loadTemplate(nextKey);

            document.querySelector("#lab-workspace")?.scrollIntoView({ behavior: "smooth" });

            if (typeof Swal !== "undefined") {
                const toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
                toast.fire({ icon: 'success', title: `🎨 Template Switched: ${nextKey.toUpperCase()}` });
            }
        });
    }

    // Initialize with default template
    loadTemplate("hero");
};



if (typeof AOS !== "undefined") {

    AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 80
    });

}


initThemeToggle();
initNavbar();
initLoginButtonNotice();
initHomePlaygroundTeaser();
initHomeQuickQuizTeaser();
initAuthLoginPage();
initAuthRegisterPage();
initContactPage();
initCoursesPage();
initQuizPage();
initCodingLabPage();


