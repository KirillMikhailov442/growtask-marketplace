<template>
  <section class="promocode">
    <button class="promocode__header" type="button" :aria-expanded="open" @click="open = !open">
      <UiIcon name="ticket" size="24" />
      <span class="promocode__name">Промокод</span>
      <UiIcon :name="open ? 'chevronUp' : 'chevronDown'" size="24" />
    </button>
    <div v-show="open" class="promocode__body">
      <UiInput
        v-model="code"
        label="Промокод"
        placeholder="Введите промокод"
        clearable
        @update:model-value="error = false"
      />
      <p v-if="promoCode" class="promocode__success">
        Промокод {{ promoCode }} применён: −{{ PROMO_DISCOUNTS[promoCode] }}%
      </p>
      <p v-else-if="error" class="promocode__error">Такого промокода не существует</p>
      <UiButton class="promocode__apply" variant="dark" size="md" @click="onApply"> Применить </UiButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

import { PROMO_DISCOUNTS, useCartStore } from "@features/cart";

import { UiButton, UiIcon, UiInput } from "@shared/ui";

const STORAGE_KEY = "growtask-promocode-open";

const loadOpenState = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "false";
  } catch (error) {
    console.error("localStorage недоступен", error);
    return true;
  }
};

const store = useCartStore();
const { promoCode } = storeToRefs(store);
const { applyPromo } = store;

const code = ref("");
const error = ref(false);
const open = ref(loadOpenState());

watch(open, (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch (error) {
    console.error("localStorage недоступен — состояние не сохранено", error);
  }
});

const onApply = () => {
  if (!code.value.trim()) return;
  error.value = !applyPromo(code.value);
};
</script>

<style lang="scss" scoped>
.promocode {
  margin-top: 12px;

  &__header {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    height: 48px;
    color: var(--color-dark);
  }

  &__name {
    flex-grow: 1;
    text-align: left;
    font-size: 16px;
    font-weight: 600;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 8px;
  }

  &__success {
    font-size: 12px;
    color: var(--color-success);
  }

  &__error {
    font-size: 12px;
    color: var(--color-danger);
  }

  &__apply {
    width: 100%;
    font-weight: 700;
  }
}
</style>
