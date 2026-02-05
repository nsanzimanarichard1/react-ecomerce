import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { Table } from '../../components/admin/Table';

export const AdminOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: adminApi.getOrders
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      adminApi.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    }
  });

  const handleStatusChange = (orderId: string, status: string) => {
    updateStatusMutation.mutate({ id: orderId, status });
  };

  const columns = [
    { 
      key: '_id', 
      header: 'Order ID', 
      render: (order: any) => (
        <span className="font-mono text-sm">#{order._id.slice(-8)}</span>
      )
    },
    { 
      key: 'user', 
      header: 'Customer', 
      render: (order: any) => (
        <div>
          <div className="font-medium">{order.user?.username || 'N/A'}</div>
          <div className="text-sm text-gray-500">{order.user?.email || ''}</div>
        </div>
      )
    },
    { 
      key: 'items',
      header: 'Items',
      render: (order: any) => (
        <span className="text-sm">{order.items?.length || 0} items</span>
      )
    },
    { 
      key: 'total', 
      header: 'Total', 
      render: (order: any) => (
        <span className="font-semibold">${order.total?.toFixed(2)}</span>
      )
    },
    { 
      key: 'status', 
      header: 'Status', 
      render: (order: any) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
          order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {order.status}
        </span>
      )
    },
    { 
      key: 'createdAt', 
      header: 'Date', 
      render: (order: any) => (
        <div className="text-sm">
          <div>{new Date(order.createdAt).toLocaleDateString()}</div>
          <div className="text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</div>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (order: any) => (
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(order._id, e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          disabled={updateStatusMutation.isPending}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      )
    }
  ];

  const statusCounts = orders.reduce((acc: any, order: any) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📋 Order Management</h1>
        <p className="text-gray-600 mt-2">Track and manage customer orders</p>
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(status => (
          <div key={status} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{statusCounts[status] || 0}</div>
            <div className="text-sm text-gray-600 capitalize">{status}</div>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold">All Orders ({orders.length})</h2>
        </div>
        <Table data={orders} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
};