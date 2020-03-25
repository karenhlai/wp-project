import React from 'react';
import { Link } from 'react-router-dom';
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/routes";
const { IS_LOGGED_IN } = Queries;

//To check whether a user is logged in:
//check localStorage for auth-token 
//OR check cache to see if a user 'isloggedIn'

const AuthNav = props => {
  return (
    <ApolloConsumer>
      { client => (
          <Query query={IS_LOGGED_IN}>
          { ({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div className="auth-nav-container">
                  <button onClick={e => {
                    e.preventDefault();
                    localStorage.removeItem("auth-token");
                    client.writeData({ data: { isLoggedIn: false } });
                    // props.history.push("/");
                  }}>
                    Log Out
                  </button>
                  <Link to="/cart">View Cart <i className="fas fa-shopping-cart"></i></Link>
              </div>
              )
            } else {
              return (
                <div className="auth-nav-container">
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                  {/* <Link to="/cart">View Cart <i className="fas fa-shopping-cart"></i></Link> */}
                </div>
              )
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  )
};

export default AuthNav;
