// Initialize particles.js background
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#b19cd9" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000" }
    },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#9b59b6",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// Tabs functionality + save last tab
const buttons = document.querySelectorAll('.tab-btn');
const tabs = document.querySelectorAll('.tab-content');

// Load last active tab from localStorage
const lastTab = localStorage.getItem('lastActiveTab');
if (lastTab) {
  buttons.forEach(b => b.classList.remove('active'));
  tabs.forEach(t => t.classList.remove('active'));
  const activeBtn = [...buttons].find(b => b.dataset.tab === lastTab);
  const activeTab = document.getElementById(lastTab);
  if (activeBtn && activeTab) {
    activeBtn.classList.add('active');
    activeTab.classList.add('active');
  }
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');

    // Save to localStorage
    localStorage.setItem('lastActiveTab', tabId);
  });
});

// Embedded iframe for Apps & Games
function setupIframe(tabId, iframeId) {
  const tab = document.getElementById(tabId);
  const iframe = document.getElementById(iframeId);
  const appItems = tab.querySelectorAll('.app-item');

  appItems.forEach(item => {
    item.addEventListener('click', () => {
      const url = item.dataset.url;
      if (iframe.src === url) {
        iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
      } else {
        iframe.src = url;
        iframe.style.display = 'block';
      }
      // Scroll iframe into view
      iframe.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
setupIframe('apps', 'app-iframe');
setupIframe('games', 'game-iframe');

// Bookmarks - load/save
const bookmarkForm = document.getElementById('bookmark-form');
const bookmarksList = document.getElementById('bookmarks-list');

function loadBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  bookmarksList.innerHTML = '';
  if (bookmarks.length === 0) {
    bookmarksList.innerHTML = '<p>No bookmarks yet.</p>';
    return;
  }
  bookmarks.forEach(bm => {
    const a = document.createElement('a');
    a.href = bm.url;
    a.target = "_blank";
    a.textContent = bm.title;
    bookmarksList.appendChild(a);
  });
}
loadBookmarks();

bookmarkForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('bookmark-title').value.trim();
  const url = document.getElementById('bookmark-url').value.trim();

  if (!title || !url) return alert('Please enter both title and URL.');
  if (!/^https?:\/\//.test(url)) return alert('URL must start with http:// or https://');

  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  bookmarks.push({ title, url });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  loadBookmarks();
  bookmarkForm.reset();
});
