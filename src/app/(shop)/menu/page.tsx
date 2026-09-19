import type { Metadata } from "next";
import { categories, type CategoryId } from "@/lib/catalog";
import { MenuBrowser } from "./MenuBrowser";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Order jollof rice, grilled tilapia, puff puff, meat pie, gizdodo, chin chin, zobo and more. Made from scratch for pickup or delivery.",
};

export default async function MenuPage({ searchParams }: PageProps<"/menu">) {
  const { category } = await searchParams;
  const initial = categories.some((c) => c.id === category) ? (category as CategoryId) : "all";

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pattern-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-x relative py-14 text-center sm:py-20">
          <p className="eyebrow">Order online</p>
          <h1 className="mt-3 font-display text-5xl font-black tracking-tight sm:text-7xl">
            The <span className="font-script font-bold text-jollof">menu</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-cocoa">
            Everything is cooked fresh to order. Build your bag, pick a day, and we&apos;ll handle the rest.
          </p>
        </div>
      </section>
      <MenuBrowser initialCategory={initial} />
    </>
  );
}
