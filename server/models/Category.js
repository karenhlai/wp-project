const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: false
    // ref: "categories"
  }
});

module.exports = mongoose.model("category", CategorySchema);