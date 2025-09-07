// JS específico para "Añadir Mascota" – vista del dueño

document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('fotoURLInput');
  const preview = document.getElementById('fotoPreview');
  const placeholder = document.getElementById('photoPlaceholder');

  const updatePreview = () => {
    if (!preview || !placeholder) return;
    const url = (urlInput?.value || '').trim();

    if (url) {
      preview.src = url;
      preview.style.display = 'block';
      placeholder.style.display = 'none';
    } else {
      preview.style.display = 'none';
      placeholder.style.display = 'flex';
    }
  };

  if (urlInput) {
    urlInput.addEventListener('input', updatePreview);
  }
  updatePreview();

  const clienteSelect = document.querySelector('select[name="clienteId"]');
  const clientInfo = document.getElementById('clientInfo');
  const clientName = document.getElementById('clientName');
  const clientDetails = document.getElementById('clientDetails');

  const updateClientInfo = () => {
    if (!clienteSelect || !clientInfo || !clientName || !clientDetails) return;

    if (clienteSelect.value) {
      const text = clienteSelect.options[clienteSelect.selectedIndex]?.text || '';
      const parts = text.split(' - C.C. ');
      if (parts.length === 2) {
        clientName.textContent = parts[0];
        clientDetails.textContent = 'Cédula: ' + parts[1];
        clientInfo.style.display = 'block';
        return;
      }
    }
    clientInfo.style.display = 'none';
  };

  if (clienteSelect) {
    clienteSelect.addEventListener('change', updateClientInfo);
    updateClientInfo();
  }

  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!String(field.value || '').trim()) {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert('Por favor, complete todos los campos obligatorios marcados con *.');
      }
    });
  }
});
