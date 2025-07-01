// Home tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Featured content data
    const featuredData = {
        games: [
            {
                name: "Slope",
                image: "https://via.placeholder.com/300x150?text=Slope",
                description: "Navigate a 3D course at high speeds",
                url: "#",
                category: "action"
            },
            {
                name: "1v1.LOL",
                image: "https://via.placeholder.com/300x150?text=1v1.LOL",
                description: "Battle royale and building game",
                url: "#",
                category: "battle"
            },
            {
                name: "Friday Night Funkin'",
                image: "https://via.placeholder.com/300x150?text=FNF",
                description: "Rhythm music game with cool characters",
                url: "#",
                category: "music"
            },
            {
                name: "Minecraft Classic",
                image: "https://via.placeholder.com/300x150?text=Minecraft",
                description: "Build and explore blocky worlds",
                url: "#",
                category: "adventure"
            }
        ],
        apps: [
            {
                name: "YouTube",
                image: "https://via.placeholder.com/300x150?text=YouTube",
                description: "Watch and share videos",
                url: "#",
                category: "entertainment"
            },
            {
                name: "Discord",
                image: "https://via.placeholder.com/300x150?text=Discord",
                description: "Chat with friends and communities",
                url: "#",
                category: "social"
            },
            {
                name: "Spotify",
                image: "https://via.placeholder.com/300x150?text=Spotify",
                description: "Stream music and podcasts",
                url: "#",
                category: "music"
            },
            {
                name: "Google Drive",
                image: "https://via.placeholder.com/300x150?text=Google+Drive",
                description: "Cloud storage and file sharing",
                url: "#",
                category: "productivity"
            }
        ],
        tools: [
            {
                name: "Proxy Service",
                image: "https://via.placeholder.com/300x150?text=Proxy",
                description: "Access blocked content securely",
                url: "#",
                category: "utility"
            },
            {
                name: "Tab Cloaker",
                image: "https://via.placeholder.com/300x150?text=Cloaker",
                description: "Disguise your browsing activity",
                url: "#",
                category: "privacy"
            },
            {
                name: "Bookmarklets",
                image: "https://via.placeholder.com/300x150?text=Bookmarklets",
                description: "Powerful browser shortcuts",
                url: "#",
                category: "tools"
            },
            {
                name: "VPN Guide",
                image: "https://via.placeholder.com/300x150?text=VPN",
                description: "Learn about secure browsing",
                url: "#",
                category: "education"
            }
        ]
    };

    // Initialize home tab
    initHomeTab();

    function initHomeTab() {
        loadFeaturedContent('games');
        setupFeaturedTabs();
        setupHeroButtons();
        animateStats();
    }

    // Load featured content based on category
    function loadFeaturedContent(category) {
        const grid = document.getElementById('featured-grid');
        if (!grid) return;

        grid.innerHTML = '';

        const items = featuredData[category] || [];
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'featured-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="featured-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <a href="${item.url}" class="btn">View</a>
                </div>
            `;
            grid.appendChild(itemElement);
        });
    }

    // Setup featured content tabs
    function setupFeaturedTabs() {
        const tabs = document.querySelectorAll('.featured-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const category = tab.getAttribute('data-category');
                loadFeaturedContent(category);
            });
        });
    }

    // Setup hero section buttons
    function setupHeroButtons() {
        const exploreBtn = document.getElementById('explore-btn');
        const learnMoreBtn = document.getElementById('learn-more-btn');

        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                // Switch to games tab
                const event = new CustomEvent('switchTab', { detail: 'games' });
                document.dispatchEvent(event);
            });
        }

        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                // Scroll to features section
                document.querySelector('.featured-section').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }

    // Animate stats counters
    function animateStats() {
        const stats = [
            { id: 'games-count', target: 150, duration: 2000 },
            { id: 'apps-count', target: 50, duration: 2000 },
            { id: 'users-count', target: 10000, duration: 2000 },
            { id: 'uptime', target: 99.9, duration: 2000, isDecimal: true }
        ];

        stats.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (!element) return;

            const start = 0;
            const increment = stat.target / (stat.duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                    clearInterval(timer);
                    current = stat.target;
                }
                
                if (stat.isDecimal) {
                    element.textContent = current.toFixed(1) + '%';
                } else {
                    element.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });
    }
});

// Custom event listener for tab switching
document.addEventListener('switchTab', function(e) {
    // This will be handled by main.js
    console.log(`Switching to tab: ${e.detail}`);
});
