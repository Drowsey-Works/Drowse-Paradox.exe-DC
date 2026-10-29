const characters = [
    // ==================== SURVIVORS ====================
    {
        name: 'CosmicError (Uchu)',
        img: 'imgs/Cosmic.svg',
        description: 'The Hedgehog. A support/sentinel with mobility and priority, using a gun and extreme speed to protect others. (Difficulty: Master)',
        stats: { "Skill Level": 8, "HP": 115, "Role": "Stunner/Speed Blitz/Support/Mobility" }
    },
    {
        name: 'Smile/Glitch',
        img: 'imgs/%E2%98%86%20S%20M%20I%20L%20E%20%E2%98%86.svg',
        description: 'A sentinel/support/tank who uses heavy hits and shockwaves to keep Tormentors away. (Difficulty: Master)',
        stats: { "Skill Level": 6, "HP": 120, "Role": "Stunner/Support" }
    },
    {
        name: 'Evadare/Woag',
        img: 'imgs/Evadare.svg',
        description: 'The Martial Artist. A self-healer and stunner. (Difficulty: Expert)',
        stats: { "Skill Level": 4.5, "HP": 100, "Role": "Self Healer/Stunner" }
    },
    {
        name: 'Drowsey',
        img: 'imgs/Drowsey%20New%20Render.webp',
        description: 'A kindly made robot who lives off of remembering the good times and staying positive. Using his music, he helps others avoid exhaustion and keep moving forward. (Difficulty: Master)',
        stats: { "Skill Level": 8, "HP": 70, "PHP": 30, "Role": "Support/Survivalist" }
    },
    {
        name: 'BreadMan',
        img: 'https://via.placeholder.com/300x400/333/fff?text=BreadMan',
        description: 'The Swords Master. A heavy stunner and debuffer. (Difficulty: Expert)',
        stats: { "Skill Level": 5, "HP": 125, "Role": "Stunner/Mobility/Heavy/Debuffer" }
    },
    {
        name: 'Silly.Tiff',
        img: 'imgs/Silly%20Goober.svg',
        description: 'A support/protector with force fields and bombs. (Difficulty: Advanced)',
        stats: { "Skill Level": 5, "HP": 100, "Role": "Support/Protector/Stunner/Mobility" }
    },
    {
        name: 'Ashline Dasher',
        img: 'imgs/Asher.svg',
        description: 'A stunner and highly mobile survivor wielding a scythe. (Difficulty: Expert)',
        stats: { "Skill Level": 6, "HP": 120, "Role": "Stunner/Mobility/Aggressive" }
    },
    {
        name: 'Sasha Rose',
        img: 'New%20Renders/SashaRose/SashaRose.webp',
        description: 'The Witch. A support survivor wielding spells and potions. (Difficulty: Advanced)',
        stats: { "Skill Level": 5, "HP": 100, "Role": "Support/Mobility/Team Player" },
        skins: [
            { name: 'Pink Theme', img: 'New%20Renders/SashaRose/SashaRose(pink%20themed%20skin).webp' },
            { name: 'Purple Theme', img: 'New%20Renders/SashaRose/SashaRose(purple,%20skin).webp' }
        ]
    },
    {
        name: 'Lovely',
        img: 'https://via.placeholder.com/300x400/333/fff?text=Lovely',
        description: 'The Pink Cat. A support and team player who buffs her allies. (Difficulty: Basic)',
        stats: { "Skill Level": 4, "HP": 100, "Role": "Support/TeamPlayer/Mobility" }
    },
    {
        name: 'NlSickle',
        img: 'imgs/Nlsickle.svg',
        description: 'A sharp, scythe-wielding survivor.',
        stats: { "Skill Level": 6.5, "HP": 120, "Role": "Sentinel|Priority|Distractor" }
    },
    {
        name: 'NlBeary',
        img: 'New%20Renders/NlBeary/Nlbeary.webp',
        description: 'The bear survivor.',
        stats: { "Skill Level": 4.5, "HP": 100, "Role": "Support/Mobility/Protector/Sentinel" }
    },
    {
        name: 'Cosmia//Leah',
        img: 'imgs/Cosmia-Leah.svg',
        description: 'A survivor.'
    },
    {
        name: 'Wanderer Orcaz',
        img: 'New%20Renders/Wanderer/Wanderer.webp',
        description: 'The Wanderer Doll.'
    },
    {
        name: 'Hauntuh/Emoji Man',
        img: 'imgs/Hauntuh.svg',
        description: 'The Emoji Man.'
    },
    {
        name: 'Celeste',
        img: 'https://via.placeholder.com/300x400/333/fff?text=Celeste',
        description: 'A fragile survivor with a sanity meter and a double jump.',
        stats: { "Skill Level": 5, "HP": 90, "Role": "Support/Adrenaline/Mobility/Priority" }
    },

    // ==================== TORMENTORS ====================
    {
        name: '2020x The Jester',
        img: 'https://via.placeholder.com/300x400/333/fff?text=2020x+Jester',
        description: 'A sadistic Tormentor with a saw and a twisted sense of fun.',
        stats: { "Skill Level": 6, "HP": 115, "Role": "Tormentor" }
    },
    {
        name: 'Smoky The Demon',
        img: 'https://via.placeholder.com/300x400/333/fff?text=Smoky',
        description: 'A heavy-hitting flying Tormentor. (Difficulty: Master)',
        stats: { "Skill Level": 8, "HP": 2500, "Speed": 40, "Role": "Flight/Loud/Close+Far/HeavyHits" }
    },
    {
        name: 'NMercy The Mutated Corpse',
        img: 'https://via.placeholder.com/300x400/333/fff?text=NMercy',
        description: 'A stealthy, slower, heavy close-range Tormentor.',
        stats: { "Skill Level": 7.5, "HP": "INF", "Role": "Stealthy/Heavy/Slower/CloseRange" }
    },
    {
        name: 'Rozetti The Spider',
        img: 'https://via.placeholder.com/300x400/333/fff?text=Rozetti',
        description: 'A slower trapper Tormentor with debuffing abilities. (Difficulty: Expert)',
        stats: { "Skill Level": 7, "HP": 3100, "Speed": 35, "Role": "Slower/Trapper/Close+Far/Debuffer" }
    },
    {
        name: 'SpaceHog The ShapeShifter',
        img: 'https://via.placeholder.com/300x400/333/fff?text=SpaceHog',
        description: 'A confusing, rushing, crazy Tormentor. (Difficulty: Expert)',
        stats: { "Skill Level": 6, "Speed": 45, "Role": "Confusing/Rusher/Crazy" }
    }
];
