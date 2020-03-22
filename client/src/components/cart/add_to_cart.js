import React from 'react';
// import { Link } from 'react-router-dom';
import { Query } from "react-apollo";
import { FETCH_CART_ITEMS } from '../../graphql/queries';

const AddToCart = ({ id, cost}) => {
  let action;
  return (
   <Query query={FETCH_CART_ITEMS}>
      { ({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        console.log(!data.cart.includes(id))
        
        if (!data.cart.includes(id)) {
           action = <button>ADD TO CART</button>;
        } else {
          action = <button>REMOVE FROM CART</button>;
        }

        return (
          <div>
            <div>
              {action}
            </div>
          </div>
        );
      }}
    </Query>
  )
}


export default AddToCart;