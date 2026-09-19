import { ChefHat } from "./icons";

/** Circular rotating text badge, echoing the ring on the Feras Tasty Bites logo. */
export function SpinningBadge({
  text = "MADE FROM SCRATCH • NAIJA VIBES IN EVERY BITE • ",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative grid size-full place-items-center rounded-full bg-blush">
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fontSize="15.5" fontWeight="700" letterSpacing="3.2" fill="#3b2a24">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <div className="grid size-[52%] place-items-center rounded-full bg-paper">
        <ChefHat className="size-[55%] text-[#b8692e]" />
      </div>
      </div>
    </div>
  );
}
