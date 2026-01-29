import type { Product } from '../types/api';

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
    const response = await fetch('https://dessertshopbackend.onrender.com/api/products');
    const data: ProductsResponse = await response.json();
    return data.data;
  },

  async getAllCategories(): Promise<any[]> {
    const response = await fetch('https://dessertshopbackend.onrender.com/api/all/category');
    const data: CategoriesResponse = await response.json();
    return data.data;
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(product => product.category?._id === categoryId);
  }
};