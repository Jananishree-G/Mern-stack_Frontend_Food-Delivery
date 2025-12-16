import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const result = await login(formData);
      
      if (result.success) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-blue-900 to-cyan-900" />
      
      {/* Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl rotate-45 animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }} />
      </div>
      
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass backdrop-blur-xl border border-white/30 rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white/70">Sign in to your account to continue ordering</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label className="block text-white font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
          
          <motion.button 
            type="submit" 
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-white/70">
            Don't have an account? 
            <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-semibold"> Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;