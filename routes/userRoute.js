const express = require("express")
const router = express.Router()

const { verifyToken } = require("../middleware/authMiddleware")

const { registerUser,
    login, updateUser,
    getUser, logoutUser } = require("../controllers/authController")

router.route('/').post(registerUser)
router.post('/login', login);
router.post('/logout', logoutUser);
router.route('/profile')
    .get(verifyToken, getUser)
    .put(verifyToken, updateUser);

module.exports = router