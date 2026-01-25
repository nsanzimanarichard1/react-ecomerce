import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../context/ProductContext';

export const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);

  const searchTerm = searchParams.get('search')?.toLowerCase() || '';
  const categoryFilter = searchParams.get('category') || 'All Categories';

  const categories = [
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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm);

      // Category filter from URL
      const matchesUrlCategory =
        categoryFilter === 'All Categories' || product.category === categoryFilter;

      // Selected categories filter (from sidebar)
      const matchesSidebarCategories =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      // Rating filter
      const matchesRating = product.rating >= minRating;

      return (
        matchesSearch &&
        matchesUrlCategory &&
        matchesSidebarCategories &&
        matchesPrice &&
        matchesRating
      );
    });
  }, [searchTerm, categoryFilter, selectedCategories, priceRange, minRating]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleAddToCartClick = (product: Product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-2">Shop</h1>
      <p className="text-gray-600 mb-8">
        {searchTerm ? `Search results for "${searchTerm}"` : 'Browse our collection of products'}
        {filteredProducts.length > 0 && ` (${filteredProducts.length} products)`}
      </p>

      <div className="grid grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-20 space-y-6">
            <h3 className="font-bold text-lg border-b pb-3">FILTERS</h3>

            {/* Price Range */}
            <div>
              <h4 className="font-bold text-sm mb-3">Price Range</h4>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <p className="text-xs text-gray-600 mt-2">
                ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-sm mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="font-bold text-sm mb-3">Rating</h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span>{'⭐'.repeat(rating)} & Up</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === 0}
                    onChange={() => setMinRating(0)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span>All Ratings</span>
                </label>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setPriceRange([0, 500]);
                setSelectedCategories([]);
                setMinRating(0);
              }}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold text-sm"
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCartClick}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-16 text-center">
              <p className="text-2xl font-bold text-gray-600 mb-4">No products found</p>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setPriceRange([0, 500]);
                  setSelectedCategories([]);
                  setMinRating(0);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
