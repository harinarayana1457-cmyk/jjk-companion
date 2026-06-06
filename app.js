// JJK Companion - Core Application Logic

let activePage = 'home';
let backgroundParticles = [];
let domainAnimationId = null;
let currentDomainId = null;

// Quiz State
let currentQuizQuestion = 0;
let quizAnswers = {
  power: 0,
  shadow: 0,
  tactical: 0,
  chaos: 0,
  fortitude: 0
};

// Quiz Questions Data (8 Narrative Questions)
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "A terrifying Special Grade Curse suddenly spawns. It blocks your path and threatens civilians. Your initial reaction is...",
    choices: [
      { text: "Smile. Finally, a toy worthy of my absolute power.", values: { power: 5, fortitude: 4 } },
      { text: "Quickly scan the architecture, find escape/blindspots, and make a structured team-strike plan.", values: { tactical: 5, fortitude: 3 } },
      { text: "Summon shadows to shield civilians and stall the creature, prioritizing safety over direct assault.", values: { shadow: 5, fortitude: 4 } },
      { text: "Improvise wildly! Attack its mind first, morph my surroundings, and enjoy the chaotic combat.", values: { chaos: 5, fortitude: 2 } }
    ]
  },
  {
    id: 2,
    question: "When molding Cursed energy within your body, what source of human emotion do you draw upon?",
    choices: [
      { text: "Absolute self-glorification. The supreme pride of being superior.", values: { power: 5, chaos: 3 } },
      { text: "Cold, calculated regulation. Channelling frustrations into strict, measured metrics.", values: { tactical: 5, fortitude: 3 } },
      { text: "Deep, quiet protective insticts—channeling the fear of losing people I care about.", values: { shadow: 5, fortitude: 5 } },
      { text: "Unstable, raw human malice and playful amusement in destruction.", values: { chaos: 5, power: 2 } }
    ]
  },
  {
    id: 3,
    question: "You are given the chance to formulate a Binding Vow (a magical self-restriction that boosts power). What sacrifice do you offer?",
    choices: [
      { text: "Nothing. I will bend the rules to my absolute will without cheap sacrifices.", values: { power: 5 } },
      { text: "A strict time restriction—my power boosts dramatically only during designated windows.", values: { tactical: 5, fortitude: 4 } },
      { text: "A portion of my physical body, using shadows to supplement my blind spots.", values: { shadow: 5, fortitude: 3 } },
      { text: "My own mental stability. Let chaos amplify my output in erratic bursts.", values: { chaos: 5, power: 3 } }
    ]
  },
  {
    id: 4,
    question: "Which of these philosophies on 'the soul' resonates with you most?",
    choices: [
      { text: "The soul is an absolute force. The strong soul dominates and rewrites world order.", values: { power: 5, fortitude: 5 } },
      { text: "The soul is complex and must be managed dynamically, with precision balance.", values: { tactical: 4, shadow: 3 } },
      { text: "The soul is connected through shadows and bonds. When one falls, we carry their soul forward.", values: { shadow: 5, fortitude: 4 } },
      { text: "There is no sacred value to souls. The soul is merely a flexible shape that can be customized at will.", values: { chaos: 5 } }
    ]
  },
  {
    id: 5,
    question: "In the middle of a brutal duel, you land a lucky hit. How do you exploit the opening?",
    choices: [
      { text: "Unleash an overwhelming, continuous flood of cursed force in a massive, localized blast.", values: { power: 5, fortitude: 5 } },
      { text: "Strike mathematically! Pinpoint their structural weak spot and execute a critical 7:3 blow.", values: { tactical: 5, fortitude: 4 } },
      { text: "Meld into their blind shadow, summon multiple beasts from behind, and secure a triple-flank.", values: { shadow: 5, tactical: 3 } },
      { text: "Mutate my punch into an exploding projectile, laughing as they struggle to adapt.", values: { chaos: 5, power: 2 } }
    ]
  },
  {
    id: 6,
    question: "If you could choose your primary training weapon or cursed tool, it would be...",
    choices: [
      { text: "My bare hands. My body is the ultimate weapon.", values: { power: 5, fortitude: 5 } },
      { text: "A clean, cloth-wrapped blunt cleaver that helps focus analytical parameters.", values: { tactical: 5, fortitude: 3 } },
      { text: "An elegant, cursed blade that draws dark shadow spirits to its metal core.", values: { shadow: 5, fortitude: 4 } },
      { text: "An unpredictable, morphing tool that splits or transforms on contact.", values: { chaos: 5, power: 2 } }
    ]
  },
  {
    id: 7,
    question: "You have been cornered by three high-grade sorcerers who brand you an outlaw. Your move?",
    choices: [
      { text: "Step forward, activate Domain Expansion, and tell them: 'You stand in the presence of a god.'", values: { power: 5, fortitude: 5 } },
      { text: "Use Boogie Woogie swaps to trick them into hitting each other while plotting a dynamic escape path.", values: { tactical: 5, chaos: 3 } },
      { text: "Fall back into the shadow domain, summoning a phantom shield to blend seamlessly with darkness.", values: { shadow: 5, fortitude: 4 } },
      { text: "Erupt in absolute manic laughter and reshape their physical souls into warped defensive shield servants.", values: { chaos: 5, power: 3 } }
    ]
  },
  {
    id: 8,
    question: "When your journey ends, what legacy do you want to leave behind?",
    choices: [
      { text: "To be remembered as the legendary pinnacle—the strongest there ever was.", values: { power: 5 } },
      { text: "To have lived a logical, duty-fulfilled life with zero regrets and perfect order.", values: { tactical: 5, fortitude: 4 } },
      { text: "To have successfully saved my companions, leaving a bright future for those who follow.", values: { shadow: 5, fortitude: 5 } },
      { text: "To have turned the boring rules of this Jujutsu world completely upside down.", values: { chaos: 5, power: 3 } }
    ]
  }
];

