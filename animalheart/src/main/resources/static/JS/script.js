// Lógica mínima para resaltar el enlace activo del menú según el hash de la URL.
// Accesibilidad: se usa el atributo aria-current="page" para que lectores de pantalla
// y estilos identifiquen la sección actual.

// Selecciona todos los enlaces del menú superior
const links = document.querySelectorAll('.menu a');

// Función que marca el enlace activo comparando su href con location.hash
function setActive(){
  // Si no hay hash, se asume #inicio por defecto
  const hash = location.hash || '#inicio';

  // Limpia cualquier aria-current previo en todos los enlaces
  links.forEach(a => a.removeAttribute('aria-current'));

  // Busca el enlace cuyo href coincide exactamente con el hash actual
  const active = Array.from(links).find(a => a.getAttribute('href') === hash);

  // Si existe, se marca como la página activa
  if (active) active.setAttribute('aria-current','page');
}

// Actualiza el estado cuando cambia el hash.
window.addEventListener('hashchange', setActive);

// Estado inicial al cargar la página
setActive();