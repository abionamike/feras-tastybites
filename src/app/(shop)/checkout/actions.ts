"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { earliestDate, latestDate } from "@/lib/dates";
import { notifyNewOrder } from "@/lib/notify";
import { computeTotals, type CartLine, type Fulfillment } from "@/lib/pricing";
import { site } from "@/lib/site";
import { createOrder, updateOrder, type PaymentMethod } from "@/lib/store";
import { cardPaymentsEnabled, createCheckoutSession } from "@/lib/stripe";

export type CheckoutState = {
  error?: string;
  fieldErrors?: Partial<Record<string, string>>;
  values?: Record<string, string>;
};

const str = (fd: FormData, key: string, max = 200) => String(fd.get(key) ?? "").trim().slice(0, max);

async function originFromRequest() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return process.env.SITE_URL?.replace(/\/$/, "") ?? `${proto}://${host}`;
}

export async function placeOrder(_prev: CheckoutState, fd: FormData): Promise<CheckoutState> {
  const values = {
    name: str(fd, "name", 80),
    email: str(fd, "email", 120).toLowerCase(),
    phone: str(fd, "phone", 30),
    fulfillment: str(fd, "fulfillment", 20),
    line1: str(fd, "line1", 120),
    city: str(fd, "city", 60),
    postal: str(fd, "postal", 10).toUpperCase(),
    date: str(fd, "date", 10),
    slot: str(fd, "slot", 40),
    payment: str(fd, "payment", 20),
    notes: str(fd, "notes", 600),
  };

  const errors: Record<string, string> = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Please enter a valid email.";
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a phone number we can reach you on.";

  const fulfillment: Fulfillment = values.fulfillment === "delivery" ? "delivery" : "pickup";
  if (fulfillment === "delivery") {
    if (values.line1.length < 4) errors.line1 = "Please enter your street address.";
    if (values.city.length < 2) errors.city = "Please enter your city.";
    if (!/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/.test(values.postal)) errors.postal = "Please enter a valid postal code.";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || values.date < earliestDate() || values.date > latestDate()) {
    errors.date = `Please choose a date between ${earliestDate()} and ${latestDate()}.`;
  }
  if (!(site.timeSlots as readonly string[]).includes(values.slot)) errors.slot = "Please choose a time window.";

  const payment: PaymentMethod = values.payment === "card" && cardPaymentsEnabled() ? "card" : "etransfer";

  let lines: CartLine[] = [];
  try {
    const parsed = JSON.parse(String(fd.get("cart") ?? "[]"));
    if (Array.isArray(parsed)) lines = parsed.slice(0, 50);
  } catch {}
  const totals = computeTotals(lines, fulfillment);

  if (totals.lines.length === 0) return { error: "Your bag is empty.", values };
  if (totals.lines.length !== lines.length)
    return { error: "Some items in your bag are no longer available. Please review your bag and try again.", values };
  if (totals.subtotal < site.minimumOrder) return { error: `The minimum order is $${site.minimumOrder}.`, values };
  if (Object.keys(errors).length) return { fieldErrors: errors, error: "Please check the highlighted fields.", values };

  const order = await createOrder({
    paymentMethod: payment,
    customer: { name: values.name, email: values.email, phone: values.phone },
    fulfillment,
    address: fulfillment === "delivery" ? { line1: values.line1, city: values.city, postal: values.postal } : undefined,
    date: values.date,
    slot: values.slot,
    notes: values.notes,
    lines: totals.lines.map((l) => ({
      slug: l.slug,
      name: l.product.name,
      qty: l.qty,
      unitPrice: l.unitPrice,
      lineTotal: l.lineTotal,
      summary: l.summary,
    })),
    subtotal: totals.subtotal,
    deliveryFee: totals.deliveryFee,
    tax: totals.tax,
    total: totals.total,
  });

  const origin = await originFromRequest();
  await notifyNewOrder(order, `${origin}/order/${order.id}`);

  if (payment === "card") {
    let url: string;
    try {
      const session = await createCheckoutSession(order, origin);
      await updateOrder(order.id, { stripeSessionId: session.id });
      url = session.url;
    } catch (err) {
      console.error("Stripe checkout failed", err);
      redirect(`/order/${order.id}?placed=1&payment=failed`);
    }
    redirect(url);
  }

  redirect(`/order/${order.id}?placed=1`);
}
