const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema(
  {
    productID: String,
    userID: String,
  },
  { timestamps: true }
);

const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = { Favourite };
