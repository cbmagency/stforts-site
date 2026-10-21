// Single source of truth for St. Fort's contact details and brand facts.
// (754) 707-2631 is the TRACKING line used on this site — keep it primary.
export const SITE = {
  name: "St. Fort's Funeral Home & Cremation",
  shortName: "St. Fort's",
  url: "https://planning.stfortsfuneralhome.com",
  phone: "(754) 707-2631",
  phoneHref: "tel:+17547072631",
  phoneE164: "+1-754-707-2631",
  // Death calls / immediate need go straight to Evans (client decision, Oct 20, 2026).
  helpPhone: "(305) 710-7919",
  helpPhoneHref: "tel:+13057107919",
  // GHL booking calendar: "Virtual Pre-Planning Consultation" (Google Meet, Mon–Wed 12–4 ET).
  bookingHref: process.env.NEXT_PUBLIC_GHL_BOOKING_URL || "https://api.leadconnectorhq.com/widget/booking/DNL9MOG8ahjsxgW0GSZC",
  mainLine: "(305) 940-1428",
  mainLineHref: "tel:+13059401428",
  whatsappHref:
    "https://wa.me/17547072631?text=Hello%2C%20I%20would%20like%20to%20speak%20with%20someone%20at%20St.%20Fort%27s.",
  address: {
    street: "16480 NE 19th Avenue",
    city: "North Miami Beach",
    region: "FL",
    postal: "33162",
    full: "16480 NE 19th Avenue, North Miami Beach, FL 33162",
  },
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=16480+NE+19th+Avenue%2C+North+Miami+Beach%2C+FL+33162",
  // North Miami Beach Google Business Profile. Update the count every month or so.
  googleReviewsHref: "https://share.google/qiu0tztppdD1qkjoF",
  rating: { stars: "4.6", count: "289" },
  languages: ["English", "Spanish", "Haitian Creole"],
  social: {
    facebook: "https://www.facebook.com/stforts",
    instagram: "https://www.instagram.com/stfortsfuneralhome/",
  },
} as const;

export const NAV = [
  { label: "Immediate Need", href: "/immediate-need" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Pre-Planning", href: "/pre-planning" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;
