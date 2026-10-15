<template>
  <article class="cart-item">
    <div class="cart-item__about">
      <div class="cart-item__media">
        <UiCheckbox class="cart-item__check" :model-value="item.selected" @update:model-value="emit('toggle')" />
        <div class="cart-item__image">
          <img :src="item.product.image" :alt="item.product.title" loading="lazy" />
        </div>
      </div>
      <div class="cart-item__info">
        <span class="cart-item__sku">{{ item.product.sku }}</span>
        <span class="cart-item__title">{{ item.product.title }}</span>
      </div>
    </div>
    <div class="cart-item__panel">
      <div class="cart-item__price">
        <span class="cart-item__value">{{ formatPrice(positionTotal) }}</span>
        <span class="cart-item__old">
          {{ item.product.oldPrice ? formatPrice(item.product.oldPrice * item.quantity) : "" }}
        </span>
      </div>
      <div class="cart-item__controls">
        <div class="cart-item__stepper-col">
          <UiStepper
            :model-value="item.quantity"
            :min="1"
            :max="item.product.maxQuantity || 1"
            @update:model-value="emit('change', $event)"
          />
          <span class="cart-item__amount">{{ formatPrice(item.product.price) }}</span>
        </div>
        <button class="cart-item__remove" type="button" aria-label="Удалить товар" @click="emit('remove')">
          <UiIcon name="trash" size="24" />
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { CartItem } from "@entities/cart-item";

import { formatPrice } from "@shared/lib";
import { UiCheckbox, UiIcon, UiStepper } from "@shared/ui";

const props = defineProps<{ item: CartItem }>();

const emit = defineEmits<{
  toggle: [];
  change: [quantity: number];
  remove: [];
}>();

const positionTotal = computed(() => props.item.product.price * props.item.quantity);
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.cart-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  min-height: 104px;

  &__about {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    flex-grow: 1;
  }

  &__media {
    position: relative;
    width: 90px;
    height: 90px;
    flex-shrink: 0;
  }

  &__check {
    position: absolute;
    top: 4px;
    left: 4px;
    z-index: 1;
  }

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: var(--color-gray-bg);
    border-radius: var(--radius-md);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-top: 2px;
  }

  &__sku {
    font-size: 11px;
    line-height: 1.1;
    color: var(--color-text-secondary);
  }

  &__title {
    font-size: 16px;
    line-height: 1.5;
    font-weight: 700;
    color: var(--color-dark);
  }

  &__panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    width: 126px;
    flex-shrink: 0;
    padding-top: 2px;
  }

  &__price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0;
  }

  &__value {
    font-size: 16px;
    line-height: 1.5;
    font-weight: 700;
    color: var(--color-black);
  }

  &__old {
    display: block;
    min-height: 12px;
    font-size: 11px;
    line-height: 1.1;
    color: var(--color-text-muted);
  }

  &__controls {
    display: flex;
    align-items: flex-start;
    gap: 4px;
  }

  &__stepper-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  &__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--color-gray-bg);
    border-radius: var(--radius-md);
    color: var(--color-dark);
    transition: background-color var(--transition-fast);

    &:hover {
      background-color: #e6e6e6;
    }
  }

  &__amount {
    font-size: 9px;
    line-height: 1.15;
    color: var(--color-text-muted);
  }
}

@include down(tablet) {
  .cart-item {
    flex-direction: column;

    &__panel {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      padding-top: 0;
    }

    &__price {
      align-items: flex-start;
      order: -1;
    }
  }
}
</style>
