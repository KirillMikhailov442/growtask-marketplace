<template>
  <ul class="cart-list">
    <li v-for="item in items" :key="item.product.id">
      <CartItemCard
        :item="item"
        @toggle="toggleSelected(item.product.id)"
        @change="setQuantity(item.product.id, $event)"
        @remove="removeItem(item.product.id)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useCartStore } from "@features/cart/hooks";

import { CartItemCard } from "@entities/cart-item";

const store = useCartStore();
const { items } = storeToRefs(store);
const { toggleSelected, setQuantity, removeItem } = store;
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.cart-list {
  margin-top: 20px;

  li {
    padding-bottom: 20px;
    border-bottom: 2px solid var(--color-divider);
  }

  li + li {
    margin-top: 20px;
  }
}
</style>
