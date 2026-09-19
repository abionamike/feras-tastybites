import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} on WhatsApp, Instagram or by message.`,
};

export default function ContactPage() {
  const channels = [
    { icon: WhatsAppIcon, label: "WhatsApp", value: site.whatsapp.display, href: whatsappLink(), tone: "bg-[#25d366] text-white" },
    { icon: PhoneIcon, label: "Call", value: site.phone.display, href: site.phone.href, tone: "bg-gold text-ink" },
    { icon: InstagramIcon, label: "Instagram", value: `@${site.instagram.handle}`, href: site.instagram.url, tone: "bg-blush text-ink" },
    { icon: PinIcon, label: "Serving", value: site.region, tone: "bg-ink text-cream" },
  ];

  return (
    <div className="container-x py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow">Say hello</p>
          <h1 className="mt-3 font-display text-5xl font-black tracking-tight sm:text-6xl">Let&apos;s talk food</h1>
          <p className="mt-4 max-w-md text-lg text-cocoa">
            Questions about an order, a special request, or just want to say the jollof was fire? We&apos;d love to hear
            from you.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className={`grid size-12 place-items-center rounded-2xl ${c.tone}`}>
                    <c.icon />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-cocoa">{c.label}</span>
                    <span className="block font-bold">{c.value}</span>
                  </span>
                </>
              );
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="card flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:border-ink/30">
                      {inner}
                    </a>
                  ) : (
                    <div className="card flex items-center gap-4 p-4">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <InquiryForm defaultKind="general" compact />
      </div>
    </div>
  );
}
