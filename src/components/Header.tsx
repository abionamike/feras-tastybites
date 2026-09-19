"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";
import { site } from "@/lib/site";
import { BagIcon, CloseIcon, InstagramIcon, MenuIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";

export const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Catering & Gifts" },
  { href: "/about", label: "Our Story" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const cart = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  const [lastAdded, setLastAdded] = useState(cart.lastAdded);
  if (cart.lastAdded !== lastAdded) {
    setLastAdded(cart.lastAdded);
    setBump(true);
  }
  useEffect(() => {
    if (!bump) return;
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [bump]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <div className="bg-ink py-2 text-center text-xs font-semibold tracking-wide text-cream/90">
        <span className="text-blush">Made fresh to order</span>
        <span className="hidden sm:inline"> · Order a day ahead</span> · Free delivery over ${site.fulfillment.delivery.freeOver}
      </div>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "border-b border-line/80 bg-cream/85 shadow-[0_10px_30px_-20px_rgba(42,26,20,0.35)] backdrop-blur-xl" : "bg-cream"
        }`}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active ? "bg-blush-soft text-ink" : "text-cocoa hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="hidden size-10 place-items-center rounded-full text-cocoa transition hover:bg-blush-soft hover:text-ink sm:grid"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <button
              onClick={() => cart.setOpen(true)}
              className={`relative grid size-11 place-items-center rounded-full bg-ink text-cream transition hover:bg-black ${
                bump ? "scale-110" : ""
              }`}
              aria-label={`Open bag, ${cart.count} items`}
            >
              <BagIcon />
              {cart.count > 0 && (
                <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-jollof px-1 text-[11px] font-bold leading-5 text-white ring-2 ring-cream">
                  {cart.count}
                </span>
              )}
            </button>
            <Link href="/menu" className="btn-primary hidden !py-3 md:inline-flex">
              Order now
            </Link>
            <button
              className="grid size-11 place-items-center rounded-full border border-ink/15 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "visible" : "invisible"}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`pattern-adire absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col p-6 text-cream transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo light />
            <button onClick={() => setMenuOpen(false)} className="grid size-11 place-items-center rounded-full bg-white/10" aria-label="Close menu">
              <CloseIcon />
            </button>
          </div>
          <nav className="mt-10 flex flex-col" aria-label="Mobile">
            {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-white/10 py-4 font-display text-3xl font-semibold transition hover:text-blush"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-3">
            <Link href="/menu" className="btn w-full bg-cream text-ink">
              Order now
            </Link>
            <a href={`https://wa.me/${site.whatsapp.number}`} className="btn w-full border border-white/25 text-cream">
              <WhatsAppIcon /> WhatsApp {site.whatsapp.display}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
