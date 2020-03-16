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

CategorySchema.statics.findProducts = function (categoryId) {
  return this.findById(categoryId)
    .populate("products")
    .then(category => category.products);
};

module.exports = mongoose.model("category", CategorySchema);