const characterAbilities = {
    "Veronica": {
        passives: [
            { name: "Robotic Resilience", description: "Veronica takes 15% less damage from all sources and recovers from stuns 25% faster." },
            { name: "Energy Core", description: "Regenerates 1% of max health every 3 seconds when out of combat." }
        ],
        abilities: [
            { name: "Rapid Retreat", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Quickly dash forward, becoming invulnerable for 0.5 seconds. 15 second cooldown." },
            { name: "System Overdrive", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Increase movement speed by 30% and damage by 20% for 6 seconds. 45 second cooldown." }
        ]
    },
    "Guest 666": {
        passives: [
            { name: "Blood Frenzy", description: "Deal 10% more damage for each injured survivor within 20 meters." },
            { name: "Unholy Presence", description: "Survivors within your terror radius have their action speeds reduced by 15%." }
        ],
        abilities: [
            { name: "Demonic Charge", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Lunge forward, dealing damage to the first survivor hit. 12 second cooldown." },
            { name: "Soul Harvest", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Consume the souls of downed survivors to permanently increase your movement speed by 5%. 60 second cooldown." }
        ]
    },
    "Noob": {
        passives: [
            { name: "None", description: "Sorry, no passives." }
        ],
        abilities: [
            { name: "Ghost Burger", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Become invisible to killer detection for 8 seconds. 90 second cooldown." },
            { name: "Cola Rush", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Increase movement speed by 25% for 4 seconds. 30 second cooldown." }
        ]
    },
    "Shedletsky": {
        passives: [
            { name: "None", description: "Sorry, no passives." }
        ],
        abilities: [
            { name: "Slash", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Shedletsky slashes forward, dealing 30 damage and stunning the Killer for 3 seconds if it hits. Upon activation, Shedletsky is given Resistance II for 0.75 seconds, alongside being slowed down by 75% for 1.575 seconds." }
        ]
    },
    "Drowsey": {
        passives: [
            { name: "Tune It Out", description: "Resistant to minor status effects like Bleeding I, Glitched I, and Poisoned I." },
            { name: "Hyperfixated", description: "Use medkits, colas, and other items 20% faster." }
        ],
        abilities: [
            { name: "Upbeat Tune (45s)", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "For 3 seconds, your stamina gain DOUBLES to 40/sec. Sprint without tiring!" },
            { name: "Good Vibes (60s)", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Place a boombox that creates a 10-stud zone. Allies in the zone gain 25% increased stamina regeneration. Lasts 15 seconds or until destroyed." },
            { name: "Beat Drop (20s)", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Quickly dodge the next attack within 1s. Successful dodge refunds 30 stamina. If not attacked, gain 10% movement speed for 3s." }
        ]
    },
    "Deivy": {
        passives: [
            { name: "Automatic-Sales", description: "Deivy gains $10 overtime every 30 seconds, everytime he completes a generator puzzle he gains $25." }
        ],
        abilities: [
            { name: "Buy", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Deivy spends $50 to buy a lantern with a max of 3 lanterns at once." },
            { name: "Zap", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Deivy uses the on lantern to zap outwards like a bullet in the direction he is facing, either hitting a survivor, or killer if there is one available." },
            { name: "Upgrade", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "On a selected lantern, Deivy will upgrade it to be stronger, spends $20 on the first upgrade then $35 on the final one." },
            { name: "Switch", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Deivy swaps which lantern he is using." }
        ]
    },
    "Blank": {
        passives: [
            { name: 'Cheater Alert', description: 'If this character is somehow selected the player who is plating will automatically be kicked for cheating.' }
        ],
        abilities: [
            { name: 'No Abilities', icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: 'Litterally read the name...' }
        ]
    },
    "☆ S M I L E ☆": {
        passives: [
            { name: "Guilt", description: "Smile becomes more guilty as he loses more and more survivors, this will cause him to stun for (+0.75) more for every stun he lands. When he is damaged by a Tormentor he will take (+15 more DM6) per hit landed on him." },
            { name: "Social", description: "Smile loses energy faster while the others are around. (he likes to impress them i guess)" }
        ],
        abilities: [
            { name: "Ground Pound", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "While Smile is airborne he charges energy in his fist before punching into the ground. The shockwave pushes Tormentors back a few studs. Smile loses access to his other abilities until ground pound is ready to use again. (Stun duration: 3.5)" },
            { name: "Punch", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Smile pulls his fist back and fully forces it towards Tormentors, this sends them back a few and applies the glitched effect on them (Will temporarily blind them and damage them overtime.) {Stun Duration: 4.5}" },
            { name: "Slide/Kick", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Smile while running slides a few studs further (this will open his kick ability) {Kick} Smile quickly charges energy in his force of the kick, this sends both him and the Tormentor back. (Stun Duration: 2)" },
            { name: "Charge", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Smile stands stationary while charging energy, this will heal him +5 hp while close to other survivors every (10 seconds.) Smiles charge has 4 stages before being fully charged. (this takes about a minute.) Smiles stun duration last longer the better the charge. (Stage 1: +0.5) (Stage 2: +0.75) (Stage 3: +1.5) (Stage 4: +2)" }
        ]
    },
    "Cosmic": {
        passives: [
            { name: "16 Shots", description: "When Cosmic is on his last life, his abilities will instantly be put off CD (Cosmic doesn't get the Last Life debuff)" },
            { name: "Protective", description: "While Cosmic is protecting (Celeste) she will instead be given 25% resistance, (Cosmic will also take more DMG)" },
            { name: "Swap", description: "During LMS Cosmic will switch out his shotgun for a Pistol, (the gun has INF ammo and will stun for 1 seconds) (CD each shot: 10)" }
        ],
        abilities: [
            { name: "Shotgun", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Cosmic aims his shotgun which follows cursor or camera (mobile players) cosmic has 16 shells in total, he can shoot 8 shots before having to reload. (CD: 20) Once his Shotgun is out of ammo it will then go on a longer cooldown before Cosmic can shoot again. (CD: 35) when a Tormentor is shot they will suffer extreme knock back and a (2.5 second stun) (CD each shot: 20)" },
            { name: "Blitz", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Cosmic while sprinting will slowly move faster (takes about 5 seconds to reach full speed) Cosmic can carry certain survivors during this to get them away from danger. If he collides with a tormentor during this both him (the survivor carried) & the tormentor will be knocked back (acts as a 3 second stun for both.)" },
            { name: "Counter", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Cosmic gets into a stance before striking the tormentor with his fist, the tormentor will be flashed white for 2 seconds (while glowing they can be stun stacked by other survivors.) the tormentor also is given blindness and a (3s stun)" },
            { name: "Guard", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Cosmic puts a mark onto (any) survivor, while a survivor is protected they will gain speed during chase + 15% DMG resistance. As a downside Cosmic will take the damage for them every time their hit while protected. (Cosmic have a temporarily slowness buff while protecting.) (Cannot Protect inactive)" }
        ]
    },
    "Celeste": {
        passives: [
            { name: "Sanity Meter", description: "Celeste being as scared as she is will drain sanity if she isn't close to other Survivors or is being chased by Tormentors, (staying close to Survivors will raise her sanity meter, if her meter is full she will heal 5 HP every 2 seconds.)" },
            { name: "Protected", description: "While close to {BreadMan, Cosmic, Inactive} Celeste's sanity will increase faster." },
            { name: "Vulnerable", description: "Cosmia takes more DMG than others, making her an easy target to take down." },
            { name: "Panic", description: "While her sanity is lower she will gain more speed upon using sugar rush or being low HP" }
        ],
        abilities: [
            { name: "Double Jump", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "When this ability is active others that are around her will be given an extra jump that soon goes away after 15 seconds. (Celeste already has this as a passive and will instead be given 3 jumps instead of her normal 2 while active. It also goes away after 20 seconds, just like the others)" },
            { name: "Push", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "When the tormentor is close enough to her Celeste pushes them back a few stud to avoid fatal DMG to herself. (kinda acts as a stun that stuns for about 1.5 seconds) Celeste can also push her teammates. But it doesn't push them as far." },
            { name: "Sugar Rush", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Celeste when activated will be highlighted to other survivors for a short amount of time, (kinda a signal that shes in danger.) Celeste will be given a rush of energy and will be given speed ll for 6 seconds. (when this wears off she will be highlighted Red to others once more)" },
            { name: "Health Pack", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Celeste carries a Health pack on her waist, she can share it with the other survivors to heal them by 45 HP. While healing others Celeste will become stationary and will be highlighted to all survivors. (kinda a signal telling others shes ready to heal.)" }
        ]
    },
    "Silly Goober": {
        passives: [
            { name: "Dodge Meter", description: "Silly has a meter the slowly builds up (takes about 35 seconds to charge fully.) when the meter is a quarter way fully Silly gains one dodge roll, when the meter is half way full Silly gains X2 dodge rolls, when the meter is fully silly gains X3 rolls. When rolling past a Tormentors attack she will gain resistance Ill until the roll animation ends. (Silly cannot roll mid air.)" }
        ],
        abilities: [
            { name: "Force Field", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Silly activates her shield which makes her immune to anything for 7 seconds, when the shield is broken she gains a speed boost and resistance Ill for 3 seconds + speed II for 2 seconds." },
            { name: "Share", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Silly selects a target and shares her shield with them, if used while her shield is activated her shield will lose its timer by 3 seconds. Survivors with the shield will become immune for 4 seconds, when it breaks the survivor (and Silly) are both given a speed boost for 1.5 seconds." },
            { name: "Bombs Away", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Silly slows down for about 3 seconds before tossing a ticking bomb above her head. The bomb ticks down for 2 seconds before exploding anything within a 10 stud radius. The Tormentor hit will suffer knockback, blindness, and nausea for 3 seconds. (Stun Duration: 4)" }
        ]
    },
    "Asher Dasher": {
        passives: [
            { name: "None Listed", description: "No passives were listed in the source data." }
        ],
        abilities: [
            { name: "Scythe Swing", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Asher swings her scythe, which knocks Tormentors back a few studs, Tormentors will be given Helpless for 3 seconds and bleeding VI for 4 seconds. (Stun duration: 4)" },
            { name: "Scythe Curses", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "When using the ability Asher will raise her scythe in the air for a few seconds. The scythe will glow a different color based on the curse. (Knockback: Red) (Strength: Orange:) (Weakness: Blue) (Fear: Pink) (Vulnerability: White) (Slowness: Yellow)" },
            { name: "Flight", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Allows Scythe Throw Mid Air. Asher lifts herself off the ground and takes flight for about 10 seconds. (Asher moves slightly slower as she ascends.) While airborne Asher is able to use all of her abilities." },
            { name: "Summon", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." }
        ]
    },
    "SashaRose": {
        abilities: [
            { name: "Staff Summon", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Lunge", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "SpellBook", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Potion Of ???", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." }
        ]
    },
    "Sutekina": {
        abilities: [
            { name: "Cheer", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Panel", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "3 Abilities. No description provided." },
            { name: "Pop-Ups", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Locate", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Teleport", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Charm Radius", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." }
        ]
    },
    "Evadare/Kontos": {
        abilities: [
            { name: "Round A' Bout", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Taunt + Parry", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Mach 5", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Pizza", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." }
        ]
    },
    "2020x (Survivor)": {
        abilities: [
            { name: "Not So Magic Trick", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Nothing", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Slate Armor", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Invisi Cloak", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Glider", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Battle Ready", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." }
        ]
    },
    "BreadMan": {
        abilities: [
            { name: "Flame Spin", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Blazing Rushdown", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Flash Step", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Block", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." }
        ]
    },
    "SpaceHog": {
        abilities: [
            { name: "Charge", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "DropKick", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Jet Boost", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Repair", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Cosmic or Ashline Needed. No description provided." }
        ]
    },
    "2020x The Jester": {
        passives: [
            { name: "Unstoppable", description: "2020x unlike other Tormentors cannot be stunned for longer than 2 seconds. (this doesnt count if shes being stun chained or is hit with a fully charged or buffed stun.)" },
            { name: "My World MY RULES", description: "2020x views the world in a red tint, when shes closer to {Cosmic, Smile,BreadMan,SpaceHog} her screen becomes staticy" },
            { name: "No Fun", description: "During escape time 2020x's face and animations will change to show how tired she gets from running around so much." },
            { name: "FUN", description: "When theres only 2 survivors remaining 2020x face changes into a open smile {kinda like da render}" }
        ],
        abilities: [
            { name: "Blade Throw", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "2020x throws her blade in front of wherever shes aiming, if successfully hit onto a survivor they will suffer slowness and heavy bleed for 3 seconds." },
            { name: "Blade Carousel (Alt)", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "2020x once her blade hits a survivor will teleport to the targeted survivor and then summon 3 saws around them, they will circle around them for a few seconds before showing an indicator on where the saws will be headed. If the survivor is hit with any of the saws they will suffer slowness, bleed and will be temporarily blinding by 2020x for 10 seconds." },
            { name: "Block", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "2020x holds both of her hands up to her face as she blocks any incoming attacks for 3 seconds, survivors that attempt to stun her during this will be blinded by her and will hear her laughing at them for 5 seconds." },
            { name: "Never See Me Coming", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "CD: 20. 2020x fades into nothingness as she quickly teleports to a random survivor, the survivor will hear her laugh faintly before she teleports to them. When she appears she will attempt to silently attack the survivor. (survivors must jump to avoid being ragdolled) {Fake Out} When 2020x teleports to a survivor there a chance 3 of her will spawn around the survivor (this will force 3 random things to happen: Jump to avoid the attack, stand still, pressing a button at the right time) if failed by survivor 2020x will blind them and will ragdoll them for longer)" },
            { name: "Rushdown", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "CD: 40. 2020x stops as she charges her saw faster and faster, she will laugh during this for 4 seconds she then charges moving at high speeds for about 5 seconds. Survivors caught will be grabbed by her and forced to spam space bar or spam tap the screen, if 2020x successfully wins the minigame she will kick the survivor over and slash at them twice (Deals 45 DMG) if 2020x loses she will be knocked back and will lose this ability for the next minute." }
        ]
    },
    "Smoky The Demon": {
        abilities: [
            { name: "Slash [x2]", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "GET OVER HERE", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Shockwave", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Take Flight [Dunk]", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Spike Field", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Eyes Of The Darkness", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Speed + DMG Increase {DMG} {55} {Speed} {+25}" },
            { name: "Seek Them", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Activates Rage Mode" },
            { name: "Slash [x3]", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Spike Grasp", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Leap", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Revenge", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." }
        ]
    },
    "NMercy The Mutated Corpse": {
        abilities: [
            { name: "Scratch", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Pounce", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Haunting Presence", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Block", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Blocks Multiple Attacks. Nlmercy grows stronger with each stun landed." },
            { name: "Awaken the Cast", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Bash", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Grab", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." }
        ]
    },
    "Rosetti The Spider": {
        abilities: [
            { name: "Vine Swing", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Web Trap", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Spider Swarm" },
            { name: "Infested", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Grab", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "No description provided." },
            { name: "Queen of Spiders", icon: "https://via.placeholder.com/50x50/333/fff?text=? ", description: "Spawns 3X Spiders" }
        ]
    }
};
