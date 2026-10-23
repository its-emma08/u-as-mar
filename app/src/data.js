export const SITE = {
  nombre: "Uñas Mar",
  ciudad: "Cuitláhuac, Veracruz",
  claim: "Manos cuidadas, sin prisa",
  whatsapp: "522712532524",
  whatsappTexto: "+52 271 253 2524",
  email: "",
  formspree: "",
  instagram: "https://www.instagram.com/unasmarpz",
  instagramHandle: "@unasmarpz",
  facebook: "https://www.facebook.com/share/1FqezdC7Yu/",
  maps: "https://maps.app.goo.gl/zApJ5AXHBmWsTrCy5",
  direccion: "San Francisco (Mata Clara), Cuitláhuac, Veracruz",
  calendly: "",
  datos: ["Cita previa", "Efectivo y transferencia", "Estacionamiento en la calle"],
  horarios: [
    { dias: "Lunes a viernes", horas: "10:00 – 19:00" },
    { dias: "Sábado", horas: "10:00 – 17:00" },
    { dias: "Domingo", horas: "Cerrado" },
  ],
  agenda: {
    duracionMin: 60,
    horas: ["10:00", "11:30", "13:00", "16:00", "17:30"],
    horasSabado: ["10:00", "11:30", "13:00", "16:00"],
    diasLibres: [0],
    diasAdelante: 14,
  },
  incluye: [
    "Limpieza y preparación profunda",
    "Cuidado de cutícula con torno",
    "Diseño 100% a tu gusto",
    "Masaje e hidratación final con aceite"
  ],
};

export const SERVICIOS = [
  {
    id: "gel-manos",
    nombre: "Gel semipermanente en manos",
    linea: "1 a 2 tonos, brillo parejo que dura semanas.",
    price: 200,
    desde: false,
    forma: "almendrada",
    tono: "#a98bc7",
  },
  {
    id: "gel-pies",
    nombre: "Gel semipermanente en pies",
    linea: "Hasta 2 tonos. El diseño o efecto se cotiza aparte.",
    price: 200,
    desde: false,
    forma: "cuadrada",
    tono: "#b79bd6",
  },
  {
    id: "rubber",
    nombre: "Nivelación de rubber",
    linea: "Un tono. Fortalece y deja la uña pareja.",
    price: 250,
    desde: false,
    forma: "oval",
    tono: "#9a78c4",
  },
  {
    id: "polygel-encapsulado",
    nombre: "Encapsulado de polygel",
    linea: "Hasta 2 tonos con efecto encapsulado.",
    price: 300,
    desde: false,
    forma: "almendrada",
    tono: "#c8b4dd",
  },
  {
    id: "polygel",
    nombre: "Uñas de polygel",
    linea: "Largo y estructura ligera, con acabado natural.",
    price: 350,
    desde: true,
    forma: "coffin",
    tono: "#7c5ca6",
  },
  {
    id: "bano-acrilico",
    nombre: "Baño de acrílico",
    linea: "Acrílico sobre la uña natural, resistente.",
    price: 280,
    desde: false,
    forma: "cuadrada",
    tono: "#9377b5",
  },
  {
    id: "acrilico",
    nombre: "Acrílico",
    linea: "Extensión firme, esculpida a medida.",
    price: 200,
    desde: true,
    forma: "stiletto",
    tono: "#6f4f8f",
  },
];

export const FORMAS = [
  { id: "almendrada", nombre: "Almendrada", extra: 0 },
  { id: "coffin", nombre: "Coffin", extra: 50 },
  { id: "stiletto", nombre: "Stiletto", extra: 50 },
  { id: "oval", nombre: "Óvalo", extra: 0 },
  { id: "cuadrada", nombre: "Cuadrada", extra: 0 },
];

export const LARGOS = [
  { id: "corto", nombre: "Corto", extra: 0 },
  { id: "medio", nombre: "Medio", extra: 30 },
  { id: "largo", nombre: "Largo", extra: 80 },
];

export const COLORES = [
  { id: "lila", nombre: "Lila", hex: "#a98bc7", extra: 0 },
  { id: "rosa", nombre: "Rosa", hex: "#e3b3c0", extra: 0 },
  { id: "nude", nombre: "Nude", hex: "#ddc0b2", extra: 0 },
  { id: "blanco", nombre: "Leche", hex: "#f6f0ec", extra: 0 },
  { id: "vino", nombre: "Vino", hex: "#7d2f42", extra: 0 },
  { id: "rojo", nombre: "Rojo", hex: "#b23a4a", extra: 0 },
  { id: "cafe", nombre: "Café", hex: "#6a4a3c", extra: 0 },
  { id: "negro", nombre: "Negro", hex: "#2a2727", extra: 0 },
  { id: "verde", nombre: "Verde oliva", hex: "#7d8065", extra: 0 },
  { id: "azul", nombre: "Azul", hex: "#5f7fc4", extra: 0 },
];

