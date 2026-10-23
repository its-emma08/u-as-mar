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
          <span aria-hidden="true">💬</span> ¿Tienes una idea en mente? Envíanos una foto por{" "}
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
