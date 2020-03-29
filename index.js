const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const cors = require("cors");
const bodyParser = require("body-parser");

//file upload items
const expressGraphQL = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');

const User = require("./server/models/User");
const Product = require("./server/models/Product");
const Category = require("./server/models/Category");
// const Post = require("./models/Post");

const schema = require("./server/schema/schema");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());


app.use(cors());

app.use(
  "/graphql",
  bodyParser.json(),
  expressGraphQL(req => {
    return {
      schema,
      // context that will be passed into each resolver; context is an object shared by all resolvers
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    }
  })
);

// app.get("/", (req, res) => res.send("Hello World!"));
const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server is running on port 🚀${port}`));
