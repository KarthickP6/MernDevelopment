const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
  id: String,
  image: String,
  title: String,
  description: String,
  availableSizes: Array,
  price: Number,
  qty: Number,
})

module.exports = mongoose.model("CartSchema", CartSchema)
