import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FloatingCart = () => {
  const { cart, itemCount } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    if (!cart.items || cart.items.length === 0) return 0;
    return cart.items.reduce((total, item) => {
      const price = item.price || item.menuItem?.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  if (!cart.items || cart.items.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-6 right-6 z-50 max-w-md mx-auto"
      >
        <motion.button
          onClick={handleViewCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-4 shadow-2xl border border-white/20 backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <motion.span
                  key={itemCount}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              </div>
              <div className="text-left">
                <div className="font-semibold">
                  {itemCount} item{itemCount !== 1 ? 's' : ''}
                </div>
                <div className="text-sm opacity-90">
                  {cart.restaurant?.name || 'Your Order'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-bold text-lg">₹{calculateTotal()}</div>
                <div className="text-xs opacity-90">Plus taxes</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingCart;