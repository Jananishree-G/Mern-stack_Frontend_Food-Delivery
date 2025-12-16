import React from 'react';
import { categories } from '../data/foodData';
import './CategoryCarousel.css';

const CategoryCarousel = ({ onCategorySelect, selectedCategory }) => {
  return (
    <div className="category-carousel">
      <div className="category-scroll">
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.id)}
            style={{ '--category-color': category.color }}
          >
            <div className="category-icon">{category.icon}</div>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;