import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import type { Product, CartItem as ApiCartItem } from '../types/api';

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
      // Direct API call instead of using cartService
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://dessertshopbackend.onrender.com/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const apiResponse = await response.json();
        const apiCart = apiResponse.success ? apiResponse.data : apiResponse;
        
        // Transform API cart items to match CartItem interface
        const transformedCart = Array.isArray(apiCart) ? apiCart.map((item: any, index: number) => ({
          id: item.dessertId.id || item.dessertId._id,
          name: item.dessertId.name,
          price: item.dessertId.price,
          category: item.dessertId.category,
          image: `https://dessertshopbackend.onrender.com${item.dessertId.imageUrl}`,
          description: item.dessertId.description,
          rating: 4.5, // Default rating
          quantity: item.quantity,
          cartIndex: index // Add unique identifier for cart items
        })) : [];
        
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
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!isAuthenticated || !user) {
      // Fallback to local storage for non-authenticated users
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevCart, { ...product, quantity }];
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      const response = await fetch(`https://dessertshopbackend.onrender.com/api/cart`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          dessertId: product.id.toString(),
          quantity: quantity
        })
      });
      

      if (response.ok) {
        await loadCart(); // Refresh cart from API
      } else {
        throw new Error('Failed to add item to cart');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
      // Fallback to local state on error
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevCart, { ...product, quantity }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: number) => {
    if (!isAuthenticated) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Direct API call instead of using cartService
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://dessertshopbackend.onrender.com/api/cart/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        await loadCart();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item from cart');
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
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Direct API call instead of using cartService
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://dessertshopbackend.onrender.com/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      });
      
      if (response.ok) {
        await loadCart();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart item');
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
      // Direct API call instead of using cartService
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://dessertshopbackend.onrender.com/api/cart', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setCart([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async () => {
    if (!isAuthenticated || !user) {
      throw new Error('User must be authenticated to create order');
    }

    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://dessertshopbackend.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
      });

      if (response.ok) {
        const order = await response.json();
        setCart([]); // Clear cart after successful order
        return order;
      } else {
        throw new Error('Failed to create order');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = Array.isArray(cart) ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const totalPrice = Array.isArray(cart) ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

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


