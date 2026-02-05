import api from './api';

// Admin Dashboard API Service
export const adminApi = {
  // Dashboard Stats
  getStats: async () => {
    const [products, orders, users] = await Promise.all([
      api.get('/products'),
      api.get('/orders'),
      api.get('/all/user')
    ]);
    
    const totalRevenue = orders.data.reduce((sum: number, order: any) => sum + order.total, 0);
    const ordersByStatus = orders.data.reduce((acc: any, order: any) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return {
      totalProducts: products.data.length,
      totalOrders: orders.data.length,
      totalUsers: users.data.length,
      totalRevenue,
      ordersByStatus
    };
  },

  // Product Management
  getProducts: async () => {
    const { data } = await api.get('/products');
    return data.data || data; // Handle both {success: true, data: [...]} and direct array
  },

  createProduct: async (productData: FormData) => {
    const { data } = await api.post('/create-product', productData);
    return data;
  },

  updateProduct: async (id: string, productData: FormData) => {
    // Check if image file exists in FormData
    const hasImage = productData.get('image') && (productData.get('image') as File).size > 0;
    
    if (hasImage) {
      // Send as FormData if image is included
      const { data } = await api.patch(`/update-product/${id}`, productData);
      return data;
    } else {
      // Send as JSON if no image
      const jsonData: any = {};
      productData.forEach((value, key) => {
        if (key !== 'image') {
          jsonData[key] = value;
        }
      });
      const { data } = await api.patch(`/update-product/${id}`, jsonData);
      return data;
    }
  },

  deleteProduct: async (id: string) => {
    await api.delete(`/delete-product/${id}`);
  },

  getLowStockProducts: async () => {
    const { data } = await api.get('/products/lower-in-stock');
    return data.products || data.data || data;
  },

  getTopProducts: async () => {
    const { data } = await api.get('/products/top');
    return Array.isArray(data) ? data : data.data || [];
  },

  getProductStats: async () => {
    const { data } = await api.get('/products/stats');
    return data;
  },

  // Category Management
  getCategories: async () => {
    const { data } = await api.get('/all/category');
    return Array.isArray(data) ? data : data.data || [];
  },

  createCategory: async (categoryData: { name: string; description?: string }) => {
    const { data } = await api.post('/create-category', categoryData);
    return data;
  },

  updateCategory: async (id: string, categoryData: { name: string; description?: string }) => {
    const { data } = await api.put(`/category/update-category/${id}`, categoryData);
    return data;
  },

  deleteCategory: async (id: string) => {
    await api.delete(`/delete-category/${id}`);
  },

  // Order Management
  getOrders: async () => {
    const { data } = await api.get('/orders');
    return Array.isArray(data) ? data : data.data || [];
  },

  updateOrderStatus: async (id: string, status: string) => {
    const { data } = await api.put(`/orders/${id}/status`, { status });
    return data;
  },

  // User Management
  getUsers: async () => {
    const { data } = await api.get('/all/user');
    return Array.isArray(data) ? data : data.data || [];
  },

  updateUser: async (id: string, userData: any) => {
    const { data } = await api.put(`/admin/user/${id}`, userData);
    return data;
  },

  deleteUser: async (id: string) => {
    await api.delete(`/user/${id}`);
  }
};