const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: {
    type: String,
    enum: ["Electronics", "Fashion", "Wooden"],
  },
  image: String,
  venderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
});

module.exports = mongoose.model("Product", productSchema);
