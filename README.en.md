<div align="center">
  <p align="center" style="margin-bottom:1rem;">
    <a href="README.md" style="display:inline-block;padding:0.35rem 1rem;border-radius:999px;background:#5755d9;color:#fff;text-decoration:none;font-size:0.85rem;font-weight:500;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">Русский</a>
  </p>
  <img src="docs/img/photon-logo.svg" alt="Photon Logo" width="120" height="120" style="border-radius:24px;box-shadow:0 8px 32px rgba(87,85,217,0.2);">
  <h1 align="center" style="font-size:3rem;font-weight:700;letter-spacing:-0.03em;margin:0.5rem 0 0.25rem;">Photon</h1>
  <p align="center" style="font-size:1.15rem;color:#6e6e73;max-width:500px;margin:0 auto;">
    CSS Framework with adaptive dark theme<br>
    Over 40 glassmorphism-style components
  </p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.2-5755d9?style=flat-square" alt="Version">
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
| [Buttons](docs/buttons.html) | 8 colors, 3 sizes, outline, glass, ghost, link, button groups |
| [Forms](docs/forms.html) | Input, textarea, select, checkbox, radio, switch, range, validation |
| [Cards](docs/cards.html) | Card, panel, tile, empty state, hero |
| [Images](docs/images.html) | Gallery with lightbox, fullscreen image viewer |
| [Navigation](docs/navigation.html) | Navbar, tabs, breadcrumbs, steps, pagination |
| [Tables](docs/tables.html) | Regular, striped, bordered, hover |
| [Alerts](docs/alerts.html) | Alerts (5 colors), toasts (JS API) |
| [Modals](docs/modals.html) | Small, default, large |
| [Badges](docs/badges.html) | Badge, tag, chip, label |
| [Progress](docs/progress.html) | Progress bar, spinner, meter |
| [Tooltips](docs/tooltips.html) | Tooltip, popover, dropdown, menu |
| [Avatars](docs/avatars.html) | 4 sizes, groups, status |
| [Accordion & Carousel](docs/accordion.html) | Accordion, carousel, timeline |
| [Stopwatch](docs/stopwatch.html) | Full-featured stopwatch with laps |
| [Clock](docs/clock.html) | Real-time clock |
| [Calendar](docs/calendar.html) | Interactive calendar |
| [Timer](docs/timer.html) | Countdown to a specified date with auto-renew |
| [Footers](docs/footer.html) | 5 variants: simple, columns, social, glass, fixed |
| [Utilities](docs/utilities.html) | Spacing, flexbox, display, borders, shadows, hover effects, theme switcher |
| [Theme](docs/theme.html) | Light/dark theme configuration |

## Photon X

**Photon X** — built-in next-gen CSS engine. Control styles directly in HTML via classes with `_` prefix:

```html
<script src="photon-kit-x.js" defer></script>

<div class="_bg--6c5ce7 _flex-center _p-3 _hover:bg--ff7675" style="height:200px;">
  <span class="c--fff _fs-1_25">Hover me</span>
</div>
```

Details: [Photon X — Introduction](docs/photon-x.html) | [Photon X — Components](docs/px-components.html)

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

A collection of 50 popular SVG icons is available on the [SVG Icons](docs/svg-icons.html) page. All icons use `currentColor` — the color automatically adapts to the text color.

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
   ├── photon-kit-x.js     # Photon X — is a built-in CSS engine
📁 docs/                 # Self-contained documentation site (deploy standalone)
   ├── index.html        # Documentation home
   ├── *.html            # Component pages
   ├── css/              # photon-kit.css + doc.css (local copies)
   ├── js/               # photon-kit.js + photon-kit-x.js + doc.js
   └── img/              # Logos and icons
📄 index.html            # Redirect to docs/index.html
📄 README.md             # This file
📄 README.en.md
```

## Hosting

The `docs/` folder is fully self-contained — upload its contents to your hosting web root and everything works: styles, scripts and images load locally with no external paths.

## License

MIT © Photon Framework
