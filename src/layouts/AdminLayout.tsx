import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { MdDashboard, MdShoppingCart, MdInventory, MdPeople, MdCampaign, MdAnalytics, MdSettings, MdMenu, MdNotifications, MdLightMode, MdDarkMode, MdLogout } from 'react-icons/md';
import { GiCakeSlice } from 'react-icons/gi';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: MdDashboard, bgColor: 'bg-blue-500' },
  { name: 'Orders', href: '/admin/orders', icon: MdShoppingCart, bgColor: 'bg-green-500' },
  { name: 'Products', href: '/admin/products', icon: MdInventory, bgColor: 'bg-purple-500' },
  { name: 'Customers', href: '/admin/users', icon: MdPeople, bgColor: 'bg-orange-500' },
  { name: 'Marketing', href: '/admin/marketing', icon: MdCampaign, bgColor: 'bg-pink-500' },
  { name: 'Analytics', href: '/admin/analytics', icon: MdAnalytics, bgColor: 'bg-indigo-500' },
  { name: 'Settings', href: '/admin/settings', icon: MdSettings, bgColor: 'bg-gray-500' },
];

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className={`flex h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${isDark ? 'bg-gray-800' : 'bg-white'} transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static shadow-lg flex flex-col`}>
        {/* Logo/Brand */}
        <div className={`px-6 py-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} `}>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <GiCakeSlice className="text-2xl" /> Admin Panel
          </h2>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 mb-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : isDark 
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className={`w-8 h-8 ${item.bgColor} rounded-lg flex items-center justify-center mr-3 text-white`}>
                  <item.icon className="text-lg" />
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Navbar */}
        <header className={`${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} border-b`}>
          <div className="px-6 py-4 flex justify-between items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className={`lg:hidden -m-2.5 p-2.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MdMenu className="h-6 w-6" />
            </button>

            {/* Welcome text */}
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Welcome Admin
              </h1>
            </div>

            {/* Right side - Settings, Notifications, Theme, User */}
            <div className="flex items-center gap-4">
              {/* Settings */}
              <button className={`p-2 rounded-lg ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition`}>
                <MdSettings className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <button className={`relative p-2 rounded-lg ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition`}>
                <MdNotifications className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">3</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition`}
              >
                {isDark ? <MdLightMode className="h-5 w-5" /> : <MdDarkMode className="h-5 w-5" />}
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{user?.username?.[0]?.toUpperCase()}</span>
                </div>
                <span className={`hidden md:inline text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user?.username}
                </span>
                <button
                  onClick={logout}
                  className={`text-sm font-medium px-3 py-1 rounded border transition ${
                    isDark 
                      ? 'text-red-400 border-red-400 hover:bg-red-400 hover:text-white'
                      : 'text-red-600 border-red-200 hover:bg-red-50'
                  }`}
                >
                  <MdLogout className="inline" /> Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};