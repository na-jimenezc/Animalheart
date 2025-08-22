const links = document.querySelectorAll('.menu a');

function setActive() {
  const hash = location.hash || '#inicio';

  links.forEach((a) => a.removeAttribute('aria-current'));

  const active = Array.from(links).find(
    (a) => a.getAttribute('href') === hash
  );

  if (active) {
    active.setAttribute('aria-current', 'page');
  }
}

window.addEventListener('hashchange', setActive);

setActive();
