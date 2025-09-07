// contacto.js — Lógica específica de la vista "Contacto"

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-contacto');
  if (form) {
    form.addEventListener(
      'submit',
      (ev) => {
        if (!form.checkValidity()) {
          ev.preventDefault();
          ev.stopPropagation();
          form.classList.add('was-validated');
        }
      },
      false
    );
  }

  const navLinks = document.querySelectorAll('.menu-izq a, .menu-der a');
  if (navLinks.length) {
    const currentPath = location.pathname.replace(/\/+$/, '');
    navLinks.forEach((a) => {
      a.removeAttribute('aria-current');
      const aPath = (a.pathname || '').replace(/\/+$/, '');
      if (aPath && aPath === currentPath) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }
});
