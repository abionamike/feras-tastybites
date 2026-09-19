import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FoodIllustration } from "@/components/ProductArt";
import { ArrowRightIcon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our story",
  description: "Feras Tasty Bites cooks authentic Nigerian food from scratch in Ontario. Flavour from its roots.",
};

export default function AboutPage() {
  return (
    <>
      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="eyebrow">Our story</p>
          <h1 className="mt-3 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
            Flavour from <span className="font-script font-bold text-jollof">its roots.</span>
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-cocoa">
            <p>
              Feras Tasty Bites started with a simple idea: the food we grew up on deserves to be cooked properly. That
              means real ingredients, time on the stove, and recipes that taste like home.
            </p>
            <p>
              Every item on our menu is made from scratch, from the smoky party jollof and peppered gizdodo to the
              pillowy puff puff and crunchy chin chin. Nothing is rushed, and everything is cooked fresh for your order.
            </p>
            <p>
              Today we cook for families, students, offices and celebrations across {site.region.split(",")[0]}, and you
              can find us at events and vendor days around the city.
            </p>
          </div>
          <Link href="/menu" className="btn-primary mt-10 px-8 py-4 text-base">
            Taste it yourself <ArrowRightIcon width={18} height={18} />
          </Link>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-6 rotate-6 rounded-[3rem] bg-blush" />
          <div className="relative rounded-[3rem] bg-paper p-8 shadow-xl">
            <Image src="/brand/logo-badge.jpg" alt="Feras Tasty Bites logo" width={1080} height={1080} className="w-full rounded-full" priority />
          </div>
          <FoodIllustration art="puff-puff" className="absolute -bottom-10 -left-10 size-40 drop-shadow-xl" />
        </div>
      </section>

      <section className="container-x pt-10">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { k: "From scratch", v: "No shortcuts. Every dish is made in our kitchen, from the sauce up." },
            { k: "Naija vibes", v: "Authentic Nigerian flavours, seasoned boldly and served generously." },
            { k: "Made with love", v: "Small-batch cooking means every order gets proper attention." },
          ].map((item) => (
            <div key={item.k} className="rounded-[2rem] bg-ink p-8 text-cream">
              <h2 className="font-display text-3xl font-black text-blush">{item.k}</h2>
              <p className="mt-3 text-cream/80">{item.v}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
