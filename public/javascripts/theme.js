const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtn = document.getElementById('theme-toggle');
const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * @param {( 'dark' | 'light')} [theme = light]
 */
const setTheme = function (theme) {
  if (theme === 'dark') {
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleDarkIcon.classList.add('hidden');
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
  } else {
    themeToggleLightIcon.classList.add('hidden');
    themeToggleDarkIcon.classList.remove('hidden');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
  }
};

darkThemeMq.addEventListener('change', (e) => {
  if (e.matches && (!('color-theme' in localStorage) || localStorage.getItem('color-theme') === 'dark')) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
});

themeToggleBtn.addEventListener('click', function () {
  if (localStorage.getItem('color-theme') === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

if (darkThemeMq.matches && (!('color-theme' in localStorage) || localStorage.getItem('color-theme') === 'dark')) {
  setTheme('dark');
} else {
  setTheme('light');
}
