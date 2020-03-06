const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = graphql;
const mongoose = require("mongoose");

const UserType = require("./user_type");
const User = mongoose.model("user");

const PostType = require("./post_type");
const Post = mongoose.model("post");

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
      resolve(parentValue, { name, email, password }) {
        return new User({ name, email, password }).save();
      }
    }, 
    newPost: {
      type: PostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) }, 
        body: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLID) }
      }, 
      resolve(_, { title, body, author }) {
        return new Post({ title, body, author }).save();
      }
    }
  }
});

module.exports = mutation;