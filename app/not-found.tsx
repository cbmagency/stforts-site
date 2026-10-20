import Link from "next/link";
import { SITE } from "@/lib/site";
export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "70vh" }}>
      <div className="wrap" style={{ display: "grid", gap: 24, maxWidth: 760 }}>
        <p className="eyebrow">Page not found</p>
        <h1 className="display" style={{ fontSize: "clamp(40px,6vw,80px)" }}>Let&rsquo;s get you <em>where you need to be.</em></h1>
        <div className="hero-actions">
          <a className="btn btn-light" href={SITE.phoneHref}>Call {SITE.phone}</a>
          <Link className="btn btn-ghost" href="/">Go home</Link>
        </div>
      </div>
    </section>
  );
}
