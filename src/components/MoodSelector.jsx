import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Zap, Heart, Flame, Leaf, Coffee } from 'lucide-react';

const moods = [
  {
    id: 'happy',
    name: 'Happy Vibes',
    icon: Smile,
    color: 'from-yellow-400 to-orange-400',
    description: 'Bright & cheerful meals',
    foods: ['pizza', 'burger', 'ice cream', 'pasta']
  },
  {
    id: 'hungry',
    name: 'Super Hungry',
    icon: Zap,
    color: 'from-red-500 to-pink-500',
    description: 'Big portions & hearty meals',
    foods: ['biryani', 'thali', 'combo meals', 'family packs']
  },
  {
    id: 'sweet',
    name: 'Sweet Cravings',
    icon: Heart,
    color: 'from-pink-400 to-purple-400',
    description: 'Desserts & sweet treats',
    foods: ['desserts', 'cakes', 'sweets', 'milkshakes']
  },
  {
    id: 'spicy',
    name: 'Spicy Mood',
    icon: Flame,
    color: 'from-red-600 to-orange-600',
    description: 'Hot & spicy delights',
    foods: ['spicy curry', 'hot wings', 'chili dishes', 'tandoori']
  },
  {
    id: 'healthy',
    name: 'Healthy Choice',
    icon: Leaf,
    color: 'from-green-400 to-emerald-500',
    description: 'Fresh & nutritious options',
    foods: ['salads', 'smoothies', 'grilled items', 'organic']
  },
  {
    id: 'comfort',
    name: 'Comfort Food',
    icon: Coffee,
    color: 'from-amber-600 to-yellow-600',
    description: 'Cozy & comforting meals',
    foods: ['soup', 'sandwich', 'pasta', 'hot beverages']
  }
];

const MoodSelector = ({ onMoodSelect, selectedMood }) => {
  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl font-bold text-white mb-2">What's your mood today?</h2>
        <p className="text-white/70">Let us suggest the perfect meal for your vibe</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {moods.map((mood, index) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          
          return (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onMoodSelect(mood.id)}
              className={`relative p-4 rounded-2xl glass backdrop-blur-md border transition-all duration-300 group ${
                isSelected 
                  ? 'border-white/50 shadow-xl scale-105' 
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${mood.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
              
              <div className="relative z-10 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${mood.color} mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-white font-semibold text-sm mb-1">{mood.name}</h3>
                <p className="text-white/60 text-xs leading-tight">{mood.description}</p>
              </div>
              
              {isSelected && (
                <motion.div
                  layoutId="mood-selector"
                  className="absolute inset-0 rounded-2xl border-2 border-white/50 shadow-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSelector;