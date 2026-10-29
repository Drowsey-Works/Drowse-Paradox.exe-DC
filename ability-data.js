// ============================================================
// ABILITY DATA — keyed by character name
// ============================================================

const ICON = 'https://via.placeholder.com/50x50/8c7a58/221100?text=AB';

const characterAbilities = {

    // ==================== SURVIVORS ====================

    '☆ S M I L E ☆': {
        passives: [
            { name: 'Guilt', description: 'Smile becomes more guilty as he loses more and more survivors, this will cause him to stun for +0.75 more for every stun he lands. When he is damaged by a Tormentor he will take +15 more DMG per hit landed on him.' },
            { name: 'Social', description: 'Smile loses energy faster while the others are around. (He likes to impress them, I guess.)' }
        ],
        abilities: [
            { name: 'Ground Pound', description: 'While Smile is airborne he charges energy in his fist before punching into the ground. The shockwave pushes Tormentors back a few studs. Smile loses access to his other abilities until Ground Pound is ready to use again. (Stun duration: 3.5s)', icon: ICON },
            { name: 'Punch', description: 'Smile pulls his fist back and forcefully forces it towards Tormentors — this sends them back a few studs and applies the Glitched effect (temporarily blinds them and damages them over time). (Stun duration: 4.5s)', icon: ICON },
            { name: 'Slide / Kick', description: 'While running, Smile slides a few studs further, opening up his Kick ability. Kick: Smile quickly charges energy into the force of the kick, sending both him and the Tormentor back. (Stun duration: 2s)', icon: ICON },
            { name: 'Charge', description: 'Smile stands stationary while charging energy, healing himself +5 HP every 10 seconds while close to other Survivors. Smile\'s charge has 4 stages before being fully charged (takes about a minute). Stun duration lasts longer the better the charge: Stage 1 +0.5, Stage 2 +0.75, Stage 3 +1.5, Stage 4 +2.', icon: ICON }
        ]
    },

    'Cosmic': {
        passives: [
            { name: '16 Shots', description: 'When Cosmic is on his last life, his abilities will instantly be put off cooldown. Cosmic doesn\'t get the Last Life debuff.' },
            { name: 'Swap', description: 'During Last Man Standing, Cosmic switches out his shotgun for a Pistol. The pistol has INF ammo and stuns for 1 second. (CD per shot: 10s)' },
            { name: 'Protective', description: 'While Cosmic is protecting Celeste, she is instead given 25% resistance, and Cosmic will take more DMG.' }
        ],
        abilities: [
            { name: 'Shotgun', description: 'Cosmic aims his shotgun, which follows the cursor (or camera for mobile players). Cosmic has 16 shells in total and can shoot 8 before needing to reload. (CD: 20s) Once his shotgun is out of ammo it goes on a longer cooldown before he can shoot again. (CD: 35s) A shot Tormentor suffers extreme knockback and a 2.5s stun. (CD per shot: 20s)', icon: ICON },
            { name: 'Blitz', description: 'Cosmic slowly moves faster while sprinting (takes about 5 seconds to reach full speed). He can carry certain Survivors during this to get them away from danger. If he collides with a Tormentor, both he (and the carried Survivor) and the Tormentor are knocked back — acts as a 3s stun for both.', icon: ICON },
            { name: 'Counter', description: 'Cosmic gets into a stance before striking the Tormentor with his fist. The Tormentor is flashed white for 2 seconds (while glowing they can be stun-stacked by other Survivors). The Tormentor is also given blindness and a 3s stun.', icon: ICON },
            { name: 'Guard', description: 'Cosmic marks any Survivor. While protected, the Survivor gains speed during chase and +15% DMG resistance. As a downside, Cosmic takes the damage for them every time they\'re hit. Cosmic has a temporary slowness buff while protecting. (Cannot Protect Inactive.)', icon: ICON }
        ]
    },

    'Celeste': {
        passives: [
            { name: 'Sanity Meter', description: 'Celeste drains sanity if she isn\'t close to other Survivors or is being chased by Tormentors. Staying close to Survivors raises her sanity meter. If the meter is full, she heals 5 HP every 2 seconds.' },
            { name: 'Protected', description: 'While close to BreadMan, Cosmic, or Inactive, Celeste\'s sanity increases faster.' },
            { name: 'Vulnerable', description: 'Celeste takes more DMG than others, making her an easy target to take down.' },
            { name: 'Panic', description: 'While her sanity is lower, she gains more speed upon using Sugar Rush or being low HP.' }
        ],
        abilities: [
            { name: 'Double Jump (Passive + Active)', description: 'When activated, nearby Survivors gain an extra jump that disappears after 15 seconds. Celeste already has a double jump as a passive — while active she gets 3 jumps instead of her normal 2, lasting 20 seconds.', icon: ICON },
            { name: 'Push', description: 'When a Tormentor is close enough, Celeste pushes them back a few studs to avoid fatal DMG to herself. Acts as a ~1.5s stun. She can also push teammates, but not as far.', icon: ICON },
            { name: 'Sugar Rush', description: 'When activated, Celeste is highlighted to other Survivors for a short time — a signal that she\'s in danger. She gains speed II for 6 seconds. When this wears off, she is highlighted red to others once more.', icon: ICON },
            { name: 'Health Pack', description: 'Celeste carries a health pack on her waist. She can share it with other Survivors to heal them by 45 HP. While healing others, Celeste is stationary and highlighted to all Survivors — a signal that she\'s ready to heal.', icon: ICON }
        ]
    },

    'Silly Goober': {
        passives: [
            { name: 'Dodge Rolls', description: 'Silly has a meter (visible on the side of the screen) that slowly builds up, taking about 35 seconds to fully charge. At 25% she gains one dodge roll, at 50% two, and at 100% three. Rolling past a Tormentor\'s attack grants her Resistance III until the roll animation ends. She cannot roll mid-air.' }
        ],
        abilities: [
            { name: 'Force Field', description: 'Silly activates her shield, making her immune to anything for 7 seconds. When the shield breaks, she gains a speed boost and Resistance III for 3 seconds, plus speed II for 2 seconds.', icon: ICON },
            { name: 'Share', description: 'Silly selects a target and shares her shield with them. If used while her shield is active, her shield loses 3 seconds off its timer. The Survivor with the shield is immune for 4 seconds. When it breaks, both the Survivor and Silly gain a speed boost for 1.5 seconds.', icon: ICON },
            { name: 'Bombs Away', description: 'Silly slows down for about 3 seconds before tossing a ticking bomb above her head. The bomb ticks down for 2 seconds before exploding anything within a 10-stud radius. Hit Tormentors suffer knockback, blindness, and nausea for 3 seconds. (Stun duration: 4s)', icon: ICON }
        ]
    },

    'Asher Dasher': {
        passives: [],
        abilities: [
            { name: 'Scythe Swing', description: 'Asher swings her scythe, knocking Tormentors back a few studs. Tormentors are given Helpless for 3 seconds and Bleeding VI for 4 seconds. (Stun duration: 4s)', icon: ICON },
            { name: 'Scythe Curses', description: 'Asher raises her scythe in the air for a few seconds; it glows a different color based on the curse. Knockback: Red. Strength: Orange. Weakness: Blue. Fear: Pink. Vulnerability: White. Slowness: Yellow.', icon: ICON },
            { name: 'Flight', description: 'Asher lifts herself off the ground and takes flight for about 10 seconds. She moves slightly slower as she ascends. While airborne she can use all of her abilities, and can also use Scythe Throw mid-air.', icon: ICON },
            { name: 'Summon', description: 'Details not documented in the source PDF.', icon: ICON }
        ]
    },

    'SashaRose': {
        passives: [],
        abilities: [
            { name: 'Staff Summon', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Lunge', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'SpellBook', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Potion of ???', description: 'Details not documented in the source PDF.', icon: ICON }
        ]
    },

    'Sutekina': {
        passives: [],
        abilities: [
            { name: 'Cheer', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Panel (3 Abilities)', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Pop-Ups', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Locate', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Teleport', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Charm Radius', description: 'Details not documented in the source PDF.', icon: ICON }
        ]
    },

    'Evadare/Kontos': {
        passives: [],
        abilities: [
            { name: "Round A' Bout", description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Taunt + Parry', description: 'Details not documented in the source PDF.', icon:
