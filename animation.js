const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

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
this.depth=Math.random()*1+0.5;
this.speed=0.3*this.depth;
this.color=colors[Math.floor(Math.random()*colors.length)];
this.wind=Math.random()*0.5;
}

draw(){

let sway=Math.sin(Date.now()*0.001+this.x)*this.wind*20;

ctx.save();
ctx.translate(this.x+sway,this.y);

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
this.reset();
this.y=canvas.height+20;
}

this.draw();

}

}

for(let i=0;i<120;i++){
flowers.push(new Flower());
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

flowers.sort((a,b)=>a.depth-b.depth);

flowers.forEach(f=>f.update());

requestAnimationFrame(animate);

}

animate();