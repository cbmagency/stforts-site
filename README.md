# St. Fort's Funeral Home & Cremation — planning site

Next.js 15 site for planning.stfortsfuneralhome.com. It deploys on Vercel, and forms go to GoHighLevel.

## Pages (40)
- **Home**: a scroll-driven flower-field hero, then the immediate-need and plan-ahead paths, services, legacy, team preview, service areas, FAQ, Insights and a callback form.
- **Immediate Need, Planning Ahead, Our Team, Contact**: one page each.
- **Services**: a hub plus 7 pages: funerals, cremation, burial, personalization, receptions, veterans, grief support.
- **Service areas**: an index plus 16 city pages, each with its own local details.
- **Insights**: 3 starter articles.
- **Generated for SEO**: `sitemap.xml`, `robots.txt`, and FuneralHome, FAQ, Breadcrumb, Service and Article schema.

## Run locally
```
npm install
npm run dev
```

## Deploy to Vercel
1. Push this folder to a new GitHub repo (for example `cbmagency/stforts-site`).
2. In Vercel (team `cbm-agency`): Add New → Project → import the repo. The defaults are fine.
3. Add these environment variables:
   - `GHL_WEBHOOK_URL`: the inbound webhook URL from the St. Fort's GHL sub-account (Automation → Workflow → Inbound Webhook trigger). **Until this is set, form submissions are not saved.**
   - `NEXT_PUBLIC_GHL_WIDGET_ID`: the GHL chat widget id. When this is set, the GHL chat and voice widget replaces the built-in "Speak with us" panel.
   - `NEXT_PUBLIC_GA4_ID`: `G-XERR37GRYJ`
   - `NEXT_PUBLIC_ALLOW_INDEXING`: set to `true` **only** on the production domain at launch. Until then, robots.txt blocks Google.
4. Keep testing on the `*.vercel.app` URL. Only point `planning.stfortsfuneralhome.com` at Vercel once Evans approves.

## Lead payload sent to GHL
`name, phone, email, preferred_contact, preferred_time, inquiry_type (immediate_need | pre_planning | callback), tags, source, page_url, landing_page, utm_source/medium/campaign/term/content, gclid, fbclid, submitted_at`

Suggested pipeline: New Inquiry → Contact Attempted → Family Connected → Consultation Scheduled → Arrangements in Progress → Arrangement Confirmed → Closed / Not Proceeding.

## Before launch, confirm with Evans
- [ ] Founder page details: the Lynn University degree, the 2010 Haiti story, and the month of the St. Fort Drive dedication (2003 founding is confirmed on the main site)
- [ ] Team photo permission, Evans's bio, and titles for Milagros Torres and Nyemah A. The titles for Jeffrey and Gregory were shortened from the main site, so confirm the wording.
- [ ] All FAQ answers (`lib/content.ts`) and the service copy (`lib/services.ts`)
- [ ] Local details for each city page (cemeteries and churches the team works with): see `lib/locations.ts`
- [ ] The tracking IDs carried over from the old page (Google Ads `AW-942914070`, Meta Pixel `1793382978708734`, WhatConverts `167317`)
- [ ] Whether the tracking line (754) 707-2631 stays the primary number

## Notes
- The flower-field film and the editorial stills were generated in Higgsfield. They're mood imagery, not photos of the funeral home. Team portraits are from the official site.
- Content lives in `lib/`, so copy changes don't require touching the layout. A Sanity blog can replace `POSTS` later, the same way CBM's Insights works.
