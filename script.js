document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTabs();
    initBrowser();
    initCloak();
    initVisitorCounter();
    initServerStatus();
    renderAllContent();

    // Tab functionality
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const contentSections = document.querySelectorAll('.content-section');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and sections
                tabButtons.forEach(btn => btn.classList.remove('active'));
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding section
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Activate Home tab by default
        document.querySelector('.tab-button[data-tab="home"]').classList.add('active');
        document.getElementById('home').classList.add('active');
    }

    // Browser functionality
    function initBrowser() {
        const browserGoBtn = document.getElementById('browser-go');
        const browserUrlInput = document.getElementById('browser-url');
        const browserFrame = document.getElementById('browser-frame');
        const browserFeedback = document.getElementById('browser-feedback');
        
        if (browserGoBtn && browserUrlInput && browserFrame) {
            browserGoBtn.addEventListener('click', loadUrl);
            browserUrlInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') loadUrl();
            });
            
            function loadUrl() {
                let url = browserUrlInput.value.trim();
                
                if (!url) {
                    browserFeedback.textContent = 'Please enter a URL';
                    browserFeedback.className = 'error';
                    return;
                }
                
                // Add https:// if missing
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }
                
                try {
                    browserFrame.src = url;
                    browserFeedback.textContent = `Loading: ${url}`;
                    browserFeedback.className = 'success';
                } catch (error) {
                    browserFeedback.textContent = `Error loading: ${url}`;
                    browserFeedback.className = 'error';
                    console.error('Browser error:', error);
                }
            }
        }
    }

    // Cloak functionality
    function initCloak() {
        const applyCloakBtn = document.getElementById('apply-cloak');
        const cloakTitleInput = document.getElementById('cloak-title');
        const cloakFaviconInput = document.getElementById('cloak-favicon');
        const cloakFeedback = document.getElementById('cloak-feedback');
        
        if (applyCloakBtn) {
            applyCloakBtn.addEventListener('click', function() {
                let hasChanges = false;
                
                // Update title if provided
                if (cloakTitleInput.value.trim()) {
                    document.title = cloakTitleInput.value.trim();
                    hasChanges = true;
                }
                
                // Update favicon if provided
                if (cloakFaviconInput.value.trim()) {
                    const faviconUrl = cloakFaviconInput.value.trim();
                    let link = document.querySelector("link[rel='icon']");
                    
                    if (!link) {
                        link = document.createElement('link');
                        link.rel = 'icon';
                        document.head.appendChild(link);
                    }
                    
                    link.href = faviconUrl;
                    hasChanges = true;
                }
                
                // Provide feedback
                if (hasChanges) {
                    cloakFeedback.textContent = 'Cloak applied successfully!';
                    cloakFeedback.className = 'success';
                } else {
                    cloakFeedback.textContent = 'Please enter a title or favicon URL';
                    cloakFeedback.className = 'error';
                }
            });
        }
    }

    // Visitor counter
    function initVisitorCounter() {
        const counterElement = document.getElementById('visitor-counter');
        if (counterElement) {
            let count = localStorage.getItem('visitorCount') || 0;
            count = parseInt(count) + 1;
            localStorage.setItem('visitorCount', count);
            counterElement.textContent = count;
        }
    }

    // Server status
    function initServerStatus() {
        const statusImage = document.getElementById('server-status-image');
        if (statusImage) {
            // Simulate server status (replace with actual API call)
            const isOnline = Math.random() > 0.3;
            statusImage.src = isOnline 
                ? 'https://via.placeholder.com/24/00FF00?text=ON' 
                : 'https://via.placeholder.com/24/FF0000?text=OFF';
            statusImage.alt = isOnline ? 'Server Online' : 'Server Offline';
        }
    }

    // Content rendering
    function renderAllContent() {
        const contentData = {
            games: [
                { name: "Geometry Dash", url: "https://geometrydash.io", image: "https://via.placeholder.com/150?text=Geometry+Dash" },
                { name: "Slope", url: "https://slope-game.io", image: "https://via.placeholder.com/150?text=Slope" }
            ],
            oss: [
                { name: "Windows 10", url: "#", image: "https://via.placeholder.com/150?text=Windows+10" },
                { name: "Ubuntu", url: "#", image: "https://via.placeholder.com/150?text=Ubuntu" }
            ],
            apps: [
                { name: "Calculator", url: "#", image: "https://via.placeholder.com/150?text=Calculator" },
                { name: "Text Editor", url: "#", image: "https://via.placeholder.com/150?text=Text+Editor" }
            ],
            bookmarklets: [
                { name: "Dark Mode", code: "javascript:(function(){document.body.style.filter='invert(1) hue-rotate(180deg)';})();" },
                { name: "Highlight Text", code: "javascript:(function(){let s=window.getSelection();s.anchorNode.parentElement.style.backgroundColor='yellow';})();" }
            ],
            credits: [
                { name: "John Doe", role: "Developer" },
                { name: "Jane Smith", role: "Designer" }
            ],
            partners: [
                { name: "Cool Arcade", url: "#", image: "https://via.placeholder.com/150?text=Cool+Arcade" },
                { name: "Game Hub", url: "#", image: "https://via.placeholder.com/150?text=Game+Hub" }
            ],
            suggestions: [
                { text: "Add more multiplayer games" },
                { text: "Include a chat feature" }
            ]
        };

        renderSection('games-list', contentData.games, 'game');
        renderSection('oss-list', contentData.oss, 'os');
        renderSection('apps-list', contentData.apps, 'app');
        renderSection('bookmarklets-list', contentData.bookmarklets, 'bookmarklet');
        renderSection('credits-list', contentData.credits, 'credit');
        renderSection('partners-list', contentData.partners, 'partner');
        renderSection('suggestions-list', contentData.suggestions, 'suggestion');
    }

    function renderSection(containerId, items, type) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            
            if (type === 'bookmarklet') {
                card.className += ' text-only';
                card.innerHTML = `
                    <h3>${item.name}</h3>
                    <a href="${item.code}" class="text-[#9d4edd] hover:underline">Drag to bookmarks</a>
                `;
            } 
            else if (type === 'credit') {
                card.className += ' text-only';
                card.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.role}</p>
                `;
            }
            else if (type === 'suggestion') {
                card.className += ' text-only';
                card.innerHTML = `<p>${item.text}</p>`;
            }
            else {
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <a href="${item.url}" target="_blank" class="text-[#9d4edd] hover:underline">
                        ${type === 'game' ? 'Play Now' : 'View'}
                    </a>
                `;
            }
            
            container.appendChild(card);
        });
    }
});
