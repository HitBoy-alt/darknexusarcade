(function () {
  // Create custom cursor element
  const customCursor = document.createElement('div');
  customCursor.id = 'custom-cursor';
  document.body.appendChild(customCursor);

  // Apply styles to the custom cursor
  const style = document.createElement('style');
  style.innerHTML = `
    #custom-cursor {
      position: fixed;
      width: 32px;
      height: 32px;
      pointer-events: none;
      z-index: 9999;
      background: url('your-cursor-image.png') no-repeat center center;
      background-size: contain;
    }
    * {
      cursor: none !important;
    }
  `;
  document.head.appendChild(style);

  // Move custom cursor with the mouse
  window.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  });

  // Force-hide system cursor repeatedly to override other scripts
  setInterval(() => {
    document.body.style.cursor = 'none';
  }, 10);
})();
