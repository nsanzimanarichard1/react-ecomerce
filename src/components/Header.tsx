import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { useCart } from '../context/CartContext';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const [showCurrency, setShowCurrency] = useState<boolean>(false);
  const navigate = useNavigate();
  const { totalItems, totalPrice } = useCart();

  const categories = [
    'All Categories',
    'Men Fashion',
    'Women Fashion',
    'Shoes',
    'Bags & Accessories',
    'Watches',
    'Jewellery',
    'Accessories',
    'Dresses',
    'Tops',
    'Lingerie & Nightwear',
  ];

  const languages = ['ENGLISH', 'SPANISH', 'FRENCH', 'GERMAN'];
  const currencies = ['$ DOLLAR (US)', '€ EURO', '£ BRITISH POUND', '¥ YEN'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}&category=${selectedCategory}`);
    }
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
                ENGLISH <span>▼</span>
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
                $ DOLLAR (US) <span>▼</span>
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
            kapee.
          </Link>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex-1 mx-6">
            <div className="flex items-center gap-0">
              <input
                type="text"
                placeholder="Search for products, categories, brands, sku..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-100 text-gray-700 focus:outline-none border-l border-gray-300"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition font-semibold border-l border-gray-300"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex gap-8 items-center whitespace-nowrap">
            {/* Sign In */}
            <div className="text-center cursor-pointer hover:opacity-80 transition text-sm">
              <span className="block text-xs">HELLO,</span>
              <div className="font-bold">SIGN IN</div>
            </div>

            {/* Wishlist */}
            <Link to="#" className="text-center cursor-pointer hover:opacity-80 transition text-sm">
              <span className="block">❤️</span>
              <div className="font-bold text-xs">0</div>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="text-center cursor-pointer hover:opacity-80 transition text-sm">
              <span className="block">🛒</span>
              <div className="font-bold text-xs">{totalItems} ${totalPrice.toFixed(2)}</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navigation />
    </header>
  );
};
