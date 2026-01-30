export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
  stock: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    stock: number;
  };
}

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}