import "server-only";
import { formatMoney } from "./pricing";
import { site } from "./site";
import type { Inquiry, Order } from "./store";

// Email notifications via Resend (https://resend.com). Optional: without
// RESEND_API_KEY the shop still works and orders show up in /admin.

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function send(to: string, subject: string, html: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) return;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`,
        to,
        subject,
        html,
        reply_to: replyTo,
      }),
    });
    if (!res.ok) console.error("Email failed", res.status, await res.text());
  } catch (err) {
    console.error("Email failed", err);
  }
}

const ownerEmail = () => process.env.ORDER_NOTIFY_EMAIL ?? site.email;

function orderTable(order: Order) {
  const rows = order.lines
    .map(
      (l) =>
        `<tr><td style="padding:6px 0">${l.qty} × ${esc(l.name)}${
          l.summary.length ? `<br><small style="color:#7a6558">${esc(l.summary.join(" · "))}</small>` : ""
        }</td><td style="text-align:right">${formatMoney(l.lineTotal)}</td></tr>`,
    )
    .join("");
  const extra = [
    ["Subtotal", order.subtotal],
    ["Delivery", order.deliveryFee],
    [site.taxLabel, order.tax],
  ]
    .map(([k, v]) => `<tr><td style="color:#7a6558">${k}</td><td style="text-align:right">${formatMoney(v as number)}</td></tr>`)
    .join("");
  return `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows}${extra}<tr><td style="padding-top:8px"><b>Total</b></td><td style="text-align:right;padding-top:8px"><b>${formatMoney(order.total)}</b></td></tr></table>`;
}

function wrap(body: string) {
  return `<div style="font-family:Helvetica,Arial,sans-serif;max-width:520px;margin:auto;color:#2a1a14;line-height:1.5">
  <h2 style="margin:0 0 4px">${site.name}</h2><p style="margin:0 0 20px;color:#c2410c">${site.tagline}</p>${body}</div>`;
}

export async function notifyNewOrder(order: Order, orderUrl: string) {
  const when = `${order.fulfillment === "delivery" ? "Delivery" : "Pickup"} on ${order.date}, ${order.slot}`;
  const addr = order.address ? `<p>${esc(order.address.line1)}, ${esc(order.address.city)} ${esc(order.address.postal)}</p>` : "";

  await Promise.all([
    send(
      ownerEmail(),
      `New order ${order.id} · ${formatMoney(order.total)}`,
      wrap(`<p><b>${esc(order.customer.name)}</b> · ${esc(order.customer.phone)} · ${esc(order.customer.email)}</p>
        <p>${when}</p>${addr}${order.notes ? `<p><i>“${esc(order.notes)}”</i></p>` : ""}
        <p>Payment: ${order.paymentMethod === "card" ? "Card (Stripe)" : "Interac e-Transfer"}</p>${orderTable(order)}`),
      order.customer.email,
    ),
    send(
      order.customer.email,
      `We got your order ${order.id}!`,
      wrap(`<p>Hi ${esc(order.customer.name.split(" ")[0])}, thank you for your order! We'll message you shortly to confirm the details.</p>
        <p><b>${when}</b></p>${orderTable(order)}
        <p><a href="${orderUrl}" style="color:#c2410c">View your order status</a></p>
        <p>Questions? WhatsApp us on ${site.whatsapp.display}.</p>`),
      ownerEmail() || undefined,
    ),
  ]);
}

export async function notifyInquiry(inquiry: Inquiry) {
  const fields = [
    ["Type", inquiry.kind],
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone],
    ["Event date", inquiry.eventDate],
    ["Guests / quantity", inquiry.guests],
    ["Budget", inquiry.budget],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<p style="margin:2px 0"><b>${k}:</b> ${esc(v!)}</p>`)
    .join("");
  await send(
    ownerEmail(),
    `New ${inquiry.kind} enquiry from ${inquiry.name}`,
    wrap(`${fields}<p style="white-space:pre-wrap;margin-top:16px">${esc(inquiry.message)}</p>`),
    inquiry.email,
  );
}
