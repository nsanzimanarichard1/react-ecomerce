import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/api';

export const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const { products, categories, isLoading } = useProducts();
  const { addToCart } = useCart();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const searchTerm = searchParams.get('search')?.toLowerCase() || '';
  const categoryFilter = searchParams.get('category') || 'All Categories';

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      productId: product._id,
      quantity: 1,
      product: {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.imageUrl,
        category: product.category?.name || '',
        rating: 0,
        stock: product.stock
      }
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category?.name.toLowerCase().includes(searchTerm);

      const matchesUrlCategory =
        categoryFilter === 'All Categories' || product.category?.name === categoryFilter;

      const matchesSidebarCategories =
        selectedCategories.length === 0 || 
        (product.category && selectedCategories.includes(product.category._id));

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesUrlCategory && matchesSidebarCategories && matchesPrice;
    });
  }, [products, searchTerm, categoryFilter, selectedCategories, priceRange]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
                max="2000000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <p className="text-xs text-gray-600 mt-2">
                ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
              </p>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-sm mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat._id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat._id)}
                      onChange={() => handleCategoryChange(cat._id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setPriceRange([0, 2000000]);
                setSelectedCategories([]);
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
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
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
                  setPriceRange([0, 2000000]);
                  setSelectedCategories([]);
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