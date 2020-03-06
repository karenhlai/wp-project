const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList } = graphql; //List allows data to be returned as an array

// import mongoose so we can access our User model in our resolver functions
const mongoose = require("mongoose");
const User = mongoose.model("user");

const UserType = require("./user_type");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      // This is the type we defined in the last step,
      // wrapped in a GraphQLList to specify that the data will be returned as an array.
      type: new GraphQLList(UserType),
      // We must specify a resolve function to tell GraphQL how to access the data.
      // Even if there are many fields present on a given user,
      // only the fields we specified on the User type will be returned.
      resolve() {
        // This is just a mongoose method
        return User.find({});
      }
    }
  }
});

module.exports = RootQuery;