const agentNameElement = document.querySelector('.agent-name');

// Le texte qui va s'écrire petit à petit
const fullText = "AGENT : AZAD OZTOPAL"; 

agentNameElement.textContent = "";

let index = 0;

function typeWriter() {
  if (index < fullText.length) {
    agentNameElement.textContent += fullText.charAt(index);
    index++;
    // Vitesse de frappe aléatoire (entre 50ms et 150ms) 
    const randomSpeed = Math.floor(Math.random() * 100) + 50;
    setTimeout(typeWriter, randomSpeed);
  } else {
    // Une fois fini, on fait clignoter le curseur
    agentNameElement.style.borderRight = "5px solid #ff3333"; // Curseur rouge
    blinkCursor();
  }
}

// Fonction pour faire clignoter le curseur à la fin
function blinkCursor() {
    setInterval(() => {
        if(agentNameElement.style.borderColor === 'transparent') {
            agentNameElement.style.borderColor = '#ff3333';
        } else {
            agentNameElement.style.borderColor = 'transparent';
        }
    }, 500);
}

// Lancement au chargement de la page
window.onload = () => {
    setTimeout(typeWriter, 800); // Petit délai initial
};