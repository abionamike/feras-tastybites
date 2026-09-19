import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { LoopVideo } from "@/components/LoopVideo";
import { Polaroid } from "@/components/Polaroid";
import { ProductCard } from "@/components/ProductCard";
import { Photo } from "@/components/ProductArt";
import { ArrowRightIcon, CalendarIcon, CheckIcon, GiftIcon, PotIcon, SparkIcon, StoreIcon, WhatsAppIcon } from "@/components/icons";
import { productsIn } from "@/lib/catalog";
import { formatMoney } from "@/lib/pricing";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catering, party trays & gift packs",
  description:
    "Nigerian catering for graduations, birthdays, family events and vendor days across Toronto & the GTA. Party trays of jollof, small chops platters and gift packs.",
};

const occasions = [
  { title: "Graduations", text: "Celebrate the big day with jollof, proteins and pastries for the whole family." },
  { title: "Birthdays", text: "Party trays and small chops that keep guests coming back for seconds." },
  { title: "Family events", text: "Owambe-ready trays for naming ceremonies, reunions and get-togethers." },
  { title: "Office & corporate", text: "Individually packed Flavour Packs for team lunches and meetings." },
  { title: "Vendor days & pop-ups", text: "Book us to bring the flavour to your market, fair or community event." },
  { title: "Church & community", text: "Generous portions for fellowships, programmes and celebrations." },
];

const offerings = [
  { src: "/images/jollof-tray.jpg", position: "50% 70%", title: "Party trays", text: "Jollof rice by the tray, with chicken, beef or turkey on the side." },
  { src: "/images/small-chops-box.jpg", title: "Small chops platters", text: "Puff puff, meat pies, beef kebab, gizdodo and chin chin." },
  { src: "/images/gift-box.jpg", position: "50% 45%", title: "Gift packs", text: "Jollof, small chops and treats, boxed up for gifting." },
  { src: "/images/zobo.jpg", position: "50% 70%", title: "Drinks", text: "Chilled zobo by the 2 L bottle for your guests." },
];

