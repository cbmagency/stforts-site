import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta, JsonLd, crumbs } from "@/components/blocks";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Evans St. Fort, Founder & CEO | St. Fort's Funeral Home, North Miami Beach",
  description:
    "Meet Evans St. Fort, the Miami-born, Haitian-American licensed funeral director who founded St. Fort's Funeral Home & Cremation in North Miami Beach in 2003.",
  alternates: { canonical: "/our-founder" },
  openGraph: { images: ["/images/st-fort-drive.jpg"] },
};

// TODO(client): Evans to confirm the Lynn University degree, the 2010 Haiti story, and the dedication month.
const TIMELINE = [
  { yr: "2003", t: "A funeral home of his own, at 25", b: "After earning his degree in mortuary science, Evans opened St. Fort's in North Miami Beach. His goal was simple: care for families the way he'd want his own cared for." },
  { yr: "2010", t: "Standing with Haiti", b: "When the earthquake struck Haiti, St. Fort's helped grieving families at no cost. Today the family also operates chapels in Haiti." },
  { yr: "2019", t: "Recognized during Black Business Month", b: "Florida State Representative Barbara Watson honored Evans with a proclamation for his service to South Florida families." },
  { yr: "2023", t: "A Top Workplace", b: "St. Fort's was named one of the Top Workplaces. Families feel it when a team loves where it works." },
  { yr: "2025", t: "St. Fort Drive", b: "The City of North Miami Beach renamed a stretch of NE 165th Street “St. Fort Drive” in honor of the St. Fort family and their years of service to this community." },
  { yr: "Today", t: "Still family-owned. Still independent.", b: "No corporate owner, no call center. When you call St. Fort's, you reach the family and the team Evans built." },
];

export default function Founder() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div style={{ display: "grid", gap: 26 }}>
            <p className="eyebrow">Our founder</p>
            <h1 className="display">Evans St. Fort</h1>
            <p className="lede">
              Miami-born, Haitian-American, licensed funeral director, and founder and CEO of St. Fort&rsquo;s Funeral Home &amp; Cremation in North Miami Beach.
            </p>
          </div>
          <div className="frame" style={{ aspectRatio: "3/4", maxWidth: 420, justifySelf: "end", width: "100%" }}>
            <img src="/team/evans.jpg" alt="Portrait of Evans St. Fort, founder of St. Fort's Funeral Home & Cremation" />
          </div>
        </div>
      </section>

      <section className="section stone">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <h2 className="h2">Why he does <em>this work.</em></h2>
          <div style={{ display: "grid", gap: 20 }}>
            <p className="lede" style={{ maxWidth: "60ch" }}>
              Evans is a Miami-born Haitian-American and a licensed funeral director. He built St. Fort&rsquo;s around one idea: every family deserves to be cared for personally, in their own language and their own traditions.
            </p>
            <p className="lede" style={{ maxWidth: "60ch" }}>
              He founded St. Fort&rsquo;s in 2003, at 25. More than two decades later, it&rsquo;s still family-owned and independent, and it still serves families across Miami-Dade and Broward with care rooted in faith and culture, in English, Spanish and Haitian Creole.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="story-h">
        <div className="wrap founder">
          <div className="founder-stick">
            <div className="frame" style={{ aspectRatio: "400/416", maxWidth: 420 }}>
              <img src="/images/st-fort-family.jpg" alt="The St. Fort family" loading="lazy" />
            </div>
            <div style={{ display: "grid", gap: 14, marginTop: 28 }}>
              <p className="eyebrow">The St. Fort story</p>
              <h2 id="story-h" className="h2">Two decades <em>in North Miami Beach.</em></h2>
            </div>
          </div>
          <ol className="founder-timeline">
            {TIMELINE.map((x) => (
              <li key={x.yr} className="reveal">
                <span className="yr">{x.yr}</span>
                <h3 className="h3">{x.t}</h3>
                <p>{x.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section stone">
        <div className="wrap split">
          <div className="frame reveal" style={{ aspectRatio: "1/1" }}>
            <img src="/images/st-fort-drive.jpg" alt="St. Fort Drive street sign on NE 165th Street in North Miami Beach" loading="lazy" />
          </div>
          <div className="reveal" style={{ display: "grid", gap: 24 }}>
            <p className="eyebrow">St. Fort Drive</p>
            <h2 className="h2">A city&rsquo;s <em>thank you.</em></h2>
            <p className="lede">The St. Fort Drive sign hangs on NE 165th Street, right above our North Miami Beach funeral home. For Evans, it belongs to every family who trusted St. Fort&rsquo;s with someone they loved.</p>
            <Link className="link" href="/our-team" style={{ justifySelf: "start" }}>Meet the full team</Link>
          </div>
        </div>
      </section>

      <ClosingCta />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Evans St. Fort",
        jobTitle: "Founder, CEO & Licensed Funeral Director",
        worksFor: { "@id": `${SITE.url}/#funeralhome` },
        image: `${SITE.url}/team/evans.jpg`,
        sameAs: ["https://www.instagram.com/evansstfort/"],
      }} />
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Our Founder", path: "/our-founder" }])} />
    </>
  );
}
