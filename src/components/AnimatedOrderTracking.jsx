import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  ChefHat, 
  Truck, 
  MapPin, 
  Phone,
  MessageCircle 
} from 'lucide-react';

const orderSteps = [
  {
    id: 'confirmed',
    title: 'Order Confirmed',
    description: 'Your order has been placed successfully',
    icon: CheckCircle,
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 'preparing',
    title: 'Preparing Food',
    description: 'Chef is preparing your delicious meal',
    icon: ChefHat,
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'ready',
    title: 'Ready for Pickup',
    description: 'Food is ready and packed for delivery',
    icon: Clock,
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: 'onway',
    title: 'On the Way',
    description: 'Delivery partner is heading to your location',
    icon: Truck,
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'delivered',
    title: 'Delivered',
    description: 'Enjoy your meal!',
    icon: MapPin,
    color: 'from-green-500 to-teal-500'
  }
];

const AnimatedOrderTracking = ({ orderId, currentStep = 'preparing' }) => {
  const [activeStep, setActiveStep] = useState(currentStep);
  const [estimatedTime, setEstimatedTime] = useState(25);
  const [deliveryPartner, setDeliveryPartner] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    rating: 4.8,
    vehicle: 'Bike'
  });

  // Simulate order progress
  useEffect(() => {
    const stepOrder = ['confirmed', 'preparing', 'ready', 'onway', 'delivered'];
    const currentIndex = stepOrder.indexOf(activeStep);
    
    if (currentIndex < stepOrder.length - 1) {
      const timer = setTimeout(() => {
        setActiveStep(stepOrder[currentIndex + 1]);
        setEstimatedTime(prev => Math.max(0, prev - 5));
      }, 8000); // Progress every 8 seconds for demo
      
      return () => clearTimeout(timer);
    }
  }, [activeStep]);

  const getCurrentStepIndex = () => {
    return orderSteps.findIndex(step => step.id === activeStep);
  };

  const isStepCompleted = (stepIndex) => {
    return stepIndex <= getCurrentStepIndex();
  };

  const isStepActive = (stepIndex) => {
    return stepIndex === getCurrentStepIndex();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Track Your Order</h1>
        <p className="text-white/70">Order ID: #{orderId}</p>
        <div className="mt-4 glass backdrop-blur-md border border-white/20 rounded-2xl p-4 inline-block">
          <div className="flex items-center gap-2 text-white">
            <Clock className="w-5 h-5 text-primary-400" />
            <span className="font-semibold">Estimated delivery: {estimatedTime} minutes</span>
          </div>
        </div>
      </motion.div>

      {/* Progress Steps */}
      <div className="relative mb-8">
        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-1 bg-white/20 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${(getCurrentStepIndex() / (orderSteps.length - 1)) * 100}%` 
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {orderSteps.map((step, index) => {
            const Icon = step.icon;
            const completed = isStepCompleted(index);
            const active = isStepActive(index);

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center relative z-10"
              >
                {/* Step Icon */}
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    completed
                      ? 'bg-gradient-to-r from-primary-400 to-secondary-400 border-white/50 shadow-lg'
                      : 'bg-white/10 border-white/30'
                  }`}
                  animate={active ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={{ repeat: active ? Infinity : 0, duration: 2 }}
                >
                  <Icon className={`w-6 h-6 ${completed ? 'text-white' : 'text-white/60'}`} />
                </motion.div>

                {/* Step Content */}
                <div className="mt-4 text-center max-w-32">
                  <h3 className={`font-semibold text-sm ${completed ? 'text-white' : 'text-white/60'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs mt-1 ${completed ? 'text-white/80' : 'text-white/40'}`}>
                    {step.description}
                  </p>
                </div>

                {/* Active Step Animation */}
                {active && (
                  <motion.div
                    className="absolute -inset-2 rounded-full border-2 border-primary-400/50"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Current Status Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${orderSteps[getCurrentStepIndex()]?.color} flex items-center justify-center`}>
              {React.createElement(orderSteps[getCurrentStepIndex()]?.icon, { 
                className: "w-8 h-8 text-white" 
              })}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">
                {orderSteps[getCurrentStepIndex()]?.title}
              </h3>
              <p className="text-white/70">
                {orderSteps[getCurrentStepIndex()]?.description}
              </p>
            </div>
            {activeStep === 'onway' && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Delivery Partner Info */}
      {(activeStep === 'onway' || activeStep === 'ready') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass backdrop-blur-md border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Delivery Partner</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {deliveryPartner.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="text-white font-semibold">{deliveryPartner.name}</h4>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <span>⭐ {deliveryPartner.rating}</span>
                  <span>•</span>
                  <span>{deliveryPartner.vehicle}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30"
              >
                <Phone className="w-5 h-5 text-green-400" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30"
              >
                <MessageCircle className="w-5 h-5 text-blue-400" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedOrderTracking;