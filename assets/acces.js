(() => {
  'use strict';
  // Accès pédagogique côté navigateur : les supports restent publics.
  const learnerHash = '744ba8f7accff2547e37e5bef565b8e1b35001643d2cb5c785ad27647f38e04b';
  const trainerHash = '71336a46bf69eb2badb588ffbe22d14b5518b958fe10eb7a324045104c80dbc7';
  function mount({ storageKey, access, portal, input, error, onUnlock, onLogout }) {
    const sessionKey = storageKey + '-roles-v2';
    const bar = document.createElement('div');
    bar.className = 'cma-access-bar';
    const label = document.createElement('p');
    label.setAttribute('role', 'status');
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'cma-switch-access';
    button.textContent = 'Changer d’accès';
    const info = document.createElement('p');
    info.className = 'cma-trainer-notice'; info.hidden = true;
    info.textContent = 'Espace formateur : tous les supports sont accessibles. Les badges indiquent leur date et leur visibilité côté apprenant, en heure de La Réunion.';
    bar.append(label, button); portal.prepend(bar, info);
    let busy = false;
    function enter(role, focus) {
      label.textContent = role === 'formateur' ? 'Accès formateur — aperçu complet' : 'Accès apprenant';
      info.hidden = role !== 'formateur';
      try { sessionStorage.setItem(sessionKey, role); sessionStorage.removeItem(storageKey); } catch {}
      onUnlock(role, focus);
    }
    button.addEventListener('click', () => {
      try { sessionStorage.removeItem(sessionKey); sessionStorage.removeItem(storageKey); } catch {}
      onLogout(); access.hidden = false; portal.hidden = true;
      input.value = ''; error.textContent = ''; input.removeAttribute('aria-invalid'); input.focus();
    });
    document.getElementById('access-form').addEventListener('submit', async event => {
      event.preventDefault(); if (busy) return; busy = true;
      try {
        const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input.value.trim()));
        const hash = Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
        const role = hash === trainerHash ? 'formateur' : hash === learnerHash ? 'apprenant' : null;
        if (!role) {
          error.textContent = 'Code incorrect. Vérifie le code communiqué par ton formateur.';
          input.setAttribute('aria-invalid', 'true'); input.focus(); input.select(); return;
        }
        error.textContent = ''; input.removeAttribute('aria-invalid'); enter(role, true);
      } catch {
        error.textContent = 'La vérification du code est indisponible. Ouvre le portail en HTTPS dans un navigateur récent.';
      } finally { busy = false; }
    });
    input.addEventListener('input', () => { error.textContent = ''; input.removeAttribute('aria-invalid'); });
    try {
      const saved = sessionStorage.getItem(sessionKey);
      if (saved === 'apprenant' || saved === 'formateur') enter(saved, false);
      else if (sessionStorage.getItem(storageKey) === 'granted') enter('apprenant', false);
    } catch {}
  }
  function addStatus(card, app, now, role) {
    if (role !== 'formateur') return;
    const badge = document.createElement('p');
    const published = app.publication === undefined || Date.parse(app.publication) <= now;
    badge.className = 'cma-publication-status ' + (published ? 'cma-is-visible' : 'cma-is-upcoming');
    const date = app.publication === undefined ? 'Sans date différée' : new Intl.DateTimeFormat('fr-FR', {
      timeZone: 'Indian/Reunion', dateStyle: 'long', timeStyle: 'short'
    }).format(new Date(app.publication));
    badge.textContent = (published ? 'Visible aux apprenants · ' : 'À venir · ') + date;
    card.prepend(badge);
  }
  window.CMAAccess = { mount, addStatus };
})();
