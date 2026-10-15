<template>
  <section class="buyer-form">
    <h2 class="buyer-form__title">Покупатель</h2>
    <p class="buyer-form__subtitle">Укажите свои данные для покупки наших товаров</p>
    <div class="buyer-form__fields">
      <UiInput
        :model-value="name"
        label="Имя*"
        placeholder="Иван"
        :error="errors.name"
        clearable
        @update:model-value="emit('update:name', $event)"
      />
      <UiInput
        :model-value="surname"
        label="Фамилия*"
        placeholder="Иванов"
        :error="errors.surname"
        clearable
        @update:model-value="emit('update:surname', $event)"
      />
      <UiInputPhone
        :model-value="phone"
        label="Телефон"
        placeholder="+7 800 555 35 35"
        :error="errors.phone"
        @update:model-value="emit('update:phone', $event)"
      />
      <UiInput
        :model-value="email"
        label="Почта"
        icon="mail"
        placeholder="mail@example.com"
        :error="errors.email"
        clearable
        @update:model-value="emit('update:email', $event)"
      />
    </div>
    <div class="buyer-form__note buyer-form__note--split">
      <UiIcon name="info" size="24" />
      <span>Внимательно проверьте контактные данные, они нужны для получения заказа</span>
    </div>
    <div class="buyer-form__comment">
      <span class="buyer-form__label">Комментарий к заказу</span>
      <textarea
        :value="comment"
        class="buyer-form__textarea"
        placeholder="Напишите свои пожелания..."
        @input="emit('update:comment', ($event.target as HTMLTextAreaElement).value)"
      />
    </div>
    <label class="buyer-form__notifications">
      <UiCheckbox :model-value="notifications" @update:model-value="emit('update:notifications', $event as boolean)" />
      <span>Хочу получать уведомления о скидках и специальных предложениях</span>
    </label>
  </section>
</template>

<script setup lang="ts">
import { UiCheckbox, UiIcon, UiInput, UiInputPhone } from "@shared/ui";

interface Props {
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
  comment?: string;
  notifications?: boolean;
  errors?: {
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
  };
}

withDefaults(defineProps<Props>(), {
  name: "",
  surname: "",
  phone: "",
  email: "",
  comment: "",
  notifications: false,
  errors: () => ({}),
});

const emit = defineEmits<{
  "update:name": [value: string];
  "update:surname": [value: string];
  "update:phone": [value: string];
  "update:email": [value: string];
  "update:comment": [value: string];
  "update:notifications": [value: boolean];
}>();
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.buyer-form {
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

  &__fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 20px;
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

    &--split {
      padding-bottom: 12px;
      border-bottom: 2px solid var(--color-divider);
    }
  }

  &__comment {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 20px;
  }

  &__label {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  &__textarea {
    height: 96px;
    padding: 12px;
    background-color: var(--color-gray-bg);
    border: none;
    border-radius: var(--radius-md);
    resize: none;
    outline: none;
    font: inherit;
    color: var(--color-black);

    &::placeholder {
      color: var(--color-text-muted);
    }
  }

  &__notifications {
    display: none;
    align-items: flex-start;
    gap: 8px;
    margin-top: 20px;
    font-size: 14px;
    color: var(--color-dark);
    cursor: pointer;

    @include down(tablet) {
      display: flex;
    }
  }

  @include down(tablet) {
    padding: 20px;

    &__fields {
      grid-template-columns: minmax(0, 1fr);
    }
  }
}
</style>
