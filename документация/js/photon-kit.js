/* https://github.com/alievkirill307-bot/Photon */
/* https://github.com/alievkirill307-bot/Photon/blob/master/LICENSE */
/* ==============================================
   PHOTON KIT — Unified CSS Framework
   Adaptive Dark/Light Theme · Glass UI
   Inspired by: Chota, Picnic, Siimple, Spectre, Wing,Bootstrap
   ============================================== */
(function () {
  'use strict';

  // ========== NAVBAR TOGGLE (responsive) ==========
  document.querySelectorAll('.navbar__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const menu = btn.nextElementSibling;
      const target = btn.getAttribute('data-navbar-target');
      const menuEl = target ? document.querySelector(target) : (menu && menu.classList.contains('navbar__menu') ? menu : null);
      if (menuEl) {
        menuEl.classList.toggle('open');
        btn.classList.toggle('open');
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

  // ========== BACK TO TOP ==========
  document.querySelectorAll('.back-to-top').forEach(btn => {
    const showAt = parseInt(btn.dataset.showAt) || 300;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > showAt);
    });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ========== DRAWER ==========
  document.querySelectorAll('[data-drawer]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.getAttribute('data-drawer'));
      if (target) target.classList.toggle('open');
    });
  });
  document.querySelectorAll('[data-drawer-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const drawer = btn.closest('.drawer');
      if (drawer) drawer.classList.remove('open');
    });
  });
  document.querySelectorAll('.drawer-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
      const drawer = overlay.parentElement.querySelector('.drawer');
      if (drawer) drawer.classList.remove('open');
      overlay.classList.remove('open');
    });
  });
  document.querySelectorAll('[data-drawer]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.getAttribute('data-drawer'));
      if (target) {
        const overlay = target.parentElement.querySelector('.drawer-overlay');
        if (overlay) overlay.classList.toggle('open');
      }
    });
  });

  // ========== THEME SWITCHER ==========
  document.querySelectorAll('[data-theme-switch]').forEach(el => {
    const toggle = () => {
      document.body.classList.toggle('theme-dark');
      const isDark = document.body.classList.contains('theme-dark');
      try { localStorage.setItem('photon-theme', isDark ? 'dark' : 'light'); } catch(e) {}
      document.querySelectorAll('[data-theme-switch]').forEach(e => {
        const label = e.querySelector('.theme-switch__label');
        if (label) label.textContent = isDark ? 'Тёмная' : 'Светлая';
      });
    };
    el.addEventListener('click', toggle);
  });
  (function initTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    document.querySelectorAll('[data-theme-switch] .theme-switch__label').forEach(l => l.textContent = isDark ? 'Тёмная' : 'Светлая');
  })();

  // ========== FORM VALIDATION ==========
  document.querySelectorAll('form.pk-form').forEach(form => {
    const submitBtn = form.querySelector('.pk-form-submit');
    const successEl = form.querySelector('.pk-form-success');
    if (!submitBtn) return;

    function validateField(field) {
      const rules = (field.getAttribute('data-validate') || '').split(/\s+/).filter(Boolean);
      const errorEl = field.closest('.form-group').querySelector('.form-hint--error');
      let isValid = true;
      let msg = '';

      if (rules.includes('required')) {
        if (field.type === 'checkbox' && !field.checked) {
          isValid = false; msg = 'Это поле обязательно';
        } else if (field.tagName === 'SELECT' && !field.value) {
          isValid = false; msg = 'Выберите значение';
        } else if (field.type !== 'checkbox' && !field.value.trim()) {
          isValid = false; msg = 'Заполните это поле';
        }
      }

      if (rules.includes('email') && field.value.trim()) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(field.value.trim())) {
          isValid = false; msg = 'Введите корректный email';
        }
      }

      const minLen = parseInt(field.getAttribute('data-validate-length'));
      if (!isNaN(minLen) && field.value.trim().length < minLen) {
        isValid = false; msg = `Минимум ${minLen} символа`;
      }

      if (rules.includes('match') && field.value.trim()) {
        const matchName = field.getAttribute('data-match-field');
        const formGroup = field.closest('.form-group');
        const allInputs = form.closest('form').querySelectorAll('input');
        let matchVal = '';
        allInputs.forEach(inp => {
          const label = inp.closest('.form-group');
          if (label && label.querySelector('.form-label') && label.querySelector('.form-label').textContent.trim() === matchName) {
            matchVal = inp.value;
          }
        });
        if (field.value !== matchVal) {
          isValid = false; msg = 'Пароли не совпадают';
        }
      }

      if (field.type === 'radio' && rules.includes('required')) {
        const name = field.getAttribute('name');
        const checked = form.querySelector(`input[name="${name}"]:checked`);
        if (!checked) {
          isValid = false; msg = 'Выберите один вариант';
        }
      }

      field.classList.toggle('input--success', isValid && field.value.trim());
      field.classList.toggle('input--error', !isValid);
      if (errorEl) {
        errorEl.textContent = msg;
        errorEl.style.display = msg ? 'block' : 'none';
      }
      return isValid;
    }

    function validateForm() {
      let allValid = true;
      form.querySelectorAll('[data-validate]').forEach(field => {
        if (!validateField(field)) allValid = false;
      });
      return allValid;
    }

    form.querySelectorAll('[data-validate]').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('input--error')) validateField(field);
      });
      if (field.type === 'radio') {
        field.addEventListener('change', () => {
          const name = field.getAttribute('name');
          form.querySelectorAll(`input[name="${name}"]`).forEach(r => validateField(r));
        });
      }
    });

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (validateForm()) {
        if (successEl) {
          successEl.style.display = 'block';
          setTimeout(() => { successEl.style.display = 'none'; }, 4000);
        }
        form.querySelectorAll('[data-validate]').forEach(f => {
          f.classList.remove('input--success', 'input--error');
          const hint = f.closest('.form-group').querySelector('.form-hint--error');
          if (hint) { hint.textContent = ''; hint.style.display = 'none'; }
        });
      }
    });
  });

  // ========== FILE UPLOAD ==========
  function formatSize(bytes) {
    if (!bytes) return '0 Б';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' КБ';
    return (kb / 1024).toFixed(1) + ' МБ';
  }

  document.querySelectorAll('.pk-upload').forEach(upload => {
    const btn = upload.querySelector('.pk-upload-btn');
    const input = upload.querySelector('.pk-upload-input');
    const nameEl = upload.querySelector('.pk-upload-name');
    const previewEl = upload.querySelector('.pk-upload-preview');
    const clearBtn = upload.querySelector('.pk-upload-clear');
    const sizeEl = upload.querySelector('.pk-upload-size');
    const isMultiple = upload.classList.contains('pk-upload--multiple');
    const listEl = upload.querySelector('.pk-upload-list');
    const countEl = upload.querySelector('.pk-upload-count');
    const avatarBox = upload.querySelector('.pk-upload-avatar');
    const avatarImg = upload.querySelector('.pk-upload-avatar-img');
    const avatarPlaceholder = upload.querySelector('.pk-upload-avatar-placeholder');
    const dropzone = upload.querySelector('.pk-upload-dropzone');

    function handleFiles(files) {
      if (!files || !files.length) return;

      if (isMultiple && listEl) {
        listEl.innerHTML = '';
        Array.from(files).forEach(f => {
          const item = document.createElement('div');
          item.className = 'pk-upload-list-item';
          item.style.cssText = 'display:flex;align-items:center;gap:0.6rem;padding:0.5rem 0.75rem;background:var(--pk-bg-alt);border-radius:var(--pk-radius-xs);border:1px solid var(--pk-border);';
          const ext = f.name.split('.').pop().toUpperCase();
          item.innerHTML = `
            <span style="width:28px;height:28px;border-radius:6px;background:var(--pk-primary-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:0.65rem;font-weight:600;">${ext}</span>
            <span style="flex:1;font-size:0.82rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${f.name}</span>
            <span style="font-size:0.72rem;color:var(--pk-text-muted);flex-shrink:0;">${formatSize(f.size)}</span>
            <button type="button" class="pk-upload-list-remove btn btn--ghost btn--sm" style="color:var(--pk-error);font-size:1rem;padding:0.1rem 0.3rem;">✕</button>
          `;
          item.querySelector('.pk-upload-list-remove').addEventListener('click', () => item.remove());
          listEl.appendChild(item);
        });
        if (countEl) countEl.textContent = files.length;
        if (nameEl) nameEl.textContent = `${files.length} файл(ов)`;
        return;
      }

      const file = files[0];
      if (!file) return;

      if (previewEl) previewEl.style.display = 'block';
      if (nameEl) nameEl.textContent = file.name;
      if (sizeEl) sizeEl.textContent = formatSize(file.size);

      if (avatarBox && avatarImg && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          avatarImg.src = e.target.result;
          avatarImg.style.display = 'block';
          if (avatarPlaceholder) avatarPlaceholder.style.display = 'none';
          avatarBox.style.borderStyle = 'solid';
          avatarBox.style.borderColor = 'var(--pk-primary)';
        };
        reader.readAsDataURL(file);
        if (nameEl) nameEl.textContent = file.name;
      }

      if (dropzone && file) {
        dropzone.style.borderColor = 'var(--pk-success)';
        dropzone.style.background = 'rgba(50,182,67,0.05)';
        setTimeout(() => {
          dropzone.style.borderColor = '';
          dropzone.style.background = '';
        }, 2000);
      }
    }

    if (btn && input) {
      btn.addEventListener('click', () => input.click());
    }

    if (input) {
      input.addEventListener('change', () => {
        handleFiles(input.files);
        input.value = '';
      });
    }

    if (clearBtn && previewEl) {
      clearBtn.addEventListener('click', () => {
        previewEl.style.display = 'none';
        if (nameEl) nameEl.textContent = '';
        if (sizeEl) sizeEl.textContent = '';
        if (avatarImg) { avatarImg.style.display = 'none'; avatarImg.src = ''; }
        if (avatarPlaceholder) avatarPlaceholder.style.display = 'block';
        if (avatarBox) { avatarBox.style.borderStyle = 'dashed'; avatarBox.style.borderColor = ''; }
      });
    }

    if (dropzone) {
      ['dragenter', 'dragover'].forEach(ev => {
        dropzone.addEventListener(ev, (e) => {
          e.preventDefault();
          dropzone.style.borderColor = 'var(--pk-primary)';
          dropzone.style.background = 'rgba(87,85,217,0.05)';
        });
      });
      ['dragleave', 'drop'].forEach(ev => {
        dropzone.addEventListener(ev, (e) => {
          e.preventDefault();
          dropzone.style.borderColor = '';
          dropzone.style.background = '';
        });
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          handleFiles(e.dataTransfer.files);
        }
      });
      dropzone.addEventListener('click', () => {
        if (input) input.click();
      });
    }
  });

  // ========== LIGHTBOX / GALLERY ==========
  (function initLightbox() {
    var lb = document.querySelector('.pk-lightbox');
    if (!lb) {
      var div = document.createElement('div');
      div.className = 'pk-lightbox';
      div.innerHTML =
        '<button class="pk-lightbox__close" type="button">✕</button>' +
        '<div class="pk-lightbox__content">' +
          '<div class="pk-lightbox__visual"></div>' +
          '<div class="pk-lightbox__caption">' +
            '<div class="pk-lightbox__title"></div>' +
            '<div class="pk-lightbox__desc"></div>' +
          '</div>' +
        '</div>' +
        '<button class="pk-lightbox__nav pk-lightbox__prev" type="button">&lsaquo;</button>' +
        '<button class="pk-lightbox__nav pk-lightbox__next" type="button">&rsaquo;</button>';
      document.body.appendChild(div);
      lb = div;
    }
    var lbVis = lb.querySelector('.pk-lightbox__visual');
    var lbTitle = lb.querySelector('.pk-lightbox__title');
    var lbDesc = lb.querySelector('.pk-lightbox__desc');
    var lbClose = lb.querySelector('.pk-lightbox__close');
    var lbPrev = lb.querySelector('.pk-lightbox__prev');
    var lbNext = lb.querySelector('.pk-lightbox__next');
    var items = [], cur = 0;

    document.querySelectorAll('.pk-gallery .pk-gallery-item').forEach(function(el, i) {
      items.push(el);
      el.addEventListener('click', function() {
        cur = items.indexOf(el);
        var img = el.querySelector('img');
        lbVis.innerHTML = '';
        if (img) {
          var c = img.cloneNode(true);
          c.style.cssText = 'max-width:70vw;max-height:60vh;object-fit:contain;border-radius:8px;display:block;margin:auto;';
          lbVis.appendChild(c);
        } else {
          var txt = el.innerHTML.replace(/<div[^>]*>.*?<\/div>/g, '').trim();
          if (txt && txt.length > 2) {
            lbVis.textContent = txt;
          } else {
            lbVis.textContent = '📷';
          }
        }
        lbTitle.textContent = el.getAttribute('data-title') || '';
        lbDesc.textContent = el.getAttribute('data-desc') || '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLB() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    function prevLB() { cur = (cur - 1 + items.length) % items.length; if (items[cur]) items[cur].click(); }
    function nextLB() { cur = (cur + 1) % items.length; if (items[cur]) items[cur].click(); }

    if (lbClose) lbClose.addEventListener('click', closeLB);
    if (lbPrev) lbPrev.addEventListener('click', prevLB);
    if (lbNext) lbNext.addEventListener('click', nextLB);
    lb.addEventListener('click', function(e) { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', function(e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') prevLB();
      if (e.key === 'ArrowRight') nextLB();
    });
  })();

  // ========== PHOTON-TW UTILITY ENGINE (pt-*) ==========
  (function initPT() {
    var colors = {
      white: '#fff', black: '#000', transparent: 'transparent', current: 'currentColor',
      primary:   { 50:'#f0eeff',100:'#ddd8f0',200:'#b8b0e6',300:'#9388dc',400:'#7568d0',500:'#5755d9',600:'#4a48c5',700:'#3d3a9e',800:'#2f2c7a',900:'#221f56' },
      success:   { 50:'#e6f9ed',100:'#c2f0d4',200:'#99e6b8',300:'#6ddb9a',400:'#45d07e',500:'#32b643',600:'#289e38',700:'#1f7a2c',800:'#165a20',900:'#0d3c15' },
      warning:   { 50:'#fff8e6',100:'#ffeebb',200:'#ffe38f',300:'#ffd85f',400:'#ffce32',500:'#ffb700',600:'#e0a000',700:'#b37e00',800:'#865f00',900:'#594000' },
      error:     { 50:'#fce8e6',100:'#f9c5c2',200:'#f59e99',300:'#f17870',400:'#ed4f47',500:'#e8563c',600:'#cc462e',700:'#a23724',800:'#7a291b',900:'#521b11' },
      gray:      { 50:'#f8f9fa',100:'#f1f3f5',200:'#e9ecef',300:'#dee2e6',400:'#ced4da',500:'#adb5bd',600:'#868e96',700:'#495057',800:'#343a40',900:'#212529' },
      slate:     { 50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',300:'#cbd5e1',400:'#94a3b8',500:'#64748b',600:'#475569',700:'#334155',800:'#1e293b',900:'#0f172a' },
      red:       { 50:'#fef2f2',100:'#fee2e2',200:'#fecaca',300:'#fca5a5',400:'#f87171',500:'#ef4444',600:'#dc2626',700:'#b91c1c',800:'#991b1b',900:'#7f1d1d' },
      orange:    { 50:'#fff7ed',100:'#ffedd5',200:'#fed7aa',300:'#fdba74',400:'#fb923c',500:'#f97316',600:'#ea580c',700:'#c2410c',800:'#9a3412',900:'#7c2d12' },
      yellow:    { 50:'#fefce8',100:'#fef9c3',200:'#fef08a',300:'#fde047',400:'#facc15',500:'#eab308',600:'#ca8a04',700:'#a16207',800:'#854d0e',900:'#713f12' },
      green:     { 50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d' },
      teal:      { 50:'#f0fdfa',100:'#ccfbf1',200:'#99f6e4',300:'#5eead4',400:'#2dd4bf',500:'#14b8a6',600:'#0d9488',700:'#0f766e',800:'#115e59',900:'#134e4a' },
      cyan:      { 50:'#ecfeff',100:'#cffafe',200:'#a5f3fc',300:'#67e8f9',400:'#22d3ee',500:'#06b6d4',600:'#0891b2',700:'#0e7490',800:'#155e75',900:'#164e63' },
      sky:       { 50:'#f0f9ff',100:'#e0f2fe',200:'#bae6fd',300:'#7dd3fc',400:'#38bdf8',500:'#0ea5e9',600:'#0284c7',700:'#0369a1',800:'#075985',900:'#0c4a6e' },
      blue:      { 50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8',800:'#1e40af',900:'#1e3a8a' },
      indigo:    { 50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81' },
      purple:    { 50:'#faf5ff',100:'#f3e8ff',200:'#e9d5ff',300:'#d8b4fe',400:'#c084fc',500:'#a855f7',600:'#9333ea',700:'#7e22ce',800:'#6b21a8',900:'#581c87' },
      pink:      { 50:'#fdf2f8',100:'#fce7f3',200:'#fbcfe8',300:'#f9a8d4',400:'#f472b6',500:'#ec4899',600:'#db2777',700:'#be185d',800:'#9d174d',900:'#831843' },
      rose:      { 50:'#fff1f2',100:'#ffe4e6',200:'#fecdd3',300:'#fda4af',400:'#fb7185',500:'#f43f5e',600:'#e11d48',700:'#be123c',800:'#9f1239',900:'#881337' }
    };
    var sizes = { 0:'0',0.5:'0.125rem',1:'0.25rem',1.5:'0.375rem',2:'0.5rem',2.5:'0.625rem',3:'0.75rem',4:'1rem',5:'1.25rem',6:'1.5rem',8:'2rem',10:'2.5rem',12:'3rem',14:'3.5rem',16:'4rem',20:'5rem',24:'6rem',28:'7rem',32:'8rem',36:'9rem',40:'10rem',44:'11rem',48:'12rem',52:'13rem',56:'14rem',60:'15rem',64:'16rem',72:'18rem',80:'20rem',96:'24rem' };
    var fontSizes = { xs:'0.75rem',sm:'0.875rem',base:'1rem',lg:'1.125rem',xl:'1.25rem','2xl':'1.5rem','3xl':'1.875rem','4xl':'2.25rem','5xl':'3rem','6xl':'3.75rem','7xl':'4.5rem' };
    var fontWeights = { thin:'100',extralight:'200',light:'300',normal:'400',medium:'500',semibold:'600',bold:'700',extrabold:'800',black:'900' };
    var lineHeights = { none:'1',tight:'1.25',snug:'1.375',normal:'1.5',relaxed:'1.625',loose:'2' };
    var trackings = { tighter:'-0.05em',tight:'-0.025em',normal:'0',wide:'0.025em',wider:'0.05em',widest:'0.1em' };
    var roundedMap = { none:'0',sm:'0.125rem',base:'0.25rem',md:'0.375rem',lg:'0.5rem',xl:'0.75rem','2xl':'1rem','3xl':'1.5rem',full:'9999px' };
    var shadowMap = { sm:'0 1px 2px rgba(0,0,0,0.05)',md:'0 4px 6px rgba(0,0,0,0.07)',lg:'0 10px 15px rgba(0,0,0,0.08)',xl:'0 20px 25px rgba(0,0,0,0.1)','2xl':'0 25px 50px rgba(0,0,0,0.15)',inner:'inset 0 2px 4px rgba(0,0,0,0.05)' };
    var maxWidths = { xs:'20rem',sm:'24rem',md:'28rem',lg:'32rem',xl:'36rem','2xl':'42rem','3xl':'48rem','4xl':'56rem','5xl':'64rem','6xl':'72rem','7xl':'80rem' };
    var zIndexMap = { 0:'0',10:'10',20:'20',30:'30',40:'40',50:'50' };
    var cursors = { default:'default',pointer:'pointer',wait:'wait',text:'text',move:'move','not-allowed':'not-allowed',grab:'grab',help:'help','zoom-in':'zoom-in' };

    var style = document.createElement('style');
    style.id = 'pt-styles';
    document.head.appendChild(style);
    var sheet = style.sheet || style.styleSheet;
    var cache = {};

    function addRule(sel, css) { try { if (sheet.insertRule) sheet.insertRule(sel+'{'+css+'}', sheet.cssRules.length); else if (sheet.addRule) sheet.addRule(sel, css); } catch(e) {} }

    function getColor(name, shade) {
      if (colors[name]) {
        if (shade !== undefined && typeof colors[name] === 'object') return colors[name][shade];
        if (typeof colors[name] === 'string') return colors[name];
        return colors[name][500];
      }
      return null;
    }

    function getSize(n) { return sizes[n] !== undefined ? sizes[n] : (n === 'auto' ? 'auto' : (!isNaN(parseFloat(n)) ? n+'px' : null)); }
    function getNum(n) { var x=parseFloat(n); return isNaN(x) ? null : x; }

    var textAligns = { left:'left',center:'center',right:'right',justify:'justify' };
    var displays = { flex:'flex',grid:'grid','inline-flex':'inline-flex','inline-block':'inline-block',inline:'inline',block:'block',hidden:'none' };
    var positions = { static:'static',fixed:'fixed',absolute:'absolute',relative:'relative',sticky:'sticky' };
    var overflows = { visible:'visible',hidden:'hidden',scroll:'scroll',auto:'auto' };
    var objFits = { contain:'contain',cover:'cover',fill:'fill',none:'none','scale-down':'scale-down' };
    var objPos = { top:'top',center:'center',bottom:'bottom',left:'left',right:'right' };
    var whitespaceMap = { normal:'normal',nowrap:'nowrap',pre:'pre','pre-line':'pre-line','pre-wrap':'pre-wrap' };
    var borderStyles = { solid:'solid',dashed:'dashed',dotted:'dotted',double:'double',none:'none' };
    var transProps = { none:'none',all:'all',colors:'background-color,color,border-color',opacity:'opacity',shadow:'box-shadow',transform:'transform' };
    var durations = { 75:'75ms',100:'100ms',150:'150ms',200:'200ms',300:'300ms',500:'500ms',700:'700ms',1000:'1000ms' };
    var timingFns = { linear:'linear',in:'ease-in',out:'ease-out','in-out':'ease-in-out' };

    function parseClass(cls, mod) {
      if (cls.indexOf('pt-') !== 0) return null;
      var rest = cls.slice(3);
      if (!rest) return null;

      var result = { sel: cls, css: '' };
      if (mod) result.sel = mod + '.' + cls;

      // Display utilities
      if (displays[rest] !== undefined) { result.css = 'display:' + displays[rest]; return result; }
      // Position
      if (positions[rest] !== undefined) { result.css = 'position:' + positions[rest]; return result; }
      // Visibility
      if (rest === 'visible') { result.css = 'visibility:visible'; return result; }
      if (rest === 'invisible') { result.css = 'visibility:hidden'; return result; }

      // Flex direction
      if (rest === 'flex-col') { result.css = 'flex-direction:column'; return result; }
      if (rest === 'flex-row') { result.css = 'flex-direction:row'; return result; }
      if (rest === 'flex-wrap') { result.css = 'flex-wrap:wrap'; return result; }
      if (rest === 'flex-nowrap') { result.css = 'flex-wrap:nowrap'; return result; }
      if (rest === 'flex-col-reverse') { result.css = 'flex-direction:column-reverse'; return result; }
      if (rest === 'flex-row-reverse') { result.css = 'flex-direction:row-reverse'; return result; }
      if (rest === 'flex-wrap-reverse') { result.css = 'flex-wrap:wrap-reverse'; return result; }

      // Flex sizing
      if (rest === 'flex-1') { result.css = 'flex:1 1 0%'; return result; }
      if (rest === 'flex-auto') { result.css = 'flex:1 1 auto'; return result; }
      if (rest === 'flex-initial') { result.css = 'flex:0 1 auto'; return result; }
      if (rest === 'flex-none') { result.css = 'flex:none'; return result; }
      if (rest === 'grow') { result.css = 'flex-grow:1'; return result; }
      if (rest === 'grow-0') { result.css = 'flex-grow:0'; return result; }
      if (rest === 'shrink') { result.css = 'flex-shrink:1'; return result; }
      if (rest === 'shrink-0') { result.css = 'flex-shrink:0'; return result; }

      // Typography: italic, not-italic
      if (rest === 'italic') { result.css = 'font-style:italic'; return result; }
      if (rest === 'not-italic') { result.css = 'font-style:normal'; return result; }
      // Text transform
      if (rest === 'uppercase') { result.css = 'text-transform:uppercase'; return result; }
      if (rest === 'lowercase') { result.css = 'text-transform:lowercase'; return result; }
      if (rest === 'capitalize') { result.css = 'text-transform:capitalize'; return result; }
      if (rest === 'normal-case') { result.css = 'text-transform:none'; return result; }
      // Truncate
      if (rest === 'truncate') { result.css = 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap'; return result; }
      // List style
      if (rest === 'list-none') { result.css = 'list-style:none'; return result; }
      if (rest === 'list-disc') { result.css = 'list-style:disc'; return result; }
      if (rest === 'list-decimal') { result.css = 'list-style:decimal'; return result; }
      // Whitespace
      if (rest.indexOf('whitespace-') === 0) { var v=rest.slice(11); if (whitespaceMap[v]!==undefined) { result.css='white-space:'+whitespaceMap[v]; return result; } }
      // Appearance
      if (rest === 'appearance-none') { result.css = 'appearance:none;-webkit-appearance:none'; return result; }
      // pointer-events
      if (rest === 'pointer-events-none') { result.css = 'pointer-events:none'; return result; }
      if (rest === 'pointer-events-auto') { result.css = 'pointer-events:auto'; return result; }
      // select
      if (rest === 'select-none') { result.css = 'user-select:none'; return result; }
      if (rest === 'select-all') { result.css = 'user-select:all'; return result; }
      if (rest === 'select-text') { result.css = 'user-select:text'; return result; }
      if (rest === 'select-auto') { result.css = 'user-select:auto'; return result; }
      // sr-only
      if (rest === 'sr-only') { result.css='position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0'; return result; }
      // float
      if (rest === 'float-left') { result.css='float:left'; return result; }
      if (rest === 'float-right') { result.css='float:right'; return result; }
      if (rest === 'float-none') { result.css='float:none'; return result; }
      // clearfix
      if (rest === 'clearfix') { result.css='&::after{display:table;clear:both;content:\"\"}'; return result; }

      // ===== PREFIX PATTERNS =====

      // items-{alignment}
      if (rest.indexOf('items-') === 0) {
        var v = rest.slice(6);
        var map = { start:'flex-start',center:'center',end:'flex-end',baseline:'baseline',stretch:'stretch' };
        if (map[v] !== undefined) { result.css = 'align-items:' + map[v]; return result; }
      }
      // justify-{alignment}
      if (rest.indexOf('justify-') === 0) {
        var v = rest.slice(8);
        var map = { start:'flex-start',center:'center',end:'flex-end',between:'space-between',around:'space-around',evenly:'space-evenly' };
        if (map[v] !== undefined) { result.css = 'justify-content:' + map[v]; return result; }
      }
      // content-{alignment}
      if (rest.indexOf('content-') === 0) {
        var v = rest.slice(8);
        var map = { start:'flex-start',center:'center',end:'flex-end',between:'space-between',around:'space-around' };
        if (map[v] !== undefined) { result.css = 'align-content:' + map[v]; return result; }
      }
      // self-{alignment}
      if (rest.indexOf('self-') === 0) {
        var v = rest.slice(5);
        var map = { auto:'auto',start:'flex-start',center:'center',end:'flex-end',stretch:'stretch' };
        if (map[v] !== undefined) { result.css = 'align-self:' + map[v]; return result; }
      }

      // gap-{size}, gap-x-{size}, gap-y-{size}
      if (rest.indexOf('gap-x-') === 0) { var s = rest.slice(6); var sz = getSize(s); if (sz !== null) { result.css = 'column-gap:' + sz; return result; } }
      if (rest.indexOf('gap-y-') === 0) { var s = rest.slice(6); var sz = getSize(s); if (sz !== null) { result.css = 'row-gap:' + sz; return result; } }
      if (rest.indexOf('gap-') === 0) { var s = rest.slice(4); var sz = getSize(s); if (sz !== null) { result.css = 'gap:' + sz; return result; } }

      // grid-cols-{n}
      if (rest.indexOf('grid-cols-') === 0) { var n = rest.slice(10); var num = parseInt(n); if (num > 0 && num < 13) { result.css = 'grid-template-columns:repeat(' + num + ',1fr)'; return result; } }
      // col-span-{n}
      if (rest.indexOf('col-span-') === 0) { var n = rest.slice(9); var num = parseInt(n); if (num > 0 && num < 13) { result.css = 'grid-column:span ' + num + '/span ' + num; return result; } }
      // row-span-{n}
      if (rest.indexOf('row-span-') === 0) { var n = rest.slice(9); var num = parseInt(n); if (num > 0 && num < 13) { result.css = 'grid-row:span ' + num + '/span ' + num; return result; } }

      // order-{n/first/last/none}
      if (rest.indexOf('order-') === 0) {
        var v = rest.slice(6);
        if (v === 'first') { result.css = 'order:-9999'; return result; }
        if (v === 'last') { result.css = 'order:9999'; return result; }
        if (v === 'none') { result.css = 'order:0'; return result; }
        var num = parseInt(v);
        if (!isNaN(num) && num >= 0 && num < 13) { result.css = 'order:' + num; return result; }
      }

      // Padding
      function padDir(dir, rest) {
        var prefix = 'p' + (dir || '');
        var map = {};
        if (rest.indexOf(prefix + '-') === 0) {
          var s = rest.slice(prefix.length + 1);
          if (s === 'px') { return 'padding' + (dir ? '-' + dir : '') + ':1px'; }
          var sz = getSize(s);
          if (sz !== null) return 'padding' + (dir ? '-' + dir : '') + ':' + sz;
        }
        return null;
      }
      var pDirs = { 'p': '', 'px': 'left;padding-right', 'py': 'top;padding-bottom' };
      // Actually let me handle padding/margin manually for clarity

      // Padding - p, px, py, pt, pr, pb, pl
      var pMatch = rest.match(/^p([xytblr]?)-(.+)$/);
      if (pMatch) {
        var side = pMatch[1];
        var val = pMatch[2];
        if (val === 'px') { result.css = side ? 'padding-' + side + ':1px' : 'padding:1px'; return result; }
        var sz = getSize(val);
        if (sz !== null) {
          var map = { '':'padding', 'x':'padding-left;padding-right', 'y':'padding-top;padding-bottom', 't':'padding-top', 'b':'padding-bottom', 'l':'padding-left', 'r':'padding-right' };
          var prop = map[side] || 'padding-' + side;
          result.css = prop + ':' + sz;
          if (prop.indexOf(';') > -1) result.css = prop.replace(';', ':' + sz + ';') + ':' + sz;
          return result;
        }
      }

      // Margin - m, mx, my, mt, mr, mb, ml
      var mMatch = rest.match(/^m([xytblr]?)-(.+)$/);
      if (mMatch) {
        var side = mMatch[1];
        var val = mMatch[2];
        if (val === 'auto') { 
          if (!side) { result.css = 'margin:auto'; return result; }
          if (side === 'x') { result.css = 'margin-left:auto;margin-right:auto'; return result; }
          if (side === 'y') { result.css = 'margin-top:auto;margin-bottom:auto'; return result; }
          result.css = 'margin-' + side + ':auto'; return result;
        }
        if (val === 'px') { result.css = side ? 'margin-' + side + ':1px' : 'margin:1px'; return result; }
        var sz = getSize(val);
        if (sz !== null) {
          var map = { '':'margin', 'x':'margin-left;margin-right', 'y':'margin-top;margin-bottom', 't':'margin-top', 'b':'margin-bottom', 'l':'margin-left', 'r':'margin-right' };
          var prop = map[side] || 'margin-' + side;
          if (prop.indexOf(';') > -1) result.css = prop.replace(';', ':' + sz + ';') + ':' + sz;
          else result.css = prop + ':' + sz;
          return result;
        }
      }

      // width/height
      if (rest.indexOf('w-') === 0) {
        var v = rest.slice(2);
        if (v === 'auto') { result.css='width:auto'; return result; }
        if (v === 'full') { result.css='width:100%'; return result; }
        if (v === 'screen') { result.css='width:100vw'; return result; }
        if (v === 'min') { result.css='width:min-content'; return result; }
        if (v === 'max') { result.css='width:max-content'; return result; }
        if (v === 'fit') { result.css='width:fit-content'; return result; }
        var sz = getSize(v);
        if (sz !== null) { result.css='width:'+sz; return result; }
        var pct = parseFloat(v);
        if (!isNaN(pct)) { result.css='width:'+pct+'%'; return result; }
      }
      if (rest.indexOf('h-') === 0) {
        var v = rest.slice(2);
        if (v === 'auto') { result.css='height:auto'; return result; }
        if (v === 'full') { result.css='height:100%'; return result; }
        if (v === 'screen') { result.css='height:100vh'; return result; }
        if (v === 'min') { result.css='height:min-content'; return result; }
        if (v === 'max') { result.css='height:max-content'; return result; }
        if (v === 'fit') { result.css='height:fit-content'; return result; }
        var sz = getSize(v);
        if (sz !== null) { result.css='height:'+sz; return result; }
        var pct = parseFloat(v);
        if (!isNaN(pct)) { result.css='height:'+pct+'%'; return result; }
      }

      // min-w, min-h, max-w, max-h
      if (rest.indexOf('min-w-') === 0) { var v=rest.slice(6); if(v==='full'){result.css='min-width:100%';return result;} if(v==='screen'){result.css='min-width:100vw';return result;} var sz=getSize(v);if(sz!==null){result.css='min-width:'+sz;return result;} }
      if (rest.indexOf('min-h-') === 0) { var v=rest.slice(6); if(v==='full'){result.css='min-height:100%';return result;} if(v==='screen'){result.css='min-height:100vh';return result;} var sz=getSize(v);if(sz!==null){result.css='min-height:'+sz;return result;} }
      if (rest.indexOf('max-w-') === 0) { var v=rest.slice(6); if(v==='none'){result.css='max-width:none';return result;} if(v==='full'){result.css='max-width:100%';return result;} if(v==='screen'){result.css='max-width:100vw';return result;} if(maxWidths[v]!==undefined){result.css='max-width:'+maxWidths[v];return result;} var sz=getSize(v);if(sz!==null){result.css='max-width:'+sz;return result;} }
      if (rest.indexOf('max-h-') === 0) { var v=rest.slice(6); if(v==='none'){result.css='max-height:none';return result;} if(v==='full'){result.css='max-height:100%';return result;} if(v==='screen'){result.css='max-height:100vh';return result;} var sz=getSize(v);if(sz!==null){result.css='max-height:'+sz;return result;} }

      // Text alignment
      if (rest.indexOf('text-') === 0) {
        var v = rest.slice(5);
        // Check text-align first
        if (textAligns[v] !== undefined) { result.css = 'text-align:' + textAligns[v]; return result; }
        // Check font sizes
        if (fontSizes[v] !== undefined) { result.css = 'font-size:' + fontSizes[v]; return result; }
        // Check color (name without shade)
        var c = getColor(v);
        if (c !== null) { result.css = 'color:' + c; return result; }
        // Check color-shade
        var m = v.match(/^([a-z]+)-(\d+)$/);
        if (m) { c = getColor(m[1], parseInt(m[2])); if (c) { result.css='color:'+c; return result; } }
        // Check color with three-digit shade (50-900)
      }

      // Font weight
      if (rest.indexOf('font-') === 0) {
        var v = rest.slice(5);
        if (fontWeights[v] !== undefined) { result.css = 'font-weight:' + fontWeights[v]; return result; }
      }

      // Leading (line-height)
      if (rest.indexOf('leading-') === 0) {
        var v = rest.slice(8);
        if (lineHeights[v] !== undefined) { result.css = 'line-height:' + lineHeights[v]; return result; }
      }

      // Tracking (letter-spacing)
      if (rest.indexOf('tracking-') === 0) {
        var v = rest.slice(9);
        if (trackings[v] !== undefined) { result.css = 'letter-spacing:' + trackings[v]; return result; }
      }

      // Background
      if (rest.indexOf('bg-') === 0) {
        var v = rest.slice(3);
        // Named color
        var c = getColor(v);
        if (c !== null) { result.css = 'background-color:' + c; return result; }
        // color-shade
        var m = v.match(/^([a-z]+)-(\d+)$/);
        if (m) { c = getColor(m[1], parseInt(m[2])); if (c) { result.css='background-color:'+c; return result; } }
      }

      // Border color
      if (rest.indexOf('border-') === 0) {
        var v = rest.slice(7);
        // Check for border-side patterns: border-t, border-r, border-b, border-l
        if (v === 't') { result.css = 'border-top-width:1px'; return result; }
        if (v === 'r') { result.css = 'border-right-width:1px'; return result; }
        if (v === 'b') { result.css = 'border-bottom-width:1px'; return result; }
        if (v === 'l') { result.css = 'border-left-width:1px'; return result; }
        if (v === 'solid' || v === 'dashed' || v === 'dotted' || v === 'none') { result.css = 'border-style:' + v; return result; }
        if (v === '0' || v === '2' || v === '4' || v === '8') { result.css = 'border-width:' + v + (v==='0'?'':'px'); return result; }
        if (v === 'x') { result.css='border-left-width:1px;border-right-width:1px'; return result; }
        if (v === 'y') { result.css='border-top-width:1px;border-bottom-width:1px'; return result; }
        // Color first (border-{color})
        var c = getColor(v);
        if (c !== null) { result.css = 'border-color:' + c; return result; }
        // color-shade
        var m = v.match(/^([a-z]+)-(\d+)$/);
        if (m) { c = getColor(m[1], parseInt(m[2])); if (c) { result.css='border-color:'+c; return result; } }
      }
      // Plain border
      if (rest === 'border') { result.css = 'border-width:1px'; return result; }

      // Rounded
      if (rest.indexOf('rounded') === 0) {
        if (rest === 'rounded') { result.css = 'border-radius:0.25rem'; return result; }
        var v = rest.slice(8); // after 'rounded'
        if (v === '-t') { result.css='border-radius:0.25rem 0.25rem 0 0'; return result; }
        if (v === '-r') { result.css='border-radius:0 0.25rem 0.25rem 0'; return result; }
        if (v === '-b') { result.css='border-radius:0 0 0.25rem 0.25rem'; return result; }
        if (v === '-l') { result.css='border-radius:0.25rem 0 0 0.25rem'; return result; }
        if (v === '-tl') { result.css='border-top-left-radius:0.25rem'; return result; }
        if (v === '-tr') { result.css='border-top-right-radius:0.25rem'; return result; }
        if (v === '-br') { result.css='border-bottom-right-radius:0.25rem'; return result; }
        if (v === '-bl') { result.css='border-bottom-left-radius:0.25rem'; return result; }
        if (v === '') { result.css = 'border-radius:0.25rem'; return result; }
        if (v.indexOf('-') === 0) {
          var key = v.slice(1);
          if (roundedMap[key] !== undefined) { result.css = 'border-radius:' + roundedMap[key]; return result; }
          // Try directional rounded-{side}-{size}
          var dm = v.match(/^-(t|r|b|l)-(.*)$/);
          if (dm) {
            var dKey = dm[2];
            if (roundedMap[dKey] !== undefined) {
              var dirMap = { t:'top-left;top-right', r:'top-right;bottom-right', b:'bottom-left;bottom-right', l:'top-left;bottom-left' };
              var sides = dirMap[dm[1]].split(';');
              result.css = 'border-' + sides[0] + '-radius:' + roundedMap[dKey] + ';border-' + sides[1] + '-radius:' + roundedMap[dKey];
              return result;
            }
          }
        }
      }

      // Shadow
      if (rest === 'shadow') { result.css = 'box-shadow:0 1px 3px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.06)'; return result; }
      if (rest.indexOf('shadow-') === 0) {
        var v = rest.slice(7);
        if (shadowMap[v] !== undefined) { result.css = 'box-shadow:' + shadowMap[v]; return result; }
        if (v === 'none') { result.css = 'box-shadow:none'; return result; }
      }

      // Opacity
      if (rest.indexOf('opacity-') === 0) {
        var n = parseInt(rest.slice(8));
        if (!isNaN(n) && n >= 0 && n <= 100) { result.css = 'opacity:' + (n / 100); return result; }
      }

      // Z-index
      if (rest.indexOf('z-') === 0) {
        var v = rest.slice(2);
        if (zIndexMap[v] !== undefined) { result.css = 'z-index:' + zIndexMap[v]; return result; }
        var n = parseInt(v);
        if (!isNaN(n)) { result.css = 'z-index:' + n; return result; }
      }

      // Overflow
      if (rest.indexOf('overflow-x-') === 0) { var v=rest.slice(10); if(overflows[v]!==undefined){result.css='overflow-x:'+overflows[v];return result;} }
      if (rest.indexOf('overflow-y-') === 0) { var v=rest.slice(10); if(overflows[v]!==undefined){result.css='overflow-y:'+overflows[v];return result;} }
      if (rest.indexOf('overflow-') === 0) { var v=rest.slice(9); if(overflows[v]!==undefined){result.css='overflow:'+overflows[v];return result;} }

      // Cursor
      if (rest.indexOf('cursor-') === 0) {
        var v = rest.slice(7);
        if (cursors[v] !== undefined) { result.css = 'cursor:' + cursors[v]; return result; }
      }

      // Object fit
      if (rest.indexOf('object-') === 0) {
        var v = rest.slice(7);
        if (objFits[v] !== undefined) { result.css = 'object-fit:' + objFits[v]; return result; }
        if (objPos[v] !== undefined) { result.css = 'object-position:' + objPos[v]; return result; }
      }

      // Inset
      if (rest === 'inset-0') { result.css='top:0;right:0;bottom:0;left:0'; return result; }
      if (rest === 'inset-x-0') { result.css='left:0;right:0'; return result; }
      if (rest === 'inset-y-0') { result.css='top:0;bottom:0'; return result; }
      if (rest === 'top-0') { result.css='top:0'; return result; }
      if (rest === 'right-0') { result.css='right:0'; return result; }
      if (rest === 'bottom-0') { result.css='bottom:0'; return result; }
      if (rest === 'left-0') { result.css='left:0'; return result; }

      // Transition
      if (rest === 'transition') { result.css = 'transition:all 0.2s ease'; return result; }
      if (rest.indexOf('transition-') === 0) {
        var v = rest.slice(11);
        if (transProps[v] !== undefined) {
          if (v === 'none') { result.css = 'transition:none'; return result; }
          result.css = 'transition:' + transProps[v] + ' 0.2s ease'; return result;
        }
      }
      // Duration
      if (rest.indexOf('duration-') === 0) {
        var v = rest.slice(9);
        if (durations[v] !== undefined) { result.css = 'transition-duration:' + durations[v]; return result; }
      }
      // Timing
      if (rest.indexOf('ease-') === 0) {
        var v = rest.slice(5);
        if (v === 'linear') { result.css = 'transition-timing-function:linear'; return result; }
        if (v === 'in') { result.css = 'transition-timing-function:ease-in'; return result; }
        if (v === 'out') { result.css = 'transition-timing-function:ease-out'; return result; }
        if (v === 'in-out') { result.css = 'transition-timing-function:ease-in-out'; return result; }
      }

      return null;
    }

    function generateSelector(cls) {
      return '[class*="' + cls + '"]';
    }

    function scan() {
      var all = document.querySelectorAll('[class*="pt-"]');
      var toAdd = {};
      all.forEach(function(el) {
        var classes = el.className.split(/\s+/);
        classes.forEach(function(cls) {
          if (cls.indexOf('pt-') !== 0) return;
          if (cache[cls]) return;
          // Check modifiers
          var mods = [{ prefix: 'pt-hover:', pseudo: ':hover' }, { prefix: 'pt-focus:', pseudo: ':focus' }, { prefix: 'pt-active:', pseudo: ':active' }, { prefix: 'pt-dark:', pseudo: '.theme-dark &' }, { prefix: 'pt-sm:', pseudo: '@media(min-width:576px)' }, { prefix: 'pt-md:', pseudo: '@media(min-width:768px)' }, { prefix: 'pt-lg:', pseudo: '@media(min-width:992px)' }];
          var processed = false;
          mods.forEach(function(m) {
            if (cls.indexOf(m.prefix) === 0) {
              var base = cls.slice(m.prefix.length);
              if (base.indexOf('pt-') === 0) {
                var result = parseClass(base, m.pseudo);
                if (result && result.css) {
                  if (m.pseudo.indexOf('@media') === 0) {
                    // For media queries, we need a wrapper
                    toAdd['__media__' + m.pseudo + '__' + result.sel] = { media: m.pseudo, sel: '.' + base, css: result.css };
                  } else if (m.pseudo.indexOf('.theme-dark') === 0) {
                    toAdd['.theme-dark .' + base] = result.css;
                  } else {
                    toAdd[base + m.pseudo] = '.' + base + m.pseudo + '{' + result.css + '}';
                  }
                  cache[cls] = true;
                  processed = true;
                }
              }
            }
          });
          if (processed) return;
          var result = parseClass(cls);
          if (result && result.css) {
            toAdd[result.sel] = result.css;
            cache[cls] = true;
          }
        });
      });
      var keys = Object.keys(toAdd);
      keys.forEach(function(key) {
        if (key.indexOf('__media__') === 0) {
          var parts = key.split('__');
          var media = parts[2];
          var sel = parts[3];
          var css = toAdd[key].css;
          try {
            var idx = sheet.cssRules ? sheet.cssRules.length : 0;
            if (sheet.insertRule) sheet.insertRule('@media ' + media + '{.' + sel + '{' + css + '}}', idx);
            else if (sheet.addRule) { sheet.addRule(media + ' { .' + sel, css + ' }'); }
          } catch(e) {}
        } else if (key.indexOf('.theme-dark') === 0) {
          try {
            var rule = key + '{' + toAdd[key] + '}';
            var idx = sheet.cssRules ? sheet.cssRules.length : 0;
            if (sheet.insertRule) sheet.insertRule(rule, idx);
            else if (sheet.addRule) sheet.addRule(key, toAdd[key]);
          } catch(e) {}
        } else {
          addRule('.' + key, toAdd[key]);
        }
      });
    }

    if (document.body) { scan(); } else { document.addEventListener('DOMContentLoaded', scan); }

    if (window.MutationObserver) {
      var obs = new MutationObserver(function() { scan(); });
      if (document.body) obs.observe(document.body, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
      else { document.addEventListener('DOMContentLoaded', function() { obs.observe(document.body, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true }); }); }
    }
  })();

  console.log('✦ Photon Kit initialized');
})();
