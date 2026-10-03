/* ==============================================
   PHOTON KIT — Git Guide runtime
   docs/git.html
   ============================================== */
(function () {
  'use strict';

  var body = document.body;
  if (!body || !body.classList.contains('doc-guide')) return;

  /* ---------- СТРОКИ ИНТЕРФЕЙСА ---------- */
  var L = {
    copy: 'Копировать',
    copied: 'Скопировано',
    onThisPage: 'На этой странице',
    filter: 'Фильтр разделов...',
    empty: 'Ничего не найдено',
    showAll: 'Показать все',
    prev: 'Назад',
    next: 'Вперёд',
    sections: 'разделов',
    read: 'Прогресс чтения',
    openToc: 'Содержание',
    closeToc: 'Свернуть'
  };

  /* ---------- КОПИРОВАНИЕ ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(fallback);
    }
    return Promise.resolve(fallback());

    function fallback() {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (e) { /* ignore */ }
      return true;
    }
  }

  function flash(el, cls, onMs) {
    el.classList.add(cls);
    clearTimeout(el._flashT);
    el._flashT = setTimeout(function () { el.classList.remove(cls); }, onMs || 1500);
  }

  /* ---------- ПОДСВЕТКА СИНТАКСИСА ---------- */
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var TOKEN_RE = new RegExp(
    '("(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\')' + '|' +           // строка
    '(-{1,2}[A-Za-z][\\w-]*)' + '|' +                                  // флаг
    '\\b(git|gh|glab|sudo|npm|npx|yarn|pnpm|brew|apt|pip|pip3|java|mkdir|touch|echo|cat|ssh-keygen|chmod|curl|rm|cp|mv|vim|nano|sort|ls|cd|docker|python|python3|code|node|jest|lazygit|tig|gitui|gpg|make|printf|which)\\b' + '|' + // команда
    '\\b(HEAD|ORIG_HEAD|FETCH_HEAD|MERGE_HEAD|MERGE_MSG|main|master|develop|release|hotfix|feature|origin|upstream|HEAD\\{[^}]*\\}|stash|refs/[\\w/-]*)\\b' + '|' + // ссылка
    '(#.*$)',                                                          // комментарий
    'g'
  );

  function highlight(src) {
    return src.split('\n').map(function (line) {
      if (/^\s*#/.test(line)) return '<span class="t-com">' + escapeHtml(line) + '</span>';
      var out = '', last = 0, m;
      TOKEN_RE.lastIndex = 0;
      while ((m = TOKEN_RE.exec(line)) !== null) {
        out += escapeHtml(line.slice(last, m.index));
        var tok = m[0], cls = null;
        if (m[1]) cls = 't-str';
        else if (m[2]) cls = (m.index === 0 || /\s/.test(line.charAt(m.index - 1))) ? 't-flag' : null;
        else if (m[3]) cls = 't-cmd';
        else if (m[4]) cls = 't-ref';
        else if (m[5]) cls = 't-com';
        out += cls ? '<span class="' + cls + '">' + escapeHtml(tok) + '</span>' : escapeHtml(tok);
        last = m.index + tok.length;
        if (tok.length === 0) TOKEN_RE.lastIndex++;
      }
      out += escapeHtml(line.slice(last));
      return out;
    }).join('\n');
  }

  /* ---------- БЛОКИ КОДА ---------- */
  document.querySelectorAll('.guide-body pre[data-lang]').forEach(function (pre) {
    var code = pre.querySelector('code');
    if (!code) return;

    var raw = code.textContent.replace(/^\n+/, '').replace(/\s+$/, '');
    var lang = pre.getAttribute('data-lang') || 'bash';

    if (lang !== 'text' && lang !== 'diagram') {
      code.innerHTML = highlight(raw);
    }

    var wrap = document.createElement('div');
    wrap.className = 'git-code';

    var bar = document.createElement('div');
    bar.className = 'git-code__bar';

    var left = document.createElement('div');
    left.style.display = 'flex';
    left.style.alignItems = 'center';
    left.style.gap = '0.6rem';
    left.style.minWidth = '0';

    var dots = document.createElement('span');
    dots.className = 'git-code__dots';
    dots.innerHTML = '<i></i><i></i><i></i>';

    var label = document.createElement('span');
    label.className = 'git-code__lang';
    label.textContent = lang;

    left.appendChild(dots);
    left.appendChild(label);

    var btn = document.createElement('button');
    btn.className = 'git-code__copy';
    btn.type = 'button';
    btn.textContent = L.copy;
    btn.setAttribute('aria-label', L.copy);

    btn.addEventListener('click', function () {
      copyText(raw).then(function () {
        btn.textContent = L.copied;
        flash(btn, 'is-copied', 1600);
        btn._reset = setTimeout(function () { btn.textContent = L.copy; }, 1600);
      });
    });

    bar.appendChild(left);
    bar.appendChild(btn);

    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(bar);
    wrap.appendChild(pre);
  });

  /* ---------- ИНЛАЙН-КОД ---------- */
  document.querySelectorAll('.guide-body code.ic').forEach(function (el) {
    el.title = 'Нажмите, чтобы скопировать';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('click', function () {
      copyText(el.textContent).then(function () { flash(el, 'is-copied', 900); });
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyText(el.textContent).then(function () { flash(el, 'is-copied', 900); });
      }
    });
  });

  /* ---------- ОГЛАВЛЕНИЕ ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('.guide-body .guide-section[id]'));
  var tocList = document.getElementById('guideTocList');
  var tocFilter = document.getElementById('guideTocFilter');
  var tocBox = document.getElementById('guideToc');
  var tocToggle = document.getElementById('guideTocToggle');
  var tocCount = document.getElementById('guideTocCount');

  var tocLinks = [];

  if (tocList) {
    var emptyLi = document.createElement('li');
    emptyLi.className = 'guide-toc__empty';
    emptyLi.textContent = L.empty;
    emptyLi.style.display = 'none';

    sections.forEach(function (sec, i) {
      var h2 = sec.querySelector('h2');
      if (!h2) return;

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.className = 'guide-toc__link';
      a.href = '#' + sec.id;

      var num = document.createElement('span');
      num.className = 'guide-toc__num';
      num.textContent = (i + 1 < 10 ? '0' : '') + (i + 1);

      var txt = document.createElement('span');
      txt.textContent = h2.textContent.trim();

      a.appendChild(num);
      a.appendChild(txt);
      a.setAttribute('data-label', h2.textContent.trim().toLowerCase());
      li.appendChild(a);
      tocList.appendChild(li);
      tocLinks.push(a);

      /* навигация «предыдущий / следующий» */
      var nav = document.createElement('div');
      nav.className = 'guide-nav';
      var prevH = sections[i - 1] ? sections[i - 1].querySelector('h2') : null;
      var nextS = sections[i + 1];
      var nextH = nextS ? nextS.querySelector('h2') : null;

      if (prevH) {
        var p = document.createElement('a');
        p.href = '#' + sections[i - 1].id;
        p.innerHTML = '<small>' + L.prev + '</small><strong></strong>';
        p.querySelector('strong').textContent = prevH.textContent.trim();
        nav.appendChild(p);
      } else {
        var p2 = document.createElement('a');
        p2.href = 'index.html';
        p2.innerHTML = '<small>Документация</small><strong>Photon</strong>';
        nav.appendChild(p2);
      }

      if (nextH) {
        var n = document.createElement('a');
        n.className = 'is-next';
        n.href = '#' + nextS.id;
        n.innerHTML = '<small>' + L.next + '</small><strong></strong>';
        n.querySelector('strong').textContent = nextH.textContent.trim();
        nav.appendChild(n);
      } else {
        var n2 = document.createElement('a');
        n2.className = 'is-next';
        n2.href = 'utilities.html';
        n2.innerHTML = '<small>Далее</small><strong>Утилиты</strong>';
        nav.appendChild(n2);
      }
      sec.appendChild(nav);
    });

    tocList.appendChild(emptyLi);
    tocLinks.__empty = emptyLi;
  }

  if (tocCount) tocCount.textContent = sections.length + ' ' + L.sections;

  /* Фильтр оглавления */
  if (tocFilter) {
    tocFilter.placeholder = L.filter;
    tocFilter.addEventListener('input', function () {
      var q = tocFilter.value.trim().toLowerCase();
      var shown = 0;
      tocLinks.forEach(function (a) {
        var hit = !q || a.getAttribute('data-label').indexOf(q) !== -1;
        a.parentNode.style.display = hit ? '' : 'none';
        if (hit) shown++;
      });
      if (tocLinks.__empty) tocLinks.__empty.style.display = shown ? 'none' : '';
      if (q && tocBox) tocBox.classList.add('is-open');
    });
  }

  /* Раскрытие оглавления на планшете/мобильном */
  if (tocToggle && tocBox) {
    tocToggle.textContent = L.showAll;
    tocToggle.addEventListener('click', function () {
      var open = tocBox.classList.toggle('is-open');
      tocToggle.textContent = open ? L.closeToc : L.showAll;
    });
  }

  /* Закрываем мобильное меню после перехода по оглавлению */
  if (tocBox) {
    tocBox.addEventListener('click', function (e) {
      var a = e.target.closest('a.guide-toc__link');
      if (a && window.innerWidth < 1181) tocBox.classList.remove('is-open');
    });
  }

  /* ---------- SCROLLSPY + ПРОГРЕСС ---------- */
  var bar = document.getElementById('guideProgress');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      /* прогресс */
      if (bar) {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
      }

      /* активный раздел */
      var pos = h_scroll() + (window.innerHeight * 0.3);
      var current = sections[0];
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= pos) current = sections[i];
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = sections[sections.length - 1];
      }
      if (current) {
        tocLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + current.id);
        });
        var active = tocList && tocList.querySelector('.is-active');
        if (active && tocBox) {
          var box = tocBox.getBoundingClientRect();
          var item = active.getBoundingClientRect();
          if (item.top < box.top + 8 || item.bottom > box.bottom - 8) {
            tocList.scrollTop += item.top - box.top - box.height / 2 + item.height / 2;
          }
        }
      }
      ticking = false;
    });
  }

  function h_scroll() { return window.pageYOffset || document.documentElement.scrollTop || 0; }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* Подсветка раздела из хэша при загрузке */
  if (location.hash) {
    var target = document.querySelector(location.hash);
    if (target) setTimeout(function () { target.scrollIntoView(); }, 60);
  }

})();
