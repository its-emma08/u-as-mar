/* ============================================================
   UÑAS MAR — CONTENIDO Y CONFIGURACIÓN
   Todo lo editable del sitio está en este archivo.
   ============================================================ */

const SITE = {
  nombre: "Uñas Mar",
  ciudad: "Cuitláhuac, Veracruz",
  claim: "Manos cuidadas, sin prisa",

  // WhatsApp — solo dígitos, con código de país. Formato para el enlace: 52 + 10 dígitos.
  whatsapp: "522712532524",
  whatsappTexto: "+52 271 253 2524",

  // Dejar vacío para ocultarlo del sitio
  email: "",

  // Pegar la URL de Formspree (https://formspree.io/f/xxxxxxx) cuando exista.
  // Si queda vacío, los formularios se envían por WhatsApp.
  formspree: "",

  instagram: "https://www.instagram.com/unasmarpz",
  facebook: "https://www.facebook.com/share/1FqezdC7Yu/",
  maps: "https://maps.app.goo.gl/zApJ5AXHBmWsTrCy5",

  direccion: "San Francisco (Mata Clara), Cuitláhuac, Veracruz",

  // URL de Calendly o Google Calendar. Si está vacío, el bloque no aparece.
  calendly: "",

  // Datos cortos del hero (revisar con el cliente)
  datos: ["Cita previa", "Efectivo y transferencia", "Estacionamiento en la calle"],

  horarios: [
    { dias: "Lunes a viernes", horas: "10:00 – 19:00" },
    { dias: "Sábado", horas: "10:00 – 17:00" },
    { dias: "Domingo", horas: "Cerrado" }
  ],

  agenda: {
    duracionMin: 60,
    horas: ["10:00", "11:30", "13:00", "16:00", "17:30", "19:00"],
    diasLibres: [0],
    diasAdelante: 14
  },

  // "Cada cita incluye" — revisar con el cliente
  incluye: [
    "Limpieza y preparación de la uña",
    "Trabajo de cutícula con torno",
    "Diseño elegido en la cita",
    "Aceite y crema de cierre"
  ]
};

/* ------------------------------------------------------------
   SERVICIOS
   price: número = precio de referencia en pesos.
   desde: true = el precio se muestra como "Desde $X".
   ------------------------------------------------------------ */
const SERVICIOS = [
  {
    id: "gel-manos",
    nombre: "Gel semipermanente en manos",
    linea: "1 a 2 tonos, brillo parejo que dura semanas.",
    price: 200,
    desde: false,
    forma: "almendrada",
    tono: "#a98bc7"
  },
  {
    id: "gel-pies",
    nombre: "Gel semipermanente en pies",
    linea: "Hasta 2 tonos. El diseño o efecto se cotiza aparte.",
    price: 200,
    desde: false,
    forma: "cuadrada",
    tono: "#b79bd6"
  },
  {
    id: "rubber",
    nombre: "Nivelación de rubber",
    linea: "Un tono. Fortalece y deja la uña pareja.",
    price: 250,
    desde: false,
    forma: "oval",
    tono: "#9a78c4"
  },
  {
    id: "polygel-encapsulado",
    nombre: "Encapsulado de polygel",
    linea: "Hasta 2 tonos con efecto encapsulado.",
    price: 300,
    desde: false,
    forma: "almendrada",
    tono: "#c8b4dd"
  },
  {
    id: "polygel",
    nombre: "Uñas de polygel",
    linea: "Largo y estructura ligera, con acabado natural.",
    price: 350,
    desde: true,
    forma: "coffin",
    tono: "#7c5ca6"
  },
  {
    id: "bano-acrilico",
    nombre: "Baño de acrílico",
    linea: "Acrílico sobre la uña natural, resistente.",
    price: 280,
    desde: false,
    forma: "cuadrada",
    tono: "#9377b5"
  },
  {
    id: "acrilico",
    nombre: "Acrílico",
    linea: "Extensión firme, esculpida a medida.",
    price: 200,
    desde: true,
    forma: "stiletto",
    tono: "#6f4f8f"
  }
];

/* ------------------------------------------------------------
   ESTUDIO INTERACTIVO
   ------------------------------------------------------------ */
const FORMAS = [
  { id: "almendrada", nombre: "Almendrada", extra: 0 },
  { id: "coffin", nombre: "Coffin", extra: 50 },
  { id: "stiletto", nombre: "Stiletto", extra: 50 },
  { id: "oval", nombre: "Óvalo", extra: 0 },
  { id: "cuadrada", nombre: "Cuadrada", extra: 0 }
];

const LARGOS = [
  { id: "corto", nombre: "Corto", extra: 0 },
  { id: "medio", nombre: "Medio", extra: 30 },
  { id: "largo", nombre: "Largo", extra: 80 }
];

