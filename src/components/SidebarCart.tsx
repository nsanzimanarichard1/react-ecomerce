import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

interface SidebarCartProps {
  isOpen: boolean
  onClose: () => void
}

const FREE_SHIPPING_THRESHOLD = 200

export const SidebarCart = ({ isOpen, onClose }: SidebarCartProps) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()

  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-90 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white px-4 py-4 flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-2xl hover:bg-blue-700 rounded px-2"
          >
            ←
          </button>
          <h2 className="font-bold text-lg flex-1 text-center">MY CART</h2>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-64px)]">
          {/* Items */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {!Array.isArray(cart) || cart.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>Your cart is empty</p>
              </div>
            ) : (
              cart.map((item: any) => (
              <div key={item.id} className="flex gap-3 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded border"
                />

                <div className="flex-1">
                  <p className="text-sm font-semibold leading-snug line-clamp-2">
                    {item.name}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 border rounded flex items-center justify-center"
                    >
                      −
                    </button>

                    <span className="text-sm w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 border rounded flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {item.quantity} × ${item.price?.toFixed(2) || '0.00'}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  🗑
                </button>
              </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-4 py-4 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between font-bold text-lg">
              <span>SUBTOTAL:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {/* Free shipping bar */}
            <div>
              <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {progress >= 100
                  ? '🎉 You got free shipping!'
                  : `Spend $${remaining.toFixed(2)} to get free shipping`}
              </p>
            </div>

            {/* Buttons */}
            <Link
              to="/cart"
              onClick={onClose}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded font-bold hover:bg-blue-700"
            >
              VIEW CART
            </Link>

            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full bg-orange-500 text-white text-center py-3 rounded font-bold hover:bg-orange-600"
            >
              CHECKOUT
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
