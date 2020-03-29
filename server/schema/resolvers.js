const mongoose = require("mongoose");
const axios = require("axios");
const AWSKey = require("../../config/keys").AWSKey;
const AuthService = require('../services/auth');

const User = mongoose.model("user");
const Category = mongoose.model("category");
const Product = mongoose.model("product");

// AWS Lambda - request rand prices
const authOptions = {
  method: "GET",
  url: "https://9fliqh7553.execute-api.us-west-1.amazonaws.com/default/generate-price",
  headers: {
    "x-api-key": AWSKey
  }
};

const resolvers = {
  Query: {
    users: () => User.find({}), 
    user: (_, { _id }) => User.findById(_id), 
    categories: () => Category.find({}),
    category: (_, { _id }) => Category.findById(_id), 
    products: () => Product.find({})
      .then(products => {
        const productsWithCost = products.map(product => {
          return axios(authOptions).then(res => {
            product.cost = res.data.cost;
            return product;
          });
        });
        return productsWithCost;
      }),
    product: (_, { _id }) => Product.findById(_id)
      .then(product => {
        return axios(authOptions).then(res => {
          product.cost = res.data.cost;
          return product;
        });
      }),
  },
  Category: {
    products: Category => Product.find({ categoryId : Category._id })
  }, 
  Mutation: {
    register: (_, args) => AuthService.register(args), 
    login: (_, args) => AuthService.login(args), 
    logout: (_, args) => AuthService.logout(args), 
    verifyUser: (_, args) => AuthService.verifyUser(args), 
    newCategory: (_, { name }) => new Category({ name }).save(), 
    deleteCategory: (_, { _id }) => Category.remove({ _id }), 
    newProduct: async (_, { name, color, description, measurement, categoryId }, context) => {
      console.log(context)
      const validUser = await AuthService.verifyUser({ token: context.token });

      if (validUser.loggedIn) {
        return new Product({
          name,
          color, 
          description, 
          measurement, 
          categoryId
        }).save();
      } else {
        throw new Error('Sorry, you need to be logged in to create a product.');
      }
    }, 
    deleteProduct: (_, { _id }) => Product.remove(({ _id })), 
    updateProductCategory: (_, { productId, categoryId }) => Product.updateProductCategory(productId, categoryId)
  }
};

module.exports = resolvers;