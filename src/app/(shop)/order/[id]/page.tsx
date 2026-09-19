import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { prettyDate } from "@/lib/dates";
import { formatMoney } from "@/lib/pricing";
import { site, whatsappLink } from "@/lib/site";
import { getOrder, updateOrder, type Order, type OrderStatus } from "@/lib/store";
import { cardPaymentsEnabled, getCheckoutSession } from "@/lib/stripe";
import { ClearCart } from "./ClearCart";

export const metadata: Metadata = { title: "Your order", robots: { index: false } };

const steps: { id: OrderStatus; label: string }[] = [
  { id: "new", label: "Received" },
  { id: "confirmed", label: "Confirmed" },
  { id: "preparing", label: "Cooking" },
  { id: "ready", label: "Ready" },
  { id: "completed", label: "Enjoyed" },
];

async function syncStripePayment(order: Order, sessionId?: string) {
  if (!sessionId || order.paymentStatus === "paid" || !cardPaymentsEnabled()) return order;
  try {
    const session = await getCheckoutSession(sessionId);
    if (session.client_reference_id === order.id && session.payment_status === "paid") {
      return (await updateOrder(order.id, { paymentStatus: "paid" })) ?? order;
    }
  } catch (err) {
    console.error("Could not verify Stripe session", err);
  }
  return order;
}

