const characters = [
    // Survivors
    {
        name: 'NlSickle',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Nlsickle.svg',
        placement: 'char'
    },
    {
        name: 'NlBeary',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/New%20Renders/NlBeary/Nlbeary.webp',
        placement: 'char'
    },
    {
        name: '☆ S M I L E ☆',
        img: 'https://via.placeholder.com/300x400/333/fff?text=SM+Image',
        placement: 'char',
        description: 'A sentinel/support/tank who uses heavy hits and shockwaves to keep Tormentors away.',
        stats: { "Skill Level": 6, "HP": 120, "Role": "Sentinel/Support/Tank" }
    },
    {
        name: 'Cosmic',
        img: 'https://via.placeholder.com/300x400/333/fff?text=Cosmic',
        placement: 'char',
        description: 'Cosmic the Hedgehog. A support/sentinel with mobility and priority, using a shotgun and extreme speed to protect others.',
        stats: { "Skill Level": 8, "HP": 125, "Role": "Support/Sentinel/Mobility/Priority" }
    },
    {
        name: 'Celeste',
        img: 'https://via.placeholder.com/300x400/333/fff?text=Celeste',
        placement: 'char',
        description: 'Adrenaline/Mobility/Priority survivor with a double jump and sanity meter.',
        stats: { "Skill Level": 5, "HP": 90, "Role": "Support/Adrenaline/Mobility/Priority" }
    },
    {
        name: 'Silly Goober',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Silly Goober.svg',
        placement: 'char',
        description: 'A support/survivalist/distractor with force fields and bombs.',
        stats: { "Skill Level": 5, "HP": 100, "Role": "Support/Survivalist/Distractor" }
    },
    {
        name: 'Asher Dasher',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Asher.svg',
        placement: 'char',
        description: 'A sentinel/flight/support/mobility survivor wielding a scythe.',
        stats: { "Skill Level": 6, "HP": 120, "Role": "Sentinel|Flight|Support|Mobility" }
    },
    {
        name: 'Cosmia//Leah',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Cosmia-Leah.svg',
        placement: 'char'
    },
    {
        name: 'SashaRose',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/New%20Renders/SashaRose/SashaRose.webp',
        placement: 'char',
        description: 'The Witch. A support survivor wielding spells and potions.',
        stats: { "Skill Level": 5, "HP": 100, "Role": "Support/Mobility/Adrenaline" },
        skins: [
            { name: 'Pink Theme', img: 'https://github.com/Drowsey-Works/Drowse-Paradox.exe-DC/blob/main/New%20Renders/SashaRose/SashaRose(pink%20themed%20skin).webp?raw=true' },
            { name: 'Purple Theme', img: 'https://github.com/Drowsey-Works/Drowse-Paradox.exe-DC/blob/main/New%20Renders/SashaRose/SashaRose(purple,%20skin).webp?raw=true' }
        ]
    },
    {
        name: 'Sutekina',
        img: 'https://via.placeholder.com/300x400/333/fff?text=Sutekina',
        placement: 'char',
        description: 'The Cat. A support/distractor/mobility survivor.',
        stats: { "Skill Level": 4, "HP": 100, "Role": "Support/Distractor/Mobility" }
    },
    {
        name: 'Evadare/Kontos',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Evadare.svg',
        placement: 'char',
        description: 'The Martial Artist. A survivalist/mobility/priority survivor.',
        stats: { "Skill Level": 4.5, "HP": 100, "Role": "Survivalist/Mobility/Priority" }
    },
    {
        name: '2020x (Survivor)',
        img: 'https://via.placeholder.com/300x400/333/fff?text=2020x',
        placement: 'char',
        description: 'The Jester (Survivor form). A support/survivalist/mobility survivor.',
        stats: { "Skill Level": 6, "HP": 115, "Role": "Support/Survivalist/Mobility" }
    },
    {
        name: 'BreadMan',
        img: 'https://via.placeholder.com/300x400/333/fff?text=BreadMan',
        placement: 'char',
        description: 'The Swords Master. A sentinel/distractor/priority survivor.',
        stats: { "Skill Level": 5, "HP": 100, "Role": "Sentinel/Distractor/Priority" }
    },
    {
        name: 'SpaceHog',
        img: 'https://via.placeholder.com/300x400/333/fff?text=SpaceHog',
        placement: 'char',
        description: 'The ShapeShifter. A support/sentinel/tank/priority survivor.',
        stats: { "Skill Level": 6, "HP": "100 [+50]", "Role": "Support/Sentinel/Tank/Priority" }
    },
    {
        name: 'Wanderer Orcaz',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/New%20Renders/Wanderer/Wanderer.webp',
        placement: 'char'
    },
    {
        name: 'Hauntuh/Emoji Man',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Hauntuh.svg',
        placement: 'char'
    },
    {
        name: 'Drowse',
        img: 'https://github.com/Drowsey-Works/Drowse-Paradox.exe-DC/blob/main/imgs/Drowsey%20New%20Render.webp?raw=true',
        placement: 'char',
        description: 'A kindly made robot who lives off of remembering the good times and staying positive. Using his music, he helps others avoid exhaustion and keep moving forward.',
        stats: { "Difficulty": "★★★★☆", "Health": 10, "Regular Speed": 12, "Sprinting Speed": 25, "Max Stamina": 100, "Stamina Loss per sec": 10, "Stamina Gain per sec": 20 }    
    },
    
    // Tormentors
    {
        name: '2020x The Jester',
        img: 'https://via.placeholder.com/300x400/333/fff?text=2020x+Jester',
        placement: 'char',
        description: 'A sadistic Tormentor with a saw and a twisted sense of fun.',
        stats: { "Skill Level": 6, "HP": 115, "Role": "Not So Magic Trick, Nothing, Slate Armor, Invisi Cloak, Glider, Battle Ready" }
    },
    {
        name: 'Smoky The Demon',
        img: 'https://via.placeholder.com/300x400/333/fff?text=Smoky',
        placement: 'char',
        description: 'A heavy-hitting flying Tormentor.',
        stats: { "Skill Level": 8, "HP": 6666, "Role": "Flight/Loud/Close+Far/HeavyHits" }
    },
    {
        name: 'NMercy The Mutated Corpse',
        img: 'https://via.placeholder.com/300x400/333/fff?text=NMercy',
        placement: 'char',
        description: 'A stealthy, slower, heavy close-range Tormentor.',
        stats: { "Skill Level": 7.5, "HP": "INF", "Role": "Stealthy/Heavy/Slower/CloseRange" }
    },
    {
        name: 'Rosetti The Spider',
        img: 'https://via.placeholder.com/300x400/333/fff?text=Rosetti',
        placement: 'char',
        description: 'A slower trapper Tormentor with debuffing abilities.',
        stats: { "Skill Level": 7, "HP": 7550, "Role": "Slower/Trapper/Close+Far/Debuffer" }
    }
];
