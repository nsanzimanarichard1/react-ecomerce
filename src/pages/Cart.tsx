import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  const FREE_SHIPPING_THRESHOLD = 102;
  const totalPrice = cart.reduce((sum, item) => sum + item.price * quantities[item.id], 0);
  const shippingProgress = (totalPrice / FREE_SHIPPING_THRESHOLD) * 100;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantities({ ...quantities, [id]: newQuantity });
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link
            to="/shop"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl hover:bg-blue-700 p-2 rounded"
          >
            ‹
          </button>
          <h1 className="text-2xl font-bold flex-1 text-center">MY CART</h1>
        </div>

        {/* Cart Items */}
        <div className="bg-white p-6 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-6 last:border-b-0">
              {/* Image */}
              <div className="shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=Product';
                  }}
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {quantities[item.id]} × ${item.price.toFixed(2)} = $
                  {(item.price * quantities[item.id]).toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => handleQuantityChange(item.id, quantities[item.id] - 1)}
                    className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {quantities[item.id]}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, quantities[item.id] + 1)}
                    className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700 text-xl p-2"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="bg-white px-6 py-4 border-t-2">
          <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
            <span>SUBTOTAL:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {/* Shipping Progress */}
          <div className="mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${Math.min(shippingProgress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {shippingProgress >= 100 ? (
                <span className="text-green-600 font-semibold">✓ Free shipping eligible!</span>
              ) : (
                `Spend $${remainingForFreeShipping.toFixed(2)} to get free shipping`
              )}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => navigate('/shop')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded"
          >
            VIEW CART
          </button>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
