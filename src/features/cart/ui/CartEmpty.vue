<template>
  <div class="cart-empty">
    <p class="cart-empty__title">Корзина пуста</p>
    <p class="cart-empty__text">Добавьте товары, чтобы оформить заказ</p>
  </div>
</template>

<style lang="scss" scoped>
.cart-empty {
  padding-block: 40px;

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-dark);
  }

  &__text {
    margin-top: 8px;
    font-size: 16px;
    color: var(--color-text-muted);
  }
}
</style>
