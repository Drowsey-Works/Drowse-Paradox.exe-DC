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
let switchCount = 0;

// Generation counter — invalidates stale flip timeouts if the user
// clicks BACK TO INDEX or picks another character mid-animation.
let flipGeneration = 0;

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
    chosenFolder.classList.remove('flipped', 'zooming');
    document.querySelector('.desk-vignette').classList.remove('fade-black');

    chosenFolderName.textContent = char.name;
    chosenFolder.querySelector('.folder-tab').textContent = char.name.substring(0, 4).toUpperCase();

    chosenFolder.onclick = () => {
        if (chosenFolder.classList.contains('flipped')) return;

        const myGen = ++flipGeneration;
        chosenFolder.classList.add('flipped');

        // 600ms flip + 800ms hold so the user actually sees the inside
        setTimeout(() => {
            if (myGen !== flipGeneration) return;

            chosenFolder.classList.add('zooming');
            document.querySelector('.desk-vignette').classList.add('fade-black');

            setTimeout(() => {
                if (myGen !== flipGeneration) return;

                openFile(char);
                chosenFolder.classList.remove('flipped', 'zooming');
                document.querySelector('.desk-vignette').classList.remove('fade-black');
                folderSlot.classList.remove('visible');
                indexCard.classList.add('visible');
            }, 1000);
        }, 1400);
    };
}

backToIndex.addEventListener('click', () => {
    flipGeneration++;
    folderSlot.classList.remove('visible');
    indexCard.classList.add('visible');
    chosenFolder.classList.remove('flipped', 'zooming');
    document.querySelector('.desk-vignette').classList.remove('fade-black');
});

// ============================================================
// SIDE SWITCHING
// ============================================================
function showSwitchButton() {
    if (document.querySelector('.switch-side-btn')) return;
    const switchBtn = document.createElement('button');
    switchBtn.className = 'switch-side-btn';
    switchBtn.innerHTML = `<i class="fas fa-sync-alt"></i> SWITCH SIDE`;
    document.querySelector('.index-header').appendChild(switchBtn);

    switchBtn.onclick = () => {
        indexCard.classList.remove('visible');
        dialogue.start([
            { text: switchLines[switchCount % switchLines.length], effect: 'normal' },
            {
                text: "Alright, then... who else are you looking for?",
                choices: [
                    { label: 'SURVIVORS', onSelect: () => { chosenSide = 'survivors'; } },
                    { label: 'TORMENTORS', onSelect: () => { chosenSide = 'tormentors'; } }
                ]
            }
        ], () => {
            switchCount++;
            renderNameIndex(chosenSide === 'survivors' ? survivors : tormentors);
        });
    };
}

