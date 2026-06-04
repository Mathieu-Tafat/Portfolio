document.addEventListener('DOMContentLoaded', function () {

  // =====================
  // INTRO
  // =====================
  const intro = document.createElement('div');
  intro.id = 'intro';
  intro.innerHTML = '<span id="intro-name">Mathieu Tafat</span>';
  document.body.appendChild(intro);

  const splideElIntro = document.querySelector('.splide');
  const topbarIntro   = document.getElementById('topbar');
  if (splideElIntro) splideElIntro.style.opacity = '0';
  if (topbarIntro)   topbarIntro.style.opacity   = '0';

  setTimeout(() => { intro.classList.add('intro-visible'); }, 100);
  setTimeout(() => {
    intro.classList.add('intro-out');
    if (splideElIntro) { splideElIntro.style.transition = 'opacity 0.8s ease'; splideElIntro.style.opacity = '1'; }
    if (topbarIntro)   { topbarIntro.style.transition   = 'opacity 0.8s ease'; topbarIntro.style.opacity   = '1'; }
  }, 2200);
  setTimeout(() => { intro.remove(); }, 3200);

  // =====================
  // SPLIDE INIT
  // =====================
  var splide = new Splide('.splide', {
    type: 'slide',
    perPage: 6,
    focus: '0',
    gap: '-4.7em',
    fixedWidth: '17em',
    fixedHeight: '22em',
    keyboard: false,
    drag: false,
    speed: 120,
  }).mount();

  // =====================
  // BOUTON START
  // =====================
  const btnStart = document.createElement('div');
  btnStart.id = 'btn-start';
  btnStart.textContent = 'Start';

  function attacherStart() {
    const activeSlide = document.querySelector('.splide__slide.is-active');
    if (!activeSlide) return;
    if (btnStart.parentElement) btnStart.parentElement.removeChild(btnStart);
    activeSlide.appendChild(btnStart);
  }
  attacherStart();
  splide.on('move', function() { setTimeout(attacherStart, 10); });

  // =====================
  // DONNÉES PAR SLIDE
  // =====================
  const SLIDE_DATA = [
    {
      title: "Profil",
      profile: true,
      text: "Créer, c'est tout ce qui m'importe. Diplômé en 2025 d'une Licence Professionnelle de Design Graphique, le contexte professionnel est pour moi une excuse de plus pour faire ce que je ferais de toute façon : construire des choses, peu importe le médium.Proposez-moi un moyen de créer. Je suis partant. "
    },
    {
      title: "Service Communication Université Rennes 2",
      desc: "Suite Adobe",
      images: [
        { src: "img/stagerennes2/recherche/recherche.png", caption: "Journée de la Recherche 2025", text: "La Journée de la recherche est un événement annuel réunissant plusieurs champs disciplinaires autour d'un thème commun, ici la reconnexion entre la recherche et la société." },
        { src: "img/stagerennes2/campusweek/campus.png",   caption: "Campus Week 2025",             text: "Chaque année, l'université Rennes 2 organise une semaine de rentrée dédiée à l'accueil des étudiants, mêlant activités, stands d'information et temps festifs." },
        { src: "img/stagerennes2/olympe/olymp.png",        caption: "Olymp'in Fac 2025",            text: "Réalisation d'une affiche pour un événement de sport étudiant, dans la continuité de l'identité visuelle engagée avec le logo." },
        { src: "img/stagerennes2/anim.mp4",                caption: "Congrès SFSIC 2025",           text: "Animation faite pour un évènement de l'université." },
        { src: "img/stagerennes2/cartel.png",              caption: "Cartels SFSIC 2025",            text: "Gabarit pour les Cartels pour le congrès." },
        { src: "img/stagerennes2/planegalite.png",         caption: "Plan Action Egalité 2025-2028", text: "Mise en page des verbatims du plan, coloré par un graphiste du service." }
      ]
    },
    {
      title: "Edition",
      desc: "Huile de coude, suite Adobe",
      images: [
        { src: "img/edition/barre2vie.png",      caption: "Barre de vie",             text: "Exploration du design d'interface utilisateur dans les jeux vidéo japonais des années 1980 et 1990, jusqu'à l'arrivée de la 3D." },
        { src: "img/edition/mur.png",            caption: "MUR - livret",             text: "En complément d'un jeu-vidéo que j'ai développé nommé 'MUR', j'ai réalisé un livret de jeu." },
        { src: "img/edition/lyber.png",          caption: "Lyber & CSS",              text: "Projet de groupe mené en workshop avec le collectif Luuse, consistant à repenser la mise en page d'un lyber en HTML/CSS." },
        { src: "img/edition/reggae.png",         caption: "Reggaeton & Fin du Monde", text: "Fanzine réalisé en duo à partir d'un thème et de contraintes techniques, photocopie et collage." },
        { src: "img/edition/1173.png",           caption: "117³ - Exposition",        text: "Création d'une affiche d'exposition mêlant travail typographique, traitement d'image et composition graphique." },
        { src: "img/edition/flipbook/flipe.mp4", caption: "E - Flipbook",             text: "Flipbook consacré à la lettre e, explorée à travers différents styles typographiques, exposé au Cabinet du livre d'artiste de Rennes 2." }
      ]
    },
    {
      title: "Animation 2D",
      desc: "Suite Adobe",
      images: [
        { src: "img/motiondesign/themachinist_final.mp4",      caption: "The Machinist",          text: "Inspirée par le film The Machinist de Brad Anderson, 2004." },
        { src: "img/motiondesign/fullanimdelta.mp4",           caption: "Pokemon Emeraude Delta", text: "Animation de lancement d'une version alternative du jeu original Pokemon Emeraude de 2004." },
        { src: "img/motiondesign/pokemon-alpha-maintitle.mp4", caption: "Pokemon Emeraude Alpha", text: "Animation de lancement d'une version alternative du jeu original Pokemon Emeraude de 2004." },
        { src: "img/motiondesign/load.mp4",                    caption: "FC Loading",             text: "Recréation de la loop de chargement des derniers jeux EA FC, avec une version alternative." },
        { src: "img/motiondesign/crossed.mp4",                 caption: "Crossed",                text: "Générique du programme Crossed de Karim Debbache de 2013, création de fan." }
      ]
    },
    {
      title: "Animations 3D",
      desc: "Blender, Suite Adobe",
      images: [
        { src: "img/3d/clerbar.mp4",   caption: "CLEBART",                 text: "" },
        { src: "img/3d/loubart.mp4",   caption: "LOUBART",                 text: "" },
        { src: "img/3d/surplace.mp4",  caption: "SUR PLACE OU A EMPORTER", text: "", vertical: true },
        { src: "img/3d/bombe.mp4",     caption: "BOMBE",                   text: "Inspirée par la musique 'Bombe' de Yoa de l'album 'La Favorite.'" },
        { src: "img/3d/chambre.mp4",   caption: "DESERTEUR",               text: "" },
        { src: "img/3d/backroom.mp4",  caption: "PERDU",                   text: "" }
      ]
    },
    {
      title: "Jeux-vidéo",
      desc: "Construct 2, Unity",
      images: [
        { src: "img/jeuvideo/MUR.mp4",      caption: "MUR",                                   text: "Projet de diplôme dans lequel le joueur doit finir un niveau de plateforme en s'adaptant aux changements d'interfaces. Celles-ci suivent l'évolution des interfaces et évoluent au cours du temps." },
        { src: "img/jeuvideo/course.mp4",   caption: "-faire les courses",                    text: "Prototype de jeu où le joueur doit faire face à une série de défis." },
        { src: "img/jeuvideo/pokemon.png",  caption: "Identité Pokemon Emeraude alternatifs",  text: "Création d'une petite identité pour des jeux alternatifs à Pokemon Emeraude de 2004." },
        { src: "img/jeuvideo/meute.png",    caption: "Meute",                                  text: "Prototype de jeu de stratégie en grille, dans lequel il faut guider une famille de loups pour s'échapper d'un zoo." },
        { src: "img/jeuvideo/finelame.mp4", caption: "Fine Lame",                              text: "Première version de mon projet de diplôme, plus axé action plateforme, qui est donc resté au stade de brouillon." }
      ]
    },
    {
      title: "Peintures",
      desc: "Huile, aquarelle",
      images: [
        { src: "img/aquarelles/1.png",     caption: "Aquarelles Normandes", text: "" },
        { src: "img/aquarelles/video.mp4", caption: "Exposition",           text: "Mes aquarelles ont été exposées à l'espace la Passerelle de Theix-Noyalo en juin 2024.", vertical: true },
        { src: "img/aquarelles/huile.png", caption: "Huile sur toile",      text: "" }
      ]
    }
  ];

  const COLS = 3;

  // =====================
  // STATE
  // =====================
  let overlayOpen      = false;
  let currentSlideIdx  = 0;
  let gridFocusIdx     = 0;
  let textVisible      = false;
  let currentData      = null;
  let activeAudioVideo = null;

  const overlay        = document.getElementById("overlay");
  const overlayContent = document.getElementById("overlay-content");
  const overlayHint    = document.getElementById("overlay-hint");
  const splideEl       = document.querySelector(".splide");

  // =====================
  // COUPER TOUS LES SONS
  // =====================
  function muteAll() {
    overlayContent.querySelectorAll('video').forEach(v => { v.muted = true; });
    activeAudioVideo = null;
  }

  // =====================
  // ACTIVER LE SON D'UNE VIDÉO (coupe les autres)
  // =====================
  function toggleVideoSound(video) {
    if (!video) return;
    if (activeAudioVideo && activeAudioVideo !== video) {
      activeAudioVideo.muted = true;
    }
    if (video.muted) {
      video.muted = false;
      video.currentTime = 0;
      video.play();
      activeAudioVideo = video;
    } else {
      video.muted = true;
      activeAudioVideo = null;
    }
  }

  // =====================
  // HOVER SLIDES → sélection
  // =====================
  let hoverTimeout = null;

  document.querySelector('.splide__list').addEventListener('mouseover', function(e) {
    if (overlayOpen) return;
    const slide = e.target.closest('.splide__slide');
    if (!slide) return;
    const slides = Array.from(document.querySelectorAll('.splide__slide'));
    const idx = slides.indexOf(slide);
    if (idx === -1 || idx === currentSlideIdx) return;
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => { splide.go(idx); }, 0);
  });

  // =====================
  // HOVER CELLULE → focus
  // =====================
  function attachCellHover(cell) {
    cell.addEventListener('mouseenter', function() {
      if (cell.classList.contains('og-cell--text')) return;
      const idx = parseInt(cell.dataset.index);
      if (isNaN(idx)) return;
      gridFocusIdx = idx;
      updateFocusClass();
    });
  }

  // =====================
  // CELL HTML helper
  // =====================
  function cellHTML(img) {
    const isVideo = /\.(mp4|webm|ogg)$/i.test(img.src);
    if (isVideo) {
      return `<video src="${img.src}" class="og-img" autoplay loop muted playsinline></video>
              <div class="og-cell-label">${img.caption}</div>
              <div class="og-cell-dim"></div>`;
    }
    return `<img src="${img.src}" alt="${img.caption}" class="og-img" />
            <div class="og-cell-label">${img.caption}</div>
            <div class="og-cell-dim"></div>`;
  }

  // =====================
  // BUILD PROFILE (slide 0)
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
      <div class="og-header">${data.title}</div>
      <div class="og-profile">
        <div class="og-profile-text">
          ${paragraphs}
          <div class="og-profile-contact">
            <span class="og-profile-contact-label">Contact</span>
            <a href="mailto:contact.tmdesignstudio@gmail.com">contact.tmdesignstudio@gmail.com</a>
            <a href="https://fr.linkedin.com/in/mathieu-tafat-031518261" target="_blank">LinkedIn</a>
          </div>
        </div>
      </div>
    `;
  }

  // =====================
  // BUILD GRID
  // =====================
  function buildGrid(slideIdx) {
    const data = SLIDE_DATA[slideIdx];
    if (!data) return;
    currentData      = data;
    gridFocusIdx     = 0;
    textVisible      = false;
    activeAudioVideo = null;

    let html = `<div class="og-header">${data.title}</div>`;
    if (data.desc) html += `<div class="og-desc">${data.desc}</div>`;
    html += `<div class="og-grid" id="og-grid">`;
    data.images.forEach((img, i) => {
      html += `<div class="og-cell" data-index="${i}">${cellHTML(img)}</div>`;
    });
    html += `</div>`;
    overlayContent.innerHTML = html;

    updateFocusClass();

    overlayContent.querySelectorAll('.og-cell').forEach(cell => {
      attachCellHover(cell);
    });

    document.getElementById('og-grid').addEventListener('click', function(e) {
      const cell = e.target.closest('.og-cell');
      if (!cell) return;
      if (cell.classList.contains('og-cell--text')) return;
      const idx = parseInt(cell.dataset.index);

      if (idx === gridFocusIdx) {
        const video = cell.querySelector('video');
        if (video) toggleVideoSound(video);
        toggleText();
      } else {
        moveFocusTo(idx);
      }
    });

    overlayContent.addEventListener('mouseleave', function(e) {
      const cell = e.target.closest && e.target.closest('.og-cell--text');
      if (!cell) return;
      hideText(false);
    }, true);
  }

  // =====================
  // NAVIGATION GRILLE
  // =====================
  function moveFocusTo(newIdx) {
    const total = currentData.images.length;
    if (newIdx < 0 || newIdx >= total) return;
    if (textVisible) hideText(true);
    gridFocusIdx = newIdx;
    textVisible  = false;
    updateFocusClass();
  }

  function updateFocusClass() {
    const cells = overlayContent.querySelectorAll('.og-cell');
    cells.forEach((cell, i) => {
      cell.classList.toggle('og-cell--focused', i === gridFocusIdx);
    });
  }

  // =====================
  // AFFICHER / MASQUER TEXTE
  // =====================
  function toggleText() {
    if (textVisible) hideText(false);
    else             showText();
  }

  function showText() {
    const data      = currentData;
    const idx       = gridFocusIdx;
    const cells     = overlayContent.querySelectorAll('.og-cell');
    const isLastCol = (idx % COLS) === (COLS - 1);
    let textIdx     = isLastCol ? idx - 1 : idx + 1;

    // Ligne incomplète : cellule de droite inexistante → on prend celle de gauche
    if (textIdx >= cells.length) textIdx = idx - 1;
    if (textIdx < 0) return;

    const imageText = data.images[idx].text || '';
    const textCell  = cells[textIdx];

    textCell.classList.add('og-cell--text');
    textCell.dataset.textfor = idx;
    textCell.innerHTML = `
      <div class="og-text-inner">
        <div class="og-text-caption">${data.images[idx].caption}</div>
        <p class="og-text-body">${imageText}</p>
      </div>`;

    requestAnimationFrame(() => textCell.classList.add('og-cell--text-visible'));
    textVisible = true;

    textCell.addEventListener('mouseleave', function onLeave() {
      textCell.removeEventListener('mouseleave', onLeave);
      hideText(false);
    });
  }

  function hideText(silent) {
    const textCell = overlayContent.querySelector('.og-cell--text');
    if (!textCell) { textVisible = false; return; }
    textCell.classList.remove('og-cell--text-visible');
    setTimeout(() => {
      const i = parseInt(textCell.dataset.index);
      textCell.classList.remove('og-cell--text');
      delete textCell.dataset.textfor;
      if (currentData && currentData.images[i]) {
        textCell.innerHTML = cellHTML(currentData.images[i]);
        attachCellHover(textCell);
      }
      textVisible = false;
      if (!silent) updateFocusClass();
    }, 280);
  }

  // =====================
  // OPEN OVERLAY
  // =====================
  function openOverlay() {
    overlayOpen = true;
    overlay.style.display = "block";
    splideEl.classList.add("hidden");
    if (currentSlideIdx === 0) buildProfile();
    else                       buildGrid(currentSlideIdx);
    setTimeout(() => {
      overlay.classList.add("show");
      overlayHint.classList.add("show");
    }, 10);
  }

  // =====================
  // CLOSE OVERLAY
  // =====================
  function closeOverlayFn() {
    muteAll();
    overlayOpen = false;
    overlay.classList.remove("show");
    overlayHint.classList.remove("show");
    splideEl.classList.remove("hidden");
    setTimeout(() => { overlay.style.display = "none"; }, 400);
  }

  overlayHint.addEventListener("click", closeOverlayFn);

  // =====================
  // CLIC SUR SLIDE (image ou btn-start) → OUVRE L'OVERLAY
  // =====================
  document.querySelector('.splide__list').addEventListener('click', function(e) {
    if (overlayOpen) return;
    const slide = e.target.closest('.splide__slide');
    if (!slide || !slide.classList.contains('is-active')) return;
    // Clic sur le btn-start OU directement sur le slide (image)
    openOverlay();
  });

  // =====================
  // CLAVIER
  // =====================
  document.addEventListener("keydown", function(e) {
    if (overlayOpen) {
      e.preventDefault();

      if (e.code === "Escape") {
        if (textVisible) hideText(false);
        else             closeOverlayFn();
        return;
      }

      if (!currentData) return;
      const total = currentData.images.length;

      if (e.code === "ArrowRight") {
        const next = gridFocusIdx + 1;
        if (next < total) {
          if (textVisible) hideText(true);
          setTimeout(() => { gridFocusIdx = next; textVisible = false; updateFocusClass(); }, textVisible ? 290 : 0);
        }
      }
      if (e.code === "ArrowLeft") {
        const prev = gridFocusIdx - 1;
        if (prev >= 0) {
          if (textVisible) hideText(true);
          setTimeout(() => { gridFocusIdx = prev; textVisible = false; updateFocusClass(); }, textVisible ? 290 : 0);
        }
      }
      if (e.code === "ArrowDown") {
        const next = gridFocusIdx + COLS;
        if (next < total) {
          if (textVisible) hideText(true);
          setTimeout(() => { gridFocusIdx = next; textVisible = false; updateFocusClass(); }, textVisible ? 290 : 0);
        }
      }
      if (e.code === "ArrowUp") {
        const prev = gridFocusIdx - COLS;
        if (prev >= 0) {
          if (textVisible) hideText(true);
          setTimeout(() => { gridFocusIdx = prev; textVisible = false; updateFocusClass(); }, textVisible ? 290 : 0);
        }
      }

      if (e.code === "Space" || e.code === "Enter" || e.code === "KeyE") {
        const focusedCell = overlayContent.querySelector('.og-cell--focused');
        const video = focusedCell ? focusedCell.querySelector('video') : null;
        if (video) toggleVideoSound(video);
        toggleText();
      }

      return;
    }

    if (e.code === "ArrowRight") splide.go('>');
    if (e.code === "ArrowLeft")  splide.go('<');
    if (e.code === "Space" || e.code === "Enter" || e.code === "KeyE") {
      e.preventDefault();
      openOverlay();
    }
  });

  // =====================
  // HORLOGE
  // =====================
  function updateClock() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    $('#clock').text(`${h}:${m}`);
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
  // FOND ANIMÉ
  // =====================
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const LAYERS = [
    { amp: 45, freq: 0.007, speed: 0.0028, y: 0.52, color: 'rgba(160,0,0,',   alpha: 0.60 },
    { amp: 30, freq: 0.011, speed: 0.0018, y: 0.60, color: 'rgba(210,15,15,', alpha: 0.45 },
    { amp: 22, freq: 0.009, speed: 0.0022, y: 0.68, color: 'rgba(240,35,35,', alpha: 0.35 },
    { amp: 38, freq: 0.005, speed: 0.0014, y: 0.42, color: 'rgba(120,0,0,',   alpha: 0.55 },
    { amp: 18, freq: 0.014, speed: 0.0032, y: 0.74, color: 'rgba(255,70,70,', alpha: 0.22 },
    { amp: 50, freq: 0.004, speed: 0.0010, y: 0.34, color: 'rgba(90,0,0,',    alpha: 0.65 },
  ];

  let t = 0;

  function drawBg() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,   '#5a0000');
    grad.addColorStop(0.5, '#350000');
    grad.addColorStop(1,   '#160000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < 3; i++) {
      const gx = ctx.createRadialGradient(W*(0.2+i*0.3), H*0.3, 0, W*(0.2+i*0.3), H*0.3, 180);
      gx.addColorStop(0, 'rgba(255,50,50,0.06)');
      gx.addColorStop(1, 'rgba(255,0,0,0)');
      ctx.fillStyle = gx;
      ctx.fillRect(0, 0, W, H);
    }

    LAYERS.forEach(l => {
      ctx.beginPath();
      const baseY = l.y * H;
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 3) {
        const y = baseY
          + Math.sin(x * l.freq + t * l.speed * 60) * l.amp
          + Math.sin(x * l.freq * 1.6 + t * l.speed * 35 + 2.1) * l.amp * 0.35
          + Math.sin(x * l.freq * 0.5 + t * l.speed * 20 + 0.8) * l.amp * 0.2;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = l.color + l.alpha + ')';
      ctx.fill();
    });

    LAYERS.slice(0, 4).forEach(l => {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 3) {
        const y = l.y * H
          + Math.sin(x * l.freq + t * l.speed * 60) * l.amp
          + Math.sin(x * l.freq * 1.6 + t * l.speed * 35 + 2.1) * l.amp * 0.35
          + Math.sin(x * l.freq * 0.5 + t * l.speed * 20 + 0.8) * l.amp * 0.2;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255,100,100,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    t += 0.016;
    requestAnimationFrame(drawBg);
  }

  drawBg();

});