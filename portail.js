(() => {
  'use strict';

  // Verrou pédagogique uniquement : les fichiers GitHub Pages restent publics.
  const accessCode = 'CMAFormationSC';
  const storageKey = 'cap-coiffure-access-v1';
  const access = document.getElementById('acces');
  const portal = document.getElementById('portail');
  const input = document.getElementById('access-code');
  const error = document.getElementById('access-error');
  const catalogue = document.getElementById('catalogue');

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function renderCatalogue() {
    if (!Array.isArray(window.APPLICATIONS) || !window.APPLICATIONS.length) {
      throw new Error('Catalogue indisponible');
    }
    const fragment = document.createDocumentFragment();
    const disciplines = new Map();
    for (const app of window.APPLICATIONS) {
      if (!disciplines.has(app.discipline)) {
        const section = element('section', 'discipline');
        const heading = element('div', 'discipline-title');
        const arrow = element('img');
        arrow.src = './assets/fleche_rouge.png';
        arrow.alt = '';
        arrow.setAttribute('aria-hidden', 'true');
        heading.append(arrow, element('h2', '', app.discipline));
        const cards = element('div', 'apps');
        section.append(heading, cards);
        fragment.append(section);
        disciplines.set(app.discipline, cards);
      }
      const card = element('article', 'card');
      const link = element('a', 'button', "Lancer l'activité");
      link.href = app.lien;
      card.append(element('span', 'session', app.seance),
        element('h3', '', app.titre), element('p', '', app.description), link);
      disciplines.get(app.discipline).append(card);
    }
    catalogue.replaceChildren(fragment);
  }

  function unlock(focus) {
    try {
      renderCatalogue();
    } catch {
      error.textContent = 'Les activités ne peuvent pas être chargées. Actualise la page pour réessayer.';
      return;
    }
    access.hidden = true;
    portal.hidden = false;
    input.value = '';
    try { sessionStorage.setItem(storageKey, 'granted'); } catch { /* Accès sans stockage. */ }
    if (focus) {
      const heading = portal.querySelector('h2');
      heading.tabIndex = -1;
      heading.focus();
    }
  }

  document.getElementById('access-form').addEventListener('submit', event => {
    event.preventDefault();
    if (input.value.trim() !== accessCode) {
      error.textContent = 'Code incorrect. Vérifie le code communiqué par ton formateur.';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      input.select();
      return;
    }
    input.removeAttribute('aria-invalid');
    error.textContent = '';
    unlock(true);
  });
  input.addEventListener('input', () => {
    input.removeAttribute('aria-invalid');
    error.textContent = '';
  });
  try {
    if (sessionStorage.getItem(storageKey) === 'granted') unlock(false);
  } catch { /* Le formulaire reste utilisable si le stockage est désactivé. */ }
})();
