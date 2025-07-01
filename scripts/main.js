// Initialize the site
document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize browser functionality if on home page
    if (currentPage === 'index.html') {
        initBrowser();
    }

    // Load saved settings
    loadSettings();
});

// Initialize the unblocked browser
function initBrowser() {
    const urlInput = document.getElementById('url-input');
    const goButton = document.getElementById('go-button');
    const newTabButton = document.getElementById('new-tab-button');
    const browserFrame = document.getElementById('browser-frame');

    // Load default page
    browserFrame.src = 'https://google.com';

    // Go button functionality
    goButton.addEventListener('click', function() {
        let url = urlInput.value.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        try {
            browserFrame.src = url;
        } catch (e) {
            showToast('Invalid URL', 'error');
        }
    });

    // New tab button functionality
    newTabButton.addEventListener('click', function() {
        let url = urlInput.value.trim() || 'https://google.com';
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        window.open(url, '_blank');
    });

    // Handle Enter key in URL input
    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            goButton.click();
        }
    });

    // Update URL input when frame navigates
    browserFrame.addEventListener('load', function() {
        try {
            urlInput.value = browserFrame.contentWindow.location.href;
        } catch (e) {
            // Cross-origin security exception
            urlInput.value = browserFrame.src;
        }
    });
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Settings management
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('dna_settings')) || {};
    
    // Apply theme color if set
    if (settings.themeColor) {
        document.documentElement.style.setProperty('--primary', settings.themeColor);
    }
    
    // Apply tab cloaking if active
    if (settings.tabCloak) {
        applyCloak(settings.tabCloak, settings.customCloak);
    }
}

function saveSettings(settings) {
    localStorage.setItem('dna_settings', JSON.stringify(settings));
    loadSettings(); // Reload settings to apply changes
}
