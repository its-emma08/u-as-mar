import { useMemo, useState } from "react";
import {
  ACABADOS,
  COLORES,
  FORMAS,
  LARGOS,
  mensajeDiseno,
  precio,
  waLink,
} from "../data";
import { NailRow } from "./Nail";
import { Label, StarIcon } from "./Star";

function OptionGroup({ legend, hint, name, options, value, onChange, colors = false, note }) {
  return (
    <fieldset className="studio__group">
      <legend className="group__title">
        {legend}
        <span className="group__hint">{hint}</span>
      </legend>
      <div className={`chips ${colors ? "chips--colors" : ""}`.trim()}>
        {options.map((option) => {
          const active = value === option.id;
          if (colors) {
            return (
              <label
                key={option.id}
                className={`chip chip--color ${active ? "is-active" : ""}`.trim()}
                style={{ "--swatch": option.hex }}
                title={option.nombre}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name={name}
                  value={option.id}
                  checked={active}
                  onChange={() => onChange(option.id)}
                />
                <span className="sr-only">{option.nombre}</span>
                <span className="chip__swatch" aria-hidden="true" />
              </label>
            );
          }
          return (
            <label
              key={option.id}
              className={`chip ${active ? "is-active" : ""}`.trim()}
            >
              <input
                className="sr-only"
                type="radio"
                name={name}
                value={option.id}
                checked={active}
                onChange={() => onChange(option.id)}
              />
              <span>{option.nombre}</span>
              {option.extra > 0 ? (
                <small className="chip__extra">+{precio(option.extra)}</small>
              ) : null}
            </label>
          );
        })}
      </div>
      {note ? <p className="chips__note">{note}</p> : null}
    </fieldset>
  );
}

export default function Studio() {
  const [seleccion, setSeleccion] = useState({
    forma: "almendrada",
    largo: "medio",
    color: "lila",
    acabado: "crema",
  });
  const [pulse, setPulse] = useState(0);

  const color = COLORES.find((item) => item.id === seleccion.color) || COLORES[0];
  const nombres = useMemo(() => {
    const buscar = (lista, id) => lista.find((item) => item.id === id) || lista[0];
    return {
      forma: buscar(FORMAS, seleccion.forma).nombre,
      largo: buscar(LARGOS, seleccion.largo).nombre,
      acabado: buscar(ACABADOS, seleccion.acabado).nombre,
    };
  }, [seleccion]);

  const spec = `${nombres.forma} · ${nombres.largo} · ${color.nombre} · ${nombres.acabado}`;

  const choose = (key) => (value) => {
    setSeleccion((actual) => ({ ...actual, [key]: value }));
    setPulse((valor) => valor + 1);
  };

  return (
    <section className="studio t-dark" id="disena" aria-labelledby="disena-title">
      <div className="studio__glow" aria-hidden="true" />
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <Label>Diseña tus uñas</Label>
          <h2 className="h2" id="disena-title">
            ¡Diseña tu estilo
            <br />
            <em>antes de venir!</em>
          </h2>
          <p className="lead">
            Elige la forma, el largo y el color para ver cómo se verá tu set. Cuando te encante,
            mándanos captura por WhatsApp y agendamos.
          </p>
          <p className="studio__guide">
            <StarIcon size={10} />
            Elige una opción de cada grupo. Se actualiza solo.
          </p>
        </div>

        <div className="studio__grid" data-reveal>
          <div className="studio__preview">
            <span className="preview__star preview__star--one" aria-hidden="true">
              <StarIcon size={14} />
            </span>
            <span className="preview__star preview__star--two" aria-hidden="true">
              <StarIcon size={9} />
            </span>
            <div className="preview__stage">
              <NailRow
                shape={seleccion.forma}
                color={color.hex}
                acabado={seleccion.acabado}
                largo={seleccion.largo}
                popKey={pulse}
              />
            </div>
            <div className="preview__meta">
              <p className="preview__spec" aria-live="polite">
                {spec}
              </p>
              <p className="preview__note">Precio por WhatsApp</p>
            </div>
          </div>

          <div className="studio__controls">
            <OptionGroup
              legend="Forma"
              hint="Elige una"
              name="forma"
              options={FORMAS}
              value={seleccion.forma}
              onChange={choose("forma")}
            />
            <OptionGroup
              legend="Largo"
              hint="Elige uno"
              name="largo"
              options={LARGOS}
              value={seleccion.largo}
              onChange={choose("largo")}
            />
            <OptionGroup
              legend="Color"
              hint="Elige uno"
              name="color"
              options={COLORES}
              value={seleccion.color}
              onChange={choose("color")}
              colors
              note={<>Color elegido: <strong>{color.nombre}</strong></>}
            />
            <OptionGroup
              legend="Acabado"
              hint="Elige uno"
              name="acabado"
              options={ACABADOS}
              value={seleccion.acabado}
              onChange={choose("acabado")}
            />

            <p className="studio__fineprint">
              Los extras se suman al precio base y se confirman por WhatsApp.
            </p>
            <a
              className="btn btn--lg btn--wide"
              href={waLink(mensajeDiseno(seleccion))}
              target="_blank"
              rel="noopener"
            >
              <StarIcon size={13} />
              Cotizar este diseño
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
