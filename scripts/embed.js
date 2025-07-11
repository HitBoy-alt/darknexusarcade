// Open embedded content in new tab
function openEmbed(url, title = '') {
    // Escape HTML to prevent XSS
    const escapeHTML = str => str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
    
    const safeUrl = escapeHTML(url);
    const safeTitle = escapeHTML(title || 'Dark Nexus Arcade - Embedded Content');

    try {
        const newWindow = window.open('', '_blank');
        if (!newWindow) {
            throw newError('Popup window was blocked. Please allow popups for this site.');
        }

        const html = `
<!DOCTYPE html>
<html>
<head>
    <title>${safeTitle}</title>
    <style>
        body, html {
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
            top: 40px;
            right: 10px;
            z-index: 1000;
            display: flex;
            gap: 8px;
            transition: all 0.3s ease;
            background: rgba(0,0,0,0.7);
            border-radius: 20px;
            padding: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .controls.minimized {
            transform: translateX(calc(100% - 40px));
            padding: 8px 8px 8px 12px;
        }
        .controls.minimized .control-btn:not(.minimize-btn) {
            display: none;
        }
        .control-btn {
            background: #6a0dad;
            color: white;
            border: none;
            border-radius: 16px;
            padding: 8px 12px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
            white-space: nowrap;
        }
        .minimize-btn {
            min-width: 24px;
            padding: 8px;
            text-align: center;
        }
        .control-btn:hover {
            background: #5a0b9d;
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div id="embed-container">
        <iframe src="${safeUrl}" allowfullscreen></iframe>
        <div class="controls">
            <button class="control-btn minimize-btn" onclick="toggleMinimize()">←</button>
            <button class="control-btn" onclick="toggleFullscreen()">Fullscreen</button>
            <button class="control-btn" onclick="window.close()">Close</button>
        </div>
    </div>
    <script>
        function toggleMinimize() {
            const controls = document.querySelector('.controls');
            const minimizeBtn = controls.querySelector('.minimize-btn');
            
            controls.classList.toggle('minimized');
            
            if (controls.classList.contains('minimized')) {
                minimizeBtn.textContent = '→';
            } else {
                minimizeBtn.textContent = '←';
            }
        }

        function toggleFullscreen() {
            const elem = document.querySelector('iframe');
            if (!document.fullscreenElement) {
                elem.requestFullscreen().catch(err => {
                    alert('Fullscreen failed: ' + err.message);
                });
            } else {
                document.exitFullscreen();
            }
        }

        // Close window with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    window.close();
                }
            }
        });
    </script>
</body>
</html>
        `;

        newWindow.document.write(html);
        newWindow.document.close();
    } catch (error) {
        console.error('Error opening embed:', error);
        alert('Error opening content: ' + error.message);
    }
}

// Add click handlers to all embed buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-embed]').forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-embed');
            const title = this.getAttribute('data-title') || '';
            openEmbed(url, title);
        });
    });
});
