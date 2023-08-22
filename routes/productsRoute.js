const express = require("express");
const router = express.Router()
const{verifyToken, isAdmin} = require("../middleware/authMiddleware")
const {createProduct, getProduct} = require("../controllers/productsController")
router.route("/").post(verifyToken,isAdmin,createProduct).get(verifyToken,isAdmin,getProduct)
// router.route("/:id").put(verifyToken, isAdmin).delete(verifyToken, isAdmin)

module.exports = router