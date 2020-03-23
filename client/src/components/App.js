import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import ProductIndex from './products/product_index';
import ProductItem from './products/product_item';
import Register from './user_auth/register';
import Login from './user_auth/login';
import CartIndex from './cart/cart_index';
import Nav from './nav/nav';


const App = () => {
  return (
    <div className="app-container">
      <Nav />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <Route exact path="/" component={ProductIndex} />
        <Route path="/eyeglasses/:id" component={ProductItem} />
        <Route path="/cart" component={CartIndex} />
      </Switch>
    </div>
  );
}

export default App;
