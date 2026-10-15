<template>
  <div class="cart-page">
    <HeaderMarket />
    <main class="cart-page__body container">
      <Breadcrumbs :links="[{ title: 'Корзина' }]" />
      <div class="cart-page__head">
        <h1 class="cart-page__title">Корзина</h1>
        <span class="cart-page__count">{{ itemsCount }} шт.</span>
      </div>
      <div v-if="items.length" class="cart-page__grid">
        <section class="cart-page__products">
          <CartToolbar />
          <CartItemList />
        </section>
        <aside class="cart-page__aside">
          <CartSummary arrow @action="$router.push({ name: AppRouteName.Checkout })" />
          <PromocodeBlock />
        </aside>
      </div>
      <CartEmpty v-else />
    </main>
    <FooterMarket />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted } from "vue";

import { Breadcrumbs } from "@widgets/breadcrumbs";
import { CartSummary } from "@widgets/cart-summary";
import { FooterMarket } from "@widgets/footer-market";
import { HeaderMarket } from "@widgets/header-market";
import { PromocodeBlock } from "@widgets/promocode-block";

import { CartEmpty, CartItemList, CartToolbar, useCartStore } from "@features/cart";

import { mapApiProduct } from "@entities/product";

import { fetchProducts } from "@shared/api";
import { AppRouteName } from "@shared/config";

const store = useCartStore();
const { items, itemsCount } = storeToRefs(store);
const { syncItems } = store;

const controller = new AbortController();

onMounted(async () => {
  try {
    syncItems((await fetchProducts(controller.signal)).map(mapApiProduct));
  } catch (error) {
    console.error("Не удалось загрузить корзину", error);
  }
});

onBeforeUnmount(() => controller.abort());
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.cart-page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &__body {
    flex-grow: 1;
    padding-top: 20px;
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
  }

  &__title {
    font-family: var(--font-heading);
    font-size: 28px;
    line-height: 1.1;
    font-weight: 700;
    color: var(--color-black);
  }

  &__count {
    padding: 4px 8px;
    background-color: var(--color-gray-bg);
    border-radius: var(--radius-md);
    font-size: 11px;
    line-height: 1.45;
    color: var(--color-text-secondary);
  }

  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 20px;
    align-items: start;
    margin-top: 12px;
  }

  &__products {
    padding-right: 20px;
  }

  &__aside {
    position: sticky;
    top: 16px;
    display: flex;
    flex-direction: column;
  }

  @include down(laptop) {
    &__grid {
      grid-template-columns: minmax(0, 1fr) 304px;
    }
  }

  @include down(tablet) {
    &__grid {
      grid-template-columns: minmax(0, 1fr);
    }

    &__products {
      padding-right: 0;
    }

    &__aside {
      position: static;
    }
  }
}
</style>
