import Link from "next/link";
import { hasFromPrice, type Product } from "@/lib/catalog";
import { formatMoney } from "@/lib/pricing";
import { QuickAdd } from "./QuickAdd";
import { ProductArt } from "./ProductArt";
import { ChiliIcon, LeafIcon } from "./icons";

export function ProductTags({ product }: { product: Product }) {
  const tags = product.tags ?? [];
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.includes("bestseller") && (
        <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cream">Favourite</span>
      )}
      {tags.includes("new") && (
        <span className="rounded-full bg-rose px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">New</span>
      )}
      {tags.includes("spicy") && (
        <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-pepper backdrop-blur">
          <ChiliIcon width={12} height={12} /> Spicy
        </span>
      )}
      {tags.includes("vegetarian") && (
        <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-leaf backdrop-blur">
          <LeafIcon width={12} height={12} /> Veg
        </span>
      )}
    </div>
  );
}

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-line bg-paper transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(90,40,10,0.45)]">
      <Link href={`/menu/${product.slug}`} className="relative block" aria-label={product.name}>
        <ProductArt
          product={product}
          priority={priority}
          className="aspect-[4/3.4] transition duration-500 [&_svg]:transition [&_svg]:duration-700 group-hover:[&_img]:scale-[1.06] group-hover:[&_svg]:rotate-[6deg] group-hover:[&_svg]:scale-[1.04]"
        />
        <div className="absolute left-4 top-4">
          <ProductTags product={product} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-bold leading-tight">
            <Link href={`/menu/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 text-right font-display text-xl font-bold leading-tight text-jollof">
            {hasFromPrice(product) && <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-cocoa">From</span>}
            {formatMoney(product.price)}
          </p>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-cocoa">{product.blurb}</p>
        <div className="relative z-10 mt-auto pt-5">
          <QuickAdd product={product} />
        </div>
      </div>
    </article>
  );
}
