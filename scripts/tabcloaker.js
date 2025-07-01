// Apply tab cloaking
function applyCloak(mode, customTitle = '') {
    let title = '';
    let icon = '';
    
    switch(mode) {
        case 'google':
            title = 'Google Docs';
            icon = 'https://docs.google.com/favicon.ico';
            break;
        case 'wikipedia':
            title = 'Wikipedia';
            icon = 'https://en.wikipedia.org/static/favicon/wikipedia.ico';
            break;
        case 'custom':
            title = customTitle || 'Untitled';
            icon = 'https://google.com/favicon.ico';
            break;
        default:
            // Reset to default
            title = 'Dark Nexus Arcade';
            icon = '/assets/icons/favicon.ico';
    }
    
    // Change title
    document.title = title;
    
    // Change favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icon;
    document.head.appendChild(link);
    
    // Save to settings
    const settings = JSON.parse(localStorage.getItem('dna_settings')) || {};
    settings.tabCloak = mode;
    if (mode === 'custom') settings.customCloak = customTitle;
    localStorage.setItem('dna_settings', JSON.stringify(settings));
    
    showToast(`Tab cloaked as ${title}`, 'success');
}

// Initialize tab cloaking UI
document.addEventListener('DOMContentLoaded', function() {
    const cloakSelect = document.getElementById('cloak-option');
    const customCloak = document.getElementById('custom-cloak');
    
    if (cloakSelect) {
        // Show/hide custom title input
        cloakSelect.addEventListener('change', function() {
            customCloak.style.display = this.value === 'custom' ? 'block' : 'none';
        });
        
        // Load saved cloak setting
        const settings = JSON.parse(localStorage.getItem('dna_settings')) || {};
        if (settings.tabCloak) {
            cloakSelect.value = settings.tabCloak;
            if (settings.tabCloak === 'custom' && settings.customCloak) {
                customCloak.value = settings.customCloak;
                customCloak.style.display = 'block';
            }
        }
    }
});

// Apply cloak button functionality
window.applyCloak = function() {
    const mode = document.getElementById('cloak-option').value;
    const customTitle = document.getElementById('custom-cloak').value;
    applyCloak(mode, customTitle);
};
