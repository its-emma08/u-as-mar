import { useEffect, useRef, useState } from "react";
import { DESTACADOS } from "../data";
import { Label, StarIcon } from "./Star";

export default function Highlights() {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ prev: true, next: false });

  const sync = () => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      prev: track.scrollLeft < 8,
      next: track.scrollLeft > track.scrollWidth - track.clientWidth - 8,
    });
  };

  useEffect(() => {
    sync();
    const track = trackRef.current;
    if (!track) return undefined;
    const observer = new ResizeObserver(sync);
    observer.observe(track);
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  const move = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".hl-card");
    const step = card ? card.offsetWidth + 22 : 400;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * step, behavior: reducir ? "auto" : "smooth" });
  };

  return (
    <section className="highlights t-dark" aria-labelledby="highlights-title">
      <div className="wrap">
        <div className="hl-head" data-reveal>
          <div className="sec-head">
            <Label>Lo que nos hace únicas</Label>
            <h2 className="h2" id="highlights-title">
              El cuidado que
              <br />
              <em>tus manos necesitan</em>
            </h2>
            <p className="hl-hint">
              <StarIcon size={10} />
              Desliza o usa las flechas para recorrer los favoritos.
            </p>
          </div>
          <div className="hl-nav">
            <button
              className="hl-btn"
              type="button"
              aria-label="Ver destacado anterior"
              aria-controls="hl-track"
              onClick={() => move(-1)}
              disabled={edges.prev}
            >
              <span aria-hidden="true">&larr;</span>
            </button>
            <button
              className="hl-btn"
              type="button"
              aria-label="Ver siguiente destacado"
              aria-controls="hl-track"
              onClick={() => move(1)}
              disabled={edges.next}
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        <ul className="hl-benefits" data-reveal>
          <li>
            <span className="hl-benefits__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6M12 17v6M1 12h6M17 12h6" />
              </svg>
            </span>
            <p>
              <strong>100% Exclusivo:</strong> El espacio es solo para ti durante tu cita.
            </p>
          </li>
          <li>
            <span className="hl-benefits__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </span>
            <p>
              <strong>Detalle impecable:</strong> Cuidamos la salud de tus uñas sin trabajar a las
              carreritas.
            </p>
          </li>
          <li>
            <span className="hl-benefits__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.65-7 10-7 10z" />
              </svg>
            </span>
            <p>
              <strong>Tu estilo:</strong> Hacemos realidad la idea que traigas en mente.
            </p>
          </li>
        </ul>
      </div>

      <div
        className="hl-track"
        id="hl-track"
        ref={trackRef}
        onScroll={sync}
        role="region"
        aria-label="Trabajos destacados"
        tabIndex={0}
      >
        {DESTACADOS.map((item) => (
          <article className="hl-card" key={item.title}>
            <div className="hl-card__media">
              <img
                src={item.src}
                alt={item.title}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
              />
              <span className="hl-card__badge" aria-hidden="true">
                <StarIcon size={12} />
              </span>
            </div>
            <div className="hl-card__body">
              <span className="hl-card__label">
                <StarIcon size={9} />
                {item.label}
              </span>
              <h3 className="hl-card__title">{item.title}</h3>
              <p className="hl-card__text">{item.texto}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
