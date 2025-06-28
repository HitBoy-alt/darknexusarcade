// Initialize particles.js background
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#b19cd9" },
    shape: { type: "circle", stroke: { width: 0, color: "#000" } },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#9b59b6", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 3, direction: "none", out_mode: "out" },
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
    modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } },
  },
  retina_detect: true,
});

// Main tabs and content
const mainTabs = document.querySelectorAll('#main-tabs .tab-btn');
const mainTabContents = document.querySelectorAll('#tab-contents > div');
const dynamicTabBar = document.getElementById('dynamic-tab-bar');
const dynamicTabContents = document.getElementById('dynamic-tab-contents');

let dynamicTabs = []; // Array to track dynamic tabs

// Switch main tabs
mainTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    mainTabs.forEach(b => b.classList.remove('active'));
    mainTabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const tabId = btn.dataset.tab;
    document.getElementById(tabId).classList.add('active');

    // Hide all dynamic tabs on main tab switch
    deactivateDynamicTabs();
  });
});

// Deactivate all dynamic tabs
function deactivateDynamicTabs() {
  dynamicTabBar.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  dynamicTabContents.querySelectorAll('div').forEach(c => c.classList.remove('active'));
}

// Activate a dynamic tab by id
function activateDynamicTab(id) {
  dynamicTabBar.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.id === id));
  dynamicTabContents.querySelectorAll('div').forEach(c => c.classList.toggle('active', c.dataset.id === id));
}

// Add a new dynamic tab (or activate if already exists)
function addDynamicTab(url, title) {
  // Check if already open
  const existing = dynamicTabs.find(t => t.url === url);
  if (existing) {
    activateDynamicTab(existing.id);
    return;
  }

  const id = 'dyn-tab-' + (dynamicTabs.length + 1);

  // Create tab button
  const btn = document.createElement('button');
  btn.textContent = title;
  btn.dataset.id = id;

  // Close button
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '✕';
  btn.appendChild(closeBtn);

  closeBtn.addEventListener('click', e => {
    e.stopPropagation();
    removeDynamicTab(id);
  });

  btn.addEventListener('click', () => {
    activateDynamicTab(id);
  });

  dynamicTabBar.appendChild(btn);

  // Create content container
  const tabContent = document.createElement('div');
  tabContent.dataset.id = id;
  tabContent.classList.add('tab-content');

  const iframe = document.createElement('iframe');
  iframe.src = url;
  tabContent.appendChild(iframe);

  dynamicTabContents.appendChild(tabContent);

  dynamicTabs.push({ id, url, title });
  activateDynamicTab(id);

  // Deselect main tabs
  mainTabs.forEach(b => b.classList.remove('active'));
  mainTabContents.forEach(c => c.classList.remove('active'));
}

// Remove a dynamic tab by id
function removeDynamicTab(id) {
  const index = dynamicTabs.findIndex(t => t.id === id);
  if (index === -1) return;

  const btn = dynamicTabBar.querySelector(`button[data-id="${id}"]`);
  const content = dynamicTabContents.querySelector(`div[data-id="${id}"]`);

  if (btn) btn.remove();
  if (content) content.remove();

  dynamicTabs.splice(index, 1);

  // Activate last tab or fallback to Settings tab
  if (dynamicTabs.length > 0) {
    activateDynamicTab(dynamicTabs[dynamicTabs.length - 1].id);
  } else {
    mainTabs.forEach(b => b.classList.remove('active'));
    mainTabContents.forEach(c => c.classList.remove('active'));
    document.getElementById('settings').classList.add('active');
    document.querySelector('#main-tabs .tab-btn[data-tab="settings"]').classList.add('active');
  }
}

// Hook click events on apps/games/os items to open dynamic tabs
document.querySelectorAll('.app-item, .game-item, .os-item').forEach(item => {
  item.addEventListener('click', () => {
    const url = item.dataset.url;
    const title = item.dataset.title || 'New Tab';
    if (url) addDynamicTab(url, title);
  });
});

// Browser tab Go button logic
const browserTab = document.getElementById('browser');
if (browserTab) {
  const goBtn = browserTab.querySelector('#browser-go');
  const urlInput = browserTab.querySelector('#browser-url');

  goBtn.addEventListener('click', () => {
    let url = urlInput.value.trim();
    if (!url) {
      alert('Please enter a URL.');
      return;
    }
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    addDynamicTab(url, url);
    urlInput.value = '';
  });

  urlInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      goBtn.click();
    }
  });
}
