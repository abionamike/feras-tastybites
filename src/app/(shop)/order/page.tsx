import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Track your order" };

async function lookup(fd: FormData) {
  "use server";
  const code = String(fd.get("code") ?? "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "");
  if (code) redirect(`/order/${code.startsWith("FTB-") ? code : `FTB-${code}`}`);
}

export default function TrackOrderPage() {
  return (
    <div className="container-x max-w-xl py-20 text-center">
      <p className="eyebrow">Order status</p>
      <h1 className="mt-3 font-display text-5xl font-black tracking-tight">Track your order</h1>
      <p className="mt-3 text-cocoa">Enter the order code from your confirmation, for example FTB-7K3Q9X.</p>
      <form action={lookup} className="mt-8 flex gap-2">
        <label className="flex-1">
          <span className="sr-only">Order code</span>
          <input name="code" required placeholder="FTB-XXXXXX" className="field rounded-full text-center font-bold uppercase tracking-widest" />
        </label>
        <button className="btn-primary">Track</button>
      </form>
    </div>
  );
}
