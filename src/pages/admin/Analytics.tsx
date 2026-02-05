import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { useTheme } from '../../context/ThemeContext';
import { FaTrophy, FaExclamationTriangle, FaChartBar } from 'react-icons/fa';

export const AdminAnalytics = () => {
  const { isDark } = useTheme();
  const { data: topProducts = [] } = useQuery({
    queryKey: ['admin-top-products'],
    queryFn: adminApi.getTopProducts
  });

  const { data: lowStockProducts = [] } = useQuery({
    queryKey: ['admin-low-stock'],
    queryFn: adminApi.getLowStockProducts
  });

  const { data: productStats = [] } = useQuery({
    queryKey: ['admin-product-stats'],
    queryFn: adminApi.getProductStats
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}><FaChartBar className="inline mr-2" /> Analytics & Reports</h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Insights into your dessert shop performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Selling Products */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
          <div className="flex items-center mb-6">
            <div className={`p-2 ${isDark ? 'bg-green-900' : 'bg-green-100'} rounded-lg mr-3`}>
              <FaTrophy className={`text-xl ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Top Selling Products</h2>
          </div>
          <div className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.slice(0, 5).map((product: any, index: number) => (
                <div key={product._id} className={`flex items-center justify-between p-3 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{product.name}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>${product.price}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">{product.totalSold || 0} sold</div>
                  </div>
                </div>
              ))
            ) : (
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No sales data available</p>
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
          <div className="flex items-center mb-6">
            <div className={`p-2 ${isDark ? 'bg-red-900' : 'bg-red-100'} rounded-lg mr-3`}>
              <FaExclamationTriangle className={`text-xl ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Low Stock Alert</h2>
          </div>
          <div className="space-y-4">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product: any) => (
                <div key={product._id} className={`flex items-center justify-between p-3 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-red-50 border-red-100'} rounded-lg border`}>
                  <div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{product.name}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{product.category?.name}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock === 0 ? 'bg-red-100 text-red-800' :
                      product.stock < 5 ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.stock === 0 ? 'Out of Stock' : `${product.stock} left`}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>All products are well stocked!</p>
            )}
          </div>
        </div>
      </div>

      {/* Product Statistics by Category */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
        <div className="flex items-center mb-6">
          <div className={`p-2 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg mr-3`}>
            <FaChartBar className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Product Statistics by Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productStats.length > 0 ? (
            productStats.map((stat: any) => (
              <div key={stat._id} className={`p-4 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100'} rounded-lg border`}>
                <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat._id || 'Uncategorized'}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Products:</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Avg Price:</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>${stat.avgPrice?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Min Price:</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>${stat.minPrice?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Max Price:</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>${stat.maxPrice?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8 col-span-full`}>No product statistics available</p>
          )}
        </div>
      </div>
    </div>
  );
};