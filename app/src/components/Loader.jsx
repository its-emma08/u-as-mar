import { StarIcon } from "./Star";

export default function Loader({ leaving }) {
  return (
    <div className={`loader ${leaving ? "is-leaving" : ""}`.trim()} role="status" aria-live="polite">
      <span className="sr-only">Cargando Uñas Mar…</span>
      <div className="loader__visual" aria-hidden="true">
        <div className="loader__brand">
          Uñas <em>Mar</em>
        </div>
        <div className="loader__line">
          <span />
        </div>
        <div className="loader__star">
          <StarIcon />
        </div>
      </div>
    </div>
  );
}
