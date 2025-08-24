// login-admin.js — Lógica específica del login de Administrador

// Compatible con el atributo inline: onclick="togglePassword()"
function togglePassword() {
  // En inline handlers, "this" referencia al botón clicado
  const boton = this || document.querySelector('.boton-ver-clave');
  if (!boton) return;

  const input = boton.previousElementSibling;   // <input type="password"> está justo antes
  const icono = boton.querySelector('i');

  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    if (icono) {
      icono.classList.remove('bi-eye');
      icono.classList.add('bi-eye-slash');
    }
  } else {
    input.type = 'password';
    if (icono) {
      icono.classList.remove('bi-eye-slash');
      icono.classList.add('bi-eye');
    }
  }
}

// Progressive enhancement: si alguien quita el onclick inline, seguimos funcionando
document.addEventListener('DOMContentLoaded', () => {
  // Adjunta el toggle a todos los botones "ver clave"
  document.querySelectorAll('.boton-ver-clave').forEach(btn => {
    btn.addEventListener('click', togglePassword);
  });

  // Validación rápida del correo: debe contener "@"
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const correo = document.getElementById('correo');
      if (!correo || !String(correo.value).includes('@')) {
        e.preventDefault();
        alert('Por favor, introduce un correo válido.');
      }
    });
  }
});
