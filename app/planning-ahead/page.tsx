import type { Metadata } from "next";
import { Faq, JsonLd, PageHero, crumbs, faqSchema } from "@/components/blocks";
import { LeadForm } from "@/components/client";

export const metadata: Metadata = {
  title: "Funeral Pre-Planning in North Miami Beach & Miami | St. Fort's Funeral Home",
  description: "Plan your funeral or cremation ahead of time with St. Fort's in North Miami Beach. Put your wishes in writing and spare your family hard decisions. Private, no-pressure consultations.",
  alternates: { canonical: "/planning-ahead" },
};

const FAQ = [
  { q: "Why plan a funeral ahead of time?", a: "Planning ahead means your wishes are known and your family doesn't have to guess or make rushed decisions during a hard time. Many families also choose to pay in advance so the cost is settled." },
  { q: "Do I have to pay upfront?", a: "No. You can simply record your wishes, or explore payment options. We'll explain everything clearly, with no pressure." },
  { q: "Can I change my plan later?", a: "Life changes, and plans can too. Talk to us about your plan whenever you need to." },
  { q: "Can we meet by phone or video?", a: "Yes. We meet in person in North Miami Beach, by phone, or by video — whatever is easiest for you." },
];

export default function PlanningAhead() {
  return (
    <>
      <PageHero
        eyebrow="Planning ahead"
        title={<>The kindest gift <em>you can leave your family.</em></>}
        intro="A private, unhurried conversation today means your loved ones won't have to guess, rush or worry later. Your wishes, in writing, handled with care."
        image="/images/planning.jpg"
        imageAlt="A cream notebook and fountain pen beside white orchids"
      />
      <section className="section stone" style={{ paddingTop: 96 }}>
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="reveal" style={{ display: "grid", gap: 28 }}>
            <p className="eyebrow">How it works</p>
            <h2 className="h2">Simple, private, <em>no pressure.</em></h2>
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
            <p className="h3">Request a private consultation</p>
            <p style={{ margin: "8px 0 28px" }}>In person, by phone or by video.</p>
            <LeadForm variant="planning" source="planning-ahead" />
          </div>
        </div>
      </section>
      <Faq faqs={FAQ} title="Planning ahead: common questions" />
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Planning Ahead", path: "/planning-ahead" }])} />
    </>
  );
}
