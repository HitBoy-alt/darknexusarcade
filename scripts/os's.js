document.addEventListener('DOMContentLoaded', function() {
    // Operating Systems Data
    const operatingSystems = [
        {
            id: 1,
            name: "Windows 11",
            type: "desktop",
            logo: "fab fa-windows",
            color: "#0078d7",
            description: "Microsoft's flagship operating system with a modern UI and productivity features.",
            features: [
                "DirectX 12 Ultimate",
                "Android app support",
                "Microsoft Teams integration",
                "Virtual desktops"
            ]
        },
        {
            id: 2,
            name: "macOS Monterey",
            type: "desktop",
            logo: "fab fa-apple",
            color: "#000000",
            description: "Apple's powerful operating system for Mac computers with seamless ecosystem integration.",
            features: [
                "Universal Control",
                "AirPlay to Mac",
                "Focus modes",
                "Live Text"
            ]
        },
        {
            id: 3,
            name: "Ubuntu 22.04 LTS",
            type: ["desktop", "server"],
            logo: "fab fa-ubuntu",
            color: "#e95420",
            description: "Popular Linux distribution known for its stability and ease of use.",
            features: [
                "GNOME 42 desktop",
                "Wayland by default",
                "5-year support",
                "Open-source"
            ]
        },
        {
            id: 4,
            name: "Android 13",
            type: "mobile",
            logo: "fab fa-android",
            color: "#3ddc84",
            description: "Google's mobile OS with enhanced privacy controls and customization.",
            features: [
                "Material You design",
                "Privacy dashboard",
                "Per-app language",
                "Fast pairing"
            ]
        },
        {
            id: 5,
            name: "iOS 16",
            type: "mobile",
            logo: "fab fa-apple",
            color: "#007aff",
            description: "Apple's mobile operating system with redesigned lock screen and focus modes.",
            features: [
                "Customizable lock screen",
                "Focus filters",
                "Live Activities",
                "Safety Check"
            ]
        },
        {
            id: 6,
            name: "Red Hat Enterprise Linux",
            type: "server",
            logo: "fab fa-redhat",
            color: "#ee0000",
            description: "Enterprise-grade Linux distribution with long-term support.",
            features: [
                "10-year lifecycle",
                "SELinux security",
                "Podman containers",
                "System roles"
            ]
        },
        {
            id: 7,
            name: "Chrome OS Flex",
            type: "desktop",
            logo: "fab fa-chrome",
            color: "#4285f4",
            description: "Cloud-first OS that brings Chrome OS to PCs and Macs.",
            features: [
                "Fast boot times",
                "Automatic updates",
                "Google Play support",
                "Linux apps"
            ]
        },
        {
            id: 8,
            name: "Fedora Server",
            type: "server",
            logo: "fas fa-server",
            color: "#51a2da",
            description: "Cutting-edge Linux server distribution with the latest technologies.",
            features: [
                "Cockpit web console",
                "Stratis storage",
                "Modular repositories",
                "Fast updates"
            ]
        }
    ];

    // DOM Elements
    const osContainer = document.getElementById('os-container');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Current filter state
    let currentType = 'all';
    let currentSearchTerm = '';

    // Render OS cards
    function renderOS() {
        osContainer.innerHTML = '';

        const filteredOS = operatingSystems.filter(os => {
            const matchesType = currentType === 'all' || 
                              (Array.isArray(os.type) ? os.type.includes(currentType) : os.type === currentType);
            const matchesSearch = os.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
            return matchesType && matchesSearch;
        });

        if (filteredOS.length === 0) {
            osContainer.innerHTML = '<div class="no-results">No operating systems found matching your criteria.</div>';
            return;
        }

        filteredOS.forEach(os => {
            const osCard = document.createElement('div');
            osCard.className = 'os-card';
            
            osCard.innerHTML = `
                <div class="os-header" style="background-color: ${os.color}">
                    <i class="${os.logo} os-logo"></i>
                </div>
                <div class="os-body">
                    <h3 class="os-title">${os.name}</h3>
                    <span class="os-type">${Array.isArray(os.type) ? os.type.join(' / ') : os.type}</span>
                    <p class="os-description">${os.description}</p>
                    <div class="os-features">
                        ${os.features.map(feature => `
                            <div class="feature">
                                <i class="fas fa-check-circle"></i>
                                <span>${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            osContainer.appendChild(osCard);
        });
    }

    // Search functionality
    function handleSearch() {
        currentSearchTerm = searchInput.value.trim();
        renderOS();
    }

    // Filter by type
    function handleFilter() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        currentType = this.dataset.type;
        renderOS();
    }

    // Event listeners
    searchInput.addEventListener('input', handleSearch);
    filterButtons.forEach(btn => btn.addEventListener('click', handleFilter));

    // Initial render
    renderOS();
});
