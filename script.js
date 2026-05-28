/* ============================================================
   FUR & LEARN — Script v2.0
   Features: Theme, Nav, Lightbox, Particles, Scroll Reveal,
             FAQ, Quiz, Comparison, Age Calculator, Tabs, Toast
   ============================================================ */

// ── Theme ─────────────────────────────────────────────────────
const THEME_KEY = 'fl-theme';
let currentTheme = localStorage.getItem(THEME_KEY) || 'dark';

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : '');
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = t === 'light' ? '🌙' : '☀️';
  localStorage.setItem(THEME_KEY, t);
  currentTheme = t;
}

function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

// ── Navigation ────────────────────────────────────────────────
function toggleNav() {
  const menu = document.querySelector('.nav-menu');
  if (menu) menu.classList.toggle('open');
}

function setActiveNav() {
  const links = document.querySelectorAll('.nav-menu a');
  const path  = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === path);
  });
}

// Close nav on outside click
document.addEventListener('click', e => {
  const nav  = document.querySelector('.nav-menu');
  const btn  = document.querySelector('.mobile-toggle');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && e.target !== btn) {
    nav.classList.remove('open');
  }
});

// ── Scroll behaviours ─────────────────────────────────────────
function handleScroll() {
  // Navbar shadow
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.4)' : '';

  // Back-to-top
  const btn = document.querySelector('.back-top');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);

  // Scroll reveal
  document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) el.classList.add('revealed');
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Particles ─────────────────────────────────────────────────
function createParticles() {
  const bg = document.querySelector('.particles-bg');
  if (!bg) return;
  const count = window.innerWidth < 768 ? 10 : 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 4 + Math.random() * 5;
    p.style.cssText = `
      left:${Math.random()*100}%;
      width:${size}px; height:${size}px;
      animation-duration:${8+Math.random()*14}s;
      animation-delay:${-Math.random()*14}s;
    `;
    bg.appendChild(p);
  }
}

// ── Rotating Hero Card ────────────────────────────────────────
const heroBreeds = [
  { name: 'Maine Coon', desc: 'The gentle giant', img: 'Breeds/Maine.jpg' },
  { name: 'Siamese',    desc: 'Striking blue eyes', img: 'Breeds/Siamese.jpeg' },
  { name: 'Persian',    desc: 'Luxurious elegance', img: 'Breeds/Persian.jpg' },
  { name: 'Bengal',     desc: 'Wild at heart',      img: 'Breeds/Bengal.jpeg' },
  { name: 'Ragdoll',    desc: 'Born to cuddle',     img: 'Breeds/Ragdoll.webp' },
];
let heroIdx = 0;

function rotateHeroCard() {
  const nameEl = document.getElementById('heroBreedName');
  const descEl = document.getElementById('heroBreedDesc');
  const imgEl  = document.getElementById('heroBreedImg');
  if (!nameEl) return;
  heroIdx = (heroIdx + 1) % heroBreeds.length;
  const b = heroBreeds[heroIdx];
  nameEl.style.opacity = '0';
  descEl.style.opacity = '0';
  setTimeout(() => {
    nameEl.textContent = b.name;
    descEl.textContent = b.desc;
    if (imgEl) imgEl.src = b.img;
    nameEl.style.opacity = '1';
    descEl.style.opacity = '1';
  }, 300);
}

// ── Counter Animations ────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const dur    = 1800;
  const step   = 16;
  const inc    = target / (dur / step);
  let cur      = 0;
  const timer  = setInterval(() => {
    cur += inc;
    if (cur >= target) { cur = target; clearInterval(timer); }
    el.textContent = Math.floor(cur).toLocaleString() + (el.dataset.suffix || '');
  }, step);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = '1';
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
}

// ── Lightbox ──────────────────────────────────────────────────
let galleryItems = [];
let lightboxIdx  = 0;

function openLightbox(idx) {
  lightboxIdx = idx;
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCap');
  if (!lb) return;
  const item = galleryItems[idx];
  img.src = item.src;
  cap.textContent = item.caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  lightboxIdx = (lightboxIdx + dir + galleryItems.length) % galleryItems.length;
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCap');
  const item = galleryItems[lightboxIdx];
  img.style.opacity = '0';
  setTimeout(() => { img.src = item.src; img.style.opacity = '1'; cap.textContent = item.caption; }, 150);
}

