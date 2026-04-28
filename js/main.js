'use strict';

/* ============================================================
   main.js — PuzzleQuest v2 (Aetheria Update)
   Config · Store · Auth · Guardian · Lives · Sound · Nav · Pages · Router
   ============================================================ */
// CHARACTER SHOWCASE INTERACTIVITY
document.addEventListener('DOMContentLoaded', function() {
  // Character data
  const characters = {
    elara: {
      name: 'Elara',
      title: 'The Compassionate Restorer',
      description: 'She is kind, gentle, and caring. She wants to bring back warmth, happiness, and smiles by restoring lost memories.',
      slogan: '"Every restored memory heals a heart."',
      theme: 'Emerald Green',
      themeColor: '#10b981',
      badge: '🌿 Emerald Guardian',
      image: 'assets/character/elara.png',
      thumb: 'assets/character/elara-thumb.png'
    },
    kael: {
      name: 'Kael',
      title: 'The Truth Seeker',
      description: 'He is calm, curious, and loves discovering secrets. He wants to find the true reason behind "The Great Gray."',
      slogan: '"The truth is hidden in the past."',
      theme: 'Deep Violet',
      themeColor: '#7c3aed',
      badge: '🔮 Violet Guardian',
      image: 'assets/character/kael.png',
      thumb: 'assets/character/kael-thumb.png'
    },
    orion: {
      name: 'Orion',
      title: 'The Eternal Guardian',
      description: 'He is responsible and values history and tradition. He believes memories are precious treasures that must be protected for the future.',
      slogan: '"We must protect what remains for the next generation."',
      theme: 'Golden Amber',
      themeColor: '#d97706',
      badge: '🌟 Amber Guardian',
      image: 'assets/character/orion.png',
      thumb: 'assets/character/orion-thumb.png'
    }
  };

  // DOM elements
  const mainImage = document.getElementById('main-character-img');
  const characterName = document.getElementById('character-name');
  const characterTitle = document.getElementById('character-title');
  const characterDescription = document.getElementById('character-description');
  const characterSlogan = document.getElementById('character-slogan');
  const characterTheme = document.getElementById('character-theme');
  const characterBadge = document.getElementById('character-theme-badge');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const carouselTrack = document.getElementById('carousel-track');
  const portraitFrame = document.querySelector('.portrait-frame');
  const cardQuote = document.querySelector('.card-quote');

  // Current active character
  let currentCharacter = 'elara';

  // Function to update UI
  function updateCharacter(characterId) {
    const char = characters[characterId];
    if (!char) return;

    // Update main content
    mainImage.src = char.image;
    mainImage.alt = char.name;
    characterName.textContent = char.name;
    characterTitle.textContent = char.title;
    characterDescription.textContent = char.description;
    characterSlogan.textContent = char.slogan;
    characterTheme.textContent = char.theme;
    characterBadge.textContent = char.badge;
    characterBadge.style.color = char.themeColor;
    
    // Update card theme colors
    cardQuote.style.borderLeftColor = char.themeColor;
    
    // Update active state in carousel
    carouselItems.forEach(item => {
      item.classList.remove('active');
      if (item.dataset.character === characterId) {
        item.classList.add('active');
      }
    });

    // Add transition effect
    portraitFrame.style.animation = 'none';
    setTimeout(() => {
      portraitFrame.style.animation = '';
    }, 10);
  }

  // Carousel navigation
  let currentIndex = 0;
  const items = Array.from(carouselItems);
  
  function updateCarousel(index) {
    if (index < 0) index = 0;
    if (index >= items.length) index = items.length - 1;
    currentIndex = index;
    
    const activeItem = items[currentIndex];
    if (activeItem) {
      updateCharacter(activeItem.dataset.character);
      
      // Scroll to make active item visible
      activeItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }

  // Add click handlers to carousel items
  carouselItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      updateCharacter(item.dataset.character);
      updateCarousel(currentIndex);
    });
  });

  // Navigation buttons
  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel(currentIndex);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentIndex--;
      updateCarousel(currentIndex);
    } else if (e.key === 'ArrowRight') {
      currentIndex++;
      updateCarousel(currentIndex);
    }
  });

  // Initial load
  updateCharacter('elara');
});



// ─── CONFIG ────────────────────────────────────────────────
const CONFIG = {
  MAX_LIVES:      5,
  LIFE_COST:      10,
  LIFE_REFILL_MS: 60_000,
  DAILY_BONUS:    20,
  GRID_SIZES:     [3, 4, 5, 6, 7],
  GRID_MOVES:     { 3: 100, 4: 200, 5: 300, 6: 400, 7: 500 },
  GRID_POINTS:    { 3: 10,  4: 15,  5: 25,  6: 35,  7: 50  },
};

const AVATARS = ['😀','🐯','🦁','🐼','🦊','🐸','🤖','👾','🐧','🦄'];

const GUARDIANS = {
  elara: { name: 'Elara', title: 'The Compassionate Restorer', emoji: '🌿', color: '#10b981', bg: 'rgba(16,185,129,.12)', slogan: 'Every restored memory heals a heart.' },
  kael:  { name: 'Kael',  title: 'The Truth Seeker',          emoji: '🔮', color: '#7c3aed', bg: 'rgba(124,58,237,.12)', slogan: 'The truth is hidden in the past.' },
  orion: { name: 'Orion', title: 'The Eternal Guardian',     emoji: '🌟', color: '#d97706', bg: 'rgba(217,119,6,.12)',  slogan: 'We must protect what remains.' },
};

const WORLDS = [
  { id: 'animals',    name: 'The Whispering Woods',    sub: 'Animals',       icon: '🌲', color: '#22c55e', images: 5 },
  { id: 'famous',     name: 'The History of Legends',  sub: 'Famous People', icon: '🏛️', color: '#3b82f6', images: 5 },
  { id: 'cars',       name: 'The Wonder Wheels',       sub: 'Cars',          icon: '⚙️', color: '#ef4444', images: 5 },
  { id: 'flowers',    name: 'The Blooming Meadows',    sub: 'Flowers',       icon: '🌸', color: '#ec4899', images: 5 },
  { id: 'wonders',    name: 'The Echoes of Time',      sub: 'Wonders',    icon: '⏳', color: '#06b6d4', images: 5 },
];

const CATEGORIES = [
  { id: 'animals',    label: 'Animals',       icon: '🐾', color: '#22c55e', bg: '#f0fdf4' },
  { id: 'famous',     label: 'Famous People', icon: '👤', color: '#3b82f6', bg: '#eff6ff' },
  { id: 'cars',       label: 'Cars',          icon: '🚗', color: '#ef4444', bg: '#fef2f2' },
  { id: 'flowers',    label: 'Flowers',       icon: '🌸', color: '#ec4899', bg: '#fdf2f8' },
  { id: 'wonders',    label: 'Wonders',    icon: '🏔️', color: '#06b6d4', bg: '#ecfeff' },
];

const IMAGES = {
  animals: [
    { id: 1, name: 'Lion', thumb: 'assets/animals/lion.png' },
    { id: 2, name: 'Elephant', thumb: 'assets/animals/elephant.png' },
    { id: 3, name: 'Dolphin', thumb: 'assets/animals/dolphin.png' },
    { id: 4, name: 'Penguin', thumb: 'assets/animals/penguin.png' },
    { id: 5, name: 'Cheetah', thumb: 'assets/animals/cheetah.png' },
    { id: 6, name: 'Giraffe', thumb: 'assets/animals/giraffe.png' },
    { id: 7, name: 'Zebra', thumb: 'assets/animals/zebra.png' },
    { id: 8, name: 'Kangaroo', thumb: 'assets/animals/kangaroo.png' },
    { id: 9, name: 'Panda', thumb: 'assets/animals/panda.png' },
    { id: 10, name: 'Fox', thumb: 'assets/animals/fox.png' }
  ],
  famous: [
    { id: 1, name: 'Einstein', thumb: 'assets/famous/einstein.png' },
    { id: 2, name: 'Marie Curie', thumb: 'assets/famous/marie_curie.png' },
    { id: 3, name: 'Da Vinci', thumb: 'assets/famous/da_vinci.png' },
    { id: 4, name: 'Tesla', thumb: 'assets/famous/telsa.png' },
    { id: 5, name: 'Cleopatra', thumb: 'assets/famous/cleopatra.png' },
    { id: 6, name: 'Shakespeare', thumb: 'assets/famous/shakespeare.png' },
    { id: 7, name: 'Napoleon', thumb: 'assets/famous/napoleon.png' },
    { id: 8, name: 'Lincoln', thumb: 'assets/famous/lincoln.png' },
    { id: 9, name: 'Aristotle', thumb: 'assets/famous/aristotle.png' },
    { id: 10, name: 'Galileo', thumb: 'assets/famous/galileo.png' }
  ],
  cars: [
    { id: 1, name: 'Mustang', thumb: 'assets/cars/mustang.png' },
    { id: 2, name: 'Beetle', thumb: 'assets/cars/beetle.png' },
    { id: 3, name: 'BMW', thumb: 'assets/cars/bmw.png' },
    { id: 4, name: 'Mercedes', thumb: 'assets/cars/mercedes.png' },
    { id: 5, name: 'Audi', thumb: 'assets/cars/audi.png' },
    { id: 6, name: 'Bugatti', thumb: 'assets/cars/bugatti.png' },
    { id: 7, name: 'Lamborghini', thumb: 'assets/cars/lamborghini.png' },
    { id: 8, name: 'MCLaren', thumb: 'assets/cars/mclaren.png' },
    { id: 9, name: 'Porsche', thumb: 'assets/cars/porsche.png' },
    { id: 10, name: 'Ferrari', thumb: 'assets/cars/ferrari.png' }
  ],
  flowers: [
    { id: 1, name: 'Rose', thumb: 'assets/flowers/rose.png' },
    { id: 2, name: 'Sunflower', thumb: 'assets/flowers/sunflower.png' },
    { id: 3, name: 'Lotus', thumb: 'assets/flowers/lotus.png' },
    { id: 4, name: 'Orchid', thumb: 'assets/flowers/orchid.png' },
    { id: 5, name: 'Tulip', thumb: 'assets/flowers/tulip.png' },
    { id: 6, name: 'Lily', thumb: 'assets/flowers/lily.png' },
    { id: 7, name: 'Daisy', thumb: 'assets/flowers/daisy.png' },
    { id: 8, name: 'Jasmine', thumb: 'assets/flowers/jasmine.png' },
    { id: 9, name: 'Marigold', thumb: 'assets/flowers/marigold.png' },
    { id: 10, name: 'Lavender', thumb: 'assets/flowers/lavender.png' }
  ],
  wonders: [
    { id: 1, name: 'Eiffel Tower', thumb: 'assets/wonders/eiffel.png' },
    { id: 2, name: 'Great Wall of China', thumb: 'assets/wonders/greatwall.png' },
    { id: 3, name: 'Taj Mahal', thumb: 'assets/wonders/tajmahal.png' },
    { id: 4, name: 'Statue of Liberty', thumb: 'assets/wonders/liberty.png' },
    { id: 5, name: 'Sagrada Familia', thumb: 'assets/wonders/sagrada.png' },
    { id: 6, name: 'Pyramids of Giza', thumb: 'assets/wonders/pyramid.png' },
    { id: 7, name: 'Bagan', thumb: 'assets/wonders/bagan.png' },
    { id: 8, name: 'Sydney Opera House', thumb: 'assets/wonders/sydney.png' },
    { id: 9, name: 'Big Ben', thumb: 'assets/wonders/bigben.png' },
    { id: 10, name: 'Angkor Wat', thumb: 'assets/wonders/angkorwat.png' }
  ]
};

