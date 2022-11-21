const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    shippingAddress: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      county: String,
      postCode: String,
    },
    billingAddress: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      county: String,
      postCode: String,
    },
    totalAmount: Number,
    currency: String,
    paymentMethod: String,
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Transaction };
