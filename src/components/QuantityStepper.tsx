"use client";

import { MinusIcon, PlusIcon } from "./icons";

export function QuantityStepper({
  value,
  onChange,
  size = "md",
  min = 0,
}: {
  value: number;
  onChange: (n: number) => void;
  size?: "sm" | "md";
  min?: number;
}) {
  const btn = size === "sm" ? "size-8" : "size-11";
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-paper p-1">
      <button
        type="button"
        className={`${btn} grid place-items-center rounded-full text-ink transition hover:bg-blush-soft disabled:opacity-40`}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <MinusIcon width={16} height={16} />
      </button>
      <span className={`${size === "sm" ? "w-7 text-sm" : "w-10"} text-center font-bold tabular-nums`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={`${btn} grid place-items-center rounded-full text-ink transition hover:bg-blush-soft disabled:opacity-40`}
        onClick={() => onChange(value + 1)}
        disabled={value >= 99}
        aria-label="Increase quantity"
      >
        <PlusIcon width={16} height={16} />
      </button>
    </div>
  );
}
