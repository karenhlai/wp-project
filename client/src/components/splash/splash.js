import React from 'react';
import { Link } from 'react-router-dom';

const Splash = () => {
  return (
    <div className="splash-container">
      <Link to="/eyeglasses">Shop Eyeglasses</Link>
    </div>
  );
}

export default Splash;