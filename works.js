/* =====================================================================
   Builds works.html, category.html and project.html from works-data.js.
   You shouldn't need to edit this file — edit works-data.js instead.
   ===================================================================== */
(function(){
  const page = document.body.dataset.page;          // "works" | "category" | "project"
  const $ = s => document.querySelector(s);
  const params = new URLSearchParams(location.search);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  const cat = id => CATEGORIES.find(c => c.id === id);
  const projectsIn = id => PROJECTS.filter(p => p.category === id);
  const catLink = id => `category.html?c=${encodeURIComponent(id)}`;
  const projLink = id => `project.html?p=${encodeURIComponent(id)}`;

  // soft placeholder palettes (sky1, sky2, hill1, hill2)
  const PAL = [
    ['#cfe7fb','#f2f9fe','#cfdf88','#8fa22a'], ['#f8dde5','#fdf6ea','#ffc8d2','#cd8cbb'],
    ['#e3f5a3','#fdf6ea','#bac8a0','#5f7556'], ['#fbe3c9','#fdf6ea','#e3f5a3','#aabf7e'],
    ['#efd3ea','#fdf6ea','#d5e4c1','#aabf7e'], ['#e8e1f7','#fdf6ea','#cfdf88','#5f7556'],
    ['#d8ecfa','#f8dde5','#ffc8d2','#aabf7e'],
  ];
  const STICKERS = ['clover','fish','burst','asterisk'];
  function media(src, i, alt){
    if (src) return `<img src="${esc(src)}" alt="${esc(alt||'')}" loading="lazy">`;
    const p = PAL[i % PAL.length];
    return `<div class="ph" style="--sky1:${p[0]};--sky2:${p[1]};--h1:${p[2]};--h2:${p[3]}"><i class="hill1"></i><i class="hill2"></i></div>`;
  }
  function sticker(i){
    if (i % 3) return '';
    const s = STICKERS[(i/3) % STICKERS.length];
    const extra = s==='fish' ? ' style="width:clamp(80px,9vw,120px)"' : s==='asterisk' ? ' style="color:#cd8cbb"' : '';
    return `<svg class="sticker sym${s==='burst'?' spin':''}"${extra}><use href="#${s}"/></svg>`;
  }
  function crumbs(parts){
    return `<nav class="crumbs mono">${parts.map(([t,h]) => h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`).join('<i>/</i>')}</nav>`;
  }

  // a tile that links somewhere (category or project)
  function tile({href, img, i, title, tags, year, big}){
    return `<a class="tile reveal${big?' big':''}" href="${href}">
      ${sticker(i)}
      <div class="frame">${media(img, i, title)}</div>
      <div class="tile-cap">
        <div><b>${esc(title)}</b><span class="tags">${tags}</span></div>
        <span class="tile-meta">${year ? esc(year) : ''}<i class="arrow">→</i></span>
      </div>
    </a>`;
  }
  const projectTile = (p, i) => tile({ href: projLink(p.id), img: p.cover || (p.images||[])[0], i,
    title: p.title, tags: `${esc(p.client)} / ${esc(cat(p.category)?.title || p.category)}`, year: p.year });

  // ================= works.html — overview =================
  if (page === 'works'){
    const photo = CATEGORIES.filter(c => c.parent === 'photography');
    const others = CATEGORIES.filter(c => !c.parent);
    let html = `
      <section class="work-sec" id="photography">
        <div class="work-sec-head reveal"><h2 class="chunky">photography</h2><span class="eyebrow">(${String(photo.length).padStart(2,'0')}) categories</span></div>
        <div class="tile-grid three">
          ${photo.map((c,i) => tile({ href: catLink(c.id), img: c.cover || projectsIn(c.id)[0]?.cover, i,
              title: c.title, tags: `photography / ${projectsIn(c.id).length} project${projectsIn(c.id).length===1?'':'s'}` })).join('')}
        </div>
      </section>`;
    others.forEach((c, k) => {
      const list = projectsIn(c.id);
      html += `
      <section class="work-sec" id="${c.id}">
        <div class="work-sec-head reveal"><h2 class="chunky">${esc(c.title)}</h2>
          <a class="eyebrow more-link" href="${catLink(c.id)}">view all (${String(list.length).padStart(2,'0')}) →</a></div>
        <div class="tile-grid two">${list.slice(0,4).map((p,i) => projectTile(p, i + 7*(k+1))).join('') || '<p class="empty">coming soon ✿</p>'}</div>
      </section>`;
    });
    $('#works-root').innerHTML = html;
    // jump links under the title
    $('#jump').innerHTML = ['photography', ...others.map(c=>c.id)].map(id => `<a href="#${id}">${esc(cat(id)?.title || id)}</a>`).join('');
  }

  // ================= category.html =================
  if (page === 'category'){
    const c = cat(params.get('c'));
    if (!c){ $('#works-root').innerHTML = `<p class="empty">This category doesn't exist. <a href="works.html">Back to works →</a></p>`; return; }
    document.title = `${c.title} — Lucxydreams`;
    const list = projectsIn(c.id);
    const siblings = CATEGORIES.filter(x => x.parent === c.parent);
    $('#works-root').innerHTML = `
      <div class="page-head">
        ${crumbs([['works','works.html'], ...(c.parent ? [[c.parent, 'works.html#'+c.parent]] : []), [c.title]])}
        <h1 class="chunky reveal">${esc(c.title)}</h1>
        <p class="blurb reveal">${esc(c.blurb)}</p>
        ${c.parent ? `<div class="filters chips reveal">${siblings.map(s => `<a class="${s.id===c.id?'on':''}" href="${catLink(s.id)}">${esc(s.title)}</a>`).join('')}</div>` : ''}
      </div>
      <section class="block cat-block">
        <div class="tile-grid two">${list.map(projectTile).join('') || '<p class="empty">new work coming soon ✿</p>'}</div>
      </section>`;
  }

  // ================= project.html =================
  if (page === 'project'){
    const p = PROJECTS.find(x => x.id === params.get('p'));
    if (!p){ $('#works-root').innerHTML = `<p class="empty">This project doesn't exist. <a href="works.html">Back to works →</a></p>`; return; }
    const c = cat(p.category) || {id:p.category,title:p.category,parent:''};
    document.title = `${p.title} — Lucxydreams`;
    const list = projectsIn(c.id), idx = list.indexOf(p);
    const next = list[(idx + 1) % list.length], prev = list[(idx - 1 + list.length) % list.length];
    const imgs = (p.images && p.images.length) ? p.images : [p.cover];
    const video = p.video ? `<div class="video reveal"><iframe src="${esc(p.video)}" title="${esc(p.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` : '';
    $('#works-root').innerHTML = `
      <div class="page-head proj-head">
        ${crumbs([['works','works.html'], ...(c.parent ? [[c.parent, 'works.html#'+c.parent]] : []), [c.title, catLink(c.id)], [p.title]])}
        <h1 class="chunky reveal">${esc(p.title)}</h1>
        <dl class="proj-meta reveal">
          <div><dt>client</dt><dd>${esc(p.client)}</dd></div>
          <div><dt>category</dt><dd><a href="${catLink(c.id)}">${esc(c.parent ? c.parent + ' / ' : '')}${esc(c.title)}</a></dd></div>
          <div><dt>year</dt><dd>${esc(p.year)}</dd></div>
          ${(p.credits||[]).map(([r,n]) => `<div><dt>${esc(r)}</dt><dd>${esc(n)}</dd></div>`).join('')}
        </dl>
        ${p.description ? `<p class="proj-desc reveal">${esc(p.description)}</p>` : ''}
      </div>
      <section class="block proj-body">
        ${video}
        <div class="gallery">
          ${imgs.map((src,i) => `<figure class="g-item reveal ${i%3===0?'tall':''}" data-i="${i}"><div class="frame">${media(src, i, p.title)}</div></figure>`).join('')}
        </div>
        ${list.length > 1 ? `<nav class="proj-nav">
          <a href="${projLink(prev.id)}" class="mono">← ${esc(prev.title)}</a>
          <a href="${catLink(c.id)}" class="mono">all ${esc(c.title)}</a>
          <a href="${projLink(next.id)}" class="next"><span class="mono">next project</span><b class="chunky">${esc(next.title)} →</b></a>
        </nav>` : `<nav class="proj-nav"><a href="${catLink(c.id)}" class="mono">← back to ${esc(c.title)}</a></nav>`}
      </section>`;

    // click a gallery image to view it big
    const lb = $('#lb');
    document.querySelectorAll('.g-item').forEach(f => f.addEventListener('click', () => {
      $('#lbMedia').innerHTML = f.querySelector('.frame').innerHTML;
      $('#lbTitle').textContent = p.title;
      $('#lbMeta').textContent = `${c.title} — ${p.year}`;
      $('#lbDesc').textContent = '';
      lb.classList.add('open'); document.body.style.overflow = 'hidden';
    }));
  }
})();
