import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, Truck } from 'lucide-react';

const StarRating = ({ rating, size = 'sm' }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} text-yellow-400 fill-current`} />
    );
  }
  
  if (hasHalfStar) {
    stars.push(
      <Star key="half" className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} text-yellow-400 fill-current opacity-50`} />
    );
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400`} />
    );
  }
  
  return <div className="flex items-center gap-1">{stars}</div>;
};

const RestaurantCard = ({ restaurant }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/restaurant/${restaurant._id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl glass backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={`https://via.placeholder.com/400x300/f59e0b/ffffff?text=${encodeURIComponent(restaurant.name || 'Restaurant')}`}
              alt={restaurant.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/400x300/f59e0b/ffffff?text=${encodeURIComponent(restaurant.name || 'Restaurant')}`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Rating Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
              <StarRating rating={restaurant.rating || 4.5} />
              <span className="text-sm font-semibold text-gray-800">{(restaurant.rating || 4.5).toFixed(1)}</span>
            </div>
            
            {/* Free Delivery Badge */}
            {restaurant.deliveryFee === 0 && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                FREE DELIVERY
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6 bg-white/10 backdrop-blur-md">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                {restaurant.name}
              </h3>
              <p className="text-white/70 text-sm font-medium">{restaurant.cuisine}</p>
            </div>
            
            <p className="text-white/80 text-sm mb-4 line-clamp-2">
              {restaurant.description || 'Delicious food delivered fresh to your door'}
            </p>
            
            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-white/80">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime || '30-45 min'}</span>
                </div>
                <div className="flex items-center gap-1 text-white/80">
                  <Truck className="w-4 h-4" />
                  <span>{restaurant.deliveryFee === 0 ? 'Free' : `₹${restaurant.deliveryFee || 40}`}</span>
                </div>
              </div>
              
              {restaurant.minimumOrder > 0 && (
                <div className="text-white/60 text-xs">
                  Min. ₹{restaurant.minimumOrder}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;