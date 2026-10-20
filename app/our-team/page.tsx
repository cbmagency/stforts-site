import type { Metadata } from "next";
import { ClosingCta, JsonLd, crumbs } from "@/components/blocks";
import { TEAM } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team | St. Fort's Funeral Home & Cremation, North Miami Beach",
  description: "Meet the St. Fort family and the funeral directors who care for families across Miami-Dade and Broward. Family-owned, in North Miami Beach.",
  alternates: { canonical: "/our-team" },
};

export default function Team() {
  const [evans, ...rest] = TEAM;
  return (
    <>
      <section className="page-hero">
        <div className="wrap" style={{ display: "grid", gap: 26, maxWidth: 980 }}>
          <p className="eyebrow">Our team</p>
          <h1 className="display">Our funeral directors <em>in North Miami Beach.</em></h1>
          <p className="lede">A family-owned funeral home means you&rsquo;re cared for by people who treat this work as a calling — and treat your family like their own.</p>
        </div>
      </section>
      <section className="section stone">
        <div className="wrap split">
          <div className="frame reveal" style={{ aspectRatio: "3/4", maxWidth: 460 }}>
            <img src={evans.photo} alt={`Portrait of ${evans.name}`} />
          </div>
          <div className="reveal" style={{ display: "grid", gap: 20 }}>
            <p className="eyebrow">{evans.title}</p>
            <h2 className="h2">{evans.name}</h2>
            {/* TODO(client): Evans to confirm Lynn University and the 2010 Haiti details */}
            <p className="lede">Evans St. Fort is a Miami-born, Haitian-American licensed funeral director. He earned his degree in mortuary science and founded St. Fort&rsquo;s Funeral Home &amp; Cremation in North Miami Beach in 2003, at 25.</p>
            <p>Under his leadership, St. Fort&rsquo;s has stayed family-owned and independent, serving families across Miami-Dade and Broward with care rooted in faith and culture. After the 2010 earthquake in Haiti, St. Fort&rsquo;s helped grieving families at no cost. In 2025, the City of North Miami Beach renamed a stretch of NE 165th Street &ldquo;St. Fort Drive&rdquo; in honor of the family.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 56 }}>
          <h2 className="h2 reveal">Our <em>funeral team</em></h2>
          <div className="team-grid">
            {rest.map((m) => (
              <div key={m.name} className="team-card reveal">
                <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" width={296} height={395} />
                <p className="team-name">{m.name}</p>
                {m.title && <p className="team-title">{m.title}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <ClosingCta />
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Our Team", path: "/our-team" }])} />
    </>
  );
}
