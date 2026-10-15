import type { CartItem } from "@entities/cart-item";

export interface CartState {
  items: CartItem[];
  promoCode: string | null;
}

export type { CartItem };
