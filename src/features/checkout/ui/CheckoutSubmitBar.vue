<template>
  <div class="submit-bar">
    <UiButton variant="primary" size="md" type="submit" :disabled="disabled"> Оформить заказ </UiButton>
    <p class="submit-bar__note">
      <UiIcon name="info" size="24" />
      <span v-if="valid">Вы указали все необходимые данные, теперь можно оформить заказ</span>
      <span v-else>Заполните обязательные поля: имя и фамилия</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { UiButton, UiIcon } from "@shared/ui";

interface Props {
  disabled?: boolean;
  valid: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
});
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.submit-bar {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-divider);

  &__note {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    line-height: 1.5;
    color: var(--color-text-muted);

    svg {
      flex-shrink: 0;
      color: var(--color-text-muted);
    }
  }

  @include down(tablet) {
    display: none;
  }
}
</style>
