// ===== Manejo de errores de imágenes =====
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    const setFallback = function () {
      if (!this.src.includes('/IMAGES/default-pet.jpg')) {
        this.src = '/IMAGES/default-pet.jpg';
        this.alt = 'Imagen no disponible';
      }
    };
    if (img.getAttribute('onerror')) {
      img.addEventListener('error', setFallback, { once: true });
    } else {
      img.onerror = setFallback;
    }
  });
});

// ===== Confirmación en botones .js-confirm =====
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.js-confirm').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const msg = btn.dataset.confirm || '¿Seguro?';
      if(!confirm(msg)) e.preventDefault();
    });
  });
});

// ===== Highlight del botón "Registrar Mascota" =====
(function(){
  const byText = (root, text) => {
    const walker = document.createTreeWalker(root || document, NodeFilter.SHOW_ELEMENT);
    const t = text.toLowerCase();
    while(walker.nextNode()){
      const el = walker.currentNode;
      if(el.tagName === 'A' && el.textContent.trim().toLowerCase().includes(t)){
        return el;
      }
    }
    return null;
  };

  function enhanceRegistrar(){
    const btn = byText(document, 'Registrar Mascota') || byText(document, 'Agregar mascota');
    if(!btn) return;

    // Clase highlight
    btn.classList.add('cta-registrar');
    btn.setAttribute('aria-describedby','coach-registrar');

    // Coach-mark (solo primera vez)
    const k = 'ah_seen_registrar_coach';
    if(!localStorage.getItem(k)){
      const tip = document.createElement('div');
      tip.className = 'coachmark'; tip.id = 'coach-registrar';
      tip.innerHTML = '¡Nuevo! Registra aquí a tu paciente <button data-close aria-label="Cerrar">✕</button>';
      btn.style.position = 'relative';
      btn.appendChild(tip);
      tip.querySelector('[data-close]').addEventListener('click', ()=>{
        tip.remove(); localStorage.setItem(k,'1');
      });
      setTimeout(()=>{ if(document.body.contains(tip)){ tip.remove(); localStorage.setItem(k,'1'); } }, 6000);
    }

    // FAB móvil
    const href = btn.getAttribute('href') || '#';
    const fab = document.createElement('a');
    fab.href = href;
    fab.className = 'fab-registrar';
    fab.setAttribute('aria-label','Registrar Mascota');
    fab.innerHTML = '<span aria-hidden="true">＋</span>';
    document.body.appendChild(fab);

    // Spotlight inicial
    btn.scrollIntoView({behavior:'smooth', block:'center'});
    btn.animate?.(
      [{ filter:'brightness(1)' }, { filter:'brightness(1.2)' }, { filter:'brightness(1)' }],
      { duration:900, easing:'ease-in-out' }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceRegistrar);
  } else { enhanceRegistrar(); }
})();
