<template>
  <div class="made-in">
    <span class="made-in__flag" aria-hidden="true">
      <span class="made-in__stripe made-in__stripe--white" />
      <span class="made-in__stripe made-in__stripe--blue" />
      <span class="made-in__stripe made-in__stripe--red" />
    </span>
    <span class="made-in__text">
      <span class="made-in__caption">Сайт сделан в студии</span>
      <span class="made-in__brand">ГРОТЕСК</span>
    </span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.made-in {
  display: flex;
  align-items: center;
  gap: 12px;

  &__flag {
    display: flex;
    flex-direction: column;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border: 1px solid var(--color-gray-bg);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  &__stripe {
    flex-grow: 1;

    &--white {
      background-color: #ffffff;
    }

    &--blue {
      background-color: #1c3578;
    }

    &--red {
      background-color: #e4181c;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__caption {
    font-size: 12px;
    line-height: 1.2;
    color: var(--color-black);
  }

  &__brand {
    font-family: var(--font-heading);
    font-size: 20px;
    line-height: 1.2;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--color-black);
  }
}
</style>
