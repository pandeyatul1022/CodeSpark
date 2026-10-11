# ⚡ CodeSpark — Learn Coding Through Play

> An interactive, fun, block-based coding platform designed for school children to learn programming concepts, computational thinking, and logic building.

![CodeSpark Banner](https://img.shields.io/badge/CodeSpark-Coding%20Awareness%20Program-6C5CE7?style=for-the-badge&logo=codeforces&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-00B894?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-00CEC9?style=for-the-badge)

---

## 🚀 Features

- 🧩 **Block-Based Coding Workspace**: Drag-and-drop programming blocks powered by Google Blockly.
- 🎭 **Interactive Stage & Sprite**: Live HTML5 Canvas rendering sprite avatar movements, rotations, costumes, and pen drawing.
- 💻 **Dual Code Generator**: View block programs as real **JavaScript** and **Python** code.
- 📚 **Step-by-Step Tutorials**: Interactive lessons ranging from basic movement to loops, conditionals, and drawing.
- 🧠 **Coding Awareness Quiz**: 15 interactive questions testing computational thinking and coding history.
- 🏆 **Achievements & Badges**: Earn unlockable badges for completing tutorials, quizzes, and projects.
- 💾 **Project Persistence**: Save, load, export, and import block projects via browser `localStorage` and JSON files.
- 🌙 **Dark & Light Themes**: Beautiful responsive UI with seamless theme toggling.

---

## 🛠️ Built With

- **HTML5 & Vanilla CSS3**: Custom responsive styling with glassmorphism effects and CSS variables.
- **JavaScript (ES6+)**: Modular client-side architecture.
- **Google Blockly**: Visual programming blocks interface.
- **Bootstrap Icons**: Locally hosted icon font used across the interface.

---

## 📂 Project Structure

```text
CodeSpark/
├── assets/
│   ├── css/                # Global styles and auth-page styles
│   ├── fonts/              # Application webfonts
│   ├── js/
│   │   ├── app.js           # Shared navigation and site behavior
│   │   ├── features/        # Auth, editor, tutorials, quiz, profile, and achievements
│   │   └── vendor/          # Blockly and Bootstrap JavaScript
│   └── vendor/              # Bootstrap and Bootstrap Icons stylesheets/fonts
├── index.html               # Landing page
├── editor.html              # Blockly HTML/CSS editor
├── tutorials.html           # Interactive tutorials
├── quiz.html                # Coding awareness quiz
├── achievements.html        # Achievement catalog
├── login.html
├── register.html
├── profile.html
└── certificate.html
```

The project is a static HTML/CSS/JavaScript site and currently has no build step, backend, database, or automated test suite.

Bootstrap Icons are vendored in `assets/vendor/bootstrap-icons/`; application markup uses the `bi` and `bi-*` classes.

The landing-page hero carousel uses Storyset SVG illustrations stored locally in `assets/images/hero/`. They are credited in the page footer in accordance with Storyset's free-use attribution requirement.

---

## 🚀 Getting Started

No installation or build tools required. Simply clone the repository and open `index.html` in your web browser!

```bash
# Clone the repository
git clone https://github.com/pandeyatul1022/CodeSpark.git

# Navigate to project folder
cd CodeSpark

# Open index.html in your default browser or use a local dev server
npx serve .
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Made with ❤️ for young learners & coding enthusiasts. CEP Project © 2026.
