import { waLink } from "../data";
import { StarIcon } from "./Star";

export default function Closing() {
  return (
    <section className="closing t-dark" aria-labelledby="closing-title">
      <div className="wrap closing__inner" data-reveal>
        <span className="closing__star" aria-hidden="true">
          <StarIcon size={20} />
        </span>
        <h2 className="closing__title" id="closing-title">
          ¿Lista para lucir
          <br />
          <em>uñas espectaculares?</em>
        </h2>
        <p className="closing__text">Nos vemos en el estudio.</p>
        <div className="closing__actions">
          <a className="btn btn--lg btn--grad" href="#turnos">
            <StarIcon size={13} />
            Agendar mi cita ahora
          </a>
          <a
            className="btn btn--lg btn--ghost"
            href={waLink("Hola Uñas Mar. Quiero preguntar por un diseño.")}
            target="_blank"
            rel="noopener"
          >
            Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
