const characterAbilities = {
    "Veronica": {
        passives: [
            {
                name: "Robotic Resilience",
                description: "Veronica takes 15% less damage from all sources and recovers from stuns 25% faster."
            },
            {
                name: "Energy Core",
                description: "Regenerates 1% of max health every 3 seconds when out of combat."
            }
        ],
        abilities: [
            {
                name: "Rapid Retreat",
                icon: "https://example.com/veronica-ability1.png",
                description: "Quickly dash forward, becoming invulnerable for 0.5 seconds. 15 second cooldown."
            },
            {
                name: "System Overdrive",
                icon: "https://example.com/veronica-ability2.png",
                description: "Increase movement speed by 30% and damage by 20% for 6 seconds. 45 second cooldown."
            }
        ]
    },
    "Guest 666": {
        passives: [
            {
                name: "Blood Frenzy",
                description: "Deal 10% more damage for each injured survivor within 20 meters."
            },
            {
                name: "Unholy Presence",
                description: "Survivors within your terror radius have their action speeds reduced by 15%."
            }
        ],
        abilities: [
            {
                name: "Demonic Charge",
                icon: "https://example.com/guest666-ability1.png",
                description: "Lunge forward, dealing damage to the first survivor hit. 12 second cooldown."
            },
            {
                name: "Soul Harvest",
                icon: "https://example.com/guest666-ability2.png",
                description: "Consume the souls of downed survivors to permanently increase your movement speed by 5%. 60 second cooldown."
            }
        ]
    },
    "Noob": {
        passives: [
            {
                name: "None",
                description: "Sorry, no passives."
            }
        ],
        abilities: [
            {
                name: "Ghost Burger",
                icon: "https://example.com/noob-ability1.png",
                description: "Become invisible to killer detection for 8 seconds. 90 second cooldown."
            },
            {
                name: "Cola Rush",
                icon: "https://example.com/noob-ability2.png",
                description: "Increase movement speed by 25% for 4 seconds. 30 second cooldown."
            }
        ]
    },
    "Shedletsky": {
        passives: [
            {
                name: "None",
                description: "Sorry, no passives."
            }
        ],
        abilities: [
            {
                name: "Slash",
                icon: "icons/Shedletsky_slash.webp",
                description: "Shedletsky slashes forward, dealing 30 damage and stunning the Killer for 3 seconds if it hits. Upon activation, Shedletsky is given Resistance II for 0.75 seconds, alongside being slowed down by 75% for 1.575 seconds."
            }
        ]
    },
    "Drowsey": {
        passives: [
            {
                name: "Tune It Out",
                description: "Resistant to minor status effects like Bleeding I, Glitched I, and Poisoned I."
            },
            {
                name: "Hyperfixated",
                description: "Use medkits, colas, and other items 20% faster."
            }
        ],
        abilities: [
            {
                name: "Upbeat Tune (45s)",
                description: "For 3 seconds, your stamina gain DOUBLES to 40/sec. Sprint without tiring!"
            },
            {
                name: "Good Vibes (60s)",
                description: "Place a boombox that creates a 10-stud zone. Allies in the zone gain 25% increased stamina regeneration. Lasts 15 seconds or until destroyed."
            },
            {
                name: "Beat Drop (20s)",
                description: "Quickly dodge the next attack within 1s. Successful dodge refunds 30 stamina. If not attacked, gain 10% movement speed for 3s."
            }
        ]
    },
    "Deivy": {
        passives: [
            {
                name: "Automatic-Sales",
                icon: "",
                description: "Deivy gains $10 overtime every 30 seconds, everytime he completes a generator puzzle he gains $25."
            }
        ],
        abilities: [
            {
                name: "Buy",
                icon: "",
                description: "Deivy spends $50 to buy a lantern with a max of 3 lanterns at once."
            },
            {
                name: "Zap",
                icon: "",
                description: "Deivy uses the on lantern to zap outwards like a bullet in the direction he is facing, either hitting a survivor, or killer if there is one available."
            },

            {
                name: "Upgrade",
                icon: "",
                description: "On a selected lantern, Deivy will upgrade it to be stronger, spends $20 on the first upgrade then $35 on the final one."
            },

            {
                name: "Switch",
                icon: "",
                description: "Deivy swaps which lantern he is using."
            }
        ]
    },
    "Blank": {
        passives: [
            {
                name: 'Cheater Alert',
                icon: '',
                description: 'If this character is somehow selected the player who is plating will automatically be kicked for cheating.',
            }
        ],
        abilities: [
            {
                name: 'No Abilities',
                icon: '',
                description: 'Litterally read the name...'
            }
        ]
    }
    // Add abilities for other characters as needed
};
