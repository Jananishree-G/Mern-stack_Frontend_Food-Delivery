import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantAPI, foodAPI } from '../services/api';
import { foodItems } from '../data/modernFoodData';
import FoodCard from '../components/FoodCard';
import './Restaurant.css';

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const loadRestaurantData = useCallback(async () => {
    try {
      setLoading(true);
      const [restaurantRes, foodsRes] = await Promise.all([
        restaurantAPI.getById(id),
        foodAPI.getByRestaurant(id)
      ]);
      
      setRestaurant(restaurantRes.data);
      setFoods(foodsRes.data);
    } catch (error) {
      console.error('Failed to load restaurant data:', error);
      // Fallback to mock data
      const mockRestaurants = [
        {
          _id: '1',
          name: 'Pizza Palace',
          cuisine: 'Italian',
          rating: 4.5,
          deliveryTime: '30-45 min',
          deliveryFee: 0,
          minimumOrder: 299,
          description: 'Authentic Italian pizzas made with fresh ingredients',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format'
        },
        {
          _id: '2',
          name: 'Burger Hub',
          cuisine: 'American',
          rating: 4.3,
          deliveryTime: '25-35 min',
          deliveryFee: 40,
          minimumOrder: 199,
          description: 'Gourmet burgers and loaded fries',
          image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&auto=format'
        },
        {
          _id: '3',
          name: 'Spice Garden',
          cuisine: 'Indian',
          rating: 4.6,
          deliveryTime: '35-50 min',
          deliveryFee: 50,
          minimumOrder: 349,
          description: 'Authentic Indian cuisine with aromatic spices',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format'
        },
        {
          _id: '4',
          name: 'Sweet Treats',
          cuisine: 'Desserts',
          rating: 4.8,
          deliveryTime: '20-30 min',
          deliveryFee: 30,
          minimumOrder: 149,
          description: 'Heavenly desserts and sweet delights',
          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format'
        },
        {
          _id: '5',
          name: 'Green Bowl',
          cuisine: 'Healthy',
          rating: 4.4,
          deliveryTime: '20-30 min',
          deliveryFee: 35,
          minimumOrder: 199,
          description: 'Fresh salads and healthy bowls',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&auto=format'
        },
        {
          _id: '6',
          name: 'Comfort Kitchen',
          cuisine: 'Comfort Food',
          rating: 4.2,
          deliveryTime: '30-40 min',
          deliveryFee: 45,
          minimumOrder: 249,
          description: 'Homestyle comfort food that warms your heart',
          image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop&auto=format'
        }
      ];
      
      const mockRestaurant = mockRestaurants.find(r => r._id === id);
      if (mockRestaurant) {
        setRestaurant(mockRestaurant);
        // Map food items to ensure both id and _id exist for compatibility
        const mappedFoods = foodItems.slice(0, 15).map(food => ({
          ...food,
          _id: food.id, // Ensure _id exists for compatibility
          id: food.id   // Ensure id exists for cart functionality
        }));
        setFoods(mappedFoods);
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadRestaurantData();
  }, [loadRestaurantData]);

  const categories = useMemo(() => 
    ['all', ...new Set(foods.map(food => food.category))], 
    [foods]
  );
  
  const filteredFoods = useMemo(() => 
    selectedCategory === 'all' 
      ? foods 
      : foods.filter(food => food.category === selectedCategory),
    [foods, selectedCategory]
  );

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  if (loading) {
    return <div className="loading">Loading restaurant...</div>;
  }

  if (!restaurant) {
    return <div className="error">Restaurant not found</div>;
  }

  return (
    <div className="restaurant-page">
      <div className="restaurant-header">
        <div className="restaurant-image">
          <img 
            src={`https://via.placeholder.com/400x300/f59e0b/ffffff?text=${encodeURIComponent(restaurant.name || 'Restaurant')}`} 
            alt={restaurant.name} 
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300/f59e0b/ffffff?text=${encodeURIComponent(restaurant.name || 'Restaurant')}`;
            }}
          />
        </div>
        
        <div className="restaurant-details">
          <h1>{restaurant.name}</h1>
          <p className="cuisine">{restaurant.cuisine}</p>
          <p className="description">{restaurant.description}</p>
          
          <div className="restaurant-meta">
            <span className="rating">⭐ {restaurant.rating.toFixed(1)}</span>
            <span className="delivery-time">🕒 {restaurant.deliveryTime}</span>
            <span className="delivery-fee">
              {restaurant.deliveryFee === 0 ? 'Free Delivery' : `$${restaurant.deliveryFee} delivery`}
            </span>
          </div>
          
          {restaurant.minimumOrder > 0 && (
            <p className="minimum-order">Minimum order: ${restaurant.minimumOrder}</p>
          )}
        </div>
      </div>

      <div className="menu-section">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="foods-grid">
          {filteredFoods.length === 0 ? (
            <div className="no-foods">
              <p>No items found in this category.</p>
            </div>
          ) : (
            filteredFoods.map(food => (
              <FoodCard key={food._id} food={food} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;