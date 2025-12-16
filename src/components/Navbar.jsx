import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, ShoppingCart, User, LogOut, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md border-b border-white/20"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center"
            >
              <span className="text-xl">🍽️</span>
            </motion.div>
            <span className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors">
              FoodieExpress
            </span>
          </Link>
          
          {/* Location */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="hidden md:flex items-center gap-2 glass backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 cursor-pointer hover:border-white/40 transition-all"
          >
            <MapPin className="w-5 h-5 text-primary-400" />
            <div className="text-white">
              <div className="text-xs text-white/60">Deliver to</div>
              <div className="text-sm font-semibold">Current Location</div>
            </div>
          </motion.div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/offers" className="text-white hover:text-primary-300 transition-colors font-medium">
              Offers
            </Link>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search restaurants, food..." 
                className="w-full pl-12 pr-4 py-3 rounded-2xl glass backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          {/* Right Menu */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Cart */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/cart" className="relative flex items-center gap-2 glass backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 hover:border-white/40 transition-all">
                    <ShoppingCart className="w-5 h-5 text-white" />
                    <span className="hidden md:block text-white font-medium">Cart</span>
                    {itemCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                      >
                        {itemCount}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
                
                {/* User Menu */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 glass backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 hover:border-white/40 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:block text-white font-medium">{user?.name || 'User'}</span>
                  </motion.button>
                  
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-48 glass backdrop-blur-md border border-white/20 rounded-2xl py-2 shadow-xl"
                    >
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link 
                        to="/order/12345" 
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Package className="w-4 h-4" />
                        Orders
                      </Link>
                      <hr className="my-2 border-white/20" />
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/login" 
                    className="px-6 py-2 text-white font-medium hover:text-primary-300 transition-colors"
                  >
                    Log in
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/signup" 
                    className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Sign up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;