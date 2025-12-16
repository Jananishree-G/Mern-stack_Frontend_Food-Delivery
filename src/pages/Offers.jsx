import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Gift, Percent, Star, Calendar } from 'lucide-react';
import { 
  FaPizzaSlice, FaHamburger, FaIceCream, FaCoffee, 
  FaUtensils, FaCookie, FaAppleAlt, FaFish,
  FaDrumstickBite, FaBirthdayCake, FaWineGlass, FaLeaf,
  FaBolt, FaTruck, FaGift, FaGraduationCap,
  FaSun, FaMoon, FaFire
} from 'react-icons/fa';
import axios from 'axios';

const Offers = () => {
  const [selectedTab, setSelectedTab] = useState('today');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [offerImages, setOfferImages] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchUnsplashImage = async (query, offerId) => {
    try {
      console.log('Fetching image for:', query, 'API Key:', import.meta.env.VITE_UNSPLASH_ACCESS_KEY ? 'Present' : 'Missing');
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=1`
      );
      console.log('API Response:', response.data);
      return response.data.results[0]?.urls?.small || null;
    } catch (error) {
      console.error('Error fetching image for', query, ':', error.response?.data || error.message);
      return null;
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      console.log('Starting to load images...');
      const imageQueries = {
        1: 'flash sale food discount',
        2: 'food delivery service',
        3: 'pizza margherita',
        4: 'weekend restaurant party',
        5: 'family dinner table',
        6: 'student healthy food',
        7: 'breakfast pancakes eggs',
        8: 'coffee beans cup',
        9: 'lunch combo meal',
        10: 'quick fast food burger',
        11: 'dinner steak meal',
        12: 'chocolate cake dessert'
      };

      const images = {};
      // Load images for all offers (1-12)
      for (let id = 1; id <= 12; id++) {
        const query = imageQueries[id];
        if (query) {
          try {
            const imageUrl = await fetchUnsplashImage(query, id);
            if (imageUrl) {
              images[id] = imageUrl;
              console.log(`Image loaded for offer ${id}:`, imageUrl);
            }
            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (error) {
            console.error(`Failed to load image for offer ${id}:`, error);
          }
        }
      }
      console.log('All images loaded:', images);
      setOfferImages(images);
    };

    if (import.meta.env.VITE_UNSPLASH_ACCESS_KEY) {
      loadImages();
    } else {
      console.error('Unsplash API key not found in environment variables');
    }
  }, []);

  const getTimeBasedOffers = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    return 'night';
  };

  const offers = {
    today: [
      {
        id: 1,
        title: 'Flash Sale - 50% OFF',
        description: 'Get 50% off on orders above ₹299',
        discount: '50% OFF',
        validity: 'Valid till midnight',
        image: 'https://via.placeholder.com/300x200/ff6b35/ffffff?text=⚡+50%25+OFF',
        code: 'FLASH50'
      },
      {
        id: 2,
        title: 'Free Delivery',
        description: 'Free delivery on all orders today',
        discount: 'FREE DELIVERY',
        validity: 'Valid for today only',
        image: 'https://via.placeholder.com/300x200/4ecdc4/ffffff?text=🚚+FREE+DELIVERY',
        code: 'FREEDEL'
      },
      {
        id: 3,
        title: 'Buy 1 Get 1 Free',
        description: 'Buy any pizza and get another free',
        discount: 'BOGO',
        validity: 'Valid on pizzas only',
        image: 'https://via.placeholder.com/300x200/45b7d1/ffffff?text=🍕+BOGO+DEAL',
        code: 'BOGO1'
      }
    ],
    weekly: [
      {
        id: 4,
        title: 'Weekend Special',
        description: '30% off on weekend orders',
        discount: '30% OFF',
        validity: 'Valid on Sat-Sun',
        image: 'https://via.placeholder.com/300x200/f7dc6f/ffffff?text=🎉+WEEKEND+30%25',
        code: 'WEEKEND30'
      },
      {
        id: 5,
        title: 'Family Feast',
        description: '25% off on orders above ₹999',
        discount: '25% OFF',
        validity: 'Valid all week',
        image: 'https://via.placeholder.com/300x200/bb8fce/ffffff?text=👨‍👩‍👧‍👦+FAMILY+FEAST',
        code: 'FAMILY25'
      },
      {
        id: 6,
        title: 'Student Discount',
        description: '20% off for students',
        discount: '20% OFF',
        validity: 'Valid with student ID',
        image: 'https://via.placeholder.com/300x200/85c1e9/ffffff?text=🎓+STUDENT+20%25',
        code: 'STUDENT20'
      }
    ],
    morning: [
      {
        id: 7,
        title: 'Breakfast Special',
        description: '40% off on breakfast items',
        discount: '40% OFF',
        validity: '6 AM - 12 PM',
        image: 'https://via.placeholder.com/300x200/f39c12/ffffff?text=🌅+BREAKFAST+40%25',
        code: 'BREAKFAST40'
      },
      {
        id: 8,
        title: 'Coffee & Snacks',
        description: 'Buy coffee, get snack free',
        discount: 'FREE SNACK',
        validity: 'Morning hours only',
        image: 'https://via.placeholder.com/300x200/d35400/ffffff?text=☕+FREE+SNACK',
        code: 'COFFEE1'
      }
    ],
    afternoon: [
      {
        id: 9,
        title: 'Lunch Combo',
        description: '35% off on lunch combos',
        discount: '35% OFF',
        validity: '12 PM - 5 PM',
        image: 'https://via.placeholder.com/300x200/27ae60/ffffff?text=🍽️+LUNCH+35%25',
        code: 'LUNCH35'
      },
      {
        id: 10,
        title: 'Quick Bites',
        description: '₹100 off on quick meals',
        discount: '₹100 OFF',
        validity: 'Afternoon only',
        image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=⚡+₹100+OFF',
        code: 'QUICK100'
      }
    ],
    night: [
      {
        id: 11,
        title: 'Dinner Delight',
        description: '45% off on dinner orders',
        discount: '45% OFF',
        validity: '5 PM - 11 PM',
        image: 'https://via.placeholder.com/300x200/8e44ad/ffffff?text=🌙+DINNER+45%25',
        code: 'DINNER45'
      },
      {
        id: 12,
        title: 'Late Night Munchies',
        description: 'Free dessert with any order',
        discount: 'FREE DESSERT',
        validity: 'After 9 PM',
        image: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=🍰+FREE+DESSERT',
        code: 'LATENIGHT'
      }
    ]
  };

  const tabs = [
    { id: 'today', label: "Today's Offers", icon: Calendar },
    { id: 'weekly', label: 'Weekly Deals', icon: Star },
    { id: getTimeBasedOffers(), label: `${getTimeBasedOffers().charAt(0).toUpperCase() + getTimeBasedOffers().slice(1)} Specials`, icon: Clock }
  ];

  const currentOffers = offers[selectedTab] || offers.today;

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <FaGift className="text-yellow-400" /> Amazing Offers & Deals
          </h1>
          <p className="text-white/70 text-lg">
            Save big on your favorite food with our exclusive offers
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    selectedTab === tab.id
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Current Time Display */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
            <Clock className="w-4 h-4 text-primary-400" />
            <span className="text-white font-medium">
              Current Time: {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all group"
            >
              <div className="relative h-48">
                {offerImages[offer.id] ? (
                  <img 
                    src={offerImages[offer.id]}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div 
                    className={`w-full h-full group-hover:scale-110 transition-transform duration-500 flex items-center justify-center text-white ${
                      offer.id === 1 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                      offer.id === 2 ? 'bg-gradient-to-r from-teal-500 to-cyan-500' :
                      offer.id === 3 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                      offer.id === 4 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      offer.id === 5 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      offer.id === 6 ? 'bg-gradient-to-r from-sky-500 to-blue-500' :
                      offer.id === 7 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                      offer.id === 8 ? 'bg-gradient-to-r from-orange-600 to-red-600' :
                      offer.id === 9 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      offer.id === 10 ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                      offer.id === 11 ? 'bg-gradient-to-r from-violet-500 to-purple-500' :
                      'bg-gradient-to-r from-slate-600 to-gray-700'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-2 text-white">
                        {offer.id === 1 ? <FaBolt /> :
                         offer.id === 2 ? <FaTruck /> :
                         offer.id === 3 ? <FaPizzaSlice /> :
                         offer.id === 4 ? <FaGift /> :
                         offer.id === 5 ? <FaUtensils /> :
                         offer.id === 6 ? <FaGraduationCap /> :
                         offer.id === 7 ? <FaSun /> :
                         offer.id === 8 ? <FaCoffee /> :
                         offer.id === 9 ? <FaUtensils /> :
                         offer.id === 10 ? <FaFire /> :
                         offer.id === 11 ? <FaMoon /> :
                         <FaBirthdayCake />}
                      </div>
                      <div className="text-lg font-black">{offer.discount}</div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                  {offer.discount}
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Gift className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">{offer.code}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-2">{offer.title}</h3>
                <p className="text-white/70 mb-4">{offer.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-400" />
                    <span className="text-white/60 text-sm">{offer.validity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold">{offer.discount}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Use Code: {offer.code}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terms & Conditions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass backdrop-blur-md border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-4">Terms & Conditions</h3>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>• Offers are valid for limited time only</li>
            <li>• Cannot be combined with other offers</li>
            <li>• Minimum order value may apply</li>
            <li>• Delivery charges may apply separately</li>
            <li>• FoodieExpress reserves the right to modify or cancel offers</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Offers;