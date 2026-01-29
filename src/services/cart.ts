import type { CartItem } from '../types/api';

export const cartService = {
  async getCart(userId: string): Promise<any> {
    // This is now handled directly in CartContext
    throw new Error('Use CartContext methods instead');
  },

  async addToCart(productId: string, quantity: number = 1): Promise<CartItem> {
    // This is now handled directly in CartContext
    throw new Error('Use CartContext addToCart method instead');
  },

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
    // This is now handled directly in CartContext
    throw new Error('Use CartContext updateQuantity method instead');
  },

  async removeFromCart(itemId: string): Promise<void> {
    // This is now handled directly in CartContext
    throw new Error('Use CartContext removeFromCart method instead');
  },

  async clearCart(): Promise<void> {
    // This is now handled directly in CartContext
    throw new Error('Use CartContext clearCart method instead');
  }
};