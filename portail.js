(() => {
  'use strict';

  // Verrou pédagogique uniquement : les fichiers GitHub Pages restent publics.
  let accessRole = 'apprenant';
  let unlocked = false;
  const storageKey = 'cap-coiffure-access-v1';
  const access = document.getElementById('acces');
  const portal = document.getElementById('portail');
  const input = document.getElementById('access-code');
  const error = document.getElementById('access-error');
  const catalogue = document.getElementById('catalogue');


  // Masquage des cartes uniquement, selon l'horloge du navigateur.
  function isPublished(app, now) {
    if (app.formateurSeulement === true) return false;
    return app.publication === undefined || Date.parse(app.publication) <= now;
  }
  let publicationTimer;
  function schedulePublication(apps, refresh) {
    clearTimeout(publicationTimer);
    const now = Date.now();
    const upcoming = apps.map(app => Date.parse(app.publication)).filter(date => date > now);
    if (upcoming.length) {
      publicationTimer = setTimeout(refresh, Math.min(Math.min(...upcoming) - now, 2147483647));
    }
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function renderCatalogue() {
    if (!unlocked) return;
    if (!Array.isArray(window.APPLICATIONS) || !window.APPLICATIONS.length) {
      throw new Error('Catalogue indisponible');
    }
    const desired = { '#mathematiques': 'Mathématiques', '#physique-chimie': 'Physique-Chimie' }[location.hash];
    document.getElementById('matieres').hidden = Boolean(desired);
    document.getElementById('discipline-panel').hidden = !desired;
    if (!desired) {
      catalogue.replaceChildren();
      schedulePublication(window.APPLICATIONS, renderCatalogue);
      return;
    }
    const now = Date.now();
    const fragment = document.createDocumentFragment();
    const disciplines = new Map();
    for (const app of window.APPLICATIONS) {
      if (app.discipline !== desired) continue;
      if (accessRole !== 'formateur' && !isPublished(app, now)) continue;
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
      CMAAccess.addStatus(card, app, now, accessRole);
      disciplines.get(app.discipline).append(card);
    }
    catalogue.replaceChildren(fragment);
    if (!disciplines.size) {
      const empty = element('section', 'cma-no-activities');
      const title = element('h2', '', desired); title.tabIndex = -1;
      empty.append(title, element('p', '', 'Les prochaines activités apparaîtront ici à leur date de publication.'));
      catalogue.append(empty);
    }
    schedulePublication(window.APPLICATIONS, renderCatalogue);
  }

  function unlock(focus) {
    unlocked = true;
    try {
      renderCatalogue();
    } catch {
      unlocked = false;
      error.textContent = 'Les activités ne peuvent pas être chargées. Actualise la page pour réessayer.';
      return;
    }
    access.hidden = true;
    portal.hidden = false;
    input.value = '';
    if (focus) {
      const heading = document.getElementById('matieres').hidden ? catalogue.querySelector('h2') : document.getElementById('welcome-title');
      heading.tabIndex = -1;
      heading.focus();
    }
  }

  document.querySelectorAll('[data-discipline]').forEach(button => button.addEventListener('click', () => {
    location.hash = button.dataset.discipline === 'Mathématiques' ? 'mathematiques' : 'physique-chimie';
  }));
  document.getElementById('retour-matieres').addEventListener('click', () => { location.hash = 'matieres'; });
  window.addEventListener('hashchange', () => {
    renderCatalogue();
    if (unlocked) {
      const heading = document.getElementById('matieres').hidden ? catalogue.querySelector('h2') : document.getElementById('welcome-title');
      if (heading) { heading.tabIndex = -1; heading.focus(); }
    }
  });
  window.addEventListener('pageshow', renderCatalogue);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) renderCatalogue(); });

  CMAAccess.mount({ storageKey, access, portal, input, error,
    onUnlock(role, focus) { accessRole = role; unlock(focus); },
    onLogout() {
      accessRole = 'apprenant';
      unlocked = false;
      clearTimeout(publicationTimer); catalogue.replaceChildren();
    }
  });
})();
