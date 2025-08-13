// main.js
document.addEventListener('DOMContentLoaded', () => {

  // ===== NAV: burger + cierre seguro =====
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('nav-menu');

  const closeMenu = () => { menu?.classList.remove('open'); burger?.setAttribute('aria-expanded','false'); };
  const toggleMenu = () => {
    if(!menu) return;
    const open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    burger?.setAttribute('aria-expanded', String(open));
  };

  burger?.addEventListener('click', toggleMenu);

  // Cierra al hacer clic en cualquier enlace del menú
  menu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  // Cierra al hacer clic fuera del menú (en móvil)
  document.addEventListener('click', (e) => {
    if(!menu) return;
    if (!menu.classList.contains('open')) return;
    const clickInside = menu.contains(e.target) || burger?.contains(e.target);
    if(!clickInside) closeMenu();
  });

  // Cierra si se ensancha la pantalla
  window.addEventListener('resize', () => {
    if(window.innerWidth > 820) closeMenu();
  });

  // ===== Helper: carrusel simple por ID (si existiera en la página) =====
  function simpleCarousel(rootId){
    const root = document.getElementById(rootId);
    if(!root) return;
    const slides = [...root.querySelectorAll('.slide')];
    const prev = root.parentElement.querySelector('.prev');
    const next = root.parentElement.querySelector('.next');
    let idx = slides.findIndex(s => s.classList.contains('active'));
    if(idx < 0) idx = 0;

    const show = (i) => {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s,k)=>s.classList.toggle('active', k===idx));
    };
    prev && prev.addEventListener('click', ()=>show(idx-1));
    next && next.addEventListener('click', ()=>show(idx+1));

    // swipe
    let startX=null;
    root.addEventListener('pointerdown', e=>{startX=e.clientX; root.setPointerCapture(e.pointerId);});
    root.addEventListener('pointerup', e=>{
      if(startX==null) return;
      const dx = e.clientX - startX;
      if(dx<-30) show(idx+1);
      else if(dx>30) show(idx-1);
      startX=null;
    });
  }

  // Inicializa si existen (según página)
  simpleCarousel('evidenceCarousel');   // evidencias.html
  // Otros carouseles que hayas agregado podrían inicializarse igual:
  // simpleCarousel('rubricCarousel');
  // simpleCarousel('promptCarousel');

});
