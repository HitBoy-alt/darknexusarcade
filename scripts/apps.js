document.addEventListener('DOMContentLoaded', () => {
  // App data
  const apps = [
    { name: "Facebook", icon: "fab fa-facebook" },
    { name: "Twitter", icon: "fab fa-twitter" },
    { name: "Instagram", icon: "fab fa-instagram" },
    { name: "YouTube", icon: "fab fa-youtube" },
    { name: "Netflix", icon: "fab fa-netflix" },
    { name: "Spotify", icon: "fab fa-spotify" },
    { name: "Trello", icon: "fab fa-trello" },
    { name: "Slack", icon: "fab fa-slack" },
    { name: "Google Drive", icon: "fab fa-google-drive" },
    { name: "Duolingo", icon: "fas fa-language" },
    { name: "Coursera", icon: "fas fa-graduation-cap" },
    { name: "Khan Academy", icon: "fas fa-book-open" },
    { name: "WhatsApp", icon: "fab fa-whatsapp" },
    { name: "Zoom", icon: "fas fa-video" },
    { name: "Dropbox", icon: "fab fa-dropbox" }
  ];

  const appsGrid = document.getElementById('apps-grid');

  if (!appsGrid) {
    console.error("Element with id 'apps-grid' not found.");
    return;
  }

  function renderApps() {
    appsGrid.innerHTML = '';

    apps.forEach(app => {
      const appCard = document.createElement('div');
      appCard.className = 'app-card flex flex-col items-center p-4 bg-gray-900/50 rounded-xl cursor-pointer';

      appCard.innerHTML = `
        <div class="app-icon"><i class="${app.icon}"></i></div>
        <div class="app-name">${app.name}</div>
      `;

      appCard.addEventListener('click', () => {
        alert(`Opening ${app.name}`);
      });

      appsGrid.appendChild(appCard);
    });
  }

  renderApps();
});
