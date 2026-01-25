import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
  image: string;
  description: string;
  discount?: number;
  featured?: boolean;
}

interface ProductContextType {
  products: Product[];
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products] = useContext(ProductsStateContext);
  const [cart, setCart] = useContext(CartStateContext);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ProductContext.Provider value={{ products, cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </ProductContext.Provider>
  );
};

// Separate contexts for state
const ProductsStateContext = createContext<[Product[], any]>([[], null]);
const CartStateContext = createContext<[Product[], any]>([[], null]);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
