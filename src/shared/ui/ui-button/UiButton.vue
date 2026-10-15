<template>
  <button class="ui-button" :class="[`ui-button--${variant}`, `ui-button--${size}`]" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "dark";
  size?: "sm" | "md";
  type?: "button" | "submit";
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "secondary",
  size: "sm",
  type: "button",
  disabled: false,
});
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--radius-md);
  font-weight: 600;
  white-space: nowrap;
  transition:
    background-color var(--transition-fast),
    opacity var(--transition-fast);

  &--primary {
    background-color: var(--color-accent);
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #d92647;
    }
  }

  &--secondary {
    background-color: var(--color-gray-bg);
    color: var(--color-black);

    &:hover:not(:disabled) {
      background-color: #e6e6e6;
    }
  }

  &--dark {
    background-color: var(--color-black);
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #333333;
    }
  }

  &--sm {
    height: 40px;
    padding: 0 16px 0 12px;
    font-size: 14px;
  }

  &--md {
    height: 48px;
    padding-inline: 20px;
    font-size: 16px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
