import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/api';

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const { products, categories, isLoading } = useProducts();
  const { addToCart } = useCart();

  const category = categories.find(cat => cat._id === categoryId);
  const categoryProducts = products.filter(product => 
    product.category?._id === categoryId
  );

  const handleAddToCart = (product: Product) => {
    const legacyProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      rating: 0,
      category: product.category?.name || '',
      image: `https://dessertshopbackend.onrender.com${product.imageUrl}`,
      description: product.description
    };
    addToCart(legacyProduct as any, 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Category not found</h1>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          Go Home
        </Link>
      </div>
    );
  }

  if (categoryProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">No products found</h1>
        <p className="text-gray-600 mb-6">No products available in "{category.name}" category</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span>{category.name}</span>
        </nav>
        <h1 className="text-4xl font-bold">{category.name}</h1>
        <p className="text-gray-600 mt-2">{categoryProducts.length} products found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryProducts.map(product => (
          <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};