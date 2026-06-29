<div align="center">
  <p align="center" style="margin-bottom:1rem;">
    <a href="README.en.md" style="display:inline-block;padding:0.35rem 1rem;border-radius:999px;background:#5755d9;color:#fff;text-decoration:none;font-size:0.85rem;font-weight:500;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">English</a>
  </p>
  <img src="photo_2026-06-26_12-29-15.jpg" alt="Photon Logo" width="120" style="border-radius:24px;box-shadow:0 8px 32px rgba(87,85,217,0.2);">
  <h1 align="center" style="font-size:3rem;font-weight:700;letter-spacing:-0.03em;margin:0.5rem 0 0.25rem;">Photon</h1>
  <p align="center" style="font-size:1.15rem;color:#6e6e73;max-width:500px;margin:0 auto;">
    CSS Framework с адаптивной тёмной темой<br>
    Более 40 компонентов в стеклянном стиле
  </p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/версия-2.0-5755d9?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-32b643?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/CSS-переменные-ffb700?style=flat-square" alt="CSS Variables">
  <img src="https://img.shields.io/badge/JS-зависимости_0-4b9eff?style=flat-square" alt="No deps">
</p>

---

## О проекте

**Photon** — это CSS-фреймворк, вдохновлённый стилем Apple Liquid Glass. Он объединяет лучшие компоненты из пяти популярных фреймворков (Chota, Picnic, Siimple, Spectre, Wing) в единой стилистике.

### Возможности

| | |
|---|---|
| <svg viewBox="0 0 24 24" fill="none" stroke="#5755d9" stroke-width="2" width="20" height="20" style="vertical-align:middle;margin-right:6px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> **Тёмная тема** | Переключение через класс `theme-dark` на `<body>` |
| <svg viewBox="0 0 24 24" fill="none" stroke="#5755d9" stroke-width="2" width="20" height="20" style="vertical-align:middle;margin-right:6px;"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/></svg> **Адаптивность** | 12-колоночная сетка, резиновая типографика |
| <svg viewBox="0 0 24 24" fill="none" stroke="#5755d9" stroke-width="2" width="20" height="20" style="vertical-align:middle;margin-right:6px;"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> **40+ компонентов** | Кнопки, формы, карточки, модалки, карусели, аккордеоны и многое другое |
| <svg viewBox="0 0 24 24" fill="none" stroke="#5755d9" stroke-width="2" width="20" height="20" style="vertical-align:middle;margin-right:6px;"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/></svg> **CSS-переменные** | Простая кастомизация через CSS custom properties |
| <svg viewBox="0 0 24 24" fill="none" stroke="#5755d9" stroke-width="2" width="20" height="20" style="vertical-align:middle;margin-right:6px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> **Чистый CSS + JS** | Никаких зависимостей. Один CSS и один JS файл |

## Быстрый старт

Подключите Photon к вашему проекту:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="photon-kit.css">
</head>
<body>
  <button class="btn btn--primary">Кнопка</button>
  <script src="photon-kit.js" defer></script>
</body>
</html>
```

## Тёмная тема

Добавьте класс `theme-dark` к `<body>`:

```html
<body class="theme-dark">
```

## Компоненты

Photon включает:

| Компонент | Описание |
|-----------|----------|
| [Кнопки](документация/buttons.html) | 8 цветов, 3 размера, outline, glass, ghost, link, button groups |
| [Формы](документация/forms.html) | Input, textarea, select, checkbox, radio, switch, range, validation |
| [Карточки](документация/cards.html) | Card, panel, tile, empty state, hero |
| [Навигация](документация/navigation.html) | Navbar, tabs, breadcrumbs, steps, pagination |
| [Таблицы](документация/tables.html) | Regular, striped, bordered, hover |
| [Уведомления](документация/alerts.html) | Alerts (5 цветов), toasts (JS API) |
| [Модальные окна](документация/modals.html) | Small, default, large |
| [Значки](документация/badges.html) | Badge, tag, chip, label |
| [Прогресс](документация/progress.html) | Progress bar, spinner, meter |
| [Подсказки](документация/tooltips.html) | Tooltip, popover, dropdown, menu |
| [Аватарки](документация/avatars.html) | 4 размера, groups, status |
| [Аккордеон и карусель](документация/accordion.html) | Accordion, carousel, timeline |
| [Секундомер](документация/stopwatch.html) | Полнофункциональный секундомер с кругами |
| [Часы](документация/clock.html) | Часы реального времени |
| [Календарь](документация/calendar.html) | Интерактивный календарь |
| [Футеры](документация/footer.html) | 5 вариантов: simple, columns, social, glass, fixed |
| [Утилиты](документация/utilities.html) | Spacing, flexbox, display, borders, shadows, hover-эффекты, переключатель темы |
| [Тема](документация/theme.html) | Настройка светлой/тёмной темы |

## CSS-переменные

Photon использует CSS-переменные для всех цветов. Переопределите их в своём CSS:

```css
:root {
  --pk-primary: #5755d9;
  --pk-bg: #ffffff;
  --pk-text: #1d1d1f;
  --pk-radius: 12px;
}
```

## SVG иконки

Коллекция из 50 популярных SVG иконок доступна на странице [SVG иконки](документация/svg-icons.html). Все иконки используют `currentColor` — цвет автоматически подстраивается под цвет текста.

```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
  <path d="M2 17l10 5 10-5"/>
  <path d="M2 12l10 5 10-5"/>
</svg>
```

## Структура проекта

```
📁 photon-kit/
   ├── photon-kit.css    # Все стили фреймворка
   ├── photon-kit.js     # JavaScript компонентов
📁 документация/
   ├── index.html        # Главная страница документации
   ├── *.html            # Страницы компонентов
   ├── css/doc.css       # Стили документации
   └── js/doc.js         # JS документации (копирование кода, сайдбар)
📄 photo_2026-06-26_12-29-15.jpg  # Логотип
📄 README.md             # Этот файл
```

## Лицензия

MIT © Photon Framework
