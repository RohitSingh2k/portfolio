(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();function j(){document.getElementById("year").textContent=new Date().getFullYear()}function L(e,s,t=50){return new Promise(r=>{if(!e||!s){r();return}let n=0;e.textContent="";function o(){n<s.length?(e.textContent+=s.charAt(n),n++,setTimeout(o,t)):r()}o()})}function H(e){try{window.jQuery&&window.jQuery().ripples&&$("#home").ripples({resolution:512,dropRadius:20,perturbance:.04})}catch(a){console.warn("Ripples library not loaded or failed to initialize",a)}const s=document.getElementById("hero-name"),t=document.getElementById("hero-role"),r=document.getElementById("hero-tagline");if(e.profile&&e.profile.name&&(s&&(s.textContent=""),t&&(t.textContent=""),r&&(r.textContent=""),L(s,e.profile.name,100).then(()=>L(t,e.profile.role,50)).then(()=>L(r,e.profile.tagline,30))),e.profile){const a=document.getElementById("hero-image");a&&e.profile.dpPath&&(a.src=e.profile.dpPath);const i=document.getElementById("about-bio");i&&e.profile.bio&&(i.innerHTML=`<p>${e.profile.bio}</p>`);const c=document.getElementById("contact-email");c&&e.profile.email&&(c.href=`mailto:${e.profile.email}`)}const n=document.getElementById("hero-socials"),o=document.getElementById("footer-socials");n.innerHTML="",o.innerHTML="",e.socials.forEach(a=>{const i=document.createElement("a");i.href=a.url,i.target="_blank",i.rel="noopener noreferrer",i.className="text-slate-400 hover:text-primary transition-colors text-2xl",i.innerHTML=`<i class="${a.icon}"></i>`,n.appendChild(i),o.appendChild(i.cloneNode(!0))});const l={},d=document.getElementById("skills-container");d.innerHTML="",e.skills.forEach(a=>{l[a.name.toLowerCase()]=a.icon;const i=document.createElement("div");i.className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full text-sm font-medium hover:bg-white dark:hover:bg-slate-700 hover:text-primary transition-all border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md cursor-default";const c=a.icon||"fas fa-code";i.innerHTML=`
            <i class="${c} text-lg"></i>
            <span>${a.name}</span>
        `,d.appendChild(i)});const f=document.getElementById("experience-container");for(;f.children.length>1;)f.removeChild(f.lastChild);e.experience.forEach((a,i)=>{const c=document.createElement("div"),g=i%2===0?"md:mr-auto":"md:ml-auto",x=i%2===0?"md:pr-12":"md:pl-12";c.className="relative z-10";const p=`
            <div class="relative w-full z-10">
                <!-- Timeline Dot -->
                <div class="absolute top-8 left-1 md:left-1/2 transform -translate-x-0 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-slate-50 dark:border-slate-800 z-20"></div>
                
                <div class="timeline-item mb-8 w-full md:w-1/2 ${g} box-border pl-12 ${x}">
                    <div class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700">
                        <span class="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                            ${a.period}
                        </span>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white">${a.role}</h3>
                        <h4 class="text-lg font-medium text-slate-600 dark:text-slate-300 mb-4">${a.company}</h4>
                        <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
                            ${a.description}
                        </p>
                    </div>
                </div>
            </div>
        `;c.innerHTML=p,f.innerHTML+=p});const h=document.getElementById("projects-container");h&&e.projects&&(h.innerHTML="",e.projects.forEach((a,i)=>{const c=i%3===0?"delay-100":i%3===1?"delay-200":"delay-300",g=a.responsibilities.map(y=>`<li class="flex items-start mb-2">
                    <i class="fas fa-check-circle text-primary mt-1 mr-2 text-xs flex-shrink-0"></i>
                    <span>${y}</span>
                </li>`).join(""),x=a.tech.split(",").map(y=>{const v=y.trim();return`
                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300">
                        <i class="${l[v.toLowerCase()]||"fas fa-code"}"></i>
                        <span>${v}</span>
                    </div>
                `}).join(""),p=`
                <div class="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 dark:border-slate-700 flex flex-col fade-in-up ${c}">
                    <div class="p-6 flex-grow">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white">${a.title}</h3>
                            <div class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                                Project
                            </div>
                        </div>
                        <p class="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                            ${a.description}
                        </p>
                        
                        <div class="mb-4">
                            <h4 class="text-sm font-semibold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">${e.ui.projects_responsibilities||"Responsibilities"}</h4>
                            <ul class="text-sm text-slate-500 dark:text-slate-400">
                                ${g}
                            </ul>
                        </div>
                    </div>
                    <div class="bg-slate-100 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
                        <h4 class="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-3">${e.ui.projects_techstack||"Tech Stack"}</h4>
                        <div class="flex flex-wrap gap-2">
                            ${x}
                        </div>
                    </div>
                </div>
            `;h.innerHTML+=p}))}function S(){const e=document.getElementById("mobile-menu-btn"),s=document.getElementById("mobile-menu");if(e&&s&&!s.classList.contains("hidden")){s.classList.add("hidden");const t=e.querySelector("i");t&&(t.classList.remove("fa-times"),t.classList.add("fa-bars"))}}function N(){const e=document.getElementById("mobile-menu-btn"),s=document.getElementById("mobile-menu");!e||!s||(e.addEventListener("click",()=>{const t=s.classList.toggle("hidden"),r=e.querySelector("i");t?(r.classList.remove("fa-times"),r.classList.add("fa-bars")):(r.classList.remove("fa-bars"),r.classList.add("fa-times"))}),s.querySelectorAll("a").forEach(t=>{t.addEventListener("click",()=>{S()})}))}let b=null,O=null;const k="/portfolio/";async function M(e){try{if(!b){const o=await fetch(`${k}config.json`);if(!o.ok)throw new Error("Failed to load config.json");b=await o.json()}const s=await fetch(`${k}assets/i18n/${e}.json`);if(!s.ok)throw new Error(`Failed to load language: ${e}`);const t=await s.json(),r={...b,...t,profile:{...b.profile,...t.profile}};O=r,document.documentElement.lang=e,document.querySelectorAll("[data-i18n]").forEach(o=>{const l=o.getAttribute("data-i18n");r.ui&&r.ui[l]&&(o.textContent=r.ui[l])});const n=document.getElementById("current-lang-label");n&&(n.textContent=e.toUpperCase()),document.querySelectorAll('[onclick^="switchLanguage"]').forEach(o=>{o.getAttribute("onclick").match(/'(\w+)'/)[1]===e?(o.classList.add("bg-primary","text-white"),o.classList.remove("text-gray-700","dark:text-slate-200","text-slate-600")):(o.classList.remove("bg-primary","text-white"),o.classList.add("text-slate-600","dark:text-slate-200"))}),H(r)}catch(s){console.error("Error loading language:",s)}}window.switchLanguage=function(e){localStorage.setItem("preferredLanguage",e),M(e),S()};const w="fa-moon",E="fa-sun",m=document.getElementById("theme-toggle"),u=document.getElementById("mobile-theme-toggle"),C=m?.querySelector("i"),I=u?.querySelector("i");function P(){const e=localStorage.getItem("theme"),s=window.matchMedia("(prefers-color-scheme: dark)").matches;e==="dark"||!e&&s?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),B(),q()}function q(){m&&m.addEventListener("click",T),u&&u.addEventListener("click",T)}function T(){document.documentElement.classList.contains("dark")?(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light")):(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark")),B()}function B(){const e=document.documentElement.classList.contains("dark");if(C&&(C.className=`fas ${e?E:w} text-slate-600 dark:text-yellow-400 text-lg`),I&&(I.className=`fas ${e?E:w} mr-3 w-6 text-center`),m&&m.setAttribute("aria-label",e?"Switch to Light Mode":"Switch to Dark Mode"),u){const s=u.querySelector("span");s&&(s.textContent=e?"Light Mode":"Dark Mode")}}function A(){const e=document.getElementById("contact-form");e&&e.addEventListener("submit",function(s){s.preventDefault();const t=e.querySelector('button[type="submit"]'),r=t.innerHTML;t.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Sending...',t.disabled=!0;const n=new FormData(e),o=Object.fromEntries(n),l=JSON.stringify(o);fetch(e.action,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:l}).then(d=>{if(d.ok)e.reset(),t.innerHTML='<i class="fas fa-check mr-2"></i> Sent Successfully!',t.classList.remove("bg-primary","hover:bg-secondary"),t.classList.add("bg-green-600","hover:bg-green-700"),setTimeout(()=>{t.innerHTML=r,t.disabled=!1,t.classList.add("bg-primary","hover:bg-secondary"),t.classList.remove("bg-green-600","hover:bg-green-700")},3e3);else throw new Error("Form submission failed")}).catch(d=>{console.error("Error:",d),t.innerHTML='<i class="fas fa-exclamation-circle mr-2"></i> Failed to Send',t.classList.remove("bg-primary","hover:bg-secondary"),t.classList.add("bg-red-600","hover:bg-red-700"),setTimeout(()=>{t.innerHTML=r,t.disabled=!1,t.classList.add("bg-primary","hover:bg-secondary"),t.classList.remove("bg-red-600","hover:bg-red-700")},3e3)})})}document.addEventListener("DOMContentLoaded",()=>{P();const e=localStorage.getItem("preferredLanguage")||"en";M(e),N(),j(),A()});