function initGallery() {
  const items = document.querySelectorAll('.gallery-item');
  galleryItems = [];
  items.forEach((item, i) => {
    const img = item.querySelector('img');
    if (!img) return;
    const caption = item.querySelector('p')?.textContent || '';
    galleryItems.push({ src: img.src, caption });
    item.addEventListener('click', () => openLightbox(i));
  });
}

// ── Breed Cards (flip) ────────────────────────────────────────
function initBreedCards() {
  document.querySelectorAll('.breed-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

// ── Breed Filter / Search ─────────────────────────────────────
function initBreedFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const searchInput = document.getElementById('breedSearch');
  const cards = document.querySelectorAll('.breed-card');

  function applyFilter() {
    const active = document.querySelector('.filter-btn.active[data-filter]')?.dataset.filter || 'all';
    const query  = searchInput ? searchInput.value.toLowerCase() : '';
    cards.forEach(card => {
      const name    = card.dataset.name?.toLowerCase() || '';
      const tags    = card.dataset.tags?.toLowerCase() || '';
      const matchQ  = !query || name.includes(query) || tags.includes(query);
      const matchF  = active === 'all' || tags.includes(active);
      card.style.display = matchQ && matchF ? '' : 'none';
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter();
    });
  });

  if (searchInput) searchInput.addEventListener('input', applyFilter);
}

// ── Care Tips Tabs ────────────────────────────────────────────
function initTabs() {
  const btns   = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab)?.classList.add('active');
    });
  });
}

// ── FAQ ───────────────────────────────────────────────────────
function initFaq() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer  = btn.nextElementSibling;
      const isOpen  = btn.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-q.open').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
}

// ── Age Calculator ────────────────────────────────────────────
function initAgeCalc() {
  const slider = document.getElementById('catAgeSlider');
  const disp   = document.getElementById('humanAge');
  const sub    = document.getElementById('ageStage');
  if (!slider) return;

  const calc = v => {
    if (v <= 1) return Math.round(v * 15);
    if (v <= 2) return 15 + Math.round((v - 1) * 9);
    return 24 + Math.round((v - 2) * 4);
  };

  const stage = v => {
    if (v <= 0.5) return 'Newborn — tiny and helpless 🍼';
    if (v <= 1)   return 'Kitten — full of chaos and joy 🐾';
    if (v <= 3)   return 'Junior — teenager energy 🎮';
    if (v <= 6)   return 'Young Adult — at peak health 💪';
    if (v <= 10)  return 'Mature Adult — wise and calm 🧘';
    if (v <= 15)  return 'Senior — deserves all the cozy naps 🛋️';
    return 'Super Senior — a legend! 👑';
  };

  const update = () => {
    const v = parseFloat(slider.value);
    const pct = ((v - parseFloat(slider.min)) / (parseFloat(slider.max) - parseFloat(slider.min))) * 100;
    slider.style.setProperty('--pct', pct + '%');
    if (disp) disp.innerHTML = `${calc(v)} <small>human yrs</small>`;
    if (sub)  sub.textContent = stage(v);
    const lbl = document.getElementById('catAgeLabel');
    if (lbl)  lbl.textContent = `${v} cat year${v == 1 ? '' : 's'}`;
  };

  slider.addEventListener('input', update);
  update();
}

