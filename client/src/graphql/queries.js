import gql from "graphql-tag";

export const FETCH_PRODUCTS = gql`
  {
    products {
      _id
      name
      color
    }
  }
`;

export const FETCH_PRODUCT = gql`
  query product($_id: ID!) {
    product(_id: $_id) {
      _id
      name
      color
      description
      measurement
      cost
    }
  }
`;

//fetch existing items in the cart 
//@client directive so it fetches from the cache
export const FETCH_CART_ITEMS = gql`
  query FetchCartItems {
    cart @client
  }
`;

