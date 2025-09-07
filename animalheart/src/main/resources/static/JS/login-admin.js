// login-admin.js — Lógica específica del login de Administrador

function togglePassword() {
  const boton = this || document.querySelector('.boton-ver-clave');
  if (!boton) return;

  const input = boton.previousElementSibling;
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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.boton-ver-clave').forEach(btn => {
    btn.addEventListener('click', togglePassword);
  });

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
