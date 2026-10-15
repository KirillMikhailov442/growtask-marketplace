<template>
  <div class="checkout-page">
    <HeaderMarket title="Оформление заказа" back @back="$router.push({ name: AppRouteName.Cart })" />
    <main class="checkout-page__body container">
      <Breadcrumbs :links="[{ title: 'Корзина', to: AppRoute.Cart }, { title: 'Оформление заказа' }]" />
      <div class="checkout-page__head">
        <button class="checkout-page__back" type="button" @click="$router.push({ name: AppRouteName.Cart })">
          <UiIcon name="arrowLeft" size="24" />
          <span>В корзину</span>
        </button>
        <span class="checkout-page__divider" aria-hidden="true" />
        <h1 class="checkout-page__title">Оформление заказа</h1>
      </div>
      <div v-if="orderItems.length" class="checkout-page__grid">
        <form class="checkout-page__steps" @submit.prevent="onSubmit">
          <CheckoutOrderItems
            :items="orderItems"
            :count="itemsCount"
            @back="$router.push({ name: AppRouteName.Cart })"
          />
          <CheckoutBuyerForm
            v-model:name="name"
            v-model:surname="surname"
            v-model:phone="phone"
            v-model:email="email"
            v-model:comment="comment"
            v-model:notifications="notifications"
            :errors="errors"
          />
          <CheckoutPaymentMethods v-model="paymentMethod" />
          <CheckoutSubmitBar :disabled="isSubmitDisabled" :valid="isFormValid" />
        </form>
        <aside class="checkout-page__aside">
          <CartSummary
            title="Ваш заказ:"
            action-text="Оформить заказ"
            :action-disabled="isSubmitDisabled"
            @action="onSubmit"
          />
          <PromocodeBlock />
        </aside>
      </div>
      <p v-else class="checkout-page__empty">Вы еще ничего не выбрали</p>
    </main>
    <FooterMarket />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

import { Breadcrumbs } from "@widgets/breadcrumbs";
import { CartSummary } from "@widgets/cart-summary";
import { FooterMarket } from "@widgets/footer-market";
import { HeaderMarket } from "@widgets/header-market";
import { PromocodeBlock } from "@widgets/promocode-block";

import { useCartStore } from "@features/cart";
import {
  CheckoutBuyerForm,
  CheckoutOrderItems,
  CheckoutPaymentMethods,
  checkoutSchema,
  CheckoutSubmitBar,
  useCheckoutStore,
} from "@features/checkout";

import type { CartItem } from "@entities/cart-item";

import { AppRoute, AppRouteName } from "@shared/config";
import { UiIcon } from "@shared/ui";

const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const { selectedItems, itemsCount } = storeToRefs(cartStore);
const { submit } = checkoutStore;

const { defineField, errors, handleSubmit, meta } = useForm({
  validationSchema: toTypedSchema(checkoutSchema),
  initialValues: {
    name: "",
    surname: "",
    phone: "",
    email: "",
    comment: "",
    notifications: true,
    paymentMethod: "online",
  },
});

const [name] = defineField("name");
const [surname] = defineField("surname");
const [phone] = defineField("phone");
const [email] = defineField("email");
const [comment] = defineField("comment");
const [notifications] = defineField("notifications");
const [paymentMethod] = defineField("paymentMethod");

const isFormValid = computed(() => meta.value.dirty && meta.value.valid);

const submitAttempted = ref(false);

const hasErrors = computed(() => Object.keys(errors.value).length > 0);

const isSubmitDisabled = computed(() => submitAttempted.value && hasErrors.value);

const onSubmit = handleSubmit(
  (values) => submit(values),
  () => {
    submitAttempted.value = true;
  }
);

const orderItems = computed(() => selectedItems.value.filter((item: CartItem) => item.quantity > 0));
</script>

<style lang="scss" scoped>
@use "@app/styles/mixins" as *;

.checkout-page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &__body {
    flex-grow: 1;
    padding-top: 20px;
    padding-bottom: 80px;
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }

  &__back {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding-inline: 12px;
    border-radius: var(--radius-md);
    font-size: 14px;
    font-weight: 600;
    color: var(--color-black);
    transition: background-color var(--transition-fast);

    &:hover {
      background-color: var(--color-gray-bg);
    }
  }

  &__divider {
    width: 1px;
    height: 24px;
    background-color: var(--color-divider);
  }

  &__title {
    font-family: var(--font-heading);
    font-size: 28px;
    line-height: 1.1;
    font-weight: 700;
    color: var(--color-black);
  }

  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 20px;
    align-items: start;
    margin-top: 32px;
  }

  &__steps {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-right: 20px;
  }

  &__empty {
    margin-top: 32px;
    padding: 40px;
    background-color: var(--color-surface);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-card);
    text-align: center;
    font-size: 16px;
    color: var(--color-text-secondary);
  }

  &__aside {
    position: sticky;
    top: 16px;
    display: flex;
    flex-direction: column;
  }

  @include down(laptop) {
    &__grid {
      grid-template-columns: minmax(0, 1fr) 304px;
    }
  }

  @include down(tablet) {
    :deep(.breadcrumbs) {
      display: none;
    }

    &__grid {
      grid-template-columns: minmax(0, 1fr);
    }

    &__steps {
      padding-right: 0;
    }

    &__back,
    &__divider {
      display: none;
    }

    &__title {
      font-size: 24px;
    }

    &__aside {
      position: static;
    }
  }
}
</style>
