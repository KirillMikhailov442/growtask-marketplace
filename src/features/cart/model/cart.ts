import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

import type { CartState } from "@features/cart/types";

import type { CartItem } from "@entities/cart-item";
import type { Product } from "@entities/product";

export const PROMO_DISCOUNTS: Record<string, number> = {
  GROWTASK2026: 10,
};

const STORAGE_KEY = "growtask-cart";

const loadState = (): CartState => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);

    if (raw) return JSON.parse(raw) as CartState;
  } catch (error) {
    console.error("Не удалось прочитать сохранённую корзину", error);
    return { items: [], promoCode: null };
  }

  return { items: [], promoCode: null };
};

export const useCartStore = defineStore("cart", () => {
  const savedState = loadState();

  const items = ref<CartItem[]>(savedState.items);
  const promoCode = ref<string | null>(savedState.promoCode);

  const selectedItems = computed(() => items.value.filter((item) => item.selected));

  const itemsCount = computed(() => selectedItems.value.reduce((sum, item) => sum + item.quantity, 0));

  const goodsTotal = computed(() =>
    selectedItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  const goodsDiscount = computed(() =>
    selectedItems.value.reduce((sum, item) => {
      if (!item.product.oldPrice) return sum;
      return sum + (item.product.oldPrice - item.product.price) * item.quantity;
    }, 0)
  );

  const promoDiscount = computed(() => {
    const rate = promoCode.value ? (PROMO_DISCOUNTS[promoCode.value] ?? 0) / 100 : 0;
    return Math.round(goodsTotal.value * rate);
  });

  const discount = computed(() => goodsDiscount.value + promoDiscount.value);

  const total = computed(() => goodsTotal.value - discount.value);

  const allSelected = computed(() => items.value.length > 0 && items.value.every((item) => item.selected));

  watch(
    () => JSON.stringify({ items: items.value, promoCode: promoCode.value }),
    (value) => {
      sessionStorage.setItem(STORAGE_KEY, value);
    }
  );

  const findItem = (id: number) => items.value.find((item) => item.product.id === id);

  const initItems = (products: Product[]) => {
    items.value = products.map((product) => ({
      product,
      quantity: 1,
      selected: true,
    }));
  };

  // Обновляет данные товаров из API, сохраняя пользовательское
  // состояние корзины (количество, выделение) и добавляя новые товары
  const syncItems = (products: Product[]) => {
    const savedById = new Map(items.value.map((item) => [item.product.id, item]));

    items.value = products.map((product) => {
      const saved = savedById.get(product.id);

      return {
        product,
        quantity: saved?.quantity ?? 1,
        selected: saved?.selected ?? true,
      };
    });
  };

  const setQuantity = (id: number, quantity: number) => {
    const item = findItem(id);

    if (!item) return;

    const maxQuantity = Math.max(item.product.maxQuantity, 1);

    item.quantity = Math.max(1, Math.min(quantity, maxQuantity));
  };

  const incrementQuantity = (id: number) => {
    const item = findItem(id);

    if (item) setQuantity(id, item.quantity + 1);
  };

  const decrementQuantity = (id: number) => {
    const item = findItem(id);

    if (item) setQuantity(id, item.quantity - 1);
  };

  const removeItem = (id: number) => {
    items.value = items.value.filter((item) => item.product.id !== id);
  };

  const removeSelected = () => {
    items.value = items.value.filter((item) => !item.selected);
  };

  const clear = () => {
    items.value = [];
  };

  const toggleSelected = (id: number) => {
    const item = findItem(id);

    if (item) item.selected = !item.selected;
  };

  const toggleAll = (value: boolean) => {
    items.value.forEach((item) => {
      item.selected = value;
    });
  };

  const applyPromo = (code: string) => {
    const normalized = code.trim().toUpperCase();

    if (!(normalized in PROMO_DISCOUNTS)) return false;

    promoCode.value = normalized;

    return true;
  };

  const resetPromo = () => {
    promoCode.value = null;
  };

  return {
    items,
    promoCode,
    itemsCount,
    goodsTotal,
    goodsDiscount,
    promoDiscount,
    discount,
    total,
    selectedItems,
    allSelected,
    initItems,
    syncItems,
    setQuantity,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    removeSelected,
    clear,
    toggleSelected,
    toggleAll,
    applyPromo,
    resetPromo,
  };
});
