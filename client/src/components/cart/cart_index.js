import React from 'react';
import { Query } from "react-apollo";
import { FETCH_CART_ITEMS } from '../../graphql/queries';
import CartItem from './cart_item';

const CartIndex = () => {
  let cartMessage;
  return (
    <Query query={FETCH_CART_ITEMS}>
      { ({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        data.cart.length === 0 ? cartMessage = "Your cart is empty." : cartMessage = "Your Cart:";
        
        let cartItems = data.cart.map(item => {
          return (
            <CartItem 
              key={item.id}
              name={item.name}
              cost={item.cost}
            />
          )
        })

        return (
          <div className="cart-index-container">
            <h1>
              { cartMessage }
            </h1>
            { cartItems }
          </div>
        )
        }}
    </Query>
  )
};

export default CartIndex;