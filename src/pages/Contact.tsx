export const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                placeholder="Your phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                placeholder="Your message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <div className="bg-white p-8 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Address</h3>
                <p className="text-gray-600">
                  Lorem Ipsum, 2046 Lorem Ipsum<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <p className="text-gray-600">
                  <a href="tel:+15762452478" className="hover:text-blue-600">
                    +1 (576) 245-2478
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:info@kapee.com" className="hover:text-blue-600">
                    info@kapee.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <span className="text-gray-600">Map will be displayed here</span>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How can I track my order?', a: 'You can track your order using the tracking link sent to your email.' },
            { q: 'What is the return policy?', a: 'We offer 30 days return policy on all items.' },
            { q: 'Do you ship internationally?', a: 'Yes, we ship to over 150 countries worldwide.' },
            { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days.' },
          ].map((faq, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
