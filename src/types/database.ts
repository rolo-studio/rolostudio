
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

export interface CartItem {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: any; // We'll define a more specific type when implementing checkout
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
  created_at: string;
}

export interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  created_at: string;
}
