<template>
  <header class="header-market">
    <div class="header-market__inner container">
      <a class="header-market__logo" href="/">
        <MadeIn />
      </a>
      <button class="header-market__cart" type="button" @click="$router.push('/')">
        <UiIcon name="cart" size="24" />
        <span class="header-market__sum">{{ formatPrice(total) }}</span>
        <span v-if="itemsCount" class="header-market__badge">{{ itemsCount }}</span>
      </button>
    </div>
    <div class="header-market__compact">
      <button v-if="back" class="header-market__back" type="button" aria-label="Назад" @click="$emit('back')">
        <UiIcon name="arrowLeft" size="24" />
      </button>
      <span class="header-market__title">{{ title }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useCartStore } from "@features/cart";

import { formatPrice } from "@shared/lib";
import { MadeIn, UiIcon } from "@shared/ui";

interface Props {
  title?: string;
  back?: boolean;
}

withDefaults(defineProps<Props>(), { title: "Корзина", back: false });

defineEmits<{
  back: [];
}>();

const store = useCartStore();
const { itemsCount, total } = storeToRefs(store);
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.header-market {
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height);
    border-bottom: 2px solid var(--color-divider);

    @include down(tablet) {
      display: none;
    }
  }

  &__logo {
    display: flex;
  }

  &__cart {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    width: 92px;
    height: 48px;
    background-color: var(--color-gray-bg);
    border-radius: 16px;
    color: var(--color-accent-dark);
    transition: background-color var(--transition-fast);

    &:hover {
      background-color: #e6e6e6;
    }
  }

  &__sum {
    font-size: 12px;
    line-height: 1.2;
    font-weight: 600;
  }

  &__badge {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 16px;
    padding-inline: 4px;
    background-color: var(--color-danger);
    border-radius: 50%;
    font-size: 11px;
    color: #ffffff;
  }

  &__compact {
    display: none;
    position: relative;
    align-items: center;
    gap: 8px;
    height: 64px;
    padding: 8px 8px 8px 12px;

    &::after {
      content: "";
      position: absolute;
      right: 8px;
      bottom: 0;
      left: 8px;
      height: 2px;
      background-color: var(--color-divider);
    }

    @include down(tablet) {
      display: flex;
    }
  }

  &__back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    color: var(--color-black);

    @include down(tablet) {
      background-color: var(--color-black);
      border-radius: var(--radius-md);
      color: #ffffff;
    }
  }

  &__title {
    font-size: 16px;
    line-height: 1.5;
    font-weight: 700;
    color: var(--color-dark);
  }
}
</style>
