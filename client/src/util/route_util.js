import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../graphql/routes";
const { IS_LOGGED_IN } = Queries;
// write a routing component which will read the isLoggedIn value 
// from the cache and redirect the user dependent on their status

export const AuthRoute = ({
  component: Component,
  path,
  exact,
  routeType,
  ...rest
}) => (
  <Query query={IS_LOGGED_IN}>
    {({ data }) => {
      //if route is "auth," this route will only render if user isn't logged in
      if (routeType === "auth") {
        return (
          <Route
            path={path}
            exact={exact}
            render={props =>
              !data.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
            }
          />
        );
      } else {
        //else, route is "protected," this route will render if user is logged in
        return (
          <Route
            {...rest}
            render={props =>
              data.isLoggedIn ? (
                <Component {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        );
      }
    }}
  </Query>
);