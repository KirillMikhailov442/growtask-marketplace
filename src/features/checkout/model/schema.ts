import { z } from "zod";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hasFullPhoneDigits(value: string): boolean {
  return value.replace(/\D/g, "").length === 11;
}

// Обязательные поля — имя и фамилия (помечены * в макете).
// Телефон и почта необязательны, но если заполнены — проверяем формат.
export const checkoutSchema = z.object({
  name: z.string().trim().min(1, "Укажите имя"),
  surname: z.string().trim().min(1, "Укажите фамилию"),
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || hasFullPhoneDigits(value), "Введите номер полностью"),
  email: z
    .string()
    .trim()
    .refine((value) => value === "" || EMAIL_REGEX.test(value), "Некорректная почта"),
  comment: z.string(),
  notifications: z.boolean(),
  paymentMethod: z.string(),
});
