import { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import type { Product, Category } from '../types/api';

interface ProductContextType {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  getProductsByCategory: (categoryId: string) => Product[];
  refetch: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { data: productsData, isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/products');
      return response.data.data || response.data;
    },
  });

  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/all/category');
      return response.data.data || response.data;
    },
  });

  const products = productsData || [];
  const categories = categoriesData || [];
  const isLoading = productsLoading || categoriesLoading;
  const error = productsError?.message || categoriesError?.message || null;

  const getProductsByCategory = (categoryId: string): Product[] => {
    return products.filter(product => product.category?._id === categoryId);
  };

  const refetch = () => {
    refetchProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        isLoading,
        error,
        getProductsByCategory,
        refetch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};