import { useState } from 'react';
import './LocationPicker.css';

const LocationPicker = ({ onLocationSelect }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    if (loading) return;
    
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setCurrentLocation(location);
          onLocationSelect?.(location);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
          const defaultLocation = { latitude: 40.7128, longitude: -74.0060 };
          setCurrentLocation(defaultLocation);
          onLocationSelect?.(defaultLocation);
        }
      );
    } else {
      setLoading(false);
      const defaultLocation = { latitude: 40.7128, longitude: -74.0060 };
      setCurrentLocation(defaultLocation);
      onLocationSelect?.(defaultLocation);
    }
  };

  return (
    <div className="location-picker">
      <div className="location-info">
        {currentLocation ? (
          <p>📍 Delivering to your location</p>
        ) : (
          <p>📍 Select your location</p>
        )}
      </div>
      
      <button 
        onClick={getCurrentLocation} 
        className="location-btn"
        disabled={loading}
      >
        {loading ? 'Getting location...' : '📍 Use Current Location'}
      </button>
    </div>
  );
};

export default LocationPicker;