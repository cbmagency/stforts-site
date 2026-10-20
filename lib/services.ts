// Service pages. Copy is original to St. Fort's. Prices are previously published
// "starting at" figures — TODO(client): Evans must confirm before launch.
export type Service = {
  slug: string;
  name: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  price?: string;
  points: { title: string; body: string }[];
  sections: { heading: string; body: string[] }[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "funerals",
    summary: "Viewings, chapel or church services, every detail handled.",
    name: "Funeral Services",
    metaTitle: "Funeral Services in North Miami Beach | St. Fort's Funeral Home",
    metaDescription:
      "Personal, dignified funeral services in North Miami Beach and across Miami-Dade and Broward. Viewings, chapel and church services, 24/7. English, Spanish & Haitian Creole.",
    headline: "A funeral that feels like them.",
    intro:
      "We plan every service around the person you love — their faith, their music, their people. You tell us who they were. We handle the rest.",
    image: "/images/candle.jpg",
    imageAlt: "A lit candle beside white roses on a dark walnut table",
    price: "Funeral with cremation from $4,995",
    points: [
      { title: "Viewing & visitation", body: "A private family viewing or a public visitation, arranged at a pace that feels right." },
      { title: "Chapel or church service", body: "Hold the service in our chapel, your church, or another meaningful place." },
      { title: "Every detail handled", body: "Transportation, paperwork, death certificates, flowers, programs and the procession." },
    ],
    sections: [
      {
        heading: "What a funeral with St. Fort's looks like",
        body: [
          "It starts with a conversation, not a sales pitch. A funeral director sits with your family, listens, and explains each choice in plain words.",
          "From there, we take care of the arrangements: bringing your loved one into our care, preparing them with respect, coordinating with your church or cemetery, and guiding the day itself so your family can simply be present.",
        ],
      },
      {
        heading: "Honoring faith and culture",
        body: [
          "Miami families come from everywhere, and so do their traditions. We regularly serve Haitian, Caribbean, Latin American and African American families, and we can guide you in English, Spanish or Haitian Creole.",
          "Whether your family keeps a wake, a novena, a homegoing celebration or a quiet graveside prayer, we'll shape the service around it.",
        ],
      },
    ],
    faqs: [
      { q: "How soon can a funeral take place?", a: "It depends on paperwork, the cemetery or church, and your family's wishes. Call us any time and we'll walk you through a realistic timeline." },
      { q: "Can the service be held at our church?", a: "Yes. Many families choose their own church. We coordinate everything with the clergy and the venue." },
    ],
  },
  {
    slug: "cremation",
    summary: "Direct cremation or cremation with a service, with clear pricing.",
    name: "Cremation Services",
    metaTitle: "Cremation Services in North Miami & North Miami Beach | St. Fort's",
    metaDescription:
      "Dignified cremation in North Miami Beach with clear pricing. Direct cremation, cremation with a service, urns and ash scattering at sea. Available 24/7.",
    headline: "Cremation, with every bit of the same care.",
    intro:
      "Choosing cremation doesn't mean choosing less. You can still gather, view, pray and celebrate — before or after — and we'll guide you through each step.",
    image: "/images/urn.jpg",
    imageAlt: "An ivory ceramic urn with white ranunculus on travertine stone",
    price: "Direct cremation from $1,595",
    points: [
      { title: "Direct cremation", body: "A simple, respectful cremation without a formal service. Clear pricing, no pressure." },
      { title: "Cremation with a service", body: "A viewing or memorial before cremation, or a celebration of life afterward." },
      { title: "Urns & keepsakes", body: "Help choosing an urn, keepsake jewelry, or a final resting place." },
    ],
    sections: [
      {
        heading: "How cremation works with us",
        body: [
          "Once you call, we bring your loved one into our care, handle the required permits and authorizations, and keep you informed at every step.",
          "When the cremation is complete, we return your loved one to you personally and help with whatever comes next — a memorial, an urn, a niche, or scattering.",
        ],
      },
      {
        heading: "Ash scattering at sea",
        body: [
          "For families who feel the ocean is the right place, we can help arrange a respectful scattering at sea off the South Florida coast.",
        ],
      },
    ],
    faqs: [
      { q: "How much does cremation cost in North Miami?", a: "At St. Fort's, direct cremation starts at $1,595. Your final cost depends on the choices you make, and we review every cost with you before you decide." },
      { q: "Can we have a viewing before cremation?", a: "Yes. Many families choose a private viewing or a full service before cremation." },
    ],
  },
  {
    slug: "burial",
    summary: "Casket, cemetery and graveside — coordinated for you.",
    name: "Burial Services",
    metaTitle: "Burial Services in Miami-Dade & Broward | St. Fort's Funeral Home",
    metaDescription:
      "Traditional burial services from St. Fort's in North Miami Beach. Casket selection, cemetery coordination, graveside services and processions across South Florida.",
    headline: "A traditional burial, handled with grace.",
    intro:
      "From the casket to the cemetery, we coordinate every detail so your family can focus on saying goodbye together.",
    image: "/images/lilies.jpg",
    imageAlt: "White calla lilies resting on ivory linen in soft window light",
    price: "Basic burial from $5,995",
    points: [
      { title: "Casket selection", body: "A range of caskets for different wishes and budgets, explained honestly." },
      { title: "Cemetery coordination", body: "We work directly with cemeteries across Miami-Dade and Broward." },
      { title: "Graveside & procession", body: "A dignified procession and graveside service, led by our team." },
    ],
    sections: [
      {
        heading: "Working with your cemetery",
        body: [
          "If your family already has a plot, we coordinate the opening, timing and graveside details with the cemetery. If not, we'll help you understand your options and what each one involves.",
          "Cemetery charges are separate from funeral home charges. We'll explain both clearly so there are no surprises.",
        ],
      },
    ],
    faqs: [
      { q: "Do you help if we haven't chosen a cemetery?", a: "Yes. We'll talk through cemeteries near you and what each one involves, then coordinate with the one you choose." },
      { q: "Is the cemetery cost included?", a: "Cemetery charges such as the plot and opening are separate. We'll walk you through every cost before you decide." },
    ],
  },
  {
    slug: "personalization",
    summary: "Music, photos and traditions that tell their story.",
    name: "Personalized Celebrations of Life",
    metaTitle: "Personalized Funerals & Celebrations of Life in Miami | St. Fort's",
    metaDescription:
      "Celebrations of life that reflect a real person — music, photos, tributes, flowers and cultural traditions. Planned with care in North Miami Beach.",
    headline: "Every life has its own story. The service should tell it.",
    intro:
      "Their favorite song. The photos everyone loves. The dish they were known for. We help you bring the little things together into a farewell that feels unmistakably theirs.",
    image: "/images/hands.jpg",
    imageAlt: "Two hands gently holding each other in warm window light",
    points: [
      { title: "Music & tributes", body: "Live or recorded music, choirs, readings and family tributes." },
      { title: "Photo & video memorials", body: "Slideshows, memory tables and keepsake programs." },
      { title: "Cultural traditions", body: "Haitian, Caribbean, Latin and faith traditions, honored with respect." },
    ],
    sections: [
      {
        heading: "Ideas families love",
        body: [
          "A memory table with their hat, their Bible or their dominoes. A release of white doves. A favorite flower on every seat. A playlist that makes everyone smile through the tears.",
          "There's no wrong way to remember someone. Tell us about them, and we'll help shape the day.",
        ],
      },
    ],
    faqs: [
      { q: "Can we personalize a cremation service too?", a: "Absolutely. Every personal touch is available with cremation as well as burial." },
    ],
  },
  {
    slug: "receptions",
    summary: "Food and fellowship after the service.",
    name: "Receptions & Repast",
    metaTitle: "Funeral Receptions & Repast Catering in North Miami Beach | St. Fort's",
    metaDescription:
      "Gather after the service with food and fellowship. Funeral receptions and repast catering arranged by St. Fort's in North Miami Beach.",
    headline: "After the goodbye, a place to gather.",
    intro:
      "Some of the most healing moments happen over a shared meal. We can arrange a reception or repast so family and friends can stay, talk and remember together.",
    image: "/images/reception.jpg",
    imageAlt: "A long table dressed in ivory linen with white flowers and candles",
    points: [
      { title: "Catering", body: "Food arranged for your guests, so no one in the family has to cook." },
      { title: "Setup & flow", body: "Tables, flowers and timing handled by our team." },
      { title: "Room to remember", body: "Space for stories, photos and quiet conversation." },
    ],
    sections: [
      {
        heading: "Why families choose a reception",
        body: [
          "After a service, people often aren't ready to leave. A reception gives everyone a gentle place to land — and takes the pressure off your family to host at home.",
        ],
      },
    ],
    faqs: [
      { q: "Can you cater traditional dishes?", a: "Tell us what matters to your family and we'll do our best to make it part of the menu. Call us and we'll walk you through the options." },
    ],
  },
  {
    slug: "veterans",
    summary: "Military honors and help with veteran benefits.",
    name: "Veteran Funeral Services",
    metaTitle: "Veteran Funeral Services & Military Honors in Miami | St. Fort's",
    metaDescription:
      "Honoring those who served. St. Fort's helps South Florida families request military funeral honors and understand veteran burial benefits.",
    headline: "They served. We'll honor that.",
    intro:
      "We help families of veterans request military funeral honors and understand the burial benefits their loved one may have earned.",
    image: "/images/candle.jpg",
    imageAlt: "A lit candle beside white roses",
    points: [
      { title: "Military honors", body: "Help requesting a flag-folding ceremony and the playing of Taps." },
      { title: "Benefits guidance", body: "We help you understand which VA burial benefits may apply." },
      { title: "National cemetery", body: "Coordination for eligible burials at a national cemetery." },
    ],
    sections: [
      {
        heading: "What to have ready",
        body: [
          "If you can, find your loved one's discharge papers (usually a DD-214). If you can't find them, don't worry — call us and we'll help you figure out the next step.",
        ],
      },
    ],
    faqs: [
      { q: "Are veterans entitled to burial benefits?", a: "Many veterans are eligible for certain benefits, such as military honors and burial in a national cemetery. Eligibility varies, so call us and we'll help you check." },
    ],
  },
  {
    slug: "grief-support",
    summary: "Resources and care that continue after the service.",
    name: "Grief Support & Recovery",
    metaTitle: "Grief Support & Recovery in Miami | St. Fort's Funeral Home",
    metaDescription:
      "Support doesn't end after the service. Grief resources and gentle guidance for South Florida families from St. Fort's Funeral Home.",
    headline: "Grief doesn't end with the service. Neither does our care.",
    intro:
      "The weeks and months after a loss can be the hardest. We stay close, share resources, and help you find the support that fits your family.",
    image: "/images/hands.jpg",
    imageAlt: "Hands held together in soft light",
    points: [
      { title: "Resources", body: "Guides for coping with loss, for adults and for children." },
      { title: "Local support", body: "Help finding grief groups and counselors in South Florida." },
      { title: "Someone to call", body: "Our team is here when you have questions, even months later." },
    ],
    sections: [
      {
        heading: "There's no right way to grieve",
        body: [
          "Some days will feel almost normal. Others won't. Both are part of it. If grief starts to feel too heavy to carry, please reach out to a counselor, your faith leader, or someone you trust.",
          "If you or someone you love is in crisis, call or text 988 to reach the Suicide & Crisis Lifeline, any time.",
        ],
      },
    ],
    faqs: [
      { q: "Do you offer support after the funeral?", a: "Yes. We're glad to share resources and help you find local grief support. Just call us." },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