// ── Breed Comparison ──────────────────────────────────────────
const breedData = {
  Tabby:          { origin:'Various',    care:'Moderate', energy:4, social:4, grooming:2, lifespan:'12-18 yrs', img:'Breeds/Tabby.jpg' },
  Siamese:        { origin:'Thailand',   care:'High',     energy:4, social:5, grooming:2, lifespan:'8-15 yrs',  img:'Breeds/Siamese.jpeg' },
  Persian:        { origin:'Iran',       care:'High',     energy:2, social:3, grooming:5, lifespan:'8-15 yrs',  img:'Breeds/Persian.jpg' },
  Bengal:         { origin:'USA',        care:'High',     energy:5, social:4, grooming:2, lifespan:'10-16 yrs', img:'Breeds/Bengal.jpeg' },
  'Maine Coon':   { origin:'Maine, USA', care:'Moderate', energy:3, social:5, grooming:4, lifespan:'12-18 yrs', img:'Breeds/Maine.jpg' },
  'Scottish Fold':{ origin:'Scotland',   care:'Moderate', energy:3, social:4, grooming:3, lifespan:'11-15 yrs', img:'Breeds/Scottish.jpeg' },
  'Russian Blue': { origin:'Russia',     care:'Low',      energy:3, social:3, grooming:2, lifespan:'12-17 yrs', img:'Breeds/Russian.jpg' },
  Ragdoll:        { origin:'USA',        care:'Moderate', energy:2, social:5, grooming:3, lifespan:'12-17 yrs', img:'Breeds/Ragdoll.webp' },
  Sphynx:         { origin:'Canada',     care:'High',     energy:4, social:5, grooming:4, lifespan:'8-14 yrs',  img:'Breeds/Sphynx.webp' },
  'British Shorthair':{ origin:'UK',     care:'Low',      energy:2, social:3, grooming:2, lifespan:'12-17 yrs', img:'Breeds/British.jpeg' },
  Abyssinian:     { origin:'Egypt',      care:'Moderate', energy:5, social:4, grooming:2, lifespan:'9-15 yrs',  img:'Breeds/ABYSSINIAN.webp' },
  Burmese:        { origin:'Myanmar',    care:'Low',      energy:4, social:5, grooming:1, lifespan:'10-17 yrs', img:'Breeds/Burmese.jpeg' },
  Manx:           { origin:'Isle of Man',care:'Moderate', energy:4, social:4, grooming:2, lifespan:'8-14 yrs',  img:'Breeds/Manx.jpeg' },
};
const barIcon = v => '●'.repeat(v) + '○'.repeat(5 - v);

function initComparison() {
  const s1   = document.getElementById('compareA');
  const s2   = document.getElementById('compareB');
  const body = document.getElementById('compareBody');
  const h1   = document.getElementById('compareHeader1');
  const h2   = document.getElementById('compareHeader2');
  if (!s1 || !body) return;

  function render() {
    const a = breedData[s1.value];
    const b = breedData[s2.value];
    if (!a || !b) return;
    h1.innerHTML = `<img src="${a.img}" class="compare-header-img" alt="${s1.value}"><div>${s1.value}</div>`;
    h2.innerHTML = `<img src="${b.img}" class="compare-header-img" alt="${s2.value}"><div>${s2.value}</div>`;
    const rows = [
      ['Origin',      a.origin,         b.origin],
      ['Care Level',  a.care,           b.care],
      ['Lifespan',    a.lifespan,       b.lifespan],
      ['Energy',      barIcon(a.energy),barIcon(b.energy)],
      ['Sociability', barIcon(a.social),barIcon(b.social)],
      ['Grooming',    barIcon(a.grooming),barIcon(b.grooming)],
    ];
    body.innerHTML = rows.map(([label, va, vb]) =>
      `<tr>
        <td>${label}</td>
        <td style="color:var(--gold)">${va}</td>
        <td style="color:var(--teal)">${vb}</td>
      </tr>`).join('');
  }

  s1.addEventListener('change', render);
  s2.addEventListener('change', render);
  render();
}

// ── Breed Quiz ────────────────────────────────────────────────
const questions = [
  {
    q: 'How active is your lifestyle?',
    sub: 'Think about how much time you have for play & exercise',
    opts: [
      { icon:'🛋️', text:'Very relaxed, I love downtime', tag:'calm' },
      { icon:'🚶', text:'Moderately active most days',   tag:'moderate' },
      { icon:'🏃', text:'Always on the move!',           tag:'active' },
      { icon:'🧘', text:'Balanced — mix of both',        tag:'moderate' },
    ]
  },
  {
    q: 'How much time can you spend with your cat daily?',
    sub: 'Cats vary greatly in social needs',
    opts: [
      { icon:'⏱️',  text:'Under 1 hour',       tag:'independent' },
      { icon:'🕑',  text:'1–3 hours',           tag:'moderate' },
      { icon:'🕓',  text:'3–5 hours',           tag:'social' },
      { icon:'🌅',  text:'Most of the day',     tag:'social' },
    ]
  },
  {
    q: 'How do you feel about cat hair & grooming?',
    sub: 'Be honest — it matters for happiness!',
    opts: [
      { icon:'✂️',  text:'Love grooming sessions',   tag:'high-groom' },
      { icon:'🧹',  text:'Some grooming is fine',    tag:'moderate' },
      { icon:'🙅',  text:'Minimal effort please',    tag:'low-groom' },
      { icon:'🤧',  text:'I have mild allergies',    tag:'hypoallergenic' },
    ]
  },
  {
    q: 'What size home do you have?',
    sub: 'Space affects breed happiness significantly',
    opts: [
      { icon:'🏠',  text:'House with outdoor space', tag:'large' },
      { icon:'🏢',  text:'Spacious apartment',       tag:'large' },
      { icon:'🏡',  text:'Cosy mid-size apartment',  tag:'moderate' },
      { icon:'📦',  text:'Small studio space',       tag:'small' },
    ]
  },
  {
    q: 'Do you have children or other pets?',
    sub: 'Family dynamics influence the ideal match',
    opts: [
      { icon:'👶',  text:'Young children at home',   tag:'family' },
      { icon:'🐕',  text:'Dogs or other pets',       tag:'social' },
      { icon:'👥',  text:'Adults only',              tag:'any' },
      { icon:'🔇',  text:'Quiet single household',   tag:'quiet' },
    ]
  },
];

