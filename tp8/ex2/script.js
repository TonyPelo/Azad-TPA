const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

// === CHARGEMENT DES RESSOURCES ===
const sprite = new Image();
const backgroundImg = new Image();

sprite.src = "mario.png";
backgroundImg.src = "fond.png";

// Dimensions d'une vignette (frame)
let fw, fh;

// Variables d'état pour l'animation
let currentCol = 0; // Colonne actuelle du sprite
let currentRow = 0; // Ligne actuelle (si le sprite en a plusieurs)
let tick = 0;       // Compteur pour gérer la vitesse de l'animation

// Position du décor (pour le scrolling)
let bgOffset = 0;

// === INITIALISATION ===
sprite.onload = () => {
    // Le sprite contient 5 vignettes en largeur
    fw = sprite.width / 5;
    fh = sprite.height / 5;
};

// === BOUCLE DE RENDU (GAME LOOP) ===
function render() {
    
    // --- 1. GESTION DU DÉCOR (SCROLLING INFINI) ---
    // On déplace le fond vers la gauche
    bgOffset -= 1.8; 
    
    // Si l'image est totalement sortie à gauche, on la remet à 0
    if (bgOffset <= -canvas.width) {
        bgOffset = 0;
    }

    // Astuce : On dessine l'image deux fois pour éviter la coupure
    // 1ère image (qui sort)
    ctx.drawImage(backgroundImg, bgOffset, 0, canvas.width, canvas.height);
    // 2ème image (qui rentre à la suite)
    ctx.drawImage(backgroundImg, bgOffset + canvas.width, 0, canvas.width, canvas.height);


    // --- 2. GESTION DU PERSONNAGE (SPRITE) ---
    tick++;
    // On change de frame toutes les 5 boucles (pour ne pas aller trop vite)
    if (tick % 5 === 0) { 
        currentCol = (currentCol + 1) % 5; // Boucle 0 -> 4
    }

    // Si les dimensions du sprite sont calculées, on dessine
    if (fw && fh) {
        ctx.drawImage(
            sprite,
            currentCol * fw, currentRow * fh, fw, fh,  // Zone à copier (Source)
            60, 220,                                   // Position sur canvas (Destination)
            fw * 1.15, fh * 1.15                       // Taille finale (Zoom)
        );
    }

    // Rappel de la fonction au prochain rafraîchissement d'écran
    requestAnimationFrame(render);
}

// Lancement de l'animation une fois le fond chargé
backgroundImg.onload = render;