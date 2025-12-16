import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  addAddress: (address) => api.post('/auth/address', address),
};

// Restaurant API
export const restaurantAPI = {
  getAll: (params) => api.get('/restaurants', { params }),
  getById: (id) => api.get(`/restaurants/${id}`),
  create: (data) => api.post('/restaurants', data),
  update: (id, data) => api.put(`/restaurants/${id}`, data),
  delete: (id) => api.delete(`/restaurants/${id}`),
};

// Food API
export const foodAPI = {
  getAll: (params) => api.get('/foods', { params }),
  getByRestaurant: (restaurantId) => api.get(`/foods/restaurant/${restaurantId}`),
  getById: (id) => api.get(`/foods/${id}`),
  create: (data) => api.post('/foods', data),
  update: (id, data) => api.put(`/foods/${id}`, data),
  delete: (id) => api.delete(`/foods/${id}`),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart/add', data),
  update: (data) => api.put('/cart/update', data),
  remove: (foodId) => api.delete(`/cart/remove/${foodId}`),
  clear: () => api.delete('/cart/clear'),
};

// Order API
export const orderAPI = {
  create: (data) => api.post('/orders/create', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  cancel: (id) => api.put(`/orders/${id}/cancel`),
};

// Location API
export const locationAPI = {
  search: (query) => api.get('/location/search', { params: { query } }),
  reverse: (latitude, longitude) => api.get('/location/reverse', { params: { latitude, longitude } }),
};

export default api;