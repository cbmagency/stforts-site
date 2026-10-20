"use client";
import { useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { ArrowIcon, ChatIcon, CloseIcon, PhoneIcon } from "./icons";

type G = { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };
export function track(event: string, params: Record<string, unknown> = {}) {
  const w = window as unknown as G;
  try { w.gtag?.("event", event, params); } catch {}
}

/** Reveal-on-scroll + global click tracking for tel/WhatsApp/directions + UTM capture. */
export function SiteEffects() {
  const path = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const location = a.closest("[data-track]")?.getAttribute("data-track") || a.getAttribute("data-track") || "other";
      const w = window as unknown as G;
      if (href.startsWith("tel:")) { track("call_click", { location }); try { w.fbq?.("track", "Contact"); } catch {} }
      else if (href.includes("wa.me")) { track("whatsapp_click", { location }); try { w.fbq?.("track", "Contact"); } catch {} }
      else if (href.includes("google.com/maps")) track("directions_click", { location });
    };
    document.addEventListener("click", onClick);

    try {
      if (!sessionStorage.getItem("stf_attr")) {
        const q = new URLSearchParams(location.search);
        const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
        const o: Record<string, string> = {};
        keys.forEach((k) => { const v = q.get(k); if (v) o[k] = v.slice(0, 200); });
        o.landing_page = location.pathname;
        sessionStorage.setItem("stf_attr", JSON.stringify(o));
      }
    } catch {}
    return () => { io.disconnect(); document.removeEventListener("click", onClick); };
  }, [path]);
  return null;
}

type Variant = "callback" | "planning";
/** GoHighLevel form embed. Used when NEXT_PUBLIC_GHL_FORM_ID is set, so every
 *  submission lands in GHL (Sites → Forms → Submissions) and triggers its workflow. */
