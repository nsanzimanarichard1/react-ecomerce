import api from './api';
import type { Order } from '../types/api';

export const orderService = {
  async createOrder(orderData: { items: Array<{ productId: string; quantity: number }> }): Promise<Order> {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async getMyOrders(): Promise<Order[]> {
    const response = await api.get('/orders/my');
    return response.data;
  },

  async getOrderById(orderId: string): Promise<Order> {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Admin only
  async getAllOrders(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data;
  },

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  }
};