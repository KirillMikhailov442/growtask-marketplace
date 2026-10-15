export interface CheckoutForm {
  name: string;
  surname: string;
  phone: string;
  email: string;
  comment: string;
  notifications: boolean;
  paymentMethod: string;
}

export interface PaymentMethod {
  id: string;
  title: string;
  description: string;
  icon: string;
}
