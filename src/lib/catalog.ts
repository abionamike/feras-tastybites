// Menu and prices from the Feras Tasty Bites menu list.
// To use a real photo for an item, put it in /public/images/products and set `image`.

export type CategoryId = "flavour-packs" | "small-chops" | "drinks" | "party-trays";

export type ArtKind =
  | "jollof-chicken"
  | "jollof-beef"
  | "tilapia"
  | "plantain"
  | "puff-puff"
  | "meat-pie"
  | "chin-chin"
  | "gizdodo"
  | "parfait"
  | "kebab"
  | "zobo"
  | "juice"
  | "soda"
  | "water"
  | "turkey";

export type OptionChoice = { id: string; label: string; price?: number };

export type ProductOption = {
  id: string;
  label: string;
  type: "single" | "multi";
  required?: boolean;
  choices: OptionChoice[];
};

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  blurb: string;
  description: string;
  art: ArtKind;
  /** Real photo in /public/images; falls back to the illustration when missing */
  image?: string;
  /** CSS object-position for the photo crop, e.g. "50% 80%" */
  imagePosition?: string;
  tags?: ("bestseller" | "spicy" | "vegetarian" | "sweet" | "new")[];
  options?: ProductOption[];
};

export const categories: { id: CategoryId; name: string; kicker: string; description: string }[] = [
  {
    id: "flavour-packs",
    name: "Flavour Packs",
    kicker: "Mains",
    description: "Hearty plates cooked low and slow, the way it's done at home.",
  },
  {
    id: "small-chops",
    name: "Small Chops",
    kicker: "Appetizers & treats",
    description: "Party-favourite bites for snacking, sharing and gifting.",
  },
  {
    id: "drinks",
    name: "Drinks",
    kicker: "Beverages",
    description: "Something cold to wash it all down.",
  },
  {
    id: "party-trays",
    name: "Party Trays",
    kicker: "Bulk menu",
    description: "Trays and bulk packs for parties, events and the whole family.",
  },
];

const spice: ProductOption = {
  id: "spice",
  label: "Spice level",
  type: "single",
  required: true,
  choices: [
    { id: "mild", label: "Mild" },
    { id: "medium", label: "Medium" },
    { id: "hot", label: "Naija hot" },
  ],
};

const mainAddOns: ProductOption = {
  id: "addons",
  label: "Add to your pack",
  type: "multi",
  choices: [
    { id: "plantain", label: "Fried plantain (dodo)", price: 5 },
    { id: "meat-pie", label: "Meat pie", price: 5 },
    { id: "zobo", label: "Zobo drink", price: 4 },
  ],
};

