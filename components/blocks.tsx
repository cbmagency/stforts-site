import Link from "next/link";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { AREAS } from "@/lib/locations";
import { EXTRAS, PACKAGES, PRICE_NOTE } from "@/lib/pricing";
import { LeadForm } from "./client";
import { ArrowIcon, ChatIcon, PhoneIcon } from "./icons";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const funeralHomeSchema = {
  "@context": "https://schema.org",
  "@type": "FuneralHome",
  "@id": `${SITE.url}/#funeralhome`,
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}/hero/poster.jpg`,
  logo: `${SITE.url}/logo.png`,
  telephone: SITE.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postal,
    addressCountry: "US",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  areaServed: AREAS.map((a) => ({ "@type": "City", name: `${a.name}, FL` })),
  knowsLanguage: ["en", "es", "ht"],
  sameAs: [SITE.social.facebook, SITE.social.instagram, "https://www.stfortsfuneralhome.com/"],
};

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const crumbs = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE.url}${it.path}` })),
});

export function Faq({ faqs, title = "Questions families ask", stone = false }: { faqs: { q: string; a: string }[]; title?: string; stone?: boolean }) {
  return (
    <section className={`section ${stone ? "stone" : ""}`} aria-labelledby="faq-h">
      <div className="wrap" style={{ display: "grid", gap: 48 }}>
        <div className="reveal">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-h" className="h2" style={{ marginTop: 18 }}>{title}</h2>
        </div>
        <div className="reveal" style={{ borderTop: `1px solid ${stone ? "var(--line-dark)" : "var(--line)"}` }}>
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}<span className="plus" aria-hidden /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Paths() {
  return (
    <div className="paths reveal" data-track="paths">
      <a className="path" href={SITE.phoneHref}>
        <span className="path-k">Someone has passed</span>
        <span className="path-t">I need help now</span>
        <span className="path-b">A funeral director answers day and night. We&rsquo;ll tell you exactly what happens next — and take it from there.</span>
        <span className="path-cta"><PhoneIcon /> Call {SITE.phone}</span>
      </a>
      <Link className="path" href="/planning-ahead">
        <span className="path-k">For the future</span>
        <span className="path-t">I&rsquo;m planning ahead</span>
        <span className="path-b">Put your wishes in writing, lock in today&rsquo;s choices, and spare your family hard decisions later.</span>
        <span className="path-cta">Request a private consultation <ArrowIcon /></span>
      </Link>
    </div>
  );
}

export function ServiceRows({ exclude }: { exclude?: string }) {
  const list = SERVICES.filter((s) => s.slug !== exclude);
  return (
    <div className="svc-list">
      {list.map((s, i) => (
        <Link key={s.slug} href={`/services/${s.slug}`} className="svc-row reveal">
          <span className="svc-n">{String(i + 1).padStart(2, "0")}</span>
          <span className="svc-name">{s.name}</span>
          <span className="svc-desc">{s.summary}</span>
          <ArrowIcon className="svc-arrow" />
        </Link>
      ))}
    </div>
  );
}

export function AreaChips({ stone = false }: { stone?: boolean }) {
  return (
    <section className={`section tight ${stone ? "stone" : ""}`} aria-labelledby="areas-h">
      <div className="wrap" style={{ display: "grid", gap: 40 }}>
        <div className="reveal" style={{ display: "grid", gap: 16, maxWidth: 720 }}>
          <p className="eyebrow">Service areas</p>
          <h2 id="areas-h" className="h2">Serving families across <em>South Florida</em></h2>
          <p className="lede">Based in North Miami Beach. If you&rsquo;re in Miami-Dade or Broward, we come to you — home, hospital or hospice.</p>
        </div>
        <div className="chips reveal">
          {AREAS.map((a) => (
            <Link key={a.slug} className="chip" href={`/areas/${a.slug}`}>{a.name}, FL</Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingCta({ title = <>When you need someone, <em>we&rsquo;re here.</em></> }: { title?: React.ReactNode }) {
  return (
    <section className="section" id="contact" aria-labelledby="close-h">
      <div className="wrap split">
        <div className="reveal" style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <p className="eyebrow">Contact</p>
          <h2 id="close-h" className="h2">{title}</h2>
          <p className="lede">Whether a loved one has just passed or you simply have questions, we&rsquo;ll listen, guide you, and help you take the next step.</p>
          <div className="hero-actions" data-track="closing" style={{ marginTop: 8 }}>
            <a className="btn btn-light" href={SITE.phoneHref}><PhoneIcon /> Call {SITE.phone}</a>
            <a className="btn btn-ghost" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer"><ChatIcon /> WhatsApp</a>
          </div>
          <div style={{ display: "grid", gap: 6, marginTop: 20 }} data-track="closing">
            <p style={{ color: "var(--ivory)" }}>{SITE.address.full}</p>
            <a className="link" href={SITE.directionsHref} target="_blank" rel="noopener noreferrer" style={{ justifySelf: "start" }}>
              Get directions
            </a>
            <p className="muted" style={{ marginTop: 6 }}>Open 24 hours, 7 days a week · English, Español, Kreyòl</p>
          </div>
        </div>
        <div className="card reveal" id="callback">
          <p className="h3">Request a callback</p>
          <p style={{ margin: "8px 0 28px" }}>Leave your number and we&rsquo;ll call you back.</p>
          <LeadForm variant="callback" />
        </div>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, intro, image, imageAlt, children }: {
  eyebrow: string; title: React.ReactNode; intro: string; image?: string; imageAlt?: string; children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="wrap page-hero-grid">
        <div style={{ display: "grid", gap: 26 }}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display">{title}</h1>
          <p className="lede">{intro}</p>
          {children}
        </div>
        {image && (
          <div className="frame" style={{ aspectRatio: "4/5", maxHeight: 640 }}>
            <img src={image} alt={imageAlt || ""} />
          </div>
        )}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
            <img src="/logo-ivory.png" alt="St. Fort's Funeral Home and Cremation" style={{ height: 36, width: "auto" }} loading="lazy" />
            <p style={{ maxWidth: 340 }}>A family-owned funeral home in North Miami Beach, serving families across Miami-Dade and Broward in English, Spanish and Haitian Creole.</p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>St. Fort&rsquo;s</h4>
            <ul>
              <li><Link href="/immediate-need">Immediate need</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/planning-ahead">Planning ahead</Link></li>
              <li><Link href="/our-founder">Our founder</Link></li>
              <li><Link href="/our-team">Our team</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/areas">Service areas</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div data-track="footer">
            <h4>Reach us 24/7</h4>
            <ul>
              <li><a href={SITE.phoneHref} style={{ color: "var(--ivory)", fontSize: 20 }}>{SITE.phone}</a></li>
              <li><a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li>{SITE.address.street}<br />{SITE.address.city}, FL {SITE.address.postal}</li>
              <li><a href={SITE.directionsHref} target="_blank" rel="noopener noreferrer">Directions</a></li>
              <li className="muted">Main funeral home line: <a href={SITE.mainLineHref}>{SITE.mainLine}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-locs">
          <div>
            <h4>Service areas</h4>
            <p className="footer-areas">
              {AREAS.map((a, i) => (
                <span key={a.slug}><Link href={`/areas/${a.slug}`}>{a.name}</Link>{i < AREAS.length - 1 ? " · " : ""}</span>
              ))}
            </p>
          </div>
          <div>
            <h4>Our other locations</h4>
            <ul>
              <li><a href="https://www.stfortsfuneralhomefortpierce.com" target="_blank" rel="noopener noreferrer">St. Fort&rsquo;s Funeral Home of Fort Pierce</a><br /><span className="muted">1800 Okeechobee Rd, Fort Pierce, FL 34950 · (772) 577-6828</span></li>
              <li><a href="https://www.stfortsfuneralhome.com/locations/" target="_blank" rel="noopener noreferrer">Chapels in Haiti</a><br /><span className="muted">Delmas · Léogâne · and more</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span><a href="https://www.stfortsfuneralhome.com/obituaries/">Obituaries</a> · <a href={SITE.social.facebook}>Facebook</a> · <a href={SITE.social.instagram}>Instagram</a></span>
        </div>
      </div>
    </footer>
  );
}

export function StickyBar() {
  return (
    <div className="sticky-bar" data-track="sticky">
      <a className="call" href={SITE.phoneHref}><PhoneIcon /> Call 24/7</a>
      <a className="wa" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer"><ChatIcon /> WhatsApp</a>
    </div>
  );
}

export function PricingCards({ extras = false }: { extras?: boolean }) {
  return (
    <div style={{ display: "grid", gap: 40 }}>
      <div className="pkgs" data-track="pricing">
        {PACKAGES.map((p) => (
          <article key={p.slug} className={`pkg reveal ${p.featured ? "featured" : ""}`} aria-labelledby={`pkg-${p.slug}`}>
            <span className="pkg-badge">{p.badge}</span>
            <h3 id={`pkg-${p.slug}`} className="pkg-name">{p.name}</h3>
            <p className="pkg-price"><span>Starting at</span>{p.price}</p>
            <p className="pkg-sum">{p.summary}</p>
            <ul className="pkg-list">
              {p.includes.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <a className={`btn ${p.featured ? "btn-light" : "btn-ghost"}`} href={SITE.phoneHref}>
              <PhoneIcon /> Call to get started
            </a>
          </article>
        ))}
      </div>
      {extras && (
        <div className="extras reveal">
          {EXTRAS.map((e) => (
            <div key={e.name} className="extra">
              <h3 className="h3">{e.name}</h3>
              <p className="price" style={{ marginTop: 6 }}>{e.price}</p>
              <p style={{ marginTop: 10, fontSize: 15 }}>{e.body}</p>
            </div>
          ))}
        </div>
      )}
      <p className="muted reveal" style={{ textAlign: "center", maxWidth: 760, justifySelf: "center" }}>{PRICE_NOTE}</p>
    </div>
  );
}
