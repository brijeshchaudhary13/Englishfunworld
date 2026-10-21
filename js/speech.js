const S={
 canListen:!!(window.SpeechRecognition||window.webkitSpeechRecognition),
 canSpeak:'speechSynthesis' in window,
 // force=true plays word audio even when muted (the child asked to hear it)
 speak(t,force){if(!this.canSpeak||(!P.d.sound&&!force))return;speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=.8;u.pitch=1.1;speechSynthesis.speak(u)},
 norm:t=>t.toLowerCase().replace(/[^a-z ]/g,'').trim(),
 // Transcription only: audio is never saved by this app.
 listen(target,cb){const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R)return cb({err:'unsupported'});
  const r=new R();r.lang='en-US';r.maxAlternatives=3;let got=false;
  r.onresult=e=>{got=true;const alts=[...e.results[0]].map(a=>a.transcript);
   cb({heard:alts[0],match:alts.some(a=>S.norm(a)===S.norm(target))})};
  r.onerror=e=>{got=true;cb({err:e.error})};r.onend=()=>{if(!got)cb({err:'no-speech'})};
  try{r.start()}catch(e){cb({err:'busy'})}}};
