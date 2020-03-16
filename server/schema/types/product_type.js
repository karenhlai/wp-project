const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;
const mongoose = require("mongoose");

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString }, 
    description: { type: GraphQLString }, 
    weight: { type: GraphQLInt }
  })
});

module.exports = ProductType;