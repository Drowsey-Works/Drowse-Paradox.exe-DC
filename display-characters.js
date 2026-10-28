const dialogue = new DialogueEngine();
const indexCard = document.getElementById('indexCard');
const indexGrid = document.getElementById('indexGrid');
const indexCounter = document.getElementById('indexCounter');
const folderSlot = document.getElementById('folderSlot');
const chosenFolder = document.getElementById('chosenFolder');
const chosenFolderName = document.getElementById('chosenFolderName');
const backToIndex = document.getElementById('backToIndex');
const filePanel = document.getElementById('filePanel');

const survivors = characters.filter(c =>
    !['2020x The Jester','Smoky The Demon','NMercy The Mutated Corpse','Rosetti The Spider'].includes(c.name)
);
const tormentors = characters.filter(c =>
    ['2020x The Jester','Smoky The Demon','NMercy The Mutated Corpse','Rosetti The Spider'].includes(c.name)
);

let chosenSide = null;
let switchCount = 0; // Tracks how many times they switch sides

// The Archivist's judgemental lines for switching
const switchLines = [
    "Ah, got a bit turned around?",
    "Hm, bit indecisive aren't you?",
    "Came to view another perspective?",
    "A bit bipolar, ain't we?"
];

// ============================================================
// NAME INDEX GRID
// ============================================================
function renderNameIndex(list) {
    indexGrid.innerHTML = '';
    indexCounter.textContent = `${list.length} ENTR${list.length === 1 ? 'Y' : 'IES'}`;

    list.forEach((c, index) => {
        const nameBtn = document.createElement('button');
        nameBtn.className = 'index-name';
        nameBtn.style.animationDelay = `${index * 0.04}s`;
        nameBtn.innerHTML = `<span class="index-num">${String(index + 1).padStart(2,'0')}</span><span class="index-label">${c.name}</span>`;
        nameBtn.addEventListener('click', () => selectName(c));
        indexGrid.appendChild(nameBtn);
    });

    indexCard.classList.add('visible');
}

function selectName(char) {
    indexCard.classList.remove('visible');
    folderSlot.classList.add('visible');
    chosenFolder.classList.remove('flipped');

    chosenFolderName.textContent = char.name;
    chosenFolder.querySelector('.folder-tab').textContent = char.name.substring(0, 4).toUpperCase();

    // The click sequence for the folder
    chosenFolder.onclick = () => {
        if (!chosenFolder.classList.contains('flipped')) {
            // 1. Flip the cover open
            chosenFolder.classList.add('flipped');
            
            // 2. Wait for flip, then zoom in
            setTimeout(() => {
                chosenFolder.classList.add('zooming');
                
                // 3. Fade to black
                document.querySelector('.desk-vignette').classList.add('fade-black');
                
                // 4. Show the document after the screen is dark
                setTimeout(() => {
                    openFile(char);
                    // Reset UI so if they close the file, they return to the desk
                    chosenFolder.classList.remove('flipped', 'zooming');
                    document.querySelector('.desk-vignette').classList.remove('fade-black');
                    folderSlot.classList.remove('visible');
                    indexCard.classList.add('visible');
                }, 1000); // 1s for the dark transition
            }, 600); // 0.6s for the 3D flip
        }
    };
}

backToIndex.addEventListener('click', () => {
    folderSlot.classList.remove('visible');
    indexCard.classList.add('visible');
});

// ============================================================
// SIDE SWITCHING (The "Switch Side" Button)
// ============================================================
function showSwitchButton() {
    const switchBtn = document.createElement('button');
    switchBtn.className = 'switch-side-btn';
    switchBtn.innerHTML = `<i class="fas fa-sync-alt"></i> SWITCH SIDE`;
    
    // Add it to the index card header
    const header = document.querySelector('.index-header');
    if (!document.querySelector('.switch-side-btn')) {
        header.appendChild(switchBtn);
    }

    switchBtn.onclick = () => {
        indexCard.classList.remove('visible');
        dialogue.start([
            {
                text: switchLines[switchCount % switchLines.length],
                effect: 'normal'
            },
            {
                text: "Alright, then... who else are you looking for?",
                effect: 'normal',
                choices: [
                    { label: 'SURVIVORS', onSelect: () => { chosenSide = 'survivors'; } },
                    { label: 'TORMENTORS', onSelect: () => { chosenSide = 'tormentors'; } }
                ]
            }
        ], () => {
            switchCount++;
            if (chosenSide === 'survivors') {
                renderNameIndex(survivors);
            } else {
                renderNameIndex(tormentors);
            }
        });
    };
}

