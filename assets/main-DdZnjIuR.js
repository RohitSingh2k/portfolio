(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();document.addEventListener("DOMContentLoaded",()=>{L("en"),T(),B(),E()});function E(){const e=document.getElementById("contact-form");e&&e.addEventListener("submit",function(o){o.preventDefault();const t=e.querySelector('button[type="submit"]'),a=t.innerHTML;t.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Sending...',t.disabled=!0;const n=new FormData(e);fetch(e.action,{method:"POST",body:n,headers:{Accept:"application/json"}}).then(s=>{if(s.ok)e.reset(),t.innerHTML='<i class="fas fa-check mr-2"></i> Sent Successfully!',t.classList.remove("bg-primary","hover:bg-secondary"),t.classList.add("bg-green-600","hover:bg-green-700"),setTimeout(()=>{t.innerHTML=a,t.disabled=!1,t.classList.add("bg-primary","hover:bg-secondary"),t.classList.remove("bg-green-600","hover:bg-green-700")},3e3);else throw new Error("Form submission failed")}).catch(s=>{console.error("Error:",s),t.innerHTML='<i class="fas fa-exclamation-circle mr-2"></i> Failed to Send',t.classList.remove("bg-primary","hover:bg-secondary"),t.classList.add("bg-red-600","hover:bg-red-700"),setTimeout(()=>{t.innerHTML=a,t.disabled=!1,t.classList.add("bg-primary","hover:bg-secondary"),t.classList.remove("bg-red-600","hover:bg-red-700")},3e3)})})}let u=null,w=null;const v="/portfolio/";async function L(e){try{if(!u){const s=await fetch(`${v}config.json`);if(!s.ok)throw new Error("Failed to load config.json");u=await s.json()}const o=await fetch(`${v}assets/i18n/${e}.json`);if(!o.ok)throw new Error(`Failed to load language: ${e}`);const t=await o.json(),a={...u,...t,profile:{...u.profile,...t.profile}};w=a,document.documentElement.lang=e,document.querySelectorAll("[data-i18n]").forEach(s=>{const l=s.getAttribute("data-i18n");a.ui&&a.ui[l]&&(s.textContent=a.ui[l])});const n=document.getElementById("current-lang-label");n&&(n.textContent=e==="en"?"EN":"HI"),C(a)}catch(o){console.error("Error loading language:",o)}}window.switchLanguage=function(e){L(e),document.getElementById("mobile-menu").classList.add("hidden")};function C(e){const o=document.getElementById("hero-name"),t=document.getElementById("hero-role"),a=document.getElementById("hero-tagline");o.textContent="",t.textContent="",a.textContent="",g(o,e.profile.name,100).then(()=>g(t,e.profile.role,50)).then(()=>g(a,e.profile.tagline,30)),document.getElementById("hero-image").src=e.profile.dpPath,document.getElementById("about-bio").innerHTML=`<p>${e.profile.bio}</p>`,document.getElementById("contact-email")&&(document.getElementById("contact-email").href=`mailto:${e.profile.email}`);const n=document.getElementById("hero-socials"),s=document.getElementById("footer-socials");n.innerHTML="",s.innerHTML="",e.socials.forEach(r=>{const i=document.createElement("a");i.href=r.url,i.target="_blank",i.rel="noopener noreferrer",i.className="text-slate-400 hover:text-primary transition-colors text-2xl",i.innerHTML=`<i class="${r.icon}"></i>`,n.appendChild(i),s.appendChild(i.cloneNode(!0))});const l={},y=document.getElementById("skills-container");y.innerHTML="",e.skills.forEach(r=>{l[r.name.toLowerCase()]=r.icon;const i=document.createElement("div");i.className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-full text-sm font-medium hover:bg-white hover:text-primary transition-all border border-slate-200 shadow-sm hover:shadow-md cursor-default";const c=r.icon||"fas fa-code";i.innerHTML=`
            <i class="${c} text-lg"></i>
            <span>${r.name}</span>
        `,y.appendChild(i)});const d=document.getElementById("experience-container");for(;d.children.length>1;)d.removeChild(d.lastChild);e.experience.forEach((r,i)=>{const c=document.createElement("div"),p=i%2===0?"md:mr-auto":"md:ml-auto",b=i%2===0?"md:pr-12":"md:pl-12";c.className="relative z-10";const m=`
            <div class="relative w-full z-10">
                <!-- Timeline Dot -->
                <div class="absolute top-8 left-1 md:left-1/2 transform -translate-x-0 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-slate-50 z-20"></div>
                
                <div class="timeline-item mb-8 w-full md:w-1/2 ${p} box-border pl-12 ${b}">
                    <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-100">
                        <span class="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                            ${r.period}
                        </span>
                        <h3 class="text-xl font-bold text-slate-900">${r.role}</h3>
                        <h4 class="text-lg font-medium text-slate-600 mb-4">${r.company}</h4>
                        <p class="text-slate-500 leading-relaxed">
                            ${r.description}
                        </p>
                    </div>
                </div>
            </div>
        `;c.innerHTML=m,d.innerHTML+=m});const f=document.getElementById("projects-container");f&&e.projects&&(f.innerHTML="",e.projects.forEach((r,i)=>{const c=i%3===0?"delay-100":i%3===1?"delay-200":"delay-300",p=r.responsibilities.map(h=>`<li class="flex items-start mb-2">
                    <i class="fas fa-check-circle text-primary mt-1 mr-2 text-xs flex-shrink-0"></i>
                    <span>${h}</span>
                </li>`).join(""),b=r.tech.split(",").map(h=>{const x=h.trim();return`
                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                        <i class="${l[x.toLowerCase()]||"fas fa-code"}"></i>
                        <span>${x}</span>
                    </div>
                `}).join(""),m=`
                <div class="bg-slate-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 flex flex-col fade-in-up ${c}">
                    <div class="p-6 flex-grow">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-bold text-slate-900">${r.title}</h3>
                            <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200">
                                Project
                            </div>
                        </div>
                        <p class="text-slate-600 mb-4 text-sm leading-relaxed">
                            ${r.description}
                        </p>
                        
                        <div class="mb-4">
                            <h4 class="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">${e.ui.projects_responsibilities||"Responsibilities"}</h4>
                            <ul class="text-sm text-slate-500">
                                ${p}
                            </ul>
                        </div>
                    </div>
                    <div class="bg-slate-100 px-6 py-4 border-t border-slate-200">
                        <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">${e.ui.projects_techstack||"Tech Stack"}</h4>
                        <div class="flex flex-wrap gap-2">
                            ${b}
                        </div>
                    </div>
                </div>
            `;f.innerHTML+=m}));try{$("#home").ripples({resolution:512,dropRadius:20,perturbance:.04})}catch{console.warn("Ripples library not loaded or failed to initialize")}}function T(){const e=document.getElementById("mobile-menu-btn"),o=document.getElementById("mobile-menu");e.addEventListener("click",()=>{o.classList.toggle("hidden");const t=e.querySelector("i");o.classList.contains("hidden")?(t.classList.remove("fa-times"),t.classList.add("fa-bars")):(t.classList.remove("fa-bars"),t.classList.add("fa-times"))}),o.querySelectorAll("a").forEach(t=>{t.addEventListener("click",()=>{o.classList.add("hidden"),e.querySelector("i").classList.remove("fa-times"),e.querySelector("i").classList.add("fa-bars")})})}function B(){document.getElementById("year").textContent=new Date().getFullYear()}function g(e,o,t=50){return new Promise(a=>{let n=0;e.textContent="";function s(){n<o.length?(e.textContent+=o.charAt(n),n++,setTimeout(s,t)):a()}s()})}
