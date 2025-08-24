// login-veterinario.js — Mostrar/ocultar contraseña (compat. con onclick inline)

function togglePassword() {
  // En inline handlers, "this" es el botón clicado
  const boton = this || document.querySelector('.boton-ver-clave');
  if (!boton) return;

  const input = boton.previousElementSibling; // el <input> está justo antes
  const icono = boton.querySelector('i');

  if (!input) return;

  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';

  if (icono) {
    icono.classList.toggle('bi-eye', !isHidden);
    icono.classList.toggle('bi-eye-slash', isHidden);
  }
}

// Progressive enhancement: si quitas el onclick inline, seguirá funcionando.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.boton-ver-clave').forEach(btn => {
    btn.addEventListener('click', togglePassword);
  });
});