function GhlForm({ formId }: { formId: string }) {
  useEffect(() => {
    if (document.getElementById("ghl-form-embed")) return;
    const s = document.createElement("script");
    s.id = "ghl-form-embed";
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return (
    <iframe
      src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
      id={`inline-${formId}`}
      title="St. Fort's inquiry form"
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-activation-type="alwaysActivated"
      data-deactivation-type="neverDeactivate"
      data-form-name="St. Fort's Website Inquiry"
      data-form-id={formId}
      style={{ width: "100%", minHeight: 620, border: "none", borderRadius: 2, background: "transparent" }}
    />
  );
}

export function LeadForm({ variant = "callback", source }: { variant?: Variant; source?: string }) {
  const ghlFormId = process.env.NEXT_PUBLIC_GHL_FORM_ID;
  if (ghlFormId) return <GhlForm formId={ghlFormId} />;
  return <NativeLeadForm variant={variant} source={source} />;
}

function NativeLeadForm({ variant = "callback", source }: { variant?: Variant; source?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.name || data.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[0-9()+\-.\s]{7,20}$/.test(data.phone || "")) errs.phone = "Please enter a valid phone number.";
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errs.email = "Please check your email.";
    if (variant === "callback" && !data.immediate) errs.immediate = "Please choose one.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const inquiry_type = variant === "planning" ? "pre_planning" : data.immediate === "yes" ? "immediate_need" : "callback";
    let attr = {};
    try { attr = JSON.parse(sessionStorage.getItem("stf_attr") || "{}"); } catch {}
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, inquiry_type, source: source || location.pathname, page_url: location.href, ...attr }),
      });
      if (!res.ok) throw new Error();
      track("form_submit", { inquiry_type });
      try { (window as unknown as G).fbq?.("track", "Lead"); } catch {}
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="form-ok" role="status">
        <p className="h3" style={{ color: "var(--ivory)" }}>Thank you.</p>
        <p style={{ marginTop: 10 }}>
          A member of our team will reach out shortly. If this is urgent, please call us now at{" "}
          <a className="link" href={SITE.phoneHref} data-track="form_thanks">{SITE.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor={`${variant}-name`}>Your name</label>
        <input id={`${variant}-name`} name="name" autoComplete="name" maxLength={100} aria-invalid={!!errors.name} />
        {errors.name && <span className="field-err">{errors.name}</span>}
      </div>
      <div className="field">
        <label htmlFor={`${variant}-phone`}>Phone</label>
        <input id={`${variant}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={20} aria-invalid={!!errors.phone} />
        {errors.phone && <span className="field-err">{errors.phone}</span>}
      </div>
      {variant === "planning" && (
        <>
          <div className="field">
            <label htmlFor="planning-email">Email (optional)</label>
            <input id="planning-email" name="email" type="email" autoComplete="email" maxLength={200} aria-invalid={!!errors.email} />
            {errors.email && <span className="field-err">{errors.email}</span>}
          </div>
          <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
            <legend>Best way to reach you</legend>
            <div className="radios">
              {["Call", "Text", "WhatsApp", "Email"].map((m, i) => (
                <label key={m} className="radio"><input type="radio" name="preferred_contact" value={m} defaultChecked={i === 0} /> {m}</label>
              ))}
            </div>
          </fieldset>
        </>
      )}
      <div className="field">
        <label htmlFor={`${variant}-time`}>{variant === "planning" ? "Preferred consultation time" : "Best time to call"}</label>
        <input id={`${variant}-time`} name="preferred_time" maxLength={100} placeholder="e.g. Weekday mornings" />
      </div>
      {variant === "callback" && (
        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend>Has a loved one just passed?</legend>
          <div className="radios">
            <label className="radio"><input type="radio" name="immediate" value="yes" /> Yes</label>
            <label className="radio"><input type="radio" name="immediate" value="no" /> No, I have questions</label>
          </div>
          {errors.immediate && <span className="field-err">{errors.immediate}</span>}
        </fieldset>
      )}
      {state === "error" && (
        <p className="field-err" role="alert">Something went wrong. Please call us at {SITE.phone} — we answer 24/7.</p>
      )}
      <button type="submit" className="btn btn-light" disabled={state === "sending"} style={{ justifySelf: "start" }}>
        {state === "sending" ? "Sending…" : variant === "planning" ? "Request a private consultation" : "Request a callback"}
        <ArrowIcon />
      </button>
      <p className="form-note">If someone has just passed, calling is fastest: {SITE.phone}. Please don&rsquo;t include medical or financial details.</p>
    </form>
  );
}

/**
 * Corner concierge. If a GoHighLevel chat widget id is configured, the GHL
 * widget (with Conversation AI / voice) loads instead — same as CBM's site.
 */
export function Concierge() {
  const widgetId = process.env.NEXT_PUBLIC_GHL_WIDGET_ID;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!widgetId) return;
    const s = document.createElement("script");
    s.src = "https://widgets.leadconnectorhq.com/loader.js";
    s.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    s.setAttribute("data-widget-id", widgetId);
    s.async = true;
    document.body.appendChild(s);
  }, [widgetId]);

  if (widgetId) return null;
  return (
    <>
      {open && (
        <div className="concierge-panel" role="dialog" aria-label="Speak with St. Fort's">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 16 }}>
            <div>
              <p className="eyebrow">We&rsquo;re here, day or night</p>
              <p className="h3" style={{ marginTop: 10 }}>How can we help you today?</p>
            </div>
            <button aria-label="Close" onClick={() => setOpen(false)} style={{ width: 32, height: 32, color: "var(--ivory)" }}><CloseIcon /></button>
          </div>
          <div className="opts" data-track="concierge">
            <a className="opt" href={SITE.phoneHref}><span>I need help now<small>Speak with a funeral director, 24/7</small></span><PhoneIcon className="w4" /></a>
            <a className="opt" href="/pre-planning#consult"><span>Pre-plan a funeral<small>Free, private consultation</small></span><ArrowIcon className="w4" /></a>
            <a className="opt" href="/pricing"><span>See our prices<small>Cremation from $1,595</small></span><ArrowIcon className="w4" /></a>
            <a className="opt" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer"><span>Message us on WhatsApp<small>English · Español · Kreyòl</small></span><ChatIcon className="w4" /></a>
          </div>
        </div>
      )}
      <button className="concierge-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="orb" aria-hidden /> Speak with us
      </button>
    </>
  );
}
