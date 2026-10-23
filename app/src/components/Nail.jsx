import { useId } from "react";

export const NAIL_PATHS = {
  almendrada:
    "M32,186 C28,142 24,95 24,66 C24,42 40,20 60,8 C80,20 96,42 96,66 C96,95 92,142 88,186 C83,194 37,194 32,186 Z",
  coffin:
    "M30,186 C27,140 24,92 24,64 C24,50 30,40 38,36 L82,36 C90,40 96,50 96,64 C96,92 93,140 90,186 C85,194 35,194 30,186 Z",
  stiletto:
    "M32,186 C28,142 26,100 30,70 C34,44 46,20 60,4 C74,20 86,44 90,70 C94,100 92,142 88,186 C83,194 37,194 32,186 Z",
  oval:
    "M32,186 C28,140 24,94 24,64 C24,40 40,22 60,14 C80,22 96,40 96,64 C96,94 92,140 88,186 C83,194 37,194 32,186 Z",
  cuadrada:
    "M30,186 C26,140 22,90 22,58 C22,44 30,34 44,32 L76,32 C90,34 98,44 98,58 C98,90 94,140 90,186 C85,194 35,194 30,186 Z",
};

const FINGERS = [
  { w: 1.06, rot: -15, len: 0.94 },
  { w: 0.99, rot: -7, len: 1.0 },
  { w: 1.0, rot: 0, len: 1.06 },
  { w: 0.94, rot: 7, len: 1.0 },
  { w: 0.86, rot: 15, len: 0.92 },
];

const LEN_SCALE = { corto: 0.78, medio: 1, largo: 1.22 };

export function NailSvg({ shape = "almendrada", color = "#a98bc7", acabado = "crema", className = "" }) {
  const rawId = useId().replace(/:/g, "");
  const d = NAIL_PATHS[shape] || NAIL_PATHS.almendrada;
  const gloss = (
    <path
      fill="#ffffff"
      opacity={acabado === "mate" ? ".18" : ".42"}
      d="M40,170 C37,130 34,95 36,72 C38,54 46,38 56,30 C48,52 46,92 48,130 C49,150 51,164 53,172 C48,176 43,175 40,170 Z"
    />
  );

  let defs = null;
  let base = <path fill={color} d={d} />;

  if (acabado === "chrome") {
    const gid = `chrome-${rawId}`;
    defs = (
      <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="22%" stopColor={color} />
        <stop offset="45%" stopColor="#ffffff" />
        <stop offset="68%" stopColor={color} />
        <stop offset="100%" stopColor="#ffe6ef" />
      </linearGradient>
    );
    base = <path fill={`url(#${gid})`} d={d} />;
  }

  if (acabado === "glitter") {
    const gid = `glit-${rawId}`;
    const cid = `clip-${rawId}`;
    defs = (
      <>
        <pattern id={gid} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.7" fill="#ffffff" opacity=".95" />
          <circle cx="13" cy="9" r="1.2" fill="#fff3f7" opacity=".85" />
          <circle cx="8" cy="15" r="1" fill="#ffffff" opacity=".8" />
        </pattern>
        <clipPath id={cid}>
          <path d={d} />
        </clipPath>
      </>
    );
    base = (
      <>
        <path fill={color} d={d} />
        <rect x="0" y="0" width="120" height="200" fill={`url(#${gid})`} clipPath={`url(#${cid})`} opacity=".75" />
      </>
    );
  }

  if (acabado === "frances") {
    const cid = `clipf-${rawId}`;
    defs = (
      <clipPath id={cid}>
        <path d={d} />
      </clipPath>
    );
    base = (
      <>
        <path fill={color} d={d} />
        <ellipse cx="60" cy="10" rx="260" ry="62" fill="#ffffff" clipPath={`url(#${cid})`} opacity=".96" />
      </>
    );
  }

  if (acabado === "mate") {
    base = (
      <>
        {base}
        <path fill="#2b232b" opacity=".05" d={d} />
      </>
    );
  }

  return (
    <svg viewBox="0 0 120 200" aria-hidden="true" focusable="false" className={className}>
      {defs ? <defs>{defs}</defs> : null}
      {base}
      {gloss}
    </svg>
  );
}

export function NailRow({ shape, color, acabado, largo = "medio", popKey = "", className = "" }) {
  return (
    <div className={`nail-row ${className}`.trim()}>
      {FINGERS.map((finger, i) => {
        const scaleY = LEN_SCALE[largo] * finger.len;
        const base = `rotate(${finger.rot}deg) scale(1, ${scaleY.toFixed(3)})`;
        return (
          <div
            className="nail nail--pop"
            key={`${popKey}-${i}`}
            style={{
              "--nail-base": base,
              "--nail-w": finger.w,
              animationDelay: `${i * 35}ms`,
            }}
          >
            <NailSvg shape={shape} color={color} acabado={acabado} />
          </div>
        );
      })}
    </div>
  );
}
