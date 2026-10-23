import { MARQUEE } from "../data";
import { StarIcon } from "./Star";

function Set({ hidden = false }) {
  return (
    <div className="marquee__set" aria-hidden={hidden || undefined}>
      {MARQUEE.map((item, index) => (
        <span className="marquee__item" key={`${item}-${index}`}>
          {item}
          <StarIcon size={14} className="marquee__star" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee t-dark" aria-hidden="true">
      <div className="marquee__inner">
        <Set />
        <Set hidden />
      </div>
    </section>
  );
}
