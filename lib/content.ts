// Team roster: names/titles exactly as published on stfortsfuneralhome.com.
// TODO(client): photo permission, bios, and titles for Milagros & Nyemah.
export const TEAM = [
  { name: "Evans St. Fort", title: "CEO / Licensed Funeral Director", photo: "/team/evans.jpg" },
  { name: "Gregory St Fort", title: "Manager", photo: "/team/gregory.jpg" },
  { name: "Jeffrey St Fort", title: "Licensed Funeral Director & Manager", photo: "/team/jeffrey.jpg" },
  { name: "Kirk Yearby", title: "Licensed Funeral Director", photo: "/team/kirk.jpg" },
  { name: "Angela W.", title: "Funeral Director", photo: "/team/angela.jpg" },
  { name: "Chase Battle", title: "Funeral Director / Intern", photo: "/team/chase.jpg" },
  { name: "Geneva S.", title: "Administrator", photo: "/team/geneva.jpg" },
  { name: "Milagros Torres", title: "", photo: "/team/milagros.jpg" },
  { name: "Belenske E.", title: "Logistics / Funeral Director Assistant", photo: "/team/belenske.jpg" },
  { name: "David S.", title: "Funeral Service Attendant", photo: "/team/david.jpg" },
  { name: "Chelsea E.", title: "Funeral Attendant", photo: "/team/chelsea.jpg" },
  { name: "Diamonte S.", title: "Funeral Assistant", photo: "/team/diamonte.jpg" },
  { name: "Adrian", title: "Music Director", photo: "/team/adrian.jpg" },
  { name: "Nyemah A.", title: "", photo: "/team/nyemah.jpg" },
];

// TODO(client): Evans to review every answer before launch.
export const FAQS = [
  { q: "What should I do when someone passes away in Miami?", a: "Take a breath — you don't need every answer right now. If the passing was unexpected at home, call 911 first. If your loved one was in hospice or a hospital, the staff will guide the first step. Then call us. We answer 24 hours a day and will tell you exactly what happens next." },
  { q: "Who should I call first?", a: "For an unexpected passing at home, call 911. Otherwise, you can call a funeral director directly. Our team answers day and night at (754) 707-2631." },
  { q: "How much does a funeral or cremation cost?", a: "Direct cremation starts at $1,595, a funeral with cremation starts at $4,995, and a basic burial starts at $5,995. Your final cost depends on your choices, and we review every cost with you before you decide." },
  { q: "Can we have a viewing before cremation?", a: "Yes. Many families choose a private viewing or a full service before cremation." },
  { q: "Are payment options available?", a: "We offer financing options for many families. Every situation is different, so call us and we'll walk you through what's available." },
  { q: "Do you speak Haitian Creole and Spanish?", a: "Yes. Our team can guide your family in English, Spanish and Haitian Creole." },
  { q: "Do you serve families outside North Miami Beach?", a: "Yes. We serve families across Miami-Dade and Broward County, and we come to you — home, hospital or hospice." },
  { q: "How do I start planning ahead?", a: "Request a private consultation on this site or simply call us. We'll listen, answer your questions and help you put your wishes in writing, with no pressure." },
];

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  body: { h?: string; p?: string; list?: string[] }[];
};

