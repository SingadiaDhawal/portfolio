// =========================================
// DHAWAL SINGADIA — PORTFOLIO · script.js
// =========================================

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  dotX += (mouseX - dotX) * 0.12;
  dotY += (mouseY - dotY) * 0.12;
  cursor.style.left = dotX + 'px';
  cursor.style.top = dotY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ---- Nav scroll effect ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Reveal on scroll ----
const revealEls = document.querySelectorAll('.reveal, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Stagger siblings
document.querySelectorAll('.section').forEach(section => {
  const children = section.querySelectorAll('.reveal, .reveal-right');
  children.forEach((el, i) => {
    el.dataset.delay = i * 80;
  });
});

revealEls.forEach(el => revealObserver.observe(el));

// ---- Counter animation ----
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = (target * ease).toFixed(2);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toFixed(2);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num[data-target]');
      nums.forEach(n => animateCounter(n));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroCard = document.querySelector('.hero-card');
if (heroCard) counterObserver.observe(heroCard);

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '68px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(10,10,10,0.96)';
    navLinks.style.backdropFilter = 'blur(20px)';
    navLinks.style.padding = '20px 40px 28px';
    navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.07)';
    navLinks.style.gap = '16px';
    if (open) navLinks.style.display = 'none';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        navLinks.style.display = 'none';
      }
    });
  });
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
