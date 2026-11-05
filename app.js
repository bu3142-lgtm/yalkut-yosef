'use strict';
const $=s=>document.querySelector(s);
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mobileReading=matchMedia('(max-width:850px)');
const hyph=s=>mobileReading.matches&&typeof RussianHyphenation!=='undefined'?RussianHyphenation.text(s):s;
let data,selected=1,currentNote=1,fontSize=19,toastTimer,loadSequence=0,home=true;
const chapterFiles={1:"content1.json",2:"content2.json",3:"content3.json",4:"content4.json",5:"content5.json",6:"content6.json",7:"content7.json",8:"content8.json",9:"content9.json",10:"content10.json",11:"content11.json",12:"content12.json",13:"content13.json",14:"content14.json",15:"content15.json",16:"content16.json",17:"content17.json",18:"content18.json",19:"content19.json",20:"content20.json",21:"content21.json",22:"content22.json",23:"content23.json",24:"content24.json",25:"content25.json",26:"content26.json",27:"content27.json",28:"content28.json",29:"content29.json",30:"content30.json",31:"content31.json",32:"content32.json",34:"content34.json",35:"content35.json",36:"content36.json",37:"content37.json",38:"content38.json",39:"content39.json",40:"content40.json",42:"content42.json",44:"content44.json",45:"content45.json",46:"content46.json",47:"content47.json",48:"content48.json",49:"content49.json",50:"content50.json",51:"content51.json",52:"content52.json",53:"content53.json",54:"content54.json",55:"content55.json",56:"content56.json",57:"content57.json",58:"content58.json",59:"content59.json",60:"content60.json",61:"content61.json",62:"content62.json",63:"content63.json",64:"content64.json",65:"content65.json",66:"content66.json",67:"content67.json",68:"content68.json",69:"content69.json",70:"content70.json",71:"content71.json",75:"content75.json",76:"content76.json",84:"content84.json",88:"content88.json",89:"content89.json",90:"content90.json",91:"content91.json",92:"content92.json",93:"content93.json",94:"content94.json",95:"content95.json",96:"content96.json",97:"content97.json",98:"content98.json",99:"content99.json",100:"content100.json",101:"content101.json",102:"content102.json",104:"content104.json",105:"content105.json",106:"content106.json",107:"content107.json",108:"content108.json",109:"content109.json",110:"content110.json",111:"content111.json",112:"content112.json",113:"content113.json",114:"content114.json",115:"content115.json",116:"content116.json",117:"content117.json",118:"content118.json",119:"content119.json",120:"content120.json",121:"content121.json",122:"content122.json",123:"content123.json",124:"content124.json",125:"content125.json",126:"content126.json",127:"content127.json",128:"content128.json",129:"content129.json",130:"content130.json",131:"content131.json",132:"content132.json",133:"content133.json",134:"content134.json",135:"content135.json",136:"content136.json",137:"content137.json",138:"content138.json",139:"content139.json",140:"content140.json",141:"content141.json",142:"content142.json",143:"content143.json",144:"content144.json",145:"content145.json",147:"content147.json",149:"content149.json",150:"content150.json",151:"content151.json",152:"content152.json",153:"content153.json",154:"content154.json",155:"content155.json",156:"content156.json",158:"content158.json",159:"content159.json",160:"content160.json",161:"content161.json",162:"content162.json",163:"content163.json",165:"content165.json",166:"content166.json",167:"content167.json",168:"content168.json",169:"content169.json",171:"content171.json",172:"content172.json",173:"content173.json",174:"content174.json",177:"content177.json",178:"content178.json",179:"content179.json",180:"content180.json",181:"content181.json",182:"content182.json",183:"content183.json",184:"content184.json",185:"content185.json",186:"content186.json",187:"content187.json",188:"content188.json",192:"content192.json",196:"content196.json",198:"content198.json",199:"content199.json",200:"content200.json",201:"content201.json",202:"content202.json",203:"content203.json",204:"content204.json",205:"content205.json",206:"content206.json",207:"content207.json",208:"content208.json",209:"content209.json",210:"content210.json",211:"content211.json",212:"content212.json",213:"content213.json",214:"content214.json",215:"content215.json",216:"content216.json",217:"content217.json",218:"content218.json",219:"content219.json",220:"content220.json",222:"content222.json",223:"content223.json",225:"content225.json",226:"content226.json",227:"content227.json",228:"content228.json",229:"content229.json",230:"content230.json",232:"content232.json",233:"content233.json",234:"content234.json",235:"content235.json",236:"content236.json",238:"content238.json",239:"content239.json",242:"content242.json",243:"content243.json",244:"content244.json",246:"content246.json",248:"content248.json",249:"content249.json",250:"content250.json",251:"content251.json",252:"content252.json",253:"content253.json",257:"content257.json",260:"content260.json",261:"content261.json",262:"content262.json",263:"content263.json",265:"content265.json",266:"content266.json",267:"content267.json",268:"content268.json",269:"content269.json",270:"content270.json",271:"content271.json",272:"content272.json",273:"content273.json",274:"content274.json",275:"content275.json",276:"content276.json",277:"content277.json",278:"content278.json",279:"content279.json",281:"content281.json",282:"content282.json",284:"content284.json",285:"content285.json",286:"content286.json",287:"content287.json",288:"content288.json",289:"content289.json",290:"content290.json",291:"content291.json",292:"content292.json",293:"content293.json",294:"content294.json",295:"content295.json",296:"content296.json",297:"content297.json",298:"content298.json",299:"content299.json",300:"content300.json",301:"content301.json",302:"content302.json",303:"content303.json",304:"content304.json",305:"content305.json",306:"content306.json",307:"content307.json",308:"content308.json",310:"content310.json",314:"content314.json",315:"content315.json",316:"content316.json",317:"content317.json",318:"content318.json",319:"content319.json",320:"content320.json",321:"content321.json",322:"content322.json",323:"content323.json",324:"content324.json",325:"content325.json",326:"content326.json",327:"content327.json",328:"content328.json",329:"content329.json",330:"content330.json",331:"content331.json",334:"content334.json",335:"content335.json",336:"content336.json",337:"content337.json",338:"content338.json",339:"content339.json",340:"content340.json",341:"content341.json",342:"content342.json",343:"content343.json",344:"content344.json",345:"content345.json"};
const chapterOrder=Object.keys(chapterFiles).map(Number).sort((a,b)=>a-b);
const plural=(n,one,few,many)=>n%100>=11&&n%100<=14?many:n%10===1?one:n%10>=2&&n%10<=4?few:many;
const chapterCache=new Map();
const chapterKey=suffix=>`yy${data.chapter}-${suffix}`;
const getSaved=k=>{try{return localStorage.getItem(k)}catch{return null}};
const save=(k,v)=>{try{localStorage.setItem(k,String(v))}catch{}};
const stripTags=s=>s.replace(/<\/?(?:n\d+|em|strong|he)>/g,'');
/* Текст пункта: ru содержит <em>, <strong>, <he> и <nK>…</nK> (слово с примечанием K) */
function rich(s,interactive=true){
  return s.split(/(<\/?(?:n\d+|em|strong|he)>)/).map(tok=>{
    let m;
    if((m=tok.match(/^<n(\d+)>$/)))return `<span class="note-phrase" data-n="${m[1]}">`;
    if((m=tok.match(/^<\/n(\d+)>$/)))return (interactive?`<button class="note-ref" data-note="${m[1]}" aria-label="Примечание ${m[1]}">${m[1]}</button>`:`<sup class="note-ref">${m[1]}</sup>`)+'</span>';
    if(tok==='<em>'||tok==='</em>'||tok==='<strong>'||tok==='</strong>')return tok;
    if(tok==='<he>')return '<span class="he-inline" lang="he" dir="rtl">';
    if(tok==='</he>')return '</span>';
    return escapeHTML(interactive?hyph(tok):tok);
  }).join('');
}
const plain=s=>escapeHTML(hyph(s));
const seifById=id=>data.seifim.find(s=>s.id===Number(id));
const allNotes=()=>data.seifim.flatMap(s=>s.notes.map(n=>({...n,seif:s.id,sn:s.n})));
const partOf=s=>data.parts[s.part];
const partHeading=s=>{
  if(data.parts.length<2)return '';
  const p=partOf(s);
  return `<div class="part-title">${p.label?`<span>${escapeHTML(p.label[0].toUpperCase()+p.label.slice(1))}</span> · `:''}${escapeHTML(p.title)}</div>`;
};
function lawHTML(s,printing=false){return `<p class="law-text">${rich(s.ru,!printing)}</p>`}
function notesHTML(s,printing=false){
  if(!s.notes.length)return '';
  return `<h2 class="commentary-heading">Примечания</h2><div class="commentary notes-list">${s.notes.map(n=>`<div class="comment" id="${printing?'print-':''}note-${s.id}-${n.n}"><span class="comment-letter">${n.n}</span> ${printing?escapeHTML(n.text):plain(n.text)}</div>`).join('')}</div>`;
}
function updateBookmark(){const yes=Number(getSaved(chapterKey('bookmark')))===selected;$('#bookmarkBtn').setAttribute('aria-pressed',String(yes));$('#bookmarkBtn').setAttribute('aria-label',yes?'Удалить закладку':'Добавить закладку')}
function adjacentChapter(d){const i=chapterOrder.indexOf(data.chapterNum);return chapterOrder[i+d]}
function selectSeif(id,scroll=false,keepMenu=false){
  const s=seifById(id);if(!s)return;selected=s.id;save(chapterKey('last'),selected);
  const url=new URL(location.href);url.searchParams.set('chapter',data.chapterNum);url.searchParams.set('seif',selected);history.replaceState(history.state,'',url);
  $('#reader').innerHTML=`${s.headingBefore?`<div class="block-heading">${plain(s.headingBefore)}</div>`:''}${partHeading(s)}<h2 class="law-title">Пункт ${s.n}</h2>${lawHTML(s)}${notesHTML(s)}${s.headingAfter?`<div class="block-heading">${plain(s.headingAfter)}</div>`:''}`;
  $('#seifLabel').textContent=`ПУНКТ ${s.n}`+(data.parts.length>1&&partOf(s).label?` · ${partOf(s).label.toUpperCase()}`:'');
  document.querySelectorAll('[data-select]').forEach(b=>{const a=Number(b.dataset.select)===selected;b.classList.toggle('selected',a)});
  $('#seifSelect').value=String(selected);
  const first=selected===data.seifim[0].id,last=selected===data.seifim.at(-1).id;
  const pc=adjacentChapter(-1),nc=adjacentChapter(1);
  $('#previousBtn').disabled=first&&!pc;$('#nextBtn').disabled=last&&!nc;
  $('#previousBtn').textContent=!first?`← Пункт ${data.seifim[data.seifim.findIndex(x=>x.id===selected)-1].n}`:pc?`← Глава ${pc}`:'← Предыдущий';
  $('#nextBtn').textContent=!last?`Пункт ${data.seifim[data.seifim.findIndex(x=>x.id===selected)+1].n} →`:nc?`Глава ${nc} →`:'Следующий →';
  $('#currentRangeLabel').textContent=`Только пункт ${s.n}`;updateBookmark();if(!keepMenu)closeMenu();
  if(scroll)$('#reader').scrollIntoView({behavior:'smooth',block:'start'});
}
function step(d){
  const i=data.seifim.findIndex(x=>x.id===selected),j=i+d;
  if(data.seifim[j]){selectSeif(data.seifim[j].id,true);return}
  const c=adjacentChapter(d);if(c)openChapter(c,d<0?'last':undefined,true,true);
}
async function openChapter(n,seif,expand=true,push=true){try{await loadChapter(n,seif==='last'?-1:seif,expand,push);window.scrollTo({top:0,behavior:'smooth'})}catch{notify('Не удалось загрузить главу. Проверьте соединение.')}}
function openNote(n){const c=allNotes().find(c=>c.seif===selected&&c.n===Number(n));if(!c)return;currentNote=c.n;
  const total=seifById(selected).notes.length;
  $('#commentContent').innerHTML=`<h2><span class="comment-letter">${c.n}</span> Примечание</h2><p class="dialog-text">${plain(c.text)}</p>`;
  $('#commentPrevious').disabled=c.n===1;$('#commentNext').disabled=c.n===total;
  if(!$('#commentDialog').open)$('#commentDialog').showModal();
  $('#commentDialog').scrollTop=0;
}
function goToNote(){const t=document.getElementById(`note-${selected}-${currentNote}`);if(!t)return;t.scrollIntoView({behavior:'smooth',block:'center'});t.classList.add('show-flash');setTimeout(()=>t.classList.remove('show-flash'),2200)}
function notify(text){clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,2600)}
function setFont(size){fontSize=Math.max(15,Math.min(26,size));document.documentElement.style.setProperty('--reader-size',fontSize+'px');save('yy-font',fontSize);$('#fontDown').disabled=fontSize===15;$('#fontUp').disabled=fontSize===26}
function makePrint(){if(!data)return;const all=$('input[name="range"]:checked')?.value!=='current';const seifs=data.seifim.filter(s=>all||s.id===selected);
  $('#printRoot').innerHTML=`<h1>Ялкут Йосеф</h1><p class="print-subtitle">${escapeHTML(data.chapterLabel)} · ${escapeHTML(data.theme)}<br>${escapeHTML(data.title)}</p>${seifs.map(s=>`<section>${s.headingBefore?`<h3>${escapeHTML(s.headingBefore)}</h3>`:''}${data.parts.length>1?partHeading(s):''}<h2 class="law-title">Пункт ${s.n}</h2>${lawHTML(s,true)}${notesHTML(s,true)}</section>`).join('')}<div class="print-sources">Ялкут Йосеф — русское издание. ${escapeHTML(data.chapterLabel)}.</div>`}
