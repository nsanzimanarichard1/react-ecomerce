export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid grid-cols-2 gap-8 items-center mb-12">
        <div>
          <img src="https://via.placeholder.com/500x400?text=About+Us" alt="About" className="rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">About Kapee</h1>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-gray-600 mb-4">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h3 className="text-2xl font-bold mb-3">Why Choose Us?</h3>
          <ul className="space-y-2 text-gray-600">
            <li>✓ Wide variety of products</li>
            <li>✓ Best prices guaranteed</li>
            <li>✓ Fast shipping</li>
            <li>✓ 24/7 customer support</li>
            <li>✓ Secure payments</li>
          </ul>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-12 rounded-lg mb-12">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-4xl font-bold">10K+</div>
            <p className="text-blue-200">Happy Customers</p>
          </div>
          <div>
            <div className="text-4xl font-bold">50K+</div>
            <p className="text-blue-200">Products</p>
          </div>
          <div>
            <div className="text-4xl font-bold">100+</div>
            <p className="text-blue-200">Brands</p>
          </div>
          <div>
            <div className="text-4xl font-bold">5★</div>
            <p className="text-blue-200">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <h2 className="text-3xl font-bold mb-8">Our Team</h2>
      <div className="grid grid-cols-4 gap-6">
        {['CEO', 'CTO', 'Manager', 'Developer'].map((role) => (
          <div key={role} className="bg-white rounded-lg shadow-md overflow-hidden text-center">
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              <img src="https://via.placeholder.com/200" alt={role} />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg">{role}</h4>
              <p className="text-gray-600 text-sm">Professional</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