export const ACABADOS = [
  { id: "crema", nombre: "Crema", extra: 0 },
  { id: "frances", nombre: "Francés", extra: 70 },
  { id: "glitter", nombre: "Glitter", extra: 60 },
  { id: "chrome", nombre: "Cromo", extra: 80 },
  { id: "mate", nombre: "Mate", extra: 50 },
];

const FOTO_META = {
  "acrilicas.jpeg": [1280, 538],
  "bano-de-acrilico.jpeg": [1280, 720],
  "nivelacion-rubber-2.jpeg": [1280, 660],
  "referencia-1.jpeg": [738, 1600],
  "referencia-2.jpeg": [738, 1600],
  "WhatsApp Image 2026-10-16 at 2.32.22.2 PM.jpeg": [900, 1600],
};

export function foto(archivo) {
  const [width, height] = FOTO_META[archivo] || [720, 1280];
  const base = import.meta.env.BASE_URL || "./";
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return { src: `${prefix}assets/fotos/${archivo}`, width, height };
}

const FOTO_GALERIA = [
  { titulo: "Gel semipermanente en manos", foto: "gel-semipermanente-manos.jpeg" },
  { titulo: "Gel en pies", foto: "gel-semipermanente-pies.jpeg" },
  { titulo: "Nivelación de rubber", foto: "nivelacion-rubber.jpeg" },
  { titulo: "Polygel", foto: "polygel.jpeg" },
  { titulo: "Baño de acrílico", foto: "bano-de-acrilico.jpeg" },
  { titulo: "Acrílico", foto: "acrilico.jpeg" },
  { titulo: "Acrílicas", foto: "acrilicas.jpeg" },
  { titulo: "Gel en manos · detalle", foto: "gel-semipermanente-manos-2.jpeg" },
  { titulo: "Rubber · acabado natural", foto: "nivelacion-rubber-2.jpeg" },
  { titulo: "Rubber · tono suave", foto: "nivelacion-rubber-3.jpeg" },
  { titulo: "Rubber · tono claro", foto: "nivelacion-rubber-4.jpeg" },
  { titulo: "Gel en pies · detalle", foto: "gel-semipermanente-pies-3.jpeg" },
];

export const GALERIA = FOTO_GALERIA.map((item) => ({ ...item, ...foto(item.foto) }));

export const MANIFIESTO = [
  "Un",
  "turno",
  "por",
  "vez.",
  "El",
  "tiempo",
  "necesario,",
  "ninguna",
  "prisa,",
  "la",
  "atención",
  "que",
  "tus",
  "manos",
  "piden.",
];

export const MANIFIESTO_TEXTO =
  "Un turno por vez. El tiempo necesario, ninguna prisa, la atención que tus manos piden.";

const FOTO_DESTACADOS = [
  { label: "Gel semipermanente", title: "Manos y pies", texto: "Color parejo y brillante que aguanta semanas.", forma: "almendrada", tono: "#a98bc7", acabado: "crema", foto: "gel-semipermanente-manos.jpeg" },
  { label: "Nivelación de rubber", title: "Uña fuerte y pareja", texto: "Un tono que fortalece sin perder naturalidad.", forma: "oval", tono: "#9a78c4", acabado: "crema", foto: "nivelacion-rubber.jpeg" },
  { label: "Polygel", title: "Largo ligero", texto: "Estructura cómoda, ideal para extensiones.", forma: "coffin", tono: "#7c5ca6", acabado: "crema", foto: "polygel.jpeg" },
  { label: "Baño de acrílico", title: "Resistencia real", texto: "Acrílico sobre tu uña, para el día a día.", forma: "cuadrada", tono: "#9377b5", acabado: "crema", foto: "bano-de-acrilico.jpeg" },
  { label: "Acrílico", title: "Estructura firme", texto: "Esculpido a medida, con el largo que pidas.", forma: "stiletto", tono: "#6f4f8f", acabado: "frances", foto: "acrilico.jpeg" },
];

