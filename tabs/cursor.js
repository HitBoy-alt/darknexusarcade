<script>
    (function () {
        try {
            const settings = JSON.parse(localStorage.getItem('dna_settings')) || {};
            const style = settings.cursorStyle;
            const customURL = settings.customCursorURL;

            function isValidURL(url) {
                try {
                    new URL(url);
                    return true;
                } catch (_) {
                    return false;
                }
            }

            if (style === 'custom' && isValidURL(customURL)) {
                // Hide default cursor
                document.body.style.cursor = 'none';

                const existing = document.getElementById('dna-custom-cursor');
                if (existing) existing.remove();

                const cursorImg = document.createElement('img');
                cursorImg.src = customURL;
                cursorImg.id = 'dna-custom-cursor';
                cursorImg.style.position = 'fixed';
                cursorImg.style.pointerEvents = 'none';
                cursorImg.style.zIndex = '9999';
                cursorImg.style.width = '32px';
                cursorImg.style.height = '32px';
                document.body.appendChild(cursorImg);

                document.addEventListener('mousemove', function (e) {
                    const img = document.getElementById('dna-custom-cursor');
                    if (img) {
                        img.style.left = `${e.clientX}px`;
                        img.style.top = `${e.clientY}px`;
                    }
                });
            } else if (style) {
                // Set default cursor style
                document.body.style.cursor = style;
            }
        } catch (e) {
            // Fail silently
            console.error("Cursor setup error:", e);
        }
    })();
</script>
