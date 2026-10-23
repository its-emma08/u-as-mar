import { SITE } from "../data";
import { Label, StarIcon } from "./Star";

export default function Note() {
  return (
    <section className="note t-light" id="estudio" aria-labelledby="estudio-title">
      <div className="wrap note__grid">
        <div className="note__body" data-reveal>
          <Label>El estudio</Label>
          <h2 className="h2" id="estudio-title">
            Un espacio para relajarte
            <br />
            <em>y consentirte</em>
          </h2>
          <p className="lead">
            En Uñas Mar no atendemos en masa. Agendamos pocas citas al día para darte tiempo
            completo, escucharte y dejar tus uñas perfectas. Si algo no te convence durante la
            sesión, lo ajustamos al momento.
          </p>
          <p className="note__calm">
            <StarIcon size={13} />
            Reserva alrededor de {SITE.agenda.duracionMin} minutos. Es tu tiempo.
          </p>
        </div>

        <div className="note__list" data-reveal>
          <p className="group__title">Tu cita de {SITE.agenda.duracionMin} min incluye:</p>
          <ul className="hairlist hairlist--stars">
            {SITE.incluye.map((item) => (
              <li key={item}>
                <span className="hairlist__star" aria-hidden="true">
                  <StarIcon size={10} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="note__card" aria-hidden="true">
            <span className="note__card-star">
              <StarIcon size={16} />
            </span>
            <p>Una clienta por vez.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
