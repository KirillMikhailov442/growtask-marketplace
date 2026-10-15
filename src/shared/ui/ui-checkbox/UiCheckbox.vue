<template>
  <input
    class="ui-checkbox"
    type="checkbox"
    :checked="modelValue"
    :aria-label="ariaLabel"
    @change="onChange"
    @click.stop
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  ariaLabel?: string;
}

withDefaults(defineProps<Props>(), { modelValue: false, ariaLabel: undefined });

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const onChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
};
</script>

<style lang="scss" scoped>
.ui-checkbox {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin: 0;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 16px 16px;
  border-radius: var(--radius-sm);
  box-shadow: inset 0 0 0 1.5px #999999;
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    box-shadow var(--transition-fast);

  &:checked {
    background-color: var(--color-accent);
    box-shadow: inset 0 0 0 1.5px var(--color-accent);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
