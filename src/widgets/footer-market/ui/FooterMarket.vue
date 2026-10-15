<template>
  <footer class="footer-market">
    <div class="footer-market__inner container">
      <p class="footer-market__copyright">@ Company name 2026</p>
      <MadeIn />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MadeIn } from "@shared/ui";
</script>

<style lang="scss" scoped>
.footer-market {
  margin-top: 40px;
  padding-top: 40px;
  background-color: var(--color-footer);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding-top: 40px;
    padding-bottom: 80px;
    border-top: 2px solid var(--color-divider);
  }

  &__copyright {
    font-size: 16px;
    color: var(--color-text-muted);
  }
}
</style>
