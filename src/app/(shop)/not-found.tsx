import Link from "next/link";
import { FoodIllustration } from "@/components/ProductArt";

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center py-20 text-center">
      <FoodIllustration art="chin-chin" className="size-56" />
      <p className="eyebrow mt-4">404</p>
      <h1 className="mt-2 font-display text-5xl font-black tracking-tight">This plate is empty</h1>
      <p className="mt-3 max-w-md text-cocoa">We couldn&apos;t find that page. The good stuff is on the menu.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/menu" className="btn-primary">
          See the menu
        </Link>
        <Link href="/" className="btn-ghost">
          Home
        </Link>
      </div>
    </div>
  );
}
