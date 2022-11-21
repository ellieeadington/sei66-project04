const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      // required: true
    },
    subCategory: {
      type: String,
      // required: true
    },
    shippingRate: {
      type: Number,
      required: true,
    },
    cloudinary_url: String,

    returnsPolicy: {
      type: String,
      required: true,
    },
    seller: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
      },
    ],
    isSold: {
      type: Boolean,
      default: false,
    },
    // favourite: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Favourite'
    // }],
    // transactionID: String
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
