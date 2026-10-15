import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import CheckoutSubmitBar from "./CheckoutSubmitBar.vue";

describe("CheckoutSubmitBar", () => {
  it("показывает подсказку о незаполненных полях, когда форма невалидна", () => {
    const wrapper = mount(CheckoutSubmitBar, { props: { valid: false } });

    expect(wrapper.text()).toContain("Заполните обязательные поля: имя и фамилия");
    expect(wrapper.text()).not.toContain("Вы указали все необходимые данные");
  });

  it("показывает подсказку о готовности, когда форма валидна", () => {
    const wrapper = mount(CheckoutSubmitBar, { props: { valid: true } });

    expect(wrapper.text()).toContain("Вы указали все необходимые данные");
  });

  it("кнопка активна по умолчанию", () => {
    const wrapper = mount(CheckoutSubmitBar, { props: { valid: true } });

    expect((wrapper.find("button").element as HTMLButtonElement).disabled).toBe(false);
  });

  it("кнопка задизейблена, когда disabled=true", () => {
    const wrapper = mount(CheckoutSubmitBar, { props: { valid: true, disabled: true } });

    expect((wrapper.find("button").element as HTMLButtonElement).disabled).toBe(true);
  });

  it("кнопка — типа submit", () => {
    const wrapper = mount(CheckoutSubmitBar, { props: { valid: true } });

    expect(wrapper.find("button").attributes("type")).toBe("submit");
  });
});
