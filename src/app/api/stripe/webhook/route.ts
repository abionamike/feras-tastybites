import { updateOrder } from "@/lib/store";
import { verifyWebhook } from "@/lib/stripe";

// Stripe calls this when a checkout completes, so orders are marked paid even
// if the customer closes the tab before returning to the site.
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("Webhook not configured", { status: 501 });

  const payload = await request.text();
  if (!verifyWebhook(payload, request.headers.get("stripe-signature"), secret)) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(payload) as {
    type: string;
    data: { object: { client_reference_id?: string; payment_status?: string } };
  };

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object;
    if (session.client_reference_id && session.payment_status === "paid") {
      await updateOrder(session.client_reference_id, { paymentStatus: "paid" });
    }
  }

  return Response.json({ received: true });
}
