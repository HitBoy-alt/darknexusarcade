(function persistTabCloak() {
  const settings = JSON.parse(localStorage.getItem('dna_settings'));
  if (!settings || !settings.tabCloak || settings.tabCloak === 'none') {
    return; // no cloaking to apply
  }

  let title = '';
  let icon = '';

  switch (settings.tabCloak) {
    case 'google':
      title = 'Google Docs';
      icon = 'https://docs.google.com/favicon.ico';
      break;
    case 'wikipedia':
      title = 'Wikipedia';
      icon = 'https://en.wikipedia.org/static/favicon/wikipedia.ico';
      break;
    case 'custom':
      title = settings.customCloak || 'Untitled';
      icon = 'https://google.com/favicon.ico';
      break;
    default:
      title = 'Dark Nexus Arcade';
      icon = '/assets/icons/favicon.ico'; // Adjust path for each page if needed
  }

  document.title = title;

  document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());

  const link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = icon;
  document.head.appendChild(link);
})();
