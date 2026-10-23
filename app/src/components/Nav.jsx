import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE, waLink } from "../data";
import { MenuSparks, StarIcon } from "./Star";

const MENSAJE = "Hola Uñas Mar. Vengo de la web y quiero información.";

function scrollToId(href) {
  const target = document.querySelector(href);
  if (!target) return;
  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "start" });
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        const y = window.scrollY + 150;
        let current = "";
        for (const link of NAV_LINKS) {
          const section = document.querySelector(link.href);
          if (section && section.offsetTop <= y) current = link.href;
        }
        setActive(current);
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

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    const firstLink = menu?.querySelector("a");
    const focusTimer = window.setTimeout(() => firstLink?.focus(), 60);

    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menu) return;
      const focusables = menu.querySelectorAll("a, button");
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
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    const burger = burgerRef.current;
    if (burger && document.activeElement && menuRef.current?.contains(document.activeElement)) {
      burger.focus();
    }
  }, [open]);

  const go = (event, href) => {
    event.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToId(href), 80);
  };

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <a className="nav__logo" href="#top" onClick={(event) => go(event, "#top")}>
          Uñas <em>Mar</em>
        </a>

        <nav className="nav__links" aria-label="Secciones del sitio">
          {NAV_LINKS.slice(0, 5).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href ? "is-active" : ""}
              aria-current={active === link.href ? "location" : undefined}
              onClick={(event) => go(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <a className="nav__wa" href={waLink(MENSAJE)} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a className="btn btn--sm" href="#turnos" onClick={(event) => go(event, "#turnos")}>
            <StarIcon size={11} />
            Agendar
          </a>
          <button
            className={`burger ${open ? "is-open" : ""}`}
            ref={burgerRef}
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`menu ${open ? "is-open" : ""}`}
        id="menu-principal"
        ref={menuRef}
        aria-hidden={!open}
        inert={!open}
      >
        <MenuSparks />
        <nav className="menu__links" aria-label="Menú principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-index={link.index}
              onClick={(event) => go(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a href={waLink(MENSAJE)} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
            WhatsApp
          </a>
          <a href={SITE.instagram} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
            Instagram
          </a>
          <span className="menu__place">{SITE.ciudad}</span>
        </div>
      </div>
    </>
  );
}
