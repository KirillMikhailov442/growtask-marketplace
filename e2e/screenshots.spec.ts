import { expect, test } from "@playwright/test";

import { clearCart, makeCartSeed, mockProductsApi, seedCart, waitForStableRender } from "./helpers";

test.beforeEach(async ({ page }) => {
  await mockProductsApi(page);
});

test("cart page", async ({ page }) => {
  seedCart(page, makeCartSeed([2, 1, 1]));

  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "Корзина", exact: true })).toBeVisible();
  await waitForStableRender(page);

  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("checkout page", async ({ page }) => {
  seedCart(page, makeCartSeed([2, 1, 1]));

  await page.goto("/checkout");
  await expect(page.getByRole("heading", { name: "Оформление заказа" })).toBeVisible();
  await waitForStableRender(page);

  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("checkout success page", async ({ page }) => {
  clearCart(page);

  await page.goto("/checkout/success");
  await expect(page.getByRole("heading", { name: /успешно создан/i })).toBeVisible();
  await waitForStableRender(page);

  await expect(page).toHaveScreenshot({ fullPage: true });
});
