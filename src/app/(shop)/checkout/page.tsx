import type { Metadata } from "next";
import { connection } from "next/server";
import { earliestDate, latestDate } from "@/lib/dates";
import { cardPaymentsEnabled } from "@/lib/stripe";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default async function CheckoutPage() {
  // Render per request so the earliest order date is always current
  await connection();
  return (
    <div className="container-x py-12">
      <p className="eyebrow">Almost there</p>
      <h1 className="mt-2 font-display text-5xl font-black tracking-tight sm:text-6xl">Checkout</h1>
      <CheckoutForm cardEnabled={cardPaymentsEnabled()} minDate={earliestDate()} maxDate={latestDate()} />
    </div>
  );
}
