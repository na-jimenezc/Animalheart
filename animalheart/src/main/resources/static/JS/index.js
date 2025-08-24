// index.js — Marca activo en el menú (hash y rutas)

document.addEventListener('DOMContentLoaded', () => {
  // En esta página los menús son .menu-izq y .menu-der (no existe .menu)
  const links = document.querySelectorAll('.menu-izq a, .menu-der a');

  function setActive() {
    // Soporta hash (#inicio) y rutas (/contacto)
    const hash = location.hash || '#inicio';
    const path = location.pathname.replace(/\/+$/, '');

    links.forEach(a => a.removeAttribute('aria-current'));

    // 1) Intento por hash (para enlaces internos como #inicio, #servicios)
    let active =
      Array.from(links).find(a => a.getAttribute('href') === hash);

    // 2) Si no hay hash activo, intento por pathname (para /contacto, /login-admin, etc.)
    if (!active) {
      active = Array.from(links).find(a => {
        const aPath = (a.pathname || '').replace(/\/+$/, '');
        return aPath && aPath === path;
      });
    }

    if (active) active.setAttribute('aria-current', 'page');
  }

  window.addEventListener('hashchange', setActive);
  setActive();
});
