import type { ApiProduct } from "@shared/api";

import type { Product } from "../types";

export const mapApiProduct = (raw: ApiProduct): Product => ({
  id: raw.id,
  title: raw.name,
  image: raw.image.replace(/^http:\/\//, "https://"),
  price: raw.price,
  oldPrice: raw.old_price,
  sku: raw.sku,
  maxQuantity: raw.quantity,
});
