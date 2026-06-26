/* ==============================================
   PHOTON KIT — Unified JavaScript
   Apple Liquid Glass · Black/White Adaptive Theme
   ============================================== */
(function () {
  'use strict';

  // ========== NAVBAR TOGGLE ==========
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('open');
    });
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
      });
    }
  }

  // Responsive navbar toggle
  document.querySelectorAll('.navbar__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const menu = btn.nextElementSibling;
      if (menu && menu.classList.contains('navbar__menu')) {
        menu.classList.toggle('open');
      }
    });
  });

  // ========== MODALS ==========
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(targetId);
      if (modal) modal.classList.add('open', 'modal-overlay--open');
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay') || document.getElementById(btn.getAttribute('data-modal-close'));
      if (modal) modal.classList.remove('open', 'modal-overlay--open');
    });
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open', 'modal-overlay--open');
      }
    });
  });

  // ========== ACCORDIONS ==========
  document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion__item');
      const accordion = header.closest('.accordion');
      if (item) {
        item.classList.toggle('open');
        accordion.querySelectorAll('.accordion__item').forEach(i => {
          if (i !== item) i.classList.remove('open');
        });
      } else if (accordion) {
        accordion.classList.toggle('open');
      } else {
        header.parentElement.classList.toggle('open');
      }
    });
  });

  // ========== CAROUSELS ==========
  function initCarousel(el) {
    const slidesContainer = el.querySelector('.carousel__slides');
    const slides = el.querySelectorAll('.carousel__slide');
    const prevBtn = el.querySelector('.carousel__btn--prev, .carousel__control--prev, .carousel__prev');
    const nextBtn = el.querySelector('.carousel__btn--next, .carousel__control--next, .carousel__next');
    const dots = el.querySelectorAll('.carousel__dot');
    const isFade = el.classList.contains('carousel--fade');

    let autoplay = true;
    let interval = 4000;
    try {
      const data = JSON.parse(el.getAttribute('data-carousel') || '{}');
      if (data.autoplay !== undefined) autoplay = data.autoplay;
      if (data.interval) interval = data.interval;
    } catch (e) {
      autoplay = el.dataset.autoplay !== 'false';
      interval = parseInt(el.dataset.interval) || 4000;
    }

    let idx = 0;
    let timer = null;

    function goTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      idx = index;
      if (isFade) {
        slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      } else if (slidesContainer) {
        slidesContainer.style.transform = `translateX(-${idx * 100}%)`;
      }
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    function generateDots() {
      const container = el.querySelector('.carousel__dots, .carousel__indicators');
      if (!container || container.querySelectorAll('.carousel__dot').length > 0) return;
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel__dot';
        dot.type = 'button';
        dot.addEventListener('click', () => { goTo(i); restartAutoplay(); });
        container.appendChild(dot);
      }
    }

    function next() { goTo(idx + 1); restartAutoplay(); }
    function prev() { goTo(idx - 1); restartAutoplay(); }
    function restartAutoplay() { stopAutoplay(); startAutoplay(); }
    function startAutoplay() {
      if (!autoplay) return;
      stopAutoplay();
      timer = setInterval(next, interval);
    }
    function stopAutoplay() { if (timer) { clearInterval(timer); timer = null; } }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);
    el.querySelectorAll('.carousel__dot').forEach((d, i) => d.addEventListener('click', () => { goTo(i); restartAutoplay(); }));
    if (el) {
      el.addEventListener('mouseenter', stopAutoplay);
      el.addEventListener('mouseleave', startAutoplay);
    }
    generateDots();
    goTo(0);
    startAutoplay();
  }
  document.querySelectorAll('.carousel').forEach(initCarousel);

  // ========== TABS (hash-based) ==========
  document.querySelectorAll('.tabs__link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const tabsContainer = link.closest('.tabs');
        if (tabsContainer) {
          tabsContainer.querySelectorAll('.tabs__link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ========== ALERTS CLOSE ==========
  document.querySelectorAll('.alert__close').forEach(btn => {
    btn.addEventListener('click', () => {
      const alert = btn.closest('.alert');
      if (alert) {
        alert.style.transition = 'opacity 0.3s ease';
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
      }
    });
  });

  // ========== TOASTS ==========
  window.pkToast = function (message, type, duration) {
    type = type || '';
    duration = duration || 3000;
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' toast--' + type : '');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  // ========== CHIPS CLOSE ==========
  document.querySelectorAll('.chip__close').forEach(btn => {
    btn.addEventListener('click', () => {
      const chip = btn.closest('.chip');
      if (chip) chip.remove();
    });
  });

  // ========== FILTER TAGS ==========
  document.querySelectorAll('.filter__tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const filter = tag.closest('.filter');
      if (!filter) return;
      filter.querySelectorAll('.filter__tag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      const value = tag.dataset.filterTag || tag.dataset.filter || '';
      filter.querySelectorAll('.filter__item').forEach(item => {
        const cat = item.dataset.filterValue || item.dataset.category || '';
        item.classList.toggle('show', !value || cat === value);
      });
    });
  });

  // ========== OFF-CANVAS ==========
  document.querySelectorAll('[data-offcanvas]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-offcanvas');
      const canvas = document.getElementById(targetId);
      if (canvas) canvas.classList.toggle('open');
    });
  });
  document.querySelectorAll('.off-canvas__overlay, .offcanvas__overlay, [data-offcanvas-close]').forEach(el => {
    el.addEventListener('click', () => {
      const canvas = el.closest('.off-canvas, .offcanvas');
      if (canvas) canvas.classList.remove('open');
    });
  });

  // ========== COPY CODE BLOCKS ==========
  // Handled by doc.js in documentation pages

  // ========== TABS PURE CSS (Picnic-style) ==========
  document.querySelectorAll('.tabs--css input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) {
        const container = input.closest('.tabs--css');
        if (container) {
          const idx = Array.from(container.querySelectorAll('input[type="radio"]')).indexOf(input);
          const row = container.querySelector('.tabs__row');
          if (row) {
            row.style.marginLeft = `-${idx * 100}%`;
          }
        }
      }
    });
  });

  // ========== ACTIVE SIDEBAR LINK ==========
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // ========== STOPWATCH ==========
  document.querySelectorAll('[data-stopwatch]').forEach(el => {
    const display = el.querySelector('.stopwatch__display') || el;
    const btnStart = el.querySelector('[data-stopwatch-start]');
    const btnPause = el.querySelector('[data-stopwatch-pause]');
    const btnReset = el.querySelector('[data-stopwatch-reset]');
    const btnLap = el.querySelector('[data-stopwatch-lap]');
    const lapsContainer = el.querySelector('.stopwatch__laps');
    let running = false, interval = null, ms = 0, lastLap = 0;

    function format(ms) {
      const totalSec = Math.floor(ms / 1000);
      const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
      const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
      const s = String(totalSec % 60).padStart(2, '0');
      const cent = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
      if (h !== '00') return `${h}:${m}:${s}.${cent}`;
      return `${m}:${s}.${cent}`;
    }

    function update() {
      display.textContent = format(ms);
    }

    function tick() {
      const start = Date.now() - ms;
      clearInterval(interval);
      interval = setInterval(() => {
        ms = Date.now() - start;
        update();
      }, 10);
    }

    if (btnStart) btnStart.addEventListener('click', () => {
      if (running) return;
      running = true;
      display.classList.add('running');
      tick();
    });

    if (btnPause) btnPause.addEventListener('click', () => {
      if (!running) return;
      running = false;
      display.classList.remove('running');
      clearInterval(interval);
      ms = Date.now() - (Date.now() - ms);
    });

    if (btnReset) btnReset.addEventListener('click', () => {
      running = false;
      display.classList.remove('running');
      clearInterval(interval);
      ms = 0;
      update();
      if (lapsContainer) lapsContainer.innerHTML = '';
    });

    if (btnLap && lapsContainer) btnLap.addEventListener('click', () => {
      if (!running) return;
      const lapMs = ms - lastLap;
      lastLap = ms;
      const lap = document.createElement('div');
      lap.className = 'stopwatch__lap';
      lap.innerHTML = `<span>Круг ${lapsContainer.children.length + 1}</span><span>${format(lapMs)}</span>`;
      lapsContainer.appendChild(lap);
      lapsContainer.scrollTop = lapsContainer.scrollHeight;
    });
  });

  // ========== CLOCK ==========
  document.querySelectorAll('[data-clock]').forEach(el => {
    const timeEl = el.querySelector('.clock__time') || el;
    const dateEl = el.querySelector('.clock__date');
    function tickClock() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      timeEl.textContent = `${h}:${m}:${s}`;
      if (dateEl) {
        const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('ru-RU', opts);
      }
    }
    tickClock();
    setInterval(tickClock, 1000);
  });

  // ========== CALENDAR ==========
  document.querySelectorAll('[data-calendar]').forEach(el => {
    const titleEl = el.querySelector('.calendar__title');
    const daysEl = el.querySelector('.calendar__days');
    const btnPrev = el.querySelector('[data-calendar-prev]');
    const btnNext = el.querySelector('[data-calendar-next]');
    const now = new Date();
    let year = now.getFullYear(), month = now.getMonth();

    function render() {
      const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
      const today = new Date();
      if (titleEl) titleEl.textContent = `${months[month]} ${year}`;
      if (!daysEl) return;
      daysEl.innerHTML = '';
      const first = new Date(year, month, 1).getDay();
      const off = first === 0 ? 6 : first - 1;
      const last = new Date(year, month + 1, 0).getDate();
      const prevLast = new Date(year, month, 0).getDate();
      for (let i = off - 1; i >= 0; i--) {
        const d = document.createElement('button');
        d.className = 'calendar__day calendar__day--other';
        d.textContent = prevLast - i;
        d.type = 'button';
        d.disabled = true;
        daysEl.appendChild(d);
      }
      for (let i = 1; i <= last; i++) {
        const d = document.createElement('button');
        d.className = 'calendar__day';
        d.textContent = i;
        d.type = 'button';
        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
          d.classList.add('calendar__day--today');
        }
        d.addEventListener('click', () => {
          daysEl.querySelectorAll('.calendar__day--selected').forEach(el => el.classList.remove('calendar__day--selected'));
          d.classList.add('calendar__day--selected');
        });
        daysEl.appendChild(d);
      }
      const totalCells = off + last;
      const rem = (7 - totalCells % 7) % 7;
      for (let i = 1; i <= rem; i++) {
        const d = document.createElement('button');
        d.className = 'calendar__day calendar__day--other';
        d.textContent = i;
        d.type = 'button';
        d.disabled = true;
        daysEl.appendChild(d);
      }
    }

    if (btnPrev) btnPrev.addEventListener('click', () => { month--; if (month < 0) { month = 11; year--; } render(); });
    if (btnNext) btnNext.addEventListener('click', () => { month++; if (month > 11) { month = 0; year++; } render(); });
    render();
  });

  console.log('✦ Photon Kit initialized');
})();
