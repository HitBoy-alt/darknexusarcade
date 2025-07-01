document.addEventListener('DOMContentLoaded', () => {
  // App data with name, image, and embed URL (limited to 9 for 3x3 grid)
  const apps = [
    { name: "Facebook", image: "https://via.placeholder.com/64?text=FB", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Twitter", image: "https://via.placeholder.com/64?text=TW", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Instagram", image: "https://via.placeholder.com/64?text=IG", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "YouTube", image: "https://via.placeholder.com/64?text=YT", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Netflix", image: "https://via.placeholder.com/64?text=NF", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Spotify", image: "https://via.placeholder.com/64?text=SP", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "LinkedIn", image: "https://via.placeholder.com/64?text=LI", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "GitHub", image: "https://via.placeholder.com/64?text=GH", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Notion", image: "https://via.placeholder.com/64?text=NO", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
  ];

  const appsGrid = document.getElementById('apps-grid');

  if (!appsGrid) {
    console.error("Element with id 'apps-grid' not found. Ensure the HTML contains a div with id 'apps-grid'.");
    return;
  }

  function renderApps() {
    appsGrid.innerHTML = '';
    try {
      // Limit to 9 apps for 3x3 grid
      apps.slice(0, 9).forEach(app => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card flex flex-col items-center p-4 bg-gray-900/50 rounded-xl cursor-pointer';

        appCard.innerHTML = `
          <div class="app-icon"><img src="${app.image}" alt="${app.name} icon" onerror="this.src='https://via.placeholder.com/64?text=Error';"></div>
          <div class="app-name">${app.name}</div>
        `;

        appCard.addEventListener('click', () => {
          // Create a new HTML page for the embed in a new tab
          const embedWindow = window.open('', '_blank');
          if (embedWindow) {
            embedWindow.document.write(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${app.name}</title>
                <style>
                  body { margin: 0; background: #0a0e2b; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                  iframe { width: 100%; height: 100vh; border: none; }
                </style>
              </head>
              <body>
                <iframe src="${app.embedUrl}" frameborder="0" allowfullscreen></iframe>
              </body>
              </html>
            `);
            embedWindow.document.close();
          } else {
            console.error('Failed to open new tab. Ensure pop-ups are not blocked.');
            alert('Failed to open new tab. Please allow pop-ups for this site.');
          }
        });

        appsGrid.appendChild(appCard);
      });
      console.log('Apps rendered successfully:', apps.slice(0, 9));
    } catch (error) {
      console.error('Error rendering apps:', error);
    }
  }

  renderApps();
});
