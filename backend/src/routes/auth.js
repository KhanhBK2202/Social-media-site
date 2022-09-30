const authController = require("../app/controllers/AuthController");

const router = require("express").Router();
const { verifyToken } = require("../app/controllers/verifyToken");

//REGISTER
router.post("/register", authController.registerUser);

//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);

//LOG IN
router.post("/login", authController.loginUser);

//LOG OUT
router.post("/logout", verifyToken, authController.logOut);

module.exports = router;