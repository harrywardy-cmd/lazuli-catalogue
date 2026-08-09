export type Product = {
  id: string;
  variationId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  imageUrl?: string;
  category?: string;
  stock: number;

  featured?: boolean;
  trending?: boolean;
};