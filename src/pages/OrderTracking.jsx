import React from 'react';
import { useParams } from 'react-router-dom';
import AnimatedOrderTracking from '../components/AnimatedOrderTracking';

const OrderTracking = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen py-8">
      <AnimatedOrderTracking orderId={id || 'ORD12345'} currentStep="preparing" />
    </div>
  );
};

export default OrderTracking;