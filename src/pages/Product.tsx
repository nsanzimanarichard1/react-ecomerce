import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/api';

export const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p._id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    const legacyProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      rating: 0,
      category: product.category?.name || '',
      image: `https://dessertshopbackend.onrender.com${product.imageUrl}`,
      description: product.description
    };
    addToCart(legacyProduct as any, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          ← Back to Products
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-4">
            <img 
              src={`https://dessertshopbackend.onrender.com${product.imageUrl}`} 
              alt={product.name} 
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
        </div>

        <div>
          <p className="text-blue-600 font-semibold mb-2">{product.category?.name}</p>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <div className="mb-6">
            <span className="text-4xl font-bold text-blue-600">${product.price}</span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-xl">−</button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                className="px-4 py-2 w-12 text-center border-l border-r border-gray-300 outline-none" 
              />
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-xl">+</button>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleAddToCart} 
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
            >
              ADD TO CART
            </button>
            <button 
              onClick={handleBuyNow} 
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};