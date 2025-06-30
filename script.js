document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTabs();
    initBrowser();
    initCloak();
    initVisitorCounter();
    initServerStatus();
    renderAllContent();

    // Tab functionality - fixed and working
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const contentSections = document.querySelectorAll('.content-section');
        
        function switchTab(tabId) {
            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Deactivate all tab buttons
            tabButtons.forEach(button => {
                button.classList.remove('active');
            });
            
            // Show the selected content section
            const activeSection = document.getElementById(tabId);
            if (activeSection) {
                activeSection.classList.add('active');
            }
            
            // Activate the clicked tab button
            const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }
        
        // Add click event listeners to all tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                switchTab(tabId);
            });
        });
        
        // Activate Home tab by default
        switchTab('home');
    }

    // Browser functionality
    function initBrowser() {
        const browserGoBtn = document.getElementById('browser-go');
        const browserUrlInput = document.getElementById('browser-url');
        const browserFrame = document.getElementById('browser-frame');
        const browserFeedback = document.getElementById('browser-feedback');
        
        if (browserGoBtn && browserUrlInput && browserFrame) {
            browserGoBtn.addEventListener('click', loadUrl);
            browserUrlInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') loadUrl();
            });
            
            function loadUrl() {
                let url = browserUrlInput.value.trim();
                
                if (!url) {
                    browserFeedback.textContent = 'Please enter a URL';
                    browserFeedback.className = 'error';
                    return;
                }
                
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }
                
                try {
                    browserFrame.src = url;
                    browserFeedback.textContent = `Loading: ${url}`;
                    browserFeedback.className = 'success';
                } catch (error) {
                    browserFeedback.textContent = `Error loading: ${url}`;
                    browserFeedback.className = 'error';
                }
            }
        }
    }

    // Initialize other components (initCloak, initVisitorCounter, etc.)
    // ... (keep your existing implementations of these functions)
    
    function renderAllContent() {
        // Your existing content rendering logic
    }
});
