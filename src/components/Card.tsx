import { Link } from 'react-router-dom';
import type { Product } from '../context/ProductContext';

interface CardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const Card = ({ product, onAddToCart }: CardProps) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group">
        {/* Image Container */}
        <div className="relative bg-gray-100 h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded">
              FEATURED
            </span>
          )}
          {product.discount && (
            <span className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-800 line-clamp-2 mb-2 h-14 group-hover:text-blue-600 transition">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400">{'⭐'.repeat(Math.floor(product.rating))}</span>
            <span className="text-xs text-gray-600">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Category */}
          <p className="text-xs text-gray-600 mb-3">{product.category}</p>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(product);
            }}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Link>
  );
};
