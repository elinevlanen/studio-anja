/* =========================================================
   Studio Anja: JavaScript
   Drie kleine taken:
   1. Het mobiele menu open en dicht doen
   2. De header iets steviger maken na scrollen
   3. Elementen rustig laten infaden als ze in beeld komen
   ========================================================= */

// ---------- 1. Mobiel menu ----------
const menuKnop = document.querySelector('.menu-knop');
const nav = document.querySelector('.site-nav');

function zetMenu(open) {
  nav.classList.toggle('is-open', open);
  menuKnop.setAttribute('aria-expanded', open);
  menuKnop.querySelector('.visually-hidden').textContent = open ? 'Menu sluiten' : 'Menu openen';
}

if (menuKnop && nav) {
  menuKnop.addEventListener('click', () => {
    const isOpen = menuKnop.getAttribute('aria-expanded') === 'true';
    zetMenu(!isOpen);
  });

  // Sluiten met de Escape-toets
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      zetMenu(false);
      menuKnop.focus();
    }
  });

  // Sluiten als je naast het menu klikt
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !e.target.closest('.site-header')) {
      zetMenu(false);
    }
  });

  // Sluiten als het scherm breder wordt (bijvoorbeeld tablet kantelen)
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
    if (e.matches) zetMenu(false);
  });
}


// ---------- 2. Header na scrollen ----------
const header = document.querySelector('.site-header');

function checkScroll() {
  header.classList.toggle('is-gescrold', window.scrollY > 40);
}
window.addEventListener('scroll', checkScroll, { passive: true });
checkScroll();


// ---------- 3. Rustig infaden bij scrollen ----------
// IntersectionObserver "kijkt" of een element in beeld komt.
// Dan krijgt het de class "is-zichtbaar" en doet de CSS de rest.
const revealElementen = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-zichtbaar');
        observer.unobserve(entry.target);   // één keer is genoeg
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  revealElementen.forEach((el) => observer.observe(el));
} else {
  // Hele oude browser: gewoon alles tonen
  revealElementen.forEach((el) => el.classList.add('is-zichtbaar'));
}
