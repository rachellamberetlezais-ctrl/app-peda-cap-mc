(() => {
  'use strict';
  const D = window.LESSON, $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = n => Number.isFinite(n) ? new Intl.NumberFormat('fr-FR',{maximumFractionDigits:5}).format(n) : '—';
  function parseNumber(value) {
    const s=String(value).trim().replace(/[\s\u00a0\u202f]/g,'').replace(',','.');
    return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s) && Number.isFinite(Number(s)) ? Number(s) : null;
  }
  function numericCorrect(value,q) {
    const n=parseNumber(value);if(n===null)return false;
    if(q.round!==undefined && Math.abs(n*10**q.round-Math.round(n*10**q.round))>1e-6)return false;
    return Math.abs(n-q.answer)<=Math.max(1e-7,Math.abs(q.answer)*1e-8);
  }
  function solve(a,b,c) {
    if(![a,b,c].every(Number.isFinite))throw Error('Saisir trois nombres finis.');
    if(a===0)throw Error(b===c?'a = 0 : cette égalité est vraie pour toute valeur de x ; ce n’est pas une équation du premier degré.':'a = 0 : aucune solution, car les deux constantes sont différentes.');
    return {remaining:c-b,x:(c-b)/a,check:a*((c-b)/a)+b};
  }
  function perimeter(shape,l,h,d,third=1,pi=3.1416) {
    const needed=shape==='cercle'?[d]:shape==='carre'?[l]:shape==='triangle'?[l,h,third]:[l,h];
    if(!needed.every(v=>Number.isFinite(v)&&v>0&&v<=10000))throw Error('Utiliser des dimensions positives, au plus 10 000 m.');
    if(shape==='triangle' && (l+h<=third || l+third<=h || h+third<=l))throw Error('Ces trois longueurs ne forment pas un triangle.');
    switch(shape){case 'rectangle':return 2*(l+h);case 'carre':return 4*l;case 'cercle':return pi*d;case 'triangle':return l+h+third;case 'arche':return l+2*h+pi*l/2;case 'stade':return 2*l+pi*h;default:throw Error('Figure inconnue.');}
  }
  function pieces(length,bar) {if(!Number.isFinite(length)||!Number.isFinite(bar)||bar<=0||length<0)throw Error('La longueur d’une barre doit être positive.');return Math.ceil(length/bar-1e-10);}
  window.LessonMath={parseNumber,numericCorrect,solve,perimeter,pieces};
  const allFields=[], missions=[], earned=new Set(), unlocked=[true,false,false], positions=[0,0,0];
  let currentTab='decouverte', currentLevel=0, lastCompleted=0;
  const levelNames=['Socle CAP','Autonomie','Défi expert'];
  function completeMission(m){return m.fields.every(f=>f.q.type==='manual'?Boolean(f.input.value.trim())&&m.review.checked:f.correct);}
  function showMission(level,index){
    if(!unlocked[level])return;
    currentLevel=level;positions[level]=Math.max(0,Math.min(D.levels[level].length-1,index));
    D.levels.forEach((_,i)=>$('level-'+i).hidden=i!==level);
    missions.forEach(m=>m.card.hidden=m.level!==level||m.index!==positions[level]);
    document.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.level)===level)));
    $('mission-counter').textContent=`${levelNames[level]} · Défi ${positions[level]+1} sur ${D.levels[level].length}`;
    $('mission-prev').disabled=positions[level]===0;
    const last=positions[level]===D.levels[level].length-1;
    $('mission-next').textContent=last?(level===2?'Aller au bilan →':'Niveau suivant →'):'Défi suivant →';
    $('mission-next').disabled=last&&level<2&&!unlocked[level+1];
    document.querySelectorAll('[data-mission]').forEach(b=>{const on=Number(b.dataset.mission)===positions[level];b.hidden=Number(b.dataset.missionLevel)!==level;b.setAttribute('aria-current',on?'step':'false');});
  }
  function updateGame(){
    const done=missions.filter(m=>m.completed).length;
    for(let l=0;l<3;l++){
      const group=missions.filter(m=>m.level===l),passed=group.filter(m=>m.completed).length;
      if(passed===group.length&&group.length&&l<2)unlocked[l+1]=true;
      const button=[...document.querySelectorAll('[data-level]')][l];button.disabled=!unlocked[l];
      button.innerHTML=`<span class="level-number" aria-hidden="true">${passed===group.length?'✓':unlocked[l]?l+1:'🔒'}</span><span><strong>${levelNames[l]}</strong><small>${!unlocked[l]?'Verrouillé · réussir le niveau précédent':passed+' / '+group.length+' défis réussis'}</small></span>`;
      $('badge-'+l).className='reward'+(passed===group.length?' earned':'');$('badge-'+l).textContent=(passed===group.length?'★ ':'☆ ')+levelNames[l];
    }
    missions.forEach(m=>{const b=$('mission-dot-'+m.level+'-'+m.index);b.className='mission-dot'+(m.completed?' complete':'');b.setAttribute('aria-label',`Défi ${m.index+1}${m.completed?' réussi':''}`);});
    $('game-xp').textContent=earned.size*10+' XP';$('game-done').textContent=done+' / 12';$('game-rank').textContent=done===12?'Expert du salon':done>=9?'Autonome':done>=5?'Socle validé':'En mission';
    $('game-meter').value=done;
    $('game-hint').textContent=unlocked[2]?'Les trois niveaux sont ouverts. Vise les trois badges !':unlocked[1]?'Socle validé ! Réussis tous les défis Autonomie pour ouvrir le Défi expert.':'Réussis les 5 défis du Socle CAP pour débloquer le niveau Autonomie.';
    if(done>lastCompleted){$('game-event').textContent=done===12?'★ Parcours terminé : les trois badges sont gagnés !':'✓ Défi réussi ! '+(done===5?'Niveau Autonomie débloqué.':done===9?'Défi expert débloqué.':'Continue pour compléter ton badge.');lastCompleted=done;}
    showMission(currentLevel,positions[currentLevel]);
  }
  function heading(title) {return `<h3><img src="fleche_rouge.png" class="arrow" alt="">${esc(title)}</h3>`;}
  function renderExercise(ex,id,evaluation=false) {
    const card=document.createElement('article');card.className='card';card.id=id; if(id.startsWith('level-'))card.classList.add('challenge-card');
    card.innerHTML=heading(ex.title)+`<p class="context">${esc(ex.context)}</p>`;
    ex.questions.forEach((q,i)=>{
      const key=`${id}-q${i}`;const wrap=document.createElement('div');wrap.className='question';
      const points=evaluation?` <span class="competence">(${fmt(q.points||0)} pt${(q.points||0)>1?'s':''})</span>`:'';
      const label=document.createElement('label');label.htmlFor=key;label.innerHTML=esc(q.label)+points;wrap.append(label);
      let input;
      if(q.type==='choice'){
        input=document.createElement('select');const empty=document.createElement('option');empty.value='';empty.textContent='Choisir une réponse';input.append(empty);
        q.options.forEach((text,j)=>{const o=document.createElement('option');o.value=String(j);o.textContent=text;input.append(o);});
      }else if(q.type==='manual'){input=document.createElement('textarea');input.rows=3;input.placeholder='Écris ta réponse ou les étapes de ton raisonnement.';}
      else{input=document.createElement('input');input.type='text';input.inputMode='decimal';input.autocomplete='off';input.placeholder='Ta réponse';}
      input.id=key;input.setAttribute('aria-describedby',key+'-feedback');
      const line=document.createElement('div');line.className='input-line';line.append(input);
      if(q.unit){const unit=document.createElement('span');unit.className='unit';unit.textContent=q.unit;line.append(unit);}
      wrap.append(line);const feedback=document.createElement('p');feedback.id=key+'-feedback';feedback.className='answer-status';feedback.setAttribute('role','status');wrap.append(feedback);card.append(wrap);
      const field={q,input,feedback,evaluation,correct:false,checked:false};allFields.push(field);
      input.addEventListener('input',()=>{field.checked=false;field.correct=false;feedback.textContent='';feedback.className='answer-status';input.removeAttribute('aria-invalid');updateProgress();if(evaluation)$('eval-score').textContent='Réponses modifiées : vérifie à nouveau le bilan.';});
    });
    const fields=allFields.filter(f=>f.input.id.startsWith(id+'-'));
    const actions=document.createElement('div');actions.className='actions';
    if(!evaluation){const check=document.createElement('button');check.type='button';check.className='primary';check.textContent='Vérifier mes réponses';check.addEventListener('click',()=>{fields.forEach(checkField);if(card.mission){const m=card.mission;if(completeMission(m)){m.completed=true;card.classList.add('mission-won');}m.fields.filter(f=>f.correct).forEach(f=>earned.add(f.input.id));updateGame();}updateProgress();});actions.append(check);card.append(actions);}
    const correction=document.createElement('details');correction.className='correction';
    const summary=document.createElement('summary');summary.textContent=evaluation?'Consulter le corrigé et le barème':'Voir le corrigé détaillé';correction.append(summary);
    const explanation=document.createElement('p');explanation.textContent=ex.correction;correction.append(explanation);
    ex.questions.forEach(q=>{if(q.type==='manual'){const p=document.createElement('p');p.textContent=q.label+'\n'+q.answer;correction.append(p);}});card.append(correction);
    card.fields=fields;return card;
  }
  function checkField(field) {
    const {q,input,feedback}=field;field.checked=true;feedback.className='answer-status';input.removeAttribute('aria-invalid');
    if(q.type==='manual'){
      field.correct=false;feedback.classList.add('manual');feedback.textContent=input.value.trim()?'Réponse à comparer au corrigé avec le formateur. Elle n’est pas notée automatiquement.':'Rédaction à compléter ; appréciation par le formateur.';return;
    }
    if(input.value.trim()===''){field.correct=false;feedback.classList.add('retry');feedback.textContent='Réponse manquante.';input.setAttribute('aria-invalid','true');return;}
    const correct=q.type==='choice'?Number(input.value)===q.answer:numericCorrect(input.value,q);field.correct=correct;
    feedback.classList.add(correct?'ok':'retry');feedback.textContent=correct?'✓ Réponse correcte.':q.round!==undefined?`↺ Vérifie le calcul, l’unité et l’arrondi à ${q.round} décimales.`:'↺ Reprends une étape du calcul ou consulte le cours.';
    if(!correct)input.setAttribute('aria-invalid','true');
  }
  function updateProgress(){const fields=allFields.filter(f=>!f.evaluation&&f.q.type!=='manual');const count=fields.filter(f=>f.correct).length;$('progress-value').max=fields.length;$('progress-value').value=count;$('progress-text').textContent=`${count} / ${fields.length} réponses vérifiées`;}
  function showTab(tab,focus=true){currentTab=tab;document.body.setAttribute('data-stage',tab);for(const name of ['decouverte','cours','exercices','bilan']){$(name).hidden=name!==tab;const b=$('tab-'+name);b.setAttribute('aria-selected',String(name===tab));b.tabIndex=name===tab?0:-1;}if(focus)$('title-'+tab).focus();}
  const tabNames=['decouverte','cours','exercices','bilan'];
  tabNames.forEach((name,i)=>{const b=$('tab-'+name);b.addEventListener('click',()=>showTab(name));b.addEventListener('keydown',e=>{let j;if(e.key==='ArrowRight')j=(i+1)%4;else if(e.key==='ArrowLeft')j=(i+3)%4;else if(e.key==='Home')j=0;else if(e.key==='End')j=3;if(j!==undefined){e.preventDefault();showTab(tabNames[j],false);$('tab-'+tabNames[j]).focus();}});});
  document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.next)));
  $('lesson-title').textContent=D.title;$('lesson-subtitle').textContent=D.subtitle;$('lesson-code').textContent=D.code+' · '+D.duration;$('prerequisites').textContent=D.prerequisites;
  D.objectives.forEach((text,i)=>{const e=document.createElement('div');e.className='objective';e.innerHTML=`<b>0${i+1}</b>${esc(text)}`;$('objectives').append(e);});
  D.discovery.forEach((ex,i)=>$('discovery-exercises').append(renderExercise(ex,'discovery-'+i)));
  D.course.forEach(([title,text],i)=>{const d=document.createElement('details');d.className='course-details';d.open=i===0;d.innerHTML=`<summary>${esc(title)}</summary><p>${esc(text)}</p>`;$('course-content').append(d);});
  D.levels.forEach((level,i)=>{
    const container=document.createElement('div');container.id='level-'+i;container.hidden=i!==0;
    level.forEach((ex,j)=>{
      const card=renderExercise(ex,`level-${i}-ex-${j}`);const m={card,fields:card.fields,level:i,index:j,completed:false,review:{checked:false}};card.mission=m;missions.push(m);
      const flag=document.createElement('p');flag.className='challenge-label';flag.textContent=`MISSION ${String(j+1).padStart(2,'0')} / ${level.length} · ${levelNames[i]}`;card.prepend(flag);
      if(m.fields.some(f=>f.q.type==='manual')){
        const label=document.createElement('label');label.className='self-review';const check=document.createElement('input');check.type='checkbox';check.id=`review-${i}-${j}`;m.review=check;
        label.append(check,document.createTextNode('J’ai rédigé mes réponses et comparé mon raisonnement au corrigé. Cette auto-vérification reste à relire avec le formateur.'));
        card.append(label);check.addEventListener('change',()=>{if(completeMission(m)){m.completed=true;card.classList.add('mission-won');updateGame();}});
      }
      container.append(card);
      const dot=document.createElement('button');dot.id=`mission-dot-${i}-${j}`;dot.type='button';dot.dataset.mission=String(j);dot.dataset.missionLevel=String(i);dot.textContent=String(j+1);dot.addEventListener('click',()=>showMission(i,j));$('mission-dots').append(dot);
    });$('training-content').append(container);
  });
  document.querySelectorAll('[data-level]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.level);if(unlocked[n])showMission(n,positions[n]);}));
  $('mission-prev').addEventListener('click',()=>showMission(currentLevel,positions[currentLevel]-1));
  $('mission-next').addEventListener('click',()=>{if(positions[currentLevel]<D.levels[currentLevel].length-1)showMission(currentLevel,positions[currentLevel]+1);else if(currentLevel<2&&unlocked[currentLevel+1])showMission(currentLevel+1,0);else if(currentLevel===2)showTab('bilan');});
  window.LessonGame={unlocked,missions,earned,showMission};
  updateGame();
  $('evaluation-content').append(renderExercise(D.evaluation,'evaluation',true));
  $('check-evaluation').addEventListener('click',()=>{
    const fields=allFields.filter(f=>f.evaluation);fields.forEach(checkField);
    const auto=fields.filter(f=>f.q.type!=='manual');const possible=auto.reduce((s,f)=>s+(f.q.points||0),0);const score=auto.reduce((s,f)=>s+(f.correct?(f.q.points||0):0),0);const manual=fields.filter(f=>f.q.type==='manual').reduce((s,f)=>s+(f.q.points||0),0);const missing=auto.filter(f=>!f.input.value.trim()).length;
    $('eval-score').textContent=`Contrôle automatique : ${fmt(score)} / ${fmt(possible)} points.\n${fmt(manual)} point${manual>1?'s':''} de rédaction à apprécier par le formateur. Barème total : 8 points.\n${missing?missing+' réponse(s) à compléter.':'Toutes les réponses à contrôle automatique sont renseignées.'}\nLes étapes du raisonnement et la rédaction restent à relire avec le formateur.`;
  });
  $('print-bilan').addEventListener('click',()=>window.print());$('text-size').addEventListener('click',e=>{const on=document.body.classList.toggle('large');e.currentTarget.setAttribute('aria-pressed',String(on));});
  D.notes.forEach(text=>{const li=document.createElement('li');li.textContent=text;$('teacher-notes').append(li);});
  function read(id){return parseNumber($(id).value);}
  function setupEquations(){
    $('simulation').innerHTML=heading('Atelier interactif · Isoler x')+`<p>Change les nombres, puis effectue la même opération dans les deux membres.</p><div class="sim-layout"><div><div class="sim-inputs"><label>Coefficient a<input id="sim-a" type="text" inputmode="decimal" value="22"></label><label>Forfait b<input id="sim-b" type="text" inputmode="decimal" value="14"></label><label>Total c<input id="sim-c" type="text" inputmode="decimal" value="190"></label></div><div class="actions"><button id="sim-reset" class="secondary">Repartir de l’équation</button><button id="sim-next" class="primary">Étape suivante →</button></div><div id="equation-steps" class="sim-steps" aria-live="polite"></div></div><div class="sim-graphic"><div id="sim-formula" class="formula"></div><label for="sim-x">Tester une valeur de x</label><input id="sim-x" type="range" min="0" max="20" step="0.5" value="0" style="width:100%"><div id="sim-test" class="sim-result" role="status"></div><p class="competence">Le curseur explore des valeurs positives ou nulles. La résolution algébrique peut aussi donner une valeur négative.</p></div></div>`;
    let step=0;
    const update=()=>{const a=read('sim-a'),b=read('sim-b'),c=read('sim-c');let result;try{result=solve(a,b,c);}catch(e){$('equation-steps').textContent=e.message;$('sim-next').disabled=true;$('sim-formula').textContent='Équation à vérifier';$('sim-test').textContent='Saisir des coefficients valides.';return;}$('sim-next').disabled=step===3;const sign=b<0?'−':'+';$('sim-formula').textContent=`${fmt(a)}x ${sign} ${fmt(Math.abs(b))} = ${fmt(c)}`;
      const lines=[`${fmt(a)}x ${sign} ${fmt(Math.abs(b))} = ${fmt(c)}`,`Soustraire (${fmt(b)}) aux deux membres : ${fmt(a)}x = ${fmt(c)} − (${fmt(b)}) = ${fmt(result.remaining)}`,`Diviser par (${fmt(a)}) : x = ${fmt(result.remaining)} ÷ (${fmt(a)}) = ${fmt(result.x)}`,`Vérifier : ${fmt(a)} × (${fmt(result.x)}) + (${fmt(b)}) = ${fmt(result.check)}`];$('equation-steps').replaceChildren();lines.slice(0,step+1).forEach((text,i)=>{const d=document.createElement('div');d.className='sim-step'+(i===step?' active':'');d.textContent=text;$('equation-steps').append(d);});
      const x=Number($('sim-x').value),value=a*x+b;const same=Math.abs(value-c)<1e-7;$('sim-test').textContent=`x testé = ${fmt(x)}\n${fmt(a)} × ${fmt(x)} + (${fmt(b)}) = ${fmt(value)}\n${same?'✓ Égalité vérifiée.':'Le total diffère de '+fmt(c)+'.'}`;
    };
    ['sim-a','sim-b','sim-c'].forEach(id=>$(id).addEventListener('input',()=>{step=0;update();}));$('sim-x').addEventListener('input',update);$('sim-reset').addEventListener('click',()=>{step=0;update();});$('sim-next').addEventListener('click',()=>{step=Math.min(3,step+1);update();});update();
  }
  function geometryDrawing(shape,l,h,d,unit){
    let paths='',label='';const line='fill="#e9f2f7" stroke="#A50F23" stroke-width="5"';
    if(shape==='cercle'){paths=`<circle cx="210" cy="125" r="76" ${line}/><path d="M134 125H286" stroke="#4c6e88" stroke-dasharray="5 5" stroke-width="2"/>`;label=`D = ${fmt(d)} ${unit}`;}
    else if(shape==='arche'){paths=`<path d="M130 210V110A80 80 0 0 1 290 110V210Z" ${line}/><path d="M130 110H290" stroke="#7a8c9f" stroke-dasharray="5 5"/>`;label=`Largeur ${fmt(l)} ${unit} · hauteur droite ${fmt(h)} ${unit}`;}
    else if(shape==='stade'){paths=`<path d="M112 52H305A68 68 0 0 1 305 188H112A68 68 0 0 1 112 52Z" ${line}/><path d="M112 52V188M305 52V188" stroke="#7a8c9f" stroke-dasharray="5 5"/>`;label=`Côté droit ${fmt(l)} ${unit} · largeur ${fmt(h)} ${unit}`;}
    else if(shape==='triangle'){paths=`<path d="M105 192L175 45 320 192Z" ${line}/>`;label='Trois côtés : schéma indicatif';}
    else{const ratio=shape==='carre'?1:l/h;const w=Math.min(245,155*ratio),ht=Math.min(155,245/ratio),x=(420-w)/2,y=(245-ht)/2;paths=`<rect x="${x}" y="${y}" width="${w}" height="${ht}" ${line}/>`;label=shape==='carre'?`c = ${fmt(l)} ${unit}`:`L = ${fmt(l)} ${unit} · l = ${fmt(h)} ${unit}`;}
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 270" role="img" aria-label="${esc(label)}">${paths}<text x="210" y="248" text-anchor="middle" font-family="Arial" font-size="13" fill="#405470">${esc(label)}</text></svg>`;
  }
  function setupGeometry(){
    $('simulation').innerHTML=heading('Atelier interactif · Suivre le contour')+`<p>Le trait bordeaux représente le contour à mesurer. Les pointillés intérieurs ne sont pas comptés.</p><label for="sim-shape">Figure</label><select id="sim-shape"><option value="rectangle">Rectangle</option><option value="carre">Carré</option><option value="cercle">Cercle</option><option value="triangle">Triangle</option><option value="arche">Rectangle + demi-cercle</option><option value="stade">Stade : rectangle + deux demi-cercles</option></select><div class="sim-layout"><div><div class="sim-inputs"><label id="wrap-l"><span id="label-l">Longueur L</span><input id="geo-l" type="text" inputmode="decimal" value="2,4"></label><label id="wrap-h"><span id="label-h">Largeur / hauteur</span><input id="geo-h" type="text" inputmode="decimal" value="1,2"></label><label id="wrap-d" hidden>Diamètre D<input id="geo-d" type="text" inputmode="decimal" value="0,8"></label><label id="wrap-third" hidden>Troisième côté<input id="geo-third" type="text" inputmode="decimal" value="2"></label><label>Unité des dimensions<select id="geo-unit"><option value="m">m</option><option value="cm">cm</option><option value="mm">mm</option></select></label><label>Longueur commerciale (m)<input id="geo-bar" type="text" inputmode="decimal" value="2,5"></label></div><div id="geo-result" class="sim-result" role="status"></div><div class="important">Le nombre de barres est une estimation de linéaire, avec raccords possibles et pertes négligées. Pour des pièces rigides sans raccord, vérifier la découpe. Un cercle exige une finition cintrable ou souple.</div></div><div class="sim-graphic"><div id="geo-drawing"></div><p class="competence">Schéma indicatif. Les dimensions chiffrées font foi. π ≈ 3,1416.</p></div></div>`;
    const update=()=>{const shape=$('sim-shape').value,unit=$('geo-unit').value,scale={m:1,cm:.01,mm:.001}[unit];const l=read('geo-l'),h=read('geo-h'),d=read('geo-d'),third=read('geo-third'),bar=read('geo-bar');$('wrap-l').hidden=shape==='cercle';$('wrap-h').hidden=['cercle','carre'].includes(shape);$('wrap-d').hidden=shape!=='cercle';$('wrap-third').hidden=shape!=='triangle';$('label-l').textContent=shape==='arche'?'Largeur / diamètre':shape==='stade'?'Longueur droite':shape==='carre'?'Côté c':'Longueur / côté a';$('label-h').textContent=shape==='arche'?'Hauteur droite':shape==='stade'?'Largeur / diamètre':'Largeur / côté b';
      try{const p=perimeter(shape,l===null?NaN:l*scale,h===null?NaN:h*scale,d===null?NaN:d*scale,third===null?NaN:third*scale);const n=pieces(p,bar);$('geo-result').textContent=`Périmètre : ${fmt(p)} m\nSoit ${fmt(p*100)} cm ou ${fmt(p*1000)} mm\nAu centième : ${fmt(Math.round(p*100)/100)} m\nEstimation de linéaire : ${n} longueur(s) de ${fmt(bar)} m.\nLongueur achetée : ${fmt(n*bar)} m.`;$('geo-drawing').innerHTML=geometryDrawing(shape,l,h,d,unit);}catch(e){$('geo-result').textContent=e.message;$('geo-drawing').replaceChildren();}
    };
    ['sim-shape','geo-unit'].forEach(id=>$(id).addEventListener('change',update));['geo-l','geo-h','geo-d','geo-third','geo-bar'].forEach(id=>$(id).addEventListener('input',update));update();
  }
  if(D.kind==='equations')setupEquations();else setupGeometry();
  updateProgress();showTab('decouverte',false);
})();
