import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import { Concierge, SiteEffects } from "@/components/client";
import { Footer, JsonLd, StickyBar, funeralHomeSchema } from "@/components/blocks";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Funeral & Cremation Services in North Miami Beach | St. Fort's",
    template: "%s",
  },
  description:
    "Family-owned funeral home in North Miami Beach. Funerals, cremation, burial and pre-planning for families across Miami-Dade and Broward. Open 24/7 in English, Spanish & Haitian Creole.",
  openGraph: { type: "website", siteName: SITE.name, images: ["/hero/poster.jpg"] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#0e0d0b", width: "device-width", initialScale: 1 };

// Tracking IDs carried over from the current planning page.
// TODO(client): confirm Ads / Pixel IDs in each platform before launch. (WhatConverts was canceled and removed.)
const GA4 = process.env.NEXT_PUBLIC_GA4_ID || "G-XERR37GRYJ";
const ADS = "AW-942914070";
const PIXEL = "1793382978708734";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBar />
        <Concierge />
        <SiteEffects />
        <JsonLd data={funeralHomeSchema} />

        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`} strategy="afterInteractive" />
        <Script id="gtag" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4}');gtag('config','${ADS}');`}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}
        </Script>
      </body>
    </html>
  );
}
