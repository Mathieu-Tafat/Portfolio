/* =====================================================================
   TRADUCTIONS (anglais et japonais). Le français est la langue d'origine : ses textes sont
   dans script.js (SLIDE_DATA et UI_FR).

   - ui    : textes de l'interface (boutons, formulaire, étiquettes d'accessibilité…)
   - cats  : catégories, repérées par leur titre FRANÇAIS dans SLIDE_DATA
   - items : projets, repérés par leur "src" dans SLIDE_DATA (le chemin du fichier)
             { caption: "…" (facultatif : sans caption, le titre d'origine est conservé), text: "…" }

   Règle : tout ce qui manque ici s'affiche en français (rien ne casse).
   Les titres d'œuvres créatives (CLEBART, PERDU, Meute, Fine Lame…) sont volontairement
   conservés tels quels ; seuls les intitulés descriptifs sont traduits.
   Pour un nouveau projet : ajouter son "src" dans items.en et items.ja.
   ===================================================================== */
window.I18N = {

  ui: {
    en: {
      introSub: "2d & 3d graphic designer",
      gateLabel: "What's your name?", gatePlaceholder: "Your first name", gateEnter: "Enter", gateSkip: "Skip",
      visitor: "Visitor",
      liteOn: "Accessible version", liteOff: "Full version",
      liteOnTitle: "Plain, easy-to-read version: no animation, more comfortable text",
      liteOffTitle: "Back to the full version (animations and effects)",
      speed: "Animation speed",
      skillsTitle: "Software", skillsRegular: "Used regularly", skillsBasics: "Basic knowledge",
      contactLabel: "Contact",
      formEmail: "Your email", formSubject: "Subject", formMessage: "Your message", formSend: "Send",
      formSending: "Sending…", formOk: "Message sent, thank you!",
      formErr: "Something went wrong. Please try again or email me directly.",
      open: "Open {c}", close: "Close", closeProject: "Close project", prev: "Previous", next: "Next",
      project: "Project", mediaOf: "Media {i} of {n}", textOf: "Text, {i} of {n}", gotoPage: "Go to page {i}",
      navAria: "Main navigation", sectionAria: "Project categories", photoAria: "Photo of Mathieu", clockAria: "Time",
      langAria: "Language",
      perfHint: "The site seems to be running slowly on this device.", perfYes: "Switch to the accessible version", perfNo: "Not now"
    },
    ja: {
      introSub: "2D・3Dグラフィックデザイナー",
      gateLabel: "お名前を教えてください", gatePlaceholder: "お名前", gateEnter: "入る", gateSkip: "スキップ",
      visitor: "ゲスト",
      liteOn: "アクセシブル版", liteOff: "フル版",
      liteOnTitle: "シンプルで読みやすい版:アニメーションなし、文字が読みやすい",
      liteOffTitle: "フル版に戻す(アニメーションと演出あり)",
      speed: "アニメーションの速度",
      skillsTitle: "使用ソフト", skillsRegular: "日常的に使用", skillsBasics: "基礎レベル",
      contactLabel: "お問い合わせ",
      formEmail: "メールアドレス", formSubject: "件名", formMessage: "メッセージ", formSend: "送信",
      formSending: "送信中…", formOk: "送信しました。ありがとうございます。",
      formErr: "エラーが発生しました。もう一度お試しいただくか、メールで直接ご連絡ください。",
      open: "{c}を開く", close: "閉じる", closeProject: "プロジェクトを閉じる", prev: "前へ", next: "次へ",
      project: "プロジェクト", mediaOf: "メディア {i} / {n}", textOf: "テキスト {i} / {n}", gotoPage: "{i}ページ目へ",
      navAria: "メインナビゲーション", sectionAria: "プロジェクトのカテゴリー", photoAria: "Mathieuの写真", clockAria: "時刻",
      langAria: "言語",
      perfHint: "この端末では動作が重いようです。", perfYes: "アクセシブル版に切り替える", perfNo: "あとで"
    }
  },

  cats: {
    en: {
      "Profil": {
        title: "Profile",
        navLabel: "Profile & Contact",
        text: "2D and 3D graphic designer, graduated in 2025 with a professional bachelor's degree (Licence Professionnelle) in Graphic Design. I work across a wide range of fields, from visual identity to editorial design, motion design, 3D animation and video games. I enjoy exploring new techniques and learning the tools that suit each project.\n\nCulture, cinema and video games feed my work, but I also enjoy discovering new universes and stepping out of my habits.\n\nI'm open to projects and collaborations: feel free to get in touch."
      },
      "Service Communication Université Rennes 2": { title: "Rennes 2 University Communications Office", navLabel: "Communications Office", desc: "Adobe suite" },
      "Jeux-vidéo": { title: "Video games", navLabel: "Video games", desc: "Construct 2, Unity" },
      "Edition": { title: "Editorial design", navLabel: "Editorial design", desc: "Elbow grease, Adobe suite" },
      "Animation 2D": { title: "2D animation", navLabel: "2D animation", desc: "Adobe suite" },
      "Animations 3D": { title: "3D animation", navLabel: "3D animation", desc: "Blender, Adobe suite" },
      "Illustrations": { title: "Illustrations", navLabel: "Illustrations", desc: "Oil, watercolor and illustrations" }
    },
    ja: {
      "Profil": {
        title: "プロフィール",
        navLabel: "プロフィール・お問い合わせ",
        text: "2D・3Dグラフィックデザイナー。2025年にグラフィックデザインの職業学士課程(Licence Professionnelle)を修了しました。ビジュアルアイデンティティからエディトリアル、モーションデザイン、3Dアニメーション、ビデオゲームまで、幅広い分野に関心があります。新しい技法を試し、プロジェクトごとに最適なツールを学ぶことが好きです。\n\nカルチャー、映画、ビデオゲームが私の制作の糧になっていますが、新しい世界に触れ、いつもの枠から抜け出すことも好きです。\n\nプロジェクトやコラボレーションを歓迎しています。お気軽にご連絡ください。"
      },
      "Service Communication Université Rennes 2": { title: "レンヌ第2大学 広報課", navLabel: "広報課", desc: "Adobeスイート" },
      "Jeux-vidéo": { title: "ビデオゲーム", navLabel: "ビデオゲーム", desc: "Construct 2、Unity" },
      "Edition": { title: "エディトリアルデザイン", navLabel: "エディトリアル", desc: "手仕事の根気、Adobeスイート" },
      "Animation 2D": { title: "2Dアニメーション", navLabel: "2Dアニメーション", desc: "Adobeスイート" },
      "Animations 3D": { title: "3Dアニメーション", navLabel: "3Dアニメーション", desc: "Blender、Adobeスイート" },
      "Illustrations": { title: "イラストレーション", navLabel: "イラストレーション", desc: "油彩、水彩、イラスト" }
    }
  },

  items: {
    en: {
      /* ---------- Service Communication Université Rennes 2 ---------- */
      "img/stagerennes2/recherche/recherche.png": {
        caption: "Research Day 2025",
        text: "After several years without an edition, Research Day was coming back under the theme “Research in Society”. The brief was to create an identity that makes research more accessible without using the usual scientific codes. I worked on a typographic ligature linking the words, and on a blue background animated by multicolored waves, to evoke the exchanges between research and society. I also set a principle for future editions: renew the typographic work every year while keeping a recognizable identity. I produced the adaptations across different media: posters, social media, slideshow and brochure."
      },
      "img/stagerennes2/campusweek/campus.png": {
        text: "Campus Week is a back-to-school week dedicated to student life at Rennes 2. I wanted to represent this community through a multitude of small characters, inspired by the drawings I used to make when I was younger, living together on the poster. Rather than working around the “Campus Week” banner, a major constraint of the composition, I chose to integrate it into the visual. The project was then adapted across many media: brochure, map, social media, website and goodies."
      },
      "img/stagerennes2/olympe/olymp.png": {
        text: "Starting from the existing logo and an art direction defined with the department's graphic designer, I designed a poster for this student sports event. I went for an aesthetic inspired by the Memphis movement, with simple patterns associated with the different sports and areas dedicated to practical information. I produced a standard poster as well as a version in the tall “pantalon” format (a long, narrow vertical format)."
      },
      "img/stagerennes2/anim.mp4": {
        caption: "SFSIC Conference 2025",
        text: "Animation made for the SFSIC (French Society for Information and Communication Sciences) conference, based on the graphic totems designed by the department's graphic designer. I animated the patterns frame by frame in Illustrator, gradually moving their elements from one frame to the next. An exercise in setting an existing identity in motion, which I would approach differently today, notably with Blender."
      },
      "img/stagerennes2/cartel.png": {
        caption: "SFSIC display labels 2025",
        text: "Design of several label templates to accompany the content presented at the SFSIC conference. The work consisted of taking up the colors, typefaces and totems of the event's identity to create clear, legible materials consistent with the rest of the communication."
      },
      "img/stagerennes2/planegalite.png": {
        caption: "Equality Action Plan 2025–2028",
        text: "Layout of verbatim quotes reporting problematic remarks overheard on campus, as part of Rennes 2's Equality action plan. The aim was to bring out the violence of these words through a dynamic arrangement of the text. I designed the layout structure using a selection of typefaces, while the graphic designer in charge of the document defined the final aesthetic treatment."
      },

      /* ---------- Jeux-vidéo ---------- */
      "img/jeuvideo/MUR.mp4": {
        text: "Developed alongside my dissertation “Barre de vie” (Health Bar), MUR is a 2D platformer that explores the evolution of video game interfaces. Within a single playthrough, the interface transforms and becomes a component of the gameplay. The project questions the place of these elements: how far can an interface be stripped down without losing the information the game needs? Conversely, what happens when it becomes overwhelming? I wanted to make it a testing ground where these extremes can be explored while playing."
      },
      "img/jeuvideo/course.mp4": {
        text: "My first 3D game made with Unity. The player gets up and goes grocery shopping, but meets a character on the way who challenges them. The game then chains together several mini-games built around this everyday situation. The project stayed short and experimental, but allowed me to explore different gameplay ideas and have fun creating original challenges."
      },
      "img/3d/apaisant.mp4": {
        text: "Concept for a 3D main menu for an exploration game with a dark, calm atmosphere. In an environment halfway between forest and abandoned industrial zone, the player has to find a way out after running out of gas. The idea is to create tension through the absence of any visible threat: the sounds of nature, silence and the possibility that something is approaching are enough to plant doubt."
      },
      "img/3d/toisondor.mp4": {
        text: "Concept for a 3D main menu for a game inspired by mythology and sacred places. In a very bright, minimalist and mystical environment, the player's goal would be to retrieve a legendary object by overcoming various trials, through platforming or puzzle mechanics. A soft musical atmosphere, punctuated by strange elements, would disturb this apparent serenity."
      },
      "img/3d/class.mp4": {
        text: "Concept for a 3D main menu for a role-playing game inspired by everyday school life. Behind this familiar appearance, everything seems to work against the character: managing relationships, study time and unforeseen events gradually complicate their progress toward graduating. I imagine a mix of RPG and roguelite in which every choice matters and the obstacles become harder and harder to overcome."
      },
      "img/jeuvideo/pokemon.png": {
        caption: "Alternative Pokémon Emerald identities",
        text: "A personal project imagining two alternative editions of Pokémon Emerald (2004), following the principle of versions of the same game with graphic and thematic differences. Emerald Delta draws on ruins, archaeology and ancient legends, while Emerald Alpha explores a brighter, idealized and almost divine universe. I developed these two directions through box art, cartridges, launch animations and a magazine page inspired by publications of the time."
      },
      "img/jeuvideo/meute.png": {
        text: "A personal grid-based strategy game project. The player controls a family of wolves living in a zoo-sanctuary who are trying to escape it to go on vacation. Each member of the pack has its own characteristics and abilities, which opens up different ways of getting past obstacles and avoiding the guards. I chose a blue and yellow palette, inspired by how wolves see, and explored several game screens as well as a box that I printed and assembled by hand. The project stayed at the experimental stage, with the aim of imagining a strategy game accessible to several people."
      },
      "img/jeuvideo/finelame.mp4": {
        text: "The first version of my final-year project, Fine Lame (“Fine Blade”) was a platformer in which you played a samurai seeking to become the strongest, inspired by the book Musashi. I developed the drawings, the animations, a typeface and a lighting system in Construct 2, with music composed by a friend. Despite the work put into this project, I ultimately chose to move toward a more experimental approach with MUR, more closely tied to my research topic."
      },
      "img/motiondesign/fullanimdelta.mp4": {
        caption: "Pokémon Emerald Delta",
        text: "Launch animation imagined for an alternative edition of Pokémon Emerald (2004). This version explores a universe turned toward ruins, archaeology and ancient legends, with an identity inspired by the remains of a forgotten world."
      },
      "img/motiondesign/pokemon-alpha-maintitle.mp4": {
        caption: "Pokémon Emerald Alpha",
        text: "Launch animation imagined for an alternative edition of Pokémon Emerald (2004). Opposite to Delta, this version explores a bright, idealized aesthetic, between nature, perfection and divine imagery."
      },

      /* ---------- Edition ---------- */
      "img/edition/barre2vie.png": {
        caption: "Barre de vie (Health Bar)",
        text: "Research dissertation on the user interfaces of Japanese video games of the 1980s and 1990s, up to the arrival of 3D. I study their definition, the technical constraints of the time, the typefaces used and the evolution of graphic codes through many games that I played and whose interfaces I analyzed. A case study on The Legend of Zelda series allows me to go deeper into this evolution. I also look at the changes brought by the arrival of 3D and current expectations regarding interfaces, notably through a survey of art students, from bachelor's to master's level, and of teaching staff at Rennes 2. For the publication, I designed a cyan and red duotone and a two-level reading system: the game images are visible at first glance, while the text appears when you lift the right-hand page. I produced a standard version and a hardcover version accompanied by a CD containing emulators and the games tested. A PDF of the dissertation can be provided on request."
      },
      "img/edition/mur.png": {
        caption: "MUR – booklet",
        text: "Booklet designed as a complement to my game MUR, inspired by the booklets that came with Nintendo DS games. I wanted to recapture the pleasure of discovering a game by reading its booklet, presenting how it works, its controls and its universe. I also created the typographic and graphic elements of the document. To stay consistent with the game, the booklet follows the same logic of an evolving interface: the further you go, the less space it takes up."
      },
      "img/edition/lyber.png": {
        text: "Professional bachelor's workshop led with the Luuse collective. Starting from a lyber (a free version of a book distributed online without layout), we had to design an edition using HTML/CSS code. I took care of most of the development, being the most comfortable with code, while taking part in a collective discussion on the art direction and distributing roles within the group. As the book dealt with Emmanuel Macron and his policies, we developed an aesthetic inspired by political communication and by the polarization between right and left."
      },
      "img/edition/reggae.png": {
        caption: "Reggaeton & End of the World",
        text: "Fanzine made as a duo around the theme “Reggaeton & End of the World”, with photocopying and collage constraints. Our approaches were different but complementary: I developed the ideas around the end of the world, while my partner brought more references to reggaeton. The result seeks a balance between these two universes. This project was above all a collaborative experience, which taught me to confront different ideas, to share my doubts and to build a common proposal."
      },
      "img/edition/1173.png": {
        caption: "117³ – Exhibition",
        text: "Poster and communication materials produced as part of a second-year Fine Arts (Licence 2 Arts Plastiques) workshop devoted to curation and the collective exhibition of students' work. Put in charge of the poster after expressing my interest in graphic design, I worked with the group to build a shared proposal. The title 117³ referred to the time spent in our studio over one week, and I chose to represent this number with a photograph of the studio door, emptied of its contents. The very short deadline and the diversity of opinions forced us to make choices in order to reach a coherent composition. I also produced promotional materials, notably a flyer and visuals for social media."
      },
      "img/edition/flipbook/flipe.mp4": {
        text: "Flipbook exploring the evolution of the letter “E” through the main typographic categories. The project led me to design an editorial object that is both sturdy and flexible enough to withstand repeated handling. The main constraint was to ensure that the flipping works properly and that the transformations remain legible. The flipbook was exhibited at the Cabinet du livre d'artiste at Rennes 2."
      },

      /* ---------- Animation 2D ---------- */
      "img/motiondesign/themachinist_final.mp4": {
        text: "Animation inspired by the film The Machinist by Brad Anderson (2004). I wanted to recapture the feeling that something is off, in a dark, nihilistic everyday life where a mysterious presence seems to disrupt the character's life. I drew in particular on the atmosphere of certain scenes from the film, including the bathroom scene, to build a disturbing visual universe."
      },
      "img/motiondesign/load.mp4": {
        text: "Recreation of the loading animation from the EA SPORTS FC games, which I regularly come across while playing. The project was a personal challenge: reproduce this loop while imagining a variant of the logo in a style inspired by retro video games, based on small alternative versions I had already explored."
      },
      "img/motiondesign/crossed.mp4": {
        text: "Fan-made opening titles imagined for Crossed, Karim Debbache's show about video game adaptations in cinema. After rewatching the show, I wanted to offer my own animation around its title. I chose a literal interpretation of the word “Crossed”, without trying to develop any additional meaning, using an existing piece of music that was not composed for this project."
      },

      /* ---------- Animations 3D ---------- */
      "img/3d/clerbar.mp4": {
        text: "My first animation made in Blender. I built a night scene from a few images used as set elements and some lighting work to establish a dark mood, in a corner of a village. The arrival of a character, the “clebard” (French slang for a dog), suddenly breaks this atmosphere and creates a contrast."
      },
      "img/3d/loubart.mp4": {
        text: "In the continuity of CLEBART, this animation plays on the contrast between a disquieting night setting and the unexpected arrival of a character, Loubart. I wanted to recapture this dark, mysterious atmosphere and then defuse it with the appearance of this offbeat element."
      },
      "img/3d/surplace.mp4": {
        text: "Animation built around a contrast between setting and character. I imagined an empty, cold, almost entirely white American diner, before introducing a talking iguana. The gap between the environment and this apparition is the starting point of the scene."
      },
      "img/3d/backroom.mp4": {
        text: "Inspired by the Backrooms, this animation explores an empty, unsettling environment into which I chose to introduce a T-Rex. Rather than making it a threat, I wanted to play on the contrast between the disturbing imagery of the places and the almost harmless presence of the dinosaur."
      },
      "img/3d/chambre.mp4": {
        text: "With this animation, I wanted to go beyond my first first-person scenes by working with several camera angles. Little soldiers prepare their escape, but one of them ends up being considered a deserter. The project plays with the imagery of toys and of films like Toy Story to tell a small story through staging."
      },
      "img/3d/finalmente.mp4": {
        text: "Animation featuring a character who goes grocery shopping in a strange, unsettling universe. They pass through gloomy places and a messy house, without ever seeming to buy anything essential. The contrast between the character's apparent calm and the tense atmosphere of the sets deliberately leaves some uncertainty about what is happening."
      },
      "img/3d/bombe.mp4": {
        text: "3D music video imagined from the track “Bombe” by Yoa. I felt like putting this music into images by taking its lyrics literally. The staging is thus organized around the depiction of a bomb being dropped."
      },
      "img/3d/rue.mp4": {
        text: "3D animation inspired by the track “Un peu de retenue” by Théodort. Rather than directly illustrating the lyrics, I imagined a cold night atmosphere: a street crossed in a loop by a cat, while people can be heard laughing behind the windows. The contrast between the solitary outdoors and the suggested warmth of the interiors gives the scene its atmosphere."
      },
      "img/3d/cuir.mp4": {
        text: "Exploration animation inspired by the Backrooms. The camera advances through empty spaces, forced to follow a path where every corner might be hiding something. Yet nothing appears. I wanted to work on this fear of the unknown and on the absence of a visible threat, letting emptiness and anticipation create the unease."
      },
      "img/3d/foret.mp4": {
        text: "3D exploration of a bright, mystical forest, conceived as a place you would want to wander through. The character gradually picks up objects, as in a survival game or an RPG. My goal was to create a credible, welcoming forest environment, working on atmosphere and the desire to explore."
      },
      "img/3d/electromenager.mp4": {
        text: "Originally, I wanted to recreate the atmosphere of an empty furniture megastore, drawing on my work experience in this kind of store. The project ended up focusing on a single room in which a character wakes up. The mood gradually becomes distressing, without any clear explanation, in the continuity of the strange universe developed in my animation “*”."
      },
      "img/3d/skelet.mp4": {
        text: "Short 3D animation featuring a skeleton juggling with a single ball."
      },
      "img/3d/spider.mp4": {
        text: "Using my own camcorder videos shot in Japan, I wanted to imagine that Spider-Man had invited himself into my travel footage. The project was a technical challenge involving the animation and compositing of a 3D character into live-action footage. Results vary from shot to shot, but overall it allowed me to experiment with integrating a virtual element into filmed images."
      },
      "img/3d/mouche.mp4": {
        text: "Animation following a fly's nighttime journey through a bedroom."
      },

      /* ---------- Illustrations ---------- */
      "img/mechanoid.png": {
        text: "Cover for a track by the composer Papri-K. Digital illustration created from the artist's wishes."
      },
      "img/ctrl.png": {
        text: "Cover for a track by the composer Papri-K. 3D scene rendered like an illustration, created from the artist's wishes."
      },
      "img/avatar.png": {
        text: "Digital illustration based on a scene from the film Avatar: Fire and Ash."
      },
      "img/darthvader.png": {
        text: "Digital illustration based on a scene from the series Obi-Wan Kenobi (Star Wars)."
      },
      "img/aquarelles/1.png": {
        caption: "Normandy watercolors",
        text: "Series of watercolors made from places visited in Normandy. These paintings are a way of keeping a trace of these places and of transcribing their landscapes through color and watercolor."
      },
      "img/aquarelles/video.mp4": {
        caption: "Exhibition",
        text: "One-month solo exhibition of my watercolors, presented in large A3 format at the La Passerelle space in Theix-Noyalo, in June 2024. This project allowed me to present my pictorial work in an exhibition space."
      },
      "img/aquarelles/huile.png": {
        caption: "Oil on canvas",
        text: "Oil painting depicting a landscape. This was my first experiment with this technique, an opportunity to discover the possibilities of oil painting and its different approach to color and texture."
      }
    },

    ja: {
      /* ---------- Service Communication Université Rennes 2 ---------- */
      "img/stagerennes2/recherche/recherche.png": {
        caption: "研究の日 2025",
        text: "数年間開催されていなかった「研究の日」が、「社会の中の研究」をテーマに復活しました。ブリーフは、一般的な科学のコードに頼らず、研究をより身近に感じられるアイデンティティを提案することでした。言葉をつなぐタイポグラフィのリガチャーと、多色の波が揺らめく青い背景をつくり、研究と社会の交流を表現しました。また、次回以降の開催に向けて、毎年タイポグラフィを刷新しながらも、認識しやすいアイデンティティを保つという方針を定めました。ポスター、SNS、スライド、パンフレットなど、さまざまな媒体への展開も担当しました。"
      },
      "img/stagerennes2/campusweek/campus.png": {
        text: "キャンパス・ウィークは、レンヌ第2大学の学生生活に焦点を当てた新学期の1週間です。若い頃に描いていた絵に着想を得た、たくさんの小さなキャラクターがポスターの上で一緒に暮らす姿で、このコミュニティを表現したいと考えました。構図上の大きな制約だった「Campus Week」のバナーを避けるのではなく、ビジュアルの一部として取り込むことにしました。その後、パンフレット、マップ、SNS、ウェブサイト、ノベルティなど、多くの媒体に展開しました。"
      },
      "img/stagerennes2/olympe/olymp.png": {
        text: "既存のロゴと、部署のグラフィックデザイナーと決めたアートディレクションをもとに、この学生スポーツイベントのポスターをデザインしました。メンフィス・グループに着想を得た美学を選び、各競技に結びついたシンプルなパターンと、実用情報のためのスペースを設けました。通常のポスターに加え、縦長の「パンタロン」フォーマット(細長い縦型)の版も制作しました。"
      },
      "img/stagerennes2/anim.mp4": {
        caption: "SFSIC大会 2025",
        text: "部署のグラフィックデザイナーが制作したグラフィックのトーテムをもとに、SFSIC(フランス情報コミュニケーション科学学会)の大会用のアニメーションを制作しました。Illustratorでパターンを1コマずつ動かし、要素を少しずつずらしていきました。既存のアイデンティティに動きを与える試みで、今ならBlenderなど別の方法で取り組むと思います。"
      },
      "img/stagerennes2/cartel.png": {
        caption: "SFSIC 展示ラベル 2025",
        text: "SFSICの大会で発表される内容に添えるラベルのテンプレートを複数デザインしました。イベントのアイデンティティであるカラー、書体、トーテムを取り入れ、読みやすく、コミュニケーション全体と一貫したものに仕上げることが課題でした。"
      },
      "img/stagerennes2/planegalite.png": {
        caption: "平等行動計画 2025–2028",
        text: "レンヌ第2大学の「平等」行動計画の一環として、キャンパス内で耳にした問題のある発言をそのまま記した証言(ヴェルバティム)をレイアウトしました。文字をダイナミックに配置することで、これらの言葉の暴力性を浮かび上がらせることが狙いでした。書体を選んでレイアウトの構造をつくり、最終的なビジュアル処理は文書の担当グラフィックデザイナーが決めました。"
      },

      /* ---------- Jeux-vidéo ---------- */
      "img/jeuvideo/MUR.mp4": {
        text: "研究論文「Barre de vie(ヘルスバー)」と並行して開発した「MUR」は、ビデオゲームのインターフェースの進化を探る2Dプラットフォーマーです。1回のプレイの間にインターフェースが変化し、ゲームプレイの一部になっていきます。このプロジェクトは、これらの要素の位置づけを問いかけます。ゲームに必要な情報を失わずに、インターフェースをどこまで簡素にできるのか。逆に、インターフェースが画面を覆い尽くすとどうなるのか。こうした両極端を、遊びながら試せる実験の場にしたいと考えました。"
      },
      "img/jeuvideo/course.mp4": {
        text: "Unityで制作した初めての3Dゲームです。プレイヤーは起きて買い物に出かけますが、道中で挑戦を仕掛けてくるキャラクターに出会います。そこから、この日常的な状況をもとにしたミニゲームが次々と続きます。短く実験的なままのプロジェクトでしたが、さまざまなゲームプレイのアイデアを試し、ユニークなチャレンジを作る楽しさを味わえました。"
      },
      "img/3d/apaisant.mp4": {
        text: "暗く静かな雰囲気の探索ゲームのための、3Dメインメニューのコンセプトです。森と廃工業地帯の中間のような環境で、ガス欠になったプレイヤーは脱出口を見つけなければなりません。目に見える脅威がないことで緊張感を生み出すのがねらいで、自然の音、静寂、何かが近づいているかもしれない気配だけで、疑念を呼び起こします。"
      },
      "img/3d/toisondor.mp4": {
        text: "神話や聖地に着想を得たゲームのための、3Dメインメニューのコンセプトです。非常に明るく、すっきりとして神秘的な環境で、プレイヤーはプラットフォームや謎解きのメカニクスを通じてさまざまな試練を乗り越え、伝説の品を手に入れることが目的になります。穏やかな音楽に不思議な要素が差し挟まれ、見かけの静けさを乱します。"
      },
      "img/3d/class.mp4": {
        text: "学校生活の日常に着想を得たロールプレイングゲームのための、3Dメインメニューのコンセプトです。見慣れた外見の裏で、すべてが主人公に不利に働いているように見えます。人間関係のやりくり、勉強の時間、予期せぬ出来事が、卒業へ向かう道のりを少しずつ難しくしていきます。RPGとローグライトを組み合わせ、選択のひとつひとつに意味があり、障害がどんどん乗り越えにくくなっていくゲームを思い描いています。"
      },
      "img/jeuvideo/pokemon.png": {
        caption: "ポケモン エメラルド 別バージョンのアイデンティティ",
        text: "『ポケットモンスター エメラルド』(2004年)の別バージョンを2つ想像した個人プロジェクトです。同じゲームの複数バージョンのように、ビジュアルとテーマに違いを持たせています。「エメラルド・デルタ」は遺跡、考古学、古代の伝説に着想を得ており、「エメラルド・アルファ」はより明るく、理想的で、ほとんど神々しい世界を探ります。この2つの方向性を、パッケージ、カートリッジ、起動アニメーション、当時の雑誌に着想を得た誌面で展開しました。"
      },
      "img/jeuvideo/meute.png": {
        text: "グリッド型の戦略ゲームの個人プロジェクトです。プレイヤーは、動物園兼保護施設で暮らすオオカミの家族を操作し、休暇に出かけるためにそこから脱出しようとします。群れの仲間はそれぞれ固有の特徴と能力を持っていて、障害を越え、警備員を避けるためのさまざまな方法を考えることができます。オオカミの視覚に着想を得て青と黄色のパレットを選び、いくつかのゲーム画面と、印刷して手作業で組み立てた箱を制作しました。プロジェクトは実験段階にとどまりましたが、複数人が遊べる戦略ゲームを思い描いていました。"
      },
      "img/jeuvideo/finelame.mp4": {
        text: "卒業制作の最初のバージョンである「Fine Lame」は、最強を目指す侍を操作するプラットフォームゲームで、書籍『Musashi』に着想を得ていました。イラスト、アニメーション、書体、ライティングシステムをConstruct 2で制作し、音楽は友人が作曲してくれました。かなりの時間をかけたものの、最終的には研究テーマとの結びつきが強い、より実験的なアプローチの「MUR」へ方向転換することにしました。"
      },
      "img/motiondesign/fullanimdelta.mp4": {
        caption: "ポケモン エメラルド デルタ",
        text: "『ポケットモンスター エメラルド』(2004年)の別バージョンのために構想した起動アニメーションです。このバージョンは、遺跡、考古学、古代の伝説に向かう世界を描き、忘れ去られた世界の痕跡に着想を得たアイデンティティを持っています。"
      },
      "img/motiondesign/pokemon-alpha-maintitle.mp4": {
        caption: "ポケモン エメラルド アルファ",
        text: "『ポケットモンスター エメラルド』(2004年)の別バージョンのために構想した起動アニメーションです。デルタとは対照的に、このバージョンは自然、完璧さ、神聖なイメージのあいだにある、明るく理想的な美学を探ります。"
      },

      /* ---------- Edition ---------- */
      "img/edition/barre2vie.png": {
        caption: "Barre de vie(ヘルスバー)",
        text: "1980〜90年代の日本のビデオゲームのユーザーインターフェースを、3Dの登場に至るまで扱った研究論文です。インターフェースの定義、当時の技術的制約、使われた書体、グラフィックコードの変遷を、実際に遊んで分析した数多くのゲームを通じて調べました。『ゼルダの伝説』シリーズのケーススタディで、その進化をさらに掘り下げています。3Dの登場による変化や現在のインターフェースに対する期待についても、レンヌ第2大学の美術系学生(学士課程から修士課程まで)と教員を対象にしたアンケートを通じて取り上げました。出版物としては、シアンと赤の2色刷りと、2段階の読書の仕組みを設計しました。ゲームの画像は最初から見え、右ページをめくり上げると文章が現れます。通常版と、検証したエミュレーターとゲームを収めたCD付きのハードカバー版を制作しました。論文のPDFはご要望に応じてお渡しできます。"
      },
      "img/edition/mur.png": {
        caption: "MUR – 冊子",
        text: "自作ゲーム「MUR」の補完として制作した冊子で、ニンテンドーDSのゲームに付属していた説明書に着想を得ています。説明書を読みながらゲームを知っていく楽しさを取り戻したいと考え、ゲームの仕組み、操作方法、世界観を紹介しました。ドキュメントのタイポグラフィとグラフィック要素もすべて制作しています。ゲームとの一貫性を保つため、冊子もインターフェースが進化する同じ考え方に沿っており、読み進めるほど、インターフェースが占めるスペースは小さくなります。"
      },
      "img/edition/lyber.png": {
        text: "職業学士課程のワークショップで、デザイン集団Luuseと共同で行いました。レイアウトされないままオンラインで公開されている、無料版の書籍「lyber」をもとに、HTML/CSSのコーディングで1冊の本を設計するという課題でした。私はコードがいちばん得意だったため開発の大部分を担当し、アートディレクションの議論にも加わり、グループ内の役割分担も行いました。扱った本はエマニュエル・マクロンとその政策についてのものだったため、政治コミュニケーションと、右派・左派の二極化に着想を得た美学を展開しました。"
      },
      "img/edition/reggae.png": {
        caption: "レゲトンと世界の終わり",
        text: "「レゲトンと世界の終わり」をテーマに、2人1組で制作したジン(ファンジン)です。コピー機と切り貼りという制約がありました。私たちのアプローチは違いましたが、補い合うものでした。私は世界の終わりをめぐるアイデアを展開し、相方はレゲトンの参照をより多く持ち込みました。結果は、この2つの世界のバランスを探るものになりました。このプロジェクトは何よりも協働の経験で、異なる考えをぶつけ合うこと、迷いを共有すること、共通の提案を築くことを学びました。"
      },
      "img/edition/1173.png": {
        caption: "117³ – 展覧会",
        text: "美術専攻2年次(Licence 2 Arts Plastiques)のワークショップの一環として制作した、ポスターと広報物です。このワークショップは、学生作品のキュレーションと共同展示をテーマにしていました。グラフィックに関心があると伝えたことでポスターを任され、グループと協力して共通の案をまとめました。タイトルの「117³」は、1週間のあいだアトリエで過ごした時間を指しており、この数字をアトリエの扉の写真(中身を取り去ったもの)で表すことにしました。非常に短い期間と意見の多様さのなかで取捨選択を重ね、一貫した構成にたどり着きました。フライヤーやSNS用のビジュアルなど、プロモーション用のものも制作しました。"
      },
      "img/edition/flipbook/flipe.mp4": {
        text: "さまざまな主要書体分類を通じて、文字「E」の変遷をたどるパラパラ本(フリップブック)です。丈夫でありながら、繰り返し触れても耐えられる柔軟さをもつ出版物を設計することになりました。最大の課題は、ページをめくる動きがきちんと機能し、変化が読み取れることを保証することでした。このフリップブックは、レンヌ第2大学のアーティストブック・キャビネット(Cabinet du livre d'artiste)で展示されました。"
      },

      /* ---------- Animation 2D ---------- */
      "img/motiondesign/themachinist_final.mp4": {
        text: "ブラッド・アンダーソン監督の映画『マシニスト』(2004年)に着想を得たアニメーションです。暗くニヒリスティックな日常のなかで、謎めいた存在が主人公の生活を乱しているかのような、「何かがおかしい」という感覚を再現したいと思いました。浴室のシーンをはじめ、映画のいくつかの場面の雰囲気を参考にして、不穏なビジュアルの世界を築きました。"
      },
      "img/motiondesign/load.mp4": {
        text: "プレイ中によく目にするEA SPORTS FCシリーズのローディングアニメーションを再現しました。個人的なチャレンジとして、このループを再現しつつ、すでに試していた小さな別バージョンをもとに、レトロなビデオゲームに着想を得たスタイルのロゴの派生版も考えました。"
      },
      "img/motiondesign/crossed.mp4": {
        text: "映画化されたビデオゲームを扱うKarim Debbacheの番組「Crossed」のために、ファンとして構想したオープニングです。番組を見直したあと、そのタイトルをもとに自分なりのアニメーションを提案したくなりました。「Crossed」という言葉を文字どおりに解釈し、それ以上の意味づけはあえてせず、このプロジェクトのために作られたものではない既存の楽曲を使いました。"
      },

      /* ---------- Animations 3D ---------- */
      "img/3d/clerbar.mp4": {
        text: "Blenderで制作した最初のアニメーションです。いくつかの画像を背景要素として使い、ライティングを工夫して、村の片隅の暗い雰囲気をつくった夜のシーンを構築しました。「clebard」(フランス語の俗語で犬)というキャラクターの登場が、この空気を突然破り、ずれを生み出します。"
      },
      "img/3d/loubart.mp4": {
        text: "「CLEBART」の流れをくむこのアニメーションは、不穏な夜の舞台と、思いがけず現れるキャラクター「Loubart」との対比で遊んでいます。暗く謎めいた雰囲気をもう一度つくり、その上で、ずれた存在の登場によって空気をほぐしたいと考えました。"
      },
      "img/3d/surplace.mp4": {
        text: "舞台とキャラクターの対比を軸に構成したアニメーションです。誰もおらず、冷たく、ほとんど真っ白なアメリカンダイナーを想像し、そこに話すイグアナを登場させました。この環境と存在とのずれが、シーンの出発点になっています。"
      },
      "img/3d/backroom.mp4": {
        text: "バックルーム(Backrooms)に着想を得たこのアニメーションは、何もなく落ち着かない空間を描き、そこにT-レックスを登場させています。T-レックスを脅威にするのではなく、場所の不気味なイメージと、ほとんど無害に見える恐竜の存在との対比で遊びたいと考えました。"
      },
      "img/3d/chambre.mp4": {
        text: "このアニメーションでは、最初のころの主観視点のシーンから一歩進んで、複数のカメラアングルに取り組みました。小さな兵隊たちが脱走の準備をしますが、そのうちの1人は最後に脱走兵と見なされます。おもちゃや『トイ・ストーリー』のような映画のイメージを借りて、演出を通じてささやかな物語を語っています。"
      },
      "img/3d/finalmente.mp4": {
        text: "奇妙で落ち着かない世界へ買い物に出かけるキャラクターを描いたアニメーションです。陰鬱な場所や散らかった家を通り抜けますが、必要なものを買っている様子はまったくありません。キャラクターの見かけの落ち着きと、舞台の張りつめた空気との対比によって、何が起きているのかについて、あえてあいまいさを残しています。"
      },
      "img/3d/bombe.mp4": {
        text: "Yoaの楽曲「Bombe」から着想した3Dのミュージックビデオです。歌詞を文字どおりに映像化して、この曲に映像をつけたいと思いました。そのため演出は、爆弾の投下を描くことを軸に組み立てられています。"
      },
      "img/3d/rue.mp4": {
        text: "Théodortの楽曲「Un peu de retenue」に着想を得た3Dアニメーションです。歌詞をそのまま描くのではなく、冷たい夜の雰囲気を思い描きました。1匹の猫が通りをぐるぐると横切り、窓の向こうからは人々の笑い声が聞こえてきます。孤独な屋外と、ほのめかされる室内の温かさとの対比が、シーンの空気をつくっています。"
      },
      "img/3d/cuir.mp4": {
        text: "バックルームに着想を得た探索型のアニメーションです。カメラは何もない空間を進み、どの曲がり角にも何かが潜んでいるかもしれない道を、決められたとおりにたどります。それでも、何も現れません。未知への恐怖と、目に見える脅威がないことを扱い、空虚さと予感が不安を生み出すようにしたいと考えました。"
      },
      "img/3d/foret.mp4": {
        text: "思わず歩いてみたくなる場所として構想した、明るく神秘的な森の3D探索です。キャラクターは、サバイバルゲームやRPGのように、少しずつアイテムを拾っていきます。雰囲気と探索したくなる気持ちに意識を向けながら、説得力があって居心地のよい森の環境をつくることが目標でした。"
      },
      "img/3d/electromenager.mp4": {
        text: "もともとは、この種の店で働いた経験をもとに、誰もいない大型家具店の雰囲気を再現したいと思っていました。プロジェクトは最終的に、キャラクターが目を覚ます1つの部屋に絞られました。はっきりした説明のないまま、雰囲気は少しずつ不安なものになっていきます。アニメーション「*」で築いた奇妙な世界の延長線上にあります。"
      },
      "img/3d/skelet.mp4": {
        text: "1つのボールでジャグリングをする骸骨を描いた、短い3Dアニメーションです。"
      },
      "img/3d/spider.mp4": {
        text: "日本で自分が撮影したビデオカメラの映像に、スパイダーマンが紛れ込んだら、という発想から始めました。3Dキャラクターのアニメーションと、実写映像への合成に取り組む技術的なチャレンジでした。ショットによって仕上がりに差はありますが、全体として、仮想の要素を撮影した映像に組み込む実験ができました。"
      },
      "img/3d/mouche.mp4": {
        text: "寝室の中を飛ぶハエの夜の旅を追ったアニメーションです。"
      },

      /* ---------- Illustrations ---------- */
      "img/mechanoid.png": {
        text: "作曲家Papri-Kの楽曲のカバーです。アーティストの要望をもとに制作したデジタルイラストです。"
      },
      "img/ctrl.png": {
        text: "作曲家Papri-Kの楽曲のカバーです。イラストのように仕上げた3Dシーンで、アーティストの要望をもとに制作しました。"
      },
      "img/avatar.png": {
        text: "映画『アバター:ファイヤー・アンド・アッシュ』の一場面をもとにしたデジタルイラストです。"
      },
      "img/darthvader.png": {
        text: "シリーズ『オビ=ワン・ケノービ』(スター・ウォーズ)の一場面をもとにしたデジタルイラストです。"
      },
      "img/aquarelles/1.png": {
        caption: "ノルマンディーの水彩画",
        text: "ノルマンディーで訪れた場所をもとに描いた水彩画のシリーズです。これらの絵は、そうした場所の記憶をとどめ、色と水彩によってその風景を写し取る手段になっています。"
      },
      "img/aquarelles/video.mp4": {
        caption: "展覧会",
        text: "2024年6月、テクス=ノワイヤロ(Theix-Noyalo)の「ラ・パスレル(La Passerelle)」で、水彩画を大判のA3サイズで展示した1か月間の個展です。このプロジェクトによって、絵画作品を展示空間で見せることができました。"
      },
      "img/aquarelles/huile.png": {
        caption: "キャンバスに油彩",
        text: "風景を描いた油彩画です。この技法を初めて試したもので、油彩の可能性と、色や質感に対する異なるアプローチを知る機会になりました。"
      }
    }
  }
};