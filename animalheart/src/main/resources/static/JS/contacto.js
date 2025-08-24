// contacto.js — Lógica específica de la vista "Contacto"

document.addEventListener('DOMContentLoaded', () => {
  // ====== Validación HTML5 + Bootstrap (extraída desde contacto.html) ======
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

  // ====== (Opcional) Marcar link activo en la navbar de esta página ======
  // Nota: en esta vista no hay ".menu a" (como en script.js), sino .menu-izq/.menu-der.
  // Si no quieres esta función, puedes eliminar este bloque sin afectar el formulario.
  const navLinks = document.querySelectorAll('.menu-izq a, .menu-der a');
  if (navLinks.length) {
    const currentPath = location.pathname.replace(/\/+$/, '');
    navLinks.forEach((a) => {
      a.removeAttribute('aria-current');
      // Si el navegador resolvió el href, a.pathname existe:
      const aPath = (a.pathname || '').replace(/\/+$/, '');
      if (aPath && aPath === currentPath) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }
});
