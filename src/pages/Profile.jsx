import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { 
  User, 
  MapPin, 
  Clock, 
  Star, 
  Heart, 
  Settings, 
  LogOut,
  Edit3,
  Package,
  CreditCard,
  Plus,
  Save,
  X
} from 'lucide-react';

const Profile = () => {
  const { user: authUser, logout } = useAuth();
  const { addToCart } = useCart();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({ type: '', address: '' });
  const [user, setUser] = useState({
    name: authUser?.name || 'Guest User',
    email: authUser?.email || 'guest@example.com',
    phone: authUser?.phone || '+91 00000 00000',
    avatar: authUser?.avatar || null,
    joinDate: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : new Date().toLocaleDateString()
  });

  useEffect(() => {
    if (authUser) {
      const userData = {
        name: authUser.name || 'Guest User',
        email: authUser.email || 'guest@example.com',
        phone: authUser.phone || '+91 00000 00000',
        avatar: authUser.avatar || null,
        joinDate: authUser.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : new Date().toLocaleDateString()
      };
      setUser(userData);
      setProfileForm({
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      });
    }
  }, [authUser]);

  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      restaurant: 'Pizza Palace',
      items: ['Margherita Pizza', 'Garlic Bread'],
      total: 599,
      date: '2024-01-15',
      status: 'delivered',
      rating: 4.5
    },
    {
      id: 'ORD002',
      restaurant: 'Burger Hub',
      items: ['Chicken Burger', 'Fries', 'Coke'],
      total: 399,
      date: '2024-01-12',
      status: 'delivered',
      rating: 5.0
    },
    {
      id: 'ORD003',
      restaurant: 'Spice Garden',
      items: ['Chicken Biryani', 'Raita'],
      total: 449,
      date: '2024-01-10',
      status: 'delivered',
      rating: 4.2
    }
  ]);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Apartment 4B, New York, NY 10001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      address: '456 Business Ave, Suite 200, New York, NY 10002',
      isDefault: false
    }
  ]);

  const [activeTab, setActiveTab] = useState('orders');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-400';
      case 'preparing': return 'text-yellow-400';
      case 'onway': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const averageRating = orders.reduce((sum, order) => sum + order.rating, 0) / orders.length;

  const handleReorder = async (order) => {
    try {
      const orderItems = order.items.map(itemName => ({
        id: Math.random().toString(),
        name: itemName,
        price: Math.floor(order.total / order.items.length),
        restaurant: order.restaurant,
        image: 'https://picsum.photos/300/200?random=' + Math.floor(Math.random() * 100)
      }));
      
      for (const item of orderItems) {
        await addToCart(item, 1);
      }
      
      toast.success(`${order.items.length} items added to cart!`);
    } catch (error) {
      toast.error('Failed to add items to cart');
    }
  };

  const handleAddAddress = () => {
    setShowAddressForm(true);
    setEditingAddress(null);
    setAddressForm({ type: '', address: '' });
  };

  const handleEditAddress = (address) => {
    setShowAddressForm(true);
    setEditingAddress(address.id);
    setAddressForm({ type: address.type, address: address.address });
  };

  const handleSaveAddress = () => {
    if (!addressForm.type || !addressForm.address) {
      toast.error('Please fill all fields');
      return;
    }

    if (editingAddress) {
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress 
          ? { ...addr, type: addressForm.type, address: addressForm.address }
          : addr
      ));
      toast.success('Address updated successfully!');
    } else {
      const newAddress = {
        id: Date.now(),
        type: addressForm.type,
        address: addressForm.address,
        isDefault: addresses.length === 0
      };
      setAddresses(prev => [...prev, newAddress]);
      toast.success('Address added successfully!');
    }
    
    setShowAddressForm(false);
    setAddressForm({ type: '', address: '' });
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    if (!profileForm.name || !profileForm.email || !profileForm.phone) {
      toast.error('Please fill all fields');
      return;
    }

    setUser(prev => ({
      ...prev,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone
    }));
    
    setIsEditingProfile(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setProfileForm({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-10 right-1/4 w-28 h-28 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <button 
                onClick={handleEditProfile}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
              >
                <Edit3 className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              {isEditingProfile ? (
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl glass backdrop-blur-md border border-white/20 text-white bg-white/10 placeholder-white/60 focus:outline-none focus:border-white/40"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl glass backdrop-blur-md border border-white/20 text-white bg-white/10 placeholder-white/60 focus:outline-none focus:border-white/40"
                    placeholder="Email Address"
                  />
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl glass backdrop-blur-md border border-white/20 text-white bg-white/10 placeholder-white/60 focus:outline-none focus:border-white/40"
                    placeholder="Phone Number"
                  />
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                  <p className="text-white/70 mb-1">{user.email}</p>
                  <p className="text-white/70 mb-4">{user.phone}</p>
                </>
              )}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{orders.length}</div>
                  <div className="text-white/60 text-sm">Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">₹{totalSpent}</div>
                  <div className="text-white/60 text-sm">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="text-white/60 text-sm">Avg Rating</div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
              >
                <Settings className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 hover:bg-red-500/30 transition-colors"
              >
                <LogOut className="w-5 h-5 text-red-400" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'orders', label: 'Order History', icon: Package },
            { id: 'addresses', label: 'Addresses', icon: MapPin },
            { id: 'payments', label: 'Payment Methods', icon: CreditCard }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'glass backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:border-white/40'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{order.restaurant}</h3>
                        <span className={`text-sm font-medium ${getStatusColor(order.status)} capitalize`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm mb-2">
                        {order.items.join(', ')}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>Order #{order.id}</span>
                        <span>•</span>
                        <span>{order.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">₹{order.total}</div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white/70 text-sm">{order.rating}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReorder(order)}
                        className="px-4 py-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                      >
                        Reorder
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Saved Addresses</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddAddress}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl font-semibold shadow-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add New Address
                </motion.button>
              </div>
              
              {addresses.map((address) => (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{address.type}</h3>
                        {address.isDefault && (
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-white/70">{address.address}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditAddress(address)}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                      >
                        <Edit3 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Address Form Modal */}
              {showAddressForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {editingAddress ? 'Edit Address' : 'Add New Address'}
                    </h3>
                    <button 
                      onClick={() => setShowAddressForm(false)}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Address Type</label>
                      <select
                        value={addressForm.type}
                        onChange={(e) => setAddressForm(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl glass backdrop-blur-md border border-white/20 text-white bg-white/10 focus:outline-none focus:border-white/40"
                        style={{ color: 'white' }}
                      >
                        <option value="" style={{ color: 'black' }}>Select Type</option>
                        <option value="Home" style={{ color: 'black' }}>Home</option>
                        <option value="Work" style={{ color: 'black' }}>Work</option>
                        <option value="Other" style={{ color: 'black' }}>Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Full Address</label>
                      <textarea
                        value={addressForm.address}
                        onChange={(e) => setAddressForm(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter complete address with landmarks"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl glass backdrop-blur-md border border-white/20 text-white bg-white/10 placeholder-white/60 focus:outline-none focus:border-white/40 resize-none"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveAddress}
                        className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {editingAddress ? 'Update Address' : 'Save Address'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddressForm(false)}
                        className="px-6 py-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl font-semibold shadow-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Payment Method
                </motion.button>
              </div>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                        <span className="text-white font-bold">UPI</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">UPI Payment</h3>
                        <p className="text-white/60 text-sm">user@paytm</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                        <Edit3 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Credit Card</h3>
                        <p className="text-white/60 text-sm">**** **** **** 1234</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                        <Edit3 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">COD</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Cash on Delivery</h3>
                        <p className="text-white/60 text-sm">Pay when you receive</p>
                      </div>
                    </div>
                    <div className="text-green-400 font-semibold text-sm">
                      Available
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;