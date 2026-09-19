import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { Order } from "./store";

// Minimal Stripe Checkout client over the REST API, so no SDK is needed.
// Card payments switch on when STRIPE_SECRET_KEY is set.

const key = () => process.env.STRIPE_SECRET_KEY;

export const cardPaymentsEnabled = () => Boolean(key());

async function stripe<T>(path: string, init: { method?: string; body?: URLSearchParams } = {}): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: init.body,
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message ?? `Stripe request failed (${res.status})`);
  return json as T;
}

const cents = (n: number) => String(Math.round(n * 100));

export async function createCheckoutSession(order: Order, origin: string) {
  const p = new URLSearchParams();
  p.set("mode", "payment");
  p.set("client_reference_id", order.id);
  p.set("customer_email", order.customer.email);
  p.set("metadata[order_id]", order.id);
  p.set("payment_intent_data[metadata][order_id]", order.id);
  p.set("success_url", `${origin}/order/${order.id}?session_id={CHECKOUT_SESSION_ID}`);
  p.set("cancel_url", `${origin}/order/${order.id}?cancelled=1`);

  const items: { name: string; description?: string; amount: number; qty: number }[] = order.lines.map((l) => ({
    name: l.name,
    description: l.summary.join(" · ") || undefined,
    amount: l.unitPrice,
    qty: l.qty,
  }));
  if (order.deliveryFee > 0) items.push({ name: "Delivery", amount: order.deliveryFee, qty: 1 });
  if (order.tax > 0) items.push({ name: "HST", amount: order.tax, qty: 1 });

  items.forEach((item, i) => {
    p.set(`line_items[${i}][quantity]`, String(item.qty));
    p.set(`line_items[${i}][price_data][currency]`, "cad");
    p.set(`line_items[${i}][price_data][unit_amount]`, cents(item.amount));
    p.set(`line_items[${i}][price_data][product_data][name]`, item.name);
    if (item.description) p.set(`line_items[${i}][price_data][product_data][description]`, item.description);
  });

  return stripe<{ id: string; url: string }>("/checkout/sessions", { method: "POST", body: p });
}

export async function getCheckoutSession(id: string) {
  return stripe<{ id: string; payment_status: string; client_reference_id: string | null }>(
    `/checkout/sessions/${encodeURIComponent(id)}`,
  );
}

/** Verifies a Stripe-Signature header (v1 scheme, 5 minute tolerance). */
export function verifyWebhook(payload: string, header: string | null, secret: string) {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((kv) => {
      const [k, ...v] = kv.split("=");
      return [k, v.join("=")];
    }),
  );
  const timestamp = Number(parts.t);
  if (!timestamp || Math.abs(Date.now() / 1000 - timestamp) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${parts.t}.${payload}`).digest();
  return header
    .split(",")
    .filter((kv) => kv.startsWith("v1="))
    .some((kv) => {
      const sig = Buffer.from(kv.slice(3), "hex");
      return sig.length === expected.length && timingSafeEqual(sig, expected);
    });
}
