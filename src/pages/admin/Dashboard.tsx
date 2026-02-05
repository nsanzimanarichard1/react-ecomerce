import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { useTheme } from '../../context/ThemeContext';

export const AdminDashboard = () => {
  const { isDark } = useTheme();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: adminApi.getStats
  });

  const { data: recentOrders = [] } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: adminApi.getOrders,
    select: (data) => data.slice(0, 3)
  });

  const { data: topProducts = [] } = useQuery({
    queryKey: ['admin-top-products'],
    queryFn: adminApi.getTopProducts,
    select: (data) => data.slice(0, 3)
  });

  const { data: lowStockProducts = [] } = useQuery({
    queryKey: ['admin-low-stock'],
    queryFn: adminApi.getLowStockProducts,
    select: (data) => data.slice(0, 3)
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg h-24`}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>TOTAL REVENUE</p>
              <p className="text-2xl font-bold text-green-400">${stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
              <p className="text-green-400 text-sm">+2.5% vs last week</p>
            </div>
          </div>
        </div>
        
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>ACTIVE SESSIONS</p>
              <p className="text-2xl font-bold text-blue-400">{stats?.totalUsers || 0}</p>
              <p className="text-blue-400 text-sm flex items-center">
                <span className="mr-1">▲</span> +5.2%
              </p>
            </div>
          </div>
        </div>
        
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>NEW ORDERS</p>
              <p className="text-2xl font-bold text-orange-400">{stats?.totalOrders || 0}</p>
              <p className="text-red-400 text-sm flex items-center">
                <span className="mr-1">▼</span> -1.2%
              </p>
            </div>
          </div>
        </div>
        
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>CONVERSION RATE</p>
              <p className="text-2xl font-bold text-cyan-400">3.2%</p>
              <p className="text-red-400 text-sm flex items-center">
                <span className="mr-1">▼</span> -0.8%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Analytics Chart */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>SALES ANALYTICS</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📈</div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Chart visualization would go here</p>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>AI PREDICTION enabled</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>RECENT ORDERS</h3>
          <div className="space-y-3">
            <div className={`flex justify-between items-center text-sm ${isDark ? 'text-gray-400 border-gray-700' : 'text-gray-600 border-gray-200'} border-b pb-2`}>
              <span>CUSTOMER NAME</span>
              <span>STATUS</span>
              <span>TOTAL</span>
            </div>
            {recentOrders.map((order: any) => (
              <div key={order._id} className="flex justify-between items-center text-sm">
                <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{order.user?.username || 'N/A'}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  order.status === 'delivered' ? 'bg-green-600 text-white' :
                  order.status === 'shipped' ? 'bg-blue-600 text-white' :
                  order.status === 'confirmed' ? 'bg-yellow-600 text-white' :
                  'bg-orange-600 text-white'
                }`}>
                  {order.status}
                </span>
                <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>${order.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>TOP SELLING PRODUCTS</h3>
          <div className="space-y-4">
            {topProducts.map((product: any, index: number) => (
              <div key={product._id} className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                  <span className="text-2xl">🧁</span>
                </div>
                <div className="flex-1">
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{product.name}</p>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>${product.price}</p>
                </div>
                <div className="text-right">
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{product.totalSold || 0}</p>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>LOW STOCK ALERTS</h3>
          <div className="space-y-4">
            {lowStockProducts.map((product: any) => (
              <div key={product._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{product.name}</p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>({product.stock} left)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};