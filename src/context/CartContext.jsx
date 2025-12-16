import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0, restaurant: null });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCart(response.data.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      // Use local storage as fallback
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        try {
          setCart(JSON.parse(localCart));
        } catch (error) {
          console.error('Failed to parse local cart:', error);
          setCart({ items: [], totalAmount: 0, restaurant: null });
        }
      } else {
        setCart({ items: [], totalAmount: 0, restaurant: null });
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (menuItem, quantity = 1) => {
    if (isAuthenticated) {
      try {
        const response = await axios.post('/api/cart/add', { 
          menuItemId: menuItem.id || menuItem._id, 
          quantity 
        });
        setCart(response.data.data);
        toast.success(`${menuItem.name} added to cart!`);
        return { success: true };
      } catch (error) {
        console.error('Backend cart add failed:', error);
      }
    }
    
    // Local cart fallback
    const itemId = menuItem.id || menuItem._id;
    const existingItem = cart.items.find(item => 
      (item.menuItem?.id === itemId) || (item.menuItem?._id === itemId) || (item.id === itemId)
    );
    
    let newCart;
    if (existingItem) {
      newCart = {
        ...cart,
        items: cart.items.map(item => 
          ((item.menuItem?.id === itemId) || (item.menuItem?._id === itemId) || (item.id === itemId))
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      };
    } else {
      newCart = {
        ...cart,
        items: [...cart.items, {
          id: itemId,
          menuItem: menuItem,
          quantity: quantity,
          price: menuItem.price
        }]
      };
    }
    
    newCart.totalAmount = newCart.items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
    
    setCart(newCart);
    toast.success(`${menuItem.name} added to cart!`);
    return { success: true };
  };

  const updateCartItem = async (menuItemId, quantity) => {
    if (isAuthenticated) {
      try {
        const response = await axios.put('/api/cart/update', { menuItemId, quantity });
        setCart(response.data.data);
        return { success: true };
      } catch (error) {
        console.error('Backend cart update failed:', error);
      }
    }
    
    // Local cart fallback - create new cart object to avoid mutations
    const newItems = cart.items.map(item => {
      const itemId = item.menuItem?.id || item.menuItem?._id || item.id;
      if (itemId === menuItemId) {
        return { ...item, quantity: Math.max(0, quantity) };
      }
      return { ...item };
    }).filter(item => item.quantity > 0);
    
    const newCart = {
      ...cart,
      items: newItems,
      totalAmount: newItems.reduce((total, item) => 
        total + ((item.price || item.menuItem?.price || 0) * item.quantity), 0
      )
    };
    
    setCart(newCart);
    return { success: true };
  };

  const removeFromCart = async (menuItemId) => {
    if (isAuthenticated) {
      try {
        const response = await axios.delete(`/api/cart/remove/${menuItemId}`);
        setCart(response.data.data);
        toast.success('Item removed from cart');
        return { success: true };
      } catch (error) {
        console.error('Backend cart remove failed:', error);
      }
    }
    
    // Local cart fallback - create new cart object
    const newItems = cart.items.filter(item => {
      const itemId = item.menuItem?.id || item.menuItem?._id || item.id;
      return itemId !== menuItemId;
    });
    
    const newCart = {
      ...cart,
      items: newItems,
      totalAmount: newItems.reduce((total, item) => 
        total + ((item.price || item.menuItem?.price || 0) * item.quantity), 0
      )
    };
    
    setCart(newCart);
    toast.success('Item removed from cart');
    return { success: true };
  };

  const increaseQty = async (menuItemId) => {
    const item = cart.items.find(item => {
      const itemId = item.menuItem?.id || item.menuItem?._id || item.id;
      return itemId === menuItemId;
    });
    
    if (item) {
      const newQuantity = item.quantity + 1;
      return updateCartItem(menuItemId, newQuantity);
    }
    return { success: false, message: 'Item not found' };
  };

  const decreaseQty = async (menuItemId) => {
    const item = cart.items.find(item => {
      const itemId = item.menuItem?.id || item.menuItem?._id || item.id;
      return itemId === menuItemId;
    });
    
    if (item) {
      if (item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        return updateCartItem(menuItemId, newQuantity);
      } else {
        return removeFromCart(menuItemId);
      }
    }
    return { success: false, message: 'Item not found' };
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await axios.delete('/api/cart/clear');
      } catch (error) {
        console.error('Backend cart clear failed:', error);
      }
    }
    
    setCart({ items: [], totalAmount: 0, restaurant: null });
    toast.success('Cart cleared');
    return { success: true };
  };

  const getItemQuantity = (menuItemId) => {
    const item = cart.items?.find(item => 
      item.menuItem?._id === menuItemId || item.menuItem?.id === menuItemId
    );
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateCartItem,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart,
      getItemQuantity,
      itemCount: cart.items?.reduce((total, item) => total + item.quantity, 0) || 0,
      totalAmount: cart.totalAmount || 0,
    }}>
      {children}
    </CartContext.Provider>
  );
};