(function () {
    const cursors = [
        {name: "default", desc: "Default arrow"},
        {name: "pointer", desc: "Link pointer"},
        {name: "crosshair", desc: "Precision selector"},
        {name: "move", desc: "Move tool"},
        {name: "text", desc: "Text selector"},
        {name: "wait", desc: "Loading indicator"},
        {name: "not-allowed", desc: "Action prohibited"},
        {name: "grab", desc: "Grab tool"},
        {name: "grabbing", desc: "Grabbing hand"},
        {name: "zoom-in", desc: "Zoom in"},
        {name: "zoom-out", desc: "Zoom out"}
    ];
    
    let currentCursor = null;
    let customCursorUrl = null;

    // Create the panel container
    const panel = document.createElement('div');
    Object.assign(panel.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '15px',
        borderRadius: '10px',
        fontFamily: 'system-ui, sans-serif',
        zIndex: '10000',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        width: '220px',
        maxHeight: '80vh',
        overflowY: 'auto',
        cursor: 'default',
        userSelect: 'none'
    });

    // Title bar (also drag handle)
    const title = document.createElement('h3');
    title.textContent = 'Cursor Styles';
    Object.assign(title.style, {
        margin: '0 0 10px 0',
        fontSize: '16px',
        fontWeight: 'bold',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        paddingBottom: '8px',
        cursor: 'move',
        userSelect: 'none'
    });
    panel.appendChild(title);

    // Grid container for cursor buttons
    const grid = document.createElement('div');
    Object.assign(grid.style, {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '6px',
        marginBottom: '10px'
    });

    // Create buttons for each cursor style
    cursors.forEach(cursor => {
        const btn = document.createElement('button');
        btn.textContent = cursor.desc;
        Object.assign(btn.style, {
            padding: '6px 8px',
            cursor: cursor.name,
            border: 'none',
            borderRadius: '4px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            fontSize: '12px',
            textAlign: 'left',
            transition: 'background 0.2s',
            userSelect: 'none'
        });

        btn.onmouseenter = () => btn.style.background = 'rgba(255,255,255,0.2)';
        btn.onmouseleave = () => {
            if (btn !== activeButton) {
                btn.style.background = 'rgba(255,255,255,0.1)';
            }
        };

        btn.onclick = () => {
            document.documentElement.style.cursor = cursor.name;
            currentCursor = cursor.name;
            customCursorUrl = null;
            updateActiveButton();
        };

        grid.appendChild(btn);
    });
    panel.appendChild(grid);

    // Custom cursor input section
    const customSection = document.createElement('div');
    Object.assign(customSection.style, {
        marginTop: '10px'
    });

    const customLabel = document.createElement('label');
    customLabel.textContent = 'Custom URL:';
    Object.assign(customLabel.style, {
        display: 'block',
        marginBottom: '5px',
        fontSize: '12px',
        userSelect: 'none'
    });
    customSection.appendChild(customLabel);

    const customInput = document.createElement('input');
    Object.assign(customInput.style, {
        width: '100%',
        padding: '6px',
        marginBottom: '6px',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '4px',
        color: 'white',
        fontSize: '12px'
    });
    customInput.placeholder = 'https://example.com/cursor.cur';
    customSection.appendChild(customInput);

    const customBtn = document.createElement('button');
    customBtn.textContent = 'Apply Custom';
    Object.assign(customBtn.style, {
        width: '100%',
        padding: '6px',
        background: 'rgba(100,150,255,0.3)',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontSize: '12px',
        cursor: 'pointer',
        userSelect: 'none'
    });
    customBtn.onclick = () => {
        const url = customInput.value.trim();
        if (!url) return;

        // Test if cursor URL is accepted by browser
        const testElement = document.createElement('div');
        Object.assign(testElement.style, {
            position: 'absolute',
            left: '-100px',
            width: '10px',
            height: '10px',
            cursor: `url('${url}'), auto`
        });
        document.body.appendChild(testElement);

        const computedCursor = getComputedStyle(testElement).cursor;
        document.body.removeChild(testElement);

        if (computedCursor.includes('url')) {
            document.documentElement.style.cursor = `url('${url}'), auto`;
            currentCursor = 'custom';
            customCursorUrl = url;
            updateActiveButton();
        } else {
            alert('Failed to load custom cursor. The server may block cross-origin requests or the URL is invalid.');
        }
    };
    customSection.appendChild(customBtn);
    panel.appendChild(customSection);

    // Reset button
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset to Default';
    Object.assign(resetBtn.style, {
        width: '100%',
        padding: '8px',
        marginTop: '10px',
        background: 'rgba(255,100,100,0.3)',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        userSelect: 'none'
    });
    resetBtn.onclick = () => {
        document.documentElement.style.cursor = '';
        currentCursor = null;
        customCursorUrl = null;
        updateActiveButton();
        customInput.value = '';
    };
    panel.appendChild(resetBtn);

    // Status display
    const status = document.createElement('div');
    Object.assign(status.style, {
        marginTop: '10px',
        fontSize: '11px',
        opacity: '0.8',
        userSelect: 'none',
        wordBreak: 'break-word'
    });
    panel.appendChild(status);

    // Track active button for styling
    let activeButton = null;
    function updateActiveButton() {
        // Reset all buttons
        const buttons = grid.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.background = 'rgba(255,255,255,0.1)';
            btn.style.fontWeight = 'normal';
        });
        activeButton = null;

        if (currentCursor === 'custom' && customCursorUrl) {
            status.textContent = `Custom cursor: ${customCursorUrl}`;
        } else if (currentCursor) {
            const cursorObj = cursors.find(c => c.name === currentCursor);
            status.textContent = `Active cursor: ${cursorObj ? cursorObj.desc : currentCursor}`;
            // Highlight active cursor button
            buttons.forEach(btn => {
                if (btn.textContent === cursorObj.desc) {
                    btn.style.background = 'rgba(100,150,255,0.6)';
                    btn.style.fontWeight = 'bold';
                    activeButton = btn;
                }
            });
        } else {
            status.textContent = 'Default cursor active';
        }
    }

    // Drag functionality for the panel
    let isDragging = false;
    let offsetX, offsetY;

    title.onmousedown = (e) => {
        isDragging = true;
        const rect = panel.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.body.style.userSelect = 'none'; // Prevent text selection during drag
    };

    document.onmousemove = (e) => {
        if (!isDragging) return;
        let left = e.clientX - offsetX;
        let top = e.clientY - offsetY;

        // Optional: clamp panel inside viewport
        const maxLeft = window.innerWidth - panel.offsetWidth;
        const maxTop = window.innerHeight - panel.offsetHeight;

        left = Math.min(Math.max(0, left), maxLeft);
        top = Math.min(Math.max(0, top), maxTop);

        panel.style.left = left + 'px';
        panel.style.top = top + 'px';
        panel.style.right = 'auto'; // Disable right positioning while dragging
        panel.style.bottom = 'auto';
    };

    document.onmouseup = () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = '';
        }
    };

    // Initialize panel position (top-right)
    panel.style.top = '10px';
    panel.style.right = '10px';
    panel.style.left = 'auto';
    panel.style.bottom = 'auto';

    // Append panel to body
    document.body.appendChild(panel);

    // Initialize active button and status
    updateActiveButton();

})();
