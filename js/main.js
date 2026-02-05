console.log("JS LOADED");
// NAVIGATION
const navButtons = document.querySelectorAll('.nav-btn');
const views = {
  characters: document.getElementById('view-characters'),
  studentWing: document.getElementById('view-studentWing'),
  machinery: document.getElementById('view-machinery'),
  tools: document.getElementById('view-tools'),
  mediator: document.getElementById('view-mediator')
};

function setView(view) {
  for (const key in views) {
    views[key].style.display = key === view ? 'block' : 'none';
  }

  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });

  if (view === 'characters') {
    viraText.textContent = "Welcome, Agent. Choose your character to initialise the VR Travel Agency systems.";
  }
  if (view === 'studentWing') {
    viraText.textContent = "Student Wing online. Solve micro‑tasks to calibrate your language machinery.";
  }
  if (view === 'machinery') {
    viraText.textContent = "Language Machinery Room accessed. Grammar and vocabulary systems ready.";
  }
  if (view === 'tools') {
    viraText.textContent = "Language Tools Room accessed. Communication modules standing by.";
  }
  if (view === 'mediator') {
    viraText.textContent = "Language Mediator Room accessed. Meaning‑making protocols online.";
  }
}

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setView(btn.dataset.view);
  });
});

// CHARACTER SELECTION
const characterCards = document.querySelectorAll('.character-card');
const agentInfo = document.getElementById('agentInfo');
const goStudentWingBtn = document.getElementById('goStudentWingBtn');
const viraText = document.getElementById('viraText');

let selectedAgent = null;

characterCards.forEach(card => {
  card.addEventListener('click', () => {
    characterCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    selectedAgent = {
      name: card.dataset.agent,
      focus: card.dataset.focus
    };

    agentInfo.textContent = `${selectedAgent.name} selected · Focus: ${selectedAgent.focus}`;
    goStudentWingBtn.disabled = false;

    viraText.textContent = `Agent ${selectedAgent.name} online. You may now enter the Student Wing.`;
  });
});

// ENTER STUDENT WING
goStudentWingBtn.addEventListener('click', () => {
  if (!selectedAgent) return;
  setView('studentWing');
});

// XP SYSTEM
let xp = 0;
const xpValue = document.getElementById('xpValue');
const xpBar = document.getElementById('xpBar');

function addXP(baseXP, area) {
  let bonus = 0;

  if (selectedAgent && selectedAgent.focus === area) {
    bonus = 2;
  }

  const total = baseXP + bonus;
  xp += total;

  xpValue.textContent = xp;
  xpBar.style.width = `${xp % 100}%`;

  viraText.textContent = bonus > 0
    ? `Calibration successful. +${baseXP} XP (${area}) · +${bonus} Agent bonus.`
    : `Calibration successful. +${baseXP} XP (${area}).`;
}

// MICRO‑TASK
const taskOptions = document.querySelectorAll('.task-option');
const taskFeedback = document.getElementById('taskFeedback');
let taskCompleted = false;

taskOptions.forEach(option => {
  option.addEventListener('click', () => {
    if (taskCompleted) return;

    const correct = option.dataset.correct === "true";

    taskOptions.forEach(o => o.classList.remove('correct', 'incorrect'));

    if (correct) {
      option.classList.add('correct');
      taskFeedback.textContent = "Correct. In English, adjectives usually go before the noun.";
      taskFeedback.classList.add('ok');
      addXP(5, "Language Machinery");
      taskCompleted = true;
    } else {
      option.classList.add('incorrect');
      taskFeedback.textContent = "Not this time. Think: beautiful castle, not castle beautiful.";
      taskFeedback.classList.add('bad');
    }
  });
});
