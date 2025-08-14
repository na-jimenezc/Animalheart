const links = document.querySelectorAll('.menu a');
function setActive(){
  const hash = location.hash || '#inicio';
  links.forEach(a=>a.removeAttribute('aria-current'));
  const active = Array.from(links).find(a=>a.getAttribute('href')===hash);
  if(active) active.setAttribute('aria-current','page');
}
window.addEventListener('hashchange', setActive);
setActive();


/*Para cambiar la visualización para ver la clave*/
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".boton-ver-clave");

  /*Se escucha al evento de click para todos los botones de la clave*/
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const input = boton.previousElementSibling;
      const icono = boton.querySelector("i");

      /*Se hace el cambio del ojito*/
      if (input.type === "password") {
        input.type = "text";
        icono.classList.remove("bi-eye");
        icono.classList.add("bi-eye-slash");
      } else {
        input.type = "password";
        icono.classList.remove("bi-eye-slash");
        icono.classList.add("bi-eye");
      }
    });
  });
});
