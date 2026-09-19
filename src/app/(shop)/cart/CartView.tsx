"use client";

import Link from "next/link";
import { ProductArt } from "@/components/ProductArt";
import { QuantityStepper } from "@/components/QuantityStepper";
import { ArrowRightIcon, TrashIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-store";
import { computeTotals, formatMoney } from "@/lib/pricing";
import { site } from "@/lib/site";

export function CartView() {
  const cart = useCart();
  const totals = computeTotals(cart.lines);

  if (totals.lines.length === 0) {
    return (
      <div className="mt-10 rounded-[2rem] border border-dashed border-line bg-paper py-20 text-center">
        <p className="font-display text-3xl font-bold">Your bag is empty</p>
        <p className="mt-2 text-cocoa">Let&apos;s fix that.</p>
        <Link href="/menu" className="btn-primary mt-6">
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
      <ul className="divide-y divide-line border-y border-line">
        {totals.lines.map((line) => (
          <li key={line.key} className="flex gap-5 py-6">
            <Link href={`/menu/${line.slug}`} className="shrink-0">
              <ProductArt product={line.product} className="size-24 rounded-3xl sm:size-32" sizes="128px" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex justify-between gap-4">
                <div>
                  <Link href={`/menu/${line.slug}`} className="font-display text-xl font-bold hover:text-jollof sm:text-2xl">
                    {line.product.name}
                  </Link>
                  {line.summary.map((s) => (
                    <p key={s} className="text-sm text-cocoa">
                      {s}
                    </p>
                  ))}
                  <p className="mt-1 text-sm text-cocoa">{formatMoney(line.unitPrice)} each</p>
                </div>
                <p className="font-display text-xl font-bold tabular-nums">{formatMoney(line.lineTotal)}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3">
                <QuantityStepper value={line.qty} onChange={(n) => cart.setQty(line.key, n)} size="sm" />
                <button onClick={() => cart.remove(line.key)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cocoa hover:text-pepper">
                  <TrashIcon width={16} height={16} /> Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="card h-fit p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl font-bold">Summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-cocoa">Subtotal ({totals.itemCount} items)</dt>
            <dd className="font-bold tabular-nums">{formatMoney(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-cocoa">Delivery</dt>
            <dd className="text-cocoa">At checkout</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-cocoa">{site.taxLabel}</dt>
            <dd className="text-cocoa">At checkout</dd>
          </div>
        </dl>
        {totals.subtotal < site.minimumOrder && (
          <p className="mt-4 rounded-xl bg-blush-soft p-3 text-sm">Minimum order is {formatMoney(site.minimumOrder)}.</p>
        )}
        <Link
          href="/checkout"
          aria-disabled={totals.subtotal < site.minimumOrder}
          className={`btn-primary mt-6 w-full py-4 text-base ${totals.subtotal < site.minimumOrder ? "pointer-events-none opacity-50" : ""}`}
        >
          Checkout <ArrowRightIcon width={18} height={18} />
        </Link>
        <Link href="/menu" className="mt-3 block text-center text-sm font-semibold text-cocoa hover:text-ink">
          Keep browsing
        </Link>
      </aside>
    </div>
  );
}
