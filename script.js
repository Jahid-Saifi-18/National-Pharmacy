// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');
hamburger.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => nav.classList.remove('open')));

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let pos = window.scrollY + 90;
  sections.forEach(s => {
    if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
      navLinks.forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${s.id}"]`);
      if (a) a.classList.add('active');
    }
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 73, behavior: 'smooth' }); }
  });
});

// ===== FADE-UP OBSERVER =====
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.svc-card,.why-card,.ci-card,.trust-item,.gal-item,.faq-item,.testi-card,.review-card,.ob-det-item,.ob-offer').forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  obs.observe(el);
});
document.querySelectorAll('.about-img-col,.about-content,.contact-form-box,.contact-info-col').forEach(el => {
  el.classList.add('fade-up');
  obs.observe(el);
});

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
  // Grand Opening: April 8, 2026 at 10:00 AM IST
  const target = new Date('2026-04-08T10:00:00+05:30').getTime();
  const now = Date.now();
  const diff = target - now;

  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');

  if (!dEl) return;

  if (diff <= 0) {
    document.getElementById('countdown-card').innerHTML = '<div class="cc-title" style="color:#4ade80;font-size:1.2rem;font-weight:800;">🎉 We Are OPEN!</div><p style="color:rgba(255,255,255,.7);margin-top:12px;">National Pharmacy is now open!<br/>Visit us on Salempur Road, Gajraula.</p>';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);

  const pad = n => String(n).padStart(2, '0');
  dEl.textContent = pad(days);
  hEl.textContent = pad(hours);
  mEl.textContent = pad(mins);
  sEl.textContent = pad(secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== REVIEW SLIDER =====
const cards = document.querySelectorAll('.review-card');
const dotsWrap = document.getElementById('slider-dots');
let currentSlide = 0;

function createDots() {
  if (!dotsWrap) return;
  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 's-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goSlide(i));
    dotsWrap.appendChild(d);
  });
}

function goSlide(idx) {
  cards.forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.s-dot').forEach(d => d.classList.remove('active'));
  currentSlide = idx;
  cards[currentSlide].classList.add('active');
  document.querySelectorAll('.s-dot')[currentSlide]?.classList.add('active');
}

function nextSlide() {
  goSlide((currentSlide + 1) % cards.length);
}

createDots();
setInterval(nextSlide, 4500);

// ===== FAQ =====
function toggleFAQ(id) {
  const item = document.getElementById(id);
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
window.toggleFAQ = toggleFAQ;

// ===== LIGHTBOX =====
function openLightbox(el) {
  const img = el.querySelector('img');
  if (!img) return;
  document.getElementById('lb-img').src = img.src;
  document.getElementById('lb-img').alt = img.alt;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ===== CONTACT FORM → WHATSAPP =====
function submitForm(e) {
  e.preventDefault();
  const name    = document.getElementById('cf-name').value.trim();
  const phone   = document.getElementById('cf-phone').value.trim();
  const area    = document.getElementById('cf-area').value.trim();
  const service = document.getElementById('cf-service').value;
  const msg     = document.getElementById('cf-msg').value.trim();

  const text = `Hello National Pharmacy (Drx Zubair Alam),\n\n` +
    `*Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    (area    ? `*Area:* ${area}\n`       : '') +
    (service ? `*Enquiry:* ${service}\n` : '') +
    `*Message:* ${msg}\n\n` +
    `📍 Salempur Road, Basti, Gajraula`;

  window.open(`https://wa.me/918958866412?text=${encodeURIComponent(text)}`, '_blank');
}
window.submitForm = submitForm;

// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 5 + 3;
    p.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(201,168,76,${Math.random() * 0.25 + 0.05});
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation:particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay:${Math.random() * 4}s;
      pointer-events:none;
    `;
    container.appendChild(p);
  }
}

const pStyles = document.createElement('style');
pStyles.textContent = `@keyframes particleFloat{0%,100%{transform:translateY(0) scale(1);opacity:.4}50%{transform:translateY(-${Math.random()*30+20}px) scale(1.2);opacity:.2}}`;
document.head.appendChild(pStyles);
createParticles();

// ===== FLOATING WA PULSE =====
setInterval(() => {
  const wa = document.getElementById('float-wa');
  if (wa) { wa.style.boxShadow = '0 0 0 10px rgba(37,211,102,0)'; setTimeout(() => { wa.style.boxShadow = '0 4px 20px rgba(37,211,102,.4)'; }, 700); }
}, 3000);

console.log('%c💊 National Pharmacy – Gajraula\nOwner: Drx Zubair Alam | +91 89588 66412', 'color:#C9A84C;font-size:13px;font-weight:bold;background:#0a3d3d;padding:8px 16px;border-radius:8px;');
