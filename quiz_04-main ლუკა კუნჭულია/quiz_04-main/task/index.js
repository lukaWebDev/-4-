document.addEventListener('DOMContentLoaded', () => {
    const charactersTableBody = document.getElementById('charactersTableBody');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const searchInput = document.getElementById('searchInput');
    const addCharacterForm = document.getElementById('addCharacterForm');
    const characterNameInput = document.getElementById('characterName');
    let allCharacters = []; 
    const fetchCharacters = async () => {
        loadingIndicator.style.display = 'flex';
        try {
            const response = await fetch('https://swapi.dev/api/people/');
            const data = await response.json();
            allCharacters = data.results.map(character => ({
                name: character.name,
                isCustom: false
            }));
            displayCharacters(allCharacters);
        } catch (error) {
            console.error('Error fetching Star Wars characters:', error);
            charactersTableBody.innerHTML = '<tr><td colspan="1">Failed to load characters. Please try again later.</td></tr>';
        } finally {
            loadingIndicator.style.display = 'none';
        }
    };
    const displayCharacters = (characters) => {
        charactersTableBody.innerHTML = ''; 
        if (characters.length === 0) {
            charactersTableBody.innerHTML = '<tr><td colspan="1">No characters found.</td></tr>';
            return;
        }
        characters.forEach(character => {
            const row = document.createElement('tr');
            if (character.isCustom) {
                row.classList.add('custom-character');
            }
            const nameCell = document.createElement('td');
            nameCell.textContent = character.name;
            row.appendChild(nameCell);
            charactersTableBody.appendChild(row);
        });
    };
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCharacters = allCharacters.filter(character =>
            character.name.toLowerCase().includes(searchTerm)
        );
        displayCharacters(filteredCharacters);
    });
    addCharacterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newCharacterName = characterNameInput.value.trim();
        if (newCharacterName) {
            const newCharacter = { name: newCharacterName, isCustom: true };
            allCharacters.push(newCharacter);
            allCharacters.sort((a, b) => a.name.localeCompare(b.name));
            displayCharacters(allCharacters); 
            characterNameInput.value = ''; 
        }
    });
    fetchCharacters();
});