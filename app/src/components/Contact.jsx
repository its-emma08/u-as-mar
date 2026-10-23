import { SITE, waLink } from "../data";
import { Label, StarIcon } from "./Star";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.13c-.24.68-1.42 1.31-1.96 1.36-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.95-4.37-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .54.01.17.01.41-.07.64.49.24.57.81 1.99.88 2.13.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.17-.19.69-.8.87-1.08.19-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

const ROWS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: SITE.whatsappTexto,
    href: waLink("Hola Uñas Mar. Vengo de la web y quiero información."),
    icon: <WhatsAppIcon />,
  },
  {
    id: "instagram",
    label: "Instagram",
    value: SITE.instagramHandle,
    href: SITE.instagram,
    icon: <InstagramIcon />,
  },
  {
    id: "facebook",
    label: "Facebook",
    value: "Uñas Mar",
    href: SITE.facebook,
    icon: <FacebookIcon />,
  },
  {
    id: "maps",
    label: "El estudio",
    value: SITE.direccion,
    href: SITE.maps,
    icon: <MapIcon />,
  },
];

export default function Contact() {
  return (
    <section className="contact t-dark" id="contacto" aria-labelledby="contacto-title">
      <div className="wrap contact__grid">
        <div className="sec-head" data-reveal>
          <Label>Contacto</Label>
          <h2 className="h2" id="contacto-title">
            Escríbenos
            <br />
            <em>cuando quieras</em>
          </h2>
          <p className="lead contact__lead">
            Respondemos con calma, normalmente el mismo día.
          </p>
          <p className="contact__star" aria-hidden="true">
            <StarIcon size={22} />
          </p>
        </div>

        <ul className="rows" data-reveal>
          {ROWS.map((row) => (
            <li key={row.id}>
              <a
                className="row"
                href={row.href}
                target="_blank"
                rel="noopener"
              >
                <span className="row__k">
                  <span className="row__icon" aria-hidden="true">
                    {row.icon}
                  </span>
                  {row.label}
                </span>
                <span className="row__v">{row.value}</span>
                <span className="arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
