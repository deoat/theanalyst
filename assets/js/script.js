(function(){
var root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var btn=document.querySelector('.theme');
function isDark(){var t=root.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches}
function label(){btn.setAttribute('aria-label',isDark()?'Switch to light mode':'Switch to dark mode')}
try{var s=localStorage.getItem('theme');if(s)root.setAttribute('data-theme',s)}catch(e){}
label();
btn.addEventListener('click',function(){var n=isDark()?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}label()});
var mb=document.querySelector('.menu-btn'),nav=document.getElementById('menu');
mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
var words=['clinical workflows','stakeholder needs','complex requirements','process gaps','healthcare data'],el=document.getElementById('rotor');
if(reduce){el.textContent=words[0]}else{var w=0,c=words[0].length,del=true;
(function tick(){var t=words[w];c+=del?-1:1;el.textContent=t.slice(0,c);var d=del?40:75;
if(!del&&c===t.length){del=true;d=1800}else if(del&&c===0){del=false;w=(w+1)%words.length;d=300}
setTimeout(tick,d)})();}
var items=document.querySelectorAll('.card,.project,.timeline li,.head');
if('IntersectionObserver' in window&&!reduce){items.forEach(function(i){i.classList.add('reveal')});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});items.forEach(function(i){io.observe(i)});}
var f=document.getElementById('form'),st=document.getElementById('status');
f.addEventListener('submit',function(e){e.preventDefault();st.textContent='Sending…';
fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}}).then(function(r){
if(r.ok){st.textContent='Thank you, your message has been sent.';f.reset()}else{st.textContent='Sorry, something went wrong. Please email me directly.'}
}).catch(function(){st.textContent='Sorry, something went wrong. Please email me directly.'})});
document.getElementById('yr').textContent=new Date().getFullYear();
})();
