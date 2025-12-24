// Dark mode functionality
(function() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');

  // Get theme from localStorage or default to light
  const getTheme = () => {
    return localStorage.getItem('theme') || 'light';
  };

  // Set theme and update icons
  const setTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      lightIcon.classList.remove('hidden');
      darkIcon.classList.add('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      lightIcon.classList.add('hidden');
      darkIcon.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  };

  // Initialize theme on page load
  const initTheme = () => {
    const theme = getTheme();
    setTheme(theme);
  };

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Initialize on load
  initTheme();

  // Add click event listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
})();
