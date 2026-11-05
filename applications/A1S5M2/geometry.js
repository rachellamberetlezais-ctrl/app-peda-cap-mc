(() => {
 'use strict';
 const PI=3.1416;
 function plan(shape,a,b,c){
  const dims=shape==='cercle'||shape==='carre'?[a]:shape==='triangle'?[a,b,c]:[a,b];
  if(!dims.every(v=>Number.isFinite(v)&&v>=.05&&v<=10))throw Error('Choisis des dimensions de 0,05 à 10 mètres, après conversion.');
  if(shape==='triangle'&&(a+b<=c||a+c<=b||b+c<=a))throw Error('Ces trois côtés ne peuvent pas former un triangle : un côté doit être plus petit que la somme des deux autres.');
  const segments=[],inside=[],points=[];let outline='',symbol='';
  const seg=(id,name,length,d,x,y)=>segments.push({id,name,length,d,x,y});
  if(shape==='rectangle'||shape==='carre'){
   const h=shape==='carre'?a:b,k=Math.min(70,270/a,175/h),w=a*k,ht=h*k,x=210-w/2,y=145-ht/2;
   outline=`M${x} ${y}h${w}v${ht}h${-w}Z`;points.push(['A',x-12,y-10],['B',x+w+12,y-10],['C',x+w+12,y+ht+20],['D',x-12,y+ht+20]);
   seg('a','Haut · AB',a,`M${x} ${y}h${w}`,210,y-12);seg('b','Droite · BC',h,`M${x+w} ${y}v${ht}`,x+w+18,145);seg('c','Bas · CD',a,`M${x+w} ${y+ht}h${-w}`,210,y+ht+24);seg('d','Gauche · DA',h,`M${x} ${y+ht}v${-ht}`,x-18,145);
   symbol=shape==='carre'?'P = 4 × côté':'P = 2 × (longueur + largeur)';
  }else if(shape==='cercle'){
   const r=Math.min(100,a*35),x=210,y=145;
   outline=`M${x-r} ${y}a${r} ${r} 0 1 1 ${2*r} 0a${r} ${r} 0 1 1 ${-2*r} 0`;
   seg('a','Tout le cercle',PI*a,outline,210,y-r-12);inside.push(`M${x-r} ${y}h${2*r}`);symbol='P ≈ π × diamètre';
  }else if(shape==='triangle'){
   // AB=a ; AC=b ; BC=c. Les coordonnées respectent les trois longueurs.
   const x=(a*a+b*b-c*c)/(2*a),y=Math.sqrt(Math.max(0,b*b-x*x));
   const min=Math.min(0,x),max=Math.max(a,x),k=Math.min(70,275/(max-min),175/y),left=210-(max-min)*k/2-min*k,base=235;
   const A=[left,base],B=[left+a*k,base],C=[left+x*k,base-y*k];
   outline=`M${A}L${B}L${C}Z`;points.push(['A',A[0]-10,A[1]+18],['B',B[0]+10,B[1]+18],['C',C[0],C[1]-14]);
   seg('a','Base · AB',a,`M${A}L${B}`,(A[0]+B[0])/2,base+24);seg('b','Côté · BC',c,`M${B}L${C}`,(B[0]+C[0])/2+16,(B[1]+C[1])/2);seg('c','Côté · CA',b,`M${C}L${A}`,(C[0]+A[0])/2-16,(C[1]+A[1])/2);symbol='P = AB + BC + CA';
  }else if(shape==='arche'){
   const k=Math.min(70,270/a,185/(b+a/2)),w=a*k,r=w/2,x=210-r,sy=50+r,bottom=sy+b*k;
   const arc=`M${x} ${sy}A${r} ${r} 0 0 1 ${x+w} ${sy}`;
   outline=`M${x} ${bottom}V${sy}A${r} ${r} 0 0 1 ${x+w} ${sy}V${bottom}Z`;
   seg('a','Montant gauche',b,`M${x} ${bottom}V${sy}`,x-18,(bottom+sy)/2);seg('b','Demi-cercle supérieur',PI*a/2,arc,210,36);seg('c','Montant droit',b,`M${x+w} ${sy}V${bottom}`,x+w+18,(bottom+sy)/2);seg('d','Base',a,`M${x+w} ${bottom}H${x}`,210,bottom+23);
   inside.push(`M${x} ${sy}H${x+w}`);symbol='P ≈ largeur + 2 × hauteur droite + π × largeur ÷ 2';
  }else if(shape==='stade'){
   const k=Math.min(70,300/(a+b),175/b),w=a*k,h=b*k,r=h/2,x=210-w/2,y=145-r;
   const right=`M${x+w} ${y}A${r} ${r} 0 0 1 ${x+w} ${y+h}`,left=`M${x} ${y+h}A${r} ${r} 0 0 1 ${x} ${y}`;
   outline=`M${x} ${y}H${x+w}A${r} ${r} 0 0 1 ${x+w} ${y+h}H${x}A${r} ${r} 0 0 1 ${x} ${y}Z`;
   seg('a','Partie droite du haut',a,`M${x} ${y}H${x+w}`,210,y-13);seg('b','Demi-cercle droit',PI*b/2,right,x+w+r+14,145);seg('c','Partie droite du bas',a,`M${x+w} ${y+h}H${x}`,210,y+h+23);seg('d','Demi-cercle gauche',PI*b/2,left,x-r-14,145);
   inside.push(`M${x} ${y}V${y+h}`,`M${x+w} ${y}V${y+h}`);symbol='P ≈ 2 × longueur droite + π × largeur';
  }else throw Error('Figure inconnue.');
  return {segments,inside,points,outline,symbol,perimeter:segments.reduce((s,x)=>s+x.length,0),curved:['cercle','arche','stade'].includes(shape)};
 }
 function pieces(p,bar){if(!Number.isFinite(bar)||bar<=0||!Number.isFinite(p)||p<0)throw Error('La longueur commerciale doit être un nombre positif.');return Math.ceil(p/bar-1e-10);}
 window.ContourMath={plan,pieces,PI};
})();
