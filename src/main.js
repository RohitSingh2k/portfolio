import './style.css';
import { loadLanguage } from './modules/language.js';
import { setupMobileMenu } from './modules/mobile-menu.js';
import { updateYear } from './modules/utils.js';
import { setupContactForm } from './modules/contact-form.js';

document.addEventListener('DOMContentLoaded', () => {
    // Default language
    loadLanguage('en');
    setupMobileMenu();
    updateYear();
    setupContactForm();
});