const FACTS = {
  animals: [
    { name: 'Lion',     fact: 'Lions are the only big cats that live in structured social groups called prides. Within a pride, females usually hunt together while males defend the territory and protect the group from rivals.' },
    { name: 'Elephant', fact: 'Elephants are highly intelligent animals with strong memory and emotions. They can recognize themselves in mirrors and are known to show behaviors that resemble mourning for lost family members.' },
    { name: 'Dolphin',  fact: 'Dolphins communicate using a wide range of clicks and whistles. Each dolphin even develops a unique “signature sound” that functions like a name for identification.' },
    { name: 'Penguin',  fact: 'Penguins are flightless birds adapted for swimming. Their wings function like flippers, allowing them to move quickly underwater while surviving extreme cold climates.' },
    { name: 'Cheetah',  fact: 'Cheetahs are the fastest land animals on Earth, capable of reaching extreme speeds in seconds. However, they can only maintain full sprint for a very short distance.' },
    { name: 'Giraffe',  fact: 'Giraffes are the tallest land animals, and despite their long necks, they have the same number of neck bones as humans, just greatly elongated.' },
    { name: 'Zebra',    fact: 'Each zebra has a completely unique stripe pattern, similar to human fingerprints. These stripes may also help confuse predators during group movement.' },
    { name: 'Kangaroo', fact: 'Kangaroos are marsupials that carry their young in a pouch. They move primarily by hopping, and their powerful tails help them balance and support movement.' },
    { name: 'Panda',    fact: 'Pandas mainly eat bamboo despite being biologically classified as carnivores. They spend most of their day eating to meet their low-energy diet needs.' },
    { name: 'Fox',      fact: 'Foxes are highly adaptable animals that can live in forests, mountains, and even urban areas. Some species are known to use Earth’s magnetic field to help hunt.' },
  ],

  famous: [
    { name: 'Einstein',     fact: 'Albert Einstein developed the theory of relativity, which changed how we understand time, space, and gravity. His work laid the foundation of modern physics.' },
    { name: 'Marie Curie',  fact: 'Marie Curie was a pioneering scientist who discovered radioactivity. She remains the only person awarded Nobel Prizes in two different scientific fields.' },
    { name: 'Da Vinci',     fact: 'Leonardo da Vinci was a Renaissance genius known for art, engineering, and scientific studies. He designed inventions far ahead of his time.' },
    { name: 'Tesla',        fact: 'Nikola Tesla revolutionized electricity with alternating current systems. His inventions and ideas still influence modern electrical technology.' },
    { name: 'Cleopatra',    fact: 'Cleopatra was the last ruler of Ancient Egypt, known for her intelligence, diplomacy, and ability to form powerful political alliances.' },
    { name: 'Shakespeare',  fact: 'William Shakespeare wrote influential plays and poems that shaped English literature. Many phrases he created are still used today.' },
    { name: 'Napoleon',     fact: 'Napoleon Bonaparte was a military leader who rose during the French Revolution and became one of Europe’s most powerful rulers.' },
    { name: 'Lincoln',      fact: 'Abraham Lincoln led the United States through the Civil War and played a key role in ending slavery through the Emancipation Proclamation.' },
    { name: 'Aristotle',    fact: 'Aristotle was a Greek philosopher whose ideas shaped logic, science, and ethics, influencing education systems for centuries.' },
    { name: 'Galileo',      fact: 'Galileo Galilei improved early telescopes and made key discoveries supporting the idea that Earth orbits the Sun.' },
  ],

  cars: [
    { name: 'Mustang',      fact: 'The Ford Mustang became an iconic American muscle car known for its powerful engine, sporty design, and influence on car culture since the 1960s.' },
    { name: 'Beetle',       fact: 'The Volkswagen Beetle is one of the most recognizable cars ever made, known for its rounded shape and long production history.' },
    { name: 'BMW',          fact: 'BMW focuses on combining luxury with driving performance, often described as creating “the ultimate driving machines.”' },
    { name: 'Mercedes',     fact: 'Mercedes-Benz is a historic automotive brand known for luxury, safety innovation, and high-end engineering excellence.' },
    { name: 'Audi',         fact: 'Audi is recognized for advanced automotive technology, sleek design, and its signature Quattro all-wheel-drive system.' },
    { name: 'Bugatti',      fact: 'Bugatti builds hypercars that push engineering limits, producing some of the fastest and most expensive vehicles in the world.' },
    { name: 'Lamborghini',  fact: 'Lamborghini produces aggressive, high-performance supercars designed for extreme speed and bold futuristic styling.' },
    { name: 'MCLaren',      fact: 'McLaren originated in Formula 1 racing and later expanded into road cars focused on lightweight design and extreme speed.' },
    { name: 'Porsche',      fact: 'Porsche is known for engineering precision and iconic sports cars like the 911, balancing luxury and racing performance.' },
    { name: 'Ferrari',      fact: 'Ferrari is an Italian luxury sports car brand famous for combining high-speed performance with precision engineering and racing heritage.' },
    ],

  flowers: [
    { name: 'Rose',         fact: 'Roses are one of the most cultivated flowers in history and are widely associated with love, beauty, and cultural symbolism across the world.' },
    { name: 'Sunflower',    fact: 'Sunflowers naturally follow the sun during growth, a process called heliotropism, which helps them maximize sunlight exposure.' },
    { name: 'Lotus',        fact: 'Lotus flowers grow in muddy water but emerge clean and beautiful, making them a powerful symbol of purity and spiritual growth.' },
    { name: 'Orchid',       fact: 'Orchids are one of the largest plant families, with thousands of species adapted to different environments and climates worldwide.' },
    { name: 'Tulip',        fact: 'Tulips became historically famous during “Tulip Mania,” one of the earliest recorded economic bubbles in history.' },
    { name: 'Lily',         fact: 'Lilies are elegant flowers often associated with purity and renewal, commonly used in ceremonies and symbolic arrangements.' },
    { name: 'Daisy',        fact: 'Daisies are simple yet resilient flowers that open in daylight and close at night, responding to natural light cycles.' },
    { name: 'Jasmine',      fact: 'Jasmine is known for its strong fragrance and is widely used in perfumes, teas, and traditional cultural practices.' },
    { name: 'Marigold',     fact: 'Marigolds are bright flowers often used in festivals and celebrations, symbolizing positivity and good fortune in many cultures.' },
    { name: 'Lavender',     fact: 'Lavender is valued for its calming scent and is widely used in aromatherapy, relaxation, and herbal medicine.' },
  ],

  wonders: [
    { name: 'Eiffel Tower',         fact: 'The Eiffel Tower was initially criticized but later became one of the most iconic symbols of France and global architecture.' },
    { name: 'Great Wall of China',  fact: 'The Great Wall was built over centuries for defense purposes and stretches across diverse landscapes including mountains and deserts.' },
    { name: 'Taj Mahal',            fact: 'The Taj Mahal is a white marble mausoleum built as a symbol of love, and its appearance changes with sunlight throughout the day.' },
    { name: 'Statue of Liberty',    fact: 'The Statue of Liberty represents freedom and democracy, welcoming immigrants arriving in the United States by sea.' },
    { name: 'Sagrada Familia',      fact: 'Sagrada Familia is an architectural masterpiece designed by Antoni Gaudí and remains under construction after more than a century.' },
    { name: 'Pyramids of Giza',     fact: 'The Pyramids of Giza are ancient royal tombs built with extraordinary precision and remain one of the last surviving ancient wonders.' },
    { name: 'Bagan',                fact: 'Bagan is an ancient city in Myanmar with thousands of temples built between the 9th and 13th centuries, forming a vast cultural landscape.' },
    { name: 'Sydney Opera House',   fact: 'The Sydney Opera House is a world-famous performance center known for its sail-like design and cultural significance in Australia.' },
    { name: 'Big Ben',              fact: 'Big Ben refers to the Great Bell inside London’s clock tower, which has become one of the most recognized landmarks in the UK.' },
    { name: 'Angkor Wat',           fact: 'Angkor Wat is the largest religious monument in the world and originally served as a Hindu temple before becoming Buddhist.' },
  ],
};

const ACHIEVEMENTS = [
  { id: 'first',     icon: '🏅', label: 'First Solve',   desc: 'Complete your first puzzle' },
  { id: 'speedster', icon: '⚡', label: 'Speedster',      desc: 'Finish a puzzle in under 60 seconds' },
  { id: 'saver',     icon: '💰', label: 'Point Saver',   desc: 'Accumulate 100 points' },
  { id: 'scholar',   icon: '📚', label: 'Scholar',       desc: 'Collect 5 Knowledge Cards' },
  { id: 'explorer',  icon: '🗺️', label: 'Explorer',      desc: 'Play all 5 categories' },
  { id: 'master',    icon: '👑', label: 'Puzzle Master', desc: 'Complete a 7×7 grid' },
];

// ─── LOCAL STORAGE ──────────────────────────────────────────
const Store = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.warn(e); } },
  del(key) { try { localStorage.removeItem(key); } catch { /* noop */ } },
};

