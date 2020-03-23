import React from 'react';
import { Link } from 'react-router-dom';
import AuthNav from './auth_nav';
import Logo from '../../images/warby_parker_logo.svg'

const Nav = () => {
  return (
    <div className="nav-container">
      <div> </div>
      <Link to="/">
        <img src={Logo} />
      </Link>
      <AuthNav />
    </div>
  )
};

export default Nav;