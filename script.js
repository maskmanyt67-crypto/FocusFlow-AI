const $ = (selector) => document.querySelector(selector);

const taskForm = $("#taskForm");
const taskInput = $("#taskInput");
const priorityInput = $("#priorityInput");
const taskList = $("#taskList");
const emptyMessage = $("#emptyMessage");
const progressBar = $("#progressBar");
const progressText = $("#progressText");
const completedCount = $("#completedCount");
const totalCount = $("#totalCount");
const sessionCount = $("#sessionCount");
const remainingBadge = $("#remainingBadge");
const timerDisplay = $("#timerDisplay");
const timerLabel = $("#timerLabel");
const timerHint = $("#timerHint");
const timerRing = $(".timer-ring");
const coachMessage = $("#coachMessage");
const toast = $("#toast");

let tasks = [];
let focusSessions = 0;
let timerSeconds = 25 * 60;
let selectedMinutes = 25;
let selectedLabel = "FOCUS SESSION";
let timerInterval = null;
let timerRunning = false;
let toastTimeout = null;
let coachIndex = 0;

const coachTips = [
    "Choose your most important task and work on it for just 25 minutes. Starting is often the hardest part.",
    "Turn off notifications and close unnecessary tabs. Give your current task your full attention.",
    "Break a big task into three small steps. Complete the first step before thinking about the rest.",
    "Try the two-minute rule: if a task takes less than two minutes, do it now.",
    "Take a short break between focus sessions. Stretch, drink water, and give your eyes a rest.",
    "Work on your highest-priority task when your energy is strongest.",
    "Progress matters more than perfection. Finish a small part of your task today."
];

function loadData() {
    try {
        tasks = JSON.parse(localStorage.getItem("focusflow_tasks")) || [];
        focusSessions = Number(localStorage.getItem("focusflow_sessions")) || 0;

        const savedTheme = localStorage.getItem("focusflow_theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark");
            $("#themeBtn").textContent = "☀️";
        }
    } catch (error) {
        tasks = [];
        focusSessions = 0;
    }
}

