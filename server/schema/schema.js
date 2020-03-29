// const graphql = require("graphql");
// const { GraphQLSchema } = graphql;
const typeDefs = require('./type_defs');
const resolvers = require('./resolvers');
const logger = require('./logger');

// const RootQueryType = require('./root_query_type');
// const mutations = require('./mutations');

// module.exports = new GraphQLSchema({ 
//   query: RootQueryType, 
//   mutation: mutations 
// });


const { makeExecutableSchema } = require('graphql-tools');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger
});

module.exports = schema;