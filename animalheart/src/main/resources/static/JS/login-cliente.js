// login-cliente.js — Validación mínima del formulario de Login Cliente
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const correoEl = document.getElementById('correo');
    const correo = (correoEl?.value || '').trim();

    if (!correo.includes('@')) {
      e.preventDefault();
      alert('Por favor, introduce un correo válido.');
    }
  });
});
