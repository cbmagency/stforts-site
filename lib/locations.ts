// Service-area pages. Each city carries its own facts so pages aren't
// interchangeable (Google penalizes copy-paste "doorway" pages).
// TODO(client): add per-city specifics Evans can confirm — cemeteries and
// churches the team works with often, and a real family story from that area.
export type Area = {
  slug: string;
  name: string;
  county: "Miami-Dade" | "Broward";
  relation: string; // where it sits relative to the funeral home
  note: string; // something specific to that community
  spanishLead?: boolean;
  creoleLead?: boolean;
};

export const AREAS: Area[] = [
  { slug: "north-miami-beach", name: "North Miami Beach", county: "Miami-Dade", relation: "This is home. Our funeral home sits on NE 19th Avenue, right here in North Miami Beach.", note: "Families here can stop by in person any day to sit down with a funeral director." , creoleLead: true },
  { slug: "north-miami", name: "North Miami", county: "Miami-Dade", relation: "North Miami is our next-door neighbor, just minutes from our NE 19th Avenue location.", note: "North Miami is home to one of the largest Haitian communities in the country, and our team serves families in Haitian Creole every day.", creoleLead: true },
  { slug: "aventura", name: "Aventura", county: "Miami-Dade", relation: "Aventura sits just to our northeast — a short drive up Biscayne Boulevard.", note: "Many Aventura families plan ahead with us, so their children never have to make hard decisions in a rush." },
  { slug: "miami-shores", name: "Miami Shores", county: "Miami-Dade", relation: "Miami Shores is a short drive south of us along Biscayne Boulevard.", note: "We often work with families who want a service at their own church, then a gathering close to home." },
  { slug: "bal-harbour", name: "Bal Harbour", county: "Miami-Dade", relation: "Bal Harbour is just across the bay from North Miami Beach.", note: "For families who expect discretion and a private experience, we can arrange quiet, appointment-only consultations." },
  { slug: "miami-gardens", name: "Miami Gardens", county: "Miami-Dade", relation: "Miami Gardens is a short drive west of our North Miami Beach location.", note: "Miami Gardens families often choose a full homegoing celebration with church service, choir and repast — and we'll help plan every part of it." },
  { slug: "opa-locka", name: "Opa-locka", county: "Miami-Dade", relation: "Opa-locka is a short drive southwest of us.", note: "We'll come to you, whether your loved one passed at home, in a hospital or in hospice care." },
  { slug: "hialeah", name: "Hialeah", county: "Miami-Dade", relation: "Hialeah is southwest of us, about a half-hour drive depending on traffic.", note: "Our Spanish-speaking team can guide Hialeah families through every step in Spanish, from the first call to the final goodbye.", spanishLead: true },
  { slug: "coral-gables", name: "Coral Gables", county: "Miami-Dade", relation: "Coral Gables is further south, but distance is never a barrier — we come to you.", note: "Coral Gables families often ask for refined, personal services. That's exactly how we work.", spanishLead: true },
  { slug: "hollywood", name: "Hollywood", county: "Broward", relation: "Hollywood is just north of us, across the Broward County line.", note: "We regularly serve families in South Broward, coordinating with Broward cemeteries and churches." },
  { slug: "dania-beach", name: "Dania Beach", county: "Broward", relation: "Dania Beach is a short drive north of North Miami Beach.", note: "Some Dania Beach families choose ash scattering at sea — a peaceful farewell close to the coast they love." },
  { slug: "fort-lauderdale", name: "Fort Lauderdale", county: "Broward", relation: "Fort Lauderdale is north of us, roughly a half-hour drive.", note: "Fort Lauderdale families often call us for our personal attention and our Haitian Creole and Spanish-speaking team.", creoleLead: true },
  { slug: "miramar", name: "Miramar", county: "Broward", relation: "Miramar is northwest of us in southern Broward County.", note: "Miramar has a large Caribbean community, and we understand the traditions that matter to Caribbean families.", creoleLead: true },
  { slug: "pembroke-pines", name: "Pembroke Pines", county: "Broward", relation: "Pembroke Pines is northwest of us in Broward County.", note: "We can meet Pembroke Pines families by phone or video, then take care of everything in person." },
  { slug: "weston", name: "Weston", county: "Broward", relation: "Weston is on the western edge of Broward — further out, but we serve families there too.", note: "Planning ahead is popular with Weston families who want everything settled and paid for in advance.", spanishLead: true },
  { slug: "coral-springs", name: "Coral Springs", county: "Broward", relation: "Coral Springs is in northern Broward County. We serve families there by phone, video and in person.", note: "Many Coral Springs families call us when a parent or grandparent lives in Miami-Dade but they live up north." },
];

export const getArea = (slug: string) => AREAS.find((a) => a.slug === slug);
