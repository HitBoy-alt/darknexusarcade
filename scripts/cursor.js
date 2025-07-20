<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Custom Cursor</title>
  <style>
    #custom-cursor {
      position: fixed;
      width: 32px;
      height: 32px;
      pointer-events: none;
      z-index: 9999;
      background: url('your-cursor-image.png') no-repeat center center;
      background-size: contain;
    }
  </style>
</head>
<body>
  <div id="custom-cursor"></div>

  <script>
    (function () {
      const cursor = document.getElementById('custom-cursor');

      // Move custom cursor with the mouse
      window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });

      // Force-hide system cursor
      function forceHideCursor() {
        document.body.style.cursor = 'none';

        const style = document.createElement('style');
        style.innerHTML = `* { cursor: none !important; }`;
        style.setAttribute('id', 'force-hide-cursor-style');
        document.head.appendChild(style);

        setInterval(() => {
          document.body.style.cursor = 'none';
        }, 10);
      }

      forceHideCursor();
    })();
  </script>
</body>
</html>
