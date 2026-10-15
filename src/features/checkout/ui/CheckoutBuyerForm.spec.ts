import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import CheckoutBuyerForm from "./CheckoutBuyerForm.vue";

const findInputByLabel = (wrapper: ReturnType<typeof mount>, label: string) => {
  const labels = wrapper.findAll("label.ui-input, label.ui-input-phone");

  return labels.find((labelEl) => labelEl.text().includes(label))?.find("input");
};

describe("CheckoutBuyerForm", () => {
  it("рендерит заголовок и все поля", () => {
    const wrapper = mount(CheckoutBuyerForm);

    expect(wrapper.find("h2").text()).toBe("Покупатель");
    expect(wrapper.text()).toContain("Имя*");
    expect(wrapper.text()).toContain("Фамилия*");
    expect(wrapper.text()).toContain("Телефон");
    expect(wrapper.text()).toContain("Почта");
    expect(wrapper.find("textarea").exists()).toBe(true);
    expect(wrapper.findAll("input").length).toBeGreaterThan(0);
  });

  it("ввод имени эмитит update:name", async () => {
    const wrapper = mount(CheckoutBuyerForm);
    const input = findInputByLabel(wrapper, "Имя");

    await input?.setValue("Мария");

    expect(wrapper.emitted("update:name")?.[0]).toEqual(["Мария"]);
  });

  it("ввод фамилии эмитит update:surname", async () => {
    const wrapper = mount(CheckoutBuyerForm);
    const input = findInputByLabel(wrapper, "Фамилия");

    await input?.setValue("Петрова");

    expect(wrapper.emitted("update:surname")?.[0]).toEqual(["Петрова"]);
  });

  it("ввод телефона эмитит update:phone", async () => {
    const wrapper = mount(CheckoutBuyerForm);
    const input = findInputByLabel(wrapper, "Телефон");

    await input?.setValue("+7 900 111 22 33");

    expect(wrapper.emitted("update:phone")?.[0]).toEqual(["+7 900 111 22 33"]);
  });

  it("ввод почты эмитит update:email", async () => {
    const wrapper = mount(CheckoutBuyerForm);
    const input = findInputByLabel(wrapper, "Почта");

    await input?.setValue("test@example.com");

    expect(wrapper.emitted("update:email")?.[0]).toEqual(["test@example.com"]);
  });

  it("ввод комментария эмитит update:comment", async () => {
    const wrapper = mount(CheckoutBuyerForm);

    await wrapper.find("textarea").setValue("Позвоните заранее");

    expect(wrapper.emitted("update:comment")?.[0]).toEqual(["Позвоните заранее"]);
  });

  it("переключение чекбокса эмитит update:notifications", async () => {
    const wrapper = mount(CheckoutBuyerForm);
    const checkbox = wrapper.findAll("input").find((i) => (i.element as HTMLInputElement).type === "checkbox");

    if (!checkbox) {
      const label = wrapper.find(".buyer-form__notifications");

      await label.trigger("click");
    } else {
      await checkbox.setValue();
    }

    expect(wrapper.emitted("update:notifications")).toBeTruthy();
  });

  it("показывает ошибку вместо лейбла, когда error передан", () => {
    const wrapper = mount(CheckoutBuyerForm, {
      props: {
        errors: { name: "Укажите имя" },
      },
    });

    const labels = wrapper.findAll("label.ui-input, label.ui-input-phone");
    const nameLabel = labels.find((el) => el.text().includes("Укажите имя"));

    expect(nameLabel).toBeTruthy();
  });

  it("прокидывает value через modelValue в инпут", () => {
    const wrapper = mount(CheckoutBuyerForm, {
      props: {
        name: "Анна",
      },
    });

    const labels = wrapper.findAll("label.ui-input");
    const nameLabel = labels.find((el) => el.text().includes("Имя"));
    const input = nameLabel?.find("input");

    expect((input?.element as HTMLInputElement)?.value).toBe("Анна");
  });
});
