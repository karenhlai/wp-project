import React from 'react';
import { Link } from 'react-router-dom';
import Homepage from '../../images/homepage.jpg';

const Splash = () => {
  return (
    <div className="splash-container">
      <img src={Homepage} />
      <div className="home-nav">
        <Link to="/eyeglasses">SHOP EYEGLASSES</Link>
      </div>
    </div>
  );
}

export default Splash;