// ─── AUTH ────────────────────────────────────────────────────
const Auth = {
  current() { const name = Store.get('pq_user'); return name ? Store.get('pq_profiles', {})[name] ?? null : null; },
  all()     { return Store.get('pq_profiles', {}); },
  loggedIn(){ return !!this.current(); },

  login(name) {
    const profiles = this.all();
    if (!profiles[name]) return false;
    Store.set('pq_user', name);
    return true;
  },

  register(name, avatarIdx) {
    const clean = name?.trim();
    if (!clean || clean.length < 2) return { ok: false, msg: 'Name must be at least 2 characters.' };
    const profiles = this.all();
    if (profiles[clean]) return { ok: false, msg: 'Name already taken. Choose another.' };
    const now = Date.now();
    profiles[clean] = {
      name: clean,
      avatar: AVATARS[avatarIdx] ?? AVATARS[0],
      guardian: null,          // set on guardian.html
      points: 0, lives: CONFIG.MAX_LIVES, lastLifeTime: now,
      puzzlesSolved: 0, totalTime: 0, bestTime: null,
      cards: [], achievements: [], categoriesPlayed: [],
      lastLogin: new Date().toDateString(), bonusClaimed: false,
      joined: now, isNew: true,
    };
    Store.set('pq_profiles', profiles);
    Store.set('pq_user', clean);
    return { ok: true };
  },

  logout()  { Store.del('pq_user'); },

  update(data) {
    const name = Store.get('pq_user'); if (!name) return;
    const profiles = Store.get('pq_profiles', {});
    if (!profiles[name]) return;
    Object.assign(profiles[name], data);
    Store.set('pq_profiles', profiles);
  },

  deleteAccount() {
    const name = Store.get('pq_user'); if (!name) return false;
    const profiles = Store.get('pq_profiles', {});
    delete profiles[name];
    Store.set('pq_profiles', profiles);
    Store.del('pq_user');
    return true;
  },

  addCard(cat, cardData) {
    const pr = this.current(); if (!pr) return;
    const cards = pr.cards ?? [];
    if (!cards.some(c => c.name === cardData.name)) {
      cards.push({ ...cardData, category: cat, date: new Date().toLocaleDateString() });
      this.update({ cards });
    }
    if (cards.length >= 5) this.unlock('scholar');
  },

  unlock(id) {
    const pr = this.current(); if (!pr) return;
    const list = pr.achievements ?? [];
    if (!list.includes(id)) { list.push(id); this.update({ achievements: list }); }
  },

  checkAchievements({ time, grid }) {
    const pr = this.current(); if (!pr) return;
    if ((pr.puzzlesSolved ?? 0) === 1)          this.unlock('first');
    if (time <= 60)                              this.unlock('speedster');
    if ((pr.points ?? 0) >= 100)                this.unlock('saver');
    if ((pr.categoriesPlayed ?? []).length >= 5) this.unlock('explorer');
    if (grid === 7)                              this.unlock('master');
  },
};

// ─── GUARDIAN SYSTEM ─────────────────────────────────────────
// ─── GUARDIAN SYSTEM WITH MUSIC CHANGE ─────────────────────────
// ─── GUARDIAN SYSTEM WITH MUSIC CHANGE - FIXED ─────────────────
const Guardian = {
  apply() {
    const pr = Auth.current();
    const g  = pr?.guardian ?? Store.get('pq_guardian_tmp');
    document.body.classList.remove('guardian-elara', 'guardian-kael', 'guardian-orion');
    if (g && GUARDIANS[g]) document.body.classList.add(`guardian-${g}`);
  },

  set(key) {
    console.log(`Setting guardian to: ${key}`);
    Auth.update({ guardian: key });
    Store.set('pq_guardian_tmp', key);
    this.apply();
    
    // IMPORTANT: Directly call changeGuardianMusic on BackgroundMusic
    if (window.BackgroundMusic) {
      window.BackgroundMusic.changeGuardianMusic(key);
    }
  },

  get() { return Auth.current()?.guardian ?? null; },

  label() {
    const g = this.get();
    return g ? GUARDIANS[g]?.name : null;
  },
};

// ─── LIVES ──────────────────────────────────────────────────
const Lives = {
  _timer: null,
  get() {
    const pr = Auth.current(); if (!pr) return 0;
    if (pr.lives >= CONFIG.MAX_LIVES) return CONFIG.MAX_LIVES;
    const elapsed = Date.now() - pr.lastLifeTime;
    const gained  = Math.floor(elapsed / CONFIG.LIFE_REFILL_MS);
    const next    = Math.min(pr.lives + gained, CONFIG.MAX_LIVES);
    if (next !== pr.lives) Auth.update({ lives: next, lastLifeTime: pr.lastLifeTime + gained * CONFIG.LIFE_REFILL_MS });
    return next;
  },
  lose() { const v = this.get(); if (v <= 0) return 0; Auth.update({ lives: v - 1, lastLifeTime: Date.now() }); return v - 1; },
  buy()  {
    const pr = Auth.current(); if (!pr) return { ok: false, msg: 'Not logged in.' };
    const v  = this.get();
    if (v >= CONFIG.MAX_LIVES) return { ok: false, msg: 'Already at max lives!' };
    if ((pr.points ?? 0) < CONFIG.LIFE_COST) return { ok: false, msg: `Need ${CONFIG.LIFE_COST} pts to buy a life.` };
    Auth.update({ lives: v + 1, points: pr.points - CONFIG.LIFE_COST });
    return { ok: true, msg: '❤️ Extra life purchased!' };
  },
  secsUntilNext() {
    const pr = Auth.current(); if (!pr || pr.lives >= CONFIG.MAX_LIVES) return 0;
    const elapsed = Date.now() - pr.lastLifeTime;
    return Math.ceil((CONFIG.LIFE_REFILL_MS - (elapsed % CONFIG.LIFE_REFILL_MS)) / 1000);
  },
  startWatch(cb) { this.stopWatch(); this._timer = setInterval(() => { if (typeof cb === 'function') cb(this.get(), this.secsUntilNext()); }, 1000); },
  stopWatch()    { if (this._timer) { clearInterval(this._timer); this._timer = null; } },
};

// ─── DAILY BONUS ────────────────────────────────────────────
const Daily = {
  claim() {
    const pr = Auth.current(); if (!pr) return false;
    const today = new Date().toDateString();
    if (pr.lastLogin !== today || !pr.bonusClaimed) {
      Auth.update({ points: (pr.points ?? 0) + CONFIG.DAILY_BONUS, lastLogin: today, bonusClaimed: true });
      return true;
    }
    return false;
  },
};

// ─── LEADERBOARD ────────────────────────────────────────────
const Board = {
  sorted() { return Object.values(Auth.all()).sort((a, b) => b.points - a.points); },
  rank()   { const name = Store.get('pq_user'); const idx = this.sorted().findIndex(p => p.name === name); return idx === -1 ? null : idx + 1; },
};

// ─── SOUND ENGINE ───────────────────────────────────────────
const Sound = {
  ctx: null, bgGain: null, muted: false, bgPlaying: false, _bgTimer: null,
  init() {
    this.muted = Store.get('pq_muted', false);
    try { this.ctx = new (window.AudioContext ?? window.webkitAudioContext)(); } catch { /* noop */ }
    this._refreshBtns();
    document.addEventListener('click', () => { this.ctx?.state === 'suspended' && this.ctx.resume(); }, { once: true });
  },
  toggle()   { this.muted = !this.muted; Store.set('pq_muted', this.muted); if (this.muted) this._stopBg(); this._refreshBtns(); },
  toggleBg() { this.bgPlaying ? this._stopBg() : this._startBg(); },
  _refreshBtns() {
    const sb = document.getElementById('sound-btn');
    const mb = document.getElementById('music-btn');
    if (sb) sb.textContent = this.muted ? '🔇 Sound Off' : '🔊 Sound On';
    if (mb) mb.textContent = this.bgPlaying ? '🎵 Music On' : '🎵 Music Off';
  },
  _tone(freq, dur, type = 'sine', vol = 0.25, delay = 0) {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain(); const t = this.ctx.currentTime + delay;
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.type = type; osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(vol, t + 0.01); gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.start(t); osc.stop(t + dur + 0.05);
    } catch { /* noop */ }
  },
  _startBg() { if (this.muted || !this.ctx || this.bgPlaying) return; this.bgPlaying = true; this._refreshBtns(); this._bgLoop(); },
  _stopBg()  { this.bgPlaying = false; clearTimeout(this._bgTimer); this._refreshBtns(); try { this.bgGain?.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5); } catch { /* noop */ } setTimeout(() => { this.bgGain = null; }, 600); },
  _bgLoop() {
    if (!this.bgPlaying || !this.ctx) return;
    const notes = [261, 329, 392, 523, 659, 784]; const now = this.ctx.currentTime;
    if (!this.bgGain) { this.bgGain = this.ctx.createGain(); this.bgGain.gain.setValueAtTime(0.06, now); this.bgGain.connect(this.ctx.destination); }
    notes.forEach((f, i) => { const osc = this.ctx.createOscillator(); osc.type = 'sine'; osc.frequency.setValueAtTime(f, now + i * 0.22); osc.connect(this.bgGain); osc.start(now + i * 0.22); osc.stop(now + i * 0.22 + 0.3); });
    this._bgTimer = setTimeout(() => this._bgLoop(), notes.length * 220 + 800);
  },
  tile()     { this._tone(440, 0.07, 'square',   0.12); },
  wrong()    { this._tone(160, 0.10, 'sawtooth', 0.18); },
  click()    { this._tone(600, 0.05, 'sine',     0.10); },
  complete() { [523, 659, 784, 1047].forEach((f, i) => this._tone(f, 0.14, 'sine', 0.28, i * 0.11)); },
  lifeLost() { [392, 330, 262].forEach((f, i) => this._tone(f, 0.16, 'triangle', 0.22, i * 0.14)); },
  buy()      { [523, 659, 784].forEach((f, i) => this._tone(f, 0.1, 'sine', 0.2, i * 0.09)); },
};

