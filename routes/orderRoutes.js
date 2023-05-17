const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orderController")
const auth = require("../authentication/auth")

router.route("/checkout/:id").post(auth.verifyToken, orderController.CheckOut)

module.exports = router