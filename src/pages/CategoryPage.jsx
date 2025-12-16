import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categories, getFoodsByCategory } from '../data/foodData';
import FoodCard from '../components/FoodCard';
import CategoryCarousel from '../components/CategoryCarousel';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'breakfast');
  const [categoryFoods, setCategoryFoods] = useState([]);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    let foods = getFoodsByCategory(selectedCategory);
    
    // Sort foods based on selected criteria
    switch (sortBy) {
      case 'price-low':
        foods = foods.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        foods = foods.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        foods = foods.sort((a, b) => b.rating - a.rating);
        break;
      case 'time':
        foods = foods.sort((a, b) => a.preparationTime - b.preparationTime);
        break;
      default:
        break;
    }
    
    setCategoryFoods(foods);
  }, [selectedCategory, sortBy]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="category-page">
      <CategoryCarousel 
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      
      <div className="category-content">
        <div className="category-header">
          <div className="category-info">
            <div className="category-icon-large" style={{ color: currentCategory?.color }}>
              {currentCategory?.icon}
            </div>
            <div>
              <h1 className="category-title">{currentCategory?.name}</h1>
              <p className="category-subtitle">{categoryFoods.length} delicious options available</p>
            </div>
          </div>
          
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="rating">⭐ Rating</option>
              <option value="price-low">💰 Price: Low to High</option>
              <option value="price-high">💎 Price: High to Low</option>
              <option value="time">⏱️ Preparation Time</option>
            </select>
          </div>
        </div>
        
        <div className="food-grid">
          {categoryFoods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
        
        {categoryFoods.length === 0 && (
          <div className="empty-category">
            <div className="empty-state">
              <span className="empty-icon">🍽️</span>
              <h3>No items found</h3>
              <p>Try selecting a different category</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;