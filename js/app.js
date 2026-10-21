P.load();
const GAMES=[['match','🖼️','Picture & Word Match'],['listen','👂','Listen & Choose'],['missing','🔤','Missing Letter'],['build','🧱','Sentence Builder'],['speak','🎤','Speak & Earn Stars']];
function go(s){S.canSpeak&&speechSynthesis.cancel();stars();({home,learn,games,talk,prog,play:()=>runGame(rnd(GAMES)[0]),speak:()=>runGame('speak')})[s]()}
function home(){$v.innerHTML=`<div class="text-center"><div class="mascot" aria-hidden="true">🦉</div><h1>English Fun World</h1><p class="bubble">Hi friend! I am Ollie. Let's play and learn English!</p></div>
 <div class="row g-3 justify-content-center my-2">${[['play','🎮','Play Now'],['learn','📖','Learn Words'],['speak','🎤','Speak English'],['games','🧩','Mini-Games'],['talk','💬','Talk'],['prog','⭐','My Progress']].map((b,i)=>`<div class="col-6 col-md-4"><button class="big c${i%5}" data-go="${b[0]}"><span style="font-size:2.5rem">${b[1]}</span><br>${b[2]}</button></div>`).join('')}</div>
 <div class="text-center mt-3">${P.names.map((n,i)=>`<button class="chip ${P.d.diff===i?'on':''}" data-d="${i}" ${P.open(i)?'':'disabled'}>${P.open(i)?'':'🔒 '}${n}${P.open(i)?'':' ('+P.gates[i]+'⭐)'}</button>`).join('')}</div>
 <p class="small-note mt-3">No sign-up. Your stars stay on this device.</p>`;
 document.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{P.d.diff=+b.dataset.d;P.save();home()})}
function learn(cat='letters'){const items=cat==='letters'?ALPHA.map((x,i)=>[String.fromCharCode(65+i),x]):VOCAB[cat].map(x=>[null,x]);
 $v.innerHTML=`<h2>Learn Words</h2><div>${['letters',...Object.keys(VOCAB)].map(k=>`<button class="chip ${k===cat?'on':''}" data-c="${k}">${k==='letters'?'🔤 ABC':CATNAMES[k]}</button>`).join('')}</div><div class="row g-3 mt-1">${items.map((x,i)=>`<div class="col-6 col-md-3"><button class="fcard" data-i="${i}" aria-label="Listen to ${x[1][0]}"><span class="e">${x[1][1]}</span><b style="font-size:1.6rem">${x[0]?x[0]+x[0].toLowerCase()+' ':''}${x[1][0]}</b><br>🔊</button></div>`).join('')}</div>`;
 document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>learn(b.dataset.c));
 document.querySelectorAll('.fcard').forEach(b=>b.onclick=()=>{const x=items[+b.dataset.i];S.speak(x[0]?`${x[0]}. ${x[0]} is for ${x[1][0]}. ${x[1][0]}.`:x[1][0],true);P.learn(x[1][0].toLowerCase())})}
function games(){$v.innerHTML=`<h2>Mini-Games</h2><p>Level: <b>${P.names[P.d.diff]}</b></p><div class="row g-3">${GAMES.map((g,i)=>`<div class="col-6 col-md-4"><button class="big c${i}" data-g="${g[0]}"><span style="font-size:2.5rem">${g[1]}</span><br>${g[2]}</button></div>`).join('')}</div>`;
 document.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>runGame(b.dataset.g))}
