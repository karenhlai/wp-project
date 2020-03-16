const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql; //List allows data to be returned as an array

// import mongoose so we can access our User model in our resolver functions
const mongoose = require("mongoose");

const UserType = require("./types/user_type");
const User = mongoose.model("user");

const CategoryType = require("./types/category_type");
const Category = mongoose.model("category");

const ProductType = require("./types/product_type");
const Product = mongoose.model("product");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
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
    }, 
    user: {
      // We are now querying for a single User, so we don't need to wrap the type in GraphQLList
      type: UserType,
      // We must define a type for the arguments which will be passed in to the query.
      // GraphQLNonNull specifies that the argument must be include
      args: { _id: { type: new GraphQLNonNull(GraphQLID) }}, 
       // The args argument represents the *actual* arguments passed into the query
      resolve(parentValue, args) {
        return User.findById(args._id)
      }
    }, 
    categories: {
      type: new GraphQLList(CategoryType), 
      resolve() {
        return Category.find({});
      }
    }, 
    products: {
      type: new GraphQLList(ProductType), 
      resolve() {
        return Product.find({});
      }
    },
    // posts: {
    //   // we want all our returned posts in an Array so we use the GraphQLList type
    //   type: new GraphQLList(PostType),
    //   resolve() {
    //     return Post.find({});
    //   }
    // },
    // post: {
    //   // here we just want to return a single post
    //   type: PostType, 
    //   // we need an id for this query so we'll use GraphQLNonNull
    //   args: { id: { type: GraphQLNonNull(GraphQLID) } }, 
    //   resolve(_, {id}) {
    //     return Post.findById(id)
    //   }
    // },
  })
});

module.exports = RootQuery;