export const products: Product[] = [
  {
    slug: "jollof-rice-and-chicken",
    name: "Jollof Rice & Chicken",
    category: "flavour-packs",
    price: 20,
    blurb: "Smoky party jollof with well-seasoned grilled chicken.",
    description:
      "Flavourful West African rice cooked in a rich tomato and pepper sauce, served with well-seasoned chicken grilled perfectly. The smoky, party-style jollof everyone asks for.",
    art: "jollof-chicken",
    image: "/images/jollof-chicken.jpg",
    tags: ["bestseller", "spicy"],
    options: [spice, mainAddOns],
  },
  {
    slug: "jollof-rice-and-beef",
    name: "Jollof Rice & Beef",
    category: "flavour-packs",
    price: 22,
    blurb: "Our signature jollof with tender, peppered beef.",
    description:
      "Flavourful West African rice cooked in a rich tomato and pepper sauce, served with tender beef simmered and fried in pepper sauce.",
    art: "jollof-beef",
    image: "/images/jollof-tray.jpg",
    imagePosition: "50% 70%",
    tags: ["spicy"],
    options: [spice, mainAddOns],
  },
  {
    slug: "grilled-tilapia-and-fries",
    name: "Grilled Tilapia Fish & Fries",
    category: "flavour-packs",
    price: 20,
    blurb: "Grilled tilapia, spiced right, with crispy fries.",
    description:
      "Tilapia marinated in our house pepper spice and grilled until smoky and tender, served with golden fries.",
    art: "tilapia",
    tags: ["bestseller", "spicy"],
    options: [spice, mainAddOns],
  },
  {
    slug: "fried-plantain",
    name: "Plantain (Dodo)",
    category: "flavour-packs",
    price: 5,
    blurb: "Sweet ripe plantains fried until golden.",
    description:
      "Sweet ripe plantains, sliced and fried until golden and caramelised at the edges. The side that goes with everything.",
    art: "plantain",
    tags: ["vegetarian", "sweet"],
  },
  {
    slug: "puff-puff",
    name: "Puff Puff",
    category: "small-chops",
    price: 12,
    blurb: "Fluffy fried dough bites, lightly sweet.",
    description:
      "Fluffy bite-sized fried dough, lightly sweet and perfectly golden. Soft inside, crisp outside, and impossible to eat just one.",
    art: "puff-puff",
    image: "/images/puff-puff.jpg",
    imagePosition: "50% 75%",
    tags: ["bestseller", "vegetarian", "sweet"],
  },
  {
    slug: "meat-pie",
    name: "Meat Pie",
    category: "small-chops",
    price: 5,
    blurb: "Buttery pastry stuffed with seasoned beef.",
    description:
      "Savoury, buttery pastry stuffed with seasoned minced beef, carrots and potatoes. A Nigerian classic.",
    art: "meat-pie",
    image: "/images/meat-pie.jpg",
    imagePosition: "50% 22%",
    tags: ["bestseller"],
  },
  {
    slug: "gizdodo",
    name: "Gizdodo",
    category: "small-chops",
    price: 15,
    blurb: "Gizzard and fried plantain in a rich pepper sauce.",
    description:
      "A flavourful mix of gizzard and fried plantains sautéed in a rich pepper sauce. Sweet, spicy and savoury in every forkful.",
    art: "gizdodo",
    image: "/images/gizdodo.jpg",
    tags: ["spicy"],
    options: [spice],
  },
  {
    slug: "beef-kebab",
    name: "Beef Kebab",
    category: "small-chops",
    price: 6,
    blurb: "Grilled beef skewers with bold spices.",
    description:
      "Grilled beef skewers seasoned with bold spices for a smoky, savoury taste.",
    art: "kebab",
    image: "/images/party-tray.jpg",
    imagePosition: "50% 30%",
    tags: ["spicy"],
  },
  {
    slug: "chin-chin",
    name: "Chin Chin",
    category: "small-chops",
    price: 5,
    blurb: "Crunchy fried pastry snacks, lightly sweet.",
    description:
      "Crunchy, bite-sized fried pastry snacks with a light sweetness. The perfect snack, party favour or gift.",
    art: "chin-chin",
    image: "/images/chin-chin.jpg",
    tags: ["vegetarian", "sweet"],
  },
  {
    slug: "yogurt-parfait",
    name: "Parfait",
    category: "small-chops",
    price: 7,
    blurb: "Creamy yogurt, fresh fruit and crunchy granola.",
    description:
      "Layers of creamy yogurt, fresh fruits and crunchy granola. A light, sweet finish to any meal.",
    art: "parfait",
    tags: ["vegetarian", "sweet", "new"],
  },
  {
    slug: "zobo",
    name: "Zobo",
    category: "drinks",
    price: 4,
    blurb: "Refreshing hibiscus drink infused with fresh fruit.",
    description:
      "A refreshing hibiscus drink infused with fresh fruits, served chilled.",
    art: "zobo",
    image: "/images/zobo.jpg",
    imagePosition: "50% 70%",
    tags: ["bestseller", "vegetarian"],
  },
  {
    slug: "fruit-juice",
    name: "Fruit Juice",
    category: "drinks",
    price: 4,
    blurb: "Sweet, fruity and served chilled.",
    description: "Fruit juice, bottled and served chilled.",
    art: "juice",
    tags: ["vegetarian"],
  },
  {
    slug: "soft-drink",
    name: "Soft Drink",
    category: "drinks",
    price: 3,
    blurb: "An ice-cold can of your favourite fizzy drink.",
    description: "An ice-cold soft drink to go with your meal.",
    art: "soda",
    tags: ["vegetarian"],
  },
  {
    slug: "bottled-water",
    name: "Bottled Water",
    category: "drinks",
    price: 2,
    blurb: "Chilled bottled water.",
    description: "Chilled bottled water.",
    art: "water",
    tags: ["vegetarian"],
  },
  // Bulk food menu
  {
    slug: "jollof-rice-tray",
    name: "Jollof Rice Tray",
    category: "party-trays",
    price: 65,
    blurb: "Smoky party jollof by the tray, for a crowd.",
    description:
      "Our signature party jollof, cooked in a rich tomato and pepper sauce and packed in a foil tray. Pair it with chicken, beef or turkey for a full party spread.",
    art: "jollof-beef",
    image: "/images/jollof-tray.jpg",
    imagePosition: "50% 70%",
    options: [
      {
        id: "size",
        label: "Tray size",
        type: "single",
        required: true,
        choices: [
          { id: "medium", label: "Medium" },
          { id: "large", label: "Large", price: 25 },
          { id: "xlarge", label: "X-Large", price: 65 },
        ],
      },
    ],
  },
  {
    slug: "grilled-chicken-bulk",
    name: "Grilled Chicken",
    category: "party-trays",
    price: 30,
    blurb: "Well-seasoned grilled chicken, by the piece count.",
    description: "Well-seasoned chicken, grilled until smoky and golden. The perfect partner to a tray of jollof.",
    art: "turkey",
    image: "/images/party-tray.jpg",
    imagePosition: "50% 92%",
    options: [
      {
        id: "pieces",
        label: "How many pieces",
        type: "single",
        required: true,
        choices: [
          { id: "10", label: "10 pieces" },
          { id: "15", label: "15 pieces", price: 15 },
        ],
      },
    ],
  },
  {
    slug: "peppered-beef-bulk",
    name: "Peppered Beef",
    category: "party-trays",
    price: 35,
    blurb: "Tender beef simmered and fried in pepper sauce.",
    description: "Tender beef simmered, fried and tossed in a rich pepper sauce.",
    art: "jollof-beef",
    image: "/images/peppered-meat.jpg",
    tags: ["spicy"],
    options: [
      {
        id: "pieces",
        label: "How many pieces",
        type: "single",
        required: true,
        choices: [
          { id: "10", label: "10 pieces" },
          { id: "15", label: "15 pieces", price: 15 },
        ],
      },
    ],
  },
  {
    slug: "turkey-bulk",
    name: "Turkey, 15 pieces",
    category: "party-trays",
    price: 65,
    blurb: "Fifteen pieces of well-seasoned turkey.",
    description: "Fifteen pieces of well-seasoned turkey, cooked to order for your event.",
    art: "turkey",
  },
  {
    slug: "gizdodo-1l",
    name: "Gizdodo, 1 L",
    category: "party-trays",
    price: 30,
    blurb: "A litre of gizzard and plantain in pepper sauce.",
    description: "A one-litre pack of gizzard and fried plantain sautéed in our rich pepper sauce.",
    art: "gizdodo",
    image: "/images/gizdodo.jpg",
    tags: ["spicy"],
  },
  {
    slug: "meat-pies-10",
    name: "Meat Pies, 10 pieces",
    category: "party-trays",
    price: 45,
    blurb: "Ten buttery meat pies for sharing.",
    description: "Ten savoury, buttery pastries stuffed with seasoned beef, carrots and potatoes.",
    art: "meat-pie",
    image: "/images/meat-pie.jpg",
    imagePosition: "50% 22%",
  },
  {
    slug: "puff-puff-30",
    name: "Puff Puff, 30 pieces",
    category: "party-trays",
    price: 25,
    blurb: "Thirty fluffy, golden puff puff.",
    description: "Thirty fluffy, lightly sweet puff puff. Always the first thing to go at a party.",
    art: "puff-puff",
    image: "/images/puff-puff.jpg",
    imagePosition: "50% 75%",
    tags: ["vegetarian", "sweet"],
  },
  {
    slug: "beef-kebab-10",
    name: "Beef Kebab, 10 sticks",
    category: "party-trays",
    price: 55,
    blurb: "Ten grilled beef skewers with peppers and onions.",
    description: "Ten grilled beef skewers with peppers and onions, seasoned with bold spices.",
    art: "kebab",
    image: "/images/party-tray.jpg",
    imagePosition: "50% 30%",
    tags: ["spicy"],
  },
  {
    slug: "chin-chin-medium",
    name: "Chin Chin, medium",
    category: "party-trays",
    price: 40,
    blurb: "A medium pack of crunchy chin chin.",
    description: "A medium-size pack of crunchy, lightly sweet chin chin. Great for parties and gifting.",
    art: "chin-chin",
    image: "/images/chin-chin.jpg",
    tags: ["vegetarian", "sweet"],
  },
  {
    slug: "zobo-2l",
    name: "Zobo, 2 L",
    category: "party-trays",
    price: 25,
    blurb: "Two litres of chilled hibiscus drink.",
    description: "Two litres of our refreshing hibiscus drink infused with fresh fruits.",
    art: "zobo",
    image: "/images/zobo.jpg",
    imagePosition: "50% 70%",
    tags: ["vegetarian"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const productsIn = (category: CategoryId) => products.filter((p) => p.category === category);

export const bestsellers = () => products.filter((p) => p.tags?.includes("bestseller"));

/** True when the listed price is a starting price (a required choice adds to it). */
export const hasFromPrice = (p: Product) =>
  p.options?.some((o) => o.required && o.type === "single" && o.choices.some((c) => c.price)) ?? false;
