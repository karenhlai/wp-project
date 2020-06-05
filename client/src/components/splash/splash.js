import React from 'react';
import { Link } from 'react-router-dom';
import Homepage from '../../images/homepage.jpg';

const Splash = () => {
  return (
    <div className="homepage-container">
      <div className="splash-container">
        <img src={Homepage} />
        <Link to="/eyeglasses">SHOP EYEGLASSES</Link>
      </div>

      <p>
        Hello, I used this project to practice code, 
        <br />
        It uses tools like React and an environment called Node.
        <br />
        <br />
        In addition, I've added GraphQL in between,
        <br />
        the server and client layers so data retrieval would be pristine.
        <br />
        <br />
        I've also used Apollo Client to manage state, 
        <br />
        so the cached data may quickly update the page.
        <br />
        <br />
        Lastly, this app was made to replicate the features of a cool site, 
        <br />
        So, thank Warby Parker for their bright insights. 
        <br />
        <br />
        Enjoy!
      </p>
    </div>
  );
}

export default Splash;