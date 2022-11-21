const { Seller } = require("../models/Seller");
const { Product } = require("../models/Product");

exports.product_create_get = (req, res) => {
  Seller.find()
    .then((sellers) => {
      res.render("product/add", { sellers });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.product_create_post = (req, res) => {
  let product = new Product(req.body);
  product.seller.push(req.query.id);
  product
    .save()
    .then(() => {
      let seller = product.seller;
      Seller.findById(seller, (error, seller) => {
        seller.product.push(product.id);
        seller.save();
      });
      res.json({ product });
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later");
    });
};

exports.product_index_get = (req, res) => {
  Product.find()
    .populate("seller")
    .then((products) => {
      res.json({ products: products });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.product_delete_get = (req, res) => {
  Product.findById(req.query.id)
    .then((product) => {
      Seller.findById(product.seller, (error, seller) => {
        seller.product.remove(req.query.id);
        seller.save();
        Product.findByIdAndDelete(req.query.id)
          .then((product) => {
            res.json({ product });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.product_edit_get = (req, res) => {
  Product.findById(req.query.id)
    .then((product) => {
      res.json({ product });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.product_update_put = (req, res) => {
  Product.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((product) => {
      res.json({ product });
    })
    .catch((err) => {
      console.log(err);
    });
};
