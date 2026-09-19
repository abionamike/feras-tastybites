"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ProductArt } from "@/components/ProductArt";
import { ArrowRightIcon, StoreIcon, TruckIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-store";
import { computeTotals, formatMoney, type Fulfillment } from "@/lib/pricing";
import { site } from "@/lib/site";
import { placeOrder, type CheckoutState } from "./actions";

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="card p-6 sm:p-8">
      <h2 className="flex items-center gap-3 font-display text-2xl font-bold">
        <span className="grid size-8 place-items-center rounded-full bg-ink font-sans text-sm text-cream">{n}</span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  className = "",
  ...props
}: { label: string; name: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="label">{label}</span>
      <input
        name={name}
        aria-invalid={Boolean(error)}
        className={`field ${error ? "border-pepper focus:border-pepper" : ""}`}
        {...props}
      />
      {error && <span className="mt-1 block text-sm text-pepper">{error}</span>}
    </label>
  );
}

function Choice({
  checked,
  onChange,
  name,
  value,
  title,
  text,
  icon,
  aside,
}: {
  checked: boolean;
  onChange: () => void;
  name: string;
  value: string;
  title: string;
  text: string;
  icon?: React.ReactNode;
  aside?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-4 transition ${
        checked ? "border-ink bg-blush-soft/50" : "border-line bg-paper hover:border-ink/30"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {icon && <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${checked ? "bg-ink text-cream" : "bg-cream text-ink"}`}>{icon}</span>}
      <span className="flex-1">
        <span className="flex items-center justify-between gap-2 font-bold">
          {title}
          {aside && <span className="text-sm text-cocoa">{aside}</span>}
        </span>
        <span className="mt-0.5 block text-sm text-cocoa">{text}</span>
      </span>
      <span className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full border-2 ${checked ? "border-ink" : "border-line"}`}>
        {checked && <span className="size-2.5 rounded-full bg-ink" />}
      </span>
    </label>
  );
}

export function CheckoutForm({ cardEnabled, minDate, maxDate }: { cardEnabled: boolean; minDate: string; maxDate: string }) {
  const cart = useCart();
  const [state, action, pending] = useActionState<CheckoutState, FormData>(placeOrder, {});
  const v = state.values ?? {};
  const e = state.fieldErrors ?? {};
  const [fulfillment, setFulfillment] = useState<Fulfillment>(v.fulfillment === "delivery" ? "delivery" : "pickup");
  const [payment, setPayment] = useState(cardEnabled ? "card" : "etransfer");
  const [slot, setSlot] = useState(v.slot ?? "");

  const totals = computeTotals(cart.lines, fulfillment);
  const { delivery } = site.fulfillment;

  if (totals.lines.length === 0) {
    return (
      <div className="mt-10 rounded-[2rem] border border-dashed border-line bg-paper py-20 text-center">
        <p className="font-display text-3xl font-bold">Your bag is empty</p>
        <Link href="/menu" className="btn-primary mt-6">
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]" noValidate>
      <input type="hidden" name="cart" value={JSON.stringify(cart.lines)} />

      <div className="space-y-6">
        <Section n={1} title="Your details">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" autoComplete="name" defaultValue={v.name} error={e.name} required className="sm:col-span-2" />
            <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={v.email} error={e.email} required />
            <Field label="Phone (WhatsApp preferred)" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} error={e.phone} required />
          </div>
        </Section>

        <Section n={2} title="Pickup or delivery">
          <div className="grid gap-3 sm:grid-cols-2">
            <Choice
              name="fulfillment"
              value="pickup"
              checked={fulfillment === "pickup"}
              onChange={() => setFulfillment("pickup")}
              icon={<StoreIcon />}
              title="Pickup"
              aside="Free"
              text={site.fulfillment.pickup.note}
            />
            <Choice
              name="fulfillment"
              value="delivery"
              checked={fulfillment === "delivery"}
              onChange={() => setFulfillment("delivery")}
              icon={<TruckIcon />}
              title="Delivery"
              aside={totals.subtotal >= delivery.freeOver ? "Free" : formatMoney(delivery.fee)}
              text={`${delivery.note} Free over ${formatMoney(delivery.freeOver)}.`}
            />
          </div>
          {fulfillment === "delivery" && (
            <div className="mt-5 grid animate-rise gap-4 sm:grid-cols-6">
              <Field label="Street address" name="line1" autoComplete="street-address" defaultValue={v.line1} error={e.line1} className="sm:col-span-6" />
              <Field label="City" name="city" autoComplete="address-level2" defaultValue={v.city || "Toronto"} error={e.city} className="sm:col-span-4" />
              <Field label="Postal code" name="postal" autoComplete="postal-code" defaultValue={v.postal} error={e.postal} placeholder="M5V 2T6" className="sm:col-span-2" />
            </div>
          )}
        </Section>

        <Section n={3} title="When would you like it?">
          <div className="grid gap-5 sm:grid-cols-[220px_1fr]">
            <Field label="Date" name="date" type="date" min={minDate} max={maxDate} defaultValue={v.date || minDate} error={e.date} />
            <fieldset>
              <legend className="label">Time window</legend>
              <div className="grid grid-cols-2 gap-2">
                {site.timeSlots.map((s) => (
                  <label
                    key={s}
                    className={`cursor-pointer rounded-xl border-2 px-3 py-2.5 text-center text-sm font-semibold transition ${
                      slot === s ? "border-ink bg-ink text-cream" : "border-line bg-paper hover:border-ink/30"
                    }`}
                  >
                    <input type="radio" name="slot" value={s} checked={slot === s} onChange={() => setSlot(s)} className="sr-only" />
                    {s}
                  </label>
                ))}
              </div>
              {e.slot && <p className="mt-1 text-sm text-pepper">{e.slot}</p>}
            </fieldset>
          </div>
          <p className="mt-4 text-sm text-cocoa">
            Everything is cooked fresh, so orders need at least {site.leadTimeDays === 1 ? "a day's" : `${site.leadTimeDays} days'`} notice. Need it sooner?{" "}
            <a href={`https://wa.me/${site.whatsapp.number}`} className="font-semibold text-jollof underline-offset-4 hover:underline">
              Message us
            </a>
            .
          </p>
        </Section>

        <Section n={4} title="Payment">
          <div className="grid gap-3">
            {cardEnabled && (
              <Choice
                name="payment"
                value="card"
                checked={payment === "card"}
                onChange={() => setPayment("card")}
                title="Credit / debit card"
                text="Pay securely with Stripe. Apple Pay and Google Pay supported."
              />
            )}
            <Choice
              name="payment"
              value="etransfer"
              checked={payment === "etransfer"}
              onChange={() => setPayment("etransfer")}
              title="Interac e-Transfer"
              text="Place your order now and we'll send e-Transfer details with your confirmation."
            />
          </div>
          <label className="mt-6 block">
            <span className="label">Order notes (optional)</span>
            <textarea
              name="notes"
              rows={3}
              defaultValue={v.notes}
              maxLength={600}
              placeholder="Allergies, buzzer code, special requests…"
              className="field resize-none"
            />
          </label>
        </Section>
      </div>

      <aside className="h-fit lg:sticky lg:top-28">
        <div className="card overflow-hidden">
          <div className="p-6">
            <h2 className="font-display text-2xl font-bold">Order summary</h2>
            <ul className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
              {totals.lines.map((l) => (
                <li key={l.key} className="flex gap-3">
                  <div className="relative shrink-0">
                    <ProductArt product={l.product} className="size-14 rounded-xl" sizes="56px" />
                    <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-ink text-[11px] font-bold text-cream">
                      {l.qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="font-bold">{l.product.name}</p>
                    {l.summary.map((s) => (
                      <p key={s} className="text-xs text-cocoa">
                        {s}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm font-bold tabular-nums">{formatMoney(l.lineTotal)}</p>
                </li>
              ))}
            </ul>
          </div>
          <dl className="space-y-2.5 border-t border-line bg-cream/50 p-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-cocoa">Subtotal</dt>
              <dd className="font-semibold tabular-nums">{formatMoney(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cocoa">{fulfillment === "delivery" ? "Delivery" : "Pickup"}</dt>
              <dd className="font-semibold tabular-nums">{totals.deliveryFee ? formatMoney(totals.deliveryFee) : "Free"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cocoa">{site.taxLabel}</dt>
              <dd className="font-semibold tabular-nums">{formatMoney(totals.tax)}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <dt className="font-bold">Total</dt>
              <dd className="font-display text-3xl font-black tabular-nums">{formatMoney(totals.total)}</dd>
            </div>
          </dl>
          <div className="p-6 pt-0">
            {state.error && <p className="mb-3 rounded-xl bg-pepper/10 p-3 text-sm font-semibold text-pepper" role="alert">{state.error}</p>}
            <button type="submit" disabled={pending} className="btn-primary w-full py-4 text-base">
              {pending ? "Placing order…" : payment === "card" ? "Continue to payment" : "Place order"}
              {!pending && <ArrowRightIcon width={18} height={18} />}
            </button>
            <p className="mt-3 text-center text-xs text-cocoa">
              By placing your order you agree to be contacted about it by phone, WhatsApp or email.
            </p>
          </div>
        </div>
      </aside>
    </form>
  );
}
