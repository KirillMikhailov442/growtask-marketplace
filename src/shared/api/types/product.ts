export interface ApiProduct {
  id: number;
  name: string;
  price: number;
  old_price: number | null;
  image: string;
  sku: string;
  quantity: number;
}
