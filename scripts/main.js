// Tab configuration
const tabs = [
    { id: 'home', name: 'Home', icon: 'fa-home', html: 'tabs/home.html', css: 'styles/home.css', js: 'scripts/home.js' },
    { id: 'games', name: 'Games', icon: 'fa-gamepad', html: 'tabs/games.html', css: 'styles/games.css', js: 'scripts/games.js' },
    { id: 'apps', name: 'Apps', icon: 'fa-mobile-alt', html: 'tabs/apps.html', css: 'styles/apps.css', js: 'scripts/apps.js' },
    { id: 'oss', name: 'OS\'s', icon: 'fa-desktop', html: 'tabs/oss.html', css: 'styles/oss.css', js: 'scripts/oss.js' },
    { id: 'proxies', name: 'Proxies', icon: 'fa-shield-alt', html: 'tabs/proxies.html', css: 'styles/proxies.css', js: 'scripts/proxies.js' },
    { id: 'settings', name: 'Settings', icon: 'fa-cog', html: 'tabs/settings.html', css: 'styles/settings.css', js: 'scripts/settings.js' },
    { id: 'bookmarklets', name: 'Bookmarklets', icon: 'fa-bookmark', html: 'tabs/bookmarklets.html', css: 'styles/bookmarklets.css', js: 'scripts/bookmarklets.js' },
    { id: 'credits', name: 'Credits', icon: 'fa-award', html: 'tabs/credits.html', css: 'styles/credits.css', js: 'scripts/credits.js' },
    { id: 'partners', name: 'Partners', icon: 'fa-handshake', html: 'tabs/partners.html', css: 'styles/partners.css', js: 'scripts/partners.js' },
    { id: 'suggestions', name: 'Suggestions', icon: 'fa-lightbulb', html: 'tabs/suggestions.html', css: 'styles/suggestions.css', js: 'scripts/suggestions.js' },
    { id: 'discord', name: 'Discord', icon: 'fa-discord', html: 'tabs/discord.html', css: 'styles/discord.css', js: 'scripts/discord.js' }
];

// Load tabs and content
async function initializeApp() {
    // Create tab buttons
    const tabContainer = document.getElementById('tab-container');
    tabs.forEach(tab => {
        const button = document.createElement('button');
        button.className = 'tab-btn';
        button.setAttribute('data-tab', tab.id);
        button.innerHTML = `<i class="fas ${tab.icon}"></i> ${tab.name}`;
        tabContainer.appendChild(button);
    });

    // Load tab content
    await loadTabContent('home'); // Load home by default

    // Add tab switching event listeners
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            loadTabContent(tabId);
            localStorage.setItem('lastActiveTab', tabId);
        });
    });

    // Check for last active tab
    const lastActiveTab = localStorage.getItem('lastActiveTab');
    if (lastActiveTab && tabs.some(tab => tab.id === lastActiveTab)) {
        loadTabContent(lastActiveTab);
    }

    // Footer event listeners
    document.getElementById('privacy-policy').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Privacy policy would be displayed here.');
    });

    document.getElementById('terms-of-service').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Terms of service would be displayed here.');
    });

    document.getElementById('contact-us').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Contact information would be displayed here.');
    });
}

// Load tab content dynamically
async function loadTabContent(tabId) {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;

    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        }
    });

    // Load HTML content
    const contentContainer = document.getElementById('tab-content-container');
    try {
        const response = await fetch(tab.html);
        if (!response.ok) throw new Error('Failed to load tab content');
        contentContainer.innerHTML = await response.text();
        
        // Create and load CSS
        const existingStyle = document.getElementById(`tab-style-${tabId}`);
        if (!existingStyle) {
            const style = document.createElement('link');
            style.id = `tab-style-${tabId}`;
            style.rel = 'stylesheet';
            style.href = tab.css;
            document.head.appendChild(style);
        }
        
        // Load JS module
        const existingScript = document.getElementById(`tab-script-${tabId}`);
        if (existingScript) existingScript.remove();
        
        if (tab.js) {
            const script = document.createElement('script');
            script.id = `tab-script-${tabId}`;
            script.src = tab.js;
            script.type = 'module';
            document.body.appendChild(script);
        }
    } catch (error) {
        console.error(`Error loading tab ${tabId}:`, error);
        contentContainer.innerHTML = `<div class="error-message"><h2>Error Loading Content</h2><p>Could not load the ${tab.name} tab. Please try again later.</p></div>`;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', initializeApp);
