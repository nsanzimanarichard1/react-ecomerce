import { useState } from 'react';
import { orderService } from '../services/orders';
import type { Order } from '../types/api';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (items: Array<{ productId: string; quantity: number }>) => {
    setIsLoading(true);
    setError(null);
    try {
      const order = await orderService.createOrder({ items });
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loadMyOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (orderId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const order = await orderService.getOrderById(orderId);
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    orders,
    isLoading,
    error,
    createOrder,
    loadMyOrders,
    getOrderById,
  };
};