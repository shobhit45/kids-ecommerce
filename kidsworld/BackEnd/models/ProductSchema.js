const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define schema for the Product model
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  category: String,
  rating: String,
});

module.exports = mongoose.model("prod_obj", productSchema);
