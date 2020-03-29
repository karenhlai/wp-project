const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String
    token: String
    loggedIn: Boolean
  }

  type Product {
    _id: ID!
    name: String
    color: String
    description: String
    measurement: String
    cost: Float
    categoryId: ID
  }

  type Category {
    _id: ID!
    name: String
    products: [Product] 
  }

  type Query {
    users: [User]
    user(_id: ID): User
    categories: [Category]
    category(_id: ID): Category
    products: [Product]
    product(_id: ID): Product
  }

  type Mutation {
    register(email: String, password: String): User
    login(email: String, password: String): User
    logout(_id: ID): User 
    verifyUser(token: String): User
    newCategory(name: String): Category
    deleteCategory(_id: ID): Category
    newProduct(name: String, color: String, description: String, measurement: String, categoryId: ID): Product
    deleteProduct(_id: ID): Product
    updateProductCategory(productId: ID, categoryId: ID): Product
  }
`;

module.exports = typeDefs;
//rememer to write resolver in Category = products array