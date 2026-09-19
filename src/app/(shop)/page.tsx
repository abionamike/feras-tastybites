import Link from "next/link";
import { SpinningBadge } from "@/components/Badge";
import { ProductCard } from "@/components/ProductCard";
import { FoodIllustration, artBackgrounds } from "@/components/ProductArt";
import {
  ArrowRightIcon,
  CalendarIcon,
  GiftIcon,
  InstagramIcon,
  PotIcon,
  SparkIcon,
  StoreIcon,
  TruckIcon,
} from "@/components/icons";
import { bestsellers, categories, productsIn } from "@/lib/catalog";
import { formatMoney } from "@/lib/pricing";
import { site } from "@/lib/site";

const marquee = ["Jollof Rice", "Puff Puff", "Gizdodo", "Meat Pie", "Chin Chin", "Zobo", "Grilled Tilapia", "Beef Kebab", "Dodo"];

const categoryArt = { "flavour-packs": "jollof-chicken", "small-chops": "puff-puff", drinks: "zobo" } as const;

export default function Home() {
  const favourites = bestsellers().slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pattern-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
        <div className="container-x relative grid items-center gap-10 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cocoa">
              <span className="size-2 rounded-full bg-jollof" /> Nigerian kitchen<span className="hidden sm:inline"> · {site.region.split(",")[0]}</span>
            </p>
            <h1 className="mt-6 font-display text-[3.4rem] font-black leading-[0.92] tracking-tight text-balance sm:text-7xl xl:text-[5.6rem]">
              Flavour from <br className="hidden sm:block" />
              its{" "}
              <span className="relative inline-block text-jollof">
                roots.
                <svg viewBox="0 0 300 30" className="absolute -bottom-3 left-0 w-full" aria-hidden>
                  <path d="M4 20C60 6 180 2 296 16" stroke="#f9c6dc" strokeWidth="10" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-cocoa">
              Smoky party jollof, pillowy puff puff, peppered gizdodo and ice-cold zobo. Every bite made from scratch, with
              Naija vibes in every mouthful.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="btn-primary px-8 py-4 text-base">
                Order now <ArrowRightIcon width={18} height={18} />
              </Link>
              <Link href="/catering" className="btn-ghost px-7 py-4 text-base">
                Catering & bulk orders
              </Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                ["100%", "made from scratch"],
                ["24h", "notice, cooked fresh"],
                ["GTA", "pickup & delivery"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-display text-3xl font-black">{k}</dt>
                  <dd className="text-sm text-cocoa">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[560px] animate-rise [animation-delay:150ms]">
            <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_40%_35%,#ffd2b0,#f9a066_55%,#e8672c)]" />
            <div className="absolute inset-[6%] rounded-full opacity-40 [background:repeating-conic-gradient(from_0deg,transparent_0_8deg,rgba(255,255,255,.35)_8deg_9deg)]" />
            <FoodIllustration art="jollof-chicken" className="relative size-full drop-shadow-[0_40px_40px_rgba(120,40,10,0.35)]" />

            <div className="absolute -left-2 top-[12%] w-32 animate-float rounded-3xl bg-paper p-2 shadow-xl [--tilt:-6deg] sm:-left-6 sm:w-40">
              <div className="aspect-square rounded-2xl" style={{ background: artBackgrounds["puff-puff"] }}>
                <FoodIllustration art="puff-puff" className="size-full" />
              </div>
              <p className="px-1 pt-2 text-sm font-bold">Puff Puff</p>
              <p className="px-1 text-xs text-cocoa">{formatMoney(12)}</p>
            </div>

            <div className="absolute -right-1 bottom-[8%] w-28 animate-float rounded-3xl bg-paper p-2 shadow-xl [--tilt:5deg] [animation-delay:-3s] sm:-right-4 sm:w-36">
              <div className="aspect-square rounded-2xl" style={{ background: artBackgrounds.zobo }}>
                <FoodIllustration art="zobo" className="size-full" />
              </div>
              <p className="px-1 pt-2 text-sm font-bold">Zobo</p>
              <p className="px-1 text-xs text-cocoa">{formatMoney(4)}</p>
            </div>

            <SpinningBadge className="absolute -top-4 right-[2%] size-28 rounded-full shadow-lg sm:size-36" />

            <div className="absolute bottom-[2%] left-[10%] rotate-[-4deg] rounded-2xl bg-ink px-4 py-3 text-cream shadow-xl">
              <p className="font-script text-2xl leading-none text-blush">Jollof &amp; Chicken</p>
              <p className="mt-1 text-sm font-bold">from {formatMoney(20)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative -rotate-1 overflow-hidden bg-jollof py-4 text-white shadow-lg">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-2xl font-bold italic sm:text-3xl">
              {item}
              <SparkIcon className="size-6 text-butter" />
            </span>
          ))}
        </div>
      </div>

      {/* FAVOURITES */}
      <section className="container-x pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Customer favourites</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-black tracking-tight sm:text-5xl">
              The bites everyone keeps coming back for
            </h2>
          </div>
          <Link href="/menu" className="btn-ghost">
            See the full menu <ArrowRightIcon width={18} height={18} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {favourites.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 2} />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x pt-24">
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/menu?category=${c.id}`}
              className={`group relative flex min-h-[360px] flex-col overflow-hidden rounded-[2.2rem] p-8 transition duration-300 hover:-translate-y-1 ${
                ["bg-butter", "bg-blush", "bg-[#f3d9c6]"][i]
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">{c.kicker}</p>
              <h3 className="mt-2 font-display text-4xl font-black">{c.name}</h3>
              <p className="mt-2 max-w-[16rem] text-sm text-ink/70">{c.description}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                {productsIn(c.id).length} items <ArrowRightIcon width={16} height={16} className="transition group-hover:translate-x-1" />
              </p>
              <FoodIllustration
                art={categoryArt[c.id]}
                className="absolute -bottom-12 -right-10 size-64 transition duration-700 group-hover:-rotate-12 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-x pt-28">
        <div className="text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-5xl">
            From our pot to your plate in three easy steps
          </h2>
        </div>
        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-line md:block" aria-hidden />
          {[
            {
              icon: CalendarIcon,
              title: "Pick your bites & a date",
              text: `Build your bag and choose a pickup or delivery slot at least ${site.leadTimeDays === 1 ? "a day" : `${site.leadTimeDays} days`} ahead.`,
            },
            {
              icon: PotIcon,
              title: "We cook it from scratch",
              text: "No shortcuts. Your order is cooked fresh for you, the way it's done back home.",
            },
            {
              icon: TruckIcon,
              title: "Pick up or get it delivered",
              text: `Collect it yourself or have it brought to your door anywhere in ${site.region.split(",")[0]}.`,
            },
          ].map((step, i) => (
            <li key={step.title} className="relative text-center">
              <div className="relative mx-auto grid size-20 place-items-center rounded-full bg-paper text-jollof ring-8 ring-cream">
                <step.icon width={30} height={30} />
                <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-ink text-xs font-bold text-cream">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-cocoa">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CATERING */}
      <section className="container-x pt-28">
        <div className="pattern-adire relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-cream sm:px-14 lg:py-20">
          <div className="absolute -right-24 -top-24 size-96 rounded-full bg-rose/30 blur-3xl" />
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blush">Catering · Gift packs · Bulk orders</p>
              <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
                Feeding a crowd? <span className="font-script font-bold text-blush">We&apos;ve got you.</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg text-cream/80">
                Graduations, birthdays, family events, office lunches and vendor days. Party trays of jollof, small chops
                platters and gift packs, all made to order.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/catering" className="btn bg-cream px-8 py-4 text-base text-ink hover:bg-white">
                  Get a quote <ArrowRightIcon width={18} height={18} />
                </Link>
                <Link href="/catering#gift-packs" className="btn border border-white/30 px-7 py-4 text-base text-cream hover:bg-white/10">
                  <GiftIcon width={18} height={18} /> Gift packs
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(["jollof-beef", "puff-puff", "chin-chin", "meat-pie"] as const).map((art, i) => (
                <div
                  key={art}
                  className={`aspect-square rounded-[2rem] bg-cream/95 p-3 shadow-2xl ${i % 2 ? "translate-y-8" : ""}`}
                  style={{ transform: `rotate(${[-4, 3, 2, -3][i]}deg)` }}
                >
                  <div className="size-full rounded-[1.5rem]" style={{ background: artBackgrounds[art] }}>
                    <FoodIllustration art={art} className="size-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="container-x pt-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: PotIcon, title: "All menu from scratch", text: "Real ingredients, real recipes, zero shortcuts." },
            { icon: SparkIcon, title: "Naija vibes", text: "Authentic Nigerian flavour, just like home." },
            { icon: GiftIcon, title: "Gift packs", text: "Chin chin, puff puff and treats, beautifully packed." },
            { icon: StoreIcon, title: "Events & vendor days", text: "Catch us at Toronto events or book us for yours." },
          ].map((f) => (
            <div key={f.title} className="card p-6">
              <div className="grid size-12 place-items-center rounded-2xl bg-blush-soft text-jollof">
                <f.icon />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-cocoa">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="container-x pt-28">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-blush px-8 py-14 text-center sm:px-14">
          <div className="pattern-dots absolute inset-0 opacity-70" />
          <div className="relative">
            <InstagramIcon width={40} height={40} className="mx-auto text-ink" />
            <h2 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl">Follow the flavour</h2>
            <p className="mx-auto mt-3 max-w-md text-ink/75">
              New drops, event pop-ups, customer reviews and behind-the-scenes cooking on Instagram.
            </p>
            <a href={site.instagram.url} target="_blank" rel="noreferrer" className="btn-dark mt-8 px-8 py-4 text-base">
              @{site.instagram.handle}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
