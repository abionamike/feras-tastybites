import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard, ProductTags } from "@/components/ProductCard";
import { ProductArt } from "@/components/ProductArt";
import { ArrowLeftIcon, ClockIcon, PotIcon, TruckIcon } from "@/components/icons";
import { categories, getProduct, products } from "@/lib/catalog";
import { site } from "@/lib/site";
import { ProductPurchase } from "./ProductPurchase";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/menu/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/menu/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const category = categories.find((c) => c.id === product.category)!;
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    offers: { "@type": "Offer", price: product.price.toFixed(2), priceCurrency: site.currency, availability: "https://schema.org/InStock" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="container-x pt-8">
        <nav className="flex items-center gap-2 text-sm text-cocoa" aria-label="Breadcrumb">
          <Link href="/menu" className="inline-flex items-center gap-1.5 font-semibold hover:text-ink">
            <ArrowLeftIcon width={16} height={16} /> Menu
          </Link>
          <span>/</span>
          <Link href={`/menu?category=${category.id}`} className="hover:text-ink">
            {category.name}
          </Link>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <ProductArt product={product} priority className="aspect-[4/3] rounded-[2.5rem] lg:aspect-square" sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute left-5 top-5">
                <ProductTags product={product} />
              </div>
            </div>
          </div>

          <div className="pb-6">
            <p className="eyebrow">{category.name}</p>
            <h1 className="mt-3 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-cocoa">{product.description}</p>

            <ProductPurchase product={product} />

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: PotIcon, title: "Made from scratch", text: "Cooked fresh for your order" },
                { icon: ClockIcon, title: `${site.leadTimeDays * 24}h notice`, text: "Order a day ahead" },
                { icon: TruckIcon, title: "Pickup or delivery", text: site.region.split(",")[0] },
              ].map((f) => (
                <li key={f.title} className="rounded-2xl border border-line bg-paper p-4">
                  <f.icon className="text-jollof" />
                  <p className="mt-2 text-sm font-bold">{f.title}</p>
                  <p className="text-xs text-cocoa">{f.text}</p>
                </li>
              ))}
            </ul>

            <details className="group mt-6 rounded-2xl border border-line bg-paper p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold">
                Allergens & dietary info
                <span className="text-xl transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">
                Our food is prepared in a home-style kitchen that may handle common allergens such as wheat, eggs, dairy, fish and
                nuts. If you have an allergy, add a note at checkout or message us on WhatsApp before ordering.
              </p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-x pt-20">
          <h2 className="font-display text-3xl font-black sm:text-4xl">You might also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
