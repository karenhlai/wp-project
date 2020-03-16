const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID ,GraphQLInt } = graphql;
const mongoose = require("mongoose");

const UserType = require("./types/user_type");
const User = mongoose.model("user");

const CategoryType = require("./types/category_type");
const Category = mongoose.model("category");

const ProductType = require("./types/product_type");
const Product = mongoose.model("product");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // this will be the name of this mutation
    newUser: {
      // creating a User type
      type: UserType,
      args: {
        // since we need these arguments to make a new user we'll make them GraphQLNonNull
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name, email, password }) {s
        return new User({ name, email, password }).save();
      }
    },
    newCategory: {
      type: Category,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      }, 
      resolve(_, { name }) {
        return new Category({ name }).save();
      }
    }, 
    deleteCategory: {
      type: CategoryType,
      args: { 
        _id: { type: new GraphQLNonNull(GraphQLID) }
      }, 
      resolve(_, { id }) {
        return Category.deleteOne(id);
      }
    }, 
    newProduct: {
      type: ProductType, 
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, 
        description: { type: new GraphQLNonNull(GraphQLString) }, 
        weight: { type: new GraphQLNonNull(GraphQLInt) }
      }, 
      resolve(_, { name, description, weight }) {
        return new Product({ name, description, weight }).save();
      }
    },
    deleteProduct: {
      type: ProductType, 
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) }
      }, 
      resolve(_, { id }) {
        return Product.deleteOne(id);
      }
    }
  }
});

module.exports = mutation;