import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Fulfillment } from "./pricing";

// A small JSON-file database. It keeps the shop dependency-free and works on any
// Node host with a persistent disk. For serverless hosting (e.g. Vercel), swap
// these functions for a hosted database; nothing else needs to change.

export type OrderStatus = "new" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled";
export type PaymentMethod = "etransfer" | "card";
export type PaymentStatus = "unpaid" | "paid" | "refunded";

export type OrderLine = {
  slug: string;
  name: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
  summary: string[];
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  stripeSessionId?: string;
  customer: { name: string; email: string; phone: string };
  fulfillment: Fulfillment;
  address?: { line1: string; city: string; postal: string };
  date: string;
  slot: string;
  notes: string;
  lines: OrderLine[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
};

export type InquiryKind = "catering" | "gift-pack" | "bulk" | "general";

export type Inquiry = {
  id: string;
  createdAt: string;
  kind: InquiryKind;
  status: "new" | "replied" | "closed";
  name: string;
  email: string;
  phone: string;
  eventDate?: string;
  guests?: string;
  budget?: string;
  message: string;
};

type Db = { orders: Order[]; inquiries: Inquiry[] };

const DB_FILE = path.join(process.env.DATA_DIR ?? path.join(process.cwd(), ".data"), "db.json");

async function load(): Promise<Db> {
  try {
    return JSON.parse(await readFile(DB_FILE, "utf8")) as Db;
  } catch {
    return { orders: [], inquiries: [] };
  }
}

// Serialise writes so concurrent requests can't overwrite each other.
let queue: Promise<unknown> = Promise.resolve();

function mutate<T>(fn: (db: Db) => T): Promise<T> {
  const run = queue.then(async () => {
    const db = await load();
    const result = fn(db);
    await mkdir(path.dirname(DB_FILE), { recursive: true });
    const tmp = `${DB_FILE}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(db, null, 2));
    await rename(tmp, DB_FILE);
    return result;
  });
  queue = run.catch(() => {});
  return run;
}

// No 0/O/1/I so codes are easy to read out over the phone.
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const code = (len: number) =>
  Array.from(randomBytes(len), (b) => ALPHABET[b % ALPHABET.length]).join("");

export async function createOrder(input: Omit<Order, "id" | "createdAt" | "status" | "paymentStatus">) {
  return mutate((db) => {
    const order: Order = {
      ...input,
      id: `FTB-${code(6)}`,
      createdAt: new Date().toISOString(),
      status: "new",
      paymentStatus: "unpaid",
    };
    db.orders.unshift(order);
    return order;
  });
}

export async function getOrder(id: string) {
  const db = await load();
  return db.orders.find((o) => o.id === id) ?? null;
}

export async function listOrders() {
  return (await load()).orders;
}

export async function updateOrder(id: string, patch: Partial<Pick<Order, "status" | "paymentStatus" | "stripeSessionId">>) {
  return mutate((db) => {
    const order = db.orders.find((o) => o.id === id);
    if (order) Object.assign(order, patch);
    return order ?? null;
  });
}

export async function createInquiry(input: Omit<Inquiry, "id" | "createdAt" | "status">) {
  return mutate((db) => {
    const inquiry: Inquiry = { ...input, id: `INQ-${code(5)}`, createdAt: new Date().toISOString(), status: "new" };
    db.inquiries.unshift(inquiry);
    return inquiry;
  });
}

export async function listInquiries() {
  return (await load()).inquiries;
}

export async function updateInquiry(id: string, status: Inquiry["status"]) {
  return mutate((db) => {
    const inquiry = db.inquiries.find((i) => i.id === id);
    if (inquiry) inquiry.status = status;
    return inquiry ?? null;
  });
}
