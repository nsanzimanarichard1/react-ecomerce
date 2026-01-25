import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-4">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <p className="text-blue-600 font-semibold mb-2">{product.category}</p>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400">{'⭐'.repeat(Math.floor(product.rating))}</span>
            <span className="text-gray-600">({product.rating} stars)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through ml-4">${product.originalPrice.toFixed(2)}</span>
            )}
            {product.discount && (
              <div className="mt-2 inline-block bg-green-500 text-white px-3 py-1 rounded">
                Save {product.discount}%!
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          {/* Options */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Size</h3>
            <div className="flex gap-2 mb-4">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button key={size} className="border border-gray-300 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Color</h3>
            <div className="flex gap-2">
              {['Red', 'Blue', 'Black', 'White'].map(color => (
                <button key={color} className="border border-gray-300 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition">
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-xl">−</button>
              <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="px-4 py-2 w-12 text-center border-l border-r border-gray-300 outline-none" />
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-xl">+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <button onClick={handleAddToCart} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition mb-3">
            ADD TO CART
          </button>
          <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold text-lg hover:bg-blue-600 hover:text-white transition mb-3">
            ❤ ADD TO WISHLIST
          </button>

          {/* Shipping Info */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-bold mb-3">Shipping Information</h3>
            <p className="text-sm text-gray-600 mb-2">✓ Free shipping on orders over $50</p>
            <p className="text-sm text-gray-600 mb-2">✓ Estimated delivery: 5-7 business days</p>
            <p className="text-sm text-gray-600">✓ Easy returns within 30 days</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 border-b-4 border-blue-600 inline-block pb-2">
          RELATED PRODUCTS
        </h2>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(relProduct => (
            <div key={relProduct.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="bg-gray-200 h-40 mb-4 rounded flex items-center justify-center">
                <img src={relProduct.image} alt={relProduct.name} className="w-full h-full object-cover rounded" />
              </div>
              <h4 className="font-bold text-sm line-clamp-2 mb-2">{relProduct.name}</h4>
              <p className="text-lg font-bold text-blue-600">${relProduct.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
