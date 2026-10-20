import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ClosingCta, Faq, JsonLd, ServiceRows, crumbs, faqSchema } from "@/components/blocks";
import { PhoneIcon } from "@/components/icons";
import { AREAS, getArea } from "@/lib/locations";
import { SITE } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return AREAS.map((a) => ({ slug: a.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArea((await params).slug);
  if (!a) return {};
  const home = a.slug === "north-miami-beach";
  return {
    title: home
      ? "Funeral Home in North Miami Beach, FL | St. Fort's Funeral Home & Cremation"
      : `Funeral Home & Cremation Serving ${a.name}, FL | St. Fort's`,
    description: `Family-owned funeral and cremation services for ${a.name} families in ${a.county} County. Open 24/7, English, Spanish & Haitian Creole. Call ${SITE.phone}.`,
    alternates: { canonical: `/areas/${a.slug}` },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArea((await params).slug);
  if (!a) notFound();
  const lang = a.creoleLead ? "Haitian Creole" : a.spanishLead ? "Spanish" : null;
  const faqs = [
    { q: `Do you serve families in ${a.name}?`, a: `Yes. ${a.relation} We serve families throughout ${a.county} County, and we'll come to you wherever your loved one is.` },
    { q: `How much does cremation cost for ${a.name} families?`, a: "Direct cremation starts at $1,595 and a funeral with cremation starts at $4,995. We review every cost with you before you decide." },
    { q: "Can we make arrangements without driving to North Miami Beach?", a: "Yes. We can make arrangements by phone or video, and meet in person whenever it's helpful." },
  ];
  const nearby = AREAS.filter((x) => x.county === a.county && x.slug !== a.slug).slice(0, 6);
  return (
    <>
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div style={{ display: "grid", gap: 26 }}>
            <p className="eyebrow">{a.county} County · Open 24/7</p>
            <h1 className="display" style={{ fontSize: "clamp(40px, 5.6vw, 84px)" }}>
              Funeral &amp; cremation services <em>for {a.name} families.</em>
            </h1>
            <p className="lede">{a.relation} {a.note}</p>
            <div className="hero-actions" data-track={`area_${a.slug}`}>
              <a className="btn btn-light" href={SITE.phoneHref}><PhoneIcon /> Call {SITE.phone}</a>
              <Link className="btn btn-ghost" href="#callback">Request a callback</Link>
            </div>
          </div>
          <div className="frame" style={{ aspectRatio: "4/5", maxHeight: 600 }}>
            <img src={a.county === "Broward" ? "/images/lilies.jpg" : "/images/hands.jpg"} alt="" />
          </div>
        </div>
      </section>

      <section className="section stone">
        <div className="wrap" style={{ display: "grid", gap: 40 }}>
          <div className="points reveal">
            <div className="point"><h2 className="h3">We come to you</h2><p style={{ marginTop: 8 }}>Home, hospital, nursing home or hospice anywhere in {a.name} — day or night.</p></div>
            <div className="point"><h2 className="h3">{lang ? `Help in ${lang}` : "Help in your language"}</h2><p style={{ marginTop: 8 }}>Our team guides families in English, Spanish and Haitian Creole.</p></div>
            <div className="point"><h2 className="h3">Clear pricing</h2><p style={{ marginTop: 8 }}>Direct cremation from $1,595. Every cost explained before you decide.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 48 }}>
          <h2 className="h2 reveal">Services for <em>{a.name}</em> families</h2>
          <ServiceRows />
        </div>
      </section>

      <Faq faqs={faqs} title={`${a.name} families ask`} stone />

      <section className="section tight">
        <div className="wrap" style={{ display: "grid", gap: 28 }}>
          <p className="eyebrow">Also serving nearby</p>
          <div className="chips">
            {nearby.map((n) => <Link key={n.slug} className="chip" href={`/areas/${n.slug}`}>{n.name}</Link>)}
            <Link className="chip" href="/areas">All service areas</Link>
          </div>
        </div>
      </section>

      <ClosingCta />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Service Areas", path: "/areas" }, { name: a.name, path: `/areas/${a.slug}` }])} />
    </>
  );
}
