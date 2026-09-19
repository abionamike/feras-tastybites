// Menu and prices from the Feras Tasty Bites menu list.
// To use a real photo for an item, put it in /public/images/products and set `image`.

export type CategoryId = "flavour-packs" | "small-chops" | "drinks";

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
  | "water";

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
  image?: string;
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
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const productsIn = (category: CategoryId) => products.filter((p) => p.category === category);

export const bestsellers = () => products.filter((p) => p.tags?.includes("bestseller"));
