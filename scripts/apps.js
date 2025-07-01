document.addEventListener('DOMContentLoaded', function() {
    // Sample app data
    const apps = [
        {
            name: "Facebook",
            icon: "fab fa-facebook",
            categories: ["social"]
        },
        {
            name: "Twitter",
            icon: "fab fa-twitter",
            categories: ["social"]
        },
        {
            name: "Instagram",
            icon: "fab fa-instagram",
            categories: ["social"]
        },
        {
            name: "YouTube",
            icon: "fab fa-youtube",
            categories: ["entertainment", "social"]
        },
        {
            name: "Netflix",
            icon: "fab fa-netflix",
            categories: ["entertainment"]
        },
        {
            name: "Spotify",
            icon: "fab fa-spotify",
            categories: ["entertainment"]
        },
        {
            name: "Trello",
            icon: "fab fa-trello",
            categories: ["productivity"]
        },
        {
            name: "Slack",
            icon: "fab fa-slack",
            categories: ["productivity"]
        },
        {
            name: "Google Drive",
            icon: "fab fa-google-drive",
            categories: ["productivity"]
        },
        {
            name: "Duolingo",
            icon: "fas fa-language",
            categories: ["education"]
        },
        {
            name: "Coursera",
            icon: "fas fa-graduation-cap",
            categories: ["education"]
        },
        {
            name: "Khan Academy",
            icon: "fas fa-book-open",
            categories: ["education"]
        },
        {
            name: "WhatsApp",
            icon: "fab fa-whatsapp",
            categories: ["social"]
        },
        {
            name: "Zoom",
            icon: "fas fa-video",
            categories: ["productivity"]
        },
        {
            name: "Dropbox",
            icon: "fab fa-dropbox",
            categories: ["productivity"]
        }
    ];

    const appsGrid = document.getElementById('apps-grid');
    const searchInput = document.getElementById('app-search');
    const searchBtn = document.getElementById('search-btn');
    const categoryButtons = document.querySelectorAll('.category-btn');

    let currentCategory = 'all';
    let currentSearchTerm = '';

    // Initialize the app grid
    function renderApps() {
        appsGrid.innerHTML = '';
        
        const filteredApps = apps.filter(app => {
            const matchesCategory = currentCategory === 'all' || app.categories.includes(currentCategory);
            const matchesSearch = app.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredApps.length === 0) {
            appsGrid.innerHTML = '<p class="no-results">No apps found matching your criteria.</p>';
            return;
        }

        filteredApps.forEach(app => {
            const appCard = document.createElement('div');
            appCard.className = 'app-card';
            appCard.dataset.categories = app.categories.join(' ');
            appCard.dataset.name = app.name;
            
            appCard.innerHTML = `
                <div class="app-icon"><i class="${app.icon}"></i></div>
                <div class="app-name">${app.name}</div>
            `;
            
            // Add click event to each app card
            appCard.addEventListener('click', function() {
                alert(`Opening ${app.name}`);
                // In a real app, you would navigate to the app or open it
            });
            
            appsGrid.appendChild(appCard);
        });
    }

    // Search functionality
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

    // Category filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            renderApps();
        });
    });

    // Initial render
    renderApps();
});
