document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('show');
    hamburger.classList.toggle('active');
  });

  // Theme menu toggle logic
  const themeBtn = document.getElementById('theme-btn');
  const themeMenu = document.getElementById('theme-menu');

  if (!themeBtn || !themeMenu) return;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'default';
  document.body.classList.remove('light', 'solarized', 'minimal'); // Removed futuristic here
  if (savedTheme !== 'default') {
    document.body.classList.add(savedTheme);
  }

  // Toggle menu visibility
  themeBtn.addEventListener('click', () => {
    const expanded = themeBtn.getAttribute('aria-expanded') === 'true';
    themeBtn.setAttribute('aria-expanded', !expanded);
    if (themeMenu.hasAttribute('hidden')) {
      themeMenu.removeAttribute('hidden');
    } else {
      themeMenu.setAttribute('hidden', '');
    }
  });

  // Handle theme option click
  themeMenu.addEventListener('click', (e) => {
    if (e.target && e.target.matches('li[data-theme]')) {
      const selectedTheme = e.target.getAttribute('data-theme');
      document.body.classList.remove('light', 'solarized', 'minimal'); // Removed futuristic here
      if (selectedTheme !== 'default') {
        document.body.classList.add(selectedTheme);
      }
      localStorage.setItem('theme', selectedTheme);
      // Close the menu
      themeMenu.setAttribute('hidden', '');
      themeBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!themeBtn.contains(e.target) && !themeMenu.contains(e.target)) {
      themeMenu.setAttribute('hidden', '');
      themeBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Keyboard navigation for theme menu (optional)
  themeMenu.addEventListener('keydown', (e) => {
    const focusableItems = Array.from(themeMenu.querySelectorAll('li[role="menuitem"]'));
    const currentIndex = focusableItems.indexOf(document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % focusableItems.length;
      focusableItems[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + focusableItems.length) % focusableItems.length;
      focusableItems[prevIndex].focus();
    } else if (e.key === 'Escape') {
      themeMenu.setAttribute('hidden', '');
      themeBtn.setAttribute('aria-expanded', 'false');
      themeBtn.focus();
    }
  });
});
