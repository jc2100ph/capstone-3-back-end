const express = require("express")
const router = express.Router()
const productController = require("../controllers/productControllers")
const auth = require("../authentication/auth")

router.route("/all").get(productController.productGetAll)
router.route("/allActive").get(productController.productGetAllActive)
router.route("/singleItem/:id").get(productController.getProductById)
router.route("/create").post(auth.verifyToken, productController.productCreate)
router.route("/:id/update").patch(auth.verifyToken, productController.productUpdate)
router.route("/:id/archive").patch(auth.verifyToken, productController.productArchive)
router.route("/:id/activate").patch(auth.verifyToken, productController.productActivate)



module.exports = router