export const DESTACADOS = FOTO_DESTACADOS.map((item) => ({ ...item, ...foto(item.foto) }));

export const MARQUEE = [
  "Gel en manos",
  "Gel en pies",
  "Nivelación de rubber",
  "Encapsulado",
  "Polygel",
  "Baño de acrílico",
  "Acrílico",
];

export const NAV_LINKS = [
  { href: "#estudio", label: "Estudio", index: "01" },
  { href: "#servicios", label: "Servicios", index: "02" },
  { href: "#disena", label: "Diseño", index: "03" },
  { href: "#galeria", label: "Galería", index: "04" },
  { href: "#turnos", label: "Turnos", index: "05" },
  { href: "#contacto", label: "Contacto", index: "06" },
];

export const DIAS_CORTO = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
export const MESES_CORTO = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
export const MESES_LARGO = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function waLink(texto = "") {
  const numero = (SITE.whatsapp || "").replace(/\D/g, "");
  return `https://wa.me/${numero}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;
}

export function precio(valor) {
  return `$${Number(valor).toLocaleString("es-MX")}`;
}

export function formatoFecha(fecha) {
  return `${DIAS_CORTO[fecha.getDay()]} ${fecha.getDate()} ${MESES_CORTO[fecha.getMonth()]}`;
}

export function claveFecha(fecha) {
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

export function horasDisponibles(fecha) {
  const { horas, horasSabado = horas } = SITE.agenda;
  const base = fecha?.getDay() === 6 ? horasSabado : horas;
  if (!fecha) return base;

  const ahora = new Date();
  if (fecha.toDateString() !== ahora.toDateString()) return base;

  return base.filter((hora) => {
    const [hh, mm] = hora.split(":").map(Number);
    const inicio = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), hh, mm);
    return inicio > ahora;
  });
}

export function proximosDias() {
  const { diasLibres = [], diasAdelante = 14 } = SITE.agenda;
  const hoy = new Date();
  const dias = [];
  for (let i = 0; dias.length < diasAdelante && i < diasAdelante + 14; i++) {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
    if (diasLibres.includes(fecha.getDay())) continue;
    if (fecha.toDateString() === hoy.toDateString() && !horasDisponibles(fecha).length) continue;
    dias.push(fecha);
  }
  return dias;
}

export function proximoTurnoTexto() {
  const dias = proximosDias();
  if (!dias.length) return "Atendemos con cita previa. Elige día y hora abajo.";
  const fecha = dias[0];
  const hoy = new Date();
  const esHoy = fecha.toDateString() === hoy.toDateString();
  const dia = esHoy
    ? "hoy"
    : `${DIAS_CORTO[fecha.getDay()]} ${fecha.getDate()} de ${MESES_LARGO[fecha.getMonth()]}`;
  const hora = horasDisponibles(fecha)[0];
  return esHoy
    ? `Hoy hay horarios de atención desde las ${hora}. Elige el tuyo abajo y confirmamos por WhatsApp.`
    : `El próximo día de atención es ${dia}, desde las ${hora}. Elige tu horario abajo y confirmamos por WhatsApp.`;
}

export function mensajeDiseno(seleccion) {
  const buscar = (lista, id) => lista.find((item) => item.id === id) || lista[0];
  const color = buscar(COLORES, seleccion.color);
  return [
    "Hola Uñas Mar. Me gustó este diseño y quiero cotizarlo:",
    `- Forma: ${buscar(FORMAS, seleccion.forma).nombre}`,
    `- Largo: ${buscar(LARGOS, seleccion.largo).nombre}`,
    `- Color: ${color.nombre}`,
    `- Acabado: ${buscar(ACABADOS, seleccion.acabado).nombre}`,
    "",
    "¿Me pasas el precio?",
  ].join("\n");
}

export function mensajeTurno({ servicio, fecha, hora, nombre, telefono, nota }) {
  const elegido = SERVICIOS.find((item) => item.id === servicio);
  const servicioTexto = elegido ? elegido.nombre : "Diseño personalizado";
  return [
    "Hola Uñas Mar. Quiero agendar una cita:",
    `- Servicio: ${servicioTexto}`,
    `- Día: ${fecha ? formatoFecha(fecha) : "a definir"}`,
    `- Hora: ${hora || "a definir"}`,
    `- Nombre: ${nombre}`,
    `- WhatsApp: ${telefono}`,
    ...(nota ? [`- Notas: ${nota}`] : []),
    "",
    "Gracias.",
  ].join("\n");
}
