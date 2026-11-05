window.LESSON = {
  "code": "A1S5M1",
  "title": "Équations du premier degré",
  "subtitle": "Résoudre ax + b = c",
  "kind": "equations",
  "duration": "1 heure",
  "objectives": [
    "Traduire une situation du salon par une équation.",
    "Isoler x en effectuant la même opération dans les deux membres.",
    "Vérifier la solution et rédiger une conclusion professionnelle."
  ],
  "prerequisites": "Équations ax = b, opérations et calcul mental.",
  "discovery": [
    {
      "title": "Bilan du samedi à L’Atelier Kréol",
      "context": "À Sainte-Clotilde, Sarah réalise des forfaits Brushing & Soin Protecteur à 22 € chacun. Un forfait de matériel de 14 € est ajouté une seule fois pour la journée. Total encaissé : 190 €. Combien de brushings a-t-elle réalisés ?",
      "questions": [
        {
          "label": "1 · Que représente x ?",
          "type": "choice",
          "options": [
            "Le prix d’un brushing",
            "Le nombre de brushings",
            "Le montant du forfait fixe"
          ],
          "answer": 1,
          "points": 0
        },
        {
          "label": "2 · Quel est le montant variable ?",
          "type": "choice",
          "options": [
            "22 + x",
            "22x",
            "14x"
          ],
          "answer": 1,
          "points": 0
        },
        {
          "label": "3 · Quelle équation modélise la recette ?",
          "type": "choice",
          "options": [
            "22x + 14 = 190",
            "22x − 14 = 190",
            "14x + 22 = 190"
          ],
          "answer": 0,
          "points": 0
        },
        {
          "label": "4a · Après soustraction du forfait : 22x =",
          "type": "number",
          "answer": 176,
          "unit": "€",
          "points": 0
        },
        {
          "label": "4b · Après division par 22 : x =",
          "type": "number",
          "answer": 8,
          "unit": "brushings",
          "points": 0
        },
        {
          "label": "5 · Vérifier : 22 × 8 + 14 =",
          "type": "number",
          "answer": 190,
          "unit": "€",
          "points": 0
        },
        {
          "label": "6 · Rédiger la conclusion à la tutrice.",
          "type": "manual",
          "answer": "Sarah a réalisé 8 forfaits Brushing & Soin Protecteur, car 22 × 8 + 14 = 190 €.",
          "points": 0
        }
      ],
      "correction": "22x + 14 = 190 ; on soustrait 14 aux deux membres : 22x = 176 ; on divise par 22 : x = 8. Vérification : 22 × 8 + 14 = 190 €. Le forfait de 14 € est unique, pas ajouté par cliente."
    }
  ],
  "course": [
    [
      "Une équation, une inconnue",
      "Une équation ax + b = c, avec a ≠ 0, comporte le terme variable ax et deux constantes b et c. Sa solution est la valeur de x qui rend les deux membres égaux."
    ],
    [
      "Les deux étapes",
      "1. Soustraire b aux deux membres : ax = c − b. Si b est négatif, soustraire b revient à ajouter sa valeur opposée.\n2. Diviser les deux membres par a : x = (c − b) ÷ a. On ne divise jamais par zéro."
    ],
    [
      "Exemple résolu",
      "4x + 15 = 47 → 4x = 47 − 15 = 32 → x = 32 ÷ 4 = 8."
    ],
    [
      "Vérification",
      "Remplacer x dans le membre de départ : 4 × 8 + 15 = 47. Pour un nombre de prestations, vérifier aussi que le résultat est un entier positif ou nul et qu’il convient au contexte."
    ]
  ],
  "levels": [
    [
      {
        "title": "1.1 · Résolution guidée",
        "context": "Résoudre 3x + 8 = 29.",
        "questions": [
          {
            "label": "3x = 29 − 8 =",
            "type": "number",
            "answer": 21,
            "unit": "",
            "points": 0
          },
          {
            "label": "x = 21 ÷ 3 =",
            "type": "number",
            "answer": 7,
            "unit": "",
            "points": 0
          },
          {
            "label": "3 × 7 + 8 =",
            "type": "number",
            "answer": 29,
            "unit": "",
            "points": 0
          }
        ],
        "correction": "3x = 21 ; x = 7 ; 3 × 7 + 8 = 29."
      },
      {
        "title": "1.2 · Quatre équations",
        "context": "Résoudre dans les réels.",
        "questions": [
          {
            "label": "a · 5x + 7 = 37 : x =",
            "type": "number",
            "answer": 6,
            "unit": "",
            "points": 0
          },
          {
            "label": "b · 2x + 12 = 30 : x =",
            "type": "number",
            "answer": 9,
            "unit": "",
            "points": 0
          },
          {
            "label": "c · 4x − 6 = 26 : x =",
            "type": "number",
            "answer": 8,
            "unit": "",
            "points": 0
          },
          {
            "label": "d · 6x − 9 = 27 : x =",
            "type": "number",
            "answer": 6,
            "unit": "",
            "points": 0
          }
        ],
        "correction": "a) 5x = 30 → x = 6. b) 2x = 18 → x = 9. c) 4x = 32 → x = 8. d) 6x = 36 → x = 6."
      },
      {
        "title": "1.3 · Brushing et soin express",
        "context": "À Saint-Denis, chaque brushing coûte 20 €. Le forfait unique d’hygiène vaut 10 €. Total : 110 €.",
        "questions": [
          {
            "label": "Écrire l’équation.",
            "type": "manual",
            "answer": "20x + 10 = 110.",
            "points": 0
          },
          {
            "label": "Nombre de brushings",
            "type": "number",
            "answer": 5,
            "unit": "",
            "points": 0
          }
        ],
        "correction": "20x + 10 = 110 → 20x = 100 → x = 5 brushings."
      },
      {
        "title": "1.4 · Shampooings et corbeille cadeau",
        "context": "Un flacon coûte 15 €. Une seule corbeille coûte 5 €. La cliente règle 65 €.",
        "questions": [
          {
            "label": "Écrire l’équation.",
            "type": "manual",
            "answer": "15x + 5 = 65.",
            "points": 0
          },
          {
            "label": "Nombre de flacons",
            "type": "number",
            "answer": 4,
            "unit": "",
            "points": 0
          }
        ],
        "correction": "15x + 5 = 65 → 15x = 60 → x = 4 flacons."
      },
      {
        "title": "1.5 · Tester une solution",
        "context": "On considère 8x + 14 = 78.",
        "questions": [
          {
            "label": "Pour x = 7 : 8 × 7 + 14 =",
            "type": "number",
            "answer": 70,
            "unit": "",
            "points": 0
          },
          {
            "label": "x = 7 est-il solution ?",
            "type": "choice",
            "options": [
              "Oui",
              "Non"
            ],
            "answer": 1,
            "points": 0
          },
          {
            "label": "Pour x = 8 : 8 × 8 + 14 =",
            "type": "number",
            "answer": 78,
            "unit": "",
            "points": 0
          },
          {
            "label": "La solution est x =",
            "type": "number",
            "answer": 8,
            "unit": "",
            "points": 0
          }
        ],
        "correction": "Avec x = 7, on obtient 70, donc pas 78. Avec x = 8, on obtient 78 : la solution est 8."
      }
    ],
    [
      {
        "title": "2.1 · Coiffeur à domicile",
        "context": "Déplacement fixe de 18 € dans les Hauts de Sainte-Marie et 24 € par coupe-brushing. Total familial : 114 €.",
        "questions": [
          {
            "label": "Écrire l’équation.",
            "type": "manual",
            "answer": "24x + 18 = 114.",
            "points": 0
          },
          {
            "label": "Nombre de coupes",
            "type": "number",
            "answer": 4,
            "unit": "",
            "points": 0
          },
          {
            "label": "Vérification : 24 × 4 + 18 =",
            "type": "number",
            "answer": 114,
            "unit": "€",
            "points": 0
          }
        ],
        "correction": "24x = 96 ; x = 4. Vérification : 96 + 18 = 114 €."
      },
      {
        "title": "2.2 · Commande de lisseurs",
        "context": "Un lisseur vaut 45 €. La livraison coûte 15 €. Facture totale : 285 €.",
        "questions": [
          {
            "label": "Écrire l’équation.",
            "type": "manual",
            "answer": "45x + 15 = 285.",
            "points": 0
          },
          {
            "label": "Nombre de lisseurs",
            "type": "number",
            "answer": 6,
            "unit": "",
            "points": 0
          }
        ],
        "correction": "45x + 15 = 285 → 45x = 270 → x = 6 lisseurs."
      },
      {
        "title": "2.3 · Supplément technique",
        "context": "Modèle de facturation : base de 35 €, puis 8,50 € par dose supplémentaire. Total : 69 €. Cet exercice calcule une facturation, pas un protocole chimique.",
        "questions": [
          {
            "label": "Écrire l’équation.",
            "type": "manual",
            "answer": "8,5x + 35 = 69.",
            "points": 0
          },
          {
            "label": "Nombre de doses supplémentaires",
            "type": "number",
            "answer": 4,
            "unit": "",
            "points": 0
          }
        ],
        "correction": "8,5x = 34 ; x = 34 ÷ 8,5 = 4."
      },
      {
        "title": "2.4 · Coefficients décimaux",
        "context": "Résoudre dans les réels.",
        "questions": [
          {
            "label": "a · 3,5x + 12 = 47 : x =",
            "type": "number",
            "answer": 10,
            "unit": "",
            "points": 0
          },
          {
            "label": "b · 2,4x − 5 = 19 : x =",
            "type": "number",
            "answer": 10,
            "unit": "",
            "points": 0
          },
          {
            "label": "c · 1,5x + 4,5 = 22,5 : x =",
            "type": "number",
            "answer": 12,
            "unit": "",
            "points": 0
          }
        ],
        "correction": "a) 35 ÷ 3,5 = 10. b) 24 ÷ 2,4 = 10. c) 18 ÷ 1,5 = 12."
      }
    ],
    [
      {
        "title": "3.1 · Journée spéciale mariage",
        "context": "À Saint-Gilles : tarif 55 € par cliente, consommables 10 € par cliente, installation fixe 120 €. Bénéfice final : 330 €.",
        "questions": [
          {
            "label": "Marge par cliente : 55 − 10 =",
            "type": "number",
            "answer": 45,
            "unit": "€",
            "points": 0
          },
          {
            "label": "Écrire l’équation du bénéfice.",
            "type": "manual",
            "answer": "45x − 120 = 330.",
            "points": 0
          },
          {
            "label": "Nombre de clientes",
            "type": "number",
            "answer": 10,
            "unit": "",
            "points": 0
          },
          {
            "label": "Bénéfice pour 12 clientes",
            "type": "number",
            "answer": 420,
            "unit": "€",
            "points": 0
          }
        ],
        "correction": "45x − 120 = 330 → 45x = 450 → x = 10. Pour 12 clientes : 45 × 12 − 120 = 420 €."
      },
      {
        "title": "3.2 · Comparer deux formules",
        "context": "Modèles mathématiques fictifs : R₁(x) = 15x + 350 et R₂(x) = 20x + 200. Ces formules ne décrivent pas les règles légales de rémunération en alternance.",
        "questions": [
          {
            "label": "Écrire l’égalité des rémunérations.",
            "type": "manual",
            "answer": "20x + 200 = 15x + 350.",
            "points": 0
          },
          {
            "label": "Soustraire 15x aux deux membres.",
            "type": "manual",
            "answer": "5x + 200 = 350.",
            "points": 0
          },
          {
            "label": "Nombre de prestations à l’équilibre",
            "type": "number",
            "answer": 30,
            "unit": "",
            "points": 0
          },
          {
            "label": "R₁(35)",
            "type": "number",
            "answer": 875,
            "unit": "€",
            "points": 0
          },
          {
            "label": "R₂(35)",
            "type": "number",
            "answer": 900,
            "unit": "€",
            "points": 0
          },
          {
            "label": "À 35 prestations, quelle formule est la plus élevée ?",
            "type": "choice",
            "options": [
              "Formule 1",
              "Formule 2"
            ],
            "answer": 1,
            "points": 0
          },
          {
            "label": "Écart entre les deux formules",
            "type": "number",
            "answer": 25,
            "unit": "€",
            "points": 0
          }
        ],
        "correction": "5x = 150 → x = 30. À 35 prestations : 875 € et 900 € ; formule 2 supérieure de 25 €."
      },
      {
        "title": "3.3 · Tableur et algorithme",
        "context": "A2 contient a ; B2 contient b ; C2 contient c ; D2 doit calculer x.",
        "questions": [
          {
            "label": "Écrire la formule à placer en D2.",
            "type": "manual",
            "answer": "=(C2-B2)/A2 ; cette formule suppose A2 non nul.",
            "points": 0
          },
          {
            "label": "Écrire un algorithme qui contrôle a avant de diviser.",
            "type": "manual",
            "answer": "Saisir a, b, c. Si a = 0, signaler que le solveur du premier degré ne s’applique pas. Sinon calculer x ← (c − b) / a puis afficher x.",
            "points": 0
          }
        ],
        "correction": "Contrôler a ≠ 0 avant le calcul. La formule du dossier s’applique ensuite : =(C2-B2)/A2."
      }
    ]
  ],
  "evaluation": {
    "title": "Évaluation · Suivi d’activité",
    "context": "15 à 20 minutes. Forfait Coupe & Brushing : 24 € par prestation. Forfait fixe de la journée : 16 €. Recette totale : 184 €. Un brushing dure en moyenne 45 minutes.",
    "questions": [
      {
        "label": "1 · L’inconnue x représente…",
        "type": "choice",
        "options": [
          "Le nombre de prestations",
          "Le prix unitaire",
          "La durée d’un brushing"
        ],
        "answer": 0,
        "points": 1
      },
      {
        "label": "2 · L’équation du bilan est…",
        "type": "choice",
        "options": [
          "24x − 16 = 184",
          "24x + 16 = 184",
          "16x + 24 = 184"
        ],
        "answer": 1,
        "points": 2
      },
      {
        "label": "3a · Après soustraction : 24x =",
        "type": "number",
        "answer": 168,
        "unit": "",
        "points": 1
      },
      {
        "label": "3b · Après division : x =",
        "type": "number",
        "answer": 7,
        "unit": "",
        "points": 1
      },
      {
        "label": "4 · Vérification : 24 × 7 + 16 =",
        "type": "number",
        "answer": 184,
        "unit": "€",
        "points": 1
      },
      {
        "label": "5a · Rédiger la conclusion professionnelle.",
        "type": "manual",
        "answer": "L’apprenti a réalisé 7 prestations Coupe & Brushing. Vérification : 24 × 7 + 16 = 184 €.",
        "points": 1
      },
      {
        "label": "5b · Temps total en minutes",
        "type": "number",
        "answer": 315,
        "unit": "min",
        "points": 0.5
      },
      {
        "label": "5c · Soit combien d’heures entières ?",
        "type": "number",
        "answer": 5,
        "unit": "h",
        "points": 0.25
      },
      {
        "label": "5d · Et combien de minutes restantes ?",
        "type": "number",
        "answer": 15,
        "unit": "min",
        "points": 0.25
      }
    ],
    "correction": "24x + 16 = 184 → 24x = 168 → x = 7. Temps : 7 × 45 = 315 min = 5 h 15 min. Barème total : 8 points, dont 1 point de conclusion à apprécier par le formateur."
  },
  "notes": [
    "Tous les exercices des deux dossiers sont repris dans leur séance respective. Les réponses ouvertes restent à apprécier par le formateur ; le moteur ne prétend pas corriger automatiquement une rédaction.",
    "La situation découverte compte le forfait de 14 € une seule fois dans la recette. Les formules de rémunération du niveau 3 sont des modèles fictifs.",
    "L’algorithme et le simulateur contrôlent a ≠ 0. Aucun nom ni réponse individuelle n’est envoyé ou stocké durablement."
  ]
};