function runGame(id){const name=GAMES.find(g=>g[0]===id)[2],N=5;let i=0,sc=0;
 const next=()=>{if(i>=N)return end();$v.innerHTML=`<h2>${name} <small class="text-muted">${i+1}/${N}</small></h2><div id="stage"></div>`;
  G[id]($('#stage'),ok=>{if(ok)sc++;i++;next()})};
 const end=()=>{const st=sc>=4?3:sc>=2?2:1,nb=P.award(st);stars();
  $v.innerHTML=`<div class="text-center"><div class="mascot">🏅</div><h2>${sc>=4?'Wonderful!':'Great job!'}</h2><p style="font-size:2rem">${'⭐'.repeat(st)}</p><p>${sc} of ${N} on the first try. You earned ${st} star${st>1?'s':''}!</p><div class="d-grid gap-3 col-md-5 mx-auto"><button class="big c2" id="again">🔁 Play again</button><button class="big c3" data-go="games">🧩 More games</button></div></div>`;
  $('#again').onclick=()=>runGame(id);nb.forEach(b=>toast(`${b[0]} New badge: ${b[1]}!`));S.speak('Great job!')};
 next()}
function talk(){$v.innerHTML=`<h2>Talk</h2><div class="row g-3">${DLG.map((d,i)=>`<div class="col-6 col-md-4"><button class="big c${i%5}" data-t="${i}">${d.t}</button></div>`).join('')}</div>`;
 document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>dialog(DLG[+b.dataset.t]))}
function dialog(d,k=0){if(k>=d.l.length){const nb=P.award(2);stars();nb.forEach(b=>toast(`${b[0]} New badge: ${b[1]}!`));$v.innerHTML=`<div class="text-center"><div class="mascot">🎉</div><h2>Great talking!</h2><p>⭐⭐ You earned 2 stars.</p><button class="big c2 col-md-5" data-go="talk">💬 More talks</button></div>`;return}
 const l=d.l[k];$v.innerHTML=`<h2>${d.t}</h2><div class="text-center"><span class="mascot" style="font-size:4rem">🦉</span><p class="bubble" style="font-size:1.8rem">${l.s} <button class="btn btn-warning btn-sm rounded-pill" id="rep" aria-label="Listen">🔊</button></p></div><p class="text-center">Choose your answer:</p><div class="d-grid gap-3 col-md-6 mx-auto">${l.o.map((o,i)=>`<button class="big c${i+1}" data-o="${i}">${o}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
 $('#rep').onclick=()=>S.speak(l.s,true);S.speak(l.s,true);
 document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const i=+b.dataset.o;S.speak(l.o[i],true);
  if(i===l.r){$('#fb').textContent='🎉 '+rnd(PRAISE);setTimeout(()=>dialog(d,k+1),1800)}else $('#fb').textContent="Let's try again! 💪"})}
function prog(){$v.innerHTML=`<h2>My Progress</h2><div class="row g-3 text-center">${[['⭐',P.d.stars,'Stars'],['📚',P.d.words.length,'Words learned'],['🎯',P.d.acts,'Activities done'],['🔓',P.names.filter((n,i)=>P.open(i)).length+'/3','Levels unlocked']].map((x,i)=>`<div class="col-6 col-md-3"><div class="fcard c${i}"><span class="e">${x[0]}</span><b style="font-size:2rem">${x[1]}</b><br>${x[2]}</div></div>`).join('')}</div><h3 class="mt-4">Badges</h3><div class="row g-3 text-center">${P.BADGES.map(b=>{const on=P.d.badges.includes(b[1]);return`<div class="col-4 col-md-2"><div class="fcard" style="opacity:${on?1:.35}"><span class="e">${b[0]}</span><small>${b[1]}</small></div></div>`}).join('')}</div><button class="btn btn-outline-secondary rounded-pill mt-4" id="reset">Reset progress</button>`;
 $('#reset').onclick=()=>{if(confirm('Erase all stars and badges on this device?')){localStorage.removeItem(P.key);P.load();stars();prog()}}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)go(b.dataset.go)});
$('#soundBtn').onclick=()=>{P.d.sound=!P.d.sound;P.save();$('#soundBtn').textContent=P.d.sound?'🔊':'🔇'};
$('#soundBtn').textContent=P.d.sound?'🔊':'🔇';go('home');