// ─── DIALOG ─────────────────────────────────────────────────
const Dialog = {
  _create(html) {
    const el = document.createElement('div'); el.className = 'dlg-overlay'; el.innerHTML = html;
    document.body.appendChild(el); requestAnimationFrame(() => el.classList.add('dlg-show')); return el;
  },
  _close(el) { el.classList.remove('dlg-show'); setTimeout(() => el.remove(), 280); },
  alert(message, { title = 'Notice', icon = 'ℹ️', type = 'info' } = {}) {
    return new Promise(resolve => {
      const el = this._create(`<div class="dlg dlg--${type}"><span class="dlg__icon">${icon}</span><h3 class="dlg__title">${title}</h3><p class="dlg__msg">${message}</p><div class="dlg__actions"><button class="btn btn--primary dlg-ok" style="min-width:110px">OK</button></div></div>`);
      const close = () => { this._close(el); resolve(); };
      el.querySelector('.dlg-ok').addEventListener('click', close);
      el.addEventListener('click', e => { if (e.target === el) close(); });
    });
  },
  confirm(message, { title = 'Are you sure?', icon = '⚠️', okLabel = 'Confirm', cancelLabel = 'Cancel', danger = false } = {}) {
    return new Promise(resolve => {
      const el = this._create(`<div class="dlg"><span class="dlg__icon">${icon}</span><h3 class="dlg__title">${title}</h3><p class="dlg__msg">${message}</p><div class="dlg__actions"><button class="btn btn--outline dlg-cancel">${cancelLabel}</button><button class="btn ${danger ? 'btn--danger' : 'btn--primary'} dlg-ok">${okLabel}</button></div></div>`);
      const ok = () => { this._close(el); resolve(true); };
      const cancel = () => { this._close(el); resolve(false); };
      el.querySelector('.dlg-ok').addEventListener('click', ok);
      el.querySelector('.dlg-cancel').addEventListener('click', cancel);
      el.addEventListener('click', e => { if (e.target === el) cancel(); });
    });
  },
};

// ─── TOAST ──────────────────────────────────────────────────
function toast(msg, type = 'info', ms = 3200) {
  let box = document.getElementById('toast-box');
  if (!box) { box = document.createElement('div'); box.id = 'toast-box'; document.body.appendChild(box); }
  const t = document.createElement('div'); t.className = `toast toast--${type}`;
  t.innerHTML = `<span class="toast__msg">${msg}</span>`;
  box.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 320); }, ms);
}

// ─── UTILITY ────────────────────────────────────────────────
function fmtTime(s) {
  if (!s || s <= 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function heartsHTML(count, max = CONFIG.MAX_LIVES) {
  return Array.from({ length: max }, (_, i) =>
    `<span class="heart ${i < count ? '' : 'heart--empty'}">❤️</span>`
  ).join('');
}

// ─── NAVBAR ─────────────────────────────────────────────────
// ─── NAVBAR - Updated with Music Button for ALL users ─────────────────────────────────
const Nav = {
  build() {
    const el = document.getElementById('main-nav'); 
    if (!el) return;
    
    const loggedIn = Auth.loggedIn();
    const pr = Auth.current();
    const lives = loggedIn ? Lives.get() : 0;
    const gLabel = Guardian.label();

    el.innerHTML = `
      <div class="nav__brand">
        <a href="index.html" class="nav__logo">🧩 PuzzleQuest</a>
      </div>
      <button class="nav__burger" id="nav-burger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav__links" id="nav-links">
        <li><a href="index.html" class="nav__a">Home</a></li>
        ${loggedIn ? `
          <li><a href="worldmap.html" class="nav__a">Play</a></li>
          <li><a href="library.html" class="nav__a">Library</a></li>
          <li><a href="leaderboard.html" class="nav__a">Ranks</a></li>
        ` : `
          <li><a href="index.html#how" class="nav__a">How to Play</a></li>
          <li><a href="leaderboard.html" class="nav__a">Ranks</a></li>
        `}
        <li><a href="about.html" class="nav__a">About</a></li>
        <li><a href="faq.html" class="nav__a">FAQ</a></li>
        <li><a href="contact.html" class="nav__a">Contact</a></li>
      </ul>
      <div class="nav__right">
  ${loggedIn ? `
    <div class="nav__lives" id="nav-lives">${heartsHTML(lives)}</div>
    <span class="nav__pts" id="nav-pts">⭐ ${pr.points}</span>
    ${gLabel ? `<span class="nav__guardian-badge">${GUARDIANS[pr.guardian]?.emoji} ${gLabel}</span>` : ''}
    <a href="profile.html" class="nav__profile">${pr.avatar}<span>${pr.name}</span></a>
  ` : ''}
  <!-- Music Button - Shows for ALL users -->
  <button class="music-toggle-btn playing" id="music-toggle" title="Mute music">
    <span class="music-icon">♪</span>
    <span class="music-status">ON</span>
  </button>
  <button id="theme-btn" class="nav__icon-btn" title="Toggle theme">🌙</button>
</div>
    `;

    this._setupBurger();
    this._setupTheme();
    this._markActive();
    
    // Setup music button after DOM is ready
    setTimeout(() => {
      if (window.BackgroundMusic) {
        window.BackgroundMusic.setupButton();
      }
    }, 100);
  },

  _setupBurger() {
    const burger = document.getElementById('nav-burger');
    const links = document.getElementById('nav-links');
    
    if (burger && links) {
      burger.addEventListener('click', (e) => {
        e.stopPropagation();
        links.classList.toggle('open');
        burger.classList.toggle('open');
      });
      
      // Close menu when clicking outside on mobile
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          if (!burger.contains(e.target) && !links.contains(e.target)) {
            links.classList.remove('open');
            burger.classList.remove('open');
          }
        }
      });
    }
  },

  _setupTheme() {
    const btn = document.getElementById('theme-btn');
    if (!btn) return;
    
    const apply = theme => {
      document.body.dataset.theme = theme;
      Store.set('pq_theme', theme);
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    };
    
    apply(Store.get('pq_theme', 'light'));
    btn.addEventListener('click', () => {
      apply(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  },

  _markActive() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__a').forEach(a => {
      if (a.getAttribute('href') === page) {
        a.classList.add('active');
      }
    });
  },

  refresh() {
    const livesEl = document.getElementById('nav-lives');
    const ptsEl = document.getElementById('nav-pts');
    
    if (livesEl) livesEl.innerHTML = heartsHTML(Lives.get());
    if (ptsEl && Auth.current()) ptsEl.textContent = `⭐ ${Auth.current().points}`;
  },
};

// ─── FOOTER ─────────────────────────────────────────────────
const Foot = {
  build() {
    const el = document.getElementById('main-footer'); if (!el) return;
    el.innerHTML = `
      <div class="foot__inner">
        <div class="foot__brand">
          <span class="foot__logo">🧩 PuzzleQuest</span>
          <p>Slide. Solve. Learn.</p>
        </div>
        <nav class="foot__nav">
          <a href="index.html">Home</a>
          <a href="worldmap.html">Play</a>
          <a href="library.html">Library</a>
          <a href="leaderboard.html">Leaderboard</a>
          <a href="profile.html">Profile</a>
          <a href="about.html">About</a>
          <a href="faq.html">FAQ</a>
          <a href="contact.html">Contact</a>
        </nav>
        <p class="foot__copy">© 2026 PuzzleQuest — All rights reserved.</p>
      </div>`;
  },
};

// ─── PAGE: HOME ─────────────────────────────────────────────
const Home = {
  init() {
    document.getElementById('hero-play-btn')?.addEventListener('click', () => {
      Sound.click();
      location.href = Auth.loggedIn() ? 'worldmap.html' : 'login.html';
    });

    if (Auth.loggedIn() && Daily.claim())
      setTimeout(() => toast(`🎁 Daily bonus! +${CONFIG.DAILY_BONUS} points!`, 'success'), 700);
  },
};

// ─── PAGE: LOGIN / REGISTER ──────────────────────────────────
const LoginPage = {
  selAvatar: 0,
  init() {
    const params = new URLSearchParams(location.search);
    const isNew  = params.get('new') === '1';

    if (Auth.loggedIn() && !isNew) {
      // Returning user — check if they have a guardian, skip welcome
      const pr = Auth.current();
      location.href = pr?.guardian ? 'worldmap.html' : 'guardian.html';
      return;
    }

    if (isNew) Auth.logout();
    this._bindTabs();
    this._buildAvatars();
    this._bindForms();
    if (isNew) this._setMode('register');
  },

  _bindTabs() {
    document.getElementById('tab-login')?.addEventListener('click',    () => this._setMode('login'));
    document.getElementById('tab-register')?.addEventListener('click', () => this._setMode('register'));
  },

  _setMode(mode) {
    document.getElementById('tab-login')?.classList.toggle('active',    mode === 'login');
    document.getElementById('tab-register')?.classList.toggle('active', mode === 'register');
    document.getElementById('login-form')?.classList.toggle('hidden',    mode !== 'login');
    document.getElementById('register-form')?.classList.toggle('hidden', mode !== 'register');
  },

  _buildAvatars() {
    const grid = document.getElementById('avatar-grid'); if (!grid) return;
    grid.innerHTML = AVATARS.map((a, i) =>
      `<button type="button" class="av-btn${i === 0 ? ' av-btn--sel' : ''}" data-i="${i}">${a}</button>`
    ).join('');
    grid.querySelectorAll('.av-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.av-btn').forEach(b => b.classList.remove('av-btn--sel'));
        btn.classList.add('av-btn--sel'); this.selAvatar = +btn.dataset.i;
        const prev = document.getElementById('av-preview'); if (prev) prev.textContent = AVATARS[this.selAvatar];
      });
    });
  },

  _bindForms() {
    document.getElementById('login-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('l-name')?.value.trim();
      if (!name) { this._showErr('login', 'Please enter your player name.'); return; }
      if (!Auth.login(name)) { this._showErr('login', 'Profile not found. Please register first.'); return; }
      Daily.claim();
      const pr = Auth.current();
      // If no guardian yet, go to guardian select; otherwise go to worldmap
      location.href = pr?.guardian ? 'worldmap.html' : 'guardian.html';
    });

    document.getElementById('register-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const name   = document.getElementById('r-name')?.value.trim();
      const result = Auth.register(name, this.selAvatar);
      if (!result.ok) { this._showErr('register', result.msg); return; }
      Daily.claim();
      // New user → welcome flow
      location.href = 'welcome.html';
    });
  },

  _showErr(form, msg) {
    const el = document.getElementById(`${form}-err`);
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  },
};

