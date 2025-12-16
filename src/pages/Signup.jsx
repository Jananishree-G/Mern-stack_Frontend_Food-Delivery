import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { confirmPassword, ...userData } = formData;
      const result = await register(userData);
      
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/');
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Abstract Wave Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900" />
      
      {/* Animated Wave Layers */}
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" fill="url(#gradient1)" opacity="0.3">
            <animateTransform attributeName="transform" type="translate" values="-100 0;100 0;-100 0" dur="20s" repeatCount="indefinite" />
          </path>
          <path d="M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z" fill="url(#gradient2)" opacity="0.2">
            <animateTransform attributeName="transform" type="translate" values="100 0;-100 0;100 0" dur="15s" repeatCount="indefinite" />
          </path>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-ping" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-pink-400/30 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-blue-400/20 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass backdrop-blur-xl border border-white/30 rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-white/70">Join us and start ordering delicious food</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full pl-12 pr-4 py-3 rounded-2xl glass backdrop-blur-md border text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all ${
                  errors.name ? 'border-red-500' : 'border-white/20'
                }`}
              />
            </div>
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full pl-12 pr-4 py-3 rounded-2xl glass backdrop-blur-md border text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all ${
                  errors.email ? 'border-red-500' : 'border-white/20'
                }`}
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={`w-full pl-12 pr-4 py-3 rounded-2xl glass backdrop-blur-md border text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all ${
                  errors.phone ? 'border-red-500' : 'border-white/20'
                }`}
              />
            </div>
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={`w-full pl-12 pr-12 py-3 rounded-2xl glass backdrop-blur-md border text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all ${
                  errors.password ? 'border-red-500' : 'border-white/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full pl-12 pr-12 py-3 rounded-2xl glass backdrop-blur-md border text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all ${
                  errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <motion.button 
            type="submit" 
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 mt-6"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-white/70">
            Already have an account? 
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold"> Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;