const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const cors = require("cors");

const bodyParser = require("body-parser");

const expressGraphQL = require('express-graphql')

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

//temporarily add Express Route to post a new User
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

// const router = express.Router();

// const createNewUser = router.post("/new", (req, res) => {
//   User.findOne({
//     email: req.body.email
//   }).then(user => {
//     if (user) {
//       // Throw a 400 error if the email address already exists
//       return res
//         .status(400)
//         .json({
//           email: "A user has already registered with this address"
//         });
//     } else {
//       // Otherwise create a new user
//       console.log(req.body);
//       const newUserObj = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//       });

//       newUserObj
//         .save()
//         .then(savedUser => res.json(savedUser))
//         .catch(err => console.log(err));
//     }
//   });
// });

// app.use("/users", createNewUser);



//temporarily add Express Route to post a new Post
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

// const router = express.Router();

// const createNewPost = router.post("/new", (req, res) => {
//   // remember to import your Post model from Mongoose!
//   const newPost = new Post({
//     title: req.body.title,
//     body: req.body.body,
//     author: req.body.author
//     // date: Date.now,
//   });

//   newPost
//     .save()
//     .then(savedPost => res.json(savedPost))
//     .catch(err => console.log(err));
// });

// app.use("/posts", createNewPost);


app.use(cors());

  
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
const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server is running on port ${port}`));
