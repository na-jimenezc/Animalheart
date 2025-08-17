/**
 * Marca visualmente (y para lectores de pantalla) el enlace activo del menú,
 * comparando el hash actual de la URL (location.hash) con el href de cada link.
 *
 * Accesibilidad:
 * - Se usa `aria-current="page"` para que tecnologías de asistencia
 *   y estilos identifiquen la sección activa.
 *
 * Supuestos:
 * - Los enlaces del menú tienen la clase `.menu a` y sus `href` son hashes
 *   como "#inicio", "#servicios", "#contacto".
 * - Si la URL no trae hash, se asume "#inicio" por defecto.
 */

// 1) Selección de todos los enlaces del menú superior.
const links = document.querySelectorAll('.menu a');

/**
 * setActive()
 * ----------
 * Establece el estado "activo" buscando el <a> cuyo `href`
 * coincide exactamente con el hash actual de la URL.
 * - Limpia cualquier `aria-current` previo.
 * - Si encuentra el link correspondiente, le agrega `aria-current="page"`.
 */
function setActive() {
  // 2) Obtiene el hash actual o usa "#inicio" si no hay hash en la URL.
  const hash = location.hash || '#inicio';

  // 3) Limpia el atributo aria-current en todos los enlaces, por si ya estaba marcado.
  links.forEach((a) => a.removeAttribute('aria-current'));

  // 4) Busca el enlace cuyo href coincide exactamente con el hash actual.
  //    Array.from(...) porque NodeList no implementa find() en todos los navegadores antiguos.
  const active = Array.from(links).find(
    (a) => a.getAttribute('href') === hash
  );

  // 5) Si existe, marca el enlace como "página actual" para accesibilidad y estilos.
  if (active) {
    active.setAttribute('aria-current', 'page');
  }
}

/**
 * 6) Reacciona a cambios en la parte de hash de la URL:
 *    cuando el usuario navega entre secciones,
 *    esta función volverá a marcar el enlace correspondiente.
 */
window.addEventListener('hashchange', setActive);

// 7) Estado inicial: al cargar la página, marca el enlace que corresponda.
setActive();
