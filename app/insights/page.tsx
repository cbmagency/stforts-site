import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/blocks";
import { POSTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights: Funeral Planning, Costs & Grief Guidance | St. Fort's Funeral Home",
  description: "Plain-language guidance for South Florida families: what to do when someone dies, funeral costs in Miami, traditions, planning ahead and grief.",
  alternates: { canonical: "/insights" },
};

export default function Insights() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 72 }}>
        <div className="wrap" style={{ display: "grid", gap: 26, maxWidth: 980 }}>
          <p className="eyebrow">Insights</p>
          <h1 className="display">Gentle guidance <em>for hard days.</em></h1>
          <p className="lede">Honest answers to the questions families ask us most.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap post-grid">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/insights/${p.slug}`} className="post-card reveal">
              <div className="frame"><img src={p.image} alt="" loading="lazy" /></div>
              <h2 className="h3" style={{ marginTop: 20 }}>{p.title}</h2>
              <p style={{ marginTop: 10, fontSize: 15 }}>{p.description}</p>
              <p className="muted" style={{ marginTop: 10 }}>{p.readTime}</p>
            </Link>
          ))}
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
