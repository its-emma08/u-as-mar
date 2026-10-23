import { SITE, waLink } from "../data";
import { StarIcon } from "./Star";

export default function Footer() {
  return (
    <footer className="footer t-dark">
      <div className="wrap footer__grid">
        <div>
          <p className="footer__brand">
            Uñas <em>Mar</em>
          </p>
          <p className="footer__claim">{SITE.claim}</p>
          <p className="footer__mini">
            <StarIcon size={9} />
            {SITE.ciudad}
          </p>
        </div>

        <div>
          <h3 className="group__title">Estudio</h3>
          <ul className="footer__list">
            <li>
              <a href="#servicios">Servicios</a>
            </li>
            <li>
              <a href="#disena">Prueba tu diseño</a>
            </li>
            <li>
              <a href="#turnos">Turnos</a>
            </li>
            <li>
              <a href="#galeria">Galería</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="group__title">Dónde</h3>
          <p className="footer__text">{SITE.direccion}</p>
          <a className="link" href={SITE.maps} target="_blank" rel="noopener">
            Ver en Google Maps <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <div>
          <h3 className="group__title">Horarios</h3>
          <ul className="footer__list">
            {SITE.horarios.map((horario) => (
              <li key={horario.dias}>
                <span>{horario.dias}</span>
                <span>{horario.horas}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap footer__bottom">
        <p>
          © {new Date().getFullYear()} Uñas Mar · Cuitláhuac, Veracruz
        </p>
        <p>
          <a href={waLink("Hola Uñas Mar. Vengo de la web.")} target="_blank" rel="noopener">
            WhatsApp
          </a>
          {" · "}
          <a href={SITE.instagram} target="_blank" rel="noopener">
            Instagram
          </a>
          {" · "}
          <a href={SITE.facebook} target="_blank" rel="noopener">
            Facebook
          </a>
        </p>
      </div>
    </footer>
  );
}
