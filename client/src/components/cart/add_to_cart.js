import React from 'react';
import { Query } from "react-apollo";
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
    this.state = {
      action: true, 
    }
  }

  checkCart(data) {
    data.cart.forEach(prod => {
      if (prod.id === this.props.id) {
        this.setState({ action: false });
      }
    })
  }

  addToCart(cache, product) {
    this.setState({ action: false });
    const cart = cache.readQuery({ query: FETCH_CART_ITEMS });
    const cartArray = cart.cart;
    cache.writeQuery({
      query: FETCH_CART_ITEMS,
      data: {
        // cart: [ ...cart.cart, product ]
        cart: cartArray.concat(product)
      }
    });
    console.log(cache.readQuery({ query: FETCH_CART_ITEMS }))
  }

  removeFromCart(cache, product) {
    this.setState({ action: true });
    const cart = cache.readQuery({ query: FETCH_CART_ITEMS });
    const cartArray = cart.cart.filter(prod => {
      return prod.id !== product.id;
    });
    cache.writeQuery({
      query: FETCH_CART_ITEMS, 
      data: {
        cart: cartArray
      }
    });
      console.log(cache.readQuery({
        query: FETCH_CART_ITEMS
      }))

  }


  render() {
    let product = { 
      id: this.props.id,
      name: this.props.name,
      cost: this.props.cost,
    };

    return(
      <Query query={FETCH_CART_ITEMS}>
        { ({ loading, error, data, client, refetch }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        
        return (
          <div>
            {this.state.action ? 
              <button onClick={() => this.addToCart(client, product)}>Add to Cart</button>
              :
              <button onClick={() => this.removeFromCart(client, product)}>Remove From Cart</button>
            }
          </div>
        )
        }}
      </Query>
    )
  }
};

export default AddToCart;