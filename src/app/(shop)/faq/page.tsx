import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { faqs } from "@/lib/faq";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Ordering, delivery, pickup, payment and catering questions answered.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="container-x max-w-3xl py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <p className="eyebrow text-center">Good to know</p>
      <h1 className="mt-3 text-center font-display text-5xl font-black tracking-tight sm:text-6xl">Questions & answers</h1>
      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <details key={f.q} className="group card open:bg-paper open:shadow-sm" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-display text-xl font-bold">
              {f.q}
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blush-soft text-xl transition group-open:rotate-45 group-open:bg-ink group-open:text-cream">
                +
              </span>
            </summary>
            <p className="-mt-2 px-6 pb-6 leading-relaxed text-cocoa">{f.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-12 rounded-[2rem] bg-blush p-8 text-center">
        <h2 className="font-display text-3xl font-black">Still hungry for answers?</h2>
        <p className="mt-2 text-ink/75">We&apos;re quick on WhatsApp.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-dark">
            <WhatsAppIcon /> WhatsApp us
          </a>
          <Link href="/contact" className="btn-ghost">
            Contact form
          </Link>
        </div>
      </div>
    </div>
  );
}
