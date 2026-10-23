const STAR_PATH =
  "M12 0c1.1 6.2 5.7 10.8 12 12-6.3 1.2-10.9 5.8-12 12-1.1-6.2-5.7-10.8-12-12C6.3 10.8 10.9 6.2 12 0Z";

export function StarIcon({ size = 12, className = "", filled = true }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={filled ? 0 : 1.3}
        d={STAR_PATH}
      />
    </svg>
  );
}

export function Label({ children, className = "" }) {
  return (
    <p className={`label ${className}`.trim()}>
      <StarIcon size={11} className="label__star" />
      <span>{children}</span>
    </p>
  );
}

const HERO_SPARKS = [
  { x: 12, y: 20, s: 2.6, d: 0.0 },
  { x: 23, y: 33, s: 1.5, d: 0.8 },
  { x: 80, y: 16, s: 2.2, d: 0.4 },
  { x: 90, y: 30, s: 1.4, d: 1.2 },
  { x: 8, y: 52, s: 1.7, d: 0.6 },
  { x: 94, y: 55, s: 2.4, d: 0.2 },
  { x: 16, y: 74, s: 2.0, d: 1.0 },
  { x: 84, y: 76, s: 1.6, d: 0.5 },
  { x: 32, y: 88, s: 1.4, d: 1.4 },
  { x: 68, y: 89, s: 2.1, d: 0.9 },
  { x: 48, y: 9, s: 1.5, d: 1.6 },
  { x: 61, y: 12, s: 1.1, d: 0.3 },
  { x: 40, y: 20, s: 1.0, d: 1.9 },
  { x: 72, y: 44, s: 1.2, d: 1.1 },
];

export function Sparkles({ className = "" }) {
  return (
    <div className={`sparkles ${className}`.trim()} aria-hidden="true">
      {HERO_SPARKS.map((p, i) => (
        <span
          className="spark"
          key={i}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.s}rem`,
            "--delay": `${p.d}s`,
          }}
        >
          <StarIcon />
        </span>
      ))}
    </div>
  );
}

const MENU_SPARKS = [
  { x: 86, y: 12, s: 14 },
  { x: 74, y: 28, s: 8 },
  { x: 92, y: 48, s: 10 },
  { x: 12, y: 82, s: 12 },
  { x: 28, y: 68, s: 7 },
];

export function MenuSparks() {
  return (
    <div className="menu__sparks" aria-hidden="true">
      {MENU_SPARKS.map((p, i) => (
        <span
          key={i}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          className={`menu__spark menu__spark--${i % 3}`}
        >
          <StarIcon size={p.s} />
        </span>
      ))}
    </div>
  );
}

export function StarRule({ className = "" }) {
  return (
    <div className={`star-rule ${className}`.trim()} aria-hidden="true">
      <span />
      <StarIcon size={14} />
      <span />
    </div>
  );
}
