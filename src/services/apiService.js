import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 1. GOOGLE MAPS API (FREE $200/month)
export const mapsAPI = {
  // Get location coordinates
  geocode: async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error('Geocoding failed:', error);
      return null;
    }
  },

  // Calculate delivery distance
  getDistance: async (origin, destination) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error('Distance calculation failed:', error);
      return null;
    }
  }
};

// 2. WEATHER API (FREE 1000 calls/day)
export const weatherAPI = {
  getCurrentWeather: async (city = 'Mumbai') => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b6907d289e10d714a6e88b30761fae22&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Weather fetch failed:', error);
      return { main: { temp: 25 }, weather: [{ main: 'Clear' }] };
    }
  }
};

// 3. FOOD IMAGES API (FREE unlimited)
export const imageAPI = {
  // Get food image
  getFoodImage: (foodName, width = 300, height = 200) => {
    return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(foodName)}`;
  },

  // Get restaurant image
  getRestaurantImage: (restaurantName, width = 400, height = 300) => {
    return `https://source.unsplash.com/${width}x${height}/?restaurant,${encodeURIComponent(restaurantName)}`;
  },

  // Placeholder image
  getPlaceholder: (text, width = 300, height = 200, color = 'f59e0b') => {
    return `https://via.placeholder.com/${width}x${height}/${color}/ffffff?text=${encodeURIComponent(text)}`;
  }
};

// 4. MOCK DATA API (FREE unlimited)
export const mockAPI = {
  // Get sample users
  getUsers: async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (error) {
      console.error('Mock users fetch failed:', error);
      return [];
    }
  },

  // Get sample posts (for reviews)
  getReviews: async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return response.data.slice(0, 10);
    } catch (error) {
      console.error('Mock reviews fetch failed:', error);
      return [];
    }
  }
};

// 5. EMAILJS API (FREE 200 emails/month)
export const emailAPI = {
  sendOrderConfirmation: async (orderData) => {
    try {
      const response = await axios.post(
        'https://api.emailjs.com/api/v1.0/email/send',
        {
          service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
          template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: orderData.email,
            order_id: orderData.orderId,
            total_amount: orderData.total,
            items: orderData.items
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Email send failed:', error);
      return null;
    }
  }
};

// 6. FIREBASE API (FREE generous limits)
export const firebaseAPI = {
  // Send push notification
  sendNotification: async (token, title, body) => {
    try {
      const response = await axios.post(
        'https://fcm.googleapis.com/fcm/send',
        {
          to: token,
          notification: {
            title: title,
            body: body,
            icon: '/icon-192x192.png'
          }
        },
        {
          headers: {
            'Authorization': `key=${process.env.REACT_APP_FIREBASE_SERVER_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Push notification failed:', error);
      return null;
    }
  }
};

// 7. CLOUDINARY API (FREE 25GB)
export const cloudinaryAPI = {
  uploadImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'your_upload_preset');
      
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  }
};

// 8. STRIPE API (FREE for testing)
export const stripeAPI = {
  createPaymentIntent: async (amount) => {
    try {
      const response = await api.post('/payments/create-intent', {
        amount: amount * 100 // Convert to cents
      });
      return response.data;
    } catch (error) {
      console.error('Payment intent creation failed:', error);
      return null;
    }
  }
};

// Your existing backend APIs
export const restaurantAPI = {
  getAll: () => api.get('/restaurants'),
  getById: (id) => api.get(`/restaurants/${id}`),
  create: (data) => api.post('/restaurants', data)
};

export const foodAPI = {
  getByRestaurant: (restaurantId) => api.get(`/foods/restaurant/${restaurantId}`),
  getAll: () => api.get('/foods'),
  create: (data) => api.post('/foods', data)
};

export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart/add', data),
  update: (data) => api.put('/cart/update', data),
  remove: (id) => api.delete(`/cart/remove/${id}`),
  clear: () => api.delete('/cart/clear')
};

export const orderAPI = {
  create: (data) => api.post('/orders/create', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  getById: (id) => api.get(`/orders/${id}`)
};

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile')
};

export default api;