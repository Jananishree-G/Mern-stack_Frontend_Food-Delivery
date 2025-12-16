import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FoodCard.css';

const FoodCard = ({ food }) => {
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const quantity = getItemQuantity(food.id || food._id);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (quantity > 0) {
      await updateQuantity(food.id || food._id, quantity + 1);
    } else {
      await addToCart(food.id || food._id, 1);
    }
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      await updateQuantity(food.id || food._id, quantity - 1);
    } else {
      await updateQuantity(food.id || food._id, 0);
    }
  };

  return (
    <div className="food-card">
      <div className="food-image-container">
        <img src={food.image || `https://via.placeholder.com/300x200/f59e0b/ffffff?text=${encodeURIComponent(food.name)}`} alt={food.name} className="food-image" />
        {food.offer && (
          <div className="offer-badge">{food.offer}</div>
        )}
        <div className="veg-indicator">
          {food.isVeg ? (
            <div className="veg-icon">🟢</div>
          ) : (
            <div className="non-veg-icon">🔴</div>
          )}
        </div>
      </div>
      
      <div className="food-content">
        <div className="food-header">
          <h3 className="food-name">{food.name}</h3>
          <div className="food-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{food.rating}</span>
          </div>
        </div>
        
        <p className="food-description">{food.description}</p>
        
        <div className="food-meta">
          <div className="food-price">₹{food.price}</div>
          <div className="prep-time">
            <span className="time-icon">⏱️</span>
            {food.preparationTime} min
          </div>
        </div>
        
        <div className="food-actions">
          {quantity > 0 ? (
            <div className="quantity-controls">
              <button onClick={handleDecrease} className="qty-btn minus">-</button>
              <span className="quantity">{quantity}</span>
              <button onClick={handleAddToCart} className="qty-btn plus">+</button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart} 
              className="add-to-cart-btn"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;