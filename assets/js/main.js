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

            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Welcome Back! 🚀",
                    text: `Signed in successfully as ${usernameInput.value.trim()}`,
                    icon: "success",
                    confirmButtonText: "Continue Learning",
                    confirmButtonColor: "#4f46e5"
                });
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
