import { useEffect, useRef, useState } from "react";
import { GALERIA, SITE } from "../data";
import { Label, StarIcon } from "./Star";

export default function Gallery() {
  const [index, setIndex] = useState(null);
  const isOpen = index !== null;
  const boxRef = useRef(null);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);
  const item = isOpen ? GALERIA[index] : null;

  const open = (position, event) => {
    triggerRef.current = event.currentTarget;
    setIndex(position);
  };

  const move = (direction) => {
    setIndex((actual) => {
      if (actual === null) return actual;
      return (actual + direction + GALERIA.length) % GALERIA.length;
    });
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIndex(null);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
        return;
      }
      if (event.key !== "Tab" || !boxRef.current) return;
      const focusables = boxRef.current.querySelectorAll("button");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <section className="gallery t-light" id="galeria" aria-labelledby="galeria-title">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <Label>Trabajos</Label>
          <h2 className="h2" id="galeria-title">
            Lo último que
            <br />
            <em>pasó por el estudio</em>
          </h2>
          <p className="sec-note">
            <StarIcon size={10} />
            Toca una foto para verla en grande.
          </p>
        </div>
      </div>

      <ul className="gallery__grid">
        {GALERIA.map((trabajo, position) => (
          <li className="tile" key={trabajo.titulo} data-reveal>
            <figure>
              <button
                className="tile__frame"
                type="button"
                onClick={(event) => open(position, event)}
                aria-label={`Ampliar ${trabajo.titulo}`}
              >
                <img
                  src={trabajo.src}
                  alt=""
                  width={trabajo.width}
                  height={trabajo.height}
                  loading="lazy"
                  decoding="async"
                />
                <span className="tile__zoom" aria-hidden="true">
                  <StarIcon size={11} />
                  Ampliar
                </span>
              </button>
              <figcaption className="tile__caption">{trabajo.titulo}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="wrap gallery__foot" data-reveal>
        <a className="link" href={SITE.instagram} target="_blank" rel="noopener">
          Ver más en Instagram <span className="arrow" aria-hidden="true">↗</span>
        </a>
      </div>

      <div
        className={`lightbox ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Galería de trabajos"
        aria-hidden={!isOpen}
        inert={!isOpen}
        ref={boxRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIndex(null);
        }}
      >
        <button
          className="lightbox__close"
          type="button"
          aria-label="Cerrar galería"
          ref={closeRef}
          onClick={() => setIndex(null)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <button
          className="lightbox__nav lightbox__nav--prev"
          type="button"
          aria-label="Foto anterior"
          onClick={() => move(-1)}
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <button
          className="lightbox__nav lightbox__nav--next"
          type="button"
          aria-label="Foto siguiente"
          onClick={() => move(1)}
        >
          <span aria-hidden="true">&rarr;</span>
        </button>

        {item ? (
          <figure className="lightbox__figure" key={item.src}>
            <img src={item.src} alt={item.titulo} width={item.width} height={item.height} />
            <figcaption>
              {item.titulo}
              <span className="lightbox__count" aria-hidden="true">
                {index + 1} / {GALERIA.length}
              </span>
            </figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
