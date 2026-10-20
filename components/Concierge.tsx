"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { SITE } from "@/lib/site";
import { PACKAGES } from "@/lib/pricing";
import { track } from "./client";
import { CloseIcon, PhoneIcon } from "./icons";

/**
 * St. Fort's chat concierge: a guided virtual assistant that sorts every visitor
 * into the right path (help now → Evans's cell, pre-planning → lead + booking,
 * questions → answers or a callback). Leads post to /api/lead → GHL workflow.
 * If NEXT_PUBLIC_GHL_WIDGET_ID is set, GHL's own chat widget (Conversation AI)
 * replaces this component.
 */

type Msg = { id: number; from: "bot" | "me"; body: ReactNode };
type Chip = { label: string; on: () => void; primary?: boolean };
type Ask = "none" | "question" | "name" | "phone";
type Lead = { inquiry_type: "immediate_need" | "pre_planning" | "callback"; notes: string[]; name?: string };

const firstName = (n?: string) => (n || "").trim().split(/\s+/)[0] || "";
const URGENT = /\b(passed|passed away|passing|died|dying|death|dead|just lost|lost my|hospice|emergency)\b/i;

export default function Concierge() {
  const widgetId = process.env.NEXT_PUBLIC_GHL_WIDGET_ID;
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [chips, setChips] = useState<Chip[]>([]);
  const [typing, setTyping] = useState(false);
  const [ask, setAsk] = useState<Ask>("none");
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const lead = useRef<Lead>({ inquiry_type: "callback", notes: [] });
  const started = useRef(false);
  const nextId = useRef(1);
  const queue = useRef(Promise.resolve());
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // GHL Conversation AI widget, when configured, takes over the corner.
  useEffect(() => {
    if (!widgetId) return;
    const s = document.createElement("script");
    s.src = "https://widgets.leadconnectorhq.com/loader.js";
    s.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    s.setAttribute("data-widget-id", widgetId);
    s.async = true;
    document.body.appendChild(s);
  }, [widgetId]);

  // Gentle teaser after a few seconds, once per visit.
  useEffect(() => {
    if (widgetId) return;
    let seen = false;
    try { seen = sessionStorage.getItem("stf_teaser") === "1"; } catch {}
    if (seen) return;
    const t = setTimeout(() => setTeaser(true), 9000);
    return () => clearTimeout(t);
  }, [widgetId]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, chips]);

  useEffect(() => { if (ask !== "none") inputRef.current?.focus(); }, [ask]);

  const push = (from: Msg["from"], body: ReactNode) =>
    setMsgs((m) => [...m, { id: nextId.current++, from, body }]);

  /** Queue bot lines with a short, human typing pause between them. */
  const say = (lines: ReactNode[], after?: () => void) => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setChips([]);
    queue.current = queue.current.then(async () => {
      for (const l of lines) {
        setTyping(true);
        const len = typeof l === "string" ? l.length : 60;
        await new Promise((r) => setTimeout(r, reduce ? 120 : Math.min(1400, 450 + len * 12)));
        setTyping(false);
        push("bot", l);
      }
      after?.();
    });
  };

  const me = (t: string) => push("me", t);

  // ---------- Paths ----------
  const menu = () => {
    setAsk("question");
    setChips([
      { label: "I need help now", on: () => { me("I need help now"); helpNow(); }, primary: true },
      { label: "Plan ahead", on: () => { me("I'd like to plan ahead"); prePlan(); } },
      { label: "See prices", on: () => { me("What are your prices?"); prices(); } },
      { label: "Ask a question", on: () => { me("I have a question"); say(["Of course. Type your question below and I'll do my best to help."], () => setAsk("question")); } },
    ]);
  };

  const start = () => {
    if (started.current) return;
    started.current = true;
    say([
      "Hi, welcome to St. Fort's. I'm the virtual concierge.",
      "I can connect you with a funeral director right away, help you plan ahead, or answer your questions. How can we help today?",
    ], menu);
  };

  const helpNow = () => {
    lead.current = { inquiry_type: "immediate_need", notes: ["Chat: needs help now"] };
    track("chat_path", { path: "help_now" });
    say([
      "I'm so sorry. You don't need to have anything figured out right now.",
      <div key="c" className="cx-card">
        <p>Call Evans, our funeral director, directly. He answers day and night and will tell you exactly what happens next.</p>
        <a className="btn btn-light cx-call" href={SITE.helpPhoneHref} data-track="chat_help"><PhoneIcon /> Call {SITE.helpPhone}</a>
      </div>,
      "Can't talk right now? Leave your name and number and we'll call you right back.",
    ], () => {
      setAsk("none");
      setChips([
        { label: "Call me back", on: () => { me("Please call me back"); askName(); }, primary: true },
        { label: "Back to menu", on: () => { me("Back to menu"); say(["Of course."], menu); } },
      ]);
    });
  };

  const prePlan = () => {
    lead.current = { inquiry_type: "pre_planning", notes: [] };
    track("chat_path", { path: "pre_planning" });
    say([
      "Planning ahead is one of the kindest things you can do for your family.",
      "A few quick questions so Evans can prepare. Who are you planning for?",
    ], () => {
      setAsk("none");
      setChips(["Myself", "A parent", "My spouse", "Someone else"].map((w) => ({
        label: w, on: () => { me(w); lead.current.notes.push(`Planning for: ${w}`); prePref(); },
      })));
    });
  };

  const prePref = () => {
    say(["Thank you. Are you leaning toward burial or cremation?"], () => {
      setChips(["Burial", "Cremation", "Not sure yet"].map((w) => ({
        label: w, on: () => { me(w); lead.current.notes.push(`Leaning toward: ${w}`); askName(); },
      })));
    });
  };

  const prices = () => {
    track("chat_path", { path: "prices" });
    say([
      <div key="p" className="cx-card">
        <p className="cx-card-k">Starting prices</p>
        <ul className="cx-prices">
          {PACKAGES.map((p) => <li key={p.slug}><span>{p.name}</span><strong>{p.price}</strong></li>)}
        </ul>
        <p className="cx-fine">Financing is available. Every cost is reviewed with you in writing before you decide.</p>
        <a className="link" href="/pricing" onClick={() => setOpen(false)}>See what&rsquo;s included →</a>
      </div>,
      "Would you like a funeral director to walk you through the options?",
    ], () => {
      setChips([
        { label: "Yes, call me", on: () => { me("Yes, please call me"); lead.current = { inquiry_type: "callback", notes: ["Chat: asked about prices"] }; askName(); }, primary: true },
        { label: "Plan ahead", on: () => { me("I'd like to plan ahead"); prePlan(); } },
        { label: "Back to menu", on: () => { me("Back to menu"); say(["Of course."], menu); } },
      ]);
    });
  };

  const askName = () => say(["What's your full name?"], () => { setChips([]); setAsk("name"); });
  const askPhone = () => say([`Thank you, ${firstName(lead.current.name)}. What's the best phone number to reach you?`], () => setAsk("phone"));

  const submit = async (phone: string) => {
    setAsk("none");
    let attr = {};
    try { attr = JSON.parse(sessionStorage.getItem("stf_attr") || "{}"); } catch {}
    const L = lead.current;
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: L.name, phone, inquiry_type: L.inquiry_type, notes: L.notes.join(" · "),
          source: "chat_concierge", page_url: location.href, ...attr,
        }),
      });
      if (!r.ok) throw new Error();
      track("form_submit", { inquiry_type: L.inquiry_type, via: "chat" });
      try { (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "Lead"); } catch {}
    } catch {
      say([<span key="e">Something went wrong on our side. Please call us at <a className="link" href={SITE.helpPhoneHref}>{SITE.helpPhone}</a>, we answer 24/7.</span>]);
      return;
    }
    const n = firstName(L.name);
    if (L.inquiry_type === "immediate_need") {
      say([`Thank you, ${n}. A funeral director will call you right back.`, "If you need us sooner, call anytime. We're here with you."], () =>
        setChips([{ label: `Call ${SITE.helpPhone}`, on: () => { location.href = SITE.helpPhoneHref; }, primary: true }]));
    } else if (L.inquiry_type === "pre_planning") {
      say([
        `Thank you, ${n}. Evans will have your details before you speak.`,
        <div key="b" className="cx-card">
          <p>Want to pick a time now? Book a free virtual consultation with Evans on Google Meet, Monday to Wednesday afternoons.</p>
          <a className="btn btn-light cx-call" href="/pre-planning#book" onClick={() => { track("chat_book_click"); setOpen(false); }}>Choose a time</a>
        </div>,
      ], () => setChips([{ label: "I'd rather wait for a call", on: () => { me("I'll wait for a call"); say(["Perfect. We'll be in touch soon."]); } }]));
    } else {
      say([`Thank you, ${n}. A member of our team will call you shortly.`], () =>
        setChips([{ label: "Back to menu", on: () => { me("Back to menu"); say(["Of course."], menu); } }]));
    }
  };

  // ---------- Free-text answers ----------
  const answer = (q: string) => {
    const t = q.toLowerCase();
    if (URGENT.test(t)) return helpNow();
    if (/\bplan|pre-?need|\bahead\b/.test(t)) return prePlan();
    if (/cost|price|how much|afford|cheap|package|expensive/.test(t)) return prices();
    const followUp = () => setChips([
      { label: "Talk to someone", on: () => { me("I'd like to talk to someone"); lead.current = { inquiry_type: "callback", notes: [`Chat question: ${q.slice(0, 200)}`] }; askName(); } },
      { label: "Back to menu", on: () => { me("Back to menu"); say(["Of course."], menu); } },
    ]);
    const reply = (lines: ReactNode[]) => say(lines, () => { setAsk("question"); followUp(); });

    if (/financ|payment|pay |insurance|monthly|installment/.test(t))
      return reply(["Yes, financing options are available for many families. Every situation is different, so a funeral director will walk you through what fits yours."]);
    if (/creole|kreyol|kreyòl|haitian|spanish|español|espanol|language/.test(t))
      return reply(["Yes. Our team guides families in English, Spanish and Haitian Creole, from the first call to the final goodbye."]);
    if (/view|wake|visitation/.test(t))
      return reply(["Yes. Many families choose a private viewing or a full service before cremation or burial."]);
    if (/veteran|military|va\b|army|navy|marine|air force/.test(t))
      return reply(["We help veterans' families access burial benefits and coordinate with the VA. Special pricing is available."]);
    if (/where|address|location|located|direction|park/.test(t))
      return reply([<span key="a">We&rsquo;re at {SITE.address.full}. <a className="link" href={SITE.directionsHref} target="_blank" rel="noopener noreferrer">Get directions →</a></span>, "We also come to you, at home, the hospital or hospice, anywhere in Miami-Dade and Broward."]);
    if (/hour|open|available|24/.test(t))
      return reply(["We answer the phone 24 hours a day, 7 days a week, including holidays."]);
    if (/haiti|repatriat|ship|send .*home|overseas|abroad/.test(t))
      return reply(["We serve many Haitian families and have chapels in Haiti. A funeral director can walk you through sending a loved one home."]);
    if (/cremat/.test(t))
      return reply(["Direct cremation starts at $1,595 and includes the transfer, all permits and paperwork, and returning the remains to your family. You can also hold a viewing or service first."]);
    if (/ash|scatter|sea|ocean/.test(t))
      return reply(["Yes, we coordinate dignified ash scattering ceremonies at sea off the South Florida coast."]);
    if (/reception|repast|food|gathering/.test(t))
      return reply(["Yes, we can help arrange a reception or repast so your family and friends can gather after the service."]);
    if (/\b(hi|hello|hey|good (morning|afternoon|evening))\b/.test(t) && t.length < 25)
      return say(["Hello. How can we help you today?"], menu);
    say(["That's a good question for a funeral director. Would you like someone to call you?"], () => { setAsk("question"); followUp(); });
  };

  const onSend = (e: FormEvent) => {
    e.preventDefault();
    const v = text.trim();
    setErr("");
    if (!v) return;
    if (ask === "name") {
      if (v.length < 2) return setErr("Please enter your name.");
      me(v); setText(""); lead.current.name = v.slice(0, 100); setAsk("none"); askPhone(); return;
    }
    if (ask === "phone") {
      if (!/^[0-9()+\-.\s]{7,20}$/.test(v)) return setErr("Please enter a valid phone number.");
      me(v); setText(""); submit(v); return;
    }
    me(v); setText(""); setAsk("none"); answer(v);
  };

  const toggle = () => {
    setOpen((o) => {
      if (!o) { track("chat_open"); start(); }
      return !o;
    });
    dismissTeaser();
  };
  const dismissTeaser = () => { setTeaser(false); try { sessionStorage.setItem("stf_teaser", "1"); } catch {} };

  if (widgetId) return null;

  const placeholder = ask === "name" ? "Your full name" : ask === "phone" ? "Your phone number" : "Type your question…";

  return (
    <>
      {open && (
        <div className="cx-panel" role="dialog" aria-label="St. Fort's virtual concierge">
          <header className="cx-head">
            <span className="cx-avatar"><img src="/bird-ivory.png" alt="" /><i aria-hidden /></span>
            <div className="cx-id">
              <strong>St. Fort&rsquo;s Concierge</strong>
              <span>Virtual assistant · <em>Here 24/7</em></span>
            </div>
            <a className="cx-icon" href={SITE.helpPhoneHref} aria-label={`Call ${SITE.helpPhone}`} data-track="chat_header"><PhoneIcon /></a>
            <button className="cx-icon" aria-label="Close chat" onClick={() => setOpen(false)}><CloseIcon /></button>
          </header>
          <a className="cx-rating" href={SITE.googleReviewsHref} target="_blank" rel="noopener noreferrer">
            <span aria-hidden>★★★★★</span> {SITE.rating.stars} on Google · {SITE.rating.count} reviews
          </a>
          <div className="cx-body" ref={scroller} aria-live="polite">
            {msgs.map((m) => (
              <div key={m.id} className={`cx-msg ${m.from}`}>{m.body}</div>
            ))}
            {typing && <div className="cx-msg bot cx-typing" aria-label="Typing"><span /><span /><span /></div>}
            {chips.length > 0 && (
              <div className="cx-chips">
                {chips.map((c) => <button key={c.label} className={c.primary ? "primary" : ""} onClick={c.on}>{c.label}</button>)}
              </div>
            )}
          </div>
          <form className="cx-input" onSubmit={onSend}>
            {err && <span className="cx-err" role="alert">{err}</span>}
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder}
              type={ask === "phone" ? "tel" : "text"}
              autoComplete={ask === "name" ? "name" : ask === "phone" ? "tel" : "off"}
              maxLength={ask === "question" ? 300 : 100}
              aria-label={placeholder}
            />
            <button type="submit" aria-label="Send">↑</button>
          </form>
          <p className="cx-foot">Automated assistant. A person handles every family.</p>
        </div>
      )}

      {teaser && !open && (
        <div className="cx-teaser">
          <button className="cx-teaser-x" aria-label="Dismiss" onClick={dismissTeaser}><CloseIcon /></button>
          <button className="cx-teaser-body" onClick={toggle}>
            Hi, we&rsquo;re here day or night. <span>Ask us anything, or plan ahead in two minutes.</span>
          </button>
        </div>
      )}

      <button className="cx-launch" onClick={toggle} aria-expanded={open} aria-label={open ? "Close chat" : "Chat with St. Fort's"}>
        <span className="cx-avatar"><img src="/bird-ivory.png" alt="" /><i aria-hidden /></span>
        <span className="cx-launch-t"><strong>Ask St. Fort&rsquo;s</strong><small>Here day or night</small></span>
      </button>
    </>
  );
}
