import type { Metadata } from "next";
import { ClosingCta, JsonLd, crumbs } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Contact St. Fort's Funeral Home | North Miami Beach, Open 24/7",
  description: "Call St. Fort's Funeral Home at (754) 707-2631, 24/7. Visit us at 16480 NE 19th Avenue, North Miami Beach, FL 33162, or request a callback.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 26, maxWidth: 980 }}>
          <p className="eyebrow">Contact</p>
          <h1 className="display">Call, message, or <em>stop by.</em></h1>
          <p className="lede">A funeral director answers 24 hours a day, 7 days a week — in English, Spanish or Haitian Creole.</p>
        </div>
      </section>
      <ClosingCta title={<>We&rsquo;re here <em>whenever you need us.</em></>} />
      <section aria-label="Map" style={{ height: 420, borderTop: "1px solid var(--line)" }}>
        <iframe
          title="Map to St. Fort's Funeral Home"
          src="https://www.google.com/maps?q=16480+NE+19th+Avenue,+North+Miami+Beach,+FL+33162&output=embed"
          style={{ border: 0, width: "100%", height: "100%", filter: "grayscale(1) invert(.92) contrast(.9)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
