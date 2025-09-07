// index.js — Marca activo en el menú (hash y rutas)

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.menu-izq a, .menu-der a');

  function setActive() {
    const hash = location.hash || '#inicio';
    const path = location.pathname.replace(/\/+$/, '');

    links.forEach(a => a.removeAttribute('aria-current'));

    let active =
      Array.from(links).find(a => a.getAttribute('href') === hash);

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
