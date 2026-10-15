<template>
  <section class="payment-methods">
    <h2 class="payment-methods__title">Способ оплаты</h2>
    <p class="payment-methods__subtitle">Выберите удобный способ оплаты заказа</p>
    <div class="payment-methods__list" role="radiogroup">
      <label
        v-for="method in paymentMethods"
        :key="method.id"
        class="payment-methods__method"
        :class="{ 'payment-methods__method--checked': modelValue === method.id }"
      >
        <span class="payment-methods__method-icon">
          <UiIcon :name="method.icon" size="24" />
        </span>
        <span class="payment-methods__method-body">
          <span class="payment-methods__method-title">{{ method.title }}</span>
          <span class="payment-methods__method-desc">{{ method.description }}</span>
        </span>
        <span class="payment-methods__method-radio" aria-hidden="true" />
        <input
          class="visually-hidden"
          type="radio"
          name="payment-method"
          :value="method.id"
          :checked="modelValue === method.id"
          @change="emit('update:modelValue', method.id)"
        />
      </label>
    </div>
    <div class="payment-methods__note">
      <UiIcon name="info" size="24" />
      <span>При оформлении заказа вы будете перенаправлены на страницу платёжной системы</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { paymentMethods } from "@features/checkout/model";

import { UiIcon } from "@shared/ui";

interface Props {
  modelValue?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.payment-methods {
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

  &__subtitle {
    margin-top: 8px;
    font-size: 16px;
    line-height: 1.5;
    color: var(--color-text-secondary);
  }

  &__list {
    display: flex;
    gap: 12px;
    margin-top: 20px;
  }

  &__method {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    flex: 1 1 0;
    padding: 18px;
    background-color: var(--color-gray-bg);
    border: 2px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition:
      border-color var(--transition-fast),
      background-color var(--transition-fast);

    &--checked {
      border-color: var(--color-accent);
    }
  }

  &__method-icon {
    color: var(--color-black);
  }

  &__method--checked &__method-icon {
    color: var(--color-accent);
  }

  &__method-body {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__method-title {
    font-size: 16px;
    line-height: 1.5;
    font-weight: 700;
    color: var(--color-dark);
  }

  &__method-desc {
    font-size: 13px;
    line-height: 1.5;
    color: var(--color-text-muted);
  }

  &__method-radio {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    margin-left: auto;
    border: 2px solid var(--color-text-muted);
    border-radius: 50%;

    &::after {
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: transparent;
      transition: background-color var(--transition-fast);
    }
  }

  &__method--checked &__method-radio {
    border-color: var(--color-accent);

    &::after {
      background-color: var(--color-accent);
    }
  }

  &__note {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-top: 20px;
    padding-top: 12px;
    border-top: 2px solid var(--color-divider);
    font-size: 16px;
    line-height: 1.5;
    color: var(--color-text-secondary);

    svg {
      flex-shrink: 0;
      color: var(--color-text-muted);
    }
  }

  @include down(tablet) {
    padding: 20px;

    &__list {
      flex-direction: column;
    }
  }
}
</style>
