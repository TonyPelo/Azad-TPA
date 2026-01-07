/* INITIALISATION*/
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

// === VARIABLES D'ÉTAT (STATE) ===
// Ces variables gardent en mémoire l'apparence actuelle du rectangle
let x = 50;
let y = 50;
let w = 50;
let h = 50;

// Gestion des couleurs via un tableau
const couleurs = ["yellow", "red", "blue", "green"];
let indexCouleur = 0;

// État des options
let stylePlein = true; // true = fillRect, false = strokeRect
let visible = true;

/* 
   FONCTION DE DESSIN (RENDER)
   Appelée à chaque clic pour rafraîchir le canvas
    */
function draw() {
    // 1. IMPORTANT : On efface tout avant de redessiner
    // Si on ne fait pas ça, les anciens rectangles restent affichés en dessous
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Si l'utilisateur a masqué l'objet, on arrête la fonction ici
    if (!visible) return;

    ctx.beginPath(); // Nouveau tracé

    if (stylePlein) {
        // Mode Remplissage (Plein)
        ctx.fillStyle = couleurs[indexCouleur];
        ctx.fillRect(x, y, w, h);
    } else {
        // Mode Contour (Vide)
        ctx.lineWidth = 4;
        ctx.strokeStyle = couleurs[indexCouleur];
        ctx.strokeRect(x, y, w, h);
    }
}

/* INTERACTIVITÉ (DOM EVENTS)*/

// Modifie la largeur (boucle si > 200)
document.getElementById("btnLargeur").onclick = () => {
    w += 10;
    if (w > 200) w = 10;
    draw(); // Redessine immédiatement
};

// Modifie la hauteur
document.getElementById("btnHauteur").onclick = () => {
    h += 10;
    if (h > 200) h = 10;
    draw();
};

// Change la couleur (cycle dans le tableau)
document.getElementById("btnCouleur").onclick = () => {
    indexCouleur = (indexCouleur + 1) % couleurs.length;
    draw();
};

// Bascule entre Plein et Contour (Booléen)
document.getElementById("btnStyle").onclick = () => {
    stylePlein = !stylePlein;
    draw();
};

// Bascule la visibilité
document.getElementById("btnVisibilite").onclick = () => {
    visible = !visible;
    draw();
};

// Premier affichage au chargement de la page
draw();