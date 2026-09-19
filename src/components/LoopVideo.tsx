"use client";

import { useEffect, useRef } from "react";

/** Muted, looping background clip. Stays on its poster frame for reduced-motion users. */
export function LoopVideo({ src, poster, label, className = "" }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    // React doesn't always render `muted` as an attribute, and browsers only autoplay muted video
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
