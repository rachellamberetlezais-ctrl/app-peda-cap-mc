(() => {
 'use strict';
 const D=window.LESSON,$=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const fmt=(n,d=5)=>new Intl.NumberFormat('fr-FR',{maximumFractionDigits:d}).format(n),fixed=n=>new Intl.NumberFormat('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
 function number(v){const s=String(v).trim().replace(/[\s\u00a0\u202f]/g,'').replace(',','.');return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)&&Number.isFinite(Number(s))?Number(s):null;}
 function correct(v,q){const n=number(v);return n!==null&&(q.round===undefined||Math.abs(n*10**q.round-Math.round(n*10**q.round))<1e-6)&&Math.abs(n-q.answer)<=Math.max(1e-7,Math.abs(q.answer)*1e-8);}
 const fields=[],exercises=[],opened=[true,false,false],names=['Débutant / Socle CAP','Avancé / Dépassement','Expert / Excellence'],badges=['Maîtrise du contour · Socle CAP','Expert conversions & commande','Figures composées & raisonnement'];let level=0,noticeDone=new Set();
 function step(n){for(let i=1;i<=4;i++){$('step-'+i).hidden=i!==n;$('step-'+i).classList.toggle('active',i===n);const b=$('tab-step-'+i);b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1;b.classList.toggle('active',i===n);}window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
 document.querySelectorAll('[data-step]').forEach((b,i)=>{b.addEventListener('click',()=>step(i+1));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%4;else if(e.key==='ArrowLeft')n=(i+3)%4;else if(e.key==='Home')n=0;else if(e.key==='End')n=3;if(n!==undefined){e.preventDefault();step(n+1);$('tab-step-'+(n+1)).focus();}});});
 document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>step(Number(b.dataset.next))));
 D.objectives.forEach(text=>{const li=document.createElement('li');li.textContent=text;$('objectives').append(li);});$('prerequisites').textContent=D.prerequisites;
 function render(ex,id,{training=false,l=0,index=0,evaluation=false}={}){
  const card=document.createElement('article');card.className='exercise-box';card.id=id;
  card.innerHTML=`<div class="exercise-meta"><span>${esc(ex.title)}</span><span class="badge-tag ${l===0?'tag-cap':'tag-expert'}">${evaluation?'Bilan /8':training?l===0?'Socle CAP':'Bonus':'Découverte'}</span></div><h3 class="card-title"><img src="fleche_rouge.png" class="icon-bullet" alt="">${esc(ex.title)}</h3><div class="info-callout">${esc(ex.context)}</div>`;
  const item={card,fields:[],training,l,index};exercises.push(item);
  ex.questions.forEach((q,j)=>{
   const key=id+'-q'+j,wrap=document.createElement('div');wrap.className='q-item';wrap.id=key+'-wrap';
   const title=document.createElement('div');title.className='q-title';const label=document.createElement('label');label.htmlFor=key;label.textContent=q.label+(evaluation?' ('+fmt(q.points||0)+' pt)':'');title.append(label);wrap.append(title);
   let input;if(q.type==='choice'){input=document.createElement('select');input.innerHTML='<option value="">Choisir une réponse</option>';q.options.forEach((s,k)=>{const o=document.createElement('option');o.value=String(k);o.textContent=s;input.append(o);});}else if(q.type==='manual'){input=document.createElement('textarea');input.rows=3;input.placeholder='Ta méthode ou ta conclusion';}else{input=document.createElement('input');input.type='text';input.inputMode='decimal';input.autocomplete='off';input.placeholder='Ton résultat';}
   input.id=key;input.className='cma-input';input.setAttribute('aria-describedby',key+'-feedback');
   const row=document.createElement('div');row.className='input-row';row.append(input);if(q.unit){const unit=document.createElement('span');unit.className='input-unit';unit.textContent=q.unit;row.append(unit);}
   const button=document.createElement('button');button.type='button';button.className='btn btn-primary btn-sm';button.textContent=q.type==='manual'?'Comparer au corrigé':'Valider';row.append(button);wrap.append(row);
   const feedback=document.createElement('div');feedback.className='feedback-box';feedback.id=key+'-feedback';feedback.setAttribute('role','status');wrap.append(feedback);
   const f={q,input,button,feedback,wrap,mastered:false,valid:false,review:null,evaluation,training,l};fields.push(f);item.fields.push(f);
   if(q.type==='manual'){
    const reviewLabel=document.createElement('label');reviewLabel.className='manual-review';reviewLabel.hidden=true;const check=document.createElement('input');check.type='checkbox';check.id=key+'-review';f.review=check;f.reviewLabel=reviewLabel;
    reviewLabel.append(check,document.createTextNode('J’ai comparé et corrigé ma réponse. Cette auto-vérification reste à relire avec le formateur.'));wrap.append(reviewLabel);
    check.addEventListener('change',()=>{f.valid=check.checked&&Boolean(input.value.trim());if(f.valid)f.mastered=true;wrap.classList.toggle('manual-reviewed',f.valid);progress();});
   }
   button.addEventListener('click',()=>{
    if(q.type==='manual'){
     feedback.className='feedback-box hint';feedback.textContent=input.value.trim()?'Réponse de référence à comparer avec ta rédaction :\n'+q.answer+'\nLa rédaction n’est pas notée automatiquement.':'Écris d’abord ta réponse, puis compare-la au corrigé.';
     f.reviewLabel.hidden=!input.value.trim();if(!input.value.trim()){f.review.checked=false;f.valid=false;}
    }else{
     f.valid=q.type==='choice'?input.value!==''&&Number(input.value)===q.answer:correct(input.value,q);
     feedback.className='feedback-box '+(f.valid?'correct':'incorrect');feedback.textContent=f.valid?'✓ Réponse correcte.':input.value.trim()===''?'Complète ta réponse.':q.round!==undefined?'Revois le calcul, l’unité et l’arrondi à '+q.round+' décimales.':'Reprends les données et les étapes de calcul. Tu peux revenir au cours.';
     wrap.classList.toggle('completed',f.valid);input.setAttribute('aria-invalid',String(!f.valid));if(f.valid)f.mastered=true;
    }progress();
   });
   input.addEventListener('input',()=>{f.valid=false;input.removeAttribute('aria-invalid');feedback.className='feedback-box';feedback.textContent='';wrap.classList.remove('completed');if(f.review){f.review.checked=false;f.reviewLabel.hidden=true;wrap.classList.remove('manual-reviewed');}if(evaluation)progress();});card.append(wrap);
  });
  const correction=document.createElement('details');correction.className='exercise-correction no-print';correction.innerHTML=`<summary>Voir le corrigé détaillé</summary><p>${esc(ex.correction)}</p>`;card.append(correction);return card;
 }
 D.discovery.forEach((ex,i)=>$('discovery-content').append(render(ex,'discovery-'+i)));
 D.course.forEach(([title,text],i)=>{const d=document.createElement('div');d.className='accordion-item'+(i===0?' open':'');const b=document.createElement('button');b.type='button';b.className='accordion-header';b.textContent=title;b.setAttribute('aria-expanded',String(i===0));const p=document.createElement('div');p.className='accordion-body';p.textContent=text;b.addEventListener('click',()=>{const on=d.classList.toggle('open');b.setAttribute('aria-expanded',String(on));});d.append(b,p);$('course-content').append(d);});
 D.levels.forEach((group,l)=>{
  const b=document.createElement('button');b.type='button';b.id='level-button-'+l;b.className='level-card';b.innerHTML=`<span><span class="level-pill pill-l${l+1}">NIVEAU ${l+1} ${['🟢','🟡','🔴'][l]}</span><span class="level-description">${names[l]} (${group.length} exercices)</span><small>${l===0?'Valider le socle ouvre le niveau 2 et le bilan imprimable.':'Réussir le niveau précédent pour continuer.'}</small></span><span class="level-status" id="level-status-${l}">En cours</span>`;
  b.addEventListener('click',()=>{if(opened[l]){level=l;progress();}});$('level-selectors').append(b);
  const panel=document.createElement('div');panel.id='level-panel-'+l;group.forEach((ex,j)=>panel.append(render(ex,`level-${l}-ex-${j}`,{training:true,l,index:j})));$('training-content').append(panel);
  const badge=document.createElement('div');badge.className='cma-badge locked';badge.id='badge-'+l;badge.textContent=['⚖ ','★ ','🏆 '][l]+badges[l];$('badge-shelf').append(badge);
 });
 $('evaluation-content').append(render(D.evaluation,'evaluation',{evaluation:true}));
 function progress(){
  const counts=D.levels.map((_,l)=>{const f=fields.filter(f=>f.training&&f.l===l);return {all:f.length,done:f.filter(f=>f.mastered).length};});
  counts.forEach((c,l)=>{if(c.all===c.done&&l<2)opened[l+1]=true;$('level-button-'+l).disabled=!opened[l];$('level-button-'+l).classList.toggle('locked',!opened[l]);$('level-button-'+l).classList.toggle('active-lvl',l===level);$('level-status-'+l).textContent=!opened[l]?'🔒 Verrouillé':c.all===c.done?'✓ Validé':c.done+' / '+c.all+' questions';$('level-panel-'+l).hidden=l!==level;$('badge-'+l).classList.toggle('locked',c.done!==c.all);$('badge-'+l).classList.toggle('unlocked',c.done===c.all);});
  exercises.filter(e=>e.training).forEach(e=>{const previous=exercises.find(p=>p.training&&p.l===e.l&&p.index===e.index-1);if(!previous||previous.fields.every(f=>f.mastered))e.opened=true;const available=opened[e.l]&&e.opened;e.card.classList.toggle('locked-exercise',!available);for(const f of e.fields){f.input.disabled=!available;f.button.disabled=!available;if(f.review)f.review.disabled=!available;}});
  const pct=Math.round(counts[0].done/counts[0].all*100),bonus=fields.filter(f=>f.training&&f.l>0&&f.q.type!=='manual'&&f.mastered).reduce((s,f)=>s+(f.l===1?10:15),0);
  $('capProgressTxt').textContent=pct+'%';$('bonusScoreTxt').textContent='+'+bonus+' pts';$('att-cap').textContent=pct+'%';$('att-bonus').textContent='+'+bonus+' pts';$('att-status').textContent=pct===100?'Socle de cette séance terminé. Les réponses rédigées auto-vérifiées restent à relire avec la formatrice.':'Socle en cours. Ce bilan ne valide pas encore la réussite du socle.';$('print-bilan').disabled=pct<100;
  const total=counts.reduce((s,c)=>s+c.all,0),done=counts.reduce((s,c)=>s+c.done,0),global=Math.round(done/total*100);$('globalProgressBar').style.width=global+'%';$('global-progress').setAttribute('aria-valuenow',String(global));
  const score=fields.filter(f=>f.evaluation&&f.q.type!=='manual'&&f.valid).reduce((s,f)=>s+f.q.points,0);$('evaluation-score').textContent='Contrôle automatique : '+fmt(score)+' / 7,5 points. Conclusion rédigée : 0,5 point à apprécier par le formateur. Total : /8 points.';$('att-score').textContent=fmt(score)+' / 7,5';
 }
 $('learner-name').addEventListener('input',e=>$('att-learner').textContent=e.target.value.trim()||'APPRENANT(E) EN FORMATION');$('print-bilan').addEventListener('click',()=>window.print());$('att-date').textContent=new Intl.DateTimeFormat('fr-FR',{timeZone:'Indian/Reunion',dateStyle:'long'}).format(new Date());
 D.notes.forEach(text=>{const li=document.createElement('li');li.textContent=text;$('teacher-notes').append(li);});progress();
 // Atelier de contour : les données sont en mètres ; les unités de saisie sont converties explicitement.
 const S={shape:'rectangle',unit:'m',a:2.4,b:1.2,c:2,stage:1,visited:new Set(),plan:null};
 const factor=()=>({m:1,cm:.01,mm:.001}[S.unit]);
 function dimensions(){
  const specs=S.shape==='cercle'?[['a','Diamètre D']]:S.shape==='carre'?[['a','Côté']]:S.shape==='triangle'?[['a','Côté AB'],['b','Côté CA'],['c','Côté BC']]:S.shape==='arche'?[['a','Largeur / diamètre'],['b','Hauteur droite']]:S.shape==='stade'?[['a','Longueur droite'],['b','Largeur / diamètre']]:[['a','Longueur'],['b','Largeur']];
  $('mirror-dimensions').replaceChildren();const f=factor();
  for(const [key,label] of specs){
   const div=document.createElement('div');div.className='dimension-control';div.innerHTML=`<label for="dim-${key}">${label} (${S.unit})</label><div class="input-row"><input class="cma-input dimension-value" type="text" inputmode="decimal" id="dim-${key}" value="${fmt(S[key]/f)}"><span>${S.unit}</span></div><input id="range-${key}" type="range" min="${.05/f}" max="${10/f}" step="${.05/f}" value="${S[key]/f}" aria-label="Modifier ${label.toLowerCase()} en ${S.unit}">`;$('mirror-dimensions').append(div);
   $('dim-'+key).addEventListener('input',e=>{const n=number(e.target.value);S[key]=n===null?NaN:n*f;$('range-'+key).value=Number.isFinite(S[key])?S[key]/f:.05/f;resetWalk();});
   $('range-'+key).addEventListener('input',e=>{S[key]=Number(e.target.value)*f;$('dim-'+key).value=fmt(S[key]/f);resetWalk();});
  }
 }
 function resetWalk(){S.visited.clear();$('mirror-result').hidden=true;$('perimeter-guess').value='';if(S.stage===3)S.stage=2;draw();}
 function chooseStage(n){if(n===3&&(!S.plan||S.visited.size!==S.plan.segments.length))return;S.stage=n;draw();if(n===3)reveal();}
 function toggle(id){if(!S.plan?.segments.some(s=>s.id===id))return;if(S.stage===1){$('mirror-instruction').textContent='Passe à l’étape 2 pour parcourir le contour, après avoir observé les dimensions.';return;}S.visited.has(id)?S.visited.delete(id):S.visited.add(id);$('mirror-result').hidden=true;if(S.stage===3)S.stage=2;draw();}
 function draw(){
  try{S.plan=ContourMath.plan(S.shape,S.a,S.b,S.c);}catch(e){S.plan=null;$('inspect-interior').hidden=true;$('walk-counter').textContent='Dimensions à vérifier';$('mirror-drawing').textContent='Figure à vérifier';$('mirror-instruction').textContent=e.message;$('segment-buttons').replaceChildren();$('contour-sum').textContent='Corrige les dimensions avant de tracer.';$('trace-next').disabled=true;$('reveal-result').disabled=true;$('reveal-stage').disabled=true;$('mirror-result').hidden=true;return;}
  $('inspect-interior').hidden=!S.plan.inside.length;
  const p=S.plan,scale=factor(),len=n=>fmt(n/scale)+' '+S.unit;
  const curved=s=>S.shape==='cercle'||S.shape==='arche'&&s.id==='b'||S.shape==='stade'&&['b','d'].includes(s.id);
  const shown=s=>!S.visited.has(s.id)&&curved(s)?(S.shape==='cercle'?'Contour circulaire':'Demi-cercle'):len(s.length);
  const body=p.segments.map(s=>`<path class="contour-path ${S.visited.has(s.id)?'visited':''}" d="${s.d}"/><path id="contour-segment-${s.id}" class="contour-hit" d="${s.d}" role="button" tabindex="0" aria-label="${esc(s.name+' : '+shown(s)+(S.visited.has(s.id)?', comptée':', à compter'))}" aria-pressed="${S.visited.has(s.id)}" data-segment="${s.id}"/><text class="diagram-label" x="${s.x}" y="${s.y}" text-anchor="middle">${esc(shown(s))}</text>`).join('');
  const inside=p.inside.map(d=>`<path class="interior-path" d="${d}"/><path class="interior-hit" d="${d}" role="button" tabindex="0" aria-label="Ligne intérieure, aide de construction" data-interior="true"/>`).join('');
  $('mirror-drawing').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 310" role="group" aria-label="Miroir : contour extérieur et dimensions en ${S.unit}"><defs><linearGradient id="glass" x2="1" y2="1"><stop stop-color="#e0eff0"/><stop offset="1" stop-color="#f9ffff"/></linearGradient></defs><path d="${p.outline}" fill="url(#glass)" stroke="none"/>${inside}${body}${p.points.map(([t,x,y])=>`<text class="diagram-point" x="${x}" y="${y}" text-anchor="middle">${t}</text>`).join('')}${S.shape==='cercle'?`<text class="diagram-label" x="210" y="170" text-anchor="middle">D = ${esc(len(S.a))}</text>`:''}</svg>`;
  $('mirror-drawing').querySelectorAll('[data-segment]').forEach(el=>{const action=()=>{toggle(el.dataset.segment);$('contour-segment-'+el.dataset.segment)?.focus();};el.addEventListener('click',action);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();action();}});});
  $('mirror-drawing').querySelectorAll('[data-interior]').forEach(el=>{const action=()=>$('mirror-instruction').textContent='Cette ligne est à l’intérieur du miroir : on ne la compte pas dans le périmètre. Suis uniquement le bord extérieur.';el.addEventListener('click',action);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();action();}});});
  $('segment-buttons').replaceChildren();for(const seg of p.segments){const b=document.createElement('button');b.type='button';b.id='segment-button-'+seg.id;b.className='segment-button';b.dataset.answer=seg.id;b.setAttribute('aria-pressed',String(S.visited.has(seg.id)));b.textContent=(S.visited.has(seg.id)?'✓ ':'')+seg.name+' · '+shown(seg);b.addEventListener('click',()=>{toggle(seg.id);$('segment-button-'+seg.id)?.focus();});$('segment-buttons').append(b);}
  const selected=p.segments.filter(s=>S.visited.has(s.id)),total=selected.reduce((sum,s)=>sum+s.length,0),complete=selected.length===p.segments.length;
  $('walk-counter').textContent=selected.length+' / '+p.segments.length+' portions comptées';$('contour-sum').textContent=selected.length?(selected.map(s=>fmt(s.length/scale)).join(' + ')+' = '+fmt(total/scale)+' '+S.unit+(complete?' · Tour complet !':' · Trajet partiel')):'Aucune portion comptée. Choisis un point de départ.';
  $('walk-live').hidden=S.stage===1;$('contour-walk').hidden=S.stage===1;$('mirror-result').hidden=S.stage!==3;$('trace-next').disabled=complete;$('reveal-result').disabled=!complete;$('reveal-stage').disabled=!complete;
  $('mirror-instruction').textContent=S.stage===1?'Observe les dimensions. Change un curseur : la forme et les longueurs se mettent à jour. Puis passe à l’étape 2.':complete?'Tu es revenu au point de départ : le contour est complet. Compare maintenant la somme et la formule.':'Suis le bord extérieur du miroir. Les portions vertes sont déjà comptées ; les pointillés intérieurs ne comptent pas.';
  document.querySelectorAll('[data-sim-stage]').forEach(b=>{b.classList.toggle('active-step',Number(b.dataset.simStage)===S.stage);b.setAttribute('aria-current',Number(b.dataset.simStage)===S.stage?'step':'false');});
 }
 function purchase(){if(!S.plan)return;try{const bar=number($('stock-length').value),n=ContourMath.pieces(S.plan.perimeter,bar);$('purchase-result').textContent=n+' longueur(s) de '+fmt(bar)+' m, soit '+fmt(n*bar)+' m achetés pour '+fmt(S.plan.perimeter)+' m de contour. Ce nombre est arrondi à l’entier supérieur.';}catch(e){$('purchase-result').textContent=e.message;}}
 function reveal(){const p=S.plan;if(!p||S.visited.size!==p.segments.length)return;S.stage=3;draw();$('mirror-result').hidden=false;$('result-formula').textContent=p.symbol+'\n'+p.segments.map(s=>fmt(s.length)).join(' + ')+' '+(p.curved?'≈':'=')+' '+fmt(p.perimeter)+' m';$('result-value').textContent='Au centième : '+fixed(p.perimeter)+' m.'+(p.curved?' Les longueurs courbes utilisent π ≈ 3,1416.':'');const guess=$('perimeter-guess').value;$('guess-feedback').textContent=!guess.trim()?'Compare chaque portion du dessin avec un terme de la somme.':correct(guess,{answer:Math.round(p.perimeter*100)/100,round:2})?'✓ Ton périmètre au centième est correct.':'Reprends le tour : une portion manque-t-elle ? Une ligne intérieure a-t-elle été ajoutée ? Vérifie aussi la conversion et l’arrondi.';$('result-conversions').replaceChildren();for(const [n,u,caption] of [[p.perimeter,'m','mètres'],[p.perimeter*100,'cm','centimètres'],[p.perimeter*1000,'mm','millimètres']]){const c=document.createElement('div');c.className='conversion-card';c.innerHTML=`<strong>${esc(fmt(n))} ${u}</strong><span>${caption}</span>`;$('result-conversions').append(c);}purchase();}
 $('inspect-interior').addEventListener('click',()=>$('mirror-instruction').textContent='Cette ligne est à l’intérieur du miroir : on ne la compte pas dans le périmètre. Suis uniquement le bord extérieur.');
 $('mirror-shape').addEventListener('change',e=>{S.shape=e.target.value;S.a=S.shape==='cercle'?.8:2.4;S.b=1.2;S.c=2;S.stage=1;dimensions();resetWalk();});
 $('mirror-unit').addEventListener('change',e=>{S.unit=e.target.value;dimensions();resetWalk();});
 $('mirror-reset').addEventListener('click',()=>{Object.assign(S,{shape:'rectangle',unit:'m',a:2.4,b:1.2,c:2,stage:1});$('mirror-shape').value='rectangle';$('mirror-unit').value='m';dimensions();resetWalk();});
 document.querySelectorAll('[data-sim-stage]').forEach(b=>b.addEventListener('click',()=>chooseStage(Number(b.dataset.simStage))));
 $('trace-next').addEventListener('click',()=>{const seg=S.plan?.segments.find(s=>!S.visited.has(s.id));if(seg)toggle(seg.id);});$('trace-reset').addEventListener('click',()=>{S.stage=2;resetWalk();});$('reveal-result').addEventListener('click',reveal);$('stock-length').addEventListener('input',purchase);dimensions();draw();
 window.S5M2={number,correct,fields,exercises,opened,progress,sim:S,toggle,chooseStage};
})();
