"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/catalog";
import { CheckIcon, PlusIcon } from "./icons";

/** Adds straight to the bag, or links to the product page when it has choices to make. */
export function QuickAdd({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (product.options?.length) {
    return (
      <Link href={`/menu/${product.slug}`} className="btn-ghost w-full">
        Choose options
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`btn w-full ${added ? "bg-leaf text-white" : "bg-ink text-cream hover:bg-black"}`}
      onClick={() => {
        add({ slug: product.slug, qty: 1, selections: {} });
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
      }}
    >
      {added ? (
        <>
          <CheckIcon width={18} height={18} /> Added
        </>
      ) : (
        <>
          <PlusIcon width={18} height={18} /> Add to bag
        </>
      )}
    </button>
  );
}
