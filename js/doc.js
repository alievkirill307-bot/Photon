(function () {
  'use strict';

  // ===== SIDEBAR TOGGLE (mobile) =====
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('open');
    });
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
      });
    }
  }

  // ===== ACTIVE SIDEBAR LINK =====
  const sidebarLinks = document.querySelectorAll('.doc-sidebar__link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  sidebarLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // ===== CODE BLOCK COPY BUTTONS =====
  document.querySelectorAll('.code-block').forEach(function (block) {
    const btn = document.createElement('button');
    btn.className = 'code-block__copy';
    btn.textContent = 'Копировать';
    btn.type = 'button';
    block.appendChild(btn);

    btn.addEventListener('click', function () {
      const code = block.querySelector('code');
      if (!code) return;
      const text = code.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          showCopied(btn);
        });
      } else {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showCopied(btn);
      }
    });
  });

  function showCopied(btn) {
    btn.textContent = 'Скопировано!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = 'Копировать';
      btn.classList.remove('copied');
    }, 2000);
  }

  // ===== SVG ICON COPY (if on svg-icons page) =====
  document.querySelectorAll('.svg-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const svg = item.querySelector('svg');
      if (!svg) return;
      const html = svg.outerHTML;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(html).then(function () {
          const msg = item.querySelector('.svg-copied');
          if (msg) {
            msg.classList.add('show');
            setTimeout(function () { msg.classList.remove('show'); }, 1500);
          }
        });
      }
    });
  });

})();
