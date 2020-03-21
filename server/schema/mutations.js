const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID ,GraphQLInt } = graphql;
const mongoose = require("mongoose");
const AuthService = require("../services/auth");

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
    register: {
      // creating a User type
      type: UserType,
      args: {
        // since we need these arguments to make a new user we'll make them GraphQLNonNull
        // name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, args) {
        // return new User({ name, email, password }).save();
        return AuthService.register(args)
      }
    },
    logout: {
      type: UserType, 
      args: {
        _id: { type: GraphQLID } 
      }, 
      resolve(_, args) {
        return AuthService.logout(args)
      }
    },
    login: {
      type: UserType, 
      args: {
        email: { type: GraphQLString }, 
        password: { type: GraphQLString }
      }, 
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType, 
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    newCategory: {
      type: CategoryType,
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
        _id: { type: GraphQLID }
      }, 
      resolve(_, { _id }) {
        return Category.remove({ _id });
      }
    }, 
    newProduct: {
      type: ProductType, 
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, 
        color: { type: new GraphQLNonNull(GraphQLString) }, 
        description: { type: new GraphQLNonNull(GraphQLString) }, 
        measurement: { type: new GraphQLNonNull(GraphQLString) },
        // cost: { type: new GraphQLNonNull(GraphQLInt) }
      }, 
      resolve(_, { name, color, description, measurement }) {
        return new Product({
          name,
          color,
          description,
          measurement,
        }).save();
      }
    },
    deleteProduct: {
      type: ProductType, 
      args: {
        _id: { type: GraphQLID }
      }, 
      resolve(_, { _id }) {
        return Product.remove({ _id });
      }
    },
    //change a product's category
    updateProductCategory: { 
      type: ProductType, 
      args: {
        productId: { type: GraphQLID }, 
        categoryId: { type: GraphQLID }
      }, 
      resolve(_, { productId, categoryId }) {
        return Product.updateProductCategory(productId, categoryId);
      }
    }
  }
});

module.exports = mutation;