// Document Ready Handler
window.addEventListener('DOMContentLoaded', () => {
  initBackgroundParticles();
  setupNavigation();
  renderDossierCards();
  setupDossierFilters();
  setupEvaluatorQuiz();
  setupArenaView();
});

// --- SECTION 1: GLOBAL ATMOSPHERIC BACKGROUND SYSTEM ---
function initBackgroundParticles() {
  const canvas = document.getElementById('cursed-particles-main');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Initialize atmospheric particles
  const particleCount = 45;
  for (let i = 0; i < particleCount; i++) {
    backgroundParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 5 + 1.5,
      speedY: -(Math.random() * 0.7 + 0.2), // Rising up
      speedX: (Math.random() * 0.6 - 0.3),
      alpha: Math.random() * 0.5 + 0.1,
      angle: Math.random() * Math.PI,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? 'rgba(0, 210, 255,' : 'rgba(171, 71, 188,' // Blue vs Purple/Violet Cursed energy
    });
  }

  function animateMainParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    backgroundParticles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.angle += p.pulseSpeed;
      
      // Infinite bounding loops
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10 || p.x > canvas.width + 10) {
        p.x = Math.random() * canvas.width;
      }

      const pulseAlpha = p.alpha + Math.sin(p.angle) * 0.1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${Math.max(0.05, Math.min(0.7, pulseAlpha))})`;
      ctx.shadowBlur = p.radius * 2;
      ctx.shadowColor = p.color.includes('0, 210') ? 'rgba(0, 210, 255, 0.4)' : 'rgba(171, 71, 188, 0.4)';
      ctx.fill();
    });
    
    ctx.shadowBlur = 0; // Reset shadow
    requestAnimationFrame(animateMainParticles);
  }
  
  animateMainParticles();
}

// --- SECTION 2: PAGE NAVIGATION ROUTER ---
function setupNavigation() {
  const navTabs = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.view-page');

  navTabs.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('data-target');
      showPage(targetPage);
    });
  });

  // Home CTA Buttons
  document.getElementById('cta-dossier').addEventListener('click', () => showPage('dossier'));
  document.getElementById('cta-evaluator').addEventListener('click', () => showPage('evaluator'));
  document.getElementById('cta-arena').addEventListener('click', () => showPage('arena'));
}

function showPage(pageId) {
  activePage = pageId;
  
  // Update Navigation Active styles
  const navTabs = document.querySelectorAll('.nav-link');
  navTabs.forEach(link => {
    if (link.getAttribute('data-target') === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Switch display views
  const pages = document.querySelectorAll('.view-page');
  pages.forEach(page => {
    if (page.id === `${pageId}-page`) {
      page.classList.remove('hidden');
      page.classList.add('fade-in');
    } else {
      page.classList.add('hidden');
    }
  });

  // Trigger animations or updates depending on the page
  if (pageId === 'dossier') {
    renderDossierCards(); // Refresh layout
  }
}

// --- SECTION 3: JUJUTSU HIGH DOSSIER (DATABASE) ---
function renderDossierCards() {
  const container = document.getElementById('dossier-grid');
  if (!container) return;

  const searchQuery = document.getElementById('dossier-search').value.toLowerCase();
  const affiliationFilter = document.getElementById('filter-affiliation').value;
  const gradeFilter = document.getElementById('filter-grade').value;

  // Filter dataset
  const filtered = JJK_CHARACTERS.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchQuery) || 
                          char.japaneseName.includes(searchQuery) ||
                          char.role.toLowerCase().includes(searchQuery);
    const matchesAffiliation = affiliationFilter === 'all' || char.affiliation === affiliationFilter;
    const matchesGrade = gradeFilter === 'all' || char.grade === gradeFilter;

    return matchesSearch && matchesAffiliation && matchesGrade;
  });

  // Clear older nodes
  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-gray-500">
        <p class="text-xl font-bold mb-2">No Sorcerer Records Found</p>
        <p class="text-sm">Adjust your filters or trace another cursed anomaly.</p>
      </div>
    `;
    return;
  }

  // Draw filtered results
  filtered.forEach(char => {
    const isSpecialGrade = char.grade === "Special Grade";
    const borderGlowClass = isSpecialGrade ? 'glow-red' : 'glow-blue';
    const tagColorClass = isSpecialGrade ? 'bg-red-950/50 text-red-400 border border-red-800' : 'bg-cyan-950/50 text-cyan-400 border border-cyan-800';

    const cardHTML = `
      <div class="glass-card rounded-2xl overflow-hidden p-6 relative cursor-pointer group flex flex-col justify-between ${borderGlowClass}" onclick="openDossierDetail('${char.id}')">
        <!-- Badge -->
        <div class="flex justify-between items-center mb-4">
          <span class="text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold ${tagColorClass}">
            ${char.grade}
          </span>
          <span class="text-lg group-hover:scale-125 transition-transform duration-300">${char.icon}</span>
        </div>

        <!-- Name & Kanji -->
        <div class="mb-4">
          <div class="flex items-baseline justify-between">
            <h3 class="text-2xl font-bold text-white tracking-wide">${char.name}</h3>
            <span class="text-xs text-gray-600 font-bold ml-2">${char.japaneseName}</span>
          </div>
          <p class="text-xs text-gray-400 font-medium">${char.role} &bull; ${char.affiliation}</p>
        </div>

        <!-- Short Bio Summary -->
        <p class="text-sm text-gray-400 font-light line-clamp-3 mb-6 flex-grow leading-relaxed">${char.description}</p>

        <!-- Combat Stats Preview -->
        <div class="border-t border-white/5 pt-4">
          <div class="flex justify-between text-xs text-gray-500 mb-2">
            <span>Innate Technique:</span>
            <span class="font-semibold text-gray-300 max-w-[150px] truncate text-right">${char.techniques[0].name}</span>
          </div>
          <div class="flex justify-between text-xs text-gray-500">
            <span>Energy Rating:</span>
            <span class="font-bold text-cyan-400 tracking-wide">${char.cursedEnergyRating}</span>
          </div>
        </div>

        <!-- Hover Action Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span class="text-xs bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full tracking-widest text-cyan-400 uppercase font-semibold">Examine Dossier</span>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

function setupDossierFilters() {
  document.getElementById('dossier-search').addEventListener('keyup', renderDossierCards);
  document.getElementById('filter-affiliation').addEventListener('change', renderDossierCards);
  document.getElementById('filter-grade').addEventListener('change', renderDossierCards);
}

// Side Detail Panel Modal Action
function openDossierDetail(charId) {
  const char = JJK_CHARACTERS.find(c => c.id === charId);
  if (!char) return;

  const panel = document.getElementById('dossier-detail-panel');
  if (!panel) return;

  // Build Techniques Checklist HTML
  let techniquesHTML = '';
  char.techniques.forEach(t => {
    techniquesHTML += `
      <div class="p-3.5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
        <h5 class="text-sm font-bold text-cyan-300 mb-1 flex items-center">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2"></span>
          ${t.name}
        </h5>
        <p class="text-xs text-gray-400 font-light leading-relaxed">${t.description}</p>
      </div>
    `;
  });

  // Assign panel fields
  document.getElementById('detail-name').innerText = char.name;
  document.getElementById('detail-japanese').innerText = char.japaneseName;
  document.getElementById('detail-role').innerText = char.role;
  document.getElementById('detail-affiliation').innerText = char.affiliation;
  document.getElementById('detail-grade').innerText = char.grade;
  document.getElementById('detail-energy-level').innerText = char.cursedEnergyRating;
  document.getElementById('detail-bio').innerText = char.description;
  document.getElementById('detail-quote-text').innerText = `"${char.quote}"`;

  // Draw Domain Expandable Card
  document.getElementById('detail-domain-name').innerText = char.domain.name;
  document.getElementById('detail-domain-desc').innerText = char.domain.description;
  
  // Set unleash shortcut
  const unleashBtn = document.getElementById('detail-unleash-domain');
  unleashBtn.onclick = () => {
    closeDossierDetail();
    unleashDomain(char.id);
  };

  // Set color styling
  document.getElementById('detail-header-tag').style.borderColor = char.themeColor;
  unleashBtn.style.color = char.themeColor;
  unleashBtn.style.borderColor = char.themeColor;

  // Render HTML structures inside
  document.getElementById('detail-techniques-wrapper').innerHTML = techniquesHTML;

  // Render Stats Bars (Smooth fills with delay)
  const statsContainer = document.getElementById('detail-stats-wrapper');
  statsContainer.innerHTML = '';
  
  const statsKeys = [
    { label: "Physical Strength & Durability", key: "strength" },
    { label: "Reflexes & Agility Speed", key: "speed" },
    { label: "Cursed Energy Control", key: "energyControl" },
    { label: "Tactical Acumen & Combat IQ", key: "tactics" }
  ];

  statsKeys.forEach(item => {
    const val = char.combatStats[item.key];
    const statItemHTML = `
      <div class="mb-3.5">
        <div class="flex justify-between text-xs mb-1">
          <span class="text-gray-400 font-medium">${item.label}</span>
          <span class="text-white font-bold">${val}%</span>
        </div>
        <div class="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
          <div class="h-full rounded-full stat-bar-fill" style="width: 0%; background: ${char.themeColor};" data-percent="${val}"></div>
        </div>
      </div>
    `;
    statsContainer.innerHTML += statItemHTML;
  });

  // Open modal structure panel
  panel.classList.remove('hidden');
  panel.classList.add('flex');

  // Trigger stat bar width updates after rendering is done
  setTimeout(() => {
    const bars = panel.querySelectorAll('.stat-bar-fill');
    bars.forEach(b => {
      const p = b.getAttribute('data-percent');
      b.style.width = `${p}%`;
    });
  }, 100);
}

function closeDossierDetail() {
  const panel = document.getElementById('dossier-detail-panel');
  if (panel) {
    panel.classList.add('hidden');
    panel.classList.remove('flex');
  }
}

// Ensure close-dossier action triggers correctly
window.closeDossierDetail = closeDossierDetail;
window.openDossierDetail = openDossierDetail;

// --- SECTION 4: CURSED ENERGY & TECHNIQUE EVALUATOR (QUIZ) ---
function setupEvaluatorQuiz() {
  document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
  document.getElementById('reset-quiz-btn').addEventListener('click', resetQuiz);
  document.getElementById('print-id-btn').addEventListener('click', () => {
    window.print();
  });
}

function startQuiz() {
  currentQuizQuestion = 0;
  quizAnswers = { power: 0, shadow: 0, tactical: 0, chaos: 0, fortitude: 0 };
  
  document.getElementById('quiz-intro').classList.add('hidden');
  document.getElementById('quiz-scoring-screen').classList.add('hidden');
  document.getElementById('quiz-interactive-screen').classList.remove('hidden');

  showQuizQuestion();
}

function showQuizQuestion() {
  const qData = QUIZ_QUESTIONS[currentQuizQuestion];
  const screen = document.getElementById('quiz-interactive-screen');
  
  // Progress Bar
  const progressPercent = ((currentQuizQuestion) / QUIZ_QUESTIONS.length) * 100;
  screen.querySelector('.quiz-progress-bar').style.width = `${progressPercent}%`;
  screen.querySelector('.quiz-step-count').innerText = `Question ${currentQuizQuestion + 1} of ${QUIZ_QUESTIONS.length}`;
  
  // Question Title
  screen.querySelector('.quiz-question-title').innerText = qData.question;

  // Options Wrapper
  const optionsWrapper = screen.querySelector('.quiz-choices-wrapper');
  optionsWrapper.innerHTML = '';

  qData.choices.forEach((choice, idx) => {
    const choiceBtn = document.createElement('button');
    choiceBtn.className = "w-full text-left p-4 rounded-xl bg-white/5 border border-white/5 font-light hover:border-cyan-400/50 hover:bg-cyan-950/20 text-gray-300 hover:text-white transition-all text-sm leading-relaxed duration-200 focus:outline-none flex gap-4 items-center";
    
    // Circle Indicator
    choiceBtn.innerHTML = `
      <span class="flex-shrink-0 w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-xs text-gray-500 font-bold group-hover:border-cyan-400">
        ${String.fromCharCode(65 + idx)}
      </span>
      <span>${choice.text}</span>
    `;

    choiceBtn.addEventListener('click', () => {
      recordQuizAnswer(choice.values);
    });
    optionsWrapper.appendChild(choiceBtn);
  });
}

function recordQuizAnswer(values) {
  // Aggregate score indices
  for (let key in values) {
    if (quizAnswers[key] !== undefined) {
      quizAnswers[key] += values[key];
    }
  }

  currentQuizQuestion++;
  
  if (currentQuizQuestion < QUIZ_QUESTIONS.length) {
    showQuizQuestion();
  } else {
    evaluateQuizResult();
  }
}

function evaluateQuizResult() {
  document.getElementById('quiz-interactive-screen').classList.add('hidden');
  const scoringScreen = document.getElementById('quiz-scoring-screen');
  scoringScreen.classList.remove('hidden');

  // Find max category mapping
  const cats = ['power', 'shadow', 'tactical', 'chaos'];
  let topCategory = 'tactical';
  let highestVal = -1;

  cats.forEach(c => {
    if (quizAnswers[c] > highestVal) {
      highestVal = quizAnswers[c];
      topCategory = c;
    }
  });

  // Calculate Sorcerer parameters
  // Grade: based on overall score indices of fortitude & traits
  const totalScore = quizAnswers.power + quizAnswers.shadow + quizAnswers.tactical + quizAnswers.chaos + quizAnswers.fortitude;
  
  let grade = "Grade 4";
  let ceReserve = 1200;
  let techniqueName = "";
  let techniqueDesc = "";

  if (totalScore >= 34) {
    grade = "Special Grade";
    ceReserve = Math.floor(Math.random() * 500000) + 150000;
  } else if (totalScore >= 25) {
    grade = "Grade 1";
    ceReserve = Math.floor(Math.random() * 80000) + 20000;
  } else if (totalScore >= 18) {
    grade = "Grade 2";
    ceReserve = Math.floor(Math.random() * 15000) + 5000;
  } else if (totalScore >= 10) {
    grade = "Grade 3";
    ceReserve = Math.floor(Math.random() * 4000) + 1500;
  } else {
    grade = "Grade 4";
    ceReserve = Math.floor(Math.random() * 600) + 200;
  }

  // Inject user name
  let nameValue = document.getElementById('sorcerer-id-input').value.trim();
  if (!nameValue) nameValue = "Candidate Classified";

  // Assign Unique Technique based on Top categories
  if (topCategory === 'power') {
    if (quizAnswers.fortitude > 22) {
      techniqueName = "Limitless & Six Eyes";
      techniqueDesc = "Enables total manipulation of space at the atomic scale, granting gravity shields and space convergence techniques.";
    } else {
      techniqueName = "Cleave & Dismantle";
      techniqueDesc = "An aggressive kinetic cutting technique capable of launching dynamic flying sharp visual blades.";
    }
  } else if (topCategory === 'shadow') {
    techniqueName = "Ten Shadows Technique";
    techniqueDesc = "Summons ten forms of pre-consecrated spectral Shikigami from within the pools of liquid shadows.";
  } else if (topCategory === 'tactical') {
    if (quizAnswers.fortitude > 15) {
      techniqueName = "Ratio Technique (7:3)";
      techniqueDesc = "Forcibly imposes a critical weak spot onto target bodies at the 70% fraction location.";
    } else {
      techniqueName = "Boogie Woogie";
      techniqueDesc = "Instant swap manipulation, exchanging the atomic positions of two objects infused with Cursed energy.";
    }
  } else if (topCategory === 'chaos') {
    techniqueName = "Idle Transfiguration";
    techniqueDesc = "Manipulates and transforms the cellular structures of physical objects by tapping direct contacts onto their souls.";
  }

  // Populate Student Card UI node
  document.getElementById('card-user-name').innerText = nameValue.toUpperCase();
  document.getElementById('card-assigned-grade').innerText = grade;
  document.getElementById('card-assigned-technique').innerText = techniqueName;
  document.getElementById('card-ce-level').innerText = ceReserve.toLocaleString() + " CE Units";
  document.getElementById('card-classification-summary').innerText = techniqueDesc;

  // Add random registration timestamp
  const regId = "TJHG-" + Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  document.getElementById('card-id-number').innerText = regId;
}

function resetQuiz() {
  document.getElementById('quiz-scoring-screen').classList.add('hidden');
  document.getElementById('quiz-intro').classList.remove('hidden');
  document.getElementById('sorcerer-id-input').value = "";
}

// --- SECTION 5: DOMAIN EXPANSION SIMULATOR (ARENA) ---
function setupArenaView() {
  const container = document.getElementById('arena-catalog-wrapper');
  if (!container) return;

  container.innerHTML = '';

  // Draw Domain Selectors
  JJK_CHARACTERS.forEach(char => {
    // Generate card block for domains
    const domainCard = `
      <div class="glass-card hover:border-red-500/40 p-6 rounded-2xl flex flex-col justify-between" style="border-left: 3px solid ${char.themeColor}">
        <div>
          <span class="text-xs text-gray-500 font-bold tracking-wide uppercase">${char.name}'s Secret Art</span>
          <h4 class="text-xl font-bold text-white mt-1 mb-2">${char.domain.name}</h4>
          <p class="text-xs text-gray-300 font-light leading-relaxed mb-6">${char.domain.description}</p>
        </div>
        <button class="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider btn-glass" 
          style="border-color: ${char.themeColor}50; color: ${char.themeColor}"
          onclick="unleashDomain('${char.id}')">
          Unleash Domain
        </button>
      </div>
    `;
    container.innerHTML += domainCard;
  });

  // Setup dismiss button
  document.getElementById('dismiss-domain-btn').addEventListener('click', collapseDomain);
}

function unleashDomain(charId) {
  const char = JJK_CHARACTERS.find(c => c.id === charId);
  if (!char) return;

  currentDomainId = char.domain.id;
  const overlay = document.getElementById('domain-arena-overlay');
  
  // Set details inside core modal
  document.getElementById('active-domain-title').innerText = char.domain.name;
  document.getElementById('active-domain-quote').innerText = `"${char.domain.quote}"`;
  document.getElementById('active-domain-caster').innerText = `CASTER: ${char.name.toUpperCase()} / AFFILIATION: ${char.affiliation.toUpperCase()}`;

  // Trigger CAMERA SHAKE effect on body wrapper
  const container = document.getElementById('app-main-container');
  container.classList.add('shake-viewport');
  
  // Flash standard glowing canvas Handsigns silhouette triggers
  const flash = document.getElementById('handsign-flash');
  flash.innerText = char.icon; // Using large character symbols as center icon indicator
  flash.classList.remove('hidden');

  setTimeout(() => {
    container.classList.remove('shake-viewport');
    flash.classList.add('hidden');
    
    // Smoothly activate main simulation overlay after screen shakes
    overlay.classList.add('active');
    
    // Launch Custom Web Canvas
    startDomainSimulation(currentDomainId);
  }, 2200);
}

function startDomainSimulation(domainId) {
  const canvas = document.getElementById('domain-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let frame = 0;
  const sceneParticles = [];

  // Initialize particles based on selected Domain style
  if (domainId === 'infinite_void') {
    // SATORU GOJO: Cosmic background, expanding deep-stars, complex equations
    for (let i = 0; i < 150; i++) {
      sceneParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width, // Depth property
        radius: Math.random() * 2 + 0.5,
        color: `hsla(${Math.random() * 60 + 190}, 100%, 75%, ${Math.random() * 0.4 + 0.5})`, // Neon Blues/Purples
        speed: Math.random() * 4 + 1
      });
    }
  } else if (domainId === 'malevolent_shrine') {
    // SUKUNA: Deep dark pool grids, kinetic slice patterns, volcanic fires
    for (let i = 0; i < 40; i++) {
      sceneParticles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        radius: Math.random() * 4 + 1,
        speedY: -(Math.random() * 2.5 + 0.5),
        speedX: Math.random() * 1.5 - 0.75,
        alpha: Math.random() * 0.8 + 0.2
      });
    }
  } else if (domainId === 'chimera_garden') {
    // MEGUMI: Pools of swirling shadows, ink bubbles rising, glowing green silhouettes
    for (let i = 0; i < 60; i++) {
      sceneParticles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        radius: Math.random() * 15 + 5,
        speedY: -(Math.random() * 1.5 + 0.4),
        wobble: Math.random() * 0.05,
        phase: Math.random() * Math.PI,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  } else if (domainId === 'self_embodiment') {
    // MAHITO: Strands of woven energy lines, glowing DNA-like double helices matching human spirit links
    for (let i = 0; i < 20; i++) {
      sceneParticles.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        speed: Math.random() * 0.005 + 0.002,
        progress: Math.random(),
        color: `rgba(${Math.random() > 0.5 ? '0, 230, 118' : '0, 229, 255'}, ${Math.random() * 0.5 + 0.2})`
      });
    }
  } else {
    // MULTIPURPOSE / JOGO: Fire sparks bursting upwards
    for (let i = 0; i < 80; i++) {
      sceneParticles.push({
        x: canvas.width / 2 + (Math.random() * 200 - 100),
        y: canvas.height - 20,
        radius: Math.random() * 3 + 1,
        speedY: -(Math.random() * 4 + 1.5),
        speedX: Math.random() * 4 - 2,
        life: Math.random() * 80 + 40,
        maxLife: Math.random() * 80 + 40
      });
    }
  }

  // CORE RENDER LOOP
  function playDomainSimulation() {
    frame++;

    if (domainId === 'infinite_void') {
      // 🔮 GOJO INFINITE VOID EFFECT
      ctx.fillStyle = 'rgba(2, 2, 8, 0.4)'; // Fades frame shadows to give motion blur
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Rotating nebula cores in background center
      const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 20, canvas.width/2, canvas.height/2, canvas.height * 0.7);
      grad.addColorStop(0, 'rgba(10, 5, 25, 0.35)');
      grad.addColorStop(0.5, 'rgba(0, 210, 255, 0.03)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw cosmic expanding stars
      sceneParticles.forEach(p => {
        p.z -= p.speed;
        if (p.z <= 0) {
          p.z = canvas.width;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }

        // Project coordinate math onto center view
        const px = (p.x - canvas.width / 2) * (canvas.width / p.z) + canvas.width / 2;
        const py = (p.y - canvas.height / 2) * (canvas.width / p.z) + canvas.height / 2;
        const radius = p.radius * (canvas.width / p.z);

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      });

      // Float random binary matrix equations across the void
      if (frame % 12 === 0) {
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = 'rgba(0, 210, 255, 0.15)';
        ctx.fillText(`lim(x->∞) = 1/0`, Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.fillText(`∞ + (-∞) = UNDF`, Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.fillText(`Cursed_Energy_Output: i^-1`, Math.random() * canvas.width, Math.random() * canvas.height);
      }

    } else if (domainId === 'malevolent_shrine') {
      // 🩸 SUKUNA MALEVOLENT SHRINE EFFECT
      ctx.fillStyle = 'rgba(13, 1, 1, 0.2)'; // Intense dark crimson fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Crimson neon grid lines representing grounds
      ctx.strokeStyle = 'rgba(255, 23, 68, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw random slashes crossed lines
      if (Math.random() < 0.2) {
        ctx.strokeStyle = Math.random() > 0.4 ? 'rgba(255, 23, 68, 0.6)' : 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = Math.random() * 4 + 1;
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const length = Math.random() * 400 + 150;
        const angle = Math.random() * Math.PI * 2;
        
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
        ctx.stroke();
        
        // Minor screen flash during massive dynamic slashes
        ctx.fillStyle = 'rgba(255, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Volcanic dark fire bubbles rising upwards
      sceneParticles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 23, 68, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 23, 68, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

    } else if (domainId === 'chimera_garden') {
      // 🌘 MEGUMI CHIMERA SHADOW GARDEN EFFECT
      ctx.fillStyle = 'rgba(4, 5, 12, 0.25)'; // shadow obsidian
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Swirling pooling shadows from bottom
      sceneParticles.forEach(p => {
        p.y += p.speedY;
        p.phase += p.wobble;
        p.x += Math.sin(p.phase) * 0.8;

        if (p.y < -30) {
          p.y = canvas.height + 30;
          p.x = Math.random() * canvas.width;
        }

        // Draw shadow ink blobs
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Liquid dark gradient
        const shadowGrad = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, p.radius);
        shadowGrad.addColorStop(0, 'rgba(15, 18, 27, 0.85)');
        shadowGrad.addColorStop(0.8, 'rgba(5, 5, 8, 0.95)');
        shadowGrad.addColorStop(1, 'rgba(61, 90, 254, 0.15)'); // glowing dark blue edge
        ctx.fillStyle = shadowGrad;
        ctx.fill();
      });

      // Spawn glowing divine beast eyes randomly flashing in shadows
      if (Math.random() < 0.02) {
        const eyeX = Math.random() * canvas.width;
        const eyeY = Math.random() * canvas.height;
        ctx.fillStyle = '#00e676'; // Neon green eyes
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00e676';
        
        // Draw left eye
        ctx.beginPath();
        ctx.ellipse(eyeX - 10, eyeY, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        // Draw right eye
        ctx.beginPath();
        ctx.ellipse(eyeX + 10, eyeY, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }

    } else if (domainId === 'self_embodiment') {
      // 🕸️ MAHITO SELF EMBODIMENT OF PERFECTION EFFECT
      ctx.fillStyle = 'rgba(4, 8, 12, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Woven strings of souls (connecting lines pulsing)
      sceneParticles.forEach(p => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.x1 = Math.random() * canvas.width;
          p.y1 = Math.random() * canvas.height;
          p.x2 = Math.random() * canvas.width;
          p.y2 = Math.random() * canvas.height;
        }

        // Draw structural thread link
        ctx.beginPath();
        ctx.moveTo(p.x1, p.y1);
        ctx.lineTo(p.x2, p.y2);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Draw glowing light node pulsing along the line
        const nodeX = p.x1 + (p.x2 - p.x1) * p.progress;
        const nodeY = p.y1 + (p.y2 - p.y1) * p.progress;

        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00e676';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00e676';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw hand silhouettes in background
      if (frame % 80 === 0) {
        ctx.font = '120px text';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
        ctx.save();
        ctx.translate(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.rotate(Math.random() * Math.PI);
        ctx.fillText("🖐️", 0, 0);
        ctx.restore();
      }

    } else {
      // 🔥🌋 GENERAL / JOGO DESTRUCTIVE MAGMA EFFECT
      ctx.fillStyle = 'rgba(10, 4, 2, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw volcanic glowing core at screen center/bottom
      const lavaGrad = ctx.createRadialGradient(canvas.width/2, canvas.height, 10, canvas.width/2, canvas.height, canvas.width * 0.4);
      lavaGrad.addColorStop(0, 'rgba(255, 87, 34, 0.45)');
      lavaGrad.addColorStop(0.5, 'rgba(255, 143, 0, 0.1)');
      lavaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = lavaGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fire sparks bursting upward
      sceneParticles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.life--;

        if (p.life <= 0) {
          p.x = canvas.width / 2 + (Math.random() * 200 - 100);
          p.y = canvas.height - 20;
          p.speedY = -(Math.random() * 4 + 1.5);
          p.speedX = Math.random() * 4 - 2;
          p.life = Math.random() * 80 + 40;
        }

        const sparkAlpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 112, 67, ${sparkAlpha})`;
        ctx.shadowBlur = p.radius * 2.5;
        ctx.shadowColor = 'rgba(255, 112, 67, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    domainAnimationId = requestAnimationFrame(playDomainSimulation);
  }

  // Engage render loop
  playDomainSimulation();
}

function collapseDomain() {
  const overlay = document.getElementById('domain-arena-overlay');
  if (!overlay) return;

  // Stop Canvas loops
  if (domainAnimationId) {
    cancelAnimationFrame(domainAnimationId);
    domainAnimationId = null;
  }

  // Smooth fade-out viewports
  overlay.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
  overlay.classList.remove('active');

  // Trigger Glass Break visual glitches if helpful
  setTimeout(() => {
    overlay.style.transition = ""; // Restore defaults
    currentDomainId = null;
  }, 750);
}

// Global hook shortcut
window.unleashDomain = unleashDomain;
window.collapseDomain = collapseDomain;
