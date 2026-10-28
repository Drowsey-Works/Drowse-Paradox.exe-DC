const searchBtn = document.getElementById('searchBtn');
const searchInp = document.getElementById('searchInp');
const folderContainer = document.getElementById('folderContainer');
const filePanel = document.getElementById('filePanel');

function displayResults(list) {
    folderContainer.innerHTML = '';
    list.forEach((c, index) => {
        if (c.placement === 'char') {
            const folder = document.createElement('div');
            folder.className = 'folder-item';
            // Stagger the slide-in animation
            folder.style.animationDelay = `${index * 0.05}s`; 
            
            folder.innerHTML = `
                <div class="folder-tab">${c.name.substring(0, 3).toUpperCase()}</div>
                <div class="folder-front">
                    <div class="folder-icon"><i class="fas fa-folder"></i></div>
                    <span class="folder-name">${c.name}</span>
                    <div class="folder-stamp">CLASSIFIED</div>
                </div>
            `;
            
            folder.addEventListener('click', () => {
                showCharacterFile(c);
            });
            
            folderContainer.appendChild(folder);
        }
    });
}

function showCharacterFile(char) {
    let abilitiesHTML = '';
    
    // Build abilities if they exist
    if (characterAbilities[char.name]) {
        const abilities = characterAbilities[char.name];
        
        abilitiesHTML = `<div class="file-section abilities-section"><h3>ABILITY FILE</h3>`;
        
        if (abilities.passives && abilities.passives.length > 0) {
            abilitiesHTML += `<h4 class="sub-heading">Passives</h4><div class="passives-list">`;
            abilities.passives.forEach(passive => {
                abilitiesHTML += `<div class="passive-item"><strong>${passive.name}:</strong> ${passive.description}</div>`;
            });
            abilitiesHTML += `</div>`;
        }
        
        if (abilities.abilities && abilities.abilities.length > 0) {
            abilitiesHTML += `<h4 class="sub-heading" style="margin-top: 20px;">Active Abilities</h4><div class="abilities-list">`;
            abilities.abilities.forEach(ability => {
                abilitiesHTML += `
                    <div class="ability-item">
                        <div class="ability-header">
                            <img src="${ability.icon}" class="ability-icon" onerror="this.src='https://via.placeholder.com/50x50/333/fff?text=?'">
                            <span class="ability-name">${ability.name}</span>
                        </div>
                        <p class="ability-description">${ability.description}</p>
                    </div>
                `;
            });
            abilitiesHTML += `</div>`;
        }
        abilitiesHTML += `</div>`;
    }

    let statsHTML = `<div class="file-section stats-section"><h3>INTEL & STATS</h3><div class="stats-grid">`;
    const statOrder = ["Skill Level", "Difficulty", "Health", "HP", "Role", "Regular Speed", "Sprinting Speed", "Max Stamina", "Stamina Loss per sec", "Stamina Gain per sec", "Terror Radius"];

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
    statsHTML += `</div></div>`;

    let skinsHTML = '';
    if (char.skins) {
        skinsHTML = `
            <div class="file-section skins-section">
                <h3>KNOWN DISGUISES</h3>
                <button class="skins-toggle-btn" id="skinsBtn">View Files</button>
                <div class="skins-menu" id="skinsMenu">
                    <div class="skins-grid">
                        ${char.skins.map(skin => `
                            <div class="skin-item" data-img="${skin.img}">
                                <img src="${skin.img}" alt="${skin.name}">
                                <div class="skin-overlay"><span class="skin-name">${skin.name}</span></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    const viewDetails = document.getElementById('viewDetails');
    viewDetails.innerHTML = `
        <div class="file-header">
            <h1>${char.name.toUpperCase()}</h1>
            <div class="file-subtitle">CASE FILE #${Math.floor(Math.random() * 9000) + 1000}</div>
        </div>
        
        <div class="file-layout">
            <div class="file-image-box">
                <img src="${char.img}" alt="${char.name}" onerror="this.src='https://via.placeholder.com/300x400/333/fff?text=MISSING+FILE'">
                ${skinsHTML}
            </div>
            
            <div class="file-text-box">
                <div class="file-section">
                    <h3>DESCRIPTION</h3>
                    <p>${char.description || 'No description found in archives.'}</p>
                </div>
                ${statsHTML}
            </div>
        </div>
        
        ${abilitiesHTML}
    `;

    filePanel.classList.add('active');

    // Handle skin logic
    if (char.skins) {
        const skinsBtn = document.getElementById('skinsBtn');
        const skinsMenu = document.getElementById('skinsMenu');
        const mainImg = document.querySelector('.file-image-box img');
        const skinItems = document.querySelectorAll('.skin-item');

        skinsBtn.addEventListener('click', () => skinsMenu.classList.toggle('active'));
        skinItems.forEach(item => {
            item.addEventListener('click', () => {
                mainImg.src = item.getAttribute('data-img');
                skinsMenu.classList.remove('active');
                skinItems.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
            });
        });
    }
}

// Search Functionality
searchInp.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
        displayResults(characters);
        return;
    }
    const filtered = characters.filter(c => c.name.toLowerCase().includes(query));
    displayResults(filtered);
});

// Close Panel
document.getElementById('closeView').addEventListener('click', () => {
    filePanel.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') filePanel.classList.remove('active');
});

// Initialize
displayResults(characters);
