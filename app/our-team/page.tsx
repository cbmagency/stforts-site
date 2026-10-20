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
          <h1 className="display">The people who will <em>care for your family.</em></h1>
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
            {/* TODO(client): bio from Evans */}
            <p className="lede">Evans leads St. Fort&rsquo;s with a simple belief: every family deserves to be cared for personally. [Full bio pending client approval.]</p>
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
