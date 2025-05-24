const express = require("express")
const router = express.Router()
const {body, validationResult} = require("express-validator")
const userController = require("../controllers/user.controller")
const wishlistController = require("../controllers/wishlist.controller")
const cartController = require("../controllers/cart.controller")
const orderController = require("../controllers/order.controller")
const authMiddleware = require("../middlewares/auth.middleware")



router.post("/register", 

    userController.registerUser
)

// router.get("/",authMiddleware.findToken,
//     userController.allUsers)

router.post("/login",

    userController.loginUser
)

router.get("/profile",authMiddleware.findToken,
    userController.getProfile
)

router.put("/address",authMiddleware.findToken,
    userController.addAddress
)

router.get("/logout",authMiddleware.findToken,
    userController.logoutUser
)

router.post("/wishlist",authMiddleware.findToken,
    wishlistController.makeWishlist
)

router.get("/wishlist",authMiddleware.findToken,
    wishlistController.getWishlist
)

router.delete("/wishlist/:id",authMiddleware.findToken,
    wishlistController.deleteWishlist
)

router.post("/cart",authMiddleware.findToken,
    cartController.makeCart
)

router.get("/cart",authMiddleware.findToken,
    cartController.getCart
)
router.delete("/cart/:id",authMiddleware.findToken,
    cartController.deleteCart
)

router.post("/order",authMiddleware.findToken,
    orderController.makeOrder
)

router.get("/order",authMiddleware.findToken,
    orderController.getOrder
)

router.delete("/order/:id",authMiddleware.findToken,
    orderController.deleteOrder
)




module.exports = router