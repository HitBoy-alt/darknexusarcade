// Initialize particles.js
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#b19cd9" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#9b59b6",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      out_mode: "out",
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 100 },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
});

const mainTabs = document.querySelectorAll("nav#main-tabs button.tab-btn");
const tabContents = document.querySelectorAll("#tab-contents > div.tab-content");
const dynamicTabBar = document.getElementById("dynamic-tab-bar");
const dynamicTabContents = document.getElementById("dynamic-tab-contents");

let dynamicTabs = [];

function deactivateMainTabs() {
  mainTabs.forEach((tab) => tab.classList.remove("active"));
  tabContents.forEach((content) => content.classList.remove("active"));
}

function activateMainTab(tabName) {
  deactivateMainTabs();
  const btn = document.querySelector(`nav#main-tabs button[data-tab="${tabName}"]`);
  const content = document.getElementById(tabName);
  if (btn && content) {
    btn.classList.add("active");
    content.classList.add("active");
  }
  // Also deactivate dynamic tabs
  deactivateDynamicTabs();
}

function deactivateDynamicTabs() {
  dynamicTabBar.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
  dynamicTabContents.querySelectorAll("div").forEach((div) => div.classList.remove("active"));
}

function activateDynamicTab(id) {
  deactivateMainTabs();
  deactivateDynamicTabs();

  const btn = dynamicTabBar.querySelector(`button[data-id="${id}"]`);
  const content = dynamicTabContents.querySelector(`div[data-id="${id}"]`);
  if (btn && content) {
    btn.classList.add("active");
    content.classList.add("active");
  }
}

// Add or activate dynamic tab by URL
function addDynamicTab(url, title) {
  // Check if tab with this URL already exists
  const existing = dynamicTabs.find((t) => t.url === url);
  if (existing) {
    activateDynamicTab(existing.id);
    return;
  }

  const id = "dyn-tab-" + (dynamicTabs.length + 1);

  // Create tab button
  const btn = document.createElement("button");
  btn.textContent = title;
  btn.dataset.id = id;
  btn.title = title;
  btn.classList.add("dynamic-tab-btn");

  // Close button
  const closeBtn = document.createElement("span");
  closeBtn.textContent = "✕";
  closeBtn.classList.add("close-btn");
  btn.appendChild(closeBtn);

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeDynamicTab(id);
  });

  btn.addEventListener("click", () => activateDynamicTab(id));

  dynamicTabBar.appendChild(btn);

  // Create tab content with iframe
  const tabContent = document.createElement("div");
  tabContent.dataset.id = id;
  tabContent.classList.add("tab-content");
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.allow = "fullscreen";
  tabContent.appendChild(iframe);
  dynamicTabContents.appendChild(tabContent);

  dynamicTabs.push({ id, url, title });
  activateDynamicTab(id);
}

function removeDynamicTab(id) {
  const index = dynamicTabs.findIndex((t) => t.id === id);
  if (index === -1) return;

  const btn = dynamicTabBar.querySelector(`button[data-id="${id}"]`);
  const content = dynamicTabContents.querySelector(`div[data-id="${id}"]`);

  if (btn) btn.remove();
  if (content) content.remove();

  dynamicTabs.splice(index, 1);

  if (dynamicTabs.length > 0) {
    activateDynamicTab(dynamicTabs[dynamicTabs.length - 1].id);
  } else {
    activateMainTab("settings");
  }
}

// Event listeners for main tabs
mainTabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    activateMainTab(btn.dataset.tab);
  });
});

// Event listeners for clickable app/game/os items to open in dynamic tab
document.querySelectorAll(".app-item, .game-item, .os-item").forEach((item) => {
  item.addEventListener("click", () => {
    const url = item.dataset.url;
    const title = item.dataset.title || "New Tab";
    if (url) addDynamicTab(url, title);
  });
});

// Browser tab Go button and enter key
const browserTab = document.getElementById("browser");
if (browserTab) {
  const goBtn = browserTab.querySelector("#browser-go");
  const urlInput = browserTab.querySelector("#browser-url");

  function openBrowserTab() {
    let url = urlInput.value.trim();
    if (!url) {
      alert("Please enter a URL.");
      return;
    }
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    addDynamicTab(url, url);
    urlInput.value = "";
  }

  goBtn.addEventListener("click", openBrowserTab);

  urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      openBrowserTab();
    }
  });
}
