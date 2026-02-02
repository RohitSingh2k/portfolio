(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();function B(){document.getElementById("year").textContent=new Date().getFullYear()}function v(e,o,t=50){return new Promise(i=>{let s=0;e.textContent="";function n(){s<o.length?(e.textContent+=o.charAt(s),s++,setTimeout(n,t)):i()}n()})}function j(e){const o=document.getElementById("hero-name"),t=document.getElementById("hero-role"),i=document.getElementById("hero-tagline");o.textContent="",t.textContent="",i.textContent="",v(o,e.profile.name,100).then(()=>v(t,e.profile.role,50)).then(()=>v(i,e.profile.tagline,30)),document.getElementById("hero-image").src=e.profile.dpPath,document.getElementById("about-bio").innerHTML=`<p>${e.profile.bio}</p>`,document.getElementById("contact-email")&&(document.getElementById("contact-email").href=`mailto:${e.profile.email}`);const s=document.getElementById("hero-socials"),n=document.getElementById("footer-socials");s.innerHTML="",n.innerHTML="",e.socials.forEach(r=>{const a=document.createElement("a");a.href=r.url,a.target="_blank",a.rel="noopener noreferrer",a.className="text-slate-400 hover:text-primary transition-colors text-2xl",a.innerHTML=`<i class="${r.icon}"></i>`,s.appendChild(a),n.appendChild(a.cloneNode(!0))});const l={},d=document.getElementById("skills-container");d.innerHTML="",e.skills.forEach(r=>{l[r.name.toLowerCase()]=r.icon;const a=document.createElement("div");a.className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full text-sm font-medium hover:bg-white dark:hover:bg-slate-700 hover:text-primary transition-all border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md cursor-default";const c=r.icon||"fas fa-code";a.innerHTML=`
            <i class="${c} text-lg"></i>
            <span>${r.name}</span>
        `,d.appendChild(a)});const f=document.getElementById("experience-container");for(;f.children.length>1;)f.removeChild(f.lastChild);e.experience.forEach((r,a)=>{const c=document.createElement("div"),h=a%2===0?"md:mr-auto":"md:ml-auto",x=a%2===0?"md:pr-12":"md:pl-12";c.className="relative z-10";const p=`
            <div class="relative w-full z-10">
                <!-- Timeline Dot -->
                <div class="absolute top-8 left-1 md:left-1/2 transform -translate-x-0 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-slate-50 dark:border-slate-800 z-20"></div>
                
                <div class="timeline-item mb-8 w-full md:w-1/2 ${h} box-border pl-12 ${x}">
                    <div class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700">
                        <span class="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                            ${r.period}
                        </span>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white">${r.role}</h3>
                        <h4 class="text-lg font-medium text-slate-600 dark:text-slate-300 mb-4">${r.company}</h4>
                        <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
                            ${r.description}
                        </p>
                    </div>
                </div>
            </div>
        `;c.innerHTML=p,f.innerHTML+=p});const g=document.getElementById("projects-container");g&&e.projects&&(g.innerHTML="",e.projects.forEach((r,a)=>{const c=a%3===0?"delay-100":a%3===1?"delay-200":"delay-300",h=r.responsibilities.map(y=>`<li class="flex items-start mb-2">
                    <i class="fas fa-check-circle text-primary mt-1 mr-2 text-xs flex-shrink-0"></i>
                    <span>${y}</span>
                </li>`).join(""),x=r.tech.split(",").map(y=>{const L=y.trim();return`
                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300">
                        <i class="${l[L.toLowerCase()]||"fas fa-code"}"></i>
                        <span>${L}</span>
                    </div>
                `}).join(""),p=`
                <div class="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 dark:border-slate-700 flex flex-col fade-in-up ${c}">
                    <div class="p-6 flex-grow">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white">${r.title}</h3>
                            <div class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                                Project
                            </div>
                        </div>
                        <p class="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                            ${r.description}
                        </p>
                        
                        <div class="mb-4">
                            <h4 class="text-sm font-semibold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">${e.ui.projects_responsibilities||"Responsibilities"}</h4>
                            <ul class="text-sm text-slate-500 dark:text-slate-400">
                                ${h}
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
            `;g.innerHTML+=p}));try{window.jQuery&&window.jQuery().ripples&&$("#home").ripples({resolution:512,dropRadius:20,perturbance:.04})}catch{console.warn("Ripples library not loaded or failed to initialize")}}let b=null,H=null;const k="/portfolio/";async function S(e){try{if(!b){const n=await fetch(`${k}config.json`);if(!n.ok)throw new Error("Failed to load config.json");b=await n.json()}const o=await fetch(`${k}assets/i18n/${e}.json`);if(!o.ok)throw new Error(`Failed to load language: ${e}`);const t=await o.json(),i={...b,...t,profile:{...b.profile,...t.profile}};H=i,document.documentElement.lang=e,document.querySelectorAll("[data-i18n]").forEach(n=>{const l=n.getAttribute("data-i18n");i.ui&&i.ui[l]&&(n.textContent=i.ui[l])});const s=document.getElementById("current-lang-label");s&&(s.textContent=e.toUpperCase()),j(i)}catch(o){console.error("Error loading language:",o)}}window.switchLanguage=function(e){localStorage.setItem("preferredLanguage",e),S(e);const o=document.getElementById("mobile-menu");o&&o.classList.add("hidden")};const w="fa-moon",E="fa-sun",m=document.getElementById("theme-toggle"),u=document.getElementById("mobile-theme-toggle"),C=m?.querySelector("i"),I=u?.querySelector("i");function N(){const e=localStorage.getItem("theme"),o=window.matchMedia("(prefers-color-scheme: dark)").matches;e==="dark"||!e&&o?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),M(),O()}function O(){m&&m.addEventListener("click",T),u&&u.addEventListener("click",T)}function T(){document.documentElement.classList.contains("dark")?(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light")):(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark")),M()}function M(){const e=document.documentElement.classList.contains("dark");if(C&&(C.className=`fas ${e?E:w} text-slate-600 dark:text-yellow-400 text-lg`),I&&(I.className=`fas ${e?E:w} mr-3 w-6 text-center`),m&&m.setAttribute("aria-label",e?"Switch to Light Mode":"Switch to Dark Mode"),u){const o=u.querySelector("span");o&&(o.textContent=e?"Light Mode":"Dark Mode")}}function q(){const e=document.getElementById("mobile-menu-btn"),o=document.getElementById("mobile-menu");!e||!o||(e.addEventListener("click",()=>{o.classList.toggle("hidden");const t=e.querySelector("i");o.classList.contains("hidden")?(t.classList.remove("fa-times"),t.classList.add("fa-bars")):(t.classList.remove("fa-bars"),t.classList.add("fa-times"))}),o.querySelectorAll("a").forEach(t=>{t.addEventListener("click",()=>{o.classList.add("hidden"),e.querySelector("i").classList.remove("fa-times"),e.querySelector("i").classList.add("fa-bars")})}))}function D(){const e=document.getElementById("contact-form");e&&e.addEventListener("submit",function(o){o.preventDefault();const t=e.querySelector('button[type="submit"]'),i=t.innerHTML;t.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Sending...',t.disabled=!0;const s=new FormData(e),n=Object.fromEntries(s),l=JSON.stringify(n);fetch(e.action,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:l}).then(d=>{if(d.ok)e.reset(),t.innerHTML='<i class="fas fa-check mr-2"></i> Sent Successfully!',t.classList.remove("bg-primary","hover:bg-secondary"),t.classList.add("bg-green-600","hover:bg-green-700"),setTimeout(()=>{t.innerHTML=i,t.disabled=!1,t.classList.add("bg-primary","hover:bg-secondary"),t.classList.remove("bg-green-600","hover:bg-green-700")},3e3);else throw new Error("Form submission failed")}).catch(d=>{console.error("Error:",d),t.innerHTML='<i class="fas fa-exclamation-circle mr-2"></i> Failed to Send',t.classList.remove("bg-primary","hover:bg-secondary"),t.classList.add("bg-red-600","hover:bg-red-700"),setTimeout(()=>{t.innerHTML=i,t.disabled=!1,t.classList.add("bg-primary","hover:bg-secondary"),t.classList.remove("bg-red-600","hover:bg-red-700")},3e3)})})}document.addEventListener("DOMContentLoaded",()=>{N();const e=localStorage.getItem("preferredLanguage")||"en";S(e),q(),B(),D()});
