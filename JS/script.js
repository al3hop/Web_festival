// Animayo — Header + Menú hamburguesa (versión limpia)
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const burger = document.querySelector('.burger');
  const nav    = document.querySelector('#main-menu');

  if (!burger || !nav) return;

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

  // ---------- Abrir / cerrar menú ----------
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

  // Click en burger
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

  // ---------- Header que se oculta/ aparece con el scroll ----------
  if (header) {
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
      const y = window.scrollY;
      const goingDown = y > lastY;
      lastY = y;

      // No ocultes el header si el menú está abierto
      if (nav.classList.contains('menu-open')) return;

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
});
