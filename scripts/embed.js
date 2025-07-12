const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            display: block;
        }
        .controls {
            position: fixed;
            top: 120px; /* moved down from 40px */
            right: 10px;
            z-index: 1000;
            display: flex;
            gap: 8px;
            background: rgba(0,0,0,0.7);
            border-radius: 20px;
            padding: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.5);
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
            const elem = document.querySelector('#embed-container');
            if (!document.fullscreenElement) {
                elem.requestFullscreen().catch(err => {
                    console.error('Fullscreen failed:', err);
                    alert('Fullscreen failed: ' + err.message);
                });
            } else {
                document.exitFullscreen();
            }
        }

        // Handle fullscreen change events
        document.addEventListener('fullscreenchange', () => {
            const fullscreenBtn = document.querySelector('.control-btn');
            fullscreenBtn.textContent = document.fullscreenElement ? 'Exit Fullscreen' : 'Fullscreen';
        });

        // Close window with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !e.defaultPrevented) {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    window.close();
                }
            }
        });

        // Prevent right-click on iframe
        document.querySelector('iframe').addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    </script>
</body>
</html>
`;
