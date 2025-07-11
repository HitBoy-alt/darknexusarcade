<script>
  // Show toast message
  function showToast(message, type = 'info') {
    alert(message); // Replace with styled toast if needed
  }

  function applyCloak(mode, customTitle = '') {
    let title = '';
    let icon = '';
    
    switch (mode) {
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
        title = 'Dark Nexus Arcade';
        icon = '/assets/icons/favicon.ico';
    }

    document.title = title;

    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icon;
    if (!document.head.contains(link)) document.head.appendChild(link);

    const settings = JSON.parse(localStorage.getItem('dna_settings')) || {};
    settings.tabCloak = mode;
    if (mode === 'custom') settings.customCloak = customTitle;
    localStorage.setItem('dna_settings', JSON.stringify(settings));

    showToast(`Tab cloaked as "${title}"`, 'success');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const cloakSelect = document.getElementById('cloak-option');
    const customCloakInput = document.getElementById('custom-cloak');
    const customCloakTitle = document.getElementById('custom-cloak-title');

    if (cloakSelect) {
      cloakSelect.addEventListener('change', function () {
        customCloakInput.style.display = this.value === 'custom' ? 'block' : 'none';
      });

      const settings = JSON.parse(localStorage.getItem('dna_settings')) || {};
      if (settings.tabCloak) {
        cloakSelect.value = settings.tabCloak;
        if (settings.tabCloak === 'custom' && settings.customCloak) {
          customCloakTitle.value = settings.customCloak;
          customCloakInput.style.display = 'block';
        }
        applyCloak(settings.tabCloak, settings.customCloak || '');
      }
    }
  });

  window.applyCloak = function () {
    const mode = document.getElementById('cloak-option').value;
    const customTitle = document.getElementById('custom-cloak-title').value;
    applyCloak(mode, customTitle);
  };
</script>
