# FocusFlow AI 🎯

> **Make today count. Small steps. Deep focus. Better results.**

FocusFlow AI is a sleek, responsive, and distraction-free productivity web application designed to help users organize daily goals, lock into deep work with a Pomodoro timer, track real-time progress metrics, and receive smart, contextual coaching tips.

Built with vanilla **HTML5**, **CSS3**, and **JavaScript**, with zero external dependencies and 100% offline-ready local storage.

---

## 🚀 Features

- **Task Management**: Seamlessly add, complete, and delete daily tasks with immediate visual feedback.
- **Priority Categorization**: Color-coded badges for **High**, **Medium**, and **Low** priority tasks.
- **Pomodoro Focus Timer**: 
  - 25-minute deep focus sessions
  - 5-minute short breaks
  - 15-minute long recharge breaks
  - Dynamic conic-gradient progress ring and live tab title countdown.
  - Gentle Web Audio notification chimes when sessions finish.
- **Productivity Dashboard**: Real-time tracking of:
  - Completed tasks count
  - Total tasks count
  - Focus session tally
  - Percentage completion rate with animated progress bar
- **Context-Aware Focus Coach**: Dynamic productivity guidance prioritizing your high-priority items and recommending proven focus tactics.
- **Theme Switcher**: Instant toggle between Dark Mode and Light Mode, with theme preferences saved across sessions.
- **Local Storage Persistence**: All tasks, metrics, sessions, and theme choices remain safe in your browser without requiring account creation.
- **Responsive & Accessible**: Optimized for desktop monitors, laptops, tablets, and smartphones with semantic HTML5.

---

## 🎥 Live Demo

Check out the live deployment:
- **Live Demo**: [https://YOUR-USERNAME.github.io/FocusFlow-AI/](https://YOUR-USERNAME.github.io/FocusFlow-AI/)

---

## 💻 Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessibility landmarks, and form controls |
| **CSS3** | Modern CSS variables, glassmorphism, flexbox/grid layout, and dark mode |
| **JavaScript (ES6+)** | State management, DOM manipulation, timer intervals, and coaching logic |
| **Web Audio API** | Subtle synthesized sound cues on timer completion |
| **Web Storage API** | Client-side persistence via `localStorage` |

---

## 📂 Project Structure

```text
FocusFlow-AI/
├── index.html       # Application entry point & semantic markup
├── style.css        # Clean design system, themes, and responsive rules
├── script.js        # Core logic: tasks, Pomodoro timer, & smart coach
└── README.md        # Documentation and challenge submission details
```

---

## ⚙️ How to Run Locally

No build tools, bundlers, or packages are required!

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/FocusFlow-AI.git
   ```

2. **Open the project folder**:
   ```bash
   cd FocusFlow-AI
   ```

3. **Launch the application**:
   - Double-click `index.html` to open it directly in any modern browser, **or**
   - Run a simple local server:
     ```bash
     python3 -m http.server 3000
     ```
     Then open [http://localhost:3000](http://localhost:3000) in your web browser.

4. Start adding tasks, choose priorities, and hit **▶ Start** on the timer to enter flow!

---

## 🤖 How I Built It

FocusFlow AI was created using vanilla web technologies:

- **Structure**: Semantic HTML elements (`<header>`, `<main>`, `<section>`, `<article>`, `<form>`) provide clear organization and accessibility.
- **Design & Layout**: Pure CSS with custom property color tokens, CSS Grid for the split layout dashboard, and media queries for smooth responsive scaling down to mobile viewports.
- **Logic & Interactions**: JavaScript manages application state in memory and synchronizes with `localStorage`. The Pomodoro timer handles interval ticking, conic-gradient angles, and dynamic tab title updates.
- **Focus Coach**: Currently operates via deterministic client-side heuristics—evaluating your task queue, prioritizing pending "High" priority items, and rotating through evidence-based cognitive strategies. It works entirely client-side without external API calls or latency.

---

## 🌱 Why Does Open Innovation Matter?

Open innovation enables builders worldwide to exchange ideas, share solutions, and assemble practical software collaboratively. FocusFlow AI represents an accessible, privacy-first foundation for daily productivity that anyone can freely examine, adapt, or build upon. Open development invites contributors to introduce features, refine accessibility, improve user experience, or connect open-source AI inference engines.

---

## 🧠 My Agent Session

Developing this project with an AI coding partner enabled fast iterative prototyping:
- Co-designing the dashboard architecture and visual hierarchy.
- Structuring resilient local persistence and edge-case handling for timer resets.
- Refining accessibility attributes, aria labels, and responsive breakpoints.
- Human review and active testing ensured clean separation of concerns and high code quality.

---

## 👤 My First User

FocusFlow AI is tailored for:
- **Developers & Engineers**: Carving out deep-focus blocks during complex programming sprints.
- **Students & Learners**: Structuring study periods and avoiding cognitive fatigue.
- **Remote Workers & Freelancers**: Keeping daily priorities clear without heavyweight project management overhead.

---

## 🏆 Hacktoberfest Challenge

This project was built for the **Hacktoberfest Open-Source AI Challenge Week 3: Slow and Steady**.
- **Challenge details**: [https://dev.to/challenges/hacktoberfest-week3-2026-10-19](https://dev.to/challenges/hacktoberfest-week3-2026-10-19)

---

## 🔮 Future Improvements

- [ ] Optional integration with lightweight open-source LLM APIs (e.g. Ollama / Gemini Nano) for generative task breakdown.
- [ ] Daily and weekly productivity reports with exportable summaries.
- [ ] User-customizable timer intervals (custom focus/break minutes).
- [ ] Task due dates, tags, and browser notification reminders.
- [ ] Productivity streaks and daily milestone badges.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) — free to use, study, and modify.

---

*Built with passion for better focus and smarter productivity.* 🎯
