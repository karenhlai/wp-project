const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLUpload, GraphQLInt } = graphql;

const FileType = new GraphQLObjectType({
  name: "FileType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    // _id: { type: GraphQLID },
    // filename: { type: GraphQLString }, 
    // mimetype: { type: GraphQLString }, 
    // encoding: { type: GraphQLString }
    name: { type: GraphQLString }, 
    type: { type: GraphQLString }, 
    size: { type: GraphQLInt },
    // path: { type: GraphQLString }
  })
});

module.exports = FileType;
