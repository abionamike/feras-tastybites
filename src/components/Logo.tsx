import Link from "next/link";
import { ChefHat } from "./icons";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Feras Tasty Bites home">
      <span className="grid size-11 place-items-center rounded-full bg-blush ring-4 ring-blush/40 transition group-hover:rotate-[-8deg]">
        <ChefHat className="size-7 text-[#b8692e]" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[1.35rem] font-black tracking-tight ${light ? "text-cream" : "text-ink"}`}>
          Feras
        </span>
        <span className={`block text-[0.62rem] font-extrabold uppercase tracking-[0.28em] ${light ? "text-blush" : "text-jollof"}`}>
          Tasty Bites
        </span>
      </span>
    </Link>
  );
}
