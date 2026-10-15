import { describe, expect, it } from "vitest";

import { checkoutSchema } from "./schema";

const validForm = {
  name: "Иван",
  surname: "Иванов",
  phone: "+7 800 555 35 35",
  email: "mail@example.com",
  comment: "",
  notifications: true,
  paymentMethod: "online",
};

describe("checkoutSchema", () => {
  it("принимает полностью валидную форму", () => {
    const result = checkoutSchema.safeParse(validForm);

    expect(result.success).toBe(true);
  });

  it("принимает форму без необязательных полей (телефон, почта)", () => {
    const result = checkoutSchema.safeParse({
      ...validForm,
      phone: "",
      email: "",
    });

    expect(result.success).toBe(true);
  });

  it.each([
    { field: "name", value: "", message: "Укажите имя" },
    { field: "surname", value: "", message: "Укажите фамилию" },
  ] as const)("требует $field", ({ field, value, message }) => {
    const result = checkoutSchema.safeParse({ ...validForm, [field]: value });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(message);
    }
  });

  it.each(["   ", "\t "])("имя и фамилия из одних пробелов невалидны: %s", (spaces) => {
    const result = checkoutSchema.safeParse({ ...validForm, name: spaces, surname: spaces });

    expect(result.success).toBe(false);
  });

  it("пробелы вокруг имени не делают форму невалидной", () => {
    const result = checkoutSchema.safeParse({ ...validForm, name: "  Иван  " });

    expect(result.success).toBe(true);
  });

  it.each(["+7 900 123 45 67", "89001234567", "79001234567"])(
    "принимает телефон с 11 значащими цифрами: %s",
    (phone) => {
      const result = checkoutSchema.safeParse({ ...validForm, phone });

      expect(result.success).toBe(true);
    }
  );

  it.each(["+7 900 123 45 6", "12345", "abc"])("отклоняет неполный телефон: %s", (phone) => {
    const result = checkoutSchema.safeParse({ ...validForm, phone });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите номер полностью");
    }
  });

  it.each(["user@example.com", "a@b.co"])("принимает корректную почту: %s", (email) => {
    const result = checkoutSchema.safeParse({ ...validForm, email });

    expect(result.success).toBe(true);
  });

  it.each(["plain", "a@b", "a@b.", "@example.com"])("отклоняет некорректную почту: %s", (email) => {
    const result = checkoutSchema.safeParse({ ...validForm, email });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Некорректная почта");
    }
  });
});
