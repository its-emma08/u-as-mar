import { SERVICIOS, SITE, precio, waLink } from "../data";
import { NailSvg } from "./Nail";
import { Label, StarIcon } from "./Star";

export default function Services({ onSelectService }) {
  return (
    <section className="services t-light" id="servicios" aria-labelledby="servicios-title">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <Label>Servicios & Tarifas</Label>
          <h2 className="h2" id="servicios-title">
            Precios transparentes,
            <br />
            <em>sin letras chiquitas</em>
          </h2>
          <p className="sec-note">
            <StarIcon size={10} />
            El costo final se ajusta al largo y diseño que elijas.
          </p>
        </div>

        <ul className="svc">
          {SERVICIOS.map((servicio, index) => {
            const numero = String(index + 1).padStart(2, "0");
            const precioTexto = servicio.price
              ? `${servicio.desde ? "Desde " : ""}${precio(servicio.price)}`
              : "A confirmar";
            return (
              <li key={servicio.id} data-reveal>
                <button
                  className="svc__row"
                  type="button"
                  onClick={() => onSelectService(servicio.id)}
                  aria-label={`Elegir ${servicio.nombre}, ${precioTexto} mxn, e ir a turnos`}
                >
                  <span className="svc__num" aria-hidden="true">
                    {numero}
                  </span>
                  <span className="svc__art" aria-hidden="true">
                    <NailSvg shape={servicio.forma} color={servicio.tono} acabado="crema" />
                  </span>
                  <span className="svc__body">
                    <span className="svc__name">{servicio.nombre}</span>
                    <span className="svc__line">{servicio.linea}</span>
                  </span>
                  <span className="svc__meta">
                    <span className="svc__price">
                      {servicio.price ? (
                        <>
                          {servicio.desde ? "Desde " : ""}
                          {precio(servicio.price)} <small>mxn</small>
                        </>
                      ) : (
                        <>
                          A <small>confirmar</small>
                        </>
                      )}
                    </span>
                    <span className="svc__pick" aria-hidden="true">
                      Elegir
                      <StarIcon size={10} />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="svc__foot" data-reveal>
          <span className="svc__foot-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </span>
          ¿Tienes una idea en mente? Envíanos una foto por{" "}
          <a
            className="link"
            href={waLink("Hola Uñas Mar. Quiero cotizar un diseño especial.")}
            target="_blank"
            rel="noopener"
          >
            WhatsApp <span className="arrow" aria-hidden="true">↗</span>
          </a>{" "}
          y te cotizamos al instante.
        </p>
        <p className="svc__small" data-reveal>
          <StarIcon size={9} />
          Cita previa en {SITE.ciudad}. Efectivo y transferencia.
        </p>
      </div>
    </section>
  );
}
