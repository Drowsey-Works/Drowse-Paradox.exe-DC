const characters = [
    // Survivors
    {
        name: 'Forsaken',
        placement: 'contentSeparator'
    },

    {
        name: 'Survivors',
        placement: 'charSeparator'
    },

    {
        name: 'Veronica',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Veronica.webp',
        placement: 'char',
        description: 'A rebellious robot, once with a heart for tags and shredding. Letting her pieces run all while she jumps, kicks, and flies though the air! If danger ever finds her, she can slip away rapidly and repair herself. Veeronica stands as a pillar of survivability. Able to hold her own and take care of herself, all while sacrificing some aid from others for sustainability, speed, and style.',
        stats: {
            "Difficulty": "★★★☆☆",
            "Health": 100,
            "Regular Speed": 12,
            "Sprinting Speed": "26[1]",
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    },


    {
        name: 'Noob',
        img: 'https://preview.redd.it/noob-render-d-v0-03sszvgxlzcf1.png?width=320&crop=smart&auto=webp&s=e8694b551f2b50dd503421fe2457e4102f2d3b4b',
        placement: 'char',
        description: 'A big snack person at heart, Noob has a handful of food items at their disposal. Sneaking by with their ghostburger, moving faster with their cola, and tanking damage with their slateskin, they\'re scared, but still pushes on, wanting to find an escape.',
        stats: {
            "Difficulty": "★★★☆☆",
            "Health": 100,
            "Regular Speed": 12,
            "Sprinting Speed": 24,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    },
    {
        name: 'Shedletsky',
        img: 'https://github.com/DummyDW-development/Drowse-Paradox.exe-DC/blob/main/imgs/300px-Shedletsky_Render.webp?raw=true',
        placement: 'char',
        description: "Blame John. A former admin and huge part of Roblox's history, Shedletsky wields a Linked Sword to stop the killer in their tracks.",
        stats: {
            "Difficulty": "★★☆☆☆",
            "Health": 90,
            "Regular Speed": 12,
            "Sprinting Speed": 24,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    },
    {
        name: 'Chance',
        img: 'https://preview.redd.it/i-made-chance-from-forsaken-rate-please-v0-cp840pxulofe1.png?width=320&crop=smart&auto=webp&s=a5373e4a114426ab71cc4800580dfa29fcc0f9d1',
        placement: 'char',
        description: 'The sounds of machines promising great rewards spiral within his ears. Gambling with his life, his potential lies inside of the result of his coin. He also wields a shoddy flintlock that feels like it could break at any moment, but it\'s one that he\'ll take to his death.',
        stats: {
            "Difficulty": "00 00 never stop gambling",
            "Health": "60-120",
            "Regular Speed": 12,
            "Sprinting Speed": 24,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    },
    {
        name: 'Two Time',
        img: 'https://preview.redd.it/all-the-old-and-new-two-time-renders-made-by-yuyu-v0-hz5mbl4oulxe1.jpg?width=640&crop=smart&auto=webp&s=765bb23aeee6688880d83850132259f1eeeecaa1',
        placement: 'char',
        description: 'A fragile cultist holding a horrible secret. When mortally wounded, they resurrect themselves with wings and tails, and recover as if nothing had happened.',
        stats: {
            "Difficulty": "★★☆☆☆",
            "Health": 80,
            "Regular Speed": 12,
            "Sprinting Speed": 24,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    },
    {
        name: 'Dusekkar',
        img: 'https://preview.redd.it/what-is-the-most-no-skill-survivor-in-your-opinion-v0-v0f79ljvnzxe1.png?width=640&crop=smart&auto=webp&s=ef3299fbaafdec01ae0cb0fdbb6075ac1f0be0ca',
        placement: 'char',
        description: 'pumpkn guy (:',
        stats: {
            "Difficulty": "★★★★★",
            "Health": 90,
            "Regular Speed": 12,
            "Sprinting Speed": 24,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    },
    {
        name: 'Builderman',
        img: 'https://preview.redd.it/what-is-the-most-no-skill-survivor-in-your-opinion-v0-3pkf0djvnzxe1.png?width=640&crop=smart&auto=webp&s=81e88ca850650af7fe51bc62bc8830b9a8e8a1c3',
        placement: 'char',
        description: 'The big boss of Roblox HQ himself. With a hammer in his inventory and a lot of spare parts and materials to spare, he\'s able to build contraptions that can either slow the killer\'s path, or heal those around him. As a promise with Shedletsky, he\'ll do all he can to help everyone.',
        stats: {
            "Difficulty": "★★☆☆☆",
            "Health": 90,
            "Regular Speed": 12,
            "Sprinting Speed": 24,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    },
    {
        name: 'Elliot',
        img: 'https://preview.redd.it/fanmade-elliot-render-cause-the-current-one-got-removed-v0-p739z4ixzh0f1.png?width=640&crop=smart&auto=webp&s=693c8d55952558194e009e35d7f102e0670474cb',
        placement: 'char',
        description: 'Description for Elliot...',
        stats: {
            "Difficulty": "★★★☆☆",
            "Health": 100,
            "Regular Speed": 12,
            "Sprinting Speed": 24,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    },
    {
        name: 'Geust 1337',
        img: 'https://preview.redd.it/what-is-the-most-no-skill-survivor-in-your-opinion-v0-ojxehdkvnzxe1.png?width=640&crop=smart&auto=webp&s=f7b8b06b3ae5e1811069cd64826d90f7dc58543d',
        placement: 'char',
        description: 'A hardened veteran with battle scars from wars long ago. He has a tendency to sacrifice himself in order to keep those around him safe. With Guest\'s sturdiness, he can block, bash, and punch the killer to keep it away from harming his allies.',
        stats: {
            "Difficulty": "★★★★☆",
            "Health": 115,
            "Regular Speed": 12,
            "Sprinting Speed": 24,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    },
    {
        name: '007n7',
        img: 'https://preview.redd.it/what-is-the-most-no-skill-survivor-in-your-opinion-v0-u5rm0dlvnzxe1.png?width=320&crop=smart&auto=webp&s=d8fa4ef4fd6107dc4bcaad9314b79f2e2d7258f2',
        placement: 'char',
        description: 'Previously infamous for their exploits, he had a change of heart after gaining a son, only to then lose him after a series of unfortunate events. With a smaller copy of the coolgui on him, he\'s able to teleport far in the map, as well as create a duplicate of himself if need be.',
        stats: {
            "Difficulty": "★★★★☆",
            "Health": 100,
            "Regular Speed": 12,
            "Sprinting Speed": 24,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    },
    {
        name: 'Taph',
        img: 'https://preview.redd.it/what-is-the-most-no-skill-survivor-in-your-opinion-v0-fhqbq4jvnzxe1.png?width=320&crop=smart&auto=webp&s=2b60bad34b7618b65228bd5e6e1d04c4cafed76d',
        placement: 'char',
        description: 'A mute demolitionist who used to blow up & destroy the houses of terminated users at the will of Builderman. Uses Tripwires and Subspace Tripmines to reveal the position of and disorientate the Killer.',
        stats: {
            "Difficulty": "★★★★☆",
            "Health": 90,
            "Regular Speed": 12,
            "Sprinting Speed": 24,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    },

    {
        name: 'Killers',
        placement: 'charSeparator'
    },


    // Killers
    {
        name: 'Noli',
        img: 'https://preview.redd.it/how-we-feeling-about-the-noli-redesign-v0-xau8s0wzwa3f1.jpg?width=640&crop=smart&auto=webp&s=b2a2462ef64db253a693c9e97def1a55464c03cf',
        placement: 'char'

    },
    {
        name: 'Guest 666',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/guest666.webp',
        placement: 'char',
        description: 'Cursed with their name from the moment of their existence, he managed to find solace in Noob. Someone who saw them for they were inside, but that ideal reality would not last. Guest 666 will viciously rip and tear through any obstacle in her way, feasting on the bloodshed and carnage to empower his abilities.',
        stats: {
            "Difficulty": "★★★☆☆",

            "Health": 2500,
            "Regular Speed": 8,
            "Sprinting Speed": 27,
            "Max Stamina": 110,
            "Stamina Loss per sec": 9,
            "Stamina Gain per sec": 21,
            "Terror Radius": "80 Studs"
        }
    },
    {
        name: 'John Doe',
        img: 'https://preview.redd.it/has-anyone-noticed-that-there-is-a-new-model-in-the-new-v0-mg6mfsz1rt6f1.png?width=439&format=png&auto=webp&s=ab8ed2adcc2ad115ecf23f5e274777829a80e3e8',
        placement: 'char'

    },
    {
        name: 'Jason',
        img: 'https://preview.redd.it/jason-is-totally-glitched-right-now-and-has-a-new-render-v0-yt98rmbmft6f1.png?width=2000&format=png&auto=webp&s=6831aaacde491c06ea2a5c4b59ec5fb05e35a919',
        placement: 'char'

    },
    {
        name: 'C00lkidd',
        img: 'https://preview.redd.it/c00lkidd-render-remake-v0-xx42scrn696f1.png?width=512&format=png&auto=webp&s=57dd8397886a4bb2b285fe6dac093231c26b932d',
        placement: 'char'

    },
    {
        name: '1x1x1x1',
        img: 'https://i.redd.it/is-betrayed-1x1x1x1-male-or-female-v0-vpjkoc3333re1.png?width=417&format=png&auto=webp&s=a3438babad01abf6c135c0c1c651c44bcef273cc',
        placement: 'char'

    },

    {
        name: 'Paradox.exe DC',
        placement: 'contentSeparator'
    },

    {
        name: 'Survivors?',
        placement: 'charSeparator'
    },

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
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/☆ S M I L E ☆.svg',
        placement: 'char'
    },
    {
        name: 'Cosmic Xin Error',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Cosmic.svg',
        placement: 'char'
    },
    {
        name: 'Silly Goober',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Silly Goober.svg',
        placement: 'char'
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
        skins: [
            { name: 'Pink Theme', img: 'https://github.com/Drowsey-Works/Drowse-Paradox.exe-DC/blob/main/New%20Renders/SashaRose/SashaRose(pink%20themed%20skin).webp?raw=true' },
            { name: 'Purple Theme', img: 'https://github.com/Drowsey-Works/Drowse-Paradox.exe-DC/blob/main/New%20Renders/SashaRose/SashaRose(purple,%20skin).webp?raw=true' },
            { name: 'Placeholder', img: 'https://openclipart.org/image/800px/194077' }
        ]
    },
    {
        name: 'Asher Dasher',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Asher.svg',
        placement: 'char'
    },
    {
        name: 'Hauntuh/Emoji Man',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Hauntuh.svg',
        placement: 'char'
    },
    {
        name: 'Evadare/Kontos',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/imgs/Evadare.svg',
        placement: 'char'
    },
    {
        name: 'Wanderer Orcaz',
        img: 'https://raw.githubusercontent.com/DummyDW-development/Drowse-Paradox.exe-DC/refs/heads/main/New%20Renders/Wanderer/Wanderer.webp',
        placement: 'char'
    },
    {
        name: 'Other',
        placement: 'contentSeparator'
    },
    {
        name: 'Survivors',
        placement: 'charSeparator'
    },
    {
        name: 'Drowsey',
        img: 'https://github.com/Drowsey-Works/Drowse-Paradox.exe-DC/blob/main/imgs/Drowsey%20New%20Render.webp?raw=true',
        placement: 'char',
        description: 'A kindly made robot who lives off of remembering the good times and staying positive. Using his music, he helps others avoid exhaustion and keep moving forward.',
        stats: {
            "Difficulty": "★★★★☆",
            "Health": 10,
            "Regular Speed": 12,
            "Sprinting Speed": 25,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }    
    },
    {
        name: 'Deivy',
        img: 'imgs/DeivyRenderV2.webp',
        placement: 'char',
        description: 'A player of World Tower Defense, his multi-stage abilities help himself and survivors.',
        stats: {
            "Difficulty": "★★★★☆",
            "Health": 10,
            "Regular Speed": 12,
            "Sprinting Speed": 25,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }    
    },
    {
        name: 'Blank',
        img: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        placement: 'char',
        description: 'Just a blank character for reference.',
        stats: {
            "Difficulty": "★★☆☆☆",
            "Health": 10,
            "Regular Speed": 12,
            "Sprinting Speed": 25,
            "Max Stamina": 100,
            "Stamina Loss per sec": 10,
            "Stamina Gain per sec": 20
        }
    }
];
