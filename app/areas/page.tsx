import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta, JsonLd, crumbs } from "@/components/blocks";
import { AREAS } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Funeral Home Serving Miami-Dade & Broward | St. Fort's Service Areas",
  description: "St. Fort's Funeral Home in North Miami Beach serves families across Miami-Dade and Broward, from North Miami and Aventura to Hollywood and Fort Lauderdale.",
  alternates: { canonical: "/areas" },
};

export default function Areas() {
  const counties = ["Miami-Dade", "Broward"] as const;
  return (
    <>
      <section className="page-hero">
        <div className="wrap" style={{ display: "grid", gap: 26, maxWidth: 980 }}>
          <p className="eyebrow">Service areas</p>
          <h1 className="display">Serving all of <em>South Florida.</em></h1>
          <p className="lede">Our home is in North Miami Beach, but we come to families across Miami-Dade and Broward — at home, in the hospital or in hospice care.</p>
        </div>
      </section>
      {counties.map((c, i) => (
        <section key={c} className={`section tight ${i === 0 ? "stone" : ""}`}>
          <div className="wrap" style={{ display: "grid", gap: 36 }}>
            <h2 className="h2">{c} <em>County</em></h2>
            <div className="chips">
              {AREAS.filter((a) => a.county === c).map((a) => (
                <Link key={a.slug} href={`/areas/${a.slug}`} className="chip">Funeral home serving {a.name}</Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      <ClosingCta />
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Service Areas", path: "/areas" }])} />
    </>
  );
}
