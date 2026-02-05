import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { IoSearch, IoChevronDown, IoHeart, IoCart, IoPerson } from 'react-icons/io5';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const [showCurrency, setShowCurrency] = useState<boolean>(false);
  const navigate = useNavigate();
  const { totalItems, totalPrice, openCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { categories } = useProducts();

  const categoryOptions = ['All Categories', ...categories.map(cat => cat.name)];

  const languages = ['ENGLISH', 'SPANISH', 'FRENCH', 'GERMAN'];
  const currencies = ['$ DOLLAR (US)', '€ EURO', '£ BRITISH POUND', '¥ YEN'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }
    if (selectedCategory !== 'All Categories') {
      params.set('category', selectedCategory);
    }
    navigate(`/shop${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <header>
      {/* Top Bar with Language, Currency, and Links */}
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs">
          {/* Left: Language & Currency */}
          <div className="flex gap-6">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLanguage(!showLanguage)}
                className="flex items-center gap-1 hover:opacity-80 transition"
              >
                ENGLISH <IoChevronDown />
              </button>
              {showLanguage && (
                <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-lg z-50 min-w-max">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setShowLanguage(false)}
                      className="block w-full text-left px-3 py-2 hover:bg-blue-600 hover:text-white transition first:rounded-t last:rounded-b text-xs"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCurrency(!showCurrency)}
                className="flex items-center gap-1 hover:opacity-80 transition"
              >
                $ DOLLAR (US) <IoChevronDown />
              </button>
              {showCurrency && (
                <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-lg z-50 min-w-max">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setShowCurrency(false)}
                      className="block w-full text-left px-3 py-2 hover:bg-blue-600 hover:text-white transition first:rounded-t last:rounded-b text-xs"
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex gap-6">
            <span>WELCOME TO OUR STORE!</span>
            <Link to="/blog" className="hover:opacity-80 transition">
              BLOG
            </Link>
            <Link to="/faq" className="hover:opacity-80 transition">
              FAQ
            </Link>
            <Link to="/contact" className="hover:opacity-80 transition">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header - Logo, Search, Actions */}
      <div className="bg-blue-600 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold hover:opacity-80 transition whitespace-nowrap">
            ShopNow.
          </Link>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex-1 mx-6 ">
            <div className="flex items-center gap-0 rounded-2xl bg-gray-50 cursor-pointer">
              <input
                type="text"
                placeholder="Search for products, categories, brands, featured product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-50 cursor-pointer text-gray-700 focus:outline-none border-l border-gray-300"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="px-5 py-2 bg-gray-50 text-gray-700 rounded-r-full hover:bg-gray-100 transition font-semibold border-l border-gray-300"
              >
                <IoSearch className="text-xl" />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex gap-8 items-center whitespace-nowrap">
            {/* Sign In / User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <div className="text-center cursor-pointer hover:opacity-80 transition text-sm">
                  <div className="font-bold flex items-center gap-1"><IoPerson /> {user?.username}</div>
                </div>
                <div className="absolute right-0 top-full mt-2 bg-white text-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-max">
                  <Link
                    to="/dashboard"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm whitespace-nowrap"
                  >
                    My Dashboard
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm whitespace-nowrap"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm whitespace-nowrap"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/signin" className="text-center cursor-pointer hover:opacity-80 transition text-sm">
                <div className="font-bold">SIGN IN</div>
              </Link>
            )}

            {/* Wishlist */}
            <Link to="#" className="text-center cursor-pointer hover:opacity-80 transition text-sm">
              <IoHeart className="text-2xl" />
              <div className="font-bold text-xs">0</div>
            </Link>

            {/* Cart */}
            <button 
              onClick={openCart}
              className="text-center cursor-pointer hover:opacity-80 transition text-sm"
            >
              <IoCart className="text-2xl" />
              <div className="font-bold text-xs">{totalItems} ${totalPrice.toFixed(2)}</div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navigation />
    </header>
  );
};
