const express = require("express");

const methodOverride = require("method-override");

const router = express.Router();

router.use(methodOverride("_method"));

router.use(express.json());
const searchCtrl = require("../controllers/search");

router.post("/search", searchCtrl.search_post);

module.exports = router;
