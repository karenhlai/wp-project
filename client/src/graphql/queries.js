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

export const FETCH_PRODUCT = gql `
  query product($_id: ID!) {
    product(_id: $_id) {
      _id
      name
      color
      description
      measurement
    }
  }
`;