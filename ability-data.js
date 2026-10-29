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
            { name: 'Taunt + Parry', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Mach 5', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Pizza', description: 'Details not documented in the source PDF.', icon: ICON }
        ]
    },

    '2020x (Survivor)': {
        passives: [],
        abilities: [
            { name: 'Not So Magic Trick', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Nothing', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Slate Armor', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'The Invisi Cloak', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Glider', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Battle Ready', description: 'Details not documented in the source PDF.', icon: ICON }
        ]
    },

    'BreadMan': {
        passives: [],
        abilities: [
            { name: 'Flame Spin', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Blazing Rushdown', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Flash Step', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Block', description: 'Details not documented in the source PDF.', icon: ICON }
        ]
    },

    'SpaceHog': {
        passives: [],
        abilities: [
            { name: 'Charge', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'DropKick', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Jet Boost', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Repair', description: 'Requires Cosmic or Ashline. Details not documented in the source PDF.', icon: ICON }
        ]
    },

    'Drowse': {
        passives: [],
        abilities: [
            { name: 'Rework Pending', description: 'Status: Expecting a rework... [LO4D1N9...]', icon: ICON }
        ]
    },

    // ==================== TORMENTORS ====================

    '2020x The Jester': {
        passives: [
            { name: 'Unstoppable (Partial)', description: '2020x cannot be stunned for longer than 2 seconds — this does not count if she is being stun-chained or hit with a fully charged or buffed stun.' },
            { name: 'My World, MY RULES', description: '2020x views the world in a red tint. When she is closer to Cosmic, Smile, BreadMan, or SpaceHog, her screen becomes staticy.' },
            { name: 'No Fun', description: 'During escape time, 2020x\'s face and animations change to show how tired she gets from running around so much.' },
            { name: 'FUN', description: 'When only 2 Survivors remain, 2020x\'s face changes into an open smile (like the render).' }
        ],
        abilities: [
            { name: 'Aerial Saw Slam', description: '2020x slams her saw into the ground while airborne, stopping her for about 2 seconds. If landed on an unsuspecting Survivor, they ragdoll and suffer heavy bleed. (Base DMG: 40)', icon: ICON },
            { name: 'Blade Throw', description: '2020x throws her blade forward. A hit Survivor suffers slowness and heavy bleed for 3 seconds. (CD: 30s) Alt — Blade Carousel: After the blade hits, 2020x teleports to the Survivor and summons 3 saws that circle around them. The saws show an indicator before striking. A Survivor hit by any saw suffers slowness, bleed, and is temporarily blinded by 2020x for 10 seconds.', icon: ICON },
            { name: 'Block', description: '2020x raises both hands to her face, blocking any incoming attacks for 3 seconds. Survivors that attempt to stun her during this are blinded and hear her laughing at them for 5 seconds.', icon: ICON },
            { name: 'Never See Me Coming', description: '2020x fades into nothingness and teleports to a random Survivor. The Survivor hears her laugh faintly before she appears and attempts a silent attack. (Survivors must jump to avoid being ragdolled.) Fake Out — there is a chance 3 copies of 2020x spawn around the Survivor, forcing one of three random minigames (jump the attack, stand still, or press a button at the right time). Failing the minigame blinds and ragdolls the Survivor for longer. (CD: 20s)', icon: ICON },
            { name: 'Rushdown', description: '2020x stops and charges her saw for 4 seconds (laughing the whole time), then dashes at high speed for about 5 seconds. Survivors caught are grabbed and forced to spam space bar / tap the screen. If 2020x wins the minigame she kicks the Survivor over and slashes twice for 45 DMG. If she loses, she is knocked back and loses this ability for a minute. (CD: 40s)', icon: ICON }
        ]
    },

    'Smoky The Demon': {
        passives: [],
        abilities: [
            { name: 'Slash (x2)', description: 'Smoky slashes at Survivors in a two-hit combo.', icon: ICON },
            { name: 'GET OVER HERE', description: 'Smoky reaches out and yanks a Survivor toward him.', icon: ICON },
            { name: 'Shockwave', description: 'Smoky releases a wide shockwave.', icon: ICON },
            { name: 'Take Flight / Dunk', description: 'Smoky takes to the air, and can slam down with a Dunk attack.', icon: ICON },
            { name: 'Spike Field', description: 'Smoky raises a field of spikes.', icon: ICON },
            { name: 'Eyes of the Darkness', description: 'Grants Speed + DMG increase. (DMG: 55, Speed: +25) Also grants Seek Them, which activates Rage Mode.', icon: ICON },
            { name: 'Slash (x3)', description: 'Rage-mode version of Slash — a three-hit combo.', icon: ICON },
            { name: 'Spike Grasp', description: 'Smoky grabs a Survivor with spikes.', icon: ICON },
            { name: 'Leap', description: 'Smoky leaps toward a target.', icon: ICON },
            { name: 'Ravenge', description: 'Details not documented in the source PDF.', icon: ICON }
        ]
    },

    'NMercy The Mutated Corpse': {
        passives: [
            { name: 'Block (Multiple)', description: 'NMercy can block multiple attacks. He grows stronger with each stun landed.' }
        ],
        abilities: [
            { name: 'Scratch', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Pounce', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Haunting Presence', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Awaken the Cast', description: 'Summons minions (Ravyaka, Rage, RedKing).', icon: ICON },
            { name: 'Bash', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Grab', description: 'Details not documented in the source PDF.', icon: ICON }
        ]
    },

    'Rosetti The Spider': {
        passives: [],
        abilities: [
            { name: 'Vine Swing', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Web Trap', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Spider Swarm', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Infested', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Grab', description: 'Details not documented in the source PDF.', icon: ICON },
            { name: 'Queen of Spiders', description: 'Spawns 3 spiders.', icon: ICON }
        ]
    }
};
