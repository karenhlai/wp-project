const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat } = graphql;
const mongoose = require("mongoose");

const Product = mongoose.model("product");

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString }, 
    color: { type: GraphQLString },
    description: { type: GraphQLString }, 
    measurement: { type: GraphQLString }, 
    cost: { type: GraphQLFloat }
  })
});

module.exports = ProductType;