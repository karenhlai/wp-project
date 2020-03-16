import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

document.addEventListener('DOMContentLoaded', () => {

  // This piece on configuration will take EVERY piece of data fetched by the Apollo client
  // and will map it to it's id.
  // This allows Apollo to be able to quickly identify records in it's
  // Store and update them automatically for you based on incoming data from the backend
  const cache = new InMemoryCache({
    dataIdFromObject: object => object.id || null
  });


  const client = new ApolloClient({
    // we set Apollo to watch an endpoint
    uri: "localhost:5000/graphql",
    onError: ({
      networkError,
      graphQLErrors
    }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
  });

  // set up the ApolloProvider to wrap around the App component where
  // all our routes will be setup - giving all the components access to
  // the ApolloProvider
  const Root = () => (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

  ReactDOM.render(<Root />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
