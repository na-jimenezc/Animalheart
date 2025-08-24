// JS para 'Registrar Nuevo Dueño' – validación y formateo de celular

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  // Validación del formulario al enviar
  form.addEventListener('submit', function (e) {
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#e74a3b';
      } else {
        field.style.borderColor = '#d1d3e2';
      }
    });

    // Validación específica para celular (solo números)
    const celularField = this.querySelector('[th\\:field="*{celular}"]');
    if (celularField && celularField.value && !/^\d+$/.test(celularField.value)) {
      isValid = false;
      celularField.style.borderColor = '#e74a3b';
      alert('El celular debe contener solo números.');
    }

    if (!isValid) {
      e.preventDefault();
      alert('Por favor, complete todos los campos obligatorios correctamente.');
    }
  });

  // Formateo automático del celular (solo dígitos)
  const celularInput = form.querySelector('[th\\:field="*{celular}"]');
  if (celularInput) {
    celularInput.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '');
    });
  }
});
