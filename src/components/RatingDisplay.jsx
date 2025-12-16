import { Star, User, Truck, Utensils } from 'lucide-react';

const RatingDisplay = ({ type = 'food', rating = 4.5, showLabel = true, size = 'md' }) => {
  const getRatingConfig = () => {
    switch (type) {
      case 'restaurant':
        return {
          icon: Utensils,
          label: 'Restaurant Rating',
          color: 'text-orange-500',
          bgColor: 'bg-orange-100'
        };
      case 'driver':
        return {
          icon: Truck,
          label: 'Delivery Rating',
          color: 'text-blue-500',
          bgColor: 'bg-blue-100'
        };
      case 'service':
        return {
          icon: User,
          label: 'Service Rating',
          color: 'text-green-500',
          bgColor: 'bg-green-100'
        };
      default: // food
        return {
          icon: Star,
          label: 'Food Rating',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-100'
        };
    }
  };

  const config = getRatingConfig();
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className={`${sizeClasses[size]} text-yellow-400 fill-current`} />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className={`${sizeClasses[size]} text-yellow-400 fill-current opacity-50`} />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className={`${sizeClasses[size]} text-gray-300`} />
      );
    }
    
    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${config.bgColor}`}>
          <Icon className={`w-3 h-3 ${config.color}`} />
          <span className={`text-xs font-medium ${config.color}`}>
            {config.label}
          </span>
        </div>
      )}
      <div className="flex items-center gap-1">
        {renderStars()}
        <span className="text-sm font-semibold text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default RatingDisplay;