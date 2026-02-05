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
}

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setView(btn.dataset.view);
  });
});
