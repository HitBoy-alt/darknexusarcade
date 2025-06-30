// Data (edit here to add new content)
const contentData = {
    // Games: Add new games with name, url, and image
    games: [
        { name: "Sample Game 1", url: "https://example.com/game1", image: "https://via.placeholder.com/150?text=Game1" },
        { name: "Sample Game 2", url: "https://example.com/game2", image: "https://via.placeholder.com/150?text=Game2" }
        // Add new game: { name: "New Game", url: "https://example.com/newgame", image: "https://via.placeholder.com/150?text=NewGame" }
    ],
    // OSs: Add new operating systems with name, url, and image
    oss: [
        { name: "Sample OS 1", url: "https://example.com/os1", image: "https://via.placeholder.com/150?text=OS1" },
        { name: "Sample OS 2", url: "https://example.com/os2", image: "https://via.placeholder.com/150?text=OS2" }
        // Add new OS: { name: "New OS", url: "https://example.com/newos", image: "https://via.placeholder.com/150?text=NewOS" }
    ],
    // Apps: Add new apps with name, url, and image
    apps: [
        { name: "Sample App 1", url: "https://example.com/app1", image: "https://via.placeholder.com/150?text=App1" },
        { name: "Sample App 2", url: "https://example.com/app2", image: "https://via.placeholder.com/150?text=App2" }
        // Add new app: { name: "New App", url: "https://example.com/newapp", image: "https://via.placeholder.com/150?text=NewApp" }
    ],
    // Bookmarklets: Add new bookmarklets with name and code
    bookmarklets: [
        { name: "Dark Mode Toggle", code: "javascript:(function(){document.body.style.filter='invert(1) hue-rotate(180deg)';})();" },
        { name: "Highlight Text", code: "javascript:(function(){let s=window.getSelection();s.anchorNode.parentElement.style.backgroundColor='yellow';})();" }
        // Add new bookmarklet: { name: "New Bookmarklet", code: "javascript:(function(){/* code here */})();" }
    ],
    // Credits: Add new credits with name and role
    credits: [
        { name: "John Doe", role: "Developer" },
        { name: "Jane Smith", role: "Designer" }
        // Add new credit: { name: "New Person", role: "New Role" }
    ],
    // Partners: Add new partners with name, url, and image
    partners: [
        { name: "Partner Site 1", url: "https://example.com", image: "https://via.placeholder.com/150?text=Partner1" },
        { name: "Partner Site 2", url: "https://example.com", image: "https://via.placeholder.com/150?text=Partner2" }
        // Add new partner: { name: "New Partner", url: "https://example.com/newpartner", image: "https://via.placeholder.com/150?text=NewPartner" }
    ],
    // Suggestions: Add new suggestions with text
    suggestions: [
        { text: "Add more multiplayer games" },
        { text: "Include a chat feature for users" },
        { text: "Support for custom themes" }
        // Add new suggestion: { text: "New suggestion text" }
    ]
};

// Initialize visitor counter
function initVisitorCounter() {
    try {
        const visitorCounter = document.getElementById('visitor-counter');
        if (!visitorCounter) throw new Error('Visitor counter element not found');
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
        if (!statusImage) throw new Error('Server status image not found');
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
                div.className += ' text-only';
                div.innerHTML = `<h3 class="text-lg font-semibold">${item.name}</h3><a href="${item.code}" class="text-[#9d4edd] hover:underline">Drag to Bookmarks</a>`;
            } else if (type === 'credit') {
                div.className += ' text-only';
                div.innerHTML = `<h3 class="text-lg font-semibold">${item.name}</h3><p>${item.role}</p>`;
            } else if (type === 'suggestion') {
                div.className += ' text-only';
                div.innerHTML = `<p class="text-base">${item.text}</p>`;
            } else {
                const img = document.createElement('img');
                img.src = item.image || 'https://via.placeholder.com/150?text=No+Image';
                img.alt = item.name;
                img.className = 'w-full h-32 object-cover rounded';
                if (type === 'game' || type === 'os' || type === 'app' || type === 'partner') {
                    img.addEventListener('click', () => openPlayer(type, item));
                }
                div.appendChild(img);
                div.innerHTML += `<h3 class="text-lg font-semibold mt-2">${item.name}</h3>`;
            }
            container.appendChild(div);
        });
    } catch (error) {
        console.error(`Failed to render items for ${containerId}:`, error);
    }
}

// Open game/app/os/partner in new tab
function openPlayer(type, item) {
    try {
        if (!item.url) throw new Error(`No URL provided for ${type}: ${item.name}`);
        // Open in new tab with maximized window
        const newWindow = window.open(item.url, '_blank');
        if (newWindow) {
            newWindow.focus();
            // Attempt to maximize the window (browser-dependent)
            newWindow.moveTo(0, 0);
            newWindow.resizeTo(screen.width, screen.height);
        } else {
            console.error('Failed to open new window. Pop-up blocker may be enabled.');
        }
    } catch (error) {
        console.error(`Failed to open player for ${type}:`, error);
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
                    // Fallback to Home
                    const homeSection = document.getElementById('home');
                    if (homeSection) homeSection.classList.add('active');
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

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    try {
        initVisitorCounter();
        initServerStatus();
        initTabs();
        initCloak();

        // Render initial content
        renderItems('games-list', contentData.games, 'game');
        renderItems('oss-list', contentData.oss, 'os');
        renderItems('apps-list', contentData.apps, 'app');
        renderItems('bookmarklets-list', contentData.bookmarklets, 'bookmarklet');
        renderItems('credits-list', contentData.credits, 'credit');
        renderItems('partners-list', contentData.partners, 'partner');
        renderItems('suggestions-list', contentData.suggestions, 'suggestion');
    } catch (error) {
        console.error('Main initialization failed:', error);
    }
});
