const express = require("express");

const methodOverride = require("method-override");

const router = express.Router();

router.use(methodOverride("_method"));

router.use(express.json());

const cartCtrl = require("../controllers/cart");

router.post("/cart", cartCtrl.addItemToCart);
router.get("/cart", cartCtrl.getCart);
router.delete("/cart", cartCtrl.removeItem);
router.post("/shipping_billing/update", cartCtrl.shippingAndBilling);

module.exports = router;