// ─── PAGE: WELCOME ───────────────────────────────────────────
// ─── PAGE: WELCOME ───────────────────────────────────────────
const Welcome = {
  step: 0,
  steps: [
    {
      title: '🌍 Welcome to Aetheria!',
      content: `
        <p>Long ago, Aetheria was a beautiful world full of bright colors from people's happy memories.</p>
        <p>But one day, a mysterious event called <span class="highlight">"The Great Gray"</span> appeared. It stole all the memories, and the world broke into scattered puzzle pieces.</p>
        <p>Hello, <span class="highlight" id="welcome-name"></span>! Barnaby the Archivist has been waiting for you.</p>
      `,
    },
    {
      title: '🦉 Your Mission',
      content: `
        <p>You are the <span class="highlight">Memory Keeper</span>. Your goal is to find Shattered Memories hidden as sliding puzzles across Aetheria's five worlds.</p>
        <div class="welcome-rule"><span class="welcome-rule__icon">🧩</span><div class="welcome-rule__text"><strong>Solve puzzles</strong> to bring color back to the world and unlock Knowledge Cards.</div></div>
        <div class="welcome-rule"><span class="welcome-rule__icon">❤️</span><div class="welcome-rule__text"><strong>5 Lives</strong> — a life is lost only if you exceed the move limit. Lives refill every 1 minute.</div></div>
        <div class="welcome-rule"><span class="welcome-rule__icon">⭐</span><div class="welcome-rule__text"><strong>Earn points</strong> per puzzle — bigger grids earn more. Spend points to buy extra lives.</div></div>
      `,
    },
    {
      title: '📐 Grid Sizes & Rewards',
      content: `
        <div class="welcome-rule"><span class="welcome-rule__icon">🟩</span><div class="welcome-rule__text"><strong>3×3</strong> — 100 moves allowed · <span class="highlight">10 points</span></div></div>
        <div class="welcome-rule"><span class="welcome-rule__icon">🟦</span><div class="welcome-rule__text"><strong>4×4</strong> — 200 moves allowed · <span class="highlight">15 points</span></div></div>
        <div class="welcome-rule"><span class="welcome-rule__icon">🟨</span><div class="welcome-rule__text"><strong>5×5</strong> — 300 moves allowed · <span class="highlight">25 points</span></div></div>
        <div class="welcome-rule"><span class="welcome-rule__icon">🟧</span><div class="welcome-rule__text"><strong>6×6</strong> — 400 moves allowed · <span class="highlight">35 points</span></div></div>
        <div class="welcome-rule"><span class="welcome-rule__icon">🟥</span><div class="welcome-rule__text"><strong>7×7</strong> — 500 moves allowed · <span class="highlight">50 points</span></div></div>
      `,
    },
    {
      title: '🚀 Ready to Begin?',
      content: `
        <p>Your next step is to choose a <span class="highlight">Guardian Spirit</span> — a character who will bond with your soul and set the color theme of your journey.</p>
        <div class="welcome-rule"><span class="welcome-rule__icon">🌿</span><div class="welcome-rule__text"><strong>Elara</strong> — The Compassionate Restorer. Emerald green theme.</div></div>
        <div class="welcome-rule"><span class="welcome-rule__icon">🔮</span><div class="welcome-rule__text"><strong>Kael</strong> — The Truth Seeker. Deep violet theme.</div></div>
        <div class="welcome-rule"><span class="welcome-rule__icon">🌟</span><div class="welcome-rule__text"><strong>Orion</strong> — The Eternal Guardian. Golden amber theme.</div></div>
        <p style="margin-top:12px;">When you're ready, click <span class="highlight">Next</span> to choose your Guardian!</p>
      `,
    },
  ],

  init() {
    if (!Auth.loggedIn()) { location.href = 'login.html'; return; }
    this._render();
    
    document.getElementById('welcome-skip')?.addEventListener('click', () => { 
      Sound.click(); 
      location.href = 'guardian.html'; 
    });
    
    document.getElementById('welcome-next')?.addEventListener('click', () => { 
      Sound.click(); 
      this._next(); 
    });
    
    document.getElementById('welcome-back')?.addEventListener('click', () => { 
      Sound.click(); 
      this._back(); 
    });
  },

  _render() {
    const s = this.steps[this.step];
    const stepEl = document.getElementById('welcome-step');
    if (!stepEl) return;
    stepEl.innerHTML = `<h2>${s.title}</h2>${s.content}`;
    
    // Fill in player name placeholder
    const nameEl = document.getElementById('welcome-name');
    if (nameEl) nameEl.textContent = Auth.current()?.name ?? 'Adventurer';

    // Dots
    const dots = document.getElementById('welcome-dots');
    if (dots) dots.innerHTML = this.steps.map((_, i) => `<div class="welcome-dot${i === this.step ? ' active' : ''}"></div>`).join('');

    // Update buttons
    const nextBtn = document.getElementById('welcome-next');
    const backBtn = document.getElementById('welcome-back');
    
    if (nextBtn) {
      nextBtn.textContent = this.step === this.steps.length - 1 ? '🌟 Choose Guardian →' : 'Next →';
    }
    
    // Show/hide back button
    if (backBtn) {
      if (this.step > 0) {
        backBtn.style.display = 'inline-flex';
      } else {
        backBtn.style.display = 'none';
      }
    }
  },

  _next() {
    if (this.step < this.steps.length - 1) { 
      this.step++; 
      this._render(); 
    } else { 
      location.href = 'guardian.html'; 
    }
  },
  
  _back() {
    if (this.step > 0) { 
      this.step--; 
      this._render(); 
    }
  },
};

// ─── PAGE: GUARDIAN SELECT ───────────────────────────────────
// ─── PAGE: GUARDIAN SELECT (UPDATED WITH TOUCH SUPPORT) ───────────────────────────────────
const GuardianPage = {
  selected: null,

  init() {
    if (!Auth.loggedIn()) { location.href = 'login.html'; return; }
    // Already chose a guardian → skip
    if (Auth.current()?.guardian) { location.href = 'worldmap.html'; return; }

    const grid = document.getElementById('guardian-grid');
    if (!grid) return;

    // Guardian data
    const guardiansData = {
      elara: {
        name: 'Elara',
        title: 'The Compassionate Restorer',
        description: 'Kind, gentle, and caring. She wants to bring back warmth and happiness by restoring lost memories.',
        slogan: '"Every restored memory heals a heart."',
        themeColor: '#10b981',
        badge: '🌿',
        image: 'assets/character/elara-choice.png'
      },
      kael: {
        name: 'Kael',
        title: 'The Truth Seeker',
        description: 'Calm, curious, and loves discovering secrets. He wants to find the true reason behind The Great Gray.',
        slogan: '"The truth is hidden in the past."',
        themeColor: '#7c3aed',
        badge: '🔮',
        image: 'assets/character/kael-choice.png'
      },
      orion: {
        name: 'Orion',
        title: 'The Eternal Guardian',
        description: 'Responsible and values history. He believes memories are precious treasures that must be protected.',
        slogan: '"We must protect what remains for the next generation."',
        themeColor: '#d97706',
        badge: '🌟',
        image: 'assets/character/orion-choice.png'
      }
    };

    grid.innerHTML = Object.entries(guardiansData).map(([key, g]) => `
      <div class="guardian-card" data-key="${key}" style="--gc-color:${g.themeColor}">
        <div class="guardian-flip-card">
          <!-- FRONT - Image -->
          <div class="guardian-front">
            <img src="${g.image}" alt="${g.name}" class="guardian-front-image" onerror="this.src='https://placehold.co/400x500/${g.themeColor.replace('#', '')}/white?text=${g.badge}'">
            <div class="guardian-check">✓</div>
          </div>
          
          <!-- BACK - Information -->
          <div class="guardian-back">
            <div class="guardian-back-badge">${g.badge}</div>
            <h3 class="guardian-back-name" style="color:${g.themeColor}">${g.name}</h3>
            <div class="guardian-back-title">${g.title}</div>
            <p class="guardian-back-desc">${g.description}</p>
            <div class="guardian-back-slogan">${g.slogan}</div>
          </div>
        </div>
        <div class="flip-hint">👆 Tap to flip</div>
      </div>
    `).join('');

    // Add click handlers with touch support
    const cards = grid.querySelectorAll('.guardian-card');
    let timeoutId = null;
    
    cards.forEach(card => {
      // Handle click/tap for selection
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        Sound.click();
        
        // For touch devices, first tap flips, second tap selects
        // This provides better UX on mobile
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
          // On touch, if card is flipped, select it; otherwise flip it
          if (card.classList.contains('flipped')) {
            // Select the card
            cards.forEach(c => c.classList.remove('selected', 'flipped'));
            card.classList.add('selected');
            this.selected = card.dataset.key;
            document.getElementById('guardian-confirm')?.removeAttribute('disabled');
          } else {
            // Remove flipped from all other cards, then flip this one
            cards.forEach(c => c.classList.remove('flipped'));
            card.classList.add('flipped');
            
            // Auto-select after a short delay if no other action? No, let user tap again
            // Set timeout to reset flip if not selected? Optional
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              if (card.classList.contains('flipped') && !card.classList.contains('selected')) {
                card.classList.remove('flipped');
              }
            }, 5000);
          }
        } else {
          // Desktop: regular selection
          cards.forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          this.selected = card.dataset.key;
          document.getElementById('guardian-confirm')?.removeAttribute('disabled');
        }
      });
      
      // Double-click for desktop to flip (optional, just for fun)
      card.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        card.classList.toggle('flipped');
      });
    });

    // Confirm button
    // Inside GuardianPage.init(), find the confirm button code and replace it with this:

// Inside GuardianPage.init() - Update confirm button
document.getElementById('guardian-confirm')?.addEventListener('click', () => {
  if (!this.selected) { 
    toast('Please choose a Guardian!', 'warning'); 
    return; 
  }
  
  console.log(`Guardian selected: ${this.selected}`); // Debug log
  Sound.complete();
  
  // Set the guardian
  Guardian.set(this.selected);
  Auth.update({ isNew: false });
  
  // Show message
  const guardianName = this.selected.charAt(0).toUpperCase() + this.selected.slice(1);
  toast(`✨ You've bonded with ${guardianName}! Your journey begins... ✨`, 'success');
  
  // Navigate after delay
  setTimeout(() => {
    location.href = 'worldmap.html';
  }, 1500);
});
  },
};
// ─── PAGE: WORLD MAP ─────────────────────────────────────────
const WorldMap = {
  init() {
    if (!Auth.loggedIn()) { location.href = 'login.html'; return; }

    this.drawConnections();
    this.initIslandClick();
    
    Lives.startWatch(() => Nav.refresh());
  },

  drawConnections() {
    const svg = document.getElementById('mapConnections');
    if (!svg) return;
    
    const islands = document.querySelectorAll('.map-island');
    if (islands.length < 2) return;
    
    function updateConnections() {
      const container = document.querySelector('.world-map-container');
      const containerRect = container.getBoundingClientRect();
      
      svg.setAttribute('width', containerRect.width);
      svg.setAttribute('height', containerRect.height);
      svg.innerHTML = '';
      
      // Get island positions
      let positions = [];
      islands.forEach(island => {
        const islandRect = island.getBoundingClientRect();
        positions.push({
          x: islandRect.left + islandRect.width / 2 - containerRect.left,
          y: islandRect.top + islandRect.height / 2 - containerRect.top
        });
      });
      
      // Draw lines between islands
      for (let i = 0; i < positions.length - 1; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', positions[i].x);
        line.setAttribute('y1', positions[i].y);
        line.setAttribute('x2', positions[i + 1].x);
        line.setAttribute('y2', positions[i + 1].y);
        line.setAttribute('stroke', 'rgba(14, 165, 233, 0.4)');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', '6, 8');
        svg.appendChild(line);
      }
      
      // Draw glow dots at connection points
      positions.forEach(pos => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', '6');
        circle.setAttribute('fill', 'rgba(14, 165, 233, 0.3)');
        svg.appendChild(circle);
        
        const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        innerCircle.setAttribute('cx', pos.x);
        innerCircle.setAttribute('cy', pos.y);
        innerCircle.setAttribute('r', '3');
        innerCircle.setAttribute('fill', 'rgba(14, 165, 233, 0.8)');
        svg.appendChild(innerCircle);
      });
    }
    
    setTimeout(updateConnections, 100);
    window.addEventListener('resize', () => setTimeout(updateConnections, 100));
  },

  initIslandClick() {
    const islands = document.querySelectorAll('.map-island');
    islands.forEach(island => {
      island.addEventListener('click', (e) => {
        e.stopPropagation();
        Sound.click();
        const world = island.dataset.world;
        if (world) {
          location.href = `submap.html?world=${world}`;
        }
      });
    });
  }
};

