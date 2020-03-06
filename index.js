const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;

const bodyParser = require("body-parser");

const expressGraphQL = require('express-graphql')

const User = require("./models/User");

const schema = require("./schema/schema");

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
  
// all requests coming in to `graphql` will be handled
// by the expressGraphQL function from the 'express-graphql' library
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);
// app.get("/", (req, res) => res.send("Hello Woooorld!"));

app.listen(5000, () => console.log("Server is running on port 5000"));
