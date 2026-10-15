export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice: number | null;
  sku: string;
  maxQuantity: number;
}
