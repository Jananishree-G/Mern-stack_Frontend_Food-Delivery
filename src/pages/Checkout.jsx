import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Wallet, Banknote, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [address, setAddress] = useState('123 Main Street, New York, NY 10001');

  const calculateSubtotal = () => {
    if (!cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const deliveryFee = 40;
  const taxes = Math.round(calculateSubtotal() * 0.05);
  const total = calculateSubtotal() + deliveryFee + taxes;

  const handlePlaceOrder = async () => {
    try {
      // Simulate order placement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/order/${orderId}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI Payment', icon: Wallet },
    { id: 'cash', name: 'Cash on Delivery', icon: Banknote }
  ];

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" />
      <div className="absolute top-10 right-10 w-36 h-36 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-28 h-28 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="w-10 h-10 rounded-full glass backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Address & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary-400" />
                <h2 className="text-xl font-semibold text-white">Delivery Address</h2>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-white font-medium mb-2">Home</p>
                <p className="text-white/70">{address}</p>
                <button className="text-primary-400 text-sm mt-2 hover:text-primary-300">
                  Change Address
                </button>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'bg-primary-500/20 border border-primary-400/50'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="sr-only"
                      />
                      <Icon className="w-5 h-5 text-white" />
                      <span className="text-white font-medium">{method.name}</span>
                    </label>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6 h-fit"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
            
            {/* Items */}
            <div className="space-y-3 mb-6">
              {cart.items?.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-white/70">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-white">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t border-white/20 pt-4">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>₹{calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Taxes</span>
                <span>₹{taxes}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg border-t border-white/20 pt-2">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Place Order ₹{total}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;