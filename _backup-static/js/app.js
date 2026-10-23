/* ============================================================
   UÑAS MAR — APP PRINCIPAL
   (loader, scroll suave, animaciones, navegación, contenido dinámico)
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = window.matchMedia("(pointer: fine)").matches;
  const HAS_GSAP = typeof gsap !== "undefined";
  const HAS_ST = typeof ScrollTrigger !== "undefined";
  const HAS_LENIS = typeof Lenis !== "undefined";

  if (HAS_GSAP && HAS_ST) gsap.registerPlugin(ScrollTrigger);

  const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  /* ------------------------------------------------------------
     ARTE DE UÑAS (SVG)
     ------------------------------------------------------------ */
  const NAIL_PATHS = {
    almendrada: "M32,186 C28,142 24,95 24,66 C24,42 40,20 60,8 C80,20 96,42 96,66 C96,95 92,142 88,186 C83,194 37,194 32,186 Z",
    coffin: "M30,186 C27,140 24,92 24,64 C24,50 30,40 38,36 L82,36 C90,40 96,50 96,64 C96,92 93,140 90,186 C85,194 35,194 30,186 Z",
    stiletto: "M32,186 C28,142 26,100 30,70 C34,44 46,20 60,4 C74,20 86,44 90,70 C94,100 92,142 88,186 C83,194 37,194 32,186 Z",
    oval: "M32,186 C28,140 24,94 24,64 C24,40 40,22 60,14 C80,22 96,40 96,64 C96,94 92,140 88,186 C83,194 37,194 32,186 Z",
    cuadrada: "M30,186 C26,140 22,90 22,58 C22,44 30,34 44,32 L76,32 C90,34 98,44 98,58 C98,90 94,140 90,186 C85,194 35,194 30,186 Z"
  };

  function nailSvg(shape, color, acabado, uid) {
    const d = NAIL_PATHS[shape] || NAIL_PATHS.almendrada;
    const gloss =
      '<path fill="#ffffff" opacity="' + (acabado === "mate" ? ".18" : ".42") +
      '" d="M40,170 C37,130 34,95 36,72 C38,54 46,38 56,30 C48,52 46,92 48,130 C49,150 51,164 53,172 C48,176 43,175 40,170 Z"/>';

    let defs = "";
    let base = '<path fill="' + color + '" d="' + d + '"/>';

    if (acabado === "chrome") {
      const gid = "ach-" + uid;
      defs =
        '<linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="#ffffff"/>' +
        '<stop offset="24%" stop-color="' + color + '"/>' +
        '<stop offset="46%" stop-color="#ffffff"/>' +
        '<stop offset="70%" stop-color="' + color + '"/>' +
        '<stop offset="100%" stop-color="#f3e6ff"/>' +
        "</linearGradient>";
      base = '<path fill="url(#' + gid + ')" d="' + d + '"/>';
    }

    if (acabado === "glitter") {
      const gid = "agl-" + uid;
      const cid = "acl-" + uid;
      defs +=
        '<pattern id="' + gid + '" width="18" height="18" patternUnits="userSpaceOnUse">' +
        '<circle cx="4" cy="4" r="1.7" fill="#ffffff" opacity=".95"/>' +
        '<circle cx="13" cy="9" r="1.2" fill="#fff3fb" opacity=".85"/>' +
        '<circle cx="8" cy="15" r="1" fill="#ffffff" opacity=".8"/>' +
        "</pattern>" +
        '<clipPath id="' + cid + '"><path d="' + d + '"/></clipPath>';
      base += '<rect x="0" y="0" width="120" height="200" fill="url(#' + gid + ')" clip-path="url(#' + cid + ')" opacity=".75"/>';
    }

    if (acabado === "frances") {
      const cid = "aclf-" + uid;
      defs += '<clipPath id="' + cid + '"><path d="' + d + '"/></clipPath>';
      base += '<ellipse cx="60" cy="10" rx="260" ry="62" fill="#ffffff" clip-path="url(#' + cid + ')" opacity=".96"/>';
    }

    return '<svg viewBox="0 0 120 200" aria-hidden="true">' +
      (defs ? "<defs>" + defs + "</defs>" : "") + base + gloss + "</svg>";
  }

  /* ------------------------------------------------------------
     1. Contenido dinámico (links, horarios, año, demo bar)
     ------------------------------------------------------------ */
  function waLink(texto) {
    const n = (SITE.whatsapp || "").replace(/\D/g, "");
    return "https://wa.me/" + n + (texto ? "?text=" + encodeURIComponent(texto) : "");
  }

  function wireContent() {
    const waHola = waLink("Hola Uñas Mar. Vengo de la web y quiero info.");
    const waIds = ["ctaWhats", "menuWhats", "footWhats", "cardWhats", "svcWhats"];
    waIds.forEach((id) => { const el = $("#" + id); if (el) el.href = waHola; });

    const waNum = $("#cardWhatsNum");
    if (waNum && SITE.whatsappTexto) waNum.textContent = SITE.whatsappTexto;

    const igIds = ["menuInsta", "footInsta", "cardInsta", "galleryIg"];
    igIds.forEach((id) => { const el = $("#" + id); if (el) el.href = SITE.instagram; });

    const fbIds = ["footFace", "cardFace"];
    fbIds.forEach((id) => { const el = $("#" + id); if (el) el.href = SITE.facebook; });

    const mapIds = ["mapsLink", "footMaps"];
    mapIds.forEach((id) => { const el = $("#" + id); if (el) el.href = SITE.maps; });

    const addr = $("#addressText");
    if (addr) addr.textContent = SITE.direccion || "Ver en Google Maps";
    const footAddr = $("#footAddress");
    if (footAddr) footAddr.textContent = SITE.direccion || "";

    const city = $("#heroCity");
    if (city && SITE.ciudad) city.textContent = SITE.ciudad;

    const claim = $("#footClaim");
    if (claim && SITE.claim) claim.textContent = SITE.claim;

    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();

    const facts = $("#heroFacts");
    if (facts && SITE.datos) {
      facts.innerHTML = SITE.datos.map((d) => "<li>" + d + "</li>").join("");
    }

    const noteList = $("#noteList");
    if (noteList && SITE.incluye) {
      noteList.innerHTML = SITE.incluye.map((i) => "<li>" + i + "</li>").join("");
    }

    [$("#horariosList"), $("#footHorarios")].forEach((lista) => {
      if (!lista) return;
      lista.innerHTML = SITE.horarios.map((h) =>
        "<li><span>" + h.dias + "</span><span>" + h.horas + "</span></li>"
      ).join("");
    });

    const next = $("#nextSlot");
    if (next) next.textContent = nextSlotTexto();

    if (SITE.calendly) {
      const box = $("#calendlyBox");
      const link = $("#calendlyLink");
      if (box) box.hidden = false;
      if (link) link.href = SITE.calendly;
    }

  }

  function nextSlotTexto() {
    const libres = (SITE.agenda && SITE.agenda.diasLibres) || [];
    const hora = (SITE.agenda && SITE.agenda.horas && SITE.agenda.horas[0]) || "10:00";
    const hoy = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
      if (libres.includes(d.getDay())) continue;
      if (i === 0) return "Hoy atendemos con cita previa. Elige un día y una hora abajo.";
      const dia = DIAS[d.getDay()] + " " + d.getDate() + " de " + MESES[d.getMonth()];
      return "El próximo turno es el " + dia + " desde las " + hora + ". Elige tu día y hora abajo.";
    }
    return "Atendemos con cita previa.";
  }

  /* ------------------------------------------------------------
     2. Hero — decoración de estrellas
     ------------------------------------------------------------ */
  function sparkSvg() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path fill="currentColor" d="M12 0c1.1 6.2 5.7 10.8 12 12-6.3 1.2-10.9 5.8-12 12-1.1-6.2-5.7-10.8-12-12C6.3 10.8 10.9 6.2 12 0Z"/>' +
      "</svg>";
  }

  const HERO_SPARKS = [
    { x: 12, y: 20, s: 2.6, d: 0.0 },
    { x: 23, y: 33, s: 1.5, d: 0.8 },
    { x: 80, y: 16, s: 2.2, d: 0.4 },
    { x: 90, y: 30, s: 1.4, d: 1.2 },
    { x: 8, y: 52, s: 1.7, d: 0.6 },
    { x: 94, y: 55, s: 2.4, d: 0.2 },
    { x: 16, y: 74, s: 2.0, d: 1.0 },
    { x: 84, y: 76, s: 1.6, d: 0.5 },
    { x: 32, y: 88, s: 1.4, d: 1.4 },
    { x: 68, y: 89, s: 2.1, d: 0.9 },
    { x: 48, y: 9, s: 1.5, d: 1.6 },
    { x: 61, y: 12, s: 1.1, d: 0.3 },
    { x: 40, y: 20, s: 1.0, d: 1.9 },
    { x: 72, y: 44, s: 1.2, d: 1.1 }
  ];

  function renderHeroSparks() {
    const box = $("#heroSparks");
    if (!box) return;
    box.innerHTML = HERO_SPARKS.map((p, i) =>
      '<span class="spark" style="left:' + p.x + "%;top:" + p.y + "%;width:" + p.s +
      "rem;--d:" + p.d + 's" data-i="' + i + '">' + sparkSvg() + "</span>"
    ).join("");
  }

  /* ------------------------------------------------------------
     3. Destacados (carrusel)
     ------------------------------------------------------------ */
  function renderHighlights() {
    const track = $("#hlTrack");
    if (!track || typeof DESTACADOS === "undefined") return;

    track.innerHTML = DESTACADOS.map((h) => {
      const media = h.foto
        ? '<img src="' + h.foto + '" alt="' + h.title + '" loading="lazy" />'
        : "";
      return '<article class="hl-card" data-reveal>' +
        '<div class="hl-card__media">' + media + "</div>" +
        '<div class="hl-card__body">' +
        '<span class="hl-card__label">' + h.label + "</span>" +
        '<h3 class="hl-card__title">' + h.title + "</h3>" +
        '<p class="hl-card__text">' + h.texto + "</p>" +
        "</div></article>";
    }).join("");

    const prev = $("#hlPrev");
    const next = $("#hlNext");
    const step = () => {
      const card = track.querySelector(".hl-card");
      return card ? card.offsetWidth + 22 : 400;
    };
    const sync = () => {
      if (!prev || !next) return;
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 8;
    };
    if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    if (next) next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    track.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  /* ------------------------------------------------------------
     4. Marquee
     ------------------------------------------------------------ */
  function renderMarquee() {
    const inner = $("#marquee");
    if (!inner || typeof MARQUEE === "undefined") return;

    const items = MARQUEE.map((t) => '<span class="marquee__item">' + t + "</span>").join("");
    inner.innerHTML =
      '<div class="m-set">' + items + "</div>" +
      '<div class="m-set" aria-hidden="true">' + items + "</div>";
    inner.style.gap = "0";
    $$(".m-set", inner).forEach((set) => {
      set.style.display = "flex";
      set.style.gap = "3rem";
      set.style.paddingRight = "3rem";
    });

    if (REDUCED || !HAS_GSAP) return;

    const start = () => {
      const set = inner.querySelector(".m-set");
      if (!set || !set.offsetWidth) return;
      gsap.killTweensOf(inner);
      gsap.set(inner, { xPercent: 0 });
      gsap.to(inner, {
        xPercent: -50,
        duration: set.offsetWidth / 60,
        ease: "none",
        repeat: -1
      });
    };

    start();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
  }

  /* ------------------------------------------------------------
     5. Servicios (filas editoriales + vista previa flotante)
     ------------------------------------------------------------ */
  function renderServices() {
    const list = $("#servicesList");
    if (!list) return;

    list.innerHTML = SERVICIOS.map((s, i) => {
      const num = String(i + 1).padStart(2, "0");
      const price = s.price
        ? (s.desde ? "Desde $" : "$") + Number(s.price).toLocaleString("es-MX") + " <small>mxn</small>"
        : "A <small>confirmar</small>";
      const dur = s.duracion ? '<span class="svc__dur">' + s.duracion + "</span>" : "";
      return '<li class="svc__row" data-reveal data-cursor="link" data-svc="' + i + '">' +
        '<span class="svc__num">' + num + "</span>" +
        '<span class="svc__art">' + nailSvg(s.forma, s.tono, "crema", "svc" + i) + "</span>" +
        '<span class="svc__body">' +
        '<span class="svc__name">' + s.nombre + "</span>" +
        '<span class="svc__line">' + s.linea + "</span>" +
        "</span>" +
        '<span class="svc__meta">' +
        '<span class="svc__price">' + price + "</span>" +
        dur +
        "</span>" +
        "</li>";
    }).join("");

    buildServicePreview(list);
  }

  function buildServicePreview(list) {
    if (REDUCED || !FINE) return;

    const preview = document.createElement("div");
    preview.className = "svc-preview";
    preview.innerHTML = '<span class="svc-preview__name"></span>';
    document.body.appendChild(preview);
    const nameEl = preview.querySelector(".svc-preview__name");

    list.querySelectorAll(".svc__row").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        const s = SERVICIOS[Number(row.dataset.svc)];
        if (!s) return;
        const old = preview.querySelector("svg");
        if (old) old.remove();
        preview.insertAdjacentHTML("afterbegin", nailSvg(s.forma, s.tono, "crema", "prev" + row.dataset.svc));
        nameEl.textContent = s.nombre;
        preview.style.opacity = "1";
      });
      row.addEventListener("mouseleave", () => { preview.style.opacity = "0"; });
    });

    window.addEventListener("mousemove", (e) => {
      if (preview.style.opacity !== "1") return;
      const x = Math.min(e.clientX + 26, window.innerWidth - 210);
      const y = Math.min(e.clientY - 100, window.innerHeight - 270);
      preview.style.transform = "translate(" + x + "px," + Math.max(10, y) + "px)";
    });
  }

  /* ------------------------------------------------------------
     6. Galería
     ------------------------------------------------------------ */
  function renderGallery() {
    const grid = $("#gallery");
    if (!grid || typeof GALERIA === "undefined") return;

    const shapes = ["cuadrada", "almendrada", "oval", "coffin", "stiletto", "cuadrada"];
    const tonos = ["#a98bc7", "#7c5c9e", "#c8b4dd", "#b9a3d1", "#6f4f8f", "#9d86b8"];
    const acabados = ["frances", "crema", "chrome", "crema", "glitter", "crema"];

    grid.innerHTML = GALERIA.map((g, i) => {
      const media = g.foto
        ? '<img src="' + g.foto + '" alt="' + g.titulo + '" loading="lazy" />'
        : '<div class="nail" style="--nail-base:rotate(' + ((i % 2 ? 8 : -8)) + 'deg)">' +
          nailSvg(shapes[i % shapes.length], tonos[i % tonos.length], acabados[i % acabados.length], "gal" + i) + "</div>";
      return '<figure class="tile" data-reveal data-cursor="link">' +
        '<div class="tile__frame">' + media + "</div>" +
        '<figcaption class="tile__caption">' + g.titulo + "</figcaption>" +
        "</figure>";
    }).join("");
  }

  /* ------------------------------------------------------------
     7. Manifiesto palabra por palabra
     ------------------------------------------------------------ */
  function buildManifesto() {
    const el = $("#manifestoText");
    if (!el || typeof MANIFIESTO === "undefined") return;

    el.innerHTML = MANIFIESTO.map((w) => {
      const lilac = /manos|piden\./i.test(w) ? " is-lilac" : "";
      return '<span class="word' + lilac + '">' + w + "</span>";
    }).join("");

    const words = $$(".word", el);
    if (REDUCED || !HAS_ST) {
      words.forEach((w) => w.classList.add("is-lit"));
      return;
    }

    ScrollTrigger.create({
      trigger: ".statement",
      start: "top 72%",
      end: "bottom 58%",
      scrub: true,
      onUpdate: (self) => {
        const n = Math.round(self.progress * words.length);
        words.forEach((w, i) => w.classList.toggle("is-lit", i < n));
      }
    });
  }

  /* ------------------------------------------------------------
     8. Navegación, menú y anclas
     ------------------------------------------------------------ */
  let lenis = null;

  function initNav() {
    const nav = $("#nav");
    const burger = $("#burger");
    const menu = $("#menu");

    const onScroll = () => {
      const y = lenis ? lenis.scroll : window.scrollY;
      if (nav) nav.classList.toggle("is-scrolled", y > 20);
    };

    if (lenis) lenis.on("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function setMenu(open) {
      if (!burger || !menu) return;
      burger.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
      if (lenis) open ? lenis.stop() : lenis.start();

      $$(".menu__links a", menu).forEach((a, i) => {
        a.style.transitionDelay = open ? 0.08 + i * 0.06 + "s" : "0s";
      });
    }

    if (burger) burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));

    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (menu && menu.classList.contains("is-open")) setMenu(false);
        if (lenis) lenis.scrollTo(target, { offset: -100, duration: 1.4 });
        else target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  /* ------------------------------------------------------------
     9. Scroll suave (Lenis)
     ------------------------------------------------------------ */
  function initLenis() {
    if (REDUCED || !HAS_LENIS) return null;

    const l = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6
    });

    if (HAS_GSAP) {
      l.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => l.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => { l.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    return l;
  }

  /* ------------------------------------------------------------
     10. Cursor
     ------------------------------------------------------------ */
  function initCursor() {
    if (REDUCED || !HAS_GSAP || !FINE) return;

    const dot = $("#cursor");
    if (!dot) return;

    document.body.classList.add("cursor-on");
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.25, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.25, ease: "power3" });

    window.addEventListener("mousemove", (e) => { xTo(e.clientX); yTo(e.clientY); });

    document.addEventListener("mouseover", (e) => {
      const hit = e.target.closest('a, button, [data-cursor="link"], .chip, .date, .time, .hl-card, .tile');
      document.body.classList.toggle("cursor-link", !!hit);
    });
  }

  /* ------------------------------------------------------------
     11. Progreso de lectura
     ------------------------------------------------------------ */
  function initProgress() {
    const bar = $("#progressBar");
    if (!bar) return;

    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const y = lenis ? lenis.scroll : window.scrollY;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    };

    if (lenis) lenis.on("scroll", update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ------------------------------------------------------------
     12. Loader + hero
     ------------------------------------------------------------ */
  function initLoader() {
    const loader = $("#loader");
    if (!loader) return Promise.resolve();

    if (REDUCED || !HAS_GSAP) {
      loader.style.display = "none";
      return Promise.resolve();
    }

    document.body.style.overflow = "hidden";

    let resolveReveal;
    let done = false;
    const reveal = new Promise((resolve) => { resolveReveal = resolve; });

    const finish = () => {
      if (done) return;
      done = true;
      loader.style.display = "none";
      document.body.style.overflow = "";
    };

    // Failsafe: nunca dejar el loader pegado si la animación no termina.
    const failsafe = setTimeout(() => { resolveReveal(); finish(); }, 7000);

    const tl = gsap.timeline({
      onComplete: () => { clearTimeout(failsafe); finish(); }
    });
    tl.from(".loader__brand", { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" })
      .to("#loaderBar", { width: "100%", duration: 1.05, ease: "power2.inOut" }, "-=0.3")
      .to([".loader__brand", ".loader__line"], { opacity: 0, y: -14, duration: 0.45, ease: "power2.in" }, "+=0.1")
      .fromTo("#loaderStar",
        { opacity: 0, scale: 0, rotate: -40 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: "back.out(2.4)" })
      .to("#loaderStar", { y: -26, duration: 0.16, ease: "power2.out" })
      .to("#loaderStar", { y: 0, duration: 0.28, ease: "bounce.out" })
      .add(() => resolveReveal())
      .to("#loaderStar", { scale: 30, opacity: 0, duration: 0.7, ease: "power3.in" }, "+=0.05")
      .to(loader, { opacity: 0, duration: 0.4, ease: "power2.inOut" }, "-=0.5");

    return reveal;
  }

  function initHero() {
    if (!HAS_GSAP || REDUCED) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    const has = (sel) => $$(sel).length > 0;

    if (has(".hero__label")) tl.from(".hero__label", { opacity: 0, y: 18, duration: 0.7 });
    if (has(".hero__title")) tl.from(".hero__title", { opacity: 0, y: 34, duration: 1 }, "-=0.4");
    if (has(".hero__lead")) tl.from(".hero__lead", { opacity: 0, y: 24, duration: 0.8 }, "-=0.7");
    if (has(".hero__actions")) tl.from(".hero__actions", { opacity: 0, y: 22, duration: 0.8 }, "-=0.65");
    if (has(".hero__facts li")) tl.from(".hero__facts li", { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, "-=0.6");
    if (has(".hero__sparks")) tl.from(".hero__sparks", { opacity: 0, duration: 1.2 }, "-=0.8");
    if (has(".hero__scroll")) tl.from(".hero__scroll", { opacity: 0, duration: 0.6 }, "-=0.5");

    if (FINE) {
      window.addEventListener("mousemove", (e) => {
        const cx = (e.clientX / window.innerWidth - 0.5) * 2;
        const cy = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to("#heroSparks", { x: cx * 20, y: cy * 12, duration: 1.3, ease: "power3", overwrite: "auto" });
        gsap.to(".hero__glow", { x: cx * 40, y: cy * 28, duration: 1.6, ease: "power3", overwrite: "auto" });
      });
    }

    if (has(".hero__inner") && HAS_ST) {
      gsap.to(".hero__inner", {
        yPercent: 10,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
    }
  }

  /* ------------------------------------------------------------
     13. Reveals
     ------------------------------------------------------------ */
  function initReveals() {
    if (!HAS_GSAP || !HAS_ST) {
      $$("[data-reveal]").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
      return;
    }

    if (REDUCED) {
      gsap.set("[data-reveal]", { opacity: 1, y: 0 });
      return;
    }

    ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "power3.out" })
    });
  }

  /* ------------------------------------------------------------
     INIT
     ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    wireContent();
    renderHeroSparks();
    renderHighlights();
    renderMarquee();
    renderServices();
    renderGallery();
    buildManifesto();

    lenis = initLenis();
    window.__umLenis = lenis;
    initNav();
    initProgress();
    initCursor();
    initReveals();

    initLoader().then(() => {
      initHero();
      if (HAS_ST) ScrollTrigger.refresh();
    });

    window.addEventListener("load", () => HAS_ST && ScrollTrigger.refresh());
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => HAS_ST && ScrollTrigger.refresh());
    }
  });
})();
