import { useEffect, useRef, useState } from "react";
import { MANIFIESTO, MANIFIESTO_TEXTO } from "../data";
import { StarIcon } from "./Star";

export default function Manifesto() {
  const ref = useRef(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(MANIFIESTO.length);
      return undefined;
    }

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const start = window.innerHeight * 0.82;
        const end = window.innerHeight * 0.32;
        const total = rect.height + (start - end);
        const progress = Math.min(1, Math.max(0, (start - rect.top) / total));
        setLit(Math.round(progress * MANIFIESTO.length));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="statement t-light" aria-label="Nuestra forma de trabajar">
      <div className="statement__inner">
        <span className="statement__star statement__star--top" aria-hidden="true">
          <StarIcon size={18} />
        </span>
        <p className="statement__text" ref={ref} aria-label={MANIFIESTO_TEXTO}>
          {MANIFIESTO.map((word, index) => {
            const lilac = /manos|piden\./i.test(word);
            return (
              <span
                key={`${word}-${index}`}
                className={`word ${lilac ? "is-lilac" : ""} ${index < lit ? "is-lit" : ""}`}
                aria-hidden="true"
              >
                {word}
              </span>
            );
          })}
        </p>
        <span className="statement__star statement__star--bottom" aria-hidden="true">
          <StarIcon size={12} />
        </span>
      </div>
    </section>
  );
}
