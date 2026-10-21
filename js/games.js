const $=s=>document.querySelector(s),$v=$('#view');
const rnd=a=>a[Math.floor(Math.random()*a.length)],shuf=a=>[...a].sort(()=>Math.random()-.5);
const PRAISE=['Great job!','Wonderful!','Super!','Awesome!'];
const pool=()=>Object.keys(VOCAB).slice(0,[4,7,11][P.d.diff]).flatMap(k=>VOCAB[k]);
const nOpts=()=>P.d.diff?4:3;
function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2500)}
function stars(){$('#starCount').textContent=P.d.stars}
function pick(el,prompt,opts,ans,done,word,say){let first=true,locked=false;
 el.innerHTML=`<div class="prompt">${prompt}</div><div class="row g-3 justify-content-center">${opts.map((o,i)=>`<div class="col-6 col-md-3"><button class="big opt c${i}" data-i="${i}">${o}</button></div>`).join('')}</div><div class="fb" id="fb" aria-live="polite"></div>`;
 const rep=el.querySelector('#rep');if(rep)rep.onclick=()=>S.speak(say,true);
 el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(locked)return;
  if(+b.dataset.i===ans){locked=true;b.classList.add('ok');const p=rnd(PRAISE);$('#fb').textContent='🎉 '+p;S.speak(p);if(word)P.learn(word.toLowerCase());setTimeout(()=>done(first),900)}
  else{first=false;b.classList.add('no');$('#fb').textContent="Let's try again! 💪"}})}
const opts4=w=>{const o=shuf([w,...shuf(pool().filter(x=>x[0]!==w[0])).slice(0,nOpts()-1)]);return[o,o.indexOf(w)]};
const G={
 match(el,done){const w=rnd(pool()),[o,a]=opts4(w);
  pick(el,`Find: <b>${w[0]}</b>`,o.map(x=>x[1]),a,done,w[0])},
 listen(el,done){const w=rnd(pool()),[o,a]=opts4(w);
  pick(el,`<button id="rep" class="btn btn-warning btn-lg rounded-pill">🔊 Listen</button>`,o.map(x=>x[1]),a,done,w[0],w[0]);S.speak(w[0],true)},
 missing(el,done){const w=rnd(pool().filter(x=>!/[ -]/.test(x[0]))),i=Math.floor(Math.random()*w[0].length),L=w[0][i].toUpperCase();
  const o=shuf([L,...shuf('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(c=>c!==L)).slice(0,nOpts()-1)]);
  pick(el,`${w[1]}<br>${w[0].toUpperCase().split('').map((c,j)=>j===i?'_':c).join(' ')}`,o,o.indexOf(L),done,w[0])},
 build(el,done){const t=rnd(SENT.slice(0,P.d.diff+1).flat()),ws=t.split(' ');let first=true,ans=[],bank=shuf(ws.map((w,i)=>({w,i})));
  const draw=()=>{el.innerHTML=`<div class="prompt">Put the words in order</div><div class="line" aria-label="Your sentence">${ans.map((x,k)=>`<button class="tile" data-a="${k}">${x.w}</button>`).join('')}</div><div class="text-center">${bank.map((x,k)=>`<button class="tile" data-b="${k}" style="background:#b9d8ff">${x.w}</button>`).join('')}</div><div class="text-center mt-3"><button class="btn btn-warning rounded-pill" id="hint">💡 Hint</button> <button class="btn btn-light rounded-pill" id="hear">🔊 Listen</button></div><div class="fb" id="fb" aria-live="polite"></div>`;
   el.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{ans.push(bank.splice(+b.dataset.b,1)[0]);draw();chk()});
   el.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{bank.push(ans.splice(+b.dataset.a,1)[0]);draw()});
   $('#hint').onclick=()=>{first=false;const k=ans.findIndex((x,j)=>x.w!==ws[j]);if(k>=0)bank.push(...ans.splice(k));
    const j=bank.findIndex(x=>x.w===ws[ans.length]);if(j>=0)ans.push(bank.splice(j,1)[0]);draw();chk()};
   $('#hear').onclick=()=>S.speak(t,true)};
  const chk=()=>{if(bank.length)return;if(ans.map(x=>x.w).join(' ')===t){$('#fb').textContent='🎉 '+rnd(PRAISE);S.speak(t,true);ws.forEach(w=>P.learn(w.toLowerCase()));
    el.querySelectorAll('button').forEach(b=>b.disabled=true);setTimeout(()=>done(first),1600)}
   else{first=false;$('#fb').textContent="Let's try again! 💪";setTimeout(()=>{bank=shuf([...ans]);ans=[];draw()},1000)}};
  draw()},
 speak(el,done){const t=rnd(SPK.slice(0,P.d.diff+1).flat());
  el.innerHTML=`<div class="prompt">Say: <b>${t}</b></div><div class="text-center d-grid gap-3 col-md-6 mx-auto"><button class="big c2" id="lf">🔊 Listen First</button>${S.canListen?'<button class="big c1" id="mic">🎤 Speak Now</button>':'<button class="big c1" id="said">🗣️ I said it!</button>'}<button class="btn btn-light rounded-pill" id="skip">Next ➜</button></div><div class="fb" id="fb" aria-live="polite"></div><p class="small-note">${S.canListen?'Your browser may send your voice to an online service to turn it into text. This app never saves your voice. The words you see are what the computer heard, not a pronunciation score.':'Speech recognition is not available here. Listen, say the words out loud, then tap "I said it!"'}</p>`;
  const ok=()=>{P.d.spoke++;P.learn(t.toLowerCase());$('#fb').insertAdjacentHTML('beforeend','🎉 '+rnd(PRAISE));S.speak(t);setTimeout(()=>done(true),1500)};
  $('#lf').onclick=()=>S.speak(t,true);$('#skip').onclick=()=>done(false);
  if($('#said'))$('#said').onclick=ok;
  if($('#mic'))$('#mic').onclick=()=>{$('#fb').textContent='🎧 Listening...';
   S.listen(t,r=>{if(r.err)$('#fb').textContent=r.err==='not-allowed'?'Microphone is off. You can listen and repeat instead!':"I could not hear you. Let's try again!";
    else if(r.match){$('#fb').innerHTML=`I heard: “${r.heard}”<br>`;ok()}
    else $('#fb').innerHTML=`I heard: “${r.heard}”<br>Let's try again! 💪`})}}};
