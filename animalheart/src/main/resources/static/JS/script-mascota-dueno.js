document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        const nombreMascota = document.getElementById('nombre').value.trim();
        const nombreDueno = document.getElementById('nombreDueno').value.trim();

        if (nombreMascota === '' || nombreDueno === '') {
            event.preventDefault();
            alert('Por favor, completa el nombre de la mascota y del dueño.');
        }
    });
});
