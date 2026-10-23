import { SITE } from "../data";
import { Label, Sparkles, StarIcon } from "./Star";

export default function Hero() {
  return (
    <section className="hero t-dark" id="top" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__bigstar" aria-hidden="true">
        <StarIcon />
      </div>

      <div className="hero__inner">
        <div className="hero__grid">
          <Label className="hero__label">Estudio de uñas · {SITE.ciudad}</Label>
          <h1 className="hero__title" id="hero-title">
            Uñas <em>Mar</em>
            <span className="hero__title-star" aria-hidden="true">
              <StarIcon size={24} />
            </span>
          </h1>
          <p className="hero__lead">
            <strong>Tus uñas perfectas, sin prisas.</strong>
            <span>
              Gel, rubber, polygel y acrílico con atención 100% personalizada. Agendamos una
              clienta a la vez para consentirte como te mereces.
            </span>
          </p>
          <div className="hero__actions">
            <a className="btn btn--lg" href="#turnos">
              <StarIcon size={13} />
              Agendar mi cita
            </a>
            <a className="btn btn--lg btn--ghost" href="#servicios">
              Ver servicios y precios
            </a>
          </div>
          <p className="hero__hint">
            <StarIcon size={11} />
            Elige tu servicio y luego día y hora. Confirmamos por WhatsApp.
          </p>
          <ul className="hero__facts">
            {SITE.datos.map((dato) => (
              <li key={dato}>
                <StarIcon size={9} />
                {dato}
              </li>
            ))}
          </ul>
        </div>
        <Sparkles className="hero__sparks" />
      </div>

      <a className="hero__scroll" href="#estudio">
        <span>Desliza</span>
        <StarIcon size={10} />
      </a>
    </section>
  );
}
