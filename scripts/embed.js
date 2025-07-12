function openEmbed(url, title = '') {
    // Escape HTML to prevent XSS
    const escapeHTML = str => str.replace(/[&<>"'`]/g,
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;'
        }[tag] || tag)
    );

    // Validate the URL
    try {
        new URL(url);
    } catch {
        console.error('Invalid URL:', url);
        alert('Invalid URL provided');
        return;
    }

    const safeUrl = escapeHTML(url);
    const safeTitle = escapeHTML(title || 'Dark Nexus Arcade - Embedded Content');

    try {
        const newWindow = window.open('', '_blank', 'noopener');
        if (!newWindow) {
            throw new Error('Popup was blocked. Enable popups for this site.');
        }

        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            background: #000;
        }
        #embed-container {
            position: relative;
            width: 100%;
            height: 100vh;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        .controls {
            position: fixed;
            bottom: 20px;
            right: 10px;
            display: flex;
            gap: 8px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 20px;
            padding: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.5);
            z-index: 1000;
        }
        .control-btn {
            background: #6a0dad;
            color: white;
            border: none;
            border-radius: 16px;
            padding: 8px 12px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .control-btn:hover {
            background: #5a0b9d;
            transform: scale(1.05);
        }
        .control-btn:focus {
            outline: 2px solid #fff;
            outline-offset: 2px;
        }
    </style>
</head>
<body>
    <div id="embed-container">
        <iframe src="${safeUrl}" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups allow-forms"></iframe>
        <div class="controls">
            <button class="control-btn" onclick="toggleFullscreen()">Fullscreen</button>
            <button class="control-btn" onclick="window.close()">Close</button>
        </div>
    </div>
    <script>
        function toggleFullscreen() {
            const container = document.querySelector('#embed-container');
            if (!document.fullscreenElement) {
                container.requestFullscreen().catch(err => {
                    alert('Fullscreen failed: ' + err.message);
                });
            } else {
                document.exitFullscreen();
            }
        }

        document.addEventListener('fullscreenchange', () => {
            const btn = document.querySelector('.control-btn');
            btn.textContent = document.fullscreenElement ? 'Exit Fullscreen' : 'Fullscreen';
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    window.close();
                }
            }
        });

        document.querySelector('iframe').addEventListener('contextmenu', e => e.preventDefault());
    </script>
</body>
</html>
        `;

        newWindow.document.write(html);
        newWindow.document.close();
    } catch (err) {
        console.error('Error:', err);
        alert('Could not open embedded content.');
    }
}

// Attach click handlers to buttons with data-embed
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-embed]').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.dataset.embed;
            const title = button.dataset.title || '';
            openEmbed(url, title);
        });
    });
});
