"use server";

import { revalidatePath } from "next/cache";
import { isAdmin, signIn, signOut } from "@/lib/admin-auth";
import { updateInquiry, updateOrder, type Inquiry, type OrderStatus, type PaymentStatus } from "@/lib/store";

const ORDER_STATUSES: OrderStatus[] = ["new", "confirmed", "preparing", "ready", "completed", "cancelled"];
const PAYMENT_STATUSES: PaymentStatus[] = ["unpaid", "paid", "refunded"];
const INQUIRY_STATUSES: Inquiry["status"][] = ["new", "replied", "closed"];

export async function login(_prev: { error?: string }, fd: FormData) {
  const ok = await signIn(String(fd.get("password") ?? ""));
  if (!ok) return { error: "That password isn't right." };
  revalidatePath("/admin");
  return {};
}

export async function logout() {
  await signOut();
  revalidatePath("/admin");
}

async function guard() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}

export async function setOrderStatus(fd: FormData) {
  await guard();
  const status = String(fd.get("status")) as OrderStatus;
  if (!ORDER_STATUSES.includes(status)) return;
  await updateOrder(String(fd.get("id")), { status });
  revalidatePath("/admin");
}

export async function setPaymentStatus(fd: FormData) {
  await guard();
  const paymentStatus = String(fd.get("paymentStatus")) as PaymentStatus;
  if (!PAYMENT_STATUSES.includes(paymentStatus)) return;
  await updateOrder(String(fd.get("id")), { paymentStatus });
  revalidatePath("/admin");
}

export async function setInquiryStatus(fd: FormData) {
  await guard();
  const status = String(fd.get("status")) as Inquiry["status"];
  if (!INQUIRY_STATUSES.includes(status)) return;
  await updateInquiry(String(fd.get("id")), status);
  revalidatePath("/admin");
}
