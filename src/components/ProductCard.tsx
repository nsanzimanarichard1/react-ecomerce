import { Link } from 'react-router-dom';
import type { Product } from '../types/api';
import { getImageUrl } from '../utils/imageUtils';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const imageUrl = getImageUrl(product.imageUrl);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product._id}`}>
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-image.svg';
          }}
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-blue-600">
            ${product.price.toLocaleString()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? `In Stock (${product.stock})` : 'Out of Stock'}
          </span>
        </div>

        {product.category && (
          <div className="mb-3">
            <Link to={`/category/${product.category._id || product.category.id}`}>
              <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer">
                {product.category.name}
              </span>
            </Link>
          </div>
        )}

        <button
          onClick={() => onAddToCart?.(product)}
          disabled={!product.inStock}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600
          cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};