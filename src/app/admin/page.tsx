import Link from "next/link";
import { Logo } from "@/components/Logo";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { prettyDate, todayISO } from "@/lib/dates";
import { formatMoney } from "@/lib/pricing";
import { listInquiries, listOrders, type OrderStatus } from "@/lib/store";
import { logout, setInquiryStatus, setOrderStatus, setPaymentStatus } from "./actions";
import { AutoSubmitSelect } from "./AutoSubmitSelect";
import { LoginForm } from "./LoginForm";

const statusTone: Record<OrderStatus, string> = {
  new: "bg-jollof text-white",
  confirmed: "bg-gold text-ink",
  preparing: "bg-butter text-ink",
  ready: "bg-leaf text-white",
  completed: "bg-line text-cocoa",
  cancelled: "bg-pepper/15 text-pepper",
};

const waNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `1${digits}` : digits;
};

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  if (!(await isAdmin())) {
    return (
      <div className="grid min-h-screen place-items-center px-5">
        <div className="card w-full max-w-sm p-8 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="mt-6 font-display text-3xl font-black">Kitchen dashboard</h1>
          {adminConfigured() ? (
            <LoginForm />
          ) : (
            <p className="mt-4 text-sm text-cocoa">
              Set the <code className="rounded bg-line px-1.5 py-0.5">ADMIN_PASSWORD</code> environment variable to enable the
              dashboard.
            </p>
          )}
        </div>
      </div>
    );
  }

  const sp = await searchParams;
  const tab = sp.tab === "enquiries" ? "enquiries" : "orders";
  const filter = typeof sp.status === "string" ? sp.status : "active";
  const [orders, inquiries] = await Promise.all([listOrders(), listInquiries()]);

  const today = todayISO();
  const active = orders.filter((o) => !["completed", "cancelled"].includes(o.status));
  const stats = [
    { label: "Active orders", value: String(active.length) },
    { label: "Due today", value: String(active.filter((o) => o.date === today).length) },
    { label: "Awaiting payment", value: String(orders.filter((o) => o.paymentStatus === "unpaid" && o.status !== "cancelled").length) },
    {
      label: "Paid revenue",
      value: formatMoney(orders.filter((o) => o.paymentStatus === "paid").reduce((s, o) => s + o.total, 0)),
    },
  ];

  const shown = [
    ...(filter === "active" ? active : filter === "all" ? orders : orders.filter((o) => o.status === filter)),
  ].sort((a, b) => (filter === "active" ? `${a.date}${a.slot}`.localeCompare(`${b.date}${b.slot}`) : 0));

  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="container-x py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <Logo />
        <div className="flex items-center gap-2">
          <Link href="/" className="btn-ghost !py-2.5">
            View shop
          </Link>
          <form action={logout}>
            <button className="btn-dark !py-2.5">Sign out</button>
          </form>
        </div>
      </header>

      <h1 className="mt-10 font-display text-4xl font-black">Kitchen dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cocoa">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-black tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      <nav className="mt-10 flex gap-2 border-b border-line">
        {[
          ["orders", `Orders (${orders.length})`],
          ["enquiries", `Enquiries${newInquiries ? ` · ${newInquiries} new` : ""}`],
        ].map(([id, label]) => (
          <Link
            key={id}
            href={`/admin?tab=${id}`}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-bold ${tab === id ? "border-jollof text-ink" : "border-transparent text-cocoa hover:text-ink"}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {tab === "orders" ? (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            {["active", "new", "confirmed", "preparing", "ready", "completed", "cancelled", "all"].map((s) => (
              <Link
                key={s}
                href={`/admin?status=${s}`}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
                  filter === s ? "bg-ink text-cream" : "border border-line bg-paper text-cocoa"
                }`}
              >
                {s}
              </Link>
            ))}
          </div>

          {shown.length === 0 ? (
            <p className="card mt-6 p-10 text-center text-cocoa">No orders here yet.</p>
          ) : (
            <ul className="mt-6 space-y-3">
              {shown.map((o) => (
                <li key={o.id}>
                  <details className="card group overflow-hidden">
                    <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-6 gap-y-2 p-5">
                      <span className="font-mono text-sm font-bold">{o.id}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusTone[o.status]}`}>{o.status}</span>
                      <span className="font-semibold">{o.customer.name}</span>
                      <span className="text-sm text-cocoa">
                        {o.fulfillment === "delivery" ? "🚚" : "🛍️"} {prettyDate(o.date)} · {o.slot}
                        {o.date === today && <b className="ml-2 text-jollof">TODAY</b>}
                      </span>
                      <span className="ml-auto flex items-center gap-3">
                        <span className={`text-xs font-bold uppercase ${o.paymentStatus === "paid" ? "text-leaf" : "text-jollof"}`}>
                          {o.paymentStatus} · {o.paymentMethod === "card" ? "card" : "e-transfer"}
                        </span>
                        <span className="font-display text-xl font-black tabular-nums">{formatMoney(o.total)}</span>
                      </span>
                    </summary>
                    <div className="grid gap-6 border-t border-line bg-cream/40 p-5 md:grid-cols-3">
                      <div className="text-sm">
                        <p className="font-bold">Customer</p>
                        <p>{o.customer.name}</p>
                        <p>
                          <a href={`mailto:${o.customer.email}`} className="text-jollof hover:underline">
                            {o.customer.email}
                          </a>
                        </p>
                        <p>
                          <a href={`tel:${o.customer.phone}`} className="hover:underline">
                            {o.customer.phone}
                          </a>
                        </p>
                        {o.address && (
                          <p className="mt-2">
                            {o.address.line1}, {o.address.city} {o.address.postal}
                          </p>
                        )}
                        {o.notes && <p className="mt-2 rounded-lg bg-butter/60 p-2 italic">“{o.notes}”</p>}
                        <a
                          href={`https://wa.me/${waNumber(o.customer.phone)}?text=${encodeURIComponent(
                            `Hi ${o.customer.name.split(" ")[0]}, this is Feras Tasty Bites about your order ${o.id}.`,
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block text-xs font-bold text-leaf hover:underline"
                        >
                          Message on WhatsApp →
                        </a>
                      </div>
                      <div className="text-sm">
                        <p className="font-bold">Items</p>
                        <ul className="mt-1 space-y-1">
                          {o.lines.map((l, i) => (
                            <li key={i}>
                              {l.qty} × {l.name}
                              {l.summary.length > 0 && <span className="block text-xs text-cocoa">{l.summary.join(" · ")}</span>}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 text-xs text-cocoa">
                          Subtotal {formatMoney(o.subtotal)} · Delivery {formatMoney(o.deliveryFee)} · HST {formatMoney(o.tax)}
                        </p>
                      </div>
                      <div className="space-y-3 text-sm">
                        <form action={setOrderStatus} className="flex items-center justify-between gap-2">
                          <input type="hidden" name="id" value={o.id} />
                          <span className="font-bold">Status</span>
                          <AutoSubmitSelect
                            name="status"
                            defaultValue={o.status}
                            options={["new", "confirmed", "preparing", "ready", "completed", "cancelled"]}
                          />
                        </form>
                        <form action={setPaymentStatus} className="flex items-center justify-between gap-2">
                          <input type="hidden" name="id" value={o.id} />
                          <span className="font-bold">Payment</span>
                          <AutoSubmitSelect name="paymentStatus" defaultValue={o.paymentStatus} options={["unpaid", "paid", "refunded"]} />
                        </form>
                        <p className="text-xs text-cocoa">Placed {new Date(o.createdAt).toLocaleString("en-CA", { timeZone: "America/Toronto" })}</p>
                        <Link href={`/order/${o.id}`} target="_blank" className="text-xs font-bold text-jollof hover:underline">
                          Customer view →
                        </Link>
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : inquiries.length === 0 ? (
        <p className="card mt-6 p-10 text-center text-cocoa">No enquiries yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {inquiries.map((q) => (
            <li key={q.id} className="card p-5">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="rounded-full bg-blush px-3 py-1 text-xs font-bold uppercase tracking-wider">{q.kind}</span>
                <span className="font-semibold">{q.name}</span>
                <a href={`mailto:${q.email}`} className="text-sm text-jollof hover:underline">
                  {q.email}
                </a>
                {q.phone && (
                  <a href={`https://wa.me/${waNumber(q.phone)}`} className="text-sm hover:underline">
                    {q.phone}
                  </a>
                )}
                <form action={setInquiryStatus} className="ml-auto">
                  <input type="hidden" name="id" value={q.id} />
                  <AutoSubmitSelect name="status" defaultValue={q.status} options={["new", "replied", "closed"]} />
                </form>
              </div>
              <p className="mt-2 text-xs text-cocoa">
                {new Date(q.createdAt).toLocaleString("en-CA", { timeZone: "America/Toronto" })}
                {q.eventDate && ` · Event ${prettyDate(q.eventDate)}`}
                {q.guests && ` · ${q.guests}`}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm">{q.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
