/**
 * Dark Nexus Arcade - Browser Controller
 * Features:
 * - URL navigation with validation
 * - Tab management (multiple tabs)
 * - History tracking
 * - Basic error handling
 * - Persistent session storage
 */

class NexusBrowser {
  constructor() {
    this.currentTab = 0;
    this.tabs = [
      {
        url: '',
        history: [],
        historyIndex: -1
      }
    ];
    this.initElements();
    this.initEvents();
    this.restoreSession();
  }

  initElements() {
    this.urlInput = document.getElementById('url-input');
    this.goButton = document.getElementById('go-button');
    this.newTabButton = document.getElementById('new-tab-button');
    this.browserFrame = document.getElementById('browser-frame');
    this.tabsContainer = document.getElementById('tabs-container') || this.createTabsContainer();
    this.backButton = document.getElementById('back-button') || this.createNavButton('back');
    this.forwardButton = document.getElementById('forward-button') || this.createNavButton('forward');
    this.refreshButton = document.getElementById('refresh-button') || this.createNavButton('refresh');
  }

  createTabsContainer() {
    const container = document.createElement('div');
    container.id = 'tabs-container';
    container.className = 'tabs-container';
    document.querySelector('.browser-controls').prepend(container);
    return container;
  }

  createNavButton(type) {
    const button = document.createElement('button');
    button.id = `${type}-button`;
    button.className = `nav-button ${type}`;
    button.innerHTML = type === 'back' ? '&larr;' : 
                      type === 'forward' ? '&rarr;' : '&#x21bb;';
    document.querySelector('.browser-controls').prepend(button);
    return button;
  }

  initEvents() {
    // Navigation buttons
    this.goButton.addEventListener('click', () => this.navigate());
    this.newTabButton.addEventListener('click', () => this.addTab());
    this.backButton.addEventListener('click', () => this.goBack());
    this.forwardButton.addEventListener('click', () => this.goForward());
    this.refreshButton.addEventListener('click', () => this.refresh());
    
    // URL input
    this.urlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.navigate();
    });

    // Browser frame events
    this.browserFrame.addEventListener('load', () => {
      try {
        const url = this.browserFrame.contentWindow.location.href;
        this.updateUrl(url);
        this.addToHistory(url);
        this.updateNavButtons();
      } catch (e) {
        // Cross-origin error
        this.updateUrl(this.tabs[this.currentTab].url);
      }
    });
  }

  navigate(url = this.urlInput.value.trim()) {
    if (!url) return;
    
    // Add protocol if missing
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    try {
      // Validate URL
      new URL(url);
      
      // Update current tab
      this.tabs[this.currentTab].url = url;
      this.browserFrame.src = url;
      
      // Save to session
      this.saveSession();
    } catch (e) {
      console.error('Invalid URL:', e);
      this.showError('Invalid URL format');
    }
  }

  addTab(url = '') {
    this.tabs.push({
      url: url,
      history: [],
      historyIndex: -1
    });
    this.switchTab(this.tabs.length - 1);
    this.renderTabs();
  }

  switchTab(index) {
    if (index < 0 || index >= this.tabs.length) return;
    
    this.currentTab = index;
    this.browserFrame.src = this.tabs[index].url;
    this.urlInput.value = this.tabs[index].url;
    this.renderTabs();
    this.updateNavButtons();
  }

  closeTab(index) {
    if (this.tabs.length <= 1) return; // Don't close last tab
    
    this.tabs.splice(index, 1);
    if (this.currentTab >= index) {
      this.currentTab = Math.max(0, this.currentTab - 1);
    }
    this.switchTab(this.currentTab);
  }

  renderTabs() {
    this.tabsContainer.innerHTML = '';
    
    this.tabs.forEach((tab, index) => {
      const tabEl = document.createElement('div');
      tabEl.className = `tab ${index === this.currentTab ? 'active' : ''}`;
      tabEl.textContent = tab.url ? new URL(tab.url).hostname : 'New Tab';
      
      tabEl.addEventListener('click', () => this.switchTab(index));
      
      const closeBtn = document.createElement('span');
      closeBtn.className = 'close-tab';
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeTab(index);
      });
      
      tabEl.appendChild(closeBtn);
      this.tabsContainer.appendChild(tabEl);
    });
  }

  addToHistory(url) {
    const tab = this.tabs[this.currentTab];
    
    // Don't add duplicate consecutive URLs
    if (tab.history[tab.historyIndex] === url) return;
    
    // Truncate forward history if navigating to new page
    if (tab.historyIndex < tab.history.length - 1) {
      tab.history = tab.history.slice(0, tab.historyIndex + 1);
    }
    
    tab.history.push(url);
    tab.historyIndex = tab.history.length - 1;
    this.saveSession();
  }

  goBack() {
    const tab = this.tabs[this.currentTab];
    if (tab.historyIndex > 0) {
      tab.historyIndex--;
      this.browserFrame.src = tab.history[tab.historyIndex];
      this.updateUrl(tab.history[tab.historyIndex]);
      this.saveSession();
    }
  }

  goForward() {
    const tab = this.tabs[this.currentTab];
    if (tab.historyIndex < tab.history.length - 1) {
      tab.historyIndex++;
      this.browserFrame.src = tab.history[tab.historyIndex];
      this.updateUrl(tab.history[tab.historyIndex]);
      this.saveSession();
    }
  }

  refresh() {
    this.browserFrame.src = this.browserFrame.src;
  }

  updateUrl(url) {
    this.urlInput.value = url;
    this.tabs[this.currentTab].url = url;
  }

  updateNavButtons() {
    const tab = this.tabs[this.currentTab];
    this.backButton.disabled = tab.historyIndex <= 0;
    this.forwardButton.disabled = tab.historyIndex >= tab.history.length - 1;
  }

  showError(message) {
    const errorEl = document.createElement('div');
    errorEl.className = 'browser-error';
    errorEl.textContent = message;
    
    const controls = document.querySelector('.browser-controls');
    controls.appendChild(errorEl);
    
    setTimeout(() => {
      errorEl.remove();
    }, 3000);
  }

  saveSession() {
    sessionStorage.setItem('nexusBrowser', JSON.stringify({
      tabs: this.tabs,
      currentTab: this.currentTab
    }));
  }

  restoreSession() {
    const saved = sessionStorage.getItem('nexusBrowser');
    if (saved) {
      try {
        const { tabs, currentTab } = JSON.parse(saved);
        this.tabs = tabs;
        this.currentTab = currentTab;
        this.switchTab(this.currentTab);
      } catch (e) {
        console.error('Failed to restore session:', e);
      }
    }
  }
}

// Initialize the browser when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const browser = new NexusBrowser();
  
  // Make browser instance globally available if needed
  window.nexusBrowser = browser;
});
