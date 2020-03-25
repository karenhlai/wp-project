import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`;

export const CREATE_PRODUCT = gql `
  mutation CreateProduct($name: String!, $color: String!, $description: String!, $measurement: String!) {
    createProduct(name: $name, color: $color, description: $description, measurement: $measurement) {
      name
      color
      description
      measurement
    }
  }
`;

