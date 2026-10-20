import type { Metadata } from "next";
import { ClosingCta, JsonLd, PageHero, ServiceRows, crumbs } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Funeral, Cremation & Burial Services in North Miami Beach | St. Fort's",
  description: "Funerals, cremation, burial, personalized celebrations of life, receptions, veteran services and grief support from St. Fort's in North Miami Beach. Open 24/7.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Thoughtful options <em>for every family.</em></>}
        intro="Whatever your family chooses — burial or cremation, a full church service or a quiet goodbye — we'll guide you through it with care, clear pricing and no pressure."
        image="/images/lilies.jpg"
        imageAlt="White calla lilies on ivory linen"
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap"><ServiceRows /></div>
      </section>
      <ClosingCta />
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
    </>
  );
}
