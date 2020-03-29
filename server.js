const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("./server/models/User");
const Product = require("./server/models/Product");
const Category = require("./server/models/Category");

const { ApolloServer } = require('apollo-server-express');
const schema = require('./server/schema/schema');
// const expressGraphQL = require('express-graphql');
// const { graphqlUploadExpress } = require('graphql-upload');
const typeDefs = require('./server/schema/type_defs');
const resolvers = require('./server/schema/resolvers');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  // .catch(err => console.log(err));

// app.use(
//   "/graphql",
//   bodyParser.json(),
//   expressGraphQL(req => {
//     return {
//       schema,
//       // context that will be passed into each resolver; context is an object shared by all resolvers
//       context: {
//         token: req.headers.authorization
//       },
//       graphiql: true
//     }
//   })
// );

app.use(bodyParser.json());


const server = new ApolloServer({
  // schema, 
  typeDefs, 
  resolvers,
  context: ({ req }) => ({
    token: req
  })
});

server.applyMiddleware({ app })

// app.get("/", (req, res) => res.send("Hello World!"));
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port 🚀${port}`));
