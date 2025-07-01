// Apps data
const appsData = [
    {
        name: "YouTube",
        icon: "https://www.google.com/s2/favicons?domain=youtube.com&sz=128",
        category: "entertainment",
        description: "Watch and share videos",
        url: "https://youtube.com"
    },
    {
        name: "Discord",
        icon: "https://www.google.com/s2/favicons?domain=discord.com&sz=128",
        category: "social",
        description: "Voice, video, and text communication",
        url: "https://discord.com"
    },
    {
        name: "Spotify",
        icon: "https://www.google.com/s2/favicons?domain=spotify.com&sz=128",
        category: "entertainment",
        description: "Music streaming service",
        url: "https://spotify.com"
    },
    {
        name: "Netflix",
        icon: "https://www.google.com/s2/favicons?domain=netflix.com&sz=128",
        category: "entertainment",
        description: "Stream TV shows and movies",
        url: "https://netflix.com"
    },
    {
        name: "Google Docs",
        icon: "https://www.google.com/s2/favicons?domain=docs.google.com&sz=128",
        category: "productivity",
        description: "Create and edit documents online",
        url: "https://docs.google.com"
    },
    {
        name: "Google Drive",
        icon: "https://www.google.com/s2/favicons?domain=drive.google.com&sz=128",
        category: "productivity",
        description: "Cloud storage and file sharing",
        url: "https://drive.google.com"
    },
    {
        name: "Reddit",
        icon: "https://www.google.com/s2/favicons?domain=reddit.com&sz=128",
        category: "social",
        description: "Social news aggregation and discussion",
        url: "https://reddit.com"
    },
    {
        name: "Twitch",
        icon: "https://www.google.com/s2/favicons?domain=twitch.tv&sz=128",
        category: "entertainment",
        description: "Live streaming platform",
        url: "https://twitch.tv"
    },
    {
        name: "Khan Academy",
        icon: "https://www.google.com/s2/favicons?domain=khanacademy.org&sz=128",
        category: "education",
        description: "Free online courses and lessons",
        url: "https://khanacademy.org"
    },
    {
        name: "Duolingo",
        icon: "https://www.google.com/s2/favicons?domain=duolingo.com&sz=128",
        category: "education",
        description: "Language learning platform",
        url: "https://duolingo.com"
    },
    {
        name: "Trello",
        icon: "https://www.google.com/s2/favicons?domain=trello.com&sz=128",
        category: "productivity",
        description: "Project management tool",
        url: "https://trello.com"
    },
    {
        name: "Zoom",
        icon: "https://www.google.com/s2/favicons?domain=zoom.us&sz=128",
        category: "social",
        description: "Video conferencing software",
        url: "https://zoom.us"
    }
];

// Initialize apps tab
document.addEventListener('DOMContentLoaded', function() {
    populateAppsGrid();
    setupSearch();
    setupCategoryFilters();
});

// Populate apps grid
function populateAppsGrid(filteredApps = appsData) {
    const container = document.getElementById('apps-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    filteredApps.forEach(app => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.setAttribute('data-category', app.category);
        appCard.innerHTML = `
            <img src="${app.icon}" alt="${app.name}" class="app-icon">
            <h3 class="app-name">${app.name}</h3>
            <span class="app-category">${app.category}</span>
            <p class="app-description">${app.description}</p>
            <a href="${app.url}" target="_blank" class="launch-btn">Launch</a>
        `;
        container.appendChild(appCard);
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('app-search');
    const searchBtn = document.getElementById('search-btn');
    
    const handleSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredApps = appsData.filter(app => 
            app.name.toLowerCase().includes(searchTerm) || 
            app.description.toLowerCase().includes(searchTerm) ||
            app.category.toLowerCase().includes(searchTerm)
        );
        populateAppsGrid(filteredApps);
    };
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    searchBtn.addEventListener('click', handleSearch);
}

// Setup category filters
function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter apps
            const category = btn.getAttribute('data-category');
            if (category === 'all') {
                populateAppsGrid(appsData);
            } else {
                const filteredApps = appsData.filter(app => app.category === category);
                populateAppsGrid(filteredApps);
            }
        });
    });
}
