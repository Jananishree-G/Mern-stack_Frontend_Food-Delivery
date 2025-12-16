import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart, itemCount, totalAmount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass backdrop-blur-md border border-white/20 rounded-3xl p-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Please log in to view your cart</h2>
          <Link 
            to="/login" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            Login
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleIncrease = async (itemId) => {
    try {
      await increaseQty(itemId);
    } catch (error) {
      console.error('Failed to increase quantity:', error);
    }
  };

  const handleDecrease = async (itemId) => {
    try {
      await decreaseQty(itemId);
    } catch (error) {
      console.error('Failed to decrease quantity:', error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass backdrop-blur-md border border-white/20 rounded-3xl p-12"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full glass flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-white/60" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-white/70 mb-6">Add some delicious items to get started!</p>
          <Link 
            to="/" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            Browse Restaurants
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Your Cart</h1>
          {cart.restaurant && (
            <p className="text-white/70 text-lg">From {cart.restaurant.name}</p>
          )}
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {cart.items.map((item) => {
              const itemId = item.menuItem?.id || item.menuItem?._id || item.id;
              const itemName = item.menuItem?.name || 'Unknown Item';
              const itemPrice = item.price || item.menuItem?.price || 0;
              
              return (
                <motion.div
                  key={itemId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://via.placeholder.com/80x80/f59e0b/ffffff?text=${encodeURIComponent(itemName.substring(0, 3))}`}
                      alt={itemName}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{itemName}</h3>
                      <p className="text-white/60">{cart.restaurant?.name || 'Restaurant'}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-white font-bold text-xl">₹{itemPrice}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
                        <button
                          onClick={() => handleDecrease(itemId)}
                          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <Minus className="w-5 h-5 text-white" />
                        </button>
                        <span className="text-white font-semibold px-4 text-lg">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(itemId)}
                          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <Plus className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(itemId)}
                        className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                      
                      {/* Item Total */}
                      <div className="text-right min-w-[80px]">
                        <div className="text-white font-bold text-lg">₹{itemPrice * item.quantity}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Cart Summary */}
          <div className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
            <div className="space-y-3">
              <div className="flex justify-between text-white/70">
                <span>Subtotal ({itemCount} items)</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Delivery Fee</span>
                <span>₹40</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Taxes & Fees</span>
                <span>₹{Math.round(totalAmount * 0.05)}</span>
              </div>
              <hr className="border-white/20" />
              <div className="flex justify-between text-white font-bold text-xl">
                <span>Total</span>
                <span>₹{totalAmount + 40 + Math.round(totalAmount * 0.05)}</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearCart}
                className="flex-1 bg-red-500/20 text-red-400 py-3 rounded-2xl font-semibold hover:bg-red-500/30 transition-all"
              >
                Clear Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="flex-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;