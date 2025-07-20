// cursor.js

(function () {
    const cursors = ["default", "pointer", "crosshair", "move", "text", "wait", "not-allowed"];
    let currentCursor = null;

    // Create UI
    const panel = document.createElement('div');
    panel.style.position = 'fixed';
    panel.style.top = '10px';
    panel.style.right = '10px';
    panel.style.background = 'rgba(0,0,0,0.7)';
    panel.style.color = 'white';
    panel.style.padding = '10px';
    panel.style.borderRadius = '8px';
    panel.style.fontFamily = 'sans-serif';
    panel.style.zIndex = '10000';

    const title = document.createElement('div');
    title.textContent = 'Cursor Styles';
    title.style.marginBottom = '5px';
    title.style.fontWeight = 'bold';
    panel.appendChild(title);

    // Add buttons
    cursors.forEach(cursor => {
        const btn = document.createElement('button');
        btn.textContent = cursor;
        btn.style.margin = '2px';
        btn.style.cursor = cursor;
        btn.onclick = () => {
            document.body.style.cursor = cursor;
            currentCursor = cursor;
        };
        panel.appendChild(btn);
    });

    // Off button
    const offBtn = document.createElement('button');
    offBtn.textContent = 'Off';
    offBtn.style.marginTop = '5px';
    offBtn.style.display = 'block';
    offBtn.onclick = () => {
        document.body.style.cursor = 'default';
        currentCursor = null;
    };
    panel.appendChild(offBtn);

    // Append to document
    document.body.appendChild(panel);
})();
