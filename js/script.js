document.addEventListener('DOMContentLoaded', function () {

  // =====================
  // RÉGLAGES FACILES À MODIFIER
  // =====================
  // Nombre de médias affichés par défaut dans la vue "projet en grand"
  // quand un projet n'a pas de liste "medias" (avant le texte final).
  // Mets 1 pour n'afficher que le média principal.
  const PROJECT_PLACEHOLDER_COUNT = 1;

  // Flottement des slides (desktop uniquement) : petite simulation "dans l'espace"
  const FLOAT_ROAM_X        = 1;     // part de l'écran explorable en largeur (1 = tout l'écran, 0 = reste en place)
  const FLOAT_ROAM_Y        = 1;     // part de l'écran explorable en hauteur
  const FLOAT_SPEED_X       = 0.35;  // vitesse de croisière horizontale (px par image)
  const FLOAT_SPEED_Y       = 0.30;  // vitesse de croisière verticale
  const FLOAT_GOAL_MIN      = 4000;  // ms mini avant de choisir une nouvelle destination
  const FLOAT_GOAL_MAX      = 11000; // ms maxi
  const FLOAT_MOUSE_RANGE   = 520;   // px, distance à laquelle le mouvement de la souris remue les slides
  const FLOAT_STIR          = 0.02;  // force avec laquelle la souris remue les slides (dans leur propre direction, sans les suivre)
  const FLOAT_DAMP          = 0.008; // frottement : très faible = les slides gardent leur élan, comme en apesanteur
  const FLOAT_SPACE         = 0;     // px de marge entre deux slides (0 = elles se touchent vraiment)
  const FLOAT_BUMP          = 0.35;  // vitesse mini d'éloignement après un choc
  const FLOAT_BOUNCE        = 0.92;  // élasticité des chocs (1 = parfaitement élastique)
  const FLOAT_MAXV          = 2.4;   // vitesse maxi (px par image)
  const FLOAT_STIFF         = 0.5;   // fermeté du contact (1 = dur, 0.1 = mou)

  // Taille des slides (desktop) : en em. Le nombre de slides visibles s'adapte tout seul à l'écran.
  const SLIDE_W_EM   = 20;
  const SLIDE_H_EM   = 26;
  const SLIDE_GAP_EM = -5.3;

  // Tailles aléatoires des slides au lancement (desktop) : facteur d'échelle min / max,
  // et part maximale de l'écran que toutes les slides ensemble peuvent occuper (pour que tout reste aéré).
  const SLIDE_SCALE_MIN = 0.5;
  const SLIDE_SCALE_MAX = 0.8;
  const SLIDE_TOTAL_MAX = 0.30;   // 0.30 = toutes les slides réunies prennent au plus 30 % de la surface utile

  // Cibles qui se baladent (img/cible.png) : un clic les fait tomber, d'autres clics les relancent
  const TARGET_IMG         = 'img/cible.png';
  const TARGET_COUNT       = 3;
  const TARGET_SIZE_MIN    = 44;    // px
  const TARGET_SIZE_MAX    = 84;    // px
  const TARGET_GRAVITY     = 0.5;   // chute
  const TARGET_KICK        = 13;    // force d'un clic de jonglage (vers le haut)
  const TARGET_BOUNCE      = 0.55;  // rebond sur le sol (bandeau du bas)
  const TARGET_REST_MS     = 3500;  // au sol sans bouger : elle se remet à flotter

  // Vidéos des slides : cadence affichée (images par seconde). 0 = fluide / désactivé.
  const ICON_VIDEO_FPS = 15;

  // Fond animé
  const BG_DARKEN        = 0.3;  // assombrissement du fond (0 = aucun, 0.6 = très sombre)
  const BG_BASE_INTERVAL = 333;  // ms entre deux images du fond à vitesse ×1
  const BG_SPEED_DEFAULT = 1.4;  // vitesse par défaut (légèrement plus rapide qu'avant)
  const BG_SPEED_MIN     = 0.12; // vitesse mini de la barre (tout reste en mouvement lent, jamais figé)
  const BG_SPEED_MAX     = 5;    // vitesse maxi de la barre

  // Vitesse globale réglée par la barre en bas à droite : fond, slides qui flottent,
  // bandeau du bas et vidéos des slides. Au minimum, tout reste en mouvement lent.
  let bgSpeed = BG_SPEED_DEFAULT;
  try {
    const saved = parseFloat(localStorage.getItem('bgSpeed'));
    if (!isNaN(saved) && saved >= BG_SPEED_MIN && saved <= BG_SPEED_MAX) bgSpeed = saved;
  } catch (err) {}
  const animK = () => bgSpeed / BG_SPEED_DEFAULT; // 1 = vitesse normale

  // =====================
  // DETECTION TACTILE / MOUVEMENT RÉDUIT
  // =====================
  const isTouch      = window.matchMedia('(hover: none)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lite         = isTouch || reduceMotion;

  const rand = (a, b) => a + Math.random() * (b - a);

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  const isVideoSrc = src => /\.(mp4|webm|ogg)$/i.test(src);

  // =====================
  // INTRO (texte)
  // =====================
  const intro = document.createElement('div');
  intro.id = 'intro';
  intro.innerHTML = '<div id="intro-name"><span class="intro-big">Mathieu TAFAT</span><span class="intro-sub">graphiste 2d &amp; 3d</span></div>';
  document.body.appendChild(intro);

  const splideElIntro = document.querySelector('.splide');
  const topbarIntro   = document.getElementById('topbar');
  const pseudoEl      = document.getElementById('pseudo');
  const bgBar = document.getElementById('bgbar');
  const tickerEl = document.getElementById('ticker');
  const targetsEl = document.getElementById('targets');
  [splideElIntro, topbarIntro, bgBar, tickerEl, targetsEl].forEach(el => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
  });

  setTimeout(() => { intro.classList.add('intro-visible'); }, 100);

  let gateOpen = true; // tant que le prénom n'est pas saisi, le clavier ne pilote pas le site

  // =====================
  // SPLIDE INIT
  // =====================
  // Sur ordinateur, les slides flottent partout : le carrousel ne défile donc jamais
  // (perPage = nombre total de slides). Toutes, Contact compris, sont toujours à l'écran.
  const SLIDE_COUNT = document.querySelectorAll('.splide__slide').length;

  var splide = new Splide('.splide', {
    type: 'slide',
    perPage: SLIDE_COUNT,
    focus: '0',
    gap: SLIDE_GAP_EM + 'em',
    fixedWidth: SLIDE_W_EM + 'em',
    fixedHeight: SLIDE_H_EM + 'em',
    keyboard: false,
    drag: false,
    speed: 120,
    breakpoints: {
      768: {
        perPage: 3,
        focus: 'center',
        trimSpace: false,
        fixedWidth: '9em',
        fixedHeight: '12em',
        gap: '1em',
        drag: true,
      },
      480: {
        perPage: 1,
        focus: 'center',
        trimSpace: false,
        fixedWidth: '70vw',
        fixedHeight: '58vh',
        gap: '0.8em',
        drag: true
      }
    }
  }).mount();

  // =====================
  // TAILLES ALÉATOIRES (desktop) : entre SLIDE_SCALE_MIN et SLIDE_SCALE_MAX,
  // puis réduites si besoin pour que le total reste sous SLIDE_TOTAL_MAX de l'écran
  // =====================
  if (!isTouch) {
    const els = Array.from(document.querySelectorAll('.splide__slide'));
    const em  = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const W = SLIDE_W_EM * em, H = SLIDE_H_EM * em;
    let sc = els.map(() => rand(SLIDE_SCALE_MIN, SLIDE_SCALE_MAX));
    const usable = Math.max(1, window.innerWidth - 32) * Math.max(1, window.innerHeight - 96 - 70);
    const total  = sc.reduce((acc, v) => acc + (W * v) * (H * v), 0);
    const limit  = usable * SLIDE_TOTAL_MAX;
    if (total > limit) { const f = Math.sqrt(limit / total); sc = sc.map(v => v * f); }
    els.forEach((el, i) => el.style.setProperty('--s', sc[i].toFixed(3)));
  }

  // =====================
  // BOUTON START
  // =====================
  const btnStart = document.createElement('div');
  btnStart.id = 'btn-start';
  btnStart.textContent = '';

  function attacherStart() {
    const activeSlide = document.querySelector('.splide__slide.is-active');
    if (!activeSlide) return;
    if (btnStart.parentElement) btnStart.parentElement.removeChild(btnStart);
    const titre = activeSlide.querySelector('.titre');
    btnStart.textContent = titre ? titre.textContent : '';
    activeSlide.appendChild(btnStart);
  }

  attacherStart();
  splide.on('move', function() { setTimeout(attacherStart, 10); });

  // =====================
  // LECTURE DES VIDÉOS SEULEMENT QUAND ELLES SONT VISIBLES
  // =====================
  const videoObserver = ('IntersectionObserver' in window)
    ? new IntersectionObserver(entries => {
        entries.forEach(en => {
          const v = en.target;
          if (en.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
          else v.pause();
        });
      }, { threshold: 0.25 })
    : null;

  function watchVideo(v) { if (videoObserver) videoObserver.observe(v); }

  const splideVideos = Array.from(document.querySelectorAll('video.splide-bg-video'));
  splideVideos.forEach(watchVideo);

  // =====================
  // VIDÉOS DES SLIDES : vitesse (barre globale × accélération au survol)
  // =====================
  function applyVideoRate(vid) {
    const k = animK();
    if (k <= 0) { vid.pause(); return; }
    vid.playbackRate = Math.max(0.0625, Math.min(16, k * (vid._mult || 1)));
  }

  document.querySelectorAll('.splide__slide').forEach(function(slide) {
    const vid = slide.querySelector('video.splide-bg-video');
    if (!vid) return;
    const setMult = m => { vid._mult = m; applyVideoRate(vid); };

    if (isTouch) {
      slide.addEventListener('touchstart', function() { setMult(3); }, { passive: true });
      slide.addEventListener('touchend', function() { setMult(1); }, { passive: true });
    } else {
      slide.addEventListener('mouseenter', function() { setMult(3); });
      slide.addEventListener('mouseleave', function() { setMult(1); });
    }
  });

  // Effet "pas fluide" : la vidéo joue en cachette et on n'en affiche qu'ICON_VIDEO_FPS images par seconde
  if (ICON_VIDEO_FPS > 0) {
    const iconPairs = splideVideos.map(v => {
      const cv = document.createElement('canvas');
      cv.className = 'splide-bg-video splide-bg-canvas';
      cv.setAttribute('aria-hidden', 'true');
      v.insertAdjacentElement('afterend', cv);
      return { v: v, cv: cv, cx: cv.getContext('2d'), ready: false };
    });
    let lastIcon = 0;
    (function drawIcons(ts) {
      requestAnimationFrame(drawIcons);
      if (ts - lastIcon < 1000 / ICON_VIDEO_FPS) return;
      lastIcon = ts;
      if (overlayOpen || document.hidden) return;
      iconPairs.forEach(p => {
        const v = p.v;
        if (v.readyState < 2 || v.paused || !v.videoWidth) return;
        if (p.cv.parentElement.classList.contains('off')) return;
        const w = Math.min(480, v.videoWidth);
        const h = Math.round(w * v.videoHeight / v.videoWidth);
        if (p.cv.width !== w || p.cv.height !== h) { p.cv.width = w; p.cv.height = h; }
        p.cx.drawImage(v, 0, 0, w, h);
        if (!p.ready) { p.ready = true; v.classList.add('has-canvas'); }
      });
    })(0);
  }

  // =====================
  // DONNÉES PAR SLIDE
  // Chaque projet peut avoir une liste optionnelle  medias: ["img/a.png", "img/b.mp4", ...]
  // (affichés dans la vue "projet en grand", suivis de la slide de texte).
  // Sans "medias", on utilise le média principal (src) répété PROJECT_PLACEHOLDER_COUNT fois.
  // =====================

const SLIDE_DATA = [
  {
    title: "Profil",
    navLabel: "Profil & Contact",
    jp: "プロフィール",
    profile: true,
    text: "Graphiste 2D et 3D, diplômé en 2025 d'une Licence Professionnelle en Design Graphique. Je m'intéresse à des domaines variés, de l'identité visuelle à l'édition, en passant par le motion design, l'animation 3D et le jeu vidéo. J'aime explorer de nouvelles techniques et apprendre à utiliser les outils adaptés à chaque projet.\n\nLa culture, le cinéma et le jeu vidéo nourrissent mon travail, mais j'apprécie aussi de découvrir de nouveaux univers et de sortir de mes habitudes.\n\nJe suis ouvert aux projets et aux collaborations : n'hésitez pas à me contacter."
  },
  {
    title: "Service Communication Université Rennes 2",
    navLabel: "Service communication",
    jp: "レンヌ2",
    desc: "Suite Adobe",
    images: [
      {
        src: "img/stagerennes2/recherche/recherche.png",
        caption: "Journée de la Recherche 2025",
        text: "Après plusieurs années sans édition, la Journée de la Recherche faisait son retour autour du thème « Recherche en société ». Le brief consistait à proposer une identité qui rende la recherche plus accessible, sans reprendre les codes scientifiques habituels. J'ai travaillé sur une ligature typographique reliant les mots et sur un fond bleu animé par des ondes multicolores, pour évoquer les échanges entre recherche et société. J'ai également posé un principe pour les éditions suivantes : renouveler le travail typographique chaque année tout en conservant une identité reconnaissable. J'ai réalisé les déclinaisons sur différents supports : affiches, réseaux sociaux, diaporama et brochure."
      },
      {
        src: "img/stagerennes2/campusweek/campus.png",
        caption: "Campus Week 2025",
        text: "La Campus Week est une semaine de rentrée consacrée à la vie étudiante de Rennes 2. Je voulais représenter cette communauté à travers une multitude de petits personnages, inspirés des dessins que je réalisais plus jeune, vivant ensemble sur l'affiche. Plutôt que de contourner le cartouche « Campus Week », contrainte importante de la composition, j'ai choisi de l'intégrer au visuel. Le projet a ensuite été décliné sur de nombreux supports : brochure, plan, réseaux sociaux, site internet et goodies."
      },
      {
        src: "img/stagerennes2/olympe/olymp.png",
        caption: "Olymp'in Fac 2025",
        text: "À partir du logo existant et d'une direction graphique définie avec le graphiste du service, j'ai conçu une affiche pour cet événement sportif étudiant. Je me suis orienté vers une esthétique inspirée du mouvement Memphis, avec des motifs simples associés aux différentes disciplines et des espaces dédiés aux informations pratiques. J'ai réalisé une affiche classique ainsi qu'une version au format pantalon."
      },
      {
        src: "img/stagerennes2/anim.mp4",
        caption: "Congrès SFSIC 2025",
        text: "Animation réalisée pour le congrès de la SFSIC à partir des totems graphiques conçus par le graphiste du service. J'ai animé les motifs image par image dans Illustrator, en déplaçant progressivement leurs éléments d'une frame à l'autre. Un exercice de mise en mouvement d'une identité existante, que je réaliserais aujourd'hui différemment, notamment avec Blender."
      },
      {
        src: "img/stagerennes2/cartel.png",
        caption: "Cartels SFSIC 2025",
        text: "Conception de plusieurs gabarits de cartels destinés à accompagner les contenus présentés lors du congrès de la SFSIC. Le travail consistait à reprendre les couleurs, les typographies et les totems de l'identité de l'événement pour créer des supports lisibles et cohérents avec l'ensemble de la communication."
      },
      {
        src: "img/stagerennes2/planegalite.png",
        caption: "Plan Action Égalité 2025-2028",
        text: "Mise en page de verbatims rapportant des propos problématiques entendus sur le campus, dans le cadre du plan d'action Égalité de Rennes 2. L'objectif était de faire ressortir la violence de ces paroles par une disposition dynamique des textes. J'ai réalisé la structure de mise en page à partir d'une sélection de typographies, tandis que le graphiste responsable du document a défini le traitement esthétique final."
      }
    ]
  },
  {
    title: "Jeux-vidéo",
    jp: "ビデオゲーム",
    desc: "Construct 2, Unity",
    images: [
      {
        src: "img/jeuvideo/MUR.mp4",
        caption: "MUR",
        text: "Développé en parallèle de mon mémoire « Barre de vie », MUR est un jeu de plateforme en 2D qui explore l'évolution des interfaces de jeu vidéo. Au cours d'une même partie, l'interface se transforme et devient une composante du gameplay. Le projet interroge la place de ces éléments : jusqu'où peut-on alléger une interface sans perdre les informations nécessaires au jeu ? À l'inverse, que se passe-t-il lorsqu'elle devient envahissante ? J'ai voulu en faire un terrain d'expérimentation, où l'on peut explorer ces extrêmes tout en jouant."
      },
      {
        src: "img/jeuvideo/course.mp4",
        caption: "-faire les courses",
        text: "Mon premier jeu en 3D réalisé avec Unity. Le joueur se lève et part faire les courses, mais croise en chemin un personnage qui le met au défi. Le jeu enchaîne alors plusieurs mini-jeux imaginés autour de cette situation quotidienne. Le projet est resté court et expérimental, mais m'a permis d'explorer différentes idées de gameplay et de m'amuser à créer des défis originaux."
      },
      {
        src: "img/3d/apaisant.mp4",
        caption: "Apaisant",
        text: "Concept de menu principal en 3D pour un jeu d'exploration à l'atmosphère sombre et calme. Dans un environnement à mi-chemin entre forêt et zone industrielle abandonnée, le joueur doit trouver une issue après être tombé en panne d'essence. L'idée est de créer une tension par l'absence de menace visible : les sons de la nature, le silence et la possibilité qu'une présence se rapproche suffisent à installer le doute."
      },
      {
        src: "img/3d/toisondor.mp4",
        caption: "Toison d'Or",
        text: "Concept de menu principal en 3D pour un jeu inspiré de la mythologie et des lieux sacrés. Dans un environnement très lumineux, épuré et mystique, le joueur aurait pour objectif de récupérer un objet légendaire en surmontant différentes épreuves, à travers des mécaniques de plateforme ou d'énigmes. Une ambiance musicale douce, ponctuée d'éléments étranges, viendrait troubler cette apparente sérénité."
      },
      {
        src: "img/3d/class.mp4",
        caption: "αιεαRELICTAεςτ",
        text: "Concept de menu principal en 3D pour un jeu de rôle inspiré du quotidien en milieu scolaire. Derrière cette apparence familière, tout semble jouer contre le personnage : gestion des relations, temps d'étude et événements imprévus compliquent progressivement sa progression vers l'obtention du diplôme. J'imagine un mélange de RPG et de roguelite dans lequel chaque choix compte et où les obstacles deviennent de plus en plus difficiles à surmonter."
      },
      {
        src: "img/jeuvideo/pokemon.png",
        caption: "Identités Pokémon Émeraude alternatives",
        text: "Projet personnel imaginant deux éditions alternatives de Pokémon Émeraude (2004), sur le principe de versions d'un même jeu présentant des différences graphiques et thématiques. Émeraude Delta s'inspire des ruines, de l'archéologie et des légendes anciennes, tandis qu'Émeraude Alpha explore un univers plus lumineux, idéal et presque divin. J'ai décliné ces deux directions à travers les jaquettes, les cartouches, les animations de lancement et une page de magazine inspirée des publications de l'époque."
      },
      {
        src: "img/jeuvideo/meute.png",
        caption: "Meute",
        text: "Projet personnel de jeu de stratégie sur grille. Le joueur contrôle une famille de loups vivant dans un zoo-refuge et qui cherche à s'en échapper pour partir en vacances. Chaque membre de la meute possède ses propres caractéristiques et capacités, ce qui permet d'imaginer différentes manières de franchir les obstacles et d'éviter les gardes. J'ai choisi une palette bleu et jaune, inspirée de la vision des loups, et exploré plusieurs écrans de jeu ainsi qu'une boîte imprimée et assemblée à la main. Le projet est resté au stade de l'expérimentation, avec l'envie d'imaginer un jeu de stratégie accessible à plusieurs personnes."
      },
      {
        src: "img/jeuvideo/finelame.mp4",
        caption: "Fine Lame",
        text: "Première version de mon projet de diplôme, Fine Lame était un jeu de plateforme dans lequel on incarnait un samouraï cherchant à devenir le plus fort, avec une inspiration tirée du livre Musashi. J'ai développé les dessins, les animations, une typographie et un système d'éclairage sous Construct 2, avec la musique composée par un ami. Malgré le travail engagé sur ce projet, j'ai finalement choisi de m'orienter vers une approche plus expérimentale avec MUR, davantage en lien avec mon sujet de recherche."
      },
      {
        src: "img/motiondesign/fullanimdelta.mp4",
        caption: "Pokémon Émeraude Delta",
        text: "Animation de lancement imaginée pour une édition alternative de Pokémon Émeraude (2004). Cette version explore un univers tourné vers les ruines, l'archéologie et les légendes anciennes, avec une identité inspirée des vestiges d'un monde oublié."
      },
      {
        src: "img/motiondesign/pokemon-alpha-maintitle.mp4",
        caption: "Pokémon Émeraude Alpha",
        text: "Animation de lancement imaginée pour une édition alternative de Pokémon Émeraude (2004). À l'opposé de Delta, cette version explore une esthétique lumineuse et idéale, entre nature, perfection et imagerie divine."
      }
    ]
  },
  {
    title: "Edition",
    jp: "エディトリアル",
    desc: "Huile de coude, suite Adobe",
    images: [
      {
        src: "img/edition/barre2vie.png",
        caption: "Barre de vie",
        text: "Mémoire de recherche consacré aux interfaces utilisateur des jeux vidéo japonais des années 1980 et 1990, jusqu'à l'arrivée de la 3D. J'y étudie leur définition, les contraintes techniques de l'époque, les typographies employées et l'évolution des codes graphiques à travers de nombreux jeux auxquels j'ai joué et dont j'ai analysé les interfaces. Une étude de cas sur la saga The Legend of Zelda permet d'approfondir cette évolution. J'aborde également les changements liés à l'arrivée de la 3D et les attentes actuelles en matière d'interface, notamment à travers un sondage mené auprès d'étudiant·es en arts, de la licence au master, et de membres du corps enseignant de Rennes 2. Pour l'édition, j'ai conçu une bichromie cyan et rouge ainsi qu'un système de lecture à deux niveaux : les images de jeu sont visibles au premier abord, tandis que le texte apparaît lorsque l'on soulève la page de droite. J'ai réalisé une version classique et une version à couverture rigide accompagnée d'un CD regroupant des émulateurs et les jeux testés. Un PDF du mémoire peut être fourni sur demande."
      },
      {
        src: "img/edition/mur.png",
        caption: "MUR - livret",
        text: "Livret conçu en complément de mon jeu MUR, inspiré des livrets fournis avec les jeux Nintendo DS. Je voulais retrouver le plaisir de découvrir un jeu en lisant son livret, en présentant son fonctionnement, ses commandes et son univers. J'ai également créé les éléments typographiques et graphiques du document. Pour rester cohérent avec le jeu, le livret suit la même logique d'évolution de l'interface : plus on avance, moins celle-ci occupe de place."
      },
      {
        src: "img/edition/lyber.png",
        caption: "Lyber & CSS",
        text: "Workshop de Licence Professionnelle mené avec le collectif Luuse. À partir d'un lyber, une version gratuite d'un livre diffusée en ligne sans mise en page, nous devions concevoir une édition en utilisant le codage HTML/CSS. J'ai pris en charge l'essentiel du développement, étant le plus à l'aise avec le code, tout en participant à une réflexion collective sur la direction graphique et en répartissant les rôles au sein du groupe. Le livre portant sur Emmanuel Macron et sa politique, nous avons développé une esthétique inspirée de la communication politique et de la polarisation entre droite et gauche."
      },
      {
        src: "img/edition/reggae.png",
        caption: "Reggaeton & Fin du Monde",
        text: "Fanzine réalisé en binôme autour du thème « Reggaeton & Fin du Monde », avec des contraintes de photocopie et de collage. Nos approches étaient différentes mais complémentaires : je développais les idées autour de la fin du monde, tandis que mon binôme apportait davantage de références au reggaeton. Le résultat cherche un équilibre entre ces deux univers. Ce projet a surtout été une expérience de collaboration, qui m'a appris à confronter des idées différentes, à partager mes doutes et à construire une proposition commune."
      },
      {
        src: "img/edition/1173.png",
        caption: "117³ - Exposition",
        text: "Affiche et supports de communication réalisés dans le cadre d'un workshop de Licence 2 Arts Plastiques consacré à la curation et à l'exposition collective des travaux des étudiant·es. Chargé de l'affiche après avoir exprimé mon intérêt pour le graphisme, j'ai travaillé avec le groupe pour construire une proposition commune. Le titre 117³ faisait référence au temps passé dans notre atelier durant une semaine, et j'ai choisi de représenter ce nombre par une photographie de la porte de l'atelier, vidée de son contenu. Le délai très court et la diversité des avis ont imposé de faire des choix pour aboutir à une composition cohérente. J'ai également réalisé des supports de promotion, notamment un flyer et des visuels pour les réseaux sociaux."
      },
      {
        src: "img/edition/flipbook/flipe.mp4",
        caption: "E - Flipbook",
        text: "Flipbook explorant l'évolution de la lettre « E » à travers différentes grandes catégories typographiques. Le projet m'a amené à concevoir un objet éditorial à la fois robuste et suffisamment souple pour permettre une manipulation répétée. La principale contrainte était de garantir le bon fonctionnement du feuilletage et la lisibilité des transformations. Le flipbook a été exposé au Cabinet du livre d'artiste de Rennes 2."
      }
    ]
  },
  {
    title: "Animation 2D",
    jp: "2Dアニメーション",
    desc: "Suite Adobe",
    images: [
      {
        src: "img/motiondesign/themachinist_final.mp4",
        caption: "The Machinist",
        text: "Animation inspirée du film The Machinist de Brad Anderson (2004). Je voulais retrouver cette impression que quelque chose ne tourne pas rond, dans un quotidien sombre et nihiliste où une présence mystérieuse semble perturber la vie du personnage. Je me suis notamment appuyé sur l'atmosphère de certaines scènes du film, dont celle de la salle de bain, pour construire un univers visuel inquiétant."
      },
      {
        src: "img/motiondesign/load.mp4",
        caption: "FC Loading",
        text: "Recréation de l'animation de chargement des jeux EA SPORTS FC, que je croise régulièrement en jouant. Le projet était un défi personnel : reproduire cette boucle tout en imaginant une variante du logo dans un style inspiré des jeux vidéo rétro, à partir de petites versions alternatives que j'avais déjà explorées."
      },
      {
        src: "img/motiondesign/crossed.mp4",
        caption: "Crossed",
        text: "Générique de fan imaginé pour Crossed, l'émission de Karim Debbache consacrée aux adaptations de jeux vidéo au cinéma. Après avoir revu l'émission, j'ai voulu proposer ma propre animation autour de son titre. J'ai choisi une interprétation littérale du mot « Crossed », sans chercher à développer une signification supplémentaire, en m'appuyant sur une musique existante qui n'a pas été composée pour ce projet."
      }
    ]
  },
  {
    title: "Animations 3D",
    jp: "3Dアニメーション",
    desc: "Blender, Suite Adobe",
    images: [
      {
        src: "img/3d/clerbar.mp4",
        caption: "CLEBART",
        text: "Première animation réalisée sur Blender. J'ai construit une scène nocturne à partir de quelques images utilisées comme éléments de décor et d'un travail d'éclairage pour installer une ambiance sombre, dans un coin de village. L'arrivée d'un personnage, le clebard, vient soudainement rompre cette atmosphère et créer un décalage."
      },
      {
        src: "img/3d/loubart.mp4",
        caption: "LOUBART",
        text: "Dans la continuité de CLEBART, cette animation joue sur le contraste entre un décor nocturne inquiétant et l'arrivée inattendue d'un personnage, Loubart. Je voulais retrouver cette ambiance sombre et mystérieuse, puis la désamorcer par l'apparition de cet élément décalé."
      },
      {
        src: "img/3d/surplace.mp4",
        caption: "SUR PLACE OU À EMPORTER",
        text: "Animation construite autour d'un contraste entre décor et personnage. J'ai imaginé un diner américain vide, froid et presque entièrement blanc, avant d'y introduire un iguane qui parle. Le décalage entre l'environnement et cette apparition constitue le point de départ de la scène.",
        vertical: true
      },
      {
        src: "img/3d/backroom.mp4",
        caption: "PERDU",
        text: "Inspirée des Backrooms, cette animation explore un environnement vide et dérangeant, dans lequel j'ai choisi d'introduire un T-Rex. Plutôt que d'en faire une menace, je voulais jouer sur le contraste entre l'imaginaire inquiétant des lieux et la présence presque anodine du dinosaure."
      },
      {
        src: "img/3d/chambre.mp4",
        caption: "DESERTEUR",
        text: "Avec cette animation, j'ai voulu aller au-delà de mes premières scènes en vue subjective en travaillant plusieurs angles de caméra. De petits soldats y préparent leur évasion, mais l'un d'eux finit par être considéré comme un déserteur. Le projet détourne l'imaginaire des jouets et des films comme Toy Story pour raconter une petite histoire à travers la mise en scène."
      },
      {
        src: "img/3d/finalmente.mp4",
        caption: "*",
        text: "Animation mettant en scène un personnage qui part faire ses courses dans un univers étrange et peu rassurant. Il traverse des lieux lugubres et une maison en désordre, sans jamais sembler acheter quoi que ce soit d'essentiel. Le contraste entre le calme apparent du personnage et l'atmosphère tendue des décors laisse volontairement une part d'incertitude sur ce qui se passe."
      },
      {
        src: "img/3d/bombe.mp4",
        caption: "BOMBE",
        text: "Clip 3D imaginé à partir du morceau « Bombe » de Yoa. J'avais envie de mettre cette musique en images en reprenant littéralement ses paroles. La mise en scène s'organise ainsi autour de la représentation d'un larguage de bombe."
      },
      {
        src: "img/3d/rue.mp4",
        caption: "UN PEU DE RETENUE",
        text: "Animation 3D inspirée du morceau « Un peu de retenue » de Théodort. Plutôt que d'illustrer directement les paroles, j'ai imaginé une ambiance nocturne et froide : une rue traversée en boucle par un chat, tandis que l'on entend des personnes rire derrière les fenêtres. Le contraste entre l'extérieur solitaire et la chaleur suggérée des intérieurs donne son atmosphère à la scène."
      },
      {
        src: "img/3d/cuir.mp4",
        caption: "どこか",
        text: "Animation d'exploration inspirée des Backrooms. La caméra avance dans des espaces vides, contrainte de suivre un chemin dont chaque angle pourrait dissimuler quelque chose. Pourtant, rien n'apparaît. Je voulais travailler sur cette peur de l'inconnu et sur l'absence de menace visible, en laissant le vide et l'anticipation créer l'inquiétude."
      },
      {
        src: "img/3d/foret.mp4",
        caption: "Dans les bois",
        text: "Exploration 3D d'une forêt lumineuse et mystique, pensée comme un lieu dans lequel on aurait envie de se promener. Le personnage y ramasse progressivement des objets, comme dans un jeu de survie ou un RPG. Mon objectif était de créer un environnement forestier crédible et accueillant, en travaillant l'atmosphère et l'envie d'explorer."
      },
      {
        src: "img/3d/electromenager.mp4",
        caption: "Se lever aux aurores",
        text: "À l'origine, je voulais recréer l'atmosphère d'un grand magasin de meubles vide, en m'inspirant de mon expérience de travail dans ce type de magasin. Le projet s'est finalement concentré sur une seule pièce dans laquelle un personnage se réveille. L'ambiance devient progressivement angoissante, sans explication claire, dans la continuité de l'univers étrange développé dans mon animation « * »."
      },
      {
        src: "img/3d/skelet.mp4",
        caption: "Un lancer vaut mieux que deux tu l'auras",
        text: "Courte animation 3D mettant en scène un squelette qui jongle avec une seule balle."
      },
      {
        src: "img/3d/spider.mp4",
        caption: "Spider-man in Japan",
        text: "À partir de mes propres vidéos tournées au caméscope au Japon, j'ai voulu imaginer que Spider-Man s'était invité dans mes images de voyage. Le projet était un défi technique autour de l'animation et de l'incrustation d'un personnage 3D dans des prises de vues réelles. Les résultats varient selon les plans, mais l'ensemble m'a permis d'expérimenter l'intégration d'un élément virtuel dans des images filmées."
      },
      {
        src: "img/3d/mouche.mp4",
        caption: "MOUCHE",
        text: "Animation suivant le périple nocturne d'une mouche dans une chambre."
      }
    ]
  },
  {
    title: "Illustrations",
    jp: "イラストレーション",
    desc: "Huile, aquarelle et illustrations",
    images: [
       {
        src: "img/mechanoid.png",
        caption: "mechanoid",
        text: "Cover d'une musique du compositeur Papri-K. Illustration digitale réalisée à partir des envies de l'artiste."
      },
      {
        src: "img/ctrl.png",
        caption: "CTRL",
        text: "Cover d'une musique du compositeur Papri-K. Scène 3D rendue comme une illustrration, réalisée à partir des envies de l'artiste."
      },
      {
        src: "img/avatar.png",
        caption: "I See You, Son",
        text: "Illustration digitale à partir d'une scène du film Avatar 3 : De feu et de cendre"
      },
      {
        src: "img/darthvader.png",
        caption: "Anakin",
        text: "Illustration digitale à partir d'une scène de la série Star Wars : Obi-Wan"
      },
      {
        src: "img/aquarelles/1.png",
        caption: "Aquarelles Normandes",
        text: "Série d'aquarelles réalisées à partir de lieux visités en Normandie. Ces peintures sont une manière de conserver une trace de ces endroits et d'en retranscrire les paysages à travers la couleur et l'aquarelle."
      },
      {
        src: "img/aquarelles/video.mp4",
        caption: "Exposition",
        text: "Exposition personnelle d'un mois consacrée à mes aquarelles, présentées en grand format A3 à l'espace La Passerelle de Theix-Noyalo, en juin 2024. Ce projet m'a permis de présenter mon travail pictural dans un espace d'exposition.",
        vertical: true
      },
      {
        src: "img/aquarelles/huile.png",
        caption: "Huile sur toile",
        text: "Peinture à l'huile représentant un paysage. Il s'agit de ma première expérimentation avec cette technique, une occasion de découvrir les possibilités de la peinture à l'huile et son approche différente de la couleur et de la matière."
      }
    ]
  }
];

  // Tag en japonais sur chaque slide : le titre de la catégorie
  document.querySelectorAll('.splide__slide').forEach((sl, i) => {
    sl.dataset.idx = (SLIDE_DATA[i] && SLIDE_DATA[i].jp) || String(i + 1);
  });

  function getMedias(item) {
    if (Array.isArray(item.medias) && item.medias.length) return item.medias;
    return Array(Math.max(1, PROJECT_PLACEHOLDER_COUNT)).fill(item.src);
  }

  // =====================
  // PRECHARGEMENT DES MEDIAS (pendant l'intro)
  // Sur mobile/tactile, on ne précharge que les images (économie de data).
  // =====================
  function preloadAllMedia(dataList, onDone) {
    const set = new Set();
    dataList.forEach(slide => {
      if (!slide.images) return;
      slide.images.forEach(img => {
        set.add(img.src);
        (img.medias || []).forEach(m => set.add(m));
      });
    });
    let srcs = Array.from(set);
    if (isTouch) srcs = srcs.filter(s => !isVideoSrc(s));

    let remaining = srcs.length;
    if (remaining === 0) { onDone(); return; }

    function itemDone() {
      remaining--;
      if (remaining <= 0) onDone();
    }

    srcs.forEach(src => {
      if (isVideoSrc(src)) {
        const v = document.createElement('video');
        v.preload = 'auto';
        v.muted = true;
        v.src = src;
        v.addEventListener('canplaythrough', itemDone, { once: true });
        v.addEventListener('error', itemDone, { once: true });
        v.load();
      } else {
        const i = new Image();
        i.onload  = itemDone;
        i.onerror = itemDone;
        i.src = src;
      }
    });
  }

  const MIN_INTRO_TIME = 2200;
  const MAX_INTRO_TIME = isTouch ? 5000 : 8000;

  const introStart = Date.now();
  let introEnded = false;

  function endIntro() {
    if (introEnded) return;
    introEnded = true;
    intro.classList.add('intro-out');
    setTimeout(() => { intro.remove(); showNameGate(); }, 1000);
  }

  const maxTimer = setTimeout(endIntro, MAX_INTRO_TIME);

  preloadAllMedia(SLIDE_DATA, () => {
    const elapsed = Date.now() - introStart;
    const wait = Math.max(0, MIN_INTRO_TIME - elapsed);
    setTimeout(() => { clearTimeout(maxTimer); endIntro(); }, wait);
  });

  // =====================
  // QUESTION : COMMENT VOUS APPELEZ-VOUS ?
  // =====================
  function revealSite() {
    [splideElIntro, topbarIntro, bgBar, tickerEl, targetsEl].forEach(el => {
      if (!el) return;
      el.style.transition = 'opacity 0.8s ease';
      el.style.opacity = '1';
      el.style.pointerEvents = '';
    });
  }

  function showNameGate() {
    const gate = document.createElement('div');
    gate.id = 'name-gate';
    gate.setAttribute('role', 'dialog');
    gate.setAttribute('aria-labelledby', 'gate-label');
    gate.innerHTML =
      '<form id="gate-form" autocomplete="off">' +
        '<label id="gate-label" for="gate-input">Comment vous appelez-vous ?</label>' +
        '<input id="gate-input" type="text" maxlength="24" placeholder="Votre prénom" autocomplete="given-name">' +
        '<div class="gate-actions">' +
          '<button type="submit" class="nav-btn">Entrer</button>' +
          '<button type="button" id="gate-skip" class="nav-btn nav-btn--ghost">Passer</button>' +
        '</div>' +
      '</form>';
    document.body.appendChild(gate);

    const input = gate.querySelector('#gate-input');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      gate.classList.add('in');
      input.focus({ preventScroll: true });
    }));

    function finish(name) {
      pseudoEl.textContent = (name || '').trim() || 'Visiteur';
      gate.classList.remove('in');
      gate.classList.add('out');
      gateOpen = false;
      revealSite();
      setTimeout(() => gate.remove(), 900);
    }

    gate.querySelector('#gate-form').addEventListener('submit', function(e) {
      e.preventDefault();
      finish(input.value);
    });
    gate.querySelector('#gate-skip').addEventListener('click', function() { finish(''); });
  }

  // =====================
  // STATE
  // =====================
  let overlayOpen     = false;
  let projectOpen     = false;
  let currentSlideIdx = 0;
  let gridFocusIdx    = 0;
  let currentData     = null;

  const overlay        = document.getElementById("overlay");
  const overlayContent = document.getElementById("overlay-content");
  const overlayHint    = document.getElementById("overlay-hint");
  const splideEl       = document.querySelector(".splide");

  const getCols = () => window.matchMedia('(max-width: 768px)').matches ? 2 : 3;

  // =====================
  // FLOTTEMENT DES SLIDES (desktop)
  // Mouvement lent et très léger en continu ; plus ample et légèrement
  // attiré quand la souris est proche (sans jamais la suivre).
  // Utilise la propriété CSS "translate", indépendante du "transform" de Splide.
  // =====================
  if (!lite) {
    const slideEls = Array.from(document.querySelectorAll('.splide__slide'));
    const rnd = (min, max) => min + Math.random() * (max - min);
    const smooth = x => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
    const clamp  = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    // Un "corps" par slide : position (décalage), vitesse, destination aléatoire.
    const bodies = slideEls.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, gx: 0, gy: 0, next: 0, init: false, ang: Math.random() * 6.28, angV: (Math.random() - 0.5) * 0.05 }));
    let mouseX = -9999, mouseY = -9999;   // position brute
    let smX = -9999, smY = -9999;         // position lissée (évite les à-coups)
    let lastT = 0;
    let narrowReset = false;
    const trackEl = document.querySelector('.splide__track');
    let windGust = 0, prevSmX = -9999, prevSmY = -9999; // l'effet est plus fort quand la souris bouge

    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });
    document.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });

    function floatLoop(t) {
      requestAnimationFrame(floatLoop);
      if (overlayOpen || projectOpen) { lastT = t; return; }
      const kk = animK();
      const dt = Math.min(3, Math.min(50, t - (lastT || t)) / 16.667 * kk);
      lastT = t;
      if (kk <= 0) return; // pause

      const vw = window.innerWidth, vh = window.innerHeight;
      if (vw <= 768) { // mise en page mobile : pas de flottement
        if (!narrowReset) { slideEls.forEach(el => { el.style.translate = ''; el.classList.remove('off'); }); narrowReset = true; }
        return;
      }
      narrowReset = false;

      // lissage de la souris
      if (mouseX < -9000) { smX = mouseX; smY = mouseY; }
      else if (smX < -9000) { smX = mouseX; smY = mouseY; }
      else { smX += (mouseX - smX) * 0.45; smY += (mouseY - smY) * 0.45; }

      // rafale : l'effet est fort quand la souris bouge, nul quand elle est immobile
      if (smX > -9000 && prevSmX > -9000) {
        const sp = Math.hypot(smX - prevSmX, smY - prevSmY);
        windGust += (Math.min(1, sp / 12) - windGust) * 0.3;
      } else windGust *= 0.9;
      prevSmX = smX; prevSmY = smY;

      // 1) lecture de toutes les positions (une seule passe, pas de va-et-vient lecture/écriture)
      const rects = slideEls.map(el => el.getBoundingClientRect());
      // pour les collisions, la "case" de la slide active inclut son titre collé dessous
      const hit = rects.map((r, i) => {
        let bottom = r.bottom;
        if (btnStart.parentElement === slideEls[i]) bottom = Math.max(bottom, btnStart.getBoundingClientRect().bottom);
        return { left: r.left, right: r.right, top: r.top, bottom: bottom,
                 width: r.width, height: bottom - r.top };
      });

      bodies.forEach(b => { b.x0 = b.x; b.y0 = b.y; });

      // 2) forces + déplacement
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i], r = rects[i];
        // zone explorable = tout l'écran (sous la barre du haut, au-dessus du bas de page)
        const homeL = r.left - b.x, homeT = r.top - b.y;
        b.minX = 16 - homeL;
        b.maxX = Math.max(b.minX, vw - 16 - (homeL + r.width));
        b.minY = 96 - homeT;
        b.maxY = Math.max(b.minY, vh - 70 - (homeT + r.height));

        // apparition au hasard : chaque slide démarre n'importe où
        if (!b.init) {
          b.init = true;
          b.x = rnd(b.minX, b.maxX) * FLOAT_ROAM_X;
          b.y = rnd(b.minY, b.maxY) * FLOAT_ROAM_Y;
          b.vx = rnd(-FLOAT_SPEED_X, FLOAT_SPEED_X);
          b.vy = rnd(-FLOAT_SPEED_Y, FLOAT_SPEED_Y);
        }

        if (t >= b.next) {
          b.gx = rnd(b.minX, b.maxX) * FLOAT_ROAM_X;
          b.gy = rnd(b.minY, b.maxY) * FLOAT_ROAM_Y;
          b.next = t + rnd(FLOAT_GOAL_MIN, FLOAT_GOAL_MAX);
        }

        b.visible = true;

        // vitesse souhaitée : vers la destination, en douceur
        const dvx = clamp((b.gx - b.x) * 0.01,  -FLOAT_SPEED_X, FLOAT_SPEED_X);
        const dvy = clamp((b.gy - b.y) * 0.01,  -FLOAT_SPEED_Y, FLOAT_SPEED_Y);

        // le MOUVEMENT de la souris remue les slides proches : chacune réagit dans SA propre
        // direction (qui tourne doucement). Elles ne suivent pas le curseur et ne le fuient pas.
        b.ang += b.angV * dt;
        const d    = Math.hypot((r.left + r.width / 2) - smX, (r.top + r.height / 2) - smY);
        const near = Math.max(0, 1 - d / FLOAT_MOUSE_RANGE);
        const stir = near * near * windGust * FLOAT_STIR;

        b.vx += ((dvx - b.vx) * FLOAT_DAMP + Math.cos(b.ang) * stir) * dt;
        b.vy += ((dvy - b.vy) * FLOAT_DAMP + Math.sin(b.ang) * stir) * dt;
        const spd = Math.hypot(b.vx, b.vy);
        if (spd > FLOAT_MAXV) { b.vx *= FLOAT_MAXV / spd; b.vy *= FLOAT_MAXV / spd; }
        b.x  += b.vx * dt;
        b.y  += b.vy * dt;
      }

      // 3) les slides ne se superposent JAMAIS : plusieurs passes, séparation complète,
      //    puis choc élastique (échange d'élan) comme en apesanteur
      const R = i => {
        const h = hit[i], bd = bodies[i], dx = bd.x - bd.x0, dy = bd.y - bd.y0;
        return { l: h.left + dx, r: h.right + dx, t: h.top + dy, b: h.bottom + dy };
      };
      const shift = (bd, axisX, d) => {
        if (axisX) { const nx = clamp(bd.x + d, bd.minX, bd.maxX); const dd = nx - bd.x; bd.x = nx; return dd; }
        const ny = clamp(bd.y + d, bd.minY, bd.maxY); const dd = ny - bd.y; bd.y = ny; return dd;
      };
      for (let pass = 0; pass < 6; pass++) {
        let any = false;
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = R(i), c = R(j);
            const ox = Math.min(a.r, c.r) - Math.max(a.l, c.l) + FLOAT_SPACE;
            const oy = Math.min(a.b, c.b) - Math.max(a.t, c.t) + FLOAT_SPACE;
            if (ox <= 0 || oy <= 0) continue;
            any = true;
            const A = bodies[i], B = bodies[j];
            const axisX = ox < oy;
            const over  = (axisX ? ox : oy) + 0.5;
            const cA = axisX ? (a.l + a.r) / 2 : (a.t + a.b) / 2;
            const cB = axisX ? (c.l + c.r) / 2 : (c.t + c.b) / 2;
            const n  = cB >= cA ? 1 : -1;                    // sens de A vers B

            // séparation complète ; si un bord de l'écran bloque l'une, l'autre prend le reste
            const dA = shift(A, axisX, -n * over / 2);
            const dB = shift(B, axisX,  n * over / 2);
            const left = over - n * (dB - dA);
            if (left > 0.01) {
              if (Math.abs(dA) < over / 2 - 0.01)      shift(B, axisX,  n * left);
              else if (Math.abs(dB) < over / 2 - 0.01) shift(A, axisX, -n * left);
            }

            // choc élastique entre deux masses égales
            let va = axisX ? A.vx : A.vy, vb = axisX ? B.vx : B.vy;
            if ((va - vb) * n > 0) {
              const e  = FLOAT_BOUNCE;
              const na = ((1 - e) * va + (1 + e) * vb) / 2;
              const nb = ((1 + e) * va + (1 - e) * vb) / 2;
              va = na; vb = nb;
            }
            const sep = (vb - va) * n;
            if (sep < FLOAT_BUMP) { const d2 = (FLOAT_BUMP - sep) / 2; va -= n * d2; vb += n * d2; }
            if (axisX) { A.vx = va; B.vx = vb; } else { A.vy = va; B.vy = vb; }
          }
        }
        if (!any) break;
      }

      // 4) écriture : rebond doux sur les bords de la zone explorable
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (b.x < b.minX) { b.x = b.minX; b.vx =  Math.abs(b.vx) * 0.85; }
        if (b.x > b.maxX) { b.x = b.maxX; b.vx = -Math.abs(b.vx) * 0.85; }
        if (b.y < b.minY) { b.y = b.minY; b.vy =  Math.abs(b.vy) * 0.85; }
        if (b.y > b.maxY) { b.y = b.maxY; b.vy = -Math.abs(b.vy) * 0.85; }
        slideEls[i].style.translate = b.x.toFixed(2) + 'px ' + b.y.toFixed(2) + 'px';
        slideEls[i].classList.toggle('off', !b.visible);
      }
    }
    requestAnimationFrame(floatLoop);
  }

  // =====================
  // HOVER SLIDES → sélection (desktop)
  // =====================
  let hoverTimeout = null;

  if (!isTouch) {
    document.querySelector('.splide__list').addEventListener('mouseover', function(e) {
      if (overlayOpen || gateOpen) return;
      const slide = e.target.closest('.splide__slide');
      if (!slide) return;
      const slides = Array.from(document.querySelectorAll('.splide__slide'));
      const idx = slides.indexOf(slide);
      if (idx === -1 || idx === currentSlideIdx) return;
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => { splide.go(idx); }, 25);
    });
  }

  // =====================
  // CELLULES DE LA GRILLE
  // =====================
  function attachCellHover(cell) {
    if (!isTouch) {
      cell.addEventListener('mouseenter', function() {
        const idx = parseInt(cell.dataset.index);
        if (isNaN(idx)) return;
        gridFocusIdx = idx;
        updateFocusClass();
      });
    }
    cell.addEventListener('focus', function() {
      const idx = parseInt(cell.dataset.index);
      if (isNaN(idx)) return;
      gridFocusIdx = idx;
      updateFocusClass();
    });
  }

  function cellHTML(img) {
    const label = '<div class="og-cell-label">' + esc(img.caption) + '</div><div class="og-cell-dim"></div>';
    if (isVideoSrc(img.src)) {
      return '<video src="' + esc(img.src) + '" class="og-img" loop muted playsinline preload="metadata"></video>' + label;
    }
    return '<img src="' + esc(img.src) + '" alt="' + esc(img.caption) + '" class="og-img" loading="lazy" />' + label;
  }

  // =====================
  // BUILD PROFILE
  // =====================
  function buildProfile() {
    const data = SLIDE_DATA[0];
    currentData = null;

    const paragraphs = data.text
      .split('\n\n')
      .filter(p => p.trim())
      .map(p => `<p class="og-profile-p">${p.trim()}</p>`)
      .join('');

    overlayContent.innerHTML = `
      <div class="og-header"><span class="br">「</span>${data.title}<span class="br">」</span></div>
      <div class="og-profile">
        <div class="og-profile-text">
          ${paragraphs}
          <div class="og-skills">
            <span class="og-profile-contact-label">Logiciels</span>
            <p class="og-skills-row"><span class="og-skills-level">Utilisés régulièrement</span><span>Suite Adobe, Blender, Construct</span></p>
            <p class="og-skills-row"><span class="og-skills-level">Notions</span><span>Unity</span></p>
          </div>
          <div class="og-profile-contact">
            <span class="og-profile-contact-label">Contact</span>
          </div>
          <form id="og-contact-form" class="og-contact-form">
            <input type="email" name="email" placeholder="Votre email" aria-label="Votre email" required>
            <input type="text" name="subject" placeholder="Sujet" aria-label="Sujet" required>
            <textarea name="message" placeholder="Votre message" aria-label="Votre message" rows="4" required></textarea>
            <button type="submit">Envoyer</button>
            <p class="og-contact-status" role="status"></p>
          </form>
          <div class="og-profile-contact">
            <a href="mailto:contact.tmdesignstudio@gmail.com">contact.tmdesignstudio@gmail.com</a>
            <a href="https://fr.linkedin.com/in/mathieu-tafat-031518261" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
      </div>
    `;

    const form   = document.getElementById('og-contact-form');
    const status = form.querySelector('.og-contact-status');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      status.textContent = 'Envoi en cours...';
      status.className = 'og-contact-status';

      try {
        const res = await fetch('https://formspree.io/f/mvkolzod', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });

        if (res.ok) {
          status.textContent = 'Message envoyé, merci !';
          status.classList.add('og-contact-status--ok');
          form.reset();
        } else {
          status.textContent = "Une erreur est survenue, réessayez ou écrivez-moi directement par mail.";
          status.classList.add('og-contact-status--err');
        }
      } catch (err) {
        status.textContent = "Une erreur est survenue, réessayez ou écrivez-moi directement par mail.";
        status.classList.add('og-contact-status--err');
      }
    });
  }

  // =====================
  // MASONRY
  // =====================
  function layoutMasonryCell(cell) {
    const grid = document.getElementById('og-grid');
    if (!grid) return;
    const media = cell.querySelector('video, img');
    if (!media) return;

    let ratio;
    if (media.tagName === 'VIDEO') {
      if (!media.videoWidth || !media.videoHeight) return;
      ratio = media.videoHeight / media.videoWidth;
    } else {
      if (!media.naturalWidth || !media.naturalHeight) return;
      ratio = media.naturalHeight / media.naturalWidth;
    }

    const cellWidth = cell.getBoundingClientRect().width;
    const targetHeight = cellWidth * ratio;

    const styles   = window.getComputedStyle(grid);
    const rowHeight = parseFloat(styles.getPropertyValue('grid-auto-rows'));
    const rowGap    = parseFloat(styles.getPropertyValue('gap')) || 0;

    const rowSpan = Math.ceil((targetHeight + rowGap) / (rowHeight + rowGap));
    cell.style.gridRowEnd = 'span ' + rowSpan;
  }

  function layoutMasonry() {
    const grid = document.getElementById('og-grid');
    if (!grid) return;
    grid.querySelectorAll('.og-cell').forEach(layoutMasonryCell);
  }

  // =====================
  // BUILD GRID (générique : une catégorie ou "Travaux")
  // =====================
  function buildGrid(data) {
    currentData  = data;
    gridFocusIdx = 0;

    let html = `<div class="og-header"><span class="br">「</span>${esc(data.title)}<span class="br">」</span></div>`;
    if (data.desc) html += `<div class="og-desc">${esc(data.desc)}</div>`;
    html += `<div class="og-grid" id="og-grid">`;
    data.images.forEach((img, i) => {
      html += `<div class="og-cell" data-index="${i}" role="button" tabindex="0" aria-label="Ouvrir ${esc(img.caption)}">${cellHTML(img)}</div>`;
    });
    html += `</div>`;
    overlayContent.innerHTML = html;

    updateFocusClass();

    overlayContent.querySelectorAll('.og-cell').forEach(cell => {
      attachCellHover(cell);

      const media = cell.querySelector('video, img');
      if (!media) return;
      if (media.tagName === 'VIDEO') {
        watchVideo(media);
        if (media.readyState >= 1) layoutMasonryCell(cell);
        else media.addEventListener('loadedmetadata', () => layoutMasonryCell(cell));
      } else {
        if (media.complete) layoutMasonryCell(cell);
        else media.addEventListener('load', () => layoutMasonryCell(cell));
      }
    });

    // Un clic ouvre directement le projet en grand
    document.getElementById('og-grid').addEventListener('click', function(e) {
      const cell = e.target.closest('.og-cell');
      if (!cell) return;
      const idx = parseInt(cell.dataset.index);
      if (isNaN(idx)) return;
      gridFocusIdx = idx;
      updateFocusClass();
      openProject(currentData.images[idx]);
    });
  }

  function updateFocusClass() {
    const cells = overlayContent.querySelectorAll('.og-cell');
    cells.forEach((cell, i) => {
      cell.classList.toggle('og-cell--focused', i === gridFocusIdx);
    });
  }

  function focusCell(idx) {
    const cells = overlayContent.querySelectorAll('.og-cell');
    if (idx < 0 || idx >= cells.length) return;
    gridFocusIdx = idx;
    updateFocusClass();
    cells[idx].scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  // =====================
  // PROJET EN GRAND (carrousel : médias puis slide de texte)
  // =====================
  const project = document.createElement('div');
  project.id = 'project';
  project.setAttribute('role', 'dialog');
  project.setAttribute('aria-modal', 'true');
  project.setAttribute('aria-label', 'Projet');
  project.innerHTML =
    '<div id="project-title"></div>' +
    '<button type="button" id="project-close" aria-label="Fermer le projet">X</button>' +
    '<div id="project-track"></div>' +
    '<button type="button" id="project-prev" class="pj-arrow" aria-label="Précédent">&#8249;</button>' +
    '<button type="button" id="project-next" class="pj-arrow" aria-label="Suivant">&#8250;</button>' +
    '<div id="project-dots"></div>';
  document.body.appendChild(project);

  const pjTrack = project.querySelector('#project-track');
  const pjTitle = project.querySelector('#project-title');
  const pjDots  = project.querySelector('#project-dots');
  const pjPrev  = project.querySelector('#project-prev');
  const pjNext  = project.querySelector('#project-next');
  let pjIndex = 0, pjTotal = 0, pjRaf = 0;

  function setPjIndex(i) {
    pjIndex = i;
    pjDots.querySelectorAll('.pj-dot').forEach((d, k) => {
      if (k === i) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
    pjPrev.disabled = i <= 0;
    pjNext.disabled = i >= pjTotal - 1;
  }

  function pjGo(i) {
    i = Math.max(0, Math.min(pjTotal - 1, i));
    pjTrack.scrollTo({ left: i * pjTrack.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  pjTrack.addEventListener('scroll', function() {
    if (pjRaf) return;
    pjRaf = requestAnimationFrame(() => {
      pjRaf = 0;
      const i = Math.round(pjTrack.scrollLeft / (pjTrack.clientWidth || 1));
      if (i !== pjIndex) setPjIndex(i);
    });
  }, { passive: true });

  pjPrev.addEventListener('click', () => pjGo(pjIndex - 1));
  pjNext.addEventListener('click', () => pjGo(pjIndex + 1));
  project.querySelector('#project-close').addEventListener('click', closeProject);

  function openProject(item) {
    if (!item) return;
    const medias = getMedias(item);
    pjTotal = medias.length + 1; // + slide de texte
    pjTrack.innerHTML = '';

    medias.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'pj-slide';
      slide.setAttribute('aria-label', 'Média ' + (i + 1) + ' sur ' + pjTotal);
      if (isVideoSrc(src)) {
        slide.innerHTML = '<video class="pj-media" src="' + esc(src) + '" controls loop muted playsinline preload="metadata"></video>';
        watchVideo(slide.firstChild);
      } else {
        slide.innerHTML = '<img class="pj-media" src="' + esc(src) + '" alt="' + esc(item.caption) + '">';
      }
      pjTrack.appendChild(slide);
    });

    const textSlide = document.createElement('div');
    textSlide.className = 'pj-slide';
    textSlide.setAttribute('aria-label', 'Texte, ' + pjTotal + ' sur ' + pjTotal);
    textSlide.innerHTML =
      '<div class="pj-text">' +
        (item.category ? '<p class="pj-text-cat">' + esc(item.category) + '</p>' : '') +
        '<h2 class="pj-text-caption">' + esc(item.caption) + '</h2>' +
        (item.text ? '<p class="pj-text-body">' + esc(item.text) + '</p>' : '') +
      '</div>';
    pjTrack.appendChild(textSlide);

    pjDots.innerHTML = '';
    for (let i = 0; i < pjTotal; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pj-dot';
      b.setAttribute('aria-label', 'Aller à la page ' + (i + 1));
      b.addEventListener('click', () => pjGo(i));
      pjDots.appendChild(b);
    }

    pjTitle.textContent = item.caption;
    projectOpen = true;
    project.style.display = 'block';
    pjTrack.scrollLeft = 0;
    setPjIndex(0);
    requestAnimationFrame(() => project.classList.add('show'));
    project.querySelector('#project-close').focus({ preventScroll: true });
  }

  function closeProject() {
    if (!projectOpen) return;
    projectOpen = false;
    project.classList.remove('show');
    setTimeout(() => {
      if (projectOpen) return;
      project.style.display = 'none';
      pjTrack.innerHTML = ''; // coupe aussi les vidéos et leur son
    }, 300);
  }

  // =====================
  // OVERLAY : ouvrir / fermer
  // =====================
  function showOverlay(build) {
    overlayOpen = true;
    overlay.style.display = "block";
    splideEl.classList.add("hidden");
    splideVideos.forEach(v => v.pause());
    build();
    setTimeout(() => {
      overlay.classList.add("show");
      overlayHint.classList.add("show");
    }, 10);
  }

  function openOverlay(slideIdx) {
    const d = SLIDE_DATA[slideIdx];
    if (!d) return;
    if (d.profile) showOverlay(buildProfile);
    else           showOverlay(() => buildGrid(d));
  }

  function openProfile() { showOverlay(buildProfile); }

  // Grille de tous les travaux, toutes catégories, dans un ordre aléatoire
  function openWorks() {
    const all = [];
    SLIDE_DATA.forEach(slide => {
      if (!slide.images) return;
      slide.images.forEach(img => all.push(Object.assign({}, img, { category: slide.title })));
    });
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    showOverlay(() => buildGrid({
      title: 'Travaux',
      desc: 'Tous les projets, toutes catégories confondues.',
      images: all
    }));
  }

  function closeOverlayFn() {
    closeProject();
    overlayOpen = false;
    overlay.classList.remove("show");
    overlayHint.classList.remove("show");
    splideEl.classList.remove("hidden");
    splideVideos.forEach(v => { const p = v.play(); if (p && p.catch) p.catch(() => {}); });
    setTimeout(() => { if (!overlayOpen) overlay.style.display = "none"; }, 400);
  }

  overlayHint.addEventListener("click", closeOverlayFn);

  // =====================
  // BOUTONS DE LA BARRE : Contact / Travaux
  // =====================
  const navEl = document.getElementById('nav');
  const navOrder = SLIDE_DATA.map((d, i) => i);

  navOrder.forEach(i => {
    const d = SLIDE_DATA[i];
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'top-link';
    b.textContent = d.navLabel || d.title;
    b.setAttribute('aria-label', d.title);
    b.addEventListener('click', function() {
      if (gateOpen || overlayOpen) return;
      currentSlideIdx = i;
      splide.go(i);
      openOverlay(i);
    });
    navEl.appendChild(b);
  });

  // (La grille aléatoire "Travaux" reste disponible : appeler openWorks() pour la réafficher.)

  // =====================
  // CLIC SUR SLIDE → OUVRE L'OVERLAY
  // =====================
  document.querySelector('.splide__list').addEventListener('click', function(e) {
    if (overlayOpen || gateOpen) return;
    const slide = e.target.closest('.splide__slide');
    if (!slide) return;

    if (isTouch) {
      if (!slide.classList.contains('is-active')) {
        const slides = Array.from(document.querySelectorAll('.splide__slide'));
        splide.go(slides.indexOf(slide));
        return;
      }
      openOverlay(currentSlideIdx);
    } else {
      if (!slide.classList.contains('is-active')) return;
      openOverlay(currentSlideIdx);
    }
  });

  // =====================
  // CLAVIER
  // =====================
  document.addEventListener("keydown", function(e) {
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
    if (gateOpen) return;

    const onControl = t && t.closest && t.closest('button, a');
    const isAction  = e.code === "Space" || e.code === "Enter" || e.code === "KeyE";

    // --- projet en grand ---
    if (projectOpen) {
      if (e.code === "Escape")     { e.preventDefault(); closeProject(); }
      if (e.code === "ArrowRight") { e.preventDefault(); pjGo(pjIndex + 1); }
      if (e.code === "ArrowLeft")  { e.preventDefault(); pjGo(pjIndex - 1); }
      if (e.code === "Home")       { e.preventDefault(); pjGo(0); }
      if (e.code === "End")        { e.preventDefault(); pjGo(pjTotal - 1); }
      return;
    }

    // --- grille / profil ---
    if (overlayOpen) {
      if (e.code === "Escape") { e.preventDefault(); closeOverlayFn(); return; }
      if (!currentData) return;

      const cols = getCols();
      const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.code];
      if (step) { e.preventDefault(); focusCell(gridFocusIdx + step); return; }

      if (isAction && !onControl) {
        e.preventDefault();
        openProject(currentData.images[gridFocusIdx]);
      }
      return;
    }

    // --- carrousel principal ---
    if (e.code === "ArrowRight") splide.go('>');
    if (e.code === "ArrowLeft")  splide.go('<');
    if (isAction && !onControl) {
      e.preventDefault();
      openOverlay(currentSlideIdx);
    }
  });

  // =====================
  // CIBLES (desktop) : elles se baladent, plus ou moins vite selon la barre de vitesse.
  // 1er clic : elle tombe comme une balle. Clics suivants : elle repart en l'air (jonglage),
  // le côté touché la fait dévier. Si elle reste au sol, elle se remet à flotter.
  // =====================
  if (!lite && targetsEl) {
    const clampT = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const FLOOR_MARGIN = 26; // hauteur du bandeau du bas
    const list = [];

    for (let i = 0; i < TARGET_COUNT; i++) {
      const size = rand(TARGET_SIZE_MIN, TARGET_SIZE_MAX);
      const img = document.createElement('img');
      img.className = 'target';
      img.src = TARGET_IMG;
      img.alt = '';
      img.draggable = false;
      img.style.width = img.style.height = size.toFixed(0) + 'px';
      img.addEventListener('error', () => img.remove());   // pas d'image : on ignore
      targetsEl.appendChild(img);

      const vw = window.innerWidth, vh = window.innerHeight;
      const t = {
        el: img, size: size, mode: 'float',
        x: rand(0, vw - size), y: rand(100, vh - FLOOR_MARGIN - size - 20),
        vx: rand(-0.3, 0.3), vy: rand(-0.3, 0.3),
        rot: rand(0, 360), spin: rand(-0.25, 0.25),
        gx: 0, gy: 0, next: 0, rest: 0
      };
      img.addEventListener('pointerdown', function(e) {
        e.preventDefault();
        const r = img.getBoundingClientRect();
        const off = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);   // -1 (gauche) .. 1 (droite)
        if (t.mode === 'float') {                // 1er clic : elle tombe
          t.mode = 'ball'; t.vy = 0; t.vx *= 0.5; t.rest = 0;
        } else {                                  // clic suivant : jonglage
          t.vy = -TARGET_KICK * rand(0.9, 1.1);
          t.vx = -off * 4 + rand(-1, 1);
          t.spin = -off * 6 + rand(-2, 2);
          t.rest = 0;
        }
      });
      list.push(t);
    }

    let lastTs = 0;
    (function targetsLoop(ts) {
      requestAnimationFrame(targetsLoop);
      const dt = Math.min(3, Math.min(50, ts - (lastTs || ts)) / 16.667 * animK());
      lastTs = ts;
      if (overlayOpen || projectOpen) return;
      const vw = window.innerWidth, vh = window.innerHeight;

      list.forEach(t => {
        const floorY = vh - FLOOR_MARGIN - t.size;

        if (t.mode === 'float') {
          if (ts >= t.next) {
            t.gx = rand(0, vw - t.size);
            t.gy = rand(90, floorY - 10);
            t.next = ts + rand(4000, 9000);
          }
          const dvx = clampT((t.gx - t.x) * 0.004, -0.7, 0.7);
          const dvy = clampT((t.gy - t.y) * 0.004, -0.7, 0.7);
          t.vx += (dvx - t.vx) * 0.02 * dt;
          t.vy += (dvy - t.vy) * 0.02 * dt;
          t.spin += ((t.spin < 0 ? -0.25 : 0.25) - t.spin) * 0.02 * dt;
          t.x += t.vx * dt; t.y += t.vy * dt;
          t.y = clampT(t.y, 80, floorY);
        } else {
          t.vy += TARGET_GRAVITY * dt;
          t.vx *= Math.pow(0.995, dt);
          t.spin *= Math.pow(0.99, dt);
          t.x += t.vx * dt; t.y += t.vy * dt;
          if (t.y >= floorY) {                       // sol : rebond, puis repos
            t.y = floorY;
            t.vy = Math.abs(t.vy) > 1.2 ? -t.vy * TARGET_BOUNCE : 0;
            t.vx *= 0.96;
          }
          if (t.y < 0) { t.y = 0; t.vy = Math.abs(t.vy) * 0.5; }
          if (t.y >= floorY - 0.5 && Math.abs(t.vy) < 0.05) {
            t.rest += 16.667 * dt;
            if (t.rest > TARGET_REST_MS) { t.mode = 'float'; t.vy = -3; t.next = 0; t.rest = 0; }
          } else t.rest = 0;
        }

        if (t.x < 0)             { t.x = 0;             t.vx =  Math.abs(t.vx) * 0.8; }
        if (t.x > vw - t.size)   { t.x = vw - t.size;   t.vx = -Math.abs(t.vx) * 0.8; }
        t.rot += t.spin * dt;
        t.el.style.transform = 'translate3d(' + t.x.toFixed(1) + 'px,' + t.y.toFixed(1) + 'px,0) rotate(' + t.rot.toFixed(1) + 'deg)';
      });
    })(0);
  }

  // =====================
  // HORLOGE
  // =====================
  const clockEl = document.getElementById('clock');
  function updateClock() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    clockEl.textContent = `${h}:${m}`;
  }

  updateClock();
  setInterval(updateClock, 1000);


  // =====================
  // TITRES ACTIFS
  // =====================
  splide.on('move', function(newIndex) {
    currentSlideIdx = newIndex;
    document.querySelectorAll('h1').forEach(function(h1, index) {
      h1.classList.toggle('isactive', index === newIndex);
    });
  });

  const h1s = document.querySelectorAll('h1');
  if (h1s[0]) h1s[0].classList.add('isactive');

  // =====================
  // FOND ANIMÉ — snapshots pré-bakés (allégé sur mobile)
  // =====================
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');

  const RES = lite ? 0.15 : 0.3;

  function resizeCanvas() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = Math.floor(W * RES);
    canvas.height = Math.floor(H * RES);
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    canvas.style.imageRendering = 'auto';
  }

  resizeCanvas();

  const PALETTES = [
    { bg: '#12000a', blobs: ['#8b0030', '#c4002a', '#ff1a3a'] },
    { bg: '#200004', blobs: ['#cc0020', '#ff2200', '#e8003a'] },
    { bg: '#0a0006', blobs: ['#990030', '#cc0040', '#aa0025'] },
    { bg: '#180008', blobs: ['#b50045', '#e8003a', '#cc1100'] },
    { bg: '#040001', blobs: ['#7a0028', '#bb0030', '#dd001a'] },
  ];

  function hexRgb(h) {
    return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  }

  const NUM_SNAPSHOTS = lite ? 4 : 12;
  const snapshots = [];

  function bakeSnapshot(offscreen) {
    const W = offscreen.width, H = offscreen.height;
    const c = offscreen.getContext('2d');
    const pal = PALETTES[Math.floor(Math.random() * PALETTES.length)];

    const [br, bg2, bb] = hexRgb(pal.bg);
    c.fillStyle = `rgb(${br},${bg2},${bb})`;
    c.fillRect(0, 0, W, H);

    const NUM_BLOBS = 7;
    for (let i = 0; i < NUM_BLOBS; i++) {
      const x = ((i % 3) / 3 + Math.random() * 0.33) * W;
      const y = (Math.floor(i / 3) / 3 + Math.random() * 0.33) * H;
      const r = (0.35 + Math.random() * 0.35) * Math.min(W, H);
      const alpha = 0.7 + Math.random() * 0.3;
      const col = hexRgb(pal.blobs[i % 3]);

      const gr = c.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0,    `rgba(${col[0]},${col[1]},${col[2]},${alpha})`);
      gr.addColorStop(0.15, `rgba(${col[0]},${col[1]},${col[2]},${alpha * 0.7})`);
      gr.addColorStop(0.5,  `rgba(${col[0]},${col[1]},${col[2]},${alpha * 0.2})`);
      gr.addColorStop(0.8,  `rgba(${col[0]},${col[1]},${col[2]},${alpha * 0.05})`);
      gr.addColorStop(1,    `rgba(${col[0]},${col[1]},${col[2]},0)`);
      c.fillStyle = gr;
      c.fillRect(0, 0, W, H);
    }

    // grain
    const grainOff = document.createElement('canvas');
    grainOff.width = W; grainOff.height = H;
    const gc = grainOff.getContext('2d');
    const id = gc.createImageData(W, H);
    const d  = id.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255 | 0;
      d[i] = v; d[i+1] = v; d[i+2] = v;
      d[i+3] = Math.random() * 28 | 0;
    }
    gc.putImageData(id, 0, 0);
    c.drawImage(grainOff, 0, 0);

    // vignette
    const vig = c.createRadialGradient(W*.5, H*.5, H*.06, W*.5, H*.5, H*.88);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.75)');
    c.fillStyle = vig;
    c.fillRect(0, 0, W, H);

    // assombrissement général
    c.fillStyle = 'rgba(0,0,0,' + BG_DARKEN + ')';
    c.fillRect(0, 0, W, H);

    return offscreen;
  }

  function bakeAll() {
    const W = canvas.width, H = canvas.height;
    snapshots.length = 0;
    for (let i = 0; i < NUM_SNAPSHOTS; i++) {
      const off = document.createElement('canvas');
      off.width = W; off.height = H;
      snapshots.push(bakeSnapshot(off));
    }
  }

  bakeAll();

  // resize "debounced" (sur mobile la barre d'adresse déclenche beaucoup de resize)
  let lastW = window.innerWidth, resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (overlayOpen) layoutMasonry();
      if (isTouch && window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      resizeCanvas();
      bakeAll();
      drawBg();
    }, 250);
  });

  let snapIdx  = 0;
  let lastSwap = 0;

  // barre : 0..100 -> vitesse mini..maxi (échelle logarithmique), jamais à l'arrêt
  const sliderToSpeed = v => BG_SPEED_MIN * Math.pow(BG_SPEED_MAX / BG_SPEED_MIN, v / 100);
  const speedToSlider = sp => Math.round(100 * Math.log(sp / BG_SPEED_MIN) / Math.log(BG_SPEED_MAX / BG_SPEED_MIN));

  const speedInput  = document.getElementById('bg-speed');
  const bgBarEl     = document.getElementById('bgbar');
  const tickerTrack = document.querySelector('.ticker-track');
  let wasStopped = false;

  // applique la vitesse au bandeau du bas et aux vidéos des slides
  // (le fond et les slides qui flottent lisent bgSpeed à chaque image)
  function applySpeed() {
    const k = animK();
    if (tickerTrack && tickerTrack.getAnimations) {
      tickerTrack.getAnimations().forEach(a => {
        a.playbackRate = Math.max(0.01, k);
        if (k <= 0) a.pause(); else if (a.playState === 'paused') a.play();
      });
    }
    splideVideos.forEach(v => {
      applyVideoRate(v);
      if (k > 0 && wasStopped) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); }
    });
    wasStopped = k <= 0;
  }

  function updateFill() { bgBarEl.style.setProperty('--pct', 'calc(7px + (100% - 14px) * ' + (speedInput.value / 100) + ')'); }

  speedInput.value = speedToSlider(bgSpeed);
  updateFill();
  applySpeed();

  speedInput.addEventListener('input', function() {
    bgSpeed = sliderToSpeed(parseInt(speedInput.value, 10));
    try { localStorage.setItem('bgSpeed', String(bgSpeed)); } catch (err) {}
    updateFill();
    applySpeed();
  });

  // à l'appui : le petit carré devient rouge et la barre se remplit
  speedInput.addEventListener('pointerdown', () => bgBarEl.classList.add('is-pressed'));
  ['pointerup', 'pointercancel'].forEach(ev => window.addEventListener(ev, () => bgBarEl.classList.remove('is-pressed')));

  if (reduceMotion) document.getElementById('bgbar').hidden = true;

  function drawBg() {
    ctx.drawImage(snapshots[snapIdx], 0, 0);
  }

  // On ne redessine que quand l'image du fond change : beaucoup plus léger qu'avant.
  function loop(ts) {
    if (bgSpeed > 0 && !document.hidden && ts - lastSwap >= BG_BASE_INTERVAL / bgSpeed) {
      lastSwap = ts;
      snapIdx = (snapIdx + 1) % snapshots.length;
      drawBg();
    }
    requestAnimationFrame(loop);
  }

  drawBg();
  if (!reduceMotion) requestAnimationFrame(loop); // fond fixe si mouvement réduit

});