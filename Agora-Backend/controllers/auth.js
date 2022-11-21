const { User } = require("../models/User");
const { Seller } = require("../models/Seller");
//Require jsonwebtoken
const jwt = require("jsonwebtoken");

//  Require bcrypt for hashing
const bcrypt = require("bcrypt");

// 10 rounds of hashing
const salt = 10;

exports.auth_signup_get = (req, res) => {
  res.render("auth/signup");
};

exports.auth_signup_post = async (req, res) => {
  let emailAddress = req.body.emailAddress;

  try {
    let match = await User.findOne({ emailAddress });
    if (!match) {
      let hash = bcrypt.hashSync(req.body.password, salt);

      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        userRole: req.body.userRole,
        cloudinary_url: req.body.data,
      });
      user.password = hash;

      user
        .save()
        .then((createdUser) => {
          User.findById(user).then((user) => {
            if (user.userRole === "seller") {
              let seller = new Seller(req.body);
              seller.user.push(user);
              seller.save();
            } else {
              res.json({ message: "no seller" });
            }
          });
          res.json({ message: "User created successfully", user: createdUser });
        })
        .catch((err) => {
          console.log(err);
          res.json({ message: "please try again later" });
        });
    }
    if (match) {
      res.json({ message: "you already have an account, please sign-in" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.auth_signin_get = (req, res) => {
  res.render("auth/signin");
};

exports.auth_signin_post = async (req, res) => {
  let { emailAddress, password } = req.body;

  try {
    let user = await User.findOne({ emailAddress });

    if (!user) {
      return res.json({ message: "User not found" }).status(400);
    }
    // password comparision
    const isMatch = await bcrypt.compareSync(password, user.password);
    // console.log(password); //Plain text password
    // console.log(user.password); // Encrypted password from DB

    if (!isMatch) {
      return res.json({ message: "Password not matched" }).status(400);
    }
    // JWT token
    const payload = {
      user: {
        id: user._id,
        name: user.firstName,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 3600000000000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token }).status(200);
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ message: "You are not logged in" }).status(400);
  }
};

exports.auth_logout_get = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return Next(err);
    }
    res.redirect("/auth/signin");
  });
};

exports.auth_update_get = async (req, res) => {
  let user = await User.findById(req.query.userId);
  let seller = "";
  try {
    if (user.userRole === "seller") {
      seller = await Seller.find({ user: { $in: [user._id] } }).then(
        (seller) => {
          return seller[0];
        }
      );
    }
    res.status(200).json({ user, seller });
  } catch (error) {
    console.log(error);
  }
};

exports.auth_update_put = async (req, res) => {
  let user = await User.findById(req.body._id);
  let seller = "";
  try {
    await User.findByIdAndUpdate(user._id, req.body, { new: true });
    if (user.userRole === "seller") {
      seller = await Seller.find({ user: { $in: [user._id] } }).then(
        (seller) => {
          return seller[0];
        }
      );
      Seller.findByIdAndUpdate(seller._id, req.body);
      res.status(200).json({ user, seller });
    } else {
      res.status(200).json({ user, seller });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.update_password_get = function (req, res) {
  res.render("auth/updatepassword");
};

exports.update_password_post = async (req, res) => {
  let user = await User.findById(req.query.userId);
  try {
    if (user) {
      let npw = req.body.newPassword;
      let opw = req.body.oldPassword;
      let cpw = req.body.confirmPassword;
      bcrypt.compare(opw, user.password, function (err, res) {
        if (res) {
          if (npw === cpw) {
            bcrypt.hash(npw, salt, function (err, hash) {
              user.password = hash;
              user.save();
            });
            res.json({ message: "user password has been updated" });
          } else {
            res.json({
              message: "The passpowrds do not match. Please try again.",
            });
          }
        } else {
          res.json({
            message:
              "Error. This page is blocked by the wall of authentication.",
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