const quizResults = {
  calm:        { name:'Persian',           img:'Breeds/Persian.jpg',    desc:'The Persian is the ultimate lap cat — serene, gentle, and perfectly content with a quiet life full of soft cushions and attentive grooming sessions.', traits:['Calm','Gentle','Low Energy','Indoor','Needs Grooming'] },
  moderate:    { name:'Scottish Fold',     img:'Breeds/Scottish.jpeg',  desc:'Sweet, adaptable, and wonderfully balanced. The Scottish Fold fits seamlessly into most households with its calm demeanour and quiet charm.', traits:['Adaptable','Gentle','Moderate Energy','Family-Friendly'] },
  active:      { name:'Bengal',            img:'Breeds/Bengal.jpeg',    desc:'The Bengal thrives with active owners who can match its boundless energy, love of climbing, and need for mental stimulation.', traits:['High Energy','Athletic','Playful','Curious','Bold'] },
  independent: { name:'Russian Blue',      img:'Breeds/Russian.jpg',    desc:'Elegant and reserved, the Russian Blue is ideal for those who work long hours. It forms deep bonds but values its personal space.', traits:['Independent','Loyal','Quiet','Low-Shed','Low Maintenance'] },
  social:      { name:'Maine Coon',        img:'Breeds/Maine.jpg',      desc:'Gentle giants with dog-like loyalty. Maine Coons adore company, get along famously with children and pets, and even enjoy a game of fetch.', traits:['Social','Gentle','Family-Friendly','Playful','Vocal'] },
  'high-groom':{ name:'Ragdoll',           img:'Breeds/Ragdoll.webp',   desc:'The Ragdoll goes limp with happiness when held. Silky, gorgeous, and placid — it rewards every grooming session with purring affection.', traits:['Docile','Cuddly','Silky Coat','Indoor','Affectionate'] },
  'low-groom': { name:'Abyssinian',        img:'Breeds/ABYSSINIAN.webp', desc:'Short-coated, self-sufficient, and endlessly entertaining. The Abyssinian is a curious explorer that keeps itself immaculate with minimal help.', traits:['Energetic','Low-Shedding','Curious','Intelligent','Playful'] },
  hypoallergenic:{ name:'Siberian',        img:'Breeds/Russian.jpg',    desc:'While no cat is fully hypoallergenic, Siberians produce lower Fel d 1 protein. Closest breed in our collection: Russian Blue is also a lower-allergen option.', traits:['Lower Allergens','Gentle','Playful','Semi-Long Coat'] },
  family:      { name:'Burmese',           img:'Breeds/Burmese.jpeg',   desc:'Outgoing and people-obsessed, Burmese cats shadow their families everywhere. Excellent with children thanks to their patient, playful temperament.', traits:['Sociable','Affectionate','Playful','Vocal','People-Oriented'] },
  quiet:       { name:'British Shorthair', img:'Breeds/British.jpeg',   desc:'Dignified, calm, and perfectly content with a settled single-person household. The British Shorthair offers quiet companionship without demanding attention.', traits:['Independent','Calm','Low Maintenance','Quiet','Easy-Going'] },
  default:     { name:'Siamese',           img:'Breeds/Siamese.jpeg',   desc:'The Siamese is endlessly fascinating — chatty, dramatic, and deeply bonded to their chosen person. Perfect for someone who wants a genuine conversation partner.', traits:['Vocal','Intelligent','Affectionate','Social','Striking'] },
};

