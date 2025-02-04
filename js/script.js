$(document).ready(function() {
    $('.flechescours').removeClass('invisible');
    $('.flechesperso').removeClass('invisible');
    
    horloge('div_horloge');
 let today = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = today.toLocaleDateString('fr-FR', options);
    $("#date").text(formattedDate);
function horloge(el) {
  if(typeof el=="string") { el = document.getElementById(el); }
  function actualiser() {
    var date = new Date();
    var str = date.getHours();
    str += ':'+(date.getMinutes()<10?'0':'')+date.getMinutes();
    str += ':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
    el.innerHTML = str;
  }
  actualiser();
  setInterval(actualiser,1000);
}
    // Vérifie si toutes les fenêtres sont ouvertes
    function checkAllWindowsOpen() {
        if (
            !$('.fenetre-profil').hasClass('invisible') &&
            !$('.fenetre-projets').hasClass('invisible') &&
            !$('.fenetre-graphisme').hasClass('invisible') && 
            !$('.fenetre-contact').hasClass('invisible') &&
            !$('.fenetre-logiciels').hasClass('invisible') 
        ) {
            $('.fatal-error').removeClass('invisible');
        } else {
            $('.fatal-error').addClass('invisible');
        }
    }

    // Gestion des double-clics pour afficher les fenêtres
    $('.profil').on('dblclick', function() {
        $(this).scrollTop(0);
        $(this).addClass("wait");
        setTimeout(() => {
        $(this).removeClass('wait');
        if ($('.folder-profil').hasClass('invisible')) {
            $('.folder-profil').removeClass('invisible');
            $('.fenetre-profil').removeClass('invisible');
            checkAllWindowsOpen(); // Vérification après ouverture
        }
        }, 400); 
    });

    $('.graphisme').on('dblclick', function() {
        $(this).scrollTop(0);
        $(this).addClass("wait");
        setTimeout(() => {
        $(this).removeClass('wait');
        if ($('.folder-graphisme').hasClass('invisible')) {
            $('.firstpage-cours').removeClass('invisible');
            $('.folder-graphisme').removeClass('invisible');
            $('.fenetre-graphisme').removeClass('invisible');
            checkAllWindowsOpen(); // Vérification après ouverture
        }
        }, 400); 
    });

    $('.projets').on('dblclick', function() {
        $(this).scrollTop(0);
        $(this).addClass("wait");
        setTimeout(() => {
        $(this).removeClass('wait');
        if ($('.folder-projets').hasClass('invisible')) {
            $('.firstpage-perso').removeClass('invisible');
            $('.folder-projets').removeClass('invisible');
            $('.fenetre-projets').removeClass('invisible');
            checkAllWindowsOpen(); // Vérification après ouverture
        }
        }, 400); 
    });

    $('.contact').on('dblclick', function() {
       $(this).scrollTop(0);
        $(this).addClass("wait");
        setTimeout(() => {
        $(this).removeClass('wait');
        if ($('.folder-contact').hasClass('invisible')) {
            $('.folder-contact').removeClass('invisible');
            $('.fenetre-contact').removeClass('invisible');
            checkAllWindowsOpen(); // Vérification après ouverture
        }
        }, 400); 
    });

    $('.logiciels').on('dblclick', function() {
        $(this).scrollTop(0);
        $(this).addClass("wait");
        setTimeout(() => {
        $(this).removeClass('wait');
        if ($('.folder-logiciels').hasClass('invisible')) {
            $('.folder-logiciels').removeClass('invisible');
            $('.fenetre-logiciels').removeClass('invisible');
            checkAllWindowsOpen(); // Vérification après ouverture
        }
        }, 400); 
    });
    $('.paint').on('dblclick', function() {
        $(this).scrollTop(0);
        $(this).addClass("wait");
        setTimeout(() => {
        $(this).removeClass('wait');
        if ($('.folder-paint').hasClass('invisible')) {
            $('.fenetre-paint').addClass('visible');
            $('.folder-paint').removeClass('invisible');
            $('.fenetre-paint').removeClass('invisible');
            checkAllWindowsOpen(); // Vérification après ouverture
        }
        }, 400); 
    });

    // Gestion des clics pour fermer les fenêtres
    $('.croix-profil').on("click touchstart", function() {
        $(this).scrollTop(0);
        if (!$('.folder-profil').hasClass('invisible')) {
            $('.fenetre-profil').addClass('invisible');
            $('.folder-profil').addClass('invisible');
            checkAllWindowsOpen(); // Vérification après fermeture
        }
    });

    $('.croix-graphisme').on("click touchstart", function() {
        $(this).scrollTop(0);
        if (!$('.folder-graphisme').hasClass('invisible')) {
            $('.fenetre-graphisme').addClass('invisible');
            $('.folder-graphisme').addClass('invisible');
            checkAllWindowsOpen(); // Vérification après fermeture
        }
    });

    $('.croix-projets').on("click touchstart", function() {
        $(this).scrollTop(0);
        if (!$('.folder-projets').hasClass('invisible')) {
            $('.fenetre-projets').addClass('invisible');
            $('.folder-projets').addClass('invisible');
            checkAllWindowsOpen(); // Vérification après fermeture
        }
    });

    $('.croix-contact').on("click touchstart", function() {
        $(this).scrollTop(0);
        if (!$('.folder-contact').hasClass('invisible')) {
            $('.fenetre-contact').addClass('invisible');
            $('.folder-contact').addClass('invisible');
            checkAllWindowsOpen(); // Vérification après fermeture
        }
    });

    $('.croix-logiciels').on("click touchstart", function() {
        $(this).scrollTop(0);
        if (!$('.folder-logiciels').hasClass('invisible')) {
            $('.fenetre-logiciels').addClass('invisible');
            $('.folder-logiciels').addClass('invisible');
            checkAllWindowsOpen(); // Vérification après fermeture
        }
    });
    $('.croix-paint').on("click touchstart", function() {
        $(this).scrollTop(0);
        if (!$('.folder-paint').hasClass('invisible')) {
            $('.fenetre-paint').addClass('invisible');
            $('.folder-paint').addClass('invisible');
            checkAllWindowsOpen(); // Vérification après fermeture
        }
    });


    $('.croix-error').on("click touchstart", function() {
        if (!$('.fatal-error').hasClass('invisible')) {
            location.reload();
        }
    });
    function preventZIndexChange(selector) {
        $(selector).on('mousedown', function() {
            $(this).css('z-index', '10'); // Fixe le z-index à une valeur constante
        });
    }

    function limitDrag(element) {
        let startPosition = null;

        $(element).easyDrag({
            'handle': $(element).find('.ruban-bleu, .ruban-bleu-contact, .ruban-bleu-paint, .ruban-bleu-logiciels'),
            onStart: function(event) {
                // Verrouille le z-index au début du drag
                $(this).css('z-index', '10');
                startPosition = { top: $(this).position().top, left: $(this).position().left };
            },
            onDrag: function(event) {
                const maxMovement = 40;
                const newPosition = {
                    top: startPosition.top + event.pageY - event.originalEvent.clientY,
                    left: startPosition.left + event.pageX - event.originalEvent.clientX,
                };

                if (Math.abs(newPosition.top - startPosition.top) <= maxMovement) {
                    $(this).css('top', newPosition.top + 'px');
                } else {
                    $(this).css('top', startPosition.top + (newPosition.top > startPosition.top ? maxMovement : -maxMovement) + 'px');
                }

                if (Math.abs(newPosition.left - startPosition.left) <= maxMovement) {
                    $(this).css('left', newPosition.left + 'px');
                } else {
                    $(this).css('left', startPosition.left + (newPosition.left > startPosition.left ? maxMovement : -maxMovement) + 'px');
                }
            },
            onStop: function(event) {
                // Re-verrouille le z-index après le drag
                $(this).css('z-index', '10');
            }
        });
    }

    // Appliquer le verrouillage du z-index et le drag limité à chaque élément
    const elements = ['.fenetre-projets','.fenetre-paint', '.fenetre-graphisme', '.fenetre-contact', '.fenetre-logiciels', '.fatal-error', '.fenetre-profil'];
    elements.forEach(selector => {
        preventZIndexChange(selector);
        limitDrag(selector);
    });




    $('.cours-une').on("click", function() {
        $('.flechescours').addClass('invisible');
        $('.firstpage-cours').addClass('invisible');
        $('.fondblanc-contenu-cours').scrollTop(0);
        if ($('.fondblanc-contenu-cours-une').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-une').removeClass('invisible');
        }    
        if (!$('.fondblanc-contenu-cours-affiches').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-affiches').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-cours-typo').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-typo').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-cours-autres').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-autres').addClass('invisible');
        }
        
    });
    $('.cours-affiches').on("click", function() {
        $('.flechescours').addClass('invisible');
        $('.firstpage-cours').addClass('invisible');
        $('.fondblanc-contenu-cours').scrollTop(0);
        if ($('.fondblanc-contenu-cours-affiches').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-affiches').removeClass('invisible');
        }
        if (!$('.fondblanc-contenu-cours-une').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-une').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-cours-typo').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-typo').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-cours-autres').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-autres').addClass('invisible');
        
        }
    });
    $('.cours-typo').on("click", function() {
        $('.flechescours').addClass('invisible');
        $('.firstpage-cours').addClass('invisible');
        $('.fondblanc-contenu-cours').scrollTop(0);
        if ($('.fondblanc-contenu-cours-typo').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-typo').removeClass('invisible');
        }
        if (!$('.fondblanc-contenu-cours-une').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-une').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-cours-affiches').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-affiches').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-cours-autres').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-autres').addClass('invisible');
        
        }
    });
    $('.cours-autres').on("click", function() {
        $('.flechescours').addClass('invisible');
        $('.firstpage-cours').addClass('invisible');
        $('.fondblanc-contenu-cours').scrollTop(0);
        if ($('.fondblanc-contenu-cours-autres').hasClass('invisible')) {
        $('.fondblanc-contenu-cours-autres').removeClass('invisible');
        }
        if (!$('.fondblanc-contenu-cours-une').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-une').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-cours-typo').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-typo').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-cours-affiches').hasClass('invisible')) {
            $('.fondblanc-contenu-cours-affiches').addClass('invisible');
        
        }
    });


    $('.perso-une').on("click", function() {
        $('.flechesperso').addClass('invisible');
        $('.firstpage-perso').addClass('invisible');
        $('.fondblanc-contenu-perso').scrollTop(0);
        if ($('.fondblanc-contenu-perso-une').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-une').removeClass('invisible');
        }    
        if (!$('.fondblanc-contenu-perso-affiches').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-affiches').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-perso-typo').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-typo').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-perso-autres').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-autres').addClass('invisible');
        }
        
    });
    $('.perso-affiches').on("click", function() {
        $('.flechesperso').addClass('invisible');
        $('.firstpage-perso').addClass('invisible');
        $('.fondblanc-contenu-perso').scrollTop(0);
        if ($('.fondblanc-contenu-perso-affiches').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-affiches').removeClass('invisible');
        }
        if (!$('.fondblanc-contenu-perso-une').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-une').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-perso-typo').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-typo').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-perso-autres').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-autres').addClass('invisible');
        
        }
    });
    $('.perso-typo').on("click", function() {
        $('.flechesperso').addClass('invisible');
        $('.firstpage-perso').addClass('invisible');
        $(".fondblanc-contenu-perso").scrollTop(0);
        if ($('.fondblanc-contenu-perso-typo').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-typo').removeClass('invisible');
        }
        if (!$('.fondblanc-contenu-perso-une').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-une').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-perso-affiches').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-affiches').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-perso-autres').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-autres').addClass('invisible');
        
        }
    });
    $('.perso-autres').on("click", function() {
        $('.flechesperso').addClass('invisible');
        $('.firstpage-perso').addClass('invisible');
        $(".fondblanc-contenu-perso").scrollTop(0);
        if ($('.fondblanc-contenu-perso-autres').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-autres').removeClass('invisible');
        }
        if (!$('.fondblanc-contenu-perso-une').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-une').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-perso-typo').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-typo').addClass('invisible');
        }
        if (!$('.fondblanc-contenu-perso-affiches').hasClass('invisible')) {
            $('.fondblanc-contenu-perso-affiches').addClass('invisible');
        
        }
    });
    $('.start').on("click", function() {
    if ($('.start-menu').hasClass('invisible')) {
        $('.start').addClass('startclicked');
        $('.start-menu').removeClass('invisible');
    } else {
        $('.start').removeClass('startclicked');
        $('.start-menu').addClass('invisible'); 
    }
    });

    // Écouter les clics sur le document
    $(document).on("click", function(event) {
        if (!$(event.target).closest('.start-menu, .start').length) {
            $('.start').removeClass('startclicked');
            $('.start-menu').addClass('invisible');
        }
    });
    
    $(".categories-cours li").click(function() {
    // Retire la classe 'categories-cours-li-clicked' de tous les éléments
        $(".categories-cours li").removeClass("categories-cours-li-clicked");
    
    // Ajoute la classe 'categories-cours-li-clicked' à l'élément cliqué
        $(this).addClass("categories-cours-li-clicked");
    });
    $(".categories-perso li").click(function() {
    // Retire la classe 'categories-cours-li-clicked' de tous les éléments
        $(".categories-perso li").removeClass("categories-perso-li-clicked");
    
    // Ajoute la classe 'categories-cours-li-clicked' à l'élément cliqué
        $(this).addClass("categories-perso-li-clicked");
    });
    
    $('.boutontv').on("click", function() {
    if ($('.tvtexture').hasClass('tvoui')) {
        $('.tvtexture').removeClass('tvoui');
        $('.boutontv').html('OFF');

    } else {
        $('.tvtexture').addClass('tvoui');
        $('.boutontv').html('ON');
    }
    });
    $('.freeselection, .geometricselection, .gomme, .potpeinture, .pipette, .loupe, .crayon, .pinceau, .spray, .painttexte, .lignedroite, .lignelibre, .formerectangle, .formepolygone, .formeronde, .formecercle').on("click", function() {
    // Supprime la classe outilcurrent de tous les éléments
    $('.freeselection, .geometricselection, .gomme, .potpeinture, .pipette, .loupe, .crayon, .pinceau, .spray, .painttexte, .lignedroite, .lignelibre, .formerectangle, .formepolygone, .formeronde, .formecercle').removeClass('outilcurrent');
    
    // Ajoute la classe uniquement à l'élément cliqué
    $(this).addClass('outilcurrent');
    });



    $('.noir, .gris, .magenta, .jaunefonce, .vertpastel, .bleupastel, .bleufonce, .rosepastel, .jaunemoche, .grisfonce, .bleu1, .bleu2, .bleu3, .marron, .blanc, .grisclair, .rouge, .jaune, .vertclair, .bleuclair, .bleumarine, .rose, .jauneclair, .vertclair2, .turquoise, .bleu4, .saumon, .orange').on("click", function() {
    // Récupère la couleur de fond de l'élément cliqué et met à jour selectedColor
        selectedColor = $(this).css('background-color');
        console.log(selectedColor);
    
    // Applique cette couleur à l'élément avec la classe currentfill
    $('.currentfill').css('background-color', selectedColor);
});
    $(document).on("click", function (event) {
    // Vérifie si le clic est à l'extérieur de la fenêtre
    if (!$(event.target).closest('.fenetre-paint-fichier, #fichier').length) {
        // Si oui, on masque la fenêtre
        $('.fenetre-paint-fichier').addClass('invisible');
        $('.save').addClass('invisible');
        $('.newfile').addClass('invisible');
    }
});
     $('#fichier').on("click", function () {
    if ($('.fenetre-paint-fichier').hasClass('invisible')) {
        $('.fenetre-paint-fichier').removeClass('invisible');
        $('.save').removeClass('invisible');
        $('.newfile').removeClass('invisible');
    } else {
        $('.fenetre-paint-fichier').addClass('invisible');
        $('.save').addClass('invisible');
        $('.newfile').addClass('invisible');
    }
});



});



 