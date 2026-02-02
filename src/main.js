import './style.css';
import { loadLanguage } from './modules/language.js';
import { initTheme } from './modules/theme.js';
import { setupMobileMenu } from './modules/mobile-menu.js';
import { updateYear } from './modules/utils.js';
import { setupContactForm } from './modules/contact-form.js';

document.addEventListener('DOMContentLoaded', () => {
    // Default language
    initTheme();
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    loadLanguage(savedLang);
    setupMobileMenu();
    updateYear();
    setupContactForm();
});
