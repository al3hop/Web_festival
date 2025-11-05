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


document.addEventListener('DOMContentLoaded', () => {
  const nav     = document.querySelector('#main-menu');
  const burger  = document.querySelector('.burger');

  // Helper para cerrar menú si está abierto (usa tu propia toggle si la tienes)
  function closeMenuIfOpen(){
    if (!nav) return;
    if (nav.classList.contains('menu-open')) {
      nav.classList.remove('menu-open');
      if (burger){
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
      // Si bloqueas scroll al abrir el menú, deshazlo aquí:
      document.body.classList.remove('no-scroll');
      document.body.style.top = '';
    }
  }

  // Scroll suave “manual” + cierre de menú
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      closeMenuIfOpen();
      // Por compatibilidad con navegadores, fuerzo scrollIntoView
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const logo   = document.querySelector('.logo');
  const nav    = document.querySelector('#main-menu');
  const burger = document.querySelector('.burger');

  if (logo) {
    logo.addEventListener('click', (e) => {
      // Evita el salto instantáneo del anchor
      e.preventDefault();

      // Cierra el menú si está abierto
      if (nav && nav.classList.contains('menu-open')) {
        nav.classList.remove('menu-open');
        document.body.classList.remove('no-scroll');
      }
      if (burger) {
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }

      // Desplaza al top con suavidad (fallback JS)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Opcional: actualiza la URL al hash #top sin recargar
      history.replaceState(null, '', '#top');
    });
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const header  = document.querySelector('.site-header');
  const burger  = document.querySelector('.burger');
  const nav     = document.querySelector('#main-menu');

  // Cerrar menú y hacer scroll suave a cualquier anchor del menú
  if (nav) {
    nav.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      // Si es un anchor interno, animamos con JS (fallback universal)
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Cierra hamburguesa si estaba abierta
      if (nav.classList.contains('menu-open')) {
        nav.classList.remove('menu-open');
        document.body.classList.remove('no-scroll');
        if (burger) {
          burger.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // Logo → top suave + cierre del menú si está abierto
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (nav && nav.classList.contains('menu-open')) {
        nav.classList.remove('menu-open');
        document.body.classList.remove('no-scroll');
        if (burger) {
          burger.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
        }
      }
      history.replaceState(null, '', '#top'); // opcional: deja #top en la URL
    });
  }
});
