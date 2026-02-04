import { renderContent } from './ui.js';
import { closeMobileMenu } from './mobile-menu.js';

let commonConfig = null;
let currentConfig = null;

const BASE_URL = import.meta.env.BASE_URL;

export async function loadLanguage(lang) {
    try {
        if (!commonConfig) {
            const commonRes = await fetch(`${BASE_URL}config.json`);
            if (!commonRes.ok) throw new Error('Failed to load config.json');
            commonConfig = await commonRes.json();
        }

        const response = await fetch(`${BASE_URL}assets/i18n/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load language: ${lang}`);
        }
        const langConfig = await response.json();

        const config = {
            ...commonConfig,
            ...langConfig,
            profile: {
                ...commonConfig.profile,
                ...langConfig.profile
            }
        };

        currentConfig = config; // Update global state

        // Update Document Language
        document.documentElement.lang = lang;

        // Update Static Text
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (config.ui && config.ui[key]) {
                element.textContent = config.ui[key];
            }
        });

        // Update Language Switcher Label
        const langLabel = document.getElementById('current-lang-label');
        if (langLabel) {
            langLabel.textContent = lang.toUpperCase();
        }

        // Update Active State in Mobile Menu & Dropdown
        document.querySelectorAll('[onclick^="switchLanguage"]').forEach(btn => {
            const btnLang = btn.getAttribute('onclick').match(/'(\w+)'/)[1];
            if (btnLang === lang) {
                btn.classList.add('bg-primary', 'text-white');
                btn.classList.remove('text-gray-700', 'dark:text-slate-200', 'text-slate-600');
            } else {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('text-slate-600', 'dark:text-slate-200');
            }
        });

        // Render Dynamic Content
        renderContent(config);

    } catch (error) {
        console.error('Error loading language:', error);
    }
}



// Expose to window for HTML onclick events
window.switchLanguage = function (lang) {
    localStorage.setItem('preferredLanguage', lang);
    loadLanguage(lang);
    closeMobileMenu();
}
