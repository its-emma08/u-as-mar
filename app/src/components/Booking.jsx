import { useEffect, useMemo, useRef, useState } from "react";
import {
  DIAS_CORTO,
  MESES_CORTO,
  MESES_LARGO,
  SERVICIOS,
  SITE,
  claveFecha,
  formatoFecha,
  horasDisponibles,
  mensajeTurno,
  precio,
  proximoTurnoTexto,
  proximosDias,
  waLink,
} from "../data";
import { Label, StarIcon } from "./Star";

const PASOS = [
  { numero: 1, titulo: "Servicio" },
  { numero: 2, titulo: "Día y hora" },
  { numero: 3, titulo: "Tus datos" },
];

export default function Booking({ serviceRequest }) {
  const dias = useMemo(() => proximosDias(), []);
  const [step, setStep] = useState(serviceRequest?.id ? 2 : 1);
  const [servicio, setServicio] = useState(serviceRequest?.id || "");
  const [fechaClave, setFechaClave] = useState("");
  const [hora, setHora] = useState("");
  const [datos, setDatos] = useState({ nombre: "", telefono: "", nota: "" });
  const [status, setStatus] = useState({ tone: "", texto: "" });
  const [enviando, setEnviando] = useState(false);
  const nombreRef = useRef(null);
  const telefonoRef = useRef(null);
  const stepTitleRef = useRef(null);
  const prevStep = useRef(step);

  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    stepTitleRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    if (!serviceRequest) return;
    setServicio(serviceRequest.id);
    setStep(2);
    setStatus({ tone: "info", texto: "Servicio elegido. Ahora elige día y hora." });
  }, [serviceRequest]);

  const fecha = useMemo(
    () => dias.find((dia) => claveFecha(dia) === fechaClave) || null,
    [dias, fechaClave]
  );
  const horasDia = useMemo(
    () => (fecha ? horasDisponibles(fecha) : []),
    [fecha]
  );
  const hoy = new Date();
  const servicioElegido = SERVICIOS.find((item) => item.id === servicio);
  const servicioNombre =
    servicioElegido?.nombre || (servicio === "personalizado" ? "Diseño personalizado" : "—");

  const resetStatus = () => {
    if (status.texto) setStatus({ tone: "", texto: "" });
  };

  const elegirServicio = (id) => {
    setServicio(id);
    resetStatus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nombre = datos.nombre.trim();
    const telefono = datos.telefono.trim();
    const nota = datos.nota.trim();

    if (!servicio) {
      setStatus({ tone: "error", texto: "Elige un servicio para continuar." });
      setStep(1);
      return;
    }
    if (!fecha || !hora) {
      setStatus({ tone: "error", texto: "Elige día y hora para tu cita." });
      setStep(2);
      return;
    }
    if (!nombre) {
      setStatus({ tone: "error", texto: "Escribe tu nombre para continuar." });
      nombreRef.current?.focus();
      return;
    }
    if (!telefono) {
      setStatus({ tone: "error", texto: "Escribe tu WhatsApp para confirmar la cita." });
      telefonoRef.current?.focus();
      return;
    }

    const mensaje = mensajeTurno({
      servicio,
      fecha,
      hora,
      nombre,
      telefono,
      nota,
    });
    const enlace = waLink(mensaje);

    setEnviando(true);
    setStatus({ tone: "success", texto: "Te abrimos WhatsApp para confirmar tu turno." });
    window.open(enlace, "_blank", "noopener,noreferrer");

    if (SITE.formspree) {
      try {
        await fetch(SITE.formspree, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            tipo: "turno",
            nombre,
            telefono,
            nota,
            servicio,
            fecha: claveFecha(fecha),
            hora,
          }),
        });
      } catch {
        // WhatsApp sigue siendo el canal de confirmación.
      }
    }
    setEnviando(false);
  };

  return (
    <section className="booking t-light" id="turnos" aria-labelledby="turnos-title">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <Label>Reserva</Label>
          <h2 className="h2" id="turnos-title">
            Reserva tu lugar
            <br />
            <em>en 3 pasos</em>
          </h2>
          <p className="lead">{proximoTurnoTexto()}</p>
          <p className="sec-note">
            <StarIcon size={10} />
            Elige tu servicio, día y hora. Confirmamos por WhatsApp.
          </p>
          <p className="booking__tip">
            <span aria-hidden="true">📌</span>{" "}
            <span>
              <strong>Recomendación:</strong> Si es tu primera vez, ven con tus uñas naturales o
              avísanos si necesitas retiro del set anterior.
            </span>
          </p>
        </div>

        <div className="booking__grid">
          <div className="booking__card" data-reveal>
            <ol className="steps" aria-label="Pasos para pedir tu turno">
              {PASOS.map((paso) => {
                const estado =
                  step === paso.numero ? "is-current" : step > paso.numero ? "is-done" : "";
                return (
                  <li
                    key={paso.numero}
                    className={estado}
                    aria-current={step === paso.numero ? "step" : undefined}
                  >
                    <span className="steps__num">
                      {step > paso.numero ? <StarIcon size={9} /> : `0${paso.numero}`}
                    </span>
                    {paso.titulo}
                  </li>
                );
              })}
            </ol>

            {step === 1 ? (
              <div className="step is-active">
                <div className="step__head">
                  <span className="step__num">01</span>
                  <h3 className="step__title" ref={stepTitleRef} tabIndex={-1}>
                    Elige tu servicio
                  </h3>
                </div>
                <fieldset className="booking__fieldset">
                  <legend className="sr-only">Servicio</legend>
                  <div className="chips booking__services">
                    {SERVICIOS.map((item) => (
                      <label
                        key={item.id}
                        className={`chip ${servicio === item.id ? "is-active" : ""}`.trim()}
                      >
                        <input
                          className="sr-only"
                          type="radio"
                          name="servicio"
                          value={item.id}
                          checked={servicio === item.id}
                          onChange={() => elegirServicio(item.id)}
                        />
                        <span>{item.nombre}</span>
                        <small>{item.desde ? "Desde " : ""}{precio(item.price)}</small>
                      </label>
                    ))}
                    <label className={`chip ${servicio === "personalizado" ? "is-active" : ""}`.trim()}>
                      <input
                        className="sr-only"
                        type="radio"
                        name="servicio"
                        value="personalizado"
                        checked={servicio === "personalizado"}
                        onChange={() => elegirServicio("personalizado")}
                      />
                      <span>Diseño personalizado</span>
                      <small>A cotizar</small>
                    </label>
                  </div>
                </fieldset>
                <div className="step__actions">
                  <button
                    className="btn btn--wide"
                    type="button"
                    disabled={!servicio}
                    onClick={() => {
                      resetStatus();
                      setStep(2);
                    }}
                  >
                    Continuar
                    <StarIcon size={11} />
                  </button>
                  <p className="step__hint">Elige una opción para activar el botón.</p>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="step is-active">
                <div className="step__head">
                  <span className="step__num">02</span>
                  <h3 className="step__title" ref={stepTitleRef} tabIndex={-1}>
                    Elige día y hora
                  </h3>
                </div>

                <fieldset className="booking__fieldset">
                  <legend className="form-label">Día</legend>
                  <div className="dates">
                    {dias.map((dia) => {
                      const clave = claveFecha(dia);
                      const esHoy = dia.toDateString() === hoy.toDateString();
                      return (
                        <label
                          key={clave}
                          className={`date ${fechaClave === clave ? "is-active" : ""}`.trim()}
                          title={`${DIAS_CORTO[dia.getDay()]} ${dia.getDate()} de ${MESES_LARGO[dia.getMonth()]}`}
                        >
                          <input
                            className="sr-only"
                            type="radio"
                            name="fecha"
                            value={clave}
                            checked={fechaClave === clave}
                            onChange={() => {
                              setFechaClave(clave);
                              setHora("");
                              resetStatus();
                            }}
                            aria-label={`${esHoy ? "Hoy, " : ""}${DIAS_CORTO[dia.getDay()]} ${dia.getDate()} de ${MESES_LARGO[dia.getMonth()]}`}
                          />
                          <small>{esHoy ? "Hoy" : DIAS_CORTO[dia.getDay()]}</small>
                          <strong>{dia.getDate()}</strong>
                          <em>{MESES_CORTO[dia.getMonth()]}</em>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="booking__fieldset">
                  <legend className="form-label">Hora</legend>
                  {fecha ? (
                    horasDia.length ? (
                      <div className="times">
                        {horasDia.map((opcion) => (
                          <label
                            key={opcion}
                            className={`time ${hora === opcion ? "is-active" : ""}`.trim()}
                          >
                            <input
                              className="sr-only"
                              type="radio"
                              name="hora"
                              value={opcion}
                              checked={hora === opcion}
                              onChange={() => {
                                setHora(opcion);
                                resetStatus();
                              }}
                            />
                            {opcion}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <p className="step__hint">
                        No quedan horarios para este día. Elige otra fecha.
                      </p>
                    )
                  ) : (
                    <p className="step__hint">
                      Elige un día para ver los horarios disponibles.
                    </p>
                  )}
                </fieldset>

                <p className="step__hint">
                  <StarIcon size={9} />
                  Elige un día y una hora. Luego continúa para dejar tus datos.
                </p>

                <div className="step__actions">
                  <button
                    className="btn btn--wide"
                    type="button"
                    disabled={!fecha || !hora}
                    onClick={() => {
                      resetStatus();
                      setStep(3);
                    }}
                  >
                    Continuar
                    <StarIcon size={11} />
                  </button>
                  <button className="step__back" type="button" onClick={() => setStep(1)}>
                    &larr; Volver al servicio
                  </button>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="step is-active">
                <div className="step__head">
                  <span className="step__num">03</span>
                  <h3 className="step__title" ref={stepTitleRef} tabIndex={-1}>
                    Tus datos
                  </h3>
                </div>

                <dl className="resumen">
                  <dt>Servicio</dt>
                  <dd>{servicioNombre}</dd>
                  <dt>Día</dt>
                  <dd>{fecha ? formatoFecha(fecha) : "—"}</dd>
                  <dt>Hora</dt>
                  <dd>{hora || "—"}</dd>
                </dl>

                <form onSubmit={handleSubmit} noValidate>
                  <label className="field" htmlFor="agendaName">
                    <span>
                      Nombre <em className="req" aria-hidden="true">*</em>
                    </span>
                    <input
                      id="agendaName"
                      ref={nombreRef}
                      type="text"
                      autoComplete="name"
                      value={datos.nombre}
                      onChange={(event) => setDatos({ ...datos, nombre: event.target.value })}
                      required
                    />
                  </label>
                  <label className="field" htmlFor="agendaPhone">
                    <span>
                      WhatsApp <em className="req" aria-hidden="true">*</em>
                    </span>
                    <input
                      id="agendaPhone"
                      ref={telefonoRef}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={datos.telefono}
                      onChange={(event) => setDatos({ ...datos, telefono: event.target.value })}
                      required
                    />
                  </label>
                  <label className="field" htmlFor="agendaNote">
                    <span>Notas (opcional)</span>
                    <textarea
                      id="agendaNote"
                      rows="2"
                      placeholder="Foto de referencia, largo, algún detalle"
                      value={datos.nota}
                      onChange={(event) => setDatos({ ...datos, nota: event.target.value })}
                    />
                  </label>

                  <button className="btn btn--lg btn--wide" type="submit" disabled={enviando}>
                    {enviando ? "Abriendo WhatsApp…" : "Pedir turno"}
                    <StarIcon size={12} />
                  </button>
                  <p className="step__privacy">
                    Tus datos solo se usan para confirmar tu cita.
                  </p>
                  <div
                    className={`form-msg form-msg--${status.tone || "info"}`}
                    role="status"
                    aria-live={status.tone === "error" ? "assertive" : "polite"}
                  >
                    {status.texto}
                  </div>
                  <button className="step__back" type="button" onClick={() => setStep(2)}>
                    &larr; Volver a día y hora
                  </button>
                </form>
              </div>
            ) : null}
          </div>

          <aside className="booking__side" data-reveal>
            {SITE.calendly ? (
              <div className="side-block">
                <h3 className="group__title">Calendario en línea</h3>
                <p className="side-text">Si prefieres ver los horarios libres en vivo:</p>
                <a
                  className="btn btn--ghost btn--wide"
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener"
                >
                  Abrir calendario
                </a>
              </div>
            ) : null}

            <div className="side-block">
              <h3 className="group__title">Horarios</h3>
              <ul className="hairlist hairlist--stars">
                {SITE.horarios.map((horario) => (
                  <li key={horario.dias}>
                    <span className="hairlist__star" aria-hidden="true">
                      <StarIcon size={8} />
                    </span>
                    <span>{horario.dias}</span>
                    <span className="hairlist__value">{horario.horas}</span>
                  </li>
                ))}
              </ul>
              <a
                className="side-link"
                href={SITE.maps}
                target="_blank"
                rel="noopener"
              >
                <span>{SITE.direccion}</span>
                <span className="arrow" aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="side-block">
              <h3 className="group__title">Bueno saber</h3>
              <ul className="side-list">
                <li>
                  <StarIcon size={8} />
                  Reserva alrededor de {SITE.agenda.duracionMin} minutos.
                </li>
                <li>
                  <StarIcon size={8} />
                  Llega 5 minutos antes, con las manos limpias.
                </li>
                <li>
                  <StarIcon size={8} />
                  Efectivo y transferencia.
                </li>
                <li>
                  <StarIcon size={8} />
                  Si necesitas retiro del set anterior, avísanos al reservar.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
