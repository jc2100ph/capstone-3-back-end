const express = require("express")
const router = express.Router()
const auth = require("../authentication/auth")

const userControllers = require("../controllers/userControllers")

router.route("/retrieveUser/:id").get(auth.verifyToken, userControllers.retrieveUser)
router.route("/cart/:id").get(auth.verifyToken, userControllers.showUserCart)
router.route("/register").post(userControllers.register)
router.route("/login").post(userControllers.login)
router.route("/logout").post(userControllers.logout)
router.route("/checkEmail").post(userControllers.checkEmail)
router.route("/checkUser").post(auth.verifyToken, userControllers.checkUser)
router.route("/addToCart").post(auth.verifyToken, userControllers.addToCart)


module.exports = router