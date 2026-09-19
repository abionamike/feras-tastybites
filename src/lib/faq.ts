import { site } from "./site";

export const faqs: { q: string; a: string }[] = [
  {
    q: "How far in advance should I order?",
    a: `Everything is cooked fresh to order, so please order at least ${site.leadTimeDays === 1 ? "one day" : `${site.leadTimeDays} days`} ahead. For catering and large orders, 1–2 weeks' notice is best. Need something sooner? Message us on WhatsApp and we'll do our best.`,
  },
  {
    q: "Do you deliver?",
    a: `Yes. We deliver across ${site.region.split(",")[0]}. Delivery is $${site.fulfillment.delivery.fee}, and free on orders over $${site.fulfillment.delivery.freeOver}. You can also choose free pickup at checkout.`,
  },
  {
    q: "Where do I pick up my order?",
    a: "After you order, we'll message you to confirm the pickup address and your time window.",
  },
  {
    q: "How do I pay?",
    a: "You can pay by Interac e-Transfer, and by card when online card payments are available at checkout. Include your order code in the e-Transfer message so we can match your payment.",
  },
  {
    q: "Can I choose how spicy my food is?",
    a: "Yes. Our Flavour Packs and gizdodo let you pick mild, medium or Naija hot when you add them to your bag.",
  },
  {
    q: "Do you cater events?",
    a: "Absolutely. We cater graduations, birthdays, family events, office lunches and vendor days. Use the catering form for a quote.",
  },
  {
    q: "Do you make gift packs?",
    a: "Yes. Gift packs of chin chin, puff puff and other treats are available for favours, holidays and corporate gifts. Send us an enquiry with the quantity you need.",
  },
  {
    q: "What about allergies?",
    a: "Our kitchen may handle common allergens such as wheat, eggs, dairy, fish and nuts. Please add a note at checkout or message us before ordering if you have an allergy.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Message us on WhatsApp as soon as possible. Because we shop and cook for each order, changes are easiest when made at least a day before your pickup or delivery.",
  },
];
