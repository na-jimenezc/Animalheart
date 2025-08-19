/**
 * ============================
 * 1) Marcado del enlace activo
 * ============================
 * Marca visualmente (y para accesibilidad) el enlace activo del menú,
 * comparando el hash actual de la URL (location.hash) con el href de cada link.
 * - Usa aria-current="page" para indicar la página/ sección actual.
 */

// Obtiene todos los <a> dentro del contenedor .menu
const links = document.querySelectorAll('.menu a');

function setActive(){
  // Toma el hash actual (#algo); si no hay, asume "#inicio" por defecto
  const hash = location.hash || '#inicio';

  // Limpia cualquier marca previa de "activo"
  links.forEach(a => a.removeAttribute('aria-current'));

  // Busca el enlace cuyo href coincide exactamente con el hash actual
  const active = Array.from(links).find(a => a.getAttribute('href') === hash);

  // Si lo encuentra, marca aria-current="page" (útil para lectores de pantalla y CSS)
  if (active) active.setAttribute('aria-current','page');
}

// Recalcula el activo cuando cambia el hash (navegación interna)
window.addEventListener('hashchange', setActive);

// Estado inicial al cargar
setActive();


/**
 * ===========================================
 * 2) Botón para mostrar/ocultar la contraseña
 * ===========================================
 * Al hacer clic en .boton-ver-clave:
 * - Cambia el <input type="password"> a <input type="text"> y viceversa.
 * - Alterna la clase del ícono entre "bi-eye" y "bi-eye-slash".
 *
 * Requisitos de marcado (HTML).
 */

document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los botones que controlan la visibilidad de la clave
  const botones = document.querySelectorAll(".boton-ver-clave");

  // Escucha el click de cada botón
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      // Se asume que el input está inmediatamente antes del botón dentro de .grupo-entrada
      const input = boton.previousElementSibling;
      const icono = boton.querySelector("i");

      // Si el input es de tipo password, muéstralo (text); si está visible, vuelve a password
      if (input && input.type === "password") {
        input.type = "text";
        // Cambia el ícono al de "ocultar"
        if (icono) {
          icono.classList.remove("bi-eye");
          icono.classList.add("bi-eye-slash");
        }
        // Accesibilidad: anuncia el cambio
      } else if (input) {
        input.type = "password";
        // Vuelve al ícono de "mostrar"
        if (icono) {
          icono.classList.remove("bi-eye-slash");
          icono.classList.add("bi-eye");
        }
        // Accesibilidad: anuncia el cambio
      }
    });
  });
});

// script-login.js
document.querySelector('form').addEventListener('submit', function(e) {
  const correo = document.getElementById('correo').value;
  if (!correo.includes('@')) {
    e.preventDefault();
    alert('Por favor, introduce un correo válido.');
  }
});

