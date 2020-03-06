const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;

const bodyParser = require("body-parser");

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello Woooorld!"));

app.use(bodyParser.json());

app.listen(5000, () => console.log("Server is running on port 5000"));
