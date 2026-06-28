/* ==============================================
   PHOTON KIT — Unified JavaScript
   Apple Liquid Glass · Black/White Adaptive Theme
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
    const saved = (() => { try { return localStorage.getItem('photon-theme'); } catch(e) { return null; } })();
    if (saved === 'dark' || (!saved && document.body.classList.contains('theme-dark'))) {
      document.body.classList.add('theme-dark');
      document.querySelectorAll('[data-theme-switch] .theme-switch__label').forEach(l => l.textContent = 'Тёмная');
    } else {
      document.querySelectorAll('[data-theme-switch] .theme-switch__label').forEach(l => l.textContent = 'Светлая');
    }
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

  console.log('✦ Photon Kit initialized');
})();
