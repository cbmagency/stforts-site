import type { Metadata } from "next";
import Script from "next/script";
import { Faq, JsonLd, PageHero, crumbs, faqSchema } from "@/components/blocks";
import { LeadForm } from "@/components/client";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Funeral Pre-Planning in North Miami Beach | Pre-Arrange a Funeral or Cremation | St. Fort's",
  description: "Funeral pre-planning in North Miami Beach. Pre-arrange a funeral or cremation, put your wishes in writing, and lock in today's choices. Free, private, no-pressure consultations with St. Fort's.",
  alternates: { canonical: "/pre-planning" },
};

const FAQ = [
  { q: "What is funeral pre-planning?", a: "Funeral pre-planning (also called pre-arranging or a pre-need plan) means choosing your funeral or cremation wishes ahead of time and putting them in writing with a funeral home, so your family doesn't have to make those decisions later." },
  { q: "How much does it cost to pre-plan a funeral?", a: "There is no cost to plan. Meeting with us and recording your wishes is free. If you choose to pre-pay, we'll walk you through our prices and payment options with no pressure." },
  { q: "Why plan a funeral ahead of time?", a: "Planning ahead means your wishes are known and your family doesn't have to guess or make rushed decisions during a hard time. Many families also choose to pay in advance so the cost is settled." },
  { q: "Do I have to pay upfront?", a: "No. You can simply record your wishes, or explore payment options. We'll explain everything clearly, with no pressure." },
  { q: "Can I change my plan later?", a: "Life changes, and plans can too. Talk to us about your plan whenever you need to." },
  { q: "Can we meet by phone or video?", a: "Yes. We meet in person in North Miami Beach, by phone, or by video — whatever is easiest for you." },
];

export default function PlanningAhead() {
  return (
    <>
      <PageHero
        eyebrow="Funeral pre-planning · North Miami Beach"
        title={<>Funeral pre-planning: <em>the kindest gift you can leave your family.</em></>}
        intro="Pre-arrange your funeral or cremation in one private, unhurried conversation. Your wishes go in writing, so your loved ones never have to guess, rush or worry later. Planning is free."
        image="/images/planning.jpg"
        imageAlt="A cream notebook and fountain pen beside white orchids"
      />
      <section className="section stone" style={{ paddingTop: 96 }}>
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="reveal" style={{ display: "grid", gap: 28 }}>
            <p className="eyebrow">How it works</p>
            <h2 className="h2">How funeral pre-planning <em>works.</em></h2>
            <div className="points" style={{ gridTemplateColumns: "1fr" }}>
              {[
                ["1. Request a consultation", "Tell us a good time. We'll reach out in the way you prefer."],
                ["2. Share your wishes", "Burial or cremation, music, faith, the people you want there. Nothing is too small."],
                ["3. Put it in writing", "We document your plan and explain payment options, if you want them."],
              ].map(([t, b]) => (
                <div className="point" key={t} style={{ padding: "24px 0" }}>
                  <h3 className="h3">{t}</h3><p style={{ marginTop: 6 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card reveal" style={{ background: "var(--ink)" }} id="consult">
            <p className="h3">Request a free pre-planning consultation</p>
            <p style={{ margin: "8px 0 28px" }}>In person, by phone or by video.</p>
            <LeadForm variant="planning" source="pre-planning" />
          </div>
        </div>
      </section>
      {SITE.bookingHref && (
        <section className="section" id="book" aria-labelledby="book-h">
          <div className="wrap" style={{ display: "grid", gap: 40 }}>
            <div className="reveal" style={{ display: "grid", gap: 18, maxWidth: 760 }}>
              <p className="eyebrow">Virtual consultation</p>
              <h2 id="book-h" className="h2">Meet with Evans <em>from home.</em></h2>
              <p className="lede">Pick a time that works for you. Consultations are by Google Meet, Monday through Wednesday afternoons, and you&rsquo;ll get the link by email.</p>
            </div>
            <div className="card reveal" style={{ padding: 0, overflow: "hidden", background: "#fff" }}>
              <iframe src={SITE.bookingHref} id="DNL9MOG8ahjsxgW0GSZC_booking" title="Book a virtual pre-planning consultation" scrolling="no" style={{ width: "100%", minHeight: 760, border: 0, overflow: "hidden", display: "block" }} />
              <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
            </div>
          </div>
        </section>
      )}
      <Faq faqs={FAQ} title="Funeral pre-planning questions" />
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Pre-Planning", path: "/pre-planning" }])} />
    </>
  );
}
