import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-purple-900 text-white mt-16">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center">
                <span className="text-xl">🍽️</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                FoodieExpress
              </span>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Delivering happiness to your doorstep with fresh, delicious food.
            </p>
            <div className="flex gap-4">
              <div 
                onClick={() => window.open('https://facebook.com', '_blank')}
                className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
              >
                <Facebook className="w-4 h-4 text-white" />
              </div>
              <div 
                onClick={() => window.open('https://twitter.com', '_blank')}
                className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
              >
                <Twitter className="w-4 h-4 text-white" />
              </div>
              <div 
                onClick={() => window.open('https://instagram.com', '_blank')}
                className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Home</Link>
              <Link to="/cart" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Cart</Link>
              <Link to="/offers" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Offers</Link>
              <Link to="/profile" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Profile</Link>
              <Link to="/orders" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Orders</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="text-white font-semibold text-sm">+91 98765 43210</p>
                  <p className="text-gray-400 text-xs">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="text-white font-semibold text-sm">support@foodieexpress.com</p>
                  <p className="text-gray-400 text-xs">Quick Response</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 FoodieExpress. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;