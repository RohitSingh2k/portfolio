(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function l(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=l(t);fetch(t.href,n)}})();document.addEventListener("DOMContentLoaded",()=>{w("en"),C(),I()});let u=null,E=null;const v="/portfolio/";async function w(e){try{if(!u){const n=await fetch(`${v}config.json`);if(!n.ok)throw new Error("Failed to load config.json");u=await n.json()}const o=await fetch(`${v}assets/i18n/${e}.json`);if(!o.ok)throw new Error(`Failed to load language: ${e}`);const l=await o.json(),i={...u,...l,profile:{...u.profile,...l.profile}};E=i,document.documentElement.lang=e,document.querySelectorAll("[data-i18n]").forEach(n=>{const a=n.getAttribute("data-i18n");i.ui&&i.ui[a]&&(n.textContent=i.ui[a])});const t=document.getElementById("current-lang-label");t&&(t.textContent=e==="en"?"EN":"HI"),L(i)}catch(o){console.error("Error loading language:",o)}}window.switchLanguage=function(e){w(e),document.getElementById("mobile-menu").classList.add("hidden")};function L(e){const o=document.getElementById("hero-name"),l=document.getElementById("hero-role"),i=document.getElementById("hero-tagline");o.textContent="",l.textContent="",i.textContent="",x(o,e.profile.name,100).then(()=>x(l,e.profile.role,50)).then(()=>x(i,e.profile.tagline,30)),document.getElementById("hero-image").src=e.profile.dpPath,document.getElementById("about-bio").innerHTML=`<p>${e.profile.bio}</p>`,document.getElementById("contact-email")&&(document.getElementById("contact-email").href=`mailto:${e.profile.email}`);const t=document.getElementById("hero-socials"),n=document.getElementById("footer-socials");t.innerHTML="",n.innerHTML="",e.socials.forEach(s=>{const r=document.createElement("a");r.href=s.url,r.target="_blank",r.rel="noopener noreferrer",r.className="text-slate-400 hover:text-primary transition-colors text-2xl",r.innerHTML=`<i class="${s.icon}"></i>`,t.appendChild(r),n.appendChild(r.cloneNode(!0))});const a={},g=document.getElementById("skills-container");g.innerHTML="",e.skills.forEach(s=>{a[s.name.toLowerCase()]=s.icon;const r=document.createElement("div");r.className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-full text-sm font-medium hover:bg-white hover:text-primary transition-all border border-slate-200 shadow-sm hover:shadow-md cursor-default";const c=s.icon||"fas fa-code";r.innerHTML=`
            <i class="${c} text-lg"></i>
            <span>${s.name}</span>
        `,g.appendChild(r)});const d=document.getElementById("experience-container");for(;d.children.length>1;)d.removeChild(d.lastChild);e.experience.forEach((s,r)=>{const c=document.createElement("div"),f=r%2===0?"md:mr-auto":"md:ml-auto",h=r%2===0?"md:pr-12":"md:pl-12";c.className="relative z-10";const m=`
            <div class="relative w-full z-10">
                <!-- Timeline Dot -->
                <div class="absolute top-8 left-1 md:left-1/2 transform -translate-x-0 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-slate-50 z-20"></div>
                
                <div class="timeline-item mb-8 w-full md:w-1/2 ${f} box-border pl-12 ${h}">
                    <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-100">
                        <span class="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                            ${s.period}
                        </span>
                        <h3 class="text-xl font-bold text-slate-900">${s.role}</h3>
                        <h4 class="text-lg font-medium text-slate-600 mb-4">${s.company}</h4>
                        <p class="text-slate-500 leading-relaxed">
                            ${s.description}
                        </p>
                    </div>
                </div>
            </div>
        `;c.innerHTML=m,d.innerHTML+=m});const p=document.getElementById("projects-container");p&&e.projects&&(p.innerHTML="",e.projects.forEach((s,r)=>{const c=r%3===0?"delay-100":r%3===1?"delay-200":"delay-300",f=s.responsibilities.map(b=>`<li class="flex items-start mb-2">
                    <i class="fas fa-check-circle text-primary mt-1 mr-2 text-xs flex-shrink-0"></i>
                    <span>${b}</span>
                </li>`).join(""),h=s.tech.split(",").map(b=>{const y=b.trim();return`
                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                        <i class="${a[y.toLowerCase()]||"fas fa-code"}"></i>
                        <span>${y}</span>
                    </div>
                `}).join(""),m=`
                <div class="bg-slate-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 flex flex-col fade-in-up ${c}">
                    <div class="p-6 flex-grow">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-bold text-slate-900">${s.title}</h3>
                            <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200">
                                Project
                            </div>
                        </div>
                        <p class="text-slate-600 mb-4 text-sm leading-relaxed">
                            ${s.description}
                        </p>
                        
                        <div class="mb-4">
                            <h4 class="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">${e.ui.projects_responsibilities||"Responsibilities"}</h4>
                            <ul class="text-sm text-slate-500">
                                ${f}
                            </ul>
                        </div>
                    </div>
                    <div class="bg-slate-100 px-6 py-4 border-t border-slate-200">
                        <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">${e.ui.projects_techstack||"Tech Stack"}</h4>
                        <div class="flex flex-wrap gap-2">
                            ${h}
                        </div>
                    </div>
                </div>
            `;p.innerHTML+=m}));try{$("#home").ripples({resolution:512,dropRadius:20,perturbance:.04})}catch{console.warn("Ripples library not loaded or failed to initialize")}}function C(){const e=document.getElementById("mobile-menu-btn"),o=document.getElementById("mobile-menu");e.addEventListener("click",()=>{o.classList.toggle("hidden");const l=e.querySelector("i");o.classList.contains("hidden")?(l.classList.remove("fa-times"),l.classList.add("fa-bars")):(l.classList.remove("fa-bars"),l.classList.add("fa-times"))}),o.querySelectorAll("a").forEach(l=>{l.addEventListener("click",()=>{o.classList.add("hidden"),e.querySelector("i").classList.remove("fa-times"),e.querySelector("i").classList.add("fa-bars")})})}function I(){document.getElementById("year").textContent=new Date().getFullYear()}function x(e,o,l=50){return new Promise(i=>{let t=0;e.textContent="";function n(){t<o.length?(e.textContent+=o.charAt(t),t++,setTimeout(n,l)):i()}n()})}
