// class-style-engine-v3.js
(function() {
  const STYLE_ID = 'class-style-engine';
  const PROP_ALIASES = {
    // Display & Flex
    d: 'display', dp: 'display',
    jc: 'justify-content', ai: 'align-items', ac: 'align-content',
    as: 'align-self', fw: 'flex-wrap', fd: 'flex-direction',
    g: 'gap', rg: 'row-gap', cg: 'column-gap',
    // Grid
    gtc: 'grid-template-columns', gtr: 'grid-template-rows',
    gac: 'grid-auto-columns', gar: 'grid-auto-rows',
    // Размеры
    w: 'width', h: 'height',
    minw: 'min-width', minh: 'min-height',
    maxw: 'max-width', maxh: 'max-height',
    // Отступы
    m: 'margin', mt: 'margin-top', mr: 'margin-right',
    mb: 'margin-bottom', ml: 'margin-left',
    p: 'padding', pt: 'padding-top', pr: 'padding-right',
    pb: 'padding-bottom', pl: 'padding-left',
    // Цвет и фон
    c: 'color', bg: 'background', bgc: 'background-color',
    // Типографика
    fs: 'font-size', fw: 'font-weight', ff: 'font-family',
    lh: 'line-height', ta: 'text-align', tt: 'text-transform',
    td: 'text-decoration', ls: 'letter-spacing', ws: 'word-spacing',
    // Границы и тени
    br: 'border-radius', b: 'border',
    bt: 'border-top', brb: 'border-right', bb: 'border-bottom', bl: 'border-left',
    bs: 'box-shadow', op: 'opacity',
    // Трансформации и переходы
    tr: 'transform', trs: 'transition',
    // Позиционирование
    pos: 'position', t: 'top', r: 'right', btm: 'bottom', l: 'left', zi: 'z-index',
    // Оверфлоу
    ov: 'overflow', ovx: 'overflow-x', ovy: 'overflow-y',
  };

  const COLOR_PROPS = new Set([
    'color', 'background-color', 'background', 'border-color', 'border',
    'outline-color', 'outline', 'text-decoration-color', 'caret-color',
    'column-rule-color', 'fill', 'stroke'
  ]);

  const MACROS = {
    'flex': { display: 'flex' },
    'inline-flex': { display: 'inline-flex' },
    'grid': { display: 'grid' },
    'inline-grid': { display: 'inline-grid' },
    'center': { 'justify-content': 'center', 'align-items': 'center' },
    'flex-center': { display: 'flex', 'justify-content': 'center', 'align-items': 'center' },
    'flex-column': { display: 'flex', 'flex-direction': 'column' },
    'flex-column-center': { display: 'flex', 'flex-direction': 'column', 'justify-content': 'center', 'align-items': 'center' },
    'text-center': { 'text-align': 'center' },
    'bold': { 'font-weight': 'bold' },
    'uppercase': { 'text-transform': 'uppercase' },
    'absolute': { position: 'absolute' },
    'relative': { position: 'relative' },
    'fixed': { position: 'fixed' },
    'sticky': { position: 'sticky' },
  };

  // Модификаторы -> псевдоклассы / псевдоэлементы / медиа
  const PSEUDO_MAP = {
    'hover': ':hover',
    'active': ':active',
    'focus': ':focus',
    'focus-within': ':focus-within',
    'focus-visible': ':focus-visible',
    'first-child': ':first-child',
    'last-child': ':last-child',
    'nth-child-odd': ':nth-child(odd)',
    'nth-child-even': ':nth-child(even)',
    'before': '::before',
    'after': '::after',
    'placeholder': '::placeholder',
    'selection': '::selection',
  };

  const MEDIA_QUERIES = {
    'sm': '(min-width: 640px)',
    'md': '(min-width: 768px)',
    'lg': '(min-width: 1024px)',
    'xl': '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
    'dark': '(prefers-color-scheme: dark)',
    'light': '(prefers-color-scheme: light)',
    'reduced-motion': '(prefers-reduced-motion: reduce)',
    'portrait': '(orientation: portrait)',
    'landscape': '(orientation: landscape)',
  };

  let styleSheet, addedRules = new Set();

  function ensureStyleElement() {
    let el = document.getElementById(STYLE_ID);
    if (!el) {
      el = document.createElement('style');
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    return el;
  }

  function hexify(prop, value) {
    if (COLOR_PROPS.has(prop) && /^[0-9a-fA-F]{3,8}$/.test(value.replace(/_/g, ''))) {
      return '#' + value;
    }
    return value;
  }

  function processValue(prop, value) {
    // Заменяем _ на пробелы, кроме случаев в скобках?
    // Пока просто заменяем все _ (предполагаем, что пробелы в функциях экранируются)
    value = value.replace(/_/g, ' ');
    return hexify(prop, value);
  }

  function parseClass(cls) {
    if (!cls.startsWith('_')) return null;
    const raw = cls.slice(1);

    // Ищем разделитель -- для значения
    const valueSepIdx = raw.indexOf('--');
    let propPart = raw;
    let value = null;
    if (valueSepIdx !== -1) {
      propPart = raw.substring(0, valueSepIdx);
      value = raw.substring(valueSepIdx + 2);
    }

    // Разбираем модификаторы и свойство/макрос
    const parts = propPart.split(':');
    const modifiers = [];
    let propOrMacro = '';

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      // Если это последний элемент, и он не пустой, это свойство/макрос
      if (i === parts.length - 1 && p !== '') {
        propOrMacro = p;
      } else {
        if (p) modifiers.push(p);
      }
    }

    if (!propOrMacro) return null;

    return { modifiers, propOrMacro, value };
  }

  function generateCSS(selector, prop, val, modifiers) {
    let ruleBody = `${prop}: ${val};`;
    let wrappedRule = `.${CSS.escape(selector)} { ${ruleBody} }`;

    // Обрабатываем модификаторы с конца, оборачивая в псевдоклассы/медиа
    modifiers.forEach(mod => {
      if (PSEUDO_MAP[mod]) {
        wrappedRule = `.${CSS.escape(selector)}${PSEUDO_MAP[mod]} { ${ruleBody} }`;
      } else if (MEDIA_QUERIES[mod]) {
        wrappedRule = `@media ${MEDIA_QUERIES[mod]} { .${CSS.escape(selector)} { ${ruleBody} } }`;
      } else {
        // Неизвестный модификатор — игнорируем или можно предупредить
        console.warn(`Unknown modifier: ${mod}`);
      }
    });

    return wrappedRule;
  }

  function applyStyleFromClass(cls, el) {
    const parsed = parseClass(cls);
    if (!parsed) return;
    const { modifiers, propOrMacro, value } = parsed;

    // Проверяем макрос
    if (MACROS[propOrMacro] && value === null) {
      Object.entries(MACROS[propOrMacro]).forEach(([p, v]) => {
        const ruleId = `${cls}|${p}|${v}|${modifiers.join(',')}`;
        if (!addedRules.has(ruleId)) {
          addedRules.add(ruleId);
          const css = generateCSS(cls, p, v, modifiers);
          styleSheet.textContent += css + '\n';
        }
      });
      return;
    }

    // Проверяем алиас
    let prop = PROP_ALIASES[propOrMacro];
    if (!prop) {
      // Может быть полное CSS-свойство, записанное через дефисы?
      // Разрешаем, если в propOrMacro нет дефисов и это не алиас — тогда попробуем как прямое свойство
      prop = propOrMacro; // например, background-color
    }

    if (value === null) {
      // Если значение отсутствует, но свойство — не макрос, игнорируем (ошибка)
      return;
    }

    const processedValue = processValue(prop, value);
    const ruleId = `${cls}|${prop}|${processedValue}|${modifiers.join(',')}`;
    if (!addedRules.has(ruleId)) {
      addedRules.add(ruleId);
      const css = generateCSS(cls, prop, processedValue, modifiers);
      styleSheet.textContent += css + '\n';
    }
  }

  function processElement(el) {
    if (!el.classList) return;
    el.classList.forEach(cls => applyStyleFromClass(cls, el));
  }

  function scanAll() {
    document.querySelectorAll('[class]').forEach(processElement);
  }

  // Инициализация
  styleSheet = ensureStyleElement();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanAll);
  } else {
    scanAll();
  }

  // MutationObserver для динамических элементов
  new MutationObserver(mutations => {
    mutations.forEach(mut => {
      mut.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.classList) {
          processElement(node);
          if (node.querySelectorAll) node.querySelectorAll('[class]').forEach(processElement);
        }
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });

})();