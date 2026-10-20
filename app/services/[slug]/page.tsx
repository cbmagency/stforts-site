import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AreaChips, ClosingCta, Faq, JsonLd, PageHero, ServiceRows, crumbs, faqSchema } from "@/components/blocks";
import { PhoneIcon } from "@/components/icons";
import { SERVICES, getService } from "@/lib/services";
import { SITE } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return SERVICES.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return { title: s.metaTitle, description: s.metaDescription, alternates: { canonical: `/services/${s.slug}` }, openGraph: { images: [s.image] } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  return (
    <>
      <PageHero eyebrow={s.name} title={s.headline} intro={s.intro} image={s.image} imageAlt={s.imageAlt}>
        <div className="hero-actions" data-track="service_hero">
          <a className="btn btn-light" href={SITE.phoneHref}><PhoneIcon /> Call {SITE.phone}</a>
          <Link className="btn btn-ghost" href="#callback">Request a callback</Link>
        </div>
        {s.price && <p className="price">{s.price}*</p>}
      </PageHero>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="points reveal">
            {s.points.map((p) => (
              <div className="point" key={p.title}>
                <h2 className="h3">{p.title}</h2>
                <p style={{ marginTop: 10 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section stone">
        <div className="wrap" style={{ display: "grid", gap: 72 }}>
          {s.sections.map((sec) => (
            <div key={sec.heading} className="split reveal" style={{ alignItems: "start" }}>
              <h2 className="h2" style={{ fontSize: "clamp(30px, 3.6vw, 48px)" }}>{sec.heading}</h2>
              <div style={{ display: "grid", gap: 18 }}>
                {sec.body.map((p, i) => <p key={i} className="lede" style={{ maxWidth: "60ch" }}>{p}</p>)}
              </div>
            </div>
          ))}
          {s.price && (
            <p className="muted">*Starting price. Final pricing, package inclusions, cemetery charges and financing depend on your choices — we&rsquo;ll walk you through every cost before you decide.</p>
          )}
        </div>
      </section>

      <Faq faqs={s.faqs} title={`${s.name}: common questions`} />

      <section className="section tight" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 32 }}>
          <p className="eyebrow">More services</p>
          <ServiceRows exclude={s.slug} />
        </div>
      </section>

      <AreaChips stone />
      <ClosingCta />
      <JsonLd data={faqSchema(s.faqs)} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", serviceType: s.name, provider: { "@id": `${SITE.url}/#funeralhome` }, areaServed: ["Miami-Dade County, FL", "Broward County, FL"], description: s.metaDescription }} />
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }])} />
    </>
  );
}
