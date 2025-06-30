// Data
const contentData = {
    games: [
        { name: "Sample Game 1", url: "https://example.com/game1", image: "https://via.placeholder.com/150?text=Game1" },
        { name: "Sample Game 2", url: "https://example.com/game2", image: "https://via.placeholder.com/150?text=Game2" }
    ],
    oss: [
        { name: "Sample OS 1", url: "https://example.com/os1", image: "https://via.placeholder.com/150?text=OS1" },
        { name: "Sample OS 2", url: "https://example.com/os2", image: "https://via.placeholder.com/150?text=OS2" }
    ],
    apps: [
        { name: "Sample App 1", url: "https://example.com/app1", image: "https://via.placeholder.com/150?text=App1" },
        { name: "Sample App 2", url: "https://example.com/app2", image: "https://via.placeholder.com/150?text=App2" }
    ],
    bookmarklets: [
        { name: "Dark Mode Toggle", code: "javascript:(function(){document.body.style.filter='invert(1) hue-rotate(180deg)';})();" },
        { name: "Highlight Text", code: "javascript:(function(){let s=window.getSelection();s.anchorNode.parentElement.style.backgroundColor='yellow';})();" }
    ],
    credits: [
        { name: "John Doe", role: "Developer" },
        { name: "Jane Smith", role: "Designer" }
    ],
    partners: [
        { name: "Partner Site 1", url: "https://example.com", image: "https://via.placeholder.com/150?text=Partner1" },
        { name: "Partner Site 2", url: "https://example.com", image: "https://via.placeholder.com/150?text=Partner2" }
    ],
    themes: [
        { name: "Dark Purple", bg: "#1a1a2e", accent: "#9d4edd", text: "#e0e0e0" },
        { name: "Midnight Blue", bg: "#0a0c2e", accent: "#4e6edd", text: "#d0d0ff" }
    ]
};

// Initialize visitor counter
function initVisitorCounter() {
    try {
        const visitorCounter = document.getElementById('visitor-counter');
        let visitorCount = localStorage.getItem('visitorCount') || 0;
        visitorCount = parseInt(visitorCount) + 1;
        localStorage.setItem('visitorCount', visitorCount);
        visitorCounter.textContent = visitorCount;
    } catch (error) {
        console.error('Visitor counter initialization failed:', error);
    }
}

// Initialize server status
function initServerStatus() {
    try {
        const statusImage = document.getElementById('server-status-image');
        const isOnline = Math.random() > 0.3; // Simulated status (replace with API call)
        statusImage.src = isOnline
            ? 'https://via.placeholder.com/24/00FF00?text=ON'
            : 'https://via.placeholder.com/24/FF0000?text=OFF';
        statusImage.alt = isOnline ? 'Server Online' : 'Server Offline';
        statusImage.title = isOnline ? 'Server Online' : 'Server Offline';
    } catch (error) {
        console.error('Server status initialization failed:', error);
    }
}

// Render content items
function renderItems(containerId, items, type) {
    try {
        const container = document.getElementById(containerId);
        if (!container) throw new Error(`Container ${containerId} not found`);
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
    } catch (error) {
        console.error(`Failed to render items for ${containerId}:`, error);
    }
}

// Open game/app/os player
function openPlayer(type, item) {
    try {
        const player = document.getElementById(`${type}-player`);
        const list = document.getElementById(`${type}s-list`);
        const title = document.getElementById(`${type}-title`);
        const frame = document.getElementById(`${type}-frame`);
        if (!player || !list || !title || !frame) throw new Error(`Player elements for ${type} not found`);
        player.classList.remove('hidden');
        list.classList.add('hidden');
        title.textContent = item.name;
        frame.src = item.url;
    } catch (error) {
        console.error(`Failed to open player for ${type}:`, error);
    }
}

// Setup back button for player
function setupBackButton(type) {
    try {
        const button = document.getElementById(`back-to-${type}s`);
        if (!button) throw new Error(`Back button for ${type} not found`);
        button.addEventListener('click', () => {
            document.getElementById(`${type}s-list`).classList.remove('hidden');
            document.getElementById(`${type}-player`).classList.add('hidden');
            document.getElementById(`${type}-frame`).src = '';
        });
    } catch (error) {
        console.error(`Failed to setup back button for ${type}:`, error);
    }
}

// Setup fullscreen toggle
function setupFullscreen(type) {
    try {
        const button = document.getElementById(`fullscreen-${type}`);
        const frame = document.getElementById(`${type}-frame`);
        if (!button || !frame) throw new Error(`Fullscreen elements for ${type} not found`);
        button.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                frame.requestFullscreen().catch(err => console.error(`Fullscreen error for ${type}:`, err));
            } else {
                document.exitFullscreen();
            }
        });
    } catch (error) {
        console.error(`Failed to setup fullscreen for ${type}:`, error);
    }
}

