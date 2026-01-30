import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/api';

export const HomePage = () => {
  const { products, categories, isLoading } = useProducts();
  const { addToCart } = useCart();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const heroProducts = Array.isArray(products) ? products.slice(0, 5) : [];

  useEffect(() => {
    if (heroProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroProducts.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [heroProducts.length]);

  const nextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroProducts.length);
  };

  const prevHero = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      category: product.category?.name || '',
      image: `https://dessertshopbackend.onrender.com${product.imageUrl}`,
      description: product.description,
      rating: 4.5,
      quantity: 1
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const featuredProducts = Array.isArray(products) ? products.slice(0, 5) : [];
  const recentProducts = Array.isArray(products) ? products.slice(0, 8) : [];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="bg-white py-8 px-4">
        <div className="flex items-center justify-between gap-8">
          {/* Left: Product Image Slider */}
          <div className="flex-1 relative">
            <div className="relative overflow-hidden rounded-lg h-96">
              {heroProducts.map((product, index) => (
                <div
                  key={product._id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={`https://dessertshopbackend.onrender.com${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.svg';
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevHero}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition"
            >
              ←
            </button>
            <button
              onClick={nextHero}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition"
            >
              →
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {heroProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentHeroIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Center: Content */}
          <div className="flex-1 text-center">
            <p className="text-blue-600 font-semibold mb-2 text-sm">NEW COLLECTIONS ON FASHION NOW</p>
            <h1 className="text-5xl font-bold mb-4">SHOP NOW</h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Discover amazing products with great deals and quality you can trust!
            </p>
            <Link to="/shop" className="border-2 border-blue-600 text-blue-600 px-8 py-2 rounded hover:bg-blue-600 hover:text-white transition font-semibold">
              SHOP NOW
            </Link>
          </div>

          {/* Right: Featured Products */}
          <div className="flex-1 space-y-4">
            {Array.isArray(products) && products.slice(0, 2).map((product) => (
              <div key={product._id} className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-blue-600 text-sm font-semibold">{product.category?.name || 'FEATURED'}</p>
                <h3 className="text-xl font-bold mb-1">${product.price}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.name}</p>
                <img
                  src={`https://dessertshopbackend.onrender.com${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-3"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.svg';
                  }}
                />
                <Link to={`/product/${product._id}`} className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold text-sm">
                  VIEW PRODUCT
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-8 px-4">
        <h2 className="text-3xl font-bold mb-6 border-b-4 border-blue-600 inline-block pb-2">
          CATEGORIES
        </h2>
        <div className="relative">
          <button 
            onClick={() => {
              const container = document.getElementById('categories-container');
              container?.scrollBy({ left: -200, behavior: 'smooth' });
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition"
          >
            ←
          </button>
          <button 
            onClick={() => {
              const container = document.getElementById('categories-container');
              container?.scrollBy({ left: 200, behavior: 'smooth' });
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition"
          >
            →
          </button>
          <div 
            id="categories-container"
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {Array.isArray(categories) && categories.map((category) => {
              const categoryProduct = Array.isArray(products) ? products.find(product => 
                product.category?._id === category._id || product.category?.id === category._id
              ) : null;
              
              return (
                <Link 
                  key={category._id} 
                  to={`/category/${category._id}`} 
                  className="group flex flex-col items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer min-w-[120px]"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden group-hover:scale-110 transition-transform">
                    {categoryProduct ? (
                      <img 
                        src={`https://dessertshopbackend.onrender.com${categoryProduct.imageUrl}`}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center" style={{display: categoryProduct ? 'none' : 'flex'}}>
                      <span className="text-xl font-bold text-white">{category.name[0].toUpperCase()}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-center text-gray-700 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 px-4">
        <h2 className="text-3xl font-bold mb-2 border-b-4 border-blue-600 inline-block pb-2">
          FEATURED PRODUCTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {featuredProducts.map(product => (
            <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* Recent Products */}
      <section className="py-8 px-4">
        <div className="flex gap-8 mb-8 border-b">
          <button className="pb-2 border-b-4 border-blue-600 font-bold text-gray-800">RECENT</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentProducts.map(product => (
            <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 px-4 bg-gray-100 mt-8 rounded-lg">
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {['BEAUTY', 'DESIGN', 'DRESS', 'FASHION', 'JACKET', 'SHOES'].map((brand) => (
            <div key={brand} className="text-center cursor-pointer hover:opacity-75 transition">
              <div className="w-24 h-24 bg-gray-400 rounded flex items-center justify-center text-white font-bold text-2xl">
                {brand[0]}
              </div>
              <p className="text-sm font-semibold mt-2">{brand}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};