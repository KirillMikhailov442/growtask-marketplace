<template>
  <section class="order-items">
    <h2 class="order-items__title">{{ count }} {{ plural }}</h2>
    <ul class="order-items__thumbs">
      <li v-for="item in items" :key="item.product.id" class="order-items__thumb">
        <img :src="item.product.image" :alt="item.product.title" loading="lazy" />
        <span class="order-items__thumb-badge">{{ item.quantity }}</span>
      </li>
    </ul>
    <UiButton size="sm" @click="$emit('back')">
      <UiIcon name="arrowLeft" size="24" />
      Вернуться в корзину
    </UiButton>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { CartItem } from "@entities/cart-item";

import { formatPlural } from "@shared/lib";
import { UiButton, UiIcon } from "@shared/ui";

interface Props {
  items: CartItem[];
  count: number;
}

const props = defineProps<Props>();

defineEmits<{
  back: [];
}>();

const plural = computed(() => formatPlural(props.count, ["товар", "товара", "товаров"]));
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.order-items {
  padding: 40px;
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);

  &__title {
    font-family: var(--font-heading);
    font-size: 24px;
    line-height: 1.1;
    font-weight: 700;
    color: var(--color-dark);
  }

  &__thumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 20px;
  }

  &__thumb {
    position: relative;
    width: 90px;
    height: 90px;
    background-color: var(--color-gray-bg);
    border-radius: var(--radius-md);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__thumbs + .ui-button {
    margin-top: 20px;
  }

  &__thumb-badge {
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    align-items: center;
    height: 20px;
    padding-inline: 8px;
    background-color: var(--color-black);
    border-radius: var(--radius-md);
    font-size: 11px;
    color: #ffffff;
  }

  @include down(tablet) {
    padding: 20px;

    &__thumbs {
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__thumb {
      flex-shrink: 0;
      width: 64px;
      height: 64px;
    }

    .ui-button {
      width: 100%;
    }
  }
}
</style>
