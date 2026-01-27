import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    // Default language
    loadLanguage('en');
    setupMobileMenu();
    updateYear();
});

let commonConfig = null;

async function loadLanguage(lang) {
    try {

        if (!commonConfig) {
            const commonRes = await fetch('/config.json');
            if (!commonRes.ok) throw new Error('Failed to load config.json');
            commonConfig = await commonRes.json();
        }

        const response = await fetch(`/assets/i18n/${lang}.json`);
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
            langLabel.textContent = lang === 'en' ? 'EN' : 'HI';
        }

        // Render Dynamic Content
        renderContent(config);

    } catch (error) {
        console.error('Error loading language:', error);
    }
}

// Expose to window for HTML onclick events
window.switchLanguage = function (lang) {
    loadLanguage(lang);
    // Close mobile menu if open
    document.getElementById('mobile-menu').classList.add('hidden');
}

function renderContent(config) {

    // Start typing effect sequentially
    const nameEl = document.getElementById('hero-name');
    const roleEl = document.getElementById('hero-role');
    const taglineEl = document.getElementById('hero-tagline');

    // Clear initial content
    nameEl.textContent = '';
    roleEl.textContent = '';
    taglineEl.textContent = '';

    typeText(nameEl, config.profile.name, 100)
        .then(() => typeText(roleEl, config.profile.role, 50))
        .then(() => typeText(taglineEl, config.profile.tagline, 30));
    document.getElementById('hero-image').src = config.profile.dpPath;
    document.getElementById('about-bio').innerHTML = `<p>${config.profile.bio}</p>`;
    if (document.getElementById('contact-email')) {
        document.getElementById('contact-email').href = `mailto:${config.profile.email}`;
    }

    // Socials (Hero & Footer)
    const heroSocials = document.getElementById('hero-socials');
    const footerSocials = document.getElementById('footer-socials');

    // Clear existing (important when switching languages)
    heroSocials.innerHTML = '';
    footerSocials.innerHTML = '';

    config.socials.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'text-slate-400 hover:text-primary transition-colors text-2xl';
        link.innerHTML = `<i class="${social.icon}"></i>`;

        // Clone for footer to avoid moving the element
        heroSocials.appendChild(link);
        footerSocials.appendChild(link.cloneNode(true));
    });

    // Skills
    // Skills Map for Projects
    const skillIcons = {};
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    config.skills.forEach(skill => {
        // Populate map for later use in projects
        skillIcons[skill.name.toLowerCase()] = skill.icon;

        const div = document.createElement('div');
        div.className = 'flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-full text-sm font-medium hover:bg-white hover:text-primary transition-all border border-slate-200 shadow-sm hover:shadow-md cursor-default';

        // Handle both Devicon and FontAwesome
        const iconClass = skill.icon || 'fas fa-code';

        div.innerHTML = `
            <i class="${iconClass} text-lg"></i>
            <span>${skill.name}</span>
        `;
        skillsContainer.appendChild(div);
    });

    // Experience
    const experienceContainer = document.getElementById('experience-container');
    // Clear experience items but keep the vertical line (first child)
    // The first child is the vertical line div
    while (experienceContainer.children.length > 1) {
        experienceContainer.removeChild(experienceContainer.lastChild);
    }

    config.experience.forEach((exp, index) => {
        const item = document.createElement('div');
        // Responsive timeline layout classes
        const alignmentClass = index % 2 === 0 ? 'md:flex-row-reverse' : '';
        const textAlignment = index % 2 === 0 ? 'md:text-right' : 'md:text-left';
        const marginClass = index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto';
        // Add padding to the side facing the timeline (center)
        const desktopPaddingClass = index % 2 === 0 ? 'md:pr-12' : 'md:pl-12';

        item.className = `relative z-10`;

        const content = `
            <div class="relative w-full z-10">
                <!-- Timeline Dot -->
                <div class="absolute top-8 left-1 md:left-1/2 transform -translate-x-0 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-slate-50 z-20"></div>
                
                <div class="timeline-item mb-8 w-full md:w-1/2 ${marginClass} box-border pl-12 ${desktopPaddingClass}">
                    <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-100">
                        <span class="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                            ${exp.period}
                        </span>
                        <h3 class="text-xl font-bold text-slate-900">${exp.role}</h3>
                        <h4 class="text-lg font-medium text-slate-600 mb-4">${exp.company}</h4>
                        <p class="text-slate-500 leading-relaxed">
                            ${exp.description}
                        </p>
                    </div>
                </div>
            </div>
        `;

        item.innerHTML = content;

        experienceContainer.innerHTML += content;
    });

    // Projects
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer && config.projects) {
        projectsContainer.innerHTML = ''; // Clear for language switch
        config.projects.forEach((project, index) => {
            const delayClass = index % 3 === 0 ? 'delay-100' : index % 3 === 1 ? 'delay-200' : 'delay-300';

            // Create responsibilities list
            const responsibilitiesList = project.responsibilities.map(resp =>
                `<li class="flex items-start mb-2">
                    <i class="fas fa-check-circle text-primary mt-1 mr-2 text-xs flex-shrink-0"></i>
                    <span>${resp}</span>
                </li>`
            ).join('');

            // Generate Tech Stack Chips
            const techStackHtml = project.tech.split(',').map(t => {
                const techName = t.trim();
                const icon = skillIcons[techName.toLowerCase()] || 'fas fa-code';

                // If it's a font-awesome icon (default), ensure it has the classes
                // If it matches a known skill, it uses that icon.
                // Simple heuristic: if icon starts with 'devicon', it's colored. if 'fas', it's generic.

                return `
                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                        <i class="${icon}"></i>
                        <span>${techName}</span>
                    </div>
                `;
            }).join('');

            const projectCard = `
                <div class="bg-slate-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 flex flex-col fade-in-up ${delayClass}">
                    <div class="p-6 flex-grow">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-bold text-slate-900">${project.title}</h3>
                            <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200">
                                Project
                            </div>
                        </div>
                        <p class="text-slate-600 mb-4 text-sm leading-relaxed">
                            ${project.description}
                        </p>
                        
                        <div class="mb-4">
                            <h4 class="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">${config.ui.projects_responsibilities || 'Responsibilities'}</h4>
                            <ul class="text-sm text-slate-500">
                                ${responsibilitiesList}
                            </ul>
                        </div>
                    </div>
                    <div class="bg-slate-100 px-6 py-4 border-t border-slate-200">
                        <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">${config.ui.projects_techstack || 'Tech Stack'}</h4>
                        <div class="flex flex-wrap gap-2">
                            ${techStackHtml}
                        </div>
                    </div>
                </div>
            `;
            projectsContainer.innerHTML += projectCard;
        });
    }

    // Initialize Ripples
    try {
        $('#home').ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
        });
    } catch (e) {
        console.warn('Ripples library not loaded or failed to initialize');
    }
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        const icon = btn.querySelector('i');
        if (menu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            btn.querySelector('i').classList.remove('fa-times');
            btn.querySelector('i').classList.add('fa-bars');
        });
    });
}

function updateYear() {
    document.getElementById('year').textContent = new Date().getFullYear();

}
/**
     * Typing effect helper function
     * @param {HTMLElement} element 
     * @param {string} text 
     * @param {number} speed 
     * @returns {Promise}
     */
function typeText(element, text, speed = 50) {
    return new Promise((resolve) => {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }

        type();
    });
}

