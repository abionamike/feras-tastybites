import { Photo } from "./ProductArt";

/** A real photo presented as a taped-down snapshot with a handwritten caption. */
export function Polaroid({
  src,
  alt,
  caption,
  tilt = 0,
  aspect = "aspect-square",
  sizes = "240px",
  tape = true,
  priority,
  className = "",
  position,
}: {
  src: string;
  alt: string;
  caption?: string;
  tilt?: number;
  aspect?: string;
  sizes?: string;
  tape?: boolean;
  priority?: boolean;
  className?: string;
  position?: string;
}) {
  return (
    <div className={className}>
      <figure
        className="relative bg-[#fffdf9] p-2.5 pb-3 shadow-[0_18px_40px_-18px_rgba(42,26,20,0.55)] ring-1 ring-black/5"
        style={{ rotate: `${tilt}deg` }}
      >
        {tape && (
          <span
            aria-hidden
            className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-[-3deg] bg-blush/80 shadow-sm [mask-image:linear-gradient(90deg,transparent_0,black_6%,black_94%,transparent_100%)]"
          />
        )}
        <div className={`relative overflow-hidden ${aspect}`}>
          <Photo
            src={src}
            alt={alt}
            sizes={sizes}
            priority={priority}
            style={position ? { objectPosition: position } : undefined}
          />
        </div>
        {caption && (
          <figcaption className="px-1 pt-2 text-center font-script text-xl leading-tight text-ink/85">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
