const { Cart } = require("../models/Cart");
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { isValidObjectId } = require("mongoose");

exports.addItemToCart = async (req, res) => {
  let userId = req.query.userId.trim();
  let user = await User.exists({ _id: userId });
  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let product = Product.findById(req.query.productId);

  if (!product)
    return res.status(400).send({ status: false, message: "Invalid product" });
  else {
    product = Product.findById(req.query.productId)
      .then(async (product) => {
        let cart = await Cart.findOne({ userId: userId });

        if (cart) {
          let i = cart.products.findIndex((p) => p.productId == product);

          if (i > -1) {
            let productItem = cart.products[i];
            productItem.quantity += 1;
            cart.products[i] = productItem;
          } else {
            cart.products.push({ productId: product, quantity: 1 });
            cart.save();
            return res.status(200).send({ status: true, updatedCart: cart });
          }
        } else {
          const newCart = Cart.create({
            userId,
            products: [{ productId: product, quantity: 1 }],
          });

          return res.status(201).send({ status: true, newCart: newCart });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.getCart = async (req, res) => {
  let userId = req.query.userId;
  let user = await User.findById(userId);

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await Cart.findOne({ userId: userId })
    .populate("products.productId")
    .then((cart) => {
      return cart;
    });

  try {
    if (!cart) {
      return res
        .status(404)
        .send({ status: false, message: "Cart not found for this user" });
    } else {
      let total = 0;
      cart.products.map((product) => {
        total +=
          product.quantity * product.productId.price +
          product.productId.shippingRate;
        return total;
      });
      cart.total = total;
      res.status(200).json({ cart });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.removeItem = async (req, res) => {
  let userId = req.query.userId.trim();
  let user = await User.exists({ _id: userId });
  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let product = Product.findById(req.query.productId);
  let productId = req.query.productId;

  if (!product)
    return res.status(400).send({ status: false, message: "Invalid product" });
  else {
    product = Product.findById(req.query.productId)
      .then(async (product) => {
        let cart = await Cart.findOne({ userId: userId });

        if (cart) console.log(typeof productId);

        {
          let i = cart.products.findIndex(
            (p) => p.productId.toString() == productId
          );

          cart.products.splice(i, 1);
          cart.save();
          return res.status(200).send({ status: true, updatedCart: cart });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.shippingAndBilling = async (req, res) => {
  console.log(req.body.addressLine1S);
  console.log(req.body.addressLine1B);
  let userId = req.query.userId.trim();
  let user = await User.findById(userId);
  try {
    await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          shippingAddress: {
            addressLine1: req.body.addressLine1S,
            addressLine2: req.body.addressLine2S,
            city: req.body.cityS,
            county: req.body.countyS,
            postCode: req.body.postCodeS,
          },

          billingAddress: {
            addressLine1: req.body.addressLine1B,
            addressLine2: req.body.addressLine2B,
            city: req.body.cityB,
            county: req.body.countyB,
            postCode: req.body.postCodeB,
          },
        },
      },
      { new: true, runValidators: true, useFindAndModify: false },
      function (err, user) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ user });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
