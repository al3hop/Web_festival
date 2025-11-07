// Animayo — Header + Menú hamburguesa + Scroll + Logo recarga (versión compacta)
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const burger = document.querySelector('.burger');
  const nav    = document.querySelector('#main-menu');
  const logo   = document.querySelector('header .logo');

  // ---------- Lock / Unlock scroll del body ----------
  let lockY = 0;
  function lockScroll() {
    lockY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.top = `-${lockY}px`;
    document.body.classList.add('no-scroll'); // en CSS bloquea el scroll
  }
  function unlockScroll() {
    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, lockY || 0);
  }

  // ---------- Menú hamburguesa ----------
  function toggleMenu(force) {
    const willOpen = (typeof force === 'boolean')
      ? force
      : !nav.classList.contains('menu-open');

    nav.classList.toggle('menu-open', willOpen);
    burger.classList.toggle('is-open', willOpen);
    burger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');

    if (willOpen) lockScroll();
    else          unlockScroll();
  }

  if (burger && nav) {
    // Abrir/cerrar
    burger.addEventListener('click', () => toggleMenu());

    // Cerrar al pinchar un enlace del menú
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a') && nav.classList.contains('menu-open')) {
        toggleMenu(false);
      }
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('menu-open')) {
        toggleMenu(false);
      }
    });
  }

  // ---------- Header que se oculta / aparece con el scroll ----------
  if (header) {
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
      const y = window.scrollY;
      const goingDown = y > lastY;
      lastY = y;

      // No ocultar si el menú está abierto
      if (nav && nav.classList.contains('menu-open')) return;

      header.classList.toggle('hide-on-scroll', goingDown && y > 10);
      if (!goingDown || y <= 10) header.classList.remove('hide-on-scroll');
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  // ---------- Scroll suave para anchors internos ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;

      // Si el enlace NO es el logo (el logo recarga la página), hacemos scroll suave
      if (a !== logo) {
        e.preventDefault();
        // Cierra menú si está abierto
        if (nav && nav.classList.contains('menu-open')) toggleMenu(false);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Logo del header → recargar página ----------
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      const wasOpen = nav && nav.classList.contains('menu-open');
      if (wasOpen) toggleMenu(false);
      setTimeout(() => location.reload(), wasOpen ? 160 : 0);
    });
  }
});



