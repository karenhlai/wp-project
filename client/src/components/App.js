import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import ProductIndex from './products/ProductIndex';
import Register from './user_auth/register';
import Login from './user_auth/login';
import Nav from './nav/nav';


const App = () => {
  return (
    <div>
      <header>Warby Parker</header>
      <Nav />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <Route exact path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
}

export default App;
