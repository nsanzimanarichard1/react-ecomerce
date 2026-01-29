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

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: {
    _id: string;
    name: string;
  };
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  dessertId: string;
  quantity: number;
  addedAt: string;
}