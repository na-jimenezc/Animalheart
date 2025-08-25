// mascotas.js — Manejo de errores de imágenes en la vista "Mascotas"

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    // Evita bucles si ya cayó en la imagen por defecto
    const setFallback = function () {
      if (!this.src.includes('/IMAGES/default-pet.jpg')) {
        this.src = '/IMAGES/default-pet.jpg';
        this.alt = 'Imagen no disponible';
      }
    };

    // Si ya tiene atributo onerror en el HTML, lo respetamos y además aseguramos alt
    if (img.getAttribute('onerror')) {
      img.addEventListener('error', setFallback, { once: true });
    } else {
      img.onerror = setFallback;
    }
  });
});

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.js-confirm').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const msg = btn.dataset.confirm || '¿Seguro?';
      if(!confirm(msg)) e.preventDefault();
    });
  });
});

