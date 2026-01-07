// === INITIALISATION DU CONTEXTE ===
// On récupère la balise canvas et son outil de dessin (le contexte 2D)
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// === VARIABLES D'ÉTAT DU JEU ===
// Position de départ du personnage sur le canvas
let posX = 180;
let posY = 180;

// Vitesse de déplacement (en pixels)
const VITESSE = 7;

// Gestion de l'animation (Sprite Sheet)
// frameX = colonne (0 à 3 : étapes du mouvement)
// frameY = ligne (0: Bas, 1: Haut, 2: Gauche, 3: Droite)
let frameX = 0;
let frameY = 0;

// Dimensions d'une seule vignette (calculées plus bas)
let fw = 0; 
let fh = 0;

// === CHARGEMENT DES RESSOURCES ===
const sprite = new Image();
sprite.src = "sprites.png";

const background = new Image();
background.src = "pelouse.png";

// Drapeaux pour vérifier que les images sont bien chargées avant de dessiner
let bgReady = false;
let spriteReady = false;

// 1. Chargement du fond
background.onload = () => {
  bgReady = true;
  drawScene(); // On lance un premier dessin si le fond arrive
};

// 2. Chargement du personnage
sprite.onload = () => {
  spriteReady = true;
  // Calcul dynamique : l'image contient 4 vignettes en largeur et 4 en hauteur
  fw = sprite.width / 4;
  fh = sprite.height / 4;
  drawScene();
};

// === FONCTION D'AFFICHAGE PRINCIPALE ===
function drawScene() {
  // Etape 1 : Nettoyage du canvas pour éviter les "traînées" de l'image précédente
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Etape 2 : Dessin du fond (si disponible)
  if (bgReady) {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  } else {
    // Fallback : un fond vert si l'image ne charge pas
    ctx.fillStyle = "#6abf4b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Etape 3 : Dessin du personnage (Découpage du Sprite)
  if (spriteReady && fw && fh) {
    /* Utilisation complexe de drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
      - On découpe la vignette dans le fichier source (s...)
      - On la place sur le canvas destination (d...)
    */
    ctx.drawImage(
      sprite,
      frameX * fw, frameY * fh, fw, fh, // Zone à découper (Source)
      posX, posY,                       // Position sur le canvas (Destination)
      fw * 0.6, fh * 0.6                // Taille finale (ici réduite à 60%)
    );
  }
}

// === GESTION DES ENTRÉES CLAVIER ===
document.addEventListener("keydown", (e) => {
  // Sécurité : on ne bouge pas tant que le sprite n'est pas chargé
  if (!spriteReady) return;

  // Modification de la direction (frameY) et de la position (X/Y) selon la touche
  switch (e.key) {
    case "ArrowDown":
      frameY = 0;       // Ligne 0 du sprite : Face
      posY += VITESSE;
      break;
    case "ArrowUp":
      frameY = 1;       // Ligne 1 du sprite : Dos
      posY -= VITESSE;
      break;
    case "ArrowLeft":
      frameY = 2;       // Ligne 2 du sprite : Gauche
      posX -= VITESSE;
      break;
    case "ArrowRight":
      frameY = 3;       // Ligne 3 du sprite : Droite
      posX += VITESSE;
      break;
    default:
      return; // Si ce n'est pas une flèche, on ne fait rien
  }

  // Animation : on boucle sur les 4 colonnes (0, 1, 2, 3) grâce au Modulo
  frameX = (frameX + 1) % 4;

  // Collision : Empêcher le personnage de sortir du cadre
  const wAff = fw * 0.6; // Largeur affichée
  const hAff = fh * 0.6; // Hauteur affichée

  if (posX < 0) posX = 0;
  if (posY < 0) posY = 0;
  if (posX > canvas.width - wAff) posX = canvas.width - wAff;
  if (posY > canvas.height - hAff) posY = canvas.height - hAff;

  // Mise à jour visuelle immédiate
  drawScene();
});

// Appel initial pour lancer la machine
drawScene();