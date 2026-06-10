function applyTheme(theme) {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.className = 'bi bi-sun-fill text-warning';
        }
    } else {
        body.classList.remove('dark-mode');
        if (themeIcon) {
            themeIcon.className = 'bi bi-moon-stars';
        }
    }
}