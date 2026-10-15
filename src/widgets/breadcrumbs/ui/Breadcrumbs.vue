<template>
  <nav class="breadcrumbs" aria-label="Хлебные крошки">
    <RouterLink class="breadcrumbs__home" to="/">
      <UiIcon name="home" size="16" />
    </RouterLink>
    <div class="breadcrumbs__crumbs">
      <template v-for="(link, index) in links" :key="`${link.title}-${index}`">
        <span class="breadcrumbs__divider" aria-hidden="true">/</span>
        <RouterLink v-if="link.to" class="breadcrumbs__item breadcrumbs__item--current" :to="link.to">
          {{ link.title }}
        </RouterLink>
        <span v-else class="breadcrumbs__item">
          {{ link.title }}
        </span>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

import type { Breadcrumb } from "@widgets/breadcrumbs/types";

import { UiIcon } from "@shared/ui";

interface Props {
  links: Breadcrumb[];
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 12px;

  &__home {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    background-color: var(--color-gray-bg);
    border-radius: var(--radius-md);
    color: var(--color-dark);
    transition: background-color var(--transition-fast);

    &:hover {
      background-color: #e6e6e6;
    }
  }

  &__crumbs {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }

  &__divider {
    font-size: 13px;
    color: var(--color-text-muted);
  }

  &__item {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    line-height: 1.3;
    font-weight: 600;
    color: var(--color-dark);
  }
}
</style>
