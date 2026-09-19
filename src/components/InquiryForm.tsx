"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/lib/inquiry-action";
import { site, whatsappLink } from "@/lib/site";
import { CheckIcon } from "./icons";

const kinds = [
  { id: "catering", label: "Event catering" },
  { id: "bulk", label: "Bulk / party trays" },
  { id: "gift-pack", label: "Gift packs" },
  { id: "general", label: "Something else" },
];

export function InquiryForm({ defaultKind = "catering", compact = false }: { defaultKind?: string; compact?: boolean }) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiry, {});
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.ok) {
    return (
      <div className="card animate-rise p-10 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-leaf text-white">
          <CheckIcon width={30} height={30} />
        </div>
        <h3 className="mt-5 font-display text-3xl font-bold">Thank you! We&apos;ll be in touch.</h3>
        <p className="mx-auto mt-2 max-w-sm text-cocoa">
          We&apos;ll get back to you as soon as we can. For anything urgent, WhatsApp us on {site.whatsapp.display}.
        </p>
        <a href={whatsappLink()} className="btn-dark mt-6">
          Open WhatsApp
        </a>
      </div>
    );
  }

  const err = (k: string) => (e[k] ? <span className="mt-1 block text-sm text-pepper">{e[k]}</span> : null);

  return (
    <form action={action} className="card space-y-5 p-6 sm:p-8" noValidate>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {!compact && (
        <fieldset>
          <legend className="label">What can we help with?</legend>
          <div className="flex flex-wrap gap-2">
            {kinds.map((k) => (
              <label key={k.id} className="cursor-pointer">
                <input type="radio" name="kind" value={k.id} defaultChecked={k.id === (v.kind ?? defaultKind)} className="peer sr-only" />
                <span className="inline-block rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold transition peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-jollof">
                  {k.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      {compact && <input type="hidden" name="kind" value={defaultKind} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="label">Name</span>
          <input name="name" defaultValue={v.name} autoComplete="name" className="field" aria-invalid={Boolean(e.name)} />
          {err("name")}
        </label>
        <label className="block">
          <span className="label">Email</span>
          <input name="email" defaultValue={v.email} type="email" autoComplete="email" className="field" aria-invalid={Boolean(e.email)} />
          {err("email")}
        </label>
        <label className="block">
          <span className="label">Phone</span>
          <input name="phone" defaultValue={v.phone} type="tel" autoComplete="tel" className="field" />
        </label>
        {!compact && (
          <>
            <label className="block">
              <span className="label">Event date</span>
              <input name="eventDate" defaultValue={v.eventDate} type="date" className="field" />
            </label>
            <label className="block">
              <span className="label">Guests or quantity</span>
              <input name="guests" defaultValue={v.guests} placeholder="e.g. 50 guests" className="field" />
            </label>
          </>
        )}
        <label className="block sm:col-span-2">
          <span className="label">{compact ? "Message" : "Tell us about it"}</span>
          <textarea
            name="message" defaultValue={v.message}
            rows={5}
            placeholder={compact ? "How can we help?" : "Type of event, dishes you'd love, pickup or delivery, any dietary needs…"}
            className="field resize-none"
            aria-invalid={Boolean(e.message)}
          />
          {err("message")}
        </label>
      </div>
      {state.error && <p className="rounded-xl bg-pepper/10 p-3 text-sm font-semibold text-pepper" role="alert">{state.error}</p>}
      <button className="btn-primary w-full py-4 text-base" disabled={pending}>
        {pending ? "Sending…" : compact ? "Send message" : "Request a quote"}
      </button>
    </form>
  );
}
