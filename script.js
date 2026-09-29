// ===== Lucxydreams — shared script for index.html and works.html =====

// give each sticker <svg> its symbol's viewBox so it keeps its proportions
document.querySelectorAll('svg.sym').forEach(svg=>{
  const u=svg.querySelector('use');if(!u)return;
  const sym=document.querySelector(u.getAttribute('href'));
  if(sym&&!svg.getAttribute('viewBox'))svg.setAttribute('viewBox',sym.getAttribute('viewBox'));
});
// build star polygons: data-star="points,outerR,innerR"
document.querySelectorAll('[data-star]').forEach(p=>{
  const [n,R,r]=p.dataset.star.split(',').map(Number);let pts=[];
  for(let i=0;i<n*2;i++){const a=Math.PI*i/n-Math.PI/2,rad=i%2?r:R;pts.push((Math.cos(a)*rad).toFixed(2)+','+(Math.sin(a)*rad).toFixed(2))}
  p.setAttribute('points',pts.join(' '));
});

// header: on the home page it slides in after the hero; on works.html it's always visible
const hdr=document.getElementById('hdr');
const onHome=!!document.getElementById('home');
const links=[...document.querySelectorAll('nav a')].filter(a=>a.getAttribute('href').startsWith('#'));
const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
function onScroll(){
  if(onHome)hdr.classList.toggle('show',scrollY>innerHeight*.6);
  let cur=-1;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<innerHeight*.4)cur=i});
  links.forEach((a,i)=>a.classList.toggle('active',i===cur));
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});

// contacts dropdown
document.querySelectorAll('.menu-wrap').forEach(wrap=>{
  const btn=wrap.querySelector('button');
  const set=open=>{wrap.classList.toggle('open',open);btn.setAttribute('aria-expanded',open)};
  btn.addEventListener('click',e=>{e.stopPropagation();set(!wrap.classList.contains('open'))});
  document.addEventListener('click',e=>{if(!wrap.contains(e.target))set(false)});
  addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
});

// filters (works page)
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  document.querySelectorAll('.card').forEach(c=>c.classList.toggle('hide',b.dataset.f!=='all'&&c.dataset.cat!==b.dataset.f));
});

// lightbox
const cards=[...document.querySelectorAll('.card')];
const lb=document.getElementById('lb');
function openLB(c){
  document.getElementById('lbMedia').innerHTML=c.querySelector('.frame').innerHTML;
  document.getElementById('lbTitle').textContent=c.querySelector('b').textContent;
  document.getElementById('lbMeta').innerHTML=c.querySelector('.meta').innerHTML.replace('<br>',' — ');
  document.getElementById('lbDesc').textContent=c.dataset.desc||'';
  lb.classList.add('open');document.body.style.overflow='hidden';
}
function closeLB(){lb.classList.remove('open');document.body.style.overflow=''}
if(lb){
  cards.forEach(c=>c.onclick=()=>openLB(c));
  document.getElementById('lbClose').onclick=closeLB;
  lb.onclick=e=>{if(e.target===lb)closeLB()};
  addEventListener('keydown',e=>{if(e.key==='Escape')closeLB()});
}

// footer: year + Singapore clock
document.getElementById('yr').textContent=new Date().getFullYear();
const clock=document.getElementById('clock');
const tick=()=>clock.textContent='Singapore · '+new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Singapore',hour:'2-digit',minute:'2-digit'});
tick();setInterval(tick,30000);
