import { createRouter, createWebHistory } from "vue-router";

import { CartPage } from "@pages/cart";
import { CheckoutPage } from "@pages/checkout";
import { CheckoutSuccessPage } from "@pages/checkout-success";

import { AppRoute, AppRouteName } from "@shared/config";
import { usePageMeta } from "@shared/hooks";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: { name: AppRouteName.Cart } },
    {
      path: AppRoute.Cart,
      name: AppRouteName.Cart,
      component: CartPage,
      meta: { title: "Корзина" },
    },
    {
      path: AppRoute.Checkout,
      name: AppRouteName.Checkout,
      component: CheckoutPage,
      meta: { title: "Оформление заказа" },
    },
    {
      path: AppRoute.CheckoutSuccess,
      name: AppRouteName.CheckoutSuccess,
      component: CheckoutSuccessPage,
      meta: { title: "Заказ оформлен" },
    },
  ],
});

usePageMeta(router);
