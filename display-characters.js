const dialogue = new DialogueEngine();
const filePanel = document.getElementById('filePanel');

const tormentorsList = ['2020x The Jester','Smoky The Demon','NMercy The Mutated Corpse','Rozetti The Spider','SpaceHog The ShapeShifter'];

const survivors = characters.filter(c => !tormentorsList.includes(c.name));
const tormentors = characters.filter(c => tormentorsList.includes(c.name));

let chosenSide = null;
let switchCount = 0;
const switchLines = ["Ah, got a bit turned around?", "Hm, bit indecisive aren't you?", "Came to view another perspective?", "A bit bipolar, ain't we?"];

// --- HTML DOSSIER (Same as before) ---
function openFile(char) {
    let abilitiesHTML = '';
    if (characterAbilities[char.name]) {
        const ab = characterAbilities[char.name];
        abilitiesHTML = `<div class="dossier-column right-column"><h3 class="column-title">ABILITY FILE</h3>`;
        if (ab.passives && ab.passives.length) {
            abilitiesHTML += `<h4 class="sub-heading">Passives</h4><div class="passives-list">`;
            ab.passives.forEach(p => { abilitiesHTML += `<div class="passive-item"><strong>${p.name}:</strong> ${p.description}</div>`; });
            abilitiesHTML += `</div>`;
        }
        if (ab.abilities && ab.abilities.length) {
            abilitiesHTML += `<h4 class="sub-heading">Active Abilities</h4><div class="abilities-list">`;
            ab.abilities.forEach(a => {
                abilitiesHTML += `<div class="ability-item"><div class="ability-header"><img src="${a.icon}" class="ability-icon" onerror="this.src='https://via.placeholder.com/50x50/8c7a58/221100?text=?'"><span class="ability-name">${a.name}</span></div><p class="ability-description">${a.description}</p></div>`;
            });
            abilitiesHTML += `</div>`;
        }
        abilitiesHTML += `</div>`;
    } else {
        abilitiesHTML = `<div class="dossier-column right-column"><h3 class="column-title">ABILITY FILE</h3><p class="empty-state">No ability data on file for this subject.</p></div>`;
    }

    let statsHTML = '';
    if (char.stats && Object.keys(char.stats).length > 0) {
        statsHTML = `<div class="stats-block">`;
        ["Skill Level","Difficulty","Health","HP","Role","Regular Speed","Sprinting Speed","Max Stamina","Stamina Loss per sec","Stamina Gain per sec","Terror Radius"].forEach(s => {
            if (char.stats[s] !== undefined) statsHTML += `<div class="stat-row"><span class="stat-label">${s}:</span><span class="stat-value">${char.stats[s]}</span></div>`;
        });
        statsHTML += `</div>`;
    }

    let skinsHTML = '';
    if (char.skins && char.skins.length) {
        skinsHTML = `<div class="skins-section"><button class="skins-toggle-btn" id="skinsBtn"><i class="fas fa-mask"></i> KNOWN DISGUISES</button><div class="skins-menu" id="skinsMenu"><div class="skins-grid">${char.skins.map(s => `<div class="skin-item" data-img="${s.img}"><img src="${s.img}"><div class="skin-overlay"><span class="skin-name">${s.name}</span></div></div>`).join('')}</div></div></div>`;
    }

    document.getElementById('viewDetails').innerHTML = `
        <div class="dossier-header"><div><h1>${char.name.toUpperCase()}</h1><div class="file-subtitle">CASE FILE #${Math.floor(Math.random()*9000)+1000} — ${chosenSide?.toUpperCase()}</div></div><div class="classified-stamp">CLASSIFIED</div></div>
        <div class="dossier-body">
            <div class="dossier-column left-column">
                <div class="image-box"><img src="${char.img}" onerror="this.src='https://via.placeholder.com/400x500/333/fff?text=MISSING+FILE'"></div>
                ${skinsHTML}
                <div class="section"><h3 class="column-title">SUBJECT DESCRIPTION</h3><p>${char.description || 'No description found.'}</p></div>
                ${statsHTML ? `<div class="section"><h3 class="column-title">INTEL & STATS</h3>${statsHTML}</div>` : ''}
            </div>
            ${abilitiesHTML}
        </div>
    `;

    filePanel.classList.add('active');
    filePanel.scrollTop = 0;

    if (char.skins && char.skins.length) {
        const skinsBtn = document.getElementById('skinsBtn'), skinsMenu = document.getElementById('skinsMenu'), mainImg = document.querySelector('.image-box img'), skinItems = document.querySelectorAll('.skin-item');
        skinsBtn.addEventListener('click', () => skinsMenu.classList.toggle('active'));
        skinItems.forEach(item => {
            item.addEventListener('click', () => {
                mainImg.src = item.getAttribute('data-img'); skinsMenu.classList.remove('active');
                skinItems.forEach(i => i.classList.remove('selected')); item.classList.add('selected');
            });
        });
    }
}

// Bridge from 3D to HTML
window.openDossierFrom3D = (char) => { openFile(char); };

document.getElementById('closeView').addEventListener('click', () => {
    filePanel.classList.remove('active');
    if (window.closeActiveFolder) window.closeActiveFolder();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && filePanel.classList.contains('active')) {
        filePanel.classList.remove('active');
        if (window.closeActiveFolder) window.closeActiveFolder();
    }
});

// --- DIALOGUE FLOW ---
window.startIntroDialogue = () => {
    dialogue.start([
        { text: [{ text: "You are here for ", effect: 'normal' }, { text: "THEM", effect: 'shake' }, { text: ", aren't you?", effect: 'normal' }] },
        { text: "Which side of them are you asking for...", choices: [{ label: 'SURVIVORS', onSelect: () => { chosenSide = 'survivors'; } }, { label: 'TORMENTORS', onSelect: () => { chosenSide = 'tormentors'; } }] }
    ], () => {
        if (chosenSide === 'survivors') {
            dialogue.start([
                { text: [{ text: "Ah, wanna be a ", effect: 'normal' }, { text: "HERO", effect: 'wave' }, { text: " don't you? Everyone does...", effect: 'normal' }] },
                { text: "Take a look at the table. Find your name.", onShow: () => {
                    window.spawn3DFolders(survivors);
                    setTimeout(() => document.getElementById('dialogueOverlay').classList.remove('active'), 1600);
                }}
            ]);
        } else {
            dialogue.start([
                { text: [{ text: "Ah, a ", effect: 'normal' }, { text: "MONSTER", effect: 'shake' }, { text: " at heart. I like that...", effect: 'normal' }] },
                { text: "Take a look at the table. Find your name.", onShow: () => {
                    window.spawn3DFolders(tormentors);
                    setTimeout(() => document.getElementById('dialogueOverlay').classList.remove('active'), 1600);
                }}
            ]);
        }
    });
};

document.getElementById('switchSideBtn').addEventListener('click', () => {
    dialogue.start([
        { text: switchLines[switchCount % switchLines.length], effect: 'normal' },
        { text: "Alright, then... who else are you looking for?", choices: [{ label: 'SURVIVORS', onSelect: () => { chosenSide = 'survivors'; } }, { label: 'TORMENTORS', onSelect: () => { chosenSide = 'tormentors'; } }] }
    ], () => {
        switchCount++;
        window.spawn3DFolders(chosenSide === 'survivors' ? survivors : tormentors);
    });
});
