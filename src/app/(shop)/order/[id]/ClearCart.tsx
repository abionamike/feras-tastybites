"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart-store";

/** Empties the bag once an order has been placed. */
export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => clear(), [clear]);
  return null;
}