// ─── PAGE: SUB-MAP ────────────────────────────────────────────
const SubMap = {
  selImg: null,
  selGrid: 3,
  world: null,
  levels: [],
  unlockedLevels: 3,
  completedLevels: [],

  init() {
    if (!Auth.loggedIn()) { location.href = 'login.html'; return; }
    
    const params = new URLSearchParams(location.search);
    this.world = params.get('world') || 'animals';
    const w = WORLDS.find(x => x.id === this.world);
    if (!w) { location.href = 'worldmap.html'; return; }

    // Header
    const title = document.getElementById('submap-title');
    const sub = document.getElementById('submap-sub');
    if (title) title.textContent = w.name;
    if (sub) sub.textContent = w.sub;

    // Load saved progress
    this.loadProgress();
    
    // Build railway tracks
    this.buildRailway();
    
    // Update points display
    this.updatePointsDisplay();
    
    // Back button
    document.getElementById('hub-back')?.addEventListener('click', () => {
      location.href = 'worldmap.html';
    });

    // Initialize modal
    this.initModal();

    Lives.startWatch(() => Nav.refresh());
  },

  initModal() {
    const modal = document.getElementById('gridModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelModalBtn');
    const startBtn = document.getElementById('startGameBtn');
    const modalGridContainer = document.getElementById('modalGridButtons');
    
    // Build grid buttons in modal
    if (modalGridContainer) {
      modalGridContainer.innerHTML = '';
      CONFIG.GRID_SIZES.forEach(size => {
        const btn = document.createElement('div');
        btn.className = `modal-grid-btn${size === 3 ? ' active' : ''}`;
        btn.dataset.size = size;
        btn.innerHTML = `<span>${size}×${size}</span><small>${CONFIG.GRID_POINTS[size]} pts</small>`;
        btn.addEventListener('click', () => {
          modalGridContainer.querySelectorAll('.modal-grid-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.selGrid = size;
          this.updateModalInfo();
        });
        modalGridContainer.appendChild(btn);
      });
    }
    
    this.updateModalInfo();
    
    // Close modal functions
    const closeModal = () => {
      modal.classList.remove('active');
    };
    
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    
    // Close on overlay click
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    // Start game button
    startBtn?.addEventListener('click', () => {
      if (!this.selImg) {
        toast('Please select a level first!', 'warning');
        closeModal();
        return;
      }
      if (Lives.get() <= 0) {
        toast('No lives left! Wait or buy one on your profile.', 'error');
        return;
      }
      
      // Store completion callback
      sessionStorage.setItem('pendingCompletion', JSON.stringify({
        world: this.world,
        levelId: this.selImg.id
      }));
      
      location.href = `game.html?cat=${this.world}&img=${this.selImg.id}&grid=${this.selGrid}`;
    });
  },

  updateModalInfo() {
    const infoEl = document.getElementById('modalInfo');
    if (infoEl) {
      infoEl.innerHTML = `<span>⚡ ${this.selGrid}×${this.selGrid} · ${CONFIG.GRID_MOVES[this.selGrid]} moves · ${CONFIG.GRID_POINTS[this.selGrid]} pts</span>`;
    }
  },

  showGridModal() {
    const modal = document.getElementById('gridModal');
    if (modal) {
      modal.classList.add('active');
    }
  },

  loadProgress() {
    const pr = Auth.current();
    const savedProgress = pr?.worldProgress?.[this.world] || { unlocked: 3, completed: [] };
    this.unlockedLevels = savedProgress.unlocked || 3;
    this.completedLevels = savedProgress.completed || [];
  },

  saveProgress() {
    const pr = Auth.current();
    if (pr) {
      const worldProgress = pr.worldProgress || {};
      worldProgress[this.world] = {
        unlocked: this.unlockedLevels,
        completed: this.completedLevels
      };
      Auth.update({ worldProgress });
    }
  },

  updatePointsDisplay() {
    const pr = Auth.current();
    const pointsEl = document.getElementById('playerPoints');
    if (pointsEl && pr) {
      pointsEl.textContent = pr.points || 0;
    }
  },

  buildRailway() {
    const images = IMAGES[this.world] || [];
    // Create 10 levels
    this.levels = [];
    for (let i = 0; i < 10; i++) {
      const img = images[i] || { id: i + 1, name: `Level ${i + 1}`, thumb: '' };
      this.levels.push({
        id: img.id,
        name: img.name,
        thumb: img.thumb,
        index: i,
        points: [10, 15, 25, 35, 50, 60, 70, 80, 90, 100][i] || 50
      });
    }

    // Split into top 5 and bottom 5
    const topLevels = this.levels.slice(0, 5);
    const bottomLevels = this.levels.slice(5, 10);

    const topContainer = document.getElementById('topStations');
    const bottomContainer = document.getElementById('bottomStations');

    if (topContainer) {
      topContainer.innerHTML = topLevels.map(level => this.createStationCard(level)).join('');
    }
    if (bottomContainer) {
      bottomContainer.innerHTML = bottomLevels.map(level => this.createStationCard(level)).join('');
    }

    this.addStationHandlers();
  },

  createStationCard(level) {
    const isUnlocked = level.index < this.unlockedLevels;
    const isCompleted = this.completedLevels.includes(level.id);
    const isActive = isUnlocked && !isCompleted;
    const isLocked = !isUnlocked;
    
    let lockHtml = '';
    if (isLocked) {
      lockHtml = '<div class="lock-icon">🔒</div>';
    } else if (isCompleted) {
      lockHtml = '<div class="completed-badge">✓</div>';
    }
    
    const thumbSrc = level.thumb || `https://placehold.co/85x85/0ea5e9/white?text=${level.name.charAt(0)}`;
    
    return `
      <div class="station-card ${isLocked ? 'locked' : ''} ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
           data-level-id="${level.id}" 
           data-level-index="${level.index}"
           data-level-name="${level.name}"
           data-level-points="${level.points}">
        <div class="station-image">
          <img src="${thumbSrc}" alt="${level.name}" class="station-img" onerror="this.src='https://placehold.co/85x85/0ea5e9/white?text=${level.name.charAt(0)}'">
          ${lockHtml}
        </div>
        <div class="station-info">
          <div class="station-name">${level.name}</div>

        </div>
      </div>
    `;
  },

  addStationHandlers() {
    const stations = document.querySelectorAll('.station-card');
    const self = this;
    
    stations.forEach(station => {
      station.addEventListener('click', function(e) {
        e.stopPropagation();
        const levelId = parseInt(this.dataset.levelId);
        const levelIndex = parseInt(this.dataset.levelIndex);
        const levelName = this.dataset.levelName;
        const levelPoints = parseInt(this.dataset.levelPoints);
        
        // Check if locked
        if (this.classList.contains('locked')) {
          const unlockCost = 100;
          const pr = Auth.current();
          if (pr && pr.points >= unlockCost) {
            self.showUnlockDialog(levelIndex, levelName, unlockCost);
          } else {
            toast(`Need ${unlockCost} points to unlock this level!`, 'warning');
          }
          return;
        }
        
        // Check if completed
        if (this.classList.contains('completed')) {
          toast('You already completed this level!', 'info');
          return;
        }
        
        // Remove selected class from all stations
        document.querySelectorAll('.station-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        
        self.selImg = { id: levelId, name: levelName, points: levelPoints };
        
        // Show the grid selection modal
        self.showGridModal();
      });
    });
  },

  showUnlockDialog(levelIndex, levelName, cost) {
    const self = this;
    Dialog.confirm(`Unlock "${levelName}" for ${cost} points?`, {
      title: 'Unlock Level',
      icon: '🔓',
      okLabel: 'Unlock',
      cancelLabel: 'Cancel'
    }).then(confirmed => {
      if (confirmed) {
        const pr = Auth.current();
        if (pr && pr.points >= cost) {
          Auth.update({ points: pr.points - cost });
          self.unlockedLevels = Math.max(self.unlockedLevels, levelIndex + 1);
          self.saveProgress();
          self.updatePointsDisplay();
          self.buildRailway();
          toast(`✨ "${levelName}" unlocked!`, 'success');
        } else {
          toast('Not enough points!', 'error');
        }
      }
    });
  },

  completeLevel(levelId) {
    if (!this.completedLevels.includes(levelId)) {
      this.completedLevels.push(levelId);
      const nextLevelIndex = this.completedLevels.length;
      if (nextLevelIndex < 10 && nextLevelIndex > this.unlockedLevels) {
        this.unlockedLevels = nextLevelIndex;
      }
      this.saveProgress();
      this.buildRailway();
    }
  }
};

// ─── PAGE: KNOWLEDGE LIBRARY ─────────────────────────────────
const Library = {
  cards: [], filtered: [],
  init() {
    if (!Auth.loggedIn()) { location.href = 'login.html'; return; }
    this.cards = Auth.current().cards ?? []; this.filtered = [...this.cards];
    this._renderStats();
    this._buildFilter();
    this._render();
    document.getElementById('lib-search')?.addEventListener('input',  () => this._applyFilter());
    document.getElementById('lib-filter')?.addEventListener('change', () => this._applyFilter());
  },
  _renderStats() {
    const el = document.getElementById('lib-stats'); if (!el) return;
    const catCount = new Set(this.cards.map(c => c.category)).size;
    el.innerHTML = `📖 <strong>${this.cards.length}</strong> cards collected &nbsp;·&nbsp; 🗂️ <strong>${catCount}</strong> categories`;
  },
  _buildFilter() {
    const sel = document.getElementById('lib-filter'); if (!sel) return;
    const cats = [...new Set(this.cards.map(c => c.category))];
    sel.innerHTML = '<option value="">All Categories</option>' + cats.map(c => {
      const cat = CATEGORIES.find(x => x.id === c);
      return `<option value="${c}">${cat?.icon} ${cat?.label ?? c}</option>`;
    }).join('');
  },
  _applyFilter() {
    const q = (document.getElementById('lib-search')?.value ?? '').toLowerCase();
    const f = document.getElementById('lib-filter')?.value ?? '';
    this.filtered = this.cards.filter(c => {
      const matchCat  = !f || c.category === f;
      const matchText = !q || c.name.toLowerCase().includes(q) || c.fact.toLowerCase().includes(q);
      return matchCat && matchText;
    });
    this._render();
  },
  _render() {
    const grid = document.getElementById('lib-grid'); if (!grid) return;
    if (!this.filtered.length) {
      grid.innerHTML = `<div class="lib-empty">${this.cards.length ? '🔍 No cards match your search.' : '🧩 No cards yet — complete puzzles to collect them!'}</div>`;
      return;
    }
    grid.innerHTML = this.filtered.map(c => {
      const cat = CATEGORIES.find(x => x.id === c.category);
      return `
        <div class="knowledge-card" style="--cc:${cat?.color ?? '#6366f1'}" tabindex="0" role="article" aria-label="${c.name} knowledge card">
          <div class="knowledge-card__inner">
            <div class="knowledge-card__front">
              <div class="knowledge-card__photo">
                <img src="assets/images/${c.category}/${(IMAGES[c.category] ?? []).find(i => i.name === c.name)?.id ?? 1}.png"
                     alt="${c.name}"
                     onerror="this.parentElement.innerHTML='<span style=font-size:3rem>${cat?.icon ?? '📖'}</span>'"/>
              </div>
              <div class="knowledge-card__polaroid">
                <div class="kp-name">${c.name}</div>
                <div class="kp-cat">${cat?.icon ?? ''} ${cat?.label ?? c.category}</div>
              </div>
            </div>
            <div class="knowledge-card__back">
              <div class="kc-head">${cat?.icon ?? '📖'} ${cat?.label ?? ''} Knowledge Card</div>
              <div class="kc-name">${c.name}</div>
              <p class="kc-fact">${c.fact}</p>
              <div class="kc-date">Collected ${c.date}</div>
            </div>
          </div>
        </div>`;
    }).join('');

    // Add flip-hint below each card
    document.querySelectorAll('.knowledge-card').forEach(card => {
      const hint = document.createElement('div');
      hint.className = 'kc-flip-hint';
      hint.textContent = 'Hover or tap to flip ↩';
      card.parentElement.insertBefore(hint, card.nextSibling);
    });

    // Keyboard accessibility
    document.querySelectorAll('.knowledge-card').forEach(card => {
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') card.classList.toggle('flipped'); });
    });
  },
};

// ─── PAGE: LEADERBOARD ───────────────────────────────────────
const Leaderboard = {
  init() {
    const sorted = Board.sorted(); const me = Store.get('pq_user');
    this._podium(sorted.slice(0, 3));
    this._table(sorted, me);
  },
  _podium(top) {
    const el = document.getElementById('lb-podium'); if (!el) return;
    const medals = ['🥇','🥈','🥉']; const order = [1, 0, 2];
    el.innerHTML = order.map(i => {
      const p = top[i];
      if (!p) return `<div class="podium-slot podium-slot--${i+1} podium-slot--empty"></div>`;
      return `<div class="podium-slot podium-slot--${i+1}"><div class="podium__medal">${medals[i]}</div><div class="podium__avatar">${p.avatar}</div><div class="podium__name">${p.name}</div><div class="podium__pts">${p.points} ⭐</div></div>`;
    }).join('');
  },
  _table(sorted, me) {
    const tbody = document.getElementById('lb-tbody'); if (!tbody) return;
    if (!sorted.length) { tbody.innerHTML = '<tr><td colspan="6" class="lb-empty">No players yet. Be the first!</td></tr>'; return; }
    tbody.innerHTML = sorted.map((p, i) => `
      <tr class="${p.name === me ? 'lb-me' : ''}">
        <td class="lb-rank">${i + 1}</td>
        <td>${p.avatar}</td>
        <td>${p.name}${p.name === me ? ' <span class="you-tag">YOU</span>' : ''}${p.guardian ? ` <span style="font-size:.75rem">${GUARDIANS[p.guardian]?.emoji ?? ''}</span>` : ''}</td>
        <td>${p.points} ⭐</td>
        <td>${p.puzzlesSolved ?? 0}</td>
        <td>${p.bestTime ? fmtTime(p.bestTime) : '—'}</td>
      </tr>`).join('');
  },
};

// ─── PAGE: PROFILE ───────────────────────────────────────────
const ProfilePage = {
  init() {
    if (!Auth.loggedIn()) { location.href = 'login.html'; return; }
    const pr = Auth.current(); const rank = Board.rank();
    this._header(pr, rank);
    this._stats(pr);
    this._lives();
    this._achievements(pr);
    this._others();
    this._bindActions();
    Lives.startWatch((v, s) => {
      Nav.refresh();
      const timer = document.getElementById('lives-timer'); const hearts = document.getElementById('lives-hearts');
      if (timer)  timer.textContent = v >= CONFIG.MAX_LIVES ? 'Lives full!' : `Next life in ${fmtTime(s)}`;
      if (hearts) hearts.innerHTML  = heartsHTML(v) + ` <span class="lives-count">${v}/${CONFIG.MAX_LIVES}</span>`;
    });
  },
  _header(pr, rank) {
    const el = document.getElementById('profile-header'); if (!el) return;
    const g = pr.guardian ? GUARDIANS[pr.guardian] : null;
    el.innerHTML = `
      <div class="profile-av">${pr.avatar}</div>
      <div class="profile-info">
        <h2>${pr.name}</h2>
        <p>Member since ${new Date(pr.joined).toLocaleDateString()}</p>
        <span class="profile-rank">🏅 Rank #${rank ?? '–'}</span>
        ${g ? `<span class="profile-guardian">${g.emoji} ${g.name}'s companion</span>` : ''}
      </div>`;
  },
  _stats(pr) {
    const el = document.getElementById('profile-stats'); if (!el) return;
    el.innerHTML = `
      <div class="stat-card"><b>⭐ ${pr.points}</b><span>Points</span></div>
      <div class="stat-card"><b>🧩 ${pr.puzzlesSolved ?? 0}</b><span>Solved</span></div>
      <div class="stat-card"><b>⏱️ ${fmtTime(pr.totalTime ?? 0)}</b><span>Play Time</span></div>
      <div class="stat-card"><b>📚 ${(pr.cards ?? []).length}</b><span>Cards</span></div>`;
  },
  _lives() {
    const v = Lives.get(); const s = Lives.secsUntilNext();
    const el = document.getElementById('profile-lives'); if (!el) return;
    el.innerHTML = `
      <div class="lives-row" id="lives-hearts">${heartsHTML(v)}<span class="lives-count">${v}/${CONFIG.MAX_LIVES}</span></div>
      <p class="lives-timer" id="lives-timer">${v >= CONFIG.MAX_LIVES ? 'Lives full!' : `Next life in ${fmtTime(s)}`}</p>
      <button class="btn btn--outline btn--sm" id="buy-life-btn">💳 Buy Life (${CONFIG.LIFE_COST} pts)</button>`;
    document.getElementById('buy-life-btn')?.addEventListener('click', () => {
      const res = Lives.buy(); toast(res.msg, res.ok ? 'success' : 'error');
      if (res.ok) { Sound.buy(); Nav.refresh(); }
    });
  },
  _achievements(pr) {
    const el = document.getElementById('profile-achievements'); if (!el) return;
    const unlocked = pr.achievements ?? [];
    el.innerHTML = ACHIEVEMENTS.map(a => `
      <div class="achievement ${unlocked.includes(a.id) ? 'achievement--on' : 'achievement--off'}" title="${a.desc}">
        <span>${unlocked.includes(a.id) ? a.icon : '🔒'}</span>
        <small>${a.label}</small>
      </div>`).join('');
  },
  _others() {
    const el = document.getElementById('profile-others'); if (!el) return;
    const me = Store.get('pq_user');
    const others = Object.values(Auth.all()).filter(p => p.name !== me);
    if (!others.length) { el.innerHTML = '<p class="text-muted">No other profiles on this device.</p>'; return; }
    el.innerHTML = others.map(p =>
      `<button class="switch-btn" data-name="${p.name}">${p.avatar} ${p.name} <span>(${p.points} pts)</span></button>`
    ).join('');
    el.querySelectorAll('.switch-btn').forEach(btn => {
      btn.addEventListener('click', () => { Auth.login(btn.dataset.name); location.reload(); });
    });
  },
  _bindActions() {
    document.getElementById('logout-btn')?.addEventListener('click', () => { Auth.logout(); location.href = 'index.html'; });
    document.getElementById('new-profile-btn')?.addEventListener('click', () => { location.href = 'login.html?new=1'; });

    const pr = Auth.current();
    const pointsSpan = document.getElementById('delete-points');
    if (pointsSpan && pr) pointsSpan.textContent = pr.points ?? 0;

    document.getElementById('delete-account-btn')?.addEventListener('click', () => {
      const modal = document.getElementById('delete-modal');
      if (modal) { modal.style.display = 'flex'; requestAnimationFrame(() => modal.classList.add('show')); }
    });
    document.getElementById('delete-cancel')?.addEventListener('click', () => {
      const modal = document.getElementById('delete-modal');
      if (modal) { modal.classList.remove('show'); setTimeout(() => { modal.style.display = 'none'; }, 300); }
    });
    document.getElementById('delete-confirm')?.addEventListener('click', () => {
      if (Auth.deleteAccount()) {
        document.getElementById('delete-modal')?.classList.remove('show');
        setTimeout(() => { toast('Account deleted. Sorry to see you go! 👋', 'info'); setTimeout(() => { location.href = 'index.html'; }, 1500); }, 300);
      }
    });
    document.getElementById('delete-modal')?.addEventListener('click', e => {
      if (e.target === document.getElementById('delete-modal')) document.getElementById('delete-cancel')?.click();
    });

    // Guardian re-select
    document.getElementById('change-guardian-btn')?.addEventListener('click', () => {
      Auth.update({ guardian: null });
      location.href = 'guardian.html';
    });
  },
};

// ============================================================
// BACKGROUND MUSIC CONTROLLER WITH GUARDIAN THEMES - FIXED
// ============================================================

const BackgroundMusic = {
  audio: null,
  isPlaying: true,
  currentGuardian: null,
  
  // Music paths for each guardian - CHANGE THESE TO YOUR ACTUAL AUDIO FILES
  musicPaths: {
    elara: 'assets/audio/elara-theme.mp3',
    kael: 'assets/audio/kael-theme.mp3',
    orion: 'assets/audio/orion-theme.mp3'
  },
  
  defaultMusicPath: 'assets/audio/background-music.mp3',
  
  init() {
    console.log('BackgroundMusic initializing...');
    
    // Load saved mute state
    const savedMuted = localStorage.getItem('pq_music_muted');
    if (savedMuted === 'true') {
      this.isPlaying = false;
    }
    
    // Get current guardian from Auth
    this.updateCurrentGuardian();
    
    // Start music with appropriate theme
    this.playAppropriateMusic();
    
    // Preload all guardian music
    this.preloadGuardianMusic();
  },
  
  updateCurrentGuardian() {
    // Try to get Auth from window.PQ or direct
    let authProfile = null;
    if (window.PQ && window.PQ.Auth) {
      authProfile = window.PQ.Auth.current();
    } else if (window.Auth) {
      authProfile = window.Auth.current();
    }
    
    this.currentGuardian = authProfile?.guardian || null;
    console.log('Current guardian detected:', this.currentGuardian);
  },
  
  getCurrentMusicPath() {
    if (this.currentGuardian && this.musicPaths[this.currentGuardian]) {
      console.log(`Playing ${this.currentGuardian} theme music`);
      return this.musicPaths[this.currentGuardian];
    }
    console.log('Playing default theme music');
    return this.defaultMusicPath;
  },
  
  preloadGuardianMusic() {
    Object.values(this.musicPaths).forEach(path => {
      const audio = new Audio(path);
      audio.load();
    });
  },
  
  async playAppropriateMusic() {
    const musicPath = this.getCurrentMusicPath();
    
    // Stop current audio if exists
    if (this.audio) {
      this.audio.pause();
    }
    
    // Create new audio with guardian theme
    this.audio = new Audio(musicPath);
    this.audio.loop = true;
    this.audio.volume = 0.25;
    
    if (this.isPlaying && localStorage.getItem('pq_music_muted') !== 'true') {
      try {
        await this.audio.play();
        console.log(`✅ Music playing: ${musicPath}`);
      } catch (err) {
        console.log('Autoplay blocked, waiting for interaction');
        this.playOnInteraction();
      }
    }
    
    this.updateMusicButton();
  },
  
  playOnInteraction() {
    const startMusic = () => {
      if (this.audio && this.audio.paused && this.isPlaying) {
        this.audio.play().catch(() => {});
      }
      document.removeEventListener('click', startMusic);
      document.removeEventListener('keydown', startMusic);
    };
    document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);
  },
  
  // This is the key method - called when guardian changes
  changeGuardianMusic(newGuardian) {
    console.log(`Changing music to guardian: ${newGuardian}`);
    this.currentGuardian = newGuardian;
    this.playAppropriateMusic();
  },
  
  async play() {
    if (!this.audio) {
      await this.playAppropriateMusic();
      return;
    }
    
    try {
      await this.audio.play();
      this.isPlaying = true;
      localStorage.setItem('pq_music_muted', 'false');
      this.updateMusicButton();
    } catch (err) {
      this.isPlaying = false;
      this.updateMusicButton();
    }
  },
  
  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      localStorage.setItem('pq_music_muted', 'true');
      this.updateMusicButton();
    }
  },
  
  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },
  
  updateMusicButton() {
    const toggleBtn = document.getElementById('music-toggle');
    if (!toggleBtn) return;
    
    const statusSpan = toggleBtn.querySelector('.music-status');
    const iconSpan = toggleBtn.querySelector('.music-icon');
    
    if (this.isPlaying && this.audio && !this.audio.paused) {
      toggleBtn.classList.add('playing');
      if (statusSpan) statusSpan.textContent = 'ON';
      if (iconSpan) iconSpan.textContent = '♪';
      toggleBtn.setAttribute('title', 'Mute music');
    } else {
      toggleBtn.classList.remove('playing');
      if (statusSpan) statusSpan.textContent = 'OFF';
      if (iconSpan) iconSpan.textContent = '♩';
      toggleBtn.setAttribute('title', 'Unmute music');
    }
  },
  
  setupButton() {
    const toggleBtn = document.getElementById('music-toggle');
    if (toggleBtn) {
      const newBtn = toggleBtn.cloneNode(true);
      toggleBtn.parentNode.replaceChild(newBtn, toggleBtn);
      
      newBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
      
      this.updateMusicButton();
    }
  }
};

window.BackgroundMusic = BackgroundMusic;

// Make BackgroundMusic available globally
window.BackgroundMusic = BackgroundMusic;


// ─── ROUTER ─────────────────────────────────────────────────
function boot() {
  document.body.dataset.theme = Store.get('pq_theme', 'light');
  Guardian.apply();
  Nav.build();
  Foot.build();
  Sound.init();
  
  // Initialize Background Music - ADD THIS LINE
  BackgroundMusic.init();

  const page = location.pathname.split('/').pop() || 'index.html';
  const routes = {
    'index.html':       () => Home.init(),
    '':                 () => Home.init(),
    'login.html':       () => LoginPage.init(),
    'welcome.html':     () => Welcome.init(),
    'guardian.html':    () => GuardianPage.init(),
    'worldmap.html':    () => WorldMap.init(),
    'submap.html':      () => SubMap.init(),
    'library.html':     () => Library.init(),
    'leaderboard.html': () => Leaderboard.init(),
    'profile.html':     () => ProfilePage.init(),
    'game.html':        () => {},
    'hub.html':         () => { location.href = Auth.loggedIn() ? 'worldmap.html' : 'login.html'; },
  };
  
  if (routes[page]) {
    routes[page]();
  }

  if (Auth.loggedIn() && page !== 'profile.html') {
    Lives.startWatch(() => Nav.refresh());
  }
}

// ─── EXPOSE ──────────────────────────────────────────────────
window.PQ = {
  Auth, Lives, Board, Sound, Store, Dialog, Guardian, toast, fmtTime, heartsHTML, Nav,
  CONFIG, CATEGORIES, IMAGES, FACTS, ACHIEVEMENTS, WORLDS, GUARDIANS,
};



document.addEventListener('DOMContentLoaded', boot);



// ============================================================
// WIDE RECTANGLE CAROUSEL - FULL WORKING CODE
// ============================================================

function initWideCarousel() {
  const prevBtn = document.getElementById('widePrev');
  const nextBtn = document.getElementById('wideNext');
  const slidesContainer = document.getElementById('wideCarouselSlides');
  const dots = document.querySelectorAll('.wide-dot');
  const slides = document.querySelectorAll('.wide-slide');
  const textContainer = document.getElementById('wideTextInfo');
  
  // Check if carousel exists on this page
  if (!prevBtn || !nextBtn || !slidesContainer || slides.length === 0) {
    return;
  }
  
  // World data with icon, name, and description
  const worldData = {
    animals: {
      icon: '🌲',
      name: 'Whispering Woods',
      description: 'Explore magical forests where creatures of all kinds roam freely. Each puzzle solved brings color back to this enchanted land.'
    },
    famous: {
      icon: '🏛️',
      name: 'History of Legends',
      description: 'Walk alongside the greatest minds and heroes who shaped history. Restore memories of legendary figures.'
    },
    cars: {
      icon: '⚙️',
      name: 'Wonder Wheels',
      description: 'Discover the engineering marvels that changed the way we move. Solve puzzles to bring these machines back to life.'
    },
    flowers: {
      icon: '🌸',
      name: 'Blooming Meadows',
      description: 'Wander through fields of vibrant colors and delicate fragrances. Each solved puzzle makes a flower bloom.'
    },
    wonders: {
      icon: '⏳',
      name: 'Echoes of Time',
      description: 'Journey across breathtaking natural wonders from around the world. Restore the beauty of these ancient places.'
    }
  };
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  function updateCarousel() {
    if (slides.length === 0) return;
    const slideWidth = slides[0].offsetWidth;
    slidesContainer.style.transform = 'translateX(-' + (currentIndex * slideWidth) + 'px)';
    
    // Update dots
    for (let i = 0; i < dots.length; i++) {
      if (i === currentIndex) {
        dots[i].classList.add('active');
      } else {
        dots[i].classList.remove('active');
      }
    }
    
    // Update text with icon, name, and description
    const currentSlide = slides[currentIndex];
    if (currentSlide && textContainer) {
      const world = currentSlide.getAttribute('data-world');
      const data = worldData[world];
      if (data) {
        textContainer.innerHTML = `
          <div>
            <span class="world-icon">${data.icon}</span>
            <span class="world-name">${data.name}</span>
          </div>
          <div class="world-description">${data.description}</div>
        `;
      }
    }
  }
  
  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalSlides - 1;
    }
    updateCarousel();
  }
  
  // Previous button click
  if (prevBtn) {
    prevBtn.onclick = function(e) {
      e.preventDefault();
      prevSlide();
      this.style.transform = 'scale(0.95)';
      setTimeout(function() { 
        if (prevBtn) prevBtn.style.transform = ''; 
      }, 150);
    };
  }
  
  // Next button click
  if (nextBtn) {
    nextBtn.onclick = function(e) {
      e.preventDefault();
      nextSlide();
      this.style.transform = 'scale(0.95)';
      setTimeout(function() { 
        if (nextBtn) nextBtn.style.transform = ''; 
      }, 150);
    };
  }
  
  // Dot clicks
  for (let i = 0; i < dots.length; i++) {
    dots[i].onclick = function() {
      currentIndex = i;
      updateCarousel();
    };
  }
  
  // Images are DISPLAY ONLY - NO click navigation
  // (No onclick handlers added to slides)
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      updateCarousel();
    }, 100);
  });
  
  // Initial update
  setTimeout(updateCarousel, 100);
}

// Initialize carousel when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWideCarousel);
} else {
  initWideCarousel();
}


