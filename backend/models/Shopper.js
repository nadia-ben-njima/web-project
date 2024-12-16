const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopperSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
});

const Shopper = mongoose.model("Shopper", shopperSchema);

module.exports = Shopper;
