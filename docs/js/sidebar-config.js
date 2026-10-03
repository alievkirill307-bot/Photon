/* ==============================================
   PHOTON KIT — навигация сайдбара документации
   ============================================== */
(function () {
  'use strict';

  var NAV = [
    {
      title: 'Старт',
      links: [
        { href: 'index.html', label: 'Введение' }
      ]
    },
    {
      title: 'Компоненты',
      links: [
        { href: 'buttons.html', label: 'Кнопки' },
        { href: 'forms.html', label: 'Формы' },
        { href: 'cards.html', label: 'Карточки' },
        { href: 'images.html', label: 'Изображения' },
        { href: 'navigation.html', label: 'Навигация' },
        { href: 'tables.html', label: 'Таблицы' },
        { href: 'alerts.html', label: 'Уведомления' },
        { href: 'modals.html', label: 'Модальные окна' },
        { href: 'panels.html', label: 'Боковая панель' },
        { href: 'badges.html', label: 'Значки и теги' },
        { href: 'progress.html', label: 'Прогресс и спиннеры' },
        { href: 'tooltips.html', label: 'Подсказки и списки' },
        { href: 'avatars.html', label: 'Аватарки' },
        { href: 'accordion.html', label: 'Аккордеон и карусель' },
        { href: 'stopwatch.html', label: 'Секундомер' },
        { href: 'clock.html', label: 'Часы' },
        { href: 'calendar.html', label: 'Календарь' },
        { href: 'timer.html', label: 'Таймер для акций' },
        { href: 'footer.html', label: 'Футеры' },
        { href: 'utilities.html', label: 'Утилиты' }
      ]
    },
    {
      title: 'Photon-tw',
      links: [
        { href: 'photon-tw.html', label: 'Обзор' },
        { href: 'pt-buttons.html', label: 'Кнопки [pt]' },
        { href: 'pt-cards.html', label: 'Карточки [pt]' },
        { href: 'pt-forms.html', label: 'Формы [pt]' },
        { href: 'pt-layout.html', label: 'Сетка [pt]' },
        { href: 'pt-typography.html', label: 'Типографика [pt]' },
        { href: 'pt-navigation.html', label: 'Навигация [pt]' },
        { href: 'pt-images.html', label: 'Изображения [pt]' },
        { href: 'pt-alerts.html', label: 'Уведомления [pt]' },
        { href: 'pt-utilities.html', label: 'Справочник [pt]' },
        { href: 'pt-theme.html', label: 'Тема [pt]' }
      ]
    },
    {
      title: 'Гайды',
      links: [
        { href: 'guide-animations.html', label: 'Анимации' },
        { href: 'guide-transforms.html', label: 'Трансформации' },
        { href: 'guide-custom-components.html', label: 'Кастомные компоненты' },
        { href: 'guide-tooltips.html', label: 'Тултипы' },
        { href: 'guide-breadcrumbs.html', label: 'Breadcrumbs' },
        { href: 'guide-pagination.html', label: 'Pagination' },
        { href: 'guide-lists.html', label: 'Списки' },
        { href: 'guide-tables.html', label: 'Таблицы' },
        { href: 'guide-media-queries.html', label: 'Медиа-запросы' },
        { href: 'guide-css-grid.html', label: 'CSS Grid' },
        { href: 'guide-flexbox.html', label: 'Flexbox' },
        { href: 'guide-shadows.html', label: 'Тени' },
        { href: 'guide-blend-modes.html', label: 'Blend modes' },
        { href: 'guide-forms-deep.html', label: 'Формы: глубокий разбор' },
        { href: 'guide-typography-deep.html', label: 'Типографика: глубокий разбор' }
      ]
    },
    {
      title: 'Photon X',
      links: [
        { href: 'photon-x.html', label: 'Введение' },
        { href: 'px-components.html', label: 'Компоненты' },
        { href: 'guide-photon-x.html', label: 'Подробное руководство' }
      ]
    },
    {
      title: 'Методички',
      links: [
        { href: 'git.html', label: 'Git — полная методичка' }
      ]
    },
    {
      title: 'Настройки',
      links: [
        { href: 'theme.html', label: 'Тема оформления' }
      ]
    },
    {
      title: 'Ресурсы',
      links: [
        { href: 'svg-icons.html', label: 'SVG иконки' }
      ]
    }
  ];

  window.SIDEBAR_CONFIG = NAV;

})();
