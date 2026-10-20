import type { Metadata } from "next";
import { Reviews, ClosingCta, Faq, JsonLd, PricingCards, crumbs, faqSchema } from "@/components/blocks";
import { PhoneIcon } from "@/components/icons";
import { PACKAGES } from "@/lib/pricing";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Funeral & Cremation Prices in North Miami Beach | St. Fort's Funeral Home",
  description:
    "Transparent funeral and cremation pricing in North Miami Beach: direct cremation from $1,595, funeral with cremation from $4,995, basic burial from $5,995. See exactly what's included.",
  alternates: { canonical: "/pricing" },
};

const FAQ = [
  { q: "How much does cremation cost in North Miami Beach?", a: "At St. Fort's, direct cremation starts at $1,595. That includes transfer of your loved one, all permits and paperwork, cremation at a licensed facility, and returning the remains to your family." },
  { q: "How much does a funeral cost in Miami?", a: "Our funeral with cremation starts at $4,995 and our basic burial package starts at $5,995. Each includes embalming, dressing, use of our facility and all professional services. Cemetery costs are separate." },
  { q: "Are cemetery costs included?", a: "No. The plot, opening and closing are arranged directly with the cemetery. We'll help you understand those costs and coordinate with the cemetery for you." },
  { q: "Do you offer financing?", a: "Yes, financing is available for many families. Call us and we'll walk you through your options." },
  { q: "Will I get a written price list?", a: "Yes. Every family receives our full written price list, and we review every cost with you before anything is decided." },
];

export default function Pricing() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 72 }}>
        <div className="wrap" style={{ display: "grid", gap: 26, maxWidth: 980 }}>
          <p className="eyebrow">Pricing</p>
          <h1 className="display">Funeral &amp; cremation prices, <em>out in the open.</em></h1>
          <p className="lede">Clear starting prices for families in North Miami Beach and across South Florida. Every cost explained, in writing, before you decide.</p>
          <div className="hero-actions" data-track="pricing_hero">
            <a className="btn btn-light" href={SITE.phoneHref}><PhoneIcon /> Call {SITE.phone}</a>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap"><PricingCards extras /></div>
      </section>
      <Reviews limit={4} compact />
      <Faq faqs={FAQ} title="Questions about cost" stone />
      <ClosingCta title={<>Questions about cost? <em>Just ask.</em></>} />
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "St. Fort's funeral and cremation packages",
        itemListElement: PACKAGES.map((p) => ({
          "@type": "Offer",
          name: p.name,
          price: p.price.replace(/[$,]/g, ""),
          priceCurrency: "USD",
          priceSpecification: { "@type": "PriceSpecification", minPrice: p.price.replace(/[$,]/g, ""), priceCurrency: "USD" },
          seller: { "@id": `${SITE.url}/#funeralhome` },
        })),
      }} />
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
    </>
  );
}
