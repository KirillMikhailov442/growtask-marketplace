<template>
  <div class="cart-toolbar">
    <button class="cart-toolbar__select" type="button" @click="toggleAll(!allSelected)">
      <UiCheckbox :model-value="allSelected" @update:model-value="toggleAll($event)" />
      <span>Выбрать все</span>
    </button>
    <UiButton size="sm" @click="clear">
      <UiIcon name="trash" size="24" />
      Очистить корзину
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useCartStore } from "@features/cart/hooks";

import { UiButton, UiCheckbox, UiIcon } from "@shared/ui";

const store = useCartStore();
const { allSelected } = storeToRefs(store);
const { toggleAll, clear } = store;
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.cart-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;

  &__select {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding-inline: 8px;
    background-color: var(--color-gray-bg);
    border-radius: var(--radius-md);
    font-size: 14px;
    font-weight: 600;
    color: var(--color-black);
    transition: background-color var(--transition-fast);

    &:hover {
      background-color: #e6e6e6;
    }
  }

  @include down(tablet) {
    &__select span {
      display: none;
    }
  }
}
</style>
