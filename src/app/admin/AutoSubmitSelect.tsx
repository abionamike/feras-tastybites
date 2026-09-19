"use client";

/** A select that submits its form as soon as the value changes. */
export function AutoSubmitSelect({
  name,
  defaultValue,
  options,
  className = "",
}: {
  name: string;
  defaultValue: string;
  options: string[];
  className?: string;
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
      className={`cursor-pointer rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${className}`}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
