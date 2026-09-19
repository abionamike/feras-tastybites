import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { FoodIllustration, artBackgrounds } from "@/components/ProductArt";
import { CalendarIcon, CheckIcon, GiftIcon, PotIcon, SparkIcon, StoreIcon, WhatsAppIcon } from "@/components/icons";
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
  { art: "jollof-chicken" as const, title: "Party trays", text: "Jollof rice by the tray with chicken, beef or fish, plus plantain." },
  { art: "puff-puff" as const, title: "Small chops platters", text: "Puff puff, meat pies, beef kebab, gizdodo and chin chin." },
  { art: "chin-chin" as const, title: "Gift packs", text: "Chin chin, puff puff and treats, packed beautifully for gifting." },
  { art: "zobo" as const, title: "Drinks", text: "Chilled zobo and fruit juice by the bottle for your guests." },
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
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-cream/10 ring-1 ring-white/20" />
            <FoodIllustration art="jollof-beef" className="absolute inset-[4%] drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]" />
            <div className="absolute -bottom-2 -left-4 w-36 rotate-[-6deg] rounded-3xl bg-cream p-2 shadow-2xl">
              <div className="aspect-square rounded-2xl" style={{ background: artBackgrounds["meat-pie"] }}>
                <FoodIllustration art="meat-pie" className="size-full" />
              </div>
            </div>
            <div className="absolute -right-2 top-4 w-32 rotate-[5deg] rounded-3xl bg-cream p-2 shadow-2xl">
              <div className="aspect-square rounded-2xl" style={{ background: artBackgrounds.kebab }}>
                <FoodIllustration art="kebab" className="size-full" />
              </div>
            </div>
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
              <div className="aspect-[4/3]" style={{ background: artBackgrounds[o.art] }}>
                <FoodIllustration art={o.art} className="size-full p-4" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold">{o.title}</h3>
                <p className="mt-1 text-sm text-cocoa">{o.text}</p>
              </div>
            </div>
          ))}
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
