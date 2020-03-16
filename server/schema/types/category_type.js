const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const mongoose = require("mongoose");

const Category = mongoose.model("category");

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString }, 
    products: {
      type: GraphQLList(require("./product_type")), 
      resolve(parentValue) {
        return Category.findProducts(parentValue._id);
      }
    }
  })
});

module.exports = CategoryType;