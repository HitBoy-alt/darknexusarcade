// cursor.js
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

    // Create UI
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
        overflowY: 'auto'
    });

    // Title
    const title = document.createElement('h3');
    title.textContent = 'Cursor Styles';
    Object.assign(title.style, {
        margin: '0 0 10px 0',
        fontSize: '16px',
        fontWeight: 'bold',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        paddingBottom: '8px'
    });
    panel.appendChild(title);

    // Create button grid
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    grid.style.gap = '6px';
    grid.style.marginBottom = '10px';

    // Add cursor buttons
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
            transition: 'all 0.2s'
        });
        
        btn.onmouseenter = () => btn.style.background = 'rgba(255,255,255,0.2)';
        btn.onmouseleave = () => btn.style.background = 'rgba(255,255,255,0.1)';
        
        btn.onclick = () => {
            document.documentElement.style.cursor = cursor.name;
            currentCursor = cursor.name;
            customCursorUrl = null;
            updateActiveButton();
        };
        
        grid.appendChild(btn);
    });
    panel.appendChild(grid);

    // Custom cursor section
    const customSection = document.createElement('div');
    customSection.style.marginTop = '10px';
    
    const customLabel = document.createElement('label');
    customLabel.textContent = 'Custom URL:';
    customLabel.style.display = 'block';
    customLabel.style.marginBottom = '5px';
    customLabel.style.fontSize = '12px';
    customSection.appendChild(customLabel);
    
    const customInput = document.createElement('input');
    Object.assign(customInput.style, {
        width: '100%',
        padding: '6px',
        marginBottom: '6px',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '4px',
        color: 'white'
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
        color: 'white'
    });
    customBtn.onclick = () => {
        const url = customInput.value.trim();
        if (!url) return;
        
        // Test the cursor
        const testElement = document.createElement('div');
        testElement.style.cssText = 'position:absolute; left:-100px; width:10px; height:10px;';
        testElement.style.cursor = `url('${url}'), auto`;
        document.body.appendChild(testElement);
        
        const computedCursor = getComputedStyle(testElement).cursor;
        document.body.removeChild(testElement);
        
        if (computedCursor.includes('url')) {
            document.documentElement.style.cursor = `url('${url}'), auto`;
            currentCursor = 'custom';
            customCursorUrl = url;
            updateActiveButton();
        } else {
            alert('Failed to load custom cursor. The server may block cross-origin requests.');
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
        fontWeight: 'bold'
    });
    resetBtn.onclick = () => {
        document.documentElement.style.cursor = '';
        currentCursor = null;
        customCursorUrl = null;
        updateActiveButton();
    };
    panel.appendChild(resetBtn);

    // Status display
    const status = document.createElement('div');
    status.style.marginTop = '10px';
    status.style.fontSize = '11px';
    status.style.opacity = '0.8';
    panel.appendChild(status);

    // Track active button
    function updateActiveButton() {
        const buttons = panel.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.background = 'rgba(255,255,255,0.1)';
            btn.style.fontWeight = 'normal';
        });
        
        if (currentCursor === 'custom' && customCursorUrl) {
            status.textContent = `Custom: ${customCursorUrl}`;
        } else if (currentCursor) {
            const cursorObj = cursors.find(c => c.name === currentCursor);
            status.textContent = `Active: ${cursorObj ? cursorObj.desc : currentCursor}`;
        } else {
            status.textContent = 'Default cursor active';
        }
    }

    // Make panel draggable
    let isDragging = false;
    let offsetX, offsetY;

    title.onmousedown = (e) => {
        isDragging = true;
        offsetX = e.clientX - panel.getBoundingClientRect().left;
        offsetY = e.clientY - panel.getBoundingClientRect().top;
        panel.style.userSelect = 'none';
    };

    document.onmousemove = (e) => {
        if (!isDragging) return;
        panel.style.left = `${e.clientX - offsetX}px`;
        panel.style.top = `${e.clientY - offsetY}px`;
    };

    document.onmouseup = () => {
        isDragging = false;
        panel.style.userSelect = '';
    };

    // Apply to HTML element for full coverage
    document.documentElement.style.cursor = 'inherit';
    
    // Append to document
    document.body.appendChild(panel);
    updateActiveButton();
})();