function closeMenu(){$('#sidebar').classList.remove('open');$('#shade').hidden=true;$('#menuBtn').setAttribute('aria-expanded','false')}
function updateBack(){const b=$('#backBtn');if(b)b.hidden=!(history.state&&history.state.yy>0)}
function navPush(){const d=(history.state&&history.state.yy)||0;try{history.replaceState({yy:d,y:window.scrollY},'',location.href);history.pushState({yy:d+1,y:0},'',location.href)}catch{}updateBack()}
function showHome(push=false){if(push)navPush();home=true;$('#homePage').hidden=false;$('#chapterPage').hidden=true;$('#main').classList.add('home-active');$('#chapterSection').textContent='Русское издание';$('#chapterCrumb').hidden=true;$('#chapterCrumbDivider').hidden=true;$('#sourcesBtn').hidden=true;$('#chapterSideSummary').hidden=true;$('#seifNav').hidden=true;document.querySelectorAll('[data-chapter]').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');b.setAttribute('aria-expanded','false')});document.title='Ялкут Йосеф — русское издание';history.replaceState(history.state,'',location.pathname);closeMenu();window.scrollTo({top:0,behavior:'smooth'})}
function setChapterExpanded(expanded){$('#seifNav').hidden=!expanded;document.querySelectorAll('[data-chapter]').forEach(b=>b.setAttribute('aria-expanded',String(expanded&&data&&Number(b.dataset.chapter)===data.chapterNum)))}
function search(){const q=$('#searchInput').value.trim().toLocaleLowerCase('ru');const box=$('#searchResults');if(q.length<2){box.innerHTML=q?'<p>Введите хотя бы две буквы.</p>':'';return}
  const rows=[];for(const s of data.seifim){const t=stripTags(s.ru);if(t.toLocaleLowerCase('ru').includes(q))rows.push({seif:s.id,label:`Пункт ${s.n}`,text:t});for(const n of s.notes)if(n.text.toLocaleLowerCase('ru').includes(q))rows.push({seif:s.id,n:n.n,label:`Пункт ${s.n} · примечание ${n.n}`,text:n.text})}
  box.innerHTML=rows.length?`<p>Найдено: ${rows.length}${rows.length>50?' · Показаны первые 50':''}</p>`+rows.slice(0,50).map(r=>{const at=r.text.toLocaleLowerCase('ru').indexOf(q);const start=Math.max(0,at-55);return `<button data-result-seif="${r.seif}" ${r.n?`data-result-note="${r.n}"`:''}>${escapeHTML(r.label)}<small>${start?'…':''}${escapeHTML(r.text.slice(start,start+180))}…</small></button>`}).join(''):'<p>В главе совпадений не найдено.</p>';
}
async function loadChapter(chapter,initialSeif,expand=false,push=false){
  const request=++loadSequence;chapter=Number(chapter);
  if(!chapterFiles[chapter])chapter=chapterOrder[0];
  let next=chapterCache.get(chapter);
  if(!next){const r=await fetch(chapterFiles[chapter]);if(!r.ok)throw Error('content');next=await r.json();if(next.chapterNum!==chapter)throw Error('chapter');chapterCache.set(chapter,next)}
  if(request!==loadSequence)return;
  if(push)navPush();
  data=next;home=false;currentNote=1;save('yy-current-chapter',data.chapterNum);
  $('#homePage').hidden=true;$('#chapterPage').hidden=false;$('#main').classList.remove('home-active');$('#chapterCrumb').hidden=false;$('#chapterCrumbDivider').hidden=false;$('#chapterSideSummary').hidden=false;
  const nn=allNotes().length;
  $('#chapterEyebrow').textContent=`ЯЛКУТ ЙОСЕФ · ${data.theme.toUpperCase()}`;
  $('#chapterTitle').textContent=data.title;
  $('#chapterSeal').innerHTML=`${data.chapterNum}<small>${escapeHTML(data.chapterLabel.toUpperCase())}</small>`;
  $('#chapterIntro').textContent=`${data.seifim.length} ${plural(data.seifim.length,'пункт','пункта','пунктов')} · ${nn} ${plural(nn,'примечание','примечания','примечаний')} · ${data.volume}`+(data.parts.length>1?` · разделов: ${data.parts.length}`:'');
  const sub=$('#chapterSubtitle');sub.textContent=data.subtitle||'';sub.hidden=!data.subtitle;
  $('#chapterSection').textContent=data.theme;
  $('#chapterCrumb').textContent=data.chapterNum;
  $('#sourcesBtn').hidden=false;
  $('#chapterBottom').textContent=`${data.theme} · ${data.chapterNum}`;
  $('#chapterFooter').textContent=`Русское издание · ${data.chapterLabel.toLowerCase()} целиком`;
  $('#chapterSideLabel').textContent=data.chapterLabel;
  $('#seifCount').textContent=`из ${data.seifim.length}`;
  $('#searchLabel').textContent=`Поиск по всей главе ${data.chapterNum}`;
  $('#commentChapterLabel').textContent=`ЯЛКУТ ЙОСЕФ · ГЛАВА ${data.chapterNum}`;
  $('#allRangeLabel').textContent=`Вся глава ${data.chapterNum} · ${data.seifim.length} ${plural(data.seifim.length,'пункт','пункта','пунктов')}`;
  document.title=`Ялкут Йосеф · ${data.chapterLabel} · Русское издание`;
  document.querySelectorAll('[data-chapter]').forEach(b=>{const yes=Number(b.dataset.chapter)===data.chapterNum;b.classList.toggle('selected',yes);b.setAttribute('aria-pressed',String(yes))});
  let lastPart=-1;
  $('.seif-nav').innerHTML=data.seifim.map(s=>{let h='';if(data.parts.length>1&&s.part!==lastPart){lastPart=s.part;const p=partOf(s);h=`<div class="nav-part">${escapeHTML((p.label?p.label[0].toUpperCase()+p.label.slice(1)+' · ':'')+p.title)}</div>`}return h+`<button data-select="${s.id}"><span>${s.n}</span>Пункт ${s.n}<small>${escapeHTML(s.topic)}</small></button>`}).join('');
  document.querySelector(`[data-chapter="${data.chapterNum}"]`).after($('#seifNav'));
  setChapterExpanded(expand);
  $('#seifSelect').innerHTML=data.parts.length>1?data.parts.map((p,i)=>`<optgroup label="${escapeHTML((p.label?p.label+' · ':'')+p.title)}">${data.seifim.filter(s=>s.part===i).map(s=>`<option value="${s.id}">Пункт ${s.n}</option>`).join('')}</optgroup>`).join(''):data.seifim.map(s=>`<option value="${s.id}">Пункт ${s.n}</option>`).join('');
  $('#searchPanel').hidden=true;$('#searchBtn').setAttribute('aria-expanded','false');$('#searchInput').value='';$('#searchResults').innerHTML='';
  $('#commentDialog').close();
  const saved=initialSeif===-1?data.seifim.at(-1).id:Number(initialSeif)||Number(getSaved(chapterKey('last')));
  selectSeif(data.seifim.some(s=>s.id===saved)?saved:data.seifim[0].id,false,expand);
}
/* Поиск глав с подсказками */
function chapterSuggest(){
  const raw=$('#chapterSearch').value.trim().toLocaleLowerCase('ru').replace(/ё/g,'е');const box=$('#chapterSuggest');
  if(!raw){box.hidden=true;box.innerHTML='';return}
  const words=raw.split(/\s+/);
  const hits=[...document.querySelectorAll('.chapter-nav')].filter(b=>words.every(w=>b.dataset.search.includes(w))).sort((a,b)=>{const an=String(a.dataset.chapter)===raw?0:1,bn=String(b.dataset.chapter)===raw?0:1;return an-bn||a.dataset.chapter-b.dataset.chapter}).slice(0,8);
  box.innerHTML=hits.length?hits.map(b=>`<button type="button" data-suggest="${b.dataset.chapter}"><b>${b.dataset.chapter}</b> ${escapeHTML(b.dataset.title)}</button>`).join(''):'<p>Ничего не найдено</p>';
  box.hidden=false;
}
async function init(){try{
  document.querySelectorAll('[data-chapter]').forEach(b=>{b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','seifNav')});
  const params=new URLSearchParams(location.search);
  const requested=Number(params.get('chapter'));
  if(requested&&chapterFiles[requested])await loadChapter(requested,params.get('seif'));else showHome();
  setFont(Number(getSaved('yy-font'))||(innerWidth<550?18:19));
  $('#seifSelect').onchange=e=>selectSeif(e.target.value);
  $('.seif-nav').onclick=e=>{const b=e.target.closest('[data-select]');if(b)selectSeif(b.dataset.select)};
  document.querySelectorAll('[data-chapter]').forEach(b=>b.onclick=async()=>{if(!home&&data&&Number(b.dataset.chapter)===data.chapterNum){setChapterExpanded($('#seifNav').hidden);return}await openChapter(Number(b.dataset.chapter))});
  $('#chapterSearch').oninput=chapterSuggest;
  $('#chapterSearch').onkeydown=e=>{if(e.key==='Enter'){const f=$('#chapterSuggest [data-suggest]');if(f)f.click()}if(e.key==='Escape'){$('#chapterSuggest').hidden=true}};
  $('#chapterSuggest').onclick=e=>{const b=e.target.closest('[data-suggest]');if(!b)return;$('#chapterSuggest').hidden=true;$('#chapterSearch').value='';openChapter(Number(b.dataset.suggest))};
  $('#reader').addEventListener('click',e=>{const b=e.target.closest('[data-note]');if(b)openNote(b.dataset.note)});
  $('#fontDown').onclick=()=>setFont(fontSize-1);$('#fontUp').onclick=()=>setFont(fontSize+1);
  $('#previousBtn').onclick=()=>step(-1);$('#nextBtn').onclick=()=>step(1);
  $('#bookmarkBtn').onclick=()=>{const exists=Number(getSaved(chapterKey('bookmark')))===selected;save(chapterKey('bookmark'),exists?'':selected);updateBookmark();notify(exists?'Закладка удалена':`Закладка на пункте ${seifById(selected).n} сохранена`)};
  $('#exportBtn').onclick=()=>$('#exportDialog').showModal();
  $('#printBtn').onclick=()=>{makePrint();$('#exportDialog').close();requestAnimationFrame(()=>window.print())};
  window.addEventListener('beforeprint',makePrint);
  $('#commentPrevious').onclick=()=>openNote(currentNote-1);$('#commentNext').onclick=()=>openNote(currentNote+1);
  $('#goComment').onclick=()=>{$('#commentDialog').close();goToNote()};
  document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).close());
  document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
  $('#homeMenuBtn').onclick=()=>$('#menuBtn').click();
  $('#menuBtn').setAttribute('aria-expanded','false');$('#menuBtn').onclick=()=>{const o=$('#sidebar').classList.toggle('open');$('#shade').hidden=!o;$('#menuBtn').setAttribute('aria-expanded',String(o))};$('#shade').onclick=closeMenu;
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  mobileReading.addEventListener('change',()=>{if(home||!data)return;const top=window.scrollY;selectSeif(selected);if($('#commentDialog').open)openNote(currentNote);window.scrollTo({top})});
  document.addEventListener('copy',e=>{const sel=window.getSelection();if(!e.clipboardData||!sel?.rangeCount)return;const text=sel.toString();if(!text.includes('­'))return;e.clipboardData.setData('text/plain',text.replace(/­/g,''));e.preventDefault()});
  $('.brand').onclick=e=>{e.preventDefault();showHome(!home)};
  $('#backBtn').onclick=()=>{if(history.state&&history.state.yy>0)history.back()};
  window.addEventListener('popstate',async e=>{const p=new URLSearchParams(location.search),ch=Number(p.get('chapter')),y=(e.state&&e.state.y)||0;try{if(ch&&chapterFiles[ch])await loadChapter(ch,p.get('seif'));else showHome()}catch{notify('Не удалось загрузить главу. Проверьте соединение.')}updateBack();requestAnimationFrame(()=>window.scrollTo({top:y,behavior:'instant'}))});
  updateBack();
  $('#searchBtn').onclick=()=>{const panel=$('#searchPanel');panel.hidden=!panel.hidden;$('#searchBtn').setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)$('#searchInput').focus()};
  $('#searchInput').oninput=search;$('#searchResults').onclick=e=>{const b=e.target.closest('[data-result-seif]');if(!b)return;$('#searchPanel').hidden=true;selectSeif(b.dataset.resultSeif,true);if(b.dataset.resultNote)openNote(b.dataset.resultNote)};
  $('#sourcesBtn').onclick=()=>{$('#infoContent').innerHTML=`<h2>О главе</h2><p>${escapeHTML(data.chapterLabel)}. ${escapeHTML(data.title)}.</p>${data.subtitle?`<p>${escapeHTML(data.subtitle)}</p>`:''}<p>${escapeHTML(data.volume)}. Ялкут Йосеф, русское издание.</p><p>Примечания переводчика помечены цифрами в тексте; нажмите на цифру, чтобы прочитать примечание.</p>`;closeMenu();$('#infoDialog').showModal()};
  if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
}catch(e){$('#reader').innerHTML='<p class="law-text">Не удалось загрузить текст. Обновите страницу, когда появится соединение.</p>'}}
init();
