/* ========================= */
/* FLOWER ANIMATION (HOME) */
/* ========================= */

let flowerStarted=false;

function startFlower(){

if(flowerStarted) return;
flowerStarted=true;

const canvas=document.getElementById("flowerCanvas");
if(!canvas) return;

const ctx=canvas.getContext("2d");

function resize(){
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
}

resize();
window.addEventListener("resize",resize);

let flowers=[];

const colors=[
"#ff6fa1",
"#ff9ec4",
"#ffd54f",
"#ff8a80",
"#ce93d8",
"#80deea"
];

class Flower{

constructor(){
this.reset();
}

reset(){
this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height;
this.size=Math.random()*8+4;
this.speed=Math.random()*0.5+0.2;
this.color=colors[Math.floor(Math.random()*colors.length)];
}

draw(){

ctx.save();
ctx.translate(this.x,this.y);

ctx.fillStyle="#ffd700";

ctx.beginPath();
ctx.arc(0,0,this.size/2,0,Math.PI*2);
ctx.fill();

for(let i=0;i<5;i++){

ctx.rotate(Math.PI*2/5);

ctx.beginPath();
ctx.arc(this.size,0,this.size/1.6,0,Math.PI*2);

ctx.fillStyle=this.color;
ctx.fill();

}

ctx.restore();

}

update(){

this.y-=this.speed;

if(this.y<-20){
this.y=canvas.height+20;
this.x=Math.random()*canvas.width;
}

this.draw();

}

}

for(let i=0;i<100;i++){
flowers.push(new Flower());
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

flowers.forEach(f=>{
f.update();
});

requestAnimationFrame(animate);

}

animate();

}



/* ========================= */
/* SPACE ENVIRONMENT (PROFILE) */
/* ========================= */

let neuralStarted=false;

function startNeural(){

if(neuralStarted) return;
neuralStarted=true;

const canvas=document.getElementById("neural");
if(!canvas) return;

const ctx=canvas.getContext("2d");

function resize(){
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
}

resize();
window.addEventListener("resize",resize);


/* STARS */

let stars=[];

for(let i=0;i<350;i++){

stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2.5,
alpha:Math.random(),
speed:Math.random()*0.02,
color:Math.random()*360
});

}


/* NEBULA CLOUDS */

let nebula=[];

for(let i=0;i<8;i++){

nebula.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:250+Math.random()*250,
color:`hsla(${Math.random()*360},80%,60%,0.18)`
});

}


/* PLANETS */

let planets=[];

for(let i=0;i<4;i++){

planets.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:40+Math.random()*70,
color:`hsl(${Math.random()*360},70%,60%)`,
vx:(Math.random()-0.5)*0.25,
vy:(Math.random()-0.5)*0.25
});

}


/* METEORS */

let meteors=[];

function createMeteor(){

meteors.push({
x:Math.random()*canvas.width,
y:-60,
vx:-6-Math.random()*4,
vy:6+Math.random()*4,
life:0
});

}

setInterval(createMeteor,1000);


/* SPACESHIPS */

let ships=[];

for(let i=0;i<4;i++){

ships.push({
x:Math.random()*canvas.width,
y:100+Math.random()*300,
speed:2+Math.random()*3,
color:`hsl(${Math.random()*360},100%,65%)`
});

}


/* ANIMATION */

function animate(){

ctx.fillStyle="rgba(5,5,30,0.45)";
ctx.fillRect(0,0,canvas.width,canvas.height);


/* NEBULA */

nebula.forEach(n=>{

let g=ctx.createRadialGradient(
n.x,n.y,0,
n.x,n.y,n.r
);

g.addColorStop(0,n.color);
g.addColorStop(1,"transparent");

ctx.fillStyle=g;

ctx.beginPath();
ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
ctx.fill();

});


/* STARS */

stars.forEach(s=>{

s.alpha+=s.speed;

if(s.alpha>1 || s.alpha<0) s.speed*=-1;

ctx.beginPath();
ctx.arc(s.x,s.y,s.size,0,Math.PI*2);

ctx.fillStyle=`hsla(${s.color},100%,80%,${s.alpha})`;

ctx.fill();

});


/* PLANETS */

planets.forEach(p=>{

p.x+=p.vx;
p.y+=p.vy;

let g=ctx.createRadialGradient(
p.x,p.y,p.r*0.2,
p.x,p.y,p.r
);

g.addColorStop(0,"white");
g.addColorStop(0.3,p.color);
g.addColorStop(1,"black");

ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

ctx.fillStyle=g;
ctx.fill();

});


/* METEORS (FIRE SHOOTING STARS) */

for(let i=meteors.length-1;i>=0;i--){

let m=meteors[i];

m.x+=m.vx;
m.y+=m.vy;
m.life++;


/* FIRE TRAIL */

for(let t=0;t<12;t++){

ctx.beginPath();

ctx.arc(
m.x-m.vx*t*0.8,
m.y-m.vy*t*0.8,
3*(1-t/12),
0,
Math.PI*2
);

let hue=20+Math.random()*40;

ctx.fillStyle=`hsla(${hue},100%,50%,${1-t/12})`;

ctx.fill();

}


/* FIRE FRONT */

let g=ctx.createRadialGradient(
m.x,m.y,0,
m.x,m.y,12
);

g.addColorStop(0,"white");
g.addColorStop(0.3,"yellow");
g.addColorStop(0.6,"orange");
g.addColorStop(1,"red");

ctx.beginPath();
ctx.arc(m.x,m.y,6,0,Math.PI*2);

ctx.fillStyle=g;
ctx.fill();


if(m.life>80){
meteors.splice(i,1);
}

}


/* SPACESHIPS */

ships.forEach(s=>{

s.x+=s.speed;

if(s.x>canvas.width+40){
s.x=-40;
s.y=100+Math.random()*300;
}

ctx.shadowBlur=15;
ctx.shadowColor=s.color;

ctx.fillStyle=s.color;

ctx.beginPath();
ctx.moveTo(s.x,s.y);
ctx.lineTo(s.x-15,s.y+6);
ctx.lineTo(s.x-15,s.y-6);
ctx.closePath();
ctx.fill();

ctx.shadowBlur=0;

});


requestAnimationFrame(animate);

}

animate();

}


/* ========================= */
/* MATRIX RAIN (EXPERIENCE) */
/* ========================= */

let rainStarted=false;

function startRain(){

if(rainStarted) return;
rainStarted=true;

const canvas=document.getElementById("rain");
if(!canvas) return;

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const letters="01";
const fontSize=16;
const columns=canvas.width/fontSize;

let drops=[];

for(let i=0;i<columns;i++){
drops[i]=1;
}

function draw(){

ctx.fillStyle="rgba(0,0,0,0.05)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#0f0";
ctx.font=fontSize+"px monospace";

for(let i=0;i<drops.length;i++){

const text=letters.charAt(Math.floor(Math.random()*letters.length));

ctx.fillText(text,i*fontSize,drops[i]*fontSize);

if(drops[i]*fontSize>canvas.height && Math.random()>0.975){
drops[i]=0;
}

drops[i]++;

}

}

setInterval(draw,33);

}