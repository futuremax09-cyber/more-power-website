/* ===================================
   MORE POWER
   PREMIUM SCRIPT
=================================== */

// Smooth Navbar Background

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

if(window.scrollY > 60){

header.style.background="rgba(0,0,0,.92)";
header.style.boxShadow="0 10px 30px rgba(0,0,0,.45)";

}else{

header.style.background="rgba(0,0,0,.75)";
header.style.boxShadow="none";

}

});


// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


// Reveal Animation

const reveal=document.querySelectorAll(

".card,.benefit,.price-card,.faq-box,.hero-left,.hero-right"

);

function revealAnimation(){

const trigger=window.innerHeight*0.85;

reveal.forEach(item=>{

const top=item.getBoundingClientRect().top;

if(top<trigger){

item.classList.add("show");

}

});

}

window.addEventListener("scroll",revealAnimation);

revealAnimation();


// Floating Glow Effect

const hero=document.querySelector(".hero");

window.addEventListener("mousemove",(e)=>{

const x=e.clientX/window.innerWidth;

const y=e.clientY/window.innerHeight;

hero.style.backgroundPosition=

`${x*40}px ${y*40}px`;

});


// Button Ripple

document.querySelectorAll(

".buy-btn,.buy-big,.order-btn"

).forEach(btn=>{

btn.addEventListener("click",function(e){

let circle=document.createElement("span");

circle.className="ripple";

this.appendChild(circle);

const d=Math.max(

this.clientWidth,

this.clientHeight

);

circle.style.width=d+"px";

circle.style.height=d+"px";

circle.style.left=

e.offsetX-d/2+"px";

circle.style.top=

e.offsetY-d/2+"px";

setTimeout(()=>{

circle.remove();

},600);

});

});


// Counter Animation

const offer=document.querySelector(".offer");

if(offer){

let start=0;

const end=2999;

const speed=10;

const counter=setInterval(()=>{

start+=37;

if(start>=end){

offer.innerHTML="₹2999";

clearInterval(counter);

}else{

offer.innerHTML="₹"+start;

}

},speed);

}


// Fade Hero

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});


// Mouse Parallax

const bottle=document.querySelector(".hero-right img");

document.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.pageX)/40;

const y=(window.innerHeight/2-e.pageY)/40;

bottle.style.transform=

`translate(${x}px,${y}px)`;

});


// Scroll Progress Bar

const progress=document.createElement("div");

progress.style.position="fixed";

progress.style.top="0";

progress.style.left="0";

progress.style.height="4px";

progress.style.width="0%";

progress.style.background="#d4af37";

progress.style.zIndex="99999";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const scroll=

document.documentElement.scrollTop;

const height=

document.documentElement.scrollHeight-

document.documentElement.clientHeight;

progress.style.width=

(scroll/height)*100+"%";

});


// Console

console.log(

"MORE POWER Premium Website Loaded Successfully"

);
