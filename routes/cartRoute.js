const express = require("express")
const cartController = require("../controllers/cartController")
const { verifyToken } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/",verifyToken, cartController)

module.exports = router