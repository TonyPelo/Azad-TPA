// Quand on défile, on calcule la progression
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY; // position du défilement vertical
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollTop / scrollHeight; // valeur entre 0 et 1

  // Interpolation du rouge (0 -> 255)
  const redValue = Math.round(progress * 255);

  // Générer la couleur (#RR0000)
  const color = `rgb(${redValue}, 0, 0)`;

  // Appliquer la couleur au fond du body
  document.body.style.backgroundColor = color;
});
