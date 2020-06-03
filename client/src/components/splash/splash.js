import React from 'react';
import { Link } from 'react-router-dom';
import Homepage from '../../images/homepage.jpg';

const Splash = () => {
  return (
    <div className="splash-container">
      <img src={Homepage} />
      <Link to="/eyeglasses">Shop Eyeglasses</Link>
    </div>
  );
}

export default Splash;