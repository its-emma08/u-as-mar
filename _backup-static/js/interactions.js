/* ============================================================
   UÑAS MAR — INTERACCIÓN
   Estudio de uñas · Cotizador · Agenda de turnos
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function waLink(texto) {
    const n = (SITE.whatsapp || "").replace(/\D/g, "");
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(texto || "");
  }

  /* ============================================================
     ESTUDIO — simulador de uñas
     ============================================================ */
  const NAIL_PATHS = {
    almendrada: "M32,186 C28,142 24,95 24,66 C24,42 40,20 60,8 C80,20 96,42 96,66 C96,95 92,142 88,186 C83,194 37,194 32,186 Z",
    coffin: "M30,186 C27,140 24,92 24,64 C24,50 30,40 38,36 L82,36 C90,40 96,50 96,64 C96,92 93,140 90,186 C85,194 35,194 30,186 Z",
    stiletto: "M32,186 C28,142 26,100 30,70 C34,44 46,20 60,4 C74,20 86,44 90,70 C94,100 92,142 88,186 C83,194 37,194 32,186 Z",
    oval: "M32,186 C28,140 24,94 24,64 C24,40 40,22 60,14 C80,22 96,40 96,64 C96,94 92,140 88,186 C83,194 37,194 32,186 Z",
    cuadrada: "M30,186 C26,140 22,90 22,58 C22,44 30,34 44,32 L76,32 C90,34 98,44 98,58 C98,90 94,140 90,186 C85,194 35,194 30,186 Z"
  };

  const FINGERS = [
    { w: 1.06, rot: -15, len: 0.94 },
    { w: 0.99, rot: -7, len: 1.0 },
    { w: 1.0, rot: 0, len: 1.06 },
    { w: 0.94, rot: 7, len: 1.0 },
    { w: 0.86, rot: 15, len: 0.92 }
  ];

  const LEN_SCALE = { corto: 0.78, medio: 1, largo: 1.22 };

  const STUDIO = {
    forma: "almendrada",
    largo: "medio",
    color: "lila",
    acabado: "crema"
  };

  function nailMarkup(shape, colorHex, acabado, uid) {
    const d = NAIL_PATHS[shape] || NAIL_PATHS.almendrada;
    const gloss =
      '<path fill="#ffffff" opacity="' + (acabado === "mate" ? ".18" : ".42") + '" d="M40,170 C37,130 34,95 36,72 C38,54 46,38 56,30 C48,52 46,92 48,130 C49,150 51,164 53,172 C48,176 43,175 40,170 Z"/>';

    let defs = "";
    let base = '<path fill="' + colorHex + '" d="' + d + '"/>';

    if (acabado === "chrome") {
      const gid = "chrome-" + uid;
      defs =
        '<linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="#ffffff"/>' +
        '<stop offset="22%" stop-color="' + colorHex + '"/>' +
        '<stop offset="45%" stop-color="#ffffff"/>' +
        '<stop offset="68%" stop-color="' + colorHex + '"/>' +
        '<stop offset="100%" stop-color="#ffe6ef"/>' +
        "</linearGradient>";
      base = '<path fill="url(#' + gid + ')" d="' + d + '"/>';
    }

    if (acabado === "glitter") {
      const gid = "glit-" + uid;
      const cid = "clip-" + uid;
      defs +=
        '<pattern id="' + gid + '" width="18" height="18" patternUnits="userSpaceOnUse">' +
        '<circle cx="4" cy="4" r="1.7" fill="#ffffff" opacity=".95"/>' +
        '<circle cx="13" cy="9" r="1.2" fill="#fff3f7" opacity=".85"/>' +
        '<circle cx="8" cy="15" r="1" fill="#ffffff" opacity=".8"/>' +
        "</pattern>" +
        '<clipPath id="' + cid + '"><path d="' + d + '"/></clipPath>';
      base += '<rect x="0" y="0" width="120" height="200" fill="url(#' + gid + ')" clip-path="url(#' + cid + ')" opacity=".75"/>';
    }

    if (acabado === "frances") {
      const cid = "clipf-" + uid;
      defs += '<clipPath id="' + cid + '"><path d="' + d + '"/></clipPath>';
      base +=
        '<ellipse cx="60" cy="10" rx="260" ry="62" fill="#ffffff" clip-path="url(#' + cid + ')" opacity=".96"/>';
    }

    if (acabado === "mate") {
      base += '<path fill="#2b232b" opacity=".05" d="' + d + '"/>';
    }

    return (
      '<svg viewBox="0 0 120 200" aria-hidden="true">' +
      (defs ? "<defs>" + defs + "</defs>" : "") +
      base +
      gloss +
      "</svg>"
    );
  }

  function currentColor() {
    return COLORES.find((c) => c.id === STUDIO.color) || COLORES[0];
  }
  function findById(list, id) {
    return list.find((x) => x.id === id) || list[0];
  }

  function studioLabel() {
    return findById(FORMAS, STUDIO.forma).nombre + " · " +
      findById(LARGOS, STUDIO.largo).nombre + " · " +
      currentColor().nombre + " · " +
      findById(ACABADOS, STUDIO.acabado).nombre;
  }

  function renderNails(pop) {
    const stage = $("#nailPreview");
    if (!stage) return;

    const color = currentColor().hex;
    stage.innerHTML = FINGERS.map((f, i) => {
      const sy = LEN_SCALE[STUDIO.largo] * f.len;
      const base = "rotate(" + f.rot + "deg) scale(1, " + sy.toFixed(3) + ")";
      return (
        '<div class="nail' + (pop ? " pop" : "") + '" style="--nail-base:' + base +
        ";--nail-w:" + f.w + ';width:calc(var(--nail-w) * clamp(44px, 8vw, 82px))">' +
        nailMarkup(STUDIO.forma, color, STUDIO.acabado, i) +
        "</div>"
      );
    }).join("");
  }

  function updateStudioUI(pop) {
    renderNails(pop);

    const spec = $("#studioSpec");
    if (spec) spec.textContent = studioLabel();

    const groups = [
      ["#optForma", STUDIO.forma],
      ["#optLargo", STUDIO.largo],
      ["#optColor", STUDIO.color],
      ["#optAcabado", STUDIO.acabado]
    ];
    groups.forEach(([sel, val]) => {
      const box = $(sel);
      if (!box) return;
      $$(".chip", box).forEach((b) => b.classList.toggle("is-active", b.dataset.value === val));
    });
  }

  function buildOptionGroups() {
    const mapa = [
      { cont: "#optForma", list: FORMAS },
      { cont: "#optLargo", list: LARGOS },
      { cont: "#optColor", list: COLORES, colors: true },
      { cont: "#optAcabado", list: ACABADOS }
    ];

    mapa.forEach(({ cont, list, colors }) => {
      const box = $(cont);
      if (!box) return;
      box.innerHTML = list.map((o) => {
        if (colors) {
          return '<button type="button" class="chip chip--color" data-value="' + o.id +
            '" style="background:' + o.hex + '" title="' + o.nombre + '" aria-label="' + o.nombre + '"></button>';
        }
        return '<button type="button" class="chip" data-value="' + o.id + '">' + o.nombre + "</button>";
      }).join("");

      box.addEventListener("click", (e) => {
        const b = e.target.closest(".chip");
        if (!b) return;
        const key = { "#optForma": "forma", "#optLargo": "largo", "#optColor": "color", "#optAcabado": "acabado" }[cont];
        STUDIO[key] = b.dataset.value;
        updateStudioUI(true);
      });
    });
  }

  /* ============================================================
     ESTUDIO → WHATSAPP
     ============================================================ */
  async function sendToFormspree(payload) {
    if (!SITE.formspree) return false;
    try {
      const res = await fetch(SITE.formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch (err) {
      return false;
    }
  }

  function studioMessage() {
    let txt = "Hola Uñas Mar. Me gustó este diseño y quiero cotizarlo:\n";
    txt += "- Forma: " + findById(FORMAS, STUDIO.forma).nombre + "\n";
    txt += "- Largo: " + findById(LARGOS, STUDIO.largo).nombre + "\n";
    txt += "- Color: " + currentColor().nombre + "\n";
    txt += "- Acabado: " + findById(ACABADOS, STUDIO.acabado).nombre + "\n";
    txt += "\n¿Me pasas el precio?";
    return txt;
  }

  function initStudio() {
    const btn = $("#studioWa");
    if (!btn) return;
    btn.addEventListener("click", () => {
      window.open(waLink(studioMessage()), "_blank");
    });
  }

  /* ============================================================
     AGENDA
     ============================================================ */
  const BOOKING = { servicio: null, fecha: null, hora: null, paso: 1 };

  const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

  function fmtFecha(d) {
    return DIAS[d.getDay()] + " " + d.getDate() + " " + MESES[d.getMonth()];
  }

  function goStep(n) {
    BOOKING.paso = n;
    $$(".step").forEach((s) => s.classList.toggle("is-active", Number(s.dataset.step) === n));
    const back = $("#stepBack");
    if (back) back.hidden = n === 1;
  }

  function renderBookingServices() {
    const box = $("#agendaServices");
    if (!box) return;

    box.innerHTML = SERVICIOS.map((s) =>
      '<button type="button" class="chip" data-value="' + s.id + '">' + s.nombre +
      (s.duracion ? " · " + s.duracion : "") + "</button>"
    ).join("") +
      '<button type="button" class="chip" data-value="personalizado">Diseño personalizado</button>';

    box.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      BOOKING.servicio = b.dataset.value;
      $$(".chip", box).forEach((o) => o.classList.toggle("is-active", o === b));
      updateBookingSummary();
      goStep(2);
    });
  }

  function renderBookingDates() {
    const box = $("#agendaDates");
    if (!box) return;

    const libres = (SITE.agenda && SITE.agenda.diasLibres) || [];
    const total = (SITE.agenda && SITE.agenda.diasAdelante) || 14;
    const hoy = new Date();

    box.innerHTML = "";
    let count = 0;
    for (let i = 0; i < total + 7 && count < total; i++) {
      const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
      if (libres.includes(d.getDay())) continue;
      count++;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "date";
      chip.dataset.fecha = d.toISOString();
      chip.innerHTML =
        "<small>" + (i === 0 ? "Hoy" : DIAS[d.getDay()]) + "</small>" +
        "<strong>" + d.getDate() + "</strong>" +
        "<em>" + MESES[d.getMonth()] + "</em>";
      box.appendChild(chip);
    }

    box.addEventListener("click", (e) => {
      const chip = e.target.closest(".date");
      if (!chip) return;
      BOOKING.fecha = new Date(chip.dataset.fecha);
      $$(".date", box).forEach((c) => c.classList.toggle("is-active", c === chip));
      updateBookingSummary();
      maybeNext();
    });
  }

  function renderBookingTimes() {
    const box = $("#agendaTimes");
    if (!box) return;

    box.innerHTML = ((SITE.agenda && SITE.agenda.horas) || []).map((h) =>
      '<button type="button" class="time" data-value="' + h + '">' + h + "</button>"
    ).join("");

    box.addEventListener("click", (e) => {
      const b = e.target.closest(".time");
      if (!b) return;
      BOOKING.hora = b.dataset.value;
      $$(".time", box).forEach((c) => c.classList.toggle("is-active", c === b));
      updateBookingSummary();
      maybeNext();
    });
  }

  function maybeNext() {
    if (BOOKING.fecha && BOOKING.hora) {
      updateBookingSummary();
      setTimeout(() => goStep(3), 320);
    }
  }

  function updateBookingSummary() {
    const s = SERVICIOS.find((x) => x.id === BOOKING.servicio);
    const set = (id, val) => { const el = $("#" + id); if (el) el.textContent = val; };
    set("sumServicio", s ? s.nombre : (BOOKING.servicio === "personalizado" ? "Diseño personalizado" : "—"));
    set("sumDia", BOOKING.fecha ? fmtFecha(BOOKING.fecha) : "—");
    set("sumHora", BOOKING.hora || "—");
  }

  function bookingMessage(datos) {
    const s = SERVICIOS.find((x) => x.id === BOOKING.servicio);
    let txt = "Hola Uñas Mar. Quiero agendar una cita:\n";
    txt += "- Servicio: " + (s ? s.nombre : "Diseño personalizado") + "\n";
    txt += "- Día: " + (BOOKING.fecha ? fmtFecha(BOOKING.fecha) : "a definir") + "\n";
    txt += "- Hora: " + (BOOKING.hora || "a definir") + "\n";
    txt += "- Nombre: " + datos.nombre + "\n";
    txt += "- WhatsApp: " + datos.telefono;
    if (datos.nota) txt += "\n- Notas: " + datos.nota;
    txt += "\n\nGracias.";
    return txt;
  }

  function initBooking() {
    const back = $("#stepBack");
    if (back) back.addEventListener("click", () => goStep(Math.max(1, BOOKING.paso - 1)));

    renderBookingServices();
    renderBookingDates();
    renderBookingTimes();

    const form = $("#agendaForm");
    const out = $("#agendaMsgOut");

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nombre = $("#agendaName").value.trim();
        const telefono = $("#agendaPhone").value.trim();
        const nota = $("#agendaNote").value.trim();

        if (!BOOKING.servicio) { out.textContent = "Elige un servicio para continuar."; goStep(1); return; }
        if (!BOOKING.fecha || !BOOKING.hora) { out.textContent = "Elige día y hora para tu cita."; goStep(2); return; }
        if (!nombre || !telefono) { out.textContent = "Completa tu nombre y WhatsApp."; return; }

        out.textContent = "Enviando…";
        const payload = {
          tipo: "turno",
          nombre,
          telefono,
          nota,
          servicio: BOOKING.servicio,
          fecha: BOOKING.fecha ? BOOKING.fecha.toISOString().slice(0, 10) : "",
          hora: BOOKING.hora
        };

        const ok = await sendToFormspree(payload);
        out.textContent = ok
          ? "Turno registrado. Te confirmamos por WhatsApp."
          : "Te abrimos WhatsApp para confirmar tu turno.";
        window.open(waLink(bookingMessage({ nombre, telefono, nota })), "_blank");
      });
    }
  }

  /* ============================================================
     GALERÍA — visor a pantalla completa
     ============================================================ */
  function initLightbox() {
    const box = $("#lightbox");
    const imgEl = $("#lightboxImg");
    const capEl = $("#lightboxCaption");
    if (!box || !imgEl) return;

    const items = (typeof GALERIA !== "undefined" ? GALERIA : []).filter((g) => g.foto);
    if (!items.length) return;

    let index = 0;

    function paint() {
      const item = items[index];
      imgEl.src = item.foto;
      imgEl.alt = item.titulo;
      if (capEl) capEl.textContent = item.titulo;
    }

    function go(n) {
      index = (n % items.length + items.length) % items.length;
      paint();
    }

    function open(i) {
      index = i;
      paint();
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const lenis = window.__umLenis;
      if (lenis) lenis.stop();
      const close = $("#lightboxClose");
      if (close) close.focus();
    }

    function close() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      const lenis = window.__umLenis;
      if (lenis) lenis.start();
    }

    document.addEventListener("click", (e) => {
      const tile = e.target.closest(".tile");
      if (!tile) return;
      const im = tile.querySelector("img");
      if (!im) return;
      const src = im.getAttribute("src");
      const i = items.findIndex((g) => g.foto === src);
      open(i < 0 ? 0 : i);
    });

    box.addEventListener("click", (e) => {
      if (e.target === box) close();
    });

    const closeBtn = $("#lightboxClose");
    const prevBtn = $("#lightboxPrev");
    const nextBtn = $("#lightboxNext");
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (prevBtn) prevBtn.addEventListener("click", () => go(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => go(index + 1));

    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    buildOptionGroups();
    updateStudioUI(false);
    initStudio();
    initBooking();
    initLightbox();
  });
})();
