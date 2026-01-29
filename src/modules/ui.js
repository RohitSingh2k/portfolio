import { typeText } from './utils.js';

export function renderContent(config) {

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
        div.className = 'flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full text-sm font-medium hover:bg-white dark:hover:bg-slate-700 hover:text-primary transition-all border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md cursor-default';

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
                <div class="absolute top-8 left-1 md:left-1/2 transform -translate-x-0 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-slate-50 dark:border-slate-800 z-20"></div>
                
                <div class="timeline-item mb-8 w-full md:w-1/2 ${marginClass} box-border pl-12 ${desktopPaddingClass}">
                    <div class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700">
                        <span class="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                            ${exp.period}
                        </span>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white">${exp.role}</h3>
                        <h4 class="text-lg font-medium text-slate-600 dark:text-slate-300 mb-4">${exp.company}</h4>
                        <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
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
                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300">
                        <i class="${icon}"></i>
                        <span>${techName}</span>
                    </div>
                `;
            }).join('');

            const projectCard = `
                <div class="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 dark:border-slate-700 flex flex-col fade-in-up ${delayClass}">
                    <div class="p-6 flex-grow">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white">${project.title}</h3>
                            <div class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                                Project
                            </div>
                        </div>
                        <p class="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                            ${project.description}
                        </p>
                        
                        <div class="mb-4">
                            <h4 class="text-sm font-semibold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">${config.ui.projects_responsibilities || 'Responsibilities'}</h4>
                            <ul class="text-sm text-slate-500 dark:text-slate-400">
                                ${responsibilitiesList}
                            </ul>
                        </div>
                    </div>
                    <div class="bg-slate-100 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
                        <h4 class="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-3">${config.ui.projects_techstack || 'Tech Stack'}</h4>
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
        if (window.jQuery && window.jQuery().ripples) {
            $('#home').ripples({
                resolution: 512,
                dropRadius: 20,
                perturbance: 0.04,
            });
        }
    } catch (e) {
        console.warn('Ripples library not loaded or failed to initialize');
    }
}
