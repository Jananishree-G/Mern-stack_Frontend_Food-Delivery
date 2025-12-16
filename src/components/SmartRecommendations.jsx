import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Star } from 'lucide-react';

const SmartRecommendations = ({ userOrders = [], onItemSelect, selectedMood }) => {
  const [recommendations, setRecommendations] = useState([]);

  // Mock recommendation data based on user behavior and mood
  const generateRecommendations = (mood) => {
    const allRecommendations = {
      happy: [
        {
          id: 1,
          name: 'Margherita Pizza',
          restaurant: 'Pizza Palace',
          image: 'https://images.prismic.io/eataly-us/ed3fcec7-7994-426d-a5e4-a24be5a95afd_pizza-recipe-main.jpg?auto=compress,format',
          price: 299,
          rating: 4.5,
          reason: 'Perfect for happy moments',
          discount: 20,
          deliveryTime: '25-30 min'
        },
        {
          id: 2,
          name: 'Vanilla Cupcake',
          restaurant: 'Sweet Treats',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8zXY1i-dwj5IvY2WvrJaiC6jvm7DhXNJgdn65yl4kTPWUQQyike_1KNRBtsocEGpU5eU&usqp=CAU',
          price: 99,
          rating: 4.3,
          reason: 'Sweet celebration treat',
          discount: 15,
          deliveryTime: '15-20 min'
        },
        {
          id: 13,
          name: 'Rainbow Smoothie',
          restaurant: 'Happy Cafe',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtrja3Pq95jlizmv6PHVfXXm9MSfBi_Vonmg&s',
          price: 149,
          rating: 4.4,
          reason: 'Colorful and cheerful',
          discount: 10,
          deliveryTime: '10-15 min'
        },
        {
          id: 14,
          name: 'Celebration Cake',
          restaurant: 'Sweet Treats',
          image: 'https://cakestry15.com/cdn/shop/files/boss_theme_5kg_size_2tier_chocolate_flavor_50th_birthday_cake_full_image.webp?v=1747816878&width=1946',
          price: 399,
          rating: 4.8,
          reason: 'Perfect for celebrations',
          discount: 25,
          deliveryTime: '30-35 min'
        }
      ],
      hungry: [
        {
          id: 3,
          name: 'Chicken Biryani',
          restaurant: 'Spice Garden',
          image: 'https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg',
          price: 349,
          rating: 4.7,
          reason: 'Big portion for big appetite',
          discount: 15,
          deliveryTime: '35-40 min'
        },
        {
          id: 4,
          name: 'Loaded Fries',
          restaurant: 'Burger Hub',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOidhYKOEHCcg6ydoFx5oGwnBmoSWW0eqQ7w&s',
          price: 179,
          rating: 4.1,
          reason: 'Hearty and filling',
          discount: 25,
          deliveryTime: '20-25 min'
        },
        {
          id: 16,
          name: 'Double Burger',
          restaurant: 'Burger Hub',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBspPz6q2uoDqu2MrSBifD0ZG4kMoENJXJUg&s',
          price: 299,
          rating: 4.5,
          reason: 'Double the satisfaction',
          discount: 20,
          deliveryTime: '25-30 min'
        },
        {
          id: 17,
          name: 'Mega Thali',
          restaurant: 'Spice Garden',
          image: 'https://im.whatshot.in/img/2021/Dec/header-1639486529-1640695114.jpg',
          price: 449,
          rating: 4.6,
          reason: 'Complete meal solution',
          discount: 18,
          deliveryTime: '40-45 min'
        }
      ],
      sweet: [
        {
          id: 5,
          name: 'Chocolate Brownie',
          restaurant: 'Sweet Treats',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWN3hE7oZxQRyZtWw4TcFPG5z6RC8RYWLfx0l_x-qlp6FzhlHQev0GV5TAfZVcNx9m13Q&usqp=CAU',
          price: 149,
          rating: 4.8,
          reason: 'Perfect for sweet cravings',
          discount: 25,
          deliveryTime: '20-25 min'
        },
        {
          id: 6,
          name: 'Strawberry Cheesecake',
          restaurant: 'Sweet Treats',
          image: 'https://images.arla.com/recordid/C1B71F31-C12B-45A3-B74CD613FAC04C99/strawberry-cheesecake-with-lime.jpg?width=1200&height=630&mode=crop&format=jpg',
          price: 199,
          rating: 4.7,
          reason: 'Creamy sweet delight',
          discount: 20,
          deliveryTime: '25-30 min'
        },
        {
          id: 19,
          name: 'Ice Cream Sundae',
          restaurant: 'Sweet Treats',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBOFJi7LMWDGfl3EKKFDSf7wN8u-0VVJjtF5HiZL6qJHpBwsizh0MfffpPO2-jmqFYpc4&usqp=CAU',
          price: 129,
          rating: 4.5,
          reason: 'Cool and sweet',
          discount: 30,
          deliveryTime: '15-20 min'
        },
        {
          id: 20,
          name: 'Chocolate Cake',
          restaurant: 'Cake Corner',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM2jWA0VaTu_McECyx9xloy_Socgev8HoIag&s',
          price: 249,
          rating: 4.6,
          reason: 'Rich chocolate indulgence',
          discount: 15,
          deliveryTime: '25-30 min'
        }
      ],
      spicy: [
        {
          id: 7,
          name: 'Spicy Chicken Curry',
          restaurant: 'Spice Garden',
          image: 'https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg',
          price: 299,
          rating: 4.6,
          reason: 'Fiery and flavorful',
          discount: 15,
          deliveryTime: '30-35 min'
        },
        {
          id: 8,
          name: 'Spicy Chicken Burger',
          restaurant: 'Burger Hub',
          image: 'data:image/jpeg;base64,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',
          price: 279,
          rating: 4.5,
          reason: 'Hot and spicy kick',
          discount: 30,
          deliveryTime: '18-25 min'
        },
        {
          id: 22,
          name: 'Hot Wings',
          restaurant: 'Fire Grill',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXXWsF7T036W8sl0AGkkqEO2g943Yp2S24DA&s',
          price: 249,
          rating: 4.4,
          reason: 'Blazing hot flavor',
          discount: 20,
          deliveryTime: '25-30 min'
        },
        {
          id: 23,
          name: 'Chili Noodles',
          restaurant: 'Asian Spice',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB_whB0sLXAjauegH1pAvBESJsa7p0ARl16Q&s',
          price: 199,
          rating: 4.2,
          reason: 'Spicy Asian delight',
          discount: 25,
          deliveryTime: '20-25 min'
        }
      ],
      healthy: [
        {
          id: 9,
          name: 'Mediterranean Bowl',
          restaurant: 'Green Bowl',
          image: 'https://foodbornewellness.com/wp-content/uploads/2021/02/Mediterranean-Power-Bowls-Featured-Image.jpg',
          price: 249,
          rating: 4.5,
          reason: 'Fresh and nutritious',
          discount: 10,
          deliveryTime: '15-20 min'
        },
        {
          id: 10,
          name: 'Green Smoothie',
          restaurant: 'Green Bowl',
          image: 'https://www.veggiessavetheday.com/wp-content/uploads/2024/02/Pineapple-Green-Smoothie-FI-1200.jpg',
          price: 149,
          rating: 4.2,
          reason: 'Healthy choice',
          discount: 15,
          deliveryTime: '10-15 min'
        },
        {
          id: 25,
          name: 'Quinoa Salad',
          restaurant: 'Health Hub',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIQXCLRxkef49cD21MxIXiOu45J-wIQPKog&s',
          price: 199,
          rating: 4.3,
          reason: 'Protein-rich superfood',
          discount: 12,
          deliveryTime: '12-18 min'
        },
        {
          id: 26,
          name: 'Avocado Toast',
          restaurant: 'Green Bowl',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTVQZVxth5AChJb8cu-MvZSioeY4kY2bWq-A&s',
          price: 179,
          rating: 4.4,
          reason: 'Healthy fats and fiber',
          discount: 8,
          deliveryTime: '10-15 min'
        }
      ],
      comfort: [
        {
          id: 11,
          name: 'Mac and Cheese',
          restaurant: 'Comfort Kitchen',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6weUteMD0c_TwjtKghV25H-4wsIU-F2qfnpt5cOVVPUdZVcvbrjOyfcMpNs5NY3Szisg&usqp=CAU',
          price: 199,
          rating: 4.4,
          reason: 'Cozy comfort food',
          discount: 20,
          deliveryTime: '20-25 min'
        },
        {
          id: 12,
          name: 'Chicken Soup',
          restaurant: 'Comfort Kitchen',
          image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/11/chicken-and-rice-soup-15-3.jpg',
          price: 149,
          rating: 4.3,
          reason: 'Warm and comforting',
          discount: 15,
          deliveryTime: '15-20 min'
        },
        {
          id: 28,
          name: 'Grilled Sandwich',
          restaurant: 'Comfort Cafe',
          image: 'data:image/jpeg;base64,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',
          price: 129,
          rating: 4.1,
          reason: 'Simple comfort',
          discount: 18,
          deliveryTime: '15-20 min'
        },
        {
          id: 29,
          name: 'Hot Chocolate',
          restaurant: 'Cozy Corner',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7F5wCXvGdO1T3Q7A5YtTv9c_FtpMtsTQ3w&s',
          price: 99,
          rating: 4.2,
          reason: 'Warm and soothing',
          discount: 10,
          deliveryTime: '8-12 min'
        }
      ]
    };
    
    // Return recommendations based on selected mood, or default mix
    if (mood && allRecommendations[mood]) {
      setRecommendations(allRecommendations[mood].slice(0, 4));
    } else {
      // Default mix of popular items
      setRecommendations([
        allRecommendations.happy[0],
        allRecommendations.hungry[0],
        allRecommendations.sweet[0],
        allRecommendations.spicy[0]
      ]);
    }
  };

  useEffect(() => {
    generateRecommendations(selectedMood);
  }, [userOrders, selectedMood]);

  const getReasonIcon = (reason) => {
    if (reason.includes('orders')) return <Clock className="w-4 h-4" />;
    if (reason.includes('Popular')) return <TrendingUp className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Smart Picks for You</h2>
          <p className="text-white/70">Personalized recommendations based on your taste</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group cursor-pointer"
            onClick={() => onItemSelect && onItemSelect(item)}
          >
            <div className="relative overflow-hidden rounded-2xl glass backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              {/* Discount Badge */}
              {item.discount && (
                <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {item.discount}% OFF
                </div>
              )}
              
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Content */}
              <div className="p-4 bg-white/10 backdrop-blur-md">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-white/60 text-xs">{item.restaurant}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-medium">{item.rating}</span>
                  </div>
                </div>
                
                {/* Reason */}
                <div className="flex items-center gap-2 mb-3 text-white/70">
                  {getReasonIcon(item.reason)}
                  <span className="text-xs">{item.reason}</span>
                </div>
                
                {/* Price & Delivery */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.discount ? (
                      <>
                        <span className="text-white font-bold text-sm">₹{Math.round(item.price * (1 - item.discount / 100))}</span>
                        <span className="text-white/50 text-xs line-through">₹{item.price}</span>
                      </>
                    ) : (
                      <span className="text-white font-bold text-sm">₹{item.price}</span>
                    )}
                  </div>
                  <span className="text-white/60 text-xs">{item.deliveryTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SmartRecommendations;