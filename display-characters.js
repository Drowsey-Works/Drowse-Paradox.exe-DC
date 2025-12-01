
const searchBtn = document.getElementById('searchBtn');
        const searchInp = document.getElementById('searchInp');
        const results = document.getElementById('results');

        function displayResults(list) {
            results.innerHTML = '';
            list.forEach(c => {
                if (c.placement === 'contentSeparator') {
                    const sep = document.createElement('div');
                    sep.className = 'content-separator';
                    sep.textContent = c.name;
                    results.appendChild(sep);
                } else if (c.placement === 'charSeparator') {
                    const sep = document.createElement('div');
                    sep.className = 'category-separator';
                    sep.textContent = c.name;
                    results.appendChild(sep);
                } else if (c.placement === 'char') {
                    const div = document.createElement('div');
                    div.className = 'result-item';
                    div.innerHTML = `
        <img src="${c.img}" alt="${c.name}">
        <span>${c.name}</span>
        <button class="view-btn" data-name="${c.name}">View</button>
      `;
                    results.appendChild(div);
                }
            });

            // Add event listeners to the newly created view buttons
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    const name = e.target.getAttribute('data-name');
                    const char = characters.find(c => c.name === name);
                    if (char) {
                        showCharacterStats(char);
                    }
                });
            });
        }

        // MOVE THIS FUNCTION OUTSIDE displayResults
function showCharacterStats(char) {
    results.classList.add('fade-out');

    setTimeout(() => {
        const viewDetails = document.getElementById('viewDetails');
        
        let abilitiesHTML = '';
        
        // Check if this character has abilities data
        if (characterAbilities[char.name]) {
            const abilities = characterAbilities[char.name];
            
            abilitiesHTML = `
                <div class="character-abilities">
            `;
            
            // Add passives section if they exist
            if (abilities.passives && abilities.passives.length > 0) {
                abilitiesHTML += `
                    <div class="passives-section">
                        <h3>Passives</h3>
                        <div class="passives-list">
                `;
                
                abilities.passives.forEach(passive => {
                    abilitiesHTML += `
                        <div class="passive-item">
                            <strong>${passive.name}:</strong> ${passive.description}
                        </div>
                    `;
                });
                
                abilitiesHTML += `
                        </div>
                    </div>
                `;
            }
            
            // Add abilities section if they exist
            if (abilities.abilities && abilities.abilities.length > 0) {
                abilitiesHTML += `
                    <div class="abilities-section">
                        <h3>Abilities</h3>
                        <div class="abilities-list">
                `;
                
                abilities.abilities.forEach((ability, index) => {
                    abilitiesHTML += `
                        <div class="ability-item">
                            <div class="ability-header">
                                <img src="${ability.icon}" alt="${ability.name}" class="ability-icon" onerror="this.src='https://via.placeholder.com/50x50/333/fff?text=?'">
                                <span class="ability-name">${ability.name}</span>
                            </div>
                            <p class="ability-description">${ability.description}</p>
                            ${index < abilities.abilities.length - 1 ? '<hr class="ability-divider">' : ''}
                        </div>
                    `;
                });
                
                abilitiesHTML += `
                        </div>
                    </div>
                `;
            }
            
            abilitiesHTML += `</div>`;
        }

        let statsHTML = `
            <div class="character-header">
                <h1>${char.name.toUpperCase()}</h1>
            </div>
            
            <div class="character-content">
                <div class="character-image">
                    <img src="${char.img}" alt="${char.name}" onerror="this.src='https://via.placeholder.com/300x400/333/fff?text=Image+Not+Found'">
                </div>
                
                <div class="character-stats">
                    <h3>STATS</h3>
                    <div class="stats-grid">
        `;

        // Add stats in the exact order you want
        const statOrder = [
            "Difficulty",
            "Health",
            "Regular Speed", 
            "Sprinting Speed",
            "Max Stamina",
            "Stamina Loss per sec",
            "Stamina Gain per sec"
        ];

        statOrder.forEach(stat => {
            if (char.stats && char.stats[stat] !== undefined) {
                statsHTML += `
                    <div class="stat-row">
                        <span class="stat-label">${stat}:</span>
                        <span class="stat-value">${char.stats[stat]}</span>
                    </div>
                `;
            }
        });

        statsHTML += `
                    </div>
                </div>
            </div>
            
            <div class="character-description">
                <h3>GENERAL INFO</h3>
                <p>${char.description}</p>
            </div>
            
            ${abilitiesHTML}
        `;

        viewDetails.innerHTML = statsHTML;
        document.getElementById('viewPanel').classList.add('active');
    }, 400);
}


// Add search on input (better UX)
searchInp.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
        displayResults(characters);
        return;
    }
    const filtered = characters.filter(c => c.name.toLowerCase().includes(query));
    displayResults(filtered);
});

// Add keyboard support
searchInp.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

// Add escape key to close panel
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('viewPanel').classList.remove('active');
        results.classList.remove('fade-out');
    }
});

        // Show all by default
        displayResults(characters);


        // Close button logic
        document.getElementById('closeView').addEventListener('click', () => {
            document.getElementById('viewPanel').classList.remove('active');
            setTimeout(() => {
                results.classList.remove('fade-out');
            }, 500);
        });
