/**
 * Theme Management Module
 * Handles toggling between light and dark modes and persisting preference.
 */

// Icons
const MOON_ICON = 'fa-moon';
const SUN_ICON = 'fa-sun';

// Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
const themeIcon = themeToggleBtn?.querySelector('i');
const mobileThemeIcon = mobileThemeToggleBtn?.querySelector('i');

/**
 * Initialize theme based on saved preference or system preference
 */
export function initTheme() {
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    updateIcons();
    bindEvents();
}

/**
 * Bind click events to toggle buttons
 */
function bindEvents() {
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }
}

/**
 * Toggle theme between light and dark
 */
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    
    updateIcons();
}

/**
 * Update the icons based on current theme
 */
function updateIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (themeIcon) {
        themeIcon.className = `fas ${isDark ? SUN_ICON : MOON_ICON} text-slate-600 dark:text-yellow-400 text-lg`;
    }
    
    if (mobileThemeIcon) {
        mobileThemeIcon.className = `fas ${isDark ? SUN_ICON : MOON_ICON} mr-3 w-6 text-center`;
    }

    // Update button aria-label
    if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    if (mobileThemeToggleBtn) {
        const span = mobileThemeToggleBtn.querySelector('span');
        if (span) span.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
}
