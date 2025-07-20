const cursor = document.getElementById('custom-cursor');

window.addEventListener('mousemove', (e) => {
  // Move the custom cursor image to the mouse position
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