// ============================================================
// FILE DISPLAY
// ============================================================
function openFile(char) {
    let abilitiesHTML = '';
    if (characterAbilities[char.name]) {
        const ab = characterAbilities[char.name];
        abilitiesHTML = `<div class="file-section abilities-section"><h3>ABILITY FILE</h3>`;
        if (ab.passives && ab.passives.length) {
            abilitiesHTML += `<h4 class="sub-heading">Passives</h4><div class="passives-list">`;
            ab.passives.forEach(p => {
                abilitiesHTML += `<div class="passive-item"><strong>${p.name}:</strong> ${p.description}</div>`;
            });
            abilitiesHTML += `</div>`;
        }
        if (ab.abilities && ab.abilities.length) {
            abilitiesHTML += `<h4 class="sub-heading" style="margin-top:20px;">Active Abilities</h4><div class="abilities-list">`;
            ab.abilities.forEach(a => {
                abilitiesHTML += `
                    <div class="ability-item">
                        <div class="ability-header">
                            <img src="${a.icon}" class="ability-icon" onerror="this.src='https://via.placeholder.com/50x50/333/fff?text=?'">
                            <span class="ability-name">${a.name}</span>
                        </div>
                        <p class="ability-description">${a.description}</p>
                    </div>`;
            });
            abilitiesHTML += `</div>`;
        }
        abilitiesHTML += `</div>`;
    }

    let statsHTML = `<div class="file-section stats-section"><h3>INTEL & STATS</h3><div class="stats-grid">`;
    const order = ["Skill Level","Difficulty","Health","HP","Role","Regular Speed","Sprinting Speed","Max Stamina","Stamina Loss per sec","Stamina Gain per sec","Terror Radius"];
    order.forEach(s => {
        if (char.stats && char.stats[s] !== undefined) {
            statsHTML += `<div class="stat-row"><span class="stat-label">${s}:</span><span class="stat-value">${char.stats[s]}</span></div>`;
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
                        ${char.skins.map(s => `<div class="skin-item" data-img="${s.img}"><img src="${s.img}"><div class="skin-overlay"><span class="skin-name">${s.name}</span></div></div>`).join('')}
                    </div>
                </div>
            </div>`;
    }

    const viewDetails = document.getElementById('viewDetails');
    viewDetails.innerHTML = `
        <div class="file-header">
            <h1>${char.name.toUpperCase()}</h1>
            <div class="file-subtitle">CASE FILE #${Math.floor(Math.random()*9000)+1000} — ${chosenSide?.toUpperCase()}</div>
        </div>
        <div class="file-layout">
            <div class="file-image-box">
                <img src="${char.img}" onerror="this.src='https://via.placeholder.com/300x400/333/fff?text=MISSING+FILE'">
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

document.getElementById('closeView').addEventListener('click', () => {
    filePanel.classList.remove('active');
    // Ensure index is visible when closing file
    setTimeout(() => {
        indexCard.classList.add('visible');
        showSwitchButton(); // Ensure button is there
    }, 300);
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (filePanel.classList.contains('active')) {
            filePanel.classList.remove('active');
            setTimeout(() => {
                indexCard.classList.add('visible');
                showSwitchButton();
            }, 300);
        }
    }
});

// ============================================================
// INTRO SEQUENCE
// ============================================================
window.addEventListener('load', () => {
    document.getElementById('desk').classList.add('lit');

    setTimeout(() => {
        dialogue.start([
            {
                text: [
                    { text: "You are here for ", effect: 'normal' },
                    { text: "THEM", effect: 'shake' },
                    { text: ", aren't you?", effect: 'normal' }
                ]
            },
            {
                text: "Which side of them are you asking for...",
                choices: [
                    { label: 'SURVIVORS', onSelect: () => { chosenSide = 'survivors'; } },
                    { label: 'TORMENTORS', onSelect: () => { chosenSide = 'tormentors'; } }
                ]
            }
        ], () => {
            if (chosenSide === 'survivors') {
                dialogue.start([
                    {
                        text: [
                            { text: "Ah, wanna be a ", effect: 'normal' },
                            { text: "HERO", effect: 'wave' },
                            { text: " don't you? Everyone does...", effect: 'normal' }
                        ]
                    },
                    {
                        text: "Who are you looking for... which name?",
                        onShow: () => {
                            renderNameIndex(survivors);
                            showSwitchButton();
                            setTimeout(() => {
                                document.getElementById('dialogueOverlay').classList.remove('active');
                            }, 1600);
                        }
                    }
                ]);
            } else {
                dialogue.start([
                    {
                        text: [
                            { text: "Ah, a ", effect: 'normal' },
                            { text: "MONSTER", effect: 'shake' },
                            { text: " at heart. I like that...", effect: 'normal' }
                        ]
                    },
                    {
                        text: "Who are you looking for... which name?",
                        onShow: () => {
                            renderNameIndex(tormentors);
                            showSwitchButton();
                            setTimeout(() => {
                                document.getElementById('dialogueOverlay').classList.remove('active');
                            }, 1600);
                        }
                    }
                ]);
            }
        });
    }, 800);
});
