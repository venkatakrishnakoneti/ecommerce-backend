import express from "express";
const router = express.Router()

router.route("/").get().post()
router.route("/:id").put().delete()

module.exports = router