let quizAnswers = [];
let currentQ    = 0;

function startQuiz() {
  quizAnswers = [];
  currentQ = 0;
  document.getElementById('quizResult')?.classList.remove('show');
  showQuestion(0);
  document.getElementById('quizBox')?.classList.remove('hidden');
  document.getElementById('quizStart')?.classList.add('hidden');
}

function showQuestion(idx) {
  const q   = questions[idx];
  const box = document.getElementById('quizBox');
  if (!box || !q) return;

  // Progress
  const steps = document.querySelectorAll('.quiz-prog-step');
  steps.forEach((s, i) => {
    s.className = 'quiz-prog-step';
    if (i < idx)       s.classList.add('done');
    else if (i === idx) s.classList.add('current');
  });

  box.querySelector('.quiz-question').textContent = q.q;
  box.querySelector('.quiz-sub').textContent = q.sub;

  const optsEl = box.querySelector('.quiz-options');
  optsEl.innerHTML = q.opts.map((o, i) =>
    `<button class="quiz-option glass-card" data-idx="${i}" data-tag="${o.tag}">
      <span class="quiz-option-icon">${o.icon}</span>${o.text}
    </button>`
  ).join('');

  optsEl.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      optsEl.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      setTimeout(() => nextQ(btn.dataset.tag), 500);
    });
  });

  const counter = box.querySelector('.quiz-counter');
  if (counter) counter.textContent = `Question ${idx + 1} of ${questions.length}`;
}

function nextQ(tag) {
  quizAnswers.push(tag);
  if (currentQ < questions.length - 1) {
    currentQ++;
    showQuestion(currentQ);
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  // Tally tags
  const freq = {};
  quizAnswers.forEach(t => { freq[t] = (freq[t] || 0) + 1; });
  const topTag = Object.keys(freq).sort((a, b) => freq[b] - freq[a])[0];
  const result = quizResults[topTag] || quizResults.default;

  document.getElementById('quizBox')?.classList.add('hidden');
  const res = document.getElementById('quizResult');
  if (!res) return;
  res.innerHTML = `
    <div class="result-card glass-card reveal revealed">
      <div class="result-match">✦ Your Perfect Match ✦</div>
      <img src="${result.img}" alt="${result.name}" class="result-img">
      <h2 class="result-name">${result.name}</h2>
      <p class="result-desc">${result.desc}</p>
      <div class="result-traits">
        ${result.traits.map(t => `<span class="badge badge-gold">${t}</span>`).join('')}
      </div>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <a href="breeds.html" class="btn btn-primary">Explore This Breed</a>
        <button class="btn btn-outline" onclick="retakeQuiz()">Retake Quiz</button>
      </div>
    </div>`;
  res.classList.add('show');
}

function retakeQuiz() {
  document.getElementById('quizResult')?.classList.remove('show');
  document.getElementById('quizStart')?.classList.remove('hidden');
  document.getElementById('quizBox')?.classList.add('hidden');
}

// ── Contact Form ──────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.style.display = 'none';
    document.getElementById('formSuccess')?.classList.add('show');
    showToast('✅ Message sent! We'll get back to you soon.', 'success');
  });
}

// ── Newsletter Forms ──────────────────────────────────────────
function initNewsletter() {
  document.querySelectorAll('.nl-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type=email]');
      if (input) input.value = '';
      showToast('🐱 Subscribed! Welcome to the Fur & Learn family!', 'success');
    });
  });
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className   = `toast ${type} show`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3800);
}

// ── Smooth Stat Counter Text ──────────────────────────────────
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ── Keyboard nav for lightbox ─────────────────────────────────
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
});

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  setActiveNav();
  createParticles();
  initScrollReveal();
  initCounters();
  initGallery();
  initBreedCards();
  initBreedFilter();
  initTabs();
  initFaq();
  initAgeCalc();
  initComparison();
  initContactForm();
  initNewsletter();

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Hero card rotation
  if (document.getElementById('heroBreedName')) {
    setInterval(rotateHeroCard, 3500);
  }

  // Expose globals needed by inline handlers
  window.toggleNav     = toggleNav;
  window.toggleTheme   = toggleTheme;
  window.scrollToTop   = scrollToTop;
  window.closeLightbox = closeLightbox;
  window.lightboxNav   = lightboxNav;
  window.startQuiz     = startQuiz;
  window.retakeQuiz    = retakeQuiz;
});
