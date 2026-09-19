import { getProduct, type Product } from "./catalog";
import { site } from "./site";

export type Fulfillment = "pickup" | "delivery";

/** What the cart stores: a product plus the option choices picked for it. */
export type CartLine = {
  slug: string;
  qty: number;
  /** optionId -> choiceIds */
  selections: Record<string, string[]>;
};

export type PricedLine = CartLine & {
  key: string;
  product: Product;
  unitPrice: number;
  lineTotal: number;
  summary: string[];
};

export type Totals = {
  lines: PricedLine[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
};

const round = (n: number) => Math.round(n * 100) / 100;

export const lineKey = (line: Pick<CartLine, "slug" | "selections">) =>
  line.slug +
  "|" +
  Object.keys(line.selections)
    .sort()
    .map((k) => `${k}:${[...line.selections[k]].sort().join(",")}`)
    .join(";");

/**
 * Prices a line from the catalogue. Returns null for anything that does not
 * match the menu (unknown product, unknown option, missing required choice), so
 * tampered or stale carts can never set their own prices.
 */
export function priceLine(line: CartLine): PricedLine | null {
  const product = getProduct(line.slug);
  const qty = Math.floor(Number(line.qty));
  if (!product || !Number.isFinite(qty) || qty < 1 || qty > 99) return null;

  let unitPrice = product.price;
  const summary: string[] = [];
  const selections: Record<string, string[]> = {};

  for (const option of product.options ?? []) {
    const picked = [...new Set(line.selections?.[option.id] ?? [])];
    if (option.type === "single" && picked.length > 1) return null;
    if (option.required && picked.length === 0) return null;
    const labels: string[] = [];
    for (const id of picked) {
      const choice = option.choices.find((c) => c.id === id);
      if (!choice) return null;
      unitPrice += choice.price ?? 0;
      labels.push(choice.label);
    }
    if (picked.length) {
      selections[option.id] = picked;
      summary.push(`${option.label}: ${labels.join(", ")}`);
    }
  }
  for (const key of Object.keys(line.selections ?? {})) {
    if (!product.options?.some((o) => o.id === key)) return null;
  }

  const clean = { slug: product.slug, qty, selections };
  return {
    ...clean,
    key: lineKey(clean),
    product,
    unitPrice: round(unitPrice),
    lineTotal: round(unitPrice * qty),
    summary,
  };
}

export function deliveryFeeFor(fulfillment: Fulfillment, subtotal: number) {
  if (fulfillment !== "delivery") return 0;
  const { fee, freeOver } = site.fulfillment.delivery;
  return subtotal >= freeOver ? 0 : fee;
}

export function computeTotals(lines: CartLine[], fulfillment: Fulfillment = "pickup"): Totals {
  const priced = lines.map(priceLine).filter((l): l is PricedLine => l !== null);
  const subtotal = round(priced.reduce((s, l) => s + l.lineTotal, 0));
  const deliveryFee = deliveryFeeFor(fulfillment, subtotal);
  const tax = round((subtotal + deliveryFee) * site.taxRate);
  return {
    lines: priced,
    itemCount: priced.reduce((s, l) => s + l.qty, 0),
    subtotal,
    deliveryFee,
    tax,
    total: round(subtotal + deliveryFee + tax),
  };
}

export const formatMoney = (n: number) =>
  new Intl.NumberFormat(site.locale, { style: "currency", currency: site.currency }).format(n);
