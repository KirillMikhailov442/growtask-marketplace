<template>
  <label class="ui-input">
    <span v-if="error || label" class="ui-input__label" :class="{ 'ui-input__label--error': error }">
      {{ error || label }}
    </span>
    <span class="ui-input__field" :class="{ 'ui-input__field--focused': focused, 'ui-input__field--error': error }">
      <UiIcon v-if="icon" :name="icon" size="20" class="ui-input__icon" />
      <input
        class="ui-input__input"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="focused = true"
        @blur="focused = false"
      />
      <button
        v-if="clearable && modelValue"
        class="ui-input__clear"
        type="button"
        tabindex="-1"
        @mousedown.prevent
        @click.stop="$emit('update:modelValue', '')"
      >
        <UiIcon name="close" size="24" />
      </button>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { UiIcon } from "../ui-icon";

interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  clearable?: boolean;
  error?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  placeholder: "",
  icon: "",
  clearable: false,
  error: "",
});

defineEmits<{
  "update:modelValue": [value: string];
}>();

const focused = ref(false);
</script>

<style lang="scss" scoped>
.ui-input {
  display: flex;
  flex-direction: column;
  gap: 2px;

  &__label {
    font-size: 11px;
    line-height: 16px;
    color: var(--color-text-muted);

    &--error {
      color: var(--color-danger);
    }
  }

  &__field {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 48px;
    padding-inline: 12px;
    background-color: var(--color-gray-bg);
    border-radius: var(--radius-md);
    transition: box-shadow var(--transition-fast);

    &--focused {
      box-shadow: inset 0 0 0 1.5px var(--color-text-muted);
    }
  }

  &__icon {
    color: var(--color-text-muted);
  }

  &__input {
    flex-grow: 1;
    min-width: 0;
    border: none;
    background: none;
    outline: none;
    font-size: 16px;
    color: var(--color-black);

    &::placeholder {
      color: var(--color-text-muted);
    }
  }

  &__clear {
    display: flex;
    color: var(--color-text-muted);
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-black);
    }
  }
}
</style>
