import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const [showDepartments, setShowDepartments] = useState<boolean>(false);
  const [showHome, setShowHome] = useState<boolean>(false);
  const [showShop, setShowShop] = useState<boolean>(false);
  const [showPages, setShowPages] = useState<boolean>(false);
  const [showBlog, setShowBlog] = useState<boolean>(false);
  const [showElements, setShowElements] = useState<boolean>(false);

  const departments = [
    'Men Fashion',
    'Women Fashion',
    'Shoes',
    'Bags & Accessories',
    'Watches',
    'Jewellery',
    'Accessories',
  ];

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const blogItems = ['Latest News', 'Fashion Tips', 'Product Reviews'];
  const elementItems = ['Colors', 'Typography', 'Buttons', 'Cards'];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-0 flex items-center justify-between h-14">
        {/* Left: Shop By Department */}
        <div className="relative">
          <button
            onClick={() => setShowDepartments(!showDepartments)}
            className="flex items-center gap-2 py-4 px-2 text-gray-800 font-bold text-sm hover:text-blue-600 transition"
          >
            SHOP BY DEPARTMENT
            <span className="text-lg">≡</span>
          </button>

          {showDepartments && (
            <div className="absolute top-full left-0 mt-0 bg-white text-gray-800 shadow-lg z-50 min-w-max">
              {departments.map((dept) => (
                <Link
                  key={dept}
                  to="/shop"
                  onClick={() => setShowDepartments(false)}
                  className="block px-4 py-2 hover:bg-blue-600 hover:text-white transition text-sm first:rounded-t last:rounded-b"
                >
                  {dept}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Center: Menu Items */}
        <div className="flex items-center gap-8">
          {/* HOME */}
          <div className="relative">
            <button
              onClick={() => setShowHome(!showHome)}
              className="py-4 px-2 text-gray-800 font-semibold text-sm hover:text-blue-600 transition flex items-center gap-1"
            >
              HOME <span className="text-xs">▼</span>
            </button>
            {showHome && (
              <div className="absolute top-full left-0 mt-0 bg-white text-gray-800 shadow-lg z-50 min-w-max rounded-b">
                <Link
                  to="/"
                  onClick={() => setShowHome(false)}
                  className="block px-4 py-2 hover:bg-blue-600 hover:text-white transition text-sm"
                >
                  Home Page
                </Link>
              </div>
            )}
          </div>

          {/* SHOP */}
          <div className="relative">
            <button
              onClick={() => setShowShop(!showShop)}
              className="py-4 px-2 text-gray-800 font-semibold text-sm hover:text-blue-600 transition flex items-center gap-1"
            >
              SHOP <span className="text-xs">▼</span>
            </button>
            {showShop && (
              <div className="absolute top-full left-0 mt-0 bg-white text-gray-800 shadow-lg z-50 min-w-max rounded-b">
                <Link
                  to="/shop"
                  onClick={() => setShowShop(false)}
                  className="block px-4 py-2 hover:bg-blue-600 hover:text-white transition text-sm"
                >
                  All Products
                </Link>
                {departments.slice(0, 3).map((dept) => (
                  <Link
                    key={dept}
                    to="/shop"
                    onClick={() => setShowShop(false)}
                    className="block px-4 py-2 hover:bg-blue-600 hover:text-white transition text-sm"
                  >
                    {dept}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* PAGES */}
          <div className="relative">
            <button
              onClick={() => setShowPages(!showPages)}
              className="py-4 px-2 text-gray-800 font-semibold text-sm hover:text-blue-600 transition flex items-center gap-1"
            >
              PAGES <span className="text-xs">▼</span>
            </button>
            {showPages && (
              <div className="absolute top-full left-0 mt-0 bg-white text-gray-800 shadow-lg z-50 min-w-max rounded-b">
                {pages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    onClick={() => setShowPages(false)}
                    className="block px-4 py-2 hover:bg-blue-600 hover:text-white transition text-sm"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* BLOG */}
          <div className="relative">
            <button
              onClick={() => setShowBlog(!showBlog)}
              className="py-4 px-2 text-gray-800 font-semibold text-sm hover:text-blue-600 transition flex items-center gap-1"
            >
              BLOG <span className="text-xs">▼</span>
            </button>
            {showBlog && (
              <div className="absolute top-full left-0 mt-0 bg-white text-gray-800 shadow-lg z-50 min-w-max rounded-b">
                {blogItems.map((item) => (
                  <Link
                    key={item}
                    to="#"
                    onClick={() => setShowBlog(false)}
                    className="block px-4 py-2 hover:bg-blue-600 hover:text-white transition text-sm"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ELEMENTS */}
          <div className="relative">
            <button
              onClick={() => setShowElements(!showElements)}
              className="py-4 px-2 text-gray-800 font-semibold text-sm hover:text-blue-600 transition flex items-center gap-1"
            >
              ELEMENTS <span className="text-xs">▼</span>
            </button>
            {showElements && (
              <div className="absolute top-full left-0 mt-0 bg-white text-gray-800 shadow-lg z-50 min-w-max rounded-b">
                {elementItems.map((item) => (
                  <Link
                    key={item}
                    to="#"
                    onClick={() => setShowElements(false)}
                    className="block px-4 py-2 hover:bg-blue-600 hover:text-white transition text-sm"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Buy Now */}
        <Link
          to="/shop"
          className="py-4 px-4 bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition rounded"
        >
          BUY NOW
        </Link>
      </div>
    </nav>
  );
};
