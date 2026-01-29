import { apiService } from './api';
import type { Order } from '../types/api';

export const orderService = {
  async createOrder(orderData: { items: Array<{ productId: string; quantity: number }> }): Promise<Order> {
    return apiService.post<Order>('/orders', orderData);
  },

  async getMyOrders(): Promise<Order[]> {
    return apiService.get<Order[]>('/orders/my');
  },

  async getOrderById(orderId: string): Promise<Order> {
    return apiService.get<Order>(`/orders/${orderId}`);
  },

  // Admin only
  async getAllOrders(): Promise<Order[]> {
    return apiService.get<Order[]>('/orders');
  },

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    return apiService.put<Order>(`/orders/${orderId}/status`, { status });
  }
};