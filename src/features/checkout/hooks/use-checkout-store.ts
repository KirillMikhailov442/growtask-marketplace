import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import { useCartStore } from "@features/cart";
import type { CheckoutForm } from "@features/checkout/types";

import type { CartItem } from "@entities/cart-item";

import { AppRouteName } from "@shared/config";
import { formatPrice } from "@shared/lib";

export const useCheckoutStore = defineStore("checkout", () => {
  const router = useRouter();
  const cart = useCartStore();

  const buildOrderPayload = (form: CheckoutForm) => ({
    user: {
      name: form.name.trim(),
      surname: form.surname.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      comment: form.comment.trim(),
      notifications: form.notifications,
    },
    payment_method: form.paymentMethod,
    promo_code: cart.promoCode,
    products: cart.selectedItems
      .filter((item: CartItem) => item.quantity > 0)
      .map(({ product, quantity }: CartItem) => ({
        id: product.id,
        name: product.title,
        price: product.price,
        old_price: product.oldPrice,
        sku: product.sku,
        quantity,
      })),
    totals: {
      goods: cart.goodsTotal,
      discount: cart.discount,
      total: cart.total,
      total_view: formatPrice(cart.total),
    },
  });

  const submit = (form: CheckoutForm) => {
    console.log(buildOrderPayload(form));

    router.push({ name: AppRouteName.CheckoutSuccess });
  };

  return {
    submit,
  };
});
