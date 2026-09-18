# Portail CAP Métiers de la Coiffure

## Ajouter une application

1. Déposer le dossier de l’application à la racine du dépôt, avec son `index.html`.
2. Dans `applications.js`, copier une fiche, séparée de la précédente par une virgule, et modifier ses champs :

```js
{
  "code": "A1S5M1",
  "discipline": "Mathématiques",
  "seance": "ANNÉE 1 • S5 M1",
  "titre": "Titre de l’activité",
  "description": "Description courte de l’activité.",
  "lien": "./A1S5M1/"
}
```

3. Enregistrer les modifications dans GitHub. Les cartes sont générées automatiquement : aucune modification de `index.html` n’est nécessaire.

Respecter les majuscules/minuscules des noms de dossiers. Utiliser exactement `Mathématiques` ou `Physique-Chimie` pour conserver les rubriques actuelles. Une nouvelle discipline crée automatiquement une rubrique. L’ordre des fiches définit l’ordre des cartes et la première apparition d’une discipline définit l’ordre des rubriques.

## Accès apprenants

Code partagé : `CMAFormationSC`. Aucun compte ni donnée personnelle n’est demandé. L’accès est mémorisé dans la session de l’onglet, y compris lors du retour d’une activité ou d’une actualisation. Si le navigateur refuse le stockage, le code fonctionne quand même, mais doit être saisi à nouveau lors du rechargement du portail.

Ce verrou pédagogique ne sécurise pas les fichiers publics de GitHub Pages : le code est visible dans `portail.js` et les applications restent accessibles par leur adresse directe. Pour changer le code, modifier `accessCode` et changer la version de `storageKey` dans `portail.js`.

Les fichiers des applications et les assets sont indépendants du catalogue ; ne pas les déplacer.
