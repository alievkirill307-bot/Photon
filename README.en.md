<div align="center">
  <p align="center" style="margin-bottom:1rem;">
    <a href="README.md" style="display:inline-block;padding:0.35rem 1rem;border-radius:999px;background:#5755d9;color:#fff;text-decoration:none;font-size:0.85rem;font-weight:500;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">Русский</a>
  </p>
  <img src="photo_2026-06-26_12-29-15.jpg" alt="Photon Logo" width="120" style="border-radius:24px;box-shadow:0 8px 32px rgba(87,85,217,0.2);">
  <h1 align="center" style="font-size:3rem;font-weight:700;letter-spacing:-0.03em;margin:0.5rem 0 0.25rem;">Photon</h1>
  <p align="center" style="font-size:1.15rem;color:#6e6e73;max-width:500px;margin:0 auto;">
    CSS Framework with adaptive dark theme<br>
    Over 40 glassmorphism-style components
  </p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0-5755d9?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-32b643?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/CSS-variables-ffb700?style=flat-square" alt="CSS Variables">
  <img src="https://img.shields.io/badge/JS-zero_dependencies-4b9eff?style=flat-square" alt="No deps">
</p>

---

## About

**Photon** is a CSS framework inspired by the Apple Liquid Glass aesthetic. It combines the best components from five popular frameworks (Chota, Picnic, Siimple, Spectre, Wing) into a unified visual style.

### Features

| | |
|---|---|
| <svg viewBox="0 0 24 24" fill="none" stroke="#5755d9" stroke-width="2" width="20" height="20" style="vertical-align:middle;margin-right:6px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> **Dark theme** | Toggle via `theme-dark` class on `<body>` |
| <svg viewBox="0 0 24 24" fill="none" stroke="#5755d9" stroke-width="2" width="20" height="20" style="vertical-align:middle;margin-right:6px;"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/></svg> **Responsive** | 12-column grid system, fluid typography |
| <svg viewBox="0 0 24 24" fill="none" stroke="#5755d9" stroke-width="2" width="20" height="20" style="vertical-align:middle;margin-right:6px;"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> **40+ components** | Buttons, forms, cards, modals, carousels, accordions and more |
| <svg viewBox="0 0 24 24" fill="none" stroke="#5755d9" stroke-width="2" width="20" height="20" style="vertical-align:middle;margin-right:6px;"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/></svg> **CSS variables** | Easy customization via CSS custom properties |
| <svg viewBox="0 0 24 24" fill="none" stroke="#5755d9" stroke-width="2" width="20" height="20" style="vertical-align:middle;margin-right:6px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> **Pure CSS + JS** | Zero dependencies. One CSS and one JS file |

## Quick Start

Include Photon in your project:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="photon-kit.css">
</head>
<body>
  <button class="btn btn--primary">Click Me</button>
  <script src="photon-kit.js" defer></script>
</body>
</html>
```

## Dark Theme

Add the `theme-dark` class to `<body>`:

```html
<body class="theme-dark">
```

## Components

Photon includes:

| Component | Description |
|-----------|-------------|
| [Buttons](документация/buttons.html) | 8 colors, 3 sizes, outline, glass, ghost, link, button groups |
| [Forms](документация/forms.html) | Input, textarea, select, checkbox, radio, switch, range, validation |
| [Cards](документация/cards.html) | Card, panel, tile, empty state, hero |
| [Images](документация/images.html) | Gallery with lightbox, fullscreen image viewer |
| [Navigation](документация/navigation.html) | Navbar, tabs, breadcrumbs, steps, pagination |
| [Tables](документация/tables.html) | Regular, striped, bordered, hover |
| [Alerts](документация/alerts.html) | Alerts (5 colors), toasts (JS API) |
| [Modals](документация/modals.html) | Small, default, large |
| [Badges](документация/badges.html) | Badge, tag, chip, label |
| [Progress](документация/progress.html) | Progress bar, spinner, meter |
| [Tooltips](документация/tooltips.html) | Tooltip, popover, dropdown, menu |
| [Avatars](документация/avatars.html) | 4 sizes, groups, status |
| [Accordion & Carousel](документация/accordion.html) | Accordion, carousel, timeline |
| [Stopwatch](документация/stopwatch.html) | Full-featured stopwatch with laps |
| [Clock](документация/clock.html) | Real-time clock |
| [Calendar](документация/calendar.html) | Interactive calendar |
| [Footers](документация/footer.html) | 5 variants: simple, columns, social, glass, fixed |
| [Utilities](документация/utilities.html) | Spacing, flexbox, display, borders, shadows, hover effects, theme switcher |
| [Theme](документация/theme.html) | Light/dark theme configuration |

## CSS Variables

Photon uses CSS variables for all colors. Override them in your stylesheet:

```css
:root {
  --pk-primary: #5755d9;
  --pk-bg: #ffffff;
  --pk-text: #1d1d1f;
  --pk-radius: 12px;
}
```

## SVG Icons

A collection of 50 popular SVG icons is available on the [SVG Icons](документация/svg-icons.html) page. All icons use `currentColor` — the color automatically adapts to the text color.

```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
  <path d="M2 17l10 5 10-5"/>
  <path d="M2 12l10 5 10-5"/>
</svg>
```

## Project Structure

```
📁 photon-kit/
   ├── photon-kit.css    # Framework styles
   ├── photon-kit.js     # JavaScript components
📁 документация/
   ├── index.html        # Documentation home
   ├── *.html            # Component pages
   ├── css/doc.css       # Documentation styles
   └── js/doc.js         # Documentation JS (code copy, sidebar)
📄 photo_2026-06-26_12-29-15.jpg  # Logo
📄 README.md             # This file
```

## License

MIT © Photon Framework
