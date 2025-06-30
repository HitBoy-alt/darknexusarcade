// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and content sections
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Function to switch tabs
    function switchTab(tabId) {
        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Deactivate all tab buttons
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Show the selected content section
        const activeSection = document.getElementById(tabId);
        if (activeSection) {
            activeSection.classList.add('active');
        }
        
        // Activate the clicked tab button
        const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
    
    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Activate the Home tab by default
    const defaultTab = document.querySelector('.tab-button[data-tab="home"]');
    if (defaultTab) {
        defaultTab.classList.add('active');
    }
    document.getElementById('home').classList.add('active');
    
    // Browser functionality
    const browserGoBtn = document.getElementById('browser-go');
    const browserUrlInput = document.getElementById('browser-url');
    const browserFrame = document.getElementById('browser-frame');
    const browserFeedback = document.getElementById('browser-feedback');
    
    if (browserGoBtn && browserUrlInput && browserFrame) {
        browserGoBtn.addEventListener('click', function() {
            let url = browserUrlInput.value.trim();
            
            // Add https:// if missing
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            
            try {
                browserFrame.src = url;
                browserFeedback.textContent = `Loading: ${url}`;
                browserFeedback.style.color = '#9d4edd';
            } catch (error) {
                browserFeedback.textContent = `Error loading: ${url}`;
                browserFeedback.style.color = 'red';
                console.error('Browser error:', error);
            }
        });
        
        // Allow pressing Enter in the URL input
        browserUrlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                browserGoBtn.click();
            }
        });
    }
    
    // Cloak functionality
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
                const link = document.querySelector("link[rel='icon']") || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'icon';
                link.href = faviconUrl;
                document.head.appendChild(link);
                hasChanges = true;
            }
            
            // Provide feedback
            if (hasChanges) {
                cloakFeedback.textContent = 'Cloak applied successfully!';
                cloakFeedback.style.color = '#9d4edd';
            } else {
                cloakFeedback.textContent = 'Please enter a title or favicon URL';
                cloakFeedback.style.color = 'red';
            }
        });
    }
    
    // Sample data population (you can expand this)
    const gamesList = document.getElementById('games-list');
    if (gamesList) {
        const sampleGames = [
            { name: "Geometry Dash", url: "https://geometrydash.io", image: "https://via.placeholder.com/150?text=Geometry+Dash" },
            { name: "Slope", url: "https://slope-game.io", image: "https://via.placeholder.com/150?text=Slope" }
        ];
        
        sampleGames.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.className = 'bg-[#162447] p-4 rounded-lg hover:shadow-lg transition-shadow';
            gameElement.innerHTML = `
                <img src="${game.image}" alt="${game.name}" class="w-full h-32 object-cover rounded">
                <h3 class="mt-2 text-lg font-semibold">${game.name}</h3>
                <a href="${game.url}" target="_blank" class="text-[#9d4edd] hover:underline">Play Now</a>
            `;
            gamesList.appendChild(gameElement);
        });
    }
});
