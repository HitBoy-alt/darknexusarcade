document.addEventListener('DOMContentLoaded', () => {
  const faviconDropdown = document.getElementById('faviconDropdown');
  const customTitleInput = document.getElementById('custom-title');
  const customFaviconInput = document.getElementById('custom-favicon');
  const customTitleLabel = document.getElementById('custom-title-label');
  const customFaviconLabel = document.getElementById('custom-favicon-label');
  const applyCustomBtn = document.getElementById('apply-custom');

  const presets = {
    'Fake Google Search (default)': { title: 'calculator - Google Search', favicon: 'https://www.google.com/favicon.ico', key: 'google_search' },
    'Fake Google Doc': { title: 'Untitled document - Google Docs', favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico', key: 'google_docs' },
    'Fake Google Slides': { title: 'Untitled Presentation - Google Slides', favicon: 'https://ssl.gstatic.com/docs/presentations/images/favicon-2023q4.ico', key: 'google_slides' },
    'Fake Powerpoint': { title: 'Presentation.pptx - Microsoft PowerPoint Online', favicon: 'https://res-1.cdn.office.net/officeonline/pods/s/h25FD28BFF140E152_resources/1033/FavIcon_Ppt.ico', key: 'powerpoint' },
    'Fake Word Document': { title: 'Document.docx - Microsoft Word Online', favicon: 'https://res-1.cdn.office.net/officeonline/wv/s/h4FBD8CC4075E1795_resources/1033/FavIcon_Word.ico', key: 'word' },
    'Google': { title: 'Google', favicon: 'https://www.google.com/favicon.ico', key: 'google' },
    'Google Classroom': { title: 'Home', favicon: 'https://ssl.gstatic.com//classroom//favicon.png', key: 'google_classroom' },
    'Gmail': { title: 'Gmail', favicon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico', key: 'gmail' },
    'Google Drive': { title: 'Home - Google Drive', favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png', key: 'google_drive' },
    'Bing': { title: 'Bing', favicon: 'https://www.bing.com/favicon.ico', key: 'bing' },
    'Outlook': { title: 'Outlook', favicon: 'https://outlook.live.com/owa/favicon.ico', key: 'outlook' },
    'OneDrive': { title: 'My files - OneDrive', favicon: 'https://onedrive.live.com/favicon.ico', key: 'onedrive' },
    'Wikipedia': { title: 'Wikipedia', favicon: 'https://en.wikipedia.org/favicon.ico', key: 'wikipedia' },
    'Edpuzzle': { title: 'Edpuzzle', favicon: 'https://edpuzzle.imgix.net/favicons/favicon-32.png', key: 'edpuzzle' },
    'IXL': { title: 'IXL | Math, Language Arts, Science, Social Studies, and Spanish', favicon: 'https://www.ixl.com/favicon.ico', key: 'ixl' },
    'Canvas': { title: 'Log In to Canvas', favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico', key: 'canvas' },
    'Khan Academy': { title: 'Khan Academy | Free Online Courses, Lessons & Practice', favicon: 'https://cdn.kastatic.org/images/favicon.ico', key: 'khan' },
    'YouTube': { title: 'YouTube', favicon: 'https://www.youtube.com/s/desktop/eb72fb02/img/favicon.ico', key: 'youtube' },
  };

  // Populate dropdown with presets
  Object.keys(presets).forEach(name => {
    const option = document.createElement('option');
    option.value = presets[name].key;
    option.textContent = name;
    faviconDropdown.appendChild(option);
  });

  // Add custom option
  const customOption = document.createElement('option');
  customOption.value = 'custom';
  customOption.textContent = 'Custom';
  faviconDropdown.appendChild(customOption);

  // Show/hide custom input fields based on selection
  function toggleCustomInputs(show) {
    customTitleLabel.style.display = show ? 'inline-block' : 'none';
    customFaviconLabel.style.display = show ? 'inline-block' : 'none';
    applyCustomBtn.style.display = show ? 'inline-block' : 'none';
  }

  faviconDropdown.addEventListener('change', () => {
    if (faviconDropdown.value === 'custom') {
      toggleCustomInputs(true);
    } else {
      toggleCustomInputs(false);
      applyCloak(faviconDropdown.value);
    }
  });

  // Apply preset or custom cloak
  function applyCloak(key, customTitle = '', customFavicon = '') {
    let title, favicon;

    if (key === 'custom') {
      title = customTitle || 'Untitled';
      favicon = customFavicon || 'https://www.google.com/favicon.ico';
    } else {
      const preset = Object.values(presets).find(p => p.key === key);
      if (!preset) return;
      title = preset.title;
      favicon = preset.favicon;
    }

    document.title = title;

    // Remove existing favicons
    document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());

    // Add new favicon link
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = favicon;
    document.head.appendChild(link);

    // Save settings to localStorage
    const settings = JSON.parse(localStorage.getItem('dna_settings')) || {};
    settings.tabCloak = key;
    if (key === 'custom') {
      settings.customTitle = customTitle;
      settings.customFavicon = customFavicon;
    } else {
      delete settings.customTitle;
      delete settings.customFavicon;
    }
    localStorage.setItem('dna_settings', JSON.stringify(settings));
  }

  // On click "Apply Custom" button
  applyCustomBtn.addEventListener('click', () => {
    const title = customTitleInput.value.trim();
    const favicon = customFaviconInput.value.trim();
    if (!title) {
      alert('Please enter a custom title');
      return;
    }
    if (!favicon) {
      alert('Please enter a favicon URL');
      return;
    }
    applyCloak('custom', title, favicon);
    alert('Custom tab cloak applied!');
  });

  // On page load: load settings from localStorage and apply cloak
  (function persistTabCloak() {
    const settings = JSON.parse(localStorage.getItem('dna_settings'));
    if (!settings || !settings.tabCloak) return;

    if (settings.tabCloak === 'custom') {
      faviconDropdown.value = 'custom';
      toggleCustomInputs(true);
      customTitleInput.value = settings.customTitle || '';
      customFaviconInput.value = settings.customFavicon || '';
      applyCloak('custom', settings.customTitle, settings.customFavicon);
    } else {
      faviconDropdown.value = settings.tabCloak;
      toggleCustomInputs(false);
      applyCloak(settings.tabCloak);
    }
  })();

});
