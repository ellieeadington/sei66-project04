const express = require("express");

const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'));

router.use(express.json());
const productCtrl = require("../controllers/products");

router.get('/product/add', productCtrl.product_create_get);
router.post('/product/add', productCtrl.product_create_post);
router.get('/product/index', productCtrl.product_index_get);
router.delete('/product/delete', productCtrl.product_delete_get);
router.get('/product/edit', productCtrl.product_edit_get);
router.put('/product/update', productCtrl.product_update_put);


module.exports = router;