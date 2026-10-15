export const formatPrice = (value: number): string => `${value.toLocaleString("ru-RU")} ₽`;

export const formatPlural = (value: number, forms: [string, string, string]): string => {
  const mod10 = value % 10;
  const mod100 = value % 100;

  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];

  return forms[2];
};
