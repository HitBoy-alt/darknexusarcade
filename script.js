// === TAB BUTTON LOGIC ===
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("nav button");
  const panels = document.querySelectorAll(".content-panel");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Hide all content panels
      panels.forEach(panel => panel.classList.remove("active"));

      // Show the one matching the clicked button
      const targetId = "content-" + button.dataset.target;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });

  // === VIEWER COUNTER ===
  if (!sessionStorage.viewerCount) {
    sessionStorage.viewerCount = Math.floor(Math.random() * 500) + 1;
  }

  const counter = document.getElementById("viewerCounter");
  if (counter) {
    counter.textContent = sessionStorage.viewerCount;
  }
});
