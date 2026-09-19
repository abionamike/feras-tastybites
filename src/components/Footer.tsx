import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalog";
import { site, whatsappLink } from "@/lib/site";
import { InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-cream">
      <div className="pattern-adire h-3 w-full opacity-90" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-xs font-script text-3xl leading-tight text-blush">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/70">
            Everything on our menu is made from scratch with Naija vibes in every bite.
          </p>
          <div className="mt-6 flex gap-2">
            <a href={site.instagram.url} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-blush hover:text-ink">
              <InstagramIcon />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-[#25d366] hover:text-ink">
              <WhatsAppIcon />
            </a>
            <a href={site.phone.href} aria-label="Call us" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-gold hover:text-ink">
              <PhoneIcon />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-cream/50">Menu</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/menu?category=${c.id}`} className="text-cream/85 hover:text-blush">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/catering" className="text-cream/85 hover:text-blush">
                Party trays
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-cream/50">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ["/about", "Our story"],
              ["/catering", "Catering & gifts"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
              ["/order", "Track an order"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-cream/85 hover:text-blush">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="flex items-center gap-5 rounded-[2rem] bg-white/5 p-5 ring-1 ring-white/10">
            <Image src="/brand/logo-badge.jpg" alt="Feras Tasty Bites badge" width={96} height={96} className="size-24 shrink-0 rounded-full" />
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-cream/85">
                <PinIcon width={16} height={16} /> {site.region}
              </p>
              <a href={whatsappLink()} className="flex items-center gap-2 text-cream/85 hover:text-blush">
                <WhatsAppIcon width={16} height={16} /> {site.whatsapp.display}
              </a>
              <a href={site.instagram.url} className="flex items-center gap-2 text-cream/85 hover:text-blush">
                <InstagramIcon width={16} height={16} /> @{site.instagram.handle}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Thank you for your purchase! 💗</p>
        </div>
      </div>
    </footer>
  );
}