// ============================================================
// FULL-PAGE DOSSIER
// ============================================================
function openFile(char) {
    // ---------- Abilities column ----------
    let abilitiesHTML = '';
    if (characterAbilities[char.name]) {
        const ab = characterAbilities[char.name];
        abilitiesHTML = `<div class="dossier-column right-column"><h3 class="column-title">ABILITY FILE</h3>`;

        if (ab.passives && ab.passives.length) {
            abilitiesHTML += `<h4 class="sub-heading">Passives</h4><div class="passives-list">`;
            ab.passives.forEach(p => {
                abilitiesHTML += `<div class="passive-item"><strong>${p.name}:</strong> ${p.description}</div>`;
            });
            abilitiesHTML += `</div>`;
        }
        if (ab.abilities && ab.abilities.length) {
            abilitiesHTML += `<h4 class="sub-heading">Active Abilities</h4><div class="abilities-list">`;
            ab.abilities.forEach(a => {
                abilitiesHTML += `
                    <div class="ability-item">
                        <div class="ability-header">
                            <img src="${a.icon}" class="ability-icon" onerror="this.src='https://via.placeholder.com/50x50/8c7a58/221100?text=?'">
                            <span class="ability-name">${a.name}</span>
                        </div>
                        <p class="ability-description">${a.description}</p>
                    </div>`;
            });
            abilitiesHTML += `</div>`;
        }
        abilitiesHTML += `</div>`;
    } else {
        abilitiesHTML = `<div class="dossier-column right-column"><h3 class="column-title">ABILITY FILE</h3><p class="empty-state">No ability data on file for this subject.</p></div>`;
    }

    // ---------- Stats block ----------
    let statsHTML = '';
    if (char.stats && Object.keys(char.stats).length > 0) {
        statsHTML = `<div class="stats-block">`;
        const order = ["Skill Level","Difficulty","Health","HP","Role","Regular Speed","Sprinting Speed","Max Stamina","Stamina Loss per sec","Stamina Gain per sec","Terror Radius"];
        order.forEach(s => {
            if (char.stats[s] !== undefined) {
                statsHTML += `<div class="stat-row"><span class="stat-label">${s}:</span><span class="stat-value">${char.stats[s]}</span></div>`;
            }
        });
        statsHTML += `</div>`;
    }

    // ---------- Skins menu ----------
    let skinsHTML = '';
    if (char.skins && char.skins.length) {
        skinsHTML = `
            <div class="skins-section">
                <button class="skins-toggle-btn" id="skinsBtn"><i class="fas fa-mask"></i> KNOWN DISGUISES</button>
                <div class="skins-menu" id="skinsMenu">
                    <div class="skins-grid">
                        ${char.skins.map(s => `<div class="skin-item" data-img="${s.img}"><img src="${s.img}"><div class="skin-overlay"><span class="skin-name">${s.name}</span></div></div>`).join('')}
                    </div>
                </div>
            </div>`;
    }

    // ---------- Compose ----------
    const viewDetails = document.getElementById('viewDetails');
    viewDetails.innerHTML = `
        <div class="dossier-header">
            <div>
                <h1>${char.name.toUpperCase()}</h1>
                <div class="file-subtitle">CASE FILE #${Math.floor(Math.random()*9000)+1000} — ${chosenSide?.toUpperCase()}</div>
            </div>
            <div class="classified-stamp">CLASSIFIED</div>
        </div>

        <div class="dossier-body">
            <div class="dossier-column left-column">
                <div class="image-box">
                    <img src="${char.img}" onerror="this.src='https://via.placeholder.com/400x500/333/fff?text=MISSING+FILE'">
                </div>
                ${skinsHTML}
                <div class="section">
                    <h3 class="column-title">SUBJECT DESCRIPTION</h3>
                    <p>${char.description || 'No description found in archives.'}</p>
                </div>
                ${statsHTML ? `<div class="section"><h3 class="column-title">INTEL &amp; STATS</h3>${statsHTML}</div>` : ''}
            </div>
            ${abilitiesHTML}
        </div>
    `;

    filePanel.classList.add('active');
    filePanel.scrollTop = 0;

    // ---------- Wire up skins ----------
    if (char.skins && char.skins.length) {
        const skinsBtn = document.getElementById('skinsBtn');
        const skinsMenu = document.getElementById('skinsMenu');
        const mainImg = document.querySelector('.image-box img');
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
    setTimeout(() => {
        indexCard.classList.add('visible');
        showSwitchButton();
    }, 300);
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && filePanel.classList.contains('active')) {
        filePanel.classList.remove('active');
        setTimeout(() => {
            indexCard.classList.add('visible');
            showSwitchButton();
        }, 300);
    }
});

// ============================================================
// INTRO
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
                            setTimeout(() => document.getElementById('dialogueOverlay').classList.remove('active'), 1600);
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
                            setTimeout(() => document.getElementById('dialogueOverlay').classList.remove('active'), 1600);
                        }
                    }
                ]);
            }
        });
    }, 800);
});

// ... Keep all your existing code at the top ...

// Update selectName
function selectName(char) {
    indexCard.classList.remove('visible');
    
    // Instead of CSS classes, tell Three.js to show the folder
    window.spawn3DFolder(char.name);
    
    // When the 3D folder finishes flipping, Three.js calls this:
    window.openDossierFrom3D = () => {
        openFile(char); // Opens your HTML dossier
        window.hide3DFolder();
        indexCard.classList.add('visible');
        
        // Reset the 3D state so it can be clicked again later
        window.openDossierFrom3D = null; 
    };
}

// ... Keep the rest of your code (openFile, intro, etc) exactly the same ...
