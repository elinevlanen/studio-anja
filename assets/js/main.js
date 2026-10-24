/* =========================================================
   Studio Anja: JavaScript
   Vier kleine taken:
   1. Het mobiele menu open en dicht doen
   2. De header iets steviger maken na scrollen
   3. Elementen rustig laten infaden als ze in beeld komen
   4. Het stappenpad op de behandelpagina laten meetekenen
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


// ---------- 4. Stappenpad ----------
// Een golflijn verbindt de stappen. Terwijl je scrolt, rekenen we uit
// hoe ver de lijn getekend moet zijn (0 tot 1) en geven dat door aan de CSS.
// Komt de lijn bij een stap, dan krijgt die stap de class "is-actief".
const paden = document.querySelectorAll('.stappenpad');
const weinigBeweging = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const smalScherm = window.matchMedia('(max-width: 900px)');

// Meet waar de middens van de ronde foto's staan, ten opzichte van het pad
function meetPad(pad) {
  const padVak = pad.getBoundingClientRect();
  pad.middens = [...pad.querySelectorAll('.stap__beeld')].map((beeld) => {
    const vak = beeld.getBoundingClientRect();
    return { x: vak.left - padVak.left + vak.width / 2, y: vak.top - padVak.top + vak.height / 2 };
  });
  const eerste = pad.middens[0];
  const laatste = pad.middens[pad.middens.length - 1];
  pad.style.setProperty('--x1', eerste.x + 'px');
  pad.style.setProperty('--y1', eerste.y + 'px');
  pad.style.setProperty('--x2', laatste.x + 'px');
  pad.style.setProperty('--y2', laatste.y + 'px');
}

function tekenPad(pad) {
  const vak = pad.getBoundingClientRect();
  const hoogte = window.innerHeight;
  const m = pad.middens;
  let voortgang;
  let plekken;   // waar elke stap ligt op de lijn (0 tot 1)

  if (smalScherm.matches) {
    // Verticaal: de lijn volgt een denkbeeldig leespunt op 60% van het scherm
    const begin = vak.top + m[0].y;
    const lengte = m[m.length - 1].y - m[0].y;
    voortgang = (hoogte * 0.6 - begin) / lengte;
    plekken = m.map((p) => (p.y - m[0].y) / lengte);
  } else {
    // Horizontaal: de lijn groeit terwijl het pad van 85% naar 35% van het scherm schuift
    voortgang = (hoogte * 0.85 - (vak.top + m[0].y)) / (hoogte * 0.5);
    plekken = m.map((p) => (p.x - m[0].x) / (m[m.length - 1].x - m[0].x));
  }

  voortgang = Math.min(1, Math.max(0, voortgang));
  pad.style.setProperty('--voortgang', voortgang);
  pad.querySelectorAll('.stap').forEach((stap, i) => {
    stap.classList.toggle('is-actief', voortgang > 0 && voortgang >= plekken[i] - 0.04);
  });
}

if (paden.length) {
  if (weinigBeweging) {
    // Geen animatie: de lijn staat er helemaal en alle stappen zijn actief
    const allesTonen = () => paden.forEach((pad) => {
      meetPad(pad);
      pad.style.setProperty('--voortgang', 1);
      pad.querySelectorAll('.stap').forEach((s) => s.classList.add('is-actief'));
    });
    allesTonen();
    window.addEventListener('resize', allesTonen);
    window.addEventListener('load', allesTonen);
  } else {
    let wachtOpFrame = false;
    const opScroll = () => {
      if (wachtOpFrame) return;
      wachtOpFrame = true;
      // requestAnimationFrame: rekenen precies wanneer de browser gaat tekenen, niet vaker
      requestAnimationFrame(() => {
        paden.forEach(tekenPad);
        wachtOpFrame = false;
      });
    };
    const opnieuwMeten = () => {
      paden.forEach(meetPad);
      opScroll();
    };

    opnieuwMeten();
    window.addEventListener('scroll', opScroll, { passive: true });
    window.addEventListener('resize', opnieuwMeten);
    window.addEventListener('load', opnieuwMeten);   // als alle foto's en lettertypes er zijn
  }
}
