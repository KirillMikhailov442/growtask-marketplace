export interface ApiProduct {
  id: number;
  name: string;
  price: number;
  old_price: number | null;
  image: string;
  sku: string;
  quantity: number;
}

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice: number | null;
  sku: string;
  maxQuantity: number;
}

export const FALLBACK_IMAGE = "/test-assets/product-fallback.png";

export const apiProducts: ApiProduct[] = [
  {
    id: 1,
    name: "Смарт-часы Watch Pro 2, 46 мм, серый",
    price: 12990,
    old_price: 15990,
    image: FALLBACK_IMAGE,
    sku: "WP2-46-GRY",
    quantity: 10,
  },
  {
    id: 2,
    name: "Наушники беспроводные AirSound Max, чёрные",
    price: 7490,
    old_price: null,
    image: FALLBACK_IMAGE,
    sku: "ASM-BLK",
    quantity: 5,
  },
  {
    id: 3,
    name: "Клавиатура механическая Type75, белая",
    price: 11250,
    old_price: 13400,
    image: FALLBACK_IMAGE,
    sku: "T75-WHT",
    quantity: 3,
  },
];

export const mappedProducts: Product[] = apiProducts.map((raw) => ({
  id: raw.id,
  title: raw.name,
  image: raw.image,
  price: raw.price,
  oldPrice: raw.old_price,
  sku: raw.sku,
  maxQuantity: raw.quantity,
}));
