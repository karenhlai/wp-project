import React from 'react';
import { Query, Mutation } from "react-apollo";
import { UPDATE_CART_ITEMS } from '../../graphql/mutations';
import { FETCH_CART_ITEMS } from '../../graphql/queries';
import { ApolloClient } from 'apollo-boost';
import { ApolloConsumer } from "@apollo/react-components";

//Add to cart => When clicked => 
  // push id and cost into a new object
  //Read the cart array from the cache
  //writes to the cache with the obj we just created and the rest of the cart items

//Remove from Cart => When clicked => 
  //Read the cart array from the cache, 
  //remove the item with a corresponding id
  
class AddToCart extends React.Component {
  constructor(props) {
    super(props);
  }

  addCache(cache, product) {
    const cart = cache.readQuery({ query: FETCH_CART_ITEMS });
    console.log(cart)
    cache.writeQuery({
      query: FETCH_CART_ITEMS,
      data: {
        cart: [ ...cart.cart, product ]
      }
    })
    console.log(cache)
  }

  render() {
    let product = { 
      id: this.props.id, 
      cost: this.props.cost
    };

    return(
      <Query query={FETCH_CART_ITEMS}>
        { ({ loading, error, data, client }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

          return (
            <button onClick={() => this.addCache(client, product)}>
              Add to Cart
            </button>
          )
        }}
      </Query>
    )
  }
}

export default AddToCart;