import type { Product } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string || 'https://dessertshopbackend.onrender.com/api';

interface ProductsResponse {
  success: boolean;
  data: Product[];
}

interface CategoriesResponse {
  success: boolean;
  data: any[];
}

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data: ProductsResponse = await response.json();
    return data.data;
  },

  async getAllCategories(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/all/category`);
    const data: CategoriesResponse = await response.json();
    return data.data;
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(product => product.category?._id === categoryId);
  }
};