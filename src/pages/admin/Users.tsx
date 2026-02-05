import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { Table } from '../../components/admin/Table';

export const AdminUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: adminApi.getUsers
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      adminApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: adminApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  const handleRoleChange = (userId: string, role: string) => {
    updateUserMutation.mutate({ id: userId, data: { role } });
  };

  const columns = [
    {
      key: 'avatar',
      header: 'Avatar',
      render: (user: any) => (
        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">{user.username?.[0]?.toUpperCase()}</span>
        </div>
      )
    },
    { 
      key: 'username', 
      header: 'Username',
      render: (user: any) => (
        <div>
          <div className="font-medium">{user.username}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      )
    },
    { 
      key: 'role', 
      header: 'Role', 
      render: (user: any) => (
        <select
          value={user.role}
          onChange={(e) => handleRoleChange(user._id, e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          disabled={updateUserMutation.isPending}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      )
    },
    { 
      key: 'createdAt', 
      header: 'Joined', 
      render: (user: any) => (
        <div className="text-sm">
          <div>{new Date(user.createdAt).toLocaleDateString()}</div>
          <div className="text-gray-500">{new Date(user.createdAt).toLocaleTimeString()}</div>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
                deleteUserMutation.mutate(user._id);
              }
            }}
            className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 text-sm"
            disabled={deleteUserMutation.isPending}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  const userStats = {
    total: users.length,
    admins: users.filter((user: any) => user.role === 'admin').length,
    customers: users.filter((user: any) => user.role === 'user').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">👥 User Management</h1>
        <p className="text-gray-600 mt-2">Manage user accounts and permissions</p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">👑</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.admins}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">🛍️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Customers</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.customers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold">All Users ({users.length})</h2>
        </div>
        <Table data={users} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
};