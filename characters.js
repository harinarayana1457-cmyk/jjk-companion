// Jujutsu Kaisen Database - Character Records
const JJK_CHARACTERS = [
  {
    id: "gojo",
    name: "Satoru Gojo",
    japaneseName: "五条 悟",
    role: "Teacher / Leader",
    affiliation: "Tokyo Jujutsu High",
    grade: "Special Grade",
    description: "The strongest modern Jujutsu Sorcerer. He is the first sorcerer in over a hundred years to inherit both the Limitless technique and the legendary Six Eyes, which gives him absolute control over space and perception.",
    cursedEnergyRating: "Incalculable (Infinite)",
    icon: "♾️",
    combatStats: {
      strength: 95,
      speed: 100,
      energyControl: 100,
      tactics: 98
    },
    techniques: [
      { name: "Infinity", description: "The neutral state of Limitless. It slows down incoming objects infinitely, making it impossible for anything to touch Gojo." },
      { name: "Blue (Lapse)", description: "Creates a vacuum of space that attracts matter violently to a single point." },
      { name: "Red (Reversal)", description: "Uses positive energy to repel matter with explosive force, causing massive destructive shockwaves." },
      { name: "Hollow Purple (Collision)", description: "Combines Blue and Red to create an imaginary mass that instantly obliterates any matter in its path." }
    ],
    domain: {
      name: "Unlimited Void (Ryoiki Tenkai: Muryokusho)",
      id: "infinite_void",
      description: "Traps targets in the concept of infinity itself, flooding their brains with endless information, rendering them catatonic.",
      quote: "Don't worry, I'm the strongest."
    },
    themeColor: "#00d2ff",
    quote: "No matter how many allies you have, when you die, you die alone."
  },
  {
    id: "sukuna",
    name: "Ryomen Sukuna",
    japaneseName: "両面宿儺",
    role: "King of Curses",
    affiliation: "Cursed Spirit / Ancient",
    grade: "Special Grade",
    description: "An ancient sorcerer who lived over a thousand years ago. Known as the King of Curses, he possessed unimaginable combat prowess and absolute brutality. Now reincarnated within Yuji Itadori's body.",
    cursedEnergyRating: "Cataclysmic",
    icon: "💀",
    combatStats: {
      strength: 100,
      speed: 98,
      energyControl: 100,
      tactics: 99
    },
    techniques: [
      { name: "Dismantle", description: "A standard flying slashing attack that targets inanimate or average structures." },
      { name: "Cleave", description: "A specialized targeted slash that adjusts its power depending on the target's toughness to cut them down in one sweep." },
      { name: "Spiderweb", description: "Spreads cutting lines across the ground to shatter whole geological plates." },
      { name: "Fuga (Fire Arrow)", description: "An explosive flame element technique unleashed by opening an incandescence script." }
    ],
    domain: {
      name: "Malevolent Shrine (Ryoiki Tenkai: Fukuma Mizushi)",
      id: "malevolent_shrine",
      description: "An open barrier domain resembling an eerie temple. It slices anything within a 200m radius relentlessly with Clemson Cleaves and Dismantles.",
      quote: "Stand proud, you are strong."
    },
    themeColor: "#ff1744",
    quote: "A hierarchy not based on pure strength is boring. I'll make them all taste absolute despair."
  },
  {
    id: "itadori",
    name: "Yuji Itadori",
    japaneseName: "虎杖 悠仁",
    role: "1st Year Student",
    affiliation: "Tokyo Jujutsu High",
    grade: "Grade 1 (Equivalent)",
    description: "A physically superhuman teenager who swallowed Sukuna's cursed finger to protect others, becoming his vessel. Possesses immense pure willpower, explosive martial arts speed, and learns sorcery at an unmatched rate.",
    cursedEnergyRating: "High",
    icon: "🐯",
    combatStats: {
      strength: 94,
      speed: 92,
      energyControl: 85,
      tactics: 82
    },
    techniques: [
      { name: "Divergent Fist", description: "A punch where physical impact lands first, followed shortly after by a delayed surge of Cursed Energy, disorienting target defenses." },
      { name: "Black Flash (Kokuasen)", description: "An impact where Cursed Energy is applied within 0.000001 seconds of physical striking. Causes a black distortion of space and multiplies blow strength by 2.5." },
      { name: "Blood Manipulation (Inherited)", description: "Gains the ability to weaponize, harden, or fire his blood at piercing-beam speeds." }
    ],
    domain: {
      name: "Unnamed Void (Soul Border)",
      id: "itadori_domain",
      description: "A profound domain where Yuji guides the target back to peaceful memories to resolve ultimate cosmic fates in simple settings.",
      quote: "I want to help people. To die surrounded by those who love me."
    },
    themeColor: "#ff9100",
    quote: "I don't know what my future holds, but I'm going to save lives until I burn out."
  },
  {
    id: "megumi",
    name: "Megumi Fushiguro",
    japaneseName: "伏黒 恵",
    role: "1st Year Student",
    affiliation: "Tokyo Jujutsu High",
    grade: "Grade 2",
    description: "A calm, tactical descendant of the Zen'in clan. He inherited the Ten Shadows Technique, allowing him to summon shadow monsters (Shikigami) and store items inside shadows.",
    cursedEnergyRating: "Moderate-High",
    icon: "🐺",
    combatStats: {
      strength: 78,
      speed: 80,
      energyControl: 84,
      tactics: 95
    },
    techniques: [
      { name: "Divine Dog: Totality", description: "Summons a massive shadow wolf capable of tearing apart Special Grade cursed spirits." },
      { name: "Nue", description: "An owl-like Shikigami that generates electricity to stun and distract enemies underwing." },
      { name: "Max Elephant", description: "Summons a huge shadow elephant that ejects high-pressure water cannons." },
      { name: "Eight-Handled Sword Divergent Sila Divine General Mahoraga", description: "The ultimate untamable shadow Shikigami. It adapts to any and all phenomena after taking damage." }
    ],
    domain: {
      name: "Chimera Shadow Garden (Ryoiki Tenkai: Kango Anjingu)",
      id: "chimera_garden",
      description: "Floods the environment in liquid shadows. The sorcerer can summon endless Shikigami replicas and move instantly anywhere within the shadow matrix.",
      quote: "With this treasure, I summon..."
    },
    themeColor: "#3d5afe",
    quote: "I save people unequally. That's why I became a Jujutsu Sorcerer."
  },
  {
    id: "nobara",
    name: "Nobara Kugisaki",
    japaneseName: "釘崎 野薔薇",
    role: "1st Year Student",
    affiliation: "Tokyo Jujutsu High",
    grade: "Grade 3",
    description: "A fierce, bold Tokyo freshman from the countryside. Weaponizes hammers, iron nails, and straw dolls infused with Cursed Energy to destroy enemies from the inside.",
    cursedEnergyRating: "Moderate",
    icon: "🔨",
    combatStats: {
      strength: 75,
      speed: 76,
      energyControl: 80,
      tactics: 88
    },
    techniques: [
      { name: "Resonance", description: "Fires nails into a detached part of an enemy (e.g. hair, limbs) and strikes a straw doll, dealing massive, direct soul-piercing damage inside the core body." },
      { name: "Hairpin", description: "Explodes nails embedded deep inside concrete, trees, or enemies, releasing concentrated blasts of cursed energy." }
    ],
    domain: {
      name: "Iron Thorn Palace",
      id: "nobara_domain",
      description: "A speculative domain filled with giant iron spikes and floating straw voodoo dolls, ensuring instant-hit Resonance on any coordinate.",
      quote: "Be glad you've got a girl with guts like me around!"
    },
    themeColor: "#ec407a",
    quote: "What makes us beautiful isn't just our looks, it's our resolve to handle our own business!"
  },
  {
    id: "nanami",
    name: "Kento Nanami",
    japaneseName: "七海 建人",
    role: "Professional Sorcerer",
    affiliation: "Tokyo Jujutsu High (Alumni)",
    grade: "Grade 1",
    description: "An intellectual, professional ex-salaryman who returned to Jujutsu Sorcery. Employs extreme discipline, calculating precision, and treats curse extermination like a corporate 9-to-5 job.",
    cursedEnergyRating: "High",
    icon: "👓",
    combatStats: {
      strength: 84,
      speed: 82,
      energyControl: 90,
      tactics: 94
    },
    techniques: [
      { name: "Ratio Technique (7:3)", description: "Divides any target line into 10 intervals and forcibly creates a structural weak point at the 7:3 ratio mark. Striking this spot ensures a critical, powerful blow." },
      { name: "Overtime (Binding Vow)", description: "When working past regular hours (9 AM - 5 PM), Nanami's Cursed Energy output increases drastically to 120%." },
      { name: "Collapse (Vow Trigger)", description: "Destroys surroundings in one 7:3 strike, converting structural rubble into a wave of secondary crushing energy." }
    ],
    domain: {
      name: "Grid of Forced Auditing",
      id: "nanami_domain",
      description: "Projects an office accounting layout onto space. Every physical collision that occurs matches regular standard weak point coordinate multiplications automatically.",
      quote: "I am entering overtime, so let's wrap this up."
    },
    themeColor: "#ffd600",
    quote: "Jujutsu Sorcerers are nothing but garbage. And office workers are garbage too. If they are both terrible, choosing one with more meaning is just logical."
  },
  {
    id: "maki",
    name: "Maki Zen'in",
    japaneseName: "禪院 真希",
    role: "2nd Year Student",
    affiliation: "Tokyo Jujutsu High",
    grade: "Grade 4 (Special Grade Power)",
    description: "Born into the elitist Zen'in clan with zero cursed energy due to Heavenly Restriction. In exchange, she has unmatched superhuman physical strength, senses, and absolute mastery of all cursed tools.",
    cursedEnergyRating: "0 (Heavenly Restriction)",
    icon: "⚔️",
    combatStats: {
      strength: 96,
      speed: 96,
      energyControl: 0,
      tactics: 92
    },
    techniques: [
      { name: "Heavenly Restriction", description: "Zero Cursed Energy grants complete immunity to domain tracing, dynamic invisible presence, and near Indestructible physical durability." },
      { name: "Cursed Tool Mastery", description: "Flawless combat execution using high-tier tools like the Split Soul Katana, Playful Cloud, and Dragon Bone." }
    ],
    domain: {
      name: "Domain Immunity",
      id: "maki_domain",
      description: "Maki has no Cursed Energy, meaning standard domains do not recognize her as a living entity. She can bypass boundaries freely and is immune to automatic hit-sure rules.",
      quote: "Don't look down on me!"
    },
    themeColor: "#4caf50",
    quote: "I am going to become a Special Grade sorcerer and wipe those smug faces off the Zen'in clan!"
  },
  {
    id: "todo",
    name: "Aoi Todo",
    japaneseName: "東堂 葵",
    role: "3rd Year Student",
    affiliation: "Kyoto Jujutsu High",
    grade: "Grade 1",
    description: "The eccentric, muscular powerhouse of Kyoto Jujutsu High. A brilliant intellectual hidden beneath a meathead wrestler appearance. He is an avid fan of idol Takada-chan and considers Yuji his 'Brother'.",
    cursedEnergyRating: "High",
    icon: "👏",
    combatStats: {
      strength: 92,
      speed: 86,
      energyControl: 88,
      tactics: 97
    },
    techniques: [
      { name: "Boogie Woogie", description: "Clapping hands swaps the position of any two objects with cursed energy within a set range. Can swap himself with an ally, enemy, or even a pebble infused with Cursed Energy." },
      { name: "530,000 IQ Brain Processing", description: "He can process events and devise complex strategies in a split second, making his Boogie Woogie swaps completely unpredictable." }
    ],
    domain: {
      name: "Takada-chan Fan Club Arena",
      id: "todo_domain",
      description: "A dream domain that places Todo and his 'best friend' inside a neon J-Pop concert stadium. Takada-chan sings, and every single clap swaps positions instantly without any physical delay.",
      quote: "What is your taste in women?!"
    },
    themeColor: "#ab47bc",
    quote: "We are the exceptions! As long as we are alive, our brothers who fell can never truly be defeated!"
  },
  {
    id: "mahito",
    name: "Mahito",
    japaneseName: "真人",
    role: "Disaster Curse",
    affiliation: "Cursed Spirit / Allied Group",
    grade: "Special Grade",
    description: "A humanoid Cursed Spirit born from humanity's hatred and fear of one another. Sadistic, playful, and completely amoral. He views human souls as playthings and wishes to replace mankind with curses.",
    cursedEnergyRating: "Special Grade (Extreme)",
    icon: "🧵",
    combatStats: {
      strength: 82,
      speed: 88,
      energyControl: 93,
      tactics: 91
    },
    techniques: [
      { name: "Idle Transfiguration", description: "Allows Mahito to manipulate the shape of any soul he touches. This lets him instantly reshape his own body into weapons/wings, or deform humans into horrific mutated soldiers." },
      { name: "Polymorphic Isomer", description: "Combines multiple souls into a heavy-hitting mutant creature to fight on his behalf." },
      { name: "Instant Spirit Body of Distorted Killing", description: "Transforms his body into an armored, insect-like form, increasing defensive toughness by 200%." }
    ],
    domain: {
      name: "Self-Embodiment of Perfection (Ryoiki Tenkai: Jijo Yukenka)",
      id: "self_embodiment",
      description: "Creates an environment suspended by woven black hands. Mahito is automatically connected to the souls of anyone inside, enabling instant, certain soul-reshaping death.",
      quote: "Experimenting is part of life, isn't it?"
    },
    themeColor: "#00e676",
    quote: "You and I are the same, Yuji. I kill humans without a second thought, and you save them without a second thought. It's just a game of survival."
  }
];
