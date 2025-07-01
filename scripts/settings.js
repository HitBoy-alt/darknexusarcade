// Apply theme color
window.applyTheme = function() {
    const color = document.getElementById('theme-color').value;
    document.documentElement.style.setProperty('--primary', color);
    
    // Save to settings
    const settings = JSON.parse(localStorage.getItem('dna_settings')) || {};
    settings.themeColor = color;
    localStorage.setItem('dna_settings', JSON.stringify(settings));
    
    showToast('Theme color updated', 'success');
};

// Reset settings to default
window.resetSettings = function() {
    localStorage.removeItem('dna_settings');
    document.documentElement.style.setProperty('--primary', '#6a0dad');
    document.title = 'Dark Nexus Arcade';
    
    // Reset favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '/assets/icons/favicon.ico';
    document.head.appendChild(link);
    
    // Reset form elements
    if (document.getElementById('theme-color')) {
        document.getElementById('theme-color').value = '#6a0dad';
    }
    if (document.getElementById('cloak-option')) {
        document.getElementById('cloak-option').value = 'none';
        document.getElementById('custom-cloak').style.display = 'none';
    }
    
    showToast('Settings reset to default', 'success');
};
