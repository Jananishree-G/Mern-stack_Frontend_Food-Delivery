import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { categories, foodItems, getFoodsByCategory } from '../data/modernFoodData';
import toast from 'react-hot-toast';
import { Star, Clock, Truck, Plus, Minus } from 'lucide-react';
import FloatingCart from '../components/FloatingCart';
import RatingDisplay from '../components/RatingDisplay';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('meals');
  
  const { addToCart, getItemQuantity, increaseQty, decreaseQty } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchRestaurantData();
    // Load sample food items for demo
    setMenuItems(foodItems);
  }, [id]);

  const fetchRestaurantData = async () => {
    try {
      const restaurantRes = await axios.get(`/api/restaurants/${id}`);
      setRestaurant(restaurantRes.data.data);
    } catch (error) {
      console.error('Failed to fetch restaurant data:', error);
      // Fallback to mock restaurant data
      const mockRestaurant = {
        _id: id,
        name: 'Sample Restaurant',
        cuisine: 'Multi-Cuisine',
        rating: 4.5,
        deliveryTime: '30-45 min',
        deliveryFee: 40,
        description: 'Delicious food delivered fresh to your door'
      };
      setRestaurant(mockRestaurant);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (menuItem) => {
    try {
      const currentQuantity = getItemQuantity(menuItem.id);
      if (currentQuantity > 0) {
        await increaseQty(menuItem.id);
      } else {
        await addToCart(menuItem, 1);
      }
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  const handleIncrease = async (menuItemId) => {
    await increaseQty(menuItemId);
  };

  const handleDecrease = async (menuItemId) => {
    await decreaseQty(menuItemId);
  };

  const filteredItems = getFoodsByCategory(selectedCategory);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading restaurant...</p>
      </div>
    );
  }

  if (!restaurant) {
    return <div className="error">Restaurant not found</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Restaurant Header */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={`https://via.placeholder.com/1200x400/6366f1/ffffff?text=${encodeURIComponent(restaurant.name + ' Restaurant')}`}
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">{restaurant.name}</h1>
            <p className="text-white/80 text-lg mb-1">{restaurant.cuisine}</p>
            <p className="text-white/70 mb-4">{restaurant.description}</p>
            <div className="flex flex-wrap items-center gap-6 text-white">
              <RatingDisplay type="restaurant" rating={restaurant.rating || 4.5} showLabel={false} size="lg" />
              <RatingDisplay type="food" rating={4.6} showLabel={false} size="lg" />
              <RatingDisplay type="driver" rating={4.8} showLabel={false} size="lg" />
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                <span>{restaurant.deliveryFee === 0 ? 'Free Delivery' : `₹${restaurant.deliveryFee}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Category Navigation */}
        <div className="mb-8">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'glass backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:border-white/40'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-white/70">{filteredItems.length} items available</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const quantity = getItemQuantity(item.id);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all group"
                >
                  <div className="relative h-48">
                    <img 
                      src={`https://via.placeholder.com/300x200/f59e0b/ffffff?text=${encodeURIComponent(item.name)}`}
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {item.offer && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {item.offer}
                      </div>
                    )}
                    
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-semibold text-gray-800">{item.rating}</span>
                    </div>
                    
                    <div className="absolute bottom-3 left-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.isVeg ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-xl">₹{item.price}</span>
                      
                      {quantity > 0 ? (
                        <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
                          <button 
                            onClick={() => handleDecrease(item.id)}
                            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-white" />
                          </button>
                          <span className="text-white font-semibold px-3">{quantity}</span>
                          <button 
                            onClick={() => handleIncrease(item.id)}
                            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ) : (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(item)}
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                        >
                          Add to Cart
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Floating Cart */}
      <FloatingCart />
    </div>
  );
};

export default RestaurantMenu;