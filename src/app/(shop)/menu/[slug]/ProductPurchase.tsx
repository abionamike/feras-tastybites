"use client";

import { useState } from "react";
import { QuantityStepper } from "@/components/QuantityStepper";
import { BagIcon, CheckIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/catalog";
import { formatMoney, priceLine } from "@/lib/pricing";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  // Priced choices (sizes) start at the smallest; unpriced ones (spice) at the middle
  const [selections, setSelections] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(
      (product.options ?? [])
        .filter((o) => o.required && o.type === "single")
        .map((o) => [o.id, [o.choices[o.choices.some((c) => c.price) ? 0 : Math.min(1, o.choices.length - 1)].id]]),
    ),
  );

  const priced = priceLine({ slug: product.slug, qty, selections });

  const toggle = (optionId: string, choiceId: string, single: boolean) => {
    setSelections((prev) => {
      const current = prev[optionId] ?? [];
      const next = single ? [choiceId] : current.includes(choiceId) ? current.filter((c) => c !== choiceId) : [...current, choiceId];
      return { ...prev, [optionId]: next };
    });
  };

  return (
    <div className="mt-8">
      <p className="font-display text-4xl font-black text-jollof">{formatMoney(priced?.unitPrice ?? product.price)}</p>

      {product.options?.map((option) => (
        <fieldset key={option.id} className="mt-7">
          <legend className="mb-3 flex items-center gap-2 text-sm font-bold">
            {option.label}
            <span className="rounded-full bg-line/60 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-cocoa">
              {option.required ? "Required" : "Optional"}
            </span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {option.choices.map((choice) => {
              const on = selections[option.id]?.includes(choice.id) ?? false;
              return (
                <button
                  key={choice.id}
                  type="button"
                  role={option.type === "single" ? "radio" : "checkbox"}
                  aria-checked={on}
                  onClick={() => toggle(option.id, choice.id, option.type === "single")}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                    on ? "border-ink bg-ink text-cream" : "border-line bg-paper text-ink hover:border-ink/40"
                  }`}
                >
                  {on && option.type === "multi" && <CheckIcon width={16} height={16} />}
                  {choice.label}
                  {choice.price ? <span className={on ? "text-blush" : "text-cocoa"}>+{formatMoney(choice.price)}</span> : null}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <QuantityStepper value={qty} onChange={setQty} min={1} />
        <button
          type="button"
          disabled={!priced}
          onClick={() => {
            add({ slug: product.slug, qty, selections });
            setAdded(true);
            setTimeout(() => setAdded(false), 1600);
          }}
          className={`btn flex-1 py-4 text-base ${added ? "bg-leaf text-white" : "bg-jollof text-white hover:bg-jollof-dark"}`}
        >
          {added ? (
            <>
              <CheckIcon /> Added to bag
            </>
          ) : (
            <>
              <BagIcon /> Add to bag · {formatMoney(priced?.lineTotal ?? product.price * qty)}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
