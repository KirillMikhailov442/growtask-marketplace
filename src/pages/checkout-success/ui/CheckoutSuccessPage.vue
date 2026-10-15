<template>
  <div class="checkout-success-page">
    <HeaderMarket title="Статус заказа" />
    <main class="checkout-success-page__body container">
      <Breadcrumbs
        :links="[
          { title: 'Корзина', to: '/cart' },
          { title: 'Оформление заказа', to: '/checkout' },
          { title: 'Статус заказа' },
        ]"
      />
      <div class="checkout-success-page__content">
        <span class="checkout-success-page__icon">
          <UiIcon name="check" size="40" />
        </span>
        <h1 class="checkout-success-page__title">Заказ №001 успешно создан</h1>
        <p class="checkout-success-page__text">Статус заказа вы можете отслеживать в личном кабинете</p>
        <UiButton variant="primary" size="md" @click="$router.push({ name: AppRouteName.Cart })"> В корзину </UiButton>
      </div>
    </main>
    <FooterMarket />
  </div>
</template>

<script setup lang="ts">
import { Breadcrumbs } from "@widgets/breadcrumbs";
import { FooterMarket } from "@widgets/footer-market";
import { HeaderMarket } from "@widgets/header-market";

import { AppRouteName } from "@shared/config";
import { UiButton, UiIcon } from "@shared/ui";
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.checkout-success-page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &__body {
    flex-grow: 1;
    padding-top: 20px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-block: 160px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background-color: var(--color-success-bg);
    border-radius: 16px;
    color: var(--color-success);
  }

  &__title {
    margin-top: 40px;
    font-family: var(--font-heading);
    font-size: 28px;
    line-height: 1.1;
    font-weight: 700;
    color: var(--color-dark);
  }

  &__text {
    margin-top: 12px;
    font-size: 16px;
    color: var(--color-text-secondary);
  }

  &__content .ui-button {
    margin-top: 40px;
  }
}
</style>
