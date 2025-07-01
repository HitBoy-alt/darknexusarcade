document.addEventListener('DOMContentLoaded', function() {
    // Sample app data
    const apps = [
        { name: "Facebook", icon: "fab fa-facebook" },
        { name: "Twitter", icon: "fab fa-twitter" },
        { name: "Instagram", icon: "fab fa-instagram" },
        { name: "YouTube", icon: "fab fa-youtube" },
        { name: "Netflix", icon: "fab fa-netflix" },
        { name: "Spotify", icon: "fab fa-spotify" },
        { name: "Trello", icon: "fab fa-trello" },
        { name: "Slack", icon: "fab fa-slack" },
        { name: "Google Drive", icon: "fab fa-google-drive" },
        { name: "Duolingo", icon: "fas fa-language" },
        { name: "Coursera", icon: "fas fa-graduation-cap" },
        { name: "Khan Academy", icon: "fas fa-book-open" },
        { name: "WhatsApp", icon: "fab fa-whatsapp" },
        { name: "Zoom", icon: "fas fa-video" },
        { name: "Dropbox", icon: "fab fa-dropbox" }
    ];

    const appsGrid = document.getElementById('apps-grid');
    const searchInput = document.getElementById('app-search');
    const searchBtn = document.getElementById('search-btn');

    let currentSearchTerm = '';

    // Render apps (search-only filtering)
    function renderApps() {
        appsGrid.innerHTML = '';

        const filteredApps = apps.filter(app =>
            app.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
        );

        if (filteredApps.length === 0) {
            appsGrid.innerHTML = '<p class="no-results">No apps found matching your search.</p>';
            return;
        }

        filteredApps.forEach(app => {
            const appCard = document.createElement('div');
            appCard.className = 'app-card';
            appCard.dataset.name = app.name;

            appCard.innerHTML = `
                <div class="app-icon"><i class="${app.icon}"></i></div>
                <div class="app-name">${app.name}</div>
            `;

            appCard.addEventListener('click', function() {
                alert(`Opening ${app.name}`);
            });

            appsGrid.appendChild(appCard);
        });
    }

    function handleSearch() {
        currentSearchTerm = searchInput.value.trim();
        renderApps();
    }

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    renderApps();
});
