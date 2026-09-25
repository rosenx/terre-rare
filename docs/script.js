const toggle=document.querySelector('.menu-toggle'),mobileNav=document.getElementById('mobile-nav');
function closeMenu(){toggle.setAttribute('aria-expanded','false');mobileNav.hidden=true;toggle.querySelector('span').textContent='+';}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));mobileNav.hidden=open;toggle.querySelector('span').textContent=open?'+':'−';});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileNav.hidden){closeMenu();toggle.focus();}});
window.matchMedia('(min-width:701px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;let count=0;document.querySelectorAll('.product').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;if(!card.hidden)count++;});document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.getElementById('product-count').textContent=`${count} product${count===1?'':'s'}`;}));
document.querySelectorAll('[data-product]').forEach(button=>button.addEventListener('click',()=>{const dialog=document.getElementById('product-'+button.dataset.product);dialog.showModal();document.body.classList.add('modal-open');}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.querySelector('.dialog-routine').addEventListener('click',()=>{dialog.close();document.getElementById('routine').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});});
document.querySelectorAll('[data-open]').forEach(a=>a.addEventListener('click',()=>{document.getElementById(a.dataset.open).open=true;}));
document.getElementById('year').textContent=new Date().getFullYear();

// A single scroll progress drives the main image and both neighbouring panels.
const campaignSection=document.querySelector('.hero-scroll');
if(campaignSection){
const campaignStage=campaignSection.querySelector('.hero');
const campaignSides=campaignSection.querySelectorAll('.campaign-side');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let campaignFrame=0;
function updateCampaign(){
  campaignFrame=0;
  const distance=campaignSection.offsetHeight-campaignStage.offsetHeight;
  const raw=reducedMotion.matches?0:Math.max(0,Math.min(1,-campaignSection.getBoundingClientRect().top/Math.max(1,distance)));
  const progress=raw*raw*(3-2*raw);
  campaignSection.style.setProperty('--reveal',progress.toFixed(4));
  const visible=progress>.7&&!reducedMotion.matches;
  campaignSides.forEach(link=>{link.classList.toggle('is-visible',visible);link.tabIndex=visible?0:-1;link.setAttribute('aria-hidden',String(!visible));});
}
function scheduleCampaign(){if(!campaignFrame)campaignFrame=requestAnimationFrame(updateCampaign);}
window.addEventListener('scroll',scheduleCampaign,{passive:true});
window.addEventListener('resize',scheduleCampaign);
window.addEventListener('pageshow',scheduleCampaign);
reducedMotion.addEventListener('change',scheduleCampaign);
updateCampaign();

}

// Play the original logo reveal once per tab, without blocking the page.
const signature=document.querySelector('.signature-logo');
if(signature&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 let play=true;
 try{play=sessionStorage.getItem('terre-rare-signature')!=='seen';if(play)sessionStorage.setItem('terre-rare-signature','seen');}catch{}
 if(play)signature.classList.add('signature-animate');
}
