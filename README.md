# Feras Tasty Bites

Online shop for **Feras Tasty Bites**, a Nigerian food business in Toronto & the GTA. Tagline: *Flavour from its roots*.

Built with Next.js 16 (App Router), React 19 and Tailwind CSS 4. It has no other runtime dependencies.

## What's included

**For customers**
- Home page, menu with category filters, search and sorting, and a page for each product
- Options on dishes (spice level, add-ons) with prices calculated as you choose
- Slide-out bag with a free-delivery progress bar and "goes well with" suggestions; the bag is saved in the browser
- Checkout: pickup or delivery, date and time window (with minimum notice), HST, delivery fee, and payment by Interac e-Transfer or card (Stripe)
- Order confirmation and tracking page (`/order/FTB-XXXXXX`), plus a button to send the order on WhatsApp
- Catering, party trays and gift packs page with a quote request form
- Our story, FAQ, contact form, floating WhatsApp button
- SEO: metadata, Open Graph banner, sitemap, robots, product and FAQ structured data

**For the business** (`/admin`, password protected)
- Dashboard: active orders, orders due today, orders awaiting payment, paid revenue
- Order list with filters; update order status (new → confirmed → preparing → ready → completed) and payment status
- One-tap WhatsApp message to the customer
- Catering and contact enquiries inbox

## Getting started

```bash
cp .env.example .env.local   # set ADMIN_PASSWORD at minimum
npm install
npm run dev
```

Open http://localhost:3000. The dashboard is at http://localhost:3000/admin.

## Common changes

| To change | Edit |
| --- | --- |
| Menu items, prices, descriptions, options | `src/lib/catalog.ts` |
| Phone, Instagram, delivery fee, free-delivery threshold, tax, notice period, time windows, minimum order | `src/lib/site.ts` |
| FAQ | `src/lib/faq.ts` |
| Colours and fonts | `src/app/globals.css`, `src/app/layout.tsx` |

**Product photos:** every dish has a drawn illustration until real photos are added. To use a photo, put it in `public/images/products/` (a square image of about 1200px works best) and set `image: "/images/products/jollof.jpg"` on the product in `catalog.ts`.

## Payments

- **Interac e-Transfer** is always available. Set `NEXT_PUBLIC_ETRANSFER_EMAIL` to show the address on the order page. Mark orders as paid in `/admin`.
- **Card** shows at checkout once `STRIPE_SECRET_KEY` is set. Customers pay on Stripe Checkout and the order is marked paid automatically. Also add a Stripe webhook to `https://<your-site>/api/stripe/webhook` for `checkout.session.completed`, and set `STRIPE_WEBHOOK_SECRET`.

Prices are always recalculated on the server from `catalog.ts`, so a customer can't change a price in their browser.

## Email notifications

Set `RESEND_API_KEY`, `ORDER_NOTIFY_EMAIL` and `EMAIL_FROM` to email the business about new orders and enquiries, and to send customers an order confirmation. Without them, everything still appears in `/admin`.

## Data storage and hosting

Orders and enquiries are saved to a JSON file in `.data/`. This works on any host with a persistent disk (a VPS, Railway, Render with a disk, Fly.io with a volume).

**Serverless hosts such as Vercel don't keep files between requests**, so before deploying there, replace the functions in `src/lib/store.ts` with a hosted database (for example Postgres, Supabase or Turso). The rest of the app only uses those functions, so nothing else needs to change.
