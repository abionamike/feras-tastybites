import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Polaroid } from "@/components/Polaroid";
import { Photo } from "@/components/ProductArt";
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
        <div className="relative mx-auto w-full max-w-md pb-12 pr-10">
          <div className="absolute -inset-4 rotate-3 rounded-[3rem] bg-blush" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-[10px] border-paper shadow-xl">
            <Photo src="/images/meat-pie-making.jpg" alt="Filling meat pies by hand" sizes="(min-width: 1024px) 420px, 90vw" priority style={{ objectPosition: "50% 55%" }} />
          </div>
          <div className="absolute -right-2 bottom-0 grid size-36 place-items-center rounded-full bg-paper p-2 shadow-xl sm:size-44">
            <Image src="/brand/logo-badge.jpg" alt="Feras Tasty Bites logo" width={360} height={360} className="size-full rounded-full" />
          </div>
          <Polaroid
            src="/images/chin-chin.jpg"
            alt="Freshly made chin chin"
            caption="chin chin day"
            tilt={-8}
            sizes="160px"
            className="absolute -left-8 top-8 hidden w-36 sm:block"
          />
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
      <section className="container-x pt-20">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-ink text-cream lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[380px]">
            <Photo src="/images/vendor-table.jpg" alt="Feras Tasty Bites table at a vendor day" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="p-8 sm:p-12 lg:pl-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blush">Events & vendor days</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight">Come say hi in person</h2>
            <p className="mt-4 text-cream/75">
              We pop up at Toronto events and vendor days with small chops, zobo and more. Follow us on Instagram to see where
              we&apos;ll be next, or book us for your own event.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.instagram.url} target="_blank" rel="noreferrer" className="btn bg-cream text-ink hover:bg-white">
                Follow @{site.instagram.handle}
              </a>
              <Link href="/catering" className="btn border border-white/25 text-cream hover:bg-white/10">
                Book us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
