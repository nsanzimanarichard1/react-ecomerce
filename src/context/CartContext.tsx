import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';
import type { Product as ApiProduct, CartItem as ApiCartItem } from '../types/api';

// Legacy Product interface for backward compatibility
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

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  createOrder: () => Promise<any>;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isLoading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  // Load cart from API when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated, user]);

  const loadCart = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/cart');
      const apiCart = data.success ? data.data : data;
      
      // Transform API cart items to match CartItem interface
      const transformedCart = Array.isArray(apiCart) ? apiCart.map((item: any) => {
        const id = item.dessertId.id || item.dessertId._id;
        if (!id) {
          console.error('Missing ID for cart item:', item);
        }
        return {
          id: id,
          name: item.dessertId.name,
          price: item.dessertId.price,
          category: item.dessertId.category,
          image: `https://dessertshopbackend.onrender.com${item.dessertId.imageUrl}`,
          description: item.dessertId.description,
          rating: 4.5, // Default rating
          quantity: item.quantity
        };
      }) : [];
      
      // Merge duplicate items by ID
      const mergedCart = transformedCart.reduce((acc: any[], item: any) => {
        const existing = acc.find(cartItem => cartItem.id === item.id);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
        
      setCart(mergedCart);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!isAuthenticated || !user) {
      // Fallback to local storage for non-authenticated users
      const productId = (product as any)._id || product.id;
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === productId);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevCart, { ...product, id: productId, quantity }];
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Get product ID - could be _id (from API) or id (legacy)
      const productId = (product as any)._id || product.id;
      
      await api.post('/cart', {
        dessertId: productId,
        quantity: quantity
      });
      await loadCart(); // Refresh cart from API
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add item to cart');
      // Fallback to local state on error
      const productId = (product as any)._id || product.id;
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === productId);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevCart, { ...product, id: productId, quantity }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: number) => {
    if (!isAuthenticated) {
      setCart((prevCart) => prevCart.filter((item: any) => item.id !== id));
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/cart/${id}`);
      await loadCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove item from cart');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    if (!isAuthenticated) {
      setCart((prevCart) =>
        prevCart.map((item: any) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await api.put(`/cart/${id}`, { quantity });
      await loadCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update cart item');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      setCart([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await api.delete('/cart');
      setCart([]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async () => {
    if (!isAuthenticated || !user) {
      throw new Error('User must be authenticated to create order');
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      throw new Error('Cart is empty');
    }

    setIsLoading(true);
    setError(null);
    try {
      // Format cart items for the order
      const items = cart.map((item: any) => ({
        dessertId: item.id.toString(),
        quantity: item.quantity
      }));
      
      const { data } = await api.post('/orders', { items });
      setCart([]); // Clear cart after successful order
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create order';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = Array.isArray(cart) ? cart.reduce((sum: number, item: any) => sum + item.quantity, 0) : 0;
  const totalPrice = Array.isArray(cart) ? cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        createOrder,
        totalItems,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
        isLoading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};