export default function CateringPage() {
  return (
    <>
      <section className="pattern-adire relative overflow-hidden text-cream">
        <div className="absolute -left-32 top-10 size-96 rounded-full bg-jollof/40 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blush">Catering · Bulk orders · Gift packs</p>
            <h1 className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              Big flavour for <span className="font-script font-bold text-blush">big moments.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-cream/80">
              From graduation parties to vendor days, we cook authentic Nigerian food from scratch for groups of every size.
              Tell us about your event and we&apos;ll put together a menu and quote.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" className="btn bg-cream px-8 py-4 text-base text-ink hover:bg-white">
                Request a quote
              </a>
              <a
                href={whatsappLink("Hi Feras Tasty Bites! I'd like a catering quote.")}
                target="_blank"
                rel="noreferrer"
                className="btn border border-white/30 px-7 py-4 text-base text-cream hover:bg-white/10"
              >
                <WhatsAppIcon /> WhatsApp us
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md pb-10 pl-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-[10px] border-cream/95 shadow-[0_40px_60px_-30px_rgba(0,0,0,0.6)]">
              <Photo src="/images/party-tray.jpg" alt="Party tray of beef kebabs and grilled chicken" sizes="(min-width: 1024px) 420px, 90vw" priority />
            </div>
            <Polaroid
              src="/images/vendor-table.jpg"
              alt="Feras Tasty Bites table at a vendor day"
              caption="vendor day"
              tilt={-6}
              sizes="200px"
              className="absolute -left-2 bottom-0 w-40 sm:w-48"
            />
            <Polaroid
              src="/images/gift-box.jpg"
              alt="Small chops gift box"
              caption="gift box"
              tilt={5}
              position="50% 45%"
              sizes="180px"
              className="absolute -right-4 -top-4 w-32 sm:w-40"
            />
          </div>
        </div>
      </section>

      <section className="container-x pt-24">
        <p className="eyebrow">What we cater</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-5xl">Whatever you&apos;re celebrating</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map((o, i) => (
            <div key={o.title} className="card group p-7 transition hover:-translate-y-1 hover:border-jollof/40">
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl font-black text-blush transition group-hover:text-jollof">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <SparkIcon className="text-line transition group-hover:rotate-45 group-hover:text-jollof" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold">{o.title}</h3>
              <p className="mt-1.5 text-cocoa">{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="gift-packs" className="container-x scroll-mt-28 pt-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((o) => (
            <div key={o.title} className="overflow-hidden rounded-[2rem] border border-line bg-paper">
              <div className="group relative aspect-[4/3] overflow-hidden [&_img]:hover:scale-105">
                <Photo src={o.src} alt={o.title} sizes="(min-width: 1024px) 25vw, 50vw" style={o.position ? { objectPosition: o.position } : undefined} />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold">{o.title}</h3>
                <p className="mt-1 text-sm text-cocoa">{o.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="bulk-menu" className="container-x scroll-mt-28 pt-24">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">Bulk food menu</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">Order party trays online</h2>
            <p className="mt-4 max-w-xl text-lg text-cocoa">
              Jollof trays from {formatMoney(65)}, proteins by the piece, pastries by the dozen and zobo by the bottle. Add them to
              your bag like anything else, or ask us for a custom quote below.
            </p>
          </div>
          <figure className="relative aspect-video overflow-hidden rounded-[2rem] shadow-xl">
            <LoopVideo
              className="photo-grade absolute inset-0 size-full object-cover"
              src="/images/jollof-tray.mp4"
              poster="/images/jollof-tray.jpg"
              label="Trays of jollof rice and meat pies ready for a bulk order"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-5 font-script text-2xl text-cream">Packed and ready to go</figcaption>
          </figure>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productsIn("party-trays").map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="container-x pt-24">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-blush-soft p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid grid-cols-2 gap-4">
            <Polaroid src="/images/small-chops-box.jpg" alt="Box of plantain, meat pies, puff puff and jollof" caption="the full spread" tilt={-4} sizes="240px" aspect="aspect-[4/5]" />
            <Polaroid src="/images/flavour-pack.jpg" alt="Packed jollof and grilled chicken" caption="jollof & chicken" tilt={4} sizes="240px" aspect="aspect-[4/5]" position="50% 65%" className="translate-y-6" />
          </div>
          <div>
            <p className="eyebrow">Seasonal packages</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight">Holiday boxes, made to share</h2>
            <p className="mt-4 text-cocoa">
              For Valentine&apos;s we put together two packages, each with jollof rice, 12 pieces of plantain, 10 puff puff and 3
              meat pies, a parfait, a drink and a card:
            </p>
            <ul className="mt-5 space-y-3">
              {[
                ["Package A", "with two grilled chicken leg quarters", 70],
                ["Package B", "with a large BBQ tilapia", 75],
              ].map(([name, text, price]) => (
                <li key={name as string} className="flex items-center justify-between gap-4 rounded-2xl bg-paper p-4">
                  <span>
                    <span className="font-bold">{name}</span> <span className="text-cocoa">{text}</span>
                  </span>
                  <span className="font-display text-xl font-bold text-jollof">{formatMoney(price as number)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-cocoa">
              Group orders can double, triple or quadruple the portions. Planning something for a holiday or occasion? Ask us
              about a custom package.
            </p>
            <a href="#quote" className="btn-dark mt-6">
              Ask about a package <ArrowRightIcon width={18} height={18} />
            </a>
          </div>
        </div>
      </section>

      <section id="quote" className="container-x scroll-mt-28 pt-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">Get a quote</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">Let&apos;s plan your menu</h2>
            <p className="mt-4 text-lg text-cocoa">
              Share a few details and we&apos;ll get back to you with menu ideas and pricing.
            </p>
            <ul className="mt-8 space-y-5">
              {[
                { icon: CalendarIcon, title: "Book early", text: "For large events, reach out 1–2 weeks ahead so we can plan and shop fresh." },
                { icon: PotIcon, title: "Cooked from scratch", text: "Every tray is cooked fresh for your event." },
                { icon: GiftIcon, title: "Custom gift packs", text: "Treat packs for party favours, holidays and corporate gifts." },
                { icon: StoreIcon, title: "Pickup or delivery", text: `Collect from us or have it delivered across ${site.region.split(",")[0]}.` },
              ].map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blush-soft text-jollof">
                    <f.icon />
                  </span>
                  <div>
                    <p className="font-bold">{f.title}</p>
                    <p className="text-sm text-cocoa">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-butter/60 p-5 text-sm">
              <p className="flex items-center gap-2 font-bold">
                <CheckIcon width={18} height={18} /> Prefer to chat?
              </p>
              <p className="mt-1 text-cocoa">
                WhatsApp or call{" "}
                <a href={site.phone.href} className="font-semibold text-ink underline-offset-4 hover:underline">
                  {site.phone.display}
                </a>
                .
              </p>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
