const express = require("express")
const router = express.Router()

const { verifyToken, isAdmin } = require("../middleware/authMiddleware")
const { adminGetAllUsers,
    adminGetUserById,
    adminUpdateUser,
    adminDeleteUser } = require("../controllers/adminController")

router.route("/").get(verifyToken, isAdmin, adminGetAllUsers);
router.route('/:id')
    .delete(verifyToken, isAdmin, adminDeleteUser)
    .get(verifyToken, isAdmin, adminGetUserById)
    .put(verifyToken, isAdmin, adminUpdateUser);

module.exports = router