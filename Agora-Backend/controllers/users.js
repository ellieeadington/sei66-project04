const { User } = require("../models/User");
const { Seller } = require("../models/Seller");

exports.user_dashboard_get = async (req, res) => {
  let user = await User.findById(req.query.userId).populate("review"); 
  let seller = "";
  seller = await Seller.find({ user: { $in: [user._id] } })
    .populate("product", "review")
    .then((seller) => {
      seller = seller[0];
      return seller;
    });
  try {
    res.status(200).json({ user, seller });
  } catch (error) {
    console.log(error);
  }
};
