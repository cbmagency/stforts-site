import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ClosingCta, JsonLd, crumbs } from "@/components/blocks";
import { POSTS, getPost } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return POSTS.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return { title: `${p.title} | St. Fort's`, description: p.description, alternates: { canonical: `/insights/${p.slug}` }, openGraph: { type: "article", images: [p.image] } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  return (
    <>
      <article>
        <header className="page-hero" style={{ paddingBottom: 56 }}>
          <div className="wrap" style={{ display: "grid", gap: 24, maxWidth: 980 }}>
            <Link href="/insights" className="eyebrow">← Insights</Link>
            <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>{p.title}</h1>
            <p className="muted">{p.readTime} · St. Fort&rsquo;s Funeral Home</p>
          </div>
        </header>
        <div className="wrap">
          <div className="frame" style={{ aspectRatio: "16/9", maxHeight: 620 }}><img src={p.image} alt="" /></div>
        </div>
        <div className="wrap section" style={{ paddingTop: 72 }}>
          <div className="article">
            {p.body.map((b, i) =>
              b.h ? <h2 key={i}>{b.h}</h2> : b.list ? <ul key={i}>{b.list.map((l) => <li key={l}>{l}</li>)}</ul> : <p key={i}>{b.p}</p>,
            )}
          </div>
        </div>
      </article>
      <ClosingCta />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.description, datePublished: p.date, image: `${SITE.url}${p.image}`, author: { "@type": "Organization", name: SITE.name }, publisher: { "@id": `${SITE.url}/#funeralhome` } }} />
      <JsonLd data={crumbs([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }, { name: p.title, path: `/insights/${p.slug}` }])} />
    </>
  );
}
