import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
// import ApolloClient from "apollo-boost";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { HashRouter } from 'react-router-dom';
import { VERIFY_USER } from './graphql/mutations';

document.addEventListener('DOMContentLoaded', () => {

  // This piece on configuration will take EVERY piece of data fetched by the Apollo client
  // and will map it to it's id.
  // This allows Apollo to be able to quickly identify records in it's
  // Store and update them automatically for you based on incoming data from the backend
  const cache = new InMemoryCache({
    dataIdFromObject: object => object.id || null
  });

  const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql"
  });


  // make sure we log any additional errors we receive
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]), 
    cache, 
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }, 
  });


  // making sure that the token we fetched our of localStorage actually belongs to a logged in User
  // if we have a token we want to verify the user is actually logged in
  const token = localStorage.getItem("auth-token");
  // to avoid components async problems where
  // a component would try to read the cache's value of isLoggedIn
  // before our mutation goes through we can set it up here
  cache.writeData({
    data: {
      isLoggedIn: Boolean(token)
    }
  });
  // then if we do have a token we'll go through with our mutation
  if (token) {
    client
      // use the VERIFY_USER mutation directly use the returned data to know if the returned
      // user is loggedIn
      .mutate({ mutation: VERIFY_USER, variables: { token } })
      .then(({ data }) => {
        cache.writeData({
          data: {
            isLoggedIn: data.verifyUser.loggedIn,
            cart: [] //loggedIn users cart
          }
        });
      });
  } else {
    // add a cart to our local cache, represented as an array where we can push as many items as we'd like
    cache.writeData({
      data: {
        isLoggedIn: false, 
        cart: [] //guest cart 
      }
    });
  }



  // set up the ApolloProvider to wrap around the App component where
  // all our routes will be setup - giving all the components access to
  // the ApolloProvider
  const Root = () => (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );

  ReactDOM.render(<Root />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
