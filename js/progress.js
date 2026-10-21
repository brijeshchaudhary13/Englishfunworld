const P={key:'efw-progress-v1',d:null,gates:[0,15,40],names:['Beginner','Intermediate','Advanced'],
 load(){try{this.d=JSON.parse(localStorage.getItem(this.key))}catch(e){}
  this.d=Object.assign({stars:0,acts:0,words:[],sound:true,diff:0,badges:[],spoke:0},this.d||{})},
 save(){try{localStorage.setItem(this.key,JSON.stringify(this.d))}catch(e){}},
 BADGES:[['🌟','First Star',d=>d.stars>=1],['📚','10 Words',d=>d.words.length>=10],['🎯','5 Activities',d=>d.acts>=5],['🎤','Speaker',d=>d.spoke>=1],['🚀','25 Stars',d=>d.stars>=25],['🏆','50 Stars',d=>d.stars>=50]],
 open(i){return this.d.stars>=this.gates[i]},
 learn(w){if(!this.d.words.includes(w))this.d.words.push(w);this.save()},
 award(n){this.d.stars+=n;this.d.acts++;this.save();const nb=this.BADGES.filter(b=>b[2](this.d)&&!this.d.badges.includes(b[1]));
  nb.forEach(b=>this.d.badges.push(b[1]));this.save();return nb}};
