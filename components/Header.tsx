"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";

export default function Header() {
  const path = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`header ${solid || open ? "solid" : ""}`}>
        <div className="wrap header-row">
          <Link href="/" className="header-logo" aria-label="St. Fort's Funeral Home & Cremation — home">
            <img src="/logo-ivory.png" alt="St. Fort's Funeral Home and Cremation" width={158} height={34} />
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <a href={SITE.phoneHref} className="btn btn-light header-cta" data-track="header" style={{ minHeight: 44, padding: "0 20px", fontSize: 14 }}>
            <PhoneIcon /> {SITE.phone} · 24/7
          </a>
          <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <CloseIcon className="w-6" /> : <MenuIcon className="w-6" />}
          </button>
        </div>
      </header>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile">
          <Link href="/">Home</Link>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
          <a href={SITE.phoneHref} className="btn btn-light" style={{ marginTop: 24 }} data-track="menu">
            <PhoneIcon /> Call {SITE.phone}
          </a>
        </nav>
      )}
    </>
  );
}
