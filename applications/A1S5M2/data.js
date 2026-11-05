window.LESSON = {
  "code": "A1S5M2",
  "title": "Longueurs et périmètres",
  "subtitle": "Mesurer, convertir et commander",
  "kind": "geometrie",
  "duration": "1 heure",
  "objectives": [
    "Calculer un périmètre en utilisant une seule unité.",
    "Convertir des longueurs entre m, cm et mm.",
    "Estimer une commande et distinguer longueur totale et découpe réelle."
  ],
  "prerequisites": "Rectangle, carré et cercle ; calcul numérique et conversions.",
  "discovery": [
    {
      "title": "Réaménager l’espace coiffage",
      "context": "L’Atelier Kréol au Chaudron équipe un miroir rectangulaire de 2,40 m × 1,20 m et un miroir circulaire de diamètre 80 cm. Baguettes de 2,50 m pour le rectangle. Pour cet exercice, le ruban LED du cercle est vendu en rouleaux de 3 m.",
      "questions": [
        {
          "label": "1 · Relever les dimensions et les unités.",
          "type": "manual",
          "answer": "Rectangle : 2,40 m et 1,20 m. Cercle : D = 80 cm, donc R = 40 cm.",
          "points": 0
        },
        {
          "label": "2 · Périmètre du rectangle",
          "type": "number",
          "answer": 7.2,
          "unit": "m",
          "points": 0
        },
        {
          "label": "3 · Diamètre du cercle : 80 cm =",
          "type": "number",
          "answer": 0.8,
          "unit": "m",
          "points": 0
        },
        {
          "label": "4 · Contour du cercle avec π ≈ 3,1416, arrondi au centième",
          "type": "number",
          "answer": 2.51,
          "unit": "m",
          "points": 0,
          "round": 2
        },
        {
          "label": "5 · Nombre minimal de barres de 2,50 m pour le rectangle",
          "type": "number",
          "answer": 3,
          "unit": "barres",
          "points": 0
        },
        {
          "label": "6 · Rédiger la commande.",
          "type": "manual",
          "answer": "3 barres de 2,50 m, soit 7,50 m achetés pour 7,20 m utiles ; 1 rouleau LED de 3 m pour le cercle de contour environ 2,51 m.",
          "points": 0
        }
      ],
      "correction": "Rectangle : 2 × (2,40 + 1,20) = 7,20 m. Cercle : 3,1416 × 0,80 = 2,51328 m, soit 2,51 m au centième. Trois barres suffisent hors pertes de coupe : deux barres donnent chacune un côté de 2,40 m et la troisième deux côtés de 1,20 m. Un rouleau LED de 3 m couvre le cercle."
    }
  ],
  "course": [
    [
      "Le contour extérieur",
      "Le périmètre est la longueur du contour d’une figure fermée. Les séparations intérieures ne comptent pas. Il ne faut pas confondre périmètre (m) et aire (m²)."
    ],
    [
      "Convertir avant de calculer",
      "1 m = 100 cm = 1 000 mm ; 1 cm = 10 mm. De cm vers m : diviser par 100. De mm vers m : diviser par 1 000. Toutes les dimensions d’une figure doivent être dans la même unité."
    ],
    [
      "Formules utiles",
      "Rectangle : P = 2(L + l). Carré : P = 4c. Triangle : P = a + b + c. Cercle : P = πD = 2πR, avec D = 2R. Un demi-cercle fournit un arc de longueur πD ÷ 2, sans compter son diamètre si celui-ci est intérieur."
    ],
    [
      "Figures composées",
      "Miroir à arche : largeur + 2 hauteurs droites + π × diamètre ÷ 2. Stade : 2 longueurs droites + π × largeur. Les diamètres intérieurs des demi-cercles sont exclus."
    ],
    [
      "Commander avec prudence",
      "Un quotient longueur totale ÷ longueur d’une barre, arrondi à l’entier supérieur, donne un besoin théorique. Pour des morceaux rigides sans raccord, vérifier ensuite le débit réel. Les exercices précisent quand raccords et cintrage sont autorisés et quand les pertes de coupe sont négligées."
    ]
  ],
  "levels": [
    [
      {
        "title": "1.1 · Conversions",
        "context": "Convertir en indiquant le nombre dans l’unité demandée.",
        "questions": [
          {
            "label": "a · 1,80 m =",
            "type": "number",
            "answer": 180,
            "unit": "cm",
            "points": 0
          },
          {
            "label": "b · 75 cm =",
            "type": "number",
            "answer": 0.75,
            "unit": "m",
            "points": 0
          },
          {
            "label": "c · 250 mm =",
            "type": "number",
            "answer": 25,
            "unit": "cm",
            "points": 0
          },
          {
            "label": "d · 0,65 m =",
            "type": "number",
            "answer": 650,
            "unit": "mm",
            "points": 0
          },
          {
            "label": "e · 42 cm =",
            "type": "number",
            "answer": 420,
            "unit": "mm",
            "points": 0
          }
        ],
        "correction": "a) 180 cm ; b) 0,75 m ; c) 25 cm ; d) 650 mm ; e) 420 mm."
      },
      {
        "title": "1.2 · Trois miroirs rectangulaires",
        "context": "Calculer chaque périmètre dans l’unité demandée. Toujours convertir les dimensions avant de les additionner.",
        "questions": [
          {
            "label": "a · L = 120 cm ; l = 80 cm : P =",
            "type": "number",
            "answer": 400,
            "unit": "cm",
            "points": 0
          },
          {
            "label": "b · L = 1,90 m ; l = 0,60 m : P =",
            "type": "number",
            "answer": 5,
            "unit": "m",
            "points": 0
          },
          {
            "label": "c · L = 250 cm ; l = 1,20 m : P =",
            "type": "number",
            "answer": 7.4,
            "unit": "m",
            "points": 0
          }
        ],
        "correction": "a) 2 × (120 + 80) = 400 cm = 4 m. b) 2 × 2,50 = 5 m. c) 250 cm = 2,50 m ; 2 × (2,50 + 1,20) = 7,40 m."
      },
      {
        "title": "1.3 · Présentoir carré",
        "context": "Le côté du présentoir mesure 85 cm.",
        "questions": [
          {
            "label": "Rappeler la formule.",
            "type": "manual",
            "answer": "P = 4 × c.",
            "points": 0
          },
          {
            "label": "Périmètre",
            "type": "number",
            "answer": 340,
            "unit": "cm",
            "points": 0
          },
          {
            "label": "Périmètre en mètres",
            "type": "number",
            "answer": 3.4,
            "unit": "m",
            "points": 0
          }
        ],
        "correction": "4 × 85 = 340 cm = 3,40 m."
      },
      {
        "title": "1.4 · Miroir circulaire",
        "context": "Rayon R = 30 cm. Pour cet exercice, prendre π ≈ 3,14.",
        "questions": [
          {
            "label": "Diamètre",
            "type": "number",
            "answer": 60,
            "unit": "cm",
            "points": 0
          },
          {
            "label": "Contour",
            "type": "number",
            "answer": 188.4,
            "unit": "cm",
            "points": 0
          },
          {
            "label": "Contour en mètres, au centième",
            "type": "number",
            "answer": 1.88,
            "unit": "m",
            "points": 0,
            "round": 2
          }
        ],
        "correction": "D = 2 × 30 = 60 cm ; P = 2 × 3,14 × 30 = 188,4 cm = 1,884 m, soit 1,88 m au centième."
      },
      {
        "title": "1.5 · Joint du bac",
        "context": "Le bord rectangulaire du bac mesure 55 cm × 45 cm. Bobine de joint : 2,50 m.",
        "questions": [
          {
            "label": "Périmètre",
            "type": "number",
            "answer": 200,
            "unit": "cm",
            "points": 0
          },
          {
            "label": "Périmètre en mètres",
            "type": "number",
            "answer": 2,
            "unit": "m",
            "points": 0
          },
          {
            "label": "La bobine suffit-elle ?",
            "type": "choice",
            "options": [
              "Oui",
              "Non"
            ],
            "answer": 0,
            "points": 0
          },
          {
            "label": "Longueur restante",
            "type": "number",
            "answer": 0.5,
            "unit": "m",
            "points": 0
          }
        ],
        "correction": "P = 2 × (55 + 45) = 200 cm = 2 m ; il reste 0,50 m."
      }
    ],
    [
      {
        "title": "2.1 · Plinthes de la zone bacs",
        "context": "Pièce de 4,50 m × 3,20 m ; porte de 90 cm à déduire. Barres de 2 m. Pour l’estimation, les raccords sont autorisés et les pertes de coupe négligées.",
        "questions": [
          {
            "label": "Périmètre total",
            "type": "number",
            "answer": 15.4,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Longueur de plinthes",
            "type": "number",
            "answer": 14.5,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Nombre de barres",
            "type": "number",
            "answer": 8,
            "unit": "barres",
            "points": 0
          }
        ],
        "correction": "P = 15,40 m ; porte = 0,90 m ; besoin = 14,50 m ; 14,50 ÷ 2 = 7,25 → 8 barres."
      },
      {
        "title": "2.2 · Trois miroirs",
        "context": "Trois rectangles identiques de 140 cm × 75 cm. Finition facturée au linéaire posé : 18,50 €/m.",
        "questions": [
          {
            "label": "Périmètre d’un miroir",
            "type": "number",
            "answer": 4.3,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Longueur pour trois miroirs",
            "type": "number",
            "answer": 12.9,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Coût de la pose",
            "type": "number",
            "answer": 238.65,
            "unit": "€",
            "points": 0,
            "round": 2
          }
        ],
        "correction": "Un miroir : 2 × (1,40 + 0,75) = 4,30 m. Trois : 12,90 m. Coût : 12,90 × 18,50 = 238,65 €."
      },
      {
        "title": "2.3 · Miroir à arche",
        "context": "Rectangle de largeur 60 cm et de hauteur droite 90 cm, surmonté d’un demi-cercle de diamètre 60 cm. Prendre π ≈ 3,1416.",
        "questions": [
          {
            "label": "Arc supérieur, au centième de cm",
            "type": "number",
            "answer": 94.25,
            "unit": "cm",
            "points": 0,
            "round": 2
          },
          {
            "label": "Contour extérieur, au centième de cm",
            "type": "number",
            "answer": 334.25,
            "unit": "cm",
            "points": 0,
            "round": 2
          },
          {
            "label": "Contour en mètres, au centième",
            "type": "number",
            "answer": 3.34,
            "unit": "m",
            "points": 0,
            "round": 2
          }
        ],
        "correction": "Arc = 3,1416 × 60 ÷ 2 = 94,248 cm, soit 94,25 cm. Contour = 60 + 180 + 94,248 = 334,248 cm, soit 334,25 cm = 3,34 m au centième. Le diamètre intérieur n’est pas ajouté."
      },
      {
        "title": "2.4 · Tablette triangulaire",
        "context": "Côtés du triangle : 80 cm, 60 cm et 100 cm. Kit LED sécable de 2,50 m.",
        "questions": [
          {
            "label": "Périmètre",
            "type": "number",
            "answer": 240,
            "unit": "cm",
            "points": 0
          },
          {
            "label": "Périmètre en mètres",
            "type": "number",
            "answer": 2.4,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Ruban restant",
            "type": "number",
            "answer": 0.1,
            "unit": "m",
            "points": 0
          }
        ],
        "correction": "80 + 60 + 100 = 240 cm = 2,40 m ; reste = 0,10 m = 10 cm."
      }
    ],
    [
      {
        "title": "3.1 · Vérifier les découpes",
        "context": "Quatre miroirs de 1,60 m × 0,90 m. Barres de 2,50 m à 16 € l’unité. Hypothèse explicite du dossier : coupes sans épaisseur ni perte, aucun raccord sur un côté.",
        "questions": [
          {
            "label": "Périmètre d’un miroir",
            "type": "number",
            "answer": 5,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Linéaire des quatre miroirs",
            "type": "number",
            "answer": 20,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Méthode globale : nombre de barres",
            "type": "number",
            "answer": 8,
            "unit": "",
            "points": 0
          },
          {
            "label": "Méthode par débit : nombre de barres",
            "type": "number",
            "answer": 8,
            "unit": "",
            "points": 0
          },
          {
            "label": "Coût",
            "type": "number",
            "answer": 128,
            "unit": "€",
            "points": 0
          },
          {
            "label": "Écart de coût entre les méthodes",
            "type": "number",
            "answer": 0,
            "unit": "€",
            "points": 0
          },
          {
            "label": "Pourquoi faut-il vérifier le débit réel ?",
            "type": "manual",
            "answer": "Sans perte, 1,60 + 0,90 = 2,50 m : chaque barre donne un montant et une traverse, donc 8 barres. Avec un trait de scie non nul, cette découpe exacte n’est plus possible et le besoin doit être recalculé.",
            "points": 0
          }
        ],
        "correction": "Avec la convention sans perte : 8 barres, chacune donnant 1,60 + 0,90 m ; 8 × 16 = 128 €. Les méthodes coïncident ici. Cette conclusion n’est pas transposable sans contrôle à une découpe réelle."
      },
      {
        "title": "3.2 · Triptyque à plat",
        "context": "Panneau central 1,20 m × 0,80 m et deux volets de 1,20 m × 0,40 m.",
        "questions": [
          {
            "label": "Largeur totale à plat",
            "type": "number",
            "answer": 1.6,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Contour extérieur de l’ensemble",
            "type": "number",
            "answer": 5.6,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Somme des périmètres des trois panneaux séparés",
            "type": "number",
            "answer": 10.4,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Écart",
            "type": "number",
            "answer": 4.8,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Expliquer la différence.",
            "type": "manual",
            "answer": "Les deux jonctions verticales de 1,20 m sont comptées deux fois dans la somme des panneaux : 4 × 1,20 = 4,80 m de contours intérieurs à exclure.",
            "points": 0
          }
        ],
        "correction": "Largeur = 1,60 m ; contour global = 2 × (1,60 + 1,20) = 5,60 m. Somme séparée = 4 + 3,20 + 3,20 = 10,40 m ; écart = 4,80 m."
      },
      {
        "title": "3.3 · Îlot en forme de stade",
        "context": "Deux côtés droits de 3 m et deux demi-cercles de diamètre 1,20 m. Néon souple facturé 24 € par mètre entamé. Prendre π ≈ 3,1416.",
        "questions": [
          {
            "label": "Deux demi-cercles réunis, au centième",
            "type": "number",
            "answer": 3.77,
            "unit": "m",
            "points": 0,
            "round": 2
          },
          {
            "label": "Contour total, au centième",
            "type": "number",
            "answer": 9.77,
            "unit": "m",
            "points": 0,
            "round": 2
          },
          {
            "label": "Mètres facturés",
            "type": "number",
            "answer": 10,
            "unit": "m",
            "points": 0
          },
          {
            "label": "Coût total",
            "type": "number",
            "answer": 240,
            "unit": "€",
            "points": 0
          }
        ],
        "correction": "Deux arcs : 3,1416 × 1,20 = 3,76992 m. Contour : 6 + 3,76992 = 9,76992 m, soit 9,77 m. Facturation : 10 × 24 = 240 €. Les largeurs intérieures ne sont pas ajoutées."
      }
    ]
  ],
  "evaluation": {
    "title": "Évaluation · Métré des encadrements",
    "context": "15 à 20 minutes. Rectangle : 1,80 m × 90 cm. Cercle : diamètre 70 cm. Prendre π ≈ 3,1416. Pour rendre l’achat du cercle réalisable, la fourniture de finition est supposée cintrable, vendue en longueurs de 2 m, avec raccords autorisés ; pertes de coupe négligées. Prix : 14,50 € par longueur.",
    "questions": [
      {
        "label": "1a · Largeur 90 cm =",
        "type": "number",
        "answer": 0.9,
        "unit": "m",
        "points": 0.5
      },
      {
        "label": "1b · Diamètre 70 cm =",
        "type": "number",
        "answer": 0.7,
        "unit": "m",
        "points": 0.5
      },
      {
        "label": "2 · Périmètre du rectangle",
        "type": "number",
        "answer": 5.4,
        "unit": "m",
        "points": 2
      },
      {
        "label": "3 · Périmètre du cercle au centième",
        "type": "number",
        "answer": 2.2,
        "unit": "m",
        "points": 2,
        "round": 2
      },
      {
        "label": "4 · Linéaire total au centième",
        "type": "number",
        "answer": 7.6,
        "unit": "m",
        "points": 1,
        "round": 2
      },
      {
        "label": "5 · Nombre de longueurs de 2 m à acheter",
        "type": "number",
        "answer": 4,
        "unit": "longueurs",
        "points": 1
      },
      {
        "label": "6a · Coût total",
        "type": "number",
        "answer": 58,
        "unit": "€",
        "points": 0.5
      },
      {
        "label": "6b · Rédiger la conclusion pour le bon de commande.",
        "type": "manual",
        "answer": "Commander 4 longueurs de finition cintrable de 2 m, raccords autorisés, pour 58 € TTC, soit 8 m achetés pour environ 7,60 m utiles.",
        "points": 0.5
      }
    ],
    "correction": "0,90 m et 0,70 m ; rectangle : 5,40 m ; cercle : 2,19912 m ≈ 2,20 m ; total ≈ 7,60 m ; 4 longueurs de 2 m → 58 €. Barème total : 8 points, dont 0,5 point de conclusion à apprécier par le formateur."
  },
  "notes": [
    "Précision ajoutée à la découverte : le rouleau LED mesure 3 m, conformément à la correction fournie.",
    "Les profilés rigides droits ne peuvent pas suivre un cercle sans cintrage ni segmentation. L’évaluation est donc explicitement une estimation de linéaire avec finition cintrable et raccords autorisés.",
    "Exercice 3.1 : le résultat de 8 barres suppose une coupe idéale de largeur nulle. Avec une scie, la répartition doit être revue ; le corrigé le signale.",
    "Les réponses rédigées et les algorithmes sont relus par le formateur ; les contrôles numériques n’évaluent pas la qualité de la rédaction."
  ]
};
