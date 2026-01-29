(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();function B(){document.getElementById("year").textContent=new Date().getFullYear()}function v(e,n,t=50){return new Promise(i=>{let o=0;e.textContent="";function s(){o<n.length?(e.textContent+=n.charAt(o),o++,setTimeout(s,t)):i()}s()})}function j(e){const n=document.getElementById("hero-name"),t=document.getElementById("hero-role"),i=document.getElementById("hero-tagline");n.textContent="",t.textContent="",i.textContent="",v(n,e.profile.name,100).then(()=>v(t,e.profile.role,50)).then(()=>v(i,e.profile.tagline,30)),document.getElementById("hero-image").src=e.profile.dpPath,document.getElementById("about-bio").innerHTML=`<p>${e.profile.bio}</p>`,document.getElementById("contact-email")&&(document.getElementById("contact-email").href=`mailto:${e.profile.email}`);const o=document.getElementById("hero-socials"),s=document.getElementById("footer-socials");o.innerHTML="",s.innerHTML="",e.socials.forEach(r=>{const a=document.createElement("a");a.href=r.url,a.target="_blank",a.rel="noopener noreferrer",a.className="text-slate-400 hover:text-primary transition-colors text-2xl",a.innerHTML=`<i class="${r.icon}"></i>`,o.appendChild(a),s.appendChild(a.cloneNode(!0))});const l={},d=document.getElementById("skills-container");d.innerHTML="",e.skills.forEach(r=>{l[r.name.toLowerCase()]=r.icon;const a=document.createElement("div");a.className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full text-sm font-medium hover:bg-white dark:hover:bg-slate-700 hover:text-primary transition-all border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md cursor-default";const c=r.icon||"fas fa-code";a.innerHTML=`
            <i class="${c} text-lg"></i>
            <span>${r.name}</span>
        `,d.appendChild(a)});const f=document.getElementById("experience-container");for(;f.children.length>1;)f.removeChild(f.lastChild);e.experience.forEach((r,a)=>{const c=document.createElement("div"),g=a%2===0?"md:mr-auto":"md:ml-auto",x=a%2===0?"md:pr-12":"md:pl-12";c.className="relative z-10";const p=`
            <div class="relative w-full z-10">
                <!-- Timeline Dot -->
                <div class="absolute top-8 left-1 md:left-1/2 transform -translate-x-0 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-slate-50 dark:border-slate-800 z-20"></div>
                
                <div class="timeline-item mb-8 w-full md:w-1/2 ${g} box-border pl-12 ${x}">
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
        `;c.innerHTML=p,f.innerHTML+=p});const h=document.getElementById("projects-container");h&&e.projects&&(h.innerHTML="",e.projects.forEach((r,a)=>{const c=a%3===0?"delay-100":a%3===1?"delay-200":"delay-300",g=r.responsibilities.map(y=>`<li class="flex items-start mb-2">
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
            `;h.innerHTML+=p}));try{window.jQuery&&window.jQuery().ripples&&$("#home").ripples({resolution:512,dropRadius:20,perturbance:.04})}catch{console.warn("Ripples library not loaded or failed to initialize")}}let b=null,H=null;const k="/portfolio/";async function M(e){try{if(!b){const s=await fetch(`${k}config.json`);if(!s.ok)throw new Error("Failed to load config.json");b=await s.json()}const n=await fetch(`${k}assets/i18n/${e}.json`);if(!n.ok)throw new Error(`Failed to load language: ${e}`);const t=await n.json(),i={...b,...t,profile:{...b.profile,...t.profile}};H=i,document.documentElement.lang=e,document.querySelectorAll("[data-i18n]").forEach(s=>{const l=s.getAttribute("data-i18n");i.ui&&i.ui[l]&&(s.textContent=i.ui[l])});const o=document.getElementById("current-lang-label");o&&(o.textContent=e==="en"?"EN":"HI"),j(i)}catch(n){console.error("Error loading language:",n)}}window.switchLanguage=function(e){M(e);const n=document.getElementById("mobile-menu");n&&n.classList.add("hidden")};const w="fa-moon",E="fa-sun",m=document.getElementById("theme-toggle"),u=document.getElementById("mobile-theme-toggle"),C=m?.querySelector("i"),I=u?.querySelector("i");function N(){const e=localStorage.getItem("theme"),n=window.matchMedia("(prefers-color-scheme: dark)").matches;e==="dark"||!e&&n?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),S(),O()}function O(){m&&m.addEventListener("click",T),u&&u.addEventListener("click",T)}function T(){document.documentElement.classList.contains("dark")?(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light")):(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark")),S()}function S(){const e=document.documentElement.classList.contains("dark");if(C&&(C.className=`fas ${e?E:w} text-slate-600 dark:text-yellow-400 text-lg`),I&&(I.className=`fas ${e?E:w} mr-3 w-6 text-center`),m&&m.setAttribute("aria-label",e?"Switch to Light Mode":"Switch to Dark Mode"),u){const n=u.querySelector("span");n&&(n.textContent=e?"Light Mode":"Dark Mode")}}function q(){const e=document.getElementById("mobile-menu-btn"),n=document.getElementById("mobile-menu");!e||!n||(e.addEventListener("click",()=>{n.classList.toggle("hidden");const t=e.querySelector("i");n.classList.contains("hidden")?(t.classList.remove("fa-times"),t.classList.add("fa-bars")):(t.classList.remove("fa-bars"),t.classList.add("fa-times"))}),n.querySelectorAll("a").forEach(t=>{t.addEventListener("click",()=>{n.classList.add("hidden"),e.querySelector("i").classList.remove("fa-times"),e.querySelector("i").classList.add("fa-bars")})}))}function D(){const e=document.getElementById("contact-form");e&&e.addEventListener("submit",function(n){n.preventDefault();const t=e.querySelector('button[type="submit"]'),i=t.innerHTML;t.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Sending...',t.disabled=!0;const o=new FormData(e),s=Object.fromEntries(o),l=JSON.stringify(s);fetch(e.action,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:l}).then(d=>{if(d.ok)e.reset(),t.innerHTML='<i class="fas fa-check mr-2"></i> Sent Successfully!',t.classList.remove("bg-primary","hover:bg-secondary"),t.classList.add("bg-green-600","hover:bg-green-700"),setTimeout(()=>{t.innerHTML=i,t.disabled=!1,t.classList.add("bg-primary","hover:bg-secondary"),t.classList.remove("bg-green-600","hover:bg-green-700")},3e3);else throw new Error("Form submission failed")}).catch(d=>{console.error("Error:",d),t.innerHTML='<i class="fas fa-exclamation-circle mr-2"></i> Failed to Send',t.classList.remove("bg-primary","hover:bg-secondary"),t.classList.add("bg-red-600","hover:bg-red-700"),setTimeout(()=>{t.innerHTML=i,t.disabled=!1,t.classList.add("bg-primary","hover:bg-secondary"),t.classList.remove("bg-red-600","hover:bg-red-700")},3e3)})})}document.addEventListener("DOMContentLoaded",()=>{N(),M("en"),q(),B(),D()});