const COLORES = [
  { id: "lila", nombre: "Lila", hex: "#a98bc7", extra: 0 },
  { id: "rosa", nombre: "Rosa", hex: "#e3b3c0", extra: 0 },
  { id: "nude", nombre: "Nude", hex: "#ddc0b2", extra: 0 },
  { id: "blanco", nombre: "Leche", hex: "#f6f0ec", extra: 0 },
  { id: "vino", nombre: "Vino", hex: "#7d2f42", extra: 0 },
  { id: "rojo", nombre: "Rojo", hex: "#b23a4a", extra: 0 },
  { id: "cafe", nombre: "Café", hex: "#6a4a3c", extra: 0 },
  { id: "negro", nombre: "Negro", hex: "#2a2727", extra: 0 },
  { id: "verde", nombre: "Verde oliva", hex: "#7d8065", extra: 0 },
  { id: "azul", nombre: "Azul", hex: "#5f7fc4", extra: 0 }
];

const ACABADOS = [
  { id: "crema", nombre: "Crema", extra: 0 },
  { id: "frances", nombre: "Francés", extra: 70 },
  { id: "glitter", nombre: "Glitter", extra: 60 },
  { id: "chrome", nombre: "Cromo", extra: 80 },
  { id: "mate", nombre: "Mate", extra: 50 }
];

/* ------------------------------------------------------------
   GALERÍA — títulos y fotos.
   Los archivos van en assets/fotos/.
   ------------------------------------------------------------ */
const GALERIA = [
  { titulo: "Gel semipermanente en manos", foto: "assets/fotos/gel-semipermanente-manos.jpeg" },
  { titulo: "Gel en pies", foto: "assets/fotos/gel-semipermanente-pies.jpeg" },
  { titulo: "Nivelación de rubber", foto: "assets/fotos/nivelacion-rubber.jpeg" },
  { titulo: "Polygel", foto: "assets/fotos/polygel.jpeg" },
  { titulo: "Baño de acrílico", foto: "assets/fotos/bano-de-acrilico.jpeg" },
  { titulo: "Acrílico", foto: "assets/fotos/acrilico.jpeg" },
  { titulo: "Acrílicas", foto: "assets/fotos/acrilicas.jpeg" },
  { titulo: "Gel en manos · detalle", foto: "assets/fotos/gel-semipermanente-manos-2.jpeg" },
  { titulo: "Rubber · acabado natural", foto: "assets/fotos/nivelacion-rubber-2.jpeg" },
  { titulo: "Rubber · tono suave", foto: "assets/fotos/nivelacion-rubber-3.jpeg" },
  { titulo: "Rubber · tono claro", foto: "assets/fotos/nivelacion-rubber-4.jpeg" },
  { titulo: "Gel en pies · detalle", foto: "assets/fotos/gel-semipermanente-pies-3.jpeg" }
];

/* ------------------------------------------------------------
   MANIFIESTO — se revela palabra por palabra
   ------------------------------------------------------------ */
const MANIFIESTO = [
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
  "piden."
];

/* ------------------------------------------------------------
   DESTACADOS — carrusel "lo más pedido"
   forma: almendrada | coffin | stiletto | oval | cuadrada
   acabado: crema | frances | glitter | chrome | mate
   ------------------------------------------------------------ */
const DESTACADOS = [
  { label: "Gel semipermanente", title: "Manos y pies", texto: "Color parejo y brillante que aguanta semanas.", forma: "almendrada", tono: "#a98bc7", acabado: "crema", foto: "assets/fotos/gel-semipermanente-manos.jpeg" },
  { label: "Nivelación de rubber", title: "Uña fuerte y pareja", texto: "Un tono que fortalece sin perder naturalidad.", forma: "oval", tono: "#9a78c4", acabado: "crema", foto: "assets/fotos/nivelacion-rubber.jpeg" },
  { label: "Polygel", title: "Largo ligero", texto: "Estructura cómoda, ideal para extensiones.", forma: "coffin", tono: "#7c5ca6", acabado: "crema", foto: "assets/fotos/polygel.jpeg" },
  { label: "Baño de acrílico", title: "Resistencia real", texto: "Acrílico sobre tu uña, para el día a día.", forma: "cuadrada", tono: "#9377b5", acabado: "crema", foto: "assets/fotos/bano-de-acrilico.jpeg" },
  { label: "Acrílico", title: "Estructura firme", texto: "Esculpido a medida, con el largo que pidas.", forma: "stiletto", tono: "#6f4f8f", acabado: "frances", foto: "assets/fotos/acrilico.jpeg" }
];

/* ------------------------------------------------------------
   MARQUEE — banda de palabras
   ------------------------------------------------------------ */
const MARQUEE = [
  "Gel en manos",
  "Gel en pies",
  "Nivelación de rubber",
  "Encapsulado",
  "Polygel",
  "Baño de acrílico",
  "Acrílico"
];
