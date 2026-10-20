"use client";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { PhoneIcon } from "./icons";

// Scroll-scrubbed flower-field film. Frames are drawn to a canvas as the
// visitor scrolls; the call button is visible from the first frame.
const SETS = {
  d: { count: 96, path: "/hero/d/f_" },
  m: { count: 64, path: "/hero/m/f_" },
};

const STAGES = [
  { from: 0, to: 0.34, kicker: "A boutique funeral home", line: <>Every life deserves a <em>beautiful</em> goodbye.</> },
  { from: 0.34, to: 0.68, kicker: "Personally guided", line: <>We handle every detail, <em>so you can grieve.</em></> },
  { from: 0.68, to: 1.01, kicker: "Here 24 hours a day", line: <>You don&rsquo;t have to do this <em>alone.</em></> },
];

export default function HeroScroll() {
  const wrapRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // poster image stays; text still cycles via scroll
    const set = window.innerWidth < 760 ? SETS.m : SETS.d;
    const imgs: HTMLImageElement[] = [];
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let current = -1;
    let raf = 0;

    const draw = (i: number) => {
      const img = imgs[i];
      if (!img || !img.complete || !img.naturalWidth) return false;
      const cw = canvas.width, ch = canvas.height;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      return true;
    };
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      current = -1;
      tick();
    };
    const tick = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / span));
      setProgress(p);
      const i = Math.min(set.count - 1, Math.round(p * (set.count - 1)));
      if (i !== current) {
        // fall back to nearest loaded frame while the rest stream in
        for (let k = i; k >= 0; k--) if (draw(k)) { current = i; break; }
      }
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };

    // Load first frame fast, then the rest in order.
    for (let i = 0; i < set.count; i++) {
      const img = new Image();
      img.decoding = "async";
      if (i === 0) img.onload = () => { setReady(true); size(); };
      else img.onload = () => { if (Math.abs(i - current) < 3) { current = -1; tick(); } };
      img.src = `${set.path}${String(i + 1).padStart(3, "0")}.webp`;
      imgs.push(img);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", size);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", size);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Text stages also work when motion is reduced.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const on = () => {
      const el = wrapRef.current; if (!el) return;
      const span = el.offsetHeight - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -el.getBoundingClientRect().top / span)));
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section ref={wrapRef} className="hero" aria-label="Introduction">
      <div className="hero-stick">
        <img className="hero-poster" src="/hero/poster.jpg" alt="" aria-hidden fetchPriority="high" />
        <canvas ref={canvasRef} className="hero-canvas" style={{ opacity: ready ? 1 : 0, transition: "opacity .8s" }} aria-hidden />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="hero-stages">
          {STAGES.map((s, i) => {
            const on = progress >= s.from && progress < s.to;
            return (
              <div key={i} className={`hero-stage ${on ? "" : "off"}`} aria-hidden={!on}>
                <div className="wrap">
                  <p className="eyebrow" style={{ marginBottom: 20 }}>{s.kicker}</p>
                  <p className="display" style={{ color: "var(--ivory)", maxWidth: "13ch" }}>{s.line}</p>
                </div>
              </div>
            );
          })}
          </div>
          <div className="wrap">
            <h1 className="hero-h1">Funeral &amp; Cremation Services in North Miami Beach</h1>
            <div className="hero-actions">
              <a href={SITE.phoneHref} className="btn btn-light" data-track="hero"><PhoneIcon /> Speak with a funeral director</a>
              <a href="/planning-ahead" className="btn btn-ghost">Plan ahead</a>
            </div>
            <div className="hero-meta">
              <a href={SITE.googleReviewsHref} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ivory)" }}><span>★ {SITE.rating.stars} · {SITE.rating.count} Google reviews</span></a><span>Family-owned</span><span>Open 24/7</span><span>English · Español · Kreyòl</span><span>Serving Miami-Dade &amp; Broward</span>
            </div>
          </div>
        </div>
        <span className="scroll-cue">Scroll</span>
        <div className="progress" style={{ width: `${progress * 100}%` }} />
      </div>
    </section>
  );
}
