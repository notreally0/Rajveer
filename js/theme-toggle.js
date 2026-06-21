const storageKey = 'portfolio-theme';
const body = document.body;
const toggleButton = document.querySelector('.theme-toggle');

if (toggleButton) {
    toggleButton.innerHTML = `
        <span class="theme-toggle__track" aria-hidden="true">
            <span class="theme-toggle__thumb">
                <span class="theme-toggle__thumb-icon"></span>
            </span>
        </span>
    `;
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    body.classList.toggle('dark-theme', isDark);

    if (toggleButton) {
        toggleButton.classList.toggle('is-dark', isDark);
        const thumbIcon = toggleButton.querySelector('.theme-toggle__thumb-icon');
        if (thumbIcon) {
            thumbIcon.textContent = isDark ? '☾' : '☀';
        }
        toggleButton.setAttribute('aria-pressed', String(isDark));
        toggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
}

const savedTheme = localStorage.getItem(storageKey);
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        const nextTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
        localStorage.setItem(storageKey, nextTheme);
        applyTheme(nextTheme);
    });
}