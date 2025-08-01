// ===================================================
// TIME PLANNER SYSTEM - FRONTEND LOGIC (LOCAL STORAGE)
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // TASK MANAGEMENT
  // ================================
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  let editTaskId = null;

  if (taskForm) {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("taskTitle").value;
      const dueDate = document.getElementById("taskDueDate").value;

      if (editTaskId) {
        updateTask(editTaskId, title, dueDate);
        editTaskId = null;
      } else {
        const task = { id: Date.now(), title, dueDate, completed: false };
        saveTask(task);
      }

      displayTasks();
      taskForm.reset();
    });
  }

  function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function updateTask(id, title, dueDate) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(t => t.id === id ? { ...t, title, dueDate } : t);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!taskList) return;
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span style="text-decoration: ${task.completed ? "line-through" : "none"}">
          ${task.title} (Due: ${task.dueDate})
        </span>
        <div>
          <button onclick="toggleTask(${task.id})">${task.completed ? "Undo" : "Done"}</button>
          <button onclick="editTask(${task.id})">Edit</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }

  window.toggleTask = function (id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  };

  window.editTask = function (id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === id);

    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDueDate").value = task.dueDate;
    editTaskId = id;
  };

  window.deleteTask = function (id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  };

  if (taskList) displayTasks();


  // ================================
  // JOURNAL
  // ================================
  const journalForm = document.getElementById("journalForm");
  const journalList = document.getElementById("journalList");
  let editJournalId = null;

  if (journalForm) {
    journalForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const text = document.getElementById("journalText").value;

      if (editJournalId) {
        updateJournal(editJournalId, text);
        editJournalId = null;
      } else {
        const entry = { id: Date.now(), date: new Date().toLocaleString(), text };
        saveJournal(entry);
      }

      displayJournals();
      journalForm.reset();
    });
  }

  function saveJournal(entry) {
    let entries = JSON.parse(localStorage.getItem("journals")) || [];
    entries.unshift(entry);
    localStorage.setItem("journals", JSON.stringify(entries));
  }

  function updateJournal(id, text) {
    let entries = JSON.parse(localStorage.getItem("journals")) || [];
    entries = entries.map(e => e.id === id ? { ...e, text } : e);
    localStorage.setItem("journals", JSON.stringify(entries));
  }

  function displayJournals() {
    let entries = JSON.parse(localStorage.getItem("journals")) || [];
    if (!journalList) return;
    journalList.innerHTML = "";

    entries.forEach((entry) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${entry.date}</strong>
          <p>${entry.text}</p>
        </div>
        <div>
          <button onclick="editJournal(${entry.id})">Edit</button>
          <button onclick="deleteJournal(${entry.id})">Delete</button>
        </div>
      `;
      journalList.appendChild(li);
    });
  }

  window.editJournal = function (id) {
    let entries = JSON.parse(localStorage.getItem("journals")) || [];
    const entry = entries.find(e => e.id === id);

    document.getElementById("journalText").value = entry.text;
    editJournalId = id;
  };

  window.deleteJournal = function (id) {
    let entries = JSON.parse(localStorage.getItem("journals")) || [];
    entries = entries.filter(e => e.id !== id);
    localStorage.setItem("journals", JSON.stringify(entries));
    displayJournals();
  };

  if (journalList) displayJournals();


  // ================================
  // MOOD TRACKER
  // ================================
  const moodForm = document.getElementById("moodForm");
  const moodList = document.getElementById("moodList");
  let editMoodId = null;

  if (moodForm) {
    moodForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const mood = document.getElementById("moodSelect").value;
      const note = document.getElementById("moodNote").value;

      if (editMoodId) {
        updateMood(editMoodId, mood, note);
        editMoodId = null;
      } else {
        const entry = {
          id: Date.now(),
          date: new Date().toLocaleDateString(),
          mood,
          note
        };
        saveMood(entry);
      }

      displayMoods();
      moodForm.reset();
    });
  }

  function saveMood(entry) {
    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods.unshift(entry);
    localStorage.setItem("moods", JSON.stringify(moods));
  }

  function updateMood(id, mood, note) {
    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods = moods.map(m => m.id === id ? { ...m, mood, note } : m);
    localStorage.setItem("moods", JSON.stringify(moods));
  }

  function displayMoods() {
    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    if (!moodList) return;
    moodList.innerHTML = "";

    moods.forEach((entry) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${entry.date}</strong> - ${entry.mood}
          <p>${entry.note || ""}</p>
        </div>
        <div>
          <button onclick="editMood(${entry.id})">Edit</button>
          <button onclick="deleteMood(${entry.id})">Delete</button>
        </div>
      `;
      moodList.appendChild(li);
    });
  }

  window.editMood = function (id) {
    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    const entry = moods.find(m => m.id === id);

    document.getElementById("moodSelect").value = entry.mood;
    document.getElementById("moodNote").value = entry.note;
    editMoodId = id;
  };

  window.deleteMood = function (id) {
    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods = moods.filter(m => m.id !== id);
    localStorage.setItem("moods", JSON.stringify(moods));
    displayMoods();
  };

  if (moodList) displayMoods();


  // ================================
  // SIMPLE DAILY REMINDER
  // ================================
  if (document.querySelector("main")) {
    setTimeout(() => {
      alert("⏰ Reminder: Don’t forget to check your tasks, write a journal, and log your mood today!");
    }, 5000);
  }

});
