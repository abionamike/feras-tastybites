import type { Metadata } from "next";
import { CartView } from "./CartView";

export const metadata: Metadata = { title: "Your bag", robots: { index: false } };

export default function CartPage() {
  return (
    <div className="container-x py-12">
      <h1 className="font-display text-5xl font-black tracking-tight sm:text-6xl">Your bag</h1>
      <CartView />
    </div>
  );
}
