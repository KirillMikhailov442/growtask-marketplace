import type { PaymentMethod } from "@features/checkout/types";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "online",
    title: "Онлайн",
    description: "Visa, Mastercard, Мир, SberPay",
    icon: "card",
  },
  {
    id: "on-receive",
    title: "При получении",
    description: "Наличными или картой при получении",
    icon: "cash",
  },
];
