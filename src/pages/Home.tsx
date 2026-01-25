import { Card } from '../components/Card';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../context/ProductContext';

export const HomePage = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const featuredProducts = products.filter(p => p.featured);
  const onSaleProducts = products.filter(p => p.discount);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="bg-white py-8 px-4">
        <div className="flex items-center justify-between gap-8">
          {/* Left: Man Model */}
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop"
              alt="Men's Fashion Model"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Center: Content */}
          <div className="flex-1 text-center">
            <p className="text-blue-600 font-semibold mb-2 text-sm">NEW COLLECTIONS 2019</p>
            <h1 className="text-5xl font-bold mb-4">MEN'S FASHION</h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor!
            </p>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-2 rounded hover:bg-blue-600 hover:text-white transition font-semibold">
              SHOP NOW
            </button>
          </div>

          {/* Right: Promotional Items */}
          <div className="flex-1 space-y-4">
            {/* White Sneakers */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-blue-600 text-sm font-semibold">WHITE SNEAKERS</p>
              <h3 className="text-xl font-bold mb-1">MIN. 30% OFF</h3>
              <p className="text-gray-600 text-sm mb-3">Men Fashionable Shoes</p>
              <img
                src="/src/assets/images/shoes/image.png"
                alt="White Sneakers"
                className="w-full h-40 object-cover rounded mb-3"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold text-sm">
                SHOP NOW
              </button>
            </div>

            {/* Women's Fashion */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-blue-600 text-sm font-semibold">WOMEN'S FASHION</p>
              <h3 className="text-xl font-bold mb-1">UP TO 65% OFF</h3>
              <p className="text-gray-600 text-sm mb-3">Shoes & Backpacks</p>
              <img
                src="/src/assets/images/women/image.png"
                alt="Women's Fashion"
                className="w-full h-40 object-cover rounded mb-3"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold text-sm">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-8 px-4">
        <div className="flex overflow-x-auto gap-4 pb-4">
          {['Men', 'Women', 'Shoes', 'Bags & Accessories', 'Watches', 'Jewellery', 'Accessories', 'Dresses', 'Tops', 'Lingerie'].map((cat) => (
            <div key={cat} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-75 transition flex-shrink-0">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={cat === 'Women' ? '/src/assets/images/women/image.png' : cat === 'Shoes' ? '/src/assets/images/shoes/image.png' : `https://images.unsplash.com/photo-${
                    cat === 'Men'
                      ? '1507003211169-0a1dd7228f2d'
                      : cat === 'Bags & Accessories'
                      ? '1548036328-c9fa89d128fa'
                      : '1523170335258-f5ed11844a49'
                  }?w=100&h=100&fit=crop`}
                  alt={cat}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-center">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 px-4">
        <h2 className="text-3xl font-bold mb-2 border-b-4 border-blue-600 inline-block pb-2">
          FEATURED PRODUCTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {featuredProducts.map(product => (
            <Card key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* On Sale Products */}
      <section className="py-8 px-4">
        <h2 className="text-3xl font-bold mb-2 border-b-4 border-blue-600 inline-block pb-2">
          ON SALE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {onSaleProducts.map(product => (
            <Card key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      {/* Recent Products */}
      <section className="py-8 px-4">
        <div className="flex gap-8 mb-8 border-b">
          <button className="pb-2 border-b-4 border-blue-600 font-bold text-gray-800">RECENT</button>
          <button className="pb-2 font-bold text-gray-600 hover:text-gray-800">FEATURED</button>
          <button className="pb-2 font-bold text-gray-600 hover:text-gray-800">ON SALE</button>
          <button className="pb-2 font-bold text-gray-600 hover:text-gray-800">TOP RATED</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map(product => (
            <Card key={product.id} product={product} onAddToCart={handleAddToCart} />
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
