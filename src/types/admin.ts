export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: {
    pending: number;
    confirmed: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
}

export interface AdminUser extends User {
  createdAt: string;
  isBlocked: boolean;
}

export interface AdminProduct extends Product {
  lowStock: boolean;
}

export interface AdminOrder extends Order {
  user: {
    _id: string;
    username: string;
    email: string;
  };
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  stock: number;
  image?: File;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  _id: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateOrderStatusRequest {
  orderId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
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

export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: any[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}