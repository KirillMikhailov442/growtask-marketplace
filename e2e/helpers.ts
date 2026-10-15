import type { Page } from "@playwright/test";

import { apiProducts, mappedProducts, type Product } from "./fixtures/products";

const CART_STORAGE_KEY = "growtask-cart";

const isProductsApiRequest = (url: URL): boolean =>
  url.pathname === "/api/products" || (url.hostname === "growtask.ru" && url.pathname.includes("/api/products"));

export const mockProductsApi = async (page: Page): Promise<void> => {
  const payload = { data: apiProducts };

  await page.route(isProductsApiRequest, (route) => route.fulfill({ json: payload }));
};

export interface CartSeed {
  items: Array<{ product: Product; quantity: number; selected: boolean }>;
  promoCode: string | null;
}

export const makeCartSeed = (quantities: number[] = [1, 1, 1]): CartSeed => ({
  items: mappedProducts.map((product, index) => ({
    product,
    quantity: quantities[index] ?? 1,
    selected: true,
  })),
  promoCode: null,
});

export const seedCart = (page: Page, seed: CartSeed): void => {
  page.addInitScript(
    ([key, value]) => {
      window.sessionStorage.setItem(key, value);
    },
    [CART_STORAGE_KEY, JSON.stringify(seed)]
  );
};

export const clearCart = (page: Page): void => {
  page.addInitScript(
    ([key]) => {
      window.sessionStorage.removeItem(key);
    },
    [CART_STORAGE_KEY]
  );
};

export const waitForStableRender = async (page: Page): Promise<void> => {
  await page.evaluate(async () => {
    await document.fonts.ready;

    const images = Array.from(document.images);

    await Promise.all(
      images.map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
            })
      )
    );
  });
};
