// Business settings live here so the owner can adjust them in one place.
// Values marked "confirm" are sensible defaults that the business should verify.

export const site = {
  name: "Feras Tasty Bites",
  shortName: "Feras TastyBites",
  tagline: "Flavour from its roots",
  description:
    "Authentic Nigerian food made from scratch in Ontario. Jollof rice, puff puff, gizdodo, chin chin, zobo, party trays, gift packs and bulk orders.",
  region: "Toronto & the GTA, Ontario",
  country: "CA",
  currency: "CAD",
  locale: "en-CA",

  instagram: {
    handle: "feras_tastybites",
    url: "https://www.instagram.com/feras_tastybites/",
  },
  whatsapp: {
    display: "647-705-1219",
    // E.164 without the plus, as wa.me expects
    number: "16477051219",
  },
  phone: {
    display: "647-705-1219",
    href: "tel:+16477051219",
  },
  // Where order and catering notifications are emailed (confirm)
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",

  // Ontario HST on prepared food (confirm with your accountant)
  taxRate: 0.13,
  taxLabel: "HST (13%)",

  fulfillment: {
    pickup: {
      label: "Pickup",
      fee: 0,
      note: "Pickup address and time window are confirmed by message after you order.",
    },
    delivery: {
      label: "Local delivery",
      fee: 10, // confirm
      freeOver: 100, // confirm: free delivery when subtotal reaches this
      note: "Delivered across Toronto & the GTA. We confirm your delivery window by message.",
    },
  },

  // Everything is cooked to order, so orders need notice (confirm)
  leadTimeDays: 1,
  maxDaysAhead: 30,
  timeSlots: ["11:00 – 1:00 PM", "1:00 – 3:00 PM", "3:00 – 5:00 PM", "5:00 – 7:00 PM"],
  minimumOrder: 10,

  payments: {
    etransfer: {
      label: "Interac e-Transfer",
      // Set NEXT_PUBLIC_ETRANSFER_EMAIL to show the address on the confirmation page
      email: process.env.NEXT_PUBLIC_ETRANSFER_EMAIL ?? "",
    },
  },
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
