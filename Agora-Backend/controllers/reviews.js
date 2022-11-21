const { Review } = require("../models/Review");
const { Seller } = require("../models/Seller");
const { User } = require("../models/User");

const moment = require("moment");

exports.review_create_get = (req, res) => {
  Seller.find()
    .then((sellers) => {
      res.render("review/add", { sellers });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.review_create_post = (req, res) => {
  let review = new Review(req.body);
  review
    .save()
    .then(() => {
      let seller = review.seller;
      Seller.findById(seller, (error, seller) => {
        seller.review.push(review.id);
        seller.save();
      });
      res.json({ review });
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later");
    });
};

exports.review_delete_get = (req, res) => {
  Review.findById(req.query.id)
    .then((review) => {
      Seller.findById(review.seller, (error, seller) => {
        seller.review.remove(req.query.id);
        seller.save();
        Review.findByIdAndDelete(req.query.id)
          .then((review) => {
            res.json({ review });
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

exports.review_edit_get = (req, res) => {
    Review.findById(req.query.id)
    .then((review) => {
      res.json({ review });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.review_update_put = (req, res) => {
    Review.findByIdAndUpdate(req.body._id, req.body, { new: true })
      .then((review) => {
        res.json({ review });
      })
      .catch((err) => {
        console.log(err);
      });
  };
