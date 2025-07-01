document.addEventListener('DOMContentLoaded', function() {
    // Sample game data
    const games = [
        {
            id: 1,
            title: "Epic Adventure",
            icon: "fas fa-dragon",
            rating: 4.8,
            color: "#e84393"
        },
        {
            id: 2,
            title: "Space Explorer",
            icon: "fas fa-rocket",
            rating: 4.5,
            color: "#0984e3"
        },
        {
            id: 3,
            title: "Puzzle Master",
            icon: "fas fa-puzzle-piece",
            rating: 4.2,
            color: "#00b894"
        },
        {
            id: 4,
            title: "Football Pro",
            icon: "fas fa-futbol",
            rating: 4.7,
            color: "#fdcb6e"
        },
        {
            id: 5,
            title: "Battle Royale",
            icon: "fas fa-crosshairs",
            rating: 4.9,
            color: "#d63031"
        },
        {
            id: 6,
            title: "Chess Champion",
            icon: "fas fa-chess",
            rating: 4.3,
            color: "#6c5ce7"
        },
        {
            id: 7,
            title: "Mystery Island",
            icon: "fas fa-map-marked-alt",
            rating: 4.6,
            color: "#00cec9"
        },
        {
            id: 8,
            title: "Basketball Stars",
            icon: "fas fa-basketball-ball",
            rating: 4.4,
            color: "#e17055"
        }
    ];

    // DOM elements
    const gamesContainer = document.getElementById('games-container');
    const searchInput = document.getElementById('search-input');

    // Render all games initially
    function renderGames(gamesToRender) {
        gamesContainer.innerHTML = '';

        if (gamesToRender.length === 0) {
            gamesContainer.innerHTML = '<div class="no-results">No games found matching your search.</div>';
            return;
        }

        gamesToRender.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <div class="game-image" style="background-color: ${game.color}">
                    <i class="${game.icon}"></i>
                </div>
                <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <div class="game-rating">
                        ${'★'.repeat(Math.floor(game.rating))}${'☆'.repeat(5-Math.floor(game.rating))} ${game.rating}
                    </div>
                </div>
            `;
            
            gameCard.addEventListener('click', () => {
                alert(`Launching ${game.title}!`);
                // In a real app, this would launch the game
            });
            
            gamesContainer.appendChild(gameCard);
        });
    }

    // Filter games based on search input
    function filterGames() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredGames = games.filter(game => 
            game.title.toLowerCase().includes(searchTerm)
        );
        renderGames(filteredGames);
    }

    // Event listeners
    searchInput.addEventListener('input', filterGames);

    // Initial render
    renderGames(games);
});
