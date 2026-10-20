import Link from "next/link";
import type { Metadata } from "next";
import HeroScroll from "@/components/HeroScroll";
import { AreaChips, ClosingCta, Faq, JsonLd, Paths, ServiceRows, faqSchema } from "@/components/blocks";
import { ArrowIcon } from "@/components/icons";
import { FAQS, POSTS, TEAM } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Funeral & Cremation Services in North Miami Beach | St. Fort's Funeral Home",
  description:
    "St. Fort's is a family-owned funeral home in North Miami Beach offering funerals, cremation from $1,595, burial and pre-planning. Open 24/7. English, Spanish & Haitian Creole.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const lead = TEAM.slice(0, 4);
  return (
    <>
      <HeroScroll />

      {/* Two clear paths */}
      <section className="section" aria-labelledby="paths-h">
        <div className="wrap" style={{ display: "grid", gap: 56 }}>
          <div className="reveal" style={{ display: "grid", gap: 18, maxWidth: 760 }}>
            <p className="eyebrow">Where would you like to begin?</p>
            <h2 id="paths-h" className="h2">One call, and we&rsquo;ll take it <em>from here.</em></h2>
          </div>
          <Paths />
        </div>
      </section>

      {/* Location — North Miami Beach emphasis */}
      <section className="section tight" aria-labelledby="loc-h" style={{ paddingTop: 0 }}>
        <div className="wrap loc-band reveal" data-track="location_band">
          <div style={{ display: "grid", gap: 14 }}>
            <p className="eyebrow">Based in North Miami Beach</p>
            <h2 id="loc-h" className="h3" style={{ fontSize: "clamp(24px, 2.6vw, 34px)", fontWeight: 250 }}>
              Your funeral home in North Miami Beach, on NE 19th Avenue — minutes from North Miami, Aventura and Miami Gardens.
            </h2>
          </div>
          <div style={{ display: "grid", gap: 8, alignContent: "end" }}>
            <p style={{ color: "var(--ivory)" }}>{SITE.address.full}</p>
            <p className="muted">Open 24 hours · English, Español, Kreyòl</p>
            <a className="link" href={SITE.directionsHref} target="_blank" rel="noopener noreferrer" style={{ justifySelf: "start" }}>Get directions</a>
          </div>
        </div>
      </section>

      {/* Philosophy — stone */}
      <section className="section stone" aria-labelledby="phil-h">
        <div className="wrap split">
          <div className="frame reveal" style={{ aspectRatio: "4/5" }}>
            <img src="/images/hands.jpg" alt="Two hands gently holding each other in warm light" loading="lazy" />
          </div>
          <div className="reveal" style={{ display: "grid", gap: 28 }}>
            <p className="eyebrow">A family-owned funeral home in North Miami Beach</p>
            <h2 id="phil-h" className="h2">Not a transaction. <em>A family taking care of yours.</em></h2>
            <p className="lede">
              St. Fort&rsquo;s is a family-owned, independent funeral home in North Miami Beach, and it shows in the details. You&rsquo;ll speak with people who know your name, explain every choice in plain words, and honor your traditions — Haitian, Caribbean, Latin, and every faith in between.
            </p>
            <div className="points stack" style={{ marginTop: 12 }}>
              {[
                ["Personal", "One team guides you from the first call to the final goodbye."],
                ["Transparent", "Clear starting prices. Every cost explained before you decide."],
                ["Always here", "Day, night, holidays. A real person answers."],
              ].map(([t, b]) => (
                <div className="point" key={t}>
                  <p className="h3">{t}</p>
                  <p style={{ fontSize: 15 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" aria-labelledby="svc-h">
        <div className="wrap" style={{ display: "grid", gap: 56 }}>
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 24 }}>
            <div style={{ display: "grid", gap: 18, maxWidth: 680 }}>
              <p className="eyebrow">Services</p>
              <h2 id="svc-h" className="h2">Funeral, cremation &amp; burial services <em>in North Miami Beach.</em></h2>
            </div>
            <div style={{ display: "grid", gap: 4, textAlign: "right" }}>
              <span className="price">Direct cremation from $1,595</span>
              <span className="price">Funeral with cremation from $4,995</span>
              <span className="price">Burial from $5,995</span>
            </div>
          </div>
          <ServiceRows />
        </div>
      </section>

      {/* Cinematic band */}
      <section aria-hidden style={{ position: "relative", height: "70vh", minHeight: 420, overflow: "hidden" }}>
        <img src="/images/candle.jpg" alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, var(--ink) 0%, rgba(14,13,11,.2) 30%, rgba(14,13,11,.2) 70%, var(--ink) 100%)" }} />
        <div className="wrap" style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
          <p className="display reveal" style={{ color: "var(--ivory)", fontSize: "clamp(36px, 5.6vw, 84px)", maxWidth: "15ch" }}>
            Every life deserves dignity. <em>Every family deserves care.</em>
          </p>
        </div>
      </section>

      {/* Founder — sticky portrait while the story scrolls */}
      <section className="section" aria-labelledby="founder-h">
        <div className="wrap founder">
          <div className="founder-stick">
            <div className="frame" style={{ aspectRatio: "3/4", maxWidth: 380 }}>
              <img src="/team/evans.jpg" alt="Evans St. Fort, founder and CEO of St. Fort's Funeral Home & Cremation" loading="lazy" />
            </div>
            <div style={{ display: "grid", gap: 14, marginTop: 28 }}>
              <p className="eyebrow">Our founder</p>
              <h2 id="founder-h" className="h2">Evans St. Fort</h2>
              <p className="lede" style={{ fontSize: 18 }}>
                Miami-born, Haitian-American, licensed funeral director — and the reason St. Fort&rsquo;s still feels like family.
              </p>
            </div>
          </div>
          {/* TODO(client): Evans to confirm Lynn University, the 2010 Haiti story, and the dedication month */}
          <ol className="founder-timeline">
            <li className="reveal">
              <span className="yr">2003</span>
              <h3 className="h3">A funeral home of his own, at 25</h3>
              <p>After earning his degree in mortuary science, Evans opened St. Fort&rsquo;s in North Miami Beach. His goal was simple: care for families the way he&rsquo;d want his own cared for.</p>
            </li>
            <li className="reveal">
              <span className="yr">2010</span>
              <h3 className="h3">Standing with Haiti</h3>
              <p>When the earthquake struck Haiti, St. Fort&rsquo;s helped grieving families at no cost. Today the family also operates chapels in Haiti.</p>
            </li>
            <li className="reveal">
              <span className="yr">2019</span>
              <h3 className="h3">Recognized during Black Business Month</h3>
              <p>Florida State Representative Barbara Watson honored Evans with a proclamation for his service to South Florida families.</p>
            </li>
            <li className="reveal">
              <span className="yr">2023</span>
              <h3 className="h3">A Top Workplace</h3>
              <p>St. Fort&rsquo;s was named one of the Top Workplaces — because families feel it when a team loves where it works.</p>
            </li>
            <li className="reveal">
              <span className="yr">2025</span>
              <h3 className="h3">St. Fort Drive</h3>
              <p>The City of North Miami Beach renamed a stretch of NE 165th Street &ldquo;St. Fort Drive&rdquo; in honor of the St. Fort family and their years of service to this community.</p>
              <div className="placeholder" style={{ minHeight: 200, marginTop: 20 }}>St. Fort Drive sign photo — awaiting client</div>
            </li>
            <li className="reveal">
              <span className="yr">Today</span>
              <h3 className="h3">Still family-owned. Still independent.</h3>
              <p>No corporate owner, no call center. When you call St. Fort&rsquo;s, you reach the family and the team Evans built.</p>
              <Link className="link" href="/our-team" style={{ display: "inline-block", marginTop: 16 }}>Meet the team</Link>
            </li>
          </ol>
        </div>
      </section>

      {/* Team preview — stone */}
      <section className="section stone" aria-labelledby="team-h">
        <div className="wrap" style={{ display: "grid", gap: 56 }}>
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 24 }}>
            <div style={{ display: "grid", gap: 18 }}>
              <p className="eyebrow">Our team</p>
              <h2 id="team-h" className="h2">The funeral directors <em>who will care for your family.</em></h2>
            </div>
            <Link href="/our-team" className="btn btn-outline-dark">Meet the full team <ArrowIcon /></Link>
          </div>
          <div className="team-grid">
            {lead.map((m) => (
              <div key={m.name} className="team-card reveal">
                <img src={m.photo} alt={`${m.name}, ${m.title}`} loading="lazy" width={296} height={395} />
                <p className="team-name" style={{ color: "var(--stone-ink)" }}>{m.name}</p>
                <p className="team-title">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section tight" aria-labelledby="rev-h">
        <div className="wrap" style={{ display: "grid", gap: 28, justifyItems: "center", textAlign: "center" }}>
          <p className="eyebrow reveal">Families we&rsquo;ve served</p>
          {/* TODO(client): replace with 2–3 verified North Miami Beach Google reviews */}
          <p id="rev-h" className="display reveal" style={{ fontSize: "clamp(30px, 4vw, 56px)", maxWidth: "20ch" }}>
            <em>&ldquo;Verified North Miami Beach review goes here.&rdquo;</em>
          </p>
          <a className="link reveal" href={SITE.googleReviewsHref} target="_blank" rel="noopener noreferrer">Read our Google reviews</a>
        </div>
      </section>

      <AreaChips stone />
      <Faq faqs={FAQS} />

      {/* Insights */}
      <section className="section stone" aria-labelledby="ins-h">
        <div className="wrap" style={{ display: "grid", gap: 56 }}>
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 24 }}>
            <div style={{ display: "grid", gap: 18 }}>
              <p className="eyebrow">Insights</p>
              <h2 id="ins-h" className="h2">Gentle guidance <em>for hard days.</em></h2>
            </div>
            <Link href="/insights" className="btn btn-outline-dark">All articles <ArrowIcon /></Link>
          </div>
          <div className="post-grid">
            {POSTS.map((p) => (
              <Link key={p.slug} href={`/insights/${p.slug}`} className="post-card reveal">
                <div className="frame"><img src={p.image} alt="" loading="lazy" /></div>
                <h3>{p.title}</h3>
                <p className="muted" style={{ marginTop: 10 }}>{p.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
      <JsonLd data={faqSchema(FAQS)} />
    </>
  );
}
