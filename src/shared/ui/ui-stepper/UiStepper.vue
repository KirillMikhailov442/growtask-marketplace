<template>
  <div class="ui-stepper">
    <button
      class="ui-stepper__button"
      type="button"
      aria-label="Уменьшить"
      :disabled="modelValue <= min"
      @click="$emit('update:modelValue', modelValue - 1)"
    >
      <UiIcon name="minus" size="16" />
    </button>
    <span class="ui-stepper__value">{{ modelValue }}</span>
    <button
      class="ui-stepper__button"
      type="button"
      aria-label="Увеличить"
      :disabled="modelValue >= max"
      @click="$emit('update:modelValue', modelValue + 1)"
    >
      <UiIcon name="plus" size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { UiIcon } from "../ui-icon";

interface Props {
  modelValue: number;
  min?: number;
  max?: number;
}

withDefaults(defineProps<Props>(), { min: 1, max: 99 });

defineEmits<{
  "update:modelValue": [value: number];
}>();
</script>

<style lang="scss" scoped>
.ui-stepper {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: var(--color-gray-bg);
  border-radius: var(--radius-md);

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 40px;
    color: var(--color-dark);
    transition: color var(--transition-fast);

    &:disabled {
      color: var(--color-text-muted);
      cursor: not-allowed;
    }
  }

  &__value {
    min-width: 34px;
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    color: var(--color-dark);
  }
}
</style>
