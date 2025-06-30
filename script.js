// Content data (easy to edit)
const games = [
    { name: "Sample Game 1", url: "https://example.com/game1", image: "https://via.placeholder.com/150?text=Game1" },
    { name: "Sample Game 2", url: "https://example.com/game2", image: "https://via.placeholder.com/150?text=Game2" }
];
const oss = [
    { name: "Sample OS 1", url: "https://example.com/os1", image: "https://via.placeholder.com/150?text=OS1" },
    { name: "Sample OS 2", url: "https://example.com/os2", image: "https://via.placeholder.com/150?text=OS2" }
];
const apps = [
    { name: "Sample App 1", url: "https://example.com/app1", image: "https://via.placeholder.com/150?text=App1" },
    { name: "Sample App 2", url: "https://example.com/app2", image: "https://via.placeholder.com/150?text=App2" }
];
const bookmarklets = [
    { name: "Dark Mode Toggle", code: "javascript:(function(){document.body.style.filter='invert(1) hue-rotate(180deg)';})();" },
    { name: "Highlight Text", code: "javascript:(function(){let s=window.getSelection();s.anchorNode.parentElement.style.backgroundColor='yellow';})();" }
];
const credits = [
    { name: "John Doe", role: "Developer" },
    { name: "Jane Smith", role: "Designer" }
];
const partners = [
    { name: "Partner Site 1", url: "https://example.com", image: "https://via.placeholder.com/150?text=Partner1" },
    { name: "Partner Site 2", url: "https://example.com", image: "https://via.placeholder.com/150?text=Partner2" }
];
const themes = [
    { name: "Dark Purple", bg: "#1a1a2e", accent: "#9d4edd", text: "#e0e0e0" },
    { name: "Midnight Blue", bg: "#0a0c2e", accent: "#4e6edd", text: "#d0d0ff" }
];

// Visitor counter
const visitorCounter = document.getElementById('visitor-counter');
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount = parseInt(visitorCount) + 1;
localStorage.setItem('visitorCount', visitorCount);
visitorCounter.textContent = visitorCount;

// Server status
function updateServerStatus() {
    const statusImage = document.getElementById('server-status-image');
    // Simulate server status (replace with actual API call in production)
    const isOnline = Math.random() > 0.3; // 70% chance of being online for demo
    statusImage.src = isOnline
        ? 'https://via.placeholder.com/24/00FF00?text=ON'
        : 'https://via.placeholder.com/24/FF0000?text=OFF';
    statusImage.alt = isOnline ? 'Server Online' : 'Server Offline';
    statusImage.title = isOnline ? 'Server Online' : 'Server Offline';
}

// Tab switching
const tabs = document.querySelectorAll('.tab-button');
const sections = document.querySelectorAll('.content-section');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Render content
function renderItems(containerId, items, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card p-4 rounded';
        if (type === 'bookmarklet') {
            div.innerHTML = `<h3 class="text-lg font-semibold">${item.name}</h3><a href="${item.code}" class="text-[#9d4edd] hover:underline">Drag to Bookmarks</a>`;
        } else {
            div.innerHTML = `<img src="${item.image}" alt="${item.name}" class="w-full h-32 object-cover rounded"><h3 class="text-lg font-semibold mt-2">${item.name}</h3>`;
            if (type !== 'credit') {
                div.addEventListener('click', () => openPlayer(type, item));
            }
        }
        container.appendChild(div);
    });
}

// Open game/app/os player
function openPlayer(type, item) {
    const player = document.getElementById(`${type}-player`);
    const list = document.getElementById(`${type}s-list`);
    const title = document.getElementById(`${type}-title`);
    const frame = document.getElementById(`${type}-frame`);
    player.classList.remove('hidden');
    list.classList.add('hidden');
    title.textContent = item.name;
    frame.src = item.url;
}

// Back to list
function setupBackButton(type) {
    document.getElementById(`back-to-${type}s`).addEventListener('click', () => {
        document.getElementById(`${type}s-list`).classList.remove('hidden');
        document.getElementById(`${type}-player`).classList.add('hidden');
        document.getElementById(`${type}-frame`).src = '';
    });
}

// Fullscreen toggle
function setupFullscreen(type) {
    const button = document.getElementById(`fullscreen-${type}`);
    const frame = document.getElementById(`${type}-frame`);
    button.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            frame.requestFullscreen().catch(err => console.error(err));
        } else {
            document.exitFullscreen();
        }
    });
}

// Render initial content
renderItems('games-list', games, 'game');
renderItems('oss-list', oss, 'os');
renderItems('apps-list', apps, 'app');
renderItems('bookmarklets-list', bookmarklets, 'bookmarklet');
renderItems('partners-list', partners, 'partner');
renderItems('credits-list', credits.map(c => ({ name: `${c.name} - ${c.role}`, image: 'none' })), 'credit');

// Setup back buttons and fullscreen
setupBackButton('game');
setupBackButton('os');
setupBackButton('app');
setupFullscreen('game');
setupFullscreen('os');
setupFullscreen('app');

// Cloak functionality
document.getElementById('apply-cloak').addEventListener('click', () => {
    const title = document.getElementById('cloak-title').value;
    const favicon = document.getElementById('cloak-favicon').value;
    if (title) document.title = title;
    if (favicon) document.querySelector('link[rel="icon"]').href = favicon;
});

// Theme switching
const themesList = document.getElementById('themes-list');
themes.forEach(theme => {
    const div = document.createElement('div');
    div.className = 'theme-option';
    div.textContent = theme.name;
    div.addEventListener('click', () => {
        document.body.style.backgroundColor = theme.bg;
        document.body.style.color = theme.text;
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.style.color = theme.accent;
        });
        document.querySelectorAll('.item-card').forEach(card => {
            card.style.borderColor = theme.accent;
        });
        document.getElementById('server-status-image').style.borderColor = theme.accent;
    });
    themesList.appendChild(div);
});

// Set default tab
document.querySelector('.tab-button[data-tab="home"]').click();

// Initialize server status
updateServerStatus();
