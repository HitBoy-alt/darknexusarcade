document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Sample data for different sections
    const gamesData = [
        { name: 'Slope', image: 'https://via.placeholder.com/150', url: '#' },
        { name: '1v1.LOL', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Temple Run', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Minecraft', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Among Us', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Friday Night Funkin', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Shell Shockers', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Krunker.io', image: 'https://via.placeholder.com/150', url: '#' }
    ];
    
    const appsData = [
        { name: 'YouTube', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Spotify', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Netflix', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Discord', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Twitch', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Reddit', image: 'https://via.placeholder.com/150', url: '#' }
    ];
    
    const ossData = [
        { name: 'Windows 10', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Linux', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'MacOS', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Chrome OS', image: 'https://via.placeholder.com/150', url: '#' }
    ];
    
    const proxiesData = [
        { name: 'Ultraviolet', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Womginx', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Holy Unblocker', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Alloy Proxy', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Node Unblocker', image: 'https://via.placeholder.com/150', url: '#' }
    ];
    
    const creditsData = [
        { name: 'Developer', image: 'https://via.placeholder.com/150', role: 'Main Developer' },
        { name: 'Designer', image: 'https://via.placeholder.com/150', role: 'UI/UX Designer' },
        { name: 'Contributor 1', image: 'https://via.placeholder.com/150', role: 'Game Collection' },
        { name: 'Contributor 2', image: 'https://via.placeholder.com/150', role: 'Proxy Setup' }
    ];
    
    const partnersData = [
        { name: 'GameHub', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Proxy Masters', image: 'https://via.placeholder.com/150', url: '#' },
        { name: 'Unblock Network', image: 'https://via.placeholder.com/150', url: '#' }
    ];
    
    // Function to populate grid
    function populateGrid(containerId, data, isLink = true) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        data.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'grid-item';
            
            if (isLink) {
                itemElement.innerHTML = `
                    <a href="${item.url}" target="_blank">
                        <img src="${item.image}" alt="${item.name}">
                        <h3>${item.name}</h3>
                    </a>
                `;
            } else {
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.role}</p>
                `;
            }
            
            container.appendChild(itemElement);
        });
    }
    
    // Populate all grids
    populateGrid('games-grid', gamesData);
    populateGrid('apps-grid', appsData);
    populateGrid('oss-grid', ossData);
    populateGrid('proxies-grid', proxiesData);
    populateGrid('credits-grid', creditsData, false);
    populateGrid('partners-grid', partnersData);
    
    // Tab cloaker functionality
    const applyCloakBtn = document.getElementById('apply-cloak');
    const resetCloakBtn = document.getElementById('reset-cloak');
    const cloakTitleInput = document.getElementById('cloak-title');
    const cloakIconInput = document.getElementById('cloak-icon');
    
    applyCloakBtn.addEventListener('click', () => {
        const newTitle = cloakTitleInput.value || 'Dark Nexus Arcade';
        const newIcon = cloakIconInput.value;
        
        document.title = newTitle;
        
        if (newIcon) {
            const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = newIcon;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        
        alert('Tab cloaking applied!');
    });
    
    resetCloakBtn.addEventListener('click', () => {
        document.title = 'Dark Nexus Arcade';
        const link = document.querySelector("link[rel*='icon']");
        if (link) {
            link.href = 'favicon.ico';
        }
        cloakTitleInput.value = '';
        cloakIconInput.value = '';
        alert('Tab cloaking reset!');
    });
    
    // Theme selector functionality
    const themeSelector = document.getElementById('theme-selector');
    themeSelector.addEventListener('change', function() {
        const theme = this.value;
        document.body.className = theme;
        
        if (theme === 'default') {
            document.body.style.backgroundColor = '#0a0a1a';
        } else if (theme === 'dark') {
            document.body.style.backgroundColor = '#121212';
        } else if (theme === 'light') {
            document.body.style.backgroundColor = '#f5f5f5';
        } else if (theme === 'red') {
            document.body.style.backgroundColor = '#1a0000';
        } else if (theme === 'green') {
            document.body.style.backgroundColor = '#001a00';
        }
    });
    
    // Background color picker
    const bgColorPicker = document.getElementById('bg-color');
    const applyBgBtn = document.getElementById('apply-bg');
    
    applyBgBtn.addEventListener('click', () => {
        document.body.style.backgroundColor = bgColorPicker.value;
    });
    
    // Copy bookmarklet functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const code = button.getAttribute('data-code');
            navigator.clipboard.writeText(code).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            });
        });
    });
    
    // Submit suggestion functionality
    const suggestionInput = document.getElementById('suggestion-input');
    const submitSuggestionBtn = document.getElementById('submit-suggestion');
    
    submitSuggestionBtn.addEventListener('click', () => {
        if (suggestionInput.value.trim() === '') {
            alert('Please enter your suggestion before submitting.');
            return;
        }
        
        // In a real app, you would send this to a server
        alert('Thank you for your suggestion!');
        suggestionInput.value = '';
    });
    
    // Join Discord button
    const joinDiscordBtn = document.getElementById('join-discord');
    joinDiscordBtn.addEventListener('click', () => {
        // Replace with your actual Discord invite link
        window.open('https://discord.gg/example', '_blank');
    });
    
    // Discord cloaker functionality
    const discordCloakSelect = document.getElementById('discord-cloak-select');
    const applyDiscordCloakBtn = document.getElementById('apply-discord-cloak');
    
    applyDiscordCloakBtn.addEventListener('click', () => {
        const cloakType = discordCloakSelect.value;
        let newTitle = 'Dark Nexus Arcade';
        let newIcon = '';
        
        switch (cloakType) {
            case 'google':
                newTitle = 'Google Docs';
                newIcon = 'https://www.google.com/favicon.ico';
                break;
            case 'drive':
                newTitle = 'Google Drive';
                newIcon = 'https://www.google.com/favicon.ico';
                break;
            case 'classroom':
                newTitle = 'Google Classroom';
                newIcon = 'https://www.google.com/favicon.ico';
                break;
            case 'slides':
                newTitle = 'Google Slides';
                newIcon = 'https://www.google.com/favicon.ico';
                break;
            case 'custom':
                newTitle = prompt('Enter custom title:', 'Dark Nexus Arcade');
                newIcon = prompt('Enter custom icon URL (leave blank for default):', '');
                break;
        }
        
        document.title = newTitle;
        
        if (newIcon) {
            const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = newIcon;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        
        alert('Discord cloaking applied!');
    });
    
    // Footer links
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
});
