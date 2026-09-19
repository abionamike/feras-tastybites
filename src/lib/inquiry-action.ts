"use server";

import { notifyInquiry } from "./notify";
import { createInquiry, type InquiryKind } from "./store";

export type InquiryState = { ok?: boolean; error?: string; fieldErrors?: Record<string, string>; values?: Record<string, string> };

const KINDS: InquiryKind[] = ["catering", "gift-pack", "bulk", "general"];

export async function submitInquiry(_prev: InquiryState, fd: FormData): Promise<InquiryState> {
  const get = (k: string, max = 200) => String(fd.get(k) ?? "").trim().slice(0, max);

  // Honeypot: real people never fill this hidden field
  if (get("company")) return { ok: true };

  const kind = get("kind") as InquiryKind;
  const data = {
    kind: KINDS.includes(kind) ? kind : "general",
    name: get("name", 80),
    email: get("email", 120).toLowerCase(),
    phone: get("phone", 30),
    eventDate: get("eventDate", 10) || undefined,
    guests: get("guests", 40) || undefined,
    budget: get("budget", 40) || undefined,
    message: get("message", 2000),
  };

  const fieldErrors: Record<string, string> = {};
  if (data.name.length < 2) fieldErrors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) fieldErrors.email = "Please enter a valid email.";
  if (data.message.length < 5) fieldErrors.message = "Tell us a little about what you need.";
  if (Object.keys(fieldErrors).length) return {
      fieldErrors,
      error: "Please check the highlighted fields.",
      values: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v ?? ""])),
    };

  const inquiry = await createInquiry(data);
  await notifyInquiry(inquiry);
  return { ok: true };
}