// Initialize tab navigation
function initTabs() {
    try {
        const tabs = document.querySelectorAll('.tab-button');
        const sections = document.querySelectorAll('.content-section');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                if (!tabId) {
                    console.error('Tab missing data-tab attribute:', tab);
                    return;
                }
                tabs.forEach(t => t.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                tab.classList.add('active');
                const section = document.getElementById(tabId);
                if (section) {
                    section.classList.add('active');
                } else {
                    console.error(`Section ${tabId} not found`);
                }
            });
        });
        // Set Home as default
        const homeTab = document.querySelector('.tab-button[data-tab="home"]');
        if (homeTab) {
            homeTab.classList.add('active');
            document.getElementById('home').classList.add('active');
        } else {
            console.error('Home tab not found');
        }
    } catch (error) {
        console.error('Tab initialization failed:', error);
    }
}

// Initialize cloak functionality
function initCloak() {
    try {
        const applyCloak = document.getElementById('apply-cloak');
        if (!applyCloak) throw new Error('Apply cloak button not found');
        applyCloak.addEventListener('click', () => {
            const title = document.getElementById('cloak-title').value.trim();
            const favicon = document.getElementById('cloak-favicon').value.trim();
            const feedback = document.getElementById('cloak-feedback');
            feedback.textContent = '';
            feedback.className = '';

            // Update title
            if (title) {
                document.title = title;
                feedback.textContent = 'Title updated successfully';
                feedback.className = 'success';
            }

            // Update favicon
            if (favicon) {
                // Validate favicon URL
                const validImageExtensions = ['.png', '.jpg', '.jpeg', '.ico', '.gif'];
                const isValidUrl = validImageExtensions.some(ext => favicon.toLowerCase().endsWith(ext));
                if (!isValidUrl) {
                    feedback.textContent = feedback.textContent
                        ? `${feedback.textContent} | Invalid favicon URL (must end in .png, .jpg, .jpeg, .ico, or .gif)`
                        : 'Invalid favicon URL (must end in .png, .jpg, .jpeg, .ico, or .gif)';
                    feedback.className = 'error';
                    console.error('Invalid favicon URL:', favicon);
                    return;
                }

                const faviconLink = document.querySelector('link[rel="icon"]');
                if (faviconLink) {
                    const cacheBuster = `?t=${new Date().getTime()}`;
                    const faviconUrl = favicon.includes('?') ? `${favicon}&${cacheBuster}` : `${favicon}${cacheBuster}`;
                    const img = new Image();
                    img.onload = () => {
                        faviconLink.href = faviconUrl;
                        feedback.textContent = feedback.textContent
                            ? `${feedback.textContent} | Favicon updated successfully`
                            : 'Favicon updated successfully';
                        feedback.className = 'success';
                    };
                    img.onerror = () => {
                        faviconLink.href = 'https://via.placeholder.com/32.png?text=DNA'; // Fallback favicon
                        feedback.textContent = feedback.textContent
                            ? `${feedback.textContent} | Failed to load favicon, using default`
                            : 'Failed to load favicon, using default';
                        feedback.className = 'error';
                        console.error('Failed to load favicon:', favicon);
                    };
                    img.src = favicon;
                } else {
                    feedback.textContent = feedback.textContent
                        ? `${feedback.textContent} | Favicon link element not found`
                        : 'Favicon link element not found';
                    feedback.className = 'error';
                    console.error('Favicon link element not found');
                }
            } else if (!title) {
                feedback.textContent = 'Please enter a title or favicon URL';
                feedback.className = 'error';
            }
        });
    } catch (error) {
        console.error('Cloak initialization failed:', error);
    }
}

// Initialize theme toggle
function initTheme() {
    try {
        let currentThemeIndex = 0; // Start with Dark Purple
        const toggleTheme = document.getElementById('toggle-theme');
        if (!toggleTheme) throw new Error('Toggle theme button not found');
        toggleTheme.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % contentData.themes.length;
            const theme = contentData.themes[currentThemeIndex];
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
    } catch (error) {
        console.error('Theme initialization failed:', error);
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    try {
        initVisitorCounter();
        initServerStatus();
        initTabs();
        initCloak();
        initTheme();

        // Render initial content
        renderItems('games-list', contentData.games, 'game');
        renderItems('oss-list', contentData.oss, 'os');
        renderItems('apps-list', contentData.apps, 'app');
        renderItems('bookmarklets-list', contentData.bookmarklets, 'bookmarklet');
        renderItems('partners-list', contentData.partners, 'partner');
        renderItems('credits-list', contentData.credits.map(c => ({ name: `${c.name} - ${c.role}`, image: 'none' })), 'credit');

        // Setup back buttons and fullscreen
        setupBackButton('game');
        setupBackButton('os');
        setupBackButton('app');
        setupFullscreen('game');
        setupFullscreen('os');
        setupFullscreen('app');
    } catch (error) {
        console.error('Main initialization failed:', error);
    }
});
