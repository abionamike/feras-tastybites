import Link from "next/link";
import { SpinningBadge } from "@/components/Badge";
import { LoopVideo } from "@/components/LoopVideo";
import { Polaroid } from "@/components/Polaroid";
import { ProductCard } from "@/components/ProductCard";
import { Photo } from "@/components/ProductArt";
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
import { bestsellers, categories, productsIn, type CategoryId } from "@/lib/catalog";
import { formatMoney } from "@/lib/pricing";
import { site } from "@/lib/site";

const marquee = ["Jollof Rice", "Puff Puff", "Gizdodo", "Meat Pie", "Chin Chin", "Zobo", "Grilled Tilapia", "Beef Kebab", "Party Trays"];

const categoryPhoto: Record<CategoryId, { src: string; tone: string; position?: string }> = {
  "flavour-packs": { src: "/images/flavour-pack.jpg", tone: "bg-butter", position: "50% 65%" },
  "small-chops": { src: "/images/puff-puff.jpg", tone: "bg-blush", position: "50% 75%" },
  drinks: { src: "/images/zobo.jpg", tone: "bg-[#f3d9c6]", position: "50% 70%" },
  "party-trays": { src: "/images/party-tray.jpg", tone: "bg-[#e9dccb]" },
};

export default function Home() {
  // Lead with dishes that have real photos
  const favourites = bestsellers()
    .filter((p) => p.image)
    .slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pattern-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
        <div className="container-x relative grid items-center gap-12 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
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

          <div className="relative mx-auto w-full max-w-[540px] animate-rise pb-6 pl-6 pr-4 pt-8 [animation-delay:150ms] sm:pl-10">
            {/* Arched main photo */}
            <div className="absolute inset-x-[12%] bottom-0 top-0 rounded-t-full bg-blush/70" aria-hidden />
            <div className="relative ml-auto aspect-[5/6] w-[84%] overflow-hidden rounded-b-[2.5rem] rounded-t-full border-[10px] border-paper shadow-[0_40px_70px_-30px_rgba(120,40,10,0.55)]">
              <Photo src="/images/jollof-chicken.jpg" alt="Jollof rice with grilled chicken" sizes="(min-width: 1024px) 460px, 86vw" priority style={{ objectPosition: "38% 50%" }} />
            </div>

            <Polaroid
              src="/images/puff-puff.jpg"
              alt="A box of fresh puff puff"
              caption="fresh puff puff"
              tilt={-7}
              position="50% 75%"
              sizes="180px"
              priority
              className="absolute left-0 top-[16%] w-32 animate-float sm:w-44"
            />
            <Polaroid
              src="/images/zobo.jpg"
              alt="Bottles of Feras Tasty Bites zobo"
              caption="our zobo"
              tilt={6}
              position="50% 70%"
              sizes="170px"
              className="absolute -right-2 bottom-[14%] w-28 animate-float [animation-delay:-3s] sm:w-40"
            />

            <SpinningBadge className="absolute right-[2%] top-0 size-24 rounded-full shadow-lg sm:size-32" />

            <div className="absolute bottom-0 left-[14%] rotate-[-4deg] rounded-2xl bg-ink px-4 py-3 text-cream shadow-xl">
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
          {favourites.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x pt-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const photo = categoryPhoto[c.id];
            return (
              <Link
                key={c.id}
                href={`/menu?category=${c.id}`}
                className={`group relative flex min-h-[320px] flex-col overflow-hidden rounded-[2.2rem] p-7 transition duration-300 hover:-translate-y-1 ${photo.tone}`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">{c.kicker}</p>
                <h3 className="mt-2 font-display text-3xl font-black">{c.name}</h3>
                <p className="mt-2 max-w-[15rem] text-sm text-ink/70">{c.description}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                  {productsIn(c.id).length} items <ArrowRightIcon width={16} height={16} className="transition group-hover:translate-x-1" />
                </p>
                <div className="absolute -bottom-10 -right-10 size-56 overflow-hidden rounded-full border-[8px] border-paper/80 shadow-xl transition duration-700 group-hover:scale-105 [&_img]:group-hover:scale-110">
                  <Photo src={photo.src} alt="" sizes="200px" style={photo.position ? { objectPosition: photo.position } : undefined} />
                </div>
              </Link>
            );
          })}
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

      {/* FROM OUR KITCHEN */}
      <section className="relative mt-28 overflow-hidden bg-paper py-24">
        <div className="pattern-dots absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Straight from our kitchen</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl font-black tracking-tight sm:text-5xl">
                Real food, <span className="font-script font-bold text-jollof">made by hand</span>
              </h2>
            </div>
            <a href={site.instagram.url} target="_blank" rel="noreferrer" className="btn-ghost">
              <InstagramIcon width={18} height={18} /> More on Instagram
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:h-[600px] lg:grid-cols-4 lg:grid-rows-2">
            <figure className="relative col-span-2 row-span-2 min-h-[320px] overflow-hidden rounded-[2rem] lg:min-h-0">
              <LoopVideo
                className="photo-grade absolute inset-0 size-full object-cover"
                src="/images/jollof-tray.mp4"
                poster="/images/jollof-tray.jpg"
                label="Trays of jollof rice and meat pies ready for a bulk order"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-5 left-6 right-6 text-cream">
                <p className="font-script text-3xl leading-none text-blush">Packed and ready to go</p>
                <p className="mt-1 text-sm text-cream/80">Trays of jollof and meat pies for a bulk order</p>
              </figcaption>
            </figure>
            {[
              { src: "/images/meat-pie-making.jpg", caption: "Filling meat pies by hand", position: "50% 55%" },
              { src: "/images/chin-chin.jpg", caption: "A mountain of chin chin" },
              { src: "/images/party-tray.jpg", caption: "Kebabs & grilled chicken", position: "50% 40%" },
              { src: "/images/gift-box.jpg", caption: "Small chops gift box", position: "50% 45%" },
            ].map((p) => (
              <figure key={p.src} className="group relative aspect-square overflow-hidden rounded-[2rem] lg:aspect-auto">
                <div className="absolute inset-0 [&_img]:group-hover:scale-105">
                  <Photo src={p.src} alt={p.caption} sizes="(min-width: 1024px) 25vw, 50vw" style={p.position ? { objectPosition: p.position } : undefined} />
                </div>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 right-4 font-script text-xl leading-tight text-cream sm:text-2xl">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
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
                Graduations, birthdays, family events, office lunches and vendor days. Jollof trays from {formatMoney(65)},
                small chops by the dozen and gift packs, all made to order.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/menu?category=party-trays" className="btn bg-cream px-8 py-4 text-base text-ink hover:bg-white">
                  Order party trays <ArrowRightIcon width={18} height={18} />
                </Link>
                <Link href="/catering" className="btn border border-white/30 px-7 py-4 text-base text-cream hover:bg-white/10">
                  <GiftIcon width={18} height={18} /> Get a quote
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 px-2">
              <Polaroid src="/images/party-tray.jpg" alt="Party tray of kebabs and grilled chicken" caption="party trays" tilt={-4} sizes="260px" />
              <Polaroid src="/images/gift-box.jpg" alt="Small chops gift box" caption="gift boxes" tilt={3} sizes="260px" position="50% 45%" className="translate-y-8" />
              <Polaroid src="/images/jollof-tray.jpg" alt="Tray of jollof rice" caption="jollof trays" tilt={2} sizes="260px" position="50% 70%" />
              <Polaroid src="/images/vendor-table.jpg" alt="Feras Tasty Bites vendor day table" caption="vendor days" tilt={-3} sizes="260px" className="translate-y-8" />
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
