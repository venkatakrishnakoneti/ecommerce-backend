const express = require("express");
const router = express.Router()
const {createProduct, getProduct} = require("../controllers/productsController")
router.route("/").post(createProduct).get(getProduct)
// router.route("/:id").put().delete()

module.exports = router