import { Link } from 'react-router-dom';
import { IoLocationSharp, IoCall, IoMail, IoTime, IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin, IoLogoInstagram, IoLogoYoutube, IoMusicalNotes } from 'react-icons/io5';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-5 gap-8 mb-8">
          {/* Logo & Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">kapee.</h3>
            <p className="text-sm text-gray-400 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <p className="text-sm text-gray-400 mb-2"><IoLocationSharp className="inline" /> Lorem Ipsum, 2046 Lorem Ipsum</p>
            <p className="text-sm text-gray-400 mb-2"><IoCall className="inline" /> 576-245-2478</p>
            <p className="text-sm text-gray-400"><IoMail className="inline" /> info@kapee.com</p>
            <p className="text-sm text-gray-400 mt-2"><IoTime className="inline" /> Mon-Fri / 9:00 AM - 6:00 PM</p>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-bold text-lg mb-4">INFORMATION</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Store Location</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Shipping & Delivery</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Latest News</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Our Sitemap</Link></li>
            </ul>
          </div>

          {/* Our Service */}
          <div>
            <h4 className="font-bold text-lg mb-4">OUR SERVICE</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Terms of Sale</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Customer Service</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Delivery Information</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Payments</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Saved Cards</Link></li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="font-bold text-lg mb-4">MY ACCOUNT</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">My Account</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">My Shop</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">My Cart</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">My Wishlist</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Checkout</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Tracking Order</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">NEWSLETTER</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our mailing list to get the new updates!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-3 py-2 text-gray-700 rounded-l"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition">
                SIGN UP
              </button>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700"><IoLogoFacebook /></a>
              <a href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700"><IoLogoTwitter /></a>
              <a href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700"><IoLogoLinkedin /></a>
              <a href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700"><IoLogoInstagram /></a>
              <a href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700"><IoLogoYoutube /></a>
              <a href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700"><IoMusicalNotes /></a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
          <p className="text-sm text-gray-400">Kapee © 2026 by PressLayouts All Rights Reserved.</p>
          <div className="flex gap-2">
            <div className="h-6 w-10 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
            <div className="h-6 w-10 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">PP</div>
            <div className="h-6 w-10 bg-gray-600 rounded text-white text-xs flex items-center justify-center font-bold">DISC</div>
            <div className="h-6 w-10 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
