import type { Metadata } from "next";
import { Reviews, ClosingCta, JsonLd, crumbs } from "@/components/blocks";
import { ChatIcon, PhoneIcon } from "@/components/icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Someone Has Passed? Call Now — 24/7 Funeral Help in North Miami Beach | St. Fort's",
  description: "If a loved one has just passed, call St. Fort's at (305) 710-7919. A funeral director answers 24/7 and guides you through every next step. Serving Miami-Dade & Broward.",
  alternates: { canonical: "/immediate-need" },
};

const STEPS = [
  { t: "Call us", b: "A funeral director answers day or night. Tell us where your loved one is, and we'll explain exactly what happens next." },
  { t: "We bring them into our care", b: "We come to the home, hospital, nursing home or hospice — anywhere in Miami-Dade or Broward — with dignity and respect." },
  { t: "We sit down together", b: "When you're ready, we meet in person or by phone to talk through your wishes, your traditions and every cost." },
  { t: "We handle the details", b: "Permits, death certificates, the church or cemetery, flowers, programs and the service itself. You focus on your family." },
];

export default function ImmediateNeed() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 72 }}>
        <div className="wrap" style={{ display: "grid", gap: 28, maxWidth: 980 }}>
          <p className="eyebrow">Immediate need · 24 hours a day</p>
          <h1 className="display">If someone has just passed, <em>we&rsquo;re here right now.</em></h1>
          <p className="lede">Take a breath. You don&rsquo;t need to have any answers yet. Call us, and a funeral director will guide you through the next hour, the next day, and everything after.</p>
          <div className="hero-actions" data-track="immediate_hero">
            <a className="btn btn-light" href={SITE.helpPhoneHref} style={{ minHeight: 64, fontSize: 18, padding: "0 34px" }}><PhoneIcon /> Call {SITE.helpPhone}</a>
            <a className="btn btn-ghost" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer"><ChatIcon /> WhatsApp us</a>
          </div>
          <p className="muted">English · Español · Kreyòl ayisyen</p>
        </div>
      </section>

      <section className="section stone">
        <div className="wrap" style={{ display: "grid", gap: 56 }}>
          <div className="reveal" style={{ display: "grid", gap: 18, maxWidth: 680 }}>
            <p className="eyebrow">What happens next</p>
            <h2 className="h2">Four steps. <em>We walk every one with you.</em></h2>
          </div>
          <ol className="points reveal" style={{ listStyle: "none", margin: 0, padding: 0, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {STEPS.map((s, i) => (
              <li className="point" key={s.t}>
                <span className="serif" style={{ fontSize: 28, color: "var(--champagne-deep)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3" style={{ marginTop: 12 }}>{s.t}</h3>
                <p style={{ marginTop: 10 }}>{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="reveal" style={{ display: "grid", gap: 20 }}>
            <p className="eyebrow">Before you call</p>
            <h2 className="h2">A few things <em>worth knowing.</em></h2>
          </div>
          <div className="reveal" style={{ display: "grid", gap: 28 }}>
            <div><h3 className="h3">If the passing was unexpected at home</h3><p style={{ marginTop: 8 }}>Call 911 first. Emergency responders, and sometimes the Medical Examiner, need to be involved before your loved one can be moved. Then call us.</p></div>
            <div><h3 className="h3">If your loved one was in hospice</h3><p style={{ marginTop: 8 }}>Call the hospice nurse first to confirm the passing. Then call us — we&rsquo;ll coordinate with hospice directly.</p></div>
            <div><h3 className="h3">If they were in a hospital or nursing home</h3><p style={{ marginTop: 8 }}>Let the staff know you&rsquo;ve chosen St. Fort&rsquo;s, or call us and we&rsquo;ll contact them for you.</p></div>
            <div><h3 className="h3">What can wait</h3><p style={{ marginTop: 8 }}>Almost everything else. You don&rsquo;t need to choose burial or cremation in the first hour. We&rsquo;ll slow things down, not rush you.</p></div>
          </div>
        </div>
      </section>

      <Reviews limit={4} compact />
      <ClosingCta title={<>One call, and <em>we&rsquo;ll take it from here.</em></>} />
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Immediate Need", path: "/immediate-need" }])} />
    </>
  );
}
