import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2, Sparkles, Gift } from 'lucide-react';

const SmartCart = ({ cartItems, onUpdateQuantity, onRemoveItem, onAddCombo }) => {
  const [comboSuggestions, setComboSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Generate combo suggestions based on cart items
  useEffect(() => {
    if (cartItems.length > 0) {
      const suggestions = generateComboSuggestions(cartItems);
      setComboSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [cartItems]);

  const generateComboSuggestions = (items) => {
    const suggestions = [];
    
    // Check for pizza + drink combo
    const hasPizza = items.some(item => item.name.toLowerCase().includes('pizza'));
    const hasDrink = items.some(item => item.category === 'beverages');
    
    if (hasPizza && !hasDrink) {
      suggestions.push({
        id: 'pizza-drink',
        title: 'Perfect Combo!',
        description: 'Add a cold drink with your pizza',
        items: ['Coca Cola', 'Pepsi', 'Sprite'],
        discount: 15,
        savings: 25
      });
    }

    // Check for main course + dessert combo
    const hasMainCourse = items.some(item => 
      ['biryani', 'curry', 'burger', 'pasta'].some(food => 
        item.name.toLowerCase().includes(food)
      )
    );
    const hasDessert = items.some(item => item.category === 'desserts');
    
    if (hasMainCourse && !hasDessert) {
      suggestions.push({
        id: 'meal-dessert',
        title: 'Sweet Ending',
        description: 'Complete your meal with a dessert',
        items: ['Ice Cream', 'Brownie', 'Gulab Jamun'],
        discount: 20,
        savings: 30
      });
    }

    return suggestions.slice(0, 2); // Limit to 2 suggestions
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((savings, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return savings + ((item.originalPrice - item.price) * item.quantity);
      }
      return savings;
    }, 0);
  };

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-24 h-24 mx-auto mb-4 rounded-full glass flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-white/60" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
        <p className="text-white/60">Add some delicious items to get started!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="space-y-4">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass backdrop-blur-md border border-white/20 rounded-2xl p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://via.placeholder.com/80x80/f59e0b/ffffff?text=${encodeURIComponent(item.name?.substring(0, 3) || 'Food')}`}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <p className="text-white/60 text-sm">{item.restaurant}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white font-bold">₹{item.price}</span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-white/50 text-sm line-through">₹{item.originalPrice}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-white" />
                    </button>
                    <span className="text-white font-semibold px-3">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Combo Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold">Smart Suggestions</h3>
            </div>
            
            {comboSuggestions.map((combo) => (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass backdrop-blur-md border border-yellow-400/30 rounded-2xl p-4 bg-gradient-to-r from-yellow-400/10 to-orange-400/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Gift className="w-4 h-4 text-yellow-400" />
                      <h4 className="text-white font-semibold text-sm">{combo.title}</h4>
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Save ₹{combo.savings}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">{combo.description}</p>
                    <div className="flex gap-2">
                      {combo.items.map((item, index) => (
                        <span key={index} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onAddCombo && onAddCombo(combo)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    Add Combo
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Summary */}
      <div className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <div className="space-y-3">
          <div className="flex justify-between text-white/70">
            <span>Subtotal</span>
            <span>₹{calculateTotal()}</span>
          </div>
          
          {calculateSavings() > 0 && (
            <div className="flex justify-between text-green-400">
              <span>You saved</span>
              <span>-₹{calculateSavings()}</span>
            </div>
          )}
          
          <div className="flex justify-between text-white/70">
            <span>Delivery Fee</span>
            <span>₹40</span>
          </div>
          
          <div className="flex justify-between text-white/70">
            <span>Taxes</span>
            <span>₹{Math.round(calculateTotal() * 0.05)}</span>
          </div>
          
          <hr className="border-white/20" />
          
          <div className="flex justify-between text-white font-bold text-lg">
            <span>Total</span>
            <span>₹{calculateTotal() + 40 + Math.round(calculateTotal() * 0.05)}</span>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
        >
          Proceed to Checkout
        </motion.button>
      </div>
    </div>
  );
};

export default SmartCart;