function saveData() {
    localStorage.setItem("focusflow_tasks", JSON.stringify(tasks));
    localStorage.setItem("focusflow_sessions", String(focusSessions));
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

function updateDate() {
    const now = new Date();

    $("#dayName").textContent = now.toLocaleDateString("en-US", {
        weekday: "long"
    });

    $("#todayDate").textContent = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

function renderTasks() {
    taskList.replaceChildren();

    tasks.forEach((task) => {
        const item = document.createElement("article");
        item.className = `task-item${task.completed ? " completed" : ""}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-check";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", `Complete ${task.name}`);

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveData();
            renderTasks();

            if (task.completed) {
                showToast("Great job! Task completed.");
            }
        });

        const details = document.createElement("div");
        details.className = "task-details";

        const name = document.createElement("p");
        name.className = "task-name";
        name.textContent = task.name;

        const meta = document.createElement("div");
        meta.className = "task-meta";

        const priority = document.createElement("span");
        priority.className = `priority ${task.priority}`;
        priority.textContent = task.priority;

        const status = document.createElement("span");
        status.className = "task-status";
        status.textContent = task.completed ? "Completed" : "In progress";

        meta.append(priority, status);
        details.append(name, meta);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "×";
        deleteButton.title = "Delete task";
        deleteButton.setAttribute("aria-label", `Delete ${task.name}`);

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter((item) => item.id !== task.id);
            saveData();
            renderTasks();
            showToast("Task deleted.");
        });

        item.append(checkbox, details, deleteButton);
        taskList.append(item);
    });

    const completed = tasks.filter((task) => task.completed).length;
    const total = tasks.length;
    const remaining = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    completedCount.textContent = completed;
    totalCount.textContent = total;
    sessionCount.textContent = focusSessions;
    progressText.textContent = `${progress}%`;
    progressBar.style.width = `${progress}%`;
    remainingBadge.textContent = `${remaining} remaining`;

    emptyMessage.hidden = total > 0;
    taskList.hidden = total === 0;
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = taskInput.value.trim();

    if (!name) {
        showToast("Please enter a task first.");
        return;
    }

    tasks.unshift({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name,
        priority: priorityInput.value,
        completed: false
    });

    saveData();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
    showToast("Task added successfully.");
});

$("#resetBtn").addEventListener("click", () => {
    const confirmed = confirm("Reset today's tasks and focus session count?");

    if (!confirmed) return;

    tasks = [];
    focusSessions = 0;
    saveData();
    renderTasks();
    resetTimer();
    showToast("Your day has been reset.");
});

$("#themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");
    $("#themeBtn").textContent = darkMode ? "☀️" : "🌙";

    localStorage.setItem("focusflow_theme", darkMode ? "dark" : "light");
    updateTimerDisplay();
});

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    timerDisplay.textContent = formattedTime;

    if (timerRunning) {
        document.title = `(${formattedTime}) ${selectedLabel} - FocusFlow AI`;
    } else {
        document.title = "FocusFlow AI - Intelligent Productivity & Focus Dashboard";
    }

    const totalSeconds = selectedMinutes * 60;
    const elapsed = totalSeconds - timerSeconds;
    const progress = totalSeconds > 0 ? elapsed / totalSeconds : 0;

    const degrees = Math.min(360, Math.max(0, progress * 360));
    const ringColor = getComputedStyle(document.body)
        .getPropertyValue("--primary").trim();

    const backgroundColor = getComputedStyle(document.body)
        .getPropertyValue("--border").trim();

    timerRing.style.background =
        `conic-gradient(${ringColor} ${degrees}deg, ${backgroundColor} ${degrees}deg)`;
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRunning = false;
    $("#startBtn").textContent = "▶ Start";
    document.title = "FocusFlow AI - Intelligent Productivity & Focus Dashboard";
}

function startTimer() {
    if (timerRunning) return;

    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }

    if (timerSeconds <= 0) {
        timerSeconds = selectedMinutes * 60;
    }

    timerRunning = true;
    $("#startBtn").textContent = "▶ Running";
    timerHint.textContent = "Stay focused!";

    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();

        if (timerSeconds <= 0) {
            stopTimer();
            timerSeconds = 0;
            updateTimerDisplay();

            if (selectedLabel === "FOCUS SESSION") {
                focusSessions++;
                saveData();
                renderTasks();
                showToast("Focus session complete! Take a short break.");
            } else {
                showToast("Break complete! Ready to focus again?");
            }

            timerHint.textContent = "Session complete!";
            playNotification();
        }
    }, 1000);
}

function pauseTimer() {
    if (!timerRunning) return;

    stopTimer();
    timerHint.textContent = "Paused. Resume when ready.";
}

function resetTimer() {
    stopTimer();
    timerSeconds = selectedMinutes * 60;
    timerLabel.textContent = selectedLabel;
    timerHint.textContent = "Ready when you are";
    updateTimerDisplay();
}

function playNotification() {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            const ctx = new AudioContextClass();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
            osc.start();
            osc.stop(ctx.currentTime + 0.8);
        }
    } catch (e) {
        // Audio playback unavailable or blocked by autoplay policy
    }

    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("FocusFlow AI", {
            body: selectedLabel === "FOCUS SESSION"
                ? "Focus session complete. Time for a break!"
                : "Your break is over. Ready to focus?"
        });
    }
}

$("#startBtn").addEventListener("click", startTimer);
$("#pauseBtn").addEventListener("click", pauseTimer);
$("#timerResetBtn").addEventListener("click", resetTimer);

document.querySelectorAll(".mode-btn").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".mode-btn").forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedMinutes = Number(button.dataset.minutes);
        selectedLabel = button.dataset.label;
        timerSeconds = selectedMinutes * 60;

        resetTimer();
    });
});

$("#coachBtn").addEventListener("click", () => {
    const unfinishedTasks = tasks.filter((task) => !task.completed);
    const highPriorityTask = unfinishedTasks.find(
        (task) => task.priority === "High"
    );

    if (unfinishedTasks.length === 0) {
        coachMessage.textContent = tasks.length === 0
            ? "Start by adding one clear task. Then choose a realistic time to work on it."
            : "Amazing work! All your tasks are complete. Take a break and celebrate your progress.";
        return;
    }

    if (highPriorityTask) {
        coachMessage.textContent =
            `Your next priority is "${highPriorityTask.name}". Silence distractions and give it one focused 25-minute session.`;
        return;
    }

    coachMessage.textContent = coachTips[coachIndex % coachTips.length];
    coachIndex++;
});

loadData();
updateDate();
renderTasks();
updateTimerDisplay();