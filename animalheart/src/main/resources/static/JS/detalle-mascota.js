document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('submit', function (ev) {
    const form = ev.target.closest('form[data-eliminar-cliente]');
    if (!form) return;

    const nombre = form.dataset.clienteNombre || 'este cliente';
    const ok = window.confirm(`¿Eliminar a ${nombre} y sus mascotas?`);
    if (!ok) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, true);
});
