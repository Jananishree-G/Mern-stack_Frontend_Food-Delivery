export const categories = [
  { id: 'breakfast', name: 'Breakfast', icon: '🍳', color: '#FF6B35' },
  { id: 'lunch', name: 'Lunch', icon: '🍽️', color: '#4ECDC4' },
  { id: 'tiffin', name: 'Tiffin', icon: '🍱', color: '#45B7D1' },
  { id: 'desserts', name: 'Desserts', icon: '🍰', color: '#F7DC6F' },
  { id: 'beverages', name: 'Beverages', icon: '🥤', color: '#BB8FCE' },
  { id: 'special', name: 'Special Meals', icon: '⭐', color: '#F1948A' }
];

export const foodItems = [
  // Breakfast Items
  {
    id: 'b1',
    name: 'Masala Dosa',
    category: 'breakfast',
    price: 120,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1694241686462-e2d2a2b0c2b5?w=400&h=300&fit=crop',
    description: 'Crispy dosa with spiced potato filling',
    offer: '20% OFF',
    preparationTime: 15,
    isVeg: true
  },
  {
    id: 'b2',
    name: 'Idli Sambar',
    category: 'breakfast',
    price: 80,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    description: 'Steamed rice cakes with lentil curry',
    preparationTime: 10,
    isVeg: true
  },
  {
    id: 'b3',
    name: 'Poha',
    category: 'breakfast',
    price: 60,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
    description: 'Flattened rice with vegetables and spices',
    preparationTime: 12,
    isVeg: true
  },
  {
    id: 'b4',
    name: 'Pancakes',
    category: 'breakfast',
    price: 150,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    description: 'Fluffy pancakes with maple syrup',
    preparationTime: 15,
    isVeg: true
  },
  {
    id: 'b5',
    name: 'Aloo Paratha',
    category: 'breakfast',
    price: 100,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1574653853027-5d3ac9b9e7c3?w=400&h=300&fit=crop',
    description: 'Stuffed potato flatbread with butter',
    offer: 'Buy 1 Get 1',
    preparationTime: 20,
    isVeg: true
  },
  {
    id: 'b6',
    name: 'French Toast',
    category: 'breakfast',
    price: 140,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop',
    description: 'Golden bread slices with cinnamon',
    preparationTime: 12,
    isVeg: true
  },
  {
    id: 'b7',
    name: 'Omelette',
    category: 'breakfast',
    price: 90,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    description: 'Fluffy eggs with herbs and cheese',
    preparationTime: 10,
    isVeg: false
  },
  {
    id: 'b8',
    name: 'Avocado Toast',
    category: 'breakfast',
    price: 200,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    description: 'Toasted bread with fresh avocado',
    preparationTime: 7,
    isVeg: true
  },
  {
    id: 'b9',
    name: 'Smoothie Bowl',
    category: 'breakfast',
    price: 180,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop',
    description: 'Healthy fruit smoothie with toppings',
    offer: '15% OFF',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'b10',
    name: 'Bagel with Cream Cheese',
    category: 'breakfast',
    price: 130,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    description: 'Fresh bagel with creamy cheese spread',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'b11',
    name: 'Breakfast Burrito',
    category: 'breakfast',
    price: 220,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    description: 'Wrapped tortilla with eggs and vegetables',
    preparationTime: 15,
    isVeg: false
  },
  {
    id: 'b12',
    name: 'Waffles',
    category: 'breakfast',
    price: 160,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1562376552-0d160dcec87d?w=400&h=300&fit=crop',
    description: 'Crispy waffles with syrup and butter',
    preparationTime: 12,
    isVeg: true
  },
  {
    id: 'b13',
    name: 'Croissant',
    category: 'breakfast',
    price: 110,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1555507036-ab794f4afe5e?w=400&h=300&fit=crop',
    description: 'Buttery flaky pastry',
    preparationTime: 8,
    isVeg: true
  },
  {
    id: 'b14',
    name: 'Granola Bowl',
    category: 'breakfast',
    price: 160,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop',
    description: 'Crunchy granola with yogurt and fruits',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'b15',
    name: 'English Breakfast',
    category: 'breakfast',
    price: 280,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop',
    description: 'Full English breakfast with eggs, bacon, beans',
    preparationTime: 20,
    isVeg: false
  },

  // Lunch Items
  {
    id: 'l1',
    name: 'Chicken Biryani',
    category: 'lunch',
    price: 280,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=300&fit=crop',
    description: 'Aromatic basmati rice with tender chicken',
    offer: '25% OFF',
    preparationTime: 45,
    isVeg: false
  },
  {
    id: 'l2',
    name: 'Paneer Butter Masala',
    category: 'lunch',
    price: 220,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    description: 'Creamy tomato curry with cottage cheese',
    preparationTime: 25,
    isVeg: true
  },
  {
    id: 'l3',
    name: 'Dal Tadka',
    category: 'lunch',
    price: 150,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    description: 'Yellow lentils with aromatic spices',
    preparationTime: 20,
    isVeg: true
  },
  {
    id: 'l4',
    name: 'Butter Chicken',
    category: 'lunch',
    price: 320,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop',
    description: 'Creamy tomato chicken curry',
    preparationTime: 40,
    isVeg: false
  },
  {
    id: 'l5',
    name: 'Fish Curry',
    category: 'lunch',
    price: 300,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
    description: 'Fresh fish in coconut curry',
    preparationTime: 35,
    isVeg: false
  },
  {
    id: 'l6',
    name: 'Rajma Rice',
    category: 'lunch',
    price: 180,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    description: 'Kidney beans curry with steamed rice',
    preparationTime: 30,
    isVeg: true
  },
  {
    id: 'l7',
    name: 'Chole Bhature',
    category: 'lunch',
    price: 160,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    description: 'Spiced chickpeas with fried bread',
    offer: '20% OFF',
    preparationTime: 25,
    isVeg: true
  },
  {
    id: 'l8',
    name: 'Palak Paneer',
    category: 'lunch',
    price: 200,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    description: 'Spinach curry with cottage cheese',
    preparationTime: 25,
    isVeg: true
  },
  {
    id: 'l9',
    name: 'Chicken Tikka Masala',
    category: 'lunch',
    price: 340,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
    description: 'Grilled chicken in spiced tomato sauce',
    preparationTime: 35,
    isVeg: false
  },
  {
    id: 'l10',
    name: 'Vegetable Biryani',
    category: 'lunch',
    price: 220,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop',
    description: 'Fragrant rice with mixed vegetables',
    preparationTime: 40,
    isVeg: true
  },
  {
    id: 'l11',
    name: 'Mutton Curry',
    category: 'lunch',
    price: 350,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
    description: 'Spicy mutton curry with traditional spices',
    preparationTime: 60,
    isVeg: false
  },
  {
    id: 'l12',
    name: 'Aloo Gobi',
    category: 'lunch',
    price: 140,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    description: 'Potato and cauliflower curry',
    preparationTime: 20,
    isVeg: true
  },
  {
    id: 'l13',
    name: 'Kadai Chicken',
    category: 'lunch',
    price: 300,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
    description: 'Chicken cooked in bell peppers and onions',
    preparationTime: 30,
    isVeg: false
  },
  {
    id: 'l14',
    name: 'Mixed Vegetable Curry',
    category: 'lunch',
    price: 160,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    description: 'Seasonal vegetables in spiced gravy',
    preparationTime: 25,
    isVeg: true
  },
  {
    id: 'l15',
    name: 'Lamb Rogan Josh',
    category: 'lunch',
    price: 380,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
    description: 'Kashmiri lamb curry with aromatic spices',
    preparationTime: 50,
    isVeg: false
  },

  // Tiffin Items
  {
    id: 't1',
    name: 'Home Style Dal Rice',
    category: 'tiffin',
    price: 120,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    description: 'Comfort meal with dal, rice, and pickle',
    offer: '30% OFF',
    preparationTime: 20,
    isVeg: true
  },
  {
    id: 't2',
    name: 'Roti Sabzi Combo',
    category: 'tiffin',
    price: 100,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    description: '3 rotis with seasonal vegetable curry',
    preparationTime: 15,
    isVeg: true
  },
  {
    id: 't3',
    name: 'Khichdi',
    category: 'tiffin',
    price: 90,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop',
    description: 'Comfort rice and lentil porridge',
    preparationTime: 25,
    isVeg: true
  },
  {
    id: 't4',
    name: 'Paratha Thali',
    category: 'tiffin',
    price: 140,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1574653853027-5d3ac9b9e7c3?w=400&h=300&fit=crop',
    description: '2 parathas with curd, pickle, and curry',
    preparationTime: 20,
    isVeg: true
  },
  {
    id: 't5',
    name: 'Sambar Rice',
    category: 'tiffin',
    price: 110,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    description: 'South Indian rice with lentil curry',
    preparationTime: 15,
    isVeg: true
  },
  {
    id: 't6',
    name: 'Curd Rice',
    category: 'tiffin',
    price: 80,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop',
    description: 'Cooling rice with yogurt and tempering',
    preparationTime: 10,
    isVeg: true
  },
  {
    id: 't7',
    name: 'Pulao',
    category: 'tiffin',
    price: 130,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=300&fit=crop',
    description: 'Fragrant rice with vegetables and spices',
    preparationTime: 25,
    isVeg: true
  },
  {
    id: 't8',
    name: 'Chapati Curry Combo',
    category: 'tiffin',
    price: 95,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    description: '4 chapatis with dal and vegetable curry',
    preparationTime: 18,
    isVeg: true
  },
  {
    id: 't9',
    name: 'Jeera Rice',
    category: 'tiffin',
    price: 85,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop',
    description: 'Cumin flavored basmati rice',
    preparationTime: 15,
    isVeg: true
  },
  {
    id: 't10',
    name: 'Mixed Dal',
    category: 'tiffin',
    price: 70,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    description: 'Protein-rich mixed lentil curry',
    preparationTime: 30,
    isVeg: true
  },
  {
    id: 't11',
    name: 'Vegetable Fried Rice',
    category: 'tiffin',
    price: 120,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    description: 'Wok-tossed rice with fresh vegetables',
    preparationTime: 20,
    isVeg: true
  },
  {
    id: 't12',
    name: 'Lemon Rice',
    category: 'tiffin',
    price: 90,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop',
    description: 'Tangy rice with curry leaves and peanuts',
    preparationTime: 12,
    isVeg: true
  },
  {
    id: 't13',
    name: 'Rajma Chawal',
    category: 'tiffin',
    price: 140,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    description: 'Kidney beans with steamed rice',
    offer: '15% OFF',
    preparationTime: 25,
    isVeg: true
  },
  {
    id: 't14',
    name: 'Aloo Matar',
    category: 'tiffin',
    price: 100,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    description: 'Potato and green peas curry',
    preparationTime: 20,
    isVeg: true
  },
  {
    id: 't15',
    name: 'Simple Thali',
    category: 'tiffin',
    price: 160,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    description: 'Complete meal with rice, dal, sabzi, roti',
    preparationTime: 25,
    isVeg: true
  },

  // Desserts
  {
    id: 'd1',
    name: 'Gulab Jamun',
    category: 'desserts',
    price: 80,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
    description: 'Sweet milk dumplings in sugar syrup',
    offer: 'Buy 2 Get 1',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'd2',
    name: 'Chocolate Cake',
    category: 'desserts',
    price: 150,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    description: 'Rich chocolate sponge cake slice',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'd3',
    name: 'Ice Cream Sundae',
    category: 'desserts',
    price: 120,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    description: 'Vanilla ice cream with chocolate sauce',
    preparationTime: 3,
    isVeg: true
  },
  {
    id: 'd4',
    name: 'Cheesecake',
    category: 'desserts',
    price: 180,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop',
    description: 'Creamy New York style cheesecake',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'd5',
    name: 'Tiramisu',
    category: 'desserts',
    price: 200,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    description: 'Italian coffee-flavored dessert',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'd6',
    name: 'Brownie',
    category: 'desserts',
    price: 100,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    description: 'Fudgy chocolate brownie square',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'd7',
    name: 'Kulfi',
    category: 'desserts',
    price: 60,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop',
    description: 'Traditional Indian frozen dessert',
    preparationTime: 2,
    isVeg: true
  },
  {
    id: 'd8',
    name: 'Ras Malai',
    category: 'desserts',
    price: 90,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
    description: 'Cottage cheese dumplings in sweet milk',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'd9',
    name: 'Fruit Tart',
    category: 'desserts',
    price: 140,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop',
    description: 'Pastry shell with fresh seasonal fruits',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'd10',
    name: 'Kheer',
    category: 'desserts',
    price: 70,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
    description: 'Rice pudding with nuts and cardamom',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'd11',
    name: 'Panna Cotta',
    category: 'desserts',
    price: 160,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop',
    description: 'Silky Italian dessert with berry sauce',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'd12',
    name: 'Jalebi',
    category: 'desserts',
    price: 50,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
    description: 'Crispy spiral sweet soaked in syrup',
    offer: '20% OFF',
    preparationTime: 10,
    isVeg: true
  },
  {
    id: 'd13',
    name: 'Mango Mousse',
    category: 'desserts',
    price: 130,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop',
    description: 'Light and airy mango flavored dessert',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'd14',
    name: 'Gajar Halwa',
    category: 'desserts',
    price: 80,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
    description: 'Sweet carrot pudding with nuts',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'd15',
    name: 'Donut',
    category: 'desserts',
    price: 90,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    description: 'Glazed donut with colorful sprinkles',
    preparationTime: 3,
    isVeg: true
  },

  // Beverages
  {
    id: 'bv1',
    name: 'Masala Chai',
    category: 'beverages',
    price: 30,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
    description: 'Spiced Indian tea with milk',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'bv2',
    name: 'Fresh Lime Soda',
    category: 'beverages',
    price: 40,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
    description: 'Refreshing lime juice with soda',
    preparationTime: 3,
    isVeg: true
  },
  {
    id: 'bv3',
    name: 'Mango Lassi',
    category: 'beverages',
    price: 80,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop',
    description: 'Creamy yogurt drink with mango',
    offer: '15% OFF',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'bv4',
    name: 'Cold Coffee',
    category: 'beverages',
    price: 90,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    description: 'Iced coffee with milk and ice cream',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'bv5',
    name: 'Fresh Orange Juice',
    category: 'beverages',
    price: 60,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
    description: 'Freshly squeezed orange juice',
    preparationTime: 3,
    isVeg: true
  },
  {
    id: 'bv6',
    name: 'Coconut Water',
    category: 'beverages',
    price: 50,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop',
    description: 'Natural tender coconut water',
    preparationTime: 2,
    isVeg: true
  },
  {
    id: 'bv7',
    name: 'Smoothie',
    category: 'beverages',
    price: 120,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop',
    description: 'Mixed fruit smoothie with yogurt',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'bv8',
    name: 'Green Tea',
    category: 'beverages',
    price: 35,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
    description: 'Healthy antioxidant-rich green tea',
    preparationTime: 3,
    isVeg: true
  },
  {
    id: 'bv9',
    name: 'Buttermilk',
    category: 'beverages',
    price: 40,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop',
    description: 'Spiced yogurt drink with mint',
    preparationTime: 3,
    isVeg: true
  },
  {
    id: 'bv10',
    name: 'Hot Chocolate',
    category: 'beverages',
    price: 70,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1542990253-0b8cddba9caa?w=400&h=300&fit=crop',
    description: 'Rich hot chocolate with marshmallows',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'bv11',
    name: 'Iced Tea',
    category: 'beverages',
    price: 50,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    description: 'Chilled tea with lemon and mint',
    preparationTime: 3,
    isVeg: true
  },
  {
    id: 'bv12',
    name: 'Milkshake',
    category: 'beverages',
    price: 100,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
    description: 'Thick vanilla milkshake with ice cream',
    preparationTime: 5,
    isVeg: true
  },
  {
    id: 'bv13',
    name: 'Lemonade',
    category: 'beverages',
    price: 45,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
    description: 'Fresh lemon juice with sugar and mint',
    preparationTime: 3,
    isVeg: true
  },
  {
    id: 'bv14',
    name: 'Energy Drink',
    category: 'beverages',
    price: 80,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
    description: 'Refreshing energy boost drink',
    preparationTime: 2,
    isVeg: true
  },
  {
    id: 'bv15',
    name: 'Herbal Tea',
    category: 'beverages',
    price: 40,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
    description: 'Soothing herbal tea blend',
    preparationTime: 5,
    isVeg: true
  },

  // Special Meals
  {
    id: 's1',
    name: 'Royal Thali',
    category: 'special',
    price: 450,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    description: 'Complete royal feast with 12 items',
    offer: '30% OFF',
    preparationTime: 45,
    isVeg: true
  },
  {
    id: 's2',
    name: 'Seafood Platter',
    category: 'special',
    price: 600,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
    description: 'Mixed seafood with rice and salad',
    preparationTime: 50,
    isVeg: false
  },
  {
    id: 's3',
    name: 'BBQ Combo',
    category: 'special',
    price: 550,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
    description: 'Grilled meats with sides and sauce',
    preparationTime: 40,
    isVeg: false
  },
  {
    id: 's4',
    name: 'Maharaja Feast',
    category: 'special',
    price: 700,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    description: 'Premium feast for special occasions',
    preparationTime: 60,
    isVeg: true
  },
  {
    id: 's5',
    name: 'Tandoor Special',
    category: 'special',
    price: 480,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
    description: 'Assorted tandoor items with naan',
    preparationTime: 45,
    isVeg: false
  },
  {
    id: 's6',
    name: 'South Indian Feast',
    category: 'special',
    price: 380,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    description: 'Traditional South Indian meal',
    preparationTime: 35,
    isVeg: true
  },
  {
    id: 's7',
    name: 'Punjabi Combo',
    category: 'special',
    price: 420,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    description: 'Authentic Punjabi dishes combo',
    preparationTime: 40,
    isVeg: true
  },
  {
    id: 's8',
    name: 'Continental Platter',
    category: 'special',
    price: 520,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop',
    description: 'European style meal with soup and dessert',
    preparationTime: 45,
    isVeg: false
  },
  {
    id: 's9',
    name: 'Chinese Combo',
    category: 'special',
    price: 350,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    description: 'Noodles, rice, and manchurian combo',
    preparationTime: 30,
    isVeg: true
  },
  {
    id: 's10',
    name: 'Biryani Bonanza',
    category: 'special',
    price: 400,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=300&fit=crop',
    description: 'Large biryani with raita and shorba',
    offer: '25% OFF',
    preparationTime: 50,
    isVeg: false
  },
  {
    id: 's11',
    name: 'Healthy Bowl',
    category: 'special',
    price: 280,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    description: 'Nutritious quinoa bowl with vegetables',
    preparationTime: 25,
    isVeg: true
  },
  {
    id: 's12',
    name: 'Street Food Platter',
    category: 'special',
    price: 320,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    description: 'Assorted Indian street food items',
    preparationTime: 30,
    isVeg: true
  },
  {
    id: 's13',
    name: 'Gourmet Pizza',
    category: 'special',
    price: 450,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    description: 'Wood-fired pizza with premium toppings',
    preparationTime: 25,
    isVeg: false
  },
  {
    id: 's14',
    name: 'Sushi Platter',
    category: 'special',
    price: 650,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    description: 'Fresh sushi and sashimi selection',
    preparationTime: 35,
    isVeg: false
  },
  {
    id: 's15',
    name: 'Family Feast',
    category: 'special',
    price: 800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    description: 'Large family meal for 4-6 people',
    offer: 'Free Delivery',
    preparationTime: 60,
    isVeg: true
  }
];

export const getFoodsByCategory = (category) => {
  return foodItems.filter(item => item.category === category);
};

export const getFoodById = (id) => {
  return foodItems.find(item => item.id === id);
};