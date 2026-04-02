import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ 
  expiryDate, 
  className = "de_countdown"
}) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!expiryDate) {
      setTimeLeft(null);
      return;
    }

    const calculateTimeLeft = () => {
      const difference = expiryDate - Date.now();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return `${hours}h ${minutes}m ${seconds}s`;
      } else {
        return "Expired";
      }
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  if (!timeLeft) {
    return null;
  }

  return <div className={className}>{timeLeft}</div>;
};

export default CountdownTimer;
