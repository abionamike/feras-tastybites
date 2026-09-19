"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SearchIcon } from "@/components/icons";
import { categories, products, type CategoryId } from "@/lib/catalog";

type Filter = CategoryId | "all";
type Sort = "featured" | "price-asc" | "price-desc";

export function MenuBrowser({ initialCategory }: { initialCategory: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  const choose = (next: Filter) => {
    setFilter(next);
    const url = next === "all" ? "/menu" : `/menu?category=${next}`;
    window.history.replaceState(null, "", url);
  };

  const q = query.trim().toLowerCase();
  const matches = products
    .filter((p) => filter === "all" || p.category === filter)
    .filter((p) => !q || `${p.name} ${p.blurb} ${p.description}`.toLowerCase().includes(q))
    .sort((a, b) => (sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : 0));

  const groups =
    filter === "all" && sort === "featured"
      ? categories.map((c) => ({ ...c, items: matches.filter((p) => p.category === c.id) })).filter((g) => g.items.length)
      : [{ id: "results", name: "", kicker: "", description: "", items: matches }];

  return (
    <>
      <div className="sticky top-[76px] z-30 border-b border-line bg-cream/90 backdrop-blur-xl">
        <div className="container-x flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0" role="tablist">
            {[{ id: "all" as const, name: "Everything" }, ...categories].map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={filter === c.id}
                onClick={() => choose(c.id)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  filter === c.id ? "bg-ink text-cream" : "border border-line bg-paper text-cocoa hover:border-ink/30 hover:text-ink"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <label className="relative flex-1 md:w-64 md:flex-none">
              <span className="sr-only">Search the menu</span>
              <SearchIcon width={18} height={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cocoa" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jollof, puff puff…"
                className="field rounded-full !py-2.5 pl-11"
              />
            </label>
            <label>
              <span className="sr-only">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field w-auto cursor-pointer rounded-full !py-2.5">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="container-x pt-10">
        {matches.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-3xl font-bold">Nothing matches “{query}”</p>
            <p className="mt-2 text-cocoa">Try another dish, or reach out and we&apos;ll see what we can cook up.</p>
          </div>
        )}
        {groups.map((g) => (
          <section key={g.id} className="pb-14">
            {g.name && (
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
                <h2 className="font-display text-3xl font-black">{g.name}</h2>
                <p className="text-sm text-cocoa">{g.description}</p>
              </div>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {g.items.map((p, i) => (
                <div key={p.slug} className="animate-rise" style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
