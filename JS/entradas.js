// ===== Entradas (tickets) =====
document.addEventListener('DOMContentLoaded', () => {

  // 1) Marcar botón Tickets como activo por si esta hoja se carga sola
  const ticketsBtn = document.querySelector('.btn-tickets[data-nav="tickets"]');
  if (ticketsBtn) {
    ticketsBtn.classList.add('is-active');
  }

  // 2) Estado del carro en memoria
  const state = new Map(); // key: id, value: { name, price, qty }

  // helpers
  const money = n => `${n.toFixed(0)}€`;

  const grid = document.getElementById('tix-grid');
  const list = document.getElementById('summary-list');
  const totalEl = document.getElementById('summary-total');

  function renderSummary(){
    list.innerHTML = '';
    let total = 0;

    [...state.values()].forEach(item => {
      if (item.qty <= 0) return;
      const li = document.createElement('li');
      li.className = 'tix-summary__item';
      const lineTotal = item.price * item.qty;
      total += lineTotal;

      li.innerHTML = `
        <span>
          <strong>${item.name}</strong>
          <small> &nbsp; ${item.qty} × ${money(item.price)}</small>
        </span>
        <span>${money(lineTotal)}</span>
      `;
      list.appendChild(li);
    });

    totalEl.textContent = money(total);
  }

  function setQty(card, qty){
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    const safe = Math.max(0, qty);
    const span = card.querySelector('.qty-num');
    if (span) span.textContent = safe;

    if (!state.has(id)) state.set(id, { name, price, qty: 0 });
    state.get(id).qty = safe;

    renderSummary();
  }

  // 3) Eventos +/-
  if (grid) {
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.qty-btn');
      if (!btn) return;
      const card = e.target.closest('.tix-card');
      if (!card) return;

      const span = card.querySelector('.qty-num');
      let current = Number(span.textContent || '0');

      if (btn.classList.contains('plus')) current += 1;
      if (btn.classList.contains('minus')) current = Math.max(0, current - 1);

      setQty(card, current);
    });

    // 4) Abrir modales
    grid.addEventListener('click', (e) => {
      const infoBtn = e.target.closest('.tix-card__info');
      if (!infoBtn) return;

      const id = infoBtn.dataset.modal;
      openModal(modalContents[id] || defaultModal);
    });
  }

  // 5) Modal
  const modal = document.getElementById('tix-modal');
  const modalDialog = modal?.querySelector('.tix-modal__dialog');
  const modalTitle = modal?.querySelector('#modal-title');
  const modalContent = modal?.querySelector('.tix-modal__content');
  const modalClose = modal?.querySelector('.tix-modal__close');

  const defaultModal = {
    title: 'Información del abono',
    html: '<p>Consulta las condiciones del abono seleccionado.</p>'
  };

  const modalContents = {
    basic35: {
      title: 'Abono básico (35€)',
      html: `
        <ul>
          <li>Acceso a 2 proyecciones generales.</li>
          <li>Entrada a la ceremonia de apertura.</li>
          <li>Descuento del 10% en merchandising oficial.</li>
        </ul>
      `
    },
    basic50: {
      title: 'Abono básico + (50€)',
      html: `
        <ul>
          <li>Todo lo del Abono básico.</li>
          <li>1 taller introductorio de 90 min.</li>
          <li>Asiento preferente en una masterclass.</li>
        </ul>
      `
    },
    screen100: {
      title: 'Abono proyecciones (100€)',
      html: `
        <ul>
          <li>Acceso ilimitado a proyecciones.</li>
          <li>Prioridad en pases especiales.</li>
          <li>Pack de láminas exclusivas.</li>
        </ul>
      `
    },
    network150: {
      title: 'Abono networking (150€)',
      html: `
        <ul>
          <li>Acceso a eventos privados de networking.</li>
          <li>Speed-meetings con estudio invitado.</li>
          <li>Cocktail de cierre.</li>
        </ul>
      `
    },
    recruit200: {
      title: 'Abono reclutamiento (200€)',
      html: `
        <ul>
          <li>Sesiones de revisión de porfolio 1:1.</li>
          <li>Entrevistas con recruiters.</li>
          <li>Acceso a dossier de oportunidades.</li>
        </ul>
      `
    },
    vip300: {
      title: 'Abono VIP (300€)',
      html: `
        <ul>
          <li>Asientos reservados en todos los eventos.</li>
          <li>Backstage tour y photo-call.</li>
          <li>Meet & greet con invitados principales.</li>
        </ul>
      `
    }
  };

  function openModal({ title, html }){
    if (!modal) return;
    modalTitle.textContent = title || 'Información';
    modalContent.innerHTML = html || '';
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }
  function closeModal(){
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(); // click fuera
  });
  modalClose?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
      closeModal();
    }
  });

  // 6) CTA continuar (demo)
  document.getElementById('btn-continue')?.addEventListener('click', () => {
    const total = totalEl?.textContent || '0€';
    alert(`¡Genial! Tu total es ${total}.`);
  });

});

// Forzar que el logo navegue a la Home cuando estamos en tickets.html
document.addEventListener('DOMContentLoaded', () => {
  if (!location.pathname.endsWith('tickets.html')) return;

  const logo = document.querySelector('header .logo');
  if (!logo) return;

  // Capturamos antes que otros listeners para evitar preventDefault previos
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation(); // anula cualquier handler anterior del logo
    window.location.href = 'index.html';
  }, { capture: true });
});

// ===== helpers de modal (animada) =====
function openModal(modalEl){
  if (!modalEl) return;
  modalEl.classList.remove('closing');
  modalEl.classList.add('is-open');
}

function closeModal(modalEl){
  if (!modalEl || !modalEl.classList.contains('is-open')) return;
  modalEl.classList.add('closing');        // dispara animación de salida
  modalEl.addEventListener('animationend', () => {
    modalEl.classList.remove('is-open', 'closing');
  }, { once: true });
}

// ===== wiring (llama a estas según tu estructura actual) =====
// Ejemplo genérico: botones "Ver información"
document.querySelectorAll('[data-open-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-open-modal');
    openModal(document.getElementById(id));
  });
});

// Cerrar con X
document.querySelectorAll('.modal .modal__close').forEach(x => {
  x.addEventListener('click', () => closeModal(x.closest('.modal')));
});

// Cerrar clicando fuera del panel
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal__panel')) closeModal(modal);
  });
});
