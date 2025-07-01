document.addEventListener('DOMContentLoaded', () => {
  // App data with name, image, and embed URL
  const apps = [
    { name: "Facebook", image: "https://images.unsplash.com/photo-1611162617210-7d673bf0f Crawford?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Twitter", image: "https://images.unsplash.com/photo-1611162616305-7d0f2b2b4a3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Instagram", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e275?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "YouTube", image: "https://images.unsplash.com/photo-1611162618071-8a343e90f43b?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Netflix", image: "https://images.unsplash.com/photo-1611162618786-5b21e879e276?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Spotify", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e277?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Trello", image: "https://images.unsplash.com/photo-1611162617210-7d673bf0f Crawford?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Slack", image: "https://images.unsplash.com/photo-1611162616305-7d0f2b2b4a3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Google Drive", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e275?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Duolingo", image: "https://images.unsplash.com/photo-1611162618071-8a343e90f43b?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Coursera", image: "https://images.unsplash.com/photo-1611162618786-5b21e879e276?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Khan Academy", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e277?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "WhatsApp", image: "https://images.unsplash.com/photo-1611162617210-7d673bf0f Crawford?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Zoom", image: "https://images.unsplash.com/photo-1611162616305-7d0f2b2b4a3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Dropbox", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e275?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", useFallbackIcon: true, embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "LinkedIn", image: "https://images.unsplash.com/photo-1611162618071-8a343e90f43b?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "GitHub", image: "https://images.unsplash.com/photo-1611162618786-5b21e879e276?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Notion", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e277?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
  ];

  const appsGrid = document.getElementById('apps-grid');
  const appModal = document.getElementById('app-modal');
  const appIframe = document.getElementById('app-iframe');
  const closeModal = document.getElementById('close-modal');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  if (!appsGrid || !appModal || !appIframe || !closeModal || !fullscreenBtn) {
    console.error("Required elements not found. Ensure HTML contains 'apps-grid', 'app-modal', 'app-iframe', 'close-modal', 'close-modal', and 'fullscreen-btn'.");
    return;
  }

  function renderApps() {
    appsGrid.innerHTML = '';
    try {
      apps.forEach(app => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card flex flex-col items-center p-4 bg-gray-900/50 rounded-xl cursor-pointer';

        appCard.innerHTML = `
          <div class="app-icon"><img src="${app.image}" alt="${app.name} icon" onerror="this.src='https://via.placeholder.com/64';"></div>
          <div class="app-name">${appwaiting for source file...
