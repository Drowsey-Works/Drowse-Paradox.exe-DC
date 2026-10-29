const ICON = 'https://via.placeholder.com/50x50/8c7a58/221100?text=AB';

const characterAbilities = {
    // ==================== SURVIVORS ====================
    'CosmicError (Uchu)': {
        passives: [
            { name: 'Mothers Call', description: 'Whenever Cosmic is downed all abilities CD is set to 0 and his gun will reload fully. (Gun now has 16 shots.) Stuns for 1 second. Cosmic\'s Rush will have a shorter CD during LMS (30 - 20.5 seconds).' }
        ],
        abilities: [
            { name: 'Gun', description: 'Cosmic aims a gun that follows mouse (or camera for Mobile). The gun contains 5 bullets, each time it\'s shot it will take 6 seconds to be shot again. Each shot does 40 damage and knocks the killer back by 2 studs. Stun duration: 1 second each shot. CD: 55s.', icon: ICON },
            { name: 'Blitz', description: 'Cosmic gains a speed boost for 7 seconds. The move starts slow and picks up speed the longer you run. If the hitbox touches a killer, Cosmic will kick them and will stop running. This can also pick up teammates, who can jump off by jumping. Stun duration: 3 - 5 seconds (depending on Cosmic\'s Speed). CD: 30s.', icon: ICON },
            { name: 'Snap Shot', description: 'Cosmic gets into a stance and then phases into the ground. The killer will then flash red 3 times (it\'s fast, be ready) before they are stunned by Cosmic. (The move can be blocked or avoided with invisibility or immortality.) Stun Duration: 4s. CD: 20s.', icon: ICON }
        ]
    },
    'Smile/Glitch': {
        passives: [
            { name: 'Guilt', description: 'Smile gains HP if he\'s out of danger for a short amount of time (Max HP is 75). Smile\'s punch stuns longer during LMS. (Stun Duration: 4 - 6 seconds).' }
        ],
        abilities: [
            { name: 'Clash', description: 'Glitch dashes forward (not controllable). If it hits a killer, it will knock both Smile and the killer back for 2 seconds. Smile gets a speed boost for 2 seconds. (Can start a clash). CD: 28.5s.', icon: ICON },
            { name: 'Slide Kick / Punch', description: 'Slide Kick: Glitch slides forward which gives him a slight speed boost. Once landed, Glitch will kick the killer in the air (Air time: 1 second). Stun Duration: 2s. | Punch Variant: Smile punches forward throwing a simple punch. (Can cancel grabs). Stun Duration: 4s. (Swap) Swap between punch and kick variant.', icon: ICON },
            { name: 'Ground Pound', description: 'Smile punches into the ground which will shoot up 3 rocks where he is facing. The rocks can stun but will stun for 2 seconds. If used directly on a killer it will stun for 4 seconds. CD: 25s.', icon: ICON }
        ]
    },
    'Evadare/Woag': {
        passives: [
            { name: 'Swift Sweeper', description: 'Landing 5 or more parry punches will start to slow down killers for 2 seconds each stun.' },
            { name: 'Amazing Performance', description: 'Landing stuns while teammates are in danger will cause burning and disable a killer\'s ability for 1 second (doesn\'t affect Rosetti).' }
        ],
        abilities: [
            { name: 'Round A Bout Kick', description: 'Evadare swings his foot which catches fire for a short amount of time. Landing this on any killer will burn them (not 2020x) and stun them for 4 seconds.', icon: ICON },
            { name: 'Parry Punch', description: 'Evadare moves himself back and glows white. If the killer hits him, he will punch them back (cannot be blocked). Successful hits will give Evadare 25% HP back and a boost. CD: 25s. Stun Duration: 2s.', icon: ICON },
            { name: 'Ketchup Lover', description: 'Evadare pulls out a bottle of ketchup and shoots it into his mouth. It heals him +20 HP or +40 HP. CD: 40s.', icon: ICON }
        ]
    },
    'Drowsey': {
        passives: [
            { name: 'Droid-27 (HP Modifier)', description: 'Drowsey has specialized plating that absorbs some impacts, reducing most damage by 8%. Panel HP absorbs an additional 12% on top of the 8%. Panel HP can recover after 10s away from chase, or 45s if it was broken previously. If you have 1 Panel HP and get hit for more damage than the panel hp has, the damage does not carry over to base health.' },
            { name: 'Visual Data', description: 'Drowsey views the world through a computer-like interface. All visible players are marked with circular indicators. Survivors: neutral indicators. Killer: red indicator.' }
        ],
        abilities: [
            { name: 'Melodic Mending', description: 'Drowsey will play his boombox and become stationary. His heal pool is a base of 30 (+2 for every additional survivor). He heals all survivors within the radius, splitting the heal pool evenly between anyone within the radius. Lasts for 12s. CD: 45s.', icon: ICON },
            { name: 'Unstable Recognition', description: 'Drowsey will attempt to hit the killer with his boombox with a far lunge. However, in order to do this, he has to trick himself. It takes a few moments to recognize the killer as an Object instead of an entity. After tricking himself, he will swing full force to hit the killer, taking 20 base health damage if he lands it and 15 to himself if he misses. Stuns the killer for 8s and breaks his boombox. CD: 60s.', icon: ICON },
            { name: 'Repair', description: 'If Drowsey\'s boombox is broken, you gain the option to repair. Keep in mind repairing the boombox takes 20 panel HP from Drowsey and it takes 12s to repair in total. CD: 45s.', icon: ICON }
        ]
    },
    'BreadMan': {
        passives: [
            { name: 'Quick Moves', description: 'When flash stepping during LMS, BreadMan causes Burning III for 5 seconds and Slowness II for 5 seconds.' },
            { name: 'Blazing Cleave', description: 'When mid-air using Blaze Rush, BreadMan will swing down instead of forward.' },
            { name: 'Flame Trail Of Victory', description: 'Using Flame Spin during LMS, BreadMan will no longer wind it up before spinning. Attacking a killer with it will lock one ability for 4 seconds, and burn them for longer.' }
        ],
        abilities: [
            { name: 'Flame Spin', description: 'Bread winds up his sword setting it ablaze before spinning rapidly for 5 seconds. Gives him a speed boost as he spins. If landed on a killer, will set them on fire for 3 seconds [can be blocked/clashed]. Stun duration: 3s. Fire slows down killers and extends the stun further (ex: 4 seconds).', icon: ICON },
            { name: 'Blaze Rush', description: 'Bread quickly rushes forward and slashes his flame sword. Once it hits a killer, will set them on fire for 4 seconds [can be blocked/clashed]. Stun duration: 5s.', icon: ICON },
            { name: 'Flash Step', description: 'Bread moves left and right quickly and phases through a killer. Will give Slowness I for 5 seconds.', icon: ICON }
        ]
    },
    'Silly.Tiff': {
        passives: [
            { name: 'Overclock', description: 'Silly\'s force field has a shorter cooldown during LMS (40 - 20s). Bomb\'s CD reduces to 20 after BreadMan/Smile\'s deaths.' }
        ],
        abilities: [
            { name: 'Shield', description: 'Silly brings out a device that activates a force field around her for 7 seconds. If she\'s hit, the force field will start to lose HP. Once the shield breaks, Silly will gain a speed boost for 5 seconds.', icon: ICON },
            { name: 'Shield Give', description: 'Silly can give her force field to others. But the force field breaks if anything attacks it. Other survivors will NOT get a speed boost after the force field is broken. CD: 40s.', icon: ICON },
            { name: 'Bomb', description: 'Silly throws a bomb that ticks 2 seconds before exploding. Once it explodes, it has a radius of 20 studs. If it hits a killer, will knock them back 10 studs and stun them. Stun duration: 6s. CD: 30s.', icon: ICON },
            { name: 'Roll', description: 'Silly rolls onto the ground and can avoid being attacked. CD: 25s.', icon: ICON }
        ]
    },
    'Ashline Dasher': {
        passives: [
            { name: 'Scythe Attack (Bleed)', description: 'Scythe Attack can give killers Bleeding I for 3 seconds.' },
            { name: 'Adrenaline', description: 'Ashline has pure adrenaline once all her friends are dead. Fly can be used longer (6 - 8 seconds) and its cooldown is reduced to 6 seconds.' }
        ],
        abilities: [
            { name: 'Scythe Attack', description: 'Ash swings her scythe which stuns killers [Can be Blocked]. Stun duration: 4 seconds. CD: 35s.', icon: ICON },
            { name: 'Scythe Throw', description: 'Ash aims her scythe (camera or mouse). If missed, the scythe will automatically come back 3 seconds after thrown. Can stun [Can be blocked]. Stun duration: 3 seconds. CD: 30s.', icon: ICON },
            { name: 'Fly', description: 'Ash lifts herself up and can hover/fly around for 3 seconds. CD: 13.7s. (A bar will show up on the side of Ash\'s icon).', icon: ICON }
        ]
    },
    'Sasha Rose': {
        passives: [
            { name: 'One Blessed Soul', description: 'Sasha\'s attacks heal 5 HP if landed.' }
        ],
        abilities: [
            { name: 'Beam Spread', description: 'Sasha shoots 3 purple beams (towards camera or mouse) that sets killers on fire for 4 seconds. (Unblockable.) Stun duration: 2s. CD: 35s.', icon: ICON },
            { name: 'Support Blast', description: 'Sasha shoots a charge of energy at teammates which gives them overhealth +40 health. Teammates also receive a speed boost for 2 seconds. CD: 30s.', icon: ICON },
            { name: 'Lunge', description: 'Sasha lunges forward with her staff. If that attack lands on killers, it will knock them back and stun them for a moment. Missing the attack will increase the cooldown of the first 2 abilities. If used mid-air, Sasha will smash down with her staff, stunning killers within her vicinity. CD: 30s.', icon: ICON }
        ]
    },
    'Lovely': {
        passives: [
            { name: 'Self Revive', description: 'Lovely can self revive herself.' },
            { name: 'Get Hacked XD', description: 'Lovely\'s Cheer buffs herself during LMS. (Teleport Further).' }
        ],
        abilities: [
            { name: 'Cheer', description: 'Lovely raises her arms and cheers on one of her teammates to buff their abilities. Reduces CDs and adds +1 sec stun time if the teammate has a stun. When Lovely cheers one of her teammates, she is immune to attacks for 4 seconds. (Survivors with her buff will have a heart near their icon.) CD: 17s. Buff time: 30 seconds.', icon: ICON },
            { name: 'Main Frame', description: 'Lovely will open up a device which floats near her. This will give her Slowness 2 until the ability is complete. During the start up everyone will highlight. Clicking on Killers will glitch their screen for 4 seconds and set one ability on CD. Using on survivors will give them a speed boost and highlight the killer for 10 seconds for the survivor she has clicked on. CD: 35s.', icon: ICON },
            { name: 'Speed Ring', description: 'Lovely spawns a circle around her which gives her and other survivors Speed III temporarily as long as they are around her. Killers who attack Lovely while her circle is active will suffer Slowness II for 1.5 seconds after attacking. The circle disappears after 10 seconds. CD: 40s.', icon: ICON }
        ]
    },

    // ==================== TORMENTORS ====================
    '2020x The Jester': {
        passives: [
            { name: 'Unstoppable', description: '2020x can\'t be stunned for longer than 2 seconds. (Gains speed boost after stun for 4 seconds.)' }
        ],
        abilities: [
            { name: 'Will of Revenge', description: '2020x charges her saw for 3 seconds while laughing. Once charged she rushes survivors. If a survivor is caught she will knock them over and saw at them. (Deals bleeding for 4 seconds.) Deals 40 DMG. CD: 35s.', icon: ICON },
            { name: 'Did I Scare You?', description: '2020x laughs and appears behind 3 random survivors. (2 are fake.) Survivors will have to press 3 random keys in order to avoid being injured. If the keys aren\'t pressed, 2020x will strike the user in the face with her saw. (K, O or L) (Tap the saw on the screen.) (Deals 20 DMG if landed.) (Blinds Survivors for 4s) (Bleeding II for 5s). CD: 55s.', icon: ICON },
            { name: 'Peekaboo', description: 'Highlights all survivors for 8 seconds. 2020x slows down and is immune during this and cannot be stunned for 2 seconds. CD: 25.7s.', icon: ICON },
            { name: 'Block', description: '2020x holds her saw in front of her face. Can block attacks. Survivors that stun her will suffer a slash. (Bloodies the survivor\'s screen and gives bleed.)', icon: ICON }
        ]
    },
    'Smoky The Demon': {
        passives: [
            { name: 'Rage Meter', description: 'While Smoky gets stunned, it slowly fills his rage meter. His icon will slowly get darker the more he is stunned. Once filled, Smoky will go completely black and will turn the map dark for survivors. (M1 DMG increased to 28 - 48) (Leap is Faster) (Speed Increased to 20 - 50). CD: Can only be used once.' }
        ],
        abilities: [
            { name: 'Punch', description: 'Smoky punches dealing 28 DMG.', icon: ICON },
            { name: 'COME HERE', description: 'Smoky yells "COME HERE" and reaches his arms out to grab survivors. Once a survivor is grabbed, he will pull them in and rapidly punch them, dealing 35 DMG total. (Survivors are ragdolled for 2 seconds) (Smoky is endlagged for 3 seconds.) CD: 27s.', icon: ICON },
            { name: 'Leap', description: 'Smoky leaps into the air and can aim where he lands. Once he lands he will slam himself down. Dealing knockback and 35 DMG. Killing survivors with this move activates a different kill animation, which pays you back with additional +5 seconds to the timer. (40 seconds when killing survivors). CD: 35s.', icon: ICON },
            { name: 'Spikes', description: 'Smoky screams and then spawns spikes in his radius. If a spike hits, a survivor will get Bleeding I for 5 seconds and Slowness for 2 seconds. DMG total: 15. CD: 20s.', icon: ICON }
        ]
    },
    'Rozetti The Spider': {
        passives: [],
        abilities: [
            { name: 'Slash', description: 'Rozetti slashes with her vine and deals 20 DMG. (Causes poison for 3 seconds). CD: 2.5s.', icon: ICON },
            { name: 'Vine Burst', description: 'While Rosetti is stunned (or not), she will close her spider legs in and then burst out, causing spikes to fly everywhere dealing 20 DMG and applying poison on anyone in the radius of her burst. CD: 29s.', icon: ICON },
            { name: 'Thorned Trap', description: 'Rozetti reaches into the ground, forming a thorn trap. The trap will be barely visible to survivors. (Highlighted Yellow for her.) Survivors that touch the trap will become stuck and have to mash space or rapidly tap their screen to break free. (Rozetti gains a speed boost for 3 seconds.) (Survivors take +5 DMG the longer they stay trapped.) CD: 20s.', icon: ICON },
            { name: 'Death Do Us Apart', description: 'Rosetti will slow down and then summon an eye covered in thorns. The eyeball will disable survivors\' abilities and slow them down while they are near it. Rosetti can place up to 3 of them. The eyes contain a bar that fills the longer survivors are near it. While the bar is full and survivors are near it, Rosetti gains a 10% speed boost and DMG for as long as the bar is full. CD: 34s.', icon: ICON }
        ]
    },
    'SpaceHog The ShapeShifter': {
        passives: [
            { name: 'Death Mark', description: 'Once Spacehog is below 100 HP, one survivor will be randomly picked to get a death mark on them. This permanently darkens their screen and that survivor takes 50 DMG per attack. (Doesn\'t affect other abilities.)' }
        ],
        abilities: [
            { name: 'Jab', description: 'Spacehog jabs survivors with his knife. Dealing Bleeding III for 2 seconds. DMG: 20. {Automatically highlight survivors for 3 seconds every hit.}', icon: ICON },
            { name: 'Shear Force', description: 'Spacehog\'s arm raises up then slams down into the ground. His skin begins to melt into the floor, creating a spawn point for him to use for later. (Can place 4 MAX). When exiting a puddle, survivors near it will be blinded and will take 5 DMG. CD: 20s.', icon: ICON },
            { name: 'ShapeShift', description: 'Spacehog can select a survivor to turn into. Once he spawns as a survivor he will have bloodshot eyes and an unnerving smile on their face. If Spacehog hits survivors while shapeshifted, it will deal 10 DMG per hit. (When stunned will exit the shapeshift.) CD: 45s.', icon: ICON },
            { name: 'Explode', description: 'Spacehog explodes into a puddle causing blindness for 4 seconds and ragdolling survivors for about 6 seconds, and dealing 20 DMG. He then spawns at the killer spawn again. (Suffers no endlag.) CD: 30s.', icon: ICON },
            { name: 'Rapid Slash', description: 'Spacehog rapidly swings his knife for 5 seconds and gains a speed boost for 5 seconds.', icon: ICON }
        ]
    },
    'NMercy The Mutated Corpse': {
        passives: [
            { name: 'Block (Multiple)', description: 'NMercy can block multiple attacks. He grows stronger with each stun landed.' }
        ],
        abilities: [
            { name: 'Pounce', description: 'NMercy pounces towards survivors. If he catches them he will grab them and throw them to the floor (causing blindness). After he will ram his claws into their chest twice before grabbing them and throwing them a few studs away. (Deals 45 DMG Total). CD: 35.5s.', icon: ICON },
            { name: 'Spiritual Presence', description: 'NMercy floats slightly into the air and becomes invisible for 25 seconds. Highlights all survivors for 10 seconds or until the move is cancelled. Once a survivor is found, NMercy knocks them over and laughs at them. {Acts as end lag for both NMercy and Survivors.} {Survivors get scared and cannot use moves for 3 seconds.} CD: 25s.', icon: ICON },
            { name: 'Grab', description: 'NMercy lunges forward and grabs survivors by the neck. Survivors gain blindness as their health gets lower. (NMercy can be stunned out of it.) NMercy can cancel the grab by punching the survivor out of his hands. (Disabling survivor abilities for 5 seconds and causing blindness.) DMG per sec: 2. DMG from punch: 30. DMG per sec if losing: 5. CD: 30s.', icon: ICON }
        ]
    }
};
