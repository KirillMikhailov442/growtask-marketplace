import { createMemoryHistory, createRouter, type Router } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import { useCartStore } from "@features/cart";

import { AppRoute, AppRouteName } from "@shared/config";

import CheckoutPage from "./CheckoutPage.vue";

vi.mock("@shared/api", () => ({
  fetchProducts: vi.fn().mockResolvedValue([]),
}));

const testProducts = [
  { id: 1, title: "Товар 1", image: "/img1.png", price: 1000, oldPrice: 1200, sku: "SKU1", maxQuantity: 10 },
  { id: 2, title: "Товар 2", image: "/img2.png", price: 2000, oldPrice: null, sku: "SKU2", maxQuantity: 5 },
];

const buildRouter = () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: AppRoute.Cart, name: AppRouteName.Cart, component: { template: "<div />" } },
      { path: AppRoute.Checkout, name: AppRouteName.Checkout, component: CheckoutPage },
      { path: AppRoute.CheckoutSuccess, name: AppRouteName.CheckoutSuccess, component: { template: "<div />" } },
    ],
  });

  router.push(AppRoute.Checkout);

  return router;
};

const mountPage = async () => {
  const router = buildRouter();
  await router.isReady();

  const wrapper = mount(CheckoutPage, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn, stubActions: false }), router],
    },
  });

  await flushPromises();

  const cart = useCartStore();
  cart.items = testProducts.map((product) => ({ product, quantity: 1, selected: true }));
  await flushPromises();

  return { wrapper, router: router as Router };
};

const setInputByLabel = async (
  wrapper: Awaited<ReturnType<typeof mountPage>>["wrapper"],
  labelText: string,
  value: string
) => {
  const label = wrapper
    .findAll("label")
    .find((el) => el.classes().includes("ui-input") && el.text().includes(labelText));

  await label?.find("input").setValue(value);
};

const fillRequiredFields = async (wrapper: Awaited<ReturnType<typeof mountPage>>["wrapper"]) => {
  await setInputByLabel(wrapper, "Имя", "Иван");
  await setInputByLabel(wrapper, "Фамилия", "Иванов");
  await flushPromises();
};

const submitForm = async (wrapper: Awaited<ReturnType<typeof mountPage>>["wrapper"], settled: () => boolean) => {
  await wrapper.find("form").trigger("submit");

  await vi.waitFor(
    () => {
      if (!settled()) throw new Error("форма ещё не устоялась после сабмита");
    },
    { timeout: 3000, interval: 20 }
  );
};

describe("CheckoutPage — форма отправки", () => {
  it("рендерит форму с товарами из корзины", async () => {
    const { wrapper } = await mountPage();

    expect(wrapper.find("h1").text()).toBe("Оформление заказа");
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.text()).toContain("Покупатель");
    expect(wrapper.text()).toContain("Способ оплаты");
    expect(wrapper.findAll(".order-items__thumb").length).toBe(2);
  });

  it("пустой сабмит: показывает ошибки обязательных полей и дизейблит кнопки", async () => {
    const { wrapper } = await mountPage();

    await submitForm(wrapper, () => wrapper.text().includes("Укажите имя"));

    expect(wrapper.text()).toContain("Укажите фамилию");

    const submitButton = wrapper.find("form button[type=submit]");

    expect((submitButton.element as HTMLButtonElement).disabled).toBe(true);
  });

  it("не переходит на success при невалидном сабмите", async () => {
    const { wrapper, router } = await mountPage();

    await submitForm(wrapper, () => wrapper.text().includes("Укажите имя"));

    expect(router.currentRoute.value.name).toBe(AppRouteName.Checkout);
  });

  it("валидный сабмит: payload содержит данные формы и товары", async () => {
    const { wrapper } = await mountPage();
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await fillRequiredFields(wrapper);
    await submitForm(wrapper, () => logSpy.mock.calls.length > 0);

    const payload = logSpy.mock.calls[0]?.[0] as Record<string, unknown>;

    expect(payload.user).toMatchObject({
      name: "Иван",
      surname: "Иванов",
      notifications: true,
    });
    expect(payload.products).toHaveLength(2);
    expect(payload.totals).toMatchObject({ goods: 3000, total: 2800 });

    logSpy.mockRestore();
  });

  it("валидный сабмит: редирект на страницу успеха", async () => {
    const { wrapper, router } = await mountPage();

    await fillRequiredFields(wrapper);
    await submitForm(wrapper, () => router.currentRoute.value.name === AppRouteName.CheckoutSuccess);

    expect(router.currentRoute.value.name).toBe(AppRouteName.CheckoutSuccess);
  });

  it("переключение способа оплаты попадает в payload", async () => {
    const { wrapper } = await mountPage();
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const radio = wrapper
      .findAll("input[name=payment-method]")
      .find((i) => (i.element as HTMLInputElement).value === "on-receive");

    await radio?.setValue();
    await fillRequiredFields(wrapper);
    await submitForm(wrapper, () => logSpy.mock.calls.length > 0);

    const payload = logSpy.mock.calls[0]?.[0] as Record<string, unknown>;

    expect(payload.payment_method).toBe("on-receive");

    logSpy.mockRestore();
  });

  it("подсказка сабмит-бара меняется при валидной форме", async () => {
    const { wrapper } = await mountPage();

    await fillRequiredFields(wrapper);
    await flushPromises();

    expect(wrapper.text()).toContain("Вы указали все необходимые данные");
  });
});
