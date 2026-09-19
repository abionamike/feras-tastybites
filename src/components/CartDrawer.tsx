"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-store";
import { products } from "@/lib/catalog";
import { computeTotals, formatMoney } from "@/lib/pricing";
import { site } from "@/lib/site";
import { ArrowRightIcon, BagIcon, CloseIcon, PlusIcon, TrashIcon } from "./icons";
import { ProductArt } from "./ProductArt";
import { QuantityStepper } from "./QuantityStepper";

export function CartDrawer() {
  const cart = useCart();
  const totals = computeTotals(cart.lines);
  const { freeOver } = site.fulfillment.delivery;
  const toFree = Math.max(0, freeOver - totals.subtotal);
  const inCart = new Set(cart.lines.map((l) => l.slug));
  const suggestions = products.filter((p) => !p.options && !inCart.has(p.slug) && p.price <= 7).slice(0, 3);

  const { open, setOpen } = cart;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${cart.open ? "visible" : "invisible"}`} aria-hidden={!cart.open}>
      <div
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${cart.open ? "opacity-100" : "opacity-0"}`}
        onClick={() => cart.setOpen(false)}
      />
      <aside
        role="dialog"
        aria-label="Your bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
          cart.open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <h2 className="font-display text-2xl font-bold">Your bag</h2>
            <p className="text-sm text-cocoa">
              {totals.itemCount} {totals.itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button onClick={() => cart.setOpen(false)} className="grid size-11 place-items-center rounded-full border border-line hover:bg-paper" aria-label="Close bag">
            <CloseIcon />
          </button>
        </div>

        {totals.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="grid size-20 place-items-center rounded-full bg-blush-soft text-jollof">
              <BagIcon width={34} height={34} />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold">Your bag is hungry</h3>
            <p className="mt-2 text-cocoa">Fill it up with jollof, puff puff and more.</p>
            <Link href="/menu" onClick={() => cart.setOpen(false)} className="btn-primary mt-6">
              Browse the menu
            </Link>
          </div>
        ) : (
          <>
            <div className="px-6 pt-4">
              <div className="rounded-2xl bg-paper p-3 text-sm">
                {toFree > 0 ? (
                  <p>
                    Add <b>{formatMoney(toFree)}</b> more for <b>free delivery</b>
                  </p>
                ) : (
                  <p className="font-semibold text-leaf">You&apos;ve unlocked free delivery 🎉</p>
                )}
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold to-jollof transition-all duration-500"
                    style={{ width: `${Math.min(100, (totals.subtotal / freeOver) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
              {totals.lines.map((line) => (
                <li key={line.key} className="flex gap-4">
                  <Link href={`/menu/${line.slug}`} onClick={() => cart.setOpen(false)} className="shrink-0">
                    <ProductArt product={line.product} className="size-20 rounded-2xl" sizes="80px" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="font-bold leading-tight">{line.product.name}</p>
                      <p className="font-bold tabular-nums">{formatMoney(line.lineTotal)}</p>
                    </div>
                    {line.summary.map((s) => (
                      <p key={s} className="text-xs text-cocoa">
                        {s}
                      </p>
                    ))}
                    <div className="mt-2 flex items-center justify-between">
                      <QuantityStepper size="sm" value={line.qty} onChange={(n) => cart.setQty(line.key, n)} />
                      <button onClick={() => cart.remove(line.key)} className="p-2 text-cocoa hover:text-pepper" aria-label={`Remove ${line.product.name}`}>
                        <TrashIcon width={18} height={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}

              {suggestions.length > 0 && (
                <li className="pt-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cocoa">Goes well with</p>
                  <div className="grid grid-cols-3 gap-3">
                    {suggestions.map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => cart.add({ slug: p.slug, qty: 1, selections: {} }, false)}
                        className="group rounded-2xl border border-line bg-paper p-2 text-left transition hover:border-jollof"
                      >
                        <ProductArt product={p} className="aspect-square rounded-xl" sizes="100px" />
                        <p className="mt-2 truncate text-xs font-bold">{p.name}</p>
                        <p className="flex items-center justify-between text-xs text-cocoa">
                          {formatMoney(p.price)}
                          <PlusIcon width={14} height={14} className="text-jollof" />
                        </p>
                      </button>
                    ))}
                  </div>
                </li>
              )}
            </ul>

            <div className="border-t border-line bg-paper px-6 py-5">
              <div className="flex justify-between text-sm text-cocoa">
                <span>Subtotal</span>
                <span className="font-bold tabular-nums text-ink">{formatMoney(totals.subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-cocoa">Delivery and HST are calculated at checkout.</p>
              <Link href="/checkout" onClick={() => cart.setOpen(false)} className="btn-primary mt-4 w-full">
                Checkout <ArrowRightIcon width={18} height={18} />
              </Link>
              <Link href="/cart" onClick={() => cart.setOpen(false)} className="mt-2 block text-center text-sm font-semibold text-cocoa underline-offset-4 hover:underline">
                View full bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