export default async function OrderPage({ params, searchParams }: PageProps<"/order/[id]">) {
  const { id } = await params;
  const sp = await searchParams;
  const found = await getOrder(id.toUpperCase());
  if (!found) notFound();

  const order = await syncStripePayment(found, typeof sp.session_id === "string" ? sp.session_id : undefined);
  const justPlaced = sp.placed === "1" || typeof sp.session_id === "string";
  const cancelled = order.status === "cancelled";
  const current = steps.findIndex((s) => s.id === order.status);
  const needsPayment = order.paymentStatus !== "paid" && !cancelled;

  const waMessage = [
    `Hi Feras Tasty Bites! My order is ${order.id}.`,
    ...order.lines.map((l) => `• ${l.qty} × ${l.name}${l.summary.length ? ` (${l.summary.join("; ")})` : ""}`),
    `Total: ${formatMoney(order.total)}`,
    `${order.fulfillment === "delivery" ? "Delivery" : "Pickup"}: ${prettyDate(order.date)}, ${order.slot}`,
  ].join("\n");

  return (
    <div className="container-x max-w-4xl py-12">
      {justPlaced && <ClearCart />}

      <div className="text-center">
        <div className="mx-auto grid size-20 animate-rise place-items-center rounded-full bg-leaf text-white shadow-[0_12px_30px_-10px] shadow-leaf/60">
          <CheckIcon width={38} height={38} strokeWidth={2.4} />
        </div>
        <p className="eyebrow mt-6">Order {order.id}</p>
        <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-6xl">
          {justPlaced ? `Thank you, ${order.customer.name.split(" ")[0]}!` : "Your order"}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-lg text-cocoa">
          {justPlaced
            ? "We've got your order and we'll message you shortly to confirm. Keep this page handy to track it."
            : `Placed on ${new Date(order.createdAt).toLocaleDateString("en-CA", { dateStyle: "long" })}.`}
        </p>
      </div>

      {sp.cancelled === "1" && order.paymentStatus !== "paid" && (
        <p className="mt-8 rounded-2xl bg-butter p-4 text-center text-sm font-semibold">
          Card payment was cancelled. Your order is saved, so you can pay by e-Transfer instead or message us to pay another way.
        </p>
      )}
      {sp.payment === "failed" && (
        <p className="mt-8 rounded-2xl bg-butter p-4 text-center text-sm font-semibold">
          We couldn&apos;t start card payment, but your order is saved. You can pay by e-Transfer using the details below.
        </p>
      )}

      {/* Progress */}
      <div className="card mt-10 p-6 sm:p-8">
        {cancelled ? (
          <p className="text-center font-bold text-pepper">This order was cancelled. Message us if you have any questions.</p>
        ) : (
          <ol className="grid grid-cols-5 gap-2">
            {steps.map((s, i) => (
              <li key={s.id} className="text-center">
                <div className="relative flex items-center justify-center">
                  {i > 0 && <span className={`absolute right-1/2 top-1/2 h-1 w-full -translate-y-1/2 ${i <= current ? "bg-jollof" : "bg-line"}`} />}
                  <span
                    className={`relative grid size-9 place-items-center rounded-full text-sm font-bold ${
                      i <= current ? "bg-jollof text-white" : "bg-line text-cocoa"
                    } ${i === current ? "ring-4 ring-jollof/20" : ""}`}
                  >
                    {i < current ? <CheckIcon width={16} height={16} /> : i + 1}
                  </span>
                </div>
                <p className={`mt-2 text-xs font-bold sm:text-sm ${i <= current ? "text-ink" : "text-cocoa"}`}>{s.label}</p>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-display text-xl font-bold">{order.fulfillment === "delivery" ? "Delivery" : "Pickup"}</h2>
          <p className="mt-3 font-semibold">{prettyDate(order.date)}</p>
          <p className="text-cocoa">{order.slot}</p>
          {order.address ? (
            <p className="mt-3 text-sm text-cocoa">
              {order.address.line1}, {order.address.city} {order.address.postal}
            </p>
          ) : (
            <p className="mt-3 text-sm text-cocoa">{site.fulfillment.pickup.note}</p>
          )}
          {order.notes && <p className="mt-3 rounded-xl bg-cream p-3 text-sm italic">“{order.notes}”</p>}
        </div>

        <div className={`card p-6 ${needsPayment ? "ring-2 ring-gold" : ""}`}>
          <h2 className="flex items-center justify-between font-display text-xl font-bold">
            Payment
            <span
              className={`rounded-full px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider ${
                order.paymentStatus === "paid" ? "bg-leaf/15 text-leaf" : "bg-butter text-ink"
              }`}
            >
              {order.paymentStatus === "paid" ? "Paid" : order.paymentStatus === "refunded" ? "Refunded" : "Awaiting payment"}
            </span>
          </h2>
          {order.paymentStatus === "paid" ? (
            <p className="mt-3 text-sm text-cocoa">Payment received. Thank you!</p>
          ) : (
            <div className="mt-3 space-y-2 text-sm text-cocoa">
              <p>
                Send <b className="text-ink">{formatMoney(order.total)}</b> by Interac e-Transfer
                {site.payments.etransfer.email ? (
                  <>
                    {" "}
                    to <b className="text-ink">{site.payments.etransfer.email}</b>
                  </>
                ) : (
                  " once we confirm your order. We'll send you the e-Transfer details"
                )}
                .
              </p>
              <p>
                Put <b className="text-ink">{order.id}</b> in the message so we can match your payment.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-6 overflow-hidden">
        <ul className="divide-y divide-line">
          {order.lines.map((l, i) => (
            <li key={i} className="flex justify-between gap-4 px-6 py-4">
              <div>
                <p className="font-semibold">
                  {l.qty} × {l.name}
                </p>
                {l.summary.map((s) => (
                  <p key={s} className="text-xs text-cocoa">
                    {s}
                  </p>
                ))}
              </div>
              <p className="font-semibold tabular-nums">{formatMoney(l.lineTotal)}</p>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-line bg-cream/50 px-6 py-5 text-sm">
          {[
            ["Subtotal", order.subtotal],
            [order.fulfillment === "delivery" ? "Delivery" : "Pickup", order.deliveryFee],
            [site.taxLabel, order.tax],
          ].map(([k, val]) => (
            <div key={k} className="flex justify-between">
              <dt className="text-cocoa">{k}</dt>
              <dd className="tabular-nums">{val ? formatMoney(val as number) : "Free"}</dd>
            </div>
          ))}
          <div className="flex justify-between border-t border-line pt-3 text-base font-bold">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatMoney(order.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a href={whatsappLink(waMessage)} target="_blank" rel="noreferrer" className="btn bg-[#25d366] px-7 py-4 text-white hover:brightness-95">
          <WhatsAppIcon /> Send order on WhatsApp
        </a>
        <Link href="/menu" className="btn-ghost px-7 py-4">
          Back to the menu
        </Link>
      </div>
    </div>
  );
}
