/* =========================================
   INITIALISATION DU CANVAS
   Récupération de l'élément DOM et du contexte 2D
   ========================================= */
const canvas = document.getElementById("zone");
const ctx = canvas.getContext("2d");

// Index pour naviguer entre les différentes figures
let currentFigureIndex = 0;

/**
 * Fonction utilitaire pour nettoyer le canvas
 * Indispensable avant de dessiner une nouvelle frame
 */
function effacerCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* 
   FIGURE 1 : CERCLES CONCENTRIQUES
   Utilisation de la méthode arc()
    */
function dessinerCercles() {
    effacerCanvas();

    // Calcul du centre du canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const rayonInterne = 28;
    const epaisseurTrait = 14;

    // 1. Le point rouge central
    // J'utilise beginPath() pour isoler ce tracé des précédents
    ctx.beginPath();
    ctx.fillStyle = "crimson";
    // arc(x, y, rayon, angleDépart, angleFin) -> Math.PI * 2 = cercle complet
    ctx.arc(centerX, centerY, rayonInterne, 0, Math.PI * 2);
    ctx.fill(); // Remplissage

    // 2. Le premier cercle noir (contour)
    ctx.beginPath();
    ctx.lineWidth = epaisseurTrait;
    ctx.strokeStyle = "#000";
    ctx.arc(centerX, centerY, rayonInterne + epaisseurTrait / 2, 0, Math.PI * 2);
    ctx.stroke(); // Contour seulement

    // 3. Boucle pour les cercles extérieurs
    // Permet de répéter le dessin avec des rayons différents
    const rayons = [55, 85, 115, 145];
    
    rayons.forEach(rayon => {
        ctx.beginPath();
        ctx.lineWidth = epaisseurTrait;
        ctx.arc(centerX, centerY, rayon, 0, Math.PI * 2);
        ctx.stroke();
    });
}


/* 
   FIGURE 2 : DESSIN VECTORIEL (LA POULE)
   Utilisation d'une grille et de coordonnées
    */
function dessinerPoule() {
    effacerCanvas();

    const startX = 50;
    const startY = 50;
    const tailleCase = 33; // Echelle de la grille
    const nbCases = 10;

    // --- Étape A : Dessiner la grille (Aide visuelle) ---
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#bfbfbf"; // Gris clair

    for (let i = 0; i <= nbCases; i++) {
        // Lignes verticales
        ctx.beginPath();
        ctx.moveTo(startX + i * tailleCase, startY);
        ctx.lineTo(startX + i * tailleCase, startY + nbCases * tailleCase);
        ctx.stroke();

        // Lignes horizontales
        ctx.beginPath();
        ctx.moveTo(startX, startY + i * tailleCase);
        ctx.lineTo(startX + nbCases * tailleCase, startY + i * tailleCase);
        ctx.stroke();
    }

    // Fonction fléchée pour convertir (x, y) de la grille en pixels réels
    const getPixel = (x, y) => [startX + x * tailleCase, startY + y * tailleCase];

    // --- Étape B : Dessiner la poule (Tracé vectoriel) ---
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000";

    // Tableau de coordonnées [x1, y1, x2, y2] pour chaque segment
    const segments = [
        [2,2,4,2], [2,2,4,4], [4,2,5,3], [5,3,7,3],
        [7,3,8,2], [8,2,8,3], [8,3,9,3], [9,3,8,4],
        [8,4,9,4], [9,4,7,6], [7,6,7,7.4], [7,6,5,6],
        [5,6,4,5], [4,5,4,4], [3,3,3,1.6],
        // Crête
        [3,2,3,1.6], [3,1.6,3.4,1.8], [3.4,1.8,3.6,1.6],
        [3.6,1.6,3.8,1.8], [3.8,1.8,4,1.6], [4,1.6,4,2],
        // Pattes
        [5,7,4,7], [5,7,4.5,7.4], [5,7,5,6.5],
        [7,7,6,7], [7,7,6.6,7.4], [7,7,7,7.4]
    ];

    // On parcourt chaque segment pour le tracer
    segments.forEach(([x1, y1, x2, y2]) => {
        const [px1, py1] = getPixel(x1, y1);
        const [px2, py2] = getPixel(x2, y2);
        
        ctx.beginPath();
        ctx.moveTo(px1, py1); // Point de départ
        ctx.lineTo(px2, py2); // Point d'arrivée
        ctx.stroke();
    });

    // --- Étape C : L'œil ---
    ctx.beginPath();
    const [eyeX, eyeY] = getPixel(3.25, 2.35);
    ctx.fillStyle = "#000";
    ctx.arc(eyeX, eyeY, 3.7, 0, Math.PI * 2);
    ctx.fill();
}


/* 
   FIGURE 3 : DAMIER
   Boucles imbriquées et Modulo (%)
    */
function dessinerDamier() {
    effacerCanvas();

    const nbCellules = 10;
    const tailleCellule = 34;
    const tailleTotale = nbCellules * tailleCellule;

    // Centrage du damier dans le canvas
    const startX = (canvas.width - tailleTotale) / 2;
    const startY = (canvas.height - tailleTotale) / 2;

    // Double boucle for : Lignes (row) et Colonnes (col)
    for (let row = 0; row < nbCellules; row++) {
        for (let col = 0; col < nbCellules; col++) {
            
            // Astuce du cours : si la somme row + col est paire, c'est noir, sinon blanc
            if ((row + col) % 2 === 0) {
                ctx.fillStyle = "#000";
            } else {
                ctx.fillStyle = "#fff";
            }

            // fillRect(x, y, largeur, hauteur)
            ctx.fillRect(
                startX + col * tailleCellule, 
                startY + row * tailleCellule, 
                tailleCellule, 
                tailleCellule
            );
        }
    }

    // Bordure autour du damier
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.strokeRect(startX, startY, tailleTotale, tailleTotale);
}


/* 
   FIGURE 4 : QUADRILLAGE COURBE (WARP)
   Illusion d'optique avec des lignes droites
    */
function dessinerCourbe() {
    effacerCanvas();

    const startX = 70;
    const startY = 70;
    const tailleCote = 360;
    const nbLignes = 48; // Densité du maillage
    const pas = tailleCote / nbLignes; // Ecart entre chaque ligne

    // Cadre extérieur
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.strokeRect(startX, startY, tailleCote, tailleCote);

    // Boucle unique pour tracer les diagonales inversées
    for (let i = 0; i <= nbLignes; i++) {
        
        // 1. Lignes verticales qui se décalent vers le bas à droite
        ctx.beginPath();
        ctx.moveTo(startX, startY + i * pas);
        ctx.lineTo(startX + i * pas, startY + tailleCote);
        ctx.stroke();

        // 2. Lignes horizontales qui se décalent vers le bas à droite
        ctx.beginPath();
        ctx.moveTo(startX + i * pas, startY);
        ctx.lineTo(startX + tailleCote, startY + i * pas);
        ctx.stroke();
    }
}


/* 
   LOGIQUE DE NAVIGATION
   Tableau de fonctions et Écouteur d'événement
    */
// On stocke les fonctions dans un tableau pour pouvoir boucler dessus
const listeFigures = [dessinerCercles, dessinerPoule, dessinerDamier, dessinerCourbe];

document.getElementById("btnNext").addEventListener("click", () => {
  // On passe à la figure suivante. Le modulo (%) permet de revenir à 0 à la fin
  currentFigureIndex = (currentFigureIndex + 1) % listeFigures.length;
  
  // Exécution de la fonction correspondante
  listeFigures[currentFigureIndex]();
});

// Lancement de la première figure au chargement de la page
listeFigures[0]();