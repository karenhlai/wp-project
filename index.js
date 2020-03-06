const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.get("/", (req, res) => res.send("Hello Woooorld!"));

app.use(bodyParser.json());

app.listen(5000, () => console.log("Server is running on port 5000"));