export const POSTS: Post[] = [
  {
    slug: "what-to-do-when-someone-dies-in-miami",
    title: "What to Do When Someone Dies in Miami: A Calm, Step-by-Step Guide",
    description: "The first hours after a loss can feel overwhelming. Here's exactly what to do, who to call, and what can wait.",
    date: "2026-10-20",
    readTime: "5 min read",
    image: "/images/candle.jpg",
    body: [
      { p: "When someone you love dies, your mind races. Who do I call? What do I sign? What happens now? This guide walks you through the first steps, in order, so you can focus on your family." },
      { h: "1. If the death happened at home" },
      { p: "If the passing was unexpected, call 911. Emergency responders and, in some cases, the Medical Examiner will need to be involved before your loved one can be moved. If your loved one was in home hospice, call the hospice nurse first. They'll confirm the passing and guide the next step." },
      { h: "2. If the death happened in a hospital or nursing home" },
      { p: "The staff will handle the first steps. They'll ask which funeral home you'd like to use. You can give them our name, or call us and we'll coordinate directly." },
      { h: "3. Call a funeral home" },
      { p: "Once you call, a funeral director brings your loved one into their care — day or night. At St. Fort's, we answer 24 hours a day at (754) 707-2631, in English, Spanish or Haitian Creole." },
      { h: "4. What to gather (when you're ready)" },
      { list: ["Your loved one's full legal name, date of birth and Social Security number", "Their parents' names, including mother's maiden name", "Military discharge papers (DD-214), if they served", "Any pre-arranged funeral plan or written wishes", "A favorite photo for the service and obituary"] },
      { h: "5. What can wait" },
      { p: "Almost everything else. You don't need to decide on burial or cremation in the first hour. You don't need to write the obituary tonight. A good funeral director will slow things down, not rush you." },
      { h: "You don't have to do this alone" },
      { p: "If you're reading this because someone just passed, we're sorry. Call us any time, and we'll take it from here." },
    ],
  },
  {
    slug: "how-much-does-a-funeral-cost-in-miami",
    title: "How Much Does a Funeral Cost in Miami? An Honest Breakdown",
    description: "Funeral and cremation costs in South Florida, explained plainly — what's included, what's extra, and how to plan without surprises.",
    date: "2026-10-20",
    readTime: "6 min read",
    image: "/images/urn.jpg",
    body: [
      { p: "Most families have never priced a funeral before — and it often happens at the hardest moment of their lives. Here's a plain-language look at what goes into the cost, so you can make clear decisions." },
      { h: "Starting prices at St. Fort's" },
      { list: ["Direct cremation: from $1,595", "Funeral with cremation: from $4,995", "Basic burial: from $5,995"] },
      { p: "These are starting points. Your final cost depends on the choices you make, and we review every cost with you before you decide." },
      { h: "What usually affects the price" },
      { list: ["Burial or cremation", "Whether you hold a viewing or service", "The casket or urn you choose", "Flowers, programs, music and a reception", "Cemetery charges such as the plot and opening, which are separate from funeral home charges"] },
      { h: "Questions to ask any funeral home" },
      { list: ["Can I see your price list?", "What's included in this package, exactly?", "Which costs come from the cemetery, not you?", "Do you offer payment options?"] },
      { p: "Any funeral home should answer these clearly. If you'd like to talk through options for your family, call us at (754) 707-2631 or request a private consultation." },
    ],
  },
  {
    slug: "haitian-funeral-traditions-in-miami",
    title: "Honoring Haitian Funeral Traditions in Miami",
    description: "How Miami's Haitian families honor their loved ones — from the wake to the repast — and how a funeral home can help keep those traditions.",
    date: "2026-10-20",
    readTime: "4 min read",
    image: "/images/lilies.jpg",
    body: [
      { p: "In Haitian culture, a funeral is more than a service. It's a gathering of family, faith and community — often across generations and across the sea. For Miami's Haitian families, keeping those traditions matters." },
      { h: "Gathering together" },
      { p: "Families often come together in the days before the funeral to pray, sing, share food and support one another. Relatives may travel from Haiti, Canada or elsewhere in the U.S., so timing the service with care matters." },
      { h: "A service rooted in faith" },
      { p: "Many services are held in church, with hymns, prayers and tributes from family. Dress, music and readings often reflect both faith and Haitian heritage." },
      { h: "The repast" },
      { p: "After the burial, families commonly share a meal together. It's a time to remember, laugh and lean on each other." },
      { h: "Guidance in Haitian Creole" },
      { p: "At St. Fort's, our team can guide your family in Haitian Creole from the first call through the final goodbye. Every family is different, so we'll always ask what matters most to yours. Call us at (754) 707-2631." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

// Public Google reviews from the North Miami Beach profile (4.6★, 289 reviews).
// Quoted from the visible review text; names shortened to first name + last initial.
export const REVIEWS = [
  { name: "Tiffany M.", when: "Google review", text: "Planning our mother's funeral was the most difficult thing we've ever had to do. St. Fort's did a phenomenal job guiding and supporting us through this process and relieving our stress. My mother's send off was absolutely beautiful." },
  { name: "Natacha P.", when: "Google review", text: "Everyone was amazing. Gregory was amazing and patient with my family. Inside is beautiful. The whole team took good care of us. This is the first time ever planning a funeral. They helped us step by step." },
  { name: "Valeria", when: "Google review", text: "Among so many funeral homes that charge exorbitant prices, St. Fort's remains true to its purpose: to care for families who have lost their loved ones." },
  { name: "Sallam S.", when: "Google review", text: "St. Fort's Funeral Home provided exceptional care and service to our family during a very difficult time. The staff was attentive, organized, and genuinely compassionate." },
  { name: "Linda E.", when: "Google review", text: "All of our needs were met and we are extremely satisfied with the level of professionalism and the overall experience! Thank you Evans!" },
];
