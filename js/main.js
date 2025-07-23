// main.js
(function(){
  const burger=document.querySelector('#burger');
  const menu=document.querySelector('#nav-menu');
  if(burger){burger.addEventListener('click',()=>menu.classList.toggle('open'));}
  if(menu){
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
  }
  const toTop=document.createElement('button');
  toTop.className='btn outline';toTop.textContent='↑';
  Object.assign(toTop.style,{position:'fixed',bottom:'20px',right:'20px',opacity:'0',pointerEvents:'none',transition:'opacity .3s',zIndex:9999});
  document.body.appendChild(toTop);
  window.addEventListener('scroll',()=>{
    if(window.scrollY>400){toTop.style.opacity='1';toTop.style.pointerEvents='auto';}
    else{toTop.style.opacity='0';toTop.style.pointerEvents='none';}
  });
  toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();