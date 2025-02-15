
export interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: 'sieraden' | 'telefoonhoesjes';
  image_url: string | null;
  stock: number;
  created_at: string;
  updated_at: string;
}
