const links = document.querySelectorAll('.menu a');

function setActive(){
  const hash = location.hash || '#inicio';

  links.forEach(a => a.removeAttribute('aria-current'));

  const active = Array.from(links).find(a => a.getAttribute('href') === hash);

  if (active) active.setAttribute('aria-current','page');
}

window.addEventListener('hashchange', setActive);

setActive();

document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".boton-ver-clave");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const input = boton.previousElementSibling;
      const icono = boton.querySelector("i");

      if (input && input.type === "password") {
        input.type = "text";
        if (icono) {
          icono.classList.remove("bi-eye");
          icono.classList.add("bi-eye-slash");
        }
      } else if (input) {
        input.type = "password";
        if (icono) {
          icono.classList.remove("bi-eye-slash");
          icono.classList.add("bi-eye");
        }
      }
    });
  });
});

document.querySelector('form').addEventListener('submit', function(e) {
  const correo = document.getElementById('correo').value;
  if (!correo.includes('@')) {
    e.preventDefault();
    alert('Por favor, introduce un correo válido.');
  }
});

