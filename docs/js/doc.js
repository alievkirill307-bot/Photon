/* ==============================================
   PHOTON KIT — документация: сайдбар, поиск, копирование
   ============================================== */
(function () {
  'use strict';

  /* ---------- Строки интерфейса ---------- */
  var L = {
    search: 'Поиск по разделу...',
    nothing: 'Ничего не найдено',
    copy: 'Копировать',
    copied: 'Скопировано!',
    menu: 'Меню',
    searchAll: 'Поиск по всей документации'
  };

  function currentFile() {
    var p = window.location.pathname.split('/').pop();
    if (!p) p = 'index.html';
    if (p.indexOf('.') === -1) p += '.html';
    return decodeURIComponent(p);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  /* ==============================================
     SIDEBAR RENDERER
     ============================================== */
  var sidebar = document.getElementById('sidebar');
  var nav = window.SIDEBAR_CONFIG;

  if (sidebar && nav && nav.length) {
    sidebar.innerHTML = '';
    sidebar.setAttribute('id', 'sidebar');

    var searchHtml =
      '<div class="sidebar-search">' +
        '<input type="text" class="sidebar-search__input" id="sidebarSearchInput" ' +
        'placeholder="' + esc(L.search) + '" autocomplete="off" aria-label="' + esc(L.searchAll) + '" />' +
        '<div class="sidebar-search__results" id="sidebarSearchResults"></div>' +
      '</div>';
    sidebar.insertAdjacentHTML('afterbegin', searchHtml);

    nav.forEach(function (group) {
      var groupEl = document.createElement('div');
      groupEl.className = 'doc-sidebar__group';

      var titleEl = document.createElement('span');
      titleEl.className = 'doc-sidebar__title';
      titleEl.textContent = group.title || '';
      groupEl.appendChild(titleEl);

      (group.links || []).forEach(function (link) {
        var a = document.createElement('a');
        a.href = link.href;
        a.className = 'doc-sidebar__link';
        a.textContent = link.label || '';
        groupEl.appendChild(a);
      });

      sidebar.appendChild(groupEl);
    });
  }

  /* ==============================================
     ACTIVE SIDEBAR LINK
     ============================================== */
  var sidebarLinks = document.querySelectorAll('.doc-sidebar__link');
  var here = currentFile();

  sidebarLinks.forEach(function (link) {
    if ((link.getAttribute('href') || '') === here) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ==============================================
     SIDEBAR TOGGLE (мобильные)
     ============================================== */
  var sidebarToggle = document.getElementById('sidebarToggle');
  var sidebarOverlay = document.getElementById('sidebarOverlay');

  if (sidebarToggle) sidebarToggle.setAttribute('aria-label', L.menu);

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      var open = sidebar.classList.toggle('open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('open');
      sidebarToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
        sidebarToggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  // Закрываем сайдбар после перехода по ссылке (мобильные)
  if (sidebar) {
    sidebar.addEventListener('click', function (e) {
      var a = e.target.closest('a.doc-sidebar__link');
      if (a && window.innerWidth < 901) {
        sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('open');
      }
    });
  }

  /* ==============================================
     FULL-SITE SEARCH
     ============================================== */
  var searchInput = document.getElementById('sidebarSearchInput');
  var searchResults = document.getElementById('sidebarSearchResults');

  if (searchInput && searchResults && typeof window.SEARCH_INDEX !== 'undefined') {
    var debounceTimer = null;

    function escRegex(s) {
      return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function highlight(text, query) {
      return esc(text).replace(new RegExp('(' + escRegex(query) + ')', 'gi'), '<strong>$1</strong>');
    }

    function runSearch(query) {
      var matches = [];
      var seen = {};

      window.SEARCH_INDEX.forEach(function (page) {
        var score = 0;
        var sections = [];
        var title = page.t || page.h1 || page.f;

        if (title.toLowerCase().indexOf(query) !== -1) {
          score = 3;
          sections.push({ text: title, tag: 'page' });
        }

        (page.h2 || []).forEach(function (h) {
          if (String(h).toLowerCase().indexOf(query) !== -1) {
            if (score < 2) score = 2;
            sections.push({ text: h, tag: 'h2' });
          }
        });

        (page.h3 || []).forEach(function (h) {
          if (String(h).toLowerCase().indexOf(query) !== -1) {
            if (score < 1) score = 1;
            sections.push({ text: h, tag: 'h3' });
          }
        });

        if (score > 0) {
          var key = page.f + '|' + score;
          if (!seen[key]) {
            seen[key] = true;
            matches.push({
              file: page.f,
              title: title,
              sections: sections.slice(0, 3),
              score: score
            });
          }
        }
      });

      matches.sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return a.title.localeCompare(b.title);
      });

      if (matches.length === 0) {
        searchResults.innerHTML = '<div class="sidebar-search__empty">' + esc(L.nothing) + '</div>';
      } else {
        var html = '';
        matches.forEach(function (m, idx) {
          if (idx >= 15) return;
          html += '<a href="' + esc(m.file) + '" class="sidebar-search__item sidebar-search__item--link">';
          html += '<span class="sidebar-search__page">' + highlight(m.title, query) + '</span>';
          if (m.sections.length) {
            html += '<span class="sidebar-search__sub">';
            var subText = m.sections[0].text;
            if (subText.length > 60) subText = subText.slice(0, 60) + '…';
            html += highlight(subText, query) + '</span>';
          }
          html += '</a>';
        });
        searchResults.innerHTML = html;
      }

      searchResults.style.display = 'block';
    }

    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        var query = searchInput.value.toLowerCase().trim();
        if (query.length < 2) {
          searchResults.innerHTML = '';
          searchResults.style.display = 'none';
          return;
        }
        runSearch(query);
      }, 200);
    });

    searchInput.addEventListener('blur', function () {
      setTimeout(function () { searchResults.style.display = 'none'; }, 300);
    });

    searchInput.addEventListener('focus', function () {
      if (searchInput.value.trim().length >= 2) searchResults.style.display = 'block';
    });
  }

  /* ==============================================
     ТАБЛИЦЫ: горизонтальная прокрутка на узких экранах
     ============================================== */
  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  (function wrapTables() {
    var tables = document.querySelectorAll('.doc-content table');
    if (!tables.length) return;

    Array.prototype.forEach.call(tables, function (table) {
      // В методичке и Photon X таблицы уже имеют собственные обёртки
      if (table.closest('.doc-table-wrap') || table.closest('.guide-table-wrap')) return;

      var wrap = document.createElement('div');
      wrap.className = 'doc-table-wrap';
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
      table.setAttribute('tabindex', '0');
    });

    function updateFlags() {
      Array.prototype.forEach.call(document.querySelectorAll('.doc-table-wrap'), function (wrap) {
        wrap.classList.toggle('is-scrollable', wrap.scrollWidth > wrap.clientWidth + 2);
      });
    }

    updateFlags();
    window.addEventListener('resize', debounce(updateFlags, 150));
    window.addEventListener('load', updateFlags);
  })();

  /* ==============================================
     CODE BLOCK COPY BUTTONS
     ============================================== */
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (e) { /* ignore */ }
      resolve();
    });
  }

  function showCopied(btn) {
    var original = btn.getAttribute('data-label-orig') || btn.textContent;
    if (!btn.getAttribute('data-label-orig')) btn.setAttribute('data-label-orig', original);
    btn.textContent = L.copied;
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 2000);
  }

  document.querySelectorAll('.code-block').forEach(function (block) {
    if (block.querySelector('.code-block__copy')) return;
    var btn = document.createElement('button');
    btn.className = 'code-block__copy';
    btn.textContent = L.copy;
    btn.type = 'button';
    btn.setAttribute('aria-label', L.copy);
    block.appendChild(btn);

    btn.addEventListener('click', function () {
      var code = block.querySelector('code');
      if (!code) return;
      copyToClipboard(code.textContent).then(function () { showCopied(btn); });
    });
  });

  /* ==============================================
     SVG ICON COPY
     ============================================== */
  document.querySelectorAll('.svg-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var svg = item.querySelector('svg');
      if (!svg) return;
      copyToClipboard(svg.outerHTML).then(function () {
        var msg = item.querySelector('.svg-copied');
        if (msg) {
          msg.classList.add('show');
          setTimeout(function () { msg.classList.remove('show'); }, 1500);
        }
      });
    });
  });

})();
