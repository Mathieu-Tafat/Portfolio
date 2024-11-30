// Fonction pour détecter si .fenetre-paint est visible
let startX, startY; // Points de départ
let isDrawing = false; 
let inputText = ""; 
let sprayRadius = 10; 
let sprayDensity = 3;

function observePaintWindow() {
    let paintWindow = document.querySelector('.fenetre-paint');
    if (!paintWindow) {
        console.error('Erreur : .fenetre-paint n\'existe pas dans le DOM.');
        return;
    }

    // Observer les changements de classe
    let observer = new MutationObserver(() => {
        if (paintWindow.classList.contains('visible')) {
            console.log('.fenetre-paint est maintenant visible');
            observer.disconnect(); // Arrête d'observer une fois visible
            initializeCanvas(); // Appelle la fonction pour créer le canvas
        }
    });

    observer.observe(paintWindow, { attributes: true, attributeFilter: ['class'] });
}

// Fonction pour créer le canvas
function initializeCanvas() {
    let paintzone = document.getElementById('paintzone');
    if (!paintzone) {
        console.error('Erreur : #paintzone n\'existe pas dans le DOM.');
        return;
    }

    console.log('Dimensions de #paintzone :', paintzone.offsetWidth, paintzone.offsetHeight);

    if (paintzone.offsetWidth > 0 && paintzone.offsetHeight > 0) {
        let canvas = createCanvas(paintzone.offsetWidth, paintzone.offsetHeight);
        canvas.parent('paintzone');
        console.log('Canvas créé avec dimensions :', canvas.width, canvas.height);
        frameRate(144); // Cadence d'affichage
    } else {
        console.error('Erreur : #paintzone a des dimensions invalides.');
    }
}

let previousX = null; // Stocke la position précédente de la souris
let previousY = null;

function setup() {

  $('.painttexte').on("click", function () {
    // Lorsque l'outil de texte est sélectionné, activer la saisie de texte
    let input = prompt("Entrez le texte à afficher :");  // Ouvre un prompt pour saisir le texte
    if (input) {
        inputText = input;  // Stocke le texte saisi
        console.log("Texte sélectionné:", inputText);
    }
  });
  $('.newfile').on("click", function () {
    // Vérifie que le canvas existe avant de réinitialiser
         clear(); // Efface tout le contenu du canvas
        background('white'); // Recouvre la zone avec du blanc
  })


    let paincolor = document.getElementById('')
    let paintzone = document.getElementById('paintzone');
    if (paintzone) {
        let canvas = createCanvas(paintzone.offsetWidth, paintzone.offsetHeight);
        canvas.parent('paintzone');
        frameRate(144);
    } else {
        console.error('Erreur : #paintzone n\'existe pas dans le DOM.');
    }
    noStroke(); // Pas de contour pour les formes
    setupSaveButton();
}

function mouseClicked(){
  if ($('.formeronde').hasClass('outilcurrent')) {
            noErase()
            fill(selectedColor);
            circle(mouseX, mouseY, 60);
  }
  if ($('.formerectangle').hasClass('outilcurrent')) {
            noErase()
            fill(selectedColor);
            rect(mouseX, mouseY, 100,60);
  }
  if ($('.formecercle').hasClass('outilcurrent')) {
            noErase()
            fill(selectedColor);
             rect(mouseX-20, mouseY-20, 105, 100, 20);
  }
  if ($('.painttexte').hasClass('outilcurrent')) {
        noErase();
        fill(selectedColor || 'black'); // Utilise la couleur sélectionnée
        textSize(24);  // Taille de texte, ajustable
        text(inputText, mouseX, mouseY); // Affiche le texte à la position de la souris
        console.log(`Texte affiché à (${mouseX}, ${mouseY})`);
    }

}



function mousePressed() {
    if ($('.lignedroite').hasClass('outilcurrent')) {
      noErase()
        if (!isDrawing) {
            // Premier clic : Enregistre le point de départ
            startX = mouseX;
            startY = mouseY;
            isDrawing = true;
            console.log(`Début du dessin : (${startX}, ${startY})`);
        } else {
            // Deuxième clic : Trace la ligne
            stroke(selectedColor || 'black');
            strokeWeight(2);
            noFill();
            line(startX, startY, mouseX, mouseY);
            console.log(`Fin du dessin : (${mouseX}, ${mouseY})`);
            isDrawing = false; // Réinitialise le mode dessin
        }
    }
}


function mouseDragged() {
    // Vérifie si le clic droit est enfoncé
    if ($('.pinceau').hasClass('outilcurrent')) {
     noErase()
     fill(selectedColor);
     stroke(selectedColor);
     strokeWeight(10);
     circle(mouseX, mouseY, 10);

    }
    
    if ($('.crayon').hasClass('outilcurrent')) {
     noErase()
     fill(selectedColor);
     stroke(selectedColor);
     strokeWeight(3);
     circle(mouseX, mouseY, 3);
    }

    if ($('.gomme').hasClass('outilcurrent')) {
      erase(200,200);
     strokeWeight(10);
     circle(mouseX, mouseY, 10);
       }
       
    
    if ($('.spray').hasClass('outilcurrent')) {
        noErase();
        strokeWeight(4)
        fill(selectedColor);  // Utilise la couleur sélectionnée pour le spray
        for (let i = 0; i < sprayDensity; i++) {
            let offsetX = random(-sprayRadius, sprayRadius);  // Aléatoire dans le rayon
            let offsetY = random(-sprayRadius, sprayRadius);  // Aléatoire dans le rayon
            point(mouseX + offsetX, mouseY + offsetY);
        }
      }
}


function setupSaveButton() {
    $('.save').on("click", function () {
        if (canvas) {
            saveCanvas(canvas, 'mon_dessin', 'png'); // Sauvegarde une seule image
        } else {
            console.error('Erreur : Canvas non défini.');
        }
    });
}


// Lancer l'observation une fois la page chargée
window.onload = observePaintWindow;
