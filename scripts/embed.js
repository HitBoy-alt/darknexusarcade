// Open embedded content in new tab
function openEmbed(url, title = '') {
    const newWindow = window.open('', '_blank');

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title || 'Dark Nexus Arcade - Embedded Content'}</title>
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
                    transition: width 0.3s ease, padding 0.3s ease;
                }
                .control-btn {
                    background: #6a0dad;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 8px 12px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background 0.2s;
                }
                .control-btn:hover {
                    background: #5a0b9d;
                }
            </style>
        </head>
        <body>
            <div id="embed-container">
                <iframe src="${url}" allowfullscreen></iframe>
                <div class="controls">
                    <button class="control-btn" onclick="toggleMinimize(this)">&lt;</button>
                    <button class="control-btn" onclick="toggleFullscreen()">Fullscreen</button>
                    <button class="control-btn" onclick="window.close()">Close</button>
                </div>
            </div>
            <script>
                let minimized = false;
                function toggleMinimize(button) {
                    const controls = document.querySelector('.controls');
                    if (!minimized) {
                        // Shrink the controls to just the '<' button
                        controls.style.width = '30px';
                        controls.style.padding = '5px';
                        button.textContent = '>';
                        minimized = true;
                    } else {
                        // Restore the controls to their original size
                        controls.style.width = 'auto';
                        controls.style.padding = '8px 12px';
                        button.textContent = '<';
                        minimized = false;
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
            </script>
        </body>
        </html>
    `;

    newWindow.document.write(html);
    newWindow.document.close();
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
