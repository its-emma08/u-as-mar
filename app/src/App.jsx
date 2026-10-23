import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Highlights from "./components/Highlights";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Note from "./components/Note";
import Studio from "./components/Studio";
import Gallery from "./components/Gallery";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Closing from "./components/Closing";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

export default function App() {
  const [reducir] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [loading, setLoading] = useState(!reducir);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [serviceRequest, setServiceRequest] = useState(null);

  useEffect(() => {
    if (!loading) return undefined;
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1250);
    const hideTimer = window.setTimeout(() => setLoading(false), 1750);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, [loading]);

  useEffect(() => {
    if (!loading) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [loading]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
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
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) return undefined;

    if (reducir) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [reducir]);

  const chooseService = (id) => {
    setServiceRequest({ id, at: Date.now() });
    const target = document.querySelector("#turnos");
    if (!target) return;
    target.scrollIntoView({
      behavior: reducir ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      {loading ? <Loader leaving={leaving} /> : null}

      <Nav />
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Manifesto />
        <Highlights />
        <Marquee />
        <Services onSelectService={chooseService} />
        <Note />
        <Studio />
        <Gallery />
        <Booking serviceRequest={serviceRequest} />
        <Contact />
        <Closing />
      </main>

      <Footer />
    </>
  );
}
