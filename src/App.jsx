import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RestaurantMenu from './pages/RestaurantMenu'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import OrderTracking from './pages/OrderTracking'
import Checkout from './pages/Checkout'
import Offers from './pages/Offers'
import './index.css'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderTracking />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
          },
        }}
      />
    </div>
  )
}

export default App