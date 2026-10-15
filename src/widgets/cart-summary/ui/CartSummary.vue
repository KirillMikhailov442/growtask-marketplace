<template>
  <aside class="cart-summary">
    <h2 class="cart-summary__title">{{ title }}</h2>
    <dl class="cart-summary__rows">
      <div class="cart-summary__row">
        <dt>{{ itemsCount }} {{ itemsPlural }}:</dt>
        <dd>{{ formatPrice(goodsTotal) }}</dd>
      </div>
      <div class="cart-summary__divider" aria-hidden="true"></div>
      <div class="cart-summary__row cart-summary__row--discount">
        <dt>Скидка:</dt>
        <dd>{{ formatPrice(discount) }}</dd>
      </div>
      <div class="cart-summary__divider" aria-hidden="true"></div>
      <div class="cart-summary__row cart-summary__row--total">
        <dt>Итого:</dt>
        <dd>{{ formatPrice(total) }}</dd>
      </div>
      <div class="cart-summary__divider" aria-hidden="true"></div>
    </dl>
    <UiButton
      class="cart-summary__action"
      variant="primary"
      size="md"
      :disabled="itemsCount === 0 || actionDisabled"
      @click="$emit('action')"
    >
      {{ actionText }}
      <UiIcon v-if="arrow" name="arrowRight" size="24" />
    </UiButton>
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useCartStore } from "@features/cart";

import { formatPlural, formatPrice } from "@shared/lib";
import { UiButton, UiIcon } from "@shared/ui";

interface Props {
  title?: string;
  actionText?: string;

  arrow?: boolean;

  actionDisabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: "Ваша корзина:",
  actionText: "К оформлению",
  arrow: false,
  actionDisabled: false,
});

defineEmits<{
  action: [];
}>();

const store = useCartStore();
const { itemsCount, goodsTotal, discount, total } = storeToRefs(store);

const itemsPlural = computed(() => formatPlural(itemsCount.value, ["товар", "товара", "товаров"]));
</script>

<style lang="scss" scoped>
.cart-summary {
  padding: 20px;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);

  &__title {
    margin-bottom: 20px;
    font-family: var(--font-heading);
    font-size: 24px;
    line-height: 1.1;
    font-weight: 700;
    color: var(--color-dark);
  }

  &__rows {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 8px;
  }

  &__divider {
    flex-shrink: 0;
    height: 2px;
    background-color: var(--color-divider);
  }

  &__row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 4px;
    min-height: 20px;
    font-size: 13px;
    line-height: 1.5;

    dt {
      color: var(--color-text-secondary);
    }

    dd {
      color: var(--color-black);
    }

    &--discount {
      dd {
        font-weight: 700;
        color: var(--color-danger);
      }
    }

    &--total {
      min-height: 22px;

      dt,
      dd {
        font-family: var(--font-heading);
        font-size: 20px;
        line-height: 1.1;
        font-weight: 700;
        color: var(--color-black);
      }
    }
  }

  &__action {
    width: 100%;
    margin-top: 12px;
  }
}
</style>
