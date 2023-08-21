const express = require("express");
const router = express.Router()
const {createCategory, getCategory} = require("../controllers/categoryController")

router.route("/").get(getCategory).post(createCategory)

